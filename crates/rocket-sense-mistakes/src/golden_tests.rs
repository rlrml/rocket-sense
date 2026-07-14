//! Golden parity tests against the Python oracle (`ml/mistakes.py`).
//!
//! Fixtures live in `fixtures/`:
//! - `<replay>.parsed.json.gz` — the RLVision parser output (the exact input
//!   the Python system consumes),
//! - `<replay>.golden.json.gz` — per-player `generate_mistake_candidates` +
//!   `predict_mistakes` output produced by
//!   `RLAgent/scripts/export_mistake_golden_fixtures.py`.
//!
//! Because the Rust port receives the identical input and mirrors every
//! floating-point operation, parity is expected to be exact; the tolerance
//! below only absorbs decimal-formatting differences.

use crate::pipeline::{generate_mistake_candidates, predict_mistakes, resolve_focus_idx};
use crate::profile::DetectorProfile;
use crate::rlagent_json::replay_view_from_rlagent_text;
use flate2::read::GzDecoder;
use serde_json::Value;
use std::io::Read;

const TOL: f64 = 1e-9;

fn read_gz(name: &str) -> String {
    let path = format!("{}/fixtures/{name}", env!("CARGO_MANIFEST_DIR"));
    let bytes = std::fs::read(&path).unwrap_or_else(|e| panic!("read {path}: {e}"));
    let mut out = String::new();
    GzDecoder::new(&bytes[..])
        .read_to_string(&mut out)
        .unwrap_or_else(|e| panic!("gunzip {path}: {e}"));
    out
}

fn close(a: f64, b: f64) -> bool {
    (a - b).abs() <= TOL
}

fn assert_value_close(context: &str, key: &str, ours: &Value, golden: &Value) {
    match (ours, golden) {
        (Value::Number(a), Value::Number(b)) => {
            let (a, b) = (a.as_f64().unwrap(), b.as_f64().unwrap());
            assert!(close(a, b), "{context}: evidence[{key}] {a} != {b}");
        }
        (Value::Number(a), Value::Bool(b)) | (Value::Bool(b), Value::Number(a)) => {
            // Python bools serialize as true/false but ints like
            // `danger_lane_samples` may cross-type; compare numerically.
            let a = a.as_f64().unwrap();
            let b = if *b { 1.0 } else { 0.0 };
            assert!(close(a, b), "{context}: evidence[{key}] {a} != {b}");
        }
        _ => assert_eq!(ours, golden, "{context}: evidence[{key}] mismatch"),
    }
}

fn check_marker(context: &str, ours: &Value, golden: &Value) {
    for key in ["time", "t_start", "t_end", "severity", "score"] {
        let a = ours.get(key).and_then(Value::as_f64);
        let b = golden.get(key).and_then(Value::as_f64);
        match (a, b) {
            (Some(a), Some(b)) => {
                assert!(close(a, b), "{context}: {key} ours={a} golden={b}")
            }
            (a, b) => assert_eq!(a, b, "{context}: {key} presence mismatch"),
        }
    }
    assert_eq!(
        ours.get("kind"),
        golden.get("kind"),
        "{context}: kind mismatch"
    );
    assert_eq!(
        ours.get("player"),
        golden.get("player"),
        "{context}: player mismatch"
    );
    assert_eq!(
        ours.get("with_player"),
        golden.get("with_player"),
        "{context}: with_player mismatch"
    );
    assert_eq!(
        ours.get("player_idx").and_then(Value::as_i64),
        golden.get("player_idx").and_then(Value::as_i64),
        "{context}: player_idx mismatch"
    );

    let ours_features = ours
        .get("features")
        .and_then(Value::as_array)
        .cloned()
        .unwrap_or_default();
    let golden_features = golden
        .get("features")
        .and_then(Value::as_array)
        .cloned()
        .unwrap_or_default();
    assert_eq!(
        ours_features.len(),
        golden_features.len(),
        "{context}: feature length mismatch"
    );
    for (i, (a, b)) in ours_features.iter().zip(golden_features.iter()).enumerate() {
        let (a, b) = (a.as_f64().unwrap(), b.as_f64().unwrap());
        assert!(close(a, b), "{context}: features[{i}] ours={a} golden={b}");
    }

    match (ours.get("evidence"), golden.get("evidence")) {
        (Some(Value::Object(a)), Some(Value::Object(b))) => {
            let mut a_keys: Vec<&String> = a.keys().collect();
            let mut b_keys: Vec<&String> = b.keys().collect();
            a_keys.sort();
            b_keys.sort();
            assert_eq!(a_keys, b_keys, "{context}: evidence keys mismatch");
            for (key, value) in a {
                assert_value_close(context, key, value, &b[key]);
            }
        }
        (None, None) => {}
        (a, b) => panic!("{context}: evidence presence mismatch ours={a:?} golden={b:?}"),
    }
}

