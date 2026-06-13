/**
 * A replay tick mark stored in the replay file.
 *
 * Rocket League/Boxcars use tick marks for replay timeline annotations such as
 * goal markers and other saved replay highlights. The frame is preserved from
 * the replay body; `time` is resolved from collected frame metadata when that
 * frame is present in the processed replay.
 */
export type ReplayTickMark = {
    description: string;
    frame: number;
    time: number | null;
};
//# sourceMappingURL=ReplayTickMark.d.ts.map