//! The detector input model.
//!
//! [`ReplayView`] mirrors the replay `dict` produced by RLVision's Rust replay
//! parser (`RLAgent/3d-replay-viewer/replay_parser`), which is what the Python
//! oracle (`ml/mistakes.py`) consumes. Keeping the shape identical lets the
//! detector port stay a line-for-line translation, and lets parity tests feed
//! the exact same input to both implementations. Production builds construct a
//! `ReplayView` from subtr-actor frame data via [`crate::subtr_adapter`].

/// Field geometry (raw replay coords): x: ±4096, y: ±5120 (goal axis — blue
/// defends -y, orange defends +y), z: 0..2044.
pub const FIELD_HALF_Y: f64 = 5120.0;
pub const CEILING_Z: f64 = 2044.0;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Team {
    Blue,
    Orange,
}

impl Team {
    /// The y coordinate of this team's own goal (`GOAL_Y` in Python).
    pub fn own_goal_y(self) -> f64 {
        match self {
            Team::Blue => -FIELD_HALF_Y,
            Team::Orange => FIELD_HALF_Y,
        }
    }
}

/// One car lifetime (spawn → despawn). Players get a new track after each
/// demolition respawn, so sampling between tracks returns `None` (dead).
#[derive(Debug, Clone, Default)]
pub struct CarTrack {
    pub start: f64,
    pub end: f64,
    pub times: Vec<f64>,
    /// Flat `[x0, y0, z0, x1, y1, z1, ...]`.
    pub pos: Vec<f64>,
    /// Flat `[qx0, qy0, qz0, qw0, ...]`.
    pub quat: Vec<f64>,
}

#[derive(Debug, Clone, Default)]
pub struct BoostTrack {
    pub times: Vec<f64>,
    /// Boost percent 0..100.
    pub values: Vec<f64>,
}

#[derive(Debug, Clone)]
pub struct PlayerView {
    pub name: String,
    pub team: Team,
    pub cars: Vec<CarTrack>,
    pub demo_times: Vec<f64>,
    pub boost_amount: BoostTrack,
}

/// One ball segment: kickoff → goal (or end of game).
#[derive(Debug, Clone, Default)]
pub struct BallSegment {
    pub start: f64,
    pub end: f64,
    pub times: Vec<f64>,
    /// Flat `[x0, y0, z0, ...]`.
    pub pos: Vec<f64>,
}

#[derive(Debug, Clone)]
pub struct BoostPad {
    pub x: f64,
    pub y: f64,
    pub big: bool,
    /// Pickup times (pad becomes inactive).
    pub event_starts: Vec<f64>,
    /// Respawn times (pad becomes active again).
    pub event_ends: Vec<f64>,
}

#[derive(Debug, Clone)]
pub struct Tick {
    pub time: f64,
    pub kind: String,
}

#[derive(Debug, Clone, Default)]
pub struct ReplayView {
    pub players: Vec<PlayerView>,
    pub balls: Vec<BallSegment>,
    pub boost_pads: Vec<BoostPad>,
    pub ticks: Vec<Tick>,
    pub blue_score_times: Vec<f64>,
    pub orange_score_times: Vec<f64>,
}

pub type Vec3 = (f64, f64, f64);

// --- Sampling helpers (mirrors of ml/mistakes.py) ---------------------------

fn flatten_xyz(flat: &[f64], i: usize) -> Vec3 {
    let j = i * 3;
    (flat[j], flat[j + 1], flat[j + 2])
}

/// `bisect.bisect_left`: first index i such that times[i] >= t.
pub(crate) fn bisect_left(values: &[f64], t: f64) -> usize {
    values.partition_point(|&v| v < t)
}

/// `bisect.bisect_right`: first index i such that times[i] > t.
pub(crate) fn bisect_right(values: &[f64], t: f64) -> usize {
    values.partition_point(|&v| v <= t)
}

/// `math.isclose(a, b, abs_tol=1e-6)` — note Python keeps the default
/// relative tolerance of 1e-9 alongside the absolute tolerance.
fn isclose_abs_1e6(a: f64, b: f64) -> bool {
    (a - b).abs() <= f64::max(1e-9 * f64::max(a.abs(), b.abs()), 1e-6)
}

