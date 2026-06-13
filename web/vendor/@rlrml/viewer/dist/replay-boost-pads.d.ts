import type { RawReplayFramesData, ReplayBoostPad, ReplayPlayerTrack } from "./types";
interface NormalizeReplayProgressTracker {
    advance(units?: number): boolean;
}
interface AsyncNormalizeReplayProgressTracker extends NormalizeReplayProgressTracker {
    yieldToMainThread(): Promise<void>;
}
export declare const STANDARD_SOCCAR_BOOST_PAD_COUNT = 34;
export declare function buildBoostPads(raw: RawReplayFramesData, players: ReplayPlayerTrack[], startTime: number, progressTracker?: NormalizeReplayProgressTracker): ReplayBoostPad[];
export declare function buildBoostPadsAsync(raw: RawReplayFramesData, players: ReplayPlayerTrack[], startTime: number, progressTracker: AsyncNormalizeReplayProgressTracker): Promise<ReplayBoostPad[]>;
export {};
//# sourceMappingURL=replay-boost-pads.d.ts.map