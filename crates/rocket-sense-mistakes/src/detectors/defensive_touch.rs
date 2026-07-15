//! Detector: bad_defensive_touch (mirrors `_danger_cone_half_width` /
//! `_bad_defensive_touch_params` / `_bad_defensive_touch_features` /
//! `_detect_bad_defensive_touch`).

use crate::candidate::Candidate;
use crate::kinds::BAD_DEFENSIVE_TOUCH;
use crate::profile::DetectorProfile;
use crate::touches::{find_next_ball_toucher, find_player_ball_touches, team_etas_to_ball};
use crate::view::{dist2d, round_py, ReplayView, Vec3};
use serde_json::{Map, Value};

#[derive(Debug, Clone, Copy)]
pub(crate) struct BadDefensiveTouchParams {
    pub touch_depth_from_goal: f64,
    pub pre_touch_goal_vel: f64,
    pub lookahead_s: f64,
    pub danger_goal_depth: f64,
    pub danger_cone_half_width_at_goal: f64,
    pub danger_cone_half_width_at_depth: f64,
    pub danger_max_height: f64,
    pub safe_corner_x: f64,
    pub safe_corner_depth: f64,
    pub wide_clear_escape_norm: f64,
    pub away_velocity_min: f64,
    pub opp_eta_margin_s: f64,
    pub goal_branch_opp_eta_adv_min: f64,
    pub instant_goal_s: f64,
}

pub(crate) fn params_from_profile(profile: &DetectorProfile) -> BadDefensiveTouchParams {
    const K: &str = BAD_DEFENSIVE_TOUCH;
    BadDefensiveTouchParams {
        touch_depth_from_goal: profile.param(K, "touch_depth_from_goal", 2400.0),
        pre_touch_goal_vel: profile.param(K, "pre_touch_goal_vel", 400.0),
        lookahead_s: profile.param(K, "lookahead_s", 2.25),
        danger_goal_depth: profile.param(K, "danger_goal_depth", 1900.0),
        danger_cone_half_width_at_goal: profile.param(K, "danger_cone_half_width_at_goal", 1200.0),
        danger_cone_half_width_at_depth: profile.param(
            K,
            "danger_cone_half_width_at_depth",
            2800.0,
        ),
        danger_max_height: profile.param(K, "danger_max_height", 1000.0),
        safe_corner_x: profile.param(K, "safe_corner_x", 3000.0),
        safe_corner_depth: profile.param(K, "safe_corner_depth", 1800.0),
        wide_clear_escape_norm: profile.param(K, "wide_clear_escape_norm", 0.9),
        away_velocity_min: profile.param(K, "away_velocity_min", 850.0),
        opp_eta_margin_s: profile.param(K, "opp_eta_margin_s", 0.35),
        goal_branch_opp_eta_adv_min: profile.param(K, "goal_branch_opp_eta_adv_min", 0.2),
        instant_goal_s: profile.param(K, "instant_goal_s", 1.5),
    }
}

/// `_danger_cone_half_width` — the profile-provided danger_goal_depth spans
/// the interpolation.
fn danger_cone_half_width(
    depth: f64,
    goal_width: f64,
    depth_width: f64,
    danger_goal_depth: f64,
) -> f64 {
    let span = f64::max(1.0, danger_goal_depth);
    let a = (depth / span).clamp(0.0, 1.0);
    goal_width + (depth_width - goal_width) * a
}

