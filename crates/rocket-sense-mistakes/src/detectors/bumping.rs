//! Detector: bumping_teammate (mirrors `_bump_teammate_metrics` /
//! `_detect_bumping_teammate` / `_features_bumping_teammate`).

use crate::candidate::Candidate;
use crate::grid::{build_time_grid, segment_in_play_start};
use crate::kinds::BUMPING_TEAMMATE;
use crate::profile::DetectorProfile;
use crate::view::{dist, dist2d, round_py, PlayerView, ReplayView, Vec3};
use serde_json::{Map, Value};

#[derive(Debug, Clone, Copy)]
pub(crate) struct BumpMetrics {
    pub focus_pos: Vec3,
    pub teammate_pos: Vec3,
    pub min_dist: f64,
    pub z_diff: f64,
    pub focus_directness: f64,
    pub teammate_directness: f64,
    pub relative_closing: f64,
    pub responsibility_share: f64,
    pub heading_cos: f64,
    pub teammate_jolt: f64,
}

/// `_bump_teammate_metrics`.
pub(crate) fn bump_teammate_metrics(
    player: &PlayerView,
    teammate: &PlayerView,
    t: f64,
) -> Option<BumpMetrics> {
    let pp = player.pos_at(t)?;
    let tp = teammate.pos_at(t)?;
    let pv = player.velocity(t)?;
    let tv = teammate.velocity(t)?;

    let dx = tp.0 - pp.0;
    let dy = tp.1 - pp.1;
    let d2 = (dx * dx + dy * dy).sqrt();
    if d2 < 1e-3 {
        return None;
    }
    let ux = dx / d2;
    let uy = dy / d2;

    let focus_direct = pv.0 * ux + pv.1 * uy;
    let teammate_direct = -(tv.0 * ux + tv.1 * uy);
    let relative_closing = (pv.0 - tv.0) * ux + (pv.1 - tv.1) * uy;
    let focus_positive = f64::max(0.0, focus_direct);
    let teammate_positive = f64::max(0.0, teammate_direct);
    let total_direct = focus_positive + teammate_positive;
    let responsibility_share = if total_direct > 1e-6 {
        focus_positive / total_direct
    } else {
        0.5
    };

    let heading_cos = player
        .heading_at(t)
        .map(|h| h.0 * ux + h.1 * uy)
        .unwrap_or(0.0);

    let tv_before = teammate.velocity(t - 0.2);
    let tv_after = teammate.velocity(t + 0.2);
    let teammate_jolt = match (tv_before, tv_after) {
        (Some(b), Some(a)) => {
            ((a.0 - b.0).powi(2) + (a.1 - b.1).powi(2) + (a.2 - b.2).powi(2)).sqrt()
        }
        _ => 0.0,
    };

    Some(BumpMetrics {
        focus_pos: pp,
        teammate_pos: tp,
        min_dist: d2,
        z_diff: (pp.2 - tp.2).abs(),
        focus_directness: focus_direct,
        teammate_directness: teammate_direct,
        relative_closing,
        responsibility_share,
        heading_cos,
        teammate_jolt,
    })
}

