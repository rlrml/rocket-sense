// The analysis-walkthrough phase state machine — a pure port of viewer.js
// `_awAdvancePhase` / `_awEffectiveSpeed` / the phase logic of
// `_updateMistakeCallout`. viewer.js interleaved camera-pose captures and
// playhead writes with the phase switches; here those side effects are
// returned as an ordered `AwTransition[]` for the director to apply, which
// keeps this module free of THREE/player dependencies and unit-testable.
//
// One structural simplification: viewer.js scanned a whole-replay `_mistakes`
// list (`_findActiveMistake`); an EventClipPlayer cinematic dramatizes exactly
// one marker, so "the active mistake" is a window test against that marker.

import {
  AW_PHASE_BANG_DECEL_GAME_SEC,
  AW_PHASE_BANG_DECEL_SEC,
  AW_PHASE_BANG_HOLD_SEC,
  AW_PHASE_BANG_PAN_IN_SEC,
  AW_PHASE_BANG_PAN_OUT_SEC,
  AW_PHASE_BANG_POST_HIT_GAME_SEC,
  AW_PHASE_BANG_WAIT_SEC,
  AW_PHASE_BIRDS_SEC,
  AW_PHASE_DECEL_SEC,
  AW_PHASE_HOLD_SEC,
  AW_PHASE_POST_REWIND_SEC,
  AW_PHASE_REWIND_SEC,
  AW_PHASE_WTC_PAN_SEC,
  AW_PHASE_ZOOM_SEC,
  AW_SLOW_SPEED,
  awAftermathSec,
  awSlowSec,
  awWtcSec,
  MISTAKE_CALLOUT_MSG,
  mistakeCinematicAfter,
  mistakeCinematicBefore,
  type CinematicMistake,
} from "./constants";
import { smoothstep01 } from "./math";

export type AwPhase =
  | "idle"
  | "slow"
  | "rewind"
  | "hold"
  | "post_rewind"
  | "zoom_out"
  | "birds"
  | "zoom_in"
  | "wtc_pan"
  | "wtc_teammate"
  | "wtc_aftermath"
  | "wtc_unpan"
  | "bang_decel"
  | "bang_wait"
  | "bang_pan_in"
  | "bang_hold"
  | "bang_pan_out"
  | "done";

export type CinematicFamily = "birds" | "teammate" | "bang" | "default";

export function familyOf(kind: string): CinematicFamily {
  if (kind === "too_far_from_play" || kind === "pick_up_small_pads") return "birds";
  if (kind === "waiting_to_challenge" || kind === "double_committing") return "teammate";
  if (kind === "bang_with_time") return "bang";
  return "default";
}

export interface AwState {
  phase: AwPhase;
  phaseElapsed: number;
  /** True from the phase-machine engaging the mistake until reset. */
  active: boolean;
  /**
   * Set when a cinematic finishes; blocks idle from re-engaging while the
   * playhead is still inside — or gets rewound back into — the same window.
   */
  consumed: boolean;
  /** Absolute game-time the playhead must pass before `consumed` clears. */
  consumedEnd: number;
  rewindFromTime: number;
  rewindToTime: number;
}

export function createAwState(): AwState {
  return {
    phase: "idle",
    phaseElapsed: 0,
    active: false,
    consumed: false,
    consumedEnd: 0,
    rewindFromTime: 0,
    rewindToTime: 0,
  };
}

/** Ordered side effects the director applies on a phase switch. */
export type AwTransition =
  | { type: "capture_pose" }
  | { type: "begin_rewind"; from: number; to: number }
  | { type: "snap_time"; time: number }
  | { type: "attach_teammate" }
  | { type: "attach_focus" };

export interface AwContext {
  currentTime: number;
  /** Whether a cinematic teammate resolves for this mistake (teammate family gate). */
  hasTeammate(): boolean;
  /**
   * Rewind target for the bird's-eye kinds: `path.tAnchor - 1` (1s of
   * pre-roll before the chevrons begin), or null when no path computed.
   */
  birdsRewindTarget(): number | null;
}

export function inMistakeWindow(m: CinematicMistake, t: number): boolean {
  if (!MISTAKE_CALLOUT_MSG[m.kind]) return false;
  const ts = m.time - mistakeCinematicBefore(m);
  const te = m.time + mistakeCinematicAfter(m);
  return t >= ts && t <= te;
}

