//! Detector: floating_with_boost (mirrors `_detect_floating_with_boost` /
//! `_features_floating_with_boost`).

use crate::candidate::Candidate;
use crate::kinds::FLOATING_WITH_BOOST;
use crate::profile::DetectorProfile;
use crate::view::{dist2d, round_py, ReplayView, CEILING_Z, FIELD_HALF_Y};

pub fn detect(
    replay: &ReplayView,
    player_idx: usize,
    _profile: &DetectorProfile,
) -> Vec<Candidate> {
    const KIND: &str = FLOATING_WITH_BOOST;
    const AIR_HEIGHT: f64 = 250.0;
    const LAND_HEIGHT: f64 = 80.0;
    const MIN_FLOAT_TIME: f64 = 1.8;
    const MAX_PEAK_Z: f64 = 1400.0;
    const MIN_BOOST_AT_START: f64 = 25.0;
    const MAX_BOOST_BURN: f64 = 12.0;
    const MIN_BALL_DIST: f64 = 1000.0;
    // Surface-contact thresholds: a player on a wall/ceiling is not floating.
    const WALL_X_NEAR: f64 = 4000.0;
    const WALL_Y_NEAR: f64 = 5020.0;
    const CEILING_Z_NEAR: f64 = 1950.0;
    const DEBOUNCE_S: f64 = 3.5;
    const BEFORE_S: f64 = 0.4;
    const AFTER_S: f64 = 0.4;

    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let own_goal_y = player.team.own_goal_y();

    let is_on_surface = |px: f64, py: f64, z: f64| -> bool {
        px.abs() >= WALL_X_NEAR || py.abs() >= WALL_Y_NEAR || z >= CEILING_Z_NEAR
    };

    let mut out: Vec<Candidate> = Vec::new();
    let mut last_emit = -1e9f64;

    for car in &player.cars {
        let times = &car.times;
        let pos = &car.pos;
        let n = times.len().min(pos.len() / 3);
        if n < 4 {
            continue;
        }

        let mut airborne = false;
        let mut air_enter_t = 0.0f64;
        let mut peak_z = 0.0f64;
        let mut boost_at_start = 0.0f64;
        let mut min_boost = 100.0f64;
        let mut min_ball_dist = f64::INFINITY;
        let mut on_surface = false;

        for i in 0..n {
            let t = times[i];
            let px = pos[i * 3];
            let py = pos[i * 3 + 1];
            let z = pos[i * 3 + 2];

            if !airborne {
                if z >= AIR_HEIGHT {
                    airborne = true;
                    air_enter_t = t;
                    peak_z = z;
                    boost_at_start = player.boost_at(t);
                    min_boost = boost_at_start;
                    on_surface = is_on_surface(px, py, z);
                    min_ball_dist = match replay.ball_pos_at(t) {
                        Some(bp) => ((bp.0 - px).powi(2) + (bp.1 - py).powi(2)).sqrt(),
                        None => 6000.0,
                    };
                }
                continue;
            }

            if z > peak_z {
                peak_z = z;
            }
            let b = player.boost_at(t);
            if b < min_boost {
                min_boost = b;
            }
            if !on_surface && is_on_surface(px, py, z) {
                on_surface = true;
            }
            if let Some(bp) = replay.ball_pos_at(t) {
                let d = ((bp.0 - px).powi(2) + (bp.1 - py).powi(2)).sqrt();
                if d < min_ball_dist {
                    min_ball_dist = d;
                }
            }

            if z <= LAND_HEIGHT {
                let land_t = t;
                let air_dur = land_t - air_enter_t;
                let boost_at_end = player.boost_at(land_t);
                let boost_burn = f64::max(0.0, boost_at_start - boost_at_end);

                let qualifies = air_dur >= MIN_FLOAT_TIME
                    && peak_z <= MAX_PEAK_Z
                    && boost_at_start >= MIN_BOOST_AT_START
                    && boost_burn <= MAX_BOOST_BURN
                    && min_ball_dist >= MIN_BALL_DIST
                    && !on_surface
                    && !player.is_demoed_at(air_enter_t)
                    && !player.in_post_demo_grace(air_enter_t);
                if qualifies && (land_t - last_emit) >= DEBOUNCE_S {
                    let mid_t = air_enter_t + air_dur / 2.0;
                    if let Some(feats) = features(
                        replay,
                        player_idx,
                        own_goal_y,
                        mid_t,
                        peak_z,
                        air_dur,
                        boost_at_start,
                        min_boost,
                        boost_burn,
                        min_ball_dist,
                    ) {
                        // Severity grows with float time and unspent boost.
                        let mut sev = 0.45 + 0.35 * f64::min(1.0, (air_dur - MIN_FLOAT_TIME) / 2.5);
                        sev += 0.20 * f64::min(1.0, (min_boost - MIN_BOOST_AT_START) / 60.0);
                        let sev = sev.clamp(0.45, 1.0);
                        out.push(Candidate::new(
                            KIND,
                            round_py(mid_t, 2),
                            round_py(air_enter_t - BEFORE_S, 2),
                            round_py(land_t + AFTER_S, 2),
                            player_idx,
                            &player.name,
                            sev,
                            feats,
                        ));
                        last_emit = land_t;
                    }
                }

                airborne = false;
                peak_z = 0.0;
                min_boost = 100.0;
                min_ball_dist = f64::INFINITY;
                on_surface = false;
            }
        }
    }

    out
}

#[allow(clippy::too_many_arguments)]
pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    own_goal_y: f64,
    mid_t: f64,
    peak_z: f64,
    air_dur: f64,
    boost_at_start: f64,
    min_boost: f64,
    boost_burn: f64,
    min_ball_dist: f64,
) -> Option<Vec<f64>> {
    let players = &replay.players;
    let player = &players[player_idx];
    let teammates = replay.teammate_indexes(player_idx);
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let pp = player.pos_at(mid_t)?;
    let bp = replay.ball_pos_at(mid_t);
    let ball_height = bp.map(|bp| bp.2).unwrap_or(0.0);
    let focus_depth = (pp.1 - own_goal_y) * own_dir_sign;

    let mut tm_min_dist = f64::INFINITY;
    if let Some(bp) = bp {
        for &tm in &teammates {
            let Some(tm_pos) = players[tm].pos_at(mid_t) else {
                continue;
            };
            tm_min_dist = f64::min(tm_min_dist, dist2d(tm_pos, bp));
        }
    }
    if tm_min_dist == f64::INFINITY {
        tm_min_dist = 6000.0;
    }

    let field_depth = 2.0 * FIELD_HALF_Y;
    Some(vec![
        (peak_z / CEILING_Z).clamp(0.0, 1.0),
        (air_dur / 5.0).clamp(0.0, 1.0),
        (boost_at_start / 100.0).clamp(0.0, 1.0),
        (min_boost / 100.0).clamp(0.0, 1.0),
        (boost_burn / 30.0).clamp(0.0, 1.0),
        (min_ball_dist / 6000.0).clamp(0.0, 1.0),
        (focus_depth / field_depth).clamp(0.0, 1.0),
        (ball_height / CEILING_Z).clamp(0.0, 1.0),
        (tm_min_dist / 6000.0).clamp(0.0, 1.0),
    ])
}

#[cfg(test)]
#[path = "floating_tests.rs"]
mod tests;
