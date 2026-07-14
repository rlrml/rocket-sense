//! Build a [`ReplayView`] from subtr-actor's serialized `ReplayData`
//! (the `raw` object `@rlrml/player`'s `loadReplay` returns, i.e. the output
//! of `get_replay_frames_data`).
//!
//! ## Mapping notes (RLAgent parser ↔ subtr-actor divergences)
//!
//! The Python oracle consumes RLVision's own parser output; this adapter
//! reproduces an equivalent view from subtr-actor frames. Intentional
//! divergences (each keeps detector *logic* identical while the input data
//! differs slightly):
//!
//! 1. **Clock.** Times are `metadata_frames[i].time - metadata_frames[0].time`
//!    — the same rebasing `@rlrml/player` applies, so marker times are
//!    directly seekable in the viewer. The RLAgent parser additionally
//!    subtracts mid-game pause time and rounds to 2 decimals; subtr-actor
//!    keeps the raw frame clock. Detector behavior is unaffected (all logic
//!    is windowed/relative); absolute marker times are viewer-clock times.
//! 2. **Precision.** RLAgent rounds positions to integers and quaternions to
//!    2 decimals as a payload-size optimization. This adapter keeps full
//!    float precision.
//! 3. **Ball segments.** RLAgent splits ball tracks per kickoff and ends a
//!    segment at the *scoreboard increment* (~1.5-2s after the goal
//!    explosion). This adapter ends segments at the goal event (explosion)
//!    and starts the next when the ball respawns at the kickoff spot. The
//!    celebration frames RLAgent keeps are inside a non-play window either
//!    way, so candidates there are filtered identically.
//! 4. **Boost.** RLAgent steps between replicated boost bytes
//!    (`raw * 100 / 255`, integer). subtr-actor models drain between
//!    replications (float). Values agree at replication points to <1 boost.
//! 5. **Score times.** RLAgent records scoreboard-increment times; this
//!    adapter uses goal-event times for `blue/orange_score_times`. They only
//!    feed `_goal_moments`/non-play windows, where tick marks dominate.
//! 6. **Player order.** RLAgent orders players by (team, header score desc);
//!    this adapter orders team 0 then team 1 in `meta` order. Order only
//!    breaks ties in nearest-teammate scans.

use crate::view::{
    BallSegment, BoostPad, BoostTrack, CarTrack, PlayerView, ReplayView, Team, Tick,
};
use serde::Deserialize;
use serde_json::Value;

// --- Deserialization mirrors of the serialized subtr-actor shapes ----------
//
// `subtr_actor::ReplayData` derives only `Serialize` (and some leaf types are
// serialize-only in boxcars), so these mirrors deserialize just the fields the
// detectors need from the serialized form — which is exactly what crosses the
// JS boundary.

#[derive(Debug, Deserialize)]
pub struct RawReplayData {
    pub frame_data: RawFrameData,
    #[serde(default)]
    pub meta: RawMeta,
    #[serde(default)]
    pub demolish_infos: Vec<RawDemolishInfo>,
    #[serde(default)]
    pub boost_pad_events: Vec<RawBoostPadEvent>,
    #[serde(default)]
    pub boost_pads: Vec<RawResolvedBoostPad>,
    #[serde(default)]
    pub goal_events: Vec<RawGoalEvent>,
    #[serde(default)]
    pub replay_tick_marks: Vec<RawTickMark>,
}

#[derive(Debug, Deserialize)]
pub struct RawFrameData {
    pub ball_data: RawBallData,
    pub players: Vec<(Value, RawPlayerData)>,
    pub metadata_frames: Vec<RawMetadataFrame>,
}

#[derive(Debug, Deserialize)]
pub struct RawBallData {
    pub frames: Vec<RawBallFrame>,
}

#[derive(Debug, Deserialize)]
#[serde(untagged)]
pub enum RawBallFrame {
    Empty(String),
    Data {
        #[serde(rename = "Data")]
        data: RawBallFrameData,
    },
}

#[derive(Debug, Deserialize)]
pub struct RawBallFrameData {
    pub rigid_body: RawRigidBody,
}

#[derive(Debug, Deserialize)]
pub struct RawPlayerData {
    pub frames: Vec<RawPlayerFrame>,
}

#[derive(Debug, Deserialize)]
#[serde(untagged)]
pub enum RawPlayerFrame {
    Empty(String),
    Data {
        #[serde(rename = "Data")]
        data: RawPlayerFrameData,
    },
}

