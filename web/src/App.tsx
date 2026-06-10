import {
  Activity,
  AlertTriangle,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Copy,
  ExternalLink,
  FileVideo,
  LayoutDashboard,
  LogIn,
  RefreshCw,
  RotateCcw,
  ServerCog,
  SlidersHorizontal,
  X,
  Trash2,
  Search,
  Upload,
  Zap,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  clearAccessToken,
  createDevToken,
  createAccountToken,
  getAccessToken,
  getAuthOptions,
  getPlayerKickoffSummary,
  getPlayerProfile,
  getPlayerStatAggregates,
  getPlayerStatOverview,
  getReplay,
  getReplayStatAggregates,
  listEventTypes,
  listReplayEvents,
  listReplayFilterOptions,
  listReplayProcessingDiagnostics,
  listReplays,
  setAccessToken,
  uploadReplay,
} from "./api";
import { completedStatGroups, eventTypesForGroup, statGroups } from "./stats/registry";
import type { StatGroup } from "./stats/registry";
import {
  GoalTagSharePanel,
  KickoffSummaryPanel,
  PlayerRateComparisonChart,
  RotationTimeSharePanel,
} from "./stats/playerPanels";
import type {
  AuthOptionsResponse,
  EventStatSummaryResponse,
  EventTypeResponse,
  MechanicEventResponse,
  PlayerProfileResponse,
  PlayerProfileReplayResponse,
  PlayerStatOverviewResponse,
  ReplayProcessingDiagnostic,
  ReplayProcessingDiagnosticsResponse,
  ReplayFilterOption,
  ReplayPlayer,
  ReplayPlaylistMetadata,
  ReplayResponse,
  StatAggregateResponse,
  StatAggregateSetResponse,
} from "./types";

const navItems = [
  { to: "/replays", label: "Replays", icon: FileVideo, end: true },
  { to: "/events/review", label: "Events", icon: Activity },
  { to: "/admin/processing", label: "Admin", icon: ServerCog },
  { to: "/account", label: "Account", icon: CircleUser },
];

const playerStatsSectionGroups: StatGroup[] = statGroups;

export function App() {
  const location = useLocation();
  const playerReplayId = replayPlayerRouteId(location.pathname);
  const warmReplayId = shouldWarmSubtrActorPlayer(location.pathname)
    ? replayContextRouteId(location.pathname)
    : null;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/replays">
          <LayoutDashboard size={22} />
          <span>Rocket Sense</span>
        </Link>
        <nav id="primary-navigation" className="nav-list" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} className="nav-item" to={item.to} end={item.end}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main-panel">
        {playerReplayId ? (
          <ReplayPlayerPage replayId={playerReplayId} />
        ) : (
          <Routes>
            <Route path="/" element={<ReplayListPage />} />
            <Route path="/replays" element={<ReplayListPage />} />
            <Route path="/replays/:replayId" element={<ReplayStatsPage />} />
            <Route path="/replays/:replayId/stats" element={<ReplayStatsPage />} />
            <Route path="/replays/:replayId/stats/:statGroup" element={<ReplayStatsPage />} />
            <Route path="/players/:platform/:platformPlayerId" element={<PlayerStatsPage />} />
            <Route path="/players/:platform/:platformPlayerId/stats" element={<PlayerStatsPage />} />
            <Route path="/players/:platform/:platformPlayerId/stats/:statGroup" element={<PlayerStatsPage />} />
            <Route path="/events/review" element={<EventsReviewPage />} />
            <Route path="/mechanics/review" element={<EventsReviewPage />} />
            <Route path="/admin/processing" element={<AdminProcessingPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
        {warmReplayId ? <SubtrActorPlayerFrame key={warmReplayId} replayId={warmReplayId} visible={Boolean(playerReplayId)} /> : null}
      </main>
    </div>
  );
}

function replayPlayerRouteId(pathname: string): string | null {
  return /^\/replays\/([^/]+)\/player\/?$/.exec(pathname)?.[1] ?? null;
}

function replayContextRouteId(pathname: string): string | null {
  return /^\/replays\/([^/]+)(?:\/(?:stats(?:\/[^/]+)?|player))?\/?$/.exec(pathname)?.[1] ?? null;
}

function shouldWarmSubtrActorPlayer(pathname: string): boolean {
  // The goals detail view embeds its own replay player. Keeping the offscreen
  // full-player iframe alive there means two WebGL replay players render at
  // once, which can make Chrome/Wayland show a stale canvas layer.
  return !/^\/replays\/[^/]+(?:\/stats(?:\/goals)?)?\/?$/.test(pathname);
}

function ReplayListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const activeFilters = useMemo(() => replayFiltersFromParams(searchParams), [searchParams]);
  const [filters, setFilters] = useState(activeFilters);
  const [replays, setReplays] = useState<ReplayResponse[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const filterOptions = useReplayFilterOptions();

  useEffect(() => {
    setFilters(activeFilters);
  }, [activeFilters]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listReplays(searchParams)
      .then((response) => {
        if (!cancelled) {
          setReplays(response.replays);
          setTotal(response.total);
        }
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
  }, [searchParams]);

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    navigateWithReplayParams(navigate, location.search, replayFiltersToParams(filters));
  }

  function clearFilters() {
    setFilters(defaultReplayFilters());
    navigateWithReplayParams(navigate, location.search, new URLSearchParams());
  }

  function updatePageSize(count: string) {
    const params = new URLSearchParams(location.search);
    params.set("count", count);
    params.delete("offset");
    navigate(`/replays?${params.toString()}`);
  }

  function goToOffset(offset: number) {
    const params = new URLSearchParams(location.search);
    if (offset > 0) {
      params.set("offset", String(offset));
    } else {
      params.delete("offset");
    }
    navigate(`/replays?${params.toString()}`);
  }

  function updateReplayOrder(order: ReplayOrder) {
    const [sortBy, sortDir] = order.split(":");
    const params = new URLSearchParams(location.search);
    if (sortBy === "upload-date") {
      params.delete("sort-by");
    } else {
      params.set("sort-by", sortBy);
    }
    if (sortDir === "desc") {
      params.delete("sort-dir");
    } else {
      params.set("sort-dir", sortDir);
    }
    params.delete("offset");
    navigate(`/replays?${params.toString()}`);
  }

  async function onUpload(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const replay = await uploadReplay(file);
      navigate(`/replays/${replay.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const offset = positiveIntegerParam(searchParams, "offset", 0);
  const pageSize = replayPageSize(searchParams);
  const start = total === 0 || replays.length === 0 ? 0 : offset + 1;
  const end = offset + replays.length;
  const currentPage = Math.floor(offset / pageSize) + 1;
  const totalPages = total != null && total > 0 ? Math.ceil(total / pageSize) : 1;
  const previousOffset = Math.max(0, offset - pageSize);
  const nextOffset = offset + pageSize;
  const canPageBackward = offset > 0;
  const canPageForward = total == null ? replays.length === pageSize : nextOffset < total;
  const activeFilterChips = replayFilterChips(searchParams);
  const visiblePageSizeOptions = pageSizeOptions.includes(pageSize) ? pageSizeOptions : [...pageSizeOptions, pageSize].sort((a, b) => a - b);
  const mapOptions = replayOptionChoices(filters.map, [...filterOptions.maps, ...mapOptionsFromReplays(replays)]);
  const seasonOptions = replayOptionChoices(filters.season, [...filterOptions.seasons, ...seasonOptionsFromReplays(replays)]);
  const replayOrder = replayOrderFromParams(searchParams);
  const replayFilterFields: FilterFieldConfig[] = [
    {
      id: "player-names",
      label: "Player names",
      value: filters.playerNames,
      placeholder: "comma separated",
      onChange: (value) => setFilters({ ...filters, playerNames: value }),
    },
    {
      id: "player-ids",
      label: "Player ids",
      value: filters.playerIds,
      placeholder: "platform:id",
      onChange: (value) => setFilters({ ...filters, playerIds: value }),
    },
    {
      id: "playlist",
      label: "Playlist",
      value: filters.playlist,
      options: playlistFilterOptions,
      onChange: (value) => setFilters({ ...filters, playlist: value }),
    },
    {
      id: "map",
      label: "Map",
      value: filters.map,
      options: [{ value: "", label: "Any" }, ...mapOptions.map((option) => ({ value: option.value, label: optionLabel(option) }))],
      onChange: (value) => setFilters({ ...filters, map: value }),
    },
    {
      id: "season",
      label: "Season",
      value: filters.season,
      options: [{ value: "", label: "Any" }, ...seasonOptions.map((option) => ({ value: option.value, label: optionLabel(option) }))],
      onChange: (value) => setFilters({ ...filters, season: value }),
    },
    {
      id: "status",
      label: "Status",
      value: filters.status,
      options: replayStatusOptions,
      onChange: (value) => setFilters({ ...filters, status: value }),
    },
    {
      id: "pro",
      label: "Pro players",
      value: filters.pro,
      options: proFilterOptions,
      onChange: (value) => setFilters({ ...filters, pro: value as ReplayProFilter }),
    },
    {
      id: "min-rank",
      label: "Min rank",
      value: filters.minRank,
      options: rankFilterOptions,
      onChange: (value) => setFilters({ ...filters, minRank: value }),
    },
    {
      id: "max-rank",
      label: "Max rank",
      value: filters.maxRank,
      options: rankFilterOptions,
      onChange: (value) => setFilters({ ...filters, maxRank: value }),
    },
    {
      id: "played-after",
      label: "Played after",
      value: filters.replayDateAfter,
      type: "date",
      onChange: (value) => setFilters({ ...filters, replayDateAfter: value }),
    },
    {
      id: "played-before",
      label: "Played before",
      value: filters.replayDateBefore,
      type: "date",
      onChange: (value) => setFilters({ ...filters, replayDateBefore: value }),
    },
    {
      id: "uploaded-after",
      label: "Uploaded after",
      value: filters.createdAfter,
      type: "date",
      onChange: (value) => setFilters({ ...filters, createdAfter: value }),
    },
    {
      id: "uploaded-before",
      label: "Uploaded before",
      value: filters.createdBefore,
      type: "date",
      onChange: (value) => setFilters({ ...filters, createdBefore: value }),
    },
  ];

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Replay library</p>
          <h1>Replays</h1>
        </div>
        <label className="upload-button">
          <Upload size={17} />
          <span>{uploading ? "Uploading" : "Upload"}</span>
          <input
            type="file"
            accept=".replay"
            disabled={uploading}
            onChange={(event) => void onUpload(event.currentTarget.files?.[0])}
          />
        </label>
      </header>

      <form className="search-filter-panel replay-search-panel" onSubmit={submitSearch}>
        <div className="replay-search-row">
          <label className="search-box">
            <Search size={17} />
            <input
              value={filters.q}
              onChange={(event) => setFilters({ ...filters, q: event.currentTarget.value })}
              placeholder="Search filename, player, map, match GUID, SHA"
            />
          </label>
          <button type="submit">
            <Search size={16} />
            Search
          </button>
          <button type="button" className="secondary-button" onClick={clearFilters}>
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        <FilterGrid fields={replayFilterFields} />
      </form>

      <div className="replay-list-controls">
        <div className="results-readout">
          <SlidersHorizontal size={16} />
          <span>
            {loading
              ? "Loading replays"
              : total == null
                ? `${replays.length.toLocaleString()} replays`
                : `${start.toLocaleString()}-${end.toLocaleString()} of ${total.toLocaleString()} replays`}
          </span>
        </div>
        <div className="pagination-controls">
          <label>
            Order
            <select value={replayOrder} onChange={(event) => updateReplayOrder(event.currentTarget.value as ReplayOrder)}>
              {replayOrderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Page size
            <select value={String(pageSize)} onChange={(event) => updatePageSize(event.currentTarget.value)}>
              {visiblePageSizeOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="icon-button" title="Previous page" disabled={!canPageBackward || loading} onClick={() => goToOffset(previousOffset)}>
            <ChevronLeft size={17} />
          </button>
          <span className="page-count">
            {currentPage.toLocaleString()} / {totalPages.toLocaleString()}
          </span>
          <button type="button" className="icon-button" title="Next page" disabled={!canPageForward || loading} onClick={() => goToOffset(nextOffset)}>
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      {activeFilterChips.length > 0 ? (
        <div className="filter-chips" aria-label="Active filters">
          {activeFilterChips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      ) : null}

      <StatusLine loading={false} error={error} />

      <div className="table-frame">
        <table>
          <thead>
            <tr>
              <th>Replay</th>
              <th>Match</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {replays.map((replay) => (
              <tr key={replay.id}>
                <td className="replay-title-cell">
                  <Link className="primary-link" to={`/replays/${replay.id}`}>
                    {replay.original_file_name || replay.id}
                  </Link>
                  <div className="subtle">{replay.map_code || replay.summary.match_guid || replay.file_sha256.slice(0, 12)}</div>
                </td>
                <td>
                  <ReplayTeams replay={replay} />
                </td>
                <td className="replay-details-cell">
                  <StatusBadge status={replay.status} />
                  <div>{playlistLabel(replay.playlist_metadata, replay.playlist)}</div>
                  <div>{formatDate(replay.replay_date || replay.created_at)}</div>
                  <div className="subtle">{formatDuration(replay.summary.duration_seconds)}</div>
                </td>
              </tr>
            ))}
            {!loading && replays.length === 0 ? (
              <tr>
                <td colSpan={3} className="empty-cell">
                  No replays found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

type ReplayProFilter = "" | "true" | "false";
type ReplayOrder = "upload-date:desc" | "replay-date:desc" | "upload-date:asc" | "replay-date:asc";

interface ReplayListFilterOptions {
  maps: ReplayFilterOption[];
  seasons: ReplayFilterOption[];
}

interface ReplayFilterForm {
  q: string;
  playerNames: string;
  playerIds: string;
  playlist: string;
  map: string;
  season: string;
  status: string;
  pro: ReplayProFilter;
  minRank: string;
  maxRank: string;
  replayDateAfter: string;
  replayDateBefore: string;
  createdAfter: string;
  createdBefore: string;
}

const pageSizeOptions = [25, 50, 100, 200];

const replayOrderOptions: Array<{ value: ReplayOrder; label: string }> = [
  { value: "upload-date:desc", label: "Newest uploaded" },
  { value: "replay-date:desc", label: "Newest played" },
  { value: "upload-date:asc", label: "Oldest uploaded" },
  { value: "replay-date:asc", label: "Oldest played" },
];

const replayStatusOptions = [
  { value: "", label: "Any" },
  { value: "parsed", label: "Processed" },
  { value: "parsing", label: "Processing" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

const proFilterOptions = [
  { value: "", label: "Any" },
  { value: "true", label: "Has pro" },
  { value: "false", label: "No pro" },
];

const playlistFilterOptions = [
  { value: "", label: "Any" },
  { value: "ranked-duels", label: "Ranked Duels" },
  { value: "ranked-doubles", label: "Ranked Doubles" },
  { value: "ranked-standard", label: "Ranked Standard" },
  { value: "casual-duels", label: "Casual Duels" },
  { value: "casual-doubles", label: "Casual Doubles" },
  { value: "casual-standard", label: "Casual Standard" },
  { value: "private", label: "Private" },
  { value: "tournament", label: "Tournament" },
];

const rankFilterOptions = [
  { value: "", label: "Any" },
  { value: "unranked", label: "Unranked" },
  { value: "bronze-1", label: "Bronze I" },
  { value: "silver-1", label: "Silver I" },
  { value: "gold-1", label: "Gold I" },
  { value: "platinum-1", label: "Platinum I" },
  { value: "diamond-1", label: "Diamond I" },
  { value: "champion-1", label: "Champion I" },
  { value: "grand-champion-1", label: "Grand Champion I" },
  { value: "supersonic-legend", label: "Supersonic Legend" },
];

interface FilterOptionConfig {
  value: string;
  label: string;
}

interface FilterFieldConfig {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "search" | "number" | "date";
  name?: string;
  placeholder?: string;
  options?: FilterOptionConfig[];
  min?: string;
  max?: string;
  step?: string;
}

function FilterGrid({ fields, className = "" }: { fields: FilterFieldConfig[]; className?: string }) {
  return (
    <div className={`filter-grid ${className}`.trim()}>
      {fields.map((field) => (
        <FilterField key={field.id} field={field} />
      ))}
    </div>
  );
}

function FilterField({ field }: { field: FilterFieldConfig }) {
  return (
    <label>
      {field.label}
      {field.options ? (
        <select value={field.value} name={field.name} onChange={(event) => field.onChange(event.currentTarget.value)}>
          {field.options.map((option) => (
            <option key={`${field.id}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={field.value}
          name={field.name}
          type={field.type ?? "text"}
          min={field.min}
          max={field.max}
          step={field.step}
          placeholder={field.placeholder}
          onChange={(event) => field.onChange(event.currentTarget.value)}
        />
      )}
    </label>
  );
}