/// `_bad_defensive_touch_features`: returns (features, evidence).
pub(crate) fn features_and_evidence(
    replay: &ReplayView,
    player_idx: usize,
    own_goal_y: f64,
    touch_t: f64,
    post_vel: Vec3,
    params: &BadDefensiveTouchParams,
) -> Option<(Vec<f64>, Map<String, Value>)> {
    let bp_touch = replay.ball_pos_at(touch_t)?;

    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let players = &replay.players;
    let player = &players[player_idx];
    let team = player.team;
    let teammates = replay.teammate_indexes(player_idx);
    let opponents = replay.opponent_indexes(player_idx);
    if opponents.is_empty() {
        return None;
    }

    let mut touch_depth = (bp_touch.1 - own_goal_y) * own_dir_sign;
    if touch_depth < 0.0 {
        touch_depth = 0.0;
    }
    let pre_vel = replay.ball_velocity_dt(touch_t - 0.12, 0.2);
    let pre_toward_goal = pre_vel.map(|v| -v.1 * own_dir_sign).unwrap_or(0.0);
    let post_toward_goal = f64::max(0.0, -post_vel.1 * own_dir_sign);
    let pre_depth_pressure = 1.0
        - f64::min(
            1.0,
            touch_depth / f64::max(1.0, params.touch_depth_from_goal),
        );
    let pre_vel_pressure = (pre_toward_goal / 2500.0).clamp(0.0, 1.0);
    let pre_threat = f64::max(pre_depth_pressure, pre_vel_pressure);

    let lookahead_s = f64::max(0.25, params.lookahead_s);
    let goal_width = f64::max(1.0, params.danger_cone_half_width_at_goal);
    let depth_width = f64::max(goal_width, params.danger_cone_half_width_at_depth);
    let touch_width = danger_cone_half_width(
        touch_depth,
        goal_width,
        depth_width,
        params.danger_goal_depth,
    );
    let touch_cone_margin = (touch_width - bp_touch.0.abs()) / f64::max(1.0, touch_width);
    let mut pre_cone_margin = touch_cone_margin;
    if let Some(bp_pre) = replay.ball_pos_at(touch_t - 0.35) {
        let pre_depth = f64::max(0.0, (bp_pre.1 - own_goal_y) * own_dir_sign);
        let pre_width =
            danger_cone_half_width(pre_depth, goal_width, depth_width, params.danger_goal_depth);
        pre_cone_margin = (pre_width - bp_pre.0.abs()) / f64::max(1.0, pre_width);
    }
    let sample_dt = 0.2;
    let sample_count = (lookahead_s / sample_dt) as usize + 1;

    let mut danger_samples = 0u32;
    let mut total_samples = 0u32;
    let mut best_cone_margin = -1.0f64;
    let mut post_cone_margins: Vec<f64> = Vec::new();
    let mut max_goalward_vel = post_toward_goal;
    let mut max_lateral_escape = bp_touch.0.abs();
    let mut best_opp_eta_adv = -1.0f64;
    let mut instant_goal = 0.0f64;
    let mut min_opp_dist = f64::INFINITY;
    let mut min_tm_dist = f64::INFINITY;
    let mut danger_times: Vec<f64> = Vec::new();

    let team_indexes: Vec<usize> = std::iter::once(player_idx)
        .chain(teammates.iter().copied())
        .collect();

    for idx in 0..sample_count {
        let t = touch_t + idx as f64 * sample_dt;
        if t > touch_t + lookahead_s + 1e-6 {
            break;
        }
        let Some(bp) = replay.ball_pos_at(t) else {
            continue;
        };
        total_samples += 1;
        let depth = (bp.1 - own_goal_y) * own_dir_sign;
        let lateral = bp.0.abs();
        let height = bp.2;
        max_lateral_escape = f64::max(max_lateral_escape, lateral);

        let width =
            danger_cone_half_width(depth, goal_width, depth_width, params.danger_goal_depth);
        let cone_margin = (width - lateral) / f64::max(1.0, width);
        best_cone_margin = f64::max(best_cone_margin, cone_margin);
        post_cone_margins.push(cone_margin);

        let bv = replay.ball_velocity(t);
        let goalward_vel = bv
            .map(|v| f64::max(0.0, -v.1 * own_dir_sign))
            .unwrap_or(0.0);
        let away_vel = bv.map(|v| f64::max(0.0, v.1 * own_dir_sign)).unwrap_or(0.0);
        max_goalward_vel = f64::max(max_goalward_vel, goalward_vel);

        let opp_etas = team_etas_to_ball(replay, &opponents, bp, t);
        let team_etas = team_etas_to_ball(replay, &team_indexes, bp, t);
        let opp_eta = opp_etas.iter().copied().fold(f64::INFINITY, f64::min);
        let team_eta = team_etas.iter().copied().fold(f64::INFINITY, f64::min);
        if opp_eta < f64::INFINITY && team_eta < f64::INFINITY {
            best_opp_eta_adv = f64::max(best_opp_eta_adv, team_eta - opp_eta);
        }

        for &op in &opponents {
            if let Some(op_pos) = players[op].pos_at(t) {
                min_opp_dist = f64::min(min_opp_dist, dist2d(op_pos, bp));
            }
        }
        for &tm in &teammates {
            if let Some(tm_pos) = players[tm].pos_at(t) {
                min_tm_dist = f64::min(min_tm_dist, dist2d(tm_pos, bp));
            }
        }

        let in_corner_escape = lateral >= params.safe_corner_x && depth <= params.safe_corner_depth;
        let in_danger_lane = (0.0..=params.danger_goal_depth).contains(&depth)
            && cone_margin >= 0.0
            && height <= params.danger_max_height
            && !in_corner_escape
            && away_vel < params.away_velocity_min
            && opp_eta <= team_eta + params.opp_eta_margin_s;
        if in_danger_lane {
            danger_samples += 1;
            danger_times.push(t);
        }

        if t - touch_t <= params.instant_goal_s
            && depth <= 0.0
            && lateral <= 950.0
            && height <= 700.0
        {
            instant_goal = 1.0;
        }
    }

    let next = find_next_ball_toucher(replay, touch_t + 0.15, lookahead_s);
    let mut next_toucher_is_opp = 0.0;
    if let Some((_, np)) = next {
        if players[np].team != team {
            next_toucher_is_opp = 1.0;
        }
    }

    let danger_time_norm = if total_samples > 0 {
        f64::min(1.0, (danger_samples as f64 * sample_dt) / lookahead_s)
    } else {
        0.0
    };
    let cone_margin_norm = best_cone_margin.clamp(-1.0, 1.0);
    let post_min_cone_margin_norm = if post_cone_margins.is_empty() {
        0.0f64
    } else {
        post_cone_margins
            .iter()
            .copied()
            .fold(f64::INFINITY, f64::min)
    }
    .clamp(-1.0, 1.0);
    let post_mean_cone_margin_norm = if post_cone_margins.is_empty() {
        0.0
    } else {
        (post_cone_margins.iter().sum::<f64>() / post_cone_margins.len() as f64).clamp(-1.0, 1.0)
    };
    let pre_cone_margin_norm = pre_cone_margin.clamp(-1.0, 1.0);
    let touch_cone_margin_norm = touch_cone_margin.clamp(-1.0, 1.0);
    let touch_cone_delta_norm = (touch_cone_margin_norm - pre_cone_margin_norm).clamp(-1.0, 1.0);
    let post_touch_cone_drop_norm =
        (touch_cone_margin_norm - post_min_cone_margin_norm).clamp(-1.0, 1.0);
    let lateral_escape_norm = (max_lateral_escape / 4096.0).clamp(0.0, 1.0);
    let opp_eta_adv_norm = (best_opp_eta_adv / 2.0).clamp(-1.0, 1.0);
    if min_opp_dist == f64::INFINITY {
        min_opp_dist = 6000.0;
    }
    if min_tm_dist == f64::INFINITY {
        min_tm_dist = 6000.0;
    }

    let mut evidence = Map::new();
    evidence.insert("touch_time".to_owned(), Value::from(round_py(touch_t, 3)));
    evidence.insert(
        "touch_depth".to_owned(),
        Value::from(round_py(touch_depth, 3)),
    );
    evidence.insert(
        "danger_lane_samples".to_owned(),
        Value::from(danger_samples),
    );
    evidence.insert(
        "danger_lane_time_s".to_owned(),
        Value::from(round_py(danger_samples as f64 * sample_dt, 3)),
    );
    evidence.insert(
        "best_cone_margin".to_owned(),
        Value::from(round_py(cone_margin_norm, 3)),
    );
    evidence.insert(
        "pre_touch_cone_margin".to_owned(),
        Value::from(round_py(pre_cone_margin_norm, 3)),
    );
    evidence.insert(
        "touch_cone_margin".to_owned(),
        Value::from(round_py(touch_cone_margin_norm, 3)),
    );
    evidence.insert(
        "post_touch_min_cone_margin".to_owned(),
        Value::from(round_py(post_min_cone_margin_norm, 3)),
    );
    evidence.insert(
        "post_touch_mean_cone_margin".to_owned(),
        Value::from(round_py(post_mean_cone_margin_norm, 3)),
    );
    evidence.insert(
        "next_toucher_is_opp".to_owned(),
        Value::Bool(next_toucher_is_opp != 0.0),
    );
    evidence.insert(
        "instant_goal_proxy".to_owned(),
        Value::Bool(instant_goal != 0.0),
    );
    evidence.insert(
        "min_opp_dist_after_touch".to_owned(),
        Value::from(round_py(min_opp_dist, 3)),
    );
    evidence.insert(
        "min_teammate_dist_after_touch".to_owned(),
        Value::from(round_py(min_tm_dist, 3)),
    );
    if let Some((next_t, _)) = next {
        evidence.insert(
            "next_touch_time".to_owned(),
            Value::from(round_py(next_t, 3)),
        );
    }
    if let Some(&first_danger) = danger_times.first() {
        evidence.insert(
            "first_danger_lane_time".to_owned(),
            Value::from(round_py(first_danger, 3)),
        );
    }

    let features = vec![
        pre_threat.clamp(0.0, 1.0),
        (1.0 - touch_depth / f64::max(1.0, params.touch_depth_from_goal)).clamp(0.0, 1.0),
        danger_time_norm,
        cone_margin_norm,
        (max_goalward_vel / 3000.0).clamp(0.0, 1.0),
        lateral_escape_norm,
        next_toucher_is_opp,
        opp_eta_adv_norm,
        instant_goal,
        pre_cone_margin_norm,
        touch_cone_margin_norm,
        post_min_cone_margin_norm,
        post_mean_cone_margin_norm,
        touch_cone_delta_norm,
        post_touch_cone_drop_norm,
    ];
    Some((features, evidence))
}

