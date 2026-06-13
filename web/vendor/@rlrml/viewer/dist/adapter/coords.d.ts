/**
 * Coordinate + unit conversion: subtr-actor (native Unreal) -> ballcam THREE space.
 *
 * subtr-actor emits rigid bodies in Rocket League / Unreal convention (Z-up, raw
 * Unreal Units, quaternion {x,y,z,w}). Ballcam's renderer (ActorManager etc.)
 * consumes THREE-space (Y-up) data. This is the EXACT remap ballcam's
 * PhysicsCompiler / ReplayState._compileBallTimeline applied to boxcars data:
 *
 *   position: x -> x,  z -> y,  y -> z
 *   rotation: x -> x,  z -> y,  y -> z,  w -> -w
 *   velocity: same axis swap as position
 *
 * Keeping this in one place makes it the single source of truth for the #1
 * correctness risk in the whole integration.
 */
export interface Vec3 {
    x: number;
    y: number;
    z: number;
}
export interface Quat {
    x: number;
    y: number;
    z: number;
    w: number;
}
/** Raw subtr-actor Vector3fTs -> THREE-space Vec3 (RL Z-up -> THREE Y-up). */
export declare function vec3RlToThree(v: {
    x: number;
    y: number;
    z: number;
} | null | undefined): Vec3 | null;
/** Raw subtr-actor QuaternionTs -> THREE-space quaternion. */
export declare function quatRlToThree(q: {
    x: number;
    y: number;
    z: number;
    w: number;
} | null | undefined): Quat | null;
/** subtr-actor raw boost (0-255) -> ballcam entity boost (0-100). */
export declare function boostToPercent(raw: number): number;
//# sourceMappingURL=coords.d.ts.map