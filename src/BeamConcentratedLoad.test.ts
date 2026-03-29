import { Beam2D } from "./Beam2D";
import * as math from "mathjs";

import { expect, test } from "vitest";
import { LinearStaticSolver } from "./LinearStaticSolver";
import { DofID } from ".";

// 局部坐标系下的集中横向力，验证等效节点力、反力、位移和内力结果。
test("Simply supported beam - concentrated load", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz]);
  solver.domain.createNode(2, [4, 0, 0], [DofID.Dz]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [true, true]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 8.75e10, alpha: 12e-6, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createBeamConcentratedLoad("1", [0, 100000, 0, 1], true);

  solver.solve();

  const reactions1 = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;
  const reactions2 = solver.domain.getNode(2).getReactions(solver.loadCases[0]).values as math.Matrix;

  // 4 m 简支梁上 1 m 处施加 100 kN 集中力，理论支反力应为 75/25 kN 分配。
  expect(reactions1.get([0])).toBeCloseTo(0);
  expect(reactions1.get([1])).toBeCloseTo(-75000);

  // 右端只有一个受约束自由度，因此返回值会退化成 number。
  expect(reactions2).toBeCloseTo(-25000);

  const beam = solver.domain.getElement("1") as Beam2D;
  const deflection = beam.computeGlobalDefl(solver.loadCases[0], 2);
  const M = beam.computeBendingMoment(solver.loadCases[0], 2);
  const N = beam.computeNormalForce(solver.loadCases[0], 2);
  const V = beam.computeShearForce(solver.loadCases[0], 2);

  expect(deflection.w[1]).toBeCloseTo(5.2239e-3);
  expect(deflection.u[1]).toBeCloseTo(0);
  expect(M.M[1]).toBeCloseTo(50000);
  expect(N.N[1]).toBeCloseTo(0);
  expect(V.V[1]).toBeCloseTo(-25000);
});

// 整体坐标系输入的集中力，验证荷载旋转到局部坐标系后结果仍正确。
test("Simply supported beam - concentrated load - GCS", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz]);
  solver.domain.createNode(2, [3, 0, Math.sqrt(7)], [DofID.Dz]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [true, true]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 8.75e10, alpha: 12e-6, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createBeamConcentratedLoad("1", [0, 100000, 0, 2], false);

  solver.solve();

  const reactions1 = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;
  const reactions2 = solver.domain.getNode(2).getReactions(solver.loadCases[0]).values as math.Matrix;

  // 当前几何和荷载布置下，整体坐标系中的竖向分量应对两端产生相同反力。
  expect(reactions1.get([0])).toBeCloseTo(0);
  expect(reactions1.get([1])).toBeCloseTo(-50000);

  // 同样地，右端由于只存在一个支承自由度，结果类型是标量。
  expect(reactions2).toBeCloseTo(-50000);

  const beam = solver.domain.getElement("1") as Beam2D;
  const deflection = beam.computeGlobalDefl(solver.loadCases[0], 2);
  const M = beam.computeBendingMoment(solver.loadCases[0], 2);
  //const N = beam.computeNormalForce(solver.loadCases[0], 2);
  //const V = beam.computeShearForce(solver.loadCases[0], 2);

  // 跨中位移和弯矩主要用来确认坐标变换后仍落在合理理论值附近。
  expect(deflection.w[1]).toBeCloseTo(5.2239e-3);
  expect(deflection.u[1]).toBeCloseTo(0);
  expect(M.M[1]).toBeCloseTo(50000 * 1.5);

  //expect(N.N[1]).toBeCloseTo(0);
  //expect(V.V[1]).toBeCloseTo(-25000);
});
