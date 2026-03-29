import * as math from "mathjs";

import * as luqr from "luqr";

import { Domain, LoadCase, DofID, Solver } from ".";

/**
 * 结构动力问题的特征值求解器。
 *
 * 求解广义特征值问题：
 * K phi = omega^2 M phi
 * 其中 omega 为圆频率，phi 为振型向量。
 */
export class EigenValueDynamicSolver extends Solver {
  /** 希望输出的模态数 */
  n = 10;
  /** 特征值迭代收敛容限 */
  tol = 1e-12;

  constructor() {
    super();
  }

  assemble() {
    // 初始化整体刚度矩阵 K 和整体质量矩阵 M。
    this.k = math.zeros(this.neq + this.pneq, this.neq + this.pneq) as math.Matrix;
    this.m = math.zeros(this.neq + this.pneq, this.neq + this.pneq) as math.Matrix;

    // 特征值分析只使用默认载荷工况，用它来存储模态结果。
    this.loadCases[0].r = math.zeros(this.neq + this.pneq) as math.Matrix;
    this.loadCases[0].eigenVectors = [];
    this.loadCases[0].eigenNumbers = [];

    // 遍历所有单元，同时组装整体刚度矩阵和整体质量矩阵。
    for (const [num, el] of this.domain.elements) {
      const estiff = el.computeStiffness();
      const emass = el.computeMassMatrix();
      const loc = el.getLocationArray() as [];
      const ndofs = math.size(loc)[0];

      for (let r = 0; r < ndofs; r++) {
        const rc = loc[r];
        for (let c = 0; c < ndofs; c++) {
          const cc = loc[c];
          // K[rc, cc] += Ke[r, c]
          this.k.set([rc, cc], this.k.get([rc, cc]) + estiff.get([r, c]));
          // M[rc, cc] += Me[r, c]
          this.m.set([rc, cc], this.m.get([rc, cc]) + emass.get([r, c]));
        }
      }
    }
  }

