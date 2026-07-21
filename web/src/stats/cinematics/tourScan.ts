// The mistakes-tour scan: the whole-replay `_findActiveMistake` loop the
// single-clip port narrowed away, restored as a pure state machine above the
// per-mistake director. Each frame the tour asks: which mistake (if any)
// should own a director right now? The rules mirror viewer.js's
// analysis-walkthrough camera mode, generalized to per-mistake consumed
// guards so every mistake fires exactly once per pass:
//
// - While a director is ENGAGED, the scan is suspended — the director owns
//   the clock, and its rewinds (birds / double_committing) must not land the
//   playhead in an earlier mistake's window and re-trigger it.
// - A completed cinematic marks its mistake consumed. Consumed clears only
//   once the playhead moves forward PAST the window end — a rewind can leave
//   the playhead before the window, and time then walks forward back into it
//   (the viewer.js `consumedMistakeEnd` re-arm rule).
// - An external seek (user scrub, marker jump) aborts any in-flight director
//   and re-arms everything, so a deliberate re-entry replays the cinematic.
//
// No player/THREE imports: the tour plugin applies the returned actions.

import { mistakeCinematicAfter, mistakeCinematicBefore, type CinematicMistake } from "./constants";
import { inMistakeWindow } from "./phases";

export interface TourEntry {
  mistake: CinematicMistake;
  /** Fired this pass; blocks the scan until the playhead passes the window end. */
  consumed: boolean;
}

export interface TourState {
  /** Sorted by mistake time; overlapping windows resolve first-by-time. */
  entries: TourEntry[];
  /** Index of the mistake whose director is attached, -1 when none. */
  activeIndex: number;
  /** The active director has engaged (owned clock/camera) at least once. */
  activeWasEngaged: boolean;
}

export function createTourState(mistakes: readonly CinematicMistake[]): TourState {
  return {
    entries: mistakes
      .map((mistake) => ({ mistake, consumed: false }))
      .sort((a, b) => a.mistake.time - b.mistake.time),
    activeIndex: -1,
    activeWasEngaged: false,
  };
}

export function tourWindowStart(m: CinematicMistake): number {
  return m.time - mistakeCinematicBefore(m);
}

export function tourWindowEnd(m: CinematicMistake): number {
  return m.time + mistakeCinematicAfter(m);
}

/** First non-consumed mistake whose cinematic window contains t, or -1. */
export function scanActiveMistake(state: TourState, t: number): number {
  for (let i = 0; i < state.entries.length; i++) {
    const entry = state.entries[i];
    if (entry.consumed) continue;
    if (inMistakeWindow(entry.mistake, t)) return i;
  }
  return -1;
}

export type TourAction =
  /** Tear down this mistake's director. `completed` = it finished its
   * cinematic (the tour resumes normal play); otherwise its window was
   * exited without ever engaging (default family / unresolvable teammate). */
  | { type: "detach"; index: number; completed: boolean }
  /** Create + attach this mistake's director. */
  | { type: "attach"; index: number };

export interface TourFrameInput {
  /** Playhead time this frame. */
  t: number;
  /** The attached director's isEngaged() this frame (false when none). */
  engaged: boolean;
  /** The transport is playing (user intent; paused tours never engage). */
  playing: boolean;
  /** Tour camera mode on/off; off scans nothing but still releases guards. */
  enabled: boolean;
}

/**
 * Advance the tour by one frame. Mutates `state` and returns the director
 * lifecycle actions to apply, in order.
 */
export function advanceTour(state: TourState, input: TourFrameInput): TourAction[] {
  const actions: TourAction[] = [];
  // Forward-pass release: a consumed guard lifts only once the playhead has
  // moved past the window end. Backward exits are either a cinematic rewind
  // (must NOT release — time walks forward back in) or an external seek
  // (which re-arms explicitly via rearmTour).
  for (const entry of state.entries) {
    if (entry.consumed && input.t > tourWindowEnd(entry.mistake)) {
      entry.consumed = false;
    }
  }
  if (state.activeIndex >= 0) {
    if (input.engaged) {
      // Scan suspended: the engaged director owns the clock, including any
      // rewind that drags the playhead through earlier mistakes' windows.
      state.activeWasEngaged = true;
      return actions;
    }
    const index = state.activeIndex;
    const entry = state.entries[index];
    if (state.activeWasEngaged) {
      // Natural completion (engaged → done). Consume and hand back; fall
      // through to the scan so an overlapping next window can fire back-to-back.
      entry.consumed = true;
      state.activeIndex = -1;
      state.activeWasEngaged = false;
      actions.push({ type: "detach", index, completed: true });
    } else if (!inMistakeWindow(entry.mistake, input.t)) {
      // Never engaged (default family slow-mo, or a teammate kind that could
      // not resolve one): tear down once the playhead leaves the window.
      state.activeIndex = -1;
      actions.push({ type: "detach", index, completed: false });
    } else {
      // Attached and inside the window: the director handles slow-mo,
      // callout, and (if eligible) engagement on its own.
      return actions;
    }
  }
  if (!input.enabled || !input.playing) return actions;
  const next = scanActiveMistake(state, input.t);
  if (next >= 0) {
    state.activeIndex = next;
    state.activeWasEngaged = false;
    actions.push({ type: "attach", index: next });
  }
  return actions;
}

/**
 * Abort whatever director is attached (external seek, user pause, tour
 * toggle-off). Does not touch consumed guards — pair with `rearmTour` for
 * the scrub path.
 */
export function abortTour(state: TourState): TourAction[] {
  if (state.activeIndex < 0) return [];
  const index = state.activeIndex;
  state.activeIndex = -1;
  state.activeWasEngaged = false;
  return [{ type: "detach", index, completed: false }];
}

/** Clear every consumed guard: a deliberate scrub re-arms the whole pass. */
export function rearmTour(state: TourState): void {
  for (const entry of state.entries) entry.consumed = false;
}

// ---- Timeline marker math ---------------------------------------------------

/** Marker position along the scrubber as a 0..1 fraction of the replay. */
export function markerFraction(m: CinematicMistake, duration: number): number {
  if (!(duration > 0)) return 0;
  return Math.min(1, Math.max(0, m.time / duration));
}

/** Run-up before the cinematic window a marker jump lands on. */
export const MARKER_JUMP_PREROLL_SEC = 1.5;

/**
 * Seek target for clicking a mistake's timeline marker: just before the
 * cinematic window so the tour arms and fires on the way through.
 */
export function markerJumpTarget(m: CinematicMistake): number {
  return Math.max(0, tourWindowStart(m) - MARKER_JUMP_PREROLL_SEC);
}
