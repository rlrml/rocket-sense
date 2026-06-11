import type { ReplayGameType } from "./ReplayGameType.ts";
/**
 * Raw and normalized game-type metadata for a replay.
 */
export type ReplayGameTypeDetails = {
    /**
     * Easy-to-use normalized classification.
     */
    game_type: ReplayGameType;
    /**
     * Header `MatchType`, when present. Post-EAC online replays often only say `Online`.
     */
    header_match_type: string | null;
    /**
     * Network `ProjectX.GRI_X:ReplicatedGamePlaylist`, when present.
     */
    playlist_id: number | null;
    /**
     * Network `TAGame.GameEvent_TA:MatchTypeClass`, resolved to its actor object name.
     */
    match_type_class: string | null;
};
//# sourceMappingURL=ReplayGameTypeDetails.d.ts.map