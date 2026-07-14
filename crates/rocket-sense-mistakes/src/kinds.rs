//! Detector kinds and the per-kind feature schema
//! (mirrors `KINDS` / `FEATURE_NAMES` / `FEATURE_SCHEMA_VERSION`).

/// The order of names per kind is the column order of the model input vector —
/// DO NOT reorder without bumping [`FEATURE_SCHEMA_VERSION`]. Adding a
/// brand-new kind is additive and does NOT require a version bump.
pub const FEATURE_SCHEMA_VERSION: u32 = 1;

pub const TOO_FAR_FROM_PLAY: &str = "too_far_from_play";
pub const STACKED_TOO_CLOSE: &str = "stacked_too_close";
pub const BUMPING_TEAMMATE: &str = "bumping_teammate";
pub const OVERCOMMITTING_LAST_MAN: &str = "overcommitting_last_man";
pub const BANG_WITH_TIME: &str = "bang_with_time";
pub const HESITATING_ON_50: &str = "hesitating_on_50";
pub const WAITING_TO_CHALLENGE: &str = "waiting_to_challenge";
pub const DOUBLE_COMMITTING: &str = "double_committing";
pub const CREEPING_UP_TOO_FAR: &str = "creeping_up_too_far";
pub const POOR_LANDING: &str = "poor_landing";
pub const PICK_UP_SMALL_PADS: &str = "pick_up_small_pads";
pub const BAD_KICKOFF: &str = "bad_kickoff";
pub const BAD_FIFTY: &str = "bad_fifty";
pub const FLOATING_WITH_BOOST: &str = "floating_with_boost";
pub const BAD_DEFENSIVE_TOUCH: &str = "bad_defensive_touch";

/// Detector kinds (ordered — detection runs in this order).
pub const KINDS: [&str; 15] = [
    TOO_FAR_FROM_PLAY,
    STACKED_TOO_CLOSE,
    BUMPING_TEAMMATE,
    OVERCOMMITTING_LAST_MAN,
    BANG_WITH_TIME,
    HESITATING_ON_50,
    WAITING_TO_CHALLENGE,
    DOUBLE_COMMITTING,
    CREEPING_UP_TOO_FAR,
    POOR_LANDING,
    PICK_UP_SMALL_PADS,
    BAD_KICKOFF,
    BAD_FIFTY,
    FLOATING_WITH_BOOST,
    BAD_DEFENSIVE_TOUCH,
];