/// Sample a `[x0,y0,z0,x1,y1,z1,...]` track at time t (`_interp_pos`).
pub fn interp_pos(times: &[f64], pos: &[f64], t: f64) -> Option<Vec3> {
    if times.is_empty() || pos.is_empty() {
        return None;
    }
    if t < times[0] || t > times[times.len() - 1] {
        return None;
    }
    let i = bisect_left(times, t);
    if i >= times.len() {
        return Some(flatten_xyz(pos, times.len() - 1));
    }
    if isclose_abs_1e6(times[i], t) || i == 0 {
        return Some(flatten_xyz(pos, i));
    }
    let (t0, t1) = (times[i - 1], times[i]);
    if t1 <= t0 {
        return Some(flatten_xyz(pos, i));
    }
    let a = (t - t0) / (t1 - t0);
    let p0 = flatten_xyz(pos, i - 1);
    let p1 = flatten_xyz(pos, i);
    Some((
        p0.0 + a * (p1.0 - p0.0),
        p0.1 + a * (p1.1 - p0.1),
        p0.2 + a * (p1.2 - p0.2),
    ))
}

impl PlayerView {
    /// `_player_car_at`: the car instance covering time t, or None if dead.
    pub fn car_at(&self, t: f64) -> Option<&CarTrack> {
        self.cars.iter().find(|car| car.start <= t && t <= car.end)
    }

    /// `_player_pos_at`.
    pub fn pos_at(&self, t: f64) -> Option<Vec3> {
        let car = self.car_at(t)?;
        interp_pos(&car.times, &car.pos, t)
    }

    /// `_player_velocity` (finite difference over `dt`, default 0.2s).
    pub fn velocity(&self, t: f64) -> Option<Vec3> {
        self.velocity_dt(t, 0.2)
    }

    pub fn velocity_dt(&self, t: f64, dt: f64) -> Option<Vec3> {
        let p1 = self.pos_at(t)?;
        let p0 = self.pos_at(t - dt)?;
        Some(((p1.0 - p0.0) / dt, (p1.1 - p0.1) / dt, (p1.2 - p0.2) / dt))
    }

    /// `_is_demoed_at` (±0.4s window by default).
    pub fn is_demoed_at(&self, t: f64) -> bool {
        self.is_demoed_at_window(t, 0.4)
    }

    pub fn is_demoed_at_window(&self, t: f64, window: f64) -> bool {
        self.demo_times.iter().any(|&dt| (dt - t).abs() <= window)
    }

    /// `_in_post_demo_grace`: true within `grace` seconds AFTER a demolition
    /// (7s default: respawn animation + drive back into play).
    pub fn in_post_demo_grace(&self, t: f64) -> bool {
        self.in_post_demo_grace_window(t, 7.0)
    }

    pub fn in_post_demo_grace_window(&self, t: f64, grace: f64) -> bool {
        self.demo_times
            .iter()
            .any(|&dt| (0.0..=grace).contains(&(t - dt)))
    }

    /// `_boost_at`: step-samples the boost track (33.0 when empty).
    pub fn boost_at(&self, t: f64) -> f64 {
        let times = &self.boost_amount.times;
        let values = &self.boost_amount.values;
        if times.is_empty() {
            return 33.0;
        }
        let i = bisect_right(times, t) as isize - 1;
        if i < 0 {
            return values[0];
        }
        values[(i as usize).min(values.len() - 1)]
    }

    /// `_find_boost_topups`: completion timestamps of low→high boost rises.
    pub fn find_boost_topups(&self) -> Vec<f64> {
        self.find_boost_topups_with(33.0, 80.0, 1.5)
    }

    pub fn find_boost_topups_with(&self, low: f64, high: f64, max_rise_time: f64) -> Vec<f64> {
        let times = &self.boost_amount.times;
        let values = &self.boost_amount.values;
        let n = times.len().min(values.len());
        if n < 2 {
            return Vec::new();
        }
        let mut out = Vec::new();
        let mut last_low_t: Option<f64> = None;
        // Already at-or-above high without a fresh low — no pending topup.
        let mut settled = true;
        for i in 0..n {
            let v = values[i];
            let t = times[i];
            if v <= low {
                last_low_t = Some(t);
                settled = false;
            } else if v >= high && !settled {
                if let Some(lt) = last_low_t {
                    if (t - lt) <= max_rise_time {
                        out.push(t);
                    }
                }
                settled = true;
            }
        }
        out
    }

