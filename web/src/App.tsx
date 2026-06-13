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
  FolderMinus,
  FolderOpen,
  FolderPlus,
  LayoutDashboard,
  ListPlus,
  LogIn,
  Plus,
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
import { FormEvent, lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addReplaysToGroup,
  clearAccessToken,
  createDevToken,
  createReplayGroup,
  createAccountToken,
  deleteReplayGroup,
  getAccessToken,
  getAuthOptions,
  getCurrentUser,
  getPlayerKickoffSummary,
  getPlayerPossessionSummary,
  getPlayerProfile,
  getPlayerStatAggregates,
  getPlayerStatOverview,
  getReplay,
  getReplayGroup,
  getReplayGroupStatAggregates,
  getReplayStatAggregates,
  listEventTypes,
  listReplayGroups,
  listReplayGroupEvents,
  listReplayGroupReplays,
  listReplayEvents,
  listReplayFilterOptions,
  listReplayProcessingDiagnostics,
  listReplays,
  removeReplaysFromGroup,
  reprocessReplay,
  setAccessToken,
  uploadReplay,
} from "./api";
import { completedStatGroups, eventTypesForGroup, statGroupById, statGroups } from "./stats/registry";
import type { StatGroup } from "./stats/registry";
import { StalenessBadge } from "./staleness";
import { PlatformIcon } from "./platform";
import {
  PlayerIdentity,
  playerIdentityKey,
  replayLocalTeamClass,
  replayLocalTeamLabel,
} from "./playerIdentity";
import { RankBadge } from "./rank";
import {
  KickoffSpawnBreakdown,
  type KickoffShapeFilter,
  type KickoffSideFilter,
} from "./stats/KickoffSpawnBreakdown";
import {
  GoalTagSharePanel,
  KickoffSummaryPanel,
  PossessionSummaryPanel,
  PlayerRateComparisonChart,
  RotationTimeSharePanel,
} from "./stats/playerPanels";
import type {
  AuthOptionsResponse,
  CurrentUserResponse,
  EventStatSummaryResponse,
  EventTypeResponse,
  MechanicEventResponse,
  PlayerProfileResponse,
  PlayerStatOverviewResponse,
  PossessionSummaryResponse,
  ReplayProcessingDiagnostic,
  ReplayProcessingDiagnosticsResponse,
  ReplayFilterOption,
  ReplayGroupResponse,
  ReplayPlayer,
  ReplayPlaylistMetadata,
  ReplayResponse,
  StatAggregateResponse,
  StatAggregateSetResponse,
} from "./types";

// Lazily loaded so the three.js / wasm replay player is only fetched when a
// goal playlist page is actually opened, instead of bloating the main bundle.
const ReplayGoalPlaylistPage = lazy(() =>
  import("./stats/goalPlaylist").then((module) => ({ default: module.ReplayGoalPlaylistPage })),
);
const PlayerGoalPlaylistPage = lazy(() =>
  import("./stats/goalPlaylist").then((module) => ({ default: module.PlayerGoalPlaylistPage })),
);

