use super::*;

fn track(times: Vec<f64>, pos: Vec<f64>) -> CarTrack {
    let start = times.first().copied().unwrap_or(0.0);
    let end = times.last().copied().unwrap_or(0.0);
    CarTrack {
        start,
        end,
        times,
        pos,
        quat: Vec::new(),
    }
}

#[test]
fn interp_pos_matches_python_semantics() {
    let times = vec![0.0, 1.0, 2.0];
    let pos = vec![0.0, 0.0, 0.0, 10.0, 20.0, 30.0, 20.0, 40.0, 60.0];
    // Outside range → None.
    assert_eq!(interp_pos(&times, &pos, -0.1), None);
    assert_eq!(interp_pos(&times, &pos, 2.1), None);
    // Exact hits return the sample.
    assert_eq!(interp_pos(&times, &pos, 1.0), Some((10.0, 20.0, 30.0)));
    // Interpolation between samples.
    let p = interp_pos(&times, &pos, 0.5).unwrap();
    assert!((p.0 - 5.0).abs() < 1e-12);
    assert!((p.1 - 10.0).abs() < 1e-12);
    assert!((p.2 - 15.0).abs() < 1e-12);
    // Near-exact just below a sample (bisect_left lands on it) snaps to the
    // sample via the 1e-6 tolerance, mirroring Python.
    assert_eq!(
        interp_pos(&times, &pos, 0.9999995),
        Some((10.0, 20.0, 30.0))
    );
    // Just above a sample, Python interpolates (bisect_left lands on the next
    // sample, which is not within tolerance).
    let p = interp_pos(&times, &pos, 1.0000005).unwrap();
    assert!((p.0 - 10.000005).abs() < 1e-9);
}

#[test]
fn boost_at_steps_and_defaults() {
    let player = PlayerView {
        name: "p".into(),
        team: Team::Blue,
        cars: vec![],
        demo_times: vec![],
        boost_amount: BoostTrack {
            times: vec![1.0, 2.0, 3.0],
            values: vec![33.0, 50.0, 12.0],
        },
    };
    // Before the first sample → first value.
    assert_eq!(player.boost_at(0.5), 33.0);
    // Step semantics: last value at or before t.
    assert_eq!(player.boost_at(2.0), 50.0);
    assert_eq!(player.boost_at(2.9), 50.0);
    assert_eq!(player.boost_at(10.0), 12.0);
    // Empty track defaults to 33.0 (Python default).
    let empty = PlayerView {
        boost_amount: BoostTrack::default(),
        ..player
    };
    assert_eq!(empty.boost_at(1.0), 33.0);
}

#[test]
fn demo_windows_match_python() {
    let player = PlayerView {
        name: "p".into(),
        team: Team::Orange,
        cars: vec![],
        demo_times: vec![10.0],
        boost_amount: BoostTrack::default(),
    };
    assert!(player.is_demoed_at(10.3));
    assert!(player.is_demoed_at(9.7));
    // 10.0 - 9.6 exceeds 0.4 in binary floating point — Python agrees.
    assert!(!player.is_demoed_at(9.6));
    assert!(!player.is_demoed_at(9.5));
    // Post-demo grace covers [demo, demo + 7], not before the demo.
    assert!(player.in_post_demo_grace(10.0));
    assert!(player.in_post_demo_grace(17.0));
    assert!(!player.in_post_demo_grace(17.01));
    assert!(!player.in_post_demo_grace(9.99));
}

#[test]
fn boost_topups_detect_low_to_high_rises() {
    let player = PlayerView {
        name: "p".into(),
        team: Team::Blue,
        cars: vec![],
        demo_times: vec![],
        boost_amount: BoostTrack {
            times: vec![0.0, 1.0, 1.5, 5.0, 20.0, 20.4],
            values: vec![90.0, 20.0, 85.0, 90.0, 10.0, 100.0],
        },
    };
    // Rise at t=1.5 (20 → 85 in 0.5s) and at t=20.4 (10 → 100 in 0.4s).
    assert_eq!(player.find_boost_topups(), vec![1.5, 20.4]);
}

#[test]
fn player_dead_between_car_tracks() {
    let player = PlayerView {
        name: "p".into(),
        team: Team::Blue,
        cars: vec![
            track(vec![0.0, 1.0], vec![0.0; 6]),
            track(vec![5.0, 6.0], vec![1.0; 6]),
        ],
        demo_times: vec![],
        boost_amount: BoostTrack::default(),
    };
    assert!(player.pos_at(0.5).is_some());
    assert!(player.pos_at(3.0).is_none());
    assert!(player.pos_at(5.5).is_some());
}

#[test]
fn round_py_matches_python_round() {
    // Values checked against CPython: round(2.675, 2) == 2.67 (binary repr),
    // round(0.125, 2) == 0.12 (ties-to-even), round(226.145, 2) == 226.15.
    assert_eq!(round_py(2.675, 2), 2.67);
    assert_eq!(round_py(0.125, 2), 0.12);
    assert_eq!(round_py(226.145, 2), 226.15);
    assert_eq!(round_py(1.0, 2), 1.0);
    assert_eq!(round_py(-3.14159, 2), -3.14);
    assert_eq!(round_py(0.30000000000000004, 4), 0.3);
}

#[test]
fn car_world_up_z_identity_and_flip() {
    // Identity quaternion → wheels down.
    assert_eq!(car_world_up_z(&[0.0, 0.0, 0.0, 1.0], 0), 1.0);
    // 180° roll about x → upside down.
    assert_eq!(car_world_up_z(&[1.0, 0.0, 0.0, 0.0], 0), -1.0);
}
