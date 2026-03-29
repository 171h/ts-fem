import * as math from "mathjs";
import { Domain } from "./Domain";
import { LoadCase } from "./LoadCase";
import { DofID, LabelType } from ".";
import { Element } from "./Element";

/**
 * 二维 Timoshenko 梁单元（x-z 平面）。
 * 单元节点自由度为 [Dx, Dz, Ry]，支持端部铰接释放、局部坐标系变换和质量矩阵计算。
 */
export class Beam2D extends Element {
  hinges: [boolean, boolean]; // 标记起点和终点是否存在弯矩释放

  // false 时使用一致质量矩阵，true 时使用集中质量矩阵。
  diagonalMassMatrix = false;

  /**
   * Constructor
   * @param label element label (num)
   * @param nodes element nodes
   * @param mat element material (num)
   * @param cs element cross section (num)
   * @param hinges array of two boolean values indicating if hinge is present at start or end
   */
  constructor(
    label: LabelType,
    domain: Domain,
    nodes: Array<LabelType>,
    mat: LabelType,
    cs: LabelType,
    hinges: [boolean, boolean] = [false, false]
  ) {
    super(label, domain, nodes, mat, cs);
    this.hinges = hinges;
  }

  getNodeDofs(node: LabelType): Array<DofID> {
    return [DofID.Dx, DofID.Dz, DofID.Ry];
  }

  getLocationArray() {
    // 梁单元两端节点都使用 [Dx, Dz, Ry] 三个自由度，
    // 定位向量顺序即为单元局部矩阵/向量的自由度顺序。
    let loc = Array<number>();
    for (const n of this.nodes) {
      //console.log("Element ", this.label, "Node ", n, "loc:", solver.getNodeLocationArray(n, [DofID.Dx, DofID.Dz, DofID.Ry]));
      loc = loc.concat(this.domain.solver.getNodeLocationArray(n, [DofID.Dx, DofID.Dz, DofID.Ry]));
    }
    return loc;
  }

