import * as math from "mathjs";

import { expect, test } from "vitest";
import { LinearStaticSolver } from "./LinearStaticSolver";
import { Beam2D, DofID } from ".";

// 悬臂梁端部同时承受轴向力和竖向力，验证固定端反力是否满足静力平衡。
test("Simple cantilever", () => {
  const solver = new LinearStaticSolver();

  // 节点 1 固结，节点 2 自由，构成典型悬臂梁模型。
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz, DofID.Ry]);
  solver.domain.createNode(2, [2, 0, 0]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [false, false]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 210000e6 / (2 * (1 + 0.2)), alpha: 1.0, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createNodalLoad(2, [1000, 0, 0, 0, 0, 0]);
  solver.loadCases[0].createNodalLoad(2, [0, 0, 2000, 0, 0, 0]);

  solver.solve();

  const reactions = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;

  // 反力与反弯矩应分别平衡外部轴力、剪力和力矩。
  expect(reactions.get([0])).toBe(-1000);
  expect(reactions.get([1])).toBe(-2000);
  expect(reactions.get([2])).toBe(4000);
});

// 双端铰梁只承受轴向节点荷载，验证端部释放后凝聚单元仍能给出正确轴力。
test("Simply supported beam - condensed", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz]);
  solver.domain.createNode(2, [2, 0, 0], [DofID.Dz]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [true, true]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 210000e6 / (2 * (1 + 0.2)), alpha: 1.0, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createNodalLoad(2, { [DofID.Dx]: 1000 });

  solver.solve();

  const reactions = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;

  expect(reactions.get([0])).toBe(-1000);
  expect(reactions.get([1])).toBe(0);

  const e1 = solver.domain.getElement("1") as Beam2D;
  const N = e1.computeNormalForceAt(solver.loadCases[0], 1);

  // 梁内轴力在任意截面都应保持为常值 1000 N。
  expect(N).toBe(1000);
});

// 单端释放时，仍应保持与纯轴向问题一致的反力和轴力分布。
test("Simply supported beam - condensed 2", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz]);
  solver.domain.createNode(2, [2, 0, 0], [DofID.Dz]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [false, true]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 210000e6 / (2 * (1 + 0.2)), alpha: 1.0, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createNodalLoad(2, { [DofID.Dx]: 1000 });

  solver.solve();

  const reactions = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;

  expect(reactions.get([0])).toBe(-1000);
  expect(reactions.get([1])).toBe(0);

  const e1 = solver.domain.getElement("1") as Beam2D;
  const N = e1.computeNormalForceAt(solver.loadCases[0], 1);

  expect(N).toBe(1000);
});

// 另一端释放的镜像场景，验证起点铰接时凝聚处理同样正确。
test("Simply supported beam - condensed 3", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz]);
  solver.domain.createNode(2, [2, 0, 0], [DofID.Dz]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [true, false]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 210000e6 / (2 * (1 + 0.2)), alpha: 1.0, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createNodalLoad(2, { [DofID.Dx]: 1000 });

  solver.solve();

  const reactions = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;

  expect(reactions.get([0])).toBe(-1000);
  expect(reactions.get([1])).toBe(0);

  const e1 = solver.domain.getElement("1") as Beam2D;
  const N = e1.computeNormalForceAt(solver.loadCases[0], 1);

  expect(N).toBe(1000);
});
