import type { ReplayPlayerPlugin } from "../../types";
import type { ViewerPlugin } from "../types.js";
/**
 * Wrap a `ReplayPlayerPlugin` (or one with extra members, e.g.
 * `TimelineOverlayPlugin`) as a `ViewerPlugin`. Extra members survive on the
 * returned object so handles like `overlay.setVisible()` keep working.
 */
export declare function fromReplayPlayerPlugin<P extends ReplayPlayerPlugin>(plugin: P): ViewerPlugin & Omit<P, keyof ReplayPlayerPlugin>;
//# sourceMappingURL=replay-player-bridge.d.ts.map