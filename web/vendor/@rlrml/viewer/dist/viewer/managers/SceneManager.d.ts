export class SceneManager {
    constructor(container: any, options?: {});
    container: any;
    assetBase: any;
    scene: THREE.Scene | undefined;
    camera: THREE.PerspectiveCamera | undefined;
    renderer: THREE.WebGLRenderer | undefined;
    /**
     * Asset-free default lighting. The original ballcam app lit everything via
     * an HDR skybox (scene.environment -> IBL on the PBR materials); those HDRs
     * were never vendored into this package, so without this the scene renders
     * nearly black. RoomEnvironment + PMREM gives equivalent neutral IBL from
     * code, and a directional key light adds definition.
     */
    initDefaultEnvironment(): void;
    _neutralEnvTexture: THREE.Texture | undefined;
    _defaultLightsAdded: boolean | undefined;
    /**
     * Load and apply a {@link ViewerEnvironment}: an HDR skybox that drives both
     * the visible background and the image-based lighting (reflections/ambient) on
     * every PBR material. Async and non-blocking — call it without awaiting so the
     * neutral `initDefaultEnvironment()` lighting renders immediately and the HDR
     * swaps in once decoded. Resolves `true` on success, `false` on load failure
     * (the neutral default is left in place).
     *
     * @param {import("../environments.js").ViewerEnvironment} env
     * @returns {Promise<boolean>}
     */
    applyEnvironment(env: import("../environments.js").ViewerEnvironment): Promise<boolean>;
    currentEnvironmentId: string | null | undefined;
    _skyboxBaseRotation: {
        x: number;
        y: number;
        z: number;
    } | null | undefined;
    _skyboxAnimatedY: any;
    _skyboxAnimation: {
        enabled: boolean;
        speed: number;
    } | null | undefined;
    /** Apply base tilt + accumulated animation to background/environment rotation. */
    _applySkyboxRotation(): void;
    /**
     * Advance the slow skybox drift, if the active environment enables it. Cheap
     * no-op otherwise. `dt` is in seconds (already scaled by playback speed).
     */
    updateSkyboxAnimation(dt: any): void;
    /**
     * Revert to the neutral default: a flat background plus the asset-free
     * RoomEnvironment IBL (so PBR materials stay lit). Used when no environment is
     * selected (`environment: false`) or when switching away from an HDR skybox.
     */
    setDefaultBackground(): void;
    setExposure(value: any): void;
    onWindowResize(): void;
    render(): void;
    dispose(): void;
}
import * as THREE from "three";
//# sourceMappingURL=SceneManager.d.ts.map