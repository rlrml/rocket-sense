import type { ReplayLoadOptions, ReplayLoadResult } from "./types";
type ReplayValidation = {
    valid: boolean;
    message?: string;
    error?: string;
};
export declare function ensureBindingsReady(): Promise<void>;
export declare function loadReplayFromBytes(data: Uint8Array, options?: ReplayLoadOptions): Promise<ReplayLoadResult>;
export declare function validateReplayBytes(data: Uint8Array): ReplayValidation;
export {};
//# sourceMappingURL=wasm.d.ts.map