/**
 * Enum to define physical meaning of degrees of freedom (DOFs)
 */
export enum DofID {
  Dx = 0, // Displacement in x direction
  Dy = 1, // Displacement in y direction
  Dz = 2, // Displacement in z direction
  Rx = 3, // Rotation around x axis
  Ry = 4, // Rotation around y axis
  Rz = 5, // Rotation around z axis
}

export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]?: U;
};

export type LabelType = number | string;

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
