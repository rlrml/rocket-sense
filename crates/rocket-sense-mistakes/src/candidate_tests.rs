use super::*;
use crate::kinds::{BUMPING_TEAMMATE, STACKED_TOO_CLOSE, TOO_FAR_FROM_PLAY};

fn candidate(kind: &'static str, time: f64, t_start: f64, t_end: f64) -> Candidate {
    Candidate::new(kind, time, t_start, t_end, 0, "player one", 0.5, vec![0.5])
}

#[test]
fn dedupe_keeps_earliest_and_counts_duplicates() {
    let mut a = candidate(TOO_FAR_FROM_PLAY, 10.0, 9.0, 11.0);
    a.candidate_evidence = Some(
        serde_json::json!({"source_detector": TOO_FAR_FROM_PLAY})
            .as_object()
            .unwrap()
            .clone(),
    );
    let mut b = candidate(TOO_FAR_FROM_PLAY, 10.5, 10.2, 11.5);
    b.candidate_evidence = Some(
        serde_json::json!({"source_detector": TOO_FAR_FROM_PLAY})
            .as_object()
            .unwrap()
            .clone(),
    );
    let out = dedupe_mistake_candidates(vec![b, a], 1.0);
    assert_eq!(out.len(), 1);
    // The earliest-by-time candidate is kept (Python's rank is always 0.0 at
    // the candidate stage, so the incumbent wins).
    assert_eq!(out[0].time, 10.0);
    let evidence = out[0].candidate_evidence.as_ref().unwrap();
    assert_eq!(evidence["duplicates_removed"], 1);
}

#[test]
fn dedupe_leaves_distinct_kinds_and_players_alone() {
    let a = candidate(TOO_FAR_FROM_PLAY, 10.0, 9.0, 11.0);
    let b = candidate(STACKED_TOO_CLOSE, 10.0, 9.0, 11.0);
    let mut c = candidate(TOO_FAR_FROM_PLAY, 10.0, 9.0, 11.0);
    c.player = "player two".into();
    let out = dedupe_mistake_candidates(vec![a, b, c], 1.0);
    assert_eq!(out.len(), 3);
}

#[test]
fn stacked_suppressed_near_bump_with_same_partner() {
    let mut stacked = candidate(STACKED_TOO_CLOSE, 20.0, 18.0, 22.0);
    stacked.with_player = Some("mate".into());
    let mut bump = candidate(BUMPING_TEAMMATE, 21.0, 21.0, 21.0);
    bump.with_player = Some("mate".into());
    let out =
        suppress_stacked_candidates_near_teammate_bumps(vec![stacked.clone(), bump.clone()], 1.0);
    assert_eq!(out.len(), 1);
    assert_eq!(out[0].kind, BUMPING_TEAMMATE);

    // Different partner → no suppression.
    let mut other_bump = bump.clone();
    other_bump.with_player = Some("someone else".into());
    let out = suppress_stacked_candidates_near_teammate_bumps(vec![stacked, other_bump], 1.0);
    assert_eq!(out.len(), 2);
}
