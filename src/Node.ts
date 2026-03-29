import * as math from "mathjs";
import { Domain } from "./Domain";
import { DofID, LabelType } from ".";
import { LoadCase } from "./LoadCase";

/**
 * 有限元节点。
 * 节点保存几何坐标、约束自由度以及可选的局部坐标系，
 * 同时提供结果提取、坐标变换和边界条件相关的辅助方法。
 */
export class Node {
  label: string; // 节点标签
  domain: Domain; // 所属问题域
  coords: Array<number>; // 节点三维坐标 [m]
  // 节点被约束的自由度集合。约束值本身由 PrescribedDisplacement 给出。
  bcs: Set<DofID>;
  // 节点局部坐标系。若存在，则边界条件和结果可在局部坐标系中解释。
  /**
   * Triplet defining the local coordinate system in node.
   * Value at position (i,j) represents angle between e'(i) and e(j),
   * where e' is base vector of local coordinate system and e is
   * base vector of global c.s.
   */
  lcs: number[][];
  /**
   * Node constructor
   * @param label number
   * @param coords coordinates
   * @param bcs boundary conditions {code:string]:boolean}
   */
  constructor(label: LabelType, domain: Domain, coords: number[] = [0, 0, 0], bcs: Array<DofID> = []) {
    this.label = label.toString();
    this.domain = domain;
    this.coords = coords;
    this.bcs = new Set<DofID>(bcs);
    this.lcs = undefined; // 未定义时表示局部坐标系与整体坐标系重合
  }
  /**
   * 直接更新节点基础属性。
   */
  change(label: LabelType, coords: number[], bcs: Array<DofID> = []) {
    if (label != undefined) this.label = label.toString();
    if (coords != undefined) this.coords = coords;
    if (bcs != undefined) this.bcs = new Set<DofID>(bcs);
  }

  /**
   * 使用参数对象更新节点属性。
   * 适合只改其中一部分字段，且可同时更新局部坐标系。
   */
  change2(params: {
    label?: LabelType;
    coords?: number[];
    bcs?: Array<DofID>;
    lcs?: { locx: number[]; locy: number[] };
  }) {
    if (params.label != undefined) {
      this.label = params.label.toString();
    }
    if (params.coords != undefined) {
      this.coords = params.coords;
    }
    if (params.bcs != undefined) {
      this.bcs = new Set<DofID>(params.bcs);
    }
    if (params.lcs != undefined) {
      this.updateLcs(params.lcs);
    }
  }

  /** 返回指定自由度对应的全局定位向量。 */
  getLocationArray(dofs: Array<DofID>) {
    return this.domain.solver.getNodeLocationArray(this.label, dofs);
  }

  /** 从工况位移向量中提取该节点给定自由度的解值。 */
  getUnknowns(lc: LoadCase, dofs: Array<DofID>) {
    const cn = this.getLocationArray(dofs);
    return math.subset(lc.r, math.index(cn));
  }

  /** 从指定模态向量中提取该节点给定自由度的振型分量。 */
  getEigenValueUnknowns(lc: LoadCase, dofs: Array<DofID>, ev: number) {
    const cn = this.getLocationArray(dofs);

    return math.subset(lc.eigenVectors[ev], math.index(cn));
  }