  /**
    * 计算单元几何信息。
    * 返回长度 l 以及单元在整体 x、z 方向上的投影 dx、dz。
   */
  computeGeo() {
    const c1: Array<number> = this.domain.getNode(this.nodes[0]).coords;
    const c2: Array<number> = this.domain.getNode(this.nodes[1]).coords;
    const dx: number = c2[0] - c1[0];
    const dz: number = c2[2] - c1[2];
    const l: number = Math.sqrt(dx * dx + dz * dz);
    return { l: l, dx: dx, dz: dz };
  }
  /**
   * 判断单元任一端是否存在弯矩释放。
   */
  hasHinges() {
    return this.hinges[0] || this.hinges[1];
  }
  /**
   * 计算单元从节点/整体坐标系到单元局部坐标系的变换矩阵。
   * 若节点定义了局部坐标系，则还会额外叠乘节点局部坐标系到整体坐标系的变换。
   */
  computeT(): math.Matrix {
    const geo = this.computeGeo();
    const c: number = geo.dx / geo.l;
    const s: number = geo.dz / geo.l;
    let t = math.matrix([
      [c, s, 0, 0, 0, 0],
      [-s, c, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, c, s, 0],
      [0, 0, 0, -s, c, 0],
      [0, 0, 0, 0, 0, 1],
    ]); // rl = t*rg;

    if (this.domain.getNode(this.nodes[0]).hasLcs() || this.domain.getNode(this.nodes[1]).hasLcs()) {
      // 先构造“节点局部 -> 整体”的块对角变换矩阵，再与单元方向变换相乘。
      let T_n2g = math.zeros(6); // rg = T_n2g rn
      T_n2g = math.subset(
        T_n2g,
        math.index([0, 1, 2], [0, 1, 2]),
        this.domain.getNode(this.nodes[0]).getTransformationMtrx(this.getNodeDofs(this.nodes[0]))
      );
      T_n2g = math.subset(
        T_n2g,
        math.index([3, 4, 5], [3, 4, 5]),
        this.domain.getNode(this.nodes[1]).getTransformationMtrx(this.getNodeDofs(this.nodes[1]))
      );
      t = math.multiply(t, T_n2g);
    }
    return t;
  }
  /**
    * 计算梁单元局部刚度矩阵。
    * 当存在端部铰接时，会通过静力凝聚消去释放弯矩自由度。
   */
  computeLocalStiffnessMtrx(retCondenseSubMats: boolean = false) {
    const geo = this.computeGeo();
    const mat = this.getMaterial();
    const cs = this.getCS();

    const ea = mat.e * cs.a;
    const eiy = mat.e * cs.iy;
    const l = geo.l;
    const l2 = l * l;
    const l3 = l2 * l;
    const fi = (12 * eiy) / (cs.k * mat.g * cs.a * l * l);
    const fi1 = 1 + fi;

    // Timoshenko 梁局部刚度矩阵。
    // 其中 fi 为剪切变形修正项；当剪切刚度趋于无穷时可退化接近 Euler-Bernoulli 梁。
    const answer = math.matrix([
      [ea / l, 0, 0, -ea / l, 0, 0],
      [0, (12 * eiy) / l3 / fi1, (-6 * eiy) / l2 / fi1, 0, (-12 * eiy) / l3 / fi1, (-6 * eiy) / l2 / fi1],
      [0, (-6 * eiy) / l2 / fi1, ((4 + fi) * eiy) / l / fi1, 0, (6 * eiy) / l2 / fi1, ((2 - fi) * eiy) / l / fi1],
      [-ea / l, 0, 0, ea / l, 0, 0],
      [0, (-12 * eiy) / l3 / fi1, (6 * eiy) / l2 / fi1, 0, (12 * eiy) / l3 / fi1, (6 * eiy) / l2 / fi1],
      [0, (-6 * eiy) / l2 / fi1, ((2 - fi) * eiy) / l / fi1, 0, (6 * eiy) / l2 / fi1, ((4 + fi) * eiy) / l / fi1],
    ]);

    // 若端部存在铰接，需要对释放弯矩自由度做静力凝聚。
    // a: 保留自由度索引；b: 被消去的释放弯矩自由度索引。
    if (this.hasHinges()) {
      if (this.hinges[0] && this.hinges[1]) {
        var a = [0, 1, 3, 4];
        var b = [2, 5];
      } else if (this.hinges[0]) {
        var a = [0, 1, 3, 4, 5];
        var b = [2];
      } else if (this.hinges[1]) {
        var a = [0, 1, 2, 3, 4];
        var b = [5];
      }
      const kaa = answer.subset(math.index(a, a));
      const kab = answer.subset(math.index(a, b));
      const kbb = answer.subset(math.index(b, b));

      // Kcond = Kaa - Kab * Kbb^-1 * Kba
      const k2 = math.subtract(kaa, math.multiply(math.multiply(kab, math.inv(kbb)), math.transpose(kab)));

      let answer2 = math.zeros(6, 6);
      answer2 = math.subset(answer2, math.index(a, a), k2);

      if (retCondenseSubMats) {
        return {
          answer: answer2,
          a: a,
          b: b,
          kaa: kaa,
          kab: kab,
          kbb: kbb,
        };
      } else {
        return { answer: answer2 };
      }
    }
    return { answer: answer };
  }
  /**
    * 计算局部初应力矩阵（几何刚度矩阵）。
    * 常用于稳定分析或考虑轴力对弯曲刚度的影响。
   */
  computeLocalInitialStressMtrx(N: number) {
    const geo = this.computeGeo();
    const mat = this.getMaterial();
    const cs = this.getCS();
    const l: number = geo.l;
    const l2: number = l * l;
    const c: number = N / l;

    const fi = (12 * mat.e * cs.iy) / (cs.k * mat.g * cs.a * l * l);
    const fi2 = fi * fi;
    const answer = math.matrix([
      [0, 0, 0, 0, 0, 0],
      [0, 6 / 5 + 2 * fi + fi2, -l / 10, 0, -6 / 5 - 2 * fi - fi2, -l / 10],
      [
        0,
        -l / 10,
        (2 * l2) / 15 + (l2 * fi) / 6 + (l2 * fi2) / 12,
        0,
        l / 10,
        -l2 / 30 - (l2 * fi) / 6 - (l2 * fi2) / 12,
      ],
      [0, 0, 0, 0, 0, 0],
      [0, -6 / 5 - 2 * fi - fi2, l / 10, 0, 6 / 5 + 2 * fi + fi2, l / 10],
      [
        0,
        -l / 10,
        -l2 / 30 - (l2 * fi) / 6 - (l2 * fi2) / 12,
        0,
        l / 10,
        (2 * l2) / 15 + (l2 * fi) / 6 + (l2 * fi2) / 12,
      ],
    ]);
    math.multiply(answer, c / (1 + fi) / (1 + fi));

    const cc = Math.min(Math.abs(answer[1][1]), Math.abs(answer[2][2])) / 1000.0;
    answer[0][0] = cc;
    answer[0][3] = -cc;
    answer[3][0] = -cc;
    answer[3][3] = cc;

    // 若存在端部释放，几何刚度矩阵同样需要按释放自由度做凝聚。
    if (this.hasHinges()) {
      const stiffrec = this.computeLocalStiffnessMtrx(true);
      const asize: number = math.size(stiffrec.a)[0];
      const t = math.zeros(6, asize);

      math.subset(t, math.index(stiffrec.a, math.range(0, asize)), math.identity(asize));
      //print "t:",t``
      //print (-1)*dot(linalg.inv(kbb),kab.transpose())
      //print "ti",t[ix_(b),:]
      math.subset(
        t,
        math.index(stiffrec.b, math.range(0, asize)),
        math.multiply(math.multiply(math.inv(stiffrec.kbb), math.transpose(stiffrec.kab)), -1.0)
      );
      //print "t:",t
      const k2 = math.multiply(math.transpose(t), math.multiply(answer, t));
      const answer2 = math.zeros(6, 6);
      math.subset(stiffrec.a, math.index(stiffrec.a, stiffrec.a), k2);
      return answer2;
      //print answer
    }
    return answer;
  }

