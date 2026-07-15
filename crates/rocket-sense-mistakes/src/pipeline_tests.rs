use super::*;
use crate::model::ModelSet;
use crate::view::{BoostTrack, PlayerView, ReplayView, Team};

fn view_with_players(names: &[&str]) -> ReplayView {
    ReplayView {
        players: names
            .iter()
            .map(|name| PlayerView {
                name: (*name).to_owned(),
                team: Team::Blue,
                cars: vec![],
                demo_times: vec![],
                boost_amount: BoostTrack::default(),
            })
            .collect(),
        ..Default::default()
    }
}

#[test]
fn focus_resolution_prefers_exact_then_substring() {
    let view = view_with_players(&["Alpha", "Alphabet", "beta"]);
    // Exact (case-insensitive) match wins even when a substring match exists
    // earlier in the list.
    assert_eq!(resolve_focus_idx(&view, "alphabet"), Some(1));
    assert_eq!(resolve_focus_idx(&view, "ALPHA"), Some(0));
    // Substring fallback (either direction).
    assert_eq!(resolve_focus_idx(&view, "bet"), Some(1));
    assert_eq!(resolve_focus_idx(&view, "beta player"), Some(2));
    assert_eq!(resolve_focus_idx(&view, ""), None);
    assert_eq!(resolve_focus_idx(&view, "nobody"), None);
}

#[test]
fn empty_view_yields_no_markers() {
    let view = view_with_players(&["Alpha"]);
    let profile = DetectorProfile::default();
    assert!(predict_mistakes(&view, 0, &profile, &ModelSet::default()).is_empty());
    assert!(generate_mistake_candidates(&view, 0, &profile, false).is_empty());
    // Out-of-range focus index is a no-op, not a panic.
    assert!(predict_mistakes(&view, 5, &profile, &ModelSet::default()).is_empty());
}
