use super::*;
use crate::view::Team;
use serde_json::json;

fn ball_frame(x: f64, y: f64, z: f64) -> serde_json::Value {
    json!({"Data": {"rigid_body": {
        "sleeping": false,
        "location": {"x": x, "y": y, "z": z},
        "rotation": {"x": 0.0, "y": 0.0, "z": 0.0, "w": 1.0},
        "linear_velocity": null,
        "angular_velocity": null,
    }}})
}

fn player_frame(x: f64, y: f64, z: f64, boost: f64, is_team_0: bool) -> serde_json::Value {
    json!({"Data": {
        "rigid_body": {
            "sleeping": false,
            "location": {"x": x, "y": y, "z": z},
            "rotation": {"x": 0.0, "y": 0.0, "z": 0.0, "w": 1.0},
            "linear_velocity": null,
            "angular_velocity": null,
        },
        "boost_amount": boost,
        "boost_active": false,
        "powerslide_active": false,
        "jump_active": false,
        "double_jump_active": false,
        "dodge_active": false,
        "player_name": "P1",
        "team": 0,
        "is_team_0": is_team_0,
        "camera": {"pitch": null, "yaw": null},
        "input": {"throttle": null, "steer": null, "dodge_impulse": null, "dodge_torque": null},
    }})
}

fn sample_raw() -> serde_json::Value {
    // Four frames: kickoff spot → in play → goal at t≈2.5 → post-goal.
    let times = [10.0, 10.5, 11.0, 12.0, 13.0];
    json!({
        "frame_data": {
            "ball_data": {"frames": [
                ball_frame(0.0, 0.0, 93.0),
                ball_frame(0.0, 0.0, 93.0),
                ball_frame(500.0, 800.0, 120.0),
                ball_frame(0.0, -5200.0, 100.0),
                "Empty",
            ]},
            "players": [
                [ {"Steam": "7656"}, {"frames": [
                    player_frame(0.0, -4608.0, 17.0, 85.0, true),
                    player_frame(0.0, -4000.0, 17.0, 85.0, true),
                    player_frame(0.0, -3000.0, 17.0, 170.0, true),
                    "Empty",
                    player_frame(0.0, -4608.0, 17.0, 85.0, true),
                ]} ]
            ],
            "metadata_frames": times.iter().map(|t| json!({
                "time": t,
                "seconds_remaining": 300,
                "replicated_game_state_name": 0,
                "replicated_game_state_time_remaining": 0,
            })).collect::<Vec<_>>(),
        },
        "meta": {
            "team_zero": [{"remote_id": {"Steam": "7656"}, "name": "P1", "stats": null}],
            "team_one": [],
            "game_type": null,
            "season": null,
            "all_headers": [],
        },
        "demolish_infos": [
            {"time": 12.0, "frame": 3, "seconds_remaining": 299,
             "victim": {"Steam": "7656"}, "attacker": {"Steam": "999"},
             "attacker_velocity": {"x": 0.0, "y": 0.0, "z": 0.0},
             "victim_velocity": {"x": 0.0, "y": 0.0, "z": 0.0},
             "victim_location": {"x": 0.0, "y": 0.0, "z": 0.0}},
        ],
        "boost_pad_events": [
            {"time": 11.0, "frame": 2, "pad_id": "pad-1", "player": null,
             "kind": {"PickedUp": {"sequence": 1}}},
            {"time": 12.0, "frame": 3, "pad_id": "pad-1", "player": null, "kind": "Available"},
        ],
        "boost_pads": [
            {"index": 0, "pad_id": "pad-1", "size": "small",
             "position": {"x": 1000.0, "y": 0.0, "z": 0.0}},
            {"index": 1, "pad_id": null, "size": "big",
             "position": {"x": 3072.0, "y": 4096.0, "z": 0.0}},
        ],
        "touch_events": [],
        "dodge_refreshed_events": [],
        "player_camera_events": [],
        "player_stat_events": [],
        "goal_events": [
            {"time": 12.5, "frame": 3, "scoring_team_is_team_0": false,
             "player": null, "team_zero_score": 0, "team_one_score": 1},
        ],
        "replay_tick_marks": [
            {"description": "Team1Goal", "frame": 3, "time": 12.5},
        ],
    })
}

#[test]
fn adapter_builds_equivalent_view() {
    let view = replay_view_from_json(&sample_raw()).unwrap();

    // Times rebased to the first metadata frame.
    assert_eq!(view.balls.len(), 1);
    let seg = &view.balls[0];
    assert_eq!(seg.start, 0.0);
    // Segment closes at the goal explosion (rebased 12.5 - 10.0 = 2.5); the
    // pre-goal ball frames stay in the segment, post-goal ones are cut.
    assert_eq!(seg.end, 2.5);
    assert_eq!(seg.times, vec![0.0, 0.5, 1.0, 2.0]);

    // Player: one car track split by the Empty (demo) frame.
    assert_eq!(view.players.len(), 1);
    let player = &view.players[0];
    assert_eq!(player.name, "P1");
    assert_eq!(player.team, Team::Blue);
    assert_eq!(player.cars.len(), 1, "single-sample respawn track dropped");
    assert_eq!(player.cars[0].times, vec![0.0, 0.5, 1.0]);
    // Demo event mapped through the remote id, rebased.
    assert_eq!(player.demo_times, vec![2.0]);
    // Boost raw 85/255 → percent.
    assert!((player.boost_at(0.0) - 85.0 * 100.0 / 255.0).abs() < 1e-9);
    assert!((player.boost_at(1.0) - 170.0 * 100.0 / 255.0).abs() < 1e-9);

    // Pads: pickup/respawn events mapped to starts/ends; the never-picked-up
    // big pad is dropped to mirror the RLAgent parser's resolved-pads-only view.
    assert_eq!(view.boost_pads.len(), 1);
    let pad = &view.boost_pads[0];
    assert!(!pad.big);
    assert_eq!(pad.event_starts, vec![1.0]);
    assert_eq!(pad.event_ends, vec![2.0]);

    // Ticks + score times rebased.
    assert_eq!(view.ticks.len(), 1);
    assert_eq!(view.ticks[0].time, 2.5);
    assert_eq!(view.orange_score_times, vec![2.5]);
    assert!(view.blue_score_times.is_empty());

    // Track keys expose the platform:id identity for focus resolution.
    assert_eq!(
        player_track_keys_from_json(&sample_raw()),
        vec!["steam:7656"]
    );
}

fn player_track_keys_from_json(value: &serde_json::Value) -> Vec<String> {
    let raw: RawReplayData = serde_json::from_value(value.clone()).unwrap();
    player_track_keys(&raw)
}
