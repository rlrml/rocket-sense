import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { ReplayModel } from "./types";
/** A steerable/spinnable wheel on the example car mesh. */
export interface CarWheel {
    /** Steering pivot — rotated about local Z (car up) for front-wheel steer. */
    pivot: THREE.Group;
    /** Cylinder mesh — spun about its axle for roll. */
    wheel: THREE.Mesh;
    isFront: boolean;
}
/** Effective wheel radius in model (uu) space: geometry radius × inner scale. */
export declare const EXAMPLE_CAR_WHEEL_RADIUS_UU: number;
/** Returns the steerable wheels attached to an example car mesh, if any. */
export declare function getCarWheels(mesh: THREE.Object3D): CarWheel[] | undefined;
export interface ReplayScene {
    scene: THREE.Scene;
    replayRoot: THREE.Group;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    resize: () => void;
    dispose: () => void;
    ballMesh: THREE.Mesh;
    playerMeshes: Map<string, THREE.Object3D>;
    playerBodyMeshes: Map<string, THREE.Object3D>;
    playerHitboxes: Map<string, THREE.Object3D>;
    playerBoostTrails: Map<string, THREE.Group>;
    playerBoostMeters: Map<string, BoostMeter>;
    playerDemoIndicators: Map<string, DemoIndicator>;
    updateWallVisibility: () => void;
}
export declare function getHitboxOverlayColor(lineColor: string): THREE.Color;
export declare function setHitboxOverlayOnlyMode(hitbox: THREE.Object3D, enabled: boolean): void;
export interface BoostMeter {
    group: THREE.Group;
    fillMesh: THREE.Mesh;
    fillMaterial: THREE.MeshBasicMaterial;
    labelTexture: THREE.CanvasTexture;
    labelContext: CanvasRenderingContext2D;
    labelCanvas: HTMLCanvasElement;
    lastPercent: number | null;
}
export interface DemoIndicator {
    group: THREE.Group;
    ring: THREE.Mesh;
    label: THREE.Mesh;
}
export declare function updateBoostMeter(meter: BoostMeter, fraction: number, amount: number, camera: THREE.Camera): void;
export declare function createReplayScene(container: HTMLElement, replay: ReplayModel, fieldScale: number): ReplayScene;
//# sourceMappingURL=scene.d.ts.map