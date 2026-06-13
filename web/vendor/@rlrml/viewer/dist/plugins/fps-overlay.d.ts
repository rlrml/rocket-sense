/**
 * FPS overlay plugin — a small HUD badge showing two distinct, live frame rates:
 *
 *  - **Render FPS**: the three.js render loop rate, measured from how often
 *    `beforeRender` actually fires (the rAF tick). This is the real GPU/CPU
 *    render throughput — typically 60/120/144 depending on the display.
 *  - **Replay FPS**: how many replay frames are *currently* going by per
 *    wall-clock second, measured from the per-frame `frameIndex` delta. Unlike
 *    the replay's fixed native sample rate (~30 Hz), this tracks live playback:
 *    ~30 at 1× speed, ~60 at 2×, 0 when paused, and spikes while scrubbing.
 *
 * Both are shown so it's obvious the smooth on-screen motion (render FPS) is
 * decoupled from the rate the underlying data is being consumed (replay FPS).
 * Opt in via the factory, like every other plugin:
 *
 *   createViewer(container, bytes, { plugins: [createFpsOverlayPlugin()] })
 */
import type { ViewerPlugin } from "../types.js";
/** A measured rate sample, emitted to `onSample` each update window. */
export interface FpsSample {
    /** three.js render-loop rate (rAF ticks per wall second). */
    renderFps: number;
    /** Live replay-frame advance rate (replay frames per wall second). */
    replayFps: number;
}
export interface FpsOverlayOptions {
    /**
     * Headless mode: receive the measured rates each window and render them
     * yourself (e.g. into host-styled fields). When set, the plugin creates no
     * DOM of its own — `mount`/`corner` are ignored.
     */
    onSample?: (sample: FpsSample) => void;
    /**
     * Where to render the built-in badge. When omitted, it floats over the
     * viewport (pinned to `corner`). Provide an element (or a getter) to mount it
     * inline somewhere host-owned — e.g. a playback/transport bar.
     */
    mount?: HTMLElement | (() => HTMLElement | null);
    /** Viewport corner for the floating badge (default "top-right"). Ignored when `mount` is set. */
    corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    /** How often to refresh the displayed rates, in ms (default 500). */
    updateIntervalMs?: number;
}
export declare function createFpsOverlayPlugin(options?: FpsOverlayOptions): ViewerPlugin;
//# sourceMappingURL=fps-overlay.d.ts.map