  /**
    * 计算局部质量矩阵。
    * 可在一致质量矩阵和集中质量矩阵之间切换。
   */
  computeLocalMassMatrix(retCondenseSubMats: boolean = false) {
    const geo = this.computeGeo();
    const mat = this.getMaterial();
    const cs = this.getCS();

    //var ea = mat.e*cs.a;
    // var eiy = mat.e*cs.iy;
    const l = geo.l;
    const l2 = l * l;
    const l3 = l2 * l;
    //var fi=12.*eiy/(cs.k*mat.g*cs.a*l*l);
    //var fi2= fi*fi;
    /*const M_CT = math.matrix([
            [0, 0, 0, 0, 0, 0],
            [0, 13/35+7/10*fi+1/3*fi2,         (11/210+11/120*fi+1/24*fi2)*l, 0, 9/70+3/10*fi+1/6*fi2,        -(13/420+3/40*fi+1/24*fi2)*l],
            [0, (11/210+11/120*fi+1/24*fi2)*l, (1/105+1/60*fi+1/120*fi2)*l2,  0, (13/420+3/40*fi+1/24*fi2)*l, -(1/140+1/60*fi+1/120*fi2)*l2],
            [0, 0, 0, 0, 0, 0],
            [0, 9/70+3/10*fi+1/6*fi2,          (13/420+3/40*fi+1/24*fi2)*l,   0, 13/35+7/10*fi+1/3*fi2,        (11/210+11/120*fi+1/24*fi2)*l],
            [0, -(13/420+3/40*fi+1/24*fi2)*l,  -(1/140+1/60*fi+1/120*fi2)*l2, 0, (11/210+11/120*fi+1/24*fi2)*l, (1/105+1/60*fi+1/120*fi2)*l2],
        ]);

        const M_CR = math.matrix([
            [0, 0, 0, 0, 0, 0],
            [0, 6/5, (1/10-1/2*fi)*l, 0, -6/5, (1/10-1/2*fi)*l],
            [0, (1/10-1/2*fi)*l, (2/15+1/6*fi+1/3*fi2)*l2, 0, -(1/10-1/2*fi)*l, -(1/30+1/6*fi-1/6*fi2)*l2],
            [0, 0, 0, 0, 0, 0],
            [0, -6/5, -(1/10-1/2*fi)*l, 0, 6/5, -(1/10-1/2*fi)*l],
            [0, (1/10-1/2*fi)*l, -(1/30+1/6*fi-1/6*fi2)*l2, 0, -(1/10-1/2*fi)*l, (2/15+1/6*fi+1/3*fi2)*l2]
        ]);

        return math.add(math.multiply((mat.d*cs.a*l)/((1+fi)*(1+fi)),M_CT), math.multiply(mat.d*cs.iy/((1+fi)*(1+fi)*l),M_CR));*/

    // 一致质量矩阵：更适合动力分析与模态计算。
    if (!this.diagonalMassMatrix)
      return math.multiply(
        (mat.d * cs.a * l) / 420,
        math.matrix([
          [140, 0, 0, 70, 0, 0],
          [0, 156, -22 * l, 0, 54, 13 * l],
          [0, -22 * l, 4 * l * l, 0, -13 * l, -3 * l * l],
          [70, 0, 0, 140, 0, 0],
          [0, 54, -13 * l, 0, 156, 22 * l],
          [0, 13 * l, -3 * l * l, 0, 22 * l, 4 * l * l],
        ])
      );

    // 集中质量矩阵：数值上更简单，但模态精度通常略低。
    const alpha = 1 / 78;
    return math.multiply(
      mat.d * cs.a * l,
      math.matrix([
        [1 / 2, 0, 0, 0, 0, 0],
        [0, 1 / 2, 0, 0, 0, 0],
        [0, 0, alpha * l2, 0, 0, 0],
        [0, 0, 0, 1 / 2, 0, 0],
        [0, 0, 0, 0, 1 / 2, 0],
        [0, 0, 0, 0, 0, alpha * l2],
      ])
    );
  }