  /**
   * Returns receiver transformation matrix (from nodal to global c.s., ie. rg=t*r_n)
   * @param dofs dofs mask to consider
   */
  getTransformationMtrx(dofs: Array<DofID>) {
    const size = dofs.length;
    if (this.lcs == undefined) {
      // 若节点没有局部坐标系，则变换矩阵退化为单位阵。
      return math.identity(size);
    } else {
      const ans = math.zeros([size, size]);

      for (let i = 0; i < size; i++) {
        const id = dofs[i];
        // 平移自由度和转动自由度分别使用对应的 3x3 方向余弦子矩阵。
        switch (id) {
        case DofID.Dx:
        case DofID.Dy:
        case DofID.Dz:
          for (let j = 0; j < size; j++) {
            const id2 = dofs[j];
            if (id2 == DofID.Dx || id2 == DofID.Dy || id2 == DofID.Dz) {
              ans[i][j] = this.lcs[id2][id];
            }
          }
          break;

        case DofID.Rx:
        case DofID.Ry:
        case DofID.Rz:
          for (let j = 0; j < size; j++) {
            const id2 = dofs[j];
            if (id2 == DofID.Rx || id2 == DofID.Ry || id2 == DofID.Rz) {
              ans[i][j] = this.lcs[id2 - DofID.Rx][id - DofID.Rx];
            }
          }
          break;
        default:
          throw new TypeError("Unknown DofID: " + id);
        } // end switch
      } // end loop over dofs
      return math.matrix(ans);
    }
  }
  /**
   * 根据给定的局部 x 轴和局部 y 轴方向更新节点局部坐标系。
   * 局部 z 轴通过叉乘自动补齐，从而形成右手正交基。
   */
  updateLcs(lcs?: { locx: number[]; locy: number[] }) {
    if (lcs == undefined) {
      this.lcs = undefined; // 恢复为整体坐标系
    } else {
      this.lcs = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      const e1norm = math.norm(lcs.locx) as number;
      const e2norm = math.norm(lcs.locy) as number;
      for (let j = 0; j < 3; j++) {
        // 先对输入的局部基向量归一化。
        this.lcs[0][j] = lcs.locx[j] / e1norm;
        this.lcs[1][j] = lcs.locy[j] / e2norm;
      }

      // 第三个基向量由叉乘计算得到，保证局部坐标系完整。
      this.lcs[2][0] = this.lcs[0][1] * this.lcs[1][2] - this.lcs[0][2] * this.lcs[1][1];
      this.lcs[2][1] = this.lcs[0][2] * this.lcs[1][0] - this.lcs[0][0] * this.lcs[1][2];
      this.lcs[2][2] = this.lcs[0][0] * this.lcs[1][1] - this.lcs[0][1] * this.lcs[1][0];
    }
  }
  /**
   * 判断节点是否定义了局部坐标系。
   */
  hasLcs() {
    return this.lcs != undefined;
  }

  /**
   * 提取节点反力。
   * 默认返回节点坐标系下的支反力；如请求整体坐标系，则会做一次坐标变换。
   */
  getReactions(lc: LoadCase, inGlobalCS: boolean = false) {
    if (inGlobalCS && this.hasLcs()) {
      const sdofs = this.domain.solver.getNodeDofIDs(this.label); // 节点参与分析的全部自由度
      const cn = this.getLocationArray(sdofs); // 这些自由度对应的全局方程编号
      const R: number[] = [];
      for (let i = 0; i < sdofs.length; i++) {
        if (this.bcs.has(sdofs[i])) {
          R.push(<number>(<any>math.subset(lc.R, math.index([cn[i] - this.domain.solver.neq])))); // math.js type maze
        } else {
          R.push(0.0);
        }
      }
      const t = this.getTransformationMtrx(sdofs);
      return {
        dofs: sdofs,
        values: (<math.Matrix>math.multiply(t, R)).toArray(),
      };
    } else {
      // 默认直接返回节点局部坐标系下的受约束自由度反力。
      if (this.bcs.size > 0) {
        const sdofs = Array.from(this.bcs); // 仅受约束自由度有反力
        const cn = this.getLocationArray(sdofs); // 受约束自由度的方程编号
        const ccn = math.subtract(cn, this.domain.solver.neq);
        const R = math.subset(lc.R, math.index(ccn));
        if (math.typeOf(R) === "number") {
          return { dofs: sdofs, values: [R] };
        } else {
          return { dofs: sdofs, values: R };
        }
      } else {
        return { dofs: [], values: [] };
      }
    }
  }
}
