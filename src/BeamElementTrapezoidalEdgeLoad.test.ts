import { expect, test } from "vitest";
import { DofID } from ".";
import { BeamElementTrapezoidalEdgeLoad } from "./BeamElementTrapezoidalEdgeLoad";
import { BeamElementUniformEdgeLoad } from "./BeamElementUniformEdgeLoad";
import { LinearStaticSolver } from "./LinearStaticSolver";

// 统一构造一根 4 m 的简支梁，供各个梯形荷载测试复用。
const setupSolver = () => {
    const solver = new LinearStaticSolver();
    solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz]);
    solver.domain.createNode(2, [4, 0, 0], [DofID.Dz]);

    solver.domain.createBeam2D("1", [1, 2], 1, 1, [true, true]);

    solver.domain.createMaterial("1", { e: 210000e6, g: 8.75e10, alpha: 12e-6, d: 4000 });
    solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

    return solver;
};

// 当起终点强度相等时，梯形荷载应退化为均布荷载。
test("Trapezoidal load collapses to uniform load when intensities are constant", () => {
    const solver = setupSolver();
    const trapezoidal = new BeamElementTrapezoidalEdgeLoad("1", solver.domain, [10000, 100000], [10000, 100000], true);
    const uniform = new BeamElementUniformEdgeLoad("1", solver.domain, [10000, 100000], true);

    const trapezoidalVector = trapezoidal.getLoadVectorForClampedBeam();
    const uniformVector = uniform.getLoadVectorForClampedBeam();

    trapezoidalVector.forEach((value, idx) => {
        expect(value).toBeCloseTo(uniformVector[idx]);
    });
});

// 校验梯形荷载的固定端节点力公式，以及沿梁轴力/剪力/弯矩/挠度的解析表达式。
test("Trapezoidal load generates expected nodal actions and responses", () => {
    const solver = setupSolver();
    const startValues: [number, number] = [5000, 20000];
    const endValues: [number, number] = [15000, 10000];

    const load = new BeamElementTrapezoidalEdgeLoad("1", solver.domain, startValues, endValues, true);
    const clampedVector = load.getLoadVectorForClampedBeam();

    const l = 4;
    const expectedVector = [
        (-l / 6) * (2 * startValues[0] + endValues[0]),
        (-l / 20) * (7 * startValues[1] + 3 * endValues[1]),
        l * l * (startValues[1] / 20 + endValues[1] / 30),
        (-l / 6) * (startValues[0] + 2 * endValues[0]),
        (-l / 20) * (3 * startValues[1] + 7 * endValues[1]),
        -l * l * (startValues[1] / 30 + endValues[1] / 20),
    ];

    clampedVector.forEach((value, idx) => {
        expect(value).toBeCloseTo(expectedVector[idx]);
    });

    const xi = 2.0; // 取跨中位置检查截面力解析值
    const xl = xi / l;
    const deltaFx = endValues[0] - startValues[0];
    const deltaFz = endValues[1] - startValues[1];

    const expectedN = -(startValues[0] * xi + 0.5 * deltaFx * (xi * xi) / l);
    const expectedV = -(startValues[1] * xi + 0.5 * deltaFz * (xi * xi) / l);
    const expectedM = -(0.5 * startValues[1] * xi * xi + (deltaFz / (6 * l)) * xi * xi * xi);

    // 内力沿程结果应与线性分布荷载的积分表达式一致。
    expect(load.computeBeamNContrib(xi)).toBeCloseTo(expectedN);
    expect(load.computeBeamVContrib(xi)).toBeCloseTo(expectedV);
    expect(load.computeBeamMContrib(xi)).toBeCloseTo(expectedM);

    const elem = solver.domain.getElement("1");
    const EI = elem.getMaterial().e * elem.getCS().iy;
    const polyUniform = Math.pow(xl, 4) / 24 - Math.pow(xl, 3) / 12 + Math.pow(xl, 2) / 24;
    const polyLinear = Math.pow(xl, 5) / 120 - Math.pow(xl, 3) / 40 + Math.pow(xl, 2) / 60;
    const expectedW = ((l ** 4) / EI) * (startValues[1] * polyUniform + deltaFz * polyLinear);

    // 挠度附加项采用“均布部分 + 线性变化部分”的组合表达式。
    expect(load.computeBeamDeflectionContrib(xl).w).toBeCloseTo(expectedW);
});
