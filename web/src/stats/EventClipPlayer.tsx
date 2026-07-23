import {
  createBallchasingOverlayPlugin,
  createBoostPadsPlugin,
  createNameTagPlugin,
  createPlayerFromParsed,
  fromReplayPlayerPlugin,
  type ReplayModel,
  type ReplayFreeCameraPreset,
  type ReplayPlayer,
} from "@rlrml/player";
import { ExternalLink } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  contactCaptureMoment,
  setContactOverheadCamera,
  setFreeCameraPresetInstant,
} from "./contactCamera";
import { PLAYER_ASSET_BASE } from "./playerAssets";
import { CopyPlayLink } from "./PlayLink";
import { preloadReplay, preloadReplayModel } from "./replayModel";

// Re-exported for existing importers; the loader itself now lives in replayModel.ts
// so consumers that only need parsed frames can avoid the renderer bundle.
export { preloadReplayModel };

/**
 * Imperative camera controls handed to an {@link EventClipCamera} each time a clip
 * is applied. Backed by the live player and its track lookup, so callers can drive
 * the camera without knowing about player internals or track ids.
 */
export interface EventClipCameraControls {
  /**
   * Attach the camera to a player identified by remote key and/or display name.
   * Returns true if a matching track was found and the camera was attached, false
   * otherwise (so the caller can decide on a fallback).
   */
  followPlayer(target: {
    playerKey?: string | null;
    playerName?: string | null;
    ballCam?: boolean;
  }): boolean;
  /** Switch to a free-roaming camera preset (defaults to "side"). */
  freeCamera(preset?: ReplayFreeCameraPreset): void;
  /** Switch to the kickoff-contact overhead view centered on the ball at a frame. */
  overheadAtFrame(frameIndex: number | null | undefined): void;
}

/**
 * Caller-defined camera setup, invoked each time a clip is applied. Receives
 * {@link EventClipCameraControls} and is free to compose them however it likes.
 */
export type EventClipCamera = (controls: EventClipCameraControls) => void;

/**
 * Resolves a clip's start time once the replay has been parsed, for starts that
 * can only be determined accurately from frame data (e.g. the moment a kickoff
 * countdown reaches zero). Receives the parsed replay and the clip's nominal
 * start, and returns an absolute time in seconds, or null to fall back to the
 * clip's other start hints (startFrame, anchorFrame, then start).
 */
export type EventClipStartResolver = (replay: ReplayModel, nominalStart: number) => number | null;

/**
 * Resolves a clip's end time once the replay has been parsed. Same contract as
 * {@link EventClipStartResolver}: returns an absolute time in the player's clock,
 * or null to fall back to the clip's other end hints (endFrame, anchorFrame, end).
 *
 * Prefer resolving from frame indices (replay.frames[i].time) rather than raw
 * event timestamps: the player rebases frame times to start at 0, so absolute
 * timestamps from upstream event data do not match the player clock, while frame
 * indices do.
 */
export type EventClipEndResolver = (replay: ReplayModel, nominalEnd: number) => number | null;

/**
 * A running cinematic attached to a clip. While `isEngaged()` the director owns
 * the playback clock and camera: the loop enforcers must neither reseek nor
 * auto-resume (a cinematic legitimately rewinds before the window, freezes
 * playback, and overruns the nominal end). When an enforcer does act (loop
 * wrap after the cinematic hands back, or an external scrub), it reports the
 * seek via `notifyExternalSeek()` so the director aborts/re-arms cleanly.
 */
export interface EventClipCinematicDirector {
  attach(): void;
  detach(): void;
  isEngaged(): boolean;
  notifyExternalSeek(): void;
}

/** Everything a cinematic factory needs from the live player. */
export interface EventClipCinematicContext {
  player: ReplayPlayer;
  replay: ReplayModel;
  /** The clip canvas container — DOM overlays mount inside it. */
  container: HTMLElement;
  /** Resolve a player track id the same way the clip camera targets do. */
  resolveTrackId(target: { playerKey?: string | null; playerName?: string | null }): string | null;
  /** The clip's own playback rate (the cinematic's "normal speed"). */
  playbackRate: number;
}

/**
 * Caller-defined cinematic setup, invoked when the clip is applied to the live
 * player. Returning null leaves the clip on the plain looping behavior.
 */
export type EventClipCinematic = (
  context: EventClipCinematicContext,
) => EventClipCinematicDirector | null;