const navItems = [
  { to: "/replays", label: "Replays", icon: FileVideo, end: true },
  { to: "/replay-groups", label: "Groups", icon: FolderOpen, end: true },
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
            <Route path="/replay-groups" element={<ReplayGroupListPage />} />
            <Route path="/replays/:replayId" element={<ReplayStatsPage />} />
            <Route path="/replays/:replayId/stats" element={<ReplayStatsPage />} />
            <Route path="/replays/:replayId/stats/:statGroup" element={<ReplayStatsPage />} />
            <Route path="/replay-groups/:groupId" element={<ReplayGroupStatsPage />} />
            <Route path="/replay-groups/:groupId/stats" element={<ReplayGroupStatsPage />} />
            <Route path="/replay-groups/:groupId/stats/:statGroup" element={<ReplayGroupStatsPage />} />
            <Route
              path="/replays/:replayId/goals"
              element={
                <Suspense fallback={<StatusLine loading error={null} />}>
                  <ReplayGoalPlaylistPage />
                </Suspense>
              }
            />
            <Route
              path="/replays/:replayId/goals/:goalType"
              element={
                <Suspense fallback={<StatusLine loading error={null} />}>
                  <ReplayGoalPlaylistPage />
                </Suspense>
              }
            />
            <Route path="/players/:platform/:platformPlayerId" element={<PlayerStatsPage />} />
            <Route path="/players/:platform/:platformPlayerId/stats" element={<PlayerStatsPage />} />
            <Route path="/players/:platform/:platformPlayerId/stats/:statGroup" element={<PlayerStatsPage />} />
            <Route
              path="/players/:platform/:platformPlayerId/goals"
              element={
                <Suspense fallback={<StatusLine loading error={null} />}>
                  <PlayerGoalPlaylistPage />
                </Suspense>
              }
            />
            <Route
              path="/players/:platform/:platformPlayerId/goals/:goalType"
              element={
                <Suspense fallback={<StatusLine loading error={null} />}>
                  <PlayerGoalPlaylistPage />
                </Suspense>
              }
            />
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
  const currentUser = useCurrentUser();
  const { groups, refresh: refreshGroups } = useReplayGroups(currentUser != null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setFilters(activeFilters);
  }, [activeFilters]);

  // Selections reference rows on the current page; drop them when the query changes.
  useEffect(() => {
    setSelectedIds(new Set());
  }, [searchParams]);

  function toggleSelected(replayId: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(replayId)) {
        next.delete(replayId);
      } else {
        next.add(replayId);
      }
      return next;
    });
  }

  function selectAllOnPage() {
    setSelectedIds((current) => {
      const next = new Set(current);
      for (const replay of replays) {
        next.add(replay.id);
      }
      return next;
    });
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

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
  const activeGroupId = searchParams.get("group");
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
        {activeGroupId ? (
          <Link className="secondary-button" to={`/replay-groups/${encodeURIComponent(activeGroupId)}/stats`}>
            <BarChart3 size={16} />
            Group stats
          </Link>
        ) : null}
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

      {currentUser && selectedIds.size > 0 ? (
        <GroupSelectionBar
          selectedIds={selectedIds}
          replayCount={replays.length}
          groups={groups}
          onSelectAll={selectAllOnPage}
          onClear={clearSelection}
          onGroupsChanged={refreshGroups}
        />
      ) : null}

      <div className="replay-card-list">
        {replays.map((replay) => (
          <article
            className={`replay-card${selectedIds.has(replay.id) ? " replay-card-selected" : ""}`}
            key={replay.id}
          >
            <header className="replay-card-header">
              <div className="replay-card-heading">
                {currentUser ? (
                  <input
                    type="checkbox"
                    className="replay-select"
                    aria-label={`Select ${replay.original_file_name || replay.id}`}
                    checked={selectedIds.has(replay.id)}
                    onChange={() => toggleSelected(replay.id)}
                  />
                ) : null}
                <div className="replay-card-title">
                  <Link className="primary-link" to={`/replays/${replay.id}`}>
                    {replay.original_file_name || replay.id}
                  </Link>
                  <span className="subtle">{replay.map_code || replay.summary.match_guid || replay.file_sha256.slice(0, 12)}</span>
                </div>
              </div>
              <div className="replay-card-meta">
                <GameTypeBadges metadata={replay.playlist_metadata} fallback={replay.playlist} />
                <span>{formatDate(replay.replay_date || replay.created_at)}</span>
                <span className="subtle">{formatDuration(replay.summary.duration_seconds)}</span>
                <StatusBadge status={replay.status} />
                <StalenessBadge
                  staleness={replay.staleness}
                  processingVersion={replay.processing_version}
                />
              </div>
            </header>
            <ReplayTeams replay={replay} />
          </article>
        ))}
        {!loading && replays.length === 0 ? <div className="status-line">No replays found.</div> : null}
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
  { value: "processed", label: "Processed" },
  { value: "processing", label: "Processing" },
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

function ReplayGroupListPage() {
  const [groups, setGroups] = useState<ReplayGroupResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listReplayGroups()
      .then((response) => {
        if (!cancelled) setGroups(response.groups);
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
  }, []);

  return (
    <section className="page replay-group-list-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Replay groups</p>
          <h1>Groups</h1>
        </div>
      </header>

      <StatusLine loading={loading} error={error} />

      <div className="replay-card-list group-card-list">
        {groups.map((group) => (
          <article className="replay-card group-card" key={group.id}>
            <header className="replay-card-header">
              <div className="replay-card-title">
                <Link className="primary-link" to={`/replay-groups/${group.id}/stats`}>
                  {group.name}
                </Link>
                <span className="subtle">{group.description || group.id}</span>
              </div>
              <div className="replay-card-meta">
                <span>{group.replay_count.toLocaleString()} replays</span>
                <span className="subtle">Updated {formatDate(group.updated_at)}</span>
              </div>
            </header>
            <div className="button-row">
              <Link className="secondary-button" to={`/replay-groups/${group.id}/stats`}>
                <BarChart3 size={16} />
                Stats
              </Link>
              <Link className="secondary-button" to={`/replays?group=${encodeURIComponent(group.id)}`}>
                <FileVideo size={16} />
                Replays
              </Link>
            </div>
          </article>
        ))}
        {!loading && groups.length === 0 ? <div className="status-line">No replay groups found.</div> : null}
      </div>
    </section>
  );
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

// One small badge per game-type parameter: competitive context
// (Ranked/Casual/Private/...), ruleset (Soccar/Hoops/...), and team size
// (1v1/2v2/...). Falls back to the plain playlist label when the playlist
// isn't recognized.
function GameTypeBadges({
  metadata,
  fallback,
}: {
  metadata: ReplayPlaylistMetadata | null;
  fallback: string | null;
}) {
  const badges: Array<{ key: string; label: string; tone: string }> = [];
  const context = metadata?.ranked
    ? "ranked"
    : metadata?.casual
      ? "casual"
      : metadata?.category;
  if (context) {
    const tone = context === "ranked" ? "ranked" : context === "casual" ? "casual" : "context";
    badges.push({ key: "context", label: titleCase(context), tone });
  }
  if (metadata?.ruleset) {
    badges.push({ key: "ruleset", label: titleCase(metadata.ruleset), tone: "ruleset" });
  }
  if (metadata?.team_size) {
    badges.push({ key: "size", label: `${metadata.team_size}v${metadata.team_size}`, tone: "size" });
  }
  if (badges.length === 0) {
    badges.push({ key: "playlist", label: playlistLabel(metadata, fallback), tone: "context" });
  }
  const title = playlistLabel(metadata, fallback);
  return (
    <span className="game-badges" title={title}>
      {badges.map((badge) => (
        <span key={badge.key} className={`game-badge game-badge-${badge.tone}`}>
          {badge.label}
        </span>
      ))}
    </span>
  );
}

function titleCase(value: string): string {
  return value
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function ReplayTeams({ replay }: { replay: ReplayResponse }) {
  const mvp = mvpPlayer(replay);
  const byScore = (players: ReplayPlayer[]) =>
    [...players].sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
  const blue = byScore(replay.players.filter((player) => player.team === 0));
  const orange = byScore(replay.players.filter((player) => player.team === 1));
  const unknown = replay.players.filter((player) => player.team !== 0 && player.team !== 1);

  return (
    <div className="teams-cell">
      <TeamBlock label="Blue" players={blue} tone="blue" score={replay.summary.team_scores.blue} mvp={mvp} />
      <TeamBlock label="Orange" players={orange} tone="orange" score={replay.summary.team_scores.orange} mvp={mvp} />
      {unknown.length > 0 ? <TeamBlock label="Other" players={unknown} tone="neutral" mvp={mvp} /> : null}
    </div>
  );
}

// Replay headers don't carry an MVP flag; mirror the game's rule of awarding
// it to the highest scoreboard score on the winning team.
function mvpPlayer(replay: ReplayResponse): ReplayPlayer | null {
  const blue = replay.summary.team_scores.blue;
  const orange = replay.summary.team_scores.orange;
  if (blue == null || orange == null || blue === orange) return null;
  const winningTeam = blue > orange ? 0 : 1;
  let best: ReplayPlayer | null = null;
  for (const player of replay.players) {
    if (player.team !== winningTeam || player.score == null) continue;
    if (!best || player.score > (best.score ?? -1)) best = player;
  }
  return best;
}

function TeamBlock({
  label,
  players,
  tone,
  score,
  mvp,
}: {
  label: string;
  players: ReplayPlayer[];
  tone: "blue" | "orange" | "neutral";
  score?: number | null;
  mvp?: ReplayPlayer | null;
}) {
  return (
    <div className={`team-block replay-team-${tone}`}>
      <div className="team-heading">
        <span>{label}</span>
        {score != null ? <strong>{score}</strong> : null}
      </div>
      <div className="player-stack">
        {players.length > 0 ? (
          players.map((player, index) => (
            <PlayerLine key={`${player.platform}-${player.platform_player_id}-${index}`} player={player} isMvp={player === mvp} />
          ))
        ) : (
          <span className="subtle">No players</span>
        )}
      </div>
    </div>
  );
}

function PlayerLine({ player, isMvp }: { player: ReplayPlayer; isMvp?: boolean }) {
  const hasStats = [player.goals, player.assists, player.saves, player.shots, player.score].some(
    (value) => value != null,
  );
  const suffix = (
    <>
      <RankBadge
        tier={player.rank_tier}
        division={player.rank_division}
        mmr={player.rank_mmr}
        approximate={player.rank_is_fallback}
        approximateAsOf={player.rank_fallback_replay_date}
      />
      {isMvp ? (
        <span className="mvp-chip" title="MVP: highest score on the winning team">
          MVP
        </span>
      ) : null}
      {hasStats ? (
        <span className="player-statline" title="Goals / Assists / Saves / Shots · Score">
          <span className="stat-cell">
            {player.goals ?? 0}
            <small>G</small>
          </span>
          <span className="stat-cell">
            {player.assists ?? 0}
            <small>A</small>
          </span>
          <span className="stat-cell">
            {player.saves ?? 0}
            <small>SV</small>
          </span>
          <span className="stat-cell">
            {player.shots ?? 0}
            <small>SH</small>
          </span>
          <span className="stat-cell stat-score">{player.score ?? 0}</span>
        </span>
      ) : null}
    </>
  );

  return <PlayerIdentity player={player} suffix={suffix} className="player-line" showTeam={false} />;
}

function useCurrentUser(): CurrentUserResponse | null {
  const [user, setUser] = useState<CurrentUserResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!getAccessToken()) {
      setUser(null);
      return;
    }
    getCurrentUser()
      .then((response) => {
        if (!cancelled) setUser(response);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return user;
}

function useReplayGroups(enabled: boolean): {
  groups: ReplayGroupResponse[];
  refresh: () => void;
} {
  const [groups, setGroups] = useState<ReplayGroupResponse[]>([]);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setGroups([]);
      return;
    }
    let cancelled = false;
    listReplayGroups()
      .then((response) => {
        if (!cancelled) setGroups(response.groups);
      })
      .catch(() => {
        if (!cancelled) setGroups([]);
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, nonce]);

  return { groups, refresh: () => setNonce((value) => value + 1) };
}

const NEW_GROUP_OPTION = "__new__";

function GroupSelectionBar({
  selectedIds,
  replayCount,
  groups,
  onSelectAll,
  onClear,
  onGroupsChanged,
}: {
  selectedIds: Set<string>;
  replayCount: number;
  groups: ReplayGroupResponse[];
  onSelectAll: () => void;
  onClear: () => void;
  onGroupsChanged: () => void;
}) {
  const [targetGroupId, setTargetGroupId] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "error"; message: string } | null>(null);

  const creating = targetGroupId === NEW_GROUP_OPTION;
  const targetGroup = groups.find((group) => group.id === targetGroupId) ?? null;
  const selectedCount = selectedIds.size;
  const allSelected = replayCount > 0 && selectedCount >= replayCount;

  async function withBusy(action: () => Promise<void>) {
    setBusy(true);
    setFeedback(null);
    try {
      await action();
    } catch (err) {
      setFeedback({ kind: "error", message: err instanceof Error ? err.message : "Request failed" });
    } finally {
      setBusy(false);
    }
  }

  function handleCreateGroup() {
    const name = newGroupName.trim();
    if (!name) return;
    void withBusy(async () => {
      const group = await createReplayGroup({ name });
      onGroupsChanged();
      setTargetGroupId(group.id);
      setNewGroupName("");
      setFeedback({ kind: "ok", message: `Created group "${group.name}".` });
    });
  }

  function handleAdd() {
    if (!targetGroup) return;
    void withBusy(async () => {
      const result = await addReplaysToGroup(targetGroup.id, [...selectedIds]);
      onGroupsChanged();
      setFeedback({
        kind: "ok",
        message: `Added ${result.changed_replays} ${pluralizeReplay(result.changed_replays)} to "${result.group.name}".`,
      });
    });
  }

  function handleRemove() {
    if (!targetGroup) return;
    void withBusy(async () => {
      const result = await removeReplaysFromGroup(targetGroup.id, [...selectedIds]);
      onGroupsChanged();
      setFeedback({
        kind: "ok",
        message: `Removed ${result.changed_replays} ${pluralizeReplay(result.changed_replays)} from "${result.group.name}".`,
      });
    });
  }

  function handleDeleteGroup() {
    if (!targetGroup) return;
    const { id, name, replay_count } = targetGroup;
    const confirmed = window.confirm(
      `Delete group "${name}"? Its ${replay_count} ${pluralizeReplay(replay_count)} ${
        replay_count === 1 ? "membership is" : "memberships are"
      } removed, but the replays themselves are not deleted.`,
    );
    if (!confirmed) return;
    void withBusy(async () => {
      await deleteReplayGroup(id);
      onGroupsChanged();
      setTargetGroupId("");
      setFeedback({ kind: "ok", message: `Deleted group "${name}".` });
    });
  }

  return (
    <div className="replay-selection-bar">
      <div className="replay-selection-summary">
        <strong>{selectedCount.toLocaleString()} selected</strong>
        {!allSelected ? (
          <button type="button" className="link-button" onClick={onSelectAll} disabled={busy}>
            Select all {replayCount.toLocaleString()} on page
          </button>
        ) : null}
        <button type="button" className="link-button" onClick={onClear} disabled={busy}>
          Clear
        </button>
      </div>
      <div className="replay-selection-actions">
        <label className="replay-selection-group">
          <FolderPlus size={16} />
          <select
            value={targetGroupId}
            onChange={(event) => {
              setTargetGroupId(event.currentTarget.value);
              setFeedback(null);
            }}
            disabled={busy}
          >
            <option value="">Choose a group…</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name} ({group.replay_count})
              </option>
            ))}
            <option value={NEW_GROUP_OPTION}>+ New group…</option>
          </select>
        </label>
        {creating ? (
          <div className="replay-selection-create">
            <input
              type="text"
              value={newGroupName}
              placeholder="New group name"
              autoFocus
              onChange={(event) => setNewGroupName(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleCreateGroup();
                }
              }}
              disabled={busy}
            />
            <button type="button" onClick={handleCreateGroup} disabled={busy || newGroupName.trim() === ""}>
              <Plus size={16} />
              Create
            </button>
          </div>
        ) : (
          <>
            <button type="button" onClick={handleAdd} disabled={busy || !targetGroup}>
              <ListPlus size={16} />
              Add to group
            </button>
            <button type="button" className="secondary-button" onClick={handleRemove} disabled={busy || !targetGroup}>
              <FolderMinus size={16} />
              Remove from group
            </button>
            <button
              type="button"
              className="secondary-button is-danger"
              onClick={handleDeleteGroup}
              disabled={busy || !targetGroup}
              title="Delete this group"
            >
              <Trash2 size={16} />
              Delete group
            </button>
          </>
        )}
      </div>
      {feedback ? (
        <p className={`replay-selection-feedback ${feedback.kind === "error" ? "is-error" : "is-ok"}`}>
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}

function pluralizeReplay(count: number): string {
  return count === 1 ? "replay" : "replays";
}

type RequeuePhase = "pending" | "done" | "skipped" | "error";

interface RequeueResult {
  phase: RequeuePhase;
  message: string;
}

function RequeueResultChip({ result }: { result: RequeueResult }) {
  const Icon =
    result.phase === "error"
      ? AlertTriangle
      : result.phase === "pending"
        ? RotateCcw
        : Check;
  return (
    <span className={`requeue-result requeue-result-${result.phase}`} role="status">
      <Icon size={14} className={result.phase === "pending" ? "spin" : undefined} />
      <span>{result.message}</span>
    </span>
  );
}

function ReplayStatsPage() {
  const { replayId = "", statGroup } = useParams();
  const currentUser = useCurrentUser();
  const [reprocessing, setReprocessing] = useState(false);
  const [reprocessResult, setReprocessResult] = useState<RequeueResult | null>(null);
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
    () => statGroupById(statGroup, completedStatGroups) ?? completedStatGroups[0],
    [statGroup],
  );

  useEffect(() => {
    let cancelled = false;

    setReplayLoading(true);
    setReplayError(null);
    const replayPromise = getReplay(replayId);
    replayPromise
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
    replayPromise
      .catch(() => null)
      .then((replayResponse) =>
        listReplayEvents(
          replayId,
          eventTypesForGroup(activeGroup.id),
          replayResponse?.processing_version.processed_at ?? null,
        ),
      )
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

  const canReprocess = Boolean(
    replay &&
      currentUser &&
      (currentUser.is_admin || replay.uploaded_by_user_id === currentUser.id),
  );

  async function handleReprocess(force = false) {
    setReprocessing(true);
    setReprocessResult(null);
    try {
      const result = await reprocessReplay(replayId, { force });
      setReprocessResult(
        result.enqueued
          ? {
              phase: "done",
              message: result.forced
                ? "Force-reprocessing queued — this page will reflect the new results once a worker finishes."
                : "Queued for reprocessing — this page will reflect the new results once a worker finishes.",
            }
          : { phase: "skipped", message: "Already up to date — nothing needed reprocessing." },
      );
    } catch (err) {
      setReprocessResult({
        phase: "error",
        message: err instanceof Error ? err.message : "Reprocess request failed.",
      });
    } finally {
      setReprocessing(false);
    }
  }

  return (
    <section className="page stats-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Game stats</p>
          <h1>{replay?.original_file_name || "Replay stats"}</h1>
        </div>
        <div className="button-row">
          {replay?.staleness.is_stale ? (
            <StalenessBadge
              staleness={replay.staleness}
              processingVersion={replay.processing_version}
            />
          ) : null}
          {canReprocess ? (
            <button
              className="secondary-button"
              type="button"
              onClick={() => void handleReprocess()}
              disabled={reprocessing}
            >
              <RefreshCw size={16} />
              {reprocessing ? "Requesting" : "Reprocess"}
            </button>
          ) : null}
          <Link className="secondary-button" to={`/replays/${replayId}/player`}>
            <Zap size={16} />
            Player
          </Link>
          {reprocessResult ? <RequeueResultChip result={reprocessResult} /> : null}
          {reprocessResult?.phase === "skipped" ? (
            <button
              type="button"
              className="requeue-force-button"
              disabled={reprocessing}
              onClick={() => void handleReprocess(true)}
            >
              Force reprocess anyway
            </button>
          ) : null}
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

function ReplayGroupStatsPage() {
  const { groupId = "", statGroup } = useParams();
  const activeGroup = useMemo(
    () => statGroupById(statGroup, completedStatGroups) ?? completedStatGroups[0],
    [statGroup],
  );
  const [group, setGroup] = useState<ReplayGroupResponse | null>(null);
  const [replays, setReplays] = useState<ReplayResponse[]>([]);
  const [stats, setStats] = useState<StatAggregateSetResponse | null>(null);
  const [events, setEvents] = useState<MechanicEventResponse[]>([]);
  const [groupLoading, setGroupLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [groupError, setGroupError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setGroupLoading(true);
    setGroupError(null);
    setReplays([]);
    Promise.all([getReplayGroup(groupId), listReplayGroupReplays(groupId)])
      .then(([groupResponse, replayResponse]) => {
        if (!cancelled) {
          setGroup(groupResponse);
          setReplays(replayResponse.replays);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setGroupError(err.message);
      })
      .finally(() => {
        if (!cancelled) setGroupLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [groupId]);

  useEffect(() => {
    let cancelled = false;
    setStatsLoading(true);
    setStatsError(null);
    if (!activeGroup.usesAggregateStats) {
      setStats(null);
      setStatsLoading(false);
    } else {
      getReplayGroupStatAggregates(groupId)
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
    return () => {
      cancelled = true;
    };
  }, [activeGroup.usesAggregateStats, groupId]);

  useEffect(() => {
    let cancelled = false;
    setEventsLoading(true);
    setEventsError(null);
    listReplayGroupEvents(groupId, eventTypesForGroup(activeGroup.id))
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
  }, [activeGroup.id, groupId]);

  const participantAnalysis = useMemo(() => analyzeReplayGroupParticipants(replays), [replays]);
  const activeStats = useMemo(() => filterStatsForGroup(stats?.stats ?? [], activeGroup.terms), [activeGroup, stats]);
  const activeEvents = useMemo(() => filterEventsForGroup(events, activeGroup.terms), [activeGroup, events]);
  const ActiveDetail = activeGroup.Detail;
  const detailEvents = ActiveDetail ? events : activeEvents;
  const canRenderGroupDetail =
    participantAnalysis.consistent || activeGroup.id === "goals" || activeGroup.id === "mechanics" || activeGroup.id === "possession-territory";
  const groupDurationSeconds = sumReplayDurations(replays);
  const dateRange = replayDateRange(replays);

  return (
    <section className="page stats-page replay-group-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Replay group stats</p>
          <h1>{group?.name || "Replay group"}</h1>
          {group?.description ? <p className="page-header-note">{group.description}</p> : null}
        </div>
        <div className="button-row">
          <Link className="secondary-button" to={`/replays?group=${encodeURIComponent(groupId)}`}>
            <FileVideo size={16} />
            Replays
          </Link>
        </div>
      </header>

      <StatusLine loading={groupLoading} error={groupError} />

      {group ? (
        <>
          <div className="match-context">
            <div>
              <span>Games</span>
              <strong>{replays.length.toLocaleString()}</strong>
            </div>
            <div>
              <span>Participants</span>
              <strong>{participantAnalysis.players.length > 0 ? participantAnalysis.players.length.toLocaleString() : "Mixed"}</strong>
            </div>
            <div>
              <span>Total duration</span>
              <strong>{formatDuration(groupDurationSeconds)}</strong>
            </div>
            <div>
              <span>Date range</span>
              <strong>{dateRange}</strong>
            </div>
          </div>

          <GroupParticipantNotice analysis={participantAnalysis} />

          {participantAnalysis.consistent ? (
            <div className="group-participant-strip" aria-label="Group participants">
              {participantAnalysis.players.map((player, index) => (
                <PlayerIdentity
                  className="group-participant-chip"
                  key={groupParticipantKey(player, index)}
                  player={player}
                />
              ))}
            </div>
          ) : null}

          <nav className="stat-group-nav" aria-label="Group stat sections">
            {completedStatGroups.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.id}
                  className={`stat-group-link ${section.id === activeGroup.id ? "active" : ""}`}
                  to={`/replay-groups/${groupId}/stats/${section.id}`}
                >
                  <Icon size={16} />
                  <span>{section.label}</span>
                </Link>
              );
            })}
          </nav>

          <section className="stat-detail">
            {!ActiveDetail || !canRenderGroupDetail ? (
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
            {statsError ? <ApiNotice label="Group stats" message={statsError} /> : null}
            {statsLoading || eventsLoading ? <StatusLine loading error={null} /> : null}

            {!participantAnalysis.consistent && !(ActiveDetail && canRenderGroupDetail) ? (
              <GroupParticipantLeaderboard
                events={activeEvents}
                players={participantAnalysis.players}
                title={`${activeGroup.label} leaderboard`}
              />
            ) : null}

            {ActiveDetail && canRenderGroupDetail ? (
              <ActiveDetail
                events={detailEvents}
                players={participantAnalysis.players}
                durationSeconds={groupDurationSeconds}
                scope="group"
              />
            ) : (
              <div className="stat-section-grid">
                <StatRows title="Top stats" stats={activeStats} />
                <EventRows title="Indexed events" events={activeEvents} />
              </div>
            )}
          </section>

          <section className="stat-panel">
            <h2>Games in group</h2>
            <div className="table-frame compact-table">
              <table>
                <thead>
                  <tr>
                    <th>Replay</th>
                    <th>Score</th>
                    <th>Playlist</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {replays.map((replay) => (
                    <tr key={replay.id}>
                      <td>
                        <Link className="primary-link" to={`/replays/${replay.id}`}>
                          {replay.original_file_name || replay.id}
                        </Link>
                      </td>
                      <td>{formatScore(replay)}</td>
                      <td>{playlistLabel(replay.playlist_metadata, replay.playlist)}</td>
                      <td>{formatDate(replay.replay_date || replay.created_at)}</td>
                    </tr>
                  ))}
                  {replays.length === 0 ? (
                    <tr>
                      <td colSpan={4}>No replays are in this group yet.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
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
              <tr key={playerIdentityKey(player, index)}>
                <td>
                  <PlayerIdentity player={player} />
                </td>
                <td>{replayLocalTeamLabel(player.team)}</td>
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

interface ReplayGroupParticipantAnalysis {
  consistent: boolean;
  players: ReplayPlayer[];
  colorSwitching: boolean;
  reason: string | null;
}

interface MutableReplayGroupParticipant {
  identity: string;
  name: string | null;
  platform: string | null;
  platform_player_id: string | null;
  teams: Set<number>;
  appearance_count: number;
  rank_tier: number | null;
  rank_division: number | null;
  rank_mmr: number | null;
  rank_is_fallback: boolean;
  rank_fallback_replay_date: string | null;
  is_pro: boolean;
  score: number | null;
  goals: number | null;
  assists: number | null;
  saves: number | null;
  shots: number | null;
  active_time_seconds: number | null;
  time_demolished_seconds: number | null;
  non_demo_active_time_seconds: number | null;
  time_most_back_seconds: number | null;
  time_most_forward_seconds: number | null;
}

function GroupParticipantNotice({ analysis }: { analysis: ReplayGroupParticipantAnalysis }) {
  if (!analysis.reason && !analysis.colorSwitching) return null;

  return (
    <div className={`api-notice ${analysis.consistent ? "" : "warning"}`.trim()}>
      <strong>{analysis.consistent ? "Same participants" : "Mixed participants"}</strong>
      <span>
        {analysis.reason ??
          "The same players appear across this group, but at least one player changes between blue and orange. Player panels use neutral team labels; blue/orange team totals still mean the replay-local colors."}
      </span>
    </div>
  );
}

function analyzeReplayGroupParticipants(replays: ReplayResponse[]): ReplayGroupParticipantAnalysis {
  const players = collectReplayGroupParticipants(replays);
  const colorSwitching = players.some((player) => player.color_switching);

  if (replays.length === 0) {
    return {
      consistent: false,
      players,
      colorSwitching: false,
      reason: "Add replays to this group before using group-level player views.",
    };
  }

  const replayIdentities = replays.map(replayParticipantIdentities);
  const invalidIndex = replayIdentities.findIndex((identities) => identities == null);
  if (invalidIndex >= 0) {
    return {
      consistent: false,
      players,
      colorSwitching,
      reason: "At least one replay has duplicate or unidentified participants, so player-level group views are hidden.",
    };
  }

  const reference = replayIdentities[0]!;
  const referenceKey = participantSetKey(reference);
  const mismatched = replayIdentities.some((identities) => participantSetKey(identities!) !== referenceKey);
  if (mismatched) {
    return {
      consistent: false,
      players,
      colorSwitching,
      reason: "These replays do not all contain the same participant identities, so group views fall back to event and aggregate tables.",
    };
  }

  return {
    consistent: true,
    players,
    colorSwitching,
    reason: colorSwitching ? null : null,
  };
}

function collectReplayGroupParticipants(replays: ReplayResponse[]): ReplayPlayer[] {
  const participants = new Map<string, MutableReplayGroupParticipant>();
  for (const replay of replays) {
    for (const player of replay.players) {
      const identity = replayPlayerIdentity(player);
      if (!identity) continue;
      const participant = participants.get(identity) ?? newMutableReplayGroupParticipant(identity, player);
      mergeReplayGroupParticipant(participant, player);
      participants.set(identity, participant);
    }
  }

  return [...participants.values()].map(finalizeReplayGroupParticipant).sort(compareReplayGroupPlayers);
}

function replayParticipantIdentities(replay: ReplayResponse): Set<string> | null {
  const identities = new Set<string>();
  for (const player of replay.players) {
    const identity = replayPlayerIdentity(player);
    if (!identity || identities.has(identity)) return null;
    identities.add(identity);
  }
  return identities;
}

function participantSetKey(identities: Set<string>): string {
  return [...identities].sort().join("|");
}

function replayPlayerIdentity(player: ReplayPlayer): string | null {
  if (player.platform && player.platform_player_id) {
    return `${normalizeReplayPlatform(player.platform)}:${player.platform_player_id}`;
  }
  const name = player.name?.trim();
  return name ? `name:${name.toLowerCase()}` : null;
}

function groupParticipantKey(player: ReplayPlayer, index: number): string {
  return replayPlayerIdentity(player) ?? `participant:${index}`;
}

function newMutableReplayGroupParticipant(identity: string, player: ReplayPlayer): MutableReplayGroupParticipant {
  return {
    identity,
    name: player.name,
    platform: player.platform,
    platform_player_id: player.platform_player_id,
    teams: new Set(),
    appearance_count: 0,
    rank_tier: null,
    rank_division: null,
    rank_mmr: null,
    rank_is_fallback: false,
    rank_fallback_replay_date: null,
    is_pro: false,
    score: null,
    goals: null,
    assists: null,
    saves: null,
    shots: null,
    active_time_seconds: null,
    time_demolished_seconds: null,
    non_demo_active_time_seconds: null,
    time_most_back_seconds: null,
    time_most_forward_seconds: null,
  };
}

function mergeReplayGroupParticipant(participant: MutableReplayGroupParticipant, player: ReplayPlayer) {
  participant.name = player.name ?? participant.name;
  participant.platform = player.platform ?? participant.platform;
  participant.platform_player_id = player.platform_player_id ?? participant.platform_player_id;
  if (player.team === 0 || player.team === 1) participant.teams.add(player.team);
  participant.appearance_count += 1;
  participant.rank_tier = player.rank_tier ?? participant.rank_tier;
  participant.rank_division = player.rank_division ?? participant.rank_division;
  participant.rank_mmr = player.rank_mmr ?? participant.rank_mmr;
  participant.rank_is_fallback = participant.rank_is_fallback || Boolean(player.rank_is_fallback);
  participant.rank_fallback_replay_date = player.rank_fallback_replay_date ?? participant.rank_fallback_replay_date;
  participant.is_pro = participant.is_pro || player.is_pro;
  participant.score = sumNullable(participant.score, player.score);
  participant.goals = sumNullable(participant.goals, player.goals);
  participant.assists = sumNullable(participant.assists, player.assists);
  participant.saves = sumNullable(participant.saves, player.saves);
  participant.shots = sumNullable(participant.shots, player.shots);
  participant.active_time_seconds = sumNullable(participant.active_time_seconds, player.active_time_seconds);
  participant.time_demolished_seconds = sumNullable(participant.time_demolished_seconds, player.time_demolished_seconds);
  participant.non_demo_active_time_seconds = sumNullable(participant.non_demo_active_time_seconds, player.non_demo_active_time_seconds);
  participant.time_most_back_seconds = sumNullable(participant.time_most_back_seconds, player.time_most_back_seconds);
  participant.time_most_forward_seconds = sumNullable(participant.time_most_forward_seconds, player.time_most_forward_seconds);
}

function finalizeReplayGroupParticipant(participant: MutableReplayGroupParticipant): ReplayPlayer {
  return {
    name: participant.name,
    platform: participant.platform,
    platform_player_id: participant.platform_player_id,
    team: participant.teams.size === 1 ? [...participant.teams][0] : null,
    appearance_count: participant.appearance_count,
    color_switching: participant.teams.size > 1,
    rank_tier: participant.rank_tier,
    rank_division: participant.rank_division,
    rank_mmr: participant.rank_mmr,
    rank_is_fallback: participant.rank_is_fallback,
    rank_fallback_replay_date: participant.rank_fallback_replay_date,
    is_pro: participant.is_pro,
    score: participant.score,
    goals: participant.goals,
    assists: participant.assists,
    saves: participant.saves,
    shots: participant.shots,
    active_time_seconds: participant.active_time_seconds,
    time_demolished_seconds: participant.time_demolished_seconds,
    non_demo_active_time_seconds: participant.non_demo_active_time_seconds,
    time_most_back_seconds: participant.time_most_back_seconds,
    time_most_forward_seconds: participant.time_most_forward_seconds,
  };
}

function compareReplayGroupPlayers(left: ReplayPlayer, right: ReplayPlayer): number {
  if ((right.appearance_count ?? 0) !== (left.appearance_count ?? 0)) {
    return (right.appearance_count ?? 0) - (left.appearance_count ?? 0);
  }
  if ((left.team ?? 9) !== (right.team ?? 9)) return (left.team ?? 9) - (right.team ?? 9);
  return (left.name || left.platform_player_id || "").localeCompare(right.name || right.platform_player_id || "");
}

function GroupParticipantLeaderboard({
  events,
  players,
  title,
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  title: string;
}) {
  const eventCounts = participantEventCounts(players, events);
  const rows = players
    .map((player, index) => ({
      player,
      key: groupParticipantKey(player, index),
      events: eventCounts.get(groupParticipantKey(player, index)) ?? 0,
    }))
    .sort((left, right) => {
      if (right.events !== left.events) return right.events - left.events;
      if ((right.player.score ?? 0) !== (left.player.score ?? 0)) return (right.player.score ?? 0) - (left.player.score ?? 0);
      return (right.player.appearance_count ?? 0) - (left.player.appearance_count ?? 0);
    });

  return (
    <section className="stat-panel full-span group-leaderboard-panel">
      <div className="stat-panel-heading">
        <h3>{title}</h3>
        <span>{players.length.toLocaleString()} participants</span>
      </div>
      {rows.length > 0 ? (
        <div className="table-frame compact-table">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Games</th>
                <th>Score</th>
                <th>G/A/S/Sh</th>
                <th>Active</th>
                <th>Events</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ player, key, events: eventCount }) => (
                <tr key={key}>
                  <td>
                    <PlayerIdentity
                      detail={`${(player.appearance_count ?? 0).toLocaleString()} games`}
                      player={player}
                    />
                  </td>
                  <td>{(player.appearance_count ?? 0).toLocaleString()}</td>
                  <td>{formatNullableInteger(player.score)}</td>
                  <td>{scoreboardLine(player)}</td>
                  <td>{formatSeconds(player.active_time_seconds)}</td>
                  <td>{eventCount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="stat-empty">No identifiable participants are available for this group yet.</div>
      )}
    </section>
  );
}

function participantEventCounts(players: ReplayPlayer[], events: MechanicEventResponse[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const event of events) {
    const index = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (index < 0) continue;
    const key = groupParticipantKey(players[index], index);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function eventMatchesPlayer(player: ReplayPlayer, event: MechanicEventResponse): boolean {
  const eventPlayerId = (event.player_id ?? stringPayloadValue(event.payload, "player_id"))?.trim();
  if (eventPlayerId && (player.platform_player_id === eventPlayerId || replayPlayerIdentity(player) === eventPlayerId)) {
    return true;
  }
  const eventName = event.player_name?.trim().toLowerCase();
  return Boolean(eventName && player.name?.trim().toLowerCase() === eventName);
}

function stringPayloadValue(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function scoreboardLine(player: ReplayPlayer): string {
  return [player.goals, player.assists, player.saves, player.shots].map(formatNullableInteger).join(" / ");
}

function formatNullableInteger(value: number | null | undefined): string {
  return value == null ? "0" : Math.round(value).toLocaleString();
}

function normalizeReplayPlatform(value: string): string {
  const lower = value.toLowerCase();
  if (lower === "psynet") return "epic";
  if (lower === "playstation") return "ps4";
  return lower;
}

function sumNullable(left: number | null | undefined, right: number | null | undefined): number | null {
  if (left == null && right == null) return null;
  return (left ?? 0) + (right ?? 0);
}

function sumReplayDurations(replays: ReplayResponse[]): number | null {
  const durations = replays.map((replay) => replay.summary.duration_seconds).filter(isNumber);
  if (durations.length === 0) return null;
  return durations.reduce((total, duration) => total + duration, 0);
}

function replayDateRange(replays: ReplayResponse[]): string {
  const dates = replays
    .map((replay) => replay.replay_date || replay.created_at)
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((left, right) => left.getTime() - right.getTime());
  if (dates.length === 0) return "Unknown";
  const first = formatShortDate(dates[0].toISOString());
  const last = formatShortDate(dates[dates.length - 1].toISOString());
  return first === last ? first : `${first} - ${last}`;
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

type PlayerStatsByGroupState = {
  scope: string;
  groups: Partial<Record<string, StatAggregateSetResponse>>;
};

const playerSupplementalKeys = ["overview", "kickoffTaker", "kickoffSupport", "kickoffFilter", "possession"] as const;
type PlayerSupplementalKey = (typeof playerSupplementalKeys)[number];

type PlayerSupplementalLoadedState = {
  scope: string;
  loaded: Partial<Record<PlayerSupplementalKey, boolean>>;
};

function PlayerStatsPage() {
  const { platform = "", platformPlayerId = "", statGroup } = useParams();
  const location = useLocation();
  const statsScope = useMemo(
    () => `${platform}\n${platformPlayerId}\n${location.search}`,
    [location.search, platform, platformPlayerId],
  );
  const playerReplayParams = useMemo(
    () => playerReplaySetParams(platform, platformPlayerId, location.search),
    [location.search, platform, platformPlayerId],
  );
  const activeGroup = useMemo(
    () => statGroupById(statGroup, playerStatsSectionGroups) ?? playerStatsSectionGroups[0]!,
    [statGroup],
  );
  const [playerSummary, setPlayerSummary] = useState<PlayerProfileResponse | null>(null);
  const [statsByGroup, setStatsByGroup] = useState<PlayerStatsByGroupState>({ scope: "", groups: {} });
  const [overview, setOverview] = useState<PlayerStatOverviewResponse | null>(null);
  const [kickoffTakerSummary, setKickoffTakerSummary] = useState<EventStatSummaryResponse | null>(null);
  const [kickoffSupportSummary, setKickoffSupportSummary] = useState<EventStatSummaryResponse | null>(null);
  const [kickoffFilterSummary, setKickoffFilterSummary] = useState<EventStatSummaryResponse | null>(null);
  const [possessionSummary, setPossessionSummary] = useState<PossessionSummaryResponse | null>(null);
  const [supplementalLoaded, setSupplementalLoaded] = useState<PlayerSupplementalLoadedState>({
    scope: "",
    loaded: {},
  });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const scopedStatsByGroup = statsByGroup.scope === statsScope ? statsByGroup.groups : {};
  const stats = scopedStatsByGroup[activeGroup.id] ?? null;
  const scopedSupplementalLoaded = supplementalLoaded.scope === statsScope ? supplementalLoaded.loaded : {};
  const loadedSupplementalKeys = Object.keys(scopedSupplementalLoaded).sort().join("|");
  const activeSupplementalKeys = useMemo(
    () => playerSupplementalKeysForGroup(activeGroup.id),
    [activeGroup.id],
  );
  const activeSupplementalKeyList = activeSupplementalKeys.join("|");
  const activeSupplementalReady = activeSupplementalKeys.every((key) => scopedSupplementalLoaded[key]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
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
    return () => {
      cancelled = true;
    };
  }, [location.search, platform, platformPlayerId]);

  useEffect(() => {
    setStatsByGroup({ scope: statsScope, groups: {} });
    setSupplementalLoaded({ scope: statsScope, loaded: {} });
    setStatsError(null);
    setStatsLoading(true);
    setOverview(null);
    setKickoffTakerSummary(null);
    setKickoffSupportSummary(null);
    setKickoffFilterSummary(null);
    setPossessionSummary(null);
  }, [statsScope]);

  useEffect(() => {
    let cancelled = false;
    if (stats) {
      setStatsLoading(false);
      setStatsError(null);
      return () => {
        cancelled = true;
      };
    }

    setStatsLoading(true);
    setStatsError(null);
    getPlayerStatAggregates(
      platform,
      platformPlayerId,
      playerAggregateSearchParams(activeGroup.id, location.search),
      activeGroup.terms,
    )
      .then((response) => {
        if (cancelled) return;
        setStatsByGroup((current) => {
          const groups = current.scope === statsScope ? current.groups : {};
          return { scope: statsScope, groups: { ...groups, [activeGroup.id]: response } };
        });
      })
      .catch((err: Error) => {
        if (!cancelled) setStatsError(err.message);
      })
      .finally(() => {
        if (!cancelled) setStatsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeGroup, location.search, platform, platformPlayerId, stats, statsScope]);

  useEffect(() => {
    if (!stats || !activeSupplementalReady) return;
    const remainingGroups = playerStatsSectionGroups.filter(
      (group) => group.id !== activeGroup.id && scopedStatsByGroup[group.id] == null,
    );
    if (remainingGroups.length === 0) return;

    let cancelled = false;
    const timeout = window.setTimeout(() => {
      void (async () => {
        for (const group of remainingGroups) {
          if (cancelled) break;
          try {
            const response = await getPlayerStatAggregates(
              platform,
              platformPlayerId,
              playerAggregateSearchParams(group.id, location.search),
              group.terms,
            );
            if (cancelled) break;
            setStatsByGroup((current) => {
              const groups = current.scope === statsScope ? current.groups : {};
              if (groups[group.id]) return current;
              return { scope: statsScope, groups: { ...groups, [group.id]: response } };
            });
          } catch {
            // Background tab hydration should not interrupt the visible section.
          }
        }
      })();
    }, 100);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [
    activeGroup.id,
    activeSupplementalReady,
    location.search,
    platform,
    platformPlayerId,
    stats,
    statsScope,
  ]);

  function applySupplementalResponse(
    key: PlayerSupplementalKey,
    response: PlayerStatOverviewResponse | EventStatSummaryResponse | PossessionSummaryResponse,
  ) {
    if (key === "overview") {
      setOverview(response as PlayerStatOverviewResponse);
    } else if (key === "kickoffTaker") {
      setKickoffTakerSummary(response as EventStatSummaryResponse);
    } else if (key === "kickoffSupport") {
      setKickoffSupportSummary(response as EventStatSummaryResponse);
    } else if (key === "kickoffFilter") {
      setKickoffFilterSummary(response as EventStatSummaryResponse);
    } else {
      setPossessionSummary(response as PossessionSummaryResponse);
    }
  }

  function markSupplementalLoaded(key: PlayerSupplementalKey) {
    setSupplementalLoaded((current) => {
      const loaded = current.scope === statsScope ? current.loaded : {};
      return { scope: statsScope, loaded: { ...loaded, [key]: true } };
    });
  }

  useEffect(() => {
    const missingKeys = activeSupplementalKeys.filter((key) => !scopedSupplementalLoaded[key]);
    if (missingKeys.length === 0) return;

    let cancelled = false;
    for (const key of missingKeys) {
      fetchPlayerSupplemental(key, platform, platformPlayerId, location.search)
        .then((response) => {
          if (!cancelled) applySupplementalResponse(key, response);
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled) markSupplementalLoaded(key);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [
    activeSupplementalKeyList,
    loadedSupplementalKeys,
    location.search,
    platform,
    platformPlayerId,
    scopedSupplementalLoaded,
  ]);

  useEffect(() => {
    if (!stats || !activeSupplementalReady) return;
    const remainingKeys = playerSupplementalKeys.filter((key) => !scopedSupplementalLoaded[key]);
    if (remainingKeys.length === 0) return;

    let cancelled = false;
    const timeout = window.setTimeout(() => {
      void (async () => {
        for (const key of remainingKeys) {
          if (cancelled) break;
          try {
            const response = await fetchPlayerSupplemental(key, platform, platformPlayerId, location.search);
            if (cancelled) break;
            applySupplementalResponse(key, response);
          } catch {
            // Background supplemental panels are optional.
          } finally {
            if (!cancelled) markSupplementalLoaded(key);
          }
        }
      })();
    }, 100);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [
    activeSupplementalReady,
    location.search,
    platform,
    platformPlayerId,
    stats,
  ]);

  return (
    <section className="page player-stats-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Player stats</p>
          <h1 className="player-profile-title">
            {playerSummary ? <PlatformIcon platform={playerSummary.platform} /> : null}
            <span>{playerSummary?.display_name || platformPlayerId}</span>
          </h1>
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
            <div className="metric">
              <span>Replays</span>
              <strong className="metric-with-action">
                {playerSummary.replay_count.toLocaleString()}
                <Link className="metric-action-chip" to={`/replays?${playerReplayParams.toString()}`} title="View player replays">
                  <FileVideo size={14} />
                </Link>
              </strong>
            </div>
            <Metric label="Active" value={formatDuration(stats?.active_time_seconds ?? null)} />
            <Metric label="First seen" value={formatShortDate(playerSummary.first_seen_at)} />
            <Metric label="Last seen" value={formatShortDate(playerSummary.last_seen_at)} />
            <PlayerIdMetric value={playerSummary.platform_player_id} />
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
              kickoffFilterSummary={kickoffFilterSummary}
              kickoffSupportSummary={kickoffSupportSummary}
              kickoffTakerSummary={kickoffTakerSummary}
              possessionSummary={possessionSummary}
              overview={overview}
              platform={platform}
              platformPlayerId={platformPlayerId}
              search={location.search}
              stats={stats}
            />
          ) : null}
        </>
      ) : null}
    </section>
  );
}

function playerReplaySetParams(platform: string, platformPlayerId: string, search: string): URLSearchParams {
  const params = stripKickoffSpawnParams(new URLSearchParams(search));
  params.delete("offset");
  params.set("player-id", `${platform}:${platformPlayerId}`);
  return params;
}

function playerStatGroupPath(platform: string, platformPlayerId: string, groupId: string, search: string): string {
  const params = new URLSearchParams(search);
  if (groupId !== "kickoffs") {
    stripKickoffSpawnParams(params);
  }
  const query = params.toString();
  const path = `/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}/stats/${groupId}`;
  return query ? `${path}?${query}` : path;
}

function stripKickoffSpawnParams(params: URLSearchParams): URLSearchParams {
  params.delete("kickoff-shape");
  params.delete("kickoff_shape");
  params.delete("kickoff-side");
  params.delete("kickoff_side");
  return params;
}

function playerAggregateSearchParams(groupId: string, search: string): URLSearchParams {
  const params = new URLSearchParams(search);
  return groupId === "kickoffs" ? params : stripKickoffSpawnParams(params);
}

function kickoffShapeFilterFromSearch(search: string): KickoffShapeFilter {
  const value = new URLSearchParams(search).get("kickoff-shape");
  return value === "diagonal" || value === "center_offset" || value === "center" ? value : "all";
}

function kickoffSideFilterFromSearch(search: string): KickoffSideFilter {
  const value = new URLSearchParams(search).get("kickoff-side");
  return value === "left" || value === "right" ? value : "all";
}

function playerSupplementalKeysForGroup(groupId: string): PlayerSupplementalKey[] {
  if (groupId === "goals" || groupId === "positioning" || groupId === "rotation") {
    return ["overview"];
  }
  if (groupId === "kickoffs") {
    return ["kickoffTaker", "kickoffSupport", "kickoffFilter"];
  }
  if (groupId === "possession-territory") {
    return ["possession"];
  }
  return [];
}

function fetchPlayerSupplemental(
  key: PlayerSupplementalKey,
  platform: string,
  platformPlayerId: string,
  search: string,
): Promise<PlayerStatOverviewResponse | EventStatSummaryResponse | PossessionSummaryResponse> {
  const params = new URLSearchParams(search);
  if (key === "overview") {
    return getPlayerStatOverview(platform, platformPlayerId, params);
  }
  if (key === "kickoffTaker") {
    return getPlayerKickoffSummary(platform, platformPlayerId, params, "taker");
  }
  if (key === "kickoffSupport") {
    return getPlayerKickoffSummary(platform, platformPlayerId, params, "support");
  }
  if (key === "kickoffFilter") {
    return getPlayerKickoffSummary(platform, platformPlayerId, stripKickoffSpawnParams(params), "taker");
  }
  return getPlayerPossessionSummary(platform, platformPlayerId, params);
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
  kickoffFilterSummary,
  kickoffSupportSummary,
  kickoffTakerSummary,
  overview,
  possessionSummary,
  platform,
  platformPlayerId,
  search,
  stats,
}: {
  activeGroup: StatGroup;
  kickoffFilterSummary: EventStatSummaryResponse | null;
  kickoffSupportSummary: EventStatSummaryResponse | null;
  kickoffTakerSummary: EventStatSummaryResponse | null;
  overview: PlayerStatOverviewResponse | null;
  possessionSummary: PossessionSummaryResponse | null;
  platform: string;
  platformPlayerId: string;
  search: string;
  stats: StatAggregateSetResponse;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionStats = filterStatsForGroup(stats.stats, activeGroup.terms).slice().sort(comparePlayerStatRates);
  const topStats = sectionStats.slice(0, 20);
  const sectionEventCount = sectionStats.reduce((total, stat) => total + stat.event_count, 0);
  const Icon = activeGroup.icon;
  const kickoffShapeFilter = kickoffShapeFilterFromSearch(search);
  const kickoffSideFilter = kickoffSideFilterFromSearch(search);
  const kickoffSpawnDimension = kickoffFilterSummary?.dimensions.find(
    (dimension) => dimension.key === "spawn_position" && dimension.values.length > 0,
  );

  const setKickoffFilter = (key: "kickoff-shape" | "kickoff-side", value: string) => {
    const params = new URLSearchParams(location.search);
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    navigate(query ? `${location.pathname}?${query}` : location.pathname);
  };

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
        {activeGroup.id === "kickoffs" ? (
          <div className="stat-detail-counts">
            <Metric label="Taker attempts" value={kickoffTakerSummary?.event_count.toLocaleString() ?? "Unknown"} />
            <Metric label="Support appearances" value={kickoffSupportSummary?.event_count.toLocaleString() ?? "Unknown"} />
          </div>
        ) : (
          <div className="stat-detail-counts">
            <Metric label="Stats" value={sectionStats.length.toLocaleString()} />
            <Metric label="Events" value={sectionEventCount.toLocaleString()} />
          </div>
        )}
      </header>

      {activeGroup.id === "kickoffs" && kickoffSpawnDimension ? (
        <KickoffSpawnBreakdown
          dimension={kickoffSpawnDimension}
          shapeFilter={kickoffShapeFilter}
          sideFilter={kickoffSideFilter}
          onShapeFilterChange={(value) => setKickoffFilter("kickoff-shape", value)}
          onSideFilterChange={(value) => setKickoffFilter("kickoff-side", value)}
        />
      ) : null}

      {activeGroup.id === "kickoffs" || activeGroup.id === "positioning" || activeGroup.id === "rotation" ? null : (
        <PlayerRateComparisonChart stats={topStats} />
      )}

      {activeGroup.id === "goals" && overview ? (
        <GoalTagSharePanel
          overview={overview}
          goalTypeHref={(kind) =>
            `/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}/goals/${encodeURIComponent(kind)}`
          }
          allGoalsHref={`/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}/goals`}
        />
      ) : null}
      {activeGroup.id === "kickoffs" && kickoffTakerSummary ? <KickoffSummaryPanel role="taker" summary={kickoffTakerSummary} /> : null}
      {activeGroup.id === "kickoffs" && kickoffSupportSummary ? <KickoffSummaryPanel role="support" summary={kickoffSupportSummary} /> : null}
      {activeGroup.id === "possession" && possessionSummary ? (
        <PossessionSummaryPanel summary={possessionSummary} />
      ) : null}
      {(activeGroup.id === "positioning" || activeGroup.id === "rotation") && overview ? (
        <RotationTimeSharePanel overview={overview} stats={stats} />
      ) : null}
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
            <span className="status-badge status-processed">canonical runs</span>
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
  const currentUser = useCurrentUser();

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
              <dt>Role</dt>
              <dd>{currentUser ? (currentUser.is_admin ? "Admin" : "User") : "-"}</dd>
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
  const [refreshKey, setRefreshKey] = useState(0);
  const [requeueResults, setRequeueResults] = useState<Record<string, RequeueResult>>({});

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
  }, [searchParams, refreshKey]);

  function setRequeueResult(replayId: string, result: RequeueResult) {
    setRequeueResults((prev) => ({ ...prev, [replayId]: result }));
  }

  async function requeueReplay(replayId: string, force = false) {
    setRequeueResult(replayId, { phase: "pending", message: force ? "Force-requeuing…" : "Requeuing…" });
    try {
      const result = await reprocessReplay(replayId, { force });
      setRequeueResult(replayId, {
        phase: result.enqueued ? "done" : "skipped",
        message: result.enqueued
          ? result.forced
            ? "Force-requeued — a new job is in the processing queue"
            : "Requeued — a new job is in the processing queue"
          : "Already up to date — no new job needed",
      });
      setRefreshKey((key) => key + 1);
    } catch (err) {
      setRequeueResult(replayId, {
        phase: "error",
        message: `Requeue failed: ${(err as Error).message}`,
      });
    }
  }

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
          <Metric
            label="Workers"
            value={
              response.summary.workers.length === 0
                ? "none registered"
                : `${response.summary.workers.filter((worker) => worker.alive).length} alive of ${response.summary.workers.length} recent`
            }
          />
        </div>
      ) : null}

      {response && response.summary.workers.length > 0 ? (
        <div className="table-frame admin-workers-table">
          <table>
            <thead>
              <tr>
                <th>Worker</th>
                <th>Status</th>
                <th>Last seen</th>
                <th>Active jobs</th>
              </tr>
            </thead>
            <tbody>
              {response.summary.workers.map((worker) => (
                <tr key={worker.id}>
                  <td>
                    <code>{worker.id}</code>
                  </td>
                  <td>
                    <span className={worker.alive ? "status-badge status-processed" : "status-badge status-failed"}>
                      {worker.alive ? "alive" : "dead"}
                    </span>
                  </td>
                  <td>{formatDate(worker.last_seen)}</td>
                  <td>{worker.active_jobs.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {response && response.summary.workers.filter((worker) => worker.alive).length === 0 ? (
        <p className="inline-status error">
          No live replay-processing workers — queued jobs will not be consumed until a worker reconnects.
        </p>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {diagnostics.map((diagnostic) => {
              const requeueResult = requeueResults[diagnostic.replay_id];
              const requeuePending = requeueResult?.phase === "pending";
              return (
              <tr
                key={diagnostic.replay_id}
                className={requeueResult ? `admin-requeue-row admin-requeue-${requeueResult.phase}` : undefined}
              >
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
                <td className="admin-actions-cell">
                  <button
                    type="button"
                    className="secondary-button"
                    disabled={requeuePending}
                    onClick={() => void requeueReplay(diagnostic.replay_id)}
                  >
                    <RotateCcw size={14} className={requeuePending ? "spin" : undefined} />
                    {requeuePending ? "Requeuing" : requeueResult ? "Requeue again" : "Requeue"}
                  </button>
                  {requeueResult ? <RequeueResultChip result={requeueResult} /> : null}
                  {requeueResult?.phase === "skipped" ? (
                    <button
                      type="button"
                      className="requeue-force-button"
                      disabled={requeuePending}
                      onClick={() => void requeueReplay(diagnostic.replay_id, true)}
                    >
                      Force requeue
                    </button>
                  ) : null}
                </td>
              </tr>
              );
            })}
            {!loading && diagnostics.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-cell">
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
    case "processed":
      return "Processed";
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

function PlayerIdMetric({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copyPlayerId() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="metric player-id-metric">
      <span>Player id</span>
      <strong className="player-id-value">
        <span className="player-id-text" title={value}>
          {value}
        </span>
        <button className="player-id-copy" type="button" title={copied ? "Copied" : "Copy player id"} onClick={copyPlayerId}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </strong>
    </div>
  );
}

function filterStatsForGroup(stats: StatAggregateResponse[], terms: readonly string[]): StatAggregateResponse[] {
  return stats.filter(
    (stat) =>
      stat.category !== "context" &&
      !contextEventTypeKeys.has(stat.key) &&
      terms.some((term) => statSearchText(stat).includes(term)),
  );
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

function playlistLabel(metadata: ReplayPlaylistMetadata | null | undefined, fallback: string | null): string {
  if (metadata?.label) return metadata.label;
  if (!fallback) return "Unknown";
  return fallback
    .replace(/^online-/, "Online ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
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

function isNumber(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function teamClass(team: number | null): string {
  return replayLocalTeamClass(team);
}

function teamLabel(team: number | null): string {
  return replayLocalTeamLabel(team);
}
