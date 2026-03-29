import { Domain } from "./Domain";
import { EnumDictionary, DofID, LabelType } from ".";

/**
 * 规定位移边界条件。
 * 负责把节点上给定的位移/转角值转换为与求解器自由度顺序一致的向量。
 */
export class PrescribedDisplacement {
  target: string; // 施加规定位移的节点标签
  prescribedValues: EnumDictionary<DofID, number>; // 各自由度对应的规定值
  domain: Domain;

  /**
   * Constructor
   */
  constructor(target: LabelType, domain: Domain, values: EnumDictionary<DofID, number>) {
    this.target = target.toString();
    this.prescribedValues = values;
    this.domain = domain;
  }

  getNodePrescribedDisplacementVector() {
    const answer = new Array<number>();
    // 获取该节点参与分析的自由度顺序。
    const dofs = this.domain.solver.getNodeDofIDs(this.target);

    // 按求解器自由度顺序生成规定位移向量。
    // 未显式指定的自由度默认规定位移为 0。
    for (const dof of dofs) {
      if (dof in this.prescribedValues) {
        answer.push(this.prescribedValues[dof]);
      } else {
        answer.push(0.0);
      }
    }
    return answer;
  }

  getLocationArray() {
    return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
  }
}
