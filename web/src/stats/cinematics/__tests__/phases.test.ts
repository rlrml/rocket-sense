// Phase-machine tests: walk each cinematic family through its full timeline
// the way the director does (advance phase, apply transitions, integrate the
// clock by dt × effectiveSpeed, with the rewind owning the clock) and assert
// the phase order, transitions, speed curve, and guards match viewer.js.

import { describe, expect, it } from "vitest";
import {
  AW_PHASE_BANG_POST_HIT_GAME_SEC,
  AW_PHASE_REWIND_SEC,
  AW_SLOW_SPEED,
  type CinematicMistake,
} from "../constants";
import { smootherstep01 } from "../math";
import {
  abortAwState,
  advancePhase,
  calloutPhaseView,
  cinematicClipWindow,
  cinematicOwnsCamera,
  createAwState,
  effectiveSpeed,
  inMistakeWindow,
  type AwContext,
  type AwPhase,
  type AwState,
  type AwTransition,
} from "../phases";

interface SimResult {
  phases: AwPhase[];
  transitions: AwTransition[];
  /** time → effective speed samples keyed by phase. */
  speedByPhase: Map<AwPhase, number[]>;
  finalTime: number;
  aw: AwState;
}

function simulate(
  m: CinematicMistake,
  options: {
    startTime: number;
    seconds: number;
    dt?: number;
    base?: number;
    hasTeammate?: boolean;
    birdsRewindTarget?: number | null;
  },
): SimResult {
  const dt = options.dt ?? 0.05;
  const base = options.base ?? 1;
  const aw = createAwState();
  const ctx: AwContext = {
    currentTime: options.startTime,
    hasTeammate: () => options.hasTeammate ?? false,
    birdsRewindTarget: () => options.birdsRewindTarget ?? null,
  };
  const phases: AwPhase[] = [];
  const transitions: AwTransition[] = [];
  const speedByPhase = new Map<AwPhase, number[]>();
  let time = options.startTime;
  let prevPhase: AwPhase = aw.phase;
  const steps = Math.round(options.seconds / dt);
  for (let i = 0; i < steps; i++) {
    ctx.currentTime = time;
    const emitted = advancePhase(aw, m, ctx, dt);
    for (const tr of emitted) {
      transitions.push(tr);
      if (tr.type === "snap_time") time = tr.time;
    }
    if (aw.phase !== prevPhase) {
      phases.push(aw.phase);
      prevPhase = aw.phase;
    }
    if (aw.phase === "rewind") {
      const a = smootherstep01(aw.phaseElapsed / AW_PHASE_REWIND_SEC);
      time = aw.rewindFromTime + (aw.rewindToTime - aw.rewindFromTime) * a;
    } else {
      const speed = effectiveSpeed(aw, m, base, time);
      const samples = speedByPhase.get(aw.phase) ?? [];
      samples.push(speed);
      speedByPhase.set(aw.phase, samples);
      time += dt * speed;
    }
  }
  return { phases, transitions, speedByPhase, finalTime: time, aw };
}

function transitionTypes(transitions: AwTransition[]): string[] {
  return transitions.map((t) => t.type);
}

describe("default family", () => {
  const m: CinematicMistake = {
    kind: "poor_landing",
    time: 10,
    t_start: 9.5,
    t_end: 10.5,
    player: "P",
  };
  it("never engages the phase machine and slow-mos only inside the window", () => {
    const result = simulate(m, { startTime: 8.5, seconds: 4 });
    expect(result.phases).toEqual([]);
    expect(result.aw.phase).toBe("idle");
    const idleSpeeds = result.speedByPhase.get("idle")!;
    expect(Math.min(...idleSpeeds)).toBe(AW_SLOW_SPEED);
    expect(Math.max(...idleSpeeds)).toBe(1);
    // Window is [time - 0.75, time + 0.25] for poor_landing.
    expect(inMistakeWindow(m, 9.24)).toBe(false);
    expect(inMistakeWindow(m, 9.26)).toBe(true);
    expect(inMistakeWindow(m, 10.26)).toBe(false);
  });
});

