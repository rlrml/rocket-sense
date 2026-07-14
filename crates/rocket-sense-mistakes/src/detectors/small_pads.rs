//! Detector: pick_up_small_pads (mirrors `_pad_active_at` /
//! `_detect_pick_up_small_pads` / `_features_pick_up_small_pads`).

use crate::candidate::Candidate;
use crate::grid::build_time_grid;
use crate::kinds::PICK_UP_SMALL_PADS;
use crate::profile::DetectorProfile;
use crate::view::{dist2d, round_py, BoostPad, ReplayView, Vec3, FIELD_HALF_Y};

/// `_pad_active_at`: a pad is inactive between a pickup and its respawn.
pub fn pad_active_at(pad: &BoostPad, t: f64) -> bool {
    let starts = &pad.event_starts;
    let ends = &pad.event_ends;
    let n = starts.len().min(ends.len());
    for i in 0..n {
        if starts[i] <= t && t <= ends[i] {
            return false;
        }
    }
    // Trailing start with no matching end yet (pad still in cooldown).
    if starts.len() > n && starts[n] <= t {
        return false;
    }
    true
}

pub fn detect(
    replay: &ReplayView,
    player_idx: usize,
    _profile: &DetectorProfile,
) -> Vec<Candidate> {
    const KIND: &str = PICK_UP_SMALL_PADS;
    const PAD_NEAR_RADIUS: f64 = 250.0; // small pad pickup trigger is ~165
    const GROUND_Z_MAX: f64 = 80.0;
    const LOW_BOOST: f64 = 50.0;
    const N_MISS: usize = 3;
    const MERGE_GAP: f64 = 4.0;
    const MIN_DURATION: f64 = 1.5;
    const DEBOUNCE_S: f64 = 4.0;
    const GRID_DT: f64 = 0.25;
    const BEFORE_S: f64 = 1.5;
    const AFTER_S: f64 = 0.8;

    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let own_goal_y = player.team.own_goal_y();

    let small_pads: Vec<&BoostPad> = replay.boost_pads.iter().filter(|p| !p.big).collect();
    if small_pads.is_empty() {
        return Vec::new();
    }

    let grid = build_time_grid(replay, GRID_DT);
    if grid.is_empty() {
        return Vec::new();
    }

    let near_r2 = PAD_NEAR_RADIUS * PAD_NEAR_RADIUS;

    // Cache per-frame state.
    let per_frame: Vec<Option<(f64, Vec3, f64)>> = grid
        .iter()
        .map(|&t| {
            let pp = player.pos_at(t)?;
            if player.is_demoed_at(t) || player.in_post_demo_grace(t) {
                return None;
            }
            Some((t, pp, player.boost_at(t)))
        })
        .collect();

    // Walk pads → emit miss events at the closest approach within reach.
    let mut miss_events: Vec<(f64, usize)> = Vec::new(); // (time, pad_idx)
    for (pi, pad) in small_pads.iter().enumerate() {
        let px = pad.x;
        let py = pad.y;
        let mut in_run = false;
        let mut best_t = 0.0f64;
        let mut best_d2 = f64::INFINITY;
        let mut best_z = 0.0f64;
        for frame in &per_frame {
            let Some((t, pp, _)) = frame else {
                if in_run {
                    // Run ended — evaluate.
                    if best_d2 <= near_r2 && best_z <= GROUND_Z_MAX && pad_active_at(pad, best_t) {
                        // Confirm the pad stayed active at the next sample.
                        let next_t = best_t + GRID_DT;
                        if pad_active_at(pad, next_t) {
                            miss_events.push((best_t, pi));
                        }
                    }
                    in_run = false;
                    best_d2 = f64::INFINITY;
                }
                continue;
            };
            let dx = pp.0 - px;
            let dy = pp.1 - py;
            let d2 = dx * dx + dy * dy;
            if d2 <= near_r2 {
                in_run = true;
                if d2 < best_d2 {
                    best_d2 = d2;
                    best_t = *t;
                    best_z = pp.2;
                }
            } else if in_run {
                if best_z <= GROUND_Z_MAX && pad_active_at(pad, best_t) {
                    let next_t = best_t + GRID_DT;
                    if pad_active_at(pad, next_t) {
                        miss_events.push((best_t, pi));
                    }
                }
                in_run = false;
                best_d2 = f64::INFINITY;
            }
        }
        // Tail: car still within reach at end-of-grid.
        if in_run && best_d2 <= near_r2 && best_z <= GROUND_Z_MAX && pad_active_at(pad, best_t) {
            miss_events.push((best_t, pi));
        }
    }

    if miss_events.len() < N_MISS {
        return Vec::new();
    }

    miss_events.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());

    // Cluster misses into windows where the player stayed below LOW_BOOST.
    let mut out: Vec<Candidate> = Vec::new();
    let mut last_emit = -1e9f64;

    // `_boost_below_low_throughout`.
    let boost_below_low_throughout = |ts: f64, te: f64| -> (bool, f64, f64) {
        let n = usize::max(2, ((te - ts) / GRID_DT) as usize + 1);
        let mut vals: Vec<f64> = Vec::with_capacity(n);
        for k in 0..n {
            let t = ts + (te - ts) * (k as f64 / (n - 1) as f64);
            vals.push(player.boost_at(t));
        }
        if vals.is_empty() {
            return (false, 0.0, 0.0);
        }
        let max_v = vals.iter().copied().fold(f64::NEG_INFINITY, f64::max);
        let min_v = vals.iter().copied().fold(f64::INFINITY, f64::min);
        let mean_v = vals.iter().sum::<f64>() / vals.len() as f64;
        (max_v < LOW_BOOST, mean_v, min_v)
    };

    let n = miss_events.len();
    let mut i = 0;
    while i < n {
        let mut j = i;
        let mut cluster: Vec<(f64, usize)> = vec![miss_events[i]];
        while j + 1 < n && (miss_events[j + 1].0 - miss_events[j].0) <= MERGE_GAP {
            j += 1;
            cluster.push(miss_events[j]);
        }
        i = j + 1;

        let distinct_pads = {
            let mut pads: Vec<usize> = cluster.iter().map(|&(_, pi)| pi).collect();
            pads.sort_unstable();
            pads.dedup();
            pads.len()
        };
        if distinct_pads < N_MISS {
            continue;
        }
        let ts = cluster[0].0;
        let te = cluster[cluster.len() - 1].0;
        if (te - ts) < MIN_DURATION {
            continue;
        }
        if ts - last_emit < DEBOUNCE_S {
            continue;
        }
        let (below, mean_b, min_b) = boost_below_low_throughout(ts, te);
        if !below {
            continue;
        }

        let Some(feats) = features(
            replay,
            player_idx,
            &small_pads,
            own_goal_y,
            ts,
            te,
            distinct_pads,
            mean_b,
            min_b,
        ) else {
            continue;
        };
        let peak_t = (ts + te) / 2.0;
        // Severity: more missed pads + lower boost = more severe.
        let severity = f64::max(
            0.4,
            f64::min(
                1.0,
                0.4 + 0.1 * (cluster.len() as f64 - N_MISS as f64)
                    + 0.3 * f64::max(0.0, (LOW_BOOST - min_b) / LOW_BOOST),
            ),
        );
        out.push(Candidate::new(
            KIND,
            round_py(peak_t, 2),
            round_py(ts - BEFORE_S, 2),
            round_py(te + AFTER_S, 2),
            player_idx,
            &player.name,
            severity,
            feats,
        ));
        last_emit = te;
    }

    out
}

