import type { ReplayLoadResult } from "@rlrml/player";
/** .replay bytes -> { replay: ReplayModel, raw } (plain JS, Maps flattened). */
export declare function loadReplay(bytes: Uint8Array): Promise<ReplayLoadResult>;
/** .replay bytes -> raw subtr-actor ReplayData only (legacy entry). */
export declare function parseReplay(bytes: Uint8Array): Promise<unknown>;
//# sourceMappingURL=wasm.d.ts.map