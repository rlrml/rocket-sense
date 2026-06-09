import {
  ensureBindingsReady,
  normalizeReplayData,
  type RawReplayFramesData,
  ReplayPlayer,
  type ReplayFreeCameraPreset,
  type ReplayModel,
} from "@rlrml/player";
import * as subtrActor from "@rlrml/subtr-actor";
import { ExternalLink } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

export type EventClipCamera =
  | {
      kind: "follow-player";
      playerName: string | null;
      ballCam?: boolean;
    }
  | {
      kind: "free";
      preset?: ReplayFreeCameraPreset;
    };

export interface EventClip {
  start: number;
  end: number;
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
  /** Changes whenever a different event should be shown. */
  key: string;
}

type LoadStatus = "loading" | "ready" | "error";

// Parsing a replay is expensive, so cache the fully-decoded model per replay.
// Every event in a replay reuses the same parsed frames, which makes scrubbing
// between event clips instant.
const replayModelCache = new Map<string, Promise<ReplayModel>>();

export function preloadReplayModel(replayId: string): Promise<ReplayModel> {
  let pending = replayModelCache.get(replayId);
  if (!pending) {
    pending = (async () => {
      await ensureBindingsReady();
      const response = await fetch(`/api/v1/replays/${encodeURIComponent(replayId)}/file`);
      if (!response.ok) {
        throw new Error(`Failed to download replay (${response.status})`);
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      // Parse on the main thread instead of loadReplayFromBytes: the published
      // @rlrml/player ships its web worker as an IIFE that references an unbound
      // `subtrActor` global, so the worker path throws "subtrActor is not defined".
      const framesJson = subtrActor.get_replay_frames_data_json_with_progress(bytes, () => undefined, null);
      const raw = JSON.parse(new TextDecoder().decode(framesJson)) as RawReplayFramesData;
      return normalizeReplayData(raw);
    })();
    pending.catch(() => replayModelCache.delete(replayId));
    replayModelCache.set(replayId, pending);
  }
  return pending;
}

interface EventClipPlayerProps {
  replayId: string;
  /** The clip to show; the player loops it using the clip's camera config. */
  clip: EventClip | null;
  showDebug?: boolean;
}

interface EventClipPreviewProps {
  replayId: string;
  clip: EventClip | null;
  label: ReactNode;
  openHref: string;
  openTitle?: string;
  showDebug?: boolean;
}

export function EventClipPreview({
  replayId,
  clip,
  label,
  openHref,
  openTitle = "Open full player",
  showDebug = false,
}: EventClipPreviewProps) {
  return (
    <aside className="event-preview-pip">
      <div className="event-preview-pip-bar">
        <span className="event-preview-pip-label">{label}</span>
        <a className="event-preview-pip-open" href={openHref} title={openTitle}>
          <ExternalLink size={13} />
        </a>
      </div>
      <EventClipPlayer replayId={replayId} clip={clip} showDebug={showDebug} />
    </aside>
  );
}

export function EventClipPlayer({ replayId, clip, showDebug = false }: EventClipPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReplayPlayer | null>(null);
  const loopRef = useRef<{ start: number; end: number } | null>(null);
  const clipRef = useRef<EventClip | null>(clip);
  clipRef.current = clip;
  const renderStatsRef = useRef({ count: 0, frameIndex: -1, time: -1 });
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
    const startFrameTime =
      target.startFrame != null
        ? player.replay.frames[target.startFrame]?.time
        : undefined;
    const endFrameTime =
      target.endFrame != null
        ? player.replay.frames[target.endFrame]?.time
        : undefined;
    const anchorTime =
      target.anchorFrame != null
        ? player.replay.frames[target.anchorFrame]?.time
        : undefined;
    const start =
      startFrameTime != null
        ? startFrameTime
        : anchorTime != null
        ? Math.max(0, anchorTime - (target.prerollSeconds ?? 0))
        : target.start;
    const end =
      endFrameTime != null
        ? endFrameTime
        : anchorTime != null
        ? Math.min(player.replay.duration, anchorTime + (target.postrollSeconds ?? 0))
        : target.end;
    loopRef.current = { start, end };
    if (target.camera.kind === "follow-player") {
      const trackId = target.camera.playerName
        ? trackByNameRef.current.get(target.camera.playerName.trim().toLowerCase())
        : undefined;
      if (trackId) {
        player.setAttachedPlayer(trackId);
        player.setBallCamEnabled(target.camera.ballCam ?? true);
      } else {
        player.setFreeCameraPreset("side");
      }
    } else {
      player.setFreeCameraPreset(target.camera.preset ?? "side");
    }
    player.seek(start);
    player.play();
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
      const time = active.getState().currentTime;
      if (time >= loop.end || time < loop.start - 0.05) {
        active.seek(loop.start);
      }
      if (!active.getState().playing) {
        active.play();
      }
    }, 500);

    setStatus("loading");
    preloadReplayModel(replayId)
      .then((replay) => {
        if (cancelled || !containerRef.current) {
          return;
        }
        const trackByName = new Map<string, string>();
        for (const track of replay.players) {
          if (track.name) {
            trackByName.set(track.name.trim().toLowerCase(), track.id);
          }
        }
        trackByNameRef.current = trackByName;
        player = new ReplayPlayer(containerRef.current, replay, {
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
          const time = active.getState().currentTime;
          if (time >= loop.end || time < loop.start - 0.05) {
            active.seek(loop.start);
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
          setErrorMessage(error instanceof Error ? `${error.name}: ${error.message}` : String(error));
        }
        console.error("Failed to load replay for event preview:", error);
      });

    return () => {
      cancelled = true;
      window.clearInterval(watchdog);
      unsubscribeBeforeRender?.();
      unsubscribe?.();
      player?.destroy();
      playerRef.current = null;
      loopRef.current = null;
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
          {status === "loading" ? "Loading replay…" : errorMessage ?? "Replay preview unavailable"}
        </div>
      ) : null}
    </div>
  );
}
