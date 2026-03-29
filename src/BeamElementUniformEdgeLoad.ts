import * as math from "mathjs";
import { Beam2D } from "./Beam2D";
import { BeamElementLoad } from "./BeamElementLoad";
import { Domain } from "./Domain";
import { LabelType } from ".";

/**
 * 梁单元均布荷载。
 * 支持局部或整体坐标系输入，并提供固定端等效节点力及对位移、内力图的解析贡献。
 */
export class BeamElementUniformEdgeLoad extends BeamElementLoad {
  values: number[]; // [fx, fz] 方向上的均布荷载强度
  lcs: boolean; // true 表示输入值位于单元局部坐标系
  constructor(elem: LabelType, domain: Domain, values: number[], lcs: boolean) {
    super(elem, domain);
    this.values = values;
    this.lcs = lcs;
  }
  change(elem: LabelType, values: number[], lcs: boolean) {
    this.target = elem.toString();
    this.values = values;
    this.lcs = lcs;
  }
  getGlobalIntensities() {
    const fx = this.values[0]; // intensity in x-local
    const fz = this.values[1]; // intensity in z-local
    if (this.lcs) {
      // 若输入为局部坐标系荷载，则先转换到整体坐标系。
      const geo = this.domain.getElement(this.target).computeGeo();
      const cos = geo.dx / geo.l;
      const sin = geo.dz / geo.l;
      return { fx: fx * cos - fz * sin, fz: fx * sin + fz * cos, my: 0.0 };
    } else {
      return { fx: fx, fz: fz, my: 0.0 };
    }
  }
  getLocalIntensities() {
    const fx = this.values[0]; // intensity in x-local
    const fz = this.values[1]; // intensity in z-local
    const geo = this.domain.getElement(this.target).computeGeo();
    const l = geo.l;
    const dx = geo.dx;
    const dz = geo.dz;
    const cos = dx / l;
    const sin = dz / l;
    if (!this.lcs) {
      // 若输入为整体坐标系荷载，则转换到单元局部坐标系。
      return {
        fx: fx * cos + fz * sin,
        fz: -fx * sin + fz * cos,
      };
    } else {
      return { fx: fx, fz: fz };
    }
  }

  // 在单元局部坐标系中计算固定端梁的等效节点力。
  getLoadVectorForClampedBeam(): Array<number> {
    const geo = this.domain.getElement(this.target).computeGeo();
    const f = this.getLocalIntensities();
    const fx = f.fx;
    const fz = f.fz;
    const l = geo.l;

    return [-0.5 * l * fx, -0.5 * l * fz, (+1 / 12) * fz * l * l, -0.5 * l * fx, -0.5 * l * fz, (-1 / 12) * fz * l * l];
  }

  getLocationArray(): number[] {
    return this.domain.getElement(this.target).getLocationArray();
  }

  getLoadVector(): number[] {
    const elem = <Beam2D>this.domain.getElement(this.target);
    const t = elem.computeT();
    const f = this.getLoadVectorForClampedBeam();
    if (elem.hasHinges()) {
      // 若存在端部释放，需要按释放自由度做静力凝聚。
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
    // 对简支/固定边界之外的精确挠度后处理，附加均布荷载的解析项。
    const f = this.getLocalIntensities();
    const elem = this.domain.elements.get(this.target);
    const geo = elem.computeGeo();
    const l = geo.l;
    const w =
      (f.fz * l * l * l * l * ((xl * xl * xl * xl) / 24 - (xl * xl * xl) / 12 + (xl * xl) / 24)) /
      (elem.getMaterial().e * elem.getCS().iy);
    const u = 0.0;
    return { u: u, w: w };
  }

  computeBeamNContrib(x: number): number {
    const f = this.getLocalIntensities();
    return -f.fx * x;
  }

  computeBeamVContrib(x: number): number {
    const f = this.getLocalIntensities();
    return -f.fz * x;
  }

  computeBeamMContrib(x: number): number {
    const f = this.getLocalIntensities();
    return (-f.fz * x * x) / 2.0;
  }
}
