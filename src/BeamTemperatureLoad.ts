import * as math from "mathjs";
import { Beam2D } from "./Beam2D";
import { BeamElementLoad } from "./BeamElementLoad";
import { Domain } from "./Domain";
import { LabelType } from ".";

/**
 * 梁单元温度荷载。
 * values 约定为 [平均温升, 上缘温度, 下缘温度]，
 * 分别对应整体热伸长和因温度梯度引起的附加弯矩效应。
 */
export class BeamTemperatureLoad extends BeamElementLoad {
  values: number[];

  constructor(elem: LabelType, domain: Domain, values: number[]) {
    super(elem, domain);
    this.values = values;
  }

  change(elem: LabelType, values: number[]) {
    this.target = elem.toString();
    this.values = values;
  }

  // 在单元局部坐标系中计算固定端梁温度作用对应的等效节点力。
  getLoadVectorForClampedBeam(): Array<number> {
    const mat = this.domain.getElement(this.target).getMaterial();
    const cs = this.domain.getElement(this.target).getCS();

    const e = mat.e;
    const alpha = mat.alpha;

    const a = cs.a;
    const iy = cs.iy;
    const h = cs.h;

    // 上下缘温差导致曲率，从而产生一对等值反向端弯矩。
    const dT = this.values[1] - this.values[2];

    return [
      +e * a * alpha * this.values[0],
      0,
      +(e * iy * alpha * dT) / h,
      -e * a * alpha * this.values[0],
      0,
      -(e * iy * alpha * dT) / h,
    ];
  }

  getLocationArray(): number[] {
    return this.domain.getElement(this.target).getLocationArray();
  }

  getLoadVector(): number[] {
    const elem = <Beam2D>this.domain.getElement(this.target);
    const t = elem.computeT();
    const f = this.getLoadVectorForClampedBeam();
    if (elem.hasHinges()) {
      // 若存在端部释放，需要对固定端等效节点力做静力凝聚。
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
    // 温度荷载的影响已体现在等效节点力中，这里不再重复加解析附加项。
    const w = 0.0;
    const u = 0.0;
    return { u: u, w: w };
  }
  computeBeamNContrib(x: number): number {
    return 0.0;
  }
  computeBeamVContrib(x: number): number {
    return 0.0;
  }
  computeBeamMContrib(x: number): number {
    return 0.0;
  }
}
