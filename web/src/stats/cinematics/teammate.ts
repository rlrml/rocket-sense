// Cinematic teammate resolution — ports viewer.js `_findBehindTeammateIdx`,
// `_findDoubleCommitTeammateIdx`, and `_resolveCinematicTeammateIdx`. Indexes
// are into replay.players.

import type { ReplayModel } from "@rlrml/player";
import type { CinematicMistake } from "./constants";
import { ownGoalY, samplePlayerXY, trackIndexByName } from "./sampling";

function focusTrackIdx(replay: ReplayModel, m: CinematicMistake, focusIdx: number): number {
  if (focusIdx >= 0 && focusIdx < replay.players.length) return focusIdx;
  return trackIndexByName(replay, m.player);
}

/**
 * Same-team player closest to the focus player but on the own-goal side of
 * them at m.time — the teammate who would have received the ball had the
 * focus player challenged sooner (waiting_to_challenge).
 */
export function findBehindTeammateIdx(
  replay: ReplayModel,
  m: CinematicMistake,
  focusIdx: number,
): number {
  const fi = focusTrackIdx(replay, m, focusIdx);
  if (fi < 0) return -1;
  const focus = replay.players[fi];
  const peakT = m.time;
  const focusXY = samplePlayerXY(replay, focus, peakT);
  if (!focusXY) return -1;
  const oppDir = ownGoalY(focus) < 0 ? 1 : -1;
  let bestIdx = -1;
  let bestD = Infinity;
  for (let i = 0; i < replay.players.length; i++) {
    const cand = replay.players[i];
    if (i === fi) continue;
    if (cand.isTeamZero !== focus.isTeamZero) continue;
    const xy = samplePlayerXY(replay, cand, peakT);
    if (!xy) continue;
    // Candidate must sit goal-side of the focus player along the goal axis.
    if ((focusXY[1] - xy[1]) * oppDir <= 0) continue;
    const dx = xy[0] - focusXY[0];
    const dy = xy[1] - focusXY[1];
    const d = dx * dx + dy * dy;
    if (d < bestD) {
      bestD = d;
      bestIdx = i;
    }
  }
  return bestIdx;
}

/**
 * Same-team partner identified by m.with_player, with a closest-same-team
 * fallback at m.time — the teammate who already had the ball
 * (double_committing, bumping_teammate).
 */
export function findDoubleCommitTeammateIdx(
  replay: ReplayModel,
  m: CinematicMistake,
  focusIdx: number,
): number {
  const fi = focusTrackIdx(replay, m, focusIdx);
  if (fi < 0) return -1;
  const focus = replay.players[fi];
  if (m.with_player) {
    const named = trackIndexByName(replay, m.with_player);
    // Enforce the same invariants as the fallback below: the named track must
    // be a real teammate, not the focus player and not an opponent — a bad
    // `with_player` would otherwise pan the "teammate" camera to the wrong car.
    if (named >= 0 && named !== fi && replay.players[named].isTeamZero === focus.isTeamZero) {
      return named;
    }
  }
  const peakT = m.time;
  const focusXY = samplePlayerXY(replay, focus, peakT);
  if (!focusXY) return -1;
  let bestIdx = -1;
  let bestD = Infinity;
  for (let i = 0; i < replay.players.length; i++) {
    const cand = replay.players[i];
    if (i === fi) continue;
    if (cand.isTeamZero !== focus.isTeamZero) continue;
    const xy = samplePlayerXY(replay, cand, peakT);
    if (!xy) continue;
    const dx = xy[0] - focusXY[0];
    const dy = xy[1] - focusXY[1];
    const d = dx * dx + dy * dy;
    if (d < bestD) {
      bestD = d;
      bestIdx = i;
    }
  }
  return bestIdx;
}

export function resolveCinematicTeammateIdx(
  replay: ReplayModel,
  m: CinematicMistake,
  focusIdx: number,
): number {
  if (m.kind === "waiting_to_challenge") return findBehindTeammateIdx(replay, m, focusIdx);
  if (m.kind === "double_committing") return findDoubleCommitTeammateIdx(replay, m, focusIdx);
  if (m.kind === "bumping_teammate") return findDoubleCommitTeammateIdx(replay, m, focusIdx);
  return -1;
}
