import { BeamElementLoad } from "./BeamElementLoad";
import { Domain } from "./Domain";
import { LabelType } from ".";
/**
 * Implementation of Beam2d trapezoidal (linearly varying) load
 */
export declare class BeamElementTrapezoidalEdgeLoad extends BeamElementLoad {
    startValues: [number, number];
    endValues: [number, number];
    lcs: boolean;
    constructor(elem: LabelType, domain: Domain, startValues: [number, number], endValues: [number, number], lcs: boolean);
    change(elem: LabelType, startValues: [number, number], endValues: [number, number], lcs: boolean): void;
    getGlobalIntensities(): {
        start: {
            fx: number;
            fz: number;
        };
        end: {
            fx: number;
            fz: number;
        };
    };
    getLocalIntensities(): {
        start: {
            fx: number;
            fz: number;
        };
        end: {
            fx: number;
            fz: number;
        };
    };
    getLoadVectorForClampedBeam(): Array<number>;
    getLocationArray(): number[];
    getLoadVector(): number[];
    computeBeamDeflectionContrib(xl: number): {
        u: number;
        w: number;
    };
    computeBeamNContrib(x: number): number;
    computeBeamVContrib(x: number): number;
    computeBeamMContrib(x: number): number;
}
