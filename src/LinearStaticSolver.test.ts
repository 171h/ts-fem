import * as math from "mathjs";

import { expect, test } from "vitest";
import { LinearStaticSolver } from "./LinearStaticSolver";
import { Beam2D, DofID } from ".";

// 只剩 1 个未知自由度时，验证求解器对标量子问题的处理和反力分配。
test("1 uknown - Cantilever-hinge", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz, DofID.Ry]);
  solver.domain.createNode(2, [1, 0, 0], [DofID.Dx, DofID.Dz]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [false, false]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 210000e6 / (2 * (1 + 0.2)), alpha: 1.0, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createBeamElementUniformEdgeLoad(1, [0, 1000], false);

  solver.solve();

  const reactions1 = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;
  const reactions2 = solver.domain.getNode(2).getReactions(solver.loadCases[0]).values as math.Matrix;

  // 长度为 1 m 的梁受均布荷载后，两端竖向反力应按当前边界条件分配为 5/8 和 3/8。
  expect(reactions1.get([1])).toBe(-1000 * 0.625);
  expect(reactions2.get([1])).toBe(-1000 * 0.375);
});

// 当所有自由度都被约束时，求解器不会解位移方程，只会直接回算反力。
test("0 uknowns - Cantilever-Cantilever", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz, DofID.Ry]);
  solver.domain.createNode(2, [1, 0, 0], [DofID.Dx, DofID.Dz, DofID.Ry]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [false, false]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 210000e6 / (2 * (1 + 0.2)), alpha: 1.0, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createBeamElementUniformEdgeLoad(1, [0, 1000], false);

  solver.solve();

  const reactions1 = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;
  const reactions2 = solver.domain.getNode(2).getReactions(solver.loadCases[0]).values as math.Matrix;

  // 对双固结梁，均布荷载的竖向总反力应在两端平均分配。
  expect(reactions1.get([1])).toBe(-1000 * 0.5);
  expect(reactions2.get([1])).toBe(-1000 * 0.5);

  const defl = (solver.domain.elements.get("1") as Beam2D).computeGlobalDefl(solver.loadCases[0], 10);
  const bm = (solver.domain.elements.get("1") as Beam2D).computeBendingMoment(solver.loadCases[0], 10);

  // 跨中挠度和弯矩与双固结梁经典解析解对比。
  expect(defl.w[5]).toBeCloseTo((1000 * 1 * 1 * 1 * 1) / 384 / 210000e6 / 8.356e-5);
  expect(bm.M[5]).toBeCloseTo((1000 * 1 * 1) / 24);
});
