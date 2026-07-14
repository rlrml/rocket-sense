//! Synthetic-oracle test for floating_with_boost. None of the golden fixture
//! replays trigger this detector, so the expected values below were produced
//! by running the Python oracle (`ml/mistakes.py predict_mistakes`) on the
//! exact replay constructed here.

use crate::pipeline::predict_mistakes;
use crate::profile::DetectorProfile;
use crate::view::{BallSegment, BoostTrack, CarTrack, PlayerView, ReplayView, Team};

fn synthetic_float_replay() -> ReplayView {
    let car_times = vec![
        0.0, 1.0, 2.0, 3.0, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 8.0, 8.5, 9.0, 15.0, 30.0,
    ];
    let zs = [
        17.0, 17.0, 17.0, 17.0, 17.0, 17.0, 300.0, 600.0, 700.0, 600.0, 300.0, 60.0, 17.0, 17.0,
        17.0,
    ];
    let mut pos = Vec::new();
    let mut quat = Vec::new();
    for z in zs {
        pos.extend_from_slice(&[0.0, -3000.0, z]);
        quat.extend_from_slice(&[0.0, 0.0, 0.0, 1.0]);
    }
    let focus = PlayerView {
        name: "Focus".into(),
        team: Team::Blue,
        cars: vec![CarTrack {
            start: 0.0,
            end: 30.0,
            times: car_times,
            pos,
            quat,
        }],
        demo_times: vec![],
        boost_amount: BoostTrack {
            times: vec![0.0],
            values: vec![60.0],
        },
    };
    let mate = PlayerView {
        name: "Mate".into(),
        team: Team::Orange,
        cars: vec![CarTrack {
            start: 0.0,
            end: 30.0,
            times: vec![0.0, 30.0],
            pos: vec![2000.0, 4000.0, 17.0, 2000.0, 4000.0, 17.0],
            quat: vec![0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0],
        }],
        demo_times: vec![],
        boost_amount: BoostTrack {
            times: vec![0.0],
            values: vec![50.0],
        },
    };
    ReplayView {
        balls: vec![BallSegment {
            start: 0.0,
            end: 30.0,
            times: vec![0.0, 1.0, 30.0],
            pos: vec![0.0, 0.0, 93.0, 3000.0, 3000.0, 93.0, 3000.0, 3000.0, 93.0],
        }],
        players: vec![focus, mate],
        ..Default::default()
    }
}

#[test]
fn detects_lazy_float_matching_python_oracle() {
    let view = synthetic_float_replay();
    let markers = predict_mistakes(&view, 0, &DetectorProfile::default());
    let floats: Vec<_> = markers
        .iter()
        .filter(|m| m.kind == crate::kinds::FLOATING_WITH_BOOST)
        .collect();
    assert_eq!(floats.len(), 1);
    let m = floats[0];
    assert_eq!(m.time, 6.75);
    assert_eq!(m.t_start, 4.6);
    assert_eq!(m.t_end, 8.9);
    assert!((m.severity - 0.8046666666666666).abs() < 1e-12);
    assert_eq!(m.score, 0.8047);
    let expected = [
        0.3424657534246575,
        0.7,
        0.6,
        0.6,
        0.0,
        1.0,
        0.20703125,
        0.045499021526418784,
        1.0,
    ];
    assert_eq!(m.features.len(), expected.len());
    for (a, b) in m.features.iter().zip(expected.iter()) {
        assert!((a - b).abs() < 1e-12, "feature {a} != {b}");
    }
}