pub fn detect(replay: &ReplayView, player_idx: usize, profile: &DetectorProfile) -> Vec<Candidate> {
    const KIND: &str = BUMPING_TEAMMATE;
    let contact_radius = profile.param(KIND, "contact_radius", 120.0);
    let contact_3d_radius = profile.param(KIND, "contact_3d_radius", 145.0);
    let contact_z_diff = profile.param(KIND, "contact_z_diff", 75.0);
    let max_contact_car_z = profile.param(KIND, "max_contact_car_z", 165.0);
    let pre_separation_gain = profile.param(KIND, "pre_separation_gain", 180.0);
    let post_separation_gain = profile.param(KIND, "post_separation_gain", 140.0);
    let pre_lookback_s = profile.param(KIND, "pre_lookback_s", 0.35);
    let post_lookahead_s = profile.param(KIND, "post_lookahead_s", 0.35);
    let min_rel_closing = profile.param(KIND, "min_relative_closing", 650.0);
    let min_focus_direct = profile.param(KIND, "min_focus_directness", 1100.0);
    let min_heading_cos = profile.param(KIND, "min_heading_cos", 0.45);
    let min_teammate_jolt = profile.param(KIND, "min_teammate_jolt", 990.0);
    let clear_contact_radius = profile.param(KIND, "clear_contact_radius", 96.0);
    let clear_contact_tm_direct_max =
        profile.param(KIND, "clear_contact_teammate_directness_max", -230.0);
    let clear_contact_rel_closing_max =
        profile.param(KIND, "clear_contact_relative_closing_max", 805.0);
    let responsibility_share_min = profile.param(KIND, "responsibility_share", 0.65);
    let kickoff_skip_s = profile.param(KIND, "kickoff_skip_s", 2.0);
    let grid_dt = profile.param(KIND, "grid_dt", 0.1);
    let merge_gap = profile.param(KIND, "merge_gap", 0.8);

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

    let in_play_starts: Vec<(f64, f64, f64)> = replay
        .balls
        .iter()
        .map(|seg| (seg.start, seg.end, segment_in_play_start(seg)))
        .collect();
    let in_kickoff_skip = |t: f64| -> bool {
        in_play_starts
            .iter()
            .any(|&(s, e, ip)| s <= t && t <= e && t < ip + kickoff_skip_s)
    };

    // (t_start, t_end, peak_t, min_dist, teammate_idx, metrics)
    let mut raw_events: Vec<(f64, f64, f64, f64, usize, BumpMetrics)> = Vec::new();
    for t in build_time_grid(replay, grid_dt) {
        if in_kickoff_skip(t) || player.is_demoed_at(t) || player.in_post_demo_grace(t) {
            continue;
        }

        let mut best: Option<(usize, BumpMetrics)> = None;
        let mut best_score = f64::NEG_INFINITY;
        for &tm_idx in &teammates {
            let teammate = &players[tm_idx];
            if teammate.is_demoed_at(t) || teammate.in_post_demo_grace(t) {
                continue;
            }
            let Some(metrics) = bump_teammate_metrics(player, teammate, t) else {
                continue;
            };
            let contact_3d = dist(metrics.focus_pos, metrics.teammate_pos);
            if metrics.min_dist > contact_radius {
                continue;
            }
            if contact_3d > contact_3d_radius {
                continue;
            }
            if metrics.z_diff > contact_z_diff {
                continue;
            }
            if metrics.focus_pos.2 > max_contact_car_z || metrics.teammate_pos.2 > max_contact_car_z
            {
                continue;
            }

            let prev_p = player.pos_at(t - pre_lookback_s);
            let prev_tm = teammate.pos_at(t - pre_lookback_s);
            let post_p = player.pos_at(t + post_lookahead_s);
            let post_tm = teammate.pos_at(t + post_lookahead_s);
            let near_prev_p = player.pos_at(t - grid_dt);
            let near_prev_tm = teammate.pos_at(t - grid_dt);
            let near_post_p = player.pos_at(t + grid_dt);
            let near_post_tm = teammate.pos_at(t + grid_dt);
            let (Some(prev_p), Some(prev_tm), Some(post_p), Some(post_tm)) =
                (prev_p, prev_tm, post_p, post_tm)
            else {
                continue;
            };
            let (Some(near_prev_p), Some(near_prev_tm), Some(near_post_p), Some(near_post_tm)) =
                (near_prev_p, near_prev_tm, near_post_p, near_post_tm)
            else {
                continue;
            };
            let prev_dist = dist2d(prev_p, prev_tm);
            let post_dist = dist2d(post_p, post_tm);
            let near_prev_dist = dist2d(near_prev_p, near_prev_tm);
            let near_post_dist = dist2d(near_post_p, near_post_tm);
            let local_minimum_slack = 20.0;
            if metrics.min_dist > near_prev_dist + local_minimum_slack {
                continue;
            }
            if metrics.min_dist > near_post_dist + local_minimum_slack {
                continue;
            }
            let closed_into_contact = prev_dist >= metrics.min_dist + pre_separation_gain;
            let separated_after_contact = post_dist >= metrics.min_dist + post_separation_gain;
            if !closed_into_contact || !separated_after_contact {
                continue;
            }
            if metrics.relative_closing < min_rel_closing {
                continue;
            }
            if metrics.focus_directness < min_focus_direct {
                continue;
            }
            if metrics.heading_cos < min_heading_cos {
                continue;
            }
            let strong_impulse = metrics.teammate_jolt >= min_teammate_jolt;
            let clear_low_jolt_contact = metrics.min_dist <= clear_contact_radius
                && metrics.teammate_directness <= clear_contact_tm_direct_max
                && metrics.relative_closing <= clear_contact_rel_closing_max;
            if !strong_impulse && !clear_low_jolt_contact {
                continue;
            }
            if metrics.responsibility_share < responsibility_share_min {
                continue;
            }

            let score = f64::max(0.0, contact_radius - metrics.min_dist)
                + f64::max(0.0, metrics.relative_closing) / 10.0
                + f64::max(0.0, metrics.focus_directness) / 20.0;
            if score > best_score {
                best = Some((tm_idx, metrics));
                best_score = score;
            }
        }

        if let Some((tm_idx, metrics)) = best {
            raw_events.push((t, t, t, metrics.min_dist, tm_idx, metrics));
        }
    }

    let mut merged: Vec<(f64, f64, f64, f64, usize, BumpMetrics)> = Vec::new();
    for event in raw_events {
        if let Some(prev) = merged.last().copied() {
            if event.4 == prev.4 && event.0 - prev.1 <= merge_gap {
                let (peak_t, min_dist, metrics) =
                    if event.3 < prev.3 || event.5.relative_closing > prev.5.relative_closing {
                        (event.2, event.3, event.5)
                    } else {
                        (prev.2, prev.3, prev.5)
                    };
                *merged.last_mut().unwrap() = (prev.0, event.1, peak_t, min_dist, prev.4, metrics);
                continue;
            }
        }
        merged.push(event);
    }

    let mut out = Vec::new();
    for (t_start, t_end, peak_t, min_dist, tm_idx, metrics) in merged {
        let Some(feats) = features(
            replay, player_idx, own_goal_y, peak_t, t_start, t_end, &metrics,
        ) else {
            continue;
        };
        let distance_severity = ((contact_radius - min_dist) / contact_radius).clamp(0.0, 1.0);
        let closing_severity = (metrics.relative_closing / 2300.0).clamp(0.0, 1.0);
        let responsibility_severity = ((metrics.responsibility_share - 0.5) / 0.5).clamp(0.0, 1.0);
        let severity = f64::max(
            0.25,
            f64::min(
                1.0,
                0.35 * distance_severity + 0.4 * closing_severity + 0.25 * responsibility_severity,
            ),
        );
        let mut evidence = Map::new();
        evidence.insert(
            "responsibility_share".to_owned(),
            Value::from(round_py(metrics.responsibility_share, 3)),
        );
        evidence.insert(
            "relative_closing".to_owned(),
            Value::from(round_py(metrics.relative_closing, 1)),
        );
        evidence.insert(
            "min_contact_dist".to_owned(),
            Value::from(round_py(min_dist, 1)),
        );
        let mut cand = Candidate::new(
            KIND,
            round_py(peak_t, 2),
            round_py(t_start, 2),
            round_py(t_end, 2),
            player_idx,
            &player.name,
            severity,
            feats,
        );
        cand.with_player = Some(players[tm_idx].name.clone());
        cand.evidence = Some(evidence);
        out.push(cand);
    }
    out
}

pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    _own_goal_y: f64,
    contact_t: f64,
    t_start: f64,
    t_end: f64,
    metrics: &BumpMetrics,
) -> Option<Vec<f64>> {
    let player = &replay.players[player_idx];
    // Python: `pp = metrics.get("focus_pos") or _player_pos_at(...)`; the
    // metrics position is always set here, and `pp is None` can't happen.
    let pp = metrics.focus_pos;
    let bp = replay.ball_pos_at(contact_t);
    let duration = f64::max(0.0, t_end - t_start);
    let ball_dist = bp.map(|bp| dist2d(pp, bp)).unwrap_or(6000.0);

    Some(vec![
        (metrics.min_dist / 600.0).clamp(0.0, 1.0),
        (metrics.relative_closing / 2300.0).clamp(0.0, 1.0),
        (metrics.focus_directness / 2300.0).clamp(-1.0, 1.0),
        (metrics.teammate_directness / 2300.0).clamp(-1.0, 1.0),
        metrics.responsibility_share.clamp(0.0, 1.0),
        metrics.heading_cos.clamp(-1.0, 1.0),
        (duration / 1.5).clamp(0.0, 1.0),
        (ball_dist / 6000.0).clamp(0.0, 1.0),
        (player.boost_at(contact_t) / 100.0).clamp(0.0, 1.0),
        (metrics.teammate_jolt / 1800.0).clamp(0.0, 1.0),
    ])
}
