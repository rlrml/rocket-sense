import type { ReplayModel, ReplayPlayerKickoffCountdownMetadata, ReplayPlayerTimelineProjection, ReplayPlayerTimelineSegment } from "../types";
export declare function clampFrameIndex(replay: ReplayModel, frameIndex: number): number;
export declare function inferLiveGameState(replay: ReplayModel): number | null;
export declare function inferKickoffGameState(replay: ReplayModel, liveGameState: number | null): number | null;
export declare function isLiveGameplayFrame(frame: ReplayModel["frames"][number], liveGameState: number | null): boolean;
export declare function isKickoffFrame(frame: ReplayModel["frames"][number], kickoffGameState: number | null): boolean;
export declare function isPostGoalTransitionFrame(replay: ReplayModel, frame: ReplayModel["frames"][number], frameIndex: number, liveGameState: number | null, kickoffGameState: number | null): boolean;
export declare function computeTimelineSegments(replay: ReplayModel, skipPostGoalTransitionsEnabled: boolean, skipKickoffsEnabled: boolean, liveGameState: number | null, kickoffGameState: number | null): ReplayPlayerTimelineSegment[];
export declare function projectReplayTimeToTimeline(replayDuration: number, segments: ReplayPlayerTimelineSegment[], replayTime: number): ReplayPlayerTimelineProjection;
export declare function projectTimelineTimeToReplay(replayDuration: number, timelineDuration: number, segments: ReplayPlayerTimelineSegment[], timelineTime: number): number;
export declare function getReplayPlaybackEndTime(replayDuration: number, segments: ReplayPlayerTimelineSegment[]): number;
export declare function getKickoffCountdownMetadata(replay: ReplayModel, frameIndex: number, currentTime: number): ReplayPlayerKickoffCountdownMetadata | null;
export declare function getFrameWindow(replay: ReplayModel, time: number): {
    frameIndex: number;
    nextFrameIndex: number;
    alpha: number;
    dt: number;
};
//# sourceMappingURL=timeline.d.ts.map