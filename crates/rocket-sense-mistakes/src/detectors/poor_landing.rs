//! Detector: poor_landing (mirrors `_was_bumped_in_window` /
//! `_detect_poor_landing` / `_features_poor_landing`).

use crate::candidate::Candidate;
use crate::kinds::POOR_LANDING;
use crate::profile::DetectorProfile;
use crate::view::{car_world_up_z, dist, dist2d, round_py, ReplayView, CEILING_Z, FIELD_HALF_Y};
use serde_json::{Map, Value};

/// `_was_bumped_in_window`: true if any opponent's car came within `radius`
/// (3D) of the focus player between t_start and t_end.
fn was_bumped_in_window(
    replay: &ReplayView,
    player_idx: usize,
    opponents: &[usize],
    t_start: f64,
    t_end: f64,
) -> bool {
    const SAMPLE_DT: f64 = 0.1;
    const RADIUS: f64 = 200.0;
    if t_end <= t_start {
        return false;
    }
    let player = &replay.players[player_idx];
    let mut t = t_start;
    while t <= t_end + 1e-6 {
        if let Some(pp) = player.pos_at(t) {
            for &opp in opponents {
                let Some(op) = replay.players[opp].pos_at(t) else {
                    continue;
                };
                if dist(pp, op) <= RADIUS {
                    return true;
                }
            }
        }
        t += SAMPLE_DT;
    }
    false
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum WallZone {
    XPos,
    XNeg,
    YPos,
    YNeg,
}

impl WallZone {
    fn suffix(self) -> &'static str {
        match self {
            WallZone::XPos => "x_pos",
            WallZone::XNeg => "x_neg",
            WallZone::YPos => "y_pos",
            WallZone::YNeg => "y_neg",
        }
    }
}

