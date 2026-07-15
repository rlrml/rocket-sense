//! Detector: double_committing (mirrors `_detect_double_committing` /
//! `_features_double_committing`).

use crate::candidate::Candidate;
use crate::grid::{build_time_grid, segment_in_play_start};
use crate::kinds::DOUBLE_COMMITTING;
use crate::profile::DetectorProfile;
use crate::touches::find_player_ball_touches;
use crate::view::{bisect_left, dist2d, round_py, ReplayView, Vec3, FIELD_HALF_Y};

pub fn detect(
    replay: &ReplayView,
    player_idx: usize,
    _profile: &DetectorProfile,
) -> Vec<Candidate> {
    const KIND: &str = DOUBLE_COMMITTING;
    const BALL_AIR_Z_MIN: f64 = 400.0; // ball clearly aerial
    const PLAYER_AIR_Z_MIN: f64 = 120.0; // car off the ground
    const FOCUS_NEAR_3D: f64 = 1500.0;
    const TM_NEAR_3D: f64 = 1500.0;
    const FOCUS_CLOSING_MIN: f64 = 500.0;
    const TM_CLOSING_MIN: f64 = 500.0;
    const FOCUS_NOT_DEEP_MIN: f64 = 3500.0;
    const KICKOFF_SKIP_S: f64 = 1.5;
    const MIN_DURATION_S: f64 = 0.3;
    const DEBOUNCE_S: f64 = 3.0;
    const GRID_DT: f64 = 0.15;

    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let own_goal_y = player.team.own_goal_y();
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let teammates = replay.teammate_indexes(player_idx);
    if teammates.is_empty() {
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

    // If focus touched the ball during the streak, they were the rightful
    // committer — not a passive double-commit.
    let mut focus_touch_times: Vec<f64> = find_player_ball_touches(replay, player_idx)
        .into_iter()
        .map(|ft| ft.0)
        .collect();
    focus_touch_times.sort_by(|a, b| a.partial_cmp(b).unwrap());
    let focus_touched_during = |start: f64, end: f64| -> bool {
        let i = bisect_left(&focus_touch_times, start);
        i < focus_touch_times.len() && focus_touch_times[i] <= end + 0.1
    };

    // `_commit_3d`: (closing speed toward target, 3D distance).
    let commit_3d = |pos: Vec3, vel: Vec3, target: Vec3| -> (f64, f64) {
        let dx = target.0 - pos.0;
        let dy = target.1 - pos.1;
        let dz = target.2 - pos.2;
        let n = (dx * dx + dy * dy + dz * dz).sqrt();
        if n < 1e-3 {
            return (0.0, 0.0);
        }
        ((vel.0 * dx + vel.1 * dy + vel.2 * dz) / n, n)
    };

    let grid = build_time_grid(replay, GRID_DT);
    let mut out: Vec<Candidate> = Vec::new();
    let mut last_emit = -1e9f64;
    let mut streak_start: Option<f64> = None;
    let mut streak_tm: Option<usize> = None;

    macro_rules! emit {
        ($start:expr, $end:expr, $tm:expr) => {{
            let start: f64 = $start;
            let end: f64 = $end;
            let tm_used: Option<usize> = $tm;
            let duration = end - start;
            if duration >= MIN_DURATION_S
                && end - last_emit >= DEBOUNCE_S
                && !focus_touched_during(start, end)
            {
                if let Some(tm_used) = tm_used {
                    if let Some(feats) =
                        features(replay, player_idx, tm_used, own_goal_y, start, end)
                    {
                        let severity = (duration / 1.5).clamp(0.3, 1.0);
                        let peak = (start + end) / 2.0;
                        let mut cand = Candidate::new(
                            KIND,
                            round_py(peak, 2),
                            round_py(start, 2),
                            round_py(end, 2),
                            player_idx,
                            &player.name,
                            severity,
                            feats,
                        );
                        cand.with_player = Some(players[tm_used].name.clone());
                        out.push(cand);
                        last_emit = end;
                    }
                }
            }
        }};
    }

    for &t in &grid {
        let mut is_qualifying = false;
        let mut tm_committing: Option<usize> = None;

        if !in_kickoff_skip(t) && !player.is_demoed_at(t) && !player.in_post_demo_grace(t) {
            if let (Some(bp), Some(pp)) = (replay.ball_pos_at(t), player.pos_at(t)) {
                if bp.2 >= BALL_AIR_Z_MIN && pp.2 >= PLAYER_AIR_Z_MIN {
                    let focus_depth = (pp.1 - own_goal_y) * own_dir_sign;
                    if focus_depth >= FOCUS_NOT_DEEP_MIN {
                        if let Some(pv) = player.velocity(t) {
                            let (focus_close, focus_d3) = commit_3d(pp, pv, bp);
                            if focus_d3 < FOCUS_NEAR_3D && focus_close > FOCUS_CLOSING_MIN {
                                for &tm in &teammates {
                                    let Some(tm_pos) = players[tm].pos_at(t) else {
                                        continue;
                                    };
                                    if tm_pos.2 < PLAYER_AIR_Z_MIN {
                                        continue;
                                    }
                                    let Some(tmv) = players[tm].velocity(t) else {
                                        continue;
                                    };
                                    let (tm_close, tm_d3) = commit_3d(tm_pos, tmv, bp);
                                    if tm_d3 < TM_NEAR_3D && tm_close > TM_CLOSING_MIN {
                                        is_qualifying = true;
                                        tm_committing = Some(tm);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if is_qualifying {
            if streak_start.is_none() || streak_tm != tm_committing {
                if let Some(ss) = streak_start {
                    emit!(ss, t, streak_tm);
                }
                streak_start = Some(t);
                streak_tm = tm_committing;
            }
        } else if let Some(ss) = streak_start {
            emit!(ss, t, streak_tm);
            streak_start = None;
            streak_tm = None;
        }
    }

    if let Some(ss) = streak_start {
        let end = grid.last().copied().unwrap_or(ss);
        emit!(ss, end, streak_tm);
    }
    let _ = last_emit;

    out
}

pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    tm_idx: usize,
    own_goal_y: f64,
    t_start: f64,
    t_end: f64,
) -> Option<Vec<f64>> {
    let players = &replay.players;
    let player = &players[player_idx];
    let tm = &players[tm_idx];
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let opp_y_sign = -own_dir_sign;
    let samples = [t_start, (t_start + t_end) / 2.0, t_end];
    let duration = f64::max(0.0, t_end - t_start);

    let mut tm_dists: Vec<f64> = Vec::new();
    let mut f_dists: Vec<f64> = Vec::new();
    let mut closings: Vec<f64> = Vec::new();
    let mut ball_y_signs: Vec<f64> = Vec::new();
    let mut focus_depths: Vec<f64> = Vec::new();
    let mut tm_focus_dists: Vec<f64> = Vec::new();
    let mut boosts: Vec<f64> = Vec::new();
    let mut tm_speeds: Vec<f64> = Vec::new();

    for &st in &samples {
        let (Some(bp), Some(pp), Some(tm_pos)) =
            (replay.ball_pos_at(st), player.pos_at(st), tm.pos_at(st))
        else {
            continue;
        };
        f_dists.push(dist2d(pp, bp));
        tm_dists.push(dist2d(tm_pos, bp));
        tm_focus_dists.push(dist2d(pp, tm_pos));
        focus_depths.push((pp.1 - own_goal_y) * own_dir_sign);
        boosts.push(player.boost_at(st));
        ball_y_signs.push((bp.1 / FIELD_HALF_Y) * opp_y_sign);
        if let Some(pv) = player.velocity(st) {
            let dx = bp.0 - pp.0;
            let dy = bp.1 - pp.1;
            let n = (dx * dx + dy * dy).sqrt();
            if n > 1e-3 {
                closings.push(pv.0 * (dx / n) + pv.1 * (dy / n));
            }
        }
        if let Some(tmv) = tm.velocity(st) {
            let dx = bp.0 - tm_pos.0;
            let dy = bp.1 - tm_pos.1;
            let n = (dx * dx + dy * dy).sqrt();
            if n > 1e-3 {
                tm_speeds.push(tmv.0 * (dx / n) + tmv.1 * (dy / n));
            }
        }
    }

    if f_dists.is_empty() {
        return None;
    }

    let avg = |xs: &[f64]| -> f64 {
        if xs.is_empty() {
            0.0
        } else {
            xs.iter().sum::<f64>() / xs.len() as f64
        }
    };

    Some(vec![
        (avg(&tm_dists) / 1000.0).clamp(0.0, 1.0),
        (avg(&f_dists) / 4000.0).clamp(0.0, 1.0),
        (avg(&closings) / 2300.0).clamp(-1.0, 1.0),
        avg(&ball_y_signs).clamp(-1.0, 1.0),
        (avg(&focus_depths) / FIELD_HALF_Y).clamp(0.0, 1.0),
        (avg(&tm_focus_dists) / 4000.0).clamp(0.0, 1.0),
        (duration / 2.0).clamp(0.0, 1.0),
        (avg(&boosts) / 100.0).clamp(0.0, 1.0),
        (avg(&tm_speeds) / 2300.0).clamp(-1.0, 1.0),
    ])
}
