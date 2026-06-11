import type { RawPlayerId, ReplayPlayerTrack } from "./types";
export declare function playerIdToString(playerId: RawPlayerId): string;
export declare function normalizeReplayTime(rawTime: number, startTime: number): number;
export declare function buildPlayerLookup(players: ReplayPlayerTrack[]): Map<string, ReplayPlayerTrack>;
//# sourceMappingURL=replay-data-helpers.d.ts.map