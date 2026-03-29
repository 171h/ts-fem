/**
 * 自由度枚举。
 * 统一描述节点位移和转角在整个库中的物理含义与编号顺序。
 */
export enum DofID {
  Dx = 0, // Displacement in x direction
  Dy = 1, // Displacement in y direction
  Dz = 2, // Displacement in z direction
  Rx = 3, // Rotation around x axis
  Ry = 4, // Rotation around y axis
  Rz = 5, // Rotation around z axis
}

/**
 * 用枚举值作为键的可选字典类型。
 * 常用于“按自由度给值”的输入，如节点荷载和规定位移。
 */
export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]?: U;
};

/** 标签既可以是数字，也可以是字符串。 */
export type LabelType = number | string;

/** 对外导出的公共 API 入口。 */
export * from "./Node";
export * from "./Element";
export * from "./Beam2D";
export * from "./Load";
export * from "./NodalLoad";
export * from "./BeamElementLoad";
export * from "./BeamConcentratedLoad";
export * from "./BeamElementUniformEdgeLoad";
export * from "./BeamElementTrapezoidalEdgeLoad";
export * from "./BeamTemperatureLoad";
export * from "./PrescribedDisplacement";
export * from "./Domain";
export * from "./Solver";
export * from "./Material";
//export * from  './EigenValueDynamicSolver';
export * from "./LinearStaticSolver";
export * from "./CrossSection";
export * from "./LoadCase";
