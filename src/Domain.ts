import { Beam2D } from "./Beam2D";
import { CrossSection, CrossSectionParameters } from "./CrossSection";
import { Material, MaterialParameters } from "./Material";
import { Solver } from "./Solver";
import { DofID, LabelType } from ".";
import { Element } from "./Element";
import { Node } from "./Node";

/**
 * 有限元问题域。
 * 负责维护节点、单元、材料、截面等实体，并提供统一的创建与查询入口。
 */
export class Domain {
  /** 当前问题域所属的求解器 */
  solver: Solver;
  /** 节点表，key 为节点标签 */
  nodes = new Map<string, Node>();
  /** 单元表，key 为单元标签 */
  elements = new Map<string, Element>();
  /** 材料表，key 为材料标签 */
  materials = new Map<string, Material>();
  /** 截面表，key 为截面标签 */
  crossSections = new Map<string, CrossSection>();

  /**
   * Constructor
   */
  constructor(solver: Solver) {
    this.solver = solver;
  }

  /** 按标签获取节点对象，不存在时抛出异常。 */
  getNode(id: LabelType): Node {
    const _id = id.toString();
    if (this.nodes.has(_id)) {
      return this.nodes.get(_id);
    } else {
      throw new RangeError("Node label " + id + " does not exists");
    }
  }

  /** 按标签获取单元对象，不存在时抛出异常。 */
  getElement(id: LabelType): Element {
    const _id = id.toString();
    if (this.elements.has(_id)) {
      return this.elements.get(_id);
    } else {
      throw new RangeError("Element label " + id + " does not exists");
    }
  }

  /** 按标签获取材料对象，不存在时抛出异常。 */
  getMaterial(id: LabelType): Material {
    const _id = id.toString();
    if (this.materials.has(_id)) {
      return this.materials.get(_id);
    } else {
      throw new RangeError("Material label " + id + " does not exists");
    }
  }

  /** 按标签获取截面对象，不存在时抛出异常。 */
  getCS(id: LabelType): CrossSection {
    const _id = id.toString();
    if (this.crossSections.has(_id)) {
      return this.crossSections.get(_id);
    } else {
      throw new RangeError("CrossSection label " + id + " does not exists");
    }
  }

  // 以下工厂方法统一负责创建对象并登记到问题域索引表中。
  createNode(label: LabelType, coords: number[] = [0, 0, 0], bcs: Array<DofID> = []) {
    const ans = new Node(label, this, coords, bcs);
    this.nodes.set(label.toString(), ans);
    return ans;
  }

  createBeam2D(
    label: LabelType,
    nodes: Array<LabelType>,
    mat: LabelType,
    cs: LabelType,
    hinges: [boolean, boolean] = [false, false]
  ) {
    const ans = new Beam2D(label, this, nodes, mat, cs, hinges);

    this.elements.set(label.toString(), ans);
    return ans;
  }

  createMaterial(label: LabelType, params: MaterialParameters = {}) {
    const ans = new Material(label, params);
    this.materials.set(label.toString(), ans);
    return ans;
  }

  createCrossSection(label: LabelType, params: CrossSectionParameters = {}) {
    const ans = new CrossSection(label, params);
    this.crossSections.set(label.toString(), ans);
    return ans;
  }
}
