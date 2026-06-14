import * as THREE from "three";
import type { ReplayScene } from "../scene";
import type { CameraSettings, Quaternion, ReplayCameraViewMode, ReplayFreeCameraPreset, ReplayModel, Vec3 } from "../types";
export interface AttachedCameraBlendState {
    currentBlend: number;
    targetBlend: number;
    lastIsBallCam: boolean | null;
}
export declare function isPositionDiscontinuity(current: Vec3 | null, next: Vec3 | null, dt: number): boolean;
export declare function interpolatePosition(current: Vec3 | null, next: Vec3 | null, alpha: number): Vec3 | null;
export declare function interpolatePositionHermite(current: Vec3 | null, next: Vec3 | null, currentVelocity: Vec3 | null, nextVelocity: Vec3 | null, dt: number, alpha: number): Vec3 | null;
export declare function interpolateQuaternion(current: Quaternion | null, next: Quaternion | null, alpha: number): THREE.Quaternion | null;
export declare function rootPosition(position: Vec3): THREE.Vector3;
export declare function worldPosition(position: Vec3, fieldScale: number): THREE.Vector3;
export declare function getFreeCameraPreset(preset: ReplayFreeCameraPreset, fieldScale: number, aspect?: number): {
    position: THREE.Vector3;
    target: THREE.Vector3;
    up: THREE.Vector3;
    fov: number;
};
export declare function updateFreeCameraTransition(options: {
    sceneState: ReplayScene;
    position: THREE.Vector3;
    target: THREE.Vector3;
    up: THREE.Vector3;
    fov: number;
}): boolean;
export declare function updateAttachedCamera(options: {
    sceneState: ReplayScene;
    replay: ReplayModel;
    fieldScale: number;
    cameraViewMode: ReplayCameraViewMode;
    attachedPlayerId: string | null;
    ballCamEnabled: boolean;
    cameraDistanceScale: number;
    customCameraSettings: CameraSettings | null;
    frameIndex: number;
    nextFrameIndex: number;
    alpha: number;
    dt: number;
    renderDelta: number;
    attachedPlayerUnavailable?: boolean;
    ballPosition: THREE.Vector3 | null;
    desiredCameraPosition: THREE.Vector3;
    desiredLookTarget: THREE.Vector3;
    blendState?: AttachedCameraBlendState;
    /**
     * When true, rotate the chase camera by the followed player's replicated
     * camera yaw/pitch (free-look swivel) instead of locking it to car
     * orientation. Opt-in: the angles need per-replay sign tuning and only
     * matter while the player is free-looking, so the default keeps the existing
     * synthetic framing.
     */
    replayCameraLook?: boolean;
}): void;
//# sourceMappingURL=spatial.d.ts.map