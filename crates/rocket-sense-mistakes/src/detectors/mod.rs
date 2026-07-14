//! The 15 heuristic detectors, one module per kind.

pub mod bad_fifty;
pub mod bad_kickoff;
pub mod bang;
pub mod bumping;
pub mod creeping;
pub mod defensive_touch;
pub mod double_commit;
pub mod floating;
pub mod hesitating;
pub mod overcommitting;
pub mod poor_landing;
pub mod small_pads;
pub mod stacked;
pub mod too_far;
pub mod waiting;

use crate::candidate::Candidate;
use crate::profile::DetectorProfile;
use crate::view::ReplayView;

/// `_call_detector` / `_DETECTORS`: dispatch a detector by kind.
pub fn call_detector(
    kind: &str,
    replay: &ReplayView,
    player_idx: usize,
    profile: &DetectorProfile,
) -> Vec<Candidate> {
    use crate::kinds::*;
    match kind {
        TOO_FAR_FROM_PLAY => too_far::detect(replay, player_idx, profile),
        STACKED_TOO_CLOSE => stacked::detect(replay, player_idx, profile),
        BUMPING_TEAMMATE => bumping::detect(replay, player_idx, profile),
        OVERCOMMITTING_LAST_MAN => overcommitting::detect(replay, player_idx, profile),
        BANG_WITH_TIME => bang::detect(replay, player_idx, profile),
        HESITATING_ON_50 => hesitating::detect(replay, player_idx, profile),
        WAITING_TO_CHALLENGE => waiting::detect(replay, player_idx, profile),
        DOUBLE_COMMITTING => double_commit::detect(replay, player_idx, profile),
        CREEPING_UP_TOO_FAR => creeping::detect(replay, player_idx, profile),
        POOR_LANDING => poor_landing::detect(replay, player_idx, profile),
        PICK_UP_SMALL_PADS => small_pads::detect(replay, player_idx, profile),
        BAD_KICKOFF => bad_kickoff::detect(replay, player_idx, profile),
        BAD_FIFTY => bad_fifty::detect(replay, player_idx, profile),
        FLOATING_WITH_BOOST => floating::detect(replay, player_idx, profile),
        BAD_DEFENSIVE_TOUCH => defensive_touch::detect(replay, player_idx, profile),
        _ => Vec::new(),
    }
}