describe("bang family (bang_with_time)", () => {
  const m: CinematicMistake = {
    kind: "bang_with_time",
    time: 10,
    t_start: 9.4,
    t_end: 11,
    player: "P",
  };
  it("runs slow → decel → freeze beat → sideview arc → done and lands on the freeze target", () => {
    const result = simulate(m, { startTime: 9.0, seconds: 16 });
    expect(result.phases).toEqual([
      "slow",
      "bang_decel",
      "bang_wait",
      "bang_pan_in",
      "bang_hold",
      "bang_pan_out",
      "done",
      "idle",
    ]);
    // The decel snaps the playhead exactly onto m.time + post-hit carry.
    const snap = result.transitions.find((t) => t.type === "snap_time");
    expect(snap && snap.type === "snap_time" ? snap.time : NaN).toBeCloseTo(
      m.time + AW_PHASE_BANG_POST_HIT_GAME_SEC,
      10,
    );
    // Pose latched right after the snap for the frozen wait.
    expect(transitionTypes(result.transitions)).toEqual(["snap_time", "capture_pose"]);
    // Playback is fully frozen through the freeze beat and the sideview arc.
    for (const phase of ["bang_wait", "bang_pan_in", "bang_hold", "bang_pan_out"] as const) {
      expect(result.speedByPhase.get(phase)!.every((s) => s === 0)).toBe(true);
    }
    // The decel ramps monotonically from slow speed toward zero.
    const decel = result.speedByPhase.get("bang_decel")!;
    expect(decel[0]).toBeLessThanOrEqual(AW_SLOW_SPEED);
    for (let i = 1; i < decel.length; i++) {
      expect(decel[i]).toBeLessThanOrEqual(decel[i - 1] + 1e-9);
    }
    expect(decel[decel.length - 1]).toBeLessThan(0.02);
    expect(result.aw.consumed).toBe(false); // cleared when the playhead left the window
  });
});

describe("teammate family (waiting_to_challenge)", () => {
  const m: CinematicMistake = {
    kind: "waiting_to_challenge",
    time: 30,
    t_start: 29.5,
    t_end: 31,
    player: "P",
  };
  it("pans to the teammate with no rewind and returns via unpan", () => {
    const result = simulate(m, { startTime: 29.0, seconds: 18, hasTeammate: true });
    expect(result.phases).toEqual([
      "slow",
      "wtc_pan",
      "wtc_teammate",
      "wtc_aftermath",
      "wtc_unpan",
      "done",
      "idle",
    ]);
    expect(transitionTypes(result.transitions)).toEqual([
      "capture_pose",
      "attach_teammate",
      "capture_pose",
      "attach_focus",
    ]);
    // wtc_teammate runs at slow speed; the aftermath has left the window by
    // then so it plays out at 1x.
    expect(result.speedByPhase.get("wtc_teammate")!.every((s) => s === AW_SLOW_SPEED)).toBe(true);
    expect(result.speedByPhase.get("wtc_aftermath")!.every((s) => s === 1)).toBe(true);
  });
  it("does not engage without a resolvable teammate", () => {
    const result = simulate(m, { startTime: 29.0, seconds: 4, hasTeammate: false });
    expect(result.phases).toEqual([]);
    // ...but the window still slow-mos like the default family.
    expect(result.speedByPhase.get("idle")!.some((s) => s === AW_SLOW_SPEED)).toBe(true);
  });
});

describe("teammate family (double_committing)", () => {
  const m: CinematicMistake = {
    kind: "double_committing",
    time: 40,
    t_start: 39.5,
    t_end: 41,
    player: "P",
    with_player: "T",
  };
  it("rewinds 1.5s, freezes on the teammate POV, then plays real-time", () => {
    const result = simulate(m, { startTime: 39.0, seconds: 20, hasTeammate: true });
    expect(result.phases).toEqual([
      "slow",
      "rewind",
      "wtc_pan",
      "post_rewind",
      "wtc_teammate",
      "wtc_aftermath",
      "wtc_unpan",
      "done",
      "idle",
    ]);
    const types = transitionTypes(result.transitions);
    expect(types).toEqual([
      "begin_rewind",
      "snap_time",
      "capture_pose",
      "attach_teammate",
      "capture_pose",
      "attach_focus",
    ]);
    const rewind = result.transitions.find((t) => t.type === "begin_rewind");
    expect(rewind && rewind.type === "begin_rewind" ? rewind.to : NaN).toBeCloseTo(38.5, 10);
    // Slow phase decays to zero before the rewind (willRewind decel tail).
    const slow = result.speedByPhase.get("slow")!;
    expect(slow[slow.length - 1]).toBeLessThan(0.02);
    // post_rewind freezes; teammate POV then runs at base speed (1x).
    expect(result.speedByPhase.get("post_rewind")!.every((s) => s === 0)).toBe(true);
    expect(result.speedByPhase.get("wtc_teammate")!.every((s) => s === 1)).toBe(true);
    expect(result.speedByPhase.get("wtc_aftermath")!.every((s) => s === 1)).toBe(true);
  });
});

