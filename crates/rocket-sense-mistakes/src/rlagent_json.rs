//! Build a [`ReplayView`] from the RLVision replay parser's JSON output
//! (`var replayData = {...}` files under
//! `RLAgent/3d-replay-viewer/replay_test_data/`).
//!
//! This loader exists for golden parity testing: it feeds the Rust detectors
//! the *exact same* input the Python oracle consumes, so detector-logic parity
//! can be asserted independently of the subtr-actor data mapping.

use crate::view::{
    BallSegment, BoostPad, BoostTrack, CarTrack, PlayerView, ReplayView, Team, Tick,
};
use serde_json::Value;

fn f64_array(value: Option<&Value>) -> Vec<f64> {
    value
        .and_then(Value::as_array)
        .map(|items| items.iter().filter_map(Value::as_f64).collect())
        .unwrap_or_default()
}

fn f64_field(value: &Value, key: &str) -> f64 {
    value.get(key).and_then(Value::as_f64).unwrap_or(0.0)
}

/// Parse the `var replayData = {...};` text (or bare JSON) into a view.
pub fn replay_view_from_rlagent_text(text: &str) -> Result<ReplayView, serde_json::Error> {
    let mut trimmed = text.trim();
    if let Some(rest) = trimmed.strip_prefix("var replayData =") {
        trimmed = rest.trim();
    }
    if let Some(rest) = trimmed.strip_suffix(';') {
        trimmed = rest.trim();
    }
    let value: Value = serde_json::from_str(trimmed)?;
    Ok(replay_view_from_rlagent_json(&value))
}

pub fn replay_view_from_rlagent_json(value: &Value) -> ReplayView {
    let mut view = ReplayView::default();

    for seg in value
        .get("balls")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
    {
        view.balls.push(BallSegment {
            start: f64_field(seg, "start"),
            end: f64_field(seg, "end"),
            times: f64_array(seg.get("times")),
            pos: f64_array(seg.get("pos")),
        });
    }

    for player in value
        .get("players")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
    {
        let team = match player.get("team").and_then(Value::as_str) {
            Some("orange") => Team::Orange,
            // Python lowercases and defaults to blue.
            Some(other) if other.eq_ignore_ascii_case("orange") => Team::Orange,
            _ => Team::Blue,
        };
        let cars = player
            .get("cars")
            .and_then(Value::as_array)
            .into_iter()
            .flatten()
            .map(|car| CarTrack {
                start: f64_field(car, "start"),
                end: f64_field(car, "end"),
                times: f64_array(car.get("times")),
                pos: f64_array(car.get("pos")),
                quat: f64_array(car.get("quat")),
            })
            .collect();
        let boost = player.get("boost_amount");
        view.players.push(PlayerView {
            name: player
                .get("player")
                .and_then(Value::as_str)
                .unwrap_or_default()
                .to_owned(),
            team,
            cars,
            demo_times: f64_array(player.get("demo_times")),
            boost_amount: BoostTrack {
                times: f64_array(boost.and_then(|b| b.get("times"))),
                values: f64_array(boost.and_then(|b| b.get("values"))),
            },
        });
    }

    for pad in value
        .get("boost_pads")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
    {
        let events = pad.get("events");
        view.boost_pads.push(BoostPad {
            x: f64_field(pad, "x"),
            y: f64_field(pad, "y"),
            big: pad.get("big").and_then(Value::as_bool).unwrap_or(false),
            event_starts: f64_array(events.and_then(|e| e.get("start"))),
            event_ends: f64_array(events.and_then(|e| e.get("end"))),
        });
    }

    for tick in value
        .get("ticks")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
    {
        view.ticks.push(Tick {
            time: f64_field(tick, "time"),
            kind: tick
                .get("kind")
                .and_then(Value::as_str)
                .unwrap_or_default()
                .to_owned(),
        });
    }

    view.blue_score_times = f64_array(value.get("blue_score").and_then(|b| b.get("times")));
    view.orange_score_times = f64_array(value.get("orange_score").and_then(|b| b.get("times")));

    view
}