#[derive(Debug, Deserialize)]
pub struct RawPlayerFrameData {
    pub rigid_body: RawRigidBody,
    pub boost_amount: f64,
    #[serde(default)]
    pub player_name: Option<String>,
    #[serde(default)]
    pub is_team_0: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct RawRigidBody {
    #[serde(default)]
    pub sleeping: bool,
    pub location: RawVec3,
    pub rotation: RawQuat,
}

#[derive(Debug, Clone, Copy, Deserialize)]
pub struct RawVec3 {
    pub x: f64,
    pub y: f64,
    pub z: f64,
}

#[derive(Debug, Clone, Copy, Deserialize)]
pub struct RawQuat {
    pub x: f64,
    pub y: f64,
    pub z: f64,
    pub w: f64,
}

#[derive(Debug, Deserialize)]
pub struct RawMetadataFrame {
    pub time: f64,
}

#[derive(Debug, Default, Deserialize)]
pub struct RawMeta {
    #[serde(default)]
    pub team_zero: Vec<RawPlayerInfo>,
    #[serde(default)]
    pub team_one: Vec<RawPlayerInfo>,
}

#[derive(Debug, Deserialize)]
pub struct RawPlayerInfo {
    pub remote_id: Value,
    pub name: String,
}

#[derive(Debug, Deserialize)]
pub struct RawDemolishInfo {
    pub time: f64,
    pub victim: Value,
}

#[derive(Debug, Deserialize)]
pub struct RawBoostPadEvent {
    pub time: f64,
    pub pad_id: String,
    pub kind: Value,
}

#[derive(Debug, Deserialize)]
pub struct RawResolvedBoostPad {
    #[serde(default)]
    pub pad_id: Option<String>,
    pub size: String,
    pub position: RawVec3,
}

#[derive(Debug, Deserialize)]
pub struct RawGoalEvent {
    pub time: f64,
    pub scoring_team_is_team_0: bool,
}

#[derive(Debug, Deserialize)]
pub struct RawTickMark {
    pub description: String,
    #[serde(default)]
    pub time: Option<f64>,
}

// --- Adapter ----------------------------------------------------------------

/// Stable string key for a serialized `RemoteId` value, used to match player
/// frame streams with meta entries and demolish victims.
fn remote_id_key(value: &Value) -> String {
    serde_json::to_string(value).unwrap_or_default()
}

/// Kickoff-spot detection (mirrors the RLAgent parser's respawn thresholds).
fn ball_at_kickoff_spot(x: f64, y: f64, z: f64) -> bool {
    x.abs() < 200.0 && y.abs() < 200.0 && z > 85.0 && z < 115.0
}

pub fn replay_view_from_raw(raw: &RawReplayData) -> ReplayView {
    let mut view = ReplayView::default();

    let metadata = &raw.frame_data.metadata_frames;
    let time_offset = metadata.first().map(|f| f.time).unwrap_or(0.0);
    let times: Vec<f64> = metadata.iter().map(|f| f.time - time_offset).collect();
    let n_frames = times.len();

    // Goal moments (rebased) drive segment ends and score times.
    let mut goal_times: Vec<f64> = raw
        .goal_events
        .iter()
        .map(|g| g.time - time_offset)
        .collect();
    goal_times.sort_by(|a, b| a.partial_cmp(b).unwrap());

    // --- Ball segments: kickoff spawn → goal (or end of frames). -----------
    {
        let frames = &raw.frame_data.ball_data.frames;
        let mut next_goal = goal_times.iter().copied().peekable();
        let mut current: Option<BallSegment> = None;
        // Before the first kickoff and right after a goal we wait for the
        // ball to return to the kickoff spot before opening a segment.
        let mut awaiting_kickoff = true;
        for i in 0..n_frames.min(frames.len()) {
            let t = times[i];
            // Close the open segment at the goal explosion.
            while let Some(&g) = next_goal.peek() {
                if t >= g {
                    next_goal.next();
                    if let Some(mut seg) = current.take() {
                        seg.end = g;
                        view.balls.push(seg);
                    }
                    awaiting_kickoff = true;
                } else {
                    break;
                }
            }
            let RawBallFrame::Data { data } = &frames[i] else {
                continue;
            };
            let loc = data.rigid_body.location;
            if awaiting_kickoff {
                if !ball_at_kickoff_spot(loc.x, loc.y, loc.z) {
                    continue;
                }
                awaiting_kickoff = false;
                current = Some(BallSegment {
                    start: t,
                    end: t,
                    times: Vec::new(),
                    pos: Vec::new(),
                });
            }
            if let Some(seg) = current.as_mut() {
                // Skip duplicate timestamps (RLAgent replaces the sample; the
                // interpolator only needs monotone times).
                if seg.times.last() == Some(&t) {
                    let n = seg.pos.len();
                    seg.pos[n - 3] = loc.x;
                    seg.pos[n - 2] = loc.y;
                    seg.pos[n - 1] = loc.z;
                } else {
                    seg.times.push(t);
                    seg.pos.extend_from_slice(&[loc.x, loc.y, loc.z]);
                }
                seg.end = t;
            }
        }
        if let Some(seg) = current.take() {
            view.balls.push(seg);
        }
    }

    // --- Players -------------------------------------------------------------
    // Order: team 0 then team 1, in meta order; fall back to frame-stream
    // order for ids missing from meta.
    let mut ordered_ids: Vec<(String, String, Team)> = Vec::new();
    for info in &raw.meta.team_zero {
        ordered_ids.push((
            remote_id_key(&info.remote_id),
            info.name.clone(),
            Team::Blue,
        ));
    }
    for info in &raw.meta.team_one {
        ordered_ids.push((
            remote_id_key(&info.remote_id),
            info.name.clone(),
            Team::Orange,
        ));
    }
    for (id_value, data) in &raw.frame_data.players {
        let key = remote_id_key(id_value);
        if ordered_ids.iter().any(|(k, _, _)| *k == key) {
            continue;
        }
        // Derive name/team from the first Data frame.
        let mut name = String::new();
        let mut team = Team::Blue;
        for frame in &data.frames {
            if let RawPlayerFrame::Data { data } = frame {
                if let Some(n) = &data.player_name {
                    name = n.clone();
                }
                if let Some(is0) = data.is_team_0 {
                    team = if is0 { Team::Blue } else { Team::Orange };
                }
                break;
            }
        }
        ordered_ids.push((key, name, team));
    }

    for (key, name, team) in ordered_ids {
        let Some((_, data)) = raw
            .frame_data
            .players
            .iter()
            .find(|(id, _)| remote_id_key(id) == key)
        else {
            continue;
        };
        let mut cars: Vec<CarTrack> = Vec::new();
        let mut current: Option<CarTrack> = None;
        let mut boost = BoostTrack::default();
        let mut resolved_team = team;
        let mut team_seen = false;
        for i in 0..n_frames.min(data.frames.len()) {
            let t = times[i];
            match &data.frames[i] {
                RawPlayerFrame::Data { data } => {
                    if !team_seen {
                        if let Some(is0) = data.is_team_0 {
                            resolved_team = if is0 { Team::Blue } else { Team::Orange };
                            team_seen = true;
                        }
                    }
                    let loc = data.rigid_body.location;
                    let q = data.rigid_body.rotation;
                    let track = current.get_or_insert_with(|| CarTrack {
                        start: t,
                        end: t,
                        times: Vec::new(),
                        pos: Vec::new(),
                        quat: Vec::new(),
                    });
                    if track.times.last() != Some(&t) {
                        track.times.push(t);
                        track.pos.extend_from_slice(&[loc.x, loc.y, loc.z]);
                        track.quat.extend_from_slice(&[q.x, q.y, q.z, q.w]);
                    }
                    track.end = t;
                    // RLAgent records boost at replication changes; recording
                    // every frame preserves `_boost_at`'s step-sample
                    // semantics with subtr-actor's drain model.
                    let pct = data.boost_amount * 100.0 / 255.0;
                    if boost.values.last() != Some(&pct) {
                        boost.times.push(t);
                        boost.values.push(pct);
                    }
                }
                RawPlayerFrame::Empty(_) => {
                    if let Some(track) = current.take() {
                        if track.times.len() > 1 {
                            cars.push(track);
                        }
                    }
                }
            }
        }
        if let Some(track) = current.take() {
            if track.times.len() > 1 {
                cars.push(track);
            }
        }
        view.players.push(PlayerView {
            name,
            team: resolved_team,
            cars,
            demo_times: Vec::new(),
            boost_amount: boost,
        });
    }

    // Demo times from exact demolish events, matched to players by remote id.
    for demo in &raw.demolish_infos {
        let victim_key = remote_id_key(&demo.victim);
        if let Some(player) = view_player_for_remote_id(raw, &mut view, &victim_key) {
            player.demo_times.push(demo.time - time_offset);
        }
    }
    for player in &mut view.players {
        player.demo_times.sort_by(|a, b| a.partial_cmp(b).unwrap());
    }

    // --- Boost pads -----------------------------------------------------------
    for pad in &raw.boost_pads {
        let Some(pad_id) = &pad.pad_id else {
            continue;
        };
        let mut event_starts: Vec<f64> = Vec::new();
        let mut event_ends: Vec<f64> = Vec::new();
        // Events arrive in time order per pad; mirror the RLAgent parser's
        // is_active toggling so unmatched events are dropped.
        let mut is_active = true;
        for event in &raw.boost_pad_events {
            if &event.pad_id != pad_id {
                continue;
            }
            let picked_up = match &event.kind {
                Value::String(s) => s != "Available",
                Value::Object(map) => map.contains_key("PickedUp"),
                _ => false,
            };
            let t = event.time - time_offset;
            if picked_up && is_active {
                event_starts.push(t);
                is_active = false;
            } else if !picked_up && !is_active {
                event_ends.push(t);
                is_active = true;
            }
        }
        // Parity choice: the RLAgent parser can only resolve a pad's position
        // from an observed pickup, so pads nobody ever grabbed are invisible
        // to the Python detectors. Mirror that so `pick_up_small_pads` sees
        // the same pad set (even though subtr-actor knows the full layout).
        if event_starts.is_empty() {
            continue;
        }
        view.boost_pads.push(BoostPad {
            x: pad.position.x,
            y: pad.position.y,
            big: pad.size == "big" || pad.size == "Big",
            event_starts,
            event_ends,
        });
    }

    // --- Ticks & score times ---------------------------------------------------
    for tick in &raw.replay_tick_marks {
        let Some(t) = tick.time else { continue };
        view.ticks.push(Tick {
            time: t - time_offset,
            kind: tick.description.clone(),
        });
    }
    for goal in &raw.goal_events {
        let t = goal.time - time_offset;
        if goal.scoring_team_is_team_0 {
            view.blue_score_times.push(t);
        } else {
            view.orange_score_times.push(t);
        }
    }

    view
}

/// Find the view player corresponding to a frame-stream remote-id key.
fn view_player_for_remote_id<'a>(
    raw: &RawReplayData,
    view: &'a mut ReplayView,
    key: &str,
) -> Option<&'a mut PlayerView> {
    // The view was built from meta ordering (team_zero, team_one, then extras
    // in frame order); rebuild that same ordering to find the index.
    let mut ordered_keys: Vec<String> = Vec::new();
    for info in &raw.meta.team_zero {
        ordered_keys.push(remote_id_key(&info.remote_id));
    }
    for info in &raw.meta.team_one {
        ordered_keys.push(remote_id_key(&info.remote_id));
    }
    for (id, _) in &raw.frame_data.players {
        let k = remote_id_key(id);
        if !ordered_keys.contains(&k) {
            ordered_keys.push(k);
        }
    }
    // Keep only ids that have a frame stream (mirrors view construction).
    let frame_keys: Vec<String> = raw
        .frame_data
        .players
        .iter()
        .map(|(id, _)| remote_id_key(id))
        .collect();
    let mut view_idx = 0usize;
    for k in ordered_keys {
        if !frame_keys.contains(&k) {
            continue;
        }
        if k == key {
            return view.players.get_mut(view_idx);
        }
        view_idx += 1;
    }
    None
}

