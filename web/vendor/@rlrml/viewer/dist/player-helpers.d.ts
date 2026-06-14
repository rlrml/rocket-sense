import * as THREE from "three";
import type { Vector3 } from "three";
import type { DemoIndicator, ReplayScene } from "./scene";
import type { CameraSettings, ReplayCameraViewMode, ReplayModel, ReplayPlayerOptions, ReplayTimelineEvent, Vec3 } from "./types";
export declare const DEFAULT_CAMERA_VIEW_MODE: ReplayCameraViewMode;
export interface ReplayPlayerInitialSettings {
    speed: number;
    cameraDistanceScale: number;
    customCameraSettings: CameraSettings | null;
    attachedPlayerId: string | null;
    cameraViewMode: ReplayCameraViewMode;
    ballCamEnabled: boolean;
    useReplayBallCam: boolean;
    boostMeterEnabled: boolean;
    boostPickupAnimationEnabled: boolean;
    hitboxWireframesEnabled: boolean;
    hitboxOnlyModeEnabled: boolean;
    skipPostGoalTransitionsEnabled: boolean;
    skipKickoffsEnabled: boolean;
}
export interface ReplayBallRenderResult {
    ballFrame: ReplayModel["ballFrames"][number] | null;
    nextBallFrame: ReplayModel["ballFrames"][number] | null;
    ballPosition: Vector3 | null;
}
export declare function normalizeCustomCameraSettings(settings: CameraSettings | null | undefined): CameraSettings | null;
export declare function resolveInitialPlayerSettings(options: ReplayPlayerOptions): ReplayPlayerInitialSettings;
export declare function getKickoffSkipTargetTime(replay: ReplayModel, currentTime: number, liveGameState: number | null, kickoffGameState: number | null): number | null;
export declare function getPostGoalTransitionSkipTargetTime(replay: ReplayModel, currentTime: number, liveGameState: number | null, kickoffGameState: number | null): number | null;
export declare function updateReplayBallRender({ replay, sceneState, fieldScale, frameWindow, }: {
    replay: ReplayModel;
    sceneState: ReplayScene;
    fieldScale: number;
    frameWindow: {
        frameIndex: number;
        nextFrameIndex: number;
        alpha: number;
        dt: number;
    };
}): ReplayBallRenderResult;
export declare function isPlayerSamplePresent(sample: ReplayModel["players"][number]["frames"][number] | null | undefined): boolean;
export declare function getActiveDemoEvent(timelineEvents: ReplayTimelineEvent[], victimPlayerId: string, currentTime: number): ReplayTimelineEvent | null;
export declare function updateDemoIndicator({ indicator, fallbackPosition, demoEvent, currentTime, camera, }: {
    indicator: DemoIndicator | null;
    fallbackPosition: Vec3 | null;
    demoEvent: ReplayTimelineEvent | null;
    currentTime: number;
    camera: THREE.Camera;
}): void;
export declare function updateBoostTrail(boostTrail: THREE.Group, boostActive: boolean, boostFraction: number, time: number, playerIndex: number): void;
//# sourceMappingURL=player-helpers.d.ts.map