export interface EventClip {
  start: number;
  end: number;
  /** Playback rate for this clip; defaults to normal speed. */
  playbackRate?: number;
  /** Position interpolation mode for this clip; defaults to the player's smooth interpolation. */
  motionInterpolation?: "hermite" | "linear";
  /** Optional caller-defined resolver for starts that can only be pinned down after the replay is parsed. */
  resolveStart?: EventClipStartResolver;
  /** Optional caller-defined resolver for ends that can only be pinned down after the replay is parsed. */
  resolveEnd?: EventClipEndResolver;
  /** Optional exact frame to seek to for the beginning of the clip. */
  startFrame?: number | null;
  /** Optional exact frame to use as the end of the loop. */
  endFrame?: number | null;
  /** Optional event anchor frame for clips defined by context around an event. */
  anchorFrame?: number | null;
  /** Context before anchorFrame; ignored when startFrame or start is used. */
  prerollSeconds?: number;
  /** Context after anchorFrame; ignored when endFrame or end is used. */
  postrollSeconds?: number;
  camera: EventClipCamera;
  /**
   * Optional cinematic director for this clip (analysis-walkthrough camera
   * choreography). While its director is engaged it owns clock + camera and
   * the clip's loop enforcement is suspended.
   */
  cinematic?: EventClipCinematic;
  /** Changes whenever a different event should be shown. */
  key: string;
}

type LoadStatus = "loading" | "ready" | "error";

interface EventClipPlayerProps {
  replayId: string;
  /** The clip to show; the player loops it using the clip's camera config. */
  clip: EventClip | null;
  showDebug?: boolean;
  /**
   * Called with the clip's key each time playback reaches the end of the clip
   * window, before the player loops back to the start. Lets playlist-style
   * consumers advance to the next clip instead of looping forever.
   */
  onClipEnd?: (clipKey: string) => void;
}

interface EventClipPreviewProps {
  replayId: string;
  clip: EventClip | null;
  label: ReactNode;
  openHref: string;
  openTitle?: string;
  /**
   * Machine-readable identity URL for the event currently shown. Retained for
   * callers that already construct the URL themselves.
   */
  playHref?: string;
  /** Event id for the canonical machine-readable play link. */
  eventId?: string;
  showDebug?: boolean;
}

export function EventClipPreview({
  replayId,
  clip,
  label,
  openHref,
  openTitle = "Open full player",
  playHref,
  eventId,
  showDebug = false,
}: EventClipPreviewProps) {
  return (
    <aside className="event-preview-pip">
      <div className="event-preview-pip-bar">
        <span className="event-preview-pip-label">{label}</span>
        <div className="event-preview-pip-actions">
          {eventId || playHref ? <CopyPlayLink eventId={eventId} href={playHref} /> : null}
          <a className="event-preview-pip-open" href={openHref} title={openTitle}>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
      <EventClipPlayer replayId={replayId} clip={clip} showDebug={showDebug} />
    </aside>
  );
}

