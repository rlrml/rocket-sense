//! Detector: bang_with_time (mirrors `_detect_bang_with_time` /
//! `_features_bang_with_time`).

use crate::candidate::Candidate;
use crate::grid::segment_in_play_start;
use crate::kinds::BANG_WITH_TIME;
use crate::profile::DetectorProfile;
use crate::touches::{find_next_ball_toucher, find_player_ball_touches};
use crate::view::{dist2d, round_py, ReplayView, Vec3, CEILING_Z, FIELD_HALF_Y};
use serde_json::{Map, Value};

pub fn detect(replay: &ReplayView, player_idx: usize, profile: &DetectorProfile) -> Vec<Candidate> {
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

    let bang_speed = profile.param(BANG_WITH_TIME, "bang_speed", 2200.0);
    let opp_pressure_radius = profile.param(BANG_WITH_TIME, "opp_pressure_radius", 1700.0);
    let pressure_lookback = profile.param(BANG_WITH_TIME, "pressure_lookback", 1.0);
    let loss_lookahead = profile.param(BANG_WITH_TIME, "loss_lookahead", 2.5);
    // Below this depth from own goal, banging away is correct.
    const OWN_HALF_DEPTH_OK: f64 = 1500.0;
    const SHOT_COS: f64 = 0.65; // post-touch direction-to-opp-goal threshold
                                // Car z above which the contact is an aerial, not a ground bang.
    const GROUND_HEIGHT_MAX: f64 = 500.0;
    // "Awkwardness" of the arriving ball: incoming speed + height norms.
    const INCOMING_SPEED_NORM: f64 = 3000.0;
    const INCOMING_HEIGHT_NORM: f64 = 1500.0;
    let awkward_threshold = profile.param(BANG_WITH_TIME, "awkward_threshold", 1.0);
    let require_opp_next_touch =
        profile.param_bool(BANG_WITH_TIME, "require_opponent_next_touch", true);

    const KICKOFF_GRACE: f64 = 5.0;
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

    let touches = find_player_ball_touches(replay, player_idx);
    let mut out = Vec::new();

    for (touch_t, post_speed, post_vel) in touches {
        if post_speed < bang_speed {
            continue;
        }
        if in_kickoff_grace(touch_t) {
            continue;
        }
        if player.in_post_demo_grace(touch_t) {
            continue;
        }
        let (Some(bp), Some(pp)) = (replay.ball_pos_at(touch_t), player.pos_at(touch_t)) else {
            continue;
        };
        if pp.2 > GROUND_HEIGHT_MAX {
            continue;
        }
        let ball_depth = (bp.1 - own_goal_y) * own_dir_sign;
        if ball_depth < OWN_HALF_DEPTH_OK {
            continue;
        }
        // Had-time check: scan back pressure_lookback seconds, demanding no
        // opp within opp_pressure_radius of either the ball or the player.
        let mut had_time = true;
        let mut opp_min_at_touch = f64::INFINITY;
        let mut t_check = touch_t - pressure_lookback;
        while t_check <= touch_t + 1e-6 {
            let bp_c = replay.ball_pos_at(t_check);
            let pp_c = player.pos_at(t_check);
            if let (Some(bp_c), Some(pp_c)) = (bp_c, pp_c) {
                for &op in &opponents {
                    let Some(op_p) = players[op].pos_at(t_check) else {
                        continue;
                    };
                    let d_b = dist2d(op_p, bp_c);
                    let d_p = dist2d(op_p, pp_c);
                    if f64::min(d_b, d_p) < opp_pressure_radius {
                        had_time = false;
                        break;
                    }
                    if (t_check - touch_t).abs() < 0.05 {
                        opp_min_at_touch = f64::min(opp_min_at_touch, d_b);
                    }
                }
            }
            if !had_time {
                break;
            }
            t_check += 0.2;
        }
        if !had_time {
            continue;
        }
        if opp_min_at_touch == f64::INFINITY {
            for &op in &opponents {
                let Some(op_p) = players[op].pos_at(touch_t) else {
                    continue;
                };
                opp_min_at_touch = f64::min(opp_min_at_touch, dist2d(op_p, bp));
            }
        }
        // Direction check: a real shot heads firmly toward the opp goal AND
        // ends up past midfield — purposeful, skip.
        let v_horiz = (post_vel.0.powi(2) + post_vel.1.powi(2)).sqrt();
        let toward_opp = if v_horiz > 50.0 {
            (opp_y_sign * post_vel.1) / f64::max(1e-3, v_horiz)
        } else {
            0.0
        };
        if toward_opp >= SHOT_COS {
            if let Some(bp_la) = replay.ball_pos_at(touch_t + 1.5) {
                if (opp_y_sign * bp_la.1) > 1500.0 {
                    continue;
                }
            }
        }
        // Possession check: free gift to opponent vs awkward challenge ball.
        let next = find_next_ball_toucher(replay, touch_t + 0.3, loss_lookahead);
        // Focus team recovers — not a mistake.
        if let Some((_, next_idx)) = next {
            if players[next_idx].team == team {
                continue;
            }
        }
        let outcome_confirmed = next.is_some();
        let (next_t, next_p): (Option<f64>, Option<usize>) = if !outcome_confirmed {
            if require_opp_next_touch {
                continue;
            }
            (Some(touch_t + loss_lookahead), None)
        } else {
            let (nt, np) = next.unwrap();
            // Opp is the next toucher. Score how awkward the incoming ball is.
            let v_in = replay.ball_velocity_dt(nt - 0.05, 0.15);
            let bp_at_next = replay.ball_pos_at(nt);
            let (Some(v_in), Some(bp_at_next)) = (v_in, bp_at_next) else {
                continue;
            };
            let incoming_speed = (v_in.0.powi(2) + v_in.1.powi(2) + v_in.2.powi(2)).sqrt();
            let awkwardness =
                incoming_speed / INCOMING_SPEED_NORM + bp_at_next.2 / INCOMING_HEIGHT_NORM;
            if awkwardness >= awkward_threshold {
                continue;
            }
            (Some(nt), Some(np))
        };
        let opp_min_for_features = if next_p.is_none() {
            8000.0
        } else {
            opp_min_at_touch
        };
        if next_t.is_none() {
            continue;
        }
        let Some(feats) = features(
            replay,
            player_idx,
            own_goal_y,
            touch_t,
            post_speed,
            post_vel,
            opp_min_for_features,
            next_p,
        ) else {
            continue;
        };
        let severity = ((post_speed - bang_speed) / 4000.0).clamp(0.0, 1.0);
        let mut evidence = Map::new();
        evidence.insert(
            "outcome_confirmed".to_owned(),
            Value::Bool(outcome_confirmed),
        );
        let mut cand = Candidate::new(
            BANG_WITH_TIME,
            round_py(touch_t, 2),
            round_py(f64::max(0.0, touch_t - 0.5), 2),
            round_py(touch_t + 0.5, 2),
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

#[allow(clippy::too_many_arguments)]
pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    own_goal_y: f64,
    touch_t: f64,
    post_speed: f64,
    post_vel: Vec3,
    opp_min_at_touch: f64,
    next_p: Option<usize>,
) -> Option<Vec<f64>> {
    let players = &replay.players;
    let player = &players[player_idx];
    let team = player.team;
    let bp = replay.ball_pos_at(touch_t)?;
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let opp_y_sign = -own_dir_sign;

    let v_horiz = (post_vel.0.powi(2) + post_vel.1.powi(2)).sqrt();
    let toward_opp = if v_horiz > 50.0 {
        (opp_y_sign * post_vel.1) / f64::max(1e-3, v_horiz)
    } else {
        0.0
    };
    let toward_opp = toward_opp.clamp(-1.0, 1.0);

    let ball_y_norm = ((bp.1 / FIELD_HALF_Y) * opp_y_sign).clamp(-1.0, 1.0);
    let ball_h_norm = (bp.2 / CEILING_Z).clamp(0.0, 1.0);
    let own_boost = player.boost_at(touch_t) / 100.0;

    let mut next_opp = 0.0;
    if let Some(np) = next_p {
        if players[np].team != team {
            next_opp = 1.0;
        }
    }

    let opp_min = if opp_min_at_touch == f64::INFINITY {
        8000.0
    } else {
        opp_min_at_touch
    };
    let opp_min_norm = f64::min(1.0, opp_min / 5000.0);

    let teammates = replay.teammate_indexes(player_idx);
    let mut tm_min = f64::INFINITY;
    for &tm in &teammates {
        let Some(mp) = players[tm].pos_at(touch_t) else {
            continue;
        };
        let d = dist2d(mp, bp);
        if d < tm_min {
            tm_min = d;
        }
    }
    if tm_min == f64::INFINITY {
        tm_min = 8000.0;
    }
    let tm_min_norm = f64::min(1.0, tm_min / 5000.0);

    let vert_speed_norm = f64::min(1.0, post_vel.2.abs() / 3000.0);

    Some(vec![
        f64::min(1.0, post_speed / 6000.0),
        opp_min_norm,
        tm_min_norm,
        ball_y_norm,
        ball_h_norm,
        own_boost,
        toward_opp,
        next_opp,
        vert_speed_norm,
    ])
}