  solve() {
    this.loadCases[0].solved = false;

    const startime = new Date();
    if (!this.codeNumberGenerated) {
      // 生成全局自由度编号，保证自由自由度位于矩阵前部。
      this.generateCodeNumbers();
    }

    // 特征值分析通常仅对自由自由度子系统进行。
    const unknowns = math.range(0, this.neq);
    this.assemble();

    // 提取自由自由度子矩阵 Kuu 和 Muu，约束自由度不参与振动模态求解。
    const kk = math.subset(this.k, math.index(unknowns, unknowns)) as math.Matrix;
    const mm = math.subset(this.m, math.index(unknowns, unknowns)) as math.Matrix;

    // 将广义特征值问题转化为标准迭代形式。
    // 由 K phi = omega^2 M phi 可得 K^-1 M phi = (1 / omega^2) phi。
    // 因此对 K^-1 M 做幂迭代，可得到 1 / omega^2 最大的特征值，
    // 也就是 omega^2 最小的模态，符合结构动力分析中对低阶模态优先的需求。
    const kinv = math.inv(kk);
    const mkinv = math.multiply(kinv, mm);

    const endtime1 = new Date();
    const timediff2 = (endtime1.getTime() - startime.getTime()) / 1000;
    console.log("Matrix inverse took ", Math.round(timediff2 * 100) / 100, " [sec]");

    // evs 保存已找到的模态向量（只含自由自由度部分）。
    const evs = [];

    // 实际求解模态数做了适度放宽，用于后续排序和 Sturm 校核时降低漏模态风险。
    const neigstofind = Math.min(Math.min(this.n * 2, this.n + 8), this.neq);

    for (let i = 0; i < neigstofind; i++) {
      const startime2 = new Date();
      let nits = 0;
      // rho / newrho 存储当前 Rayleigh 商近似，对应当前模态的 omega^2。
      let rho = 0;
      let newrho = 1e32;

      // 初始迭代向量。所有分量先置 1，后续再做质量矩阵意义下的归一化。
      let x = math.ones(this.neq) as math.Matrix;

      if (i > 0) {
        // 对后续模态，尝试在前一阶模态的最大分量位置置零，
        // 作为简单扰动，降低再次收敛到同一模态的概率。
        const max = evs[i - 1]._data.reduce(
          (a, b, i) => (Math.abs(a[0]) < Math.abs(b) ? [b, i] : a),
          [Number.MIN_VALUE, -1]
        );

        x.set([max[1]], 0.0);
      }

      // 按质量矩阵定义进行归一化，使 x^T M x = 1。
      x = math.divide(
        x,
        Math.sqrt(math.multiply(math.multiply(math.transpose(x), mm), x) as math.Matrix as unknown as number)
      ) as math.Matrix;

      // 使用 M-内积下的 Gram-Schmidt 正交化，
      // 将当前初始向量对已求得模态做正交投影，避免重复收敛到旧模态。
      let dx = math.zeros(this.neq) as math.Matrix;
      for (let j = 0; j < evs.length; j++) {
        const c = math.multiply(math.multiply(math.transpose(evs[j]), mm), x) as unknown as number;
        dx = math.add(dx, math.multiply(c, evs[j])) as math.Matrix;
      }
      x = math.subtract(x, dx) as math.Matrix;

      /*x.set([0], 1.5772135732480559);
            x.set([1], 2.047126243079172e-8);
            x.set([2], -0.000019010897757014402);
            x.set([3], 1.5773875149616394);
            x.set([4], -3.098147895542957e-8);
            x.set([5], 1.5775614488843603);*/

      // 采用带正交化约束的幂迭代 / 子空间迭代思路求当前模态。
      // 至少执行 3 次，最多 100 次，并依据 Rayleigh 商相对变化控制收敛。
      while ((Math.abs(newrho - rho) / newrho > this.tol && nits < 100) || nits < 3) {
        rho = newrho;

        // newx = K^-1 M x
        // 对应标准特征值问题 A x = lambda x，其中 A = K^-1 M。
        const newx = math.squeeze(math.multiply(mkinv, x)) as math.Matrix;

        // divisor = newx^T M newx，用于后续归一化。
        const divisor = math.dot(newx, math.multiply(mm, newx));

        // 基于当前迭代向量更新 Rayleigh 商，近似得到 omega^2。
        newrho = math.dot(newx, math.multiply(mm, x) as math.Matrix) / divisor;

        // 继续按质量矩阵意义归一化。
        x = math.divide(newx, Math.sqrt(divisor)) as math.Matrix;

        // 再次做 M-正交化，保证当前模态与先前模态保持正交。
        let dx = math.zeros(this.neq) as math.Matrix;
        for (let j = 0; j < evs.length; j++) {
          const c = math.dot(evs[j], math.multiply(mm, x));
          dx = math.add(dx, math.multiply(c, evs[j])) as math.Matrix;
        }

        x = math.subtract(x, dx) as math.Matrix;

        nits++;
      }

      // 当前模态收敛后，保存自由自由度部分的振型。
      x = math.squeeze(x);
      evs.push(x);

      // 保存特征值 omega^2。
      this.loadCases[0].eigenNumbers.push(newrho);

      // 扩展为完整自由度向量：自由自由度部分填入模态，约束自由度保持为 0。
      let fullvec = math.zeros(this.neq + this.pneq);
      fullvec = math.subset(fullvec, math.index(math.range(0, this.neq)), x) as math.Matrix;
      this.loadCases[0].eigenVectors.push(fullvec);

      const endtime3 = new Date();
      const timediff3 = (endtime3.getTime() - startime2.getTime()) / 1000;
      console.log("Mode " + (i + 1) + " took ", Math.round(timediff3 * 100) / 100, " [sec]");
    }

    /*console.log('kontrola ortogonality');
        for(let i =0; i < evs.length; i++) {
            for(let j =i+1; j < evs.length; j++) {
                const err = math.multiply(math.transpose(evs[i]), evs[j]) as unknown as number;
                console.log(`${i}-${j} err=${err}`)
            }
        }*/

    // 由于迭代和初值扰动的存在，得到的模态顺序未必严格按频率升序排列，
    // 这里按特征值 omega^2 升序重排模态和振型。
    const indices = Array.from(this.loadCases[0].eigenNumbers.keys());
    indices.sort((a, b) => this.loadCases[0].eigenNumbers[a] - this.loadCases[0].eigenNumbers[b]);
    (this.loadCases[0].eigenNumbers = indices.map((i) => this.loadCases[0].eigenNumbers[i])),
      (this.loadCases[0].eigenVectors = indices.map((i) => this.loadCases[0].eigenVectors[i]));

    // 输出各阶模态的频率信息，便于快速检查结果。
    for (const i of this.loadCases[0].eigenNumbers) {
      console.log(`omega2=${i}, f=${Math.sqrt(i) / (2 * Math.PI)}`);
    }

    // Sturm 序列校核：用于检查在 [0, maxOmega] 区间内是否遗漏模态。
    // maxOmega 取目标模态数范围内最后一个特征值。
    const nwantedeigs = Math.min(this.n, this.neq);
    const maxOmega = this.loadCases[0].eigenNumbers[nwantedeigs - 1];
    const ldl = luqr.luqr.decomposeLDL((math.subtract(kk, math.multiply(maxOmega, mm)) as math.Matrix).toArray());

    // 对 K - maxOmega * M 做 LDL^T 分解。
    // D 中负对角元的个数等于小于 maxOmega 的特征值个数，
    // 可据此判断是否漏求了前 nwantedeigs 阶模态。

    if (ldl) {
      var nneg = ldl.d.filter(function (e) {
        return e < 1e-6;
      }).length;

      const missing = nneg - nwantedeigs + 1;
      console.log(
        "Sturm control sequence: " + nneg + ", found " + nwantedeigs + " (" + neigstofind + "), missing " + missing
      );
    }

    const endtime = new Date();
    const timediff = (endtime.getTime() - startime.getTime()) / 1000;
    console.log("Solution took ", Math.round(timediff * 100) / 100, " [sec]");

    this.loadCases[0].solved = true;

    // 返回 Sturm 校核计数；若分解失败，则退化返回目标模态数。
    if (!ldl) return this.n;

    return nneg;
  }
}
