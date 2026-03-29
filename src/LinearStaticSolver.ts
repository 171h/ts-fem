import * as math from "mathjs";

import { Solver } from ".";

/**
 * 线性静力有限元求解器。
 *
 * 求解对象满足经典线弹性平衡方程：
 * K r = F
 * 其中未知自由度与规定位移自由度采用统一编号并在整体矩阵中分块处理。
 */
export class LinearStaticSolver extends Solver {
  assemble() {
    // 初始化整体刚度矩阵 K。
    // 维度包含自由自由度和规定位移自由度，因此总维度为 neq + pneq。
    this.k = math.zeros(this.neq + this.pneq, this.neq + this.pneq) as math.Matrix;

    // 组装整体刚度矩阵：将每个单元刚度矩阵按定位向量累加到整体矩阵中。
    for (const [num, el] of this.domain.elements) {
      const estiff = el.computeStiffness();
      const loc = el.getLocationArray() as [];
      const ndofs = math.size(loc)[0];

      for (let r = 0; r < ndofs; r++) {
        const rc = loc[r];
        for (let c = 0; c < ndofs; c++) {
          const cc = loc[c];
          // K[rc, cc] += Ke[r, c]
          this.k.set([rc, cc], this.k.get([rc, cc]) + estiff.get([r, c]));
        }
      }
    }

    // 初始化载荷矩阵 F。
    // 每一列对应一个载荷工况，每一行对应一个全局自由度编号。
    this.f = math.zeros(this.neq + this.pneq, this.loadCases.length) as math.Matrix;
    for (let i = 0; i < this.loadCases.length; i++) {
      // r 用于保存当前载荷工况下的总位移向量，先置零，后续未知位移和规定位移都写入这里。
      this.loadCases[i].r = math.zeros(this.neq + this.pneq) as math.Matrix;
      const lc = this.loadCases[i];

      // 组装节点荷载到整体载荷矩阵第 i 列。
      for (const load of lc.nodalLoadList) {
        this.assembleVecLC(this.f, load.getLoadVector(), load.getLocationArray(), i);
      }

      // 组装单元等效节点荷载到整体载荷矩阵第 i 列。
      for (const load of lc.elementLoadList) {
        this.assembleVecLC(this.f, load.getLoadVector(), load.getLocationArray(), i);
      }

      // 组装规定位移向量。
      // 这些位移对应的是已知自由度值，在后续求解时会转化为右端项修正。
      for (const dbc of lc.prescribedBC) {
        this.assembleVec(lc.r, dbc.getNodePrescribedDisplacementVector(), dbc.getLocationArray());
      }
    }
  }

  solve() {
    const startime = new Date();
    if (!this.codeNumberGenerated) {
      // 仅在首次求解时生成全局自由度编号。
      this.generateCodeNumbers();
    }

    // unknowns: 未知自由度区间 [0, neq)
    // prescribed: 规定位移自由度区间 [neq, neq + pneq)
    const unknowns = math.range(0, this.neq);
    const prescribed = math.range(this.neq, this.neq + this.pneq);

    this.assemble();
    if (this.neq > 0) {
      for (let lc = 0; lc < this.loadCases.length; lc++) {
        this.loadCases[lc].solved = false;

        // 提取规定位移子向量 rp。
        const rp = math.subset(this.loadCases[lc].r, math.index(prescribed));

        // 由规定位移引入的等效右端项：Kup * rp
        // 对应分块方程 Kuu * ru + Kup * rp = fu。
        const fp = math.multiply(math.subset(this.k, math.index(unknowns, prescribed)), rp) as math.Matrix;

        // 提取待求解的自由自由度刚度子矩阵 Kuu。
        let ksolve = math.subset(this.k, math.index(unknowns, unknowns));

        // 当未知自由度只有 1 个时，mathjs 可能返回标量，这里统一转成矩阵格式便于后续调用。
        if (typeof ksolve === "number") {
          ksolve = math.matrix([[ksolve]]);
        }

        // 提取当前工况下自由自由度对应的外载荷向量 fu。
        let bsolve = math.subset(this.f, math.index(unknowns, [lc]));

        if (typeof bsolve === "number") {
          bsolve = math.matrix([bsolve]);
        }

        // 分块方程整理后得到：Kuu * ru = fu - Kup * rp
        const b = math.subtract(math.squeeze(bsolve), fp) as math.Matrix;

        // 求解未知位移 ru。
        const ru = math.squeeze(math.lusolve(ksolve, b));

        // 将求得的未知位移写回总位移向量前 neq 个位置。
        this.loadCases[lc].r = math.subset(this.loadCases[lc].r, math.index(math.range(0, this.neq)), ru);

        // 计算约束反力。
        // 先按完整平衡方程 K * r 计算节点内力，再减去该位置已施加的外荷载，得到支反力。
        this.loadCases[lc].R = math.subset(math.multiply(this.k, this.loadCases[lc].r), math.index(prescribed));

        // 扣除约束自由度位置上的外部荷载贡献，得到净反力。
        this.loadCases[lc].R = math.subtract(
          this.loadCases[lc].R,
          math.squeeze(math.subset(this.f, math.index(prescribed, [lc])))
        ) as math.Matrix;

        this.loadCases[lc].solved = true;
      }
    } else {
      // 特殊情况：所有自由度都被约束，不需要求解未知位移，只需计算反力。
      for (let lc = 0; lc < this.loadCases.length; lc++) {
        // 此时总位移向量仅由规定位移构成，直接代入 K * r 计算内力。
        this.loadCases[lc].R = math.squeeze(math.multiply(this.k, this.loadCases[lc].r));

        // 同样扣除外荷载，得到最终支反力。
        this.loadCases[lc].R = math.subtract(
          this.loadCases[lc].R,
          math.squeeze(math.subset(this.f, math.index(prescribed, [lc])))
        ) as math.Matrix;

        this.loadCases[lc].solved = true;
      }
    }

    const endtime = new Date();
    const timediff = endtime.getTime() - startime.getTime();
    console.log("Solution took ", Math.round(timediff * 100) / 100, " [ms]");
  }
}
