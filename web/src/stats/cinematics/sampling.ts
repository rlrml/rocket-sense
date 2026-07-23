// Frame samplers over @rlrml/player's ReplayModel — the analogs of viewer.js's
// `_samplePlayerRLXY` / `_sampleBallRLXY` / `getBoostAt` / `isPadActive`.
// All positions are raw UU in the subtr-actor frame (RL Z-up), on the player
// clock (t=0 at the first frame), which is also the mistake markers' clock.

import type { ReplayBoostPad, ReplayModel, ReplayPlayerTrack } from "@rlrml/player";
import { FIELD_HALF_Y_UU } from "./constants";

/** i such that times[i] <= t < times[i+1], clamped to [0, n-2]. */
export function frameIndexAt(replay: ReplayModel, t: number): number {
  const frames = replay.frames;
  const n = frames.length;
  if (n < 2) return 0;
  if (t <= frames[0].time) return 0;
  if (t >= frames[n - 1].time) return n - 2;
  let lo = 0;
  let hi = n - 1;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (frames[mid].time <= t) lo = mid;
    else hi = mid;
  }
  return lo;
}

function frameAlpha(replay: ReplayModel, i: number, t: number): number {
  const t0 = replay.frames[i]?.time ?? 0;
  const t1 = replay.frames[i + 1]?.time ?? t0;
  const span = t1 - t0;
  if (!(span > 1e-6)) return 0;
  const a = (t - t0) / span;
  return a < 0 ? 0 : a > 1 ? 1 : a;
}

/** Player ground-plane position [x, y] in UU at time t, or null while absent. */
export function samplePlayerXY(
  replay: ReplayModel,
  track: ReplayPlayerTrack,
  t: number,
): [number, number] | null {
  const i = frameIndexAt(replay, t);
  const p0 = track.frames[i];
  const p1 = track.frames[i + 1] ?? p0;
  if (!p0?.position || p0.isPresent === false) return null;
  const pos1 = p1?.position && p1.isPresent !== false ? p1.position : p0.position;
  const a = frameAlpha(replay, i, t);
  return [
    p0.position.x + (pos1.x - p0.position.x) * a,
    p0.position.y + (pos1.y - p0.position.y) * a,
  ];
}

/** Ball ground-plane position [x, y] in UU at time t, or null. */
export function sampleBallXY(replay: ReplayModel, t: number): [number, number] | null {
  const i = frameIndexAt(replay, t);
  const b0 = replay.ballFrames[i];
  const b1 = replay.ballFrames[i + 1] ?? b0;
  if (!b0?.position) return null;
  const pos1 = b1?.position ?? b0.position;
  const a = frameAlpha(replay, i, t);
  return [
    b0.position.x + (pos1.x - b0.position.x) * a,
    b0.position.y + (pos1.y - b0.position.y) * a,
  ];
}

/** Ground-plane velocity [vx, vy] in UU/s from the chord across the bracketing frame pair. */
export function samplePlayerVelocityXY(
  replay: ReplayModel,
  track: ReplayPlayerTrack,
  t: number,
): [number, number] | null {
  const i = frameIndexAt(replay, t);
  const t0 = replay.frames[i]?.time ?? 0;
  const t1 = replay.frames[i + 1]?.time ?? t0;
  const dt = t1 - t0;
  if (!(dt > 1e-6)) return null;
  const p0 = track.frames[i];
  const p1 = track.frames[i + 1];
  if (!p0?.position || !p1?.position) return null;
  if (p0.isPresent === false || p1.isPresent === false) return null;
  return [(p1.position.x - p0.position.x) / dt, (p1.position.y - p0.position.y) / dt];
}

/** Boost 0..100 at time t (RLVision's `getBoostAt` scale). */
export function sampleBoost(replay: ReplayModel, track: ReplayPlayerTrack, t: number): number {
  const i = frameIndexAt(replay, t);
  const frame = track.frames[i];
  return (frame?.boostFraction ?? 0) * 100;
}

/** y of the team's own goal for a track (team zero / blue defends -y). */
export function ownGoalY(track: ReplayPlayerTrack): number {
  return track.isTeamZero ? -FIELD_HALF_Y_UU : FIELD_HALF_Y_UU;
}

/** Pad availability at t from its event list; no event at-or-before t = available. */
export function isPadActiveAt(pad: ReplayBoostPad, t: number): boolean {
  const events = pad.events;
  let available = true;
  for (let i = 0; i < events.length; i++) {
    if (events[i].time > t) break;
    available = events[i].available;
  }
  return available;
}

/**
 * True if the pad is collected (an available→false event) anywhere in
 * (t0, t1] — pads on the field at the rewind-land frame that won't survive
 * the rewound span should not be routed to.
 */
export function padCollectedBetween(pad: ReplayBoostPad, t0: number, t1: number): boolean {
  for (const event of pad.events) {
    if (event.time <= t0) continue;
    if (event.time > t1) break;
    if (!event.available) return true;
  }
  return false;
}

/** Track index by display name (case-insensitive), or -1. */
export function trackIndexByName(replay: ReplayModel, name: string | null | undefined): number {
  const target = String(name ?? "")
    .trim()
    .toLowerCase();
  if (!target) return -1;
  for (let i = 0; i < replay.players.length; i++) {
    if (replay.players[i].name.trim().toLowerCase() === target) return i;
  }
  return -1;
}
