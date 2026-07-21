// Path-router tests: the too_far support-spot route through active pads, the
// pick_up_small_pads trajectory sweep, and the chevron control-point
// conditioning (angle filter + Chaikin).

import { describe, expect, it } from "vitest";
import type { CinematicMistake } from "../constants";
import {
  buildChevronControlPoints,
  computeSmallPadsPath,
  computeTooFarPath,
  type MistakePath,
} from "../path";
import { makePad, makeReplay } from "./fixtures";

describe("computeTooFarPath", () => {
  // Blue focus camped deep at (0, -4000) driving up-field; ball ahead at
  // (0, 2000); a teammate on +x near the ball pushes the support spot to -x.
  const m: CinematicMistake = {
    kind: "too_far_from_play",
    time: 6.5,
    t_start: 6,
    t_end: 8,
    player: "Focus",
  };
  function buildReplay(pads = [makePad(0, -300, -1500, "small"), makePad(1, -700, 0, "small")]) {
    return makeReplay({
      durationSeconds: 12,
      tracks: [
        {
          id: "focus",
          name: "Focus",
          isTeamZero: true,
          positionAt: (t) => ({ x: 0, y: -4000 + 200 * t }),
        },
        { id: "mate", name: "Mate", isTeamZero: true, positionAt: () => ({ x: 1200, y: 1500 }) },
      ],
      ballAt: () => ({ x: 0, y: 2000 }),
      pads,
    });
  }
  it("targets a support spot goal-side of the ball, away from the teammate", () => {
    const path = computeTooFarPath(buildReplay(), m, 0)!;
    expect(path).not.toBeNull();
    // Goal-side: 2500uu behind the ball toward blue's own goal (-y).
    expect(path.target[1]).toBeLessThan(2000);
    // Lateral side opposite the closest teammate (+x → -x).
    expect(path.target[0]).toBeLessThan(0);
    // The rewind anchor sits LOOKBACK before the decision moment.
    expect(path.tAnchor).toBeCloseTo(m.t_start - 1.5, 10);
    // Active pads between player and target get routed.
    expect(path.waypoints.length).toBeGreaterThan(0);
    for (const w of path.waypoints) {
      expect(w.padIdx).toBeDefined();
    }
  });
  it("drops pads that get collected over the rewound span", () => {
    const collected = makePad(0, -300, -1500, "small", [
      { time: 5.0, frame: 50, available: false },
    ]);
    const path = computeTooFarPath(buildReplay([collected]), m, 0)!;
    expect(path.waypoints.some((w) => w.padIdx === 0)).toBe(false);
  });
});

describe("computeSmallPadsPath", () => {
  const m: CinematicMistake = {
    kind: "pick_up_small_pads",
    time: 8,
    t_start: 6.5,
    t_end: 8.5,
    player: "Focus",
  };
  it("sweeps active small pads near the actual trajectory, in order", () => {
    const replay = makeReplay({
      durationSeconds: 12,
      tracks: [
        {
          id: "focus",
          name: "Focus",
          isTeamZero: true,
          // Straight drive up +y from (0, -3000) to (0, 1000) over t 4..8.
          positionAt: (t) => ({ x: 0, y: -3000 + Math.max(0, Math.min(4, t - 4)) * 1000 }),
        },
      ],
      pads: [
        makePad(0, 200, -2000, "small"),
        makePad(1, -300, -500, "small"),
        makePad(2, 100, 500, "small"),
        makePad(3, 3000, 0, "small"), // too far off the run
        makePad(4, 0, -1000, "big"), // big pads are excluded for this kind
      ],
    });
    const path = computeSmallPadsPath(replay, m, 0)!;
    expect(path.waypoints.map((w) => w.padIdx)).toEqual([0, 1, 2]);
    // The path covers the trajectory's last 4 seconds; rewind pre-roll makes
    // the rewind land exactly at the path start.
    expect(path.tAnchor).toBeCloseTo(m.time - 3, 10);
    expect(path.leadIn).toBeNull();
  });
});

describe("buildChevronControlPoints", () => {
  const base: MistakePath = {
    start: [0, 0],
    leadIn: null,
    waypoints: [
      { x: 0, y: 1000, padIdx: 1 },
      { x: 0, y: 2000, padIdx: 2 },
    ],
    target: [0, 4000],
    tAnchor: 1,
    tDecision: 2,
  };
  it("keeps pad waypoints and appends the target for the routed kind", () => {
    const control = buildChevronControlPoints("too_far_from_play", base)!;
    expect(control.survivingWaypoints.map((w) => w.padIdx)).toEqual([1, 2]);
    // Chaikin smoothing preserves the endpoints.
    expect(control.points[0]).toEqual([0, 0]);
    expect(control.points[control.points.length - 1]).toEqual([0, 4000]);
  });
  it("drops a doubleback waypoint (turn > 90°) and its strobe entry", () => {
    const doubled: MistakePath = {
      ...base,
      waypoints: [
        { x: 0, y: 1000, padIdx: 1 },
        { x: 0, y: 600, padIdx: 2 }, // route doubles back through pad 1
      ],
    };
    // The angle filter removes the vertex carrying the sharp turn (pad 1);
    // the remaining route start → pad 2 → target is straight and survives.
    const control = buildChevronControlPoints("too_far_from_play", doubled)!;
    expect(control.survivingWaypoints.map((w) => w.padIdx)).toEqual([2]);
  });
  it("ends at the final pad for pick_up_small_pads (no trailing target)", () => {
    const control = buildChevronControlPoints("pick_up_small_pads", base)!;
    expect(control.points[control.points.length - 1]).toEqual([0, 2000]);
  });
});
