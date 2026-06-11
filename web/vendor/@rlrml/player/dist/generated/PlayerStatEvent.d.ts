import type { PlayerStatEventKind } from "./PlayerStatEventKind.ts";
import type { RemoteIdTs } from "./RemoteIdTs.ts";
import type { ShotEventMetadata } from "./ShotEventMetadata.ts";
import type { Vector3fTs } from "./Vector3fTs.ts";
export type PlayerStatEvent = {
    time: number;
    frame: number;
    player: RemoteIdTs;
    player_position?: Vector3fTs | null;
    is_team_0: boolean;
    kind: PlayerStatEventKind;
    shot?: ShotEventMetadata | null;
};
//# sourceMappingURL=PlayerStatEvent.d.ts.map