describe("bird's-eye family (too_far_from_play)", () => {
  const m: CinematicMistake = {
    kind: "too_far_from_play",
    time: 20,
    t_start: 19,
    t_end: 22,
    player: "P",
  };
  it("rewinds to the path anchor and freezes game time through the reveal", () => {
    const result = simulate(m, {
      startTime: 18.0,
      seconds: 16,
      birdsRewindTarget: 16.5,
    });
    expect(result.phases).toEqual([
      "slow",
      "rewind",
      "hold",
      "zoom_out",
      "birds",
      "zoom_in",
      "done",
      "idle",
    ]);
    expect(transitionTypes(result.transitions)).toEqual([
      "begin_rewind",
      "snap_time",
      "capture_pose",
    ]);
    // Game time frozen through hold + zoom_out + birds so route pads survive.
    for (const phase of ["hold", "zoom_out", "birds"] as const) {
      expect(result.speedByPhase.get(phase)!.every((s) => s === 0)).toBe(true);
    }
    expect(result.speedByPhase.get("zoom_in")!.every((s) => s === AW_SLOW_SPEED)).toBe(true);
    // The rewind dumped the playhead before the window: the consumed guard
    // must survive the idle re-entry until the playhead passes the window end.
    expect(result.aw.consumed).toBe(true);
    expect(result.aw.consumedEnd).toBeCloseTo(20.8, 10);
  });
  it("re-arms only after the playhead passes the consumed window end", () => {
    const aw = createAwState();
    aw.consumed = true;
    aw.consumedEnd = 20.8;
    const ctx: AwContext = {
      currentTime: 19.0, // inside the window, before consumedEnd
      hasTeammate: () => false,
      birdsRewindTarget: () => null,
    };
    advancePhase(aw, m, ctx, 0.05);
    expect(aw.phase).toBe("idle"); // blocked
    ctx.currentTime = 20.9;
    advancePhase(aw, m, ctx, 0.05);
    expect(aw.consumed).toBe(false);
    ctx.currentTime = 19.0;
    advancePhase(aw, m, ctx, 0.05);
    expect(aw.phase).toBe("slow"); // re-armed after a fresh approach
  });
  it("skips the rewind when no path resolves", () => {
    const result = simulate(m, { startTime: 18.0, seconds: 14, birdsRewindTarget: null });
    expect(result.phases).toEqual(["slow", "zoom_out", "birds", "zoom_in", "done", "idle"]);
  });
});

describe("calloutPhaseView", () => {
  const m: CinematicMistake = {
    kind: "too_far_from_play",
    time: 20,
    t_start: 19,
    t_end: 22,
    player: "P",
  };
  function stateIn(phase: AwPhase, active = true): AwState {
    const aw = createAwState();
    aw.phase = phase;
    aw.active = active;
    return aw;
  }
  it("tears the callout down through rewind/hold/zoom_in and pan phases", () => {
    for (const phase of ["rewind", "hold", "zoom_in", "wtc_pan", "wtc_unpan"] as const) {
      expect(calloutPhaseView(stateIn(phase), m, 20)).toBeNull();
    }
  });
  it("renders chevrons without a textbox during zoom_out, both during birds", () => {
    const zoomOut = calloutPhaseView(stateIn("zoom_out"), m, 20)!;
    expect(zoomOut.showChevrons).toBe(true);
    expect(zoomOut.textboxHidden).toBe(true);
    const birds = calloutPhaseView(stateIn("birds"), m, 20)!;
    expect(birds.showChevrons).toBe(true);
    expect(birds.textboxHidden).toBe(false);
    expect(birds.message).toBe("birds_path");
    expect(birds.dotHidden).toBe(true);
  });
  it("swaps to the teammate/bang copy in their phases", () => {
    const wtc: CinematicMistake = { ...m, kind: "waiting_to_challenge" };
    const tmView = calloutPhaseView(stateIn("wtc_teammate"), wtc, 20)!;
    expect(tmView.message).toBe("teammate_switch");
    expect(tmView.anchorTeammate).toBe(true);
    const dc: CinematicMistake = { ...m, kind: "double_committing" };
    expect(calloutPhaseView(stateIn("post_rewind"), dc, 20)!.message).toBe("teammate_switch");
    const bang: CinematicMistake = { ...m, kind: "bang_with_time" };
    expect(calloutPhaseView(stateIn("bang_hold"), bang, 20)!.message).toBe("bang_pause");
    expect(calloutPhaseView(stateIn("bang_wait"), bang, 20)!.message).toBe("primary");
  });
  it("suppresses the post-cinematic second flash while consumed", () => {
    const aw = createAwState();
    aw.consumed = true;
    aw.consumedEnd = 20.8;
    expect(calloutPhaseView(aw, m, 20)).toBeNull(); // inside window, but consumed
    aw.consumed = false;
    expect(calloutPhaseView(aw, m, 20)).not.toBeNull();
  });
});

