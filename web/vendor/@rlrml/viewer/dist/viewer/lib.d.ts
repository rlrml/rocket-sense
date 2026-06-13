import { ViewerPlayer } from "./ViewerPlayer.js";
import type { ViewerOptions } from "./types.js";
import type { ReplayLoadResult } from "../types";
/**
 * Parse raw `.replay` bytes and mount a player into `container`.
 *
 * One WASM parse feeds both data layers: the adapter (renderer timelines) and
 * `viewer.replay` (@rlrml/player's `ReplayModel` — docs/PLAYER_PARITY.md
 * Phase 2).
 */
export declare function createViewer(container: HTMLElement, replayBytes: Uint8Array, options?: ViewerOptions): Promise<ViewerPlayer>;
/**
 * Mount a player from an already-parsed replay (`{ raw, replay }`, the shape
 * `loadReplay` / @rlrml/player's `loadReplayFromBytes` return). Synchronous —
 * no WASM call. Use this when the host app already parsed the replay (e.g. in
 * a worker with progress reporting, like js/stat-evaluation-player) so the
 * bytes aren't parsed twice.
 */
export declare function createViewerFromParsed(container: HTMLElement, parsed: ReplayLoadResult, options?: ViewerOptions): ViewerPlayer;
export { ViewerPlayer } from "./ViewerPlayer.js";
export { SubtrActorPlayer } from "./adapter/SubtrActorPlayer.js";
export type { RecordedCameraSettings, SubtrActorPlayerOptions, ViewerPlayerInfo, } from "./adapter/SubtrActorPlayer.js";
export { loadReplay, parseReplay } from "./adapter/wasm.js";
export type { ReplayLoadResult, ReplayModel } from "../types";
export type { ReplayScene } from "../scene";
export { createNameTagPlugin } from "./plugins/name-tags.js";
export { createBoostPadsPlugin } from "./plugins/boost-pads.js";
export { createFpsOverlayPlugin } from "./plugins/fps-overlay.js";
export type { FpsOverlayOptions, FpsSample } from "./plugins/fps-overlay.js";
export { fromReplayPlayerPlugin } from "./plugins/replay-player-bridge.js";
export { BOOST_RAW_MAX, boostAmountToPercent, boostPercentToAmount } from "../boost-units";
export { createBoostPadOverlayPlugin } from "../boost-pad-overlay";
export { createBoostPickupAnimationPlugin } from "../boost-pickup-animation";
export { createCanvasRecorderPlugin } from "../canvas-recorder";
export { createTimelineOverlayPlugin, timelineEventSeekTime } from "../timeline-overlay";
export type { BoostPickupAnimationPluginOptions } from "../boost-pickup-animation";
export type { CanvasRecorderPlugin, CanvasRecorderPluginOptions } from "../canvas-recorder";
export type { TimelineOverlayPlugin, TimelineOverlayPluginOptions } from "../timeline-overlay";
export { createCameraPlugin } from "./plugins/camera.js";
export type { CameraPlugin, CameraPluginMode, CameraPluginOptions, CameraSettings, } from "./plugins/camera.js";
export type * from "./types.js";
//# sourceMappingURL=lib.d.ts.map