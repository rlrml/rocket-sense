import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
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

type MetricKind = "appearances" | "uploads" | "event" | "stat";
type Aggregation = "total" | "per-game" | "per-minute" | "share" | "average";

const PAGE_SIZE = 50;
const RATE_WINDOW_MINUTES = 5;
const DEFAULT_MIN_GAMES = "10";
const DEFAULT_BOARD = "event:goal";

const EVENT_AGGREGATIONS: Aggregation[] = ["total", "per-game", "per-minute"];
const STAT_AGGREGATIONS: Aggregation[] = ["total", "per-game", "per-minute", "share"];
const AVERAGE_STAT_AGGREGATIONS: Aggregation[] = ["average"];

// A leaderboard is one METRIC ranked by an AGGREGATION within a SCOPE. Every
// rankable thing — counted events, accumulated stats, plain activity counts —
// is described by a single CatalogMetric, so the picker, the URL, and the table
// never need to know which backend endpoint it came from. `category` drives the
// grouping in the catalog; `aggregations` is empty for metrics with a single
// natural ranking (appearances, uploads).
interface CatalogMetric {
  id: string;
  kind: MetricKind;
  label: string;
  category: string;
  param?: string;
  aggregations: Aggregation[];
  description: string;
}

// Catalog grouping is by theme, and the themes come straight from the event-type
// registry's `category` (core / mechanic / possession / contact / boost / …). The
// materialized stats and activity counts are slotted into the same theme list —
// there is intentionally no "event vs derived" axis in the UI.
//
// CATEGORY_ORDER and CATEGORY_LABELS only *curate* the categories we know about
// (nice label + stable position). The registry is the source of truth, so any
// category we haven't seen is still shown: it falls back to a title-cased label
// and is appended after the curated ones (see orderedCategories / categoryLabel).
// That keeps the catalog correct as the backend categorizer grows.
const CATEGORY_ORDER = [
  "activity",
  "core",
  "basic",
  "mechanic",
  "possession",
  "contact",
  "boost",
  "movement",
  "positioning",
  "other",
];
const CATEGORY_LABELS: Record<string, string> = {
  activity: "Activity",
  core: "Core",
  basic: "Basic events",
  mechanic: "Mechanics",
  possession: "Possession & control",
  contact: "Physical",
  boost: "Boost",
  movement: "Movement",
  positioning: "Positioning",
  other: "Other",
};

function categoryLabel(category: string): string {
  if (CATEGORY_LABELS[category]) return CATEGORY_LABELS[category];
  const words = category.replace(/[_-]+/g, " ").trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : category;
}

// Curated categories first (in CATEGORY_ORDER), then any others the registry
// surfaced, alphabetically — nothing is dropped just because we didn't predefine
// it.
function orderedCategories(present: Iterable<string>): string[] {
  const set = new Set(present);
  const known = CATEGORY_ORDER.filter((category) => set.has(category));
  const extra = [...set].filter((category) => !CATEGORY_ORDER.includes(category)).sort();
  return [...known, ...extra];
}

const ACTIVITY_METRICS: CatalogMetric[] = [
  {
    id: "appearances",
    kind: "appearances",
    label: "Player appearances",
    category: "activity",
    aggregations: [],
    description: "Ranked by number of replays a player appears in.",
  },
  {
    id: "uploads",
    kind: "uploads",
    label: "Uploads",
    category: "activity",
    aggregations: [],
    description: "Ranked by number of replays an account has uploaded.",
  },
];

const STAT_DESCRIPTIONS: Record<string, string> = {
  "ball-opponent-half": "Time spent with the ball in the opponent's half.",
  "possession-time": "Time in individual possession of the ball.",
  "touches-per-possession": "Average touches recorded in each individual possession.",
  "avg-possession-duration": "Average duration of each individual possession.",
};

const statOptions: Array<{
  value: string;
  label: string;
  aggregations?: Aggregation[];
}> = [
  { value: "ball-opponent-half", label: "Ball in opponent half" },
  { value: "possession-time", label: "Possession time" },
  {
    value: "touches-per-possession",
    label: "Touches per possession",
    aggregations: AVERAGE_STAT_AGGREGATIONS,
  },
  {
    value: "avg-possession-duration",
    label: "Average possession duration",
    aggregations: AVERAGE_STAT_AGGREGATIONS,
  },
];

function aggregationLabel(aggregation: Aggregation, rateWindowMinutes: number): string {
  switch (aggregation) {
    case "total":
      return "Total";
    case "per-game":
      return "Per game";
    case "per-minute":
      return rateWindowMinutes === 1 ? "Per min" : `Per ${rateWindowMinutes} min`;
    case "share":
      return "Share";
    case "average":
      return "Average";
  }
}

