import { Load } from "./Load";

/**
 * 梁单元荷载抽象基类。
 * 在基础荷载接口上进一步约定了对梁单元的等效节点力、挠度贡献和内力贡献接口，
 * 便于后处理中把单元外载直接叠加到位移曲线和内力图上。
 */
export class BeamElementLoad extends Load {
  /** 返回固定端梁假定下的局部等效节点力向量。 */
  getLoadVectorForClampedBeam(): Array<number> {
    return [];
  }

  /** 返回该荷载对梁轴向位移/挠度的附加贡献。 */
  computeBeamDeflectionContrib(xl: number): { u: number; w: number } {
    return { u: 0, w: 0 };
  }

  /** 返回该荷载对轴力图在 x 位置的附加贡献。 */
  computeBeamNContrib(x: number): number {
    return 0;
  }

  /** 返回该荷载对剪力图在 x 位置的附加贡献。 */
  computeBeamVContrib(x: number): number {
    return 0;
  }

  /** 返回该荷载对弯矩图在 x 位置的附加贡献。 */
  computeBeamMContrib(x: number): number {
    return 0;
  }
}
