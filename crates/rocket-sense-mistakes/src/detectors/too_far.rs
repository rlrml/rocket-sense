//! Detector: too_far_from_play (mirrors `_detect_too_far` / `_features_too_far`).

use crate::candidate::Candidate;
use crate::grid::{build_time_grid, segment_in_play_start};
use crate::kinds::TOO_FAR_FROM_PLAY;
use crate::profile::DetectorProfile;
use crate::view::{dist, dist2d, round_py, ReplayView, FIELD_HALF_Y};

pub fn detect(replay: &ReplayView, player_idx: usize, profile: &DetectorProfile) -> Vec<Candidate> {
    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let team = player.team;
    let own_goal_y = team.own_goal_y();
    let teammates = replay.teammate_indexes(player_idx);

    // Sign convention: opp_y_dir is +1 if opp goal is at +y, else -1.
    let opp_y_dir = if own_goal_y < 0.0 { 1.0 } else { -1.0 };

    let grid = build_time_grid(replay, 0.25);

    // Per-segment kickoff-grace cutoffs: the first ~10s after a kickoff is
    // role-driven, so suppress too-far detection until rotations reset.
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

    let threshold = profile.param(TOO_FAR_FROM_PLAY, "distance_threshold", 6000.0);
    let boost_min = profile.param(TOO_FAR_FROM_PLAY, "boost_min", 50.0);
    let pressure_radius = profile.param(TOO_FAR_FROM_PLAY, "pressure_radius", 3000.0);
    // Ball must be at least this far past midfield (toward opp goal).
    const BALL_IN_OPP_HALF_Y: f64 = 500.0;
    let min_duration = profile.param(TOO_FAR_FROM_PLAY, "min_duration", 2.5);
    let merge_gap = profile.param(TOO_FAR_FROM_PLAY, "merge_gap", 4.0);

    // Per-frame context: (t, dist_to_ball, qualifies).
    let mut per: Vec<Option<(f64, f64, bool)>> = Vec::with_capacity(grid.len());
    for &t in &grid {
        let (pp, bp) = match (player.pos_at(t), replay.ball_pos_at(t)) {
            (Some(pp), Some(bp)) if !player.is_demoed_at(t) => (pp, bp),
            _ => {
                per.push(None);
                continue;
            }
        };
        let dist_to_ball = dist(pp, bp);
        let boost = player.boost_at(t);
        // Ball must be past midfield, on the opp side.
        let ball_offensive = (opp_y_dir * bp.1) > BALL_IN_OPP_HALF_Y;
        // Some teammate must be near the ball (pressuring).
        let mut teammate_near = false;
        for &tm in &teammates {
            let Some(mp) = players[tm].pos_at(t) else {
                continue;
            };
            if dist2d(mp, bp) <= pressure_radius {
                teammate_near = true;
                break;
            }
        }
        // Player must be sitting deep behind the ball along the goal axis.
        let depth_behind_ball = (bp.1 - pp.1) * opp_y_dir;
        let deep_back = depth_behind_ball > 4000.0;
        let qualifies = dist_to_ball >= threshold
            && boost >= boost_min
            && ball_offensive
            && teammate_near
            && deep_back
            && !in_kickoff_grace(t)
            && !player.in_post_demo_grace(t);
        per.push(Some((t, dist_to_ball, qualifies)));
    }

    // Group consecutive qualifying samples into raw events.
    let mut raw_events: Vec<(f64, f64, f64, f64)> = Vec::new();
    let n = per.len();
    let mut i = 0;
    while i < n {
        let Some(sample) = per[i] else {
            i += 1;
            continue;
        };
        if !sample.2 {
            i += 1;
            continue;
        }
        let mut j = i;
        let (mut peak_t, mut peak_d) = (sample.0, sample.1);
        while j < n {
            let Some(s) = per[j] else { break };
            if !s.2 {
                break;
            }
            if s.1 > peak_d {
                peak_d = s.1;
                peak_t = s.0;
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

    // Merge events within merge_gap seconds.
    let mut merged: Vec<(f64, f64, f64, f64)> = Vec::new();
    for ev in raw_events {
        if let Some(prev) = merged.last().copied() {
            if ev.0 - prev.1 <= merge_gap {
                let new = (
                    prev.0,
                    prev.1.max(ev.1),
                    if ev.3 > prev.3 { ev.2 } else { prev.2 },
                    prev.3.max(ev.3),
                );
                *merged.last_mut().unwrap() = new;
                continue;
            }
        }
        merged.push(ev);
    }

    // Anchor an event to a recent boost topup when possible.
    let pre_event_window = profile.param(TOO_FAR_FROM_PLAY, "pre_event_window", 5.0);
    let topups = player.find_boost_topups();
    let mut anchored: Vec<(f64, f64, f64, f64)> = Vec::new();
    for (t_start, t_end, peak_t, peak_d) in merged {
        let mut best_topup: Option<f64> = None;
        for &tu in &topups {
            if tu < t_start - pre_event_window {
                continue;
            }
            if tu > t_end - min_duration {
                break;
            }
            if best_topup.is_none_or(|b| tu > b) {
                best_topup = Some(tu);
            }
        }
        let Some(best_topup) = best_topup else {
            anchored.push((t_start, t_end, peak_t, peak_d));
            continue;
        };
        let new_t_start = t_start.max(best_topup);
        if t_end - new_t_start < min_duration {
            continue;
        }
        // Recompute peak distance within the post-topup window so severity
        // reflects only the lingering portion.
        let (mut new_peak_t, mut new_peak_d) = (new_t_start, -1.0f64);
        for sample in per.iter().flatten() {
            let (st, sd) = (sample.0, sample.1);
            if st < new_t_start || st > t_end {
                continue;
            }
            if sd > new_peak_d {
                new_peak_d = sd;
                new_peak_t = st;
            }
        }
        if new_peak_d < 0.0 {
            new_peak_t = peak_t;
            new_peak_d = peak_d;
        }
        anchored.push((new_t_start, t_end, new_peak_t, new_peak_d));
    }

    let mut out = Vec::new();
    for (t_start, t_end, peak_t, peak_d) in anchored {
        let Some(feats) = features(replay, player_idx, own_goal_y, t_start, t_end, peak_t) else {
            continue;
        };
        // Severity: a [0,1] scaled distance — capped at 8000 uu.
        let severity = ((peak_d - threshold) / (8000.0 - threshold)).clamp(0.0, 1.0);
        out.push(Candidate::new(
            TOO_FAR_FROM_PLAY,
            round_py(peak_t, 2),
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
    let duration = f64::max(0.0, t_end - t_start);

    // Sample dist to ball at 5 evenly-spaced ticks across the window.
    let ticks: Vec<f64> = if t_end > t_start {
        (0..5)
            .map(|i| t_start + i as f64 * (t_end - t_start) / 4.0)
            .collect()
    } else {
        vec![t_start]
    };
    let mut dists = Vec::new();
    let mut pp_first: Option<((f64, f64, f64), (f64, f64, f64))> = None;
    let mut pp_last: Option<((f64, f64, f64), (f64, f64, f64))> = None;
    let mut bp_at_peak: Option<(f64, f64, f64)> = None;
    for (k, &tt) in ticks.iter().enumerate() {
        let (Some(pp), Some(bp)) = (player.pos_at(tt), replay.ball_pos_at(tt)) else {
            continue;
        };
        dists.push(dist(pp, bp));
        if k == 0 {
            pp_first = Some((pp, bp));
        }
        pp_last = Some((pp, bp));
        if (tt - peak_t).abs() < 1e-3 {
            bp_at_peak = Some(bp);
        }
    }
    if dists.is_empty() {
        return None;
    }
    let bp_at_peak = bp_at_peak
        .or_else(|| replay.ball_pos_at(peak_t))
        .or(pp_last.map(|(_, bp)| bp))
        .unwrap_or((0.0, 0.0, 0.0));

    let mean_d = dists.iter().sum::<f64>() / dists.len() as f64;
    let max_d = dists.iter().copied().fold(f64::NEG_INFINITY, f64::max);

    // Ball y normalized so +1 = at opp goal (offensive), -1 = at own goal.
    let ball_y = bp_at_peak.1;
    let mut ball_y_off_norm = (ball_y / FIELD_HALF_Y) * if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    ball_y_off_norm = ball_y_off_norm.clamp(-1.0, 1.0);

    // Am I the deepest defender on my team?
    let teammates = replay.teammate_indexes(player_idx);
    let pp_peak = player.pos_at(peak_t);
    let mut is_deepest = 0.0;
    if let Some(pp_peak) = pp_peak {
        let my_depth = (pp_peak.1 - own_goal_y).abs();
        if teammates.iter().all(|&tm| {
            players[tm]
                .pos_at(peak_t)
                .is_none_or(|mp| (mp.1 - own_goal_y).abs() >= my_depth)
        }) {
            is_deepest = 1.0;
        }
    }

    // Average own boost across the window (normalized to [0,1]).
    let boost_samples: Vec<f64> = ticks.iter().map(|&tt| player.boost_at(tt)).collect();
    let own_boost_avg = boost_samples.iter().sum::<f64>() / boost_samples.len() as f64 / 100.0;

    // Teammate min dist to ball at peak — proxy for "is anyone on the play?".
    let mut tm_min = f64::INFINITY;
    for &tm in &teammates {
        let Some(mp) = players[tm].pos_at(peak_t) else {
            continue;
        };
        let d = dist(mp, bp_at_peak);
        if d < tm_min {
            tm_min = d;
        }
    }
    if tm_min == f64::INFINITY {
        tm_min = 8000.0;
    }
    let tm_min_norm = f64::min(1.0, tm_min / 8000.0);

    // Are we getting closer or further during the window?
    let delta = match (pp_first, pp_last) {
        (Some((p0, b0)), Some((p1, b1))) => {
            let d0 = dist(p0, b0);
            let d1 = dist(p1, b1);
            (d1 - d0) / 8000.0
        }
        _ => 0.0,
    };

    // Ball velocity component toward own goal (positive = bad).
    let vel_to_own = match replay.ball_velocity(peak_t) {
        None => 0.0,
        Some(vel) => {
            let sign = if own_goal_y < 0.0 { -1.0 } else { 1.0 };
            ((sign * vel.1) / 4000.0).clamp(0.0, 1.0)
        }
    };

    Some(vec![
        f64::min(1.0, mean_d / 8000.0),
        f64::min(1.0, max_d / 10000.0),
        f64::min(1.0, duration / 8.0),
        ball_y_off_norm,
        is_deepest,
        own_boost_avg,
        tm_min_norm,
        delta.clamp(-1.0, 1.0),
        vel_to_own,
    ])
}
