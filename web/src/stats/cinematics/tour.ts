// The mistakes-tour orchestrator: a ReplayPlayer plugin that runs the pure
// whole-replay scan (tourScan.ts) each frame and manages per-mistake director
// lifecycles above it. The per-mistake director is reused unchanged — this
// module only decides WHEN one exists.
//
// Plugin ordering: the tour is added via `player.addPlugin` after
// createPlayerFromParsed installs the camera plugin, and each director is
// added after the tour — so per frame the order is camera → tour → director,
// which keeps the director's camera writes winning the frame exactly as in
// the single-clip player.
//
// Director attach is deferred to a microtask: `addPlugin` re-renders
// synchronously, and attaching from inside the tour's own beforeRender would
// re-enter the render loop. The microtask runs before the next frame, so the
// deferral is invisible; a token guards it against an abort racing in between.

import type { PlayerRenderContext, PlayerPlugin, ReplayModel, ReplayPlayer } from "@rlrml/player";
import type { CinematicMistake } from "./constants";
import { createMistakeCinematicDirector, type CinematicDirector } from "./director";
import { createFreeLookControl } from "./look";
import {
  abortTour,
  advanceTour,
  createTourState,
  rearmTour,
  type TourAction,
  type TourState,
} from "./tourScan";

export interface MistakeTourContext {
  player: ReplayPlayer;
  replay: ReplayModel;
  /** The film-room canvas container (DOM overlays mount here). */
  container: HTMLElement;
  /** Track id of the focus player every mistake in the list belongs to. */
  focusTrackId: string;
  /** The transport's normal playback rate (the cinematics' "1x"). */
  basePlaybackRate: number;
}

export interface MistakeTourController {
  /** Install the tour plugin + free-look listeners. */
  attach(): void;
  /** Tear everything down, including any live director. */
  detach(): void;
  /** Tour camera mode on/off. Off aborts any in-flight cinematic; markers
   * and plain follow-cam keep working. */
  setEnabled(enabled: boolean): void;
  /** A user scrub or marker jump happened: abort in-flight and re-arm the
   * whole pass so a deliberate re-entry replays its cinematic. Call after
   * the seek. */
  notifyExternalSeek(): void;
  /** The user pressed pause: abort in-flight but keep consumed guards, so
   * resuming does not replay mistakes the pass already toured. Call before
   * pausing the player. */
  notifyUserPause(): void;
  /** True while a director owns clock + camera. */
  isEngaged(): boolean;
  /** Key (`kind@time`) of the mistake whose director is attached, or null. */
  activeMistakeKey(): string | null;
}

/** Stable identity for a mistake within one tour (viewer.js `_awMistakeKey`). */
export function mistakeTourKey(m: CinematicMistake): string {
  return `${m.kind}@${m.time.toFixed(3)}`;
}

export function createMistakeTour(
  mistakes: readonly CinematicMistake[],
  ctx: MistakeTourContext,
): MistakeTourController {
  const { player, replay, container, focusTrackId, basePlaybackRate } = ctx;
  const state: TourState = createTourState(mistakes);
  let enabled = true;
  let attached = false;
  let removePlugin: (() => void) | null = null;
  let activeDirector: CinematicDirector | null = null;
  // Bumped on every teardown path to invalidate a microtask-queued attach.
  let attachToken = 0;

  const freeLook = createFreeLookControl({
    player,
    container,
    // While a director is attached (even idle-in-window) it owns free-look.
    canLook: () => state.activeIndex < 0,
  });

  function queueDirectorAttach(index: number) {
    const entry = state.entries[index];
    if (!entry) return;
    const token = ++attachToken;
    queueMicrotask(() => {
      if (token !== attachToken || !attached || state.activeIndex !== index) return;
      const director = createMistakeCinematicDirector(entry.mistake, {
        player,
        replay,
        container,
        focusTrackId,
        basePlaybackRate,
      });
      activeDirector = director;
      director.attach();
    });
  }

  function dropActiveDirector(): CinematicDirector | null {
    attachToken++;
    const director = activeDirector;
    activeDirector = null;
    return director;
  }

  function applyActions(actions: TourAction[]) {
    for (const action of actions) {
      if (action.type === "detach") {
        // detach() restores the base playback rate and focus attachment.
        dropActiveDirector()?.detach();
        if (action.completed && !player.getState().playing) {
          // Freezes legitimately leave the transport paused; a completed
          // hand-back resumes normal playback.
          player.play();
        }
      } else {
        queueDirectorAttach(action.index);
      }
    }
  }

  /** Abort whatever is in flight through the director's own abort path. */
  function abortActive() {
    const director = dropActiveDirector();
    if (director) {
      // Restores the focus attachment, base rate, and (if a cinematic was
      // mid-flight) resumes play; detach then removes plugin + overlays.
      director.notifyExternalSeek();
      director.detach();
    }
    applyActions(abortTour(state));
    freeLook.cancel();
  }

  const plugin: PlayerPlugin = {
    id: "mistake-tour",
    beforeRender(render: PlayerRenderContext) {
      const actions = advanceTour(state, {
        t: render.currentTime,
        engaged: activeDirector?.isEngaged() ?? false,
        playing: render.state.playing,
        enabled,
      });
      applyActions(actions);
      if (state.activeIndex < 0) {
        freeLook.apply(render, render.state.attachedPlayerId ?? focusTrackId);
      }
    },
  };

  return {
    attach() {
      if (attached) return;
      attached = true;
      freeLook.attach();
      removePlugin = player.addPlugin(plugin);
    },
    detach() {
      if (!attached) return;
      attached = false;
      dropActiveDirector()?.detach();
      abortTour(state);
      removePlugin?.();
      removePlugin = null;
      freeLook.detach();
      freeLook.cancel();
    },
    setEnabled(next: boolean) {
      if (enabled === next) return;
      enabled = next;
      if (!next) abortActive();
    },
    notifyExternalSeek() {
      abortActive();
      rearmTour(state);
    },
    notifyUserPause() {
      abortActive();
    },
    isEngaged() {
      return activeDirector?.isEngaged() ?? false;
    },
    activeMistakeKey() {
      const entry = state.entries[state.activeIndex];
      return entry ? mistakeTourKey(entry.mistake) : null;
    },
  };
}
