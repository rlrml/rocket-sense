import type { RemoteIdTs } from "./RemoteIdTs.ts";
export type PostWallDodgeEvent = {
    time: number;
    frame: number;
    player: RemoteIdTs;
    player_position?: [number, number, number] | null;
    is_team_0: boolean;
    wall_contact_time: number;
    time_since_wall_contact: number;
};
//# sourceMappingURL=PostWallDodgeEvent.d.ts.map