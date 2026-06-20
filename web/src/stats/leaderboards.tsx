import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAppearancesLeaderboard,
  getEventLeaderboard,
  getStatLeaderboard,
  getUploadsLeaderboard,
  listEventTypes,
} from "../api";
import { playerProfilePath } from "../playerIdentity";
import type {
  AppearancesLeaderboardRow,
  EventLeaderboardRow,
  EventTypeResponse,
  StatLeaderboardRow,
  UploadsLeaderboardRow,
} from "../types";
import { StatPlayerLabel } from "./shared";

type Metric = "appearances" | "uploads" | "event" | "stat";

const PAGE_SIZE = 50;
const RATE_WINDOW_MINUTES = 5;

const metricOptions: Array<{ value: Metric; label: string }> = [
  { value: "appearances", label: "Player appearances" },
  { value: "uploads", label: "Uploads" },
  { value: "event", label: "Event" },
  { value: "stat", label: "Stat" },
];

const statOptions = [
  { value: "ball-opponent-half", label: "Ball in opponent half" },
  { value: "possession-time", label: "Possession time" },
];

function sortOptions(rateWindowMinutes: number, includeShare = false) {
  const options = [
    { value: "total", label: "Total" },
    { value: "per-game", label: "Per game" },
    {
      value: "per-minute",
      label: rateWindowMinutes === 1 ? "Per min" : `Per ${rateWindowMinutes} min`,
    },
  ];
  if (includeShare) {
    options.push({ value: "share", label: "Share" });
  }
  return options;
}
function formatRate(value: number | null): string {
  return value == null ? "-" : value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatPercent(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "-";
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 1,
    style: "percent",
  });
}

function formatDurationCompact(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "-";
  const totalSeconds = Math.max(0, Math.round(value));
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60) return seconds ? `${minutes}m ${seconds}s` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function perRateWindow(perMinute: number | null, rateWindowMinutes: number): number | null {
  return perMinute == null ? null : perMinute * rateWindowMinutes;
}

function perDurationWindow(perMinute: number | null, rateWindowMinutes: number): string {
  return formatDurationCompact(perRateWindow(perMinute, rateWindowMinutes));
}

// Mirrors the segmentation used everywhere else (see App.tsx); team size and
// competitive context are the orthogonal "game type" filters.
const teamSizeOptions = [
  { value: "", label: "All modes" },
  { value: "1", label: "1v1" },
  { value: "2", label: "2v2" },
  { value: "3", label: "3v3" },
  { value: "4", label: "4v4" },
];

const gameTypeOptions = [
  { value: "", label: "Any context" },
  { value: "ranked", label: "Ranked" },
  { value: "casual", label: "Casual" },
  { value: "tournament", label: "Tournament" },
];

const playlistOptions = [
  { value: "", label: "Any playlist" },
  { value: "ranked-duels", label: "Ranked Duels" },
  { value: "ranked-doubles", label: "Ranked Doubles" },
  { value: "ranked-standard", label: "Ranked Standard" },
  { value: "casual-duels", label: "Casual Duels" },
  { value: "casual-doubles", label: "Casual Doubles" },
  { value: "casual-standard", label: "Casual Standard" },
  { value: "private", label: "Private" },
  { value: "tournament", label: "Tournament" },
];

function metricFromSearch(search: string): Metric {
  const value = new URLSearchParams(search).get("metric");
  if (value === "uploads" || value === "event" || value === "stat") return value;
  return "appearances";
}

interface LeaderboardPage<T> {
  rows: T[];
  total: number;
  next_offset: number | null;
}

