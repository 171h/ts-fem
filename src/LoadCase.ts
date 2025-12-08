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
export class LoadCase {
  label: string;
  domain: Domain; // domain reference
  // dictionary (map), key is node number, value is PrescribedDisplacement object applied
  bcMap: { [node: number]: PrescribedDisplacement } = {};
  // Array of loads applied
  nodalLoadList = new Array<NodalLoad>();
  elementLoadList = new Array<BeamElementLoad>();
  prescribedBC = new Array<PrescribedDisplacement>();
  // solution vector
  r: math.Matrix = math.zeros(0) as math.Matrix;
  // vector of reactions
  R: math.Matrix = math.zeros(0) as math.Matrix;
  // omegas
  eigenNumbers: number[] = [];
  eigenVectors: math.Matrix[] = [];

  solved = false;

  /**
   * Creates a new loadcase
   * @param label load case name
   */
  constructor(label: string, domain: Domain) {
    this.label = label;
    this.domain = domain;
  }
  /**
   * Returns list of applied element loads on element with given number
   * param e element number
   */
  getElementLoadsOnElement(e: LabelType): Array<BeamElementLoad> {
    const ans = [];
    for (const l of this.elementLoadList) {
      if (l.target == e) {
        ans.push(l);
      }
    }
    return ans;
  }

  //class factory
  createNodalLoad(node: LabelType, values: EnumDictionary<DofID, number> = {}) {
    const ans = new NodalLoad(node, this.domain, values);
    this.nodalLoadList.push(ans);
    return ans;
  }

  createBeamElementUniformEdgeLoad(elem: LabelType, values: number[], lcs: boolean) {
    const ans = new BeamElementUniformEdgeLoad(elem, this.domain, values, lcs);
    this.elementLoadList.push(ans);
    return ans;
  }

  createBeamElementTrapezoidalEdgeLoad(
    elem: LabelType,
    startValues: [number, number],
    endValues: [number, number],
    lcs: boolean
  ) {
    const ans = new BeamElementTrapezoidalEdgeLoad(elem, this.domain, startValues, endValues, lcs);
    this.elementLoadList.push(ans);
    return ans;
  }

  createBeamConcentratedLoad(elem: LabelType, values: number[], lcs: boolean) {
    const ans = new BeamConcentratedLoad(elem, this.domain, values, lcs);
    this.elementLoadList.push(ans);
    return ans;
  }

  createBeamTemperatureLoad(elem: LabelType, values: number[]) {
    const ans = new BeamTemperatureLoad(elem, this.domain, values);
    this.elementLoadList.push(ans);
    return ans;
  }

  createPrescribedDisplacement(target: LabelType, values: EnumDictionary<DofID, number>) {
    const ans = new PrescribedDisplacement(target, this.domain, values);
    this.prescribedBC.push(ans);
    return ans;
  }
}