/// `FEATURE_NAMES[kind]` — fixed feature column order per kind.
pub fn feature_names(kind: &str) -> &'static [&'static str] {
    match kind {
        TOO_FAR_FROM_PLAY => &[
            "mean_dist_to_ball",
            "max_dist_to_ball",
            "duration_s",
            "ball_y_offensive_norm",
            "is_deepest_defender",
            "own_boost_avg",
            "teammate_min_dist_to_ball",
            "dist_delta_over_window",
            "ball_vel_toward_own_goal",
        ],
        STACKED_TOO_CLOSE => &[
            "min_dist_to_teammate",
            "mean_dist_to_teammate",
            "duration_s",
            "mean_dist_to_ball",
            "teammate_boost_avg",
            "own_boost_avg",
            "mean_y_norm",
            "same_side_as_ball",
            "ball_height_norm",
        ],
        BUMPING_TEAMMATE => &[
            "min_dist_to_teammate_norm",
            "relative_closing_speed_norm",
            "focus_directness_norm",
            "teammate_directness_norm",
            "focus_responsibility_share",
            "focus_heading_to_teammate_cos",
            "duration_s_norm",
            "ball_dist_norm",
            "own_boost_norm",
            "teammate_jolt_norm",
        ],
        OVERCOMMITTING_LAST_MAN => &[
            "min_dist_to_ball",
            "mean_dist_to_ball",
            "duration_s",
            "mean_ball_depth_norm",
            "tm_depth_lead_norm",
            "forward_speed_norm",
            "own_boost_avg",
            "opp_min_dist_to_ball",
            "ball_vel_toward_own_goal",
        ],
        BANG_WITH_TIME => &[
            "post_speed_norm",
            "opp_min_dist_norm",
            "tm_min_dist_norm",
            "ball_y_norm",
            "ball_height_norm",
            "own_boost_at_touch",
            "toward_opp_goal_cos",
            "next_toucher_is_opp",
            "ball_vertical_speed_norm",
        ],
        HESITATING_ON_50 => &[
            "dist_to_ball_norm",
            "focus_eta_s",
            "opp_eta_s",
            "eta_gap_s",
            "focus_speed_toward_ball_norm",
            "own_boost_norm",
            "dist_growth_norm",
            "ball_y_norm",
            "ball_height_norm",
        ],
        WAITING_TO_CHALLENGE => &[
            "delay_s_norm",
            "ball_depth_norm",
            "focus_dist_avg_norm",
            "closing_avg_norm",
            "own_boost_avg",
            "tm_min_dist_norm",
            "ball_vel_toward_own_norm",
            "focus_depth_norm",
            "opp_min_dist_norm",
        ],
        DOUBLE_COMMITTING => &[
            "tm_dist_to_ball_norm",
            "focus_dist_to_ball_norm",
            "focus_closing_norm",
            "ball_y_norm",
            "focus_depth_norm",
            "tm_focus_dist_norm",
            "duration_s_norm",
            "own_boost_norm",
            "tm_speed_toward_ball_norm",
        ],
        CREEPING_UP_TOO_FAR => &[
            "focus_depth_norm",
            "ball_depth_norm",
            "depth_lead_norm",
            "duration_s_norm",
            "ball_vel_toward_own_norm",
            "tm_min_depth_norm",
            "opp_min_dist_to_ball_norm",
            "own_boost_avg",
            "closing_avg_norm",
        ],
        POOR_LANDING => &[
            "peak_air_height_norm",
            "air_duration_norm",
            "landing_uz",
            "landing_down_speed_norm",
            "dist_to_ball_norm",
            "ball_height_norm",
            "own_boost_norm",
            "focus_depth_norm",
            "tm_min_dist_to_ball_norm",
        ],
        PICK_UP_SMALL_PADS => &[
            "miss_count_norm",
            "duration_s_norm",
            "mean_boost_norm",
            "min_boost_norm",
            "mean_speed_norm",
            "ball_dist_norm",
            "focus_depth_norm",
            "active_pads_in_reach_norm",
            "tm_min_dist_to_ball_norm",
        ],
        BAD_KICKOFF => &[
            "peak_air_height_norm",
            "backward_dist_norm",
            "focus_dist_at_kickoff_norm",
            "tm_min_dist_at_kickoff_norm",
            "opp_min_dist_at_kickoff_norm",
            "focus_speed_at_kickoff_norm",
            "own_boost_at_kickoff_norm",
            "ball_dist_to_own_goal_norm",
            "time_to_peak_norm",
        ],
        BAD_FIFTY => &[
            "peak_air_height_norm",
            "backward_dist_norm",
            "focus_dist_at_touch_norm",
            "tm_min_dist_at_touch_norm",
            "opp_min_dist_at_touch_norm",
            "focus_speed_at_touch_norm",
            "own_boost_at_touch_norm",
            "ball_dist_to_own_goal_norm",
            "time_to_peak_norm",
        ],
        FLOATING_WITH_BOOST => &[
            "peak_air_height_norm",
            "air_duration_norm",
            "boost_at_start_norm",
            "min_boost_norm",
            "boost_burn_norm",
            "min_ball_dist_norm",
            "focus_depth_norm",
            "ball_height_norm",
            "tm_min_dist_norm",
        ],
        BAD_DEFENSIVE_TOUCH => &[
            "pre_touch_goal_threat_norm",
            "touch_depth_norm",
            "post_touch_danger_lane_time_norm",
            "min_post_touch_cone_margin_norm",
            "post_touch_goalward_velocity_norm",
            "post_touch_lateral_escape_norm",
            "next_toucher_is_opp",
            "opp_eta_advantage_norm",
            "instant_goal_proxy",
            "pre_touch_cone_margin_norm",
            "touch_cone_margin_norm",
            "post_touch_min_cone_margin_norm",
            "post_touch_mean_cone_margin_norm",
            "touch_cone_delta_norm",
            "post_touch_cone_drop_norm",
        ],
        _ => &[],
    }
}
