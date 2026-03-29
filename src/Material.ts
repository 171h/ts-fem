import { LabelType } from ".";

/** 材料参数对象。 */
export interface MaterialParameters {
  e?: number;
  g?: number;
  alpha?: number;
  d?: number;
}

interface MaterialChangeParameters extends MaterialParameters {
  label?: LabelType;
}

// 提供一组可工作的默认材料参数，便于快速建模与测试。
const MaterialParametersDefaults = { e: 1.0, g: 1.0, alpha: 1.0, d: 1.0 };

/**
 * 线弹性材料。
 * 保存弹性模量、剪切模量、热膨胀系数和密度等材料常数。
 */
export class Material {
  label: string; // 材料标签
  e: number; // Young's modulus [Pa]
  g: number; // Shear modulus [Pa]
  alpha: number; // thermal dillatation coefficient [K-1]
  d: number; // mass density [kg/m3]

  /**
   * @param  label int label of receiver
   * @param  e Young's modulus of receiver [Pa]
   * @param g  Shear modulus of receiver [Pa]
   * @param alpha thermal dillatation coefficient [K-1]
   * @param d mass density of receiver [kg/m3]
   */
  constructor(label: LabelType, params: MaterialParameters = {}) {
    // 材料标签始终转成字符串统一存储。
    this.label = label.toString();

    // 其余参数按“默认值 + 用户传入值”合并。
    params = { ...MaterialParametersDefaults, ...params };
    this.e = params.e;
    this.g = params.g;
    this.alpha = params.alpha;
    this.d = params.d;
  }

  /**
    * 按需更新材料参数。
   */
  change(params: MaterialChangeParameters) {
    if (params.e !== undefined) this.e = params.e;
    if (params.g !== undefined) this.g = params.g;
    if (params.alpha !== undefined) this.alpha = params.alpha;
    if (params.d !== undefined) this.d = params.d;
  }
}