// Default to a rate ranking whenever one exists: raw totals mostly surface
// whoever has played the most, whereas the per-active-minute rate is the
// skill-comparable number. Falls back to the first aggregation otherwise.
function defaultAggregation(metric: CatalogMetric): Aggregation | null {
  if (!metric.aggregations.length) return null;
  if (metric.aggregations.includes("per-minute")) return "per-minute";
  return metric.aggregations[0];
}

// Build the full metric catalog: static activity + stat metrics, plus one entry
// per countable event type from the live registry.
function buildCatalog(eventTypes: EventTypeResponse[]): CatalogMetric[] {
  const statMetrics: CatalogMetric[] = statOptions.map((option) => ({
    id: `stat:${option.value}`,
    kind: "stat",
    label: option.label,
    category: "possession",
    param: option.value,
    aggregations: option.aggregations ?? STAT_AGGREGATIONS,
    description: STAT_DESCRIPTIONS[option.value] ?? "",
  }));
  const eventMetrics: CatalogMetric[] = eventTypes.map((eventType) => ({
    id: `event:${eventType.key}`,
    kind: "event",
    label: eventType.display_name,
    category: eventType.category,
    param: eventType.key,
    aggregations: EVENT_AGGREGATIONS,
    description:
      eventType.description ?? `Ranked by ${eventType.display_name.toLowerCase()} count.`,
  }));
  return [...ACTIVITY_METRICS, ...statMetrics, ...eventMetrics];
}

