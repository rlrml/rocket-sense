//! WebAssembly bindings for the mistake-detection pipeline.
//!
//! The web app already parses replays with `@rlrml/subtr-actor`
//! (`get_replay_frames_data`) and caches the result per replay
//! (`web/src/stats/replayModel.ts`). These bindings consume that same parsed
//! object — no re-download, no re-parse — and run the 15 heuristic detectors
//! for one focus player.

use rocket_sense_mistakes::pipeline::{predict_mistakes, resolve_focus_idx};
use rocket_sense_mistakes::profile::DetectorProfile;
use rocket_sense_mistakes::subtr_adapter::{
    player_track_keys, replay_view_from_raw, RawReplayData,
};
use serde::Serialize;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn main() {
    console_error_panic_hook::set_once();
}

#[derive(Serialize)]
struct DetectResponse<'a> {
    detector_version: &'static str,
    features_version: u32,
    focus_player_idx: usize,
    focus_player_key: &'a str,
    focus_player_name: &'a str,
    markers: Vec<rocket_sense_mistakes::Marker>,
}

/// Bump when detector behavior changes in a way that should re-identify
/// events (mirrors the role of subtr-actor's git sha for mechanics).
pub const DETECTOR_VERSION: &str = "mistakes-v1";

/// Run mistake detection over a parsed replay for one focus player.
///
/// * `raw_replay_data` — the raw frames object returned by
///   `@rlrml/subtr-actor`'s `get_replay_frames_data` (the `raw` field of
///   `@rlrml/player`'s `loadReplay` result).
/// * `focus_player` — a player track id (`platform:id`, as used by
///   `ReplayPlayerTrack.id`) or a display name; ids are tried first.
/// * `profile_config` — optional detector-profile overrides (JSON object
///   mirroring the Python `profile_config`), or undefined for defaults.
///
/// Returns `{ detector_version, features_version, focus_player_idx,
/// focus_player_key, focus_player_name, markers: [...] }` where each marker is
/// `{ kind, time, t_start, t_end, player_idx, player, with_player?, severity,
/// score, features, features_version, evidence? }` with times in the player
/// clock (seconds, first frame = 0).
#[wasm_bindgen]
pub fn detect_mistakes(
    raw_replay_data: JsValue,
    focus_player: &str,
    profile_config: JsValue,
) -> Result<JsValue, JsValue> {
    let raw: RawReplayData = serde_wasm_bindgen::from_value(raw_replay_data)
        .map_err(|e| JsValue::from_str(&format!("failed to read replay frame data: {e}")))?;
    let profile_value: Option<serde_json::Value> =
        if profile_config.is_undefined() || profile_config.is_null() {
            None
        } else {
            Some(serde_wasm_bindgen::from_value(profile_config).map_err(|e| {
                JsValue::from_str(&format!("failed to read detector profile config: {e}"))
            })?)
        };
    let profile = DetectorProfile::resolve(profile_value.as_ref());

    let view = replay_view_from_raw(&raw);
    let track_keys = player_track_keys(&raw);

    // Resolve the focus player: exact track-id match first (stable identity),
    // then the Python name-resolution fallback.
    let focus_lower = focus_player.trim().to_lowercase();
    let focus_idx = track_keys
        .iter()
        .position(|key| *key == focus_lower)
        .or_else(|| resolve_focus_idx(&view, focus_player))
        .ok_or_else(|| JsValue::from_str(&format!("focus player not found: {focus_player}")))?;

    let markers = predict_mistakes(&view, focus_idx, &profile);
    let response = DetectResponse {
        detector_version: DETECTOR_VERSION,
        features_version: rocket_sense_mistakes::kinds::FEATURE_SCHEMA_VERSION,
        focus_player_idx: focus_idx,
        focus_player_key: track_keys
            .get(focus_idx)
            .map(String::as_str)
            .unwrap_or_default(),
        focus_player_name: &view.players[focus_idx].name,
        markers,
    };
    let serializer = serde_wasm_bindgen::Serializer::json_compatible();
    response
        .serialize(&serializer)
        .map_err(|e| JsValue::from_str(&format!("failed to serialize markers: {e}")))
}

/// List the player identities the detector can focus on, in view order:
/// `[{ key, name, is_team_zero }]`.
#[wasm_bindgen]
pub fn list_focus_players(raw_replay_data: JsValue) -> Result<JsValue, JsValue> {
    let raw: RawReplayData = serde_wasm_bindgen::from_value(raw_replay_data)
        .map_err(|e| JsValue::from_str(&format!("failed to read replay frame data: {e}")))?;
    let view = replay_view_from_raw(&raw);
    let keys = player_track_keys(&raw);

    #[derive(Serialize)]
    struct FocusPlayer {
        key: String,
        name: String,
        is_team_zero: bool,
    }
    let players: Vec<FocusPlayer> = view
        .players
        .iter()
        .zip(keys)
        .map(|(p, key)| FocusPlayer {
            key,
            name: p.name.clone(),
            is_team_zero: matches!(p.team, rocket_sense_mistakes::view::Team::Blue),
        })
        .collect();
    let serializer = serde_wasm_bindgen::Serializer::json_compatible();
    players
        .serialize(&serializer)
        .map_err(|e| JsValue::from_str(&format!("failed to serialize players: {e}")))
}