    /// `_player_heading_at`: ground heading (unit xy forward vector) from the
    /// quaternion track. Forward = local +X rotated by the quaternion.
    pub fn heading_at(&self, t: f64) -> Option<(f64, f64)> {
        let car = self.car_at(t)?;
        let times = &car.times;
        let quat = &car.quat;
        if times.is_empty() || quat.len() < 4 {
            return None;
        }
        let i = if t <= times[0] {
            0
        } else if t >= times[times.len() - 1] {
            times.len() - 1
        } else {
            let i = bisect_right(times, t) as isize - 1;
            i.max(0) as usize
        };
        let j = i * 4;
        let (qx, qy, qz, qw) = (quat[j], quat[j + 1], quat[j + 2], quat[j + 3]);
        let fx = 1.0 - 2.0 * (qy * qy + qz * qz);
        let fy = 2.0 * (qx * qy + qz * qw);
        let n = (fx * fx + fy * fy).sqrt();
        if n < 1e-3 {
            return None;
        }
        Some((fx / n, fy / n))
    }
}

impl ReplayView {
    /// `_ball_seg_at`.
    pub fn ball_seg_at(&self, t: f64) -> Option<&BallSegment> {
        self.balls.iter().find(|seg| seg.start <= t && t <= seg.end)
    }

    /// `_ball_pos_at`.
    pub fn ball_pos_at(&self, t: f64) -> Option<Vec3> {
        let seg = self.ball_seg_at(t)?;
        interp_pos(&seg.times, &seg.pos, t)
    }

    /// `_ball_velocity` (finite difference, default dt=0.2).
    pub fn ball_velocity(&self, t: f64) -> Option<Vec3> {
        self.ball_velocity_dt(t, 0.2)
    }

    pub fn ball_velocity_dt(&self, t: f64, dt: f64) -> Option<Vec3> {
        let p1 = self.ball_pos_at(t)?;
        let p0 = self.ball_pos_at(t - dt)?;
        Some(((p1.0 - p0.0) / dt, (p1.1 - p0.1) / dt, (p1.2 - p0.2) / dt))
    }

    /// Indexes of the focus player's teammates, in player-list order.
    pub fn teammate_indexes(&self, player_idx: usize) -> Vec<usize> {
        let team = self.players[player_idx].team;
        (0..self.players.len())
            .filter(|&i| i != player_idx && self.players[i].team == team)
            .collect()
    }

    /// Indexes of the focus player's opponents, in player-list order.
    pub fn opponent_indexes(&self, player_idx: usize) -> Vec<usize> {
        let team = self.players[player_idx].team;
        (0..self.players.len())
            .filter(|&i| self.players[i].team != team)
            .collect()
    }
}

/// `_dist` (3D euclidean).
pub fn dist(a: Vec3, b: Vec3) -> f64 {
    ((a.0 - b.0).powi(2) + (a.1 - b.1).powi(2) + (a.2 - b.2).powi(2)).sqrt()
}

/// `_dist2d` (xy euclidean).
pub fn dist2d(a: Vec3, b: Vec3) -> f64 {
    ((a.0 - b.0).powi(2) + (a.1 - b.1).powi(2)).sqrt()
}

/// `_car_world_up_z`: z-component of the car's local +Z axis after rotation by
/// the i-th quaternion sample (1.0 = wheels down, -1.0 = upside down).
pub fn car_world_up_z(quat: &[f64], i: usize) -> f64 {
    let j = i * 4;
    let (qx, qy) = (quat[j], quat[j + 1]);
    1.0 - 2.0 * (qx * qx + qy * qy)
}

/// Python `round(x, ndigits)` — correctly-rounded decimal rounding with
/// ties-to-even, which Rust's `{:.n}` formatting also implements.
pub fn round_py(x: f64, ndigits: usize) -> f64 {
    format!("{x:.ndigits$}").parse().unwrap_or(x)
}

#[cfg(test)]
#[path = "view_tests.rs"]
mod tests;
