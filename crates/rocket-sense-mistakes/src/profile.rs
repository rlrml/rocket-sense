//! Detector profiles: per-kind tunable parameters with defaults
//! (mirrors `_DETECTOR_PROFILE` / `_detector_profile_config` /
//! `_profile_param` in `ml/mistakes.py`).
//!
//! Instead of Python's ContextVar, the resolved profile is passed explicitly
//! to the pipeline and detectors.

use crate::kinds::KINDS;
use serde_json::Value;
use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct DetectorProfile {
    pub name: String,
    pub enabled_kinds: Vec<String>,
    /// Per-kind severity floors; `"*"` is the wildcard fallback.
    pub min_severity: HashMap<String, f64>,
    pub dedupe_window_s: f64,
    /// kind → param name → value (numbers and bools).
    pub kind_params: HashMap<String, HashMap<String, Value>>,
}

impl Default for DetectorProfile {
    /// The committed default profile (`_DETECTOR_PROFILE`).
    fn default() -> Self {
        let kind_params_json = serde_json::json!({
            "too_far_from_play": {
                "distance_threshold": 5600.0,
                "boost_min": 35.0,
                "pressure_radius": 3400.0,
                "min_duration": 1.75,
                "merge_gap": 5.0,
                "pre_event_window": 7.0,
            },
            "hesitating_on_50": {
                "threat_dist": 3900.0,
                "beat_gap_s": 0.2,
                "tie_window_s": 0.45,
                "min_boost": 6.0,
                "max_focus_eta": 3.0,
                "grow_threshold": 450.0,
            },
            "waiting_to_challenge": {
                "focus_near_radius": 3900.0,
                "slow_closing": 800.0,
                "min_boost": 12.0,
                "min_delay_s": 1.5,
            },
            "bumping_teammate": {
                "contact_radius": 120.0,
                "contact_3d_radius": 145.0,
                "contact_z_diff": 85.0,
                "max_contact_car_z": 175.0,
                "pre_separation_gain": 150.0,
                "post_separation_gain": 110.0,
                "min_relative_closing": 600.0,
                "min_focus_directness": 1100.0,
                "min_heading_cos": 0.4,
                "min_teammate_jolt": 990.0,
                "clear_contact_radius": 96.0,
                "clear_contact_teammate_directness_max": -230.0,
                "clear_contact_relative_closing_max": 805.0,
                "responsibility_share": 0.62,
                "merge_gap": 1.0,
            },
            "overcommitting_last_man": {
                "commit_radius": 2100.0,
                "last_man_margin": 350.0,
                "contest_radius": 2400.0,
                "min_duration": 1.0,
                "merge_gap": 4.0,
                "require_beaten": false,
            },
            "bang_with_time": {
                "bang_speed": 1900.0,
                "opp_pressure_radius": 1400.0,
                "pressure_lookback": 0.75,
                "loss_lookahead": 3.0,
                "awkward_threshold": 1.15,
                "require_opponent_next_touch": false,
            },
            "creeping_up_too_far": {
                "near_ball_radius": 2900.0,
                "bang_speed": 1200.0,
                "no_challenge_min": 650.0,
                "last_man_frac": 0.5,
            },
            "bad_defensive_touch": {
                "touch_depth_from_goal": 2400.0,
                "pre_touch_goal_vel": 400.0,
                "lookahead_s": 2.25,
                "danger_goal_depth": 1900.0,
                "danger_cone_half_width_at_goal": 1200.0,
                "danger_cone_half_width_at_depth": 2800.0,
                "danger_max_height": 1000.0,
                "safe_corner_x": 3000.0,
                "safe_corner_depth": 1800.0,
                "wide_clear_escape_norm": 0.9,
                "away_velocity_min": 850.0,
                "opp_eta_margin_s": 0.35,
                "goal_branch_opp_eta_adv_min": 0.2,
                "instant_goal_s": 1.5,
            },
        });
        let kind_params = kind_params_json
            .as_object()
            .unwrap()
            .iter()
            .map(|(kind, params)| {
                (
                    kind.clone(),
                    params
                        .as_object()
                        .unwrap()
                        .iter()
                        .map(|(k, v)| (k.clone(), v.clone()))
                        .collect(),
                )
            })
            .collect();
        DetectorProfile {
            name: "default".to_owned(),
            enabled_kinds: KINDS.iter().map(|k| (*k).to_owned()).collect(),
            min_severity: HashMap::new(),
            dedupe_window_s: 1.0,
            kind_params,
        }
    }
}

