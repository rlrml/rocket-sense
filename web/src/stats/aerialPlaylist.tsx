import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getPlayerProfile,
  getPlayerProfileByRef,
  getReplay,
  listPlayerEvents,
  listReplayEvents,
} from "../api";
import { playerProfileIdPath } from "../playerIdentity";
import { subtrActorPlayerUrl } from "../playerLink";
import type { MechanicEventResponse } from "../types";
import type { EventClip } from "./EventClipPlayer";
import { EventClipPlayer } from "./EventClipPlayer";
import { aerialKindLabel } from "./aerialKinds";
import { eventAnchorFrame, eventDisplayTime } from "./eventPreview";
import { preloadReplayModel } from "./replayModel";

// Seconds of context shown around each mechanic when previewing its clip. Spans
// (e.g. air dribbles, which carry start_time/end_time) get the preroll before
// their start and the postroll after their end; point mechanics use the single
// event time for both ends.
const AERIAL_CLIP_PREROLL_SECONDS = 4;
const AERIAL_CLIP_POSTROLL_SECONDS = 3;

interface AerialRow {
  event: MechanicEventResponse;
  index: number;
  /** Display time of the mechanic (seconds), used for the card label. */
  time: number | null;
  startTime: number | null;
  endTime: number | null;
  anchorFrame: number | null;
  playerName: string;
  team: number | null;
  kind: string;
  /** A short payload-derived flavor (origin / wall), shown on the card. */
  detail: string | null;
}

export function buildAerialClip(row: AerialRow, replayNonce: number): EventClip | null {
  if (row.time == null) {
    return null;
  }
  const startTime = row.startTime ?? row.time;
  const endTime = row.endTime ?? row.time;
  return {
    start: Math.max(0, startTime - AERIAL_CLIP_PREROLL_SECONDS),
    end: endTime + AERIAL_CLIP_POSTROLL_SECONDS,
    anchorFrame: row.anchorFrame,
    prerollSeconds: AERIAL_CLIP_PREROLL_SECONDS,
    postrollSeconds: AERIAL_CLIP_POSTROLL_SECONDS,
    camera: (cam) => {
      if (!cam.followPlayer({ playerName: row.playerName, ballCam: true })) {
        cam.freeCamera("side");
      }
    },
    key: `${row.event.id}:${replayNonce}`,
  };
}

/** Optional client-side payload filters carried on the playlist URL. */
interface AerialFilter {
  origin: string | null;
  wall: string | null;
}

function readAerialFilter(params: URLSearchParams): AerialFilter {
  return { origin: params.get("origin"), wall: params.get("wall") };
}

// Stats filters (team-size, game-type, …) belong on the listPlayerEvents request;
// the payload sub-filters below are applied client-side and must not be forwarded.
function eventRequestParams(params: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(params);
  next.delete("origin");
  next.delete("wall");
  return next;
}

