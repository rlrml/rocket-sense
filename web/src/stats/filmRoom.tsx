// The film room: full-replay playback with the mistakes-tour camera mode.
// The whole replay plays start to finish; when the playhead enters a detected
// mistake's window, that mistake's cinematic director takes over the clock
// and camera in place (see cinematics/tour.ts), then hands back to the normal
// follow cam. Mistakes render as colored markers on the scrubber.
//
// The player is built exactly like EventClipPlayer's (same plugins/options)
// but drives the entire replay: no clip loop, no watchdog — a real transport
// with play/pause/scrub instead. Nothing here reseeks while a director is
// engaged; the transport handlers route every seek/pause through the tour so
// in-flight cinematics abort cleanly.

import {
  createBallchasingOverlayPlugin,
  createBoostPadsPlugin,
  createNameTagPlugin,
  createPlayerFromParsed,
  fromReplayPlayerPlugin,
  type ReplayModel,
  type ReplayPlayer as ReplayPlayerInstance,
} from "@rlrml/player";
import { ChevronLeft, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReplay, listReplayEvents } from "../api";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import { normalizePlayerKey } from "./EventClipPlayer";
import {
  DEFAULT_CALLOUT_COLOR,
  MISTAKE_COLORS,
  type CinematicMistake,
} from "./cinematics/constants";
import { createMistakeTour, mistakeTourKey, type MistakeTourController } from "./cinematics/tour";
import { markerFraction, markerJumpTarget } from "./cinematics/tourScan";
import {
  ADMIN_ONLY_MISTAKE_KINDS,
  cinematicMistakeOf,
  formatClock,
  useMistakeMarkers,
} from "./mistakeList";
import { mistakeEventTypes, mistakeKindLabel } from "./mistakes";
import { PLAYER_ASSET_BASE } from "./playerAssets";
import { preloadReplay } from "./replayModel";

interface FilmRoomMarker {
  /** Stable list identity (the source event id). */
  key: string;
  /** Tour identity (`kind@time`) for active-cinematic highlighting. */
  tourKey: string;
  mistake: CinematicMistake;
  color: string;
  kindLabel: string;
  playerName: string;
  adminOnly: boolean;
}

