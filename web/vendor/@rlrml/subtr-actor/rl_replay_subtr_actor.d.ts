/* tslint:disable */
/* eslint-disable */

/**
 * Get column headers for the NDArray (useful for understanding the data structure)
 */
export function get_column_headers(global_feature_adders?: string[] | null, player_feature_adders?: string[] | null): any;

export function get_legacy_stats_timeline_json(data: Uint8Array): Uint8Array;

/**
 * Get NDArray data with metadata from replay data
 */
export function get_ndarray_with_info(data: Uint8Array, global_feature_adders?: string[] | null, player_feature_adders?: string[] | null, fps?: number | null): any;

export function get_replay_bundle_json_parts_with_progress(data: Uint8Array, callback: Function, report_every_n_frames?: number | null, max_frame_chunk_bytes?: number | null): any;

export function get_replay_bundle_json_with_progress(data: Uint8Array, callback: Function, report_every_n_frames?: number | null): any;

/**
 * Get structured frame data using ReplayDataCollector
 * This matches Python behavior - no FPS resampling, so goal frame numbers align
 */
export function get_replay_frames_data(data: Uint8Array): any;

export function get_replay_frames_data_json_with_progress(data: Uint8Array, callback: Function, report_every_n_frames?: number | null): Uint8Array;

export function get_replay_frames_data_with_progress(data: Uint8Array, callback: Function, report_every_n_frames?: number | null): any;

/**
 * Get basic replay information (version, etc.)
 */
export function get_replay_info(data: Uint8Array): any;

/**
 * Get only the replay metadata (without processing frames)
 */
export function get_replay_meta(data: Uint8Array, global_feature_adders?: string[] | null, player_feature_adders?: string[] | null): any;

/**
 * Get compact event-backed stats frames for each replay sample.
 */
export function get_stats_timeline(data: Uint8Array): any;

export function get_stats_timeline_json(data: Uint8Array): Uint8Array;

export function get_stats_timeline_json_parts(data: Uint8Array, max_frame_chunk_bytes?: number | null): any;

export function main(): void;

/**
 * Parse a replay file and return the raw replay data as JavaScript object
 */
export function parse_replay(data: Uint8Array): any;

/**
 * Validate that a replay file can be parsed
 */
export function validate_replay(data: Uint8Array): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly get_column_headers: (a: number, b: number, c: number, d: number) => [number, number, number];
    readonly get_legacy_stats_timeline_json: (a: number, b: number) => [number, number, number, number];
    readonly get_ndarray_with_info: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number, number];
    readonly get_replay_bundle_json_parts_with_progress: (a: number, b: number, c: any, d: number, e: number) => [number, number, number];
    readonly get_replay_bundle_json_with_progress: (a: number, b: number, c: any, d: number) => [number, number, number];
    readonly get_replay_frames_data: (a: number, b: number) => [number, number, number];
    readonly get_replay_frames_data_json_with_progress: (a: number, b: number, c: any, d: number) => [number, number, number, number];
    readonly get_replay_frames_data_with_progress: (a: number, b: number, c: any, d: number) => [number, number, number];
    readonly get_replay_info: (a: number, b: number) => [number, number, number];
    readonly get_replay_meta: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
    readonly get_stats_timeline: (a: number, b: number) => [number, number, number];
    readonly get_stats_timeline_json: (a: number, b: number) => [number, number, number, number];
    readonly get_stats_timeline_json_parts: (a: number, b: number, c: number) => [number, number, number];
    readonly main: () => void;
    readonly parse_replay: (a: number, b: number) => [number, number, number];
    readonly validate_replay: (a: number, b: number) => [number, number, number];
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
