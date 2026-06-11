import type { RawPlayerInfo } from "./raw-types";
export type ReplayHitboxKind = "breakout" | "dominus" | "hybrid" | "merc" | "octane" | "plank";
export interface ReplayHitboxSpec {
    kind: ReplayHitboxKind;
    label: string;
    length: number;
    width: number;
    height: number;
    slopeDegrees: number;
    groundHeightFront: number;
    groundHeightBack: number;
    offset: number;
    elevation: number;
}
export interface ReplayHitboxOverlayTransform {
    position: readonly [x: number, y: number, z: number];
    rotationYDegrees: number;
    dimensions: readonly [x: number, y: number, z: number];
}
export declare const DEFAULT_REPLAY_HITBOX_KIND: ReplayHitboxKind;
export declare const REPLAY_HITBOX_SPECS: Readonly<Record<ReplayHitboxKind, ReplayHitboxSpec>>;
export declare function inferReplayHitboxKindFromBodyName(bodyName: string | null | undefined): ReplayHitboxKind | null;
export declare function normalizeReplayHitboxKind(value: string | null | undefined): ReplayHitboxKind | null;
export declare function getReplayHitboxSpec(kind: ReplayHitboxKind): ReplayHitboxSpec;
export declare function getReplayHitboxOverlayTransform(hitbox: ReplayHitboxSpec): ReplayHitboxOverlayTransform;
export declare function inferReplayHitboxKind(playerInfo: RawPlayerInfo | null | undefined): ReplayHitboxKind;
//# sourceMappingURL=hitboxes.d.ts.map