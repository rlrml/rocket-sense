// Tour-scan tests: the whole-replay `_findActiveMistake` restoration. Frames
// are simulated the way the tour plugin drives the pure state machine —
// advanceTour once per frame with the playhead position and the attached
// director's engaged flag — and the director lifecycle actions are asserted.

import { describe, expect, it } from "vitest";
import { mistakeCinematicAfter, type CinematicMistake } from "../constants";
import {
  abortTour,
  advanceTour,
  createTourState,
  markerFraction,
  markerJumpTarget,
  MARKER_JUMP_PREROLL_SEC,
  rearmTour,
  scanActiveMistake,
  tourWindowEnd,
  tourWindowStart,
  type TourAction,
} from "../tourScan";

function mistake(
  kind: string,
  time: number,
  overrides: Partial<CinematicMistake> = {},
): CinematicMistake {
  return {
    kind,
    time,
    t_start: time - 0.5,
    t_end: time + 0.5,
    player: "P",
    ...overrides,
  };
}

// Windows (time ± before/after): bang_with_time 0.4/0.75,
// too_far_from_play 1.5/0.8, poor_landing 0.75/0.25, double_committing 0.8/2.1.
const bang = mistake("bang_with_time", 10);
const tooFar = mistake("too_far_from_play", 30);
const landing = mistake("poor_landing", 50);

function frame(
  state: ReturnType<typeof createTourState>,
  t: number,
  options: { engaged?: boolean; playing?: boolean; enabled?: boolean } = {},
): TourAction[] {
  return advanceTour(state, {
    t,
    engaged: options.engaged ?? false,
    playing: options.playing ?? true,
    enabled: options.enabled ?? true,
  });
}

describe("createTourState", () => {
  it("sorts mistakes by time regardless of input order", () => {
    const state = createTourState([landing, bang, tooFar]);
    expect(state.entries.map((entry) => entry.mistake.time)).toEqual([10, 30, 50]);
  });
});

describe("scanActiveMistake", () => {
  it("finds the mistake whose window contains t and skips consumed ones", () => {
    const state = createTourState([bang, tooFar, landing]);
    expect(scanActiveMistake(state, 5)).toBe(-1);
    expect(scanActiveMistake(state, 10)).toBe(0);
    expect(scanActiveMistake(state, 29)).toBe(1); // too_far window opens at 28.5
    state.entries[1].consumed = true;
    expect(scanActiveMistake(state, 29)).toBe(-1);
  });

  it("resolves overlapping windows to the first by time", () => {
    const a = mistake("bang_with_time", 10);
    const b = mistake("poor_landing", 10.5); // window [9.75, 10.75] overlaps a's [9.6, 10.75]
    const state = createTourState([b, a]);
    expect(scanActiveMistake(state, 10.2)).toBe(0);
    state.entries[0].consumed = true;
    expect(scanActiveMistake(state, 10.2)).toBe(1);
  });
});

