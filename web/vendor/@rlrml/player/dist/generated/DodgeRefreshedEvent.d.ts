import type { RemoteIdTs } from "./RemoteIdTs.ts";
/**
 * A frame where a player's dodge/flip availability is refreshed.
 */
export type DodgeRefreshedEvent = {
    time: number;
    frame: number;
    player: RemoteIdTs;
    player_position?: [number, number, number] | null;
    is_team_0: boolean;
    counter_value: number;
};
//# sourceMappingURL=DodgeRefreshedEvent.d.ts.map