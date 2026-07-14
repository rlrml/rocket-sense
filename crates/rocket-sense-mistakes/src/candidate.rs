//! Candidate/marker types plus the dedupe and cross-detector suppression
//! utilities (mirrors the bottom of `ml/mistakes.py`).

use serde::Serialize;
use serde_json::{Map, Value};

/// A heuristic mistake candidate, as produced by one detector.
#[derive(Debug, Clone, Serialize)]
pub struct Candidate {
    pub kind: &'static str,
    pub time: f64,
    pub t_start: f64,
    pub t_end: f64,
    pub player_idx: usize,
    pub player: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub with_player: Option<String>,
    pub severity: f64,
    pub features: Vec<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub evidence: Option<Map<String, Value>>,
    /// Pipeline bookkeeping (`candidate_evidence` in Python); dropped from the
    /// final marker output.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub candidate_evidence: Option<Map<String, Value>>,
}

impl Candidate {
    pub fn new(
        kind: &'static str,
        time: f64,
        t_start: f64,
        t_end: f64,
        player_idx: usize,
        player: &str,
        severity: f64,
        features: Vec<f64>,
    ) -> Self {
        Candidate {
            kind,
            time,
            t_start,
            t_end,
            player_idx,
            player: player.to_owned(),
            with_player: None,
            severity,
            features,
            evidence: None,
            candidate_evidence: None,
        }
    }
}

/// A final mistake marker (`predict_mistakes` output item).
#[derive(Debug, Clone, Serialize)]
pub struct Marker {
    pub kind: &'static str,
    pub time: f64,
    pub t_start: f64,
    pub t_end: f64,
    pub player_idx: usize,
    pub player: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub with_player: Option<String>,
    pub severity: f64,
    pub score: f64,
    pub features: Vec<f64>,
    pub features_version: u32,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub evidence: Option<Map<String, Value>>,
}

/// `_candidate_interval`.
fn candidate_interval(c: &Candidate) -> (f64, f64) {
    (c.t_start.min(c.t_end), c.t_start.max(c.t_end))
}

/// `_candidate_rank`. Note the Python original reads `item.get("score")` first
/// and `float(None or 0.0)` never raises, so for pre-score candidates the rank
/// is always 0.0 — it never falls through to severity. Deduping therefore
/// always keeps the earliest-sorted candidate; mirror that exactly.
fn candidate_rank(_c: &Candidate) -> f64 {
    0.0
}

/// `_candidates_overlap`.
fn candidates_overlap(left: &Candidate, right: &Candidate, window_s: f64) -> bool {
    let (ls, le) = candidate_interval(left);
    let (rs, re) = candidate_interval(right);
    if ls <= re && le >= rs {
        return true;
    }
    (left.time - right.time).abs() <= window_s
}

/// `_merge_duplicate_metadata`.
fn merge_duplicate_metadata(kept: &mut Candidate, duplicate: &Candidate) {
    let mut evidence = kept.candidate_evidence.take().unwrap_or_default();
    let removed = evidence
        .get("duplicates_removed")
        .and_then(Value::as_i64)
        .unwrap_or(0);
    evidence.insert("duplicates_removed".to_owned(), Value::from(removed + 1));
    let mut sources: Vec<Value> = evidence
        .get("duplicate_sources")
        .and_then(Value::as_array)
        .cloned()
        .unwrap_or_default();
    let source = duplicate
        .candidate_evidence
        .as_ref()
        .and_then(|e| e.get("source_detector"))
        .and_then(Value::as_str);
    if let Some(source) = source {
        if !source.is_empty() && !sources.iter().any(|s| s.as_str() == Some(source)) {
            sources.push(Value::from(source));
        }
    }
    if !sources.is_empty() {
        evidence.insert("duplicate_sources".to_owned(), Value::Array(sources));
    }
    kept.candidate_evidence = Some(evidence);
}

/// `dedupe_mistake_candidates`.
pub fn dedupe_mistake_candidates(candidates: Vec<Candidate>, window_s: f64) -> Vec<Candidate> {
    let mut sorted = candidates;
    sorted.sort_by(|a, b| a.time.partial_cmp(&b.time).unwrap());
    let mut out: Vec<Candidate> = Vec::new();
    for cand in sorted {
        let duplicate_idx = out.iter().position(|existing| {
            existing.kind == cand.kind
                && existing.player == cand.player
                && candidates_overlap(existing, &cand, window_s)
        });
        let Some(duplicate_idx) = duplicate_idx else {
            out.push(cand);
            continue;
        };
        if candidate_rank(&cand) > candidate_rank(&out[duplicate_idx]) {
            let existing = out[duplicate_idx].clone();
            let mut cand = cand;
            merge_duplicate_metadata(&mut cand, &existing);
            out[duplicate_idx] = cand;
        } else {
            merge_duplicate_metadata(&mut out[duplicate_idx], &cand);
        }
    }
    out.sort_by(|a, b| a.time.partial_cmp(&b.time).unwrap());
    out
}

/// `suppress_stacked_candidates_near_teammate_bumps`.
pub fn suppress_stacked_candidates_near_teammate_bumps(
    candidates: Vec<Candidate>,
    window_s: f64,
) -> Vec<Candidate> {
    let bump_candidates: Vec<Candidate> = candidates
        .iter()
        .filter(|c| c.kind == crate::kinds::BUMPING_TEAMMATE)
        .cloned()
        .collect();
    if bump_candidates.is_empty() {
        return candidates;
    }
    candidates
        .into_iter()
        .filter(|cand| {
            if cand.kind != crate::kinds::STACKED_TOO_CLOSE {
                return true;
            }
            let with_player = cand.with_player.as_deref().unwrap_or("");
            !bump_candidates.iter().any(|bump| {
                if bump.player != cand.player {
                    return false;
                }
                let bump_with = bump.with_player.as_deref().unwrap_or("");
                if !with_player.is_empty() && !bump_with.is_empty() && with_player != bump_with {
                    return false;
                }
                candidates_overlap(cand, bump, window_s)
            })
        })
        .collect()
}

#[cfg(test)]
#[path = "candidate_tests.rs"]
mod tests;
