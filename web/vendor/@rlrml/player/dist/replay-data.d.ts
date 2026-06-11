import type { RawReplayFramesData, ReplayModel } from "./types";
export interface NormalizeReplayDataOptions {
    onProgress?: (progress: number, details: NormalizeReplayProgress) => void;
    progressReportMinDelta?: number;
    progressReportFrameInterval?: number;
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