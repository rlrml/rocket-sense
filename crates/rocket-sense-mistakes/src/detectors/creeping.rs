//! Detector: creeping_up_too_far (mirrors `_detect_creeping_up_too_far` /
//! `_features_creeping_up_too_far`).

use crate::candidate::Candidate;
use crate::grid::{build_time_grid, segment_in_play_start};
use crate::kinds::CREEPING_UP_TOO_FAR;
use crate::profile::DetectorProfile;
use crate::view::{dist2d, round_py, ReplayView, FIELD_HALF_Y};

pub fn detect(replay: &ReplayView, player_idx: usize, profile: &DetectorProfile) -> Vec<Candidate> {
    const KIND: &str = CREEPING_UP_TOO_FAR;
    const MIN_FOCUS_DEPTH: f64 = 5500.0;
    const BALL_AHEAD_SLACK: f64 = 400.0;
    let near_ball_radius = profile.param(KIND, "near_ball_radius", 2500.0);
    const OPP_CONTROL_RADIUS: f64 = 600.0;
    let bang_speed = profile.param(KIND, "bang_speed", 1500.0);
    const LOOKBACK_S: f64 = 0.75;
    const LOOKAHEAD_S: f64 = 1.5;
    let no_challenge_min = profile.param(KIND, "no_challenge_min", 800.0);
    // Focus depth must be smaller than every teammate's by this much.
    const LAST_MAN_MARGIN: f64 = 500.0;
    let last_man_frac = profile.param(KIND, "last_man_frac", 0.6);
    const DEBOUNCE_S: f64 = 4.0;
    const KICKOFF_SKIP_S: f64 = 1.5;
    const GRID_DT: f64 = 0.25;

    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let team = player.team;
    let own_goal_y = team.own_goal_y();
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let teammates = replay.teammate_indexes(player_idx);
    let opponents = replay.opponent_indexes(player_idx);
    if opponents.is_empty() {
        return Vec::new();
    }

    let in_play_starts: Vec<(f64, f64, f64)> = replay
        .balls
        .iter()
        .map(|seg| (seg.start, seg.end, segment_in_play_start(seg)))
        .collect();
    let in_kickoff_skip = |t: f64| -> bool {
        in_play_starts
            .iter()
            .any(|&(s, e, ip)| s <= t && t <= e && t < ip + KICKOFF_SKIP_S)
    };

    let setup_ok = |t_peak: f64| -> bool {
        let n_back = usize::max(2, (LOOKBACK_S / GRID_DT).round() as usize);
        let mut focus_depths: Vec<f64> = Vec::new();
        let mut ball_ahead: Vec<f64> = Vec::new();
        let mut focus_to_ball: Vec<f64> = Vec::new();
        let mut last_man_flags: Vec<bool> = Vec::new();
        let mut opp_control_seen = false;
        for k in 1..=n_back {
            let ts = t_peak - k as f64 * GRID_DT;
            let (Some(bp), Some(pp)) = (replay.ball_pos_at(ts), player.pos_at(ts)) else {
                continue;
            };
            let focus_depth = (pp.1 - own_goal_y) * own_dir_sign;
            focus_depths.push(focus_depth);
            ball_ahead.push((bp.1 - own_goal_y) * own_dir_sign - focus_depth);
            focus_to_ball.push(dist2d(pp, bp));
            let mut tm_min_depth = f64::INFINITY;
            for &tm in &teammates {
                if let Some(tm_pos) = players[tm].pos_at(ts) {
                    tm_min_depth = f64::min(tm_min_depth, (tm_pos.1 - own_goal_y) * own_dir_sign);
                }
            }
            // No teammates (1v1): focus is trivially the last man.
            last_man_flags.push(
                tm_min_depth == f64::INFINITY || focus_depth < tm_min_depth - LAST_MAN_MARGIN,
            );
            let mut closest_d = f64::INFINITY;
            let mut closest_p: Option<usize> = None;
            for (i, p) in players.iter().enumerate() {
                let Some(p_pos) = p.pos_at(ts) else { continue };
                let d = dist2d(p_pos, bp);
                if d < closest_d {
                    closest_d = d;
                    closest_p = Some(i);
                }
            }
            if let Some(cp) = closest_p {
                if players[cp].team != team && closest_d < OPP_CONTROL_RADIUS {
                    opp_control_seen = true;
                }
            }
        }
        if focus_depths.is_empty() {
            return false;
        }
        if focus_depths.iter().sum::<f64>() / (focus_depths.len() as f64) < MIN_FOCUS_DEPTH {
            return false;
        }
        if ball_ahead.iter().sum::<f64>() / (ball_ahead.len() as f64) < -BALL_AHEAD_SLACK {
            return false;
        }
        if focus_to_ball.iter().copied().fold(f64::INFINITY, f64::min) > near_ball_radius {
            return false;
        }
        let last_man_share =
            last_man_flags.iter().filter(|&&f| f).count() as f64 / last_man_flags.len() as f64;
        if last_man_share < last_man_frac {
            return false;
        }
        opp_control_seen
    };

    let no_challenge = |t_peak: f64| -> bool {
        let n_fwd = usize::max(2, (LOOKAHEAD_S / GRID_DT).round() as usize);
        let mut passed = false;
        let mut min_dist = f64::INFINITY;
        for k in 1..=n_fwd {
            let ts = t_peak + k as f64 * GRID_DT;
            let (Some(bp), Some(pp)) = (replay.ball_pos_at(ts), player.pos_at(ts)) else {
                continue;
            };
            let fd = (pp.1 - own_goal_y) * own_dir_sign;
            let bd = (bp.1 - own_goal_y) * own_dir_sign;
            if bd < fd {
                passed = true;
            }
            min_dist = f64::min(min_dist, dist2d(pp, bp));
        }
        passed && min_dist >= no_challenge_min
    };

    let grid = build_time_grid(replay, GRID_DT);
    let mut out = Vec::new();
    let mut last_emit = -1e9f64;

    for &t in &grid {
        if t - last_emit < DEBOUNCE_S {
            continue;
        }
        if in_kickoff_skip(t) {
            continue;
        }
        if player.is_demoed_at(t) || player.in_post_demo_grace(t) {
            continue;
        }
        let Some(bv) = replay.ball_velocity(t) else {
            continue;
        };
        let bv_toward_own = -bv.1 * own_dir_sign;
        if bv_toward_own < bang_speed {
            continue;
        }
        if !setup_ok(t) {
            continue;
        }
        if !no_challenge(t) {
            continue;
        }
        let t_start = t - LOOKBACK_S;
        let t_end = t + LOOKAHEAD_S;
        let Some(feats) = features(replay, player_idx, own_goal_y, t_start, t_end) else {
            continue;
        };
        let severity = ((bv_toward_own - bang_speed) / 1500.0 + 0.4).clamp(0.4, 1.0);
        out.push(Candidate::new(
            KIND,
            round_py(t, 2),
            round_py(t_start, 2),
            round_py(t_end, 2),
            player_idx,
            &player.name,
            severity,
            feats,
        ));
        last_emit = t;
    }

    out
}

pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    own_goal_y: f64,
    t_start: f64,
    t_end: f64,
) -> Option<Vec<f64>> {
    let players = &replay.players;
    let player = &players[player_idx];
    let teammates = replay.teammate_indexes(player_idx);
    let opponents = replay.opponent_indexes(player_idx);
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let duration = f64::max(0.0, t_end - t_start);
    let samples = [t_start, (t_start + t_end) / 2.0, t_end];

    let mut focus_depths: Vec<f64> = Vec::new();
    let mut ball_depths: Vec<f64> = Vec::new();
    let mut depth_leads: Vec<f64> = Vec::new();
    let mut ball_vel_toward_own: Vec<f64> = Vec::new();
    let mut tm_min_depths: Vec<f64> = Vec::new();
    let mut opp_min_dists: Vec<f64> = Vec::new();
    let mut boosts: Vec<f64> = Vec::new();
    let mut closings: Vec<f64> = Vec::new();

    for &st in &samples {
        let (Some(bp), Some(pp)) = (replay.ball_pos_at(st), player.pos_at(st)) else {
            continue;
        };
        let fd = (pp.1 - own_goal_y) * own_dir_sign;
        let bd = (bp.1 - own_goal_y) * own_dir_sign;
        focus_depths.push(fd);
        ball_depths.push(bd);
        depth_leads.push(bd - fd);
        boosts.push(player.boost_at(st));
        if let Some(bv) = replay.ball_velocity(st) {
            ball_vel_toward_own.push(-bv.1 * own_dir_sign);
        }
        // Closest teammate's depth (low = teammate is back covering).
        let mut tm_min = f64::INFINITY;
        for &tm in &teammates {
            let Some(tm_pos) = players[tm].pos_at(st) else {
                continue;
            };
            let tm_d = (tm_pos.1 - own_goal_y) * own_dir_sign;
            if tm_d < tm_min {
                tm_min = tm_d;
            }
        }
        if tm_min < f64::INFINITY {
            tm_min_depths.push(tm_min);
        }
        // Closest opponent's distance to the ball (low = opp control).
        let mut op_min = f64::INFINITY;
        for &op in &opponents {
            let Some(op_pos) = players[op].pos_at(st) else {
                continue;
            };
            op_min = f64::min(op_min, dist2d(op_pos, bp));
        }
        if op_min < f64::INFINITY {
            opp_min_dists.push(op_min);
        }
        // Focus closing toward ball — negative means drifting away.
        if let Some(pv) = player.velocity(st) {
            let dx = bp.0 - pp.0;
            let dy = bp.1 - pp.1;
            let n = (dx * dx + dy * dy).sqrt();
            if n > 1e-3 {
                closings.push(pv.0 * (dx / n) + pv.1 * (dy / n));
            }
        }
    }

    if focus_depths.is_empty() {
        return None;
    }

    let field_depth = 2.0 * FIELD_HALF_Y;
    let avg = |xs: &[f64]| -> f64 {
        if xs.is_empty() {
            0.0
        } else {
            xs.iter().sum::<f64>() / xs.len() as f64
        }
    };

    Some(vec![
        (avg(&focus_depths) / field_depth).clamp(0.0, 1.0),
        (avg(&ball_depths) / field_depth).clamp(0.0, 1.0),
        (avg(&depth_leads) / field_depth).clamp(-1.0, 1.0),
        (duration / 6.0).clamp(0.0, 1.0),
        (avg(&ball_vel_toward_own) / 2300.0).clamp(-1.0, 1.0),
        {
            let m = if tm_min_depths.is_empty() {
                field_depth
            } else {
                tm_min_depths.iter().copied().fold(f64::INFINITY, f64::min)
            };
            (m / field_depth).clamp(0.0, 1.0)
        },
        {
            let m = if opp_min_dists.is_empty() {
                6000.0
            } else {
                opp_min_dists.iter().copied().fold(f64::INFINITY, f64::min)
            };
            (m / 6000.0).clamp(0.0, 1.0)
        },
        (avg(&boosts) / 100.0).clamp(0.0, 1.0),
        (avg(&closings) / 2300.0).clamp(-1.0, 1.0),
    ])
}
