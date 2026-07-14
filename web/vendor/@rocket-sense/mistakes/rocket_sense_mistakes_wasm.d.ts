/* tslint:disable */
/* eslint-disable */

/**
 * Run mistake detection over a parsed replay for one focus player.
 *
 * * `raw_replay_data` — the raw frames object returned by
 *   `@rlrml/subtr-actor`'s `get_replay_frames_data` (the `raw` field of
 *   `@rlrml/player`'s `loadReplay` result).
 * * `focus_player` — a player track id (`platform:id`, as used by
 *   `ReplayPlayerTrack.id`) or a display name; ids are tried first.
 * * `profile_config` — optional detector-profile overrides (JSON object
 *   mirroring the Python `profile_config`), or undefined for defaults.
 *
 * Returns `{ detector_version, features_version, focus_player_idx,
 * focus_player_key, focus_player_name, markers: [...] }` where each marker is
 * `{ kind, time, t_start, t_end, player_idx, player, with_player?, severity,
 * score, features, features_version, evidence? }` with times in the player
 * clock (seconds, first frame = 0).
 */
export function detect_mistakes(raw_replay_data: any, focus_player: string, profile_config: any): any;

/**
 * List the player identities the detector can focus on, in view order:
 * `[{ key, name, is_team_zero }]`.
 */
export function list_focus_players(raw_replay_data: any): any;

export function main(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly detect_mistakes: (a: any, b: number, c: number, d: any) => [number, number, number];
    readonly list_focus_players: (a: any) => [number, number, number];
    readonly main: () => void;
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
