export class SceneManager {
    constructor(container: any);
    container: any;
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
    loadSkybox(skyboxId?: string): Promise<any>;
    currentSkyboxId: string | null | undefined;
    setSkybox(skyboxId: any): void;
    /**
     * Set a simple default background (no skybox HDR)
     * Used when no custom environment is selected
     */
    setDefaultBackground(): void;
    setExposure(value: any): void;
    onWindowResize(): void;
    render(): void;
    dispose(): void;
}
import * as THREE from "three";
//# sourceMappingURL=SceneManager.d.ts.map