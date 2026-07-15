//! Detector: bad_kickoff (mirrors `_detect_bad_kickoff` / `_features_bad_kickoff`).

use crate::candidate::Candidate;
use crate::grid::segment_in_play_start;
use crate::kinds::BAD_KICKOFF;
use crate::profile::DetectorProfile;
use crate::touches::find_player_ball_touches;
use crate::view::{dist2d, round_py, ReplayView, CEILING_Z};

/// Norm constant for focus_dist_at_kickoff_norm — kept in sync with
/// KICKOFF_TAKER_RADIUS so 1.0 = at-the-edge of being the kickoff taker.
pub const KICKOFF_FEAT_TAKER_NORM: f64 = 400.0;

pub fn detect(
    replay: &ReplayView,
    player_idx: usize,
    _profile: &DetectorProfile,
) -> Vec<Candidate> {
    const KIND: &str = BAD_KICKOFF;
    const KICKOFF_TAKER_RADIUS: f64 = 400.0;
    const AIR_HEIGHT: f64 = 300.0;
    const BACKWARD_Y_MIN: f64 = 1500.0;
    const WINDOW_S: f64 = 1.5;
    const AFTER_S: f64 = 1.5;
    const GRID_DT: f64 = 0.1;

    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let own_goal_y = player.team.own_goal_y();
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let focus_touch_times: Vec<f64> = find_player_ball_touches(replay, player_idx)
        .into_iter()
        .map(|t| t.0)
        .collect();

    let mut out = Vec::new();
    for seg in &replay.balls {
        let seg_start = seg.start;
        let seg_end = seg.end;
        let ip = segment_in_play_start(seg);
        if ip <= seg_start || seg_end <= ip {
            continue;
        }

        let (Some(focus_pos), Some(ball_pos_ip)) = (player.pos_at(ip), replay.ball_pos_at(ip))
        else {
            continue;
        };
        let d_focus = dist2d(focus_pos, ball_pos_ip);
        if d_focus > KICKOFF_TAKER_RADIUS {
            continue;
        }

        let window_end = f64::min(ip + WINDOW_S, seg_end);
        if window_end - ip < 0.3 {
            continue;
        }

        let mut peak_z = 0.0f64;
        let mut peak_z_t = ip;
        let mut worst_back = f64::NEG_INFINITY;
        let mut worst_back_t = ip;
        let mut last_ball_x = ball_pos_ip.0;
        let mut last_ball_y = ball_pos_ip.1;
        let mut t = ip;
        while t <= window_end {
            if let Some(bp) = replay.ball_pos_at(t) {
                let z = bp.2;
                if z > peak_z {
                    peak_z = z;
                    peak_z_t = t;
                }
                // Depth into focus's own half (positive = closer to own goal).
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
            ip,
            peak_t,
            peak_z,
            worst_back,
            last_ball_x,
            last_ball_y,
            d_focus,
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
        // Point of interest is the focus's actual ball-touch at kickoff.
        let mut touch_t = ip;
        for &tt in &focus_touch_times {
            if seg_start <= tt && tt <= ip + 0.5 {
                touch_t = tt;
                break;
            }
            if tt > ip + 0.5 {
                break;
            }
        }
        // t_start sits just past the in-play instant so the global
        // kickoff-overlap filter doesn't drop us.
        let t_start = ip + 0.05;
        let t_end = peak_t + AFTER_S;
        out.push(Candidate::new(
            KIND,
            round_py(touch_t, 2),
            round_py(t_start, 2),
            round_py(t_end, 2),
            player_idx,
            &player.name,
            severity,
            feats,
        ));
    }

    out
}

#[allow(clippy::too_many_arguments)]
pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    own_goal_y: f64,
    ip: f64,
    peak_t: f64,
    peak_z: f64,
    worst_back: f64,
    last_ball_x: f64,
    last_ball_y: f64,
    focus_dist: f64,
) -> Option<Vec<f64>> {
    let players = &replay.players;
    let player = &players[player_idx];
    let teammates = replay.teammate_indexes(player_idx);
    let opponents = replay.opponent_indexes(player_idx);
    let bp_ip = replay.ball_pos_at(ip)?;

    let mut tm_min = f64::INFINITY;
    for &tm in &teammates {
        let Some(tm_pos) = players[tm].pos_at(ip) else {
            continue;
        };
        tm_min = f64::min(tm_min, dist2d(tm_pos, bp_ip));
    }
    if tm_min == f64::INFINITY {
        tm_min = 6000.0;
    }

    let mut opp_min = f64::INFINITY;
    for &op in &opponents {
        let Some(op_pos) = players[op].pos_at(ip) else {
            continue;
        };
        opp_min = f64::min(opp_min, dist2d(op_pos, bp_ip));
    }
    if opp_min == f64::INFINITY {
        opp_min = 6000.0;
    }

    let speed = player
        .velocity(ip)
        .map(|pv| (pv.0 * pv.0 + pv.1 * pv.1).sqrt())
        .unwrap_or(0.0);
    let boost = player.boost_at(ip);

    // Distance from final ball position to focus's own goal (xy).
    let own_goal_x = 0.0f64;
    let dist_own_goal =
        ((last_ball_x - own_goal_x).powi(2) + (last_ball_y - own_goal_y).powi(2)).sqrt();
    let time_to_peak = f64::max(0.0, peak_t - ip);

    Some(vec![
        (peak_z / CEILING_Z).clamp(0.0, 1.0),
        (worst_back / 5120.0).clamp(0.0, 1.0),
        (focus_dist / KICKOFF_FEAT_TAKER_NORM).clamp(0.0, 1.0),
        (tm_min / 6000.0).clamp(0.0, 1.0),
        (opp_min / 6000.0).clamp(0.0, 1.0),
        (speed / 2300.0).clamp(0.0, 1.0),
        (boost / 100.0).clamp(0.0, 1.0),
        (dist_own_goal / 7000.0).clamp(0.0, 1.0),
        (time_to_peak / 2.0).clamp(0.0, 1.0),
    ])
}