export function ReplayFilmRoomPage() {
  const { replayId = "" } = useParams();
  const [replayName, setReplayName] = useState<string | null>(null);
  const [players, setPlayers] = useState<ReplayPlayer[]>([]);
  const [events, setEvents] = useState<MechanicEventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setReplayName(null);
    setPlayers([]);
    setEvents([]);
    Promise.all([getReplay(replayId), listReplayEvents(replayId, [...mistakeEventTypes])])
      .then(([replay, eventsResponse]) => {
        if (cancelled) return;
        setReplayName(replay.original_file_name || replay.id);
        setPlayers(replay.players);
        setEvents(eventsResponse.events);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [replayId]);

  const source = useMistakeMarkers(replayId, events, players);

  const markers = useMemo<FilmRoomMarker[]>(
    () =>
      source.rows.map((row) => {
        const mistake = cinematicMistakeOf(row.marker);
        return {
          key: row.event.id,
          tourKey: mistakeTourKey(mistake),
          mistake,
          color: MISTAKE_COLORS[mistake.kind] ?? DEFAULT_CALLOUT_COLOR,
          kindLabel: mistakeKindLabel(mistake.kind),
          playerName: row.marker.player,
          adminOnly: ADMIN_ONLY_MISTAKE_KINDS.has(mistake.kind),
        };
      }),
    [source.rows],
  );
  // Keep the mistakes array identity stable across content-identical
  // recomputes: `source.rows` (and thus `markers`) is a fresh array whenever
  // the auth or reviews fetches resolve, which typically lands after playback
  // has already started. The tour effect keys on `mistakes`, and a rebuild
  // aborts any in-flight cinematic and resets every consumed guard — so only
  // hand it a new array when the list actually changed. Event ids uniquely
  // identify a marker's content (events are fetched once per replay).
  const mistakesCacheRef = useRef<{ fingerprint: string; list: CinematicMistake[] } | null>(null);
  const mistakes = useMemo(() => {
    const fingerprint = markers.map((marker) => marker.key).join("|");
    const cached = mistakesCacheRef.current;
    if (cached && cached.fingerprint === fingerprint) {
      return cached.list;
    }
    const list = markers.map((marker) => marker.mistake);
    mistakesCacheRef.current = { fingerprint, list };
    return list;
  }, [markers]);

  return (
    <section className="page film-room-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Mistakes tour</p>
          <h1>Film room</h1>
          <p className="subtle">{replayName ?? replayId}</p>
        </div>
        <div className="button-row">
          <Link
            className="secondary-button"
            to={`/replays/${encodeURIComponent(replayId)}/stats/coaching`}
          >
            <ChevronLeft size={16} />
            Back to mistakes
          </Link>
        </div>
      </header>

      {error ? (
        <div className="api-notice">
          <strong>Film room</strong>
          <span>{error}</span>
        </div>
      ) : null}

      {loading ? (
        <div className="stat-empty">Loading replay…</div>
      ) : !source.focusOptions.length ? (
        <div className="stat-empty">
          No player identities are available for this replay yet, so mistakes can't be attributed.
        </div>
      ) : (
        <section className="chart-panel film-room-panel">
          <div className="chart-panel-header">
            <div className="film-room-header-main">
              <label className="mistakes-focus-label">
                Focus player
                <select
                  value={source.activeFocusKey ?? ""}
                  onChange={(event) => source.setFocusKey(event.target.value)}
                >
                  {source.focusOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.name}
                      {option.team != null ? ` (${option.team === 0 ? "Blue" : "Orange"})` : ""}
                    </option>
                  ))}
                </select>
              </label>
              <span className="mistakes-summary">
                {markers.length} mistake{markers.length === 1 ? "" : "s"} on the timeline
              </span>
            </div>
          </div>
          <FilmRoomPlayer
            replayId={replayId}
            mistakes={mistakes}
            markers={markers}
            focusKey={source.activeFocusKey}
            focusName={source.focusName}
          />
        </section>
      )}
    </section>
  );
}

type LoadStatus = "loading" | "ready" | "error";

interface FilmRoomPlayerProps {
  replayId: string;
  mistakes: CinematicMistake[];
  markers: FilmRoomMarker[];
  focusKey: string | null;
  focusName: string | null;
}

