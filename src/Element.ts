import * as math from "mathjs";
import { Domain } from "./Domain";
import { DofID, LabelType } from ".";

/**
 * 有限元单元抽象基类。
 * 定义所有单元共享的基础属性，以及刚度矩阵、质量矩阵、几何信息等统一接口。
 */
export abstract class Element {
  label: string; // 单元标签
  nodes: Array<string>; // 单元连接的节点标签
  mat: string; // 关联材料标签
  cs: string; // 关联截面标签
  domain: Domain; // 所属问题域

  /**
   * Constructor
   * @param label new label
   * @param nodes element nodes
   * @param mat element material number
   * @param cs element cross section number
   */
  constructor(label: LabelType, domain: Domain, nodes: Array<LabelType>, mat: LabelType, cs: LabelType) {
    this.label = label.toString();
    this.nodes = nodes.map((x) => x.toString());
    this.mat = mat.toString();
    this.cs = cs.toString();
    this.domain = domain;
  }

  /**
   * 修改单元的基础属性。
   */
  change(label: LabelType, nodes: Array<number>, mat: LabelType, cs: LabelType) {
    if (label != undefined) this.label = label.toString();
    if (nodes != undefined) this.nodes = nodes.map((x) => x.toString());
    if (mat != undefined) this.mat = mat.toString();
    if (cs != undefined) this.cs = cs.toString();
  }

  /**
   * 返回单元所引用的材料对象。
   */
  getMaterial() {
    return this.domain.getMaterial(this.mat);
  }

  /**
   * 返回单元所引用的截面对象。
   */
  getCS() {
    return this.domain.getCS(this.cs);
  }

  /**
   * 返回指定节点在该单元中需要参与计算的自由度列表。
   */
  getNodeDofs(node: LabelType): Array<DofID> {
    return [];
  }

  /** 计算单元整体坐标系下的刚度矩阵。 */
  computeStiffness(): any {}

  /** 计算单元整体坐标系下的质量矩阵。 */
  computeMassMatrix(): any {}

  /** 返回单元定位向量，即局部自由度到全局方程编号的映射。 */
  getLocationArray(): any {}

  /** 返回单元几何信息，如长度与方向余弦所需的坐标差。 */
  computeGeo(): any {}
  /**
   * 返回单元坐标变换矩阵。
   * 约定为局部量 = T * 全局量。
   */
  computeT(): math.Matrix {
    return math.matrix();
  }
}