function markConsumed(aw: AwState, m: CinematicMistake): void {
  aw.consumed = true;
  aw.consumedEnd = m.time + mistakeCinematicAfter(m);
}

function beginWtcPan(aw: AwState, out: AwTransition[]): void {
  out.push({ type: "capture_pose" }, { type: "attach_teammate" });
  aw.phase = "wtc_pan";
  aw.phaseElapsed = 0;
}

function beginWtcUnpan(aw: AwState, out: AwTransition[]): void {
  out.push({ type: "capture_pose" }, { type: "attach_focus" });
  aw.phase = "wtc_unpan";
  aw.phaseElapsed = 0;
}

/**
 * Advance the phase machine by dt (real seconds). Mirrors `_awAdvancePhase`:
 * once started, a cinematic runs to "done" regardless of window exit; "done"
 * waits for window exit to re-arm.
 */
export function advancePhase(
  aw: AwState,
  m: CinematicMistake,
  ctx: AwContext,
  dt: number,
): AwTransition[] {
  const out: AwTransition[] = [];
  const family = familyOf(m.kind);
  if (aw.phase === "idle") {
    // Re-arm only once the playhead has actually moved PAST the consumed
    // window: the rewind can land before the window, and time would then walk
    // forward back into it and re-fire forever.
    if (aw.consumed && ctx.currentTime > aw.consumedEnd) {
      aw.consumed = false;
      aw.consumedEnd = 0;
    }
    if (!inMistakeWindow(m, ctx.currentTime)) return out;
    if (family === "default") return out;
    if (family === "teammate" && !ctx.hasTeammate()) return out;
    if (aw.consumed) return out;
    aw.active = true;
    aw.phase = "slow";
    aw.phaseElapsed = 0;
    return out;
  }
  if (aw.phase === "done") {
    // Sit in "done" until the playhead leaves the window, then re-arm.
    if (!inMistakeWindow(m, ctx.currentTime)) resetAwState(aw);
    return out;
  }
  aw.phaseElapsed += dt;
  // bang_with_time: bail from slow into the decel the instant the playhead
  // reaches the freeze-entry threshold (before the normal slow-end branch).
  if (
    aw.phase === "slow" &&
    m.kind === "bang_with_time" &&
    ctx.currentTime >= m.time + AW_PHASE_BANG_POST_HIT_GAME_SEC - AW_PHASE_BANG_DECEL_GAME_SEC
  ) {
    aw.phase = "bang_decel";
    aw.phaseElapsed = 0;
    return out;
  }
  if (aw.phase === "slow" && aw.phaseElapsed >= awSlowSec(m)) {
    if (m.kind === "bang_with_time") {
      // Safety net: slow timed out before the decel zone — decel anyway.
      aw.phase = "bang_decel";
      aw.phaseElapsed = 0;
      return out;
    }
    if (family === "teammate") {
      if (m.kind === "waiting_to_challenge") {
        // No rewind: the missed challenge already played at focus POV.
        beginWtcPan(aw, out);
        return out;
      }
      // double_committing: rewind 1.5s to the teammate-already-had-it moment.
      const rewindTo = Math.max(0, m.time - 1.5);
      if (rewindTo < ctx.currentTime - 0.05) {
        aw.rewindFromTime = ctx.currentTime;
        aw.rewindToTime = rewindTo;
        aw.phase = "rewind";
        aw.phaseElapsed = 0;
        out.push({ type: "begin_rewind", from: aw.rewindFromTime, to: rewindTo });
        return out;
      }
      beginWtcPan(aw, out);
      return out;
    }
    // Bird's-eye kinds: detour through rewind to the path anchor when one
    // resolves; otherwise lift straight to the wide shot.
    const rewindToTime = ctx.birdsRewindTarget();
    if (rewindToTime != null && rewindToTime >= 0 && rewindToTime < ctx.currentTime - 0.05) {
      aw.rewindFromTime = ctx.currentTime;
      aw.rewindToTime = rewindToTime;
      aw.phase = "rewind";
      aw.phaseElapsed = 0;
      out.push({ type: "begin_rewind", from: aw.rewindFromTime, to: rewindToTime });
    } else {
      out.push({ type: "capture_pose" });
      aw.phase = "zoom_out";
      aw.phaseElapsed = 0;
    }
  } else if (aw.phase === "rewind" && aw.phaseElapsed >= AW_PHASE_REWIND_SEC) {
    out.push({ type: "snap_time", time: aw.rewindToTime });
    if (m.kind === "double_committing") {
      beginWtcPan(aw, out);
    } else {
      aw.phase = "hold";
      aw.phaseElapsed = 0;
    }
  } else if (aw.phase === "post_rewind" && aw.phaseElapsed >= AW_PHASE_POST_REWIND_SEC) {
    aw.phase = "wtc_teammate";
    aw.phaseElapsed = 0;
  } else if (aw.phase === "hold" && aw.phaseElapsed >= AW_PHASE_HOLD_SEC) {
    if (m.kind === "double_committing") {
      beginWtcPan(aw, out);
    } else {
      // Capture after the hold lets player-follow settle on the rewound frame
      // so zoom_out lerps from a stable starting point.
      out.push({ type: "capture_pose" });
      aw.phase = "zoom_out";
      aw.phaseElapsed = 0;
    }
  } else if (aw.phase === "zoom_out" && aw.phaseElapsed >= AW_PHASE_ZOOM_SEC) {
    aw.phase = "birds";
    aw.phaseElapsed = 0;
  } else if (aw.phase === "birds" && aw.phaseElapsed >= AW_PHASE_BIRDS_SEC) {
    aw.phase = "zoom_in";
    aw.phaseElapsed = 0;
  } else if (aw.phase === "zoom_in" && aw.phaseElapsed >= AW_PHASE_ZOOM_SEC) {
    aw.phase = "done";
    aw.phaseElapsed = 0;
    markConsumed(aw, m);
  } else if (aw.phase === "wtc_pan" && aw.phaseElapsed >= AW_PHASE_WTC_PAN_SEC) {
    // double_committing detours through the post_rewind freeze beat so the
    // swapped-in teammate copy lands before playback resumes.
    aw.phase = m.kind === "double_committing" ? "post_rewind" : "wtc_teammate";
    aw.phaseElapsed = 0;
  } else if (aw.phase === "wtc_teammate" && aw.phaseElapsed >= awWtcSec(m)) {
    aw.phase = "wtc_aftermath";
    aw.phaseElapsed = 0;
    // Mark consumed now (not at done): the rewind can leave the playhead back
    // inside the natural window during the aftermath, and without this the
    // original textbox flashes again before the cinematic finishes.
    markConsumed(aw, m);
  } else if (aw.phase === "wtc_aftermath" && aw.phaseElapsed >= awAftermathSec(m)) {
    beginWtcUnpan(aw, out);
  } else if (aw.phase === "wtc_unpan" && aw.phaseElapsed >= AW_PHASE_WTC_PAN_SEC) {
    aw.phase = "done";
    aw.phaseElapsed = 0;
  } else if (aw.phase === "bang_decel" && aw.phaseElapsed >= AW_PHASE_BANG_DECEL_SEC) {
    // Land exactly on the freeze target (float drift can leave us a hair
    // short), then latch the live follow pose so bang_wait holds it still.
    out.push(
      { type: "snap_time", time: m.time + AW_PHASE_BANG_POST_HIT_GAME_SEC },
      { type: "capture_pose" },
    );
    aw.phase = "bang_wait";
    aw.phaseElapsed = 0;
  } else if (aw.phase === "bang_wait" && aw.phaseElapsed >= AW_PHASE_BANG_WAIT_SEC) {
    aw.phase = "bang_pan_in";
    aw.phaseElapsed = 0;
  } else if (aw.phase === "bang_pan_in" && aw.phaseElapsed >= AW_PHASE_BANG_PAN_IN_SEC) {
    aw.phase = "bang_hold";
    aw.phaseElapsed = 0;
  } else if (aw.phase === "bang_hold" && aw.phaseElapsed >= AW_PHASE_BANG_HOLD_SEC) {
    aw.phase = "bang_pan_out";
    aw.phaseElapsed = 0;
  } else if (aw.phase === "bang_pan_out" && aw.phaseElapsed >= AW_PHASE_BANG_PAN_OUT_SEC) {
    aw.phase = "done";
    aw.phaseElapsed = 0;
    markConsumed(aw, m);
  }
  return out;
}

