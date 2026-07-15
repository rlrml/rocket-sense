use super::*;
use crate::view::{BallSegment, ReplayView, Tick};

fn segment(start: f64, end: f64, times: Vec<f64>, pos: Vec<f64>) -> BallSegment {
    BallSegment {
        start,
        end,
        times,
        pos,
    }
}

#[test]
fn in_play_start_waits_for_ball_to_leave_spot() {
    // Ball sits at the kickoff spot until t=2.0.
    let seg = segment(
        0.0,
        10.0,
        vec![0.0, 1.0, 2.0],
        vec![0.0, 0.0, 93.0, 50.0, 0.0, 93.0, 300.0, 100.0, 93.0],
    );
    assert_eq!(segment_in_play_start(&seg), 2.0);
    // No samples → start + 0.5 fallback.
    let empty = segment(4.0, 10.0, vec![], vec![]);
    assert_eq!(segment_in_play_start(&empty), 4.5);
}

#[test]
fn non_play_windows_cover_celebration_and_kickoff() {
    let replay = ReplayView {
        balls: vec![
            segment(
                0.0,
                30.0,
                vec![0.0, 1.0],
                vec![0.0, 0.0, 93.0, 500.0, 0.0, 93.0],
            ),
            segment(
                35.0,
                60.0,
                vec![35.0, 37.0],
                vec![0.0, 0.0, 93.0, 500.0, 0.0, 93.0],
            ),
        ],
        ticks: vec![Tick {
            time: 28.0,
            kind: "Team0Goal".into(),
        }],
        ..Default::default()
    };
    let windows = non_play_windows(&replay);
    // First window: 0.0 → in-play (t=1.0). Second: goal explosion (28.0,
    // pulled back from the segment end 30.0) → in-play (t=37.0).
    assert_eq!(windows.len(), 2);
    assert_eq!(windows[0], (0.0, 1.0));
    assert_eq!(windows[1], (28.0, 37.0));

    assert!(overlaps_non_play_window(27.0, 29.0, &windows));
    assert!(!overlaps_non_play_window(37.5, 40.0, &windows));
}

#[test]
fn time_grid_skips_countdown() {
    let replay = ReplayView {
        balls: vec![segment(
            0.0,
            2.0,
            vec![0.0, 1.0],
            vec![0.0, 0.0, 93.0, 500.0, 0.0, 93.0],
        )],
        ..Default::default()
    };
    let grid = build_time_grid(&replay, 0.25);
    // Starts at max(0.5, in_play=1.0) = 1.0.
    assert_eq!(grid, vec![1.0, 1.25, 1.5, 1.75, 2.0]);
}