impl DetectorProfile {
    /// `_detector_profile_config`: merge an override config (as JSON) over the
    /// default profile.
    pub fn resolve(profile_config: Option<&Value>) -> Self {
        let mut merged = DetectorProfile::default();
        let Some(config) = profile_config.and_then(Value::as_object) else {
            return merged;
        };
        if let Some(enabled) = config.get("enabled_kinds") {
            if !enabled.is_null() {
                merged.enabled_kinds = enabled
                    .as_array()
                    .map(|items| {
                        items
                            .iter()
                            .filter_map(|v| v.as_str().map(str::to_owned))
                            .collect()
                    })
                    .unwrap_or_default();
            }
        }
        if let Some(ms) = config.get("min_severity").and_then(Value::as_object) {
            for (k, v) in ms {
                if let Some(f) = value_as_f64(v) {
                    merged.min_severity.insert(k.clone(), f);
                }
            }
        }
        if let Some(dw) = config.get("dedupe_window_s") {
            if let Some(f) = value_as_f64(dw) {
                merged.dedupe_window_s = f;
            }
        }
        if let Some(kp) = config.get("kind_params").and_then(Value::as_object) {
            for (kind, params) in kp {
                let entry = merged.kind_params.entry(kind.clone()).or_default();
                if let Some(params) = params.as_object() {
                    for (name, value) in params {
                        entry.insert(name.clone(), value.clone());
                    }
                }
            }
        }
        if let Some(name) = config.get("name").and_then(Value::as_str) {
            if !name.is_empty() {
                merged.name = name.to_owned();
            }
        }
        merged
    }

    /// `_profile_param`.
    pub fn param(&self, kind: &str, name: &str, default: f64) -> f64 {
        self.kind_params
            .get(kind)
            .and_then(|params| params.get(name))
            .and_then(value_as_f64)
            .unwrap_or(default)
    }

    /// `_profile_bool`.
    pub fn param_bool(&self, kind: &str, name: &str, default: bool) -> bool {
        let Some(value) = self.kind_params.get(kind).and_then(|p| p.get(name)) else {
            return default;
        };
        match value {
            Value::Bool(b) => *b,
            Value::String(s) => {
                matches!(
                    s.trim().to_lowercase().as_str(),
                    "1" | "true" | "yes" | "on"
                )
            }
            Value::Number(n) => n.as_f64().map(|f| f != 0.0).unwrap_or(default),
            Value::Null => false,
            _ => true,
        }
    }

    /// `_profile_min_severity` (with the `"*"` wildcard fallback).
    pub fn min_severity_for(&self, kind: &str) -> f64 {
        self.min_severity
            .get(kind)
            .or_else(|| self.min_severity.get("*"))
            .copied()
            .unwrap_or(0.0)
    }

    pub fn kind_enabled(&self, kind: &str) -> bool {
        self.enabled_kinds.iter().any(|k| k == kind)
    }
}

fn value_as_f64(value: &Value) -> Option<f64> {
    match value {
        Value::Number(n) => n.as_f64(),
        Value::String(s) => s.trim().parse().ok(),
        Value::Bool(b) => Some(if *b { 1.0 } else { 0.0 }),
        _ => None,
    }
}

#[cfg(test)]
#[path = "profile_tests.rs"]
mod tests;