/// Ordered player identity keys matching `replay_view_from_raw`'s player
/// order. Formatted as `platform:id` lowercase, mirroring the player track ids
/// `@rlrml/player` exposes (`ReplayPlayerTrack.id`).
pub fn player_track_keys(raw: &RawReplayData) -> Vec<String> {
    let mut ordered: Vec<Value> = Vec::new();
    let frame_keys: Vec<String> = raw
        .frame_data
        .players
        .iter()
        .map(|(id, _)| remote_id_key(id))
        .collect();
    for info in raw.meta.team_zero.iter().chain(raw.meta.team_one.iter()) {
        if frame_keys.contains(&remote_id_key(&info.remote_id)) {
            ordered.push(info.remote_id.clone());
        }
    }
    for (id, _) in &raw.frame_data.players {
        let key = remote_id_key(id);
        if !ordered.iter().any(|v| remote_id_key(v) == key) {
            ordered.push(id.clone());
        }
    }
    ordered.iter().map(remote_id_display_key).collect()
}

/// `platform:id` key for a serialized RemoteId, matching the server's
/// `remote_id_parts` normalization (`PlayStation` → `ps4`) and hence the
/// `primary_subject_id` convention used by `play_events`.
fn remote_id_display_key(value: &Value) -> String {
    let Some(map) = value.as_object() else {
        return value.to_string().to_lowercase();
    };
    let Some((platform, id)) = map.iter().next() else {
        return String::new();
    };
    let platform = if platform == "PlayStation" {
        "ps4".to_owned()
    } else {
        platform.to_lowercase()
    };
    let id_text = match id {
        Value::String(s) => s.clone(),
        Value::Number(n) => n.to_string(),
        Value::Object(inner) => inner
            .get("online_id")
            .map(|v| match v {
                Value::String(s) => s.clone(),
                other => other.to_string(),
            })
            .unwrap_or_else(|| id.to_string()),
        other => other.to_string(),
    };
    format!("{platform}:{id_text}")
}

/// Deserialize + adapt in one step from a JSON value (used by tests and
/// native harnesses; the WASM entry point deserializes from a `JsValue`).
pub fn replay_view_from_json(value: &Value) -> Result<ReplayView, serde_json::Error> {
    let raw: RawReplayData = serde_json::from_value(value.clone())?;
    Ok(replay_view_from_raw(&raw))
}

#[cfg(test)]
#[path = "subtr_adapter_tests.rs"]
mod tests;