fn run_replay_parity(name: &str) {
    let parsed_text = read_gz(&format!("{name}.parsed.json.gz"));
    let golden: Value = serde_json::from_str(&read_gz(&format!("{name}.golden.json.gz"))).unwrap();
    let view = replay_view_from_rlagent_text(&parsed_text).unwrap();
    let profile = DetectorProfile::default();

    // Guard against a vacuous pass on an empty/corrupt fixture.
    let total_golden_markers: usize = golden["players"]
        .as_array()
        .unwrap()
        .iter()
        .map(|p| p["markers"].as_array().unwrap().len())
        .sum();
    assert!(
        total_golden_markers >= 20,
        "{name}: suspiciously few golden markers ({total_golden_markers})"
    );

    for player_doc in golden["players"].as_array().unwrap() {
        let player_name = player_doc["player"].as_str().unwrap();
        let focus_idx = resolve_focus_idx(&view, player_name)
            .unwrap_or_else(|| panic!("{name}: focus player {player_name} not found"));
        assert_eq!(
            focus_idx,
            player_doc["player_idx"].as_u64().unwrap() as usize,
            "{name}/{player_name}: focus index mismatch"
        );

        // Candidate-stage parity (generate_mistake_candidates).
        let candidates = generate_mistake_candidates(&view, focus_idx, &profile, false);
        let golden_candidates = player_doc["candidates"].as_array().unwrap();
        let ours_candidates: Vec<Value> = candidates
            .iter()
            .map(|c| serde_json::to_value(c).unwrap())
            .collect();
        assert_eq!(
            ours_candidates.len(),
            golden_candidates.len(),
            "{name}/{player_name}: candidate count ours={:?} golden={:?}",
            ours_candidates
                .iter()
                .map(|c| format!("{}@{}", c["kind"].as_str().unwrap(), c["time"]))
                .collect::<Vec<_>>(),
            golden_candidates
                .iter()
                .map(|c| format!("{}@{}", c["kind"].as_str().unwrap(), c["time"]))
                .collect::<Vec<_>>(),
        );
        for (i, (ours, gold)) in ours_candidates
            .iter()
            .zip(golden_candidates.iter())
            .enumerate()
        {
            let context = format!("{name}/{player_name}/candidate[{i}]");
            check_marker(&context, ours, gold);
        }

        // Marker-stage parity (predict_mistakes, heuristic path).
        let markers = predict_mistakes(&view, focus_idx, &profile);
        let golden_markers = player_doc["markers"].as_array().unwrap();
        assert_eq!(
            markers.len(),
            golden_markers.len(),
            "{name}/{player_name}: marker count mismatch"
        );
        for (i, (marker, gold)) in markers.iter().zip(golden_markers.iter()).enumerate() {
            let ours = serde_json::to_value(marker).unwrap();
            let context = format!("{name}/{player_name}/marker[{i}]");
            check_marker(&context, &ours, gold);
            assert_eq!(
                ours.get("features_version").and_then(Value::as_u64),
                gold.get("features_version").and_then(Value::as_u64),
                "{context}: features_version mismatch"
            );
        }
    }
}

#[test]
fn golden_parity_replay4() {
    run_replay_parity("replay4");
}

#[test]
fn golden_parity_replay7() {
    run_replay_parity("replay7");
}

#[test]
fn golden_parity_replay12() {
    run_replay_parity("replay12");
}

#[test]
fn golden_parity_replay13() {
    run_replay_parity("replay13");
}
