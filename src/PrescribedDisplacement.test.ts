import * as math from "mathjs";

import { expect, test } from "vitest";
import { LinearStaticSolver } from "./LinearStaticSolver";
import { Beam2D, DofID } from ".";

// 通过中间节点施加规定位移，验证规定位移会被正确装配为等效内力并传递到相邻单元。
test("1 uknown - Cantilever-hinge", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz, DofID.Ry]);
  solver.domain.createNode(2, [3, 0, 0], [DofID.Dx, DofID.Dz]);
  solver.domain.createNode(3, [3, 2, 0], [DofID.Dx, DofID.Dz, DofID.Ry]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [false, true]);
  solver.domain.createBeam2D("2", [2, 3], 1, 1, [true, false]);

  solver.domain.createMaterial("1", { e: 1000e6, g: 210000e6 / (2 * (1 + 0.2)), alpha: 1.0, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 0.48, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createPrescribedDisplacement(2, { [DofID.Dx]: 0.001 });

  solver.solve();

  // 根据 N / A = E * eps，可得轴力 N = EA * ΔL / L。
  const reactions1 = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;
  const reactions2 = solver.domain.getNode(2).getReactions(solver.loadCases[0]).values as math.Matrix;

  // 左侧单元长度为 3 m，因此理论反力为 EA * 0.001 / 3。
  expect(reactions1.get([0])).toBe((-1000e6 * 0.48 * 0.001) / 3);
});