function FilmRoomPlayer({ replayId, mistakes, markers, focusKey, focusName }: FilmRoomPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReplayPlayerInstance | null>(null);
  const replayModelRef = useRef<ReplayModel | null>(null);
  const tourRef = useRef<MistakeTourController | null>(null);
  const trackByPlayerKeyRef = useRef<Map<string, string>>(new Map());
  const trackByNameRef = useRef<Map<string, string>>(new Map());
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [userPlaying, setUserPlaying] = useState(false);
  const userPlayingRef = useRef(userPlaying);
  userPlayingRef.current = userPlaying;

  // Build the player once per replay — same construction as EventClipPlayer.
  useEffect(() => {
    let cancelled = false;
    let player: ReplayPlayerInstance | null = null;
    let unsubscribe: (() => void) | null = null;
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
          // The tour needs the raw clock: auto-skipping kickoffs or post-goal
          // transitions would jump the playhead across mistake windows.
          initialSkipKickoffsEnabled: false,
          initialSkipPostGoalTransitionsEnabled: false,
          // See EventClipPlayer for the environment/overlay rationale — the
          // film room keeps the same canvas chrome, just bigger.
          environment: false,
          plugins: [
            createBoostPadsPlugin(),
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
        playerRef.current = player;
        replayModelRef.current = replay;
        setDuration(player.duration);
        unsubscribe = player.subscribe(() => {
          const active = playerRef.current;
          if (!active) return;
          const state = active.getState();
          // Natural end of the replay (loop is off, the player rests paused).
          // An engaged cinematic also pauses the transport, so gate on it.
          if (
            userPlayingRef.current &&
            !state.playing &&
            state.currentTime >= active.duration - 0.05 &&
            !(tourRef.current?.isEngaged() ?? false)
          ) {
            setUserPlaying(false);
          }
        });
        (window as unknown as { __filmRoom?: unknown }).__filmRoom = { player };
        setStatus("ready");
        player.play();
        setUserPlaying(true);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(
            error instanceof Error ? `${error.name}: ${error.message}` : String(error),
          );
        }
        console.error("Failed to load replay for the film room:", error);
      });
    return () => {
      cancelled = true;
      unsubscribe?.();
      tourRef.current?.detach();
      tourRef.current = null;
      player?.destroy();
      playerRef.current = null;
      replayModelRef.current = null;
    };
  }, [replayId]);

  // Sample the playhead for the timeline. 100ms + a linear CSS transition on
  // the progress fill reads smoothly without re-rendering at frame rate.
  useEffect(() => {
    if (status !== "ready") return;
    const id = window.setInterval(() => {
      const player = playerRef.current;
      if (player) setCurrentTime(player.getState().currentTime);
    }, 100);
    return () => window.clearInterval(id);
  }, [status]);

  // (Re)build the tour whenever the mistake list or focus player changes.
  useEffect(() => {
    if (status !== "ready") return;
    const player = playerRef.current;
    const replay = replayModelRef.current;
    const container = containerRef.current;
    if (!player || !replay || !container) return;
    const trackId =
      (focusKey ? trackByPlayerKeyRef.current.get(normalizePlayerKey(focusKey)) : undefined) ??
      (focusName ? trackByNameRef.current.get(focusName.trim().toLowerCase()) : undefined) ??
      null;
    if (trackId == null) {
      player.setFreeCameraPreset("side");
      return;
    }
    player.setAttachedPlayer(trackId);
    player.setBallCamEnabled(true);
    const tour = createMistakeTour(mistakes, {
      player,
      replay,
      container,
      focusTrackId: trackId,
      basePlaybackRate: 1,
    });
    tour.attach();
    tour.setEnabled(true);
    tourRef.current = tour;
    // A previous tour torn down mid-freeze leaves the transport paused —
    // restore the user's play intent for the fresh tour.
    if (userPlayingRef.current && !player.getState().playing) {
      player.play();
    }
    const hook = (window as unknown as { __filmRoom?: { tour?: unknown } }).__filmRoom;
    if (hook) hook.tour = tour;
    return () => {
      tour.detach();
      if (tourRef.current === tour) tourRef.current = null;
    };
  }, [status, mistakes, focusKey, focusName]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (userPlayingRef.current) {
      // Abort any in-flight cinematic first — an engaged director owns the
      // transport and would immediately override a bare pause().
      tourRef.current?.notifyUserPause();
      player.pause();
      setUserPlaying(false);
      return;
    }
    if (player.getState().currentTime >= player.duration - 0.05) {
      player.seek(0);
      tourRef.current?.notifyExternalSeek();
      setCurrentTime(0);
    }
    player.play();
    setUserPlaying(true);
  }, []);

  const seekTo = useCallback((time: number) => {
    const player = playerRef.current;
    if (!player) return;
    const clamped = Math.min(player.duration, Math.max(0, time));
    player.seek(clamped);
    tourRef.current?.notifyExternalSeek();
    setCurrentTime(clamped);
  }, []);

  const jumpToMarker = useCallback((marker: FilmRoomMarker) => {
    const player = playerRef.current;
    if (!player) return;
    const target = markerJumpTarget(marker.mistake);
    player.seek(target);
    // The seek clears every consumed guard, arming the clicked mistake so its
    // cinematic fires as playback passes through the window.
    tourRef.current?.notifyExternalSeek();
    setCurrentTime(target);
    if (!userPlayingRef.current) {
      player.play();
      setUserPlaying(true);
    }
  }, []);

  return (
    <div className="film-room-player">
      <div className="film-room-stage">
        <div ref={containerRef} className="event-clip-canvas film-room-canvas" />
        {status !== "ready" ? (
          <div className="event-clip-status">
            {status === "loading" ? "Loading replay…" : (errorMessage ?? "Replay unavailable")}
          </div>
        ) : null}
      </div>
      <div className="film-room-transport">
        <button
          type="button"
          className="icon-button film-room-play"
          title={userPlaying ? "Pause" : "Play"}
          aria-label={userPlaying ? "Pause" : "Play"}
          disabled={status !== "ready"}
          onClick={togglePlay}
        >
          {userPlaying ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <span className="film-room-clock">
          {formatClock(currentTime)} / {formatClock(duration)}
        </span>
        <FilmRoomTimeline
          duration={duration}
          currentTime={currentTime}
          markers={markers}
          onSeek={seekTo}
          onMarkerJump={jumpToMarker}
        />
      </div>
    </div>
  );
}

