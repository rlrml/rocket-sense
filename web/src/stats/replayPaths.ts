// Shared helpers for turning a parsed replay into projected 2D paths, used by the
// kickoff and goal "shape" diagrams. Both walk the same frame-indexed ball/player
// tracks, downsample them, and project each sample onto the field via a
// FieldProjection — only what they emphasize (taker/support vs. scorer) differs.

import type { ReplayModel } from "@rlrml/viewer";
import type { FieldProjection } from "./kickoffField";

export interface PathPoint {
  x: number;
  y: number;
}

type PlayerTrack = ReplayModel["players"][number];

/** A player descriptor that can be matched against a replay track. */
export interface PathPlayerRef {
  playerKey: string | null;
  playerName: string;
}

export function round(value: number): number {
  return Math.round(value * 10) / 10;
}

export function clampFrame(frame: number, frameCount: number): number {
  if (!Number.isFinite(frame)) return 0;
  return Math.min(Math.max(Math.round(frame), 0), Math.max(0, frameCount - 1));
}

/** Render a list of projected points as an SVG polyline `points` string. */
export function pointsToString(points: PathPoint[]): string {
  return points.map((p) => `${round(p.x)},${round(p.y)}`).join(" ");
}

/** Sample a player's projected position from `from` to `to`, capped at `maxPoints`. */
export function samplePath(
  track: PlayerTrack,
  from: number,
  to: number,
  projection: FieldProjection,
  maxPoints: number,
): PathPoint[] {
  const points: PathPoint[] = [];
  const step = Math.max(1, Math.floor((to - from) / maxPoints));
  for (let i = from; i <= to; i += step) {
    const sample = track.frames[i];
    const position = sample?.position;
    if (!position || sample?.isPresent === false) continue;
    points.push(projection.project(position.x, position.y));
  }
  return points;
}

/** Sample the ball's projected position from `from` to `to`, capped at `maxPoints`. */
export function sampleBallPath(
  replay: ReplayModel,
  from: number,
  to: number,
  projection: FieldProjection,
  maxPoints: number,
): PathPoint[] {
  const points: PathPoint[] = [];
  const step = Math.max(1, Math.floor((to - from) / maxPoints));
  for (let i = from; i <= to; i += step) {
    const position = replay.ballFrames[i]?.position;
    if (!position) continue;
    points.push(projection.project(position.x, position.y));
  }
  return points;
}

/** Find the descriptor matching a replay track, preferring id over name. */
export function matchPlayer<T extends PathPlayerRef>(track: PlayerTrack, players: T[]): T | null {
  const trackKeys = idKeys(track.id);
  const byKey = players.find((player) => {
    if (!player.playerKey) return false;
    const keys = idKeys(player.playerKey);
    return keys.some((key) => trackKeys.includes(key));
  });
  if (byKey) return byKey;
  const lowerName = track.name.trim().toLowerCase();
  return players.find((player) => player.playerName.trim().toLowerCase() === lowerName) ?? null;
}

// Reduce a remote id / player key to comparable tokens: the full lowercased
// string and the id portion after the platform prefix. Platform spellings differ
// between the replay tracks and the event payload, so the id suffix is the most
// reliable join key, with the full string as a fallback.
export function idKeys(value: string): string[] {
  const lower = value.trim().toLowerCase();
  const colon = lower.indexOf(":");
  return colon >= 0 ? [lower, lower.slice(colon + 1)] : [lower];
}
