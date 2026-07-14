//! Detector: overcommitting_last_man (mirrors `_detect_overcommitting_last` /
//! `_was_beaten_after` / `_features_overcommitting`).

use crate::candidate::Candidate;
use crate::grid::{build_time_grid, segment_in_play_start};
use crate::kinds::OVERCOMMITTING_LAST_MAN;
use crate::profile::DetectorProfile;
use crate::view::{dist2d, round_py, ReplayView, FIELD_HALF_Y};
use serde_json::{Map, Value};

pub fn detect(replay: &ReplayView, player_idx: usize, profile: &DetectorProfile) -> Vec<Candidate> {
    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let own_goal_y = player.team.own_goal_y();
    let teammates = replay.teammate_indexes(player_idx);
    if teammates.is_empty() {
        return Vec::new(); // 1v1: there's no "last man" relative to anyone.
    }

    // depth = distance from own goal along y (positive, larger = further forward).
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };

    let grid = build_time_grid(replay, 0.25);

    const KICKOFF_GRACE: f64 = 10.0;
    let grace_until: Vec<f64> = replay
        .balls
        .iter()
        .map(|seg| segment_in_play_start(seg) + KICKOFF_GRACE)
        .collect();
    let in_kickoff_grace = |t: f64| -> bool {
        for (seg, &until) in replay.balls.iter().zip(grace_until.iter()) {
            if seg.start <= t && t <= seg.end {
                return t < until;
            }
        }
        false
    };

    let commit_radius = profile.param(OVERCOMMITTING_LAST_MAN, "commit_radius", 1800.0);
    let last_man_margin = profile.param(OVERCOMMITTING_LAST_MAN, "last_man_margin", 500.0);
    // Ball depth from own goal — below this is a save scenario.
    const BALL_NOT_TOO_DEEP: f64 = 2500.0;
    let contest_radius = profile.param(OVERCOMMITTING_LAST_MAN, "contest_radius", 2000.0);
    let min_duration = profile.param(OVERCOMMITTING_LAST_MAN, "min_duration", 1.5);
    let merge_gap = profile.param(OVERCOMMITTING_LAST_MAN, "merge_gap", 3.0);
    let require_beaten = profile.param_bool(OVERCOMMITTING_LAST_MAN, "require_beaten", true);

    let opponents = replay.opponent_indexes(player_idx);

    // Per-frame: (t, dist_to_ball, qualifies).
    let mut per: Vec<Option<(f64, f64, bool)>> = Vec::with_capacity(grid.len());
    for &t in &grid {
        let (pp, bp) = match (player.pos_at(t), replay.ball_pos_at(t)) {
            (Some(pp), Some(bp)) if !player.is_demoed_at(t) => (pp, bp),
            _ => {
                per.push(None);
                continue;
            }
        };
        let my_depth = (pp.1 - own_goal_y) * own_dir_sign;
        let mut tm_min_depth = f64::INFINITY;
        for &tm in &teammates {
            let Some(mp) = players[tm].pos_at(t) else {
                continue;
            };
            let d = (mp.1 - own_goal_y) * own_dir_sign;
            if d < tm_min_depth {
                tm_min_depth = d;
            }
        }
        if tm_min_depth == f64::INFINITY {
            per.push(None);
            continue;
        }
        let is_last_man = my_depth < (tm_min_depth - last_man_margin);
        let dist_to_ball = dist2d(pp, bp);
        let committing = dist_to_ball <= commit_radius;
        let ball_depth = (bp.1 - own_goal_y) * own_dir_sign;
        let ball_not_too_deep = ball_depth >= BALL_NOT_TOO_DEEP;
        // Clean challenge window: no opponent near ball = free play, not a dive.
        let mut opp_min = f64::INFINITY;
        for &op in &opponents {
            let Some(op_p) = players[op].pos_at(t) else {
                continue;
            };
            let d = dist2d(op_p, bp);
            if d < opp_min {
                opp_min = d;
            }
        }
        let contested = opp_min <= contest_radius;
        let qualifies =
            is_last_man && committing && ball_not_too_deep && contested && !in_kickoff_grace(t);
        per.push(Some((t, dist_to_ball, qualifies)));
    }

    let mut raw_events: Vec<(f64, f64, f64, f64)> = Vec::new();
    let n = per.len();
    let mut i = 0;
    while i < n {
        let Some(s) = per[i] else {
            i += 1;
            continue;
        };
        if !s.2 {
            i += 1;
            continue;
        }
        let mut j = i;
        let (mut peak_t, mut peak_d) = (s.0, s.1);
        while j < n {
            let Some(sj) = per[j] else { break };
            if !sj.2 {
                break;
            }
            if sj.1 < peak_d {
                peak_d = sj.1;
                peak_t = sj.0;
            }
            j += 1;
        }
        let t_start = per[i].unwrap().0;
        let t_end = if j > i {
            per[j - 1].unwrap().0
        } else {
            per[i].unwrap().0
        };
        if (t_end - t_start) >= min_duration {
            raw_events.push((t_start, t_end, peak_t, peak_d));
        }
        i = j + 1;
    }

    let mut merged: Vec<(f64, f64, f64, f64)> = Vec::new();
    for ev in raw_events {
        if let Some(prev) = merged.last().copied() {
            if ev.0 - prev.1 <= merge_gap {
                let new = (
                    prev.0,
                    prev.1.max(ev.1),
                    if ev.3 < prev.3 { ev.2 } else { prev.2 },
                    prev.3.min(ev.3),
                );
                *merged.last_mut().unwrap() = new;
                continue;
            }
        }
        merged.push(ev);
    }

    let mut out = Vec::new();
    for (t_start, t_end, peak_t, peak_d) in merged {
        // Only a "dive as last man" if the player was actually beaten.
        let outcome_confirmed = was_beaten_after(replay, player_idx, own_goal_y, peak_t, t_end);
        if require_beaten && !outcome_confirmed {
            continue;
        }
        let Some(feats) = features(replay, player_idx, own_goal_y, t_start, t_end, peak_t) else {
            continue;
        };
        // Severity: closer to ball at peak = more committed = worse.
        let severity = ((commit_radius - peak_d) / commit_radius).clamp(0.0, 1.0);
        let mut evidence = Map::new();
        evidence.insert(
            "outcome_confirmed".to_owned(),
            Value::Bool(outcome_confirmed),
        );
        let mut cand = Candidate::new(
            OVERCOMMITTING_LAST_MAN,
            round_py(peak_t, 2),
            round_py(t_start, 2),
            round_py(t_end, 2),
            player_idx,
            &player.name,
            severity,
            feats,
        );
        cand.evidence = Some(evidence);
        out.push(cand);
    }
    out
}

