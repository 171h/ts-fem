import * as math from "mathjs";
import { BeamElementLoad } from "./BeamElementLoad";
import { BeamElementUniformEdgeLoad } from "./BeamElementUniformEdgeLoad";
import { BeamElementTrapezoidalEdgeLoad } from "./BeamElementTrapezoidalEdgeLoad";
import { Domain } from "./Domain";
import { NodalLoad } from "./NodalLoad";
import { PrescribedDisplacement } from "./PrescribedDisplacement";
import { BeamConcentratedLoad, DofID, LabelType } from ".";
import { EnumDictionary } from ".";
import { BeamTemperatureLoad } from "./BeamTemperatureLoad";

/**
 * 载荷工况。
 * 除了保存节点荷载、单元荷载和规定位移外，也负责保存该工况求解后的位移、反力和模态结果。
 */
export class LoadCase {
  /** 工况名称 */
  label: string;
  domain: Domain; // 所属问题域
  // 预留的约束映射表，key 为节点号，value 为规定位移对象。
  bcMap: { [node: number]: PrescribedDisplacement } = {};
  // 当前工况下施加的各类荷载。
  nodalLoadList = new Array<NodalLoad>();
  elementLoadList = new Array<BeamElementLoad>();
  prescribedBC = new Array<PrescribedDisplacement>();
  // 位移解向量
  r: math.Matrix = math.zeros(0) as math.Matrix;
  // 反力向量（仅对受约束自由度有意义）
  R: math.Matrix = math.zeros(0) as math.Matrix;
  // 模态分析结果：omega^2 与对应振型向量
  eigenNumbers: number[] = [];
  eigenVectors: math.Matrix[] = [];

  solved = false;

  /**
   * Creates a new loadcase
   * @param label load case name
   */
  constructor(label: string, domain: Domain) {
    this.label = label;
    this.domain = domain;
  }

  /**
   * 返回某个单元上施加的全部单元荷载。
   * 后处理时会用它叠加分布荷载和集中荷载对位移、内力的附加影响。
   */
  getElementLoadsOnElement(e: LabelType): Array<BeamElementLoad> {
    const ans = [];
    for (const l of this.elementLoadList) {
      if (l.target == e) {
        ans.push(l);
      }
    }
    return ans;
  }

  // 以下工厂方法负责创建工况中的各类作用并登记到对应列表。
  createNodalLoad(node: LabelType, values: EnumDictionary<DofID, number> = {}) {
    const ans = new NodalLoad(node, this.domain, values);
    this.nodalLoadList.push(ans);
    return ans;
  }

  createBeamElementUniformEdgeLoad(elem: LabelType, values: number[], lcs: boolean) {
    const ans = new BeamElementUniformEdgeLoad(elem, this.domain, values, lcs);
    this.elementLoadList.push(ans);
    return ans;
  }

  createBeamElementTrapezoidalEdgeLoad(
    elem: LabelType,
    startValues: [number, number],
    endValues: [number, number],
    lcs: boolean
  ) {
    const ans = new BeamElementTrapezoidalEdgeLoad(elem, this.domain, startValues, endValues, lcs);
    this.elementLoadList.push(ans);
    return ans;
  }

  createBeamConcentratedLoad(elem: LabelType, values: number[], lcs: boolean) {
    const ans = new BeamConcentratedLoad(elem, this.domain, values, lcs);
    this.elementLoadList.push(ans);
    return ans;
  }

  createBeamTemperatureLoad(elem: LabelType, values: number[]) {
    const ans = new BeamTemperatureLoad(elem, this.domain, values);
    this.elementLoadList.push(ans);
    return ans;
  }

  createPrescribedDisplacement(target: LabelType, values: EnumDictionary<DofID, number>) {
    const ans = new PrescribedDisplacement(target, this.domain, values);
    this.prescribedBC.push(ans);
    return ans;
  }
}
