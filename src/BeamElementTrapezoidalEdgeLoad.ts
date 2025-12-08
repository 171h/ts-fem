import * as math from "mathjs";
import { Beam2D } from "./Beam2D";
import { BeamElementLoad } from "./BeamElementLoad";
import { Domain } from "./Domain";
import { LabelType } from ".";

/**
 * Implementation of Beam2d trapezoidal (linearly varying) load
 */
export class BeamElementTrapezoidalEdgeLoad extends BeamElementLoad {
    startValues: [number, number]; // fx, fz at element start
    endValues: [number, number]; // fx, fz at element end
    lcs: boolean; // true if values provided in element local c.s.

    constructor(elem: LabelType, domain: Domain, startValues: [number, number], endValues: [number, number], lcs: boolean) {
        super(elem, domain);
        this.startValues = startValues;
        this.endValues = endValues;
        this.lcs = lcs;
    }

    change(elem: LabelType, startValues: [number, number], endValues: [number, number], lcs: boolean) {
        this.target = elem.toString();
        this.startValues = startValues;
        this.endValues = endValues;
        this.lcs = lcs;
    }

    getGlobalIntensities() {
        const start = { fx: this.startValues[0], fz: this.startValues[1] };
        const end = { fx: this.endValues[0], fz: this.endValues[1] };
        if (this.lcs) {
            const geo = this.domain.getElement(this.target).computeGeo();
            const cos = geo.dx / geo.l;
            const sin = geo.dz / geo.l;
            return {
                start: { fx: start.fx * cos - start.fz * sin, fz: start.fx * sin + start.fz * cos },
                end: { fx: end.fx * cos - end.fz * sin, fz: end.fx * sin + end.fz * cos },
            };
        }
        return { start, end };
    }

    getLocalIntensities() {
        const start = { fx: this.startValues[0], fz: this.startValues[1] };
        const end = { fx: this.endValues[0], fz: this.endValues[1] };
        if (!this.lcs) {
            const geo = this.domain.getElement(this.target).computeGeo();
            const cos = geo.dx / geo.l;
            const sin = geo.dz / geo.l;
            return {
                start: { fx: start.fx * cos + start.fz * sin, fz: -start.fx * sin + start.fz * cos },
                end: { fx: end.fx * cos + end.fz * sin, fz: -end.fx * sin + end.fz * cos },
            };
        }
        return { start, end };
    }

    // load vector in local c.s.
    getLoadVectorForClampedBeam(): Array<number> {
        const geo = this.domain.getElement(this.target).computeGeo();
        const l = geo.l;
        const intensities = this.getLocalIntensities();
        const fx0 = intensities.start.fx;
        const fx1 = intensities.end.fx;
        const fz0 = intensities.start.fz;
        const fz1 = intensities.end.fz;

        const fx1Node = (-l / 6) * (2 * fx0 + fx1);
        const fx2Node = (-l / 6) * (fx0 + 2 * fx1);

        const fz1Node = (-l / 20) * (7 * fz0 + 3 * fz1);
        const fz2Node = (-l / 20) * (3 * fz0 + 7 * fz1);

        const m1Node = l * l * ((fz0 / 20) + fz1 / 30);
        const m2Node = -l * l * (fz0 / 30 + fz1 / 20);

        return [fx1Node, fz1Node, m1Node, fx2Node, fz2Node, m2Node];
    }

    getLocationArray(): number[] {
        return this.domain.getElement(this.target).getLocationArray();
    }

    getLoadVector(): number[] {
        const elem = this.domain.getElement(this.target) as Beam2D;
        const t = elem.computeT();
        const f = this.getLoadVectorForClampedBeam();
        if (elem.hasHinges()) {
            const stiffrec = elem.computeLocalStiffnessMtrx(true);
            let ans = [0, 0, 0, 0, 0, 0];

            const h1 = math.multiply(stiffrec.kab, math.inv(stiffrec.kbb));

            if (stiffrec.b.length == 1) {
                const flv = f[stiffrec.b[0]];
                for (let i = 0; i < stiffrec.a.length; i++) {
                    ans[stiffrec.a[i]] = f[stiffrec.a[i]] - h1.get([i, 0]) * flv;
                }
                return math.multiply(math.multiply(math.transpose(t), ans), -1.0).toArray() as number[];
            } else {
                const help = math.subtract(
                    math.subset(f, math.index(stiffrec.a)),
                    math.multiply(h1, math.subset(f, math.index(stiffrec.b)))
                );
                ans = math.subset(ans, math.index(stiffrec.a), help);
                return math.multiply(math.multiply(math.transpose(t), ans), -1.0).toArray() as number[];
            }
        } else {
            return math.multiply(math.multiply(math.transpose(t), f), -1.0).toArray() as number[];
        }
    }

    computeBeamDeflectionContrib(xl: number): { u: number; w: number } {
        const elem = this.domain.getElement(this.target) as Beam2D;
        const geo = elem.computeGeo();
        const l = geo.l;
        const intensities = this.getLocalIntensities();
        const fz0 = intensities.start.fz;
        const fz1 = intensities.end.fz;
        const deltaFz = fz1 - fz0;
        const xi = xl; // normalized position along the element

        const polyUniform = (Math.pow(xi, 4) / 24 - Math.pow(xi, 3) / 12 + Math.pow(xi, 2) / 24);
        const polyLinear = Math.pow(xi, 5) / 120 - Math.pow(xi, 3) / 40 + Math.pow(xi, 2) / 60;

        const EI = elem.getMaterial().e * elem.getCS().iy;
        const w = ((l ** 4) / EI) * (fz0 * polyUniform + deltaFz * polyLinear);

        return { u: 0.0, w };
    }

    computeBeamNContrib(x: number): number {
        const intensities = this.getLocalIntensities();
        const geo = this.domain.getElement(this.target).computeGeo();
        const l = geo.l;
        const fx0 = intensities.start.fx;
        const fx1 = intensities.end.fx;
        const deltaFx = fx1 - fx0;
        return -(fx0 * x + 0.5 * deltaFx * (x * x) / l);
    }

    computeBeamVContrib(x: number): number {
        const intensities = this.getLocalIntensities();
        const geo = this.domain.getElement(this.target).computeGeo();
        const l = geo.l;
        const fz0 = intensities.start.fz;
        const fz1 = intensities.end.fz;
        const deltaFz = fz1 - fz0;
        return -(fz0 * x + 0.5 * deltaFz * (x * x) / l);
    }

    computeBeamMContrib(x: number): number {
        const intensities = this.getLocalIntensities();
        const geo = this.domain.getElement(this.target).computeGeo();
        const l = geo.l;
        const fz0 = intensities.start.fz;
        const fz1 = intensities.end.fz;
        const deltaFz = fz1 - fz0;
        return -(0.5 * fz0 * x * x + (deltaFz / (6 * l)) * x * x * x);
    }
}