pub fn detect(
    replay: &ReplayView,
    player_idx: usize,
    _profile: &DetectorProfile,
) -> Vec<Candidate> {
    const KIND: &str = POOR_LANDING;
    const AIR_HEIGHT: f64 = 250.0;
    const LAND_HEIGHT: f64 = 80.0;
    const MIN_AIR_TIME: f64 = 0.5;
    const DOWNWARD_VZ: f64 = -50.0;
    const UPRIGHT_MIN: f64 = 0.55;
    const WALL_X_CONTACT: f64 = 4000.0;
    const WALL_Y_CONTACT: f64 = 5050.0;
    const WALL_LANDING_MIN_Z: f64 = 250.0;
    const SETTLE_S: f64 = 1.0; // ground only
    const DEBOUNCE_S: f64 = 3.0;
    const AFTER_S: f64 = 1.2;
    const BEFORE_S: f64 = 1.0;
    // Lead time before air_enter_t to look for the bump that launched the player.
    const BUMP_LEAD_S: f64 = 0.3;

    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let own_goal_y = player.team.own_goal_y();
    let opponents = replay.opponent_indexes(player_idx);

    let wall_zone = |x: f64, y: f64, z: f64| -> Option<WallZone> {
        if z < WALL_LANDING_MIN_Z {
            return None;
        }
        if x >= WALL_X_CONTACT {
            return Some(WallZone::XPos);
        }
        if x <= -WALL_X_CONTACT {
            return Some(WallZone::XNeg);
        }
        if y >= WALL_Y_CONTACT {
            return Some(WallZone::YPos);
        }
        if y <= -WALL_Y_CONTACT {
            return Some(WallZone::YNeg);
        }
        None
    };

    let mut out: Vec<Candidate> = Vec::new();
    let mut last_emit = -1e9f64;

    for car in &player.cars {
        let times = &car.times;
        let pos = &car.pos;
        let quat = &car.quat;
        let n = times.len().min(pos.len() / 3).min(quat.len() / 4);
        if n < 4 {
            continue;
        }

        let mut airborne = false;
        let mut air_enter_t = 0.0f64;
        let mut peak_z = 0.0f64;
        let mut prev_x = pos[0];
        let mut prev_y = pos[1];
        let mut prev_z = pos[2];

        for i in 0..n {
            let t = times[i];
            let x = pos[i * 3];
            let y = pos[i * 3 + 1];
            let z = pos[i * 3 + 2];
            let in_wall = wall_zone(x, y, z);

            if !airborne {
                // Become airborne only when clearly in the air *and* away
                // from any wall surface.
                if z >= AIR_HEIGHT && in_wall.is_none() {
                    airborne = true;
                    air_enter_t = t;
                    peak_z = z;
                }
                prev_x = x;
                prev_y = y;
                prev_z = z;
                continue;
            }

            if z > peak_z {
                peak_z = z;
            }

            let air_dur = t - air_enter_t;

            // Ground landing — back at LAND_HEIGHT or below, descending.
            if z <= LAND_HEIGHT {
                let t_prev = if i > 0 { times[i - 1] } else { t };
                let dt_s = t - t_prev;
                let vz = if dt_s > 1e-3 {
                    (z - prev_z) / dt_s
                } else {
                    0.0
                };
                if air_dur >= MIN_AIR_TIME && vz <= DOWNWARD_VZ && t - last_emit >= DEBOUNCE_S {
                    let settle_t = t + SETTLE_S;
                    if times[n - 1] >= settle_t {
                        let mut min_uz = f64::INFINITY;
                        let mut max_uz = f64::NEG_INFINITY;
                        for k in i..n {
                            if times[k] > settle_t {
                                break;
                            }
                            let uzk = car_world_up_z(quat, k);
                            if uzk < min_uz {
                                min_uz = uzk;
                            }
                            if uzk > max_uz {
                                max_uz = uzk;
                            }
                        }
                        let in_net = y.abs() > FIELD_HALF_Y;
                        if max_uz < UPRIGHT_MIN
                            && !in_net
                            && !was_bumped_in_window(
                                replay,
                                player_idx,
                                &opponents,
                                air_enter_t - BUMP_LEAD_S,
                                t,
                            )
                        {
                            if let Some(feats) = features(
                                replay, player_idx, own_goal_y, t, peak_z, air_dur, min_uz, vz,
                            ) {
                                // uz=UPRIGHT_MIN → 0.45, uz=0 → 1.0.
                                let severity =
                                    f64::max(0.45, f64::min(1.0, 1.0 - f64::max(min_uz, 0.0)));
                                let mut evidence = Map::new();
                                evidence.insert("surface".to_owned(), Value::from("ground"));
                                let mut cand = Candidate::new(
                                    KIND,
                                    round_py(t, 2),
                                    round_py(t - BEFORE_S, 2),
                                    round_py(t + AFTER_S, 2),
                                    player_idx,
                                    &player.name,
                                    severity,
                                    feats,
                                );
                                cand.evidence = Some(evidence);
                                out.push(cand);
                                last_emit = t;
                            }
                        }
                    }
                }
                airborne = false;
                peak_z = 0.0;
                prev_x = x;
                prev_y = y;
                prev_z = z;
                continue;
            }

            // Wall landing — first frame inside a wall-contact zone.
            if let Some(in_wall) = in_wall {
                if air_dur >= MIN_AIR_TIME && t - last_emit >= DEBOUNCE_S {
                    // Local +Z axis (wheels) in world coords.
                    let j = i * 4;
                    let qx = quat[j];
                    let qy = quat[j + 1];
                    let qz = quat[j + 2];
                    let qw = quat[j + 3];
                    let ux = 2.0 * (qx * qz + qy * qw);
                    let uy = 2.0 * (qy * qz - qx * qw);
                    // Alignment with the wall's inward normal.
                    let aligned = match in_wall {
                        WallZone::XPos => -ux,
                        WallZone::XNeg => ux,
                        WallZone::YPos => -uy,
                        WallZone::YNeg => uy,
                    };
                    let t_prev = if i > 0 { times[i - 1] } else { t };
                    let dt_s = t - t_prev;
                    let approach = if dt_s > 1e-3 {
                        match in_wall {
                            WallZone::XPos => (x - prev_x) / dt_s,
                            WallZone::XNeg => (prev_x - x) / dt_s,
                            WallZone::YPos => (y - prev_y) / dt_s,
                            WallZone::YNeg => (prev_y - y) / dt_s,
                        }
                    } else {
                        0.0
                    };
                    let in_net = y.abs() > FIELD_HALF_Y;
                    if aligned < UPRIGHT_MIN
                        && !in_net
                        && !was_bumped_in_window(
                            replay,
                            player_idx,
                            &opponents,
                            air_enter_t - BUMP_LEAD_S,
                            t,
                        )
                    {
                        // Match the ground branch's sign convention: pass a
                        // negative value so the feature builder's `-v / 2300`
                        // yields the positive approach magnitude.
                        if let Some(feats) = features(
                            replay, player_idx, own_goal_y, t, peak_z, air_dur, aligned, -approach,
                        ) {
                            let severity =
                                f64::max(0.45, f64::min(1.0, 1.0 - f64::max(aligned, 0.0)));
                            let mut evidence = Map::new();
                            evidence.insert(
                                "surface".to_owned(),
                                Value::from(format!("wall_{}", in_wall.suffix())),
                            );
                            let mut cand = Candidate::new(
                                KIND,
                                round_py(t, 2),
                                round_py(t - BEFORE_S, 2),
                                round_py(t + AFTER_S, 2),
                                player_idx,
                                &player.name,
                                severity,
                                feats,
                            );
                            cand.evidence = Some(evidence);
                            out.push(cand);
                            last_emit = t;
                        }
                    }
                }
                airborne = false;
                peak_z = 0.0;
                prev_x = x;
                prev_y = y;
                prev_z = z;
                continue;
            }

            prev_x = x;
            prev_y = y;
            prev_z = z;
        }
    }

    out
}

#[allow(clippy::too_many_arguments)]
pub(crate) fn features(
    replay: &ReplayView,
    player_idx: usize,
    own_goal_y: f64,
    t_land: f64,
    peak_z: f64,
    air_dur: f64,
    uz: f64,
    vz: f64,
) -> Option<Vec<f64>> {
    let players = &replay.players;
    let player = &players[player_idx];
    let teammates = replay.teammate_indexes(player_idx);
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let bp = replay.ball_pos_at(t_land);
    let pp = player.pos_at(t_land)?;

    let dist_to_ball = bp.map(|bp| dist2d(pp, bp)).unwrap_or(6000.0);
    let ball_height = bp.map(|bp| bp.2).unwrap_or(0.0);
    let boost = player.boost_at(t_land);
    let focus_depth = (pp.1 - own_goal_y) * own_dir_sign;

    let mut tm_min_dist = f64::INFINITY;
    if let Some(bp) = bp {
        for &tm in &teammates {
            let Some(tm_pos) = players[tm].pos_at(t_land) else {
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
        (air_dur / 4.0).clamp(0.0, 1.0),
        uz.clamp(-1.0, 1.0),
        ((-vz) / 2300.0).clamp(0.0, 1.0),
        (dist_to_ball / 6000.0).clamp(0.0, 1.0),
        (ball_height / CEILING_Z).clamp(0.0, 1.0),
        (boost / 100.0).clamp(0.0, 1.0),
        (focus_depth / field_depth).clamp(0.0, 1.0),
        (tm_min_dist / 6000.0).clamp(0.0, 1.0),
    ])
}
