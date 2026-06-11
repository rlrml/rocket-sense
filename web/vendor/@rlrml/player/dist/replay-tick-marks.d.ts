import type { RawReplayFramesData, ReplayTickMark, ReplayTimelineEvent } from "./types";
interface ReplayTickMarkProgressTracker {
    advance(units?: number): unknown;
}
export declare function buildReplayTickMarks(raw: RawReplayFramesData, startTime: number, progressTracker?: ReplayTickMarkProgressTracker): ReplayTickMark[];
export declare function replayTickMarkTimelineEvent(tickMark: ReplayTickMark): ReplayTimelineEvent;
export {};
//# sourceMappingURL=replay-tick-marks.d.ts.map