function FilmRoomTimeline({
  duration,
  currentTime,
  markers,
  onSeek,
  onMarkerJump,
}: {
  duration: number;
  currentTime: number;
  markers: FilmRoomMarker[];
  onSeek: (time: number) => void;
  onMarkerJump: (marker: FilmRoomMarker) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const timeAtClientX = useCallback(
    (clientX: number): number | null => {
      const bar = barRef.current;
      if (!bar || !(duration > 0)) return null;
      const rect = bar.getBoundingClientRect();
      if (rect.width <= 0) return null;
      const fraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      return fraction * duration;
    },
    [duration],
  );

  const progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;
  const hovered = hoveredKey ? (markers.find((marker) => marker.key === hoveredKey) ?? null) : null;

  return (
    <div className="film-room-timeline-wrap">
      {hovered ? (
        <div
          className="film-room-marker-tooltip"
          style={{ left: `${markerFraction(hovered.mistake, duration) * 100}%` }}
        >
          <strong style={{ color: hovered.color }}>{hovered.kindLabel}</strong>
          <span>
            {hovered.playerName} · {formatClock(hovered.mistake.time)}
          </span>
          {hovered.adminOnly ? <span className="film-room-tooltip-admin">admin-only</span> : null}
        </div>
      ) : null}
      <div
        ref={barRef}
        className="film-room-timeline"
        role="slider"
        aria-label="Replay position"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          draggingRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          const time = timeAtClientX(event.clientX);
          if (time != null) onSeek(time);
        }}
        onPointerMove={(event) => {
          if (!draggingRef.current) return;
          const time = timeAtClientX(event.clientX);
          if (time != null) onSeek(time);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
      >
        <div className="film-room-timeline-fill" style={{ width: `${progress * 100}%` }} />
        <div className="film-room-playhead" style={{ left: `${progress * 100}%` }} />
        {markers.map((marker) => (
          <button
            key={marker.key}
            type="button"
            className="film-room-marker"
            style={{
              left: `${markerFraction(marker.mistake, duration) * 100}%`,
              backgroundColor: marker.color,
            }}
            aria-label={`${marker.kindLabel} at ${formatClock(marker.mistake.time)}`}
            data-tour-key={marker.tourKey}
            onPointerDown={(event) => {
              // A marker click is a jump, not a bar scrub.
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.stopPropagation();
              onMarkerJump(marker);
            }}
            onMouseEnter={() => setHoveredKey(marker.key)}
            onMouseLeave={() => setHoveredKey((key) => (key === marker.key ? null : key))}
          />
        ))}
      </div>
    </div>
  );
}