function useReplayFilterOptions(): ReplayListFilterOptions {
  const [filterOptions, setFilterOptions] = useState<ReplayListFilterOptions>(() => ({
    maps: [],
    seasons: [],
  }));

  useEffect(() => {
    let cancelled = false;
    listReplayFilterOptions()
      .then((response) => {
        if (!cancelled) setFilterOptions(response);
      })
      .catch(() => {
        if (!cancelled) {
          setFilterOptions({ maps: [], seasons: [] });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return filterOptions;
}

function defaultReplayFilters(): ReplayFilterForm {
  return {
    q: "",
    playerNames: "",
    playerIds: "",
    playlist: "",
    map: "",
    season: "",
    status: "",
    pro: "",
    minRank: "",
    maxRank: "",
    replayDateAfter: "",
    replayDateBefore: "",
    createdAfter: "",
    createdBefore: "",
  };
}

function replayFiltersFromParams(params: URLSearchParams): ReplayFilterForm {
  return {
    q: params.get("q") ?? "",
    playerNames: params.getAll("player-name").join(", "),
    playerIds: params.getAll("player-id").join(", "),
    playlist: params.get("playlist") ?? "",
    map: params.get("map") ?? "",
    season: params.get("season") ?? "",
    status: params.get("status") ?? "",
    pro: replayProFilter(params.get("pro")),
    minRank: params.get("min-rank") ?? "",
    maxRank: params.get("max-rank") ?? "",
    replayDateAfter: dateInputFromParam(params.get("replay-date-after")),
    replayDateBefore: dateInputFromParam(params.get("replay-date-before")),
    createdAfter: dateInputFromParam(params.get("created-after")),
    createdBefore: dateInputFromParam(params.get("created-before")),
  };
}

function replayFiltersToParams(filters: ReplayFilterForm): URLSearchParams {
  const params = new URLSearchParams();
  setTrimmedParam(params, "q", filters.q);
  appendListParams(params, "player-name", filters.playerNames);
  appendListParams(params, "player-id", filters.playerIds);
  setTrimmedParam(params, "playlist", filters.playlist);
  setTrimmedParam(params, "map", filters.map);
  setTrimmedParam(params, "season", filters.season);
  setTrimmedParam(params, "status", filters.status);
  setTrimmedParam(params, "pro", filters.pro);
  setTrimmedParam(params, "min-rank", filters.minRank);
  setTrimmedParam(params, "max-rank", filters.maxRank);
  setDateParam(params, "replay-date-after", filters.replayDateAfter, "start");
  setDateParam(params, "replay-date-before", filters.replayDateBefore, "end");
  setDateParam(params, "created-after", filters.createdAfter, "start");
  setDateParam(params, "created-before", filters.createdBefore, "end");
  return params;
}

function navigateWithReplayParams(navigate: ReturnType<typeof useNavigate>, currentSearch: string, params: URLSearchParams) {
  const existing = new URLSearchParams(currentSearch);
  for (const key of ["count", "group", "project", "uploader", "sort-by", "sort-dir"]) {
    const value = existing.get(key);
    if (value && !params.has(key)) params.set(key, value);
  }
  params.delete("offset");
  const query = params.toString();
  navigate(query ? `/replays?${query}` : "/replays");
}

function setTrimmedParam(params: URLSearchParams, key: string, value: string) {
  const trimmed = value.trim();
  if (trimmed) params.set(key, trimmed);
}

function appendListParams(params: URLSearchParams, key: string, value: string) {
  for (const item of value.split(",").map((part) => part.trim()).filter(Boolean)) {
    params.append(key, item);
  }
}

function setDateParam(params: URLSearchParams, key: string, value: string, edge: "start" | "end") {
  if (!value) return;
  const suffix = edge === "start" ? "T00:00:00" : "T23:59:59.999";
  params.set(key, new Date(`${value}${suffix}`).toISOString());
}

function replayProFilter(value: string | null): ReplayProFilter {
  return value === "true" || value === "false" ? value : "";
}

function dateInputFromParam(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function replayPageSize(params: URLSearchParams): number {
  const count = positiveIntegerParam(params, "count", 50);
  return Math.min(Math.max(count, 1), 200);
}

function positiveIntegerParam(params: URLSearchParams, key: string, fallback: number): number {
  const parsed = Number.parseInt(params.get(key) ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function replayOrderFromParams(params: URLSearchParams): ReplayOrder {
  const sortBy = params.get("sort-by") === "replay-date" ? "replay-date" : "upload-date";
  const sortDir = params.get("sort-dir") === "asc" ? "asc" : "desc";
  return `${sortBy}:${sortDir}` as ReplayOrder;
}

function replayOptionChoices(currentValue: string, options: ReplayFilterOption[]): ReplayFilterOption[] {
  const byValue = new Map<string, ReplayFilterOption>();
  for (const option of options) {
    if (!option.value.trim()) continue;
    byValue.set(option.value, option);
  }
  if (currentValue && !byValue.has(currentValue)) {
    byValue.set(currentValue, { value: currentValue, label: currentValue, count: 0 });
  }
  return [...byValue.values()].sort((left, right) => {
    if (left.count !== right.count) return right.count - left.count;
    return left.label.localeCompare(right.label);
  });
}

function mapOptionsFromReplays(replays: ReplayResponse[]): ReplayFilterOption[] {
  return replayFieldOptions(replays.map((replay) => replay.map_code));
}

function seasonOptionsFromReplays(replays: ReplayResponse[]): ReplayFilterOption[] {
  return replayFieldOptions(replays.map((replay) => replay.summary.season));
}

function replayFieldOptions(values: Array<string | null>): ReplayFilterOption[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    if (!value?.trim()) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].map(([value, count]) => ({ value, label: value, count }));
}

function optionLabel(option: ReplayFilterOption): string {
  return option.count > 0 ? `${option.label} (${option.count.toLocaleString()})` : option.label;
}

function replayFilterChips(params: URLSearchParams): string[] {
  const chips: string[] = [];
  for (const [key, value] of params.entries()) {
    if (!value || key === "offset" || key === "count" || key === "sort-by" || key === "sort-dir") continue;
    chips.push(`${filterLabel(key)}: ${filterValueLabel(key, value)}`);
  }
  return chips;
}

function filterLabel(key: string): string {
  switch (key) {
    case "q":
      return "Search";
    case "player-name":
      return "Player";
    case "player-id":
      return "Player id";
    case "playlist":
      return "Playlist";
    case "map":
      return "Map";
    case "season":
      return "Season";
    case "status":
      return "Status";
    case "pro":
      return "Pro players";
    case "min-rank":
      return "Min rank";
    case "max-rank":
      return "Max rank";
    case "replay-date-after":
      return "Played after";
    case "replay-date-before":
      return "Played before";
    case "created-after":
      return "Uploaded after";
    case "created-before":
      return "Uploaded before";
    default:
      return key.replaceAll("-", " ");
  }
}

function filterValueLabel(key: string, value: string): string {
  if (key.endsWith("date-after") || key.endsWith("date-before") || key.startsWith("created-")) {
    return dateInputFromParam(value) || value;
  }
  if (key === "playlist") return playlistLabel(null, value);
  if (key === "pro") return value === "true" ? "Has pro" : "No pro";
  return value;
}

function ReplayTeams({ replay }: { replay: ReplayResponse }) {
  const blue = replay.players.filter((player) => player.team === 0);
  const orange = replay.players.filter((player) => player.team === 1);
  const unknown = replay.players.filter((player) => player.team !== 0 && player.team !== 1);

  return (
    <div className="teams-cell">
      <TeamBlock label="Blue" players={blue} tone="blue" score={replay.summary.team_scores.blue} />
      <TeamBlock label="Orange" players={orange} tone="orange" score={replay.summary.team_scores.orange} />
      {unknown.length > 0 ? <TeamBlock label="Other" players={unknown} tone="neutral" /> : null}
    </div>
  );
}

function TeamBlock({
  label,
  players,
  tone,
  score,
}: {
  label: string;
  players: ReplayPlayer[];
  tone: "blue" | "orange" | "neutral";
  score?: number | null;
}) {
  return (
    <div className={`team-block replay-team-${tone}`}>
      <div className="team-heading">
        <span>{label}</span>
        {score != null ? <strong>{score}</strong> : null}
      </div>
      <div className="player-stack">
        {players.length > 0 ? (
          players.map((player, index) => <PlayerLine key={`${player.platform}-${player.platform_player_id}-${index}`} player={player} />)
        ) : (
          <span className="subtle">No players</span>
        )}
      </div>
    </div>
  );
}

function PlayerLine({ player }: { player: ReplayPlayer }) {
  const label = player.name || player.platform_player_id || "Unknown";
  const rank = rankLabel(player.rank_tier, player.rank_division);
  const contents = (
    <>
      <span className="player-name">{label}</span>
      <span className="player-meta">
        <span className="platform-chip">{platformLabel(player.platform)}</span>
        {rank ? <span className="rank-chip">{rank}</span> : null}
      </span>
    </>
  );

  if (player.platform && player.platform_player_id) {
    return (
      <Link className="player-line" to={`/players/${encodeURIComponent(player.platform)}/${encodeURIComponent(player.platform_player_id)}`}>
        {contents}
      </Link>
    );
  }

  return <div className="player-line">{contents}</div>;
}

function ReplayStatsPage() {
  const { replayId = "", statGroup } = useParams();
  const [replay, setReplay] = useState<ReplayResponse | null>(null);
  const [stats, setStats] = useState<StatAggregateSetResponse | null>(null);
  const [events, setEvents] = useState<MechanicEventResponse[]>([]);
  const [replayLoading, setReplayLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [replayError, setReplayError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const activeGroup = useMemo(
    () => completedStatGroups.find((group) => group.id === statGroup) ?? completedStatGroups[0],
    [statGroup],
  );

  useEffect(() => {
    let cancelled = false;

    setReplayLoading(true);
    setReplayError(null);
    getReplay(replayId)
      .then((response) => {
        if (!cancelled) setReplay(response);
      })
      .catch((err: Error) => {
        if (!cancelled) setReplayError(err.message);
      })
      .finally(() => {
        if (!cancelled) setReplayLoading(false);
      });

    setStatsLoading(true);
    setStatsError(null);
    if (!activeGroup.usesAggregateStats) {
      setStats(null);
      setStatsLoading(false);
    } else {
      getReplayStatAggregates(replayId)
        .then((response) => {
          if (!cancelled) setStats(response);
        })
        .catch((err: Error) => {
          if (!cancelled) setStatsError(err.message);
        })
        .finally(() => {
          if (!cancelled) setStatsLoading(false);
        });
    }

    setEventsLoading(true);
    setEventsError(null);
    listReplayEvents(replayId, eventTypesForGroup(activeGroup.id))
      .then((response) => {
        if (!cancelled) setEvents(response.events);
      })
      .catch((err: Error) => {
        if (!cancelled) setEventsError(err.message);
      })
      .finally(() => {
        if (!cancelled) setEventsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeGroup.id, activeGroup.usesAggregateStats, replayId]);

  const activeStats = useMemo(() => filterStatsForGroup(stats?.stats ?? [], activeGroup.terms), [activeGroup, stats]);
  const activeEvents = useMemo(() => filterEventsForGroup(events, activeGroup.terms), [activeGroup, events]);
  const ActiveDetail = activeGroup.Detail;
  const detailEvents = ActiveDetail ? events : activeEvents;

  return (
    <section className="page stats-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Game stats</p>
          <h1>{replay?.original_file_name || "Replay stats"}</h1>
        </div>
        <div className="button-row">
          <Link className="secondary-button" to={`/replays/${replayId}/player`}>
            <Zap size={16} />
            Player
          </Link>
        </div>
      </header>

      <StatusLine loading={replayLoading} error={replayError} />

      {replay ? (
        <>
          <div className="match-context">
            <div>
              <span>Score</span>
              <strong>{formatScore(replay)}</strong>
            </div>
            <div>
              <span>Playlist</span>
              <strong>{playlistLabel(replay.playlist_metadata, replay.playlist)}</strong>
            </div>
            <div>
              <span>Duration</span>
              <strong>{formatDuration(replay.summary.duration_seconds)}</strong>
            </div>
            <div>
              <span>Date</span>
              <strong>{formatDate(replay.replay_date || replay.created_at)}</strong>
            </div>
          </div>

          <nav className="stat-group-nav" aria-label="Stat groups">
            {completedStatGroups.map((group) => {
              const Icon = group.icon;
              return (
                <Link
                  key={group.id}
                  className={`stat-group-link ${group.id === activeGroup.id ? "active" : ""}`}
                  to={`/replays/${replayId}/stats/${group.id}`}
                >
                  <Icon size={16} />
                  <span>{group.label}</span>
                </Link>
              );
            })}
          </nav>

          <section className="stat-detail">
            {!ActiveDetail ? (
              <header className="stat-detail-header">
                <div>
                  <p className="eyebrow">{activeGroup.label}</p>
                  <h2>{activeGroup.label} detail</h2>
                  <p>{activeGroup.description}</p>
                </div>
                <div className="stat-detail-counts">
                  <Metric label="Stats" value={activeStats.length.toLocaleString()} />
                  <Metric label="Events" value={activeEvents.length.toLocaleString()} />
                </div>
              </header>
            ) : null}

            {eventsError ? <ApiNotice label={ActiveDetail ? `${activeGroup.label} data` : "Indexed events"} message={eventsError} /> : null}
            {statsLoading || eventsLoading ? <StatusLine loading error={null} /> : null}

            {ActiveDetail ? (
              <ActiveDetail events={detailEvents} players={replay.players} durationSeconds={replay.summary.duration_seconds} replayId={replayId} />
            ) : (
              <>
                <div className="stat-section-grid">
                  <StatRows title="Top stats" stats={activeStats} />
                  <EventRows title="Indexed events" events={activeEvents} />
                </div>
                <PlayerTimingSection groupId={activeGroup.id} players={replay.players} />
              </>
            )}
          </section>
        </>
      ) : null}
    </section>
  );
}

function ReplayPlayerPage({ replayId }: { replayId: string }) {
  const [replay, setReplay] = useState<ReplayResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getReplay(replayId)
      .then((response) => {
        if (!cancelled) setReplay(response);
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

  return (
    <section className="page player-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Replay player</p>
          <h1>{replay?.original_file_name || "Replay player"}</h1>
        </div>
        <div className="button-row">
          <Link className="secondary-button" to={`/replays/${replayId}/stats`}>
            <BarChart3 size={16} />
            Stats
          </Link>
          <a className="secondary-button" href={subtrActorPlayerUrl(replayId)}>
            <Zap size={16} />
            Open standalone
          </a>
        </div>
      </header>
      <StatusLine loading={loading} error={error} />
    </section>
  );
}

function SubtrActorPlayerFrame({ replayId, visible }: { replayId: string; visible: boolean }) {
  return (
    <iframe
      className={`subtr-player-frame ${visible ? "visible" : "warmup"}`}
      title="Subtr Actor replay player"
      src={subtrActorPlayerUrl(replayId)}
    />
  );
}

function replayFileUrl(replayId: string): string {
  return `/api/v1/replays/${encodeURIComponent(replayId)}/file`;
}

function subtrActorPlayerUrl(replayId: string): string {
  return `/subtr-actor/?replayUrl=${encodeURIComponent(replayFileUrl(replayId))}`;
}

function StatRows({ title, stats }: { title: string; stats: StatAggregateResponse[] }) {
  const rows = stats.slice(0, 12);

  return (
    <section className="stat-panel">
      <h3>{title}</h3>
      {rows.length > 0 ? (
        <div className="table-frame compact-table">
          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Count</th>
                <th>Per active min</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((stat) => (
                <tr key={stat.key}>
                  <td>
                    <strong>{stat.display_name}</strong>
                    <div className="subtle">{stat.category}</div>
                  </td>
                  <td>{stat.event_count.toLocaleString()}</td>
                  <td>{formatNumber(stat.per_active_minute)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="stat-empty">No aggregate rows are available for this group yet.</div>
      )}
    </section>
  );
}

function EventRows({ title, events }: { title: string; events: MechanicEventResponse[] }) {
  const rows = events.slice(0, 12);

  return (
    <section className="stat-panel">
      <h3>{title}</h3>
      {rows.length > 0 ? (
        <div className="table-frame compact-table">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Player</th>
                <th>Time</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((event) => (
                <tr key={event.id}>
                  <td>
                    <strong>{event.event_type_label || event.event_type}</strong>
                    <div className="subtle">{event.event_category}</div>
                  </td>
                  <td>{event.player_name || "Unknown"}</td>
                  <td>{formatSeconds(event.event_time ?? event.start_time)}</td>
                  <td>{formatPercent(event.confidence)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="stat-empty">No indexed events are available for this group yet.</div>
      )}
    </section>
  );
}

function PlayerTimingSection({ groupId, players }: { groupId: string; players: ReplayPlayer[] }) {
  if (groupId !== "positioning" && groupId !== "rotation") return null;

  return (
    <section className="stat-panel full-span">
      <h3>Player timing</h3>
      <div className="table-frame compact-table">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Active</th>
              <th>Most back</th>
              <th>Most forward</th>
              <th>Non-demo active</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={`${player.platform}-${player.platform_player_id}-${index}`}>
                <td>{player.name || player.platform_player_id || "Unknown"}</td>
                <td>{teamLabel(player.team)}</td>
                <td>{formatSeconds(player.active_time_seconds)}</td>
                <td>{formatSeconds(player.time_most_back_seconds)}</td>
                <td>{formatSeconds(player.time_most_forward_seconds)}</td>
                <td>{formatSeconds(player.non_demo_active_time_seconds)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ApiNotice({ label, message }: { label: string; message: string }) {
  return (
    <div className="api-notice">
      <strong>{label}</strong>
      <span>{friendlyApiMessage(message)}</span>
    </div>
  );
}

function friendlyApiMessage(message: string): string {
  if (message.includes("missing bearer token")) {
    return "This production endpoint needs a bearer token. Save one on the Account page to populate this section locally.";
  }
  return message;
}

function PlayerStatsPage() {
  const { platform = "", platformPlayerId = "", statGroup } = useParams();
  const location = useLocation();
  const playerReplayParams = useMemo(
    () => playerReplaySetParams(platform, platformPlayerId, location.search),
    [location.search, platform, platformPlayerId],
  );
  const activeGroup = useMemo(
    () => playerStatsSectionGroups.find((group) => group.id === statGroup) ?? playerStatsSectionGroups[0]!,
    [statGroup],
  );
  const [playerSummary, setPlayerSummary] = useState<PlayerProfileResponse | null>(null);
  const [stats, setStats] = useState<StatAggregateSetResponse | null>(null);
  const [overview, setOverview] = useState<PlayerStatOverviewResponse | null>(null);
  const [kickoffSummary, setKickoffSummary] = useState<EventStatSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setStatsLoading(true);
    setError(null);
    setStatsError(null);
    setOverview(null);
    setKickoffSummary(null);
    getPlayerProfile(platform, platformPlayerId, new URLSearchParams(location.search))
      .then((response) => {
        if (!cancelled) setPlayerSummary(response);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    getPlayerStatAggregates(platform, platformPlayerId, new URLSearchParams(location.search))
      .then((response) => {
        if (!cancelled) setStats(response);
      })
      .catch((err: Error) => {
        if (!cancelled) setStatsError(err.message);
      })
      .finally(() => {
        if (!cancelled) setStatsLoading(false);
      });
    // Supplemental visualizations degrade gracefully when these fail.
    getPlayerStatOverview(platform, platformPlayerId, new URLSearchParams(location.search))
      .then((response) => {
        if (!cancelled) setOverview(response);
      })
      .catch(() => {});
    getPlayerKickoffSummary(platform, platformPlayerId, new URLSearchParams(location.search))
      .then((response) => {
        if (!cancelled) setKickoffSummary(response);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [location.search, platform, platformPlayerId]);

  return (
    <section className="page player-stats-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Player stats</p>
          <h1>{playerSummary?.display_name || platformPlayerId}</h1>
        </div>
        <div className="button-row">
          <Link className="secondary-button" to={`/replays?${playerReplayParams.toString()}`}>
            <FileVideo size={16} />
            Replays
          </Link>
        </div>
      </header>
      <StatusLine loading={loading} error={error} />
      {playerSummary ? (
        <>
          <div className="summary-grid">
            <Metric label="Replays" value={playerSummary.replay_count.toLocaleString()} />
            <Metric label="Active" value={formatDuration(stats?.active_time_seconds ?? null)} />
            <Metric label="First seen" value={formatShortDate(playerSummary.first_seen_at)} />
            <Metric label="Last seen" value={formatShortDate(playerSummary.last_seen_at)} />
            <Metric label="Platform" value={platformLabel(playerSummary.platform)} />
            <Metric label="Player id" value={playerSummary.platform_player_id} />
            <Metric label="Names" value={playerSummary.names.length.toLocaleString()} />
            <Metric label="Pro" value={playerSummary.is_pro ? "Yes" : "No"} />
          </div>
          {playerSummary.names.length > 0 ? (
            <div className="player-name-aliases">
              {playerSummary.names.map((name) => (
                <span key={name.name} title={`${name.replay_count.toLocaleString()} replays`}>
                  {name.name}
                </span>
              ))}
            </div>
          ) : null}

          <PlayerStatsSegmentBar />
          <StatusLine loading={statsLoading} error={null} />
          {statsError ? <ApiNotice label="Player stats" message={statsError} /> : null}
          {stats ? (
            <PlayerAggregateStatsSections
              activeGroup={activeGroup}
              kickoffSummary={kickoffSummary}
              overview={overview}
              platform={platform}
              platformPlayerId={platformPlayerId}
              search={location.search}
              stats={stats}
            />
          ) : null}

          <section className="stat-panel">
            <h2>Latest replays</h2>
            <div className="table-frame">
              <table>
                <tbody>
                  {playerSummary.latest_replays.map((replay) => (
                    <tr key={replay.id}>
                      <td>
                        <Link className="primary-link" to={`/replays/${replay.id}`}>
                          {replay.original_file_name || replay.id}
                        </Link>
                      </td>
                      <td>{formatPlayerReplayScore(replay)}</td>
                      <td>{formatDate(replay.replay_date || replay.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </section>
  );
}

function playerReplaySetParams(platform: string, platformPlayerId: string, search: string): URLSearchParams {
  const params = new URLSearchParams(search);
  params.delete("offset");
  params.set("player-id", `${platform}:${platformPlayerId}`);
  return params;
}

function playerStatGroupPath(platform: string, platformPlayerId: string, groupId: string, search: string): string {
  const query = new URLSearchParams(search).toString();
  const path = `/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}/stats/${groupId}`;
  return query ? `${path}?${query}` : path;
}

// Top-level career segmentation: team size and competitive context are
// orthogonal dimensions (see docs/stats-principles.md) and govern every
// panel on the player stats page through the shared replay-set params.
const teamSizeSegmentOptions = [
  { value: "", label: "All modes" },
  { value: "1", label: "1v1" },
  { value: "2", label: "2v2" },
  { value: "3", label: "3v3" },
  { value: "4", label: "4v4" },
];

const gameTypeSegmentOptions = [
  { value: "", label: "Any context" },
  { value: "ranked", label: "Ranked" },
  { value: "casual", label: "Casual" },
  { value: "tournament", label: "Tournament" },
];

function segmentParamPath(pathname: string, search: string, key: string, value: string): string {
  const params = new URLSearchParams(search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function PlayerStatsSegmentBar() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const teamSize = params.get("team-size") ?? "";
  const gameType = params.get("game-type") ?? "";

  return (
    <div className="player-segment-bar">
      <nav className="stat-group-nav" aria-label="Mode segment">
        <span className="segment-bar-label">Mode</span>
        {teamSizeSegmentOptions.map((option) => (
          <Link
            key={option.value || "all"}
            className={`stat-group-link ${teamSize === option.value ? "active" : ""}`}
            to={segmentParamPath(location.pathname, location.search, "team-size", option.value)}
          >
            {option.label}
          </Link>
        ))}
      </nav>
      <nav className="stat-group-nav" aria-label="Competitive context segment">
        <span className="segment-bar-label">Context</span>
        {gameTypeSegmentOptions.map((option) => (
          <Link
            key={option.value || "all"}
            className={`stat-group-link ${gameType === option.value ? "active" : ""}`}
            to={segmentParamPath(location.pathname, location.search, "game-type", option.value)}
          >
            {option.label}
          </Link>
        ))}
      </nav>
      {teamSize === "" ? (
        <p className="muted-text segment-bar-note">
          Showing all modes blended — rates mix 1v1/2v2/3v3 dynamics. Pick a mode for cleaner numbers.
        </p>
      ) : null}
    </div>
  );
}

function PlayerAggregateStatsSections({
  activeGroup,
  kickoffSummary,
  overview,
  platform,
  platformPlayerId,
  search,
  stats,
}: {
  activeGroup: StatGroup;
  kickoffSummary: EventStatSummaryResponse | null;
  overview: PlayerStatOverviewResponse | null;
  platform: string;
  platformPlayerId: string;
  search: string;
  stats: StatAggregateSetResponse;
}) {
  const sectionStats = filterStatsForGroup(stats.stats, activeGroup.terms).slice().sort(comparePlayerStatRates);
  const topStats = sectionStats.slice(0, 20);
  const playlistGroups = stats.groups
    .map((group) => ({
      group,
      stats: filterStatsForGroup(group.stats, activeGroup.terms).slice().sort(comparePlayerStatRates),
    }))
    .filter((group) => group.stats.length > 0)
    .slice(0, 8);
  const sectionEventCount = sectionStats.reduce((total, stat) => total + stat.event_count, 0);
  const Icon = activeGroup.icon;

  return (
    <section className="stat-detail player-aggregate-stats">
      <nav className="stat-group-nav" aria-label="Player stat sections">
        {playerStatsSectionGroups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <Link
              key={group.id}
              className={`stat-group-link ${group.id === activeGroup.id ? "active" : ""}`}
              to={playerStatGroupPath(platform, platformPlayerId, group.id, search)}
            >
              <GroupIcon size={16} />
              <span>{group.label}</span>
            </Link>
          );
        })}
      </nav>

      <header className="stat-detail-header">
        <div>
          <p className="eyebrow">Stats section</p>
          <h2>
            <Icon size={20} />
            {activeGroup.label}
          </h2>
          <p>{activeGroup.description}</p>
        </div>
        <div className="stat-detail-counts">
          <Metric label="Stats" value={sectionStats.length.toLocaleString()} />
          <Metric label="Events" value={sectionEventCount.toLocaleString()} />
        </div>
      </header>

      <PlayerRateComparisonChart stats={topStats} />

      {activeGroup.id === "goals" && overview ? <GoalTagSharePanel overview={overview} /> : null}
      {activeGroup.id === "kickoffs" && kickoffSummary ? <KickoffSummaryPanel summary={kickoffSummary} /> : null}
      {(activeGroup.id === "positioning" || activeGroup.id === "rotation") && overview ? (
        <RotationTimeSharePanel overview={overview} stats={stats} />
      ) : null}

      <div className="player-stats-section-grid stat-section-grid">
        <section className="stat-panel">
          <h3>Player rates</h3>
          <div className="table-frame compact-table">
            <table className="player-stat-table">
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Per active min</th>
                  <th>Count</th>
                  <th>Teammates / min</th>
                </tr>
              </thead>
              <tbody>
                {topStats.map((stat) => (
                  <tr key={stat.key}>
                    <td>
                      <strong>{stat.display_name}</strong>
                      <div className="subtle">{stat.category}</div>
                    </td>
                    <td>{formatNumber(stat.per_active_minute)}</td>
                    <td>{stat.event_count.toLocaleString()}</td>
                    <td>{formatNumber(stat.teammate_per_active_minute)}</td>
                  </tr>
                ))}
                {topStats.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No aggregate stats are available for this section yet.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="stat-panel">
          <h3>Playlist splits</h3>
          <div className="table-frame compact-table">
            <table>
              <thead>
                <tr>
                  <th>Playlist</th>
                  <th>Replays</th>
                  <th>Active</th>
                  <th>Top rate</th>
                </tr>
              </thead>
              <tbody>
                {playlistGroups.map((group) => {
                  const topRate = group.stats[0];
                  return (
                    <tr key={group.group.key}>
                      <td>
                        <strong>{group.group.display_name}</strong>
                      </td>
                      <td>{group.group.replay_count.toLocaleString()}</td>
                      <td>{formatDuration(group.group.active_time_seconds)}</td>
                      <td>{topRate ? `${topRate.display_name}: ${formatNumber(topRate.per_active_minute)}` : "Unknown"}</td>
                    </tr>
                  );
                })}
                {playlistGroups.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No playlist splits are available for this section yet.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}

function comparePlayerStatRates(left: StatAggregateResponse, right: StatAggregateResponse): number {
  const leftRate = left.per_active_minute ?? -1;
  const rightRate = right.per_active_minute ?? -1;
  return rightRate - leftRate || right.event_count - left.event_count || left.display_name.localeCompare(right.display_name);
}

function EventsReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const activeFilters = useMemo(() => eventReviewFiltersFromParams(searchParams), [searchParams]);
  const [filters, setFilters] = useState(activeFilters);
  const [eventTypes, setEventTypes] = useState<EventTypeResponse[]>([]);
  const [loadingEventTypes, setLoadingEventTypes] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filterOptions = useReplayFilterOptions();

  useEffect(() => {
    setFilters(activeFilters);
  }, [activeFilters]);

  useEffect(() => {
    let cancelled = false;
    setLoadingEventTypes(true);
    listEventTypes()
      .then((response) => {
        if (cancelled) return;
        setEventTypes(response.event_types);
        setError(null);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoadingEventTypes(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function updateFilter<Key extends keyof EventReviewFilterForm>(key: Key, value: EventReviewFilterForm[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function toggleEventType(eventType: string) {
    setFilters((current) => {
      const selected = new Set(current.eventTypes);
      if (selected.has(eventType)) {
        selected.delete(eventType);
      } else {
        selected.add(eventType);
      }
      return { ...current, eventTypes: Array.from(selected) };
    });
  }

  function toggleEventTypeGroup(eventTypeKeys: string[]) {
    setFilters((current) => {
      const selected = new Set(current.eventTypes);
      const allSelected = eventTypeKeys.every((eventType) => selected.has(eventType));
      for (const eventType of eventTypeKeys) {
        if (allSelected) {
          selected.delete(eventType);
        } else {
          selected.add(eventType);
        }
      }
      return { ...current, eventTypes: Array.from(selected) };
    });
  }

  function clearFilters() {
    setFilters(defaultEventReviewFilters());
    navigate("/events/review");
  }

  const selectedEventTypes = new Set(filters.eventTypes);
  const eventTypeGroups = useMemo(
    () => groupEventTypesByCategory(eventTypes.filter(isReviewSelectableEventType)),
    [eventTypes],
  );
  const manifestUrl = `/api/v1/events/review-playlist?${eventReviewFiltersToParams(filters).toString()}`;
  const selectedCount = selectedEventTypes.size;
  const selectedGroupCount = eventTypeGroups.filter((group) =>
    group.eventTypes.some((eventType) => selectedEventTypes.has(eventType.key)),
  ).length;
  const eventMapOptions = replayOptionChoices(filters.map, filterOptions.maps);
  const eventFilterFields: FilterFieldConfig[] = [
    {
      id: "event-q",
      label: "Search",
      value: filters.q,
      name: "q",
      type: "search",
      placeholder: "filename, SHA, external ID",
      onChange: (value) => updateFilter("q", value),
    },
    {
      id: "event-player-name",
      label: "Player name",
      value: filters.playerName,
      name: "player-name",
      placeholder: "Zen",
      onChange: (value) => updateFilter("playerName", value),
    },
    {
      id: "event-player-id",
      label: "Primary player ID",
      value: filters.playerId,
      name: "player-id",
      placeholder: "platform:platform_id",
      onChange: (value) => updateFilter("playerId", value),
    },
    {
      id: "event-review-status",
      label: "Review status",
      value: filters.reviewStatus,
      name: "review-status",
      options: reviewStatusOptions,
      onChange: (value) => updateFilter("reviewStatus", value),
    },
    {
      id: "event-playlist",
      label: "Playlist",
      value: filters.playlist,
      name: "playlist",
      options: eventPlaylistOptions,
      onChange: (value) => updateFilter("playlist", value),
    },
    {
      id: "event-map",
      label: "Map",
      value: filters.map,
      name: "map",
      options: [{ value: "", label: "Any" }, ...eventMapOptions.map((option) => ({ value: option.value, label: optionLabel(option) }))],
      onChange: (value) => updateFilter("map", value),
    },
    {
      id: "event-pro",
      label: "Pro players",
      value: filters.pro,
      name: "pro",
      options: proFilterOptions,
      onChange: (value) => updateFilter("pro", value as EventReviewProFilter),
    },
    {
      id: "event-min-confidence",
      label: "Minimum confidence",
      value: filters.minConfidence,
      name: "min-confidence",
      type: "number",
      min: "0",
      max: "1",
      step: "0.01",
      placeholder: "0.50",
      onChange: (value) => updateFilter("minConfidence", value),
    },
    {
      id: "event-replay-id",
      label: "Replay ID",
      value: filters.replayId,
      name: "replay-id",
      placeholder: "UUID",
      onChange: (value) => updateFilter("replayId", value),
    },
    {
      id: "event-detector",
      label: "Detector",
      value: filters.detector,
      name: "detector",
      placeholder: "stats_timeline",
      onChange: (value) => updateFilter("detector", value),
    },
    {
      id: "event-uploaded-after",
      label: "Uploaded after",
      value: filters.createdAfter,
      name: "created-after",
      placeholder: "2026-06-01T00:00:00Z",
      onChange: (value) => updateFilter("createdAfter", value),
    },
    {
      id: "event-uploaded-before",
      label: "Uploaded before",
      value: filters.createdBefore,
      name: "created-before",
      placeholder: "2026-06-05T23:59:59Z",
      onChange: (value) => updateFilter("createdBefore", value),
    },
    {
      id: "event-played-after",
      label: "Played after",
      value: filters.replayDateAfter,
      name: "replay-date-after",
      placeholder: "2026-06-01T00:00:00Z",
      onChange: (value) => updateFilter("replayDateAfter", value),
    },
    {
      id: "event-played-before",
      label: "Played before",
      value: filters.replayDateBefore,
      name: "replay-date-before",
      placeholder: "2026-06-05T23:59:59Z",
      onChange: (value) => updateFilter("replayDateBefore", value),
    },
    {
      id: "event-indexed-after",
      label: "Event indexed after",
      value: filters.eventCreatedAfter,
      name: "event-created-after",
      placeholder: "2026-06-01T00:00:00Z",
      onChange: (value) => updateFilter("eventCreatedAfter", value),
    },
    {
      id: "event-indexed-before",
      label: "Event indexed before",
      value: filters.eventCreatedBefore,
      name: "event-created-before",
      placeholder: "2026-06-05T23:59:59Z",
      onChange: (value) => updateFilter("eventCreatedBefore", value),
    },
    {
      id: "event-uploader",
      label: "Uploader",
      value: filters.uploader,
      name: "uploader",
      placeholder: "user UUID",
      onChange: (value) => updateFilter("uploader", value),
    },
    {
      id: "event-group",
      label: "Group",
      value: filters.group,
      name: "group",
      placeholder: "replay group UUID",
      onChange: (value) => updateFilter("group", value),
    },
    {
      id: "event-project",
      label: "Project",
      value: filters.project,
      name: "project",
      placeholder: "project UUID",
      onChange: (value) => updateFilter("project", value),
    },
    {
      id: "event-count",
      label: "Count",
      value: filters.count,
      name: "count",
      type: "number",
      min: "1",
      max: "5000",
      onChange: (value) => updateFilter("count", value),
    },
  ];
  const selectedEventText = eventReviewSelectedEventText(selectedCount, selectedGroupCount);

  return (
    <section className="page event-review-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Mechanics review</p>
          <h1>Events review</h1>
        </div>
        <a className="secondary-button" href="/api/v1/events?review-status=unreviewed">
          <ExternalLink size={16} />
          API queue
        </a>
      </header>

      <form className="event-review-form" method="get" action="/events/review/open" autoComplete="off">
        <section className="event-filter-panel">
          <div className="panel-heading">
            <div>
              <h2>Event filters</h2>
              <p className="muted-text">Choose the review playlist that will open in the stat evaluation player.</p>
            </div>
            <div className="results-readout">
              <SlidersHorizontal size={16} />
              <span>{selectedCount > 0 ? selectedEventText : "All event types"}</span>
            </div>
          </div>

          <StatusLine loading={loadingEventTypes} error={error} />

          <div className="event-type-groups" aria-label="Event types">
            {eventTypeGroups.map((group) => {
              const eventTypeKeys = group.eventTypes.map((eventType) => eventType.key);
              const selectedInGroup = eventTypeKeys.filter((eventType) => selectedEventTypes.has(eventType)).length;
              const allSelected = selectedInGroup === eventTypeKeys.length && eventTypeKeys.length > 0;
              return (
                <section key={group.category} className="event-type-group">
                  <div className="event-type-group-heading">
                    <label className="event-type-group-toggle">
                      <input type="checkbox" checked={allSelected} onChange={() => toggleEventTypeGroup(eventTypeKeys)} />
                      <span>
                        <strong>{group.label}</strong>
                        <small>
                          {selectedInGroup > 0 ? `${selectedInGroup} of ` : ""}
                          {eventTypeKeys.length} types
                        </small>
                      </span>
                    </label>
                  </div>
                  <div className="event-type-grid">
                    {group.eventTypes.map((eventType) => (
                      <label key={eventType.key} className={`check-tile ${selectedEventTypes.has(eventType.key) ? "selected" : ""}`}>
                        <input
                          type="checkbox"
                          name="event-type"
                          value={eventType.key}
                          checked={selectedEventTypes.has(eventType.key)}
                          onChange={() => toggleEventType(eventType.key)}
                        />
                        <span>
                          <strong>{eventType.display_name || eventType.key}</strong>
                          <small>{eventType.key}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <FilterGrid className="event-filter-grid" fields={eventFilterFields} />
        </section>

        <aside className="review-launch-panel">
          <div>
            <span className="status-badge status-parsed">canonical runs</span>
            <h2>Launch review</h2>
            <p className="muted-text">The review player opens outside the SPA with this filtered playlist.</p>
          </div>
          <dl className="review-summary">
            <div>
              <dt>Status</dt>
              <dd>{reviewStatusLabel(filters.reviewStatus)}</dd>
            </div>
            <div>
              <dt>Playlist size</dt>
              <dd>{filters.count || "100"} events</dd>
            </div>
            <div>
              <dt>Event types</dt>
              <dd>{selectedCount > 0 ? selectedEventText : "All"}</dd>
            </div>
          </dl>
          <div className="review-actions">
            <button type="submit">
              <Activity size={16} />
              Start review
            </button>
            <a className="secondary-button" href={manifestUrl}>
              <ExternalLink size={16} />
              Open manifest
            </a>
            <button className="secondary-button" type="button" onClick={clearFilters}>
              <RotateCcw size={16} />
              Reset filters
            </button>
          </div>
        </aside>
      </form>
    </section>
  );
}

type EventReviewProFilter = "" | "true" | "false";

interface EventReviewFilterForm {
  eventTypes: string[];
  q: string;
  playerName: string;
  playerId: string;
  reviewStatus: string;
  playlist: string;
  map: string;
  pro: EventReviewProFilter;
  minConfidence: string;
  replayId: string;
  detector: string;
  createdAfter: string;
  createdBefore: string;
  replayDateAfter: string;
  replayDateBefore: string;
  eventCreatedAfter: string;
  eventCreatedBefore: string;
  uploader: string;
  group: string;
  project: string;
  count: string;
}

interface EventTypeGroup {
  category: string;
  label: string;
  eventTypes: EventTypeResponse[];
}

function groupEventTypesByCategory(eventTypes: EventTypeResponse[]): EventTypeGroup[] {
  const groups = new Map<string, EventTypeResponse[]>();
  for (const eventType of eventTypes) {
    const category = eventTypeReviewCategory(eventType);
    const group = groups.get(category) ?? [];
    group.push(eventType);
    groups.set(category, group);
  }

  return Array.from(groups, ([category, groupEventTypes]) => ({
    category,
    label: eventCategoryLabel(category),
    eventTypes: groupEventTypes.slice().sort(compareEventTypes),
  })).sort(compareEventTypeGroups);
}

function eventTypeReviewCategory(eventType: EventTypeResponse): string {
  const category = normalizeEventCategory(eventType.category);
  return category === "event" ? derivedEventCategoryFromKey(eventType.key) : category;
}

function isReviewSelectableEventType(eventType: EventTypeResponse): boolean {
  return !labelLikeEventCategories.has(eventTypeReviewCategory(eventType));
}

const labelLikeEventCategories = new Set(["context"]);

function normalizeEventCategory(value: string | null | undefined): string {
  const category = value?.trim();
  if (!category) {
    return "uncategorized";
  }
  if (category === "mechanics") {
    return "mechanic";
  }
  return category;
}

function derivedEventCategoryFromKey(key: string): string {
  if (key.startsWith("goal_tag_")) {
    return "context";
  }
  if (contextEventTypeKeys.has(key)) {
    return "context";
  }
  if (mechanicEventTypeKeys.has(key) || key.startsWith("mechanic.")) {
    return "mechanic";
  }
  if (key === "touch" || key === "touch_ball_movement" || key === "whiff") {
    return "other";
  }
  if (key === "bump" || key === "kill" || key === "death" || key === "core.demo") {
    return "contact";
  }
  if (key.startsWith("boost") || key === "boost.pad_event") {
    return "boost";
  }
  if (
    key.startsWith("rotation_") ||
    key.startsWith("rotation.") ||
    key === "positioning" ||
    key.startsWith("positioning_")
  ) {
    return "positioning";
  }
  if (["possession", "pressure", "territorial_pressure", "controlled_play", "kickoff", "fifty_fifty", "rush"].includes(key)) {
    return "possession";
  }
  if (["movement", "flip_impulse", "powerslide", "movement.dodge_refresh"].includes(key)) {
    return "movement";
  }
  if (["goal"].includes(key)) {
    return "core";
  }
  return "event";
}

const mechanicEventTypeKeys = new Set([
  "air_dribble",
  "backboard",
  "backboard_bounce",
  "ball_carry",
  "ceiling_shot",
  "center",
  "dodge_reset",
  "double_tap",
  "flick",
  "flip_reset",
  "half_flip",
  "half_volley",
  "musty_flick",
  "one_timer",
  "pass",
  "speed_flip",
  "wall_aerial",
  "wall_aerial_shot",
  "wavedash",
  "post_wall_dodge",
  "flip_reset_followup_dodge",
]);

const contextEventTypeKeys = new Set([
  "core_player",
  "core_player_goal_context",
  "core_player_scoreboard",
  "goal_context",
  "player",
]);

function compareEventTypeGroups(left: EventTypeGroup, right: EventTypeGroup): number {
  return eventCategorySortRank(left.category) - eventCategorySortRank(right.category) || left.label.localeCompare(right.label);
}

function compareEventTypes(left: EventTypeResponse, right: EventTypeResponse): number {
  return (left.display_name || left.key).localeCompare(right.display_name || right.key) || left.key.localeCompare(right.key);
}

function eventCategorySortRank(category: string): number {
  const rank = [
    "mechanic",
    "mechanics",
    "contact",
    "other",
    "core",
    "context",
    "boost",
    "movement",
    "rotation",
    "possession",
    "event",
    "uncategorized",
  ].indexOf(category);
  return rank === -1 ? 100 : rank;
}

function eventCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    mechanic: "Mechanics",
    mechanics: "Mechanics",
    contact: "Contact",
    other: "Other",
    touch: "Touches",
    core: "Core",
    context: "Context metadata",
    goal_context: "Goal context",
    team: "Team events",
    boost: "Boost",
    movement: "Movement",
    rotation: "Rotation",
    possession: "Possession",
    event: "General events",
    uncategorized: "Uncategorized",
  };
  return labels[category] ?? startCase(category);
}

function startCase(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function eventReviewSelectedEventText(selectedCount: number, selectedGroupCount: number): string {
  if (selectedCount === 0) {
    return "All event types";
  }
  const typeText = selectedCount === 1 ? "1 event type" : `${selectedCount.toLocaleString()} event types`;
  if (selectedGroupCount === 0) {
    return typeText;
  }
  const groupText = selectedGroupCount === 1 ? "1 group" : `${selectedGroupCount.toLocaleString()} groups`;
  return `${typeText} across ${groupText}`;
}

const reviewStatusOptions = [
  { value: "unreviewed", label: "Unreviewed" },
  { value: "all", label: "All" },
  { value: "confirmed", label: "Confirmed" },
  { value: "rejected", label: "Rejected" },
  { value: "corrected", label: "Corrected" },
  { value: "uncertain", label: "Uncertain" },
  { value: "needs_second_review", label: "Needs second review" },
];

const eventPlaylistOptions = [
  { value: "", label: "Any playlist" },
  ...playlistFilterOptions.filter((option) => option.value !== ""),
  { value: "ranked-solo-standard", label: "Ranked Solo Standard" },
  { value: "unranked-duels", label: "Unranked Duels" },
  { value: "unranked-doubles", label: "Unranked Doubles" },
  { value: "unranked-standard", label: "Unranked Standard" },
  { value: "unranked-chaos", label: "Unranked Chaos" },
  { value: "ranked-hoops", label: "Ranked Hoops" },
  { value: "ranked-rumble", label: "Ranked Rumble" },
  { value: "ranked-dropshot", label: "Ranked Dropshot" },
  { value: "ranked-snowday", label: "Ranked SnowDay" },
  { value: "snowday", label: "SnowDay" },
  { value: "rocketlabs", label: "RocketLabs" },
  { value: "hoops", label: "Hoops" },
  { value: "rumble", label: "Rumble" },
  { value: "dropshot", label: "Dropshot" },
  { value: "dropshot-rumble", label: "Dropshot Rumble" },
  { value: "heatseeker", label: "Heatseeker" },
  { value: "season", label: "Season" },
  { value: "offline", label: "Offline" },
  { value: "local", label: "Local Lobby" },
];

function defaultEventReviewFilters(): EventReviewFilterForm {
  return {
    eventTypes: [],
    q: "",
    playerName: "",
    playerId: "",
    reviewStatus: "unreviewed",
    playlist: "",
    map: "",
    pro: "",
    minConfidence: "",
    replayId: "",
    detector: "",
    createdAfter: "",
    createdBefore: "",
    replayDateAfter: "",
    replayDateBefore: "",
    eventCreatedAfter: "",
    eventCreatedBefore: "",
    uploader: "",
    group: "",
    project: "",
    count: "100",
  };
}

function eventReviewFiltersFromParams(params: URLSearchParams): EventReviewFilterForm {
  const defaults = defaultEventReviewFilters();
  return {
    eventTypes: params.getAll("event-type"),
    q: params.get("q") ?? defaults.q,
    playerName: params.get("player-name") ?? defaults.playerName,
    playerId: params.get("player-id") ?? defaults.playerId,
    reviewStatus: params.get("review-status") ?? defaults.reviewStatus,
    playlist: params.get("playlist") ?? defaults.playlist,
    map: params.get("map") ?? defaults.map,
    pro: eventReviewProParam(params.get("pro")),
    minConfidence: params.get("min-confidence") ?? defaults.minConfidence,
    replayId: params.get("replay-id") ?? defaults.replayId,
    detector: params.get("detector") ?? defaults.detector,
    createdAfter: params.get("created-after") ?? defaults.createdAfter,
    createdBefore: params.get("created-before") ?? defaults.createdBefore,
    replayDateAfter: params.get("replay-date-after") ?? defaults.replayDateAfter,
    replayDateBefore: params.get("replay-date-before") ?? defaults.replayDateBefore,
    eventCreatedAfter: params.get("event-created-after") ?? defaults.eventCreatedAfter,
    eventCreatedBefore: params.get("event-created-before") ?? defaults.eventCreatedBefore,
    uploader: params.get("uploader") ?? defaults.uploader,
    group: params.get("group") ?? defaults.group,
    project: params.get("project") ?? defaults.project,
    count: params.get("count") ?? defaults.count,
  };
}

function eventReviewFiltersToParams(filters: EventReviewFilterForm): URLSearchParams {
  const params = new URLSearchParams();
  for (const eventType of filters.eventTypes) {
    appendIfPresent(params, "event-type", eventType);
  }
  appendIfPresent(params, "q", filters.q);
  appendIfPresent(params, "player-name", filters.playerName);
  appendIfPresent(params, "player-id", filters.playerId);
  appendIfPresent(params, "review-status", filters.reviewStatus);
  appendIfPresent(params, "playlist", filters.playlist);
  appendIfPresent(params, "map", filters.map);
  appendIfPresent(params, "pro", filters.pro);
  appendIfPresent(params, "min-confidence", filters.minConfidence);
  appendIfPresent(params, "replay-id", filters.replayId);
  appendIfPresent(params, "detector", filters.detector);
  appendIfPresent(params, "created-after", filters.createdAfter);
  appendIfPresent(params, "created-before", filters.createdBefore);
  appendIfPresent(params, "replay-date-after", filters.replayDateAfter);
  appendIfPresent(params, "replay-date-before", filters.replayDateBefore);
  appendIfPresent(params, "event-created-after", filters.eventCreatedAfter);
  appendIfPresent(params, "event-created-before", filters.eventCreatedBefore);
  appendIfPresent(params, "uploader", filters.uploader);
  appendIfPresent(params, "group", filters.group);
  appendIfPresent(params, "project", filters.project);
  appendIfPresent(params, "count", filters.count);
  return params;
}

function appendIfPresent(params: URLSearchParams, key: string, value: string) {
  const trimmed = value.trim();
  if (trimmed) {
    params.append(key, trimmed);
  }
}

function eventReviewProParam(value: string | null): EventReviewProFilter {
  return value === "true" || value === "false" ? value : "";
}

function reviewStatusLabel(value: string): string {
  return reviewStatusOptions.find((option) => option.value === value)?.label ?? value;
}

function AccountPage() {
  const [token, setToken] = useState(() => getAccessToken() ?? "");
  const [devEmail, setDevEmail] = useState("");
  const [tokenStatus, setTokenStatus] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [creatingSessionToken, setCreatingSessionToken] = useState(false);
  const [creatingDevToken, setCreatingDevToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const attemptedSessionHydration = useRef(false);
  const claims = useMemo(() => parseAccessTokenClaims(token), [token]);

  useEffect(() => {
    if (token.trim()) return;
    if (attemptedSessionHydration.current) return;
    attemptedSessionHydration.current = true;

    let cancelled = false;
    createAccountToken()
      .then((response) => {
        if (cancelled) return;
        saveAccessToken(response.access_token);
        setTokenStatus("Loaded a token from the current browser session.");
      })
      .catch(() => {
        // Anonymous/dev-mode browsers may not have a session cookie yet.
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  function saveToken(event: FormEvent) {
    event.preventDefault();
    const trimmed = token.trim();
    if (trimmed) {
      saveAccessToken(trimmed);
      setTokenStatus("Token saved for API requests.");
    } else {
      clearStoredToken();
    }
  }

  function saveAccessToken(accessToken: string) {
    setAccessToken(accessToken);
    setToken(accessToken);
    setTokenError(null);
  }

  function acceptLoginToken(accessToken: string, message: string) {
    saveAccessToken(accessToken);
    setTokenStatus(message);
    setLoginOpen(false);
  }

  function clearStoredToken() {
    clearAccessToken();
    setToken("");
    setCopied(false);
    setTokenStatus("Token cleared.");
    setTokenError(null);
  }

  async function requestSessionToken() {
    setCreatingSessionToken(true);
    setTokenError(null);
    setTokenStatus(null);
    try {
      const response = await createAccountToken();
      saveAccessToken(response.access_token);
      setTokenStatus("Created a bearer token from the current browser session.");
    } catch (err) {
      setTokenError(err instanceof Error ? err.message : "Session token request failed");
    } finally {
      setCreatingSessionToken(false);
    }
  }

  async function requestDevToken(event: FormEvent) {
    event.preventDefault();
    setCreatingDevToken(true);
    setTokenError(null);
    setTokenStatus(null);
    try {
      const response = await createDevToken(devEmail);
      saveAccessToken(response.access_token);
      setTokenStatus("Created a development bearer token.");
    } catch (err) {
      setTokenError(err instanceof Error ? err.message : "Development token request failed");
    } finally {
      setCreatingDevToken(false);
    }
  }

  async function copyToken() {
    if (!token.trim()) return;
    await navigator.clipboard.writeText(token.trim());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="page account-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Account</h1>
        </div>
        <button className="secondary-button" type="button" onClick={() => setLoginOpen(true)}>
          <LogIn size={16} />
          {claims ? "Switch account" : "Login"}
        </button>
      </header>

      {loginOpen ? (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onAccessToken={(accessToken, message) => acceptLoginToken(accessToken, message)}
        />
      ) : null}

      <div className="account-grid">
        <section className="account-panel">
          <div>
            <h2>Account</h2>
            <p className="muted-text">{accountSummary(claims)}</p>
          </div>
          <dl className="account-details">
            <div>
              <dt>Email</dt>
              <dd>{claims?.email || "-"}</dd>
            </div>
            <div>
              <dt>User id</dt>
              <dd>{claims?.sub || "-"}</dd>
            </div>
            <div>
              <dt>Provider</dt>
              <dd>{claims?.provider_name ? providerLabel(claims.provider_name) : "-"}</dd>
            </div>
            <div>
              <dt>Token expiration</dt>
              <dd>{claims?.exp ? formatDate(new Date(claims.exp * 1000).toISOString()) : claims ? "Never" : "-"}</dd>
            </div>
          </dl>
        </section>

        <section className="account-panel">
          <div>
            <h2>Create token</h2>
            <p className="muted-text">Use your login session, or create a local development token when the server allows it.</p>
          </div>
          <div className="button-row">
            <button type="button" onClick={() => void requestSessionToken()} disabled={creatingSessionToken}>
              <Zap size={16} />
              {creatingSessionToken ? "Creating" : "Session token"}
            </button>
          </div>
          <form className="inline-token-form" onSubmit={(event) => void requestDevToken(event)}>
            <label>
              Development email
              <input
                value={devEmail}
                type="email"
                placeholder="you@example.com"
                onChange={(event) => setDevEmail(event.currentTarget.value)}
              />
            </label>
            <button type="submit" disabled={creatingDevToken || !devEmail.trim()}>
              {creatingDevToken ? "Creating" : "Create dev token"}
            </button>
          </form>
        </section>
      </div>

      <form className="token-form" onSubmit={saveToken}>
        <div className="token-form-header">
          <label htmlFor="account-token">Bearer token</label>
          <div className="button-row">
            <button className="icon-button" type="button" onClick={() => void copyToken()} disabled={!token.trim()} title="Copy token">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <button className="icon-button" type="button" onClick={clearStoredToken} disabled={!token.trim()} title="Clear token">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <textarea
          id="account-token"
          value={token}
          spellCheck={false}
          onChange={(event) => setToken(event.currentTarget.value)}
          placeholder="Create or paste a bearer token"
        />
        <div className="button-row">
          <button type="submit">Save token</button>
          {tokenStatus ? <span className="inline-status">{tokenStatus}</span> : null}
          {tokenError ? <span className="inline-status error">{tokenError}</span> : null}
        </div>
      </form>
    </section>
  );
}

interface AccessTokenClaims {
  iss?: string;
  sub?: string;
  email?: string;
  provider_name?: string;
  provider_subject?: string;
  iat?: number;
  exp?: number;
}

function parseAccessTokenClaims(token: string): AccessTokenClaims | null {
  const trimmed = token.trim();
  if (!trimmed) return null;

  try {
    const parts = trimmed.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as AccessTokenClaims;
  } catch {
    return null;
  }
}

function accountSummary(claims: AccessTokenClaims | null): string {
  if (!claims) return "No readable Rocket Sense token is active.";
  if (claims.provider_name && claims.provider_subject) {
    return `Connected through ${providerLabel(claims.provider_name)}.`;
  }
  return "This account is tied to the current Rocket Sense token.";
}

function providerLabel(provider: string): string {
  switch (provider) {
    case "dev":
      return "development";
    case "google":
      return "Google";
    case "github":
      return "GitHub";
    case "discord":
      return "Discord";
    default:
      return provider;
  }
}

function LoginModal({
  onClose,
  onAccessToken,
}: {
  onClose: () => void;
  onAccessToken: (accessToken: string, message: string) => void;
}) {
  const [options, setOptions] = useState<AuthOptionsResponse | null>(null);
  const [devEmail, setDevEmail] = useState("");
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [creatingDevToken, setCreatingDevToken] = useState(false);
  const [oauthProviderId, setOauthProviderId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const popupRef = useRef<Window | null>(null);
  const pollRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingOptions(true);
    getAuthOptions()
      .then((response) => {
        if (!cancelled) {
          setOptions(response);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setOptions(legacyAuthOptions());
          setStatus("Using deployed login options.");
          setError(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingOptions(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    return () => {
      stopOauthPolling(false);
    };
  }, []);

  function stopOauthPolling(updateState = true) {
    if (pollRef.current != null) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (updateState) {
      setOauthProviderId(null);
    }
  }

  function startOauth(provider: AuthOptionsResponse["providers"][number]) {
    stopOauthPolling();
    setError(null);
    setStatus(`Waiting for ${provider.label} login.`);

    const popup = window.open(provider.start_url, `rocket-sense-${provider.id}-login`, "popup,width=520,height=720");
    if (!popup) {
      setError("The login popup was blocked. Use the full login page instead.");
      setStatus(null);
      return;
    }

    popupRef.current = popup;
    setOauthProviderId(provider.id);

    let attempts = 0;
    pollRef.current = window.setInterval(() => {
      attempts += 1;
      if (popup.closed && attempts > 2) {
        stopOauthPolling();
        setStatus(null);
        return;
      }

      createAccountToken({ includeAccessToken: false })
        .then((response) => {
          popupRef.current?.close();
          popupRef.current = null;
          stopOauthPolling();
          onAccessToken(response.access_token, `Logged in with ${provider.label}.`);
        })
        .catch(() => {
          if (attempts >= 90) {
            stopOauthPolling();
            setError("Login did not finish. Try again or use the full login page.");
            setStatus(null);
          }
        });
    }, 1000);
  }

  async function requestDevToken(event: FormEvent) {
    event.preventDefault();
    setCreatingDevToken(true);
    setError(null);
    setStatus(null);
    try {
      const response = await createDevToken(devEmail);
      onAccessToken(response.access_token, "Created a development bearer token.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Development token request failed");
    } finally {
      setCreatingDevToken(false);
    }
  }

  const configuredProviders = options?.providers.filter((provider) => provider.configured) ?? [];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <p className="eyebrow">Account</p>
            <h2 id="login-modal-title">Login</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} title="Close">
            <X size={17} />
          </button>
        </header>

        {loadingOptions ? (
          <div className="status-line">
            <RefreshCw size={16} className="spin" />
            Loading login options
          </div>
        ) : null}

        {options?.mode === "oauth" ? (
          <div className="login-section">
            <div className="provider-login-list">
              {configuredProviders.length > 0 ? (
                configuredProviders.map((provider) => (
                  <button
                    key={provider.id}
                    className={`provider-login provider-${provider.id}`}
                    type="button"
                    onClick={() => startOauth(provider)}
                    disabled={oauthProviderId != null}
                  >
                    <LogIn size={16} />
                    <span>Continue with {provider.label}</span>
                  </button>
                ))
              ) : (
                <p className="muted-text">No OAuth login providers are configured for this server.</p>
              )}
            </div>
            <a className="secondary-button modal-fallback-link" href={options.login_url}>
              <ExternalLink size={16} />
              Full login page
            </a>
          </div>
        ) : null}

        {options?.mode === "dev" ? (
          <form className="login-section inline-token-form" onSubmit={(event) => void requestDevToken(event)}>
            <label>
              Development email
              <input
                value={devEmail}
                type="email"
                autoFocus
                placeholder="you@example.com"
                onChange={(event) => setDevEmail(event.currentTarget.value)}
              />
            </label>
            <button type="submit" disabled={creatingDevToken || !devEmail.trim()}>
              {creatingDevToken ? "Creating" : "Create token"}
            </button>
          </form>
        ) : null}

        {status ? <p className="inline-status">{status}</p> : null}
        {error ? <p className="inline-status error">{error}</p> : null}
      </section>
    </div>
  );
}

function legacyAuthOptions(): AuthOptionsResponse {
  const deployedOrigin = "https://rocket-sense.duckdns.org";
  return {
    mode: "oauth",
    login_url: `${deployedOrigin}/login`,
    providers: ["google", "github", "discord"].map((id) => ({
      id,
      label: providerLabel(id),
      configured: true,
      start_url: `${deployedOrigin}/auth/${id}/start`,
    })),
  };
}

function AdminProcessingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [response, setResponse] = useState<ReplayProcessingDiagnosticsResponse | null>(null);
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [includeHealthy, setIncludeHealthy] = useState(searchParams.get("include_healthy") === "true");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus(searchParams.get("status") ?? "");
    setIncludeHealthy(searchParams.get("include_healthy") === "true");
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listReplayProcessingDiagnostics(searchParams)
      .then((nextResponse) => {
        if (!cancelled) setResponse(nextResponse);
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
  }, [searchParams]);

  function submitFilters(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    setTrimmedParam(params, "status", status);
    if (includeHealthy) {
      params.set("include_healthy", "true");
    } else {
      params.delete("include_healthy");
    }
    params.delete("offset");
    navigate(`/admin/processing?${params.toString()}`);
  }

  function updatePageSize(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("count", value);
    params.delete("offset");
    navigate(`/admin/processing?${params.toString()}`);
  }

  function goToOffset(offset: number) {
    const params = new URLSearchParams(searchParams);
    if (offset > 0) {
      params.set("offset", String(offset));
    } else {
      params.delete("offset");
    }
    navigate(`/admin/processing?${params.toString()}`);
  }

  const diagnostics = response?.replays ?? [];
  const total = response?.total ?? null;
  const offset = positiveIntegerParam(searchParams, "offset", 0);
  const pageSize = positiveIntegerParam(searchParams, "count", 100);
  const canPageBackward = offset > 0;
  const canPageForward = response?.next_offset != null;
  const previousOffset = Math.max(0, offset - pageSize);
  const nextOffset = response?.next_offset ?? offset + pageSize;
  const visiblePageSizeOptions = [50, 100, 200, 500].includes(pageSize) ? [50, 100, 200, 500] : [50, 100, 200, 500, pageSize].sort((a, b) => a - b);

  return (
    <section className="page admin-processing-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Replay Processing</h1>
        </div>
        <a className="secondary-button" href="/api/v1/admin/replays/processing-diagnostics">
          <ExternalLink size={16} />
          JSON
        </a>
      </header>

      {response ? (
        <div className="summary-grid admin-summary-grid">
          <Metric label="Problem replays" value={response.summary.problem_replays.toLocaleString()} />
          <Metric label="Total replays" value={response.summary.total_replays.toLocaleString()} />
          <Metric label="Processing status" value={formatCounts(response.summary.status_counts)} />
          <Metric label="Queue counts" value={formatCounts(response.summary.queue_counts)} />
        </div>
      ) : null}

      <form className="admin-filter-panel" onSubmit={submitFilters}>
        <FilterGrid
          fields={[
            {
              id: "admin-status",
              label: "Processing status",
              value: status,
              options: replayStatusOptions,
              onChange: setStatus,
            },
          ]}
          className="admin-filter-grid"
        />
        <label className="toggle-row">
          <input type="checkbox" checked={includeHealthy} onChange={(event) => setIncludeHealthy(event.currentTarget.checked)} />
          <span>Show fully processed replays</span>
        </label>
        <button type="submit">
          <Search size={16} />
          Apply
        </button>
      </form>

      <div className="replay-list-controls">
        <div className="results-readout">
          <AlertTriangle size={16} />
          <span>
            {loading
              ? "Loading diagnostics"
              : total == null
                ? `${diagnostics.length.toLocaleString()} diagnostics`
                : `${diagnostics.length.toLocaleString()} of ${total.toLocaleString()} diagnostics`}
          </span>
        </div>
        <div className="pagination-controls">
          <label>
            Page size
            <select value={String(pageSize)} onChange={(event) => updatePageSize(event.currentTarget.value)}>
              {visiblePageSizeOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="icon-button" title="Previous page" disabled={!canPageBackward || loading} onClick={() => goToOffset(previousOffset)}>
            <ChevronLeft size={17} />
          </button>
          <button type="button" className="icon-button" title="Next page" disabled={!canPageForward || loading} onClick={() => goToOffset(nextOffset)}>
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <StatusLine loading={loading} error={error} />

      <div className="table-frame admin-diagnostics-table">
        <table>
          <thead>
            <tr>
              <th>Replay</th>
              <th>Reasons</th>
              <th>Runs</th>
              <th>Queue</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {diagnostics.map((diagnostic) => (
              <tr key={diagnostic.replay_id}>
                <td className="admin-replay-cell">
                  <Link className="primary-link" to={`/replays/${diagnostic.replay_id}`}>
                    {diagnostic.original_file_name || diagnostic.replay_id}
                  </Link>
                  <div className="subtle">{diagnostic.file_sha256.slice(0, 16)}</div>
                  <StatusBadge status={diagnostic.processing_status} />
                </td>
                <td>
                  <ul className="admin-reason-list">
                    {diagnostic.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </td>
                <td className="admin-run-cell">
                  <RunSummary label="Canonical" run={diagnostic.canonical_analysis_run} eventCount={diagnostic.canonical_event_count} />
                  <RunSummary label="Latest" run={diagnostic.latest_analysis_run} />
                  {diagnostic.needs_reanalysis || diagnostic.needs_reindex ? (
                    <div className="admin-flag-row">
                      {diagnostic.needs_reanalysis ? <span>needs reanalysis</span> : null}
                      {diagnostic.needs_reindex ? <span>needs reindex</span> : null}
                    </div>
                  ) : null}
                </td>
                <td className="admin-queue-cell">
                  <div>Queued {diagnostic.queued_jobs.toLocaleString()}</div>
                  <div>Running {diagnostic.running_jobs.toLocaleString()}</div>
                  <div>Failed {diagnostic.failed_jobs.toLocaleString()}</div>
                  <div>Done {diagnostic.finished_jobs.toLocaleString()}</div>
                  {diagnostic.next_queue_run_at ? <small>Next {formatDate(diagnostic.next_queue_run_at)}</small> : null}
                </td>
                <td className="admin-date-cell">
                  <div>{formatDate(diagnostic.updated_at)}</div>
                  <small>Created {formatDate(diagnostic.created_at)}</small>
                </td>
              </tr>
            ))}
            {!loading && diagnostics.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-cell">
                  No replay processing diagnostics matched.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RunSummary({
  label,
  run,
  eventCount,
}: {
  label: string;
  run: ReplayProcessingDiagnostic["canonical_analysis_run"];
  eventCount?: number;
}) {
  if (!run) {
    return (
      <div className="admin-run-summary">
        <strong>{label}</strong>
        <span>Missing</span>
      </div>
    );
  }

  return (
    <div className="admin-run-summary">
      <strong>{label}</strong>
      <span>
        {run.status}
        {eventCount != null ? `, ${eventCount.toLocaleString()} events` : ""}
      </span>
      <small>{run.event_stream_schema_version || "schema missing"}</small>
      <small>{formatDate(run.started_at)}</small>
    </div>
  );
}

function NotFoundPage() {
  return (
    <section className="page">
      <h1>Not found</h1>
      <Link className="primary-link" to="/replays">
        Go to replays
      </Link>
    </section>
  );
}

function StatusLine({ loading, error, count, label }: { loading: boolean; error: string | null; count?: number | null; label?: string }) {
  if (loading) {
    return (
      <div className="status-line">
        <RefreshCw size={16} className="spin" />
        Loading
      </div>
    );
  }
  if (error) return <div className="status-line error">{error}</div>;
  if (count != null && label) return <div className="status-line">{count.toLocaleString()} {label}</div>;
  return null;
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status}`}>{statusLabel(status)}</span>;
}

function statusLabel(status: string): string {
  switch (status) {
    case "parsed":
    case "processed":
      return "Processed";
    case "parsing":
    case "processing":
      return "Processing";
    case "pending":
      return "Pending";
    case "failed":
      return "Failed";
    default:
      return status;
  }
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function filterStatsForGroup(stats: StatAggregateResponse[], terms: readonly string[]): StatAggregateResponse[] {
  return stats.filter((stat) => terms.some((term) => statSearchText(stat).includes(term)));
}

function statSearchText(stat: StatAggregateResponse): string {
  return `${stat.key} ${stat.display_name} ${stat.category}`.toLowerCase();
}

function filterEventsForGroup(events: MechanicEventResponse[], terms: readonly string[]): MechanicEventResponse[] {
  return events.filter((event) => terms.some((term) => eventSearchText(event).includes(term)));
}

function eventSearchText(event: MechanicEventResponse): string {
  return `${event.event_type} ${event.event_type_label} ${event.event_category} ${event.mechanic} ${event.detector}`.toLowerCase();
}

function formatScore(replay: ReplayResponse): string {
  const blue = replay.summary.team_scores.blue;
  const orange = replay.summary.team_scores.orange;
  return blue == null || orange == null ? "Unknown" : `${blue} - ${orange}`;
}

function formatPlayerReplayScore(replay: PlayerProfileReplayResponse): string {
  const blue = replay.team_scores.blue;
  const orange = replay.team_scores.orange;
  return blue == null || orange == null ? "Unknown" : `${blue} - ${orange}`;
}

function playlistLabel(metadata: ReplayPlaylistMetadata | null | undefined, fallback: string | null): string {
  if (metadata?.label) return metadata.label;
  if (!fallback) return "Unknown";
  return fallback
    .replace(/^online-/, "Online ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function platformLabel(value: string | null): string {
  if (!value) return "unknown";
  if (value.toLowerCase() === "psynet") return "Epic";
  return value;
}

function rankLabel(tier: number | null | undefined, division: number | null | undefined): string | null {
  if (tier == null) return null;
  const tiers = [
    "Unranked",
    "Bronze I",
    "Bronze II",
    "Bronze III",
    "Silver I",
    "Silver II",
    "Silver III",
    "Gold I",
    "Gold II",
    "Gold III",
    "Platinum I",
    "Platinum II",
    "Platinum III",
    "Diamond I",
    "Diamond II",
    "Diamond III",
    "Champion I",
    "Champion II",
    "Champion III",
    "Grand Champion I",
    "Grand Champion II",
    "Grand Champion III",
    "Supersonic Legend",
  ];
  const name = tiers[tier] ?? `Tier ${tier}`;
  if (tier <= 0 || division == null) return name;
  const visibleDivision = division >= 0 && division <= 3 ? division + 1 : division;
  return `${name} Div ${visibleDivision}`;
}

function formatDuration(value: number | null): string {
  if (value == null) return "Duration unknown";
  const totalSeconds = Math.round(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatDate(value: string | null): string {
  if (!value) return "Unknown";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatShortDate(value: string | null): string {
  if (!value) return "Unknown";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function formatSeconds(value: number | null): string {
  if (value == null) return "Unknown";
  return `${Math.round(value)}s`;
}

function formatNumber(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  const absoluteValue = Math.abs(value);
  if (absoluteValue >= 100) return value.toFixed(0);
  return value.toFixed(absoluteValue >= 10 ? 1 : 2);
}

function formatCounts(counts: Array<{ status: string; count: number }>): string {
  if (counts.length === 0) return "None";
  return counts.map((count) => `${statusLabel(count.status)} ${count.count.toLocaleString()}`).join(", ");
}

function formatPercent(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  return `${Math.round(value * 100)}%`;
}

function teamLabel(team: number | null): string {
  if (team === 0) return "Blue";
  if (team === 1) return "Orange";
  return "Unknown";
}
