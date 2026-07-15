//! Detector: hesitating_on_50 (mirrors `_detect_hesitating_on_50` /
//! `_features_hesitating_on_50`).

use crate::candidate::Candidate;
use crate::grid::{build_time_grid, segment_in_play_start};
use crate::kinds::HESITATING_ON_50;
use crate::profile::DetectorProfile;
use crate::touches::{eta_to_ball_2d, find_next_ball_toucher, find_player_ball_touches};
use crate::view::{
    bisect_left, dist2d, round_py, PlayerView, ReplayView, Vec3, CEILING_Z, FIELD_HALF_Y,
};

pub fn detect(replay: &ReplayView, player_idx: usize, profile: &DetectorProfile) -> Vec<Candidate> {
    const KIND: &str = HESITATING_ON_50;
    let threat_dist = profile.param(KIND, "threat_dist", 3500.0);
    let beat_gap_s = profile.param(KIND, "beat_gap_s", 0.3);
    let tie_window_s = profile.param(KIND, "tie_window_s", 0.3);
    let min_boost = profile.param(KIND, "min_boost", 12.0);
    const KICKOFF_SKIP_S: f64 = 1.0;
    const LOOKAHEAD_S: f64 = 1.6;
    const DEBOUNCE_S: f64 = 2.0;
    let grow_threshold = profile.param(KIND, "grow_threshold", 600.0);
    let max_focus_eta = profile.param(KIND, "max_focus_eta", 2.5);
    const MAX_OPP_ETA: f64 = 3.5;
    const COMMIT_CLOSING: f64 = 1300.0;
    const CHALLENGE_REACH_DIST: f64 = 500.0;
    const LOOSE_LOOKBACK_S: f64 = 0.6;
    const LOOSE_BALL_MIN_SPEED: f64 = 500.0;
    // A player high in the air AND falling can't jump for the ball.
    const GROUND_READY_Z: f64 = 250.0;
    // Focus must clearly be the team's best-positioned contester.
    const TM_CLEAR_LEAD_S: f64 = 0.5;

    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let team = player.team;
    let own_goal_y = team.own_goal_y();
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let opp_y_sign = -own_dir_sign;
    let opponents = replay.opponent_indexes(player_idx);
    let teammates = replay.teammate_indexes(player_idx);
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

    let mut all_touch_times: Vec<f64> = Vec::new();
    let mut focus_touch_times: Vec<f64> = Vec::new();
    for j in 0..players.len() {
        for (tt, _ps, _pv) in find_player_ball_touches(replay, j) {
            all_touch_times.push(tt);
            if j == player_idx {
                focus_touch_times.push(tt);
            }
        }
    }
    all_touch_times.sort_by(|a, b| a.partial_cmp(b).unwrap());
    focus_touch_times.sort_by(|a, b| a.partial_cmp(b).unwrap());

    let focus_touched_in = |t_lo: f64, t_hi: f64| -> bool {
        let i = bisect_left(&focus_touch_times, t_lo);
        i < focus_touch_times.len() && focus_touch_times[i] <= t_hi + 1e-6
    };

    let ball_is_loose = |t: f64| -> bool {
        let lo = t - LOOSE_LOOKBACK_S;
        let idx = bisect_left(&all_touch_times, lo);
        if idx < all_touch_times.len() && all_touch_times[idx] <= t + 1e-6 {
            return false;
        }
        let Some(bv) = replay.ball_velocity(t) else {
            return false;
        };
        let speed = (bv.0 * bv.0 + bv.1 * bv.1 + bv.2 * bv.2).sqrt();
        speed >= LOOSE_BALL_MIN_SPEED
    };

    let grid = build_time_grid(replay, 0.25);
    let mut out = Vec::new();
    let mut last_emit = -1e9f64;
    for &t in &grid {
        if t - last_emit < DEBOUNCE_S {
            continue;
        }
        if in_kickoff_skip(t) {
            continue;
        }
        if player.is_demoed_at(t) {
            continue;
        }
        if player.in_post_demo_grace(t) {
            continue;
        }
        let (Some(bp), Some(pp)) = (replay.ball_pos_at(t), player.pos_at(t)) else {
            continue;
        };
        let d_self = dist2d(pp, bp);
        if d_self > threat_dist {
            continue;
        }
        if player.boost_at(t) < min_boost {
            continue;
        }
        if pp.2 > GROUND_READY_Z {
            match player.velocity(t) {
                None => continue,
                Some(pv_t) if pv_t.2 < 0.0 => continue,
                _ => {}
            }
        }
        if !ball_is_loose(t) {
            continue;
        }
        let focus_eta = eta_to_ball_2d(player, bp, t);
        let Some(focus_eta) = focus_eta else { continue };
        if focus_eta > max_focus_eta {
            continue;
        }
        let tm_etas: Vec<f64> = teammates
            .iter()
            .filter_map(|&tm| eta_to_ball_2d(&players[tm], bp, t))
            .collect();
        if !tm_etas.is_empty()
            && tm_etas.iter().copied().fold(f64::INFINITY, f64::min) <= focus_eta + TM_CLEAR_LEAD_S
        {
            continue;
        }
        let opp_etas: Vec<f64> = opponents
            .iter()
            .filter_map(|&op| eta_to_ball_2d(&players[op], bp, t))
            .collect();
        if opp_etas.is_empty() {
            continue;
        }
        let min_opp_eta = opp_etas.iter().copied().fold(f64::INFINITY, f64::min);
        if min_opp_eta > MAX_OPP_ETA {
            continue;
        }
        let eta_gap = min_opp_eta - focus_eta; // positive => focus is ahead
        let is_clean_beat = eta_gap > beat_gap_s;
        let is_5050 = eta_gap.abs() <= tie_window_s;
        if !(is_clean_beat || is_5050) {
            continue;
        }

        // A focus touch anywhere in the lookahead proves a contest.
        if focus_touched_in(t, t + LOOKAHEAD_S + 0.5) {
            continue;
        }

        let next = find_next_ball_toucher(replay, t + 0.05, LOOKAHEAD_S);
        // Focus team got the ball — no hesitation, no mistake.
        if let Some((_, next_idx)) = next {
            if players[next_idx].team == team {
                continue;
            }
        } else {
            continue;
        }

        let (Some(bp_la), Some(pp_la)) = (
            replay.ball_pos_at(t + LOOKAHEAD_S),
            player.pos_at(t + LOOKAHEAD_S),
        ) else {
            continue;
        };
        let d_self_la = dist2d(pp_la, bp_la);
        if d_self_la - d_self < grow_threshold {
            continue;
        }

        if let Some(pv0) = player.velocity(t) {
            let dx0 = bp.0 - pp.0;
            let dy0 = bp.1 - pp.1;
            let d0 = (dx0 * dx0 + dy0 * dy0).sqrt();
            if d0 > 1e-3 {
                let closing0 = pv0.0 * (dx0 / d0) + pv0.1 * (dy0 / d0);
                if closing0 > COMMIT_CLOSING {
                    continue;
                }
            }
        }

        let mut min_reach = d_self;
        let mut tt = t + 0.05;
        while tt <= t + LOOKAHEAD_S + 1e-6 {
            if let (Some(bp_s), Some(pp_s)) = (replay.ball_pos_at(tt), player.pos_at(tt)) {
                let ds = dist2d(pp_s, bp_s);
                if ds < min_reach {
                    min_reach = ds;
                }
            }
            tt += 0.1;
        }
        if min_reach < CHALLENGE_REACH_DIST {
            continue;
        }

        let Some(feats) = features(
            player,
            t,
            bp,
            focus_eta,
            min_opp_eta,
            d_self,
            d_self_la,
            opp_y_sign,
        ) else {
            continue;
        };
        // Severity scales with the eta advantage on clean beats; 50/50s sit
        // mid-range.
        let severity = if is_clean_beat {
            f64::max(0.5, f64::min(1.0, 0.5 + eta_gap / 2.0))
        } else {
            0.5
        };
        out.push(Candidate::new(
            KIND,
            round_py(t, 2),
            round_py(f64::max(0.0, t - 0.5), 2),
            round_py(t + LOOKAHEAD_S, 2),
            player_idx,
            &player.name,
            severity,
            feats,
        ));
        last_emit = t;
    }
    out
}

