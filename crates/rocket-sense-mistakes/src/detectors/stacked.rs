//! Detector: stacked_too_close (mirrors `_detect_stacked` /
//! `_attribute_stack_fault` / `_features_stacked`).

use crate::candidate::Candidate;
use crate::grid::build_time_grid;
use crate::kinds::STACKED_TOO_CLOSE;
use crate::profile::DetectorProfile;
use crate::view::{dist, dist2d, round_py, PlayerView, ReplayView, CEILING_Z, FIELD_HALF_Y};

pub fn detect(
    replay: &ReplayView,
    player_idx: usize,
    _profile: &DetectorProfile,
) -> Vec<Candidate> {
    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let own_goal_y = player.team.own_goal_y();
    let teammates = replay.teammate_indexes(player_idx);
    if teammates.is_empty() {
        return Vec::new();
    }

    let grid = build_time_grid(replay, 0.25);

    const STACK_DIST: f64 = 1500.0;
    const BALL_FAR: f64 = 2500.0; // ball must be at least this far to count
    const MIN_DURATION: f64 = 2.5;
    const MERGE_GAP: f64 = 4.0;

    // Per-frame: (t, closest teammate idx, teammate dist, dist-to-ball).
    let mut per: Vec<Option<(f64, usize, f64, f64)>> = Vec::with_capacity(grid.len());
    for &t in &grid {
        let (pp, bp) = match (player.pos_at(t), replay.ball_pos_at(t)) {
            (Some(pp), Some(bp)) if !player.is_demoed_at(t) => (pp, bp),
            _ => {
                per.push(None);
                continue;
            }
        };
        let mut best_idx: Option<usize> = None;
        let mut best_d = f64::INFINITY;
        for &ti in &teammates {
            let Some(mp) = players[ti].pos_at(t) else {
                continue;
            };
            let d = dist(pp, mp); // 3D — ceiling/wall vs ground isn't a stack
            if d < best_d {
                best_d = d;
                best_idx = Some(ti);
            }
        }
        let Some(best_idx) = best_idx else {
            per.push(None);
            continue;
        };
        let d_ball = dist2d(pp, bp);
        per.push(Some((t, best_idx, best_d, d_ball)));
    }

    // (t_start, t_end, peak_t, peak_min_dist, teammate_idx)
    let mut raw_events: Vec<(f64, f64, f64, f64, usize)> = Vec::new();
    let n = per.len();
    let mut i = 0;
    while i < n {
        let Some(s) = per[i] else {
            i += 1;
            continue;
        };
        if s.2 >= STACK_DIST || s.3 < BALL_FAR {
            i += 1;
            continue;
        }
        let mut j = i;
        let (mut peak_t, mut peak_d, mut peak_tm) = (s.0, s.2, s.1);
        // Majority teammate over the window, first-insertion order for ties
        // (mirrors Python dict insertion order + max()).
        let mut ti_majority: Vec<(usize, u32)> = Vec::new();
        while j < n {
            let Some(sj) = per[j] else { break };
            if !(sj.2 < STACK_DIST && sj.3 >= BALL_FAR) {
                break;
            }
            match ti_majority.iter_mut().find(|(ti, _)| *ti == sj.1) {
                Some((_, count)) => *count += 1,
                None => ti_majority.push((sj.1, 1)),
            }
            if sj.2 < peak_d {
                peak_d = sj.2;
                peak_t = sj.0;
                peak_tm = sj.1;
            }
            j += 1;
        }
        let t_start = per[i].unwrap().0;
        let t_end = if j > i {
            per[j - 1].unwrap().0
        } else {
            per[i].unwrap().0
        };
        if (t_end - t_start) >= MIN_DURATION {
            // Stable teammate (mode of stack partner; ties keep the first
            // inserted, matching Python's dict order + max()).
            let mut stable_tm = peak_tm;
            let mut best_count = 0u32;
            for &(ti, count) in &ti_majority {
                if count > best_count {
                    best_count = count;
                    stable_tm = ti;
                }
            }
            raw_events.push((t_start, t_end, peak_t, peak_d, stable_tm));
        }
        i = j + 1;
    }

    let mut merged: Vec<(f64, f64, f64, f64, usize)> = Vec::new();
    for ev in raw_events {
        if let Some(prev) = merged.last().copied() {
            if ev.4 == prev.4 && ev.0 - prev.1 <= MERGE_GAP {
                let new = (
                    prev.0,
                    prev.1.max(ev.1),
                    if ev.3 < prev.3 { ev.2 } else { prev.2 },
                    prev.3.min(ev.3),
                    prev.4,
                );
                *merged.last_mut().unwrap() = new;
                continue;
            }
        }
        merged.push(ev);
    }

    let mut out = Vec::new();
    for (t_start, t_end, peak_t, peak_d, tm_idx) in merged {
        let tm = &players[tm_idx];
        // Skip cases where the teammate drove into the focus player's space.
        if attribute_stack_fault(player, tm, t_start) == StackFault::Teammate {
            continue;
        }
        let Some(feats) = features(replay, player_idx, tm_idx, own_goal_y, t_start, t_end) else {
            continue;
        };
        // Severity: closer = worse, scaled to [0,1] over [STACK_DIST, 0].
        let severity = ((STACK_DIST - peak_d) / STACK_DIST).clamp(0.0, 1.0);
        let mut cand = Candidate::new(
            STACKED_TOO_CLOSE,
            round_py(peak_t, 2),
            round_py(t_start, 2),
            round_py(t_end, 2),
            player_idx,
            &player.name,
            severity,
            feats,
        );
        cand.with_player = Some(tm.name.clone());
        out.push(cand);
    }
    out
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum StackFault {
    Focus,
    Teammate,
    Shared,
}

/// `_attribute_stack_fault`: decide who closed the gap leading up to the stack.
fn attribute_stack_fault(player: &PlayerView, teammate: &PlayerView, t_start: f64) -> StackFault {
    const MAX_LOOKBACK: f64 = 10.0;
    const SEPARATION: f64 = 3000.0;
    const DT: f64 = 0.25;

    let (Some(p1), Some(m1)) = (player.pos_at(t_start), teammate.pos_at(t_start)) else {
        return StackFault::Shared;
    };

    let horizon = t_start - MAX_LOOKBACK;
    let mut t = t_start - DT;
    let mut t0: Option<f64> = None;
    while t >= horizon {
        if let (Some(p), Some(m)) = (player.pos_at(t), teammate.pos_at(t)) {
            if dist2d(p, m) >= SEPARATION {
                t0 = Some(t);
                break;
            }
        }
        t -= DT;
    }
    let Some(t0) = t0 else {
        return StackFault::Shared;
    };

    let (Some(p0), Some(m0)) = (player.pos_at(t0), teammate.pos_at(t0)) else {
        return StackFault::Shared;
    };

    let d_before = dist2d(p0, m0);
    if d_before - dist2d(p1, m1) <= 0.0 {
        return StackFault::Shared;
    }

    // Closure attributable to each player: hold the other at their start
    // position, measure how much closer the mover got.
    let focus_closure = d_before - dist2d(p1, m0);
    let tm_closure = d_before - dist2d(p0, m1);

    if focus_closure <= 0.0 && tm_closure > 0.0 {
        return StackFault::Teammate;
    }
    if tm_closure <= 0.0 && focus_closure > 0.0 {
        return StackFault::Focus;
    }

    let total = f64::max(1e-6, focus_closure + tm_closure);
    let focus_share = focus_closure / total;
    if focus_share >= 0.6 {
        StackFault::Focus
    } else if focus_share <= 0.4 {
        StackFault::Teammate
    } else {
        StackFault::Shared
    }
}

pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    teammate_idx: usize,
    own_goal_y: f64,
    t_start: f64,
    t_end: f64,
) -> Option<Vec<f64>> {
    let player = &replay.players[player_idx];
    let teammate = &replay.players[teammate_idx];
    let duration = f64::max(0.0, t_end - t_start);
    let ticks: Vec<f64> = if t_end > t_start {
        (0..5)
            .map(|i| t_start + i as f64 * (t_end - t_start) / 4.0)
            .collect()
    } else {
        vec![t_start]
    };

    let mut dists = Vec::new();
    let mut ball_dists = Vec::new();
    let mut own_boosts = Vec::new();
    let mut tm_boosts = Vec::new();
    let mut ys = Vec::new();
    let mut same_side_hits = 0u32;
    let mut same_side_total = 0u32;
    let mut ball_zs = Vec::new();

    for &tt in &ticks {
        let (Some(pp), Some(mp), Some(bp)) = (
            player.pos_at(tt),
            teammate.pos_at(tt),
            replay.ball_pos_at(tt),
        ) else {
            continue;
        };
        dists.push(dist(pp, mp));
        ball_dists.push(dist2d(pp, bp));
        own_boosts.push(player.boost_at(tt));
        tm_boosts.push(teammate.boost_at(tt));
        ys.push(pp.1);
        ball_zs.push(bp.2);
        same_side_total += 1;
        // "same side as ball" = both player & teammate on same x-half as ball.
        let x_sign = if bp.0 >= 0.0 { 1 } else { -1 };
        let p_sign = if pp.0 >= 0.0 { 1 } else { -1 };
        let m_sign = if mp.0 >= 0.0 { 1 } else { -1 };
        if p_sign == x_sign && m_sign == x_sign {
            same_side_hits += 1;
        }
    }

    if dists.is_empty() {
        return None;
    }

    let min_d = dists.iter().copied().fold(f64::INFINITY, f64::min);
    let mean_d = dists.iter().sum::<f64>() / dists.len() as f64;
    let mean_ball = ball_dists.iter().sum::<f64>() / ball_dists.len() as f64;
    let mean_y = ys.iter().sum::<f64>() / ys.len() as f64;
    // Signed distance from own goal, normalized (the Python source computes
    // this twice; only the second assignment survives).
    let mean_y_norm =
        ((mean_y - own_goal_y).abs() / (2.0 * FIELD_HALF_Y) * 2.0 - 1.0).clamp(-1.0, 1.0);
    let same_side = if same_side_total > 0 {
        same_side_hits as f64 / same_side_total as f64
    } else {
        0.0
    };
    let ball_h = (ball_zs.iter().sum::<f64>() / ball_zs.len() as f64) / CEILING_Z;

    Some(vec![
        f64::min(1.0, min_d / 1500.0),
        f64::min(1.0, mean_d / 1500.0),
        f64::min(1.0, duration / 6.0),
        f64::min(1.0, mean_ball / 8000.0),
        (tm_boosts.iter().sum::<f64>() / tm_boosts.len() as f64) / 100.0,
        (own_boosts.iter().sum::<f64>() / own_boosts.len() as f64) / 100.0,
        mean_y_norm,
        same_side,
        ball_h.clamp(0.0, 1.0),
    ])
}