/** Reset to idle (keeps the consumed guard — that clears in idle by time). */
export function resetAwState(aw: AwState): void {
  aw.phase = "idle";
  aw.phaseElapsed = 0;
  aw.active = false;
}

/**
 * Abort an in-flight cinematic on user scrub / external seek. Clears the
 * consumed guard so a deliberate re-entry replays the cinematic. Returns true
 * when a cinematic was actually cancelled (director must restore the focus
 * attachment).
 */
export function abortAwState(aw: AwState): boolean {
  const wasRunning = aw.phase !== "idle" && aw.phase !== "done";
  aw.phase = wasRunning ? "done" : aw.phase;
  aw.phaseElapsed = 0;
  aw.consumed = false;
  aw.consumedEnd = 0;
  return wasRunning;
}

/** True while the cinematic drives the camera itself (not the follow cam). */
export function cinematicOwnsCamera(phase: AwPhase): boolean {
  return (
    phase === "wtc_pan" ||
    phase === "wtc_unpan" ||
    phase === "birds" ||
    phase === "zoom_out" ||
    phase === "zoom_in" ||
    phase === "bang_wait" ||
    phase === "bang_pan_in" ||
    phase === "bang_hold" ||
    phase === "bang_pan_out"
  );
}

/**
 * Playback-speed multiplier for the frame — port of `_awEffectiveSpeed`.
 * `base` is the clip's own playback rate (viewer.js `state.playbackSpeed`).
 */