  /**
    * 计算整体坐标系下的单元刚度矩阵。
    * 实现方式为 K = T^T * Kl * T。
   */
  computeStiffness() {
    const geo = this.computeGeo();

    const kl = this.computeLocalStiffnessMtrx();
    const t = this.computeT();
    const k = math.multiply(math.multiply(math.transpose(t), kl.answer), t);
    return k;
  }

  /**
    * 计算整体坐标系下的单元质量矩阵。
   */
  computeMassMatrix() {
    const geo = this.computeGeo();

    const ml = this.computeLocalMassMatrix();
    const t = this.computeT();
    const m = math.multiply(math.multiply(math.transpose(t), ml), t);
    return m;
  }

  /**
    * 计算整体坐标系下的初应力矩阵。
   */
  computeInitialStressMatrix(N: number) {
    const kl = this.computeLocalInitialStressMtrx(N);
    const t = this.computeT();
    const k = math.multiply(math.multiply(math.transpose(t), kl), t);
    return k;
  }

  /**
    * 计算单元端部位移向量，并转换到单元局部坐标系。
    * 若存在端部释放，还会把被凝聚掉的释放自由度位移反算出来。
   */
  computeEndDisplacement(lc: LoadCase) {
    const t = this.computeT();
    const loc = this.getLocationArray();
    let rloc = math.multiply(t, math.subset(lc.r, math.index(loc)));

    if (this.hasHinges()) {
      const stiffrec = this.computeLocalStiffnessMtrx(true);
      let bl = math.zeros(6);

      // 把作用在该单元上的所有荷载固定端等效节点力累加起来，
      // 用于恢复释放自由度上的位移。
      for (const load of lc.getElementLoadsOnElement(this.label)) {
        bl = math.add(bl, load.getLoadVectorForClampedBeam()) as number[];
      }
      if (this.hasHinges()) {
        // re[ix_(b)] = dot(linalg.inv(kbb), -bl[ix_(b)] - dot(kab.transpose(), re[ix_(a)] ) )

        rloc = math.subset(
          rloc,
          math.index(stiffrec.b),
          math.multiply(
            math.inv(stiffrec.kbb),
            math.multiply(
              math.add(
                math.subset(bl, math.index(stiffrec.b)),
                math.squeeze(math.multiply(math.transpose(stiffrec.kab), math.subset(rloc, math.index(stiffrec.a))))
              ),
              -1.0
            )
          )
        );
      }
    }
    return rloc;
  }

  /**
    * 计算单元端力向量，并转换到单元局部坐标系。
    * 结果由单元刚度贡献和单元荷载固定端力共同组成。
   */
  computeEndForces(lc: LoadCase) {
    const t = this.computeT();
    const loc = this.getLocationArray();
    const re = math.multiply(t, math.subset(lc.r, math.index(loc)));

    const stiffrec = this.computeLocalStiffnessMtrx(true);
    let fe = math.multiply(stiffrec.answer, re) as math.Matrix;

    let bl = math.zeros(6) as math.Matrix;

    // 累加该单元上所有单元荷载对应的固定端节点力。
    for (const load of lc.getElementLoadsOnElement(this.label)) {
      bl = math.add(bl, load.getLoadVectorForClampedBeam()) as math.Matrix;
    }

    if (this.hasHinges()) {
      // 对存在释放的情况，仅保留凝聚后的自由度内力贡献。

      const h1 = math.multiply(stiffrec.kab, math.inv(stiffrec.kbb));

      if (stiffrec.b.length == 1) {
        const blv = bl.get(stiffrec.b);
        for (let i = 0; i < stiffrec.a.length; i++) {
          fe.set([stiffrec.a[i]], fe.get([stiffrec.a[i]]) + bl.get([stiffrec.a[i]]) - h1.get([i, 0]) * blv);
        }
      } else {
        const help = math.subtract(
          math.subset(bl, math.index(stiffrec.a)),
          math.multiply(h1, math.subset(bl, math.index(stiffrec.b)))
        );

        fe = math.add(fe, math.subset(fe, math.index(stiffrec.a), help));
        //fe = math.subset(fe, math.index(stiffrec.a), fe);
      }
    } else {
      fe = math.add(fe, bl) as math.Matrix;
    }
    return fe;
  }

