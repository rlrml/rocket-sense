import type { RawReplayFramesData, ReplayModel } from "./types";
export interface NormalizeReplayDataOptions {
    onProgress?: (progress: number, details: NormalizeReplayProgress) => void;
    progressReportMinDelta?: number;
    progressReportFrameInterval?: number;
    /**
     * Apply Ballcam-style velocity-based correction to normalized ball/player
     * samples. Defaults to true; set false when inspecting exact raw frame
     * positions.
     */
    motionSmoothing?: boolean;
    /** Blend toward the measured replay sample during velocity correction. */
    smoothingBlendFactor?: number;
    /** Every N corrected samples, use a stronger measured-sample anchor. */
    smoothingAnchorInterval?: number;
}
export interface NormalizeReplayDataAsyncOptions extends NormalizeReplayDataOptions {
    yieldEveryMs?: number;
    yieldToMainThread?: () => Promise<void>;
}
export interface NormalizeReplayProgress {
    progress: number;
    processedFrames: number;
    totalFrames: number;
    processedUnits: number;
    totalUnits: number;
}
export declare function normalizeReplayData(raw: RawReplayFramesData, options?: NormalizeReplayDataOptions): ReplayModel;
export declare function normalizeReplayDataAsync(raw: RawReplayFramesData, options?: NormalizeReplayDataAsyncOptions): Promise<ReplayModel>;
export declare function findFrameIndexAtTime(replay: ReplayModel, time: number): number;
//# sourceMappingURL=replay-data.d.ts.map