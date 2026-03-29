import * as math from "mathjs";

import { expect, test } from "vitest";
import { LinearStaticSolver } from "./LinearStaticSolver";
import { DofID } from ".";

// 悬臂梁承受均匀温升且无温度梯度时，只应产生自由热伸长，不应出现约束反力。
test("Cantilever - uniform temperature change", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz, DofID.Ry]);
  solver.domain.createNode(2, [2, 0, 0]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [false, false]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 210000e6 / (2 * (1 + 0.2)), alpha: 12e-6, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  // values = [平均温升, 上缘温度, 下缘温度]。
  // 这里上缘和下缘只体现均匀温升，不产生附加热弯矩。
  solver.loadCases[0].createBeamTemperatureLoad("1", [100, 200, 0]);

  solver.solve();

  const reactions = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;
  const unknowns = solver.domain
    .getNode(2)
    .getUnknowns(solver.loadCases[0], [DofID.Dx, DofID.Dz, DofID.Ry]) as math.Matrix;

  // 自由端允许自由伸长，因此固定端不应出现反力或反弯矩。
  expect(reactions.get([0])).toBeCloseTo(0);
  expect(reactions.get([1])).toBeCloseTo(0);
  expect(reactions.get([2])).toBeCloseTo(0);

  // 轴向伸长应满足 ΔL = alpha * ΔT * L。
  expect(unknowns.get([0])).toBeCloseTo(2 * 12e-6 * 100, 6);
  expect(unknowns.get([1])).toBeCloseTo(0);
  expect(unknowns.get([2])).toBeCloseTo(0);
});
