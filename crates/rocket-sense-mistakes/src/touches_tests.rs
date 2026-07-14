use super::*;
use crate::view::{BoostTrack, CarTrack, PlayerView, Team};

fn moving_player(times: Vec<f64>, pos: Vec<f64>) -> PlayerView {
    let start = times.first().copied().unwrap_or(0.0);
    let end = times.last().copied().unwrap_or(0.0);
    PlayerView {
        name: "p".into(),
        team: Team::Blue,
        cars: vec![CarTrack {
            start,
            end,
            times,
            pos,
            quat: Vec::new(),
        }],
        demo_times: vec![],
        boost_amount: BoostTrack::default(),
    }
}

#[test]
fn eta_uses_closing_speed_when_committed() {
    // Player at origin moving +y at 1000 uu/s toward a ball 2000 uu away.
    let player = moving_player(vec![0.0, 1.0], vec![0.0, 0.0, 17.0, 0.0, 1000.0, 17.0]);
    let eta = eta_to_ball_2d(&player, (0.0, 3000.0, 93.0), 1.0).unwrap();
    // closing = 1000 > 800 → eta = d / closing = 2000 / 1000.
    assert!((eta - 2.0).abs() < 1e-9);
}

#[test]
fn eta_applies_turnaround_penalty_when_moving_away() {
    // Moving away from the ball at 1000 uu/s, ball 1500 uu behind.
    let player = moving_player(vec![0.0, 1.0], vec![0.0, 0.0, 17.0, 0.0, 1000.0, 17.0]);
    let eta = eta_to_ball_2d(&player, (0.0, -500.0, 93.0), 1.0).unwrap();
    // closing = -1000 → d/1500 + 1000/2000 = 1.0 + 0.5.
    assert!((eta - 1.5).abs() < 1e-9);
}

#[test]
fn eta_none_without_velocity() {
    // A single-sample track has a position but no finite-difference velocity.
    let player = moving_player(vec![0.0], vec![0.0, 0.0, 17.0]);
    assert_eq!(eta_to_ball_2d(&player, (0.0, 1000.0, 93.0), 0.0), None);
}