pub fn detect(replay: &ReplayView, player_idx: usize, profile: &DetectorProfile) -> Vec<Candidate> {
    let players = &replay.players;
    if player_idx >= players.len() {
        return Vec::new();
    }
    let player = &players[player_idx];
    let own_goal_y = player.team.own_goal_y();
    let own_dir_sign = if own_goal_y < 0.0 { 1.0 } else { -1.0 };
    let params = params_from_profile(profile);

    let mut out = Vec::new();
    let mut last_emit = -1e9f64;
    for (touch_t, _post_speed, post_vel) in find_player_ball_touches(replay, player_idx) {
        if touch_t - last_emit < 1.0 {
            continue;
        }
        if player.is_demoed_at(touch_t) || player.in_post_demo_grace(touch_t) {
            continue;
        }
        let Some(bp) = replay.ball_pos_at(touch_t) else {
            continue;
        };
        let depth = (bp.1 - own_goal_y) * own_dir_sign;
        if depth < 0.0 || depth > params.touch_depth_from_goal {
            continue;
        }
        let pre_vel = replay.ball_velocity_dt(touch_t - 0.12, 0.2);
        let pre_toward_goal = pre_vel.map(|v| -v.1 * own_dir_sign).unwrap_or(0.0);
        if pre_toward_goal < params.pre_touch_goal_vel
            && depth > (params.touch_depth_from_goal * 0.55)
        {
            continue;
        }

        let Some((feats, evidence)) =
            features_and_evidence(replay, player_idx, own_goal_y, touch_t, post_vel, &params)
        else {
            continue;
        };
        let danger_time = feats[2];
        let goalward = feats[4];
        let opp_next = feats[6];
        let opp_eta_adv = f64::max(0.0, feats[7]);
        let instant_goal = feats[8];
        let lateral_escape = feats[5];
        if instant_goal < 1.0 && lateral_escape >= params.wide_clear_escape_norm {
            continue;
        }
        if !(instant_goal >= 1.0
            || danger_time >= 0.35
            || (goalward >= 0.35
                && opp_next >= 1.0
                && opp_eta_adv >= params.goal_branch_opp_eta_adv_min))
        {
            continue;
        }
        let severity = 0.35 * danger_time
            + 0.20 * goalward
            + 0.20 * opp_next
            + 0.15 * f64::max(0.0, opp_eta_adv)
            + 0.10 * instant_goal;
        let severity = severity.clamp(0.35, 1.0);
        let mut cand = Candidate::new(
            BAD_DEFENSIVE_TOUCH,
            round_py(touch_t, 2),
            round_py(f64::max(0.0, touch_t - 0.5), 2),
            round_py(touch_t + params.lookahead_s, 2),
            player_idx,
            &player.name,
            severity,
            feats,
        );
        cand.evidence = Some(evidence);
        out.push(cand);
        last_emit = touch_t;
    }
    out
}
