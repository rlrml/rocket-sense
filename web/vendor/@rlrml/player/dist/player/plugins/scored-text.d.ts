import type { PlayerPlugin } from "../types.js";
export interface ScoredTextOverlayOptions {
    /**
     * Seconds the banner stays up after a goal (default 4, matching the original
     * GameEngine's GOAL_TEXT_DURATION).
     */
    durationSeconds?: number;
    /**
     * Where to mount the banner. Defaults to the player container so it floats
     * full-screen and centered over the canvas.
     */
    mount?: HTMLElement | (() => HTMLElement | null);
    /**
     * Build the banner text from the scorer's name (empty string when unknown).
     * Default: `${name} SCORED !!` uppercased, or `GOAL !!` when no scorer.
     */
    formatText?: (scorerName: string) => string;
}
export declare function createScoredTextPlugin(options?: ScoredTextOverlayOptions): PlayerPlugin;
//# sourceMappingURL=scored-text.d.ts.map