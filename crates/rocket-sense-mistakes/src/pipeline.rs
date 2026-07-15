//! The public detection pipeline (mirrors `generate_mistake_candidates` and
//! `predict_mistakes`).
//!
//! [`predict_mistakes`] takes the loaded reranker models ([`ModelSet`]) as a
//! parameter. For kinds with a model, `score` is the model's predicted
//! probability gated by that model's `keep_threshold`; for kinds without one
//! (and for an empty set — the caller's fallback when no artifact is
//! available), `score == severity` and the keep gate is `_HEURISTIC_KEEP`
//! (all 0.0), so gating falls to each detector's severity logic and the
//! profile's `min_severity` floors, exactly like the Python system.

use crate::candidate::{
    dedupe_mistake_candidates, suppress_stacked_candidates_near_teammate_bumps, Candidate, Marker,
};
use crate::detectors::call_detector;
use crate::grid::{non_play_windows, overlaps_non_play_window};
use crate::kinds::{feature_names, FEATURE_SCHEMA_VERSION, KINDS};
use crate::model::ModelSet;
use crate::profile::DetectorProfile;
use crate::view::{round_py, ReplayView};
use serde_json::{Map, Value};

/// Keep heuristic candidates whose score >= this when no model exists
/// (`_HEURISTIC_KEEP` — committed as 0.0 for every kind).
fn heuristic_keep(_kind: &str) -> f64 {
    0.0
}

/// `_resolve_focus_idx`: exact case-insensitive name match, then substring.
pub fn resolve_focus_idx(replay: &ReplayView, focus_player: &str) -> Option<usize> {
    let target = focus_player.trim().to_lowercase();
    if target.is_empty() {
        return None;
    }
    for (i, p) in replay.players.iter().enumerate() {
        if p.name.trim().to_lowercase() == target {
            return Some(i);
        }
    }
    for (i, p) in replay.players.iter().enumerate() {
        let name = p.name.trim().to_lowercase();
        if !name.is_empty() && (name.contains(&target) || target.contains(&name)) {
            return Some(i);
        }
    }
    None
}

/// `generate_mistake_candidates`: raw heuristic candidates before
/// model/threshold filtering. Non-play candidates are filtered by default.
pub fn generate_mistake_candidates(
    replay: &ReplayView,
    focus_idx: usize,
    profile: &DetectorProfile,
    include_non_play: bool,
) -> Vec<Candidate> {
    if focus_idx >= replay.players.len() {
        return Vec::new();
    }

    let windows = non_play_windows(replay);
    let mut candidates: Vec<Candidate> = Vec::new();
    for kind in KINDS {
        if !profile.kind_enabled(kind) {
            continue;
        }
        for mut cand in call_detector(kind, replay, focus_idx, profile) {
            let floor = profile.min_severity_for(kind);
            if cand.severity < floor {
                continue;
            }
            let filtered = overlaps_non_play_window(cand.t_start, cand.t_end, &windows);
            let mut candidate_evidence = Map::new();
            candidate_evidence.insert("source_detector".to_owned(), Value::from(kind));
            candidate_evidence.insert("profile".to_owned(), Value::from(profile.name.clone()));
            candidate_evidence.insert("non_play_filtered".to_owned(), Value::Bool(filtered));
            cand.candidate_evidence = Some(candidate_evidence);
            if include_non_play || !filtered {
                candidates.push(cand);
            }
        }
    }

    let mut candidates = suppress_stacked_candidates_near_teammate_bumps(candidates, 1.0);

    if profile.dedupe_window_s > 0.0 {
        candidates = dedupe_mistake_candidates(candidates, profile.dedupe_window_s);
    }

    candidates.sort_by(|a, b| a.time.partial_cmp(&b.time).unwrap());
    candidates
}

/// `_named_feature_evidence` + `_attach_candidate_evidence`: a named view of
/// the feature vector merged *under* any detector-provided evidence.
fn attach_candidate_evidence(cand: &mut Candidate) {
    let names = feature_names(cand.kind);
    if names.len() != cand.features.len() {
        return;
    }
    let mut merged = Map::new();
    for (name, value) in names.iter().zip(cand.features.iter()) {
        merged.insert((*name).to_owned(), Value::from(*value));
    }
    if let Some(existing) = cand.evidence.take() {
        for (k, v) in existing {
            merged.insert(k, v);
        }
    }
    cand.evidence = Some(merged);
}

/// `predict_mistakes`: apply the per-kind keep gate (model probability vs
/// `keep_threshold` when a model exists, severity vs `_HEURISTIC_KEEP`
/// otherwise), attach named-feature evidence, and emit final markers.
pub fn predict_mistakes(
    replay: &ReplayView,
    focus_idx: usize,
    profile: &DetectorProfile,
    models: &ModelSet,
) -> Vec<Marker> {
    let candidates = generate_mistake_candidates(replay, focus_idx, profile, false);

    let mut out: Vec<Marker> = Vec::new();
    for mut cand in candidates {
        if cand.features.is_empty() {
            continue;
        }
        let score;
        let mut model_keep_threshold = None;
        if let Some(model) = models.get(cand.kind) {
            score = model.predict_proba(&cand.features);
            let keep_threshold = model.keep_threshold();
            if score < keep_threshold {
                continue;
            }
            model_keep_threshold = Some(round_py(keep_threshold, 4));
        } else {
            score = cand.severity;
            if score < heuristic_keep(cand.kind) {
                continue;
            }
        }
        attach_candidate_evidence(&mut cand);
        out.push(Marker {
            kind: cand.kind,
            time: cand.time,
            t_start: cand.t_start,
            t_end: cand.t_end,
            player_idx: cand.player_idx,
            player: cand.player,
            with_player: cand.with_player,
            severity: cand.severity,
            score: round_py(score, 4),
            model_keep_threshold,
            features: cand.features,
            features_version: FEATURE_SCHEMA_VERSION,
            evidence: cand.evidence,
        });
    }

    out.sort_by(|a, b| a.time.partial_cmp(&b.time).unwrap());
    out
}

#[cfg(test)]
#[path = "pipeline_tests.rs"]
mod tests;
