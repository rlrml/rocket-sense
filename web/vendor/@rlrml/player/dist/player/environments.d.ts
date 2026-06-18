/**
 * Skybox environments for the player.
 *
 * An "environment" drives both the visible skybox (`scene.background`) and the
 * image-based lighting (`scene.environment` → reflections/ambient on every PBR
 * material — cars, arena, ball). This is the polish layer the original ballcam
 * player got from its HDR skyboxes; the neutral `RoomEnvironment` fallback in
 * `SceneManager.initDefaultEnvironment()` keeps the scene lit before/without one.
 *
 * Environments are static, client-side descriptors (no backend). The built-in
 * "space" mirrors ballcam's Space environment (PlanetaryEarth4k HDR). Register
 * more with `registerEnvironment`, or pass a full descriptor inline.
 */
export interface PlayerEnvironment {
    /** Stable id (also the key used to look it up). */
    id: string;
    /**
     * URL of the equirectangular HDR skybox, resolved against the player asset
     * base unless absolute. Bundled assets live under `public/skyboxes/` and ship
     * with the package.
     */
    skyboxUrl: string;
    /** `renderer.toneMappingExposure` while this environment is active (default 1.0). */
    exposure?: number;
    /** Static skybox tilt in degrees, applied to background + environment maps. */
    rotation?: {
        x?: number;
        y?: number;
        z?: number;
    };
    /** Optional slow drift about the Y axis (degrees/second). Disabled by default. */
    animation?: {
        enabled: boolean;
        speed: number;
    };
}
/**
 * An environment spec accepted by the player:
 * - a built-in id (e.g. `"space"`),
 * - a full {@link PlayerEnvironment} descriptor, or
 * - `false` to use only the neutral default lighting (no skybox).
 */
export type PlayerEnvironmentSpec = string | PlayerEnvironment | false;
/** The player's default environment when none is specified. */
export declare const DEFAULT_ENVIRONMENT_ID = "space";
/**
 * Register (or override) a built-in environment so it can be referenced by id
 * via the `environment` option or {@link ReplayPlayer.setEnvironment}.
 */
export declare function registerEnvironment(env: PlayerEnvironment): void;
/** List the currently-registered built-in environment ids. */
export declare function listEnvironments(): string[];
/**
 * Resolve a spec to a concrete {@link PlayerEnvironment}, or `null` for the
 * neutral default (when `spec` is `false` or an unknown id).
 */
export declare function resolveEnvironment(spec: PlayerEnvironmentSpec): PlayerEnvironment | null;
//# sourceMappingURL=environments.d.ts.map