#[allow(clippy::too_many_arguments)]
pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    small_pads: &[&BoostPad],
    own_goal_y: f64,
    t_start: f64,
    t_end: f64,
    miss_count: usize,
    mean_boost: f64,
    min_boost: f64,
) -> Option<Vec<f64>> {
    let players = &replay.players;
    let player = &players[player_idx];
    let teammates = replay.teammate_indexes(player_idx);
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let duration = f64::max(0.0, t_end - t_start);
    let samples = [t_start, (t_start + t_end) / 2.0, t_end];

    let mut speeds: Vec<f64> = Vec::new();
    let mut ball_dists: Vec<f64> = Vec::new();
    let mut focus_depths: Vec<f64> = Vec::new();
    let mut active_in_reach: Vec<f64> = Vec::new();
    let mut tm_min_dists: Vec<f64> = Vec::new();
    const PAD_REACH: f64 = 250.0;
    let pad_reach2 = PAD_REACH * PAD_REACH;

    for &st in &samples {
        let Some(pp) = player.pos_at(st) else {
            continue;
        };
        let bp = replay.ball_pos_at(st);
        if let Some(pv) = player.velocity(st) {
            speeds.push((pv.0 * pv.0 + pv.1 * pv.1).sqrt());
        }
        if let Some(bp) = bp {
            ball_dists.push(dist2d(pp, bp));
        }
        focus_depths.push((pp.1 - own_goal_y) * own_dir_sign);

        let mut n_active = 0u32;
        for pad in small_pads {
            let dx = pp.0 - pad.x;
            let dy = pp.1 - pad.y;
            if (dx * dx + dy * dy) <= pad_reach2 && pad_active_at(pad, st) {
                n_active += 1;
            }
        }
        active_in_reach.push(n_active as f64);

        let mut tm_min = f64::INFINITY;
        if let Some(bp) = bp {
            for &tm in &teammates {
                let Some(tm_pos) = players[tm].pos_at(st) else {
                    continue;
                };
                tm_min = f64::min(tm_min, dist2d(tm_pos, bp));
            }
        }
        if tm_min < f64::INFINITY {
            tm_min_dists.push(tm_min);
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
        (miss_count as f64 / 6.0).clamp(0.0, 1.0),
        (duration / 6.0).clamp(0.0, 1.0),
        (mean_boost / 100.0).clamp(0.0, 1.0),
        (min_boost / 100.0).clamp(0.0, 1.0),
        (avg(&speeds) / 2300.0).clamp(0.0, 1.0),
        (avg(&ball_dists) / 6000.0).clamp(0.0, 1.0),
        (avg(&focus_depths) / field_depth).clamp(0.0, 1.0),
        (avg(&active_in_reach) / 4.0).clamp(0.0, 1.0),
        {
            let m = if tm_min_dists.is_empty() {
                6000.0
            } else {
                tm_min_dists.iter().copied().fold(f64::INFINITY, f64::min)
            };
            (m / 6000.0).clamp(0.0, 1.0)
        },
    ])
}
