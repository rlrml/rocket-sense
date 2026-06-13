import type { BoostPadEventKind } from "./BoostPadEventKind.ts";
import type { RemoteIdTs } from "./RemoteIdTs.ts";
import type { Vector3fTs } from "./Vector3fTs.ts";
export type BoostPadEvent = {
    time: number;
    frame: number;
    pad_id: string;
    player: RemoteIdTs | null;
    player_position?: Vector3fTs | null;
    kind: BoostPadEventKind;
};
//# sourceMappingURL=BoostPadEvent.d.ts.map