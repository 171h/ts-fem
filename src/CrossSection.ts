import { LabelType } from ".";

// 截面参数对象。大部分字段由具体单元公式按需使用。
export interface CrossSectionParameters {
  a?: number;
  iy?: number;
  iz?: number;
  dyz?: number;
  h?: number;
  k?: number;
  j?: number;
}

interface CrossSectionChangeParameters extends CrossSectionParameters {
  label?: LabelType;
}

// 截面目前不提供默认值，调用方应显式给出所需参数。
const CrossSectionParametersDefaults = {};

/**
 * 梁单元截面属性。
 * 包含面积、惯性矩、截面高度、剪切系数等几何与力学参数。
 */
export class CrossSection {
  label: string; // 截面标签
  a: number; // 截面面积 [m2]
  iy: number; // 绕 y 轴惯性矩 [m4]
  iz: number; // 绕 z 轴惯性矩 [m4]
  dyz: number; // 积惯性矩 [m4]
  h: number; // 截面高度 [m]
  k: number; // Timoshenko 剪切修正系数
  j: number; // 抗扭常数/扭转惯性矩 [m4]

  /**
   * Constructor
   * @param label string label of receiver
   * @param a cross section area of receiver [m2]. > 0.0
   * @param iy area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
   * @param iz area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
   * @param dyz product moment of area with respect to yz axes [m4]
   * @param h height of receiver [m]
   * @param k Timoshenko's shear coefficient [-]
   * @param j torsional stiffness moment [m4]
   */
  constructor(label: LabelType, params: CrossSectionParameters = {}) {
    // 仅标签是强制字段，其余参数从入参对象中展开。
    this.label = label.toString();

    // 允许调用方只传当前分析所需的截面参数。
    params = { ...CrossSectionParametersDefaults, ...params };
    this.a = params.a;
    this.iy = params.iy;
    this.iz = params.iz;
    this.dyz = params.dyz;
    this.h = params.h;
    this.k = params.k;
    this.j = params.j;
  }

  /**
    * 按需更新截面属性，只覆盖显式给出的字段。
   */
  change(params: CrossSectionChangeParameters) {
    if (params.a != undefined) this.a = params.a;
    if (params.iy != undefined) this.iy = params.iy;
    if (params.iz != undefined) this.iz = params.iz;
    if (params.dyz != undefined) this.dyz = params.dyz;
    if (params.h != undefined) this.h = params.h;
    if (params.k != undefined) this.k = params.k;
    if (params.j != undefined) this.j = params.j;
  }
}
