import * as math from "mathjs";
import { DofID, Domain, LabelType, LoadCase } from ".";

/**
 * 有限元求解器的抽象基类。
 * 提供公共的自由度编号生成、刚度矩阵/载荷向量组装等基础功能，
 * 具体的求解策略（静力/动力）由子类实现。
 */
export abstract class Solver {
  /** 有限元计算域，包含节点和单元信息 */
  domain: Domain;
  /** 未知自由度（方程）数量，即需要求解的自由度个数 */
  neq: number;
  /** 已知（规定位移）自由度数量 */
  pneq: number;
  /** 整体刚度矩阵 K，尺寸为 (neq+pneq) x (neq+pneq) */
  k: math.Matrix;
  /** 整体质量矩阵 M（用于动力分析），尺寸同刚度矩阵 */
  m: math.Matrix;
  /** 整体载荷向量/矩阵 F，列数对应载荷工况数 */
  f: math.MathCollection | number[] | number[][];
  /** 载荷工况列表，默认包含一个 "DefaultLC" 工况 */
  loadCases = new Array<LoadCase>();
  /** 标记自由度编号是否已生成，避免重复编号 */
  codeNumberGenerated: boolean = false;

  constructor() {
    this.domain = new Domain(this);
    this.loadCases.push(new LoadCase("DefaultLC", this.domain));
  }
  /**
   * 节点自由度编号映射表。
   * key: 节点标签, value: { DofID -> 全局方程编号 }
   * 自由自由度编号在前 [0, neq)，约束自由度编号在后 [neq, neq+pneq)
   */
  nodeCodeNumbers = new Map<LabelType, { [code: number]: number }>();

  /**
   * 获取指定节点的指定自由度对应的全局方程编号数组（定位向量）。
   * 用于将单元局部矩阵/向量组装到整体矩阵/向量中。
   * @param num  节点标签
   * @param dofs 需要查询的自由度类型数组（如 [Dx, Dy, Rz]）
   * @returns 全局方程编号数组
   */
  getNodeLocationArray(num: LabelType, dofs: Array<DofID>) {
    let ans = [];
    for (const i of dofs) {
      ans = ans.concat(this.nodeCodeNumbers.get(num)[i]);
    }
    return ans;
  }

  /**
   * 获取指定节点拥有的所有自由度 ID 列表。
   * @param num 节点标签
   * @returns 该节点的自由度 ID 数组
   */
  getNodeDofIDs(num: LabelType): number[] {
    const ans: number[] = [];
    for (const d in this.nodeCodeNumbers.get(num)) {
      ans.push(parseInt(d));
    }
    return ans;
  }

  /**
   * 生成全局自由度编号（code numbers）。
   *
   * 编号策略：自由（未约束）自由度从 0 开始连续编号，
   * 约束（prescribed）自由度紧随其后编号，从 neq 开始。
   * 这样整体矩阵可以按 [自由 | 约束] 分块，便于后续求解。
   */
  generateCodeNumbers() {
    const nodalDofs = new Map<LabelType, Set<DofID>>();

    // 第一步：为每个节点初始化空的自由度集合
    for (const [key, node] of this.domain.nodes) {
      this.nodeCodeNumbers.set(key, {});
      nodalDofs.set(key, new Set<DofID>());
    }

    // 第二步：遍历所有单元，收集每个节点所需的自由度类型
    // （不同类型的单元可能要求节点具有不同的自由度）
    for (const [ie, elem] of this.domain.elements) {
      for (const en of elem.nodes) {
        const dofs = elem.getNodeDofs(en);
        for (const d of dofs) {
          if (nodalDofs.has(en)) {
            nodalDofs.get(en).add(d);
          } else {
            console.log(en, en in nodalDofs, nodalDofs.get(en));
            throw new RangeError("Node label " + en + " does not exists");
          }
        }
      }
    }

    // 第三步：统计自由自由度数 neq 和约束自由度数 pneq
    this.neq = 0;
    this.pneq = 0;
    for (const [num, node] of this.domain.nodes) {
      for (const d of nodalDofs.get(num)) {
        if (node.bcs.has(d)) {
          // 该自由度被施加了边界条件（约束）
          this.pneq++;
        } else {
          // 该自由度是自由的（未知量）
          this.neq++;
        }
      }
    }

    // 第四步：分配全局方程编号
    // 自由自由度: 编号 0 ~ neq-1
    // 约束自由度: 编号 neq ~ neq+pneq-1
    let eq: number = 0;
    let peq: number = this.neq;
    for (const [num, node] of this.domain.nodes) {
      for (const d of nodalDofs.get(num)) {
        if (node.bcs.has(d)) {
          this.nodeCodeNumbers.get(num)[d] = peq++;
        } else {
          this.nodeCodeNumbers.get(num)[d] = eq++;
        }
      }
    }

    this.codeNumberGenerated = true;
  }

  /**
   * 将单元载荷向量组装到指定载荷工况的整体载荷矩阵中。
   * @param f   整体载荷矩阵（行=自由度，列=载荷工况）
   * @param fe  单元载荷向量
   * @param loc 单元定位向量（局部自由度 -> 全局方程编号的映射）
   * @param lc  载荷工况索引
   */
  assembleVecLC(f: math.Matrix, fe: number[], loc: number[], lc: number) {
    for (let i = 0; i < loc.length; i++) {
      f.set([loc[i], lc], f.get([loc[i], lc]) + fe[i]);
    }
  }

  /**
   * 将单元向量组装到整体一维向量中（如规定位移向量）。
   * @param f   整体向量
   * @param fe  单元贡献向量
   * @param loc 单元定位向量
   */
  assembleVec(f: math.Matrix, fe: number[], loc: number[]) {
    for (let i = 0; i < loc.length; i++) {
      f.set([loc[i]], f.get([loc[i]]) + fe[i]);
    }
  }
}