#[allow(clippy::too_many_arguments)]
pub(crate) fn features(
    player: &PlayerView,
    t: f64,
    bp: Vec3,
    focus_eta: f64,
    min_opp_eta: f64,
    d_self: f64,
    d_self_la: f64,
    opp_y_sign: f64,
) -> Option<Vec<f64>> {
    let pp = player.pos_at(t)?;
    let pv = player.velocity(t)?;
    let dx = bp.0 - pp.0;
    let dy = bp.1 - pp.1;
    let d = (dx * dx + dy * dy).sqrt();
    let mut closing = 0.0;
    if d > 1e-3 {
        closing = pv.0 * (dx / d) + pv.1 * (dy / d);
    }

    let eta_gap = min_opp_eta - focus_eta;
    let own_boost = player.boost_at(t) / 100.0;
    let ball_y_norm = ((bp.1 / FIELD_HALF_Y) * opp_y_sign).clamp(-1.0, 1.0);
    let ball_h_norm = (bp.2 / CEILING_Z).clamp(0.0, 1.0);
    let dist_growth = ((d_self_la - d_self) / 3000.0).clamp(-1.0, 1.0);
    let closing_norm = (closing / 2300.0).clamp(-1.0, 1.0);

    Some(vec![
        (d_self / 6000.0).clamp(0.0, 1.0),
        (focus_eta / 3.0).clamp(0.0, 1.0),
        (min_opp_eta / 3.0).clamp(0.0, 1.0),
        (eta_gap / 1.5).clamp(-1.0, 1.0),
        closing_norm,
        own_boost.clamp(0.0, 1.0),
        dist_growth,
        ball_y_norm,
        ball_h_norm,
    ])
}
