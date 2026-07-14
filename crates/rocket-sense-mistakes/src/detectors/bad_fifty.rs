//! Detector: bad_fifty (mirrors `_detect_bad_fifty` / `_features_bad_fifty`).

use crate::candidate::Candidate;
use crate::grid::KickoffWindows;
use crate::kinds::BAD_FIFTY;
use crate::profile::DetectorProfile;
use crate::touches::find_player_ball_touches;
use crate::view::{dist2d, round_py, ReplayView, CEILING_Z};

/// Focus is always touching the ball at the contact moment, so distances stay
/// tight — small norm so the feature has spread on graze-ish touches.
pub const FIFTY_FEAT_FOCUS_DIST_NORM: f64 = 500.0;
/// Norm for opp_min so 1.0 sits well past the contest radius.
pub const FIFTY_FEAT_OPP_NORM: f64 = 1000.0;

pub fn detect(
    replay: &ReplayView,
    player_idx: usize,
    _profile: &DetectorProfile,
) -> Vec<Candidate> {
    const KIND: &str = BAD_FIFTY;
    const FIFTY_OPP_RADIUS: f64 = 350.0;
    const AIR_HEIGHT: f64 = 300.0;
    const BACKWARD_Y_MIN: f64 = 1500.0;
    const WINDOW_S: f64 = 1.5;
    const BEFORE_S: f64 = 0.4;
    const AFTER_S: f64 = 1.5;
    const GRID_DT: f64 = 0.1;
    const KICKOFF_SKIP_S: f64 = 1.0;
    const DEBOUNCE_S: f64 = 2.0;

    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let own_goal_y = player.team.own_goal_y();
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let opponents = replay.opponent_indexes(player_idx);
    if opponents.is_empty() {
        return Vec::new();
    }
    let focus_touches = find_player_ball_touches(replay, player_idx);
    if focus_touches.is_empty() {
        return Vec::new();
    }

    let seg_windows = KickoffWindows::new(replay);

    let mut out = Vec::new();
    let mut last_emit = -1e9f64;
    for (touch_t, _ps, _pv) in focus_touches {
        if touch_t - last_emit < DEBOUNCE_S {
            continue;
        }
        if seg_windows.in_kickoff_skip(touch_t, KICKOFF_SKIP_S) {
            continue;
        }
        let (Some(ball_pos_t), Some(_focus_pos)) =
            (replay.ball_pos_at(touch_t), player.pos_at(touch_t))
        else {
            continue;
        };

        let mut opp_min = f64::INFINITY;
        for &op in &opponents {
            let Some(op_pos) = players[op].pos_at(touch_t) else {
                continue;
            };
            opp_min = f64::min(opp_min, dist2d(op_pos, ball_pos_t));
        }
        if opp_min > FIFTY_OPP_RADIUS {
            continue;
        }

        let window_end = f64::min(
            touch_t + WINDOW_S,
            seg_windows.seg_end_after(touch_t, touch_t + WINDOW_S),
        );
        if window_end - touch_t < 0.3 {
            continue;
        }

        let mut peak_z = 0.0f64;
        let mut peak_z_t = touch_t;
        let mut worst_back = f64::NEG_INFINITY;
        let mut worst_back_t = touch_t;
        let mut last_ball_x = ball_pos_t.0;
        let mut last_ball_y = ball_pos_t.1;
        let mut t = touch_t;
        while t <= window_end {
            if let Some(bp) = replay.ball_pos_at(t) {
                let z = bp.2;
                if z > peak_z {
                    peak_z = z;
                    peak_z_t = t;
                }
                let back = -bp.1 * own_dir_sign;
                if back > worst_back {
                    worst_back = back;
                    worst_back_t = t;
                }
                last_ball_x = bp.0;
                last_ball_y = bp.1;
            }
            t += GRID_DT;
        }

        if peak_z < AIR_HEIGHT || worst_back < BACKWARD_Y_MIN {
            continue;
        }

        let peak_t = f64::max(peak_z_t, worst_back_t);
        let Some(feats) = features(
            replay,
            player_idx,
            own_goal_y,
            touch_t,
            peak_t,
            peak_z,
            worst_back,
            last_ball_x,
            last_ball_y,
            opp_min,
        ) else {
            continue;
        };

        let severity = f64::max(
            0.55,
            f64::min(
                1.0,
                0.4 + 0.3 * f64::min(1.0, peak_z / 1200.0)
                    + 0.3 * f64::min(1.0, worst_back / 3500.0),
            ),
        );
        out.push(Candidate::new(
            KIND,
            round_py(touch_t, 2),
            round_py(touch_t - BEFORE_S, 2),
            round_py(peak_t + AFTER_S, 2),
            player_idx,
            &player.name,
            severity,
            feats,
        ));
        last_emit = touch_t;
    }

    out
}

#[allow(clippy::too_many_arguments)]
pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    own_goal_y: f64,
    touch_t: f64,
    peak_t: f64,
    peak_z: f64,
    worst_back: f64,
    last_ball_x: f64,
    last_ball_y: f64,
    opp_min: f64,
) -> Option<Vec<f64>> {
    let players = &replay.players;
    let player = &players[player_idx];
    let teammates = replay.teammate_indexes(player_idx);
    let bp_t = replay.ball_pos_at(touch_t)?;

    let mut tm_min = f64::INFINITY;
    for &tm in &teammates {
        let Some(tm_pos) = players[tm].pos_at(touch_t) else {
            continue;
        };
        tm_min = f64::min(tm_min, dist2d(tm_pos, bp_t));
    }
    if tm_min == f64::INFINITY {
        tm_min = 6000.0;
    }

    let focus_dist = player
        .pos_at(touch_t)
        .map(|fp| dist2d(fp, bp_t))
        .unwrap_or(0.0);

    let speed = player
        .velocity(touch_t)
        .map(|pv| (pv.0 * pv.0 + pv.1 * pv.1).sqrt())
        .unwrap_or(0.0);
    let boost = player.boost_at(touch_t);

    let own_goal_x = 0.0f64;
    let dist_own_goal =
        ((last_ball_x - own_goal_x).powi(2) + (last_ball_y - own_goal_y).powi(2)).sqrt();
    let time_to_peak = f64::max(0.0, peak_t - touch_t);

    Some(vec![
        (peak_z / CEILING_Z).clamp(0.0, 1.0),
        (worst_back / 5120.0).clamp(0.0, 1.0),
        (focus_dist / FIFTY_FEAT_FOCUS_DIST_NORM).clamp(0.0, 1.0),
        (tm_min / 6000.0).clamp(0.0, 1.0),
        (opp_min / FIFTY_FEAT_OPP_NORM).clamp(0.0, 1.0),
        (speed / 2300.0).clamp(0.0, 1.0),
        (boost / 100.0).clamp(0.0, 1.0),
        (dist_own_goal / 7000.0).clamp(0.0, 1.0),
        (time_to_peak / 2.0).clamp(0.0, 1.0),
    ])
}