describe("cinematicClipWindow", () => {
  it("extends the loop window to the rewind's furthest reach", () => {
    const tooFar: CinematicMistake = {
      kind: "too_far_from_play",
      time: 20,
      t_start: 19,
      t_end: 22,
      player: "P",
    };
    const w = cinematicClipWindow(tooFar);
    // t_start - 2.5 (rewind floor) - 0.25 margin.
    expect(w.start).toBeCloseTo(16.25, 10);
    expect(w.end).toBe(22);
    const pads: CinematicMistake = {
      kind: "pick_up_small_pads",
      time: 20,
      t_start: 19.3,
      t_end: 20.7,
      player: "P",
    };
    expect(cinematicClipWindow(pads).start).toBeCloseTo(15.75, 10);
    const dc: CinematicMistake = {
      kind: "double_committing",
      time: 20,
      t_start: 19.5,
      t_end: 20.5,
      player: "P",
    };
    // time + after (2.1) exceeds t_end.
    expect(cinematicClipWindow(dc).end).toBeCloseTo(22.1, 10);
    expect(cinematicClipWindow(dc).start).toBeCloseTo(18.25, 10);
  });
});

describe("abortAwState", () => {
  const m: CinematicMistake = {
    kind: "bang_with_time",
    time: 10,
    t_start: 9.4,
    t_end: 11,
    player: "P",
  };
  it("cancels a mid-flight cinematic, clears the consumed guard, and reports it", () => {
    // 2 sim-seconds from 9.0 leaves the machine mid-flight (past `slow`,
    // before the sideview arc completes).
    const result = simulate(m, { startTime: 9.0, seconds: 2 });
    expect(result.aw.phase).not.toBe("idle");
    expect(result.aw.phase).not.toBe("done");
    expect(abortAwState(result.aw)).toBe(true);
    expect(result.aw.phase).toBe("done");
    expect(result.aw.phaseElapsed).toBe(0);
    expect(result.aw.consumed).toBe(false);
    expect(result.aw.consumedEnd).toBe(0);
  });
  it("is a no-op report on an idle machine but still re-arms the guards", () => {
    const aw = createAwState();
    aw.consumed = true;
    aw.consumedEnd = 12;
    expect(abortAwState(aw)).toBe(false);
    expect(aw.phase).toBe("idle");
    expect(aw.consumed).toBe(false);
    expect(aw.consumedEnd).toBe(0);
  });
});

describe("cinematicOwnsCamera", () => {
  it("claims the camera exactly for the self-driven phases", () => {
    const owning: AwPhase[] = [
      "wtc_pan",
      "wtc_unpan",
      "birds",
      "zoom_out",
      "zoom_in",
      "bang_wait",
      "bang_pan_in",
      "bang_hold",
      "bang_pan_out",
    ];
    for (const phase of owning) expect(cinematicOwnsCamera(phase)).toBe(true);
    // Follow-cam phases: the player's camera plugin keeps driving.
    for (const phase of ["idle", "done", "slow", "rewind", "wtc_teammate"] as AwPhase[]) {
      expect(cinematicOwnsCamera(phase)).toBe(false);
    }
  });
});