function useLeaderboard<T>(
  fetcher: (params: URLSearchParams) => Promise<LeaderboardPage<T>>,
  filterKey: string,
) {
  const [rows, setRows] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [nextOffset, setNextOffset] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams(filterKey);
    params.set("count", String(PAGE_SIZE));
    fetcher(params)
      .then((response) => {
        if (cancelled) return;
        setRows(response.rows);
        setTotal(response.total);
        setNextOffset(response.next_offset);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetcher, filterKey]);

  const loadMore = useCallback(() => {
    if (nextOffset == null || loadingMore) return;
    setLoadingMore(true);
    const params = new URLSearchParams(filterKey);
    params.set("count", String(PAGE_SIZE));
    params.set("offset", String(nextOffset));
    fetcher(params)
      .then((response) => {
        setRows((prev) => [...prev, ...response.rows]);
        setTotal(response.total);
        setNextOffset(response.next_offset);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => setLoadingMore(false));
  }, [fetcher, filterKey, loadingMore, nextOffset]);

  return { rows, total, nextOffset, loading, loadingMore, error, loadMore };
}

function LoadMore({
  shown,
  total,
  hasMore,
  loadingMore,
  onLoadMore,
}: {
  shown: number;
  total: number;
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
}) {
  return (
    <div className="button-row leaderboard-footer">
      <span className="subtle">
        Showing {shown.toLocaleString()} of {total.toLocaleString()}
      </span>
      {hasMore ? (
        <button
          type="button"
          className="secondary-button"
          onClick={onLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading…" : "Load more"}
        </button>
      ) : null}
    </div>
  );
}

function AppearancesLeaderboard({ filterKey }: { filterKey: string }) {
  const { rows, total, nextOffset, loading, loadingMore, error, loadMore } =
    useLeaderboard<AppearancesLeaderboardRow>(getAppearancesLeaderboard, filterKey);

  if (loading) return <div className="stat-empty">Loading leaderboard…</div>;
  if (error) return <div className="stat-empty">Failed to load leaderboard: {error}</div>;
  if (!rows.length)
    return <div className="stat-empty">No player appearances match these filters.</div>;

  return (
    <>
      <div className="table-frame compact-table stat-leaderboard-table">
        <table>
          <thead>
            <tr>
              <th className="leaderboard-rank-col">#</th>
              <th>Player</th>
              <th>Replays</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const name = row.display_name || row.platform_player_id;
              return (
                <tr key={`${row.platform}:${row.platform_player_id}`}>
                  <td className="leaderboard-rank-col">{row.rank.toLocaleString()}</td>
                  <td>
                    <StatPlayerLabel
                      name={name}
                      platform={row.platform}
                      profilePath={playerProfilePath(row.platform, row.platform_player_id)}
                      subtitle={row.is_pro ? "Pro" : row.platform}
                    />
                  </td>
                  <td>{row.appearance_count.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <LoadMore
        shown={rows.length}
        total={total}
        hasMore={nextOffset != null}
        loadingMore={loadingMore}
        onLoadMore={loadMore}
      />
    </>
  );
}

function UploadsLeaderboard({ filterKey }: { filterKey: string }) {
  const { rows, total, nextOffset, loading, loadingMore, error, loadMore } =
    useLeaderboard<UploadsLeaderboardRow>(getUploadsLeaderboard, filterKey);

  if (loading) return <div className="stat-empty">Loading leaderboard…</div>;
  if (error) return <div className="stat-empty">Failed to load leaderboard: {error}</div>;
  if (!rows.length) return <div className="stat-empty">No uploads match these filters.</div>;

  return (
    <>
      <div className="table-frame compact-table stat-leaderboard-table">
        <table>
          <thead>
            <tr>
              <th className="leaderboard-rank-col">#</th>
              <th>Uploader</th>
              <th>Uploads</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.user_id}>
                <td className="leaderboard-rank-col">{row.rank.toLocaleString()}</td>
                <td>{row.display_name || "Unnamed uploader"}</td>
                <td>{row.upload_count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <LoadMore
        shown={rows.length}
        total={total}
        hasMore={nextOffset != null}
        loadingMore={loadingMore}
        onLoadMore={loadMore}
      />
    </>
  );
}

function EventLeaderboard({
  filterKey,
  rateWindowMinutes,
}: {
  filterKey: string;
  rateWindowMinutes: number;
}) {
  const { rows, total, nextOffset, loading, loadingMore, error, loadMore } =
    useLeaderboard<EventLeaderboardRow>(getEventLeaderboard, filterKey);
  const rateColumnLabel = rateWindowMinutes === 1 ? "Per min" : `Per ${rateWindowMinutes} min`;

  if (loading) return <div className="stat-empty">Loading leaderboard…</div>;
  if (error) return <div className="stat-empty">Failed to load leaderboard: {error}</div>;
  if (!rows.length)
    return <div className="stat-empty">No players recorded this event under these filters.</div>;

  return (
    <>
      <div className="table-frame compact-table stat-leaderboard-table">
        <table>
          <thead>
            <tr>
              <th className="leaderboard-rank-col">#</th>
              <th>Player</th>
              <th>Total</th>
              <th>Games</th>
              <th>Per game</th>
              <th>{rateColumnLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const name = row.display_name || row.platform_player_id;
              return (
                <tr key={`${row.platform}:${row.platform_player_id}`}>
                  <td className="leaderboard-rank-col">{row.rank.toLocaleString()}</td>
                  <td>
                    <StatPlayerLabel
                      name={name}
                      platform={row.platform}
                      profilePath={playerProfilePath(row.platform, row.platform_player_id)}
                      subtitle={row.is_pro ? "Pro" : row.platform}
                    />
                  </td>
                  <td>{row.event_count.toLocaleString()}</td>
                  <td>{row.replay_count.toLocaleString()}</td>
                  <td>{formatRate(row.count_per_game)}</td>
                  <td>{formatRate(perRateWindow(row.per_active_minute, rateWindowMinutes))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <LoadMore
        shown={rows.length}
        total={total}
        hasMore={nextOffset != null}
        loadingMore={loadingMore}
        onLoadMore={loadMore}
      />
    </>
  );
}

function StatLeaderboard({
  filterKey,
  rateWindowMinutes,
}: {
  filterKey: string;
  rateWindowMinutes: number;
}) {
  const { rows, total, nextOffset, loading, loadingMore, error, loadMore } =
    useLeaderboard<StatLeaderboardRow>(getStatLeaderboard, filterKey);
  const rateColumnLabel = rateWindowMinutes === 1 ? "Per min" : `Per ${rateWindowMinutes} min`;

  if (loading) return <div className="stat-empty">Loading leaderboard…</div>;
  if (error) return <div className="stat-empty">Failed to load leaderboard: {error}</div>;
  if (!rows.length)
    return <div className="stat-empty">No players recorded this stat under these filters.</div>;

  return (
    <>
      <div className="table-frame compact-table stat-leaderboard-table">
        <table>
          <thead>
            <tr>
              <th className="leaderboard-rank-col">#</th>
              <th>Player</th>
              <th>Total</th>
              <th>Share</th>
              <th>Games</th>
              <th>Per game</th>
              <th>{rateColumnLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const name = row.display_name || row.platform_player_id;
              return (
                <tr key={`${row.platform}:${row.platform_player_id}`}>
                  <td className="leaderboard-rank-col">{row.rank.toLocaleString()}</td>
                  <td>
                    <StatPlayerLabel
                      name={name}
                      platform={row.platform}
                      profilePath={playerProfilePath(row.platform, row.platform_player_id)}
                      subtitle={row.is_pro ? "Pro" : row.platform}
                    />
                  </td>
                  <td>{formatDurationCompact(row.value)}</td>
                  <td>{formatPercent(row.share_of_active_time)}</td>
                  <td>{row.replay_count.toLocaleString()}</td>
                  <td>{formatDurationCompact(row.value_per_game)}</td>
                  <td>{perDurationWindow(row.value_per_active_minute, rateWindowMinutes)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <LoadMore
        shown={rows.length}
        total={total}
        hasMore={nextOffset != null}
        loadingMore={loadingMore}
        onLoadMore={loadMore}
      />
    </>
  );
}

// The leaderboard counts discrete per-player events, so the picker hides the
// continuous "state" streams the backend's visibility filter excludes
// (AGGREGATE_VISIBLE_EVENT_SOURCE_STREAM_SQL in stats.rs) — every "positioning"
// event plus a couple of sampled movement streams. Picking one would only ever
// return an empty board.
const NON_COUNTABLE_EVENT_CATEGORIES = new Set(["positioning"]);
const NON_COUNTABLE_EVENT_KEYS = new Set(["movement", "powerslide"]);

function isCountableEventType(eventType: EventTypeResponse): boolean {
  return (
    !NON_COUNTABLE_EVENT_CATEGORIES.has(eventType.category) &&
    !NON_COUNTABLE_EVENT_KEYS.has(eventType.key)
  );
}

function isBoostEventType(eventType: EventTypeResponse | undefined): boolean {
  if (!eventType) return false;
  return eventType.category === "boost" || eventType.key.startsWith("boost");
}

// Event-type options come from the live registry so the board stays in sync
// with whatever the pipeline currently emits.
function useEventTypes(): EventTypeResponse[] {
  const [eventTypes, setEventTypes] = useState<EventTypeResponse[]>([]);
  useEffect(() => {
    let cancelled = false;
    listEventTypes()
      .then((response) => {
        if (!cancelled) {
          const sorted = response.event_types
            .filter(isCountableEventType)
            .sort((a, b) =>
              (a.category + a.display_name).localeCompare(b.category + b.display_name),
            );
          setEventTypes(sorted);
        }
      })
      .catch(() => {
        if (!cancelled) setEventTypes([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return eventTypes;
}

function SegmentNav({
  ariaLabel,
  label,
  current,
  options,
  onSelect,
}: {
  ariaLabel: string;
  label: string;
  current: string;
  options: Array<{ value: string; label: string }>;
  onSelect: (value: string) => void;
}) {
  return (
    <nav className="stat-group-nav" aria-label={ariaLabel}>
      <span className="segment-bar-label">{label}</span>
      {options.map((option) => (
        <button
          key={option.value || "all"}
          type="button"
          className={`stat-group-link ${current === option.value ? "active" : ""}`.trim()}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </nav>
  );
}

export function LeaderboardsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const metric = metricFromSearch(location.search);
  const teamSize = params.get("team-size") ?? "";
  const gameType = params.get("game-type") ?? "";
  const playlist = params.get("playlist") ?? "";
  const eventType = params.get("event-type") ?? "";
  const stat = params.get("stat") ?? "ball-opponent-half";
  const eventSort = params.get("sort") ?? "total";
  const statSort = params.get("sort") ?? "per-minute";
  const minGames = params.get("min-games") ?? "";
  const eventTypes = useEventTypes();
  const selectedEventType = eventTypes.find((option) => option.key === eventType);
  const eventRateWindowMinutes = isBoostEventType(selectedEventType) ? 1 : RATE_WINDOW_MINUTES;
  const statRateWindowMinutes = RATE_WINDOW_MINUTES;

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(location.search);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      const query = next.toString();
      navigate(query ? `${location.pathname}?${query}` : location.pathname, { replace: true });
    },
    [location.pathname, location.search, navigate],
  );

  // The API filter key intentionally excludes `metric` (which only picks the
  // endpoint) so that switching metric while keeping filters reuses cached
  // params, and so that pagination keys stay stable per filter set.
  const replayFilterKey = useMemo(() => {
    const filters = new URLSearchParams();
    if (teamSize) filters.set("team-size", teamSize);
    if (gameType) filters.set("game-type", gameType);
    if (playlist) filters.set("playlist", playlist);
    return filters.toString();
  }, [gameType, playlist, teamSize]);

  // The event board layers its own params (event-type / sort / min-games) on
  // top of the shared replay filters.
  const eventFilterKey = useMemo(() => {
    const filters = new URLSearchParams(replayFilterKey);
    if (eventType) filters.set("event-type", eventType);
    if (eventSort && eventSort !== "total") filters.set("sort", eventSort);
    if (minGames) filters.set("min-games", minGames);
    return filters.toString();
  }, [eventSort, eventType, minGames, replayFilterKey]);

  const statFilterKey = useMemo(() => {
    const filters = new URLSearchParams(replayFilterKey);
    if (stat) filters.set("stat", stat);
    if (statSort) filters.set("sort", statSort);
    if (minGames) filters.set("min-games", minGames);
    return filters.toString();
  }, [minGames, replayFilterKey, stat, statSort]);

  return (
    <section className="page leaderboards-page">
      <header className="page-header leaderboard-page-header">
        <div>
          <p className="eyebrow">Leaderboards</p>
          <h1>Leaderboards</h1>
        </div>
      </header>

      <div className="player-segment-bar">
        <SegmentNav
          ariaLabel="Leaderboard metric"
          label="Board"
          current={metric}
          options={metricOptions}
          onSelect={(value) => setParam("metric", value === "appearances" ? "" : value)}
        />
        <SegmentNav
          ariaLabel="Mode segment"
          label="Mode"
          current={teamSize}
          options={teamSizeOptions}
          onSelect={(value) => setParam("team-size", value)}
        />
        <SegmentNav
          ariaLabel="Competitive context segment"
          label="Context"
          current={gameType}
          options={gameTypeOptions}
          onSelect={(value) => setParam("game-type", value)}
        />
        <label className="leaderboard-playlist-filter">
          <span className="segment-bar-label">Playlist</span>
          <select
            value={playlist}
            onChange={(event) => setParam("playlist", event.currentTarget.value)}
          >
            {playlistOptions.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {metric === "event" ? (
        <div className="player-segment-bar">
          <label className="leaderboard-playlist-filter">
            <span className="segment-bar-label">Event</span>
            <select
              value={eventType}
              onChange={(changeEvent) => setParam("event-type", changeEvent.currentTarget.value)}
            >
              <option value="">All events</option>
              {eventTypes.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.display_name} ({option.category})
                </option>
              ))}
            </select>
          </label>
          <SegmentNav
            ariaLabel="Ranking metric"
            label="Rank by"
            current={eventSort}
            options={sortOptions(eventRateWindowMinutes)}
            onSelect={(value) => setParam("sort", value === "total" ? "" : value)}
          />
          <label className="leaderboard-playlist-filter">
            <span className="segment-bar-label">Min games</span>
            <input
              type="number"
              min="1"
              placeholder="1"
              value={minGames}
              onChange={(event) => setParam("min-games", event.currentTarget.value)}
            />
          </label>
        </div>
      ) : metric === "stat" ? (
        <div className="player-segment-bar">
          <label className="leaderboard-playlist-filter">
            <span className="segment-bar-label">Stat</span>
            <select value={stat} onChange={(event) => setParam("stat", event.currentTarget.value)}>
              {statOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <SegmentNav
            ariaLabel="Ranking metric"
            label="Rank by"
            current={statSort}
            options={sortOptions(statRateWindowMinutes, true)}
            onSelect={(value) => setParam("sort", value === "per-minute" ? "" : value)}
          />
          <label className="leaderboard-playlist-filter">
            <span className="segment-bar-label">Min games</span>
            <input
              type="number"
              min="1"
              placeholder="1"
              value={minGames}
              onChange={(event) => setParam("min-games", event.currentTarget.value)}
            />
          </label>
        </div>
      ) : null}

      <div className="chart-panel leaderboard-panel">
        <div className="chart-panel-header">
          <h2>
            {metric === "uploads"
              ? "Top uploaders"
              : metric === "event"
                ? "Event leaderboard"
                : metric === "stat"
                  ? "Stat leaderboard"
                  : "Most-seen players"}
          </h2>
          <p className="subtle">
            {metric === "uploads"
              ? "Ranked by number of replays uploaded."
              : metric === "event"
                ? `Ranked by a chosen event type — total, per game, or ${
                    eventRateWindowMinutes === 1
                      ? "per active minute"
                      : `per ${eventRateWindowMinutes} active minutes`
                  }.`
                : metric === "stat"
                  ? `Ranked by an accumulated stat — total time, share, per game, or per ${statRateWindowMinutes} active minutes.`
                  : "Ranked by number of replays a player appears in."}
          </p>
        </div>
        {metric === "uploads" ? (
          <UploadsLeaderboard filterKey={replayFilterKey} />
        ) : metric === "event" ? (
          <EventLeaderboard filterKey={eventFilterKey} rateWindowMinutes={eventRateWindowMinutes} />
        ) : metric === "stat" ? (
          <StatLeaderboard filterKey={statFilterKey} rateWindowMinutes={statRateWindowMinutes} />
        ) : (
          <AppearancesLeaderboard filterKey={replayFilterKey} />
        )}
      </div>

      <p className="muted-text leaderboard-replay-link">
        Want the underlying games?{" "}
        <Link className="primary-link" to="/replays">
          Browse replays
        </Link>
        .
      </p>
    </section>
  );
}
