// Sampler + teammate-resolution + copy tests over synthetic replays.

import { describe, expect, it } from "vitest";
import type { CinematicMistake } from "../constants";
import { TEAMMATE_SWITCH_MSG_DC_ANGLE, TEAMMATE_SWITCH_MSG_DC_CLOSER } from "../constants";
import { doubleCommitSwitchMessage } from "../copy";
import {
  isPadActiveAt,
  ownGoalY,
  padCollectedBetween,
  sampleBallXY,
  samplePlayerVelocityXY,
  samplePlayerXY,
} from "../sampling";
import { findBehindTeammateIdx, findDoubleCommitTeammateIdx } from "../teammate";
import { makePad, makeReplay } from "./fixtures";

describe("sampling", () => {
  const replay = makeReplay({
    durationSeconds: 10,
    tracks: [
      { id: "a", name: "A", isTeamZero: true, positionAt: (t) => ({ x: 100 * t, y: -1000 }) },
    ],
    ballAt: (t) => ({ x: 0, y: 500 * t }),
  });
  it("interpolates player and ball positions between frames", () => {
    expect(samplePlayerXY(replay, replay.players[0], 2.05)![0]).toBeCloseTo(205, 6);
    expect(sampleBallXY(replay, 2.05)![1]).toBeCloseTo(1025, 6);
  });
  it("derives velocity from the bracketing frame chord", () => {
    const vel = samplePlayerVelocityXY(replay, replay.players[0], 2.05)!;
    expect(vel[0]).toBeCloseTo(100, 4);
    expect(vel[1]).toBeCloseTo(0, 4);
  });
  it("maps team zero to the -y goal", () => {
    expect(ownGoalY(replay.players[0])).toBe(-5120);
  });
  it("resolves pad availability from the event list", () => {
    const pad = makePad(0, 0, 0, "small", [
      { time: 5, frame: 50, available: false },
      { time: 9, frame: 90, available: true },
    ]);
    expect(isPadActiveAt(pad, 4.9)).toBe(true);
    expect(isPadActiveAt(pad, 5.0)).toBe(false);
    expect(isPadActiveAt(pad, 9.5)).toBe(true);
    expect(padCollectedBetween(pad, 4, 6)).toBe(true);
    expect(padCollectedBetween(pad, 6, 10)).toBe(false);
  });
});

describe("teammate resolution", () => {
  // Blue focus player at (0, 0); teammates behind (own-goal side, -y) and
  // ahead; an opponent nearby that must never be picked.
  const replay = makeReplay({
    durationSeconds: 10,
    tracks: [
      { id: "focus", name: "Focus", isTeamZero: true, positionAt: () => ({ x: 0, y: 0 }) },
      { id: "behind", name: "Behind", isTeamZero: true, positionAt: () => ({ x: 500, y: -2000 }) },
      { id: "ahead", name: "Ahead", isTeamZero: true, positionAt: () => ({ x: 0, y: 2000 }) },
      { id: "opp", name: "Opp", isTeamZero: false, positionAt: () => ({ x: 100, y: -500 }) },
    ],
  });
  const base: CinematicMistake = {
    kind: "waiting_to_challenge",
    time: 5,
    t_start: 4,
    t_end: 6,
    player: "Focus",
  };
  it("waiting_to_challenge picks the closest teammate on the own-goal side", () => {
    expect(findBehindTeammateIdx(replay, base, 0)).toBe(1);
  });
  it("double_committing honors with_player before the closest fallback", () => {
    const named: CinematicMistake = { ...base, kind: "double_committing", with_player: "Ahead" };
    expect(findDoubleCommitTeammateIdx(replay, named, 0)).toBe(2);
    const unnamed: CinematicMistake = { ...base, kind: "double_committing" };
    // Closest same-team player regardless of side (Ahead at 2000 vs Behind at ~2061).
    expect(findDoubleCommitTeammateIdx(replay, unnamed, 0)).toBe(2);
  });
});

describe("double_committing switch copy", () => {
  const m: CinematicMistake = {
    kind: "double_committing",
    time: 5,
    t_start: 4,
    t_end: 6,
    player: "Focus",
    with_player: "Mate",
  };
  it("uses the proximity copy only for an unambiguously closer teammate", () => {
    const closer = makeReplay({
      durationSeconds: 10,
      tracks: [
        { id: "focus", name: "Focus", isTeamZero: true, positionAt: () => ({ x: 0, y: -2000 }) },
        { id: "mate", name: "Mate", isTeamZero: true, positionAt: () => ({ x: 0, y: -500 }) },
      ],
      ballAt: () => ({ x: 0, y: 0 }),
    });
    expect(doubleCommitSwitchMessage(closer, m, 0, 1)).toBe(TEAMMATE_SWITCH_MSG_DC_CLOSER);
    const marginal = makeReplay({
      durationSeconds: 10,
      tracks: [
        { id: "focus", name: "Focus", isTeamZero: true, positionAt: () => ({ x: 0, y: -1000 }) },
        { id: "mate", name: "Mate", isTeamZero: true, positionAt: () => ({ x: 0, y: -700 }) },
      ],
      ballAt: () => ({ x: 0, y: 0 }),
    });
    expect(doubleCommitSwitchMessage(marginal, m, 0, 1)).toBe(TEAMMATE_SWITCH_MSG_DC_ANGLE);
  });
});
