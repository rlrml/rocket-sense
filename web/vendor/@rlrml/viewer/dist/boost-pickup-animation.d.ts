import type { ReplayBoostPad, ReplayBoostPadEvent, ReplayPlayerPlugin, ReplayPlayerTrack } from "./types";
export interface BoostPickupAnimationPluginOptions {
    durationSeconds?: number;
    includePickup?: BoostPickupAnimationFilter;
}
export interface BoostPickupAnimationPickup {
    pad: ReplayBoostPad;
    event: ReplayBoostPadEvent;
    player: ReplayPlayerTrack;
}
export type BoostPickupAnimationFilter = (pickup: BoostPickupAnimationPickup) => boolean;
export declare function createBoostPickupAnimationPlugin(options?: BoostPickupAnimationPluginOptions): ReplayPlayerPlugin;
//# sourceMappingURL=boost-pickup-animation.d.ts.map