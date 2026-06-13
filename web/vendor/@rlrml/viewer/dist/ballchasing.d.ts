import type { ReplaySource } from "./types";
export declare const BALLCHASING_API_BASE_URL = "https://ballchasing.com/api";
export declare const BALLCHASING_BASE_URL = "https://ballchasing.com";
export interface BallchasingReplayDownloadOptions {
    baseUrl?: string | URL;
    fetch?: typeof fetch;
    fetchInit?: RequestInit;
    signal?: AbortSignal;
}
export declare function isBallchasingReplayId(value: string): boolean;
export declare function normalizeBallchasingReplayId(value: string): string;
export declare function getBallchasingReplayFileName(idOrUrl: string): string;
export declare function getBallchasingReplayFileUrl(idOrUrl: string, baseUrl?: string | URL): URL;
export declare function getBallchasingReplayApiFileUrl(idOrUrl: string, apiBaseUrl?: string | URL): URL;
export declare function fetchBallchasingReplayBytes(idOrUrl: string, options?: BallchasingReplayDownloadOptions): Promise<Uint8Array>;
export declare function createBallchasingReplaySource(idOrUrl: string, options?: BallchasingReplayDownloadOptions): ReplaySource;
//# sourceMappingURL=ballchasing.d.ts.map