export function effectiveSpeed(
  aw: AwState,
  m: CinematicMistake,
  base: number,
  currentTime: number,
): number {
  // Freeze on the rewound frame for the entire hold.
  if (aw.phase === "hold") return 0;
  // bang freeze beat: total stop while the camera waits, pans, holds, unpans.
  if (
    aw.phase === "bang_wait" ||
    aw.phase === "bang_pan_in" ||
    aw.phase === "bang_hold" ||
    aw.phase === "bang_pan_out"
  ) {
    return 0;
  }
  // post_rewind: double_committing freezes so the swapped-in copy lands.
  if (aw.phase === "post_rewind") {
    return m.kind === "double_committing" ? 0 : base;
  }
  if (aw.phase === "bang_decel") {
    // Real-time smoothstep from full slow speed to 0 over the decel window.
    const u = Math.min(1, Math.max(0, aw.phaseElapsed / AW_PHASE_BANG_DECEL_SEC));
    return Math.min(base, AW_SLOW_SPEED * (1 - smoothstep01(u)));
  }
  if (aw.phase === "slow") {
    // Kinds whose next phase is a rewind ease speed to 0 over the final
    // AW_PHASE_DECEL_SEC of slow so freeze→rewind feels continuous.
    const willRewind =
      m.kind === "too_far_from_play" ||
      m.kind === "pick_up_small_pads" ||
      m.kind === "double_committing";
    let mult = 1;
    if (willRewind) {
      const remaining = awSlowSec(m) - aw.phaseElapsed;
      if (remaining < AW_PHASE_DECEL_SEC) {
        mult = smoothstep01(Math.max(0, remaining / AW_PHASE_DECEL_SEC));
      }
    }
    return Math.min(base, AW_SLOW_SPEED * mult);
  }
  // double_committing plays the teammate POV in real time.
  if (
    m.kind === "double_committing" &&
    (aw.phase === "wtc_teammate" || aw.phase === "wtc_aftermath")
  ) {
    return base;
  }
  // Path-reveal kinds freeze game time through the bird's-eye reveal so pads
  // under the static chevron route don't get collected mid-reveal.
  if (
    (aw.phase === "zoom_out" || aw.phase === "birds") &&
    (m.kind === "too_far_from_play" || m.kind === "pick_up_small_pads")
  ) {
    return 0;
  }
  if (
    aw.phase === "zoom_out" ||
    aw.phase === "birds" ||
    aw.phase === "zoom_in" ||
    aw.phase === "wtc_pan" ||
    aw.phase === "wtc_teammate"
  ) {
    return Math.min(base, AW_SLOW_SPEED);
  }
  // After completion (done) or during the unpan slide, return to normal even
  // if the rewind left the playhead inside the detection window.
  if (aw.phase === "done" || aw.phase === "wtc_unpan") return base;
  if (!inMistakeWindow(m, currentTime)) return base;
  if (m.kind === "too_far_from_play" || m.kind === "pick_up_small_pads") return base;
  return Math.min(base, AW_SLOW_SPEED);
}

// ---- Callout phase view -----------------------------------------------------

export type CalloutMessageKind = "primary" | "birds_path" | "teammate_switch" | "bang_pause";

