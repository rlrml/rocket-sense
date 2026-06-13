import type { QuaternionTs } from "./QuaternionTs.ts";
import type { Vector3fTs } from "./Vector3fTs.ts";
export type RigidBodyTs = {
    sleeping: boolean;
    location: Vector3fTs;
    rotation: QuaternionTs;
    linear_velocity: Vector3fTs | null;
    angular_velocity: Vector3fTs | null;
};
//# sourceMappingURL=RigidBodyTs.d.ts.map