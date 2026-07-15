//! Ball-touch detection and ETA estimation
//! (mirrors `_find_player_ball_touches` / `_find_next_ball_toucher` /
//! `_eta_to_ball_2d` / `_team_etas_to_ball`).

use crate::grid::build_time_grid;
use crate::view::{dist, PlayerView, ReplayView, Vec3};

/// A focus-player ball touch: (touch_time, post_speed, post_velocity).
pub type Touch = (f64, f64, Vec3);

/// `_find_player_ball_touches` with default contact_radius=250, dv=500.
pub fn find_player_ball_touches(replay: &ReplayView, player_idx: usize) -> Vec<Touch> {
    find_player_ball_touches_with(replay, player_idx, 250.0, 500.0)
}

pub fn find_player_ball_touches_with(
    replay: &ReplayView,
    player_idx: usize,
    contact_radius: f64,
    dv_threshold: f64,
) -> Vec<Touch> {
    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let grid = build_time_grid(replay, 0.1);

    let mut touches = Vec::new();
    let mut last_t = -10.0f64;
    const MIN_GAP: f64 = 0.3; // avoid double-counting the same hit
    for &t in &grid {
        if t - last_t < MIN_GAP {
            continue;
        }
        let (Some(pp), Some(bp)) = (player.pos_at(t), replay.ball_pos_at(t)) else {
            continue;
        };
        let d_self = dist(pp, bp);
        if d_self > contact_radius {
            continue;
        }
        // Velocity samples bracketing the touch frame.
        let (Some(v_before), Some(v_after)) = (
            replay.ball_velocity_dt(t - 0.1, 0.2),
            replay.ball_velocity_dt(t + 0.3, 0.2),
        ) else {
            continue;
        };
        let dvx = v_after.0 - v_before.0;
        let dvy = v_after.1 - v_before.1;
        let dvz = v_after.2 - v_before.2;
        if (dvx * dvx + dvy * dvy + dvz * dvz).sqrt() < dv_threshold {
            continue;
        }
        // Focus player must be closest car to the ball at this frame.
        let mut closest = true;
        for (j, p) in players.iter().enumerate() {
            if j == player_idx {
                continue;
            }
            let Some(op_p) = p.pos_at(t) else { continue };
            if dist(op_p, bp) < d_self {
                closest = false;
                break;
            }
        }
        if !closest {
            continue;
        }
        let v_after_mag = (v_after.0.powi(2) + v_after.1.powi(2) + v_after.2.powi(2)).sqrt();
        touches.push((t, v_after_mag, v_after));
        last_t = t;
    }
    touches
}

/// `_find_next_ball_toucher`: the next car to touch the ball after `t_after`.
/// Returns `(touch_time, player_idx)` or `None`.
pub fn find_next_ball_toucher(
    replay: &ReplayView,
    t_after: f64,
    lookahead: f64,
) -> Option<(f64, usize)> {
    find_next_ball_toucher_with(replay, t_after, lookahead, 250.0, 500.0)
}

pub fn find_next_ball_toucher_with(
    replay: &ReplayView,
    t_after: f64,
    lookahead: f64,
    contact_radius: f64,
    dv_threshold: f64,
) -> Option<(f64, usize)> {
    let players = &replay.players;
    let end_t = t_after + lookahead;
    let mut t = t_after;
    let dt = 0.1;
    while t <= end_t {
        let Some(bp) = replay.ball_pos_at(t) else {
            t += dt;
            continue;
        };
        let mut candidate: Option<usize> = None;
        let mut cand_d = contact_radius;
        for (i, p) in players.iter().enumerate() {
            let Some(pp) = p.pos_at(t) else { continue };
            let d = dist(pp, bp);
            if d < cand_d {
                cand_d = d;
                candidate = Some(i);
            }
        }
        let Some(candidate) = candidate else {
            t += dt;
            continue;
        };
        let (Some(v_before), Some(v_after)) = (
            replay.ball_velocity_dt(t - 0.1, 0.2),
            replay.ball_velocity_dt(t + 0.3, 0.2),
        ) else {
            t += dt;
            continue;
        };
        let dvx = v_after.0 - v_before.0;
        let dvy = v_after.1 - v_before.1;
        let dvz = v_after.2 - v_before.2;
        if (dvx * dvx + dvy * dvy + dvz * dvz).sqrt() >= dv_threshold {
            return Some((t, candidate));
        }
        t += dt;
    }
    None
}

/// `_eta_to_ball_2d`: estimated seconds until the player would arrive at the
/// ball from current 2D position/velocity.
pub fn eta_to_ball_2d(player: &PlayerView, ball_pos: Vec3, t: f64) -> Option<f64> {
    let pp = player.pos_at(t)?;
    let pv = player.velocity(t)?;
    let dx = ball_pos.0 - pp.0;
    let dy = ball_pos.1 - pp.1;
    let d = (dx * dx + dy * dy).sqrt();
    if d < 1e-3 {
        return Some(0.0);
    }
    let ux = dx / d;
    let uy = dy / d;
    let closing = pv.0 * ux + pv.1 * uy;
    if closing > 800.0 {
        return Some(d / closing);
    }
    // Below the commit-speed floor assume the player can ramp to ~1500 uu/s; a
    // negative closing speed (moving away) adds a turnaround penalty.
    let turnaround_penalty = f64::max(0.0, -closing) / 2000.0;
    Some(d / 1500.0 + turnaround_penalty)
}

/// `_team_etas_to_ball`.
pub fn team_etas_to_ball(
    replay: &ReplayView,
    player_indexes: &[usize],
    ball_pos: Vec3,
    t: f64,
) -> Vec<f64> {
    player_indexes
        .iter()
        .filter_map(|&i| eta_to_ball_2d(&replay.players[i], ball_pos, t))
        .collect()
}

#[cfg(test)]
#[path = "touches_tests.rs"]
mod tests;
