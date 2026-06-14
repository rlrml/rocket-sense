import type { ReplayPlayerPlugin } from "./types";
/**
 * Default world-space lift (Unreal units) applied to each car before
 * projecting its floating name/boost label, so the pill sits above the car
 * instead of on it. Exposed so consumers can seed UI controls with the same
 * default the plugin uses.
 */
export declare const DEFAULT_FLOATING_NAMEPLATE_LIFT_UU = 250;
export interface BallchasingOverlayPluginOptions {
    showFloatingNames?: boolean;
    showFloatingBoostBars?: boolean;
    showTeamBoostHud?: boolean;
    showFollowedPlayerHud?: boolean;
    /**
     * How far (Unreal units) to lift the floating name/boost pills above each
     * car. A function is read every frame, so callers can wire it to a live UI
     * control. Defaults to {@link DEFAULT_FLOATING_NAMEPLATE_LIFT_UU}.
     */
    floatingLiftUu?: number | (() => number | null | undefined);
}
export declare function createBallchasingOverlayPlugin(options?: BallchasingOverlayPluginOptions): ReplayPlayerPlugin;
//# sourceMappingURL=ballchasing-overlay.d.ts.map