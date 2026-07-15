/* tslint:disable */
/* eslint-disable */

/**
 * The loaded reranker models (`mistake_models.json`). Parse once, then pass
 * to every [`detect_mistakes`] call — the artifact is several MB of JSON and
 * re-parsing it per focus change would be wasted work.
 */
export class MistakeModels {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Parse a `mistake_models.json` artifact document. Throws when the
     * document is invalid or its `schema_version` doesn't match this
     * detector build (a stale artifact must fail loudly, not score
     * garbage); per-kind blobs that fail to parse are skipped like the
     * Python loader.
     */
    constructor(artifact_json: string);
    /**
     * Number of kinds with a loaded model.
     */
    readonly model_count: number;
}

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
 * Runs the pure heuristic path (`score == severity`). To gate with the
 * reranker, use [`detect_mistakes_with_models`] — one function per case
 * because wasm-bindgen cannot express `Option<&MistakeModels>` for exported
 * types, and taking `MistakeModels` by value would consume the caller's
 * cached handle.
 *
 * Returns `{ detector_version, features_version, focus_player_idx,
 * focus_player_key, focus_player_name, model_count, markers: [...] }` where
 * each marker is `{ kind, time, t_start, t_end, player_idx, player,
 * with_player?, severity, score, model_keep_threshold?, features,
 * features_version, evidence? }` with times in the player clock (seconds,
 * first frame = 0).
 */
export function detect_mistakes(raw_replay_data: any, focus_player: string, profile_config: any): any;

/**
 * [`detect_mistakes`], with per-kind model scores gated by each model's
 * `keep_threshold`. Kinds without a model in `models` fall back to the
 * heuristic path; surviving model-gated markers carry
 * `model_keep_threshold` and `score` is the model's predicted probability
 * rather than the severity.
 */
export function detect_mistakes_with_models(raw_replay_data: any, focus_player: string, profile_config: any, models: MistakeModels): any;

/**
 * List the player identities the detector can focus on, in view order:
 * `[{ key, name, is_team_zero }]`.
 */
export function list_focus_players(raw_replay_data: any): any;

export function main(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_mistakemodels_free: (a: number, b: number) => void;
    readonly detect_mistakes: (a: any, b: number, c: number, d: any) => [number, number, number];
    readonly detect_mistakes_with_models: (a: any, b: number, c: number, d: any, e: number) => [number, number, number];
    readonly list_focus_players: (a: any) => [number, number, number];
    readonly mistakemodels_model_count: (a: number) => number;
    readonly mistakemodels_new: (a: number, b: number) => [number, number, number];
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
