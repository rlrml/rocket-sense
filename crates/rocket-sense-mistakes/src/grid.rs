//! Time-grid sampling, goal moments and non-play windows
//! (mirrors the corresponding section of `ml/mistakes.py`).

use crate::view::{BallSegment, ReplayView};

/// `_segment_in_play_start`: first timestamp within a ball segment where the
/// ball has moved away from the kickoff spot (xy distance > kick_radius).
pub fn segment_in_play_start(seg: &BallSegment) -> f64 {
    segment_in_play_start_with(seg, 200.0)
}

pub fn segment_in_play_start_with(seg: &BallSegment, kick_radius: f64) -> f64 {
    let times = &seg.times;
    let pos = &seg.pos;
    let s = seg.start;
    if times.is_empty() || pos.is_empty() {
        return s + 0.5;
    }
    let n = times.len().min(pos.len() / 3);
    let r2 = kick_radius * kick_radius;
    for i in 0..n {
        let x = pos[i * 3];
        let y = pos[i * 3 + 1];
        if (x * x + y * y) > r2 {
            return times[i];
        }
    }
    s + 0.5
}

/// `_goal_moments`: sorted times of every goal (tick marks unioned with
/// scoreboard-change times as a fallback).
pub fn goal_moments(replay: &ReplayView) -> Vec<f64> {
    let mut out: Vec<f64> = Vec::new();
    for tk in &replay.ticks {
        if tk.kind.contains("Goal") {
            out.push(tk.time);
        }
    }
    out.extend_from_slice(&replay.blue_score_times);
    out.extend_from_slice(&replay.orange_score_times);
    out.sort_by(|a, b| a.partial_cmp(b).unwrap());
    out
}

/// A `Team*Goal` tick precedes the scoreboard increment by ~1.5-2s; allow
/// margin when matching a goal to the kickoff it caused.
const GOAL_TO_SCORE_LAG: f64 = 5.0;

/// `_non_play_windows`: closed intervals spanning every non-play period (goal
/// celebration, kickoff countdown, wait until the ball leaves the spot).
pub fn non_play_windows(replay: &ReplayView) -> Vec<(f64, f64)> {
    let goals = goal_moments(replay);
    let mut out = Vec::new();
    let mut prev_end = 0.0f64;
    for seg in &replay.balls {
        let s = seg.start;
        let ip = segment_in_play_start(seg);
        let mut win_start = prev_end.min(s);
        // Pull the window start back to the goal explosion when this kickoff
        // follows a goal (players fly around before the kickoff freeze).
        let cluster_min = goals
            .iter()
            .copied()
            .filter(|&g| prev_end - GOAL_TO_SCORE_LAG <= g && g <= prev_end + 0.25)
            .fold(f64::INFINITY, f64::min);
        if cluster_min.is_finite() {
            win_start = win_start.min(cluster_min);
        }
        if ip > win_start {
            out.push((win_start, ip));
        }
        // Python: `prev_end = float(seg.get("end") or s)` — a zero/absent end
        // falls back to the segment start.
        prev_end = if seg.end == 0.0 { s } else { seg.end };
    }
    out
}

/// `_overlaps_non_play_window` for a candidate interval.
pub fn overlaps_non_play_window(t_start: f64, t_end: f64, windows: &[(f64, f64)]) -> bool {
    windows.iter().any(|&(s, e)| t_start <= e && t_end >= s)
}

/// `_build_time_grid`: sample the playable timeline at regular `dt` intervals,
/// skipping kickoff countdowns and goal celebrations.
pub fn build_time_grid(replay: &ReplayView, dt: f64) -> Vec<f64> {
    let mut grid = Vec::new();
    for seg in &replay.balls {
        let s = seg.start;
        let e = seg.end;
        if e <= s {
            continue;
        }
        let mut t = (s + 0.5).max(segment_in_play_start(seg));
        while t <= e {
            grid.push(t);
            t += dt;
        }
    }
    grid
}

/// Per-segment kickoff-skip helper used by most detectors: true when `t` falls
/// inside a segment and before `in_play_start + skip_s`.
pub struct KickoffWindows {
    /// (seg_start, seg_end, in_play_start)
    windows: Vec<(f64, f64, f64)>,
}

impl KickoffWindows {
    pub fn new(replay: &ReplayView) -> Self {
        Self {
            windows: replay
                .balls
                .iter()
                .map(|seg| (seg.start, seg.end, segment_in_play_start(seg)))
                .collect(),
        }
    }

    pub fn in_kickoff_skip(&self, t: f64, skip_s: f64) -> bool {
        self.windows
            .iter()
            .any(|&(s, e, ip)| s <= t && t <= e && t < ip + skip_s)
    }

    /// End of the segment containing `t`, or `default` when none contains it.
    pub fn seg_end_after(&self, t: f64, default: f64) -> f64 {
        for &(s, e, _ip) in &self.windows {
            if s <= t && t <= e {
                return e;
            }
        }
        default
    }
}

#[cfg(test)]
#[path = "grid_tests.rs"]
mod tests;
