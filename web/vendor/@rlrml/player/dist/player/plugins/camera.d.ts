import type { CameraSettings, PlayerPlugin } from "../types.js";
export type CameraPluginMode = "orbit" | "free" | "ballOrbit" | "follow";
export type { CameraSettings };
export interface CameraPluginOptions {
    /** Initial mode. Default "orbit" (or "follow" when `follow` is set). */
    mode?: CameraPluginMode;
    /** Player name to start following as soon as the plugin installs. */
    follow?: string;
    /**
     * Ball cam override: true/false forces it; null/undefined follows the
     * replay's recorded per-player ball-cam state (the original behavior).
     */
    ballCam?: boolean | null;
    /**
     * Explicit RL camera settings. Per-field precedence (highest first):
     * these explicit settings → the followed player's recorded preset (when the
     * replay carries one and `useRecordedSettings` isn't false) → RL defaults.
     */
    settings?: CameraSettings;
    /**
     * Seed follow-mode settings from the followed player's recorded camera
     * preset (replays replicate each player's distance/height/angle/stiffness/
     * swivel/transition/fov). Default true.
     */
    useRecordedSettings?: boolean;
}
export interface CameraPlugin extends PlayerPlugin {
    setMode(mode: CameraPluginMode): void;
    getMode(): CameraPluginMode;
    /** Attach the camera to this player (by adapter player name) — mode "follow". */
    follow(playerName: string): void;
    /** Detach and return control to the core's orbit camera — mode "orbit". */
    release(): void;
    getTarget(): string | null;
    /** true/false = force ball/car cam; null = use the replay's recorded state. */
    setBallCam(enabled: boolean | null): void;
    /** The ball-cam state currently applied to the camera. */
    getBallCam(): boolean;
    /**
     * Merge explicit settings (they win over the recorded preset + defaults).
     * Pass `null` to clear all explicit overrides (recorded preset + defaults
     * apply again) — matching @rlrml/player's `setCustomCameraSettings(null)`.
     */
    setCameraSettings(settings: CameraSettings | null): void;
    /** Scale the effective follow distance (parity with cameraDistanceScale). */
    setDistanceScale(scale: number): void;
    getDistanceScale(): number;
    /** The effective settings currently applied (defaults ⊕ recorded ⊕ explicit). */
    getCameraSettings(): CameraSettings;
    /** The follow target's recorded camera preset, when the replay carries one. */
    getRecordedSettings(): CameraSettings | null;
}
export declare function createCameraPlugin(options?: CameraPluginOptions): CameraPlugin;
//# sourceMappingURL=camera.d.ts.map