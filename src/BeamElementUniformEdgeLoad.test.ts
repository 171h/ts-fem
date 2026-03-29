import { Beam2D } from "./Beam2D";
import * as math from "mathjs";

import { expect, test } from "vitest";
import { LinearStaticSolver } from "./LinearStaticSolver";
import { DofID } from ".";

// 简支梁承受局部坐标系下的均布轴向力和横向力，验证反力、位移及内力图。
test("Simply supported beam (condensed) - UDL", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz]);
  solver.domain.createNode(2, [4, 0, 0], [DofID.Dz]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [true, true]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 8.75e10, alpha: 12e-6, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createBeamElementUniformEdgeLoad("1", [10000, 100000], true);

  solver.solve();

  const reactions1 = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;
  const reactions2 = solver.domain.getNode(2).getReactions(solver.loadCases[0]).values as math.Matrix;

  // 起点节点同时承担全部轴向合力以及一半横向合力。
  expect(reactions1.get([0])).toBeCloseTo(-10000 * 4);
  expect(reactions1.get([1])).toBeCloseTo(-200000);

  const beam = solver.domain.getElement("1") as Beam2D;
  const deflection = beam.computeGlobalDefl(solver.loadCases[0], 2);
  const M = beam.computeBendingMoment(solver.loadCases[0], 2);
  const N = beam.computeNormalForce(solver.loadCases[0], 2);
  const V = beam.computeShearForce(solver.loadCases[0], 2);

  // 跨中挠度、弯矩和轴力采用经典简支梁解析解作为校验基准。
  expect(deflection.w[1]).toBeCloseTo((5 * (100000 * 4 * 4 * 4 * 4)) / 384 / 210000e6 / 8.356e-5);
  expect(deflection.u[1]).toBeCloseTo(0);

  expect(M.M[0]).toBeCloseTo(0);
  expect(M.M[2]).toBeCloseTo(0);
  expect(M.M[1]).toBeCloseTo((1 / 8) * 100000 * 4 * 4);
  expect(N.N[1]).toBeCloseTo((10000 * 4) / 2);
  expect(V.V[1]).toBeCloseTo(0);
});
