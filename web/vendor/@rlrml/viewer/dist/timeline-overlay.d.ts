import type { ReplayPlayerPlugin, ReplayPlayerTimelineProjection, ReplayTimelineEvent, ReplayTimelineEventKind, ReplayTimelineEventSource, ReplayTimelineRangeSource } from "./types";
export interface TimelineOverlayPluginOptions {
    pauseWhileScrubbing?: boolean;
    includeReplayEvents?: boolean;
    replayEventKinds?: Iterable<ReplayTimelineEventKind>;
    replayEventsLabel?: string;
    replayEvents?: ReplayTimelineEventSource;
    eventsLabel?: string;
    events?: ReplayTimelineEventSource;
    ranges?: ReplayTimelineRangeSource;
}
export interface TimelineOverlayEventSourceOptions {
    id?: string;
    label?: string;
}
export interface TimelineOverlayPlugin extends ReplayPlayerPlugin {
    addEventSource(source: ReplayTimelineEventSource, options?: TimelineOverlayEventSourceOptions): () => void;
    removeEventSource(source: ReplayTimelineEventSource): boolean;
    refreshEvents(): void;
    addRangeSource(source: ReplayTimelineRangeSource): () => void;
    removeRangeSource(source: ReplayTimelineRangeSource): boolean;
    refreshRanges(): void;
}
export declare function timelineEventSeekTime(event: ReplayTimelineEvent): number;
export declare function projectedRangeTimelineBounds(startProjection: ReplayPlayerTimelineProjection, endProjection: ReplayPlayerTimelineProjection, duration: number): {
    startTimelineTime: number;
    endTimelineTime: number;
};
export declare function createTimelineOverlayPlugin(options?: TimelineOverlayPluginOptions): TimelineOverlayPlugin;
//# sourceMappingURL=timeline-overlay.d.ts.map