/** Playlist of every mechanic of one kind within a single replay. */
export function ReplayAerialPlaylistPage() {
  const { replayId = "", aerialKind = "" } = useParams();
  const { search } = useLocation();
  const filter = useMemo(() => readAerialFilter(new URLSearchParams(search)), [search]);
  const { events, loading, error } = useAerialEvents(
    useCallback(() => listReplayEvents(replayId, [aerialKind]), [replayId, aerialKind]),
  );
  const [replayName, setReplayName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setReplayName(null);
    getReplay(replayId)
      .then((replay) => {
        if (!cancelled) setReplayName(replay.original_file_name || replay.id);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [replayId]);

  const rows = useMemo(
    () => playlistRows(events, aerialKind, filter),
    [events, aerialKind, filter],
  );

  return (
    <AerialPlaylist
      aerialKind={aerialKind}
      filter={filter}
      rows={rows}
      loading={loading}
      error={error}
      contextLabel={replayName ?? replayId}
      backHref={`/replays/${encodeURIComponent(replayId)}/stats/aerials`}
      showReplayGroups={false}
    />
  );
}

/** Playlist of every mechanic of one kind by a player, across their replays. */
export function PlayerAerialPlaylistPage() {
  const { platform = "", platformPlayerId, playerName, aerialKind = "" } = useParams();
  const { search } = useLocation();
  const routePlayerRef = platformPlayerId ?? playerName ?? "";
  const routeUsesExplicitId = platformPlayerId != null;
  const routeBasePath = routeUsesExplicitId
    ? playerProfileIdPath(platform, routePlayerRef)
    : `/players/${encodeURIComponent(platform)}/${encodeURIComponent(routePlayerRef)}`;
  const [resolvedPlayerId, setResolvedPlayerId] = useState<string | null>(
    routeUsesExplicitId ? `${platform}:${routePlayerRef}` : null,
  );
  const filter = useMemo(() => readAerialFilter(new URLSearchParams(search)), [search]);
  // Carry the stats filter context (playlist, game mode, dates, …) through to
  // the events request so the playlist matches the rates that linked here.
  const filterParams = useMemo(() => eventRequestParams(new URLSearchParams(search)), [search]);
  const { events, loading, error } = useAerialEvents(
    useCallback(
      () =>
        resolvedPlayerId ? listPlayerEvents(resolvedPlayerId, [aerialKind], filterParams) : null,
      [resolvedPlayerId, aerialKind, filterParams],
    ),
  );
  const [resolvedPlayerName, setResolvedPlayerName] = useState<string | null>(null);
  const [resolveError, setResolveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setResolvedPlayerName(null);
    setResolveError(null);
    setResolvedPlayerId(routeUsesExplicitId ? `${platform}:${routePlayerRef}` : null);
    const request = routeUsesExplicitId ? getPlayerProfile : getPlayerProfileByRef;
    request(platform, routePlayerRef, new URLSearchParams())
      .then((profile) => {
        if (cancelled) return;
        setResolvedPlayerName(profile.display_name);
        setResolvedPlayerId(`${profile.platform}:${profile.platform_player_id}`);
      })
      .catch((err: Error) => {
        if (!cancelled) setResolveError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [platform, routePlayerRef, routeUsesExplicitId]);

  const rows = useMemo(
    () => playlistRows(events, aerialKind, filter),
    [events, aerialKind, filter],
  );

  return (
    <AerialPlaylist
      aerialKind={aerialKind}
      filter={filter}
      rows={rows}
      loading={loading || (!resolvedPlayerId && !resolveError)}
      error={resolveError ?? error}
      contextLabel={resolvedPlayerName ?? routePlayerRef}
      backHref={`${routeBasePath}/stats/aerials${search}`}
      gameHref={(row) => `/replays/${encodeURIComponent(row.event.replay_id)}/stats/aerials`}
      showReplayGroups
    />
  );
}

function useAerialEvents(fetchEvents: () => Promise<{ events: MechanicEventResponse[] }> | null) {
  const [events, setEvents] = useState<MechanicEventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const request = fetchEvents();
    if (!request) {
      setEvents([]);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }
    request
      .then((response) => {
        if (!cancelled) setEvents(response.events);
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
  }, [fetchEvents]);

  return { events, loading, error };
}

/**
 * Mechanic rows in playlist order, limited to the requested kind (and any payload
 * sub-filter). Events arrive grouped by replay; sort within each replay group by
 * time so per-game ordering stays correct, then renumber across the playlist.
 */
function playlistRows(
  events: MechanicEventResponse[],
  aerialKind: string,
  filter: AerialFilter,
): AerialRow[] {
  const byReplay = new Map<string, MechanicEventResponse[]>();
  for (const event of events) {
    if (event.event_type !== aerialKind) continue;
    if (!matchesFilter(event, filter)) continue;
    const group = byReplay.get(event.replay_id);
    if (group) {
      group.push(event);
    } else {
      byReplay.set(event.replay_id, [event]);
    }
  }
  const rows: AerialRow[] = [];
  for (const group of byReplay.values()) {
    group
      .map((event) => ({ event, sortKey: eventDisplayTime(event) ?? 0 }))
      .sort(
        (left, right) =>
          left.sortKey - right.sortKey || left.event.id.localeCompare(right.event.id),
      )
      .forEach(({ event }) => {
        rows.push(buildAerialRow(event, aerialKind, rows.length));
      });
  }
  return rows;
}

function matchesFilter(event: MechanicEventResponse, filter: AerialFilter): boolean {
  if (filter.origin && stringPayload(event.payload, "air_dribble_origin") !== filter.origin) {
    return false;
  }
  if (filter.wall && stringPayload(event.payload, "wall") !== filter.wall) {
    return false;
  }
  return true;
}

function buildAerialRow(event: MechanicEventResponse, kind: string, index: number): AerialRow {
  return {
    event,
    index,
    time: eventDisplayTime(event),
    startTime: event.start_time,
    endTime: event.end_time,
    anchorFrame: eventAnchorFrame(event),
    playerName: event.player_name?.trim() || "Unknown",
    team: event.team,
    kind,
    detail: aerialRowDetail(event),
  };
}

// A short flavor for the card: the air-dribble origin or the wall a wall-aerial
// took off from. Only the mechanics that carry one render a chip.
function aerialRowDetail(event: MechanicEventResponse): string | null {
  const origin = stringPayload(event.payload, "air_dribble_origin");
  if (origin) return formatLabel(origin);
  const wall = stringPayload(event.payload, "wall");
  if (wall) return `${formatLabel(wall)} wall`;
  return null;
}

/**
 * Human-readable labels for each replay heading in a cross-replay playlist.
 * Resolved lazily: headings render immediately with game numbers, then pick up
 * the match date once the replay metadata loads.
 */
function useReplayDateLabels(rows: AerialRow[], enabled: boolean): Map<string, string> {
  const [labels, setLabels] = useState<Map<string, string>>(new Map());
  const replayIds = useMemo(() => {
    const ids = new Set<string>();
    for (const row of rows) {
      ids.add(row.event.replay_id);
    }
    return [...ids];
  }, [rows]);

  useEffect(() => {
    if (!enabled || replayIds.length === 0) {
      return;
    }
    let cancelled = false;
    void Promise.allSettled(
      replayIds.map(async (replayId) => {
        const replay = await getReplay(replayId);
        const date = replay.replay_date || replay.created_at;
        return [replayId, date ? formatReplayDate(date) : null] as const;
      }),
    ).then((results) => {
      if (cancelled) return;
      const next = new Map<string, string>();
      for (const result of results) {
        if (result.status === "fulfilled" && result.value[1]) {
          next.set(result.value[0], result.value[1]);
        }
      }
      setLabels(next);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, replayIds]);

  return labels;
}

function formatReplayDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function AerialPlaylist({
  aerialKind,
  filter,
  rows,
  loading,
  error,
  contextLabel,
  backHref,
  gameHref,
  showReplayGroups,
}: {
  aerialKind: string;
  filter: AerialFilter;
  rows: AerialRow[];
  loading: boolean;
  error: string | null;
  contextLabel: string;
  backHref: string;
  gameHref?: (row: AerialRow) => string;
  showReplayGroups: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [replayNonce, setReplayNonce] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Keep the playing mechanic visible as auto-advance walks down a long list.
  useEffect(() => {
    listRef.current
      ?.querySelector(".goal-card.selected")
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  // A new row set (kind switch, refetch) restarts the playlist from the top.
  useEffect(() => {
    setActiveIndex(0);
  }, [aerialKind, rows.length]);

  const activeRow = rows[activeIndex] ?? null;
  const clip = useMemo(
    () => (activeRow ? buildAerialClip(activeRow, replayNonce) : null),
    [activeRow, replayNonce],
  );

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((index) => {
        if (rows.length === 0) return 0;
        return (index + delta + rows.length) % rows.length;
      });
    },
    [rows.length],
  );

  const onClipEnd = useCallback(
    (clipKey: string) => {
      if (!autoAdvance || rows.length < 2) return;
      // Stray end notifications for an already-replaced clip must not double-advance.
      if (!clip || clipKey !== clip.key) return;
      step(1);
    },
    [autoAdvance, clip, rows.length, step],
  );

  // Warm the next mechanic's replay so cross-replay advances don't stall on parsing.
  useEffect(() => {
    if (rows.length < 2 || !activeRow) return;
    const next = rows[(activeIndex + 1) % rows.length];
    if (next && next.event.replay_id !== activeRow.event.replay_id) {
      preloadReplayModel(next.event.replay_id).catch(() => {});
    }
  }, [activeRow, activeIndex, rows]);

  const kindLabel = aerialKindLabel(aerialKind);
  const title = filter.origin
    ? `${formatLabel(filter.origin)} ${kindLabel.toLowerCase()}s`
    : filter.wall
      ? `${formatLabel(filter.wall)}-wall ${kindLabel.toLowerCase()}s`
      : `${kindLabel} clips`;
  // Game N ordinals: short UUIDv7 prefixes collide for replays uploaded close
  // together, so headings need a per-playlist number to stay distinguishable.
  const replayOrdinals = useMemo(() => {
    const ordinals = new Map<string, number>();
    for (const row of rows) {
      if (!ordinals.has(row.event.replay_id)) {
        ordinals.set(row.event.replay_id, ordinals.size + 1);
      }
    }
    return ordinals;
  }, [rows]);
  const replayDateLabels = useReplayDateLabels(rows, showReplayGroups);

  return (
    <section className="page goal-playlist-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Aerial playlist</p>
          <h1>{title}</h1>
          <p className="subtle">{contextLabel}</p>
        </div>
        <div className="button-row">
          <Link className="secondary-button" to={backHref}>
            <ChevronLeft size={16} />
            Back to aerials
          </Link>
        </div>
      </header>

      {error ? (
        <div className="api-notice">
          <strong>Aerial events</strong>
          <span>{error}</span>
        </div>
      ) : null}

      {loading ? (
        <div className="stat-empty">Loading aerial mechanics…</div>
      ) : rows.length === 0 ? (
        <div className="stat-empty">No {kindLabel.toLowerCase()} clips found here yet.</div>
      ) : (
        <div className="goal-playlist-layout">
          <section className="chart-panel goal-playlist-player-panel">
            <div className="chart-panel-header">
              <div>
                <h3>
                  {activeRow
                    ? `${activeIndex + 1} / ${rows.length} · ${activeRow.playerName} · ${formatSeconds(activeRow.time)}`
                    : "No clip selected"}
                </h3>
              </div>
              <div className="goal-playlist-controls">
                <label
                  className="goal-playlist-autoplay"
                  title="Move to the next clip when this one ends"
                >
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={(event) => setAutoAdvance(event.currentTarget.checked)}
                  />
                  Auto-advance
                </label>
                <button
                  type="button"
                  className="icon-button"
                  title="Previous clip"
                  onClick={() => step(-1)}
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  title="Next clip"
                  onClick={() => step(1)}
                >
                  <ChevronRight size={17} />
                </button>
                {activeRow ? (
                  <a
                    className="icon-button"
                    title="Open full player"
                    href={subtrActorPlayerUrl(activeRow.event.replay_id)}
                  >
                    <ExternalLink size={15} />
                  </a>
                ) : null}
              </div>
            </div>
            {activeRow ? (
              <EventClipPlayer
                replayId={activeRow.event.replay_id}
                clip={clip}
                onClipEnd={onClipEnd}
              />
            ) : null}
          </section>

          <section className="chart-panel goal-playlist-list-panel">
            <div className="chart-panel-header">
              <div>
                <h3>{kindLabel}s</h3>
              </div>
            </div>
            <div className="goal-card-list kickoff-card-list" ref={listRef}>
              {rows.map((row, index) => {
                const previous = rows[index - 1];
                const startsNewReplay =
                  showReplayGroups &&
                  (!previous || previous.event.replay_id !== row.event.replay_id);
                return (
                  <Fragment key={row.event.id}>
                    {startsNewReplay ? (
                      <Link
                        className="goal-playlist-replay-heading"
                        to={`/replays/${encodeURIComponent(row.event.replay_id)}/stats/aerials`}
                      >
                        Game {replayOrdinals.get(row.event.replay_id)}
                        {" · "}
                        {replayDateLabels.get(row.event.replay_id) ??
                          row.event.replay_id.slice(0, 8)}
                      </Link>
                    ) : null}
                    <AerialCard
                      row={row}
                      active={index === activeIndex}
                      onActivate={() => {
                        setActiveIndex(index);
                        if (index === activeIndex) {
                          setReplayNonce((nonce) => nonce + 1);
                        }
                      }}
                      gameHref={gameHref?.(row)}
                    />
                  </Fragment>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

function AerialCard({
  row,
  active,
  onActivate,
  gameHref,
}: {
  row: AerialRow;
  active: boolean;
  onActivate: () => void;
  gameHref?: string;
}) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={`goal-card kickoff-card winner-${teamClass(row.team)} ${active ? "selected" : ""}`}
      onClick={onActivate}
    >
      <div className="goal-card-info">
        <div className="kickoff-card-header">
          <div className="goal-card-heading">
            <span className={`goal-card-index team-chip-${teamClass(row.team)}`}>
              {row.index + 1}
            </span>
            <h4>{row.playerName}</h4>
            <span className={`kickoff-goal-chip team-chip-${teamClass(row.team)}`}>
              {teamLabel(row.team)}
            </span>
          </div>
          <div className="goal-card-header-right">
            <strong>{formatSeconds(row.time)}</strong>
            {gameHref ? (
              <span
                className="goal-card-game-link"
                role="link"
                tabIndex={0}
                title="Open the game this clip came from"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(gameHref);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.stopPropagation();
                    navigate(gameHref);
                  }
                }}
              >
                Game
                <ExternalLink size={12} />
              </span>
            ) : null}
          </div>
        </div>
        {row.detail ? (
          <div className="goal-card-types">
            <span className="goal-type-chip">{row.detail}</span>
          </div>
        ) : null}
      </div>
    </button>
  );
}

function teamClass(team: number | null): string {
  return team === 0 ? "blue" : team === 1 ? "orange" : "neutral";
}

function teamLabel(team: number | null): string {
  return team === 0 ? "Blue" : team === 1 ? "Orange" : "Neutral";
}

function formatLabel(value: string): string {
  return value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function formatSeconds(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "-";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  const tenths = value < 10 ? `.${Math.round((value % 1) * 10)}` : "";
  return `${minutes}:${seconds.toString().padStart(2, "0")}${tenths}`;
}
