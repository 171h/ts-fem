import { Domain } from "./Domain";
import { Load } from "./Load";
import { EnumDictionary, DofID, LabelType } from ".";

/**
 * 节点集中荷载。
 * 通过“自由度 -> 数值”的映射方式，在节点的实际自由度顺序上生成等效荷载向量。
 */
export class NodalLoad extends Load {
  values: EnumDictionary<DofID, number>;

  constructor(node: LabelType, domain: Domain, values: EnumDictionary<DofID, number> = {}) {
    super(node, domain);
    this.values = values;
  }
  change(node: number, values: EnumDictionary<DofID, number>) {
    this.target = node.toString();
    this.values = values;
  }

  getLoadVector(): number[] {
    // 按节点当前参与分析的自由度顺序构造载荷向量。
    // 未显式给值的自由度默认荷载为 0。
    const dofs = this.domain.solver.getNodeDofIDs(this.target);
    const ans = Array<number>();
    for (const idof of dofs) {
      if (idof in this.values) {
        ans.push(this.values[idof]);
      } else {
        ans.push(0.0);
      }
    }
    return ans;
  }

  getLocationArray(): number[] {
    return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
  }
}