  /**
    * 计算单元局部坐标系下的位移曲线。
    * 结果由单元端位移插值项与单元荷载解析附加项两部分组成。
   */
  computeLocalDefl(lc: LoadCase, nseg: number) {
    const rl = this.computeEndDisplacement(lc);
    const u: number[] = [];
    const w: number[] = [];
    const geo = this.computeGeo();
    const l = geo.l;

    const eloads = lc.getElementLoadsOnElement(this.label);
    for (let iseg = 0; iseg <= nseg; iseg++) {
      const xl = iseg / nseg; // [0,1]

      // 先按 Hermite 形函数插值得到由端位移引起的位移场。
      let wl =
        (1.0 - 3.0 * xl * xl + 2.0 * xl * xl * xl) * rl.get([1]) +
        l * (-xl + 2.0 * xl * xl - xl * xl * xl) * rl.get([2]) +
        (3.0 * xl * xl - 2.0 * xl * xl * xl) * rl.get([4]) +
        l * (xl * xl - xl * xl * xl) * rl.get([5]);
      let ul = (1 - xl) * rl.get([0]) + xl * rl.get([3]);

      // 再叠加各类单元荷载对精确位移曲线的解析贡献。
      for (const load of eloads) {
        const c = load.computeBeamDeflectionContrib(xl);
        wl += c.w;
        ul += c.u;
      }
      u.push(ul);
      w.push(wl);
    }
    return { u: u, w: w };
  }

  /**
    * 将局部位移曲线旋转到整体坐标系下。
   */
  computeGlobalDefl(lc: LoadCase, nseg: number) {
    const ld = this.computeLocalDefl(lc, nseg);
    const geo = this.computeGeo();
    const c: number = geo.dx / geo.l;
    const s: number = geo.dz / geo.l;
    const ug = [];
    const wg = [];
    for (let i = 0; i <= nseg; i++) {
      ug.push(ld.u[i] * c - ld.w[i] * s);
      wg.push(ld.w[i] * c + ld.u[i] * s);
    }
    return { u: ug, w: wg };
  }

  /**
    * 计算某一振型对应的单元端部局部位移向量。
    * 逻辑与静力位移恢复类似，但数据来自模态向量而非工况位移解。
   */
  computeEndDisplacementEigenMode(lc: LoadCase, ntheig: number) {
    const t = this.computeT();
    const loc = this.getLocationArray();
    let rloc = math.multiply(t, math.subset(lc.eigenVectors[ntheig], math.index(loc)));

    if (this.hasHinges()) {
      const stiffrec = this.computeLocalStiffnessMtrx(true);
      const bl = math.zeros(6);
      if (this.hasHinges()) {
        // re[ix_(b)] = dot(linalg.inv(kbb), -bl[ix_(b)] - dot(kab.transpose(), re[ix_(a)] ) )

        rloc = math.subset(
          rloc,
          math.index(stiffrec.b),
          math.multiply(
            math.inv(stiffrec.kbb),
            math.multiply(
              math.add(
                math.subset(bl, math.index(stiffrec.b)),
                math.squeeze(math.multiply(math.transpose(stiffrec.kab), math.subset(rloc, math.index(stiffrec.a))))
              ),
              -1.0
            )
          )
        );
      }
    }
    return rloc;
  }

