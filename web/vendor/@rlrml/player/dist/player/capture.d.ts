import type { ReplayLoadResult } from "../types";
import type { CameraSettings, PlayerFreeCameraPreset, PlayerOptions } from "./types.js";
import type { ReplayPlayer } from "./ReplayPlayer.js";
export type PlayerImageBallCamMode = boolean | "replay";
export type PlayerImageCamera = {
    mode: "free";
    preset?: PlayerFreeCameraPreset;
} | {
    mode: "attached";
    playerId?: string | null;
    playerName?: string | null;
    ballCam?: PlayerImageBallCamMode;
    cameraDistanceScale?: number;
    cameraSettings?: CameraSettings | null;
} | {
    mode: "custom";
    setup: (player: ReplayPlayer) => void | Promise<void>;
};
export interface PlayerImageCaptureOptions {
    width?: number;
    height?: number;
    pixelRatio?: number;
    time?: number;
    frameIndex?: number | null;
    camera?: PlayerImageCamera;
    playerOptions?: PlayerOptions;
    mimeType?: string;
    quality?: number;
    settleFrames?: number;
    readyTimeoutMs?: number | false;
}
export type PlayerImageCaptureRequest = Omit<PlayerImageCaptureOptions, "playerOptions" | "readyTimeoutMs">;
export interface PlayerImageCaptureResult {
    blob: Blob;
    dataUrl: string;
    width: number;
    height: number;
    pixelRatio: number;
    mimeType: string;
    time: number;
    frameIndex: number;
}
export declare function capturePlayerImage(replayBytes: Uint8Array, options?: PlayerImageCaptureOptions): Promise<PlayerImageCaptureResult>;
export declare function capturePlayerImages(replayBytes: Uint8Array, captures: PlayerImageCaptureRequest[], options?: PlayerImageCaptureOptions): Promise<PlayerImageCaptureResult[]>;
export declare function capturePlayerImageFromParsed(parsed: ReplayLoadResult, options?: PlayerImageCaptureOptions): Promise<PlayerImageCaptureResult>;
export declare function capturePlayerImagesFromParsed(parsed: ReplayLoadResult, captures: PlayerImageCaptureRequest[], options?: PlayerImageCaptureOptions): Promise<PlayerImageCaptureResult[]>;
//# sourceMappingURL=capture.d.ts.map