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
 * LoadCase represents a collection of loads. LoadCase stores also its solution vector.
 */
export declare class LoadCase {
    label: string;
    domain: Domain;
    bcMap: {
        [node: number]: PrescribedDisplacement;
    };
    nodalLoadList: NodalLoad[];
    elementLoadList: BeamElementLoad[];
    prescribedBC: PrescribedDisplacement[];
    r: math.Matrix;
    R: math.Matrix;
    eigenNumbers: number[];
    eigenVectors: math.Matrix[];
    solved: boolean;
    /**
     * Creates a new loadcase
     * @param label load case name
     */
    constructor(label: string, domain: Domain);
    /**
     * Returns list of applied element loads on element with given number
     * param e element number
     */
    getElementLoadsOnElement(e: LabelType): Array<BeamElementLoad>;
    createNodalLoad(node: LabelType, values?: EnumDictionary<DofID, number>): NodalLoad;
    createBeamElementUniformEdgeLoad(elem: LabelType, values: number[], lcs: boolean): BeamElementUniformEdgeLoad;
    createBeamElementTrapezoidalEdgeLoad(elem: LabelType, startValues: [number, number], endValues: [number, number], lcs: boolean): BeamElementTrapezoidalEdgeLoad;
    createBeamConcentratedLoad(elem: LabelType, values: number[], lcs: boolean): BeamConcentratedLoad;
    createBeamTemperatureLoad(elem: LabelType, values: number[]): BeamTemperatureLoad;
    createPrescribedDisplacement(target: LabelType, values: EnumDictionary<DofID, number>): PrescribedDisplacement;
}
