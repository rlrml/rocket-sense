//! Detector: waiting_to_challenge (mirrors `_detect_waiting_to_challenge` /
//! `_features_waiting_to_challenge`).

use crate::candidate::Candidate;
use crate::grid::{build_time_grid, segment_in_play_start};
use crate::kinds::WAITING_TO_CHALLENGE;
use crate::profile::DetectorProfile;
use crate::view::{dist2d, round_py, ReplayView, FIELD_HALF_Y};

pub fn detect(replay: &ReplayView, player_idx: usize, profile: &DetectorProfile) -> Vec<Candidate> {
    const KIND: &str = WAITING_TO_CHALLENGE;
    const OPP_CONTROL_RADIUS: f64 = 400.0;
    const CONTROLLED_BALL_VEL: f64 = 2200.0;
    // Ball velocity toward own goal — opp must be driving forward.
    const OPP_CHARGING_VEL: f64 = 600.0;
    const HALF_DEPTH: f64 = 5500.0;
    let focus_near_radius = profile.param(KIND, "focus_near_radius", 3500.0);
    // Focus must be at least this much closer than the nearest teammate.
    const TEAMMATE_LEAD_BUFFER: f64 = 100.0;
    // A teammate must be at least this much deeper than focus.
    const TEAMMATE_COVER_BUFFER: f64 = 200.0;
    let slow_closing = profile.param(KIND, "slow_closing", 600.0);
    let min_boost = profile.param(KIND, "min_boost", 25.0);
    let min_delay_s = profile.param(KIND, "min_delay_s", 2.0);
    const MAX_DELAY_S: f64 = 5.5;
    const KICKOFF_SKIP_S: f64 = 1.5;
    const DEBOUNCE_S: f64 = 4.0;
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

    let grid = build_time_grid(replay, GRID_DT);
    let mut out: Vec<Candidate> = Vec::new();
    let mut last_emit = -1e9f64;
    let mut streak_start: Option<f64> = None;
    let mut streak_opp: Option<usize> = None;

    // `_emit_streak` — emits a candidate when the streak is long enough.
    macro_rules! emit_streak {
        ($start:expr, $end:expr, $opp:expr) => {{
            let start: f64 = $start;
            let end: f64 = $end;
            let opp: Option<usize> = $opp;
            let duration = end - start;
            if duration >= min_delay_s && end - last_emit >= DEBOUNCE_S {
                if let Some(opp) = opp {
                    if let Some(feats) = features(replay, player_idx, own_goal_y, opp, start, end) {
                        let severity = ((duration - min_delay_s) / 3.0).clamp(0.0, 1.0);
                        let peak = start + duration / 2.0;
                        out.push(Candidate::new(
                            KIND,
                            round_py(peak, 2),
                            round_py(start, 2),
                            round_py(end, 2),
                            player_idx,
                            &player.name,
                            severity,
                            feats,
                        ));
                        last_emit = end;
                    }
                }
            }
        }};
    }

    for &t in &grid {
        let mut is_qualifying = false;
        let mut opp_in_control: Option<usize> = None;

        if !in_kickoff_skip(t) && !player.is_demoed_at(t) && !player.in_post_demo_grace(t) {
            if let (Some(bp), Some(pp)) = (replay.ball_pos_at(t), player.pos_at(t)) {
                let ball_depth = (bp.1 - own_goal_y) * own_dir_sign;
                if ball_depth < HALF_DEPTH {
                    let mut closest_d = f64::INFINITY;
                    let mut closest_p: Option<usize> = None;
                    for (i, p) in players.iter().enumerate() {
                        let Some(p_pos) = p.pos_at(t) else { continue };
                        let d = dist2d(p_pos, bp);
                        if d < closest_d {
                            closest_d = d;
                            closest_p = Some(i);
                        }
                    }
                    if let Some(cp) = closest_p {
                        if players[cp].team != team && closest_d < OPP_CONTROL_RADIUS {
                            let bv = replay.ball_velocity(t);
                            let bv_mag = bv
                                .map(|bv| (bv.0 * bv.0 + bv.1 * bv.1 + bv.2 * bv.2).sqrt())
                                .unwrap_or(0.0);
                            // Ball must be controlled AND moving toward focus's
                            // own goal — the opp is charging, not stalling.
                            let ball_toward_own = bv.map(|bv| -bv.1 * own_dir_sign).unwrap_or(0.0);
                            if bv_mag < CONTROLLED_BALL_VEL && ball_toward_own > OPP_CHARGING_VEL {
                                let d_focus = dist2d(pp, bp);
                                if d_focus < focus_near_radius {
                                    let mut tm_min = f64::INFINITY;
                                    let focus_depth = (pp.1 - own_goal_y) * own_dir_sign;
                                    let mut has_cover = false;
                                    for &tm in &teammates {
                                        if let Some(tm_pos) = players[tm].pos_at(t) {
                                            tm_min = f64::min(tm_min, dist2d(tm_pos, bp));
                                            let tm_depth = (tm_pos.1 - own_goal_y) * own_dir_sign;
                                            if tm_depth + TEAMMATE_COVER_BUFFER < focus_depth {
                                                has_cover = true;
                                            }
                                        }
                                    }
                                    if has_cover && d_focus + TEAMMATE_LEAD_BUFFER < tm_min {
                                        let pv = player.velocity(t);
                                        let mut closing = 0.0;
                                        if let Some(pv) = pv {
                                            let dx = bp.0 - pp.0;
                                            let dy = bp.1 - pp.1;
                                            let n = (dx * dx + dy * dy).sqrt();
                                            if n > 1e-3 {
                                                closing = pv.0 * (dx / n) + pv.1 * (dy / n);
                                            }
                                        }
                                        if closing < slow_closing && player.boost_at(t) >= min_boost
                                        {
                                            is_qualifying = true;
                                            opp_in_control = Some(cp);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if is_qualifying {
            if streak_start.is_none() || streak_opp != opp_in_control {
                if let Some(ss) = streak_start {
                    emit_streak!(ss, t, streak_opp);
                }
                streak_start = Some(t);
                streak_opp = opp_in_control;
            } else if let Some(ss) = streak_start {
                if t - ss > MAX_DELAY_S {
                    // Cap and emit; reset to keep walking the same shadow.
                    emit_streak!(ss, ss + MAX_DELAY_S, streak_opp);
                    streak_start = Some(t);
                    streak_opp = opp_in_control;
                }
            }
        } else if let Some(ss) = streak_start {
            emit_streak!(ss, t, streak_opp);
            streak_start = None;
            streak_opp = None;
        }
    }

    if let Some(ss) = streak_start {
        let end = grid.last().copied().unwrap_or(ss);
        emit_streak!(ss, end, streak_opp);
    }
    let _ = last_emit;

    out
}

pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    own_goal_y: f64,
    opp_idx: usize,
    t_start: f64,
    t_end: f64,
) -> Option<Vec<f64>> {
    let players = &replay.players;
    let player = &players[player_idx];
    let teammates = replay.teammate_indexes(player_idx);
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let delay_s = f64::max(0.0, t_end - t_start);
    let samples = [t_start, (t_start + t_end) / 2.0, t_end];

    let mut boosts: Vec<f64> = Vec::new();
    let mut closings: Vec<f64> = Vec::new();
    let mut f_dists: Vec<f64> = Vec::new();
    let mut tm_min_dists: Vec<f64> = Vec::new();
    let mut ball_depths: Vec<f64> = Vec::new();
    let mut ball_vel_toward_own: Vec<f64> = Vec::new();
    let mut focus_depths: Vec<f64> = Vec::new();
    let mut opp_dists: Vec<f64> = Vec::new();

    for &st in &samples {
        let (Some(bp), Some(pp)) = (replay.ball_pos_at(st), player.pos_at(st)) else {
            continue;
        };
        boosts.push(player.boost_at(st));
        f_dists.push(dist2d(pp, bp));
        if let Some(pv) = player.velocity(st) {
            let dx = bp.0 - pp.0;
            let dy = bp.1 - pp.1;
            let n = (dx * dx + dy * dy).sqrt();
            if n > 1e-3 {
                closings.push(pv.0 * (dx / n) + pv.1 * (dy / n));
            }
        }
        let mut tm_min = f64::INFINITY;
        for &tm in &teammates {
            if let Some(tm_pos) = players[tm].pos_at(st) {
                tm_min = f64::min(tm_min, dist2d(tm_pos, bp));
            }
        }
        if tm_min < f64::INFINITY {
            tm_min_dists.push(tm_min);
        }
        ball_depths.push((bp.1 - own_goal_y) * own_dir_sign);
        if let Some(bv) = replay.ball_velocity(st) {
            // Positive = ball moving toward focus's own goal.
            ball_vel_toward_own.push(-bv.1 * own_dir_sign);
        }
        focus_depths.push((pp.1 - own_goal_y) * own_dir_sign);
        if let Some(opp_pos) = players[opp_idx].pos_at(st) {
            opp_dists.push(dist2d(opp_pos, bp));
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
        (delay_s / 6.0).clamp(0.0, 1.0),
        (avg(&ball_depths) / FIELD_HALF_Y).clamp(0.0, 1.0),
        (avg(&f_dists) / 6000.0).clamp(0.0, 1.0),
        (avg(&closings) / 1500.0).clamp(-1.0, 1.0),
        (avg(&boosts) / 100.0).clamp(0.0, 1.0),
        {
            let m = if tm_min_dists.is_empty() {
                6000.0
            } else {
                tm_min_dists.iter().copied().fold(f64::INFINITY, f64::min)
            };
            (m / 6000.0).clamp(0.0, 1.0)
        },
        (avg(&ball_vel_toward_own) / 2300.0).clamp(-1.0, 1.0),
        (avg(&focus_depths) / FIELD_HALF_Y).clamp(0.0, 1.0),
        {
            let m = if opp_dists.is_empty() {
                1000.0
            } else {
                opp_dists.iter().copied().fold(f64::INFINITY, f64::min)
            };
            (m / 1000.0).clamp(0.0, 1.0)
        },
    ])
}