// Resolve a board id to a metric. Falls back to synthesizing an entry straight
// from the id so deep links keep working before the event registry loads (or
// for a key the registry no longer lists).
function resolveBoard(id: string, catalog: CatalogMetric[]): CatalogMetric | null {
  const found = catalog.find((metric) => metric.id === id);
  if (found) return found;
  if (id.startsWith("event:")) {
    const key = id.slice("event:".length);
    return {
      id,
      kind: "event",
      label: key,
      category: "other",
      param: key,
      aggregations: EVENT_AGGREGATIONS,
      description: "",
    };
  }
  if (id.startsWith("stat:")) {
    const value = id.slice("stat:".length);
    const option = statOptions.find((candidate) => candidate.value === value);
    return {
      id,
      kind: "stat",
      label: option?.label ?? value,
      category: "possession",
      param: value,
      aggregations: option?.aggregations ?? STAT_AGGREGATIONS,
      description: STAT_DESCRIPTIONS[value] ?? "",
    };
  }
  return ACTIVITY_METRICS.find((metric) => metric.id === id) ?? null;
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

function formatAverageDuration(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "-";
  if (value < 60) {
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}s`;
  }
  return formatDurationCompact(value);
}

function isAverageStat(statKey: string | undefined): boolean {
  return statKey === "touches-per-possession" || statKey === "avg-possession-duration";
}

function formatAverageStatValue(statKey: string | undefined, value: number | null): string {
  if (statKey === "avg-possession-duration") return formatAverageDuration(value);
  return formatRate(value);
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

// Read the selected board id, migrating the legacy metric/event-type/stat params
// so old links and bookmarks still resolve.
function boardFromSearch(search: string): string {
  const params = new URLSearchParams(search);
  const board = params.get("board");
  if (board) return board;
  const metric = params.get("metric");
  if (metric === "uploads") return "uploads";
  if (metric === "appearances") return "appearances";
  if (metric === "event") {
    const key = params.get("event-type");
    return key ? `event:${key}` : DEFAULT_BOARD;
  }
  if (metric === "stat") {
    const stat = params.get("stat");
    return `stat:${stat ?? "ball-opponent-half"}`;
  }
  return DEFAULT_BOARD;
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
  statKey,
}: {
  filterKey: string;
  rateWindowMinutes: number;
  statKey?: string;
}) {
  const { rows, total, nextOffset, loading, loadingMore, error, loadMore } =
    useLeaderboard<StatLeaderboardRow>(getStatLeaderboard, filterKey);
  const rateColumnLabel = rateWindowMinutes === 1 ? "Per min" : `Per ${rateWindowMinutes} min`;
  const averageStat = isAverageStat(statKey);

  if (loading) return <div className="stat-empty">Loading leaderboard…</div>;
  if (error) return <div className="stat-empty">Failed to load leaderboard: {error}</div>;
  if (!rows.length)
    return <div className="stat-empty">No players recorded this stat under these filters.</div>;

  return (
    <>
      <div className="table-frame compact-table stat-leaderboard-table">
        {averageStat ? (
          <table>
            <thead>
              <tr>
                <th className="leaderboard-rank-col">#</th>
                <th>Player</th>
                <th>Average</th>
                <th>Possessions</th>
                <th>Games</th>
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
                    <td>{formatAverageStatValue(statKey, row.value)}</td>
                    <td>{row.sample_count?.toLocaleString() ?? "-"}</td>
                    <td>{row.replay_count.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
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
        )}
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

// An event type is shown in the catalog only if it passes BOTH gates below.
// Keep the two reasons for exclusion separate so each entry's rationale stays
// explicit and the lists are easy to audit and extend.
//
// Gate 1 — NOT COUNTABLE: continuous "state" streams the backend's visibility
// filter already drops (AGGREGATE_VISIBLE_EVENT_SOURCE_STREAM_SQL in stats.rs) —
// every "positioning" event plus sampled movement streams. Counting one is
// meaningless, so the board would always be empty.
const NON_COUNTABLE_EVENT_CATEGORIES = new Set(["positioning"]);
const NON_COUNTABLE_EVENT_KEYS = new Set(["movement", "powerslide"]);

// Gate 2 — NOT A USEFUL LEADERBOARD: countable, but ranking players by it isn't
// insightful, so it only adds noise to the catalog. Every entry needs a reason:
//   kickoff      — everyone takes ~one kickoff per game; the ranking is just
//                  "who played the most", which Appearances already shows.
//   dodge        — dodges are ubiquitous and not a skill signal on their own.
//   dodge_reset  — the raw dodge-reset event fires constantly (any wheels-up
//                  ground contact); it is not the "flip reset" mechanic players
//                  care about. See speedflip-diagonal-misclassification note.
const NON_LEADERBOARD_EVENT_KEYS = new Set(["kickoff", "dodge", "dodge_reset"]);

function isLeaderboardEvent(eventType: EventTypeResponse): boolean {
  return (
    !NON_COUNTABLE_EVENT_CATEGORIES.has(eventType.category) &&
    !NON_COUNTABLE_EVENT_KEYS.has(eventType.key) &&
    !NON_LEADERBOARD_EVENT_KEYS.has(eventType.key)
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
            .filter(isLeaderboardEvent)
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

// The metric catalog: a searchable, category-grouped picker for every
// leaderboard. Categories are tabs; metrics within the active category are
// chips. Typing in the search box flattens the whole catalog to matches grouped
// by category, so a metric is reachable either by browsing or by name.
function MetricCatalog({
  catalog,
  selectedId,
  onSelect,
}: {
  catalog: CatalogMetric[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const selectedCategory = catalog.find((metric) => metric.id === selectedId)?.category;
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory ?? "core");

  // Follow the selection when it lands in a different category (deep link, back
  // button, or picking from search). Browsing categories without selecting
  // doesn't move the selection, so this leaves manual browsing untouched.
  useEffect(() => {
    if (selectedCategory) setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  const categories = useMemo(
    () => orderedCategories(catalog.map((metric) => metric.category)),
    [catalog],
  );

  const query = search.trim().toLowerCase();
  const effectiveCategory = categories.includes(activeCategory)
    ? activeCategory
    : (categories[0] ?? "");
  const matches = query
    ? catalog.filter((metric) => metric.label.toLowerCase().includes(query))
    : catalog.filter((metric) => metric.category === effectiveCategory);

  const renderChip = (metric: CatalogMetric) => (
    <button
      key={metric.id}
      type="button"
      className={`leaderboard-metric-chip ${metric.id === selectedId ? "active" : ""}`.trim()}
      aria-pressed={metric.id === selectedId}
      onClick={() => onSelect(metric.id)}
    >
      {metric.label}
    </button>
  );

  return (
    <div className="leaderboard-catalog">
      <div className="leaderboard-catalog-search">
        <Search size={16} aria-hidden />
        <input
          type="search"
          placeholder="Search leaderboards…"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          aria-label="Search leaderboards"
        />
      </div>

      {query ? null : (
        <nav className="leaderboard-category-tabs" aria-label="Leaderboard categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`leaderboard-category-tab ${
                category === effectiveCategory ? "active" : ""
              }`.trim()}
              onClick={() => setActiveCategory(category)}
            >
              {categoryLabel(category)}
            </button>
          ))}
        </nav>
      )}

      <div className="leaderboard-metric-list">
        {query ? (
          categories.map((category) => {
            const items = matches.filter((metric) => metric.category === category);
            if (!items.length) return null;
            return (
              <div className="leaderboard-metric-group" key={category}>
                <span className="leaderboard-metric-group-label">{categoryLabel(category)}</span>
                <div className="leaderboard-metric-chips">{items.map(renderChip)}</div>
              </div>
            );
          })
        ) : (
          <div className="leaderboard-metric-chips">{matches.map(renderChip)}</div>
        )}
        {query && !matches.length ? (
          <p className="subtle">No leaderboards match “{search}”.</p>
        ) : null}
      </div>
    </div>
  );
}

export function LeaderboardsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const eventTypes = useEventTypes();
  const catalog = useMemo(() => buildCatalog(eventTypes), [eventTypes]);

  const boardId = boardFromSearch(location.search);
  const metric = useMemo(
    () => resolveBoard(boardId, catalog) ?? resolveBoard(DEFAULT_BOARD, catalog)!,
    [boardId, catalog],
  );

  const teamSize = params.get("team-size") ?? "";
  const gameType = params.get("game-type") ?? "";
  const playlist = params.get("playlist") ?? "";
  const minGames = params.get("min-games") ?? DEFAULT_MIN_GAMES;

  const selectedEventType =
    metric.kind === "event" ? eventTypes.find((option) => option.key === metric.param) : undefined;
  const rateWindowMinutes = isBoostEventType(selectedEventType) ? 1 : RATE_WINDOW_MINUTES;

  const sortParam = params.get("sort") ?? "";
  const activeSort: Aggregation | null =
    metric.aggregations.length === 0
      ? null
      : metric.aggregations.includes(sortParam as Aggregation)
        ? (sortParam as Aggregation)
        : defaultAggregation(metric);
  const showMinGames = metric.kind === "event" || metric.kind === "stat";

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

  const selectBoard = useCallback(
    (id: string) => {
      const next = new URLSearchParams(location.search);
      next.set("board", id);
      // Drop a ranking the new metric can't honor, and clear the legacy params
      // so the URL only ever carries the new board id.
      const target = resolveBoard(id, catalog);
      const sort = next.get("sort");
      if (!target || !sort || !target.aggregations.includes(sort as Aggregation)) {
        next.delete("sort");
      }
      next.delete("metric");
      next.delete("event-type");
      next.delete("stat");
      const query = next.toString();
      navigate(query ? `${location.pathname}?${query}` : location.pathname, { replace: true });
    },
    [catalog, location.pathname, location.search, navigate],
  );

  // Shared scope filters apply to every board. The event/stat boards layer their
  // own metric param, ranking, and min-games threshold on top.
  const replayFilterKey = useMemo(() => {
    const filters = new URLSearchParams();
    if (teamSize) filters.set("team-size", teamSize);
    if (gameType) filters.set("game-type", gameType);
    if (playlist) filters.set("playlist", playlist);
    return filters.toString();
  }, [gameType, playlist, teamSize]);

  const boardFilterKey = useMemo(() => {
    const filters = new URLSearchParams(replayFilterKey);
    if (metric.kind === "event") {
      if (metric.param) filters.set("event-type", metric.param);
      if (activeSort && activeSort !== "total") filters.set("sort", activeSort);
      if (minGames) filters.set("min-games", minGames);
    } else if (metric.kind === "stat") {
      if (metric.param) filters.set("stat", metric.param);
      if (activeSort) filters.set("sort", activeSort);
      if (minGames) filters.set("min-games", minGames);
    }
    return filters.toString();
  }, [activeSort, metric.kind, metric.param, minGames, replayFilterKey]);

  return (
    <section className="page leaderboards-page">
      <header className="page-header leaderboard-page-header">
        <div>
          <p className="eyebrow">Leaderboards</p>
          <h1>Leaderboards</h1>
        </div>
      </header>

      <MetricCatalog catalog={catalog} selectedId={metric.id} onSelect={selectBoard} />

      <div className="player-segment-bar leaderboard-scope-bar">
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
        {showMinGames ? (
          <label className="leaderboard-playlist-filter">
            <span className="segment-bar-label">Min games</span>
            <input
              type="number"
              min="1"
              placeholder={DEFAULT_MIN_GAMES}
              value={minGames}
              onChange={(event) => setParam("min-games", event.currentTarget.value)}
            />
          </label>
        ) : null}
      </div>

      <div className="chart-panel leaderboard-panel">
        <div className="chart-panel-header leaderboard-board-header">
          <div className="leaderboard-board-heading">
            <h2>{metric.label}</h2>
            {metric.description ? <p className="subtle">{metric.description}</p> : null}
          </div>
          {activeSort && metric.aggregations.length > 1 ? (
            <SegmentNav
              ariaLabel="Ranking metric"
              label="Rank by"
              current={activeSort}
              options={metric.aggregations.map((aggregation) => ({
                value: aggregation,
                label: aggregationLabel(aggregation, rateWindowMinutes),
              }))}
              onSelect={(value) => setParam("sort", value)}
            />
          ) : null}
        </div>
        {metric.kind === "uploads" ? (
          <UploadsLeaderboard filterKey={replayFilterKey} />
        ) : metric.kind === "event" ? (
          <EventLeaderboard filterKey={boardFilterKey} rateWindowMinutes={rateWindowMinutes} />
        ) : metric.kind === "stat" ? (
          <StatLeaderboard
            filterKey={boardFilterKey}
            rateWindowMinutes={rateWindowMinutes}
            statKey={metric.param}
          />
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