  /**
    * 计算某一振型在单元局部坐标系下的模态位移曲线。
   */
  computeLocalEigenMode(lc: LoadCase, ntheig: number, nseg: number) {
    const rl = this.computeEndDisplacementEigenMode(lc, ntheig);
    const u: number[] = [];
    const w: number[] = [];
    const geo = this.computeGeo();
    const l = geo.l;

    for (let iseg = 0; iseg <= nseg; iseg++) {
      const xl = iseg / nseg; // [0,1]
      // components from end displacements
      const wl =
        (1.0 - 3.0 * xl * xl + 2.0 * xl * xl * xl) * rl.get([1]) +
        l * (-xl + 2.0 * xl * xl - xl * xl * xl) * rl.get([2]) +
        (3.0 * xl * xl - 2.0 * xl * xl * xl) * rl.get([4]) +
        l * (xl * xl - xl * xl * xl) * rl.get([5]);
      const ul = (1 - xl) * rl.get([0]) + xl * rl.get([3]);
      u.push(ul);
      w.push(wl);
    }
    return { u: u, w: w };
  }

  /**
    * 将局部模态位移曲线旋转到整体坐标系下。
   */
  computeGlobalEigenMode(lc: LoadCase, ntheig: number, nseg: number) {
    const ld = this.computeLocalEigenMode(lc, ntheig, nseg);
    const geo = this.computeGeo();
    const c: number = geo.dx / geo.l;
    const s: number = geo.dz / geo.l;
    const ug = [];
    const wg = [];
    for (let i = 0; i <= nseg; i++) {
      ug.push(ld.u[i] * c - ld.w[i] * s);
      wg.push(ld.w[i] * c + ld.u[i] * s);
    }
    return { u: ug, w: wg };
  }

  /**
   * 计算单元轴力图。
   * 以内力端值为基础，再叠加单元荷载沿程的解析贡献。
   */
  computeNormalForce(lc: LoadCase, nseg: number) {
    const F = this.computeEndForces(lc);
    const geo = this.computeGeo();
    const x = [];
    const N = [];

    const eloads = lc.getElementLoadsOnElement(this.label);
    for (let iseg = 0; iseg <= nseg; iseg++) {
      const xi = (geo.l * iseg) / nseg;
      let Ni = -F.get([0]);
      // add contributions of loads
      for (const load of eloads) {
        Ni += load.computeBeamNContrib(xi);
      }
      x.push(xi);
      N.push(Ni);
    }
    return { x: x, N: N };
  }

  computeNormalForceAt(lc: LoadCase, xi: number) {
    const F = this.computeEndForces(lc);

    const eloads = lc.getElementLoadsOnElement(this.label);
    let Ni = -F.get([0]);

    // add contributions of loads
    for (const load of eloads) {
      Ni += load.computeBeamNContrib(xi);
    }

    return Ni;
  }

  /**
   * 计算单元剪力图。
   */
  computeShearForce(lc: LoadCase, nseg: number) {
    const F = this.computeEndForces(lc);
    const geo = this.computeGeo();
    const x = [];
    const V = [];

    const eloads = lc.getElementLoadsOnElement(this.label);
    for (let iseg = 0; iseg <= nseg; iseg++) {
      const xi = (geo.l * iseg) / nseg;
      let Vi = -F.get([1]);
      // add contributions of loads
      for (const load of eloads) {
        Vi += load.computeBeamVContrib(xi);
      }
      x.push(xi);
      V.push(Vi);
    }
    return { x: x, V: V };
  }

  computeShearForceAt(lc: LoadCase, xi: number) {
    const F = this.computeEndForces(lc);

    const eloads = lc.getElementLoadsOnElement(this.label);
    let Vi = -F.get([1]);

    // add contributions of loads
    for (const load of eloads) {
      Vi += load.computeBeamVContrib(xi);
    }

    return Vi;
  }

  /**
   * 计算单元弯矩图。
   */
  computeBendingMoment(lc: LoadCase, nseg: number) {
    const F = this.computeEndForces(lc);
    const geo = this.computeGeo();
    const x = [];
    const M = [];

    const eloads = lc.getElementLoadsOnElement(this.label);
    for (let iseg = 0; iseg <= nseg; iseg++) {
      const xi = (geo.l * iseg) / nseg;
      let Mi = -F.get([2]) - F.get([1]) * xi;
      // add contributions of loads
      for (const load of eloads) {
        Mi += load.computeBeamMContrib(xi);
      }
      x.push(xi);
      M.push(Mi);
    }
    return { x: x, M: M };
  }

  computeBendingMomentAt(lc: LoadCase, xi: number) {
    const F = this.computeEndForces(lc);

    const eloads = lc.getElementLoadsOnElement(this.label);
    let Mi = -F.get([2]) - F.get([1]) * xi;

    // add contributions of loads
    for (const load of eloads) {
      Mi += load.computeBeamMContrib(xi);
    }

    return Mi;
  }
}