export function EventClipPlayer({
  replayId,
  clip,
  showDebug = false,
  onClipEnd,
}: EventClipPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReplayPlayer | null>(null);
  const loopRef = useRef<{ start: number; end: number } | null>(null);
  const clipRef = useRef<EventClip | null>(clip);
  clipRef.current = clip;
  const onClipEndRef = useRef<EventClipPlayerProps["onClipEnd"]>(onClipEnd);
  onClipEndRef.current = onClipEnd;
  // Key of the clip most recently applied to the live player. Consumers include
  // camera/perspective state in this key when switching views should restart.
  const appliedClipKeyRef = useRef<string | null>(null);
  // The active clip's cinematic director (if the clip carries one), keyed by
  // the clip key so re-applying the same clip keeps the running cinematic.
  const directorRef = useRef<{ key: string; director: EventClipCinematicDirector } | null>(null);
  const renderStatsRef = useRef({ count: 0, frameIndex: -1, time: -1 });
  // Lower-cased player remote id -> player track id, for event-focused camera targets.
  const trackByPlayerKeyRef = useRef<Map<string, string>>(new Map());
  // Lower-cased player name -> player track id, for event-focused camera targets.
  const trackByNameRef = useRef<Map<string, string>>(new Map());
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const statusRef = useRef<LoadStatus>("loading");
  statusRef.current = status;
  const [debug, setDebug] = useState("starting…");

  // TEMP diagnostic: surface rAF, clock advance, canvas size and any thrown error
  // on-screen, so a device-specific playback failure is visible without the console.
  useEffect(() => {
    if (!showDebug) {
      return;
    }
    let rafCount = 0;
    let frameId = requestAnimationFrame(function tick() {
      rafCount += 1;
      frameId = requestAnimationFrame(tick);
    });
    let lastTime = -1;
    let lastError = "";
    const onError = (event: ErrorEvent) => {
      lastError = `ERR:${event.message}`;
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason as { message?: string } | undefined;
      lastError = `REJ:${reason?.message ?? String(event.reason)}`;
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    const id = window.setInterval(() => {
      const state = playerRef.current?.getState();
      const time = state ? state.currentTime : -1;
      const advancing = time > lastTime + 0.05 ? "ADV" : "STUCK";
      lastTime = time;
      const canvas = containerRef.current?.querySelector("canvas");
      const size = canvas ? `${canvas.width}x${canvas.height}` : "no-canvas";
      const renderStats = renderStatsRef.current;
      setDebug(
        `raf:${rafCount} render:${renderStats.count} frame:${renderStats.frameIndex} rt:${renderStats.time.toFixed(1)} t:${time.toFixed(1)} ${advancing} ${state?.playing ? "PLAY" : "pause"} ${statusRef.current} cv:${size} ${lastError}`,
      );
    }, 400);
    return () => {
      cancelAnimationFrame(frameId);
      window.clearInterval(id);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [showDebug]);

  const applyClip = useCallback((target: EventClip) => {
    const player = playerRef.current;
    if (!player) {
      return;
    }
    const replay = player.replay;
    if (!replay) {
      return;
    }
    // Frame indices align between upstream event data and the parsed replay, but
    // the player rebases frame times to start at 0. Always resolve a frame index
    // through the parsed frames (clamped to range) so we use the player clock.
    const frameTime = (frameIndex: number | null | undefined): number | undefined => {
      if (frameIndex == null) {
        return undefined;
      }
      const clamped = Math.min(Math.max(frameIndex, 0), replay.frames.length - 1);
      return replay.frames[clamped]?.time;
    };
    const startFrameTime = frameTime(target.startFrame);
    const endFrameTime = frameTime(target.endFrame);
    const anchorTime = frameTime(target.anchorFrame);
    const resolvedStartTime = target.resolveStart
      ? target.resolveStart(replay, target.start)
      : null;
    const resolvedEndTime = target.resolveEnd ? target.resolveEnd(replay, target.end) : null;
    const start =
      resolvedStartTime != null
        ? resolvedStartTime
        : startFrameTime != null
          ? startFrameTime
          : anchorTime != null
            ? Math.max(0, anchorTime - (target.prerollSeconds ?? 0))
            : target.start;
    const end =
      resolvedEndTime != null
        ? resolvedEndTime
        : endFrameTime != null
          ? endFrameTime
          : anchorTime != null
            ? Math.min(replay.duration, anchorTime + (target.postrollSeconds ?? 0))
            : target.end;
    loopRef.current = { start, end };
    const cameraControls: EventClipCameraControls = {
      followPlayer({ playerKey, playerName, ballCam }) {
        const trackId =
          (playerKey
            ? trackByPlayerKeyRef.current.get(normalizePlayerKey(playerKey))
            : undefined) ??
          (playerName ? trackByNameRef.current.get(playerName.trim().toLowerCase()) : undefined);
        if (trackId == null) {
          return false;
        }
        player.setAttachedPlayer(trackId);
        player.setBallCamEnabled(ballCam ?? true);
        return true;
      },
      freeCamera(preset) {
        player.setFreeCameraPreset(preset ?? "side");
      },
      overheadAtFrame(frameIndex) {
        if (frameIndex == null) {
          setFreeCameraPresetInstant(player, "overhead");
          return;
        }
        const capture = contactCaptureMoment(replay, frameIndex);
        setContactOverheadCamera(player, capture.ballPosition);
      },
    };
    // Cinematic lifecycle: keep a running director across same-key re-applies;
    // switching clips (or dropping the cinematic) tears the old one down. The
    // teardown must precede the camera/rate application below — detach()
    // restores the *old* clip's attachment and base rate, which would
    // otherwise override the new clip's setup.
    if (directorRef.current && directorRef.current.key !== target.key) {
      directorRef.current.director.detach();
      directorRef.current = null;
    }
    // A same-key re-apply while the cinematic is engaged (e.g. `rows` identity
    // refreshes when the reviews/auth fetches resolve, or an admin reviews a
    // row mid-playback) must not stomp the director: it owns the camera, the
    // playback rate (which it caches — an external reset here would stick
    // until the next computed-speed change), and the freeze/play state.
    const cinematicEngaged = directorRef.current?.director.isEngaged() ?? false;
    if (!cinematicEngaged) {
      target.camera(cameraControls);
      player.setPlaybackRate(target.playbackRate ?? 1);
    }
    player.setMotionInterpolation(target.motionInterpolation ?? "hermite");
    if (appliedClipKeyRef.current !== target.key) {
      player.seek(start);
    }
    if (target.cinematic && !directorRef.current && containerRef.current) {
      const director = target.cinematic({
        player,
        replay,
        container: containerRef.current,
        resolveTrackId({ playerKey, playerName }) {
          return (
            (playerKey
              ? trackByPlayerKeyRef.current.get(normalizePlayerKey(playerKey))
              : undefined) ??
            (playerName
              ? trackByNameRef.current.get(playerName.trim().toLowerCase())
              : undefined) ??
            null
          );
        },
        playbackRate: target.playbackRate ?? 1,
      });
      if (director) {
        director.attach();
        directorRef.current = { key: target.key, director };
      }
    }
    appliedClipKeyRef.current = target.key;
    // An engaged cinematic may be holding a deliberate freeze (bang_wait);
    // play() would unfreeze it for a frame. The director restores the play
    // state itself when it hands the transport back.
    if (!cinematicEngaged) {
      player.play();
    }
  }, []);

  // Load the replay and create the player once per replay id.
  useEffect(() => {
    let cancelled = false;
    let player: ReplayPlayer | null = null;
    let unsubscribe: (() => void) | null = null;
    let unsubscribeBeforeRender: (() => void) | null = null;
    // Watchdog independent of the render loop: guarantees the clip keeps looping
    // and never stays paused, even if the player's own change events go quiet.
    const watchdog = window.setInterval(() => {
      const active = playerRef.current;
      const loop = loopRef.current;
      if (!active || !loop) {
        return;
      }
      // A running cinematic owns the clock (rewinds before the window,
      // freezes, overruns the end) — stand down until it hands back.
      if (directorRef.current?.director.isEngaged()) {
        return;
      }
      const time = active.getState().currentTime;
      if (time >= loop.end || time < loop.start - 0.05) {
        if (time >= loop.end && appliedClipKeyRef.current != null) {
          onClipEndRef.current?.(appliedClipKeyRef.current);
        }
        active.seek(loop.start);
        directorRef.current?.director.notifyExternalSeek();
      }
      if (!active.getState().playing) {
        active.play();
      }
    }, 500);

    setStatus("loading");
    preloadReplay(replayId)
      .then((loadedReplay) => {
        if (cancelled || !containerRef.current) {
          return;
        }
        const { replay } = loadedReplay;
        const trackByName = new Map<string, string>();
        const trackByPlayerKey = new Map<string, string>();
        for (const track of replay.players) {
          trackByPlayerKey.set(normalizePlayerKey(track.id), track.id);
          if (track.name) {
            trackByName.set(track.name.trim().toLowerCase(), track.id);
          }
        }
        trackByPlayerKeyRef.current = trackByPlayerKey;
        trackByNameRef.current = trackByName;
        player = createPlayerFromParsed(containerRef.current, loadedReplay, {
          assetBase: PLAYER_ASSET_BASE,
          initialCameraViewMode: "free",
          initialPlaybackRate: 1,
          autoplay: false,
          initialBallCamEnabled: true,
          initialCameraDistanceScale: 1,
          // We seek to explicit event windows; without disabling these the
          // player auto-skips forward past the next kickoff/post-goal transition,
          // landing outside the requested event context.
          initialSkipKickoffsEnabled: false,
          initialSkipPostGoalTransitionsEnabled: false,
          // No skybox: the neutral background matches the prior inline player,
          // and /skyboxes isn't served at the root (only inside the standalone
          // player tree), so the default "space" HDR would just 404.
          environment: false,
          // From the ballchasing overlay we want only the followed-player boost
          // meter (the perspective we're locked to). Its top team HUD and own
          // floating names/bars overwhelm this compact (~208px) clip, so they
          // stay off — player names instead come from the lighter name-tag
          // plugin below.
          //
          // showFloatingBoostBars must stay ENABLED even though we never want to
          // see the floating bars: the overlay's beforeRender decides which car
          // is "followed" (and thus whether to render the boost ring) by reading
          // the sap-bc-player-following class off that car's floating nameplate.
          // With no floating layer there is no nameplate to tag, so the followed
          // meter is hidden every frame and *no* boost shows at all. We keep the
          // layer alive purely for that tagging and hide it in CSS
          // (.event-clip-canvas .sap-bc-floating-layer). The meter itself is
          // scaled down + pinned bottom-right (.event-clip-canvas .sap-bc-followed-*).
          // createPlayerFromParsed only auto-adds the camera plugin; the field
          // boost pads are a separate opt-in plugin (createBoostPadsPlugin builds
          // a mesh per pad from the replay's boostPads). Without it the arena has
          // no pads at all — add it so the goal/kickoff clips show pickups.
          plugins: [
            createBoostPadsPlugin(),
            // Floating 3D name pills above each car so non-perspective players
            // are identifiable in the clip. The plugin hides the followed
            // player's own tag (it would just obscure the foreground car the
            // camera is already attached to).
            createNameTagPlugin(),
            fromReplayPlayerPlugin(
              createBallchasingOverlayPlugin({
                showFloatingNames: false,
                showFloatingBoostBars: true,
                showTeamBoostHud: false,
              }),
            ),
          ],
        });
        player.setFreeCameraPreset("side");
        unsubscribeBeforeRender = player.onBeforeRender((info) => {
          renderStatsRef.current = {
            count: renderStatsRef.current.count + 1,
            frameIndex: info.frameIndex,
            time: info.currentTime,
          };
        });
        // Keep the active clip looping and never let it rest paused: reseek to the
        // start when it runs past the window, and resume play if anything stopped it.
        unsubscribe = player.subscribe(() => {
          const loop = loopRef.current;
          const active = playerRef.current;
          if (!loop || !active) {
            return;
          }
          // See the watchdog: an engaged cinematic director owns the clock.
          if (directorRef.current?.director.isEngaged()) {
            return;
          }
          const time = active.getState().currentTime;
          if (time >= loop.end || time < loop.start - 0.05) {
            if (time >= loop.end && appliedClipKeyRef.current != null) {
              onClipEndRef.current?.(appliedClipKeyRef.current);
            }
            active.seek(loop.start);
            directorRef.current?.director.notifyExternalSeek();
          }
          if (!active.getState().playing) {
            active.play();
          }
        });
        playerRef.current = player;
        (window as unknown as { __eventClip?: unknown }).__eventClip = player;
        setStatus("ready");
        // Autoplay whatever clip is requested, the instant the player exists.
        if (clipRef.current) {
          applyClip(clipRef.current);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(
            error instanceof Error ? `${error.name}: ${error.message}` : String(error),
          );
        }
        console.error("Failed to load replay for event preview:", error);
      });

    return () => {
      cancelled = true;
      window.clearInterval(watchdog);
      unsubscribeBeforeRender?.();
      unsubscribe?.();
      directorRef.current?.director.detach();
      directorRef.current = null;
      player?.destroy();
      playerRef.current = null;
      loopRef.current = null;
      appliedClipKeyRef.current = null;
    };
  }, [replayId, applyClip]);

  // Switch to a new event clip when the requested clip changes.
  useEffect(() => {
    if (clip) {
      applyClip(clip);
    }
  }, [clip, applyClip]);

  return (
    <div className="event-clip-player">
      <div ref={containerRef} className="event-clip-canvas" />
      {showDebug ? <div className="event-clip-debug">{debug}</div> : null}
      {status !== "ready" ? (
        <div className="event-clip-status">
          {status === "loading"
            ? "Loading replay…"
            : (errorMessage ?? "Replay preview unavailable")}
        </div>
      ) : null}
    </div>
  );
}

export function normalizePlayerKey(value: string): string {
  const separator = value.indexOf(":");
  if (separator < 0) {
    return value.trim().toLowerCase();
  }
  const platform = value.slice(0, separator).trim().toLowerCase();
  const id = value.slice(separator + 1).trim();
  return `${platform === "psynet" ? "epic" : platform === "playstation" ? "ps4" : platform}:${id}`;
}
