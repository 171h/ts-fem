import { Domain } from "./Domain";
import { LabelType } from ".";

/**
 * 荷载抽象基类。
 * 所有节点荷载和单元荷载都继承自该类，并通过统一接口返回等效节点力与定位向量。
 */
export class Load {
  target: string; // 荷载作用对象的标签（节点或单元）
  domain: Domain;
  /**
   * 创建一个作用在指定对象上的荷载。
   */
  constructor(target: LabelType, domain: Domain) {
    this.target = target.toString();
    this.domain = domain;
  }

  /**
   * 返回该荷载对整体方程贡献的等效节点力向量。
   */
  getLoadVector(): number[] {
    return [];
  }
  /**
   * 返回该荷载对应的全局方程编号数组。
   */
  getLocationArray(): number[] {
    return [];
  }
}