export interface CalloutPhaseView {
  /** Fully torn down (textbox + chevrons). */
  hidden: boolean;
  /** Chevron route + strobe rendering (zoom_out and birds). */
  showChevrons: boolean;
  /** Textbox suppressed while chevrons render (zoom_out only). */
  textboxHidden: boolean;
  message: CalloutMessageKind;
  /** Anchor on the teammate instead of the focus player. */
  anchorTeammate: boolean;
  /** Leader-line dot hidden (birds: the focus ring is the anchor). */
  dotHidden: boolean;
}

/**
 * Which callout state the current phase shows — the phase-driven half of
 * `_updateMistakeCallout` (projection/layout stays in the DOM layer).
 * Returns null when the callout should not render at all.
 */
export function calloutPhaseView(
  aw: AwState,
  m: CinematicMistake,
  currentTime: number,
): CalloutPhaseView | null {
  const keepInPostRewind = aw.phase === "post_rewind" && m.kind === "double_committing";
  if (
    aw.phase === "zoom_in" ||
    aw.phase === "rewind" ||
    aw.phase === "hold" ||
    aw.phase === "wtc_pan" ||
    aw.phase === "wtc_unpan" ||
    (aw.phase === "post_rewind" && !keepInPostRewind)
  ) {
    return null;
  }
  const awMistakeActive =
    aw.active &&
    (aw.phase === "slow" ||
      aw.phase === "post_rewind" ||
      aw.phase === "zoom_out" ||
      aw.phase === "birds" ||
      aw.phase === "wtc_teammate" ||
      aw.phase === "wtc_aftermath" ||
      aw.phase === "bang_decel" ||
      aw.phase === "bang_wait" ||
      aw.phase === "bang_pan_in" ||
      aw.phase === "bang_hold" ||
      aw.phase === "bang_pan_out");
  if (!awMistakeActive) {
    if (!inMistakeWindow(m, currentTime)) return null;
    // After the cinematic, the rewound playhead re-enters the window as time
    // walks forward — suppress the textbox's second flash until re-armed.
    if (aw.consumed) return null;
  }
  const birdsKind = m.kind === "too_far_from_play" || m.kind === "pick_up_small_pads";
  const showChevrons = birdsKind && (aw.phase === "zoom_out" || aw.phase === "birds");
  const inBirdsPath = birdsKind && aw.phase === "birds";
  const inTmSwitch =
    ((aw.phase === "wtc_teammate" || aw.phase === "wtc_aftermath") &&
      (m.kind === "waiting_to_challenge" || m.kind === "double_committing")) ||
    (aw.phase === "post_rewind" && m.kind === "double_committing");
  const inBangPause =
    m.kind === "bang_with_time" &&
    (aw.phase === "bang_pan_in" || aw.phase === "bang_hold" || aw.phase === "bang_pan_out");
  return {
    hidden: false,
    showChevrons,
    textboxHidden: aw.phase === "zoom_out",
    message: inBirdsPath
      ? "birds_path"
      : inTmSwitch
        ? "teammate_switch"
        : inBangPause
          ? "bang_pause"
          : "primary",
    anchorTeammate: inTmSwitch,
    dotHidden: inBirdsPath,
  };
}

// ---- Clip window ------------------------------------------------------------

/**
 * The loop window an EventClip needs so the whole cinematic (including the
 * rewind's furthest reach) stays inside it — otherwise the loop enforcers
 * would fight the rewound playhead the moment the director hands back.
 */
export function cinematicClipWindow(m: CinematicMistake): { start: number; end: number } {
  let start = Math.min(m.t_start, m.time - mistakeCinematicBefore(m));
  if (m.kind === "too_far_from_play") {
    // Rewind lands at path.tAnchor - 1 where tAnchor = tDecision - 1.5.
    start = Math.min(start, m.t_start - 2.5);
  } else if (m.kind === "pick_up_small_pads") {
    // Path spans the trajectory's final 4s; the rewind lands at its start.
    start = Math.min(start, m.time - 4.0);
  } else if (m.kind === "double_committing") {
    start = Math.min(start, m.time - 1.5);
  }
  // Margin below the furthest rewind so the watchdog's `< start - 0.05`
  // check never fires against a legitimate cinematic position.
  start = Math.max(0, start - 0.25);
  const end = Math.max(m.t_end, m.time + mistakeCinematicAfter(m));
  return { start, end };
}
