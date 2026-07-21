// Lazy entry point for stat pages: builds an EventClipCinematic factory that
// dynamic-imports the director (and its THREE/overlay dependencies) only when
// the clip is actually applied to a live player. Keeps the eagerly-loaded
// stats bundle free of the renderer chunk, matching how EventClipPlayer
// itself is lazy-loaded. This module must not import three.

import type { EventClipCinematic, EventClipCinematicDirector } from "../EventClipPlayer";
import type { CinematicMistake } from "./constants";

export interface CinematicFocusTarget {
  playerKey: string | null;
  playerName: string | null;
}

export function lazyMistakeCinematic(
  m: CinematicMistake,
  focus: CinematicFocusTarget,
): EventClipCinematic {
  return (context) => {
    let inner: EventClipCinematicDirector | null = null;
    let attached = false;
    let detached = false;
    void import("./director").then(({ createMistakeCinematicDirector }) => {
      if (detached) return;
      const focusTrackId = context.resolveTrackId(focus);
      if (focusTrackId == null) return;
      inner = createMistakeCinematicDirector(m, {
        player: context.player,
        replay: context.replay,
        container: context.container,
        focusTrackId,
        basePlaybackRate: context.playbackRate,
      });
      if (attached) inner.attach();
    });
    return {
      attach() {
        attached = true;
        inner?.attach();
      },
      detach() {
        detached = true;
        attached = false;
        inner?.detach();
        inner = null;
      },
      isEngaged() {
        return inner?.isEngaged() ?? false;
      },
      notifyExternalSeek() {
        inner?.notifyExternalSeek();
      },
    };
  };
}