/// `_was_beaten_after`: true if within `look_ahead` seconds starting at peak_t
/// the ball ends up behind the player AND an opponent is the closest car to it,
/// continuously for `sustained` seconds.
fn was_beaten_after(
    replay: &ReplayView,
    player_idx: usize,
    own_goal_y: f64,
    peak_t: f64,
    t_end: f64,
) -> bool {
    const LOOK_AHEAD: f64 = 2.5;
    const SUSTAINED: f64 = 0.5;
    let players = &replay.players;
    let player = &players[player_idx];
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let teammates = replay.teammate_indexes(player_idx);
    let opponents = replay.opponent_indexes(player_idx);

    let mut t = peak_t.max(t_end);
    let horizon = t + LOOK_AHEAD;
    let dt = 0.25;
    let mut accum = 0.0;
    while t <= horizon {
        if let (Some(pp), Some(bp)) = (player.pos_at(t), replay.ball_pos_at(t)) {
            let ball_depth = (bp.1 - own_goal_y) * own_dir_sign;
            let my_depth = (pp.1 - own_goal_y) * own_dir_sign;
            let ball_behind_me = ball_depth < my_depth - 200.0;
            let mut opp_min = f64::INFINITY;
            for &op in &opponents {
                let Some(op_p) = players[op].pos_at(t) else {
                    continue;
                };
                let d = dist2d(op_p, bp);
                if d < opp_min {
                    opp_min = d;
                }
            }
            let mut tm_min = dist2d(pp, bp);
            for &tm in &teammates {
                let Some(tm_p) = players[tm].pos_at(t) else {
                    continue;
                };
                let d = dist2d(tm_p, bp);
                if d < tm_min {
                    tm_min = d;
                }
            }
            let opp_has_possession = opp_min < (tm_min - 100.0) && opp_min < 1500.0;
            if ball_behind_me && opp_has_possession {
                accum += dt;
                if accum >= SUSTAINED {
                    return true;
                }
            } else {
                accum = 0.0;
            }
        }
        t += dt;
    }
    false
}

pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    own_goal_y: f64,
    t_start: f64,
    t_end: f64,
    peak_t: f64,
) -> Option<Vec<f64>> {
    let players = &replay.players;
    let player = &players[player_idx];
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let teammates = replay.teammate_indexes(player_idx);
    let opponents = replay.opponent_indexes(player_idx);

    let duration = f64::max(0.0, t_end - t_start);
    let ticks: Vec<f64> = if t_end > t_start {
        (0..5)
            .map(|i| t_start + i as f64 * (t_end - t_start) / 4.0)
            .collect()
    } else {
        vec![t_start]
    };

    let mut dists_ball: Vec<f64> = Vec::new();
    let mut own_depths: Vec<f64> = Vec::new();
    let mut tm_depth_leads: Vec<f64> = Vec::new();
    let mut ball_depths: Vec<f64> = Vec::new();
    let mut opp_min_dists_ball: Vec<f64> = Vec::new();
    let mut boosts: Vec<f64> = Vec::new();

    for &tt in &ticks {
        let (Some(pp), Some(bp)) = (player.pos_at(tt), replay.ball_pos_at(tt)) else {
            continue;
        };
        dists_ball.push(dist2d(pp, bp));
        let my_depth = (pp.1 - own_goal_y) * own_dir_sign;
        own_depths.push(my_depth);
        let mut tm_min = f64::INFINITY;
        for &tm in &teammates {
            let Some(mp) = players[tm].pos_at(tt) else {
                continue;
            };
            let d = (mp.1 - own_goal_y) * own_dir_sign;
            if d < tm_min {
                tm_min = d;
            }
        }
        if tm_min < f64::INFINITY {
            // Positive = teammate is more forward than me.
            tm_depth_leads.push(tm_min - my_depth);
        }
        ball_depths.push((bp.1 - own_goal_y) * own_dir_sign);
        let mut opp_min = f64::INFINITY;
        for &op in &opponents {
            let Some(op_p) = players[op].pos_at(tt) else {
                continue;
            };
            let d = dist2d(op_p, bp);
            if d < opp_min {
                opp_min = d;
            }
        }
        if opp_min < f64::INFINITY {
            opp_min_dists_ball.push(opp_min);
        }
        boosts.push(player.boost_at(tt));
    }

    if dists_ball.is_empty() {
        return None;
    }

    let forward_speed = if own_depths.len() >= 2 && (t_end - t_start) > 0.0 {
        (own_depths[own_depths.len() - 1] - own_depths[0]) / (t_end - t_start)
    } else {
        0.0
    };

    let vel_to_own = match replay.ball_velocity(peak_t) {
        None => 0.0,
        Some(vel) => {
            let sgn = if own_goal_y < 0.0 { -1.0 } else { 1.0 };
            ((sgn * vel.1) / 4000.0).clamp(0.0, 1.0)
        }
    };

    let min_dist_ball = dists_ball.iter().copied().fold(f64::INFINITY, f64::min);
    let mean_dist_ball = dists_ball.iter().sum::<f64>() / dists_ball.len() as f64;
    let mean_ball_depth = ball_depths.iter().sum::<f64>() / ball_depths.len() as f64;
    let tm_depth_lead = if tm_depth_leads.is_empty() {
        0.0
    } else {
        ((tm_depth_leads.iter().sum::<f64>() / tm_depth_leads.len() as f64) / 4000.0)
            .clamp(-1.0, 1.0)
    };
    let opp_min = if opp_min_dists_ball.is_empty() {
        8000.0
    } else {
        opp_min_dists_ball
            .iter()
            .copied()
            .fold(f64::INFINITY, f64::min)
    };

    Some(vec![
        f64::min(1.0, min_dist_ball / 3000.0),
        f64::min(1.0, mean_dist_ball / 3000.0),
        f64::min(1.0, duration / 6.0),
        (mean_ball_depth / (2.0 * FIELD_HALF_Y)).clamp(0.0, 1.0),
        tm_depth_lead,
        (forward_speed / 1500.0).clamp(-1.0, 1.0),
        boosts.iter().sum::<f64>() / boosts.len() as f64 / 100.0,
        f64::min(1.0, opp_min / 4000.0),
        vel_to_own,
    ])
}
