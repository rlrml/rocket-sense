import type { RemoteIdTs } from "./RemoteIdTs.ts";
import type { Vector3fTs } from "./Vector3fTs.ts";
export type ShotSaveMetadata = {
    time: number;
    frame: number;
    player: RemoteIdTs;
    player_position?: Vector3fTs | null;
    is_team_0: boolean;
};
//# sourceMappingURL=ShotSaveMetadata.d.ts.map