describe("advanceTour", () => {
  it("attaches on window entry, hands back after completion, fires each once per pass", () => {
    const state = createTourState([bang, tooFar]);
    // Before any window: nothing.
    expect(frame(state, 5)).toEqual([]);
    // Entering bang's window attaches its director.
    expect(frame(state, 9.7)).toEqual([{ type: "attach", index: 0 }]);
    // The director engages and owns the clock; the scan stands down.
    expect(frame(state, 9.9, { engaged: true })).toEqual([]);
    // Engagement ends (cinematic done): consume + detach-completed.
    expect(frame(state, 10.2, { engaged: false })).toEqual([
      { type: "detach", index: 0, completed: true },
    ]);
    expect(state.entries[0].consumed).toBe(true);
    // Still inside bang's window: consumed blocks a re-fire.
    expect(frame(state, 10.5)).toEqual([]);
    // Past the window end the guard lifts, but the playhead has moved on.
    expect(frame(state, 11.0)).toEqual([]);
    expect(state.entries[0].consumed).toBe(false);
    // Dead air between mistakes: nothing attached.
    expect(frame(state, 20)).toEqual([]);
    // The second mistake fires on its own window entry.
    expect(frame(state, 28.6)).toEqual([{ type: "attach", index: 1 }]);
  });

  it("suspends the scan during a rewind through an earlier mistake's window", () => {
    const state = createTourState([bang, tooFar]);
    // bang toured and passed.
    frame(state, 9.7);
    frame(state, 9.9, { engaged: true });
    frame(state, 10.2, { engaged: false });
    frame(state, 11.0);
    // too_far attaches and engages...
    expect(frame(state, 28.6)).toEqual([{ type: "attach", index: 1 }]);
    frame(state, 28.8, { engaged: true });
    // ...and its rewind drags the playhead back inside bang's (re-armed)
    // window. Engaged directors own the clock: no actions, no re-trigger.
    expect(frame(state, 10.1, { engaged: true })).toEqual([]);
    expect(frame(state, 9.8, { engaged: true })).toEqual([]);
    expect(state.activeIndex).toBe(1);
    // Completion hands back with the playhead outside every window (the
    // rewound reveal ends around t≈28): detach only, nothing chains.
    expect(frame(state, 28.0, { engaged: false })).toEqual([
      { type: "detach", index: 1, completed: true },
    ]);
    expect(state.entries[1].consumed).toBe(true);
  });

  it("keeps a rewound-before-window consumed guard until the playhead passes the end", () => {
    const state = createTourState([tooFar]);
    frame(state, 28.6);
    frame(state, 28.8, { engaged: true });
    // Cinematic completes with the playhead rewound BEFORE the window start
    // (too_far rewinds to the path anchor).
    frame(state, 27.0, { engaged: false });
    expect(state.entries[0].consumed).toBe(true);
    // Walking forward back into the window must not re-fire...
    expect(frame(state, 28.6)).toEqual([]);
    expect(frame(state, 30.0)).toEqual([]);
    expect(state.entries[0].consumed).toBe(true);
    // ...until past the window end (30.8), where the guard lifts.
    expect(frame(state, 30.9)).toEqual([]);
    expect(state.entries[0].consumed).toBe(false);
  });

  it("detaches a never-engaged director on window exit without consuming", () => {
    const state = createTourState([landing]);
    // poor_landing is default-family: the director slow-mos but never engages.
    expect(frame(state, 49.3)).toEqual([{ type: "attach", index: 0 }]);
    expect(frame(state, 49.5)).toEqual([]);
    expect(frame(state, 50.3)).toEqual([{ type: "detach", index: 0, completed: false }]);
    expect(state.entries[0].consumed).toBe(false);
  });

  it("chains back-to-back into an overlapping window after completion", () => {
    const a = mistake("bang_with_time", 10);
    const b = mistake("double_committing", 10.6); // window [9.8, 12.7]
    const state = createTourState([a, b]);
    frame(state, 9.7);
    frame(state, 9.9, { engaged: true });
    // a completes at 10.2, still inside b's window: the same frame attaches b.
    expect(frame(state, 10.2, { engaged: false })).toEqual([
      { type: "detach", index: 0, completed: true },
      { type: "attach", index: 1 },
    ]);
    expect(state.activeIndex).toBe(1);
  });

  it("never scans while disabled or paused, but still releases guards", () => {
    const state = createTourState([bang]);
    expect(frame(state, 10, { enabled: false })).toEqual([]);
    expect(frame(state, 10, { playing: false })).toEqual([]);
    state.entries[0].consumed = true;
    frame(state, 11.0, { enabled: false });
    expect(state.entries[0].consumed).toBe(false);
  });
});

describe("abort + re-arm (external seek)", () => {
  it("aborts the active director and re-arms every consumed guard", () => {
    const state = createTourState([bang, tooFar]);
    frame(state, 9.7);
    frame(state, 9.9, { engaged: true });
    frame(state, 10.2, { engaged: false }); // bang consumed
    frame(state, 28.6); // too_far attached
    expect(abortTour(state)).toEqual([{ type: "detach", index: 1, completed: false }]);
    expect(state.activeIndex).toBe(-1);
    rearmTour(state);
    expect(state.entries.every((entry) => !entry.consumed)).toBe(true);
    // Scrubbing back into bang's window replays its cinematic.
    expect(frame(state, 9.7)).toEqual([{ type: "attach", index: 0 }]);
  });

  it("abort without re-arm (user pause) keeps consumed guards", () => {
    const state = createTourState([bang]);
    frame(state, 9.7);
    frame(state, 9.9, { engaged: true });
    frame(state, 10.2, { engaged: false });
    expect(state.entries[0].consumed).toBe(true);
    abortTour(state);
    expect(state.entries[0].consumed).toBe(true);
  });
});

describe("timeline marker math", () => {
  it("positions markers as time / duration, clamped", () => {
    expect(markerFraction(mistake("poor_landing", 50), 200)).toBeCloseTo(0.25, 10);
    expect(markerFraction(mistake("poor_landing", 250), 200)).toBe(1);
    expect(markerFraction(mistake("poor_landing", 50), 0)).toBe(0);
  });

  it("jumps to just before the cinematic window", () => {
    // too_far window opens at time - 1.5.
    expect(markerJumpTarget(tooFar)).toBeCloseTo(30 - 1.5 - MARKER_JUMP_PREROLL_SEC, 10);
    // Clamped at the start of the replay.
    expect(markerJumpTarget(mistake("too_far_from_play", 1))).toBe(0);
  });

  it("window helpers mirror the per-kind cinematic window", () => {
    expect(tourWindowStart(bang)).toBeCloseTo(9.6, 10);
    expect(tourWindowEnd(bang)).toBeCloseTo(10 + mistakeCinematicAfter(bang), 10);
  });
});
