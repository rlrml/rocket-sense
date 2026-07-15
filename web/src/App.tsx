import {
  Activity,
  AlertTriangle,
  BarChart3,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Copy,
  Cpu,
  ExternalLink,
  FileVideo,
  FolderMinus,
  FolderOpen,
  FolderPlus,
  Github,
  History,
  Info,
  ListOrdered,
  ListPlus,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  ServerCog,
  SlidersHorizontal,
  TrendingUp,
  Trophy,
  Users,
  UserPlus,
  X,
  Trash2,
  Search,
  Upload,
  Zap,
} from "lucide-react";
import {
  FormEvent,
  Fragment,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { lazyWithChunkLoadRecovery } from "./chunkLoadRecovery";
import {
  addReplayGroupManager,
  addMatchingReplaysToGroup,
  addReplaysToGroup,
  authChangeEvent,
  clearAccessToken,
  createBallchasingMirror,
  createDevToken,
  createReplayGroup,
  createAccountToken,
  deletePlayerIdentityTag,
  deleteReplay,
  deleteReplayGroup,
  getAccessToken,
  getAuthOptions,
  getCurrentUser,
  getPlayerKickoffSummary,
  getPlayerMovementSummary,
  getPlayerPositioningSummary,
  getPlayerPossessionSummary,
  getPlayerProfile,
  getPlayerProfileByRef,
  getPlayerStatAggregates,
  getPlayerStatOverview,
  getPlayerTimeline,
  getProcessingVersion,
  getPlayerBoostTotals,
  getRankBenchmarkCohorts,
  getReplay,
  getReplayGroup,
  getReplayGroupPlayerAggregates,
  getReplayStatAggregates,
  listEventTypes,
  listReplayGroups,
  listReplayGroupManagers,
  listReplayGroupReplays,
  listReplayGroupEvents,
  listReplayEvents,
  listReplayFilterOptions,
  listLinkedIdentities,
  listPlayerReports,
  listRecentlyProcessedReplays,
  listReplayProcessingDiagnostics,
  reportPlayerIdentity,
  listReplayProcessingQueue,
  reprocessFailedQueueJobs,
  reprocessReplaysBatch,
  listReplays,
  logout,
  removeReplayGroupManager,
  removeMatchingReplaysFromGroup,
  removeReplaysFromGroup,
  reprocessReplay,
  reprocessReplayClient,
  reviewPlayerReport,
  setAccessToken,
  setPlayerIdentityTag,
  syncBallchasingGroup,
  updateReplayGroup,
  updateUserSettings,
  uploadReplay,
  setReplayVisibility,
  listReplayShares,
  addReplayShare,
  removeReplayShare,
  listReplayGroupShares,
  addReplayGroupShare,
  removeReplayGroupShare,
  setPlayerStatsVisibility,
  listPlayerStatsShares,
  addPlayerStatsShare,
  removePlayerStatsShare,
} from "./api";
import type { ReplayGroupListScope } from "./api";
import { DefaultVisibilitySettings, PrivacyPanel } from "./PrivacyControls";
import rocketSenseLogoUrl from "./assets/brand/logo.svg";
import { commitShaForUrl, shortCommitSha } from "./gitSha";
import { mapDisplayName } from "./maps";
import { subtrActorPlayerUrl } from "./playerLink";
import { LocalReprocessProgressBar } from "./reprocessProgress";
import { RankTrendsPage } from "./rankTrends";
import {
  buildSeasonOptions,
  formatSeasonCode,
  formatSeasonLabel,
  FREE_TO_PLAY_SEASON_COUNT,
} from "./seasons";
import {
  getPreviewPlayerWarmupStatus,
  schedulePreviewPlayerWarmup,
  subscribePreviewPlayerWarmupStatus,
  type PreviewPlayerWarmupStatus,
  warmPreviewPlayerForReplay,
} from "./stats/playerWarmup";
import { BoostProfileDetail } from "./stats/boost";
import { PlayerTimelineSection } from "./stats/playerTimeline";
import {
  applyPeriodToParams,
  formatPeriodLabel,
  GAME_COUNT_BY_KIND,
  lastGamesPeriodBounds,
  latestPeriodAnchor,
  parsePeriodParam,
  PERIOD_PARAM,
  periodBounds,
  sessionPeriodBounds,
  shiftPeriodAnchor,
  type PeriodKind,
  type PeriodSelection,
} from "./stats/periods";
import { AerialsProfileDetail } from "./stats/aerials";
import { GroundPlayProfileDetail } from "./stats/groundPlay";
import { OutcomesProfileDetail } from "./stats/outcomes";
import { completedStatGroups, eventTypesForGroup, statGroupById } from "./stats/registry";
import type { StatGroup } from "./stats/registry";
import { StalenessChip } from "./staleness";
import { FavoritesSidebar, LogoFavoritesMenu, PlayerFavoriteButton } from "./favorites";
import { ballchasingPlayerUrl, PlatformIcon, rlTrackerPlayerUrl } from "./platform";
import { ProviderLoginIcon, providerLabel } from "./providerIcons";
import { Chip } from "./chip";
import type { ChipTone } from "./chip";
import {
  PlayerIdentity,
  playerIdentityKey,
  playerProfileIdPath,
  playerStatProfileIdPath,
  replayLocalTeamLabel,
} from "./playerIdentity";
import { RankBadge, rankGroupIconUrl, rankIconUrl } from "./rank";
import {
  KickoffSpawnBreakdown,
  type KickoffShapeFilter,
  type KickoffSideFilter,
} from "./stats/KickoffSpawnBreakdown";
import {
  GoalTagSharePanel,
  KickoffSummaryPanel,
  PossessionSummaryPanel,
  type CoreProfileView,
  buildCoreProfileCards,
  buildGoalTagCards,
  buildPlayerRateCards,
  RotationTimeSharePanel,
} from "./stats/playerPanels";
import {
  type ComparisonCard,
  ComparisonCardChart,
  ComparisonCardGrid,
  rankAverageEnabled,
  statPlayerRank,
} from "./stats/shared";
import { buildGroupStatMetrics, GroupStatExplorer, identityKey } from "./stats/groupStatExplorer";
import type { LeaderboardMetric, LeaderboardParticipant } from "./stats/groupLeaderboard";
import {
  computeKickoffSummaries,
  kickoffEventTypes,
  type PlayerKickoffSummary,
} from "./stats/kickoffs";
import { isIgnoredGoalTag } from "./stats/goalTagFilters";
import { buildGoalRows, buildGoalTagPlayerData, goalEventTypes, type GoalRow } from "./stats/goals";
import { aerialPlaylistKinds as aerialPlaylistKindList } from "./stats/aerialKinds";
import { buildMovementCohortCards } from "./stats/movement";
import { PlayerPositioningCohorts } from "./stats/positioning";
import { TouchProfileComparison } from "./stats/touches";
import type {
  AuthOptionsResponse,
  CurrentUserResponse,
  EventStatSummaryResponse,
  EventTypeResponse,
  LinkedIdentityResponse,
  MechanicEventResponse,
  MovementSummaryResponse,
  PlayerProfileResponse,
  PlayerIdentityReport,
  PlayerIdentityTag,
  PlayerStatOverviewResponse,
  PlayerTimelineResponse,
  PlayerTimelineSession,
  PositioningSummaryResponse,
  PossessionSummaryResponse,
  ProcessingVersionResponse,
  RankBenchmarkCohortsResponse,
  RecentlyProcessedReplaysResponse,
  ReplayProcessingDiagnostic,
  ReplayProcessingDiagnosticsResponse,
  ReplayProcessingQueueResponse,
  ReplayFilterOption,
  ReplayGroupResponse,
  ReplayGroupManagerResponse,
  ReplayPlayerMovementSummary,
  ReplayPlayerPositioningSummary,
  ReplayPlayer,
  ReplayPlaylistMetadata,
  ReplayResponse,
  PlayerBoostTotal,
  ReplayUploaderResponse,
  StatAggregateResponse,
  StatAggregateSetResponse,
  TouchAggregateBreakdownResponse,
  Visibility,
} from "./types";
import type { LocalReprocessProgress } from "./stats/replayModel";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

// Lazily loaded so the three.js / wasm replay player is only fetched when a
// goal playlist page is actually opened, instead of bloating the main bundle.
const ReplayGoalPlaylistPage = lazyWithChunkLoadRecovery(() =>
  import("./stats/goalPlaylist").then((module) => ({ default: module.ReplayGoalPlaylistPage })),
);
const PlayerGoalPlaylistPage = lazyWithChunkLoadRecovery(() =>
  import("./stats/goalPlaylist").then((module) => ({ default: module.PlayerGoalPlaylistPage })),
);
const ReplayAerialPlaylistPage = lazyWithChunkLoadRecovery(() =>
  import("./stats/aerialPlaylist").then((module) => ({ default: module.ReplayAerialPlaylistPage })),
);
const PlayerAerialPlaylistPage = lazyWithChunkLoadRecovery(() =>
  import("./stats/aerialPlaylist").then((module) => ({ default: module.PlayerAerialPlaylistPage })),
);
const LeaderboardsPage = lazyWithChunkLoadRecovery(() =>
  import("./stats/leaderboards").then((module) => ({ default: module.LeaderboardsPage })),
);
const UserProfilePage = lazyWithChunkLoadRecovery(() =>
  import("./UserProfilePage").then((module) => ({ default: module.UserProfilePage })),
);
const CampaignsPage = lazyWithChunkLoadRecovery(() =>
  import("./CampaignsPage").then((module) => ({ default: module.CampaignsPage })),
);

const navItems = [
  { to: "/replays", label: "Replays", icon: FileVideo, end: true },
  { to: "/replay-groups", label: "Groups", icon: FolderOpen, end: true },
  { to: "/leaderboards", label: "Leaderboards", icon: Trophy, end: true },
  { to: "/rank-trends", label: "Rank Trends", icon: TrendingUp },
  { to: "/events/review", label: "Events", icon: Activity },
  { to: "/campaigns", label: "Campaigns", icon: ListOrdered },
  { to: "/admin/processing", label: "Admin", icon: ServerCog, adminOnly: true },
  { to: "/admin/player-reports", label: "Reports", icon: AlertTriangle, adminOnly: true },
  { to: "/about", label: "About", icon: Info },
];

// Outcomes distributes game results for one target player (career/period view),
// which has no replay- or group-level analogue — keep it off those pages.
const replayStatsSectionGroups: StatGroup[] = completedStatGroups.filter(
  (group) => group.id !== "outcomes",
);
// Mirror the aggregate-safe game stats: only show completed groups (Mechanics /
// Rotation are hidden pending a rewrite — see stats/registry.tsx), minus the
// shot map (needs the 3D scene), plus the player-scope-only Outcomes section.
const playerStatsSectionGroups: StatGroup[] = completedStatGroups.filter(
  (group) => group.id !== "shot-map",
);

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const previewReplayId = replayContextRouteId(location.pathname);
  const [primaryNavOpen, setPrimaryNavOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [previewWarmupStatus, setPreviewWarmupStatus] = useState<PreviewPlayerWarmupStatus>(
    getPreviewPlayerWarmupStatus,
  );
  const visibleNavItems = navItems.filter((item) => !item.adminOnly || currentUser?.is_admin);

  useEffect(() => schedulePreviewPlayerWarmup(previewReplayId), [previewReplayId]);
  useEffect(() => subscribePreviewPlayerWarmupStatus(setPreviewWarmupStatus), []);
  useEffect(() => setPrimaryNavOpen(false), [location.pathname]);

  async function handleLogout() {
    await logout();
    navigate("/replays");
  }

  function acceptLoginToken(accessToken: string) {
    setAccessToken(accessToken);
    setLoginOpen(false);
  }

  return (
    <div className={`app-shell${primaryNavOpen ? " primary-nav-open" : ""}`}>
      <header className="top-bar">
        <button
          className="nav-menu-button icon-button"
          type="button"
          aria-label={primaryNavOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="primary-navigation-menu"
          aria-expanded={primaryNavOpen}
          onClick={() => setPrimaryNavOpen((open) => !open)}
        >
          {primaryNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="brand-dropdown-host">
          <Link className="brand" to="/replays" aria-label="Rocket Sense home">
            <img className="brand-logo" src={rocketSenseLogoUrl} alt="" aria-hidden="true" />
          </Link>
          <LogoFavoritesMenu enabled={currentUser != null} />
        </div>
        <nav id="primary-navigation" className="nav-list" aria-label="Primary navigation">
          {visibleNavItems.map((item) => (
            <NavLink key={item.to} className="nav-item" to={item.to} end={item.end}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <nav
          id="primary-navigation-menu"
          className="nav-menu-list"
          aria-label="Primary navigation menu"
        >
          {visibleNavItems.map((item) => (
            <NavLink key={item.to} className="nav-item" to={item.to} end={item.end}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="top-bar-actions">
          <PreviewPlayerWarmupIndicator status={previewWarmupStatus} />
          {currentUser ? (
            <div className="top-bar-user">
              <Link className="top-bar-user-link" to="/account">
                <CircleUser size={20} />
                <div className="top-bar-user-text">
                  <span>{currentUser.display_name}</span>
                  <small>{currentUser.email ?? providerLabel(currentUser.provider_name)}</small>
                </div>
              </Link>
              <button
                className="top-bar-logout icon-button"
                type="button"
                aria-label="Log out"
                title="Log out"
                onClick={() => void handleLogout()}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button className="top-bar-login" type="button" onClick={() => setLoginOpen(true)}>
              <LogIn size={18} />
              <span>Login</span>
            </button>
          )}
        </div>
      </header>
      {loginOpen ? (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onAccessToken={(accessToken) => acceptLoginToken(accessToken)}
        />
      ) : null}
      <main className="main-panel">
        <Routes>
          <Route path="/" element={<ReplayListPage />} />
          <Route path="/replays" element={<ReplayListPage />} />
          <Route path="/replay-groups" element={<ReplayGroupListPage />} />
          <Route
            path="/leaderboards"
            element={
              <Suspense fallback={<StatusLine loading error={null} />}>
                <LeaderboardsPage />
              </Suspense>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <Suspense fallback={<StatusLine loading error={null} />}>
                <UserProfilePage />
              </Suspense>
            }
          />
          <Route path="/replays/:replayId" element={<ReplayStatsPage />} />
          <Route path="/replays/:replayId/stats" element={<ReplayStatsPage />} />
          <Route path="/replays/:replayId/stats/:statGroup" element={<ReplayStatsPage />} />
          <Route path="/replay-groups/:groupId" element={<ReplayGroupStatsPage />} />
          <Route path="/replay-groups/:groupId/stats" element={<ReplayGroupStatsPage />} />
          <Route
            path="/replay-groups/:groupId/stats/:statGroup"
            element={<ReplayGroupStatsPage />}
          />
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
          <Route
            path="/replays/:replayId/aerials/:aerialKind"
            element={
              <Suspense fallback={<StatusLine loading error={null} />}>
                <ReplayAerialPlaylistPage />
              </Suspense>
            }
          />
          <Route path="/players/:platform/id/:platformPlayerId" element={<PlayerStatsPage />} />
          <Route
            path="/players/:platform/id/:platformPlayerId/stats"
            element={<PlayerStatsPage />}
          />
          <Route
            path="/players/:platform/id/:platformPlayerId/stats/:statGroup"
            element={<PlayerStatsPage />}
          />
          <Route
            path="/players/:platform/id/:platformPlayerId/timeline"
            element={<PlayerStatsPage view="timeline" />}
          />
          <Route
            path="/players/:platform/id/:platformPlayerId/goals"
            element={
              <Suspense fallback={<StatusLine loading error={null} />}>
                <PlayerGoalPlaylistPage />
              </Suspense>
            }
          />
          <Route
            path="/players/:platform/id/:platformPlayerId/goals/:goalType"
            element={
              <Suspense fallback={<StatusLine loading error={null} />}>
                <PlayerGoalPlaylistPage />
              </Suspense>
            }
          />
          <Route
            path="/players/:platform/id/:platformPlayerId/aerials/:aerialKind"
            element={
              <Suspense fallback={<StatusLine loading error={null} />}>
                <PlayerAerialPlaylistPage />
              </Suspense>
            }
          />
          <Route path="/players/:platform/:playerName" element={<PlayerStatsPage />} />
          <Route path="/players/:platform/:playerName/stats" element={<PlayerStatsPage />} />
          <Route
            path="/players/:platform/:playerName/stats/:statGroup"
            element={<PlayerStatsPage />}
          />
          <Route
            path="/players/:platform/:playerName/timeline"
            element={<PlayerStatsPage view="timeline" />}
          />
          <Route
            path="/players/:platform/:playerName/goals"
            element={
              <Suspense fallback={<StatusLine loading error={null} />}>
                <PlayerGoalPlaylistPage />
              </Suspense>
            }
          />
          <Route
            path="/players/:platform/:playerName/goals/:goalType"
            element={
              <Suspense fallback={<StatusLine loading error={null} />}>
                <PlayerGoalPlaylistPage />
              </Suspense>
            }
          />
          <Route
            path="/players/:platform/:playerName/aerials/:aerialKind"
            element={
              <Suspense fallback={<StatusLine loading error={null} />}>
                <PlayerAerialPlaylistPage />
              </Suspense>
            }
          />
          <Route path="/rank-trends" element={<RankTrendsPage />} />
          <Route path="/rank-trends/:metricKey" element={<RankTrendsPage />} />
          <Route path="/events/review" element={<EventsReviewPage />} />
          <Route path="/mechanics/review" element={<EventsReviewPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/admin/processing" element={<AdminProcessingPage />} />
          <Route path="/admin/player-reports" element={<AdminPlayerReportsPage />} />
          <Route path="/admin/recently-processed" element={<AdminRecentlyProcessedPage />} />
          <Route path="/admin/queue" element={<AdminQueuePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<AccountPage initialLoginOpen />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

function PreviewPlayerWarmupIndicator({ status }: { status: PreviewPlayerWarmupStatus }) {
  const Icon =
    status === "ready"
      ? Check
      : status === "warming-runtime" || status === "warming-player" || status === "scheduled"
        ? RefreshCw
        : status === "error"
          ? AlertTriangle
          : Zap;
  const label =
    status === "ready"
      ? "Player ready"
      : status === "runtime-ready"
        ? "Runtime ready"
        : status === "warming-player"
          ? "Player warming"
          : status === "warming-runtime"
            ? "Runtime warming"
            : status === "scheduled"
              ? "Player queued"
              : status === "error"
                ? "Player warmup failed"
                : "Player idle";
  const title =
    status === "ready"
      ? "A hidden preview player was created from the current replay and its Three.js assets are warmed."
      : status === "runtime-ready"
        ? "Preview player runtime, bindings, and core assets are preloaded; open a replay route to warm an actual player."
        : status === "warming-player"
          ? "A hidden preview player is being created from the current replay."
          : status === "warming-runtime"
            ? "Preview player runtime is loading in the background."
            : status === "scheduled"
              ? "Preview player warmup is waiting for browser idle time."
              : status === "error"
                ? "Preview player warmup failed; opening a preview will retry the normal load path."
                : "Preview player warmup has not started yet.";

  return (
    <div
      className={`preview-player-warmup preview-player-warmup-${status}`}
      title={title}
      aria-label={label}
      aria-live="polite"
    >
      <Play size={17} className="preview-player-warmup-kind" aria-hidden="true" />
      <span className="preview-player-warmup-state" aria-hidden="true">
        <Icon
          size={10}
          className={
            status === "warming-runtime" || status === "warming-player" ? "spin" : undefined
          }
        />
      </span>
    </div>
  );
}

function replayContextRouteId(pathname: string): string | null {
  return /^\/replays\/([^/]+)(?:\/stats(?:\/[^/]+)?)?\/?$/.exec(pathname)?.[1] ?? null;
}

function ReplayLink({
  replayId,
  className,
  children,
}: {
  replayId: string;
  className?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const href = `/replays/${encodeURIComponent(replayId)}`;

  function warm() {
    void warmPreviewPlayerForReplay(replayId).catch((error: unknown) => {
      console.debug("Replay player pre-navigation warmup failed:", error);
    });
  }

  async function onClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }
    event.preventDefault();
    try {
      await warmPreviewPlayerForReplay(replayId);
    } catch (error) {
      console.debug("Replay player pre-navigation warmup failed:", error);
    }
    navigate(href);
  }

  return (
    <Link
      className={className}
      to={href}
      onPointerEnter={warm}
      onFocus={warm}
      onTouchStart={warm}
      onClick={(event) => void onClick(event)}
    >
      {children}
    </Link>
  );
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
  const [allMatchingSelected, setAllMatchingSelected] = useState(false);

  useEffect(() => {
    setFilters(activeFilters);
  }, [activeFilters]);

  // Selections reference rows on the current page; drop them when the query changes.
  useEffect(() => {
    setSelectedIds(new Set());
    setAllMatchingSelected(false);
  }, [searchParams]);

  function toggleSelected(replayId: string) {
    if (allMatchingSelected) {
      setAllMatchingSelected(false);
      setSelectedIds(
        new Set(replays.filter((replay) => replay.id !== replayId).map((replay) => replay.id)),
      );
      return;
    }
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
    setAllMatchingSelected(false);
  }

  function selectAllMatching() {
    setAllMatchingSelected(true);
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
    if (sortBy === "replay-date") {
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
  const visiblePageSizeOptions = pageSizeOptions.includes(pageSize)
    ? pageSizeOptions
    : [...pageSizeOptions, pageSize].sort((a, b) => a - b);
  const mapOptions = replayOptionChoices(filters.map, [
    ...filterOptions.maps,
    ...mapOptionsFromReplays(replays),
  ]);
  const seasonOptions = replayOptionChoices(
    filters.season,
    [...filterOptions.seasons, ...seasonOptionsFromReplays(replays)],
    formatSeasonLabel,
  );
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
      options: [
        { value: "", label: "Any" },
        ...mapOptions.map((option) => ({
          value: option.value,
          label: optionLabel({ ...option, label: mapDisplayName(option.value) }),
        })),
      ],
      onChange: (value) => setFilters({ ...filters, map: value }),
    },
    {
      id: "season",
      label: "Season",
      value: filters.season,
      options: [
        { value: "", label: "Any" },
        ...seasonOptions.map((option) => ({ value: option.value, label: optionLabel(option) })),
      ],
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
    <div className="page-with-favorites">
      <FavoritesSidebar enabled={currentUser != null} />
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
            <Link
              className="secondary-button"
              to={`/replay-groups/${encodeURIComponent(activeGroupId)}/stats`}
            >
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
              <select
                value={replayOrder}
                onChange={(event) => updateReplayOrder(event.currentTarget.value as ReplayOrder)}
              >
                {replayOrderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Page size
              <select
                value={String(pageSize)}
                onChange={(event) => updatePageSize(event.currentTarget.value)}
              >
                {visiblePageSizeOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="icon-button"
              title="Previous page"
              disabled={!canPageBackward || loading}
              onClick={() => goToOffset(previousOffset)}
            >
              <ChevronLeft size={17} />
            </button>
            <span className="page-count">
              {currentPage.toLocaleString()} / {totalPages.toLocaleString()}
            </span>
            <button
              type="button"
              className="icon-button"
              title="Next page"
              disabled={!canPageForward || loading}
              onClick={() => goToOffset(nextOffset)}
            >
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

        {currentUser && (selectedIds.size > 0 || allMatchingSelected) ? (
          <GroupSelectionBar
            selectedIds={selectedIds}
            allMatchingSelected={allMatchingSelected}
            pageReplayCount={replays.length}
            matchingReplayCount={total ?? replays.length}
            searchParams={searchParams}
            groups={groups}
            onSelectAll={selectAllOnPage}
            onSelectAllMatching={selectAllMatching}
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
                      checked={allMatchingSelected || selectedIds.has(replay.id)}
                      onChange={() => toggleSelected(replay.id)}
                    />
                  ) : null}
                  <div className="replay-card-title">
                    <ReplayLink className="primary-link" replayId={replay.id}>
                      {replay.original_file_name || replay.id}
                    </ReplayLink>
                    <ReplayAggregateExclusionIcon replay={replay} />
                    <UploaderPill uploader={replay.uploaded_by} />
                  </div>
                </div>
                <div className="replay-card-meta">
                  <GameTypeBadges metadata={replay.playlist_metadata} fallback={replay.playlist} />
                  {replay.summary.season ? (
                    <Chip tone="slate" title="Rocket League season">
                      {formatSeasonCode(replay.summary.season)}
                    </Chip>
                  ) : null}
                  <Chip>{formatDate(replay.replay_date || replay.created_at)}</Chip>
                  <Chip tone="muted">{formatDuration(replay.summary.duration_seconds)}</Chip>
                  <ReplayStatusChip replay={replay} currentUser={currentUser} />
                </div>
              </header>
              <ReplayTeams replay={replay} />
            </article>
          ))}
          {!loading && replays.length === 0 ? (
            <div className="status-line">No replays found.</div>
          ) : null}
        </div>
      </section>
    </div>
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
  { value: "replay-date:desc", label: "Newest played" },
  { value: "replay-date:asc", label: "Oldest played" },
  { value: "upload-date:desc", label: "Newest uploaded" },
  { value: "upload-date:asc", label: "Oldest uploaded" },
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

// Every ranked tier and its three divisions, matching the slugs the API's
// parse_rank_filter accepts (bronze-1 .. grand-champion-3), bookended by the
// division-less Unranked and Supersonic Legend tiers.
const rankFilterGroups = [
  { slug: "bronze", label: "Bronze" },
  { slug: "silver", label: "Silver" },
  { slug: "gold", label: "Gold" },
  { slug: "platinum", label: "Platinum" },
  { slug: "diamond", label: "Diamond" },
  { slug: "champion", label: "Champion" },
  { slug: "grand-champion", label: "Grand Champion" },
];
const rankDivisionNumerals = ["I", "II", "III"];
const rankFilterOptions = [
  { value: "", label: "Any" },
  { value: "unranked", label: "Unranked" },
  ...rankFilterGroups.flatMap((group) =>
    rankDivisionNumerals.map((numeral, index) => ({
      value: `${group.slug}-${index + 1}`,
      label: `${group.label} ${numeral}`,
    })),
  ),
  { value: "supersonic-legend", label: "Supersonic Legend" },
];

const seasonFilterOptions: FilterOptionConfig[] = buildSeasonOptions("Any", { newestFirst: true });

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

function FilterGrid({
  fields,
  className = "",
}: {
  fields: FilterFieldConfig[];
  className?: string;
}) {
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
        <select
          value={field.value}
          name={field.name}
          onChange={(event) => field.onChange(event.currentTarget.value)}
        >
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
        if (!cancelled) {
          setFilterOptions({
            ...response,
            seasons: response.seasons.map((option) => ({
              ...option,
              label: formatSeasonLabel(option.value || option.label),
            })),
          });
        }
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

interface GroupTreeNode {
  group: ReplayGroupResponse;
  depth: number;
  children: GroupTreeNode[];
}

/// Build a forest of groups from a flat list using `parent_group_id`. A group
/// whose parent is missing from the list is treated as a root; the `seen` guard
/// keeps a stray parent cycle from recursing forever.
function buildGroupForest(groups: ReplayGroupResponse[]): GroupTreeNode[] {
  const byId = new Map(groups.map((group) => [group.id, group]));
  const childrenByParent = new Map<string | null, ReplayGroupResponse[]>();
  for (const group of groups) {
    const parentKey =
      group.parent_group_id && byId.has(group.parent_group_id) ? group.parent_group_id : null;
    const siblings = childrenByParent.get(parentKey) ?? [];
    siblings.push(group);
    childrenByParent.set(parentKey, siblings);
  }
  const build = (parentKey: string | null, depth: number, seen: Set<string>): GroupTreeNode[] =>
    (childrenByParent.get(parentKey) ?? [])
      .filter((group) => !seen.has(group.id))
      .map((group) => {
        seen.add(group.id);
        return { group, depth, children: build(group.id, depth + 1, seen) };
      });
  return build(null, 0, new Set());
}

/// Flatten a group forest into render order. When `expanded` is provided, a
/// node's children are only included if that node's id is in the set, so the
/// default Groups view shows top-level groups collapsed and you expand them to
/// reveal subgroups. Omit `expanded` to flatten the whole tree (used by the
/// group selectors and by search, where every match must stay reachable).
function flattenGroupForest(nodes: GroupTreeNode[], expanded?: Set<string>): GroupTreeNode[] {
  const out: GroupTreeNode[] = [];
  const walk = (subtree: GroupTreeNode[]) => {
    for (const node of subtree) {
      out.push(node);
      if (!expanded || expanded.has(node.group.id)) {
        walk(node.children);
      }
    }
  };
  walk(nodes);
  return out;
}

/// Ids of a group and every group nested beneath it. Used to keep a group from
/// being moved under itself or one of its own descendants.
function groupSubtreeIds(groups: ReplayGroupResponse[], rootId: string): Set<string> {
  const childrenByParent = new Map<string, ReplayGroupResponse[]>();
  for (const group of groups) {
    if (!group.parent_group_id) continue;
    const siblings = childrenByParent.get(group.parent_group_id) ?? [];
    siblings.push(group);
    childrenByParent.set(group.parent_group_id, siblings);
  }
  const ids = new Set<string>();
  const queue = [rootId];
  while (queue.length > 0) {
    const id = queue.pop() as string;
    if (ids.has(id)) continue;
    ids.add(id);
    for (const child of childrenByParent.get(id) ?? []) queue.push(child.id);
  }
  return ids;
}

/// Root-to-parent chain of a group (excludes the group itself).
function groupAncestors(groups: ReplayGroupResponse[], groupId: string): ReplayGroupResponse[] {
  const byId = new Map(groups.map((group) => [group.id, group]));
  const chain: ReplayGroupResponse[] = [];
  const seen = new Set<string>([groupId]);
  let parentId = byId.get(groupId)?.parent_group_id ?? null;
  while (parentId && !seen.has(parentId)) {
    const parent = byId.get(parentId);
    if (!parent) break;
    seen.add(parent.id);
    chain.unshift(parent);
    parentId = parent.parent_group_id ?? null;
  }
  return chain;
}

function BallchasingMirrorForm() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "error"; message: string } | null>(null);

  if (!currentUser) return null;

  async function submit(event: FormEvent) {
    event.preventDefault();
    const group = value.trim();
    if (!group) return;
    setBusy(true);
    setFeedback(null);
    try {
      const created = await createBallchasingMirror({ group });
      setValue("");
      navigate(`/replay-groups/${created.id}/stats`);
    } catch (err) {
      setFeedback({
        kind: "error",
        message: err instanceof Error ? err.message : "Failed to create mirror",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="ballchasing-mirror-form" onSubmit={submit}>
      <input
        type="text"
        value={value}
        placeholder="Ballchasing group id or URL to mirror…"
        onChange={(event) => setValue(event.currentTarget.value)}
        disabled={busy}
      />
      <button type="submit" disabled={busy || value.trim() === ""}>
        <Plus size={16} />
        Mirror ballchasing group
      </button>
      {feedback ? (
        <p
          className={`replay-selection-feedback ${
            feedback.kind === "error" ? "is-error" : "is-ok"
          }`}
        >
          {feedback.message}
        </p>
      ) : null}
    </form>
  );
}

function ReplayGroupListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const hasAccessToken = getAccessToken() != null;
  const groupScope = replayGroupScopeFromParam(searchParams.get("scope"), hasAccessToken);
  const activeSearch = searchParams.get("q") ?? "";
  const [groups, setGroups] = useState<ReplayGroupResponse[]>([]);
  const [groupSearch, setGroupSearch] = useState(activeSearch);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setGroupSearch(activeSearch);
  }, [activeSearch]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listReplayGroups({ scope: groupScope, q: activeSearch })
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
  }, [activeSearch, groupScope]);

  function updateGroupSearch(next: { q?: string; scope?: ReplayGroupListScope }) {
    const params = new URLSearchParams(searchParams);
    if (next.q !== undefined) {
      const q = next.q.trim();
      if (q) {
        params.set("q", q);
      } else {
        params.delete("q");
      }
    }
    if (next.scope !== undefined) {
      params.set("scope", next.scope);
    }
    navigate({ pathname: location.pathname, search: params.toString() ? `?${params}` : "" });
  }

  function handleGroupSearchSubmit(event: FormEvent) {
    event.preventDefault();
    updateGroupSearch({ q: groupSearch });
  }

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const toggleExpanded = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const forest = useMemo(() => buildGroupForest(groups), [groups]);
  // A live search must surface matches at any depth, so it overrides collapse
  // and flattens the whole tree; otherwise we honor the per-group expand state.
  const searching = groupSearch.trim().length > 0;
  const orderedGroups = useMemo(
    () => flattenGroupForest(forest, searching ? undefined : expanded),
    [forest, searching, expanded],
  );
  const visibleGroups = useMemo(
    () => filterReplayGroupEntries(orderedGroups, groupSearch),
    [orderedGroups, groupSearch],
  );

  return (
    <section className="page replay-group-list-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Replay groups</p>
          <h1>Groups</h1>
        </div>
      </header>

      <BallchasingMirrorForm />

      <StatusLine loading={loading} error={error} />

      <form className="search-filter-panel replay-search-panel" onSubmit={handleGroupSearchSubmit}>
        <div className="replay-search-row">
          <label className="search-box">
            <Search size={17} />
            <input
              type="search"
              value={groupSearch}
              onChange={(event) => setGroupSearch(event.currentTarget.value)}
              placeholder="Search groups"
            />
          </label>
          <label className="segment-bar-select">
            <span className="segment-bar-select-label">Scope</span>
            <select
              value={groupScope}
              onChange={(event) =>
                updateGroupSearch({ scope: event.currentTarget.value as ReplayGroupListScope })
              }
            >
              <option value="mine" disabled={!hasAccessToken}>
                Mine
              </option>
              <option value="all">Everyone</option>
            </select>
          </label>
          <button type="submit" className="secondary-button">
            <Search size={16} />
            Search
          </button>
          {activeSearch ? (
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setGroupSearch("");
                updateGroupSearch({ q: "" });
              }}
            >
              <X size={16} />
              Clear
            </button>
          ) : null}
        </div>
      </form>

      <div className="replay-card-list group-card-list">
        {visibleGroups.map(({ group, depth }) => (
          <article
            className="replay-card group-card"
            key={group.id}
            style={depth > 0 ? { marginLeft: depth * 24 } : undefined}
          >
            <header className="replay-card-header">
              <div className="replay-card-title">
                {group.child_group_count > 0 ? (
                  <button
                    type="button"
                    className="group-card-expand"
                    aria-expanded={searching || expanded.has(group.id)}
                    aria-label={
                      searching || expanded.has(group.id)
                        ? "Collapse subgroups"
                        : "Expand subgroups"
                    }
                    onClick={() => toggleExpanded(group.id)}
                  >
                    {searching || expanded.has(group.id) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                ) : null}
                <Link className="primary-link" to={`/replay-groups/${group.id}/stats`}>
                  {group.child_group_count > 0 ? (
                    <FolderOpen size={16} style={{ marginRight: 6, verticalAlign: "-2px" }} />
                  ) : null}
                  {group.name}
                </Link>
                <span className="subtle">{group.description || group.id}</span>
                {group.ballchasing_group_id ? (
                  <span
                    className={`mirror-status-pill is-${
                      group.ballchasing_sync_status ?? "pending"
                    }`}
                  >
                    Ballchasing: {group.ballchasing_sync_status ?? "pending"}
                  </span>
                ) : null}
              </div>
              <div className="replay-card-meta">
                <span>{group.replay_count.toLocaleString()} replays</span>
                {group.child_group_count > 0 ? (
                  <span className="subtle">
                    {group.total_replay_count.toLocaleString()} in subtree ·{" "}
                    {group.child_group_count.toLocaleString()}{" "}
                    {group.child_group_count === 1 ? "subgroup" : "subgroups"}
                  </span>
                ) : (
                  <span className="subtle">Updated {formatDate(group.updated_at)}</span>
                )}
              </div>
            </header>
            <div className="button-row">
              <Link className="secondary-button" to={`/replay-groups/${group.id}/stats`}>
                <BarChart3 size={16} />
                Stats
              </Link>
              <Link
                className="secondary-button"
                to={`/replays?group=${encodeURIComponent(group.id)}`}
              >
                <FileVideo size={16} />
                Replays
              </Link>
            </div>
          </article>
        ))}
        {!loading && groups.length === 0 ? (
          <div className="status-line">
            {activeSearch ? "No replay groups matched your search." : "No replay groups found."}
          </div>
        ) : null}
        {!loading && groups.length > 0 && visibleGroups.length === 0 ? (
          <div className="status-line">No replay groups match “{groupSearch}”.</div>
        ) : null}
      </div>
    </section>
  );
}

function replayGroupScopeFromParam(
  value: string | null,
  hasAccessToken: boolean,
): ReplayGroupListScope {
  if (value === "all") return "all";
  if (value === "mine" && hasAccessToken) return "mine";
  return hasAccessToken ? "mine" : "all";
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

function navigateWithReplayParams(
  navigate: ReturnType<typeof useNavigate>,
  currentSearch: string,
  params: URLSearchParams,
) {
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
  for (const item of value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)) {
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
  const sortBy = params.get("sort-by") === "upload-date" ? "upload-date" : "replay-date";
  const sortDir = params.get("sort-dir") === "asc" ? "asc" : "desc";
  return `${sortBy}:${sortDir}` as ReplayOrder;
}

function replayOptionChoices(
  currentValue: string,
  options: ReplayFilterOption[],
  labelForValue: (value: string) => string = (value) => value,
): ReplayFilterOption[] {
  const byValue = new Map<string, ReplayFilterOption>();
  for (const option of options) {
    if (!option.value.trim()) continue;
    byValue.set(option.value, option);
  }
  if (currentValue && !byValue.has(currentValue)) {
    byValue.set(currentValue, {
      value: currentValue,
      label: labelForValue(currentValue),
      count: 0,
    });
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
  return replayFieldOptions(
    replays.map((replay) => replay.summary.season),
    formatSeasonLabel,
  );
}

function replayFieldOptions(
  values: Array<string | null>,
  labelForValue: (value: string) => string = (value) => value,
): ReplayFilterOption[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    if (!value?.trim()) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].map(([value, count]) => ({
    value,
    label: labelForValue(value),
    count,
  }));
}

function optionLabel(option: ReplayFilterOption): string {
  return option.count > 0 ? `${option.label} (${option.count.toLocaleString()})` : option.label;
}

function replayFilterChips(params: URLSearchParams): string[] {
  const chips: string[] = [];
  for (const [key, value] of params.entries()) {
    if (!value || key === "offset" || key === "count" || key === "sort-by" || key === "sort-dir")
      continue;
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
  if (key === "map") return mapDisplayName(value);
  if (key === "season") return formatSeasonLabel(value);
  if (key === "pro") return value === "true" ? "Has pro" : "No pro";
  return value;
}

// A pill identifying who uploaded the replay, badged with the platform/provider
// glyph for the auth account they signed in with (Steam, Epic, Xbox, Google, ...).
function UploaderPill({ uploader }: { uploader: ReplayUploaderResponse | null }) {
  if (!uploader) {
    return (
      <Chip tone="muted" title="No uploader on record">
        Unknown uploader
      </Chip>
    );
  }
  const name =
    uploader.display_name?.trim() || uploader.primary_email?.trim() || "Unknown uploader";
  const title = uploader.provider
    ? `View ${name}'s uploads (signed in via ${providerLabel(uploader.provider)})`
    : `View ${name}'s uploads`;
  return (
    <Link className="uploader-pill-link" to={`/users/${encodeURIComponent(uploader.id)}`}>
      <Chip tone="slate" className="uploader-pill" title={title}>
        {uploader.provider ? <ProviderLoginIcon providerId={uploader.provider} /> : null}
        <span className="uploader-pill-name">{name}</span>
      </Chip>
    </Link>
  );
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
  const badges: Array<{ key: string; label: string; tone: ChipTone }> = [];
  const context = metadata?.ranked ? "ranked" : metadata?.casual ? "casual" : metadata?.category;
  if (context) {
    const tone: ChipTone =
      context === "ranked" ? "green" : context === "casual" ? "blue" : "purple";
    badges.push({ key: "context", label: titleCase(context), tone });
  }
  if (metadata?.ruleset) {
    badges.push({ key: "ruleset", label: titleCase(metadata.ruleset), tone: "neutral" });
  }
  if (metadata?.team_size) {
    badges.push({
      key: "size",
      label: `${metadata.team_size}v${metadata.team_size}`,
      tone: "slate",
    });
  }
  if (badges.length === 0) {
    badges.push({ key: "playlist", label: playlistLabel(metadata, fallback), tone: "purple" });
  }
  const title = playlistLabel(metadata, fallback);
  return (
    <span className="game-badges" title={title}>
      {badges.map((badge) => (
        <Chip key={badge.key} tone={badge.tone}>
          {badge.label}
        </Chip>
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
      <TeamBlock
        label="Blue"
        players={blue}
        tone="blue"
        score={replay.summary.team_scores.blue}
        mvp={mvp}
      />
      <TeamBlock
        label="Orange"
        players={orange}
        tone="orange"
        score={replay.summary.team_scores.orange}
        mvp={mvp}
      />
      {unknown.length > 0 ? (
        <TeamBlock label="Other" players={unknown} tone="neutral" mvp={mvp} />
      ) : null}
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
            <PlayerLine
              key={`${player.platform}-${player.platform_player_id}-${index}`}
              player={player}
              isMvp={player === mvp}
            />
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
        <Chip tone="mvp" title="MVP: highest score on the winning team">
          MVP
        </Chip>
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

  return (
    <PlayerIdentity player={player} suffix={suffix} className="player-line" showTeam={false} />
  );
}

function useCurrentUser(): CurrentUserResponse | null {
  const [user, setUser] = useState<CurrentUserResponse | null>(null);
  const [authRevision, setAuthRevision] = useState(0);

  useEffect(() => {
    function refreshAuth() {
      setAuthRevision((revision) => revision + 1);
    }

    window.addEventListener(authChangeEvent, refreshAuth);
    return () => window.removeEventListener(authChangeEvent, refreshAuth);
  }, []);

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
  }, [authRevision]);

  return user;
}

function useLinkedIdentities(enabled: boolean): {
  identities: LinkedIdentityResponse[];
  loading: boolean;
  error: string | null;
} {
  const [identities, setIdentities] = useState<LinkedIdentityResponse[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [authRevision, setAuthRevision] = useState(0);

  useEffect(() => {
    function refreshAuth() {
      setAuthRevision((revision) => revision + 1);
    }

    window.addEventListener(authChangeEvent, refreshAuth);
    return () => window.removeEventListener(authChangeEvent, refreshAuth);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!enabled) {
      setIdentities([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    listLinkedIdentities()
      .then((response) => {
        if (!cancelled) setIdentities(response.identities);
      })
      .catch((err) => {
        if (cancelled) return;
        setIdentities([]);
        setError(err instanceof Error ? err.message : "Could not load linked identities.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, authRevision]);

  return { identities, loading, error };
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
  allMatchingSelected,
  pageReplayCount,
  matchingReplayCount,
  searchParams,
  groups,
  onSelectAll,
  onSelectAllMatching,
  onClear,
  onGroupsChanged,
}: {
  selectedIds: Set<string>;
  allMatchingSelected: boolean;
  pageReplayCount: number;
  matchingReplayCount: number;
  searchParams: URLSearchParams;
  groups: ReplayGroupResponse[];
  onSelectAll: () => void;
  onSelectAllMatching: () => void;
  onClear: () => void;
  onGroupsChanged: () => void;
}) {
  const currentUser = useCurrentUser();
  const [targetGroupId, setTargetGroupId] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "error"; message: string } | null>(null);

  const creating = targetGroupId === NEW_GROUP_OPTION;
  const targetGroup = groups.find((group) => group.id === targetGroupId) ?? null;
  const orderedGroups = useMemo(() => flattenGroupForest(buildGroupForest(groups)), [groups]);
  const selectedCount = allMatchingSelected ? matchingReplayCount : selectedIds.size;
  const allPageSelected = pageReplayCount > 0 && selectedIds.size >= pageReplayCount;
  const canSelectAllMatching =
    !allMatchingSelected && matchingReplayCount > Math.max(selectedIds.size, pageReplayCount);
  const visibleGroups = useMemo(
    () => filterReplayGroupEntries(orderedGroups, groupSearch),
    [orderedGroups, groupSearch],
  );
  const targetGroupEntry = targetGroup
    ? (orderedGroups.find(({ group }) => group.id === targetGroup.id) ?? {
        group: targetGroup,
        depth: 0,
      })
    : null;
  const selectableGroups =
    targetGroupEntry && !visibleGroups.some(({ group }) => group.id === targetGroupEntry.group.id)
      ? [targetGroupEntry, ...visibleGroups]
      : visibleGroups;

  async function withBusy(action: () => Promise<void>) {
    setBusy(true);
    setFeedback(null);
    try {
      await action();
    } catch (err) {
      setFeedback({
        kind: "error",
        message: err instanceof Error ? err.message : "Request failed",
      });
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
      const result = allMatchingSelected
        ? await addMatchingReplaysToGroup(targetGroup.id, searchParams)
        : await addReplaysToGroup(targetGroup.id, [...selectedIds]);
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
      const result = allMatchingSelected
        ? await removeMatchingReplaysFromGroup(targetGroup.id, searchParams)
        : await removeReplaysFromGroup(targetGroup.id, [...selectedIds]);
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
        <strong>
          {allMatchingSelected
            ? `All ${selectedCount.toLocaleString()} matching selected`
            : `${selectedCount.toLocaleString()} selected`}
        </strong>
        {!allMatchingSelected && !allPageSelected ? (
          <button type="button" className="link-button" onClick={onSelectAll} disabled={busy}>
            Select all {pageReplayCount.toLocaleString()} on page
          </button>
        ) : null}
        {canSelectAllMatching ? (
          <button
            type="button"
            className="link-button"
            onClick={onSelectAllMatching}
            disabled={busy}
          >
            Select all {matchingReplayCount.toLocaleString()} matching
          </button>
        ) : null}
        <button type="button" className="link-button" onClick={onClear} disabled={busy}>
          Clear
        </button>
      </div>
      <div className="replay-selection-actions">
        <label className="replay-selection-group">
          <FolderPlus size={16} />
          <input
            type="search"
            value={groupSearch}
            placeholder="Search groups"
            onChange={(event) => setGroupSearch(event.currentTarget.value)}
            disabled={busy}
          />
          <select
            value={targetGroupId}
            onChange={(event) => {
              setTargetGroupId(event.currentTarget.value);
              setShowMembers(false);
              setFeedback(null);
            }}
            disabled={busy}
          >
            <option value="">Choose a group…</option>
            {selectableGroups.map(({ group, depth }) => (
              <option key={group.id} value={group.id}>
                {`${"  ".repeat(depth)}${depth > 0 ? "└ " : ""}${group.name} (${group.replay_count})`}
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
            <button
              type="button"
              onClick={handleCreateGroup}
              disabled={busy || newGroupName.trim() === ""}
            >
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
            <button
              type="button"
              className="secondary-button"
              onClick={handleRemove}
              disabled={busy || !targetGroup}
            >
              <FolderMinus size={16} />
              Remove from group
            </button>
            <button
              type="button"
              className={`secondary-button${showMembers ? " is-active" : ""}`}
              onClick={() => setShowMembers((value) => !value)}
              disabled={busy || !targetGroup}
              title="Manage who can administer this group"
              aria-pressed={showMembers}
            >
              <Users size={16} />
              Members
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
      {showMembers && targetGroup ? (
        <GroupManagersPanel group={targetGroup} currentUserId={currentUser?.id ?? null} />
      ) : null}
      {showMembers && targetGroup && targetGroup.viewer_can_manage ? (
        <PrivacyPanel
          visibility={targetGroup.visibility}
          onVisibilityChange={async (next) => {
            await updateReplayGroup(targetGroup.id, { visibility: next });
            onGroupsChanged();
          }}
          listShares={() => listReplayGroupShares(targetGroup.id)}
          addShare={(target) => addReplayGroupShare(targetGroup.id, target)}
          removeShare={(target) => removeReplayGroupShare(targetGroup.id, target)}
          currentUserId={currentUser?.id ?? null}
        />
      ) : null}
      {feedback ? (
        <p
          className={`replay-selection-feedback ${feedback.kind === "error" ? "is-error" : "is-ok"}`}
        >
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}

function pluralizeReplay(count: number): string {
  return count === 1 ? "replay" : "replays";
}

function filterReplayGroupEntries(entries: GroupTreeNode[], search: string): GroupTreeNode[] {
  const term = search.trim().toLowerCase();
  if (!term) return entries;
  return entries.filter(({ group }) => replayGroupSearchText(group).includes(term));
}

function replayGroupSearchText(group: ReplayGroupResponse): string {
  return [group.name, group.description, group.id].filter(Boolean).join(" ").toLowerCase();
}

function managerLabel(manager: ReplayGroupManagerResponse): string {
  return manager.display_name?.trim() || manager.email || manager.user_id;
}

function GroupManagersPanel({
  group,
  currentUserId,
}: {
  group: ReplayGroupResponse;
  currentUserId: string | null;
}) {
  const [managers, setManagers] = useState<ReplayGroupManagerResponse[] | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "error"; message: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    setManagers(null);
    setLoadError(null);
    listReplayGroupManagers(group.id)
      .then((response) => {
        if (!cancelled) setManagers(response.managers);
      })
      .catch((err) => {
        if (!cancelled) {
          setManagers([]);
          setLoadError(err instanceof Error ? err.message : "Could not load members.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [group.id]);

  async function withBusy(action: () => Promise<void>) {
    setBusy(true);
    setFeedback(null);
    try {
      await action();
    } catch (err) {
      setFeedback({
        kind: "error",
        message: err instanceof Error ? err.message : "Request failed",
      });
    } finally {
      setBusy(false);
    }
  }

  function handleInvite() {
    const email = inviteEmail.trim();
    if (!email) return;
    void withBusy(async () => {
      const response = await addReplayGroupManager(group.id, { email });
      setManagers(response.managers);
      setInviteEmail("");
      setFeedback({ kind: "ok", message: `${email} can now manage this group.` });
    });
  }

  function handleRemove(manager: ReplayGroupManagerResponse) {
    const label = managerLabel(manager);
    if (!window.confirm(`Remove ${label} as a manager of "${group.name}"?`)) return;
    void withBusy(async () => {
      const response = await removeReplayGroupManager(group.id, manager.user_id);
      setManagers(response.managers);
      setFeedback({ kind: "ok", message: `Removed ${label}.` });
    });
  }

  return (
    <div className="group-managers-panel">
      <p className="group-managers-title">
        <Users size={14} />
        Managers of <strong>{group.name}</strong>
      </p>
      {managers === null && !loadError ? (
        <p className="group-managers-empty">Loading members…</p>
      ) : null}
      {loadError ? <p className="replay-selection-feedback is-error">{loadError}</p> : null}
      {managers && managers.length > 0 ? (
        <ul className="group-managers-list">
          {managers.map((manager) => (
            <li key={manager.user_id} className="group-managers-item">
              <span className="group-managers-identity">
                <CircleUser size={16} />
                <span className="group-managers-name">
                  {managerLabel(manager)}
                  {manager.user_id === currentUserId ? " (you)" : ""}
                </span>
                {manager.email && manager.email !== managerLabel(manager) ? (
                  <span className="group-managers-email">{manager.email}</span>
                ) : null}
              </span>
              {manager.is_creator ? (
                <span className="group-managers-badge">Creator</span>
              ) : (
                <button
                  type="button"
                  className="link-button is-danger"
                  onClick={() => handleRemove(manager)}
                  disabled={busy}
                  title="Remove this manager"
                >
                  <X size={14} />
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="group-managers-invite">
        <input
          type="email"
          value={inviteEmail}
          placeholder="Invite by email"
          onChange={(event) => setInviteEmail(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleInvite();
            }
          }}
          disabled={busy || managers === null}
        />
        <button
          type="button"
          onClick={handleInvite}
          disabled={busy || managers === null || inviteEmail.trim() === ""}
        >
          <UserPlus size={16} />
          Invite
        </button>
      </div>
      <p className="group-managers-hint">
        The person must have signed in at least once. Any manager can invite or remove others; the
        creator can&rsquo;t be removed.
      </p>
      {feedback ? (
        <p
          className={`replay-selection-feedback ${feedback.kind === "error" ? "is-error" : "is-ok"}`}
        >
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}

type RequeuePhase = "pending" | "done" | "skipped" | "error";

interface RequeueResult {
  phase: RequeuePhase;
  message: string;
}

function RequeueResultChip({ result }: { result: RequeueResult }) {
  const Icon =
    result.phase === "error" ? AlertTriangle : result.phase === "pending" ? RotateCcw : Check;
  return (
    <span className={`requeue-result requeue-result-${result.phase}`} role="status">
      <Icon size={14} className={result.phase === "pending" ? "spin" : undefined} />
      <span>{result.message}</span>
    </span>
  );
}

function ReplayStatsPage() {
  const { replayId = "", statGroup } = useParams();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [reprocessing, setReprocessing] = useState(false);
  const [reprocessResult, setReprocessResult] = useState<RequeueResult | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteResult, setDeleteResult] = useState<RequeueResult | null>(null);
  const [reprocessingLocal, setReprocessingLocal] = useState(false);
  const [localReprocessProgress, setLocalReprocessProgress] =
    useState<LocalReprocessProgress | null>(null);
  const [replay, setReplay] = useState<ReplayResponse | null>(null);
  const [stats, setStats] = useState<StatAggregateSetResponse | null>(null);
  const [events, setEvents] = useState<MechanicEventResponse[]>([]);
  const [movementSummaries, setMovementSummaries] = useState<ReplayPlayerMovementSummary[]>([]);
  const [positioningSummaries, setPositioningSummaries] = useState<
    ReplayPlayerPositioningSummary[]
  >([]);
  const [replayLoading, setReplayLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [movementSummariesLoading, setMovementSummariesLoading] = useState(false);
  const [positioningSummariesLoading, setPositioningSummariesLoading] = useState(false);
  const [replayError, setReplayError] = useState<string | null>(null);
  const [_statsError, setStatsError] = useState<string | null>(null);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [movementSummariesError, setMovementSummariesError] = useState<string | null>(null);
  const [positioningSummariesError, setPositioningSummariesError] = useState<string | null>(null);

  const activeGroup = useMemo(
    () => statGroupById(statGroup, replayStatsSectionGroups) ?? replayStatsSectionGroups[0],
    [statGroup],
  );

  useEffect(() => {
    let cancelled = false;

    setMovementSummaries([]);
    setPositioningSummaries([]);
    setMovementSummariesError(null);
    setPositioningSummariesError(null);
    setMovementSummariesLoading(false);
    setPositioningSummariesLoading(false);
    setReplayLoading(true);
    setReplayError(null);
    const replayPromise = getReplay(replayId, { forceRefresh: true });
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

    if (activeGroup.id === "movement") {
      setMovementSummariesLoading(true);
      replayPromise
        .catch(() => null)
        .then((replayResponse) => {
          if (!replayResponse) return [];
          const params = new URLSearchParams({ "replay-id": replayId });
          return Promise.all(
            replayResponse.players
              .filter((player) => player.platform && player.platform_player_id)
              .map(async (player) => {
                const response = await getPlayerMovementSummary(
                  player.platform as string,
                  player.platform_player_id as string,
                  params,
                );
                return {
                  platform: player.platform,
                  platform_player_id: player.platform_player_id,
                  summary: response.player,
                };
              }),
          );
        })
        .then((summaries) => {
          if (!cancelled) setMovementSummaries(summaries);
        })
        .catch((err: Error) => {
          if (!cancelled) setMovementSummariesError(err.message);
        })
        .finally(() => {
          if (!cancelled) setMovementSummariesLoading(false);
        });
    }

    if (activeGroup.id === "positioning") {
      setPositioningSummariesLoading(true);
      replayPromise
        .catch(() => null)
        .then((replayResponse) => {
          if (!replayResponse) return [];
          const params = new URLSearchParams({ "replay-id": replayId });
          return Promise.all(
            replayResponse.players
              .filter((player) => player.platform && player.platform_player_id)
              .map(async (player) => {
                const response = await getPlayerPositioningSummary(
                  player.platform as string,
                  player.platform_player_id as string,
                  params,
                );
                return {
                  platform: player.platform,
                  platform_player_id: player.platform_player_id,
                  summary: response.player,
                };
              }),
          );
        })
        .then((summaries) => {
          if (!cancelled) setPositioningSummaries(summaries);
        })
        .catch((err: Error) => {
          if (!cancelled) setPositioningSummariesError(err.message);
        })
        .finally(() => {
          if (!cancelled) setPositioningSummariesLoading(false);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [activeGroup.id, activeGroup.usesAggregateStats, replayId]);

  const activeStats = useMemo(
    () => filterStatsForGroup(stats?.stats ?? [], activeGroup),
    [activeGroup, stats],
  );
  const activeEvents = useMemo(
    () => filterEventsForGroup(events, activeGroup.terms),
    [activeGroup, events],
  );
  const ActiveDetail = activeGroup.Detail;
  const detailEvents = ActiveDetail ? events : activeEvents;

  const canReprocess = Boolean(
    replay &&
    currentUser &&
    (currentUser.is_admin || replay.uploaded_by_user_id === currentUser.id),
  );
  // A replay can be deleted by its uploader or by an admin (mirrors the backend
  // authorization on DELETE /api/v1/replays/{id}).
  const canDelete = canReprocess;

  async function handleDelete() {
    const label = replay?.original_file_name || "this replay";
    const confirmed = window.confirm(
      `Delete ${label}? This permanently removes the game and all of its stats. This cannot be undone.`,
    );
    if (!confirmed) return;
    setDeleting(true);
    setDeleteResult(null);
    try {
      await deleteReplay(replayId);
      navigate("/replays");
    } catch (err) {
      setDeleteResult({
        phase: "error",
        message: err instanceof Error ? err.message : "Delete request failed.",
      });
      setDeleting(false);
    }
  }

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

  // Reprocess using the browser's own compute: run subtr-actor WASM locally to
  // regenerate the analysis scaffold, then upload it for the server to persist.
  // Unlike the queued server reprocess, this completes synchronously and the new
  // results are live as soon as the request returns.
  async function handleReprocessLocal() {
    setReprocessingLocal(true);
    setLocalReprocessProgress(null);
    setReprocessResult({
      phase: "done",
      message: "Reprocessing locally — parsing replay in your browser…",
    });
    try {
      const { computeStatsTimelineScaffoldJson } = await import("./stats/replayModel");
      const scaffoldJson = await computeStatsTimelineScaffoldJson(
        replayId,
        setLocalReprocessProgress,
      );
      setLocalReprocessProgress({
        stage: "uploading",
        message: "Uploading regenerated analysis",
        progress: null,
      });
      await reprocessReplayClient(replayId, {
        subtrActorGitSha: __SUBTR_ACTOR_REV__,
        scaffoldJson,
      });
      setLocalReprocessProgress(null);
      setReprocessResult({
        phase: "done",
        message: "Reprocessed locally — refresh to see the regenerated analysis.",
      });
    } catch (err) {
      setLocalReprocessProgress(null);
      setReprocessResult({
        phase: "error",
        message: err instanceof Error ? err.message : "Local reprocess failed.",
      });
    } finally {
      setReprocessingLocal(false);
    }
  }

  return (
    <section className="page stats-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Game stats</p>
          <div className="replay-detail-title">
            <h1>{replay?.original_file_name || "Replay stats"}</h1>
            {replay ? <ReplayAggregateExclusionIcon replay={replay} size={18} /> : null}
          </div>
        </div>
        <div className="page-header-actions">
          {replay ? <ReplayStatusChip replay={replay} currentUser={currentUser} /> : null}
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
          {canReprocess ? (
            <button
              className="secondary-button"
              type="button"
              onClick={() => void handleReprocessLocal()}
              disabled={reprocessingLocal}
              title="Reprocess in your browser using your own compute, then upload the result"
            >
              <Cpu size={16} className={reprocessingLocal ? "spin" : undefined} />
              {reprocessingLocal ? "Reprocessing" : "Reprocess locally"}
            </button>
          ) : null}
          <a className="secondary-button" href={subtrActorPlayerUrl(replayId)}>
            <Zap size={16} />
            Player
          </a>
          {canDelete ? (
            <button
              className="secondary-button is-danger"
              type="button"
              onClick={() => void handleDelete()}
              disabled={deleting}
              title="Permanently delete this replay and all of its stats"
            >
              <Trash2 size={16} />
              {deleting ? "Deleting" : "Delete"}
            </button>
          ) : null}
          {reprocessResult ? <RequeueResultChip result={reprocessResult} /> : null}
          {deleteResult ? <RequeueResultChip result={deleteResult} /> : null}
          <LocalReprocessProgressBar progress={localReprocessProgress} />
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

      {replay && replay.viewer_can_manage ? (
        <PrivacyPanel
          visibility={replay.visibility}
          onVisibilityChange={async (next) => {
            const updated = await setReplayVisibility(replay.id, next);
            setReplay(updated);
          }}
          listShares={() => listReplayShares(replay.id)}
          addShare={(target) => addReplayShare(replay.id, target)}
          removeShare={(target) => removeReplayShare(replay.id, target)}
          currentUserId={currentUser?.id ?? null}
        />
      ) : null}

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
              <strong>{formatGameDuration(replay.summary)}</strong>
            </div>
            <div>
              <span>Date</span>
              <strong>{formatDate(replay.replay_date || replay.created_at)}</strong>
            </div>
          </div>

          <nav className="stat-group-nav" aria-label="Stat groups">
            {replayStatsSectionGroups.map((group) => {
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

            {eventsError ? (
              <ApiNotice
                label={ActiveDetail ? `${activeGroup.label} data` : "Indexed events"}
                message={eventsError}
              />
            ) : null}
            {movementSummariesError ? (
              <ApiNotice label="Movement summary" message={movementSummariesError} />
            ) : null}
            {positioningSummariesError ? (
              <ApiNotice label="Positioning summary" message={positioningSummariesError} />
            ) : null}
            {statsLoading ||
            eventsLoading ||
            movementSummariesLoading ||
            positioningSummariesLoading ? (
              <StatusLine loading error={null} />
            ) : null}

            {ActiveDetail ? (
              <ActiveDetail
                events={detailEvents}
                players={replay.players}
                durationSeconds={replay.summary.duration_seconds}
                replayId={replayId}
                movementSummaries={movementSummaries}
                positioningSummaries={positioningSummaries}
              />
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

// The participant set is every player with an aggregate block in the group (the
// `group-by=player` rows, up to 200) — not just the consistent roster, so a
// tournament group still ranks everyone. Ranks come from the replay rosters when
// available (players outside the consistent set may have none).
function buildExplorerParticipants(
  aggregates: StatAggregateSetResponse | null,
  rankByIdentity: Map<string, ReturnType<typeof statPlayerRank>>,
  groupId: string,
): LeaderboardParticipant[] {
  const out: LeaderboardParticipant[] = [];
  const seen = new Set<string>();
  for (const group of aggregates?.groups ?? []) {
    const player = group.player;
    const id = identityKey(player?.platform, player?.platform_player_id);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push({
      key: id,
      name: player?.display_name || id,
      platform: player?.platform ?? null,
      platformPlayerId: player?.platform_player_id ?? null,
      profilePath:
        player?.platform && player.platform_player_id
          ? groupScopedPlayerStatsPath(player.platform, player.platform_player_id, "core", groupId)
          : null,
      rank: rankByIdentity.get(id) ?? null,
      cohort: "player",
    });
  }
  return out;
}

// Above this many participants we skip the per-player boost fan-out (BPM / pad
// rates) — a 200-player tournament group would otherwise fire a request storm.
const GROUP_BOOST_FETCH_CAP = 40;

// One unified, searchable stat table for the whole group: pull every per-player
// metric source (flat aggregates, derived ratios, event-derived kickoffs, and
// group-scoped boost totals) and hand them to the explorer.
function GroupStatExplorerSection({
  groupId,
  players,
}: {
  groupId: string;
  players: ReplayPlayer[];
}) {
  const [aggregates, setAggregates] = useState<StatAggregateSetResponse | null>(null);
  const [aggregatesLoading, setAggregatesLoading] = useState(true);
  const [kickoffEvents, setKickoffEvents] = useState<MechanicEventResponse[]>([]);
  const [kickoffLoading, setKickoffLoading] = useState(true);
  const [goalRows, setGoalRows] = useState<GoalRow[]>([]);
  const [goalLoading, setGoalLoading] = useState(true);
  const [boost, setBoost] = useState<Map<string, PlayerBoostTotal>>(new Map());
  const [touch, setTouch] = useState<Map<string, TouchAggregateBreakdownResponse>>(new Map());
  const [auxLoading, setAuxLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Aggregates back most of the table and resolve quickly, so they aren't gated
  // behind the much larger group-events fetches (kickoff + possession, and goal
  // events — each paged up to 50k). The table appears as soon as aggregates land;
  // the kickoff / goal-tag columns show a per-column loading state until theirs
  // arrive.
  useEffect(() => {
    let cancelled = false;
    setAggregatesLoading(true);
    setKickoffLoading(true);
    setGoalLoading(true);
    setError(null);
    setAggregates(null);
    setKickoffEvents([]);
    setGoalRows([]);
    getReplayGroupPlayerAggregates(groupId, undefined, [])
      .then((response) => {
        if (!cancelled) setAggregates(response);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setAggregatesLoading(false);
      });
    listReplayGroupEvents(groupId, [...kickoffEventTypes, "possession"])
      .then((response) => {
        if (!cancelled) setKickoffEvents(response.events);
      })
      .catch(() => {
        // Leave the kickoff columns empty on failure; an aggregates error (if any)
        // already surfaces the group-level problem via the notice above.
      })
      .finally(() => {
        if (!cancelled) setKickoffLoading(false);
      });
    listReplayGroupEvents(groupId, goalEventTypes)
      .then((response) => {
        if (!cancelled) setGoalRows(buildGoalRows(response.events));
      })
      .catch(() => {
        // Leave the goal-tag columns empty on failure (same rationale as kickoff).
      })
      .finally(() => {
        if (!cancelled) setGoalLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [groupId]);

  const rankByIdentity = useMemo(() => {
    const map = new Map<string, ReturnType<typeof statPlayerRank>>();
    for (const player of players) {
      const id = identityKey(player.platform, player.platform_player_id);
      if (id && !map.has(id)) map.set(id, statPlayerRank(player));
    }
    return map;
  }, [players]);

  const participants = useMemo(
    () => buildExplorerParticipants(aggregates, rankByIdentity, groupId),
    [aggregates, rankByIdentity, groupId],
  );

  // Whether the boost/touch fan-out runs for this group: at least one resolvable
  // identity and under the request cap. Derived synchronously so the columns can
  // be emitted (and shown as loading) the moment participants are known, rather
  // than waiting on the fetch to populate the maps.
  const auxApplicable = useMemo(() => {
    const count = participants.filter(
      (participant) => participant.platform && participant.platformPlayerId,
    ).length;
    return count > 0 && count <= GROUP_BOOST_FETCH_CAP;
  }, [participants]);

  // Boost totals and the touch breakdown only exist per player (no group-by=player
  // variant), so fan out one request each per participant, scoped to the group.
  // Capped so a huge tournament group doesn't fire hundreds of requests.
  useEffect(() => {
    let cancelled = false;
    setBoost(new Map());
    setTouch(new Map());
    if (!auxApplicable) {
      setAuxLoading(false);
      return;
    }
    setAuxLoading(true);
    const identities = participants
      .map((participant) => ({
        key: participant.key,
        platform: participant.platform,
        id: participant.platformPlayerId,
      }))
      .filter((entry): entry is { key: string; platform: string; id: string } =>
        Boolean(entry.platform && entry.id),
      );
    const params = new URLSearchParams({ group: groupId });
    Promise.all(
      identities.map((entry) =>
        Promise.all([
          getPlayerBoostTotals(entry.platform, entry.id, params)
            .then((response) => response.player)
            .catch(() => null),
          getPlayerStatAggregates(
            entry.platform,
            entry.id,
            new URLSearchParams({ group: groupId }),
            ["touch"],
          )
            .then((response) => response.touch_breakdown)
            .catch(() => null),
        ]).then(([boostTotal, touchBreakdown]) => ({ key: entry.key, boostTotal, touchBreakdown })),
      ),
    )
      .then((results) => {
        if (cancelled) return;
        const boostMap = new Map<string, PlayerBoostTotal>();
        const touchMap = new Map<string, TouchAggregateBreakdownResponse>();
        for (const result of results) {
          if (result.boostTotal) boostMap.set(result.key, result.boostTotal);
          if (result.touchBreakdown) touchMap.set(result.key, result.touchBreakdown);
        }
        setBoost(boostMap);
        setTouch(touchMap);
      })
      .finally(() => {
        if (!cancelled) setAuxLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [participants, groupId, auxApplicable]);

  const kickoffSummaries = useMemo(() => {
    const map = new Map<string, PlayerKickoffSummary>();
    for (const summary of computeKickoffSummaries(kickoffEvents, players)) {
      const id = identityKey(summary.platform, summary.platform_player_id);
      if (id) map.set(id, summary);
    }
    return map;
  }, [kickoffEvents, players]);

  const goalTags = useMemo(() => buildGoalTagPlayerData(goalRows, players), [goalRows, players]);

  const metrics = useMemo(
    () =>
      buildGroupStatMetrics({
        aggregates,
        kickoffSummaries,
        boost,
        touch,
        goalTags,
        boostApplicable: auxApplicable,
        touchApplicable: auxApplicable,
      }),
    [aggregates, kickoffSummaries, boost, touch, goalTags, auxApplicable],
  );

  // Which column sources still have a fetch in flight, so the explorer can render
  // a per-column loading shimmer instead of a misleading "—" / "0".
  const loadingSources = useMemo(() => {
    const pending = new Set<string>();
    if (kickoffLoading) pending.add("kickoff");
    if (goalLoading) pending.add("goaltag");
    if (auxApplicable && auxLoading) {
      pending.add("boost");
      pending.add("touch");
    }
    return pending;
  }, [kickoffLoading, goalLoading, auxApplicable, auxLoading]);

  const truncation = aggregates?.groups_truncated ?? null;

  return (
    <>
      {error ? <ApiNotice label="Group stats" message={error} /> : null}
      {truncation ? (
        <ApiNotice
          label="Showing top players"
          message={`This group has ${truncation.total.toLocaleString()} participants, but the leaderboard is capped at the ${truncation.limit.toLocaleString()} with the most games. Players outside the top ${truncation.limit.toLocaleString()} are not shown.`}
        />
      ) : null}
      {aggregatesLoading ? <StatusLine loading error={null} /> : null}
      <GroupStatExplorer
        participants={participants}
        metrics={metrics}
        loadingSources={loadingSources}
        buildEventReviewHref={({ participant, metric }) =>
          groupStatEventReviewUrl(groupId, participant, metric)
        }
      />
    </>
  );
}

function BallchasingMirrorStatus({
  group,
  onSynced,
}: {
  group: ReplayGroupResponse;
  onSynced: () => void;
}) {
  const currentUser = useCurrentUser();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!group.ballchasing_group_id) return null;
  const status = group.ballchasing_sync_status ?? "pending";

  async function sync() {
    setBusy(true);
    setError(null);
    try {
      await syncBallchasingGroup(group.id);
      onSynced();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start sync");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ballchasing-mirror-status">
      <span className={`mirror-status-pill is-${status}`}>Ballchasing: {status}</span>
      <span className="subtle">
        Mirrors{" "}
        <a
          className="primary-link"
          href={`https://ballchasing.com/group/${group.ballchasing_group_id}`}
          target="_blank"
          rel="noreferrer"
        >
          {group.ballchasing_group_id}
        </a>
      </span>
      {group.ballchasing_synced_at ? (
        <span className="subtle">Last synced {formatDate(group.ballchasing_synced_at)}</span>
      ) : null}
      {currentUser ? (
        <button type="button" className="secondary-button" onClick={sync} disabled={busy}>
          <RefreshCw size={16} />
          {busy ? "Starting…" : "Sync now"}
        </button>
      ) : null}
      {status === "failed" && group.ballchasing_sync_error ? (
        <p className="replay-selection-feedback is-error">{group.ballchasing_sync_error}</p>
      ) : null}
      {error ? <p className="replay-selection-feedback is-error">{error}</p> : null}
    </div>
  );
}

function ReplayGroupSubgroups({
  parentGroup,
  childGroups,
  allGroups,
  onChanged,
}: {
  parentGroup: ReplayGroupResponse;
  childGroups: ReplayGroupResponse[];
  allGroups: ReplayGroupResponse[];
  onChanged: () => void;
}) {
  const currentUser = useCurrentUser();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Valid move targets exclude this group and its descendants (which would form
  // a cycle), presented in tree order so the hierarchy is legible.
  const moveTargets = useMemo(() => {
    const blocked = groupSubtreeIds(allGroups, parentGroup.id);
    return flattenGroupForest(buildGroupForest(allGroups)).filter(
      ({ group }) => !blocked.has(group.id),
    );
  }, [allGroups, parentGroup.id]);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setBusy(true);
    setError(null);
    try {
      await createReplayGroup({ name: trimmed, parent_id: parentGroup.id });
      setName("");
      setCreating(false);
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create subgroup");
    } finally {
      setBusy(false);
    }
  }

  async function handleMove(parentId: string | null) {
    setBusy(true);
    setError(null);
    try {
      await updateReplayGroup(parentGroup.id, { parent_id: parentId });
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to move group");
    } finally {
      setBusy(false);
    }
  }

  if (childGroups.length === 0 && !currentUser) return null;

  return (
    <div className="replay-group-subgroups">
      <div className="replay-group-subgroups-header">
        <h2>Subgroups</h2>
        {currentUser ? (
          <div className="button-row">
            <label className="replay-selection-group">
              <FolderOpen size={16} />
              <select
                value={parentGroup.parent_group_id ?? ""}
                onChange={(event) => handleMove(event.currentTarget.value || null)}
                disabled={busy}
                title="Nest this group under another group"
              >
                <option value="">Top level (no parent)</option>
                {moveTargets.map(({ group, depth }) => (
                  <option key={group.id} value={group.id}>
                    {`${"  ".repeat(depth)}${depth > 0 ? "└ " : ""}${group.name}`}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="link-button"
              onClick={() => setCreating((value) => !value)}
              disabled={busy}
            >
              <FolderPlus size={16} />
              New subgroup
            </button>
          </div>
        ) : null}
      </div>
      {childGroups.length > 0 ? (
        <>
          <p className="subtle">Stats below include every replay in these subgroups.</p>
          <div className="button-row replay-group-subgroup-list">
            {childGroups.map((child) => (
              <Link
                key={child.id}
                className="secondary-button"
                to={`/replay-groups/${child.id}/stats`}
              >
                <FolderOpen size={16} />
                {child.name}
                <span className="subtle"> ({child.total_replay_count.toLocaleString()})</span>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="subtle">No subgroups yet.</p>
      )}
      {creating ? (
        <form className="replay-group-subgroup-create" onSubmit={handleCreate}>
          <input
            type="text"
            value={name}
            autoFocus
            placeholder="Subgroup name"
            onChange={(event) => setName(event.currentTarget.value)}
            disabled={busy}
          />
          <button type="submit" disabled={busy || name.trim() === ""}>
            <Plus size={16} />
            Create
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              setCreating(false);
              setName("");
              setError(null);
            }}
            disabled={busy}
          >
            Cancel
          </button>
        </form>
      ) : null}
      {error ? <p className="replay-selection-feedback is-error">{error}</p> : null}
    </div>
  );
}

function ReplayGroupStatsPage() {
  const { groupId = "" } = useParams();
  const currentUser = useCurrentUser();
  const [group, setGroup] = useState<ReplayGroupResponse | null>(null);
  const [replays, setReplays] = useState<ReplayResponse[]>([]);
  const [groupLoading, setGroupLoading] = useState(true);
  const [groupError, setGroupError] = useState<string | null>(null);
  const [allGroups, setAllGroups] = useState<ReplayGroupResponse[]>([]);
  const [groupsNonce, setGroupsNonce] = useState(0);
  const refreshGroups = useCallback(() => setGroupsNonce((value) => value + 1), []);

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
  }, [groupId, groupsNonce]);

  // The full group list powers the ancestor breadcrumb and the child-subgroup
  // navigation; it is cheap and refetched when a subgroup is created.
  useEffect(() => {
    let cancelled = false;
    listReplayGroups()
      .then((response) => {
        if (!cancelled) setAllGroups(response.groups);
      })
      .catch(() => {
        if (!cancelled) setAllGroups([]);
      });
    return () => {
      cancelled = true;
    };
  }, [groupsNonce]);

  const ancestors = useMemo(() => groupAncestors(allGroups, groupId), [allGroups, groupId]);
  const childGroups = useMemo(
    () => allGroups.filter((candidate) => candidate.parent_group_id === groupId),
    [allGroups, groupId],
  );

  const participantAnalysis = useMemo(() => analyzeReplayGroupParticipants(replays), [replays]);
  const groupDurationSeconds = sumReplayDurations(replays);
  const dateRange = replayDateRange(replays);

  return (
    <section className="page stats-page replay-group-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">
            <Link className="subtle" to="/replay-groups">
              Replay groups
            </Link>
            {ancestors.map((ancestor) => (
              <Fragment key={ancestor.id}>
                {" / "}
                <Link className="subtle" to={`/replay-groups/${ancestor.id}/stats`}>
                  {ancestor.name}
                </Link>
              </Fragment>
            ))}
          </p>
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

      {group && group.viewer_can_manage ? (
        <PrivacyPanel
          visibility={group.visibility}
          onVisibilityChange={async (next) => {
            const updated = await updateReplayGroup(group.id, { visibility: next });
            setGroup(updated);
          }}
          listShares={() => listReplayGroupShares(group.id)}
          addShare={(target) => addReplayGroupShare(group.id, target)}
          removeShare={(target) => removeReplayGroupShare(group.id, target)}
          currentUserId={currentUser?.id ?? null}
        />
      ) : null}

      <StatusLine loading={groupLoading} error={groupError} />

      {group ? <BallchasingMirrorStatus group={group} onSynced={refreshGroups} /> : null}

      {group ? (
        <ReplayGroupSubgroups
          parentGroup={group}
          childGroups={childGroups}
          allGroups={allGroups}
          onChanged={refreshGroups}
        />
      ) : null}

      {group ? (
        <>
          <div className="match-context">
            <div>
              <span>Games</span>
              <strong>{replays.length.toLocaleString()}</strong>
            </div>
            <div>
              <span>Participants</span>
              <strong>
                {participantAnalysis.players.length > 0
                  ? participantAnalysis.players.length.toLocaleString()
                  : "Mixed"}
              </strong>
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

          <GroupStatExplorerSection groupId={groupId} players={participantAnalysis.players} />

          <section className="stat-panel">
            <h2>Games in group</h2>
            <div className="table-frame compact-table">
              <table className="replay-group-games-table">
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
                        <ReplayLink className="primary-link" replayId={replay.id}>
                          {replay.original_file_name || replay.id}
                        </ReplayLink>
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

const RATE_WINDOW_MINUTES = 5;

function StatRows({ title, stats }: { title: string; stats: StatAggregateResponse[] }) {
  const rows = stats.slice(0, 12);
  const rateWindowMinutes =
    rows.length > 0 && rows.every(isBoostAggregateStat) ? 1 : RATE_WINDOW_MINUTES;
  const rateColumnLabel =
    rateWindowMinutes === 1 ? "Per active min" : `Per ${rateWindowMinutes} min`;

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
                <th>{rateColumnLabel}</th>
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
                  <td>{formatNumber(ratePerWindow(stat.per_active_minute, rateWindowMinutes))}</td>
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
                  <PlayerIdentity player={player} showRank />
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
      reason:
        "At least one replay has duplicate or unidentified participants, so player-level group views are hidden.",
    };
  }

  return {
    consistent: true,
    players,
    colorSwitching,
    reason: null,
  };
}

function collectReplayGroupParticipants(replays: ReplayResponse[]): ReplayPlayer[] {
  const participants = new Map<string, MutableReplayGroupParticipant>();
  for (const replay of replays) {
    for (const player of replay.players) {
      const identity = replayPlayerIdentity(player);
      if (!identity) continue;
      const participant =
        participants.get(identity) ?? newMutableReplayGroupParticipant(identity, player);
      mergeReplayGroupParticipant(participant, player);
      participants.set(identity, participant);
    }
  }

  return [...participants.values()]
    .map(finalizeReplayGroupParticipant)
    .sort(compareReplayGroupPlayers);
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

function replayPlayerIdentity(player: ReplayPlayer): string | null {
  if (player.platform && player.platform_player_id) {
    return `${normalizeReplayPlatform(player.platform)}:${player.platform_player_id}`;
  }
  const name = player.name?.trim();
  return name ? `name:${name.toLowerCase()}` : null;
}

function newMutableReplayGroupParticipant(
  identity: string,
  player: ReplayPlayer,
): MutableReplayGroupParticipant {
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

function mergeReplayGroupParticipant(
  participant: MutableReplayGroupParticipant,
  player: ReplayPlayer,
) {
  participant.name = player.name ?? participant.name;
  participant.platform = player.platform ?? participant.platform;
  participant.platform_player_id = player.platform_player_id ?? participant.platform_player_id;
  if (player.team === 0 || player.team === 1) participant.teams.add(player.team);
  participant.appearance_count += 1;
  participant.rank_tier = player.rank_tier ?? participant.rank_tier;
  participant.rank_division = player.rank_division ?? participant.rank_division;
  participant.rank_mmr = player.rank_mmr ?? participant.rank_mmr;
  participant.rank_is_fallback = participant.rank_is_fallback || Boolean(player.rank_is_fallback);
  participant.rank_fallback_replay_date =
    player.rank_fallback_replay_date ?? participant.rank_fallback_replay_date;
  participant.is_pro = participant.is_pro || player.is_pro;
  participant.score = sumNullable(participant.score, player.score);
  participant.goals = sumNullable(participant.goals, player.goals);
  participant.assists = sumNullable(participant.assists, player.assists);
  participant.saves = sumNullable(participant.saves, player.saves);
  participant.shots = sumNullable(participant.shots, player.shots);
  participant.active_time_seconds = sumNullable(
    participant.active_time_seconds,
    player.active_time_seconds,
  );
  participant.time_demolished_seconds = sumNullable(
    participant.time_demolished_seconds,
    player.time_demolished_seconds,
  );
  participant.non_demo_active_time_seconds = sumNullable(
    participant.non_demo_active_time_seconds,
    player.non_demo_active_time_seconds,
  );
  participant.time_most_back_seconds = sumNullable(
    participant.time_most_back_seconds,
    player.time_most_back_seconds,
  );
  participant.time_most_forward_seconds = sumNullable(
    participant.time_most_forward_seconds,
    player.time_most_forward_seconds,
  );
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
  return (left.name || left.platform_player_id || "").localeCompare(
    right.name || right.platform_player_id || "",
  );
}

function groupStatEventReviewUrl(
  groupId: string,
  participant: LeaderboardParticipant,
  metric: LeaderboardMetric,
): string | null {
  if (!participant.platform || !participant.platformPlayerId || !metric.eventTypes?.length) {
    return null;
  }

  const params = new URLSearchParams({
    group: groupId,
    "player-id": `${participant.platform}:${participant.platformPlayerId}`,
    "review-status": "all",
    count: "100",
  });
  for (const eventType of metric.eventTypes) {
    params.append("event-type", eventType);
  }
  // Open the in-app embedded review player (which reads the group / player-id /
  // event-type filters from the URL) rather than /events/review/open, which
  // redirects out to the standalone subtr-actor stats player.
  return `/events/review?${params.toString()}`;
}

function normalizeReplayPlatform(value: string): string {
  const lower = value.toLowerCase();
  if (lower === "psynet") return "epic";
  if (lower === "playstation") return "ps4";
  return lower;
}

function sumNullable(
  left: number | null | undefined,
  right: number | null | undefined,
): number | null {
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

function SupplementalLoadingNotice({ label }: { label: string }) {
  return (
    <div className="api-notice loading">
      <RefreshCw size={16} className="spin" />
      <strong>{label}</strong>
      <span>Loading</span>
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

type PlayerOverviewSupplementalKey = "overviewCore" | "overviewGoalTags" | "overviewRotation";

type PlayerSupplementalKey =
  | PlayerOverviewSupplementalKey
  | "kickoffTaker"
  | "kickoffSupport"
  | "kickoffFilter"
  | "movementSummary"
  | "possession"
  | "positioningSummary"
  | "rankBenchmark";

type PlayerSupplementalLoadedState = {
  scope: string;
  loaded: Partial<Record<PlayerSupplementalKey, boolean>>;
};

type PlayerSupplementalLoadingState = {
  scope: string;
  loading: Partial<Record<PlayerSupplementalKey, boolean>>;
};

type PlayerSupplementalErrorState = {
  scope: string;
  errors: Partial<Record<PlayerSupplementalKey, string>>;
};

function PlayerStatsPage({ view = "stats" }: { view?: "stats" | "timeline" } = {}) {
  const { platform = "", platformPlayerId, playerName, statGroup } = useParams();
  const isTimelineView = view === "timeline";
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const routePlayerRef = platformPlayerId ?? playerName ?? "";
  const routeUsesExplicitId = platformPlayerId != null;
  const routeBasePath = routeUsesExplicitId
    ? playerProfileIdPath(platform, routePlayerRef)
    : `/players/${encodeURIComponent(platform)}/${encodeURIComponent(routePlayerRef)}`;
  const [playerSummary, setPlayerSummary] = useState<PlayerProfileResponse | null>(null);
  const resolvedPlatform = playerSummary?.platform ?? platform;
  const resolvedPlatformPlayerId =
    playerSummary?.platform_player_id ?? (routeUsesExplicitId ? routePlayerRef : "");
  const hasResolvedPlayer = resolvedPlatform.length > 0 && resolvedPlatformPlayerId.length > 0;
  const playerStatsSearchParams = useMemo(
    () => playerStatsRequestSearchParams(location.search),
    [location.search],
  );
  const playerStatsSearch = playerStatsSearchParams.toString();
  const statsScope = useMemo(
    () => `${resolvedPlatform}\n${resolvedPlatformPlayerId}\n${playerStatsSearch}`,
    [playerStatsSearch, resolvedPlatform, resolvedPlatformPlayerId],
  );
  const playerReplayParams = useMemo(
    () => playerReplaySetParams(resolvedPlatform, resolvedPlatformPlayerId, playerStatsSearch),
    [playerStatsSearch, resolvedPlatform, resolvedPlatformPlayerId],
  );
  const activeGroup = useMemo(
    () => statGroupById(statGroup, playerStatsSectionGroups) ?? playerStatsSectionGroups[0]!,
    [statGroup],
  );
  // Mirror the section + segment filters in the address bar so the current view
  // is always shareable, even before the first nav click writes them explicitly.
  useEffect(() => {
    // The timeline view has its own URL shape (no /stats/<group> segment).
    if (isTimelineView) return;
    const canonical = canonicalPlayerStatsPath(routeBasePath, activeGroup.id, location.search);
    const current = `${location.pathname}${location.search}`;
    if (current !== canonical) {
      navigate(canonical, { replace: true });
    }
  }, [activeGroup.id, isTimelineView, location.pathname, location.search, navigate, routeBasePath]);
  // When reached via a replay-group leaderboard drill-down, the `group` param is
  // already threaded into every stat fetch (so the numbers are group-scoped);
  // resolve the group here only to label the banner + offer a way back.
  const groupScopeId = playerStatsSearchParams.get("group");
  const [groupScope, setGroupScope] = useState<ReplayGroupResponse | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (!groupScopeId) {
      setGroupScope(null);
      return;
    }
    getReplayGroup(groupScopeId)
      .then((response) => {
        if (!cancelled) setGroupScope(response);
      })
      .catch(() => {
        if (!cancelled) setGroupScope(null);
      });
    return () => {
      cancelled = true;
    };
  }, [groupScopeId]);
  const [statsByGroup, setStatsByGroup] = useState<PlayerStatsByGroupState>({
    scope: "",
    groups: {},
  });
  const [overviews, setOverviews] = useState<
    Partial<Record<PlayerOverviewSupplementalKey, PlayerStatOverviewResponse>>
  >({});
  const [kickoffTakerSummary, setKickoffTakerSummary] = useState<EventStatSummaryResponse | null>(
    null,
  );
  const [kickoffSupportSummary, setKickoffSupportSummary] =
    useState<EventStatSummaryResponse | null>(null);
  const [kickoffFilterSummary, setKickoffFilterSummary] = useState<EventStatSummaryResponse | null>(
    null,
  );
  const [movementSummary, setMovementSummary] = useState<MovementSummaryResponse | null>(null);
  const [possessionSummary, setPossessionSummary] = useState<PossessionSummaryResponse | null>(
    null,
  );
  const [positioningSummary, setPositioningSummary] = useState<PositioningSummaryResponse | null>(
    null,
  );
  const [rankBenchmarkCohorts, setRankBenchmarkCohorts] =
    useState<RankBenchmarkCohortsResponse | null>(null);
  const [supplementalLoaded, setSupplementalLoaded] = useState<PlayerSupplementalLoadedState>({
    scope: "",
    loaded: {},
  });
  const [supplementalLoading, setSupplementalLoading] = useState<PlayerSupplementalLoadingState>({
    scope: "",
    loading: {},
  });
  const [supplementalErrors, setSupplementalErrors] = useState<PlayerSupplementalErrorState>({
    scope: "",
    errors: {},
  });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const scopedStatsByGroup = statsByGroup.scope === statsScope ? statsByGroup.groups : {};
  const stats = scopedStatsByGroup[activeGroup.id] ?? null;
  const overview = playerOverviewForGroup(activeGroup.id, overviews);
  const scopedSupplementalLoaded =
    supplementalLoaded.scope === statsScope ? supplementalLoaded.loaded : {};
  const scopedSupplementalLoading =
    supplementalLoading.scope === statsScope ? supplementalLoading.loading : {};
  const scopedSupplementalErrors =
    supplementalErrors.scope === statsScope ? supplementalErrors.errors : {};
  const activeSupplementalKeys = useMemo(
    () => playerSupplementalKeysForGroup(activeGroup.id),
    [activeGroup.id],
  );
  const activeSupplementalKeyList = activeSupplementalKeys.join("|");
  const activeSupplementalLoading = activeSupplementalKeys.some(
    (key) => scopedSupplementalLoading[key],
  );
  const activeSupplementalError =
    activeSupplementalKeys.map((key) => scopedSupplementalErrors[key]).find(Boolean) ?? null;
  const rlTrackerPlayerName =
    playerSummary?.display_name ??
    playerSummary?.current_display_name ??
    playerSummary?.public_display_name ??
    null;
  const resolvedPlayerDisplayName =
    playerSummary?.display_name ??
    playerSummary?.current_display_name ??
    playerSummary?.public_display_name ??
    routePlayerRef;
  const rlTrackerUrl = useMemo(
    () => rlTrackerPlayerUrl(resolvedPlatform, resolvedPlatformPlayerId, rlTrackerPlayerName),
    [resolvedPlatform, resolvedPlatformPlayerId, rlTrackerPlayerName],
  );
  const ballchasingUrl = useMemo(
    () => ballchasingPlayerUrl(resolvedPlatform, resolvedPlatformPlayerId, rlTrackerPlayerName),
    [resolvedPlatform, resolvedPlatformPlayerId, rlTrackerPlayerName],
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPlayerSummary(null);
    const request = routeUsesExplicitId ? getPlayerProfile : getPlayerProfileByRef;
    request(platform, routePlayerRef, playerStatsSearchParams)
      .catch((err: Error) => {
        // The profile endpoint 404s when the filtered replay set is empty, so
        // a period with no games (e.g. "Day" before today's first session)
        // would blank the whole page — including the period selector needed to
        // escape it. Fall back to the period-unscoped profile and let the stat
        // panels render their zero states.
        if (!playerStatsSearchParams.has("period")) throw err;
        const unscoped = new URLSearchParams(playerStatsSearchParams);
        unscoped.delete("period");
        unscoped.delete("replay-date-after");
        unscoped.delete("replay-date-before");
        unscoped.delete("min-season");
        unscoped.delete("max-season");
        return request(platform, routePlayerRef, unscoped);
      })
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
  }, [platform, playerStatsSearchParams, routePlayerRef, routeUsesExplicitId]);

  useEffect(() => {
    setStatsByGroup({ scope: statsScope, groups: {} });
    setSupplementalLoaded({ scope: statsScope, loaded: {} });
    setSupplementalLoading({ scope: statsScope, loading: {} });
    setSupplementalErrors({ scope: statsScope, errors: {} });
    setStatsError(null);
    setStatsLoading(true);
    setOverviews({});
    setKickoffTakerSummary(null);
    setKickoffSupportSummary(null);
    setKickoffFilterSummary(null);
    setMovementSummary(null);
    setPossessionSummary(null);
    setPositioningSummary(null);
    setRankBenchmarkCohorts(null);
  }, [statsScope]);

  useEffect(() => {
    let cancelled = false;
    if (!hasResolvedPlayer || isTimelineView) {
      setStatsLoading(false);
      setStatsError(null);
      return () => {
        cancelled = true;
      };
    }
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
      resolvedPlatform,
      resolvedPlatformPlayerId,
      playerAggregateSearchParams(activeGroup.id, playerStatsSearch),
      activeGroup.terms,
      playerAggregateRequestOptions(activeGroup.id),
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
  }, [
    activeGroup,
    hasResolvedPlayer,
    isTimelineView,
    playerStatsSearch,
    resolvedPlatform,
    resolvedPlatformPlayerId,
    stats,
    statsScope,
  ]);

  function applySupplementalResponse(
    key: PlayerSupplementalKey,
    response:
      | PlayerStatOverviewResponse
      | EventStatSummaryResponse
      | MovementSummaryResponse
      | PossessionSummaryResponse
      | PositioningSummaryResponse
      | RankBenchmarkCohortsResponse,
  ) {
    if (isPlayerOverviewSupplementalKey(key)) {
      setOverviews((current) => ({
        ...current,
        [key]: response as PlayerStatOverviewResponse,
      }));
    } else if (key === "kickoffTaker") {
      setKickoffTakerSummary(response as EventStatSummaryResponse);
    } else if (key === "kickoffSupport") {
      setKickoffSupportSummary(response as EventStatSummaryResponse);
    } else if (key === "kickoffFilter") {
      setKickoffFilterSummary(response as EventStatSummaryResponse);
    } else if (key === "movementSummary") {
      setMovementSummary(response as MovementSummaryResponse);
    } else if (key === "possession") {
      setPossessionSummary(response as PossessionSummaryResponse);
    } else if (key === "rankBenchmark") {
      setRankBenchmarkCohorts(response as RankBenchmarkCohortsResponse);
    } else {
      setPositioningSummary(response as PositioningSummaryResponse);
    }
  }

  function markSupplementalLoaded(key: PlayerSupplementalKey) {
    setSupplementalLoaded((current) => {
      const loaded = current.scope === statsScope ? current.loaded : {};
      return { scope: statsScope, loaded: { ...loaded, [key]: true } };
    });
  }

  function markSupplementalLoading(key: PlayerSupplementalKey, loading: boolean) {
    setSupplementalLoading((current) => {
      const currentLoading = current.scope === statsScope ? current.loading : {};
      return {
        scope: statsScope,
        loading: { ...currentLoading, [key]: loading },
      };
    });
  }

  function markSupplementalError(key: PlayerSupplementalKey, message: string | null) {
    setSupplementalErrors((current) => {
      const errors = current.scope === statsScope ? current.errors : {};
      const nextErrors = { ...errors };
      if (message) {
        nextErrors[key] = message;
      } else {
        delete nextErrors[key];
      }
      return { scope: statsScope, errors: nextErrors };
    });
  }

  useEffect(() => {
    const missingKeys = activeSupplementalKeys.filter(
      (key) => !scopedSupplementalLoaded[key] && !scopedSupplementalLoading[key],
    );
    if (!hasResolvedPlayer || isTimelineView) return;
    if (missingKeys.length === 0) return;

    let cancelled = false;
    for (const key of missingKeys) {
      markSupplementalLoading(key, true);
      markSupplementalError(key, null);
      fetchPlayerSupplemental(
        key,
        activeGroup.id,
        resolvedPlatform,
        resolvedPlatformPlayerId,
        playerStatsSearch,
      )
        .then((response) => {
          if (!cancelled) applySupplementalResponse(key, response);
        })
        .catch((err: unknown) => {
          if (!cancelled) {
            markSupplementalError(
              key,
              err instanceof Error ? err.message : "Failed to load supplemental stats.",
            );
          }
        })
        .finally(() => {
          if (!cancelled) {
            markSupplementalLoaded(key);
            markSupplementalLoading(key, false);
          }
        });
    }

    return () => {
      cancelled = true;
    };
  }, [
    activeGroup.id,
    activeSupplementalKeyList,
    hasResolvedPlayer,
    isTimelineView,
    playerStatsSearch,
    resolvedPlatform,
    resolvedPlatformPlayerId,
    statsScope,
  ]);

  return (
    <section className="page player-stats-page">
      <header className="page-header">
        <div>
          {groupScopeId ? (
            <p className="eyebrow">
              <Link
                className="primary-link"
                to={`/replay-groups/${encodeURIComponent(groupScopeId)}/stats/${activeGroup.id}`}
              >
                ← {groupScope?.name ?? "Replay group"}
              </Link>
              <span className="eyebrow-scope-note"> · stats scoped to this group</span>
            </p>
          ) : (
            <p className="eyebrow">Player stats</p>
          )}
          <h1 className="player-profile-title">
            {playerSummary ? (
              <PlatformIcon
                platform={playerSummary.platform}
                platformPlayerId={playerSummary.platform_player_id}
                rlTrackerPlayerName={rlTrackerPlayerName}
                linkToRlTracker
              />
            ) : null}
            <span>{resolvedPlayerDisplayName}</span>
          </h1>
        </div>
        <div className="button-row">
          {hasResolvedPlayer && rlTrackerUrl ? (
            <a
              className="secondary-button"
              href={rlTrackerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalSiteLogo site="trn" />
              TRN
            </a>
          ) : null}
          {hasResolvedPlayer && ballchasingUrl ? (
            <a
              className="secondary-button"
              href={ballchasingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalSiteLogo site="ballchasing" />
              Ballchasing
            </a>
          ) : null}
          {hasResolvedPlayer ? (
            <Link className="secondary-button" to={`/replays?${playerReplayParams.toString()}`}>
              <FileVideo size={16} />
              Replays
            </Link>
          ) : null}
          {hasResolvedPlayer ? (
            <PlayerFavoriteButton
              enabled={currentUser != null}
              platform={resolvedPlatform}
              platformPlayerId={resolvedPlatformPlayerId}
            />
          ) : null}
          {playerSummary ? (
            <PlayerModerationControls
              currentUser={currentUser}
              player={playerSummary}
              onPlayerChange={setPlayerSummary}
            />
          ) : null}
        </div>
      </header>
      {playerSummary && playerSummary.viewer_can_manage ? (
        <PrivacyPanel
          visibility={playerSummary.visibility}
          onVisibilityChange={async (next) => {
            await setPlayerStatsVisibility(
              playerSummary.platform,
              playerSummary.platform_player_id,
              next,
            );
            setPlayerSummary({ ...playerSummary, visibility: next });
          }}
          listShares={() =>
            listPlayerStatsShares(playerSummary.platform, playerSummary.platform_player_id)
          }
          addShare={(target) =>
            addPlayerStatsShare(playerSummary.platform, playerSummary.platform_player_id, target)
          }
          removeShare={(target) =>
            removePlayerStatsShare(playerSummary.platform, playerSummary.platform_player_id, target)
          }
          currentUserId={currentUser?.id ?? null}
        />
      ) : null}
      <StatusLine loading={loading} error={error} />
      {playerSummary ? (
        <>
          <div className="summary-grid">
            <div className="metric">
              <span>Replays</span>
              <strong className="metric-with-action">
                {playerSummary.replay_count.toLocaleString()}
                <Link
                  className="metric-action-chip"
                  to={`/replays?${playerReplayParams.toString()}`}
                  title="View player replays"
                >
                  <FileVideo size={14} />
                </Link>
              </strong>
            </div>
            <Metric label="Active" value={formatDuration(stats?.active_time_seconds ?? null)} />
            <Metric label="First seen" value={formatShortDate(playerSummary.first_seen_at)} />
            <Metric label="Last seen" value={formatShortDate(playerSummary.last_seen_at)} />
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
          {playerSummary.tags.length > 0 ? (
            <div className="player-tag-chips">
              {playerSummary.tags.map((tag) => (
                <span
                  key={tag.tag}
                  className={tag.exclude_from_aggregates ? "is-excluding" : undefined}
                  title={tag.note ?? undefined}
                >
                  {humanizeSlug(tag.tag)}
                  {tag.exclude_from_aggregates ? " · excluded" : ""}
                </span>
              ))}
            </div>
          ) : null}

          <PlayerStatsSegmentBar rankBenchmark={rankBenchmarkCohorts} />
          {hasResolvedPlayer ? (
            <PlayerPeriodSelect
              platform={resolvedPlatform}
              platformPlayerId={resolvedPlatformPlayerId}
              routeBasePath={routeBasePath}
              requestSearch={playerStatsSearch}
              onTimeline={isTimelineView}
            />
          ) : null}
          {isTimelineView ? (
            <>
              <PlayerStatSectionsNav
                routeBasePath={routeBasePath}
                search={location.search}
                activeId="timeline"
              />
              {hasResolvedPlayer ? (
                <PlayerTimelineSection
                  platform={resolvedPlatform}
                  platformPlayerId={resolvedPlatformPlayerId}
                  routeBasePath={routeBasePath}
                  requestSearch={playerStatsSearch}
                  search={location.search}
                />
              ) : null}
            </>
          ) : null}
          {!isTimelineView ? <StatusLine loading={statsLoading} error={null} /> : null}
          {statsError ? <ApiNotice label="Player stats" message={statsError} /> : null}
          {!isTimelineView && stats ? (
            <PlayerAggregateStatsSections
              activeGroup={activeGroup}
              kickoffFilterSummary={kickoffFilterSummary}
              kickoffSupportSummary={kickoffSupportSummary}
              kickoffTakerSummary={kickoffTakerSummary}
              movementSummary={movementSummary}
              possessionSummary={possessionSummary}
              positioningSummary={positioningSummary}
              rankBenchmarkCohorts={rankBenchmarkCohorts}
              supplementalError={activeSupplementalError}
              supplementalLoading={activeSupplementalLoading}
              overview={overview}
              platform={resolvedPlatform}
              platformPlayerId={resolvedPlatformPlayerId}
              playerName={resolvedPlayerDisplayName}
              routeBasePath={routeBasePath}
              search={location.search}
              stats={stats}
            />
          ) : null}
        </>
      ) : null}
    </section>
  );
}

function PlayerModerationControls({
  currentUser,
  player,
  onPlayerChange,
}: {
  currentUser: CurrentUserResponse | null;
  player: PlayerProfileResponse;
  onPlayerChange: (player: PlayerProfileResponse) => void;
}) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const smurfTag = player.tags.find((tag) => tag.tag === "smurf");

  async function reportSmurf() {
    setPending(true);
    setMessage(null);
    try {
      await reportPlayerIdentity(player.platform, player.platform_player_id, {
        report_type: "smurf",
      });
      setMessage("Smurf report submitted.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to report player.");
    } finally {
      setPending(false);
    }
  }

  async function toggleSmurfTag() {
    setPending(true);
    setMessage(null);
    try {
      if (smurfTag) {
        await deletePlayerIdentityTag(player.platform, player.platform_player_id, "smurf");
        onPlayerChange({
          ...player,
          tags: player.tags.filter((tag) => tag.tag !== "smurf"),
        });
        setMessage("Smurf tag removed.");
      } else {
        const tag = await setPlayerIdentityTag(
          player.platform,
          player.platform_player_id,
          "smurf",
          {
            exclude_from_aggregates: true,
          },
        );
        onPlayerChange({
          ...player,
          tags: upsertPlayerTag(player.tags, tag),
        });
        setMessage("Smurf tag applied.");
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to update player tag.");
    } finally {
      setPending(false);
    }
  }

  if (!currentUser) return null;

  return (
    <div className="player-moderation-controls">
      {currentUser.is_admin ? (
        <button
          className={`secondary-button ${smurfTag ? "is-danger" : ""}`.trim()}
          type="button"
          disabled={pending}
          onClick={toggleSmurfTag}
          title={
            smurfTag
              ? "Remove the smurf tag and restore aggregate eligibility after benchmark refresh"
              : "Mark this player as a smurf and exclude them from aggregate leaderboards"
          }
        >
          <AlertTriangle size={16} />
          {smurfTag ? "Unmark smurf" : "Mark smurf"}
        </button>
      ) : (
        <button type="button" disabled={pending} onClick={reportSmurf}>
          <AlertTriangle size={16} />
          Report smurf
        </button>
      )}
      {message ? <span className="player-moderation-message">{message}</span> : null}
    </div>
  );
}

function upsertPlayerTag(tags: PlayerIdentityTag[], next: PlayerIdentityTag): PlayerIdentityTag[] {
  const existing = tags.findIndex((tag) => tag.tag === next.tag);
  if (existing < 0) return [...tags, next].sort((a, b) => a.tag.localeCompare(b.tag));
  return tags.map((tag, index) => (index === existing ? next : tag));
}

function humanizeSlug(value: string): string {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function playerReplaySetParams(
  platform: string,
  platformPlayerId: string,
  search: string,
): URLSearchParams {
  const params = stripKickoffSpawnParams(new URLSearchParams(search));
  params.delete("offset");
  params.set("player-id", `${platform}:${platformPlayerId}`);
  return params;
}

function ExternalSiteLogo({ site }: { site: "trn" | "ballchasing" }) {
  const logo =
    site === "trn"
      ? {
          src: "https://cdn-1.webcatalog.io/catalog/tracker-network/tracker-network-icon-filled-256.png?v=1780880112878",
          className: "external-site-logo-trn",
          label: "Tracker Network",
        }
      : {
          src: "https://ballchasing.com/static/logo-sm.png",
          className: "external-site-logo-ballchasing",
          label: "ballchasing.com",
        };
  return (
    <img
      className={`external-site-logo ${logo.className}`}
      src={logo.src}
      alt=""
      title={logo.label}
    />
  );
}

// The player timeline URL, dropping any active period scope (the timeline has
// its own timeframe selector; carrying a period's date/season bounds over would
// invisibly clip the chart).
function playerTimelinePath(routeBasePath: string, search: string): string {
  const params = stripKickoffSpawnParams(new URLSearchParams(search));
  if (params.has("period")) {
    params.delete("period");
    params.delete("replay-date-after");
    params.delete("replay-date-before");
    params.delete("min-season");
    params.delete("max-season");
  }
  const query = params.toString();
  return `${routeBasePath}/timeline${query ? `?${query}` : ""}`;
}

// The stat-section tabs shared by the career stats pages and the timeline tab.
function PlayerStatSectionsNav({
  routeBasePath,
  search,
  activeId,
}: {
  routeBasePath: string;
  search: string;
  activeId: string;
}) {
  return (
    <nav className="stat-group-nav" aria-label="Player stat sections">
      {playerStatsSectionGroups.map((group) => {
        const GroupIcon = group.icon;
        return (
          <Link
            key={group.id}
            className={`stat-group-link ${group.id === activeId ? "active" : ""}`}
            to={playerStatGroupPath(routeBasePath, group.id, search)}
          >
            <GroupIcon size={16} />
            <span>{group.label}</span>
          </Link>
        );
      })}
      <Link
        className={`stat-group-link ${activeId === "timeline" ? "active" : ""}`}
        to={playerTimelinePath(routeBasePath, search)}
      >
        <History size={16} />
        <span>Timeline</span>
      </Link>
    </nav>
  );
}

function playerStatGroupPath(routeBasePath: string, groupId: string, search: string): string {
  const params = new URLSearchParams(search);
  if (groupId !== "kickoffs") {
    stripKickoffSpawnParams(params);
  }
  const query = params.toString();
  const path = `${routeBasePath}/stats/${encodeURIComponent(groupId)}`;
  return query ? `${path}?${query}` : path;
}

function stripKickoffSpawnParams(params: URLSearchParams): URLSearchParams {
  params.delete("kickoff-shape");
  params.delete("kickoff_shape");
  params.delete("kickoff-side");
  params.delete("kickoff_side");
  return params;
}

// The fully explicit URL for the section + segment filters currently in view.
// The section nav and segment bar already write these on interaction, but the
// initial render falls back to implicit defaults (e.g. Core / 2v2 / Ranked with
// a bare `…/stats` URL). Normalizing to this path keeps the address bar an exact
// mirror of what's on screen, so any view is shareable from first load.
function canonicalPlayerStatsPath(routeBasePath: string, groupId: string, search: string): string {
  const params = new URLSearchParams(search);
  if (groupId !== "kickoffs") {
    stripKickoffSpawnParams(params);
  }
  const teamSize = playerSegmentValue(params, "team-size");
  params.set("team-size", teamSize === "" ? allPlayerTeamSizes : teamSize);
  const gameType = playerSegmentValue(params, "game-type");
  params.set("game-type", gameType === "" ? anyPlayerGameType : gameType);
  const query = params.toString();
  const path = `${routeBasePath}/stats/${encodeURIComponent(groupId)}`;
  return query ? `${path}?${query}` : path;
}

// Drill-down from a replay group into a player's group-scoped career view. The
// `group` filter restricts every stat fetch to the group's replays; team-size
// and game-type are pinned to all/any so the career view's usual 2v2/ranked
// defaults don't hide a group whose games are a different mode.
function groupScopedPlayerStatsPath(
  platform: string,
  platformPlayerId: string,
  statGroup: string,
  groupId: string,
): string {
  const params = new URLSearchParams({
    group: groupId,
    "team-size": allPlayerTeamSizes,
    "game-type": anyPlayerGameType,
  });
  return `${playerStatProfileIdPath(platform, platformPlayerId, statGroup)}?${params.toString()}`;
}

function playerAggregateSearchParams(groupId: string, search: string): URLSearchParams {
  const params = new URLSearchParams(search);
  return groupId === "kickoffs" ? params : stripKickoffSpawnParams(params);
}

function playerAggregateRequestOptions(groupId: string): {
  includeRotationHistogram: boolean;
} {
  return {
    includeRotationHistogram: groupId === "positioning" || groupId === "rotation",
  };
}

function kickoffShapeFilterFromSearch(search: string): KickoffShapeFilter {
  const value = new URLSearchParams(search).get("kickoff-shape");
  return value === "diagonal" || value === "center_offset" || value === "center" ? value : "all";
}

function kickoffSideFilterFromSearch(search: string): KickoffSideFilter {
  const value = new URLSearchParams(search).get("kickoff-side");
  return value === "left" || value === "right" ? value : "all";
}

const playerOverviewSupplementalKeys = [
  "overviewCore",
  "overviewGoalTags",
  "overviewRotation",
] as const;

function isPlayerOverviewSupplementalKey(
  key: PlayerSupplementalKey,
): key is PlayerOverviewSupplementalKey {
  return (playerOverviewSupplementalKeys as readonly string[]).includes(key);
}

function overviewSupplementalKeyForGroup(groupId: string): PlayerOverviewSupplementalKey | null {
  if (groupId === "goals") {
    return "overviewGoalTags";
  }
  if (groupId === "positioning" || groupId === "rotation") {
    return "overviewRotation";
  }
  if (groupId === "core") {
    return "overviewCore";
  }
  return null;
}

function playerOverviewForGroup(
  groupId: string,
  overviews: Partial<Record<PlayerOverviewSupplementalKey, PlayerStatOverviewResponse>>,
): PlayerStatOverviewResponse | null {
  const key = overviewSupplementalKeyForGroup(groupId);
  if (!key) return null;
  if (key === "overviewCore") {
    return (
      overviews.overviewCore ?? overviews.overviewGoalTags ?? overviews.overviewRotation ?? null
    );
  }
  return overviews[key] ?? null;
}

function playerSupplementalKeysForGroup(groupId: string): PlayerSupplementalKey[] {
  const overviewKey = overviewSupplementalKeyForGroup(groupId);
  const keys = playerSupplementalBaseKeysForGroup(groupId, overviewKey);
  // The rank-average cohorts back the rate cards (every non-kickoff group) and
  // the movement/boost/possession/positioning cohort charts, so fetch them for
  // any group that renders those. Kickoffs has no rate cards. Gated centrally so
  // the provisional cohort can be disabled in one place (AGENTS.md).
  if (rankAverageEnabled() && groupId !== "kickoffs") {
    keys.push("rankBenchmark");
  }
  return keys;
}

function playerSupplementalBaseKeysForGroup(
  groupId: string,
  overviewKey: PlayerOverviewSupplementalKey | null,
): PlayerSupplementalKey[] {
  if (groupId === "core" && overviewKey) {
    return [overviewKey];
  }
  if (groupId === "movement") {
    return ["movementSummary"];
  }
  if (groupId === "positioning") {
    // overview backs the rotation time-share panel; positioningSummary backs the
    // You/Teammates/Opponents comparison graphs.
    return overviewKey ? [overviewKey, "positioningSummary"] : ["positioningSummary"];
  }
  if ((groupId === "goals" || groupId === "rotation") && overviewKey) {
    return [overviewKey];
  }
  if (groupId === "kickoffs") {
    return ["kickoffTaker", "kickoffSupport", "kickoffFilter"];
  }
  if (groupId === "possession" || groupId === "possession-territory") {
    return ["possession"];
  }
  return [];
}

function fetchPlayerSupplemental(
  key: PlayerSupplementalKey,
  _groupId: string,
  platform: string,
  platformPlayerId: string,
  search: string,
): Promise<
  | PlayerStatOverviewResponse
  | EventStatSummaryResponse
  | MovementSummaryResponse
  | PossessionSummaryResponse
  | PositioningSummaryResponse
  | RankBenchmarkCohortsResponse
> {
  const params = new URLSearchParams(search);
  if (isPlayerOverviewSupplementalKey(key)) {
    params.set("include-goal-tags", String(key === "overviewGoalTags"));
    params.set("include-rotation", String(key === "overviewRotation"));
    return getPlayerStatOverview(platform, platformPlayerId, params);
  }
  if (key === "kickoffTaker") {
    return getPlayerKickoffSummary(platform, platformPlayerId, params, "taker");
  }
  if (key === "kickoffSupport") {
    return getPlayerKickoffSummary(platform, platformPlayerId, params, "support");
  }
  if (key === "kickoffFilter") {
    // This summary powers the spawn-shape controls. Keep it role-neutral so
    // support appearances still contribute to the available kickoff types; the
    // taker/support panels above fetch their own role-scoped summaries.
    return getPlayerKickoffSummary(platform, platformPlayerId, stripKickoffSpawnParams(params));
  }
  if (key === "positioningSummary") {
    return getPlayerPositioningSummary(platform, platformPlayerId, params);
  }
  if (key === "movementSummary") {
    return getPlayerMovementSummary(platform, platformPlayerId, params);
  }
  if (key === "rankBenchmark") {
    return getRankBenchmarkCohorts(platform, platformPlayerId, params);
  }
  return getPlayerPossessionSummary(platform, platformPlayerId, params);
}

type PlayerStatsOutcomeKey = "wins" | "losses";

type PlayerStatsOutcomeBundle = {
  key: PlayerStatsOutcomeKey;
  label: string;
  stats: StatAggregateSetResponse | null;
  overview: PlayerStatOverviewResponse | null;
  kickoffTakerSummary: EventStatSummaryResponse | null;
  kickoffSupportSummary: EventStatSummaryResponse | null;
  kickoffFilterSummary: EventStatSummaryResponse | null;
  movementSummary: MovementSummaryResponse | null;
  possessionSummary: PossessionSummaryResponse | null;
  positioningSummary: PositioningSummaryResponse | null;
  rankBenchmarkCohorts: RankBenchmarkCohortsResponse | null;
  search: string;
};

type PlayerStatsOutcomeLoadState = {
  bundles: PlayerStatsOutcomeBundle[];
  loading: boolean;
  error: string | null;
};

const playerOutcomeOptions: Array<{
  key: PlayerStatsOutcomeKey;
  label: string;
  queryValue: "win" | "loss";
}> = [
  { key: "wins", label: "Wins", queryValue: "win" },
  { key: "losses", label: "Losses", queryValue: "loss" },
];

function emptyPlayerStatsOutcomeBundle(
  key: PlayerStatsOutcomeKey,
  label: string,
  search: string,
): PlayerStatsOutcomeBundle {
  return {
    key,
    label,
    stats: null,
    overview: null,
    kickoffTakerSummary: null,
    kickoffSupportSummary: null,
    kickoffFilterSummary: null,
    movementSummary: null,
    possessionSummary: null,
    positioningSummary: null,
    rankBenchmarkCohorts: null,
    search,
  };
}

function bundleWithSupplementalResponse(
  bundle: PlayerStatsOutcomeBundle,
  key: PlayerSupplementalKey,
  response:
    | PlayerStatOverviewResponse
    | EventStatSummaryResponse
    | MovementSummaryResponse
    | PossessionSummaryResponse
    | PositioningSummaryResponse
    | RankBenchmarkCohortsResponse,
): PlayerStatsOutcomeBundle {
  if (isPlayerOverviewSupplementalKey(key)) {
    return { ...bundle, overview: response as PlayerStatOverviewResponse };
  }
  if (key === "kickoffTaker") {
    return { ...bundle, kickoffTakerSummary: response as EventStatSummaryResponse };
  }
  if (key === "kickoffSupport") {
    return { ...bundle, kickoffSupportSummary: response as EventStatSummaryResponse };
  }
  if (key === "kickoffFilter") {
    return { ...bundle, kickoffFilterSummary: response as EventStatSummaryResponse };
  }
  if (key === "movementSummary") {
    return { ...bundle, movementSummary: response as MovementSummaryResponse };
  }
  if (key === "possession") {
    return { ...bundle, possessionSummary: response as PossessionSummaryResponse };
  }
  if (key === "rankBenchmark") {
    return { ...bundle, rankBenchmarkCohorts: response as RankBenchmarkCohortsResponse };
  }
  return { ...bundle, positioningSummary: response as PositioningSummaryResponse };
}

function usePlayerOutcomeStatBundles({
  activeGroup,
  enabled,
  platform,
  platformPlayerId,
  search,
}: {
  activeGroup: StatGroup;
  enabled: boolean;
  platform: string;
  platformPlayerId: string;
  search: string;
}): PlayerStatsOutcomeLoadState {
  const [state, setState] = useState<PlayerStatsOutcomeLoadState>({
    bundles: [],
    loading: false,
    error: null,
  });
  const supplementalKeys = useMemo(
    () => playerSupplementalKeysForGroup(activeGroup.id),
    [activeGroup.id],
  );
  const supplementalKeyList = supplementalKeys.join("|");

  useEffect(() => {
    let cancelled = false;
    if (!enabled) {
      setState({ bundles: [], loading: false, error: null });
      return () => {
        cancelled = true;
      };
    }

    setState({ bundles: [], loading: true, error: null });
    Promise.all(
      playerOutcomeOptions.map(async (option) => {
        const outcomeSearch = searchWithPlayerOutcome(search, option.queryValue);
        let bundle = emptyPlayerStatsOutcomeBundle(option.key, option.label, outcomeSearch);
        const stats = await getPlayerStatAggregates(
          platform,
          platformPlayerId,
          playerAggregateSearchParams(activeGroup.id, outcomeSearch),
          activeGroup.terms,
          playerAggregateRequestOptions(activeGroup.id),
        );
        bundle = { ...bundle, stats };
        const supplementalResponses = await Promise.all(
          supplementalKeys.map(async (key) => ({
            key,
            response: await fetchPlayerSupplemental(
              key,
              activeGroup.id,
              platform,
              platformPlayerId,
              outcomeSearch,
            ),
          })),
        );
        for (const { key, response } of supplementalResponses) {
          bundle = bundleWithSupplementalResponse(bundle, key, response);
        }
        return bundle;
      }),
    )
      .then((bundles) => {
        if (!cancelled) setState({ bundles, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            bundles: [],
            loading: false,
            error: err instanceof Error ? err.message : "Failed to load win/loss stats.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    activeGroup,
    enabled,
    platform,
    platformPlayerId,
    search,
    supplementalKeyList,
    supplementalKeys,
  ]);

  return state;
}

// Top-level career segmentation: team size and competitive context are
// orthogonal dimensions (see docs/stats-principles.md) and govern every
// panel on the player stats page through the shared replay-set params.
const defaultPlayerTeamSize = "2";
const defaultPlayerGameType = "ranked";
const allPlayerTeamSizes = "all";
const anyPlayerGameType = "any";

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

function playerStatsRequestSearchParams(search: string): URLSearchParams {
  const params = new URLSearchParams(search);
  const teamSize = params.get("team-size");
  if (teamSize == null) {
    params.set("team-size", defaultPlayerTeamSize);
  } else if (teamSize === "" || teamSize === allPlayerTeamSizes) {
    params.delete("team-size");
  }

  const gameType = params.get("game-type");
  if (gameType == null) {
    params.set("game-type", defaultPlayerGameType);
  } else if (gameType === "" || gameType === anyPlayerGameType) {
    params.delete("game-type");
  }

  return params;
}

// Link a goal-tag panel to the embedded goal playlist, carrying the active stats
// filter context (playlist, game mode, dates, …) so the in-page player shows the
// same goals the rates were computed from. The playlist itself filters by the
// goal `kind` client-side, so only the replay/match filters need to ride along.
function playerGoalPlaylistHref(
  routeBasePath: string,
  search: string,
  options: { goalTag?: string } = {},
): string {
  const source = stripKickoffSpawnParams(new URLSearchParams(search));
  const params = new URLSearchParams();
  for (const key of [
    "q",
    "title",
    "playlist",
    "game-mode",
    "game-type",
    "team-size",
    "map",
    "pro",
    "uploader",
    "group",
    "project",
    "created-after",
    "created-before",
    "replay-date-after",
    "replay-date-before",
  ]) {
    for (const value of source.getAll(key)) {
      if (value) params.append(key, value);
    }
  }
  const base = options.goalTag
    ? `${routeBasePath}/goals/${encodeURIComponent(options.goalTag)}`
    : `${routeBasePath}/goals`;
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

const aerialPlaylistKinds = new Set(aerialPlaylistKindList);

// Link an aerial mechanic to the embedded aerial clip playlist, carrying the
// active stats filter context (playlist, game mode, dates, …) so the in-page
// player shows the same mechanics the rates were computed from. The playlist
// filters by the mechanic's event type server-side via listPlayerEvents.
function playerAerialPlaylistHref(
  routeBasePath: string,
  search: string,
  aerialKind: string,
): string {
  const source = stripKickoffSpawnParams(new URLSearchParams(search));
  const params = new URLSearchParams();
  for (const key of [
    "q",
    "title",
    "playlist",
    "game-mode",
    "game-type",
    "team-size",
    "map",
    "pro",
    "uploader",
    "group",
    "project",
    "created-after",
    "created-before",
    "replay-date-after",
    "replay-date-before",
  ]) {
    for (const value of source.getAll(key)) {
      if (value) params.append(key, value);
    }
  }
  const base = `${routeBasePath}/aerials/${encodeURIComponent(aerialKind)}`;
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

function playerSegmentValue(params: URLSearchParams, key: "team-size" | "game-type"): string {
  const value = params.get(key);
  if (key === "team-size") {
    if (value == null) return defaultPlayerTeamSize;
    return value === allPlayerTeamSizes ? "" : value;
  }
  if (value == null) return defaultPlayerGameType;
  return value === anyPlayerGameType ? "" : value;
}

function playerSegmentParamPath(
  pathname: string,
  search: string,
  key: "team-size" | "game-type",
  value: string,
): string {
  const params = new URLSearchParams(search);
  if (value === "") {
    params.set(key, key === "team-size" ? allPlayerTeamSizes : anyPlayerGameType);
  } else {
    params.set(key, value);
  }
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function outcomeSplitParamPath(pathname: string, search: string, enabled: boolean): string {
  const params = new URLSearchParams(search);
  params.delete("player-outcome");
  if (enabled) {
    params.set("split-outcome", "true");
  } else {
    params.delete("split-outcome");
  }
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function playerOutcomeSplitEnabled(search: string): boolean {
  const value = new URLSearchParams(search).get("split-outcome");
  return value === "true" || value === "1" || value === "wins-losses";
}

// Whether the stat views should read from the materialized tables. The server
// default materializes, so a bare URL (no `materialized` param) reads as enabled;
// only an explicit opt-out forces a live recompute from events.
function materializedStatsEnabled(search: string): boolean {
  const value = new URLSearchParams(search).get("materialized");
  if (value == null) {
    return true;
  }
  return value !== "false" && value !== "0";
}

// Toggle the `materialized` param in the URL. Enabling drops the param to keep
// URLs clean (the server default re-materializes); disabling pins `false` so the
// override is explicit and shareable.
function materializedStatsParamPath(pathname: string, search: string, enabled: boolean): string {
  const params = new URLSearchParams(search);
  if (enabled) {
    params.delete("materialized");
  } else {
    params.set("materialized", "false");
  }
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function searchWithPlayerOutcome(search: string, outcome: "win" | "loss"): string {
  const params = playerStatsRequestSearchParams(search);
  params.delete("split-outcome");
  params.set("player-outcome", outcome);
  const query = params.toString();
  return query ? `?${query}` : "";
}

// Backend query params for the rank-average comparison. The dropdown writes
// these straight into the URL so they flow through the shared stats search
// string into the /stats/rank-benchmark request unchanged.
const RANK_BENCHMARK_RANK_PARAM = "rank-benchmark-rank";
const RANK_BENCHMARK_GROUPING_PARAM = "rank-benchmark-grouping";
const RANK_BENCHMARK_WINDOW_PARAM = "rank-benchmark-window";

// Explicitly-selected rank values, or null when the URL carries none (so the
// server's estimated default applies). An empty array means the user
// deselected every rank (sentinel `none`).
function selectedRankValuesFromSearch(search: string): number[] | null {
  const raw = new URLSearchParams(search).getAll(RANK_BENCHMARK_RANK_PARAM);
  if (raw.length === 0) return null;
  const values: number[] = [];
  let explicitNone = false;
  for (const item of raw) {
    for (const token of item.split(",")) {
      const trimmed = token.trim();
      if (!trimmed) continue;
      if (trimmed.toLowerCase() === "none") {
        explicitNone = true;
        continue;
      }
      const parsed = Number.parseInt(trimmed, 10);
      if (Number.isFinite(parsed)) values.push(parsed);
    }
  }
  if (values.length === 0 && !explicitNone) return null;
  return values;
}

function rankBenchmarkGroupingFromSearch(search: string): "group" | "tier" {
  return new URLSearchParams(search).get(RANK_BENCHMARK_GROUPING_PARAM) === "tier"
    ? "tier"
    : "group";
}

function rankAverageParamPath(
  pathname: string,
  search: string,
  mutate: (params: URLSearchParams) => void,
): string {
  const params = new URLSearchParams(search);
  mutate(params);
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

// Multi-select rank-average control: an always-visible row of rank chips (icons)
// that toggle on/off, so multiple ranks can be compared at once, plus the time
// window and group/tier grouping. Defaults to the server's estimate of the
// player's current rank. Sits beside the other top-level toggles.
function RankAverageSelect({
  rankBenchmark,
}: {
  rankBenchmark: RankBenchmarkCohortsResponse | null;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  if (!rankAverageEnabled() || !rankBenchmark || rankBenchmark.available_ranks.length === 0) {
    return null;
  }
  const grouping = rankBenchmarkGroupingFromSearch(location.search);
  const explicit = selectedRankValuesFromSearch(location.search);
  const defaultValue = rankBenchmark.default_rank_value;
  const selected = new Set<number>(explicit ?? (defaultValue != null ? [defaultValue] : []));

  const toggleRank = (rankValue: number) => {
    const next = new Set(selected);
    if (next.has(rankValue)) {
      next.delete(rankValue);
    } else {
      next.add(rankValue);
    }
    navigate(
      rankAverageParamPath(location.pathname, location.search, (params) => {
        params.delete(RANK_BENCHMARK_RANK_PARAM);
        if (next.size === 0) {
          params.set(RANK_BENCHMARK_RANK_PARAM, "none");
        } else {
          params.set(RANK_BENCHMARK_RANK_PARAM, [...next].sort((a, b) => a - b).join(","));
        }
      }),
    );
  };

  const rankIcon = (rankValue: number): string | null =>
    grouping === "tier" ? rankIconUrl(rankValue) : rankGroupIconUrl(rankValue);

  return (
    <nav className="stat-group-nav rank-average-select" aria-label="Rank average comparison">
      <span className="segment-bar-label">Rank avg</span>
      {rankBenchmark.available_ranks.map((rank) => {
        const iconUrl = rankIcon(rank.rank_value);
        const isDefault = defaultValue === rank.rank_value;
        const count =
          rank.distinct_player_count != null
            ? ` · n=${rank.distinct_player_count.toLocaleString()}`
            : "";
        return (
          <button
            key={rank.rank_value}
            type="button"
            aria-pressed={selected.has(rank.rank_value)}
            className={`stat-group-link rank-average-chip ${selected.has(rank.rank_value) ? "active" : ""}`}
            title={`${rank.label}${count}${isDefault ? " · estimated current rank" : ""}`}
            onClick={() => toggleRank(rank.rank_value)}
          >
            {iconUrl ? (
              <img src={iconUrl} alt={rank.label} className="rank-average-chip-icon" />
            ) : (
              <span>{rank.label}</span>
            )}
            {isDefault ? <span className="rank-average-chip-default" aria-hidden /> : null}
          </button>
        );
      })}
      <span className="rank-average-controls">
        {rankBenchmark.available_windows.length > 1 ? (
          <select
            className="rank-average-window-select"
            aria-label="Rank average time window"
            value={rankBenchmark.window ?? ""}
            onChange={(event) =>
              navigate(
                rankAverageParamPath(location.pathname, location.search, (params) => {
                  params.set(RANK_BENCHMARK_WINDOW_PARAM, event.target.value);
                }),
              )
            }
          >
            {rankBenchmark.available_windows.map((window) => (
              <option key={window.key} value={window.key}>
                {window.label}
              </option>
            ))}
          </select>
        ) : null}
        <button
          type="button"
          className={`stat-group-link rank-average-grouping-toggle ${grouping === "tier" ? "active" : ""}`}
          title="Toggle between pooled rank groups and exact division tiers"
          onClick={() =>
            navigate(
              rankAverageParamPath(location.pathname, location.search, (params) => {
                // Rank values live in a different id space per grouping, so reset
                // the selection to the new grouping's default.
                params.delete(RANK_BENCHMARK_RANK_PARAM);
                if (grouping === "group") {
                  params.set(RANK_BENCHMARK_GROUPING_PARAM, "tier");
                } else {
                  params.delete(RANK_BENCHMARK_GROUPING_PARAM);
                }
              }),
            )
          }
        >
          {grouping === "tier" ? "Tiers" : "Groups"}
        </button>
      </span>
    </nav>
  );
}

function PlayerStatsSegmentBar({
  rankBenchmark,
}: {
  rankBenchmark: RankBenchmarkCohortsResponse | null;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const teamSize = playerSegmentValue(params, "team-size");
  const gameType = playerSegmentValue(params, "game-type");
  const splitOutcome = playerOutcomeSplitEnabled(location.search);

  // Rank/season ranges live directly in the URL query (`min-rank`, `max-rank`,
  // `min-season`, `max-season`); the aggregate/overview/possession/etc. requests
  // forward the whole search string, so setting the param is all that's needed.
  const setRangeParam = (key: string, value: string) => {
    const next = new URLSearchParams(location.search);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    const query = next.toString();
    navigate(query ? `${location.pathname}?${query}` : location.pathname);
  };

  return (
    <div className="player-segment-bar">
      <nav className="stat-group-nav" aria-label="Mode segment">
        <span className="segment-bar-label">Mode</span>
        {teamSizeSegmentOptions.map((option) => (
          <Link
            key={option.value || "all"}
            className={`stat-group-link ${teamSize === option.value ? "active" : ""}`}
            to={playerSegmentParamPath(
              location.pathname,
              location.search,
              "team-size",
              option.value,
            )}
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
            to={playerSegmentParamPath(
              location.pathname,
              location.search,
              "game-type",
              option.value,
            )}
          >
            {option.label}
          </Link>
        ))}
      </nav>
      <nav className="stat-group-nav" aria-label="Rank range">
        <span className="segment-bar-label">Rank</span>
        <label className="segment-bar-select">
          <span className="segment-bar-select-label">Min</span>
          <select
            value={params.get("min-rank") ?? ""}
            onChange={(event) => setRangeParam("min-rank", event.currentTarget.value)}
          >
            {rankFilterOptions.map((option) => (
              <option key={`min-rank-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="segment-bar-select">
          <span className="segment-bar-select-label">Max</span>
          <select
            value={params.get("max-rank") ?? ""}
            onChange={(event) => setRangeParam("max-rank", event.currentTarget.value)}
          >
            {rankFilterOptions.map((option) => (
              <option key={`max-rank-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </nav>
      <nav className="stat-group-nav" aria-label="Season range">
        <span className="segment-bar-label">Season</span>
        <label className="segment-bar-select">
          <span className="segment-bar-select-label">Min</span>
          <select
            value={params.get("min-season") ?? ""}
            onChange={(event) => setRangeParam("min-season", event.currentTarget.value)}
          >
            {seasonFilterOptions.map((option) => (
              <option key={`min-season-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="segment-bar-select">
          <span className="segment-bar-select-label">Max</span>
          <select
            value={params.get("max-season") ?? ""}
            onChange={(event) => setRangeParam("max-season", event.currentTarget.value)}
          >
            {seasonFilterOptions.map((option) => (
              <option key={`max-season-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </nav>
      <nav className="stat-group-nav" aria-label="Outcome split">
        <span className="segment-bar-label">Outcome</span>
        <Link
          className={`stat-group-link ${splitOutcome ? "" : "active"}`}
          to={outcomeSplitParamPath(location.pathname, location.search, false)}
        >
          Combined
        </Link>
        <Link
          className={`stat-group-link ${splitOutcome ? "active" : ""}`}
          to={outcomeSplitParamPath(location.pathname, location.search, true)}
        >
          Wins / losses
        </Link>
      </nav>
      <RankAverageSelect rankBenchmark={rankBenchmark} />
      {teamSize === "" ? (
        <p className="muted-text segment-bar-note">
          Showing all modes blended — rates mix 1v1/2v2/3v3 dynamics. Pick a mode for cleaner
          numbers.
        </p>
      ) : null}
    </div>
  );
}

// Season codes in timeline order (s1..s12 then f1..f23) for period prev/next.
const orderedSeasonCodes: string[] = buildSeasonOptions("")
  .map((option) => option.value)
  .filter(Boolean);

const playerPeriodKindChips: Array<{ kind: PeriodKind | null; label: string }> = [
  { kind: null, label: "Career" },
  { kind: "year", label: "Year" },
  { kind: "season", label: "Season" },
  { kind: "30d", label: "30 days" },
  { kind: "week", label: "Week" },
  { kind: "day", label: "Day" },
  { kind: "last10", label: "Last 10" },
  { kind: "last100", label: "Last 100" },
  { kind: "session", label: "Session" },
];

// Time-period selector for the career stats pages: chips pick the most recent
// career/year/season/30-days/week/day/last-N-games/session window, and prev/next
// arrows step calendar and season/session windows into history. The selection
// writes `period=` plus the concrete `replay-date-*` (or `min/max-season`)
// bounds, which every stat fetch already forwards — see stats/periods.ts.
// Session and last-N bounds come from the timeline endpoint, fetched lazily the
// first time such a window is picked.
function PlayerPeriodSelect({
  platform,
  platformPlayerId,
  routeBasePath,
  requestSearch,
  onTimeline,
}: {
  platform: string;
  platformPlayerId: string;
  routeBasePath: string;
  requestSearch: string;
  /** True when rendered on the timeline tab, where the "View on timeline" link
   * would point at the current page. */
  onTimeline: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const active = useMemo(
    () => parsePeriodParam(new URLSearchParams(location.search).get(PERIOD_PARAM)),
    [location.search],
  );

  // The player's timeline (sessions + ordered games) backs the data-driven
  // windows: session stepping and the last-N-games chips. Fetched without the
  // active period's own bounds (it must cover games outside the selection) and
  // cached per player + filter scope.
  const timelineFetchKey = useMemo(() => {
    const params = new URLSearchParams(requestSearch);
    params.delete("timeline-window");
    params.delete("timeline-buckets");
    if (params.has(PERIOD_PARAM)) {
      params.delete(PERIOD_PARAM);
      params.delete("replay-date-after");
      params.delete("replay-date-before");
      params.delete("min-season");
      params.delete("max-season");
    }
    params.sort();
    return params.toString();
  }, [requestSearch]);
  const [timelineCache, setTimelineCache] = useState<{
    scope: string;
    timeline: PlayerTimelineResponse;
  } | null>(null);
  const scope = `${platform}\n${platformPlayerId}\n${timelineFetchKey}`;
  const timeline = timelineCache?.scope === scope ? timelineCache.timeline : null;
  const sessions = timeline?.sessions ?? null;

  // Deduped by scope: the cache-state update re-runs the mount effect while
  // the first request is still in flight, so concurrent callers must share one
  // promise instead of each firing their own fetch.
  const timelinePromiseRef = useRef<{
    scope: string;
    promise: Promise<PlayerTimelineResponse>;
  } | null>(null);
  const fetchTimeline = useCallback((): Promise<PlayerTimelineResponse> => {
    if (timelineCache?.scope === scope) return Promise.resolve(timelineCache.timeline);
    if (timelinePromiseRef.current?.scope === scope) return timelinePromiseRef.current.promise;
    const promise = getPlayerTimeline(
      platform,
      platformPlayerId,
      new URLSearchParams(timelineFetchKey),
    )
      .then((response) => {
        setTimelineCache({ scope, timeline: response });
        return response;
      })
      .finally(() => {
        if (timelinePromiseRef.current?.scope === scope) timelinePromiseRef.current = null;
      });
    timelinePromiseRef.current = { scope, promise };
    return promise;
  }, [platform, platformPlayerId, scope, timelineFetchKey, timelineCache]);

  // Arriving on a session-scoped link needs the list too (for prev/next).
  useEffect(() => {
    if (active?.kind !== "session" || sessions != null || !platform || !platformPlayerId) return;
    fetchTimeline().catch(() => {
      // Stepping is disabled while the list is missing; the scoped stats
      // themselves are unaffected (the URL already carries the bounds).
    });
  }, [active?.kind, fetchTimeline, platform, platformPlayerId, sessions]);

  const applySelection = (
    selection: PeriodSelection | null,
    bounds?: ReturnType<typeof periodBounds>,
  ) => {
    const params = new URLSearchParams(location.search);
    applyPeriodToParams(params, selection, bounds);
    const query = params.toString();
    navigate(query ? `${location.pathname}?${query}` : location.pathname);
  };

  const applySession = (session: PlayerTimelineSession) => {
    applySelection(
      { kind: "session", anchor: session.start },
      sessionPeriodBounds(session.start, session.end),
    );
  };

  // Bounds spanning the most recent `count` games, anchored on the latest game.
  const applyLastGames = (kind: PeriodKind, count: number, response: PlayerTimelineResponse) => {
    const isos = response.points.map((point) => point.replay_date);
    const bounds = lastGamesPeriodBounds(isos, count);
    const latest = isos[isos.length - 1];
    if (bounds && latest) applySelection({ kind, anchor: latest }, bounds);
  };

  const selectKind = (kind: PeriodKind | null) => {
    if (kind === active?.kind || (kind == null && active == null)) return;
    if (kind == null) {
      applySelection(null);
      return;
    }
    if (kind === "season") {
      applySelection({ kind, anchor: `f${FREE_TO_PLAY_SEASON_COUNT}` });
      return;
    }
    if (kind === "session") {
      fetchTimeline()
        .then((response) => {
          const latest = response.sessions[response.sessions.length - 1];
          if (latest) applySession(latest);
        })
        .catch(() => {});
      return;
    }
    const gameCount = GAME_COUNT_BY_KIND[kind];
    if (gameCount != null) {
      fetchTimeline()
        .then((response) => applyLastGames(kind, gameCount, response))
        .catch(() => {});
      return;
    }
    applySelection({ kind, anchor: latestPeriodAnchor(kind, new Date()) });
  };

  const step = (direction: -1 | 1) => {
    if (!active) return;
    if (active.kind === "season") {
      const index = orderedSeasonCodes.indexOf(active.anchor.toLowerCase());
      const nextCode = index >= 0 ? orderedSeasonCodes[index + direction] : undefined;
      if (nextCode) applySelection({ kind: "season", anchor: nextCode });
      return;
    }
    if (active.kind === "session") {
      if (!sessions) return;
      const index = sessions.findIndex((session) => session.start === active.anchor);
      const next = index >= 0 ? sessions[index + direction] : undefined;
      if (next) applySession(next);
      return;
    }
    const anchor = shiftPeriodAnchor(active, direction);
    if (anchor) applySelection({ kind: active.kind, anchor });
  };

  // Last-N-games windows are anchored to "now" and don't step through history.
  const steppable = active != null && GAME_COUNT_BY_KIND[active.kind] == null;

  const canStep = (direction: -1 | 1): boolean => {
    if (!active || !steppable) return false;
    if (active.kind === "season") {
      const index = orderedSeasonCodes.indexOf(active.anchor.toLowerCase());
      return index >= 0 && orderedSeasonCodes[index + direction] != null;
    }
    if (active.kind === "session") {
      if (!sessions) return false;
      const index = sessions.findIndex((session) => session.start === active.anchor);
      return index >= 0 && sessions[index + direction] != null;
    }
    if (direction > 0) {
      const anchor = shiftPeriodAnchor(active, 1);
      const bounds = anchor ? periodBounds({ kind: active.kind, anchor }) : null;
      return bounds != null && bounds.after.getTime() <= Date.now();
    }
    return shiftPeriodAnchor(active, -1) != null;
  };

  return (
    <nav className="stat-group-nav player-period-select" aria-label="Time period">
      <span className="segment-bar-label">Period</span>
      {playerPeriodKindChips.map((chip) => (
        <button
          key={chip.kind ?? "all"}
          type="button"
          className={`stat-group-link ${(active?.kind ?? null) === chip.kind ? "active" : ""}`}
          onClick={() => selectKind(chip.kind)}
        >
          {chip.label}
        </button>
      ))}
      {active ? (
        <span className="player-period-stepper">
          {steppable ? (
            <button
              type="button"
              className="stat-group-link"
              aria-label="Previous period"
              disabled={!canStep(-1)}
              onClick={() => step(-1)}
            >
              ‹
            </button>
          ) : null}
          <span className="player-period-label">{formatPeriodLabel(active)}</span>
          {steppable ? (
            <button
              type="button"
              className="stat-group-link"
              aria-label="Next period"
              disabled={!canStep(1)}
              onClick={() => step(1)}
            >
              ›
            </button>
          ) : null}
          {onTimeline ? null : (
            <Link className="primary-link" to={playerTimelinePath(routeBasePath, location.search)}>
              View on timeline
            </Link>
          )}
        </span>
      ) : null}
    </nav>
  );
}

// A stat section renders as an ordered list of panels. A "cards" panel is a
// list of comparison cards: the combined view lays them out in a grid, and the
// wins/losses split pairs them card-by-card so each metric keeps its win and
// loss together (stacked on a phone). A "node" panel is an opaque, cohesive
// visualization that pairs as a single unit. All the split/combined layout lives
// in one place (see buildStatsPanels' consumers) so sections only supply data.
type StatPanel =
  | { kind: "node"; key: string; node: ReactNode }
  | { kind: "cards"; key: string; cards: ComparisonCard[] };

// One pairable cell in the wins/losses split (a whole node panel, or one card).
type SplitUnit = { key: string; node: ReactNode };

// Career sub-pages with a Player/Team view toggle: each has a team-aggregated
// rendering (whole-roster production vs the opponent team) plus rank rows from
// the benchmark's team grain (`team_per_stat`). Positioning is deliberately
// absent — it is gauge/share-only, so a pooled "your team" row would just
// blend the player and teammates rows it already shows.
const TEAM_VIEW_SECTION_IDS = new Set(["core", "boost", "possession", "touches", "movement"]);

function PlayerAggregateStatsSections({
  activeGroup,
  kickoffFilterSummary,
  kickoffSupportSummary,
  kickoffTakerSummary,
  overview,
  movementSummary,
  possessionSummary,
  positioningSummary,
  rankBenchmarkCohorts,
  platform,
  platformPlayerId,
  playerName,
  routeBasePath,
  search,
  stats,
  supplementalError,
  supplementalLoading,
}: {
  activeGroup: StatGroup;
  kickoffFilterSummary: EventStatSummaryResponse | null;
  kickoffSupportSummary: EventStatSummaryResponse | null;
  kickoffTakerSummary: EventStatSummaryResponse | null;
  overview: PlayerStatOverviewResponse | null;
  movementSummary: MovementSummaryResponse | null;
  possessionSummary: PossessionSummaryResponse | null;
  positioningSummary: PositioningSummaryResponse | null;
  rankBenchmarkCohorts: RankBenchmarkCohortsResponse | null;
  platform: string;
  platformPlayerId: string;
  playerName: string;
  routeBasePath: string;
  search: string;
  stats: StatAggregateSetResponse;
  supplementalError: string | null;
  supplementalLoading: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const materializedEnabled = materializedStatsEnabled(location.search);
  const sectionStats = filterStatsForGroup(stats.stats, activeGroup)
    .slice()
    .sort(comparePlayerStatRates);
  const sectionEventCount = sectionStats.reduce((total, stat) => total + stat.event_count, 0);
  const Icon = activeGroup.icon;
  const requestSearch = playerStatsRequestSearchParams(search).toString();
  const kickoffShapeFilter = kickoffShapeFilterFromSearch(search);
  const kickoffSideFilter = kickoffSideFilterFromSearch(search);
  const kickoffSpawnDimension =
    kickoffFilterSummary?.dimensions.find(
      (dimension) => dimension.key === "kickoff_type" && dimension.values.length > 0,
    ) ??
    kickoffFilterSummary?.dimensions.find(
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
  const splitOutcome = playerOutcomeSplitEnabled(search);
  // Per-sub-page Player/Team view toggle. Local state, kept per sub-page id so
  // each page remembers its own selection while browsing; the closure below
  // applies it to both the combined and the wins/losses-split renders. Hidden
  // for 1v1 sets (team == player) and for the sections without a team
  // rendering (positioning is gauge/share-only: a pooled "your team" row would
  // just blend the player and teammates rows already shown).
  const [teamViewBySection, setTeamViewBySection] = useState<
    Partial<Record<string, CoreProfileView>>
  >({});
  const sectionView: CoreProfileView = teamViewBySection[activeGroup.id] ?? "player";
  const setSectionView = (view: CoreProfileView) =>
    setTeamViewBySection((previous) => ({ ...previous, [activeGroup.id]: view }));
  const showSectionViewToggle =
    TEAM_VIEW_SECTION_IDS.has(activeGroup.id) && overview?.team_size !== 1;
  const outcomeState = usePlayerOutcomeStatBundles({
    activeGroup,
    enabled: splitOutcome,
    platform,
    platformPlayerId,
    search,
  });

  type StatsContentInputs = {
    contentKickoffFilterSummary: EventStatSummaryResponse | null;
    contentKickoffSupportSummary: EventStatSummaryResponse | null;
    contentKickoffTakerSummary: EventStatSummaryResponse | null;
    contentMovementSummary: MovementSummaryResponse | null;
    contentOverview: PlayerStatOverviewResponse | null;
    contentPossessionSummary: PossessionSummaryResponse | null;
    contentPositioningSummary: PositioningSummaryResponse | null;
    contentRankBenchmarkCohorts: RankBenchmarkCohortsResponse | null;
    contentSearch: string;
    contentStats: StatAggregateSetResponse;
    contentSupplementalError: string | null;
    contentSupplementalLoading: boolean;
  };

  // Each stat section is composed of several heterogeneous panels. We build them
  // as a keyed list so the combined view can render them in order, and the
  // wins/losses split can pair the same panel for each outcome side by side.
  function buildStatsPanels(
    {
      contentKickoffFilterSummary,
      contentKickoffSupportSummary,
      contentKickoffTakerSummary,
      contentMovementSummary,
      contentOverview,
      contentPossessionSummary,
      contentPositioningSummary,
      contentRankBenchmarkCohorts,
      contentSearch,
      contentStats,
      contentSupplementalError,
      contentSupplementalLoading,
    }: StatsContentInputs,
    // In the wins/losses split we pass a canonical ordering derived from the
    // overall (non-split) stats so every outcome side sorts identically. Without
    // it each side would sort by its own frequency and the cards wouldn't line up.
    order?: {
      index: Map<string, number>;
      rateKeys: Array<{ key: string; display_name: string }>;
      goalTagKeys: Array<{ kind: string; display_name: string }>;
    },
  ): StatPanel[] {
    const orderComparator = order
      ? (left: StatAggregateResponse, right: StatAggregateResponse) =>
          (order.index.get(left.key) ?? Number.POSITIVE_INFINITY) -
            (order.index.get(right.key) ?? Number.POSITIVE_INFINITY) ||
          comparePlayerStatRates(left, right)
      : comparePlayerStatRates;
    const contentSectionStats = filterStatsForGroup(contentStats.stats, activeGroup)
      .slice()
      .sort(orderComparator);
    const contentTopStats = contentSectionStats.slice(0, 20);
    const contentKickoffSpawnDimension = contentKickoffFilterSummary?.dimensions.find(
      (dimension) => dimension.key === "spawn_position" && dimension.values.length > 0,
    );

    const panels: StatPanel[] = [];
    const add = (key: string, node: ReactNode) => panels.push({ kind: "node", key, node });
    const addCards = (key: string, cards: ComparisonCard[]) =>
      panels.push({ kind: "cards", key, cards });

    if (activeGroup.id === "kickoffs" && contentKickoffSpawnDimension && splitOutcome) {
      add(
        "kickoff-spawn",
        <KickoffSpawnBreakdown
          dimension={contentKickoffSpawnDimension}
          shapeFilter={kickoffShapeFilter}
          sideFilter={kickoffSideFilter}
          onShapeFilterChange={(value) => setKickoffFilter("kickoff-shape", value)}
          onSideFilterChange={(value) => setKickoffFilter("kickoff-side", value)}
        />,
      );
    }

    if (
      activeGroup.id !== "kickoffs" &&
      activeGroup.id !== "boost" &&
      activeGroup.id !== "core" &&
      activeGroup.id !== "goals" &&
      activeGroup.id !== "movement" &&
      activeGroup.id !== "possession" &&
      activeGroup.id !== "positioning" &&
      activeGroup.id !== "rotation" &&
      activeGroup.id !== "touches"
    ) {
      // On the aerials section, link each mechanic rate card to a clip playlist
      // of that mechanic across this player's replays (mirrors the goal-tag links
      // on the scoring section). Only the discrete, time-anchored mechanics are
      // watchable, so unrelated aerial stats render plain titles.
      const rateCardTitleHref =
        activeGroup.id === "aerials"
          ? (key: string) =>
              aerialPlaylistKinds.has(key)
                ? playerAerialPlaylistHref(routeBasePath, contentSearch, key)
                : undefined
          : undefined;
      const rateCards = buildPlayerRateCards(
        order ? contentSectionStats : contentTopStats,
        playerName,
        contentRankBenchmarkCohorts?.cohorts ?? [],
        contentRankBenchmarkCohorts?.window_label,
        order?.rateKeys,
        rateCardTitleHref,
      );
      if (rateCards.length > 0) {
        addCards("rate-comparison", rateCards);
      }
    }

    if (activeGroup.id === "boost") {
      add(
        "boost-profile",
        <BoostProfileDetail
          platform={platform}
          platformPlayerId={platformPlayerId}
          playerName={playerName}
          search={contentSearch}
          rankCohorts={contentRankBenchmarkCohorts?.cohorts ?? []}
          rankWindowLabel={contentRankBenchmarkCohorts?.window_label}
          view={sectionView}
        />,
      );
    }

    if (activeGroup.id === "ground-play") {
      add(
        "ground-play-profile",
        <GroundPlayProfileDetail
          platform={platform}
          platformPlayerId={platformPlayerId}
          playerName={playerName}
          search={contentSearch}
        />,
      );
    }

    if (activeGroup.id === "outcomes") {
      add(
        "outcomes-profile",
        <OutcomesProfileDetail
          platform={platform}
          platformPlayerId={platformPlayerId}
          playerName={playerName}
          rankCohorts={contentRankBenchmarkCohorts?.cohorts ?? []}
          rankWindowLabel={contentRankBenchmarkCohorts?.window_label}
          search={contentSearch}
        />,
      );
    }

    if (activeGroup.id === "aerials") {
      add(
        "aerials-profile",
        <AerialsProfileDetail
          platform={platform}
          platformPlayerId={platformPlayerId}
          playerName={playerName}
          search={contentSearch}
          playlistHref={playerAerialPlaylistHref(routeBasePath, contentSearch, "wall_aerial")}
        />,
      );
    }

    if (activeGroup.id === "core" && contentOverview) {
      addCards(
        "core",
        buildCoreProfileCards({
          overview: contentOverview,
          playerName,
          stats: contentSectionStats,
          view: sectionView,
          rankCohorts: contentRankBenchmarkCohorts?.cohorts ?? [],
          rankWindowLabel: contentRankBenchmarkCohorts?.window_label,
          activeTimeSeconds: contentStats.active_time_seconds,
        }),
      );
    }

    if (activeGroup.id === "movement" && contentMovementSummary) {
      addCards(
        "movement-cohorts",
        buildMovementCohortCards({
          response: contentMovementSummary,
          playerName,
          rankCohorts: contentRankBenchmarkCohorts?.cohorts ?? [],
          rankWindowLabel: contentRankBenchmarkCohorts?.window_label,
          view: sectionView,
        }),
      );
    }
    if (activeGroup.id === "movement" && contentSupplementalLoading) {
      add("movement-loading", <SupplementalLoadingNotice label="Movement comparisons" />);
    }
    if (activeGroup.id === "movement" && contentSupplementalError) {
      add(
        "movement-error",
        <ApiNotice label="Movement comparisons" message={contentSupplementalError} />,
      );
    }

    if (activeGroup.id === "goals" && contentOverview) {
      // Combined: the full panel (with its "Goal types" header). Split: drop the
      // header — which doesn't belong per-outcome — and pair each goal type on
      // its own row via the shared card path, using the canonical order so both
      // sides show the same goal types.
      if (splitOutcome) {
        addCards(
          "goals",
          buildGoalTagCards({
            overview: contentOverview,
            playerName,
            orderedKeys: order?.goalTagKeys,
            goalTypeHref: (kind) =>
              playerGoalPlaylistHref(routeBasePath, contentSearch, { goalTag: kind }),
            rankCohorts: contentRankBenchmarkCohorts?.cohorts ?? [],
            rankWindowLabel: contentRankBenchmarkCohorts?.window_label,
          }),
        );
      } else {
        add(
          "goal-share",
          <GoalTagSharePanel
            overview={contentOverview}
            playerName={playerName}
            goalTypeHref={(kind) =>
              playerGoalPlaylistHref(routeBasePath, contentSearch, { goalTag: kind })
            }
            allGoalsHref={playerGoalPlaylistHref(routeBasePath, contentSearch)}
            rankCohorts={contentRankBenchmarkCohorts?.cohorts ?? []}
            rankWindowLabel={contentRankBenchmarkCohorts?.window_label}
          />,
        );
      }
    }
    if (activeGroup.id === "goals" && contentSupplementalLoading) {
      add("goal-loading", <SupplementalLoadingNotice label="Goal types" />);
    }
    if (activeGroup.id === "goals" && contentSupplementalError) {
      add("goal-error", <ApiNotice label="Goal types" message={contentSupplementalError} />);
    }

    if (activeGroup.id === "kickoffs" && contentKickoffTakerSummary) {
      add(
        "kickoff-taker",
        <KickoffSummaryPanel role="taker" summary={contentKickoffTakerSummary} />,
      );
    }
    if (activeGroup.id === "kickoffs" && contentKickoffSupportSummary) {
      add(
        "kickoff-support",
        <KickoffSummaryPanel role="support" summary={contentKickoffSupportSummary} />,
      );
    }

    if (activeGroup.id === "possession" && contentPossessionSummary) {
      add(
        "possession-summary",
        <PossessionSummaryPanel
          playerName={playerName}
          summary={contentPossessionSummary}
          rankCohorts={contentRankBenchmarkCohorts?.cohorts ?? []}
          rankWindowLabel={contentRankBenchmarkCohorts?.window_label}
          view={sectionView}
        />,
      );
    }
    if (activeGroup.id === "possession" && contentSupplementalLoading) {
      add("possession-loading", <SupplementalLoadingNotice label="Possession comparisons" />);
    }
    if (activeGroup.id === "possession" && contentSupplementalError) {
      add(
        "possession-error",
        <ApiNotice label="Possession comparisons" message={contentSupplementalError} />,
      );
    }

    if (activeGroup.id === "touches" && contentStats.touch_breakdown) {
      add(
        "touch-profile",
        <TouchProfileComparison
          breakdown={contentStats.touch_breakdown}
          playerName={playerName}
          rankCohorts={contentRankBenchmarkCohorts?.cohorts ?? []}
          rankWindowLabel={contentRankBenchmarkCohorts?.window_label}
          view={sectionView}
        />,
      );
    }

    if (activeGroup.id === "positioning" && contentPositioningSummary) {
      add(
        "positioning-cohorts",
        <PlayerPositioningCohorts
          response={contentPositioningSummary}
          playerName={playerName}
          rankCohorts={contentRankBenchmarkCohorts?.cohorts ?? []}
          rankWindowLabel={contentRankBenchmarkCohorts?.window_label}
        />,
      );
    }
    if ((activeGroup.id === "positioning" || activeGroup.id === "rotation") && contentOverview) {
      add(
        "rotation-share",
        <RotationTimeSharePanel
          overview={contentOverview}
          playerName={playerName}
          stats={contentStats}
        />,
      );
    }

    return panels;
  }

  function renderStatPanel(panel: StatPanel): ReactNode {
    return panel.kind === "cards" ? <ComparisonCardGrid cards={panel.cards} /> : panel.node;
  }

  function renderStatsContent(inputs: StatsContentInputs) {
    return (
      <>
        {buildStatsPanels(inputs).map((panel) => (
          <Fragment key={panel.key}>{renderStatPanel(panel)}</Fragment>
        ))}
      </>
    );
  }

  // Flatten a section's panels into the units the wins/losses split pairs: a
  // "cards" panel contributes one unit per card (so each metric pairs on its own
  // row and stacks win-above-loss on a phone); a "node" panel contributes itself.
  function splitUnits(panels: StatPanel[]): SplitUnit[] {
    return panels.flatMap((panel): SplitUnit[] =>
      panel.kind === "cards"
        ? panel.cards.map((card) => ({
            key: `${panel.key}::${card.key}`,
            node: <ComparisonCardChart card={card} />,
          }))
        : [{ key: panel.key, node: panel.node }],
    );
  }

  const outcomeBundleInputs = (bundle: PlayerStatsOutcomeBundle): StatsContentInputs | null =>
    bundle.stats
      ? {
          contentKickoffFilterSummary: bundle.kickoffFilterSummary,
          contentKickoffSupportSummary: bundle.kickoffSupportSummary,
          contentKickoffTakerSummary: bundle.kickoffTakerSummary,
          contentMovementSummary: bundle.movementSummary,
          contentOverview: bundle.overview,
          contentPossessionSummary: bundle.possessionSummary,
          contentPositioningSummary: bundle.positioningSummary,
          contentRankBenchmarkCohorts: bundle.rankBenchmarkCohorts,
          contentSearch: bundle.search,
          contentStats: bundle.stats,
          contentSupplementalError: null,
          contentSupplementalLoading: false,
        }
      : null;

  return (
    <section className="stat-detail player-aggregate-stats">
      <PlayerStatSectionsNav
        routeBasePath={routeBasePath}
        search={search}
        activeId={activeGroup.id}
      />

      <header className="stat-detail-header">
        <div>
          <p className="eyebrow">Stats section</p>
          <h2>
            <Icon size={20} />
            {activeGroup.label}
          </h2>
          <p>{activeGroup.description}</p>
          {currentUser?.is_admin ? (
            <label
              className="toggle-row stat-materialized-toggle"
              title="Admin only: read these stats from the materialized tables (fast) or recompute them live from events (slow, source of truth)."
            >
              <input
                type="checkbox"
                checked={materializedEnabled}
                onChange={(event) =>
                  navigate(
                    materializedStatsParamPath(
                      location.pathname,
                      location.search,
                      event.target.checked,
                    ),
                  )
                }
              />
              <span>Materialized stats{materializedEnabled ? "" : " (live)"}</span>
            </label>
          ) : null}
        </div>
        {activeGroup.id === "kickoffs" ? (
          <div className="stat-detail-counts">
            <Metric
              label="Taker attempts"
              value={kickoffTakerSummary?.event_count.toLocaleString() ?? "Unknown"}
            />
            <Metric
              label="Support appearances"
              value={kickoffSupportSummary?.event_count.toLocaleString() ?? "Unknown"}
            />
          </div>
        ) : (
          <div className="stat-detail-counts">
            <Metric label="Stats" value={sectionStats.length.toLocaleString()} />
            <Metric label="Events" value={sectionEventCount.toLocaleString()} />
          </div>
        )}
      </header>

      {showSectionViewToggle ? (
        <div className="boost-page-controls">
          <div className="boost-comparison-tabs" role="tablist" aria-label="Stat view mode">
            <button
              className={sectionView === "player" ? "active" : ""}
              onClick={() => setSectionView("player")}
              role="tab"
              title="Compare the player to teammate and opponent per-player averages"
              type="button"
              aria-selected={sectionView === "player"}
            >
              Player
            </button>
            <button
              className={sectionView === "team" ? "active" : ""}
              onClick={() => setSectionView("team")}
              role="tab"
              title="Compare whole-team production for the profile player's team and opponent team"
              type="button"
              aria-selected={sectionView === "team"}
            >
              Team
            </button>
          </div>
        </div>
      ) : null}

      {!splitOutcome && activeGroup.id === "kickoffs" && kickoffSpawnDimension ? (
        <KickoffSpawnBreakdown
          dimension={kickoffSpawnDimension}
          shapeFilter={kickoffShapeFilter}
          sideFilter={kickoffSideFilter}
          onShapeFilterChange={(value) => setKickoffFilter("kickoff-shape", value)}
          onSideFilterChange={(value) => setKickoffFilter("kickoff-side", value)}
        />
      ) : null}

      {splitOutcome ? (
        <>
          <StatusLine loading={outcomeState.loading} error={outcomeState.error} />
          {(() => {
            // Canonical ordering shared by every outcome side, taken from the
            // overall (non-split) stats so the wins and losses cards sort the
            // same way and pair up row-for-row instead of each ranking by its
            // own frequency. rateKeys also defines which cards appear on both
            // sides, so a stat present on one side renders a placeholder on the
            // other rather than shifting the grid out of alignment.
            // Union the goal types across outcomes (ordered by combined count) so
            // a goal type scored only in wins still appears as a 0 card in losses
            // and vice versa, keeping the two grids aligned card-for-card.
            const goalTagTotals = new Map<
              string,
              { kind: string; display_name: string; count: number }
            >();
            for (const bundle of outcomeState.bundles) {
              for (const tag of bundle.overview?.goal_tags ?? []) {
                if (isIgnoredGoalTag(tag.kind)) continue;
                const existing = goalTagTotals.get(tag.kind);
                if (existing) {
                  existing.count += tag.count;
                } else {
                  goalTagTotals.set(tag.kind, {
                    kind: tag.kind,
                    display_name: tag.display_name,
                    count: tag.count,
                  });
                }
              }
            }
            const splitOrder = {
              index: new Map(sectionStats.map((stat, idx) => [stat.key, idx] as const)),
              rateKeys: sectionStats
                .filter((stat) => stat.per_active_minute != null)
                .map((stat) => ({ key: stat.key, display_name: stat.display_name })),
              goalTagKeys: [...goalTagTotals.values()]
                .sort((a, b) => b.count - a.count || a.display_name.localeCompare(b.display_name))
                .map(({ kind, display_name }) => ({ kind, display_name })),
            };
            const readyBundles = outcomeState.bundles
              .map((bundle) => {
                const inputs = outcomeBundleInputs(bundle);
                return inputs
                  ? { bundle, inputs, units: splitUnits(buildStatsPanels(inputs, splitOrder)) }
                  : null;
              })
              .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
            if (readyBundles.length === 0) return null;

            // Union the unit keys across outcomes, preserving first-seen order, so
            // each metric pairs its wins and losses variants on the same row.
            const orderedKeys: string[] = [];
            const seenKeys = new Set<string>();
            for (const entry of readyBundles) {
              for (const unit of entry.units) {
                if (!seenKeys.has(unit.key)) {
                  seenKeys.add(unit.key);
                  orderedKeys.push(unit.key);
                }
              }
            }

            return (
              <div className="player-outcome-split">
                <header className="player-outcome-split-summary">
                  {readyBundles.map(({ bundle }) => (
                    <div
                      className="player-outcome-summary-cell"
                      data-outcome={bundle.key}
                      key={bundle.key}
                    >
                      <h3>{bundle.label}</h3>
                      <span>
                        {bundle.stats?.replay_count.toLocaleString()}{" "}
                        {bundle.stats?.replay_count === 1 ? "game" : "games"}
                      </span>
                    </div>
                  ))}
                </header>
                {orderedKeys.map((key) => (
                  <div className="player-outcome-pair" key={key}>
                    {readyBundles.map(({ bundle, units }) => {
                      const unit = units.find((entry) => entry.key === key);
                      return (
                        <div
                          className="player-outcome-pair-cell"
                          data-outcome={bundle.key}
                          key={bundle.key}
                        >
                          <span className="player-outcome-pair-tag">{bundle.label}</span>
                          {unit ? (
                            unit.node
                          ) : (
                            <p className="muted-text player-outcome-pair-empty">
                              No {bundle.label.toLowerCase()} data
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })()}
        </>
      ) : (
        renderStatsContent({
          contentKickoffFilterSummary: kickoffFilterSummary,
          contentKickoffSupportSummary: kickoffSupportSummary,
          contentKickoffTakerSummary: kickoffTakerSummary,
          contentMovementSummary: movementSummary,
          contentOverview: overview,
          contentPossessionSummary: possessionSummary,
          contentPositioningSummary: positioningSummary,
          contentRankBenchmarkCohorts: rankBenchmarkCohorts,
          contentSearch: requestSearch,
          contentStats: stats,
          contentSupplementalError: supplementalError,
          contentSupplementalLoading: supplementalLoading,
        })
      )}
    </section>
  );
}

function comparePlayerStatRates(left: StatAggregateResponse, right: StatAggregateResponse): number {
  const leftRate = left.per_active_minute ?? -1;
  const rightRate = right.per_active_minute ?? -1;
  return (
    rightRate - leftRate ||
    right.event_count - left.event_count ||
    left.display_name.localeCompare(right.display_name)
  );
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

  function updateFilter<Key extends keyof EventReviewFilterForm>(
    key: Key,
    value: EventReviewFilterForm[Key],
  ) {
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

  function applyFlickPreset(preset: "all" | "reverse" | "side") {
    setFilters((current) => ({
      ...current,
      eventTypes: ["flick"],
      payloadKind: preset === "reverse" ? "reverse" : "",
      payloadSetupRotationDirection: preset === "side" ? "left,right" : "",
    }));
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
      id: "event-tag",
      label: "Custom tag",
      value: filters.tag,
      name: "tag",
      placeholder: "missing_flip_reset",
      onChange: (value) => updateFilter("tag", value),
    },
    {
      id: "event-map",
      label: "Map",
      value: filters.map,
      name: "map",
      options: [
        { value: "", label: "Any" },
        ...eventMapOptions.map((option) => ({ value: option.value, label: optionLabel(option) })),
      ],
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
      id: "event-payload-kind",
      label: "Flick type",
      value: filters.payloadKind,
      name: "payload-kind",
      options: flickTypeFilterOptions,
      onChange: (value) => updateFilter("payloadKind", value),
    },
    {
      id: "event-payload-setup-rotation-direction",
      label: "Flick side",
      value: filters.payloadSetupRotationDirection,
      name: "payload-setup-rotation-direction",
      options: flickSideFilterOptions,
      onChange: (value) => updateFilter("payloadSetupRotationDirection", value),
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

      <form
        className="event-review-form"
        method="get"
        action="/events/review/open"
        autoComplete="off"
      >
        <section className="event-filter-panel">
          <div className="panel-heading">
            <div>
              <h2>Event filters</h2>
              <p className="muted-text">
                Choose the review playlist that will open in the stat evaluation player.
              </p>
            </div>
            <div className="results-readout">
              <SlidersHorizontal size={16} />
              <span>{selectedCount > 0 ? selectedEventText : "All event types"}</span>
            </div>
          </div>

          <StatusLine loading={loadingEventTypes} error={error} />

          <div className="event-review-preset-row" aria-label="Flick review presets">
            <button
              className="secondary-button"
              type="button"
              onClick={() => applyFlickPreset("all")}
            >
              All flicks
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => applyFlickPreset("reverse")}
            >
              Reverse flicks
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => applyFlickPreset("side")}
            >
              Side flicks
            </button>
          </div>

          <div className="event-type-groups" aria-label="Event types">
            {eventTypeGroups.map((group) => {
              const eventTypeKeys = group.eventTypes.map((eventType) => eventType.key);
              const selectedInGroup = eventTypeKeys.filter((eventType) =>
                selectedEventTypes.has(eventType),
              ).length;
              const allSelected =
                selectedInGroup === eventTypeKeys.length && eventTypeKeys.length > 0;
              return (
                <section key={group.category} className="event-type-group">
                  <div className="event-type-group-heading">
                    <label className="event-type-group-toggle">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={() => toggleEventTypeGroup(eventTypeKeys)}
                      />
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
                      <label
                        key={eventType.key}
                        className={`check-tile ${selectedEventTypes.has(eventType.key) ? "selected" : ""}`}
                      >
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
            <p className="muted-text">
              The review player opens outside the SPA with this filtered playlist.
            </p>
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
            <div>
              <dt>Classifications</dt>
              <dd>{eventReviewClassificationSummary(filters)}</dd>
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
          <div className="review-export-links">
            <h3>Machine-readable export</h3>
            <p className="muted-text">
              Hand these straight to subtr-actor — no login or DB write required.
            </p>
            <CopyableUrl label="Copy playlist JSON" url={manifestUrl} />
            {filters.tag.trim() ? (
              <CopyableUrl
                label="Copy tag case export"
                url={`/api/v1/events/tags/${encodeURIComponent(filters.tag.trim())}/export`}
              />
            ) : null}
            <EventExportLinkTool />
          </div>
        </aside>
      </form>
    </section>
  );
}

/** A copyable, absolute URL with a one-click copy button. */
function CopyableUrl({ label, url }: { label: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const absolute = useMemo(() => {
    try {
      return new URL(url, window.location.origin).toString();
    } catch {
      return url;
    }
  }, [url]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable; the URL is still visible to select */
    }
  }
  return (
    <div className="copy-url-row">
      <button type="button" className="secondary-button" onClick={() => void copy()}>
        <Copy size={14} />
        {copied ? "Copied" : label}
      </button>
      <code className="copy-url-value">{absolute}</code>
    </div>
  );
}

/**
 * Paste any event UUID to get its self-contained "consider this" export link.
 * Purely a link builder — hitting the URL reads the event, it writes nothing.
 */
function EventExportLinkTool() {
  const [eventId, setEventId] = useState("");
  const trimmed = eventId.trim();
  const exportUrl = trimmed ? `/api/v1/events/${encodeURIComponent(trimmed)}/export` : "";
  return (
    <div className="event-export-tool">
      <label htmlFor="event-export-id">Event export link</label>
      <input
        id="event-export-id"
        type="text"
        placeholder="event UUID"
        value={eventId}
        onChange={(event) => setEventId(event.target.value)}
      />
      {exportUrl ? (
        <CopyableUrl label="Copy export link" url={exportUrl} />
      ) : (
        <p className="muted-text">
          Paste an event ID to get its machine-readable "consider this" export.
        </p>
      )}
    </div>
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
  tag: string;
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
  payloadKind: string;
  payloadSetupRotationDirection: string;
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
  if (
    key === "bump" ||
    key === "demolition" ||
    key === "kill" ||
    key === "death" ||
    key === "core.demo"
  ) {
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
  if (
    [
      "possession",
      "pressure",
      "territorial_pressure",
      "controlled_play",
      "kickoff",
      "fifty_fifty",
      "rush",
    ].includes(key)
  ) {
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
  return (
    eventCategorySortRank(left.category) - eventCategorySortRank(right.category) ||
    left.label.localeCompare(right.label)
  );
}

function compareEventTypes(left: EventTypeResponse, right: EventTypeResponse): number {
  return (
    (left.display_name || left.key).localeCompare(right.display_name || right.key) ||
    left.key.localeCompare(right.key)
  );
}

function eventCategorySortRank(category: string): number {
  const rank = [
    "mechanic",
    "mechanics",
    "basic",
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
    basic: "Basic events",
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
  const typeText =
    selectedCount === 1 ? "1 event type" : `${selectedCount.toLocaleString()} event types`;
  if (selectedGroupCount === 0) {
    return typeText;
  }
  const groupText =
    selectedGroupCount === 1 ? "1 group" : `${selectedGroupCount.toLocaleString()} groups`;
  return `${typeText} across ${groupText}`;
}

const reviewStatusOptions = [
  { value: "unreviewed", label: "Unreviewed" },
  { value: "all", label: "All" },
  { value: "confirmed", label: "Confirmed" },
  { value: "rejected", label: "Rejected" },
  { value: "corrected", label: "Corrected" },
  { value: "uncertain", label: "Uncertain" },
  { value: "bad_candidate", label: "Bad candidate" },
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

const flickTypeFilterOptions = [
  { value: "", label: "Any flick type" },
  { value: "reverse", label: "Reverse" },
  { value: "other", label: "Other" },
];

const flickSideFilterOptions = [
  { value: "", label: "Any flick side" },
  { value: "left,right", label: "Left or right" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: "unknown", label: "Unknown" },
];

function defaultEventReviewFilters(): EventReviewFilterForm {
  return {
    eventTypes: [],
    q: "",
    playerName: "",
    playerId: "",
    reviewStatus: "unreviewed",
    playlist: "",
    tag: "",
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
    payloadKind: "",
    payloadSetupRotationDirection: "",
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
    tag: params.get("tag") ?? defaults.tag,
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
    payloadKind: multiParamValue(params, "payload-kind", defaults.payloadKind),
    payloadSetupRotationDirection: multiParamValue(
      params,
      "payload-setup-rotation-direction",
      defaults.payloadSetupRotationDirection,
    ),
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
  appendIfPresent(params, "tag", filters.tag);
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
  appendMultiValueParam(params, "payload-kind", filters.payloadKind);
  appendMultiValueParam(
    params,
    "payload-setup-rotation-direction",
    filters.payloadSetupRotationDirection,
  );
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

function appendMultiValueParam(params: URLSearchParams, key: string, value: string) {
  for (const part of value.split(",")) {
    appendIfPresent(params, key, part);
  }
}

function multiParamValue(params: URLSearchParams, key: string, fallback: string): string {
  const values = params.getAll(key).filter((value) => value.trim());
  return values.length > 0 ? values.join(",") : fallback;
}

function eventReviewProParam(value: string | null): EventReviewProFilter {
  return value === "true" || value === "false" ? value : "";
}

function eventReviewClassificationSummary(filters: EventReviewFilterForm): string {
  const labels = [
    optionLabelForValue(flickTypeFilterOptions, filters.payloadKind),
    optionLabelForValue(flickSideFilterOptions, filters.payloadSetupRotationDirection),
  ].filter((label): label is string => label != null);
  return labels.length > 0 ? labels.join(" · ") : "Any";
}

function optionLabelForValue(options: FilterOptionConfig[], value: string): string | null {
  if (!value) return null;
  return options.find((option) => option.value === value)?.label ?? value;
}

function reviewStatusLabel(value: string): string {
  return reviewStatusOptions.find((option) => option.value === value)?.label ?? value;
}

function AccountPage({ initialLoginOpen = false }: { initialLoginOpen?: boolean }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => getAccessToken() ?? "");
  const [devEmail, setDevEmail] = useState("");
  const [tokenStatus, setTokenStatus] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(() => initialLoginOpen || getAccessToken() == null);
  const [creatingSessionToken, setCreatingSessionToken] = useState(false);
  const [creatingDevToken, setCreatingDevToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const attemptedSessionHydration = useRef(false);
  const claims = useMemo(() => parseAccessTokenClaims(token), [token]);
  const currentUser = useCurrentUser();
  const linkedIdentities = useLinkedIdentities(claims != null);
  const [defaultVisibility, setDefaultVisibility] = useState<{
    replay: Visibility;
    group: Visibility;
  } | null>(null);
  useEffect(() => {
    if (currentUser) {
      setDefaultVisibility({
        replay: currentUser.default_replay_visibility,
        group: currentUser.default_group_visibility,
      });
    }
  }, [currentUser]);

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

  useEffect(() => {
    if (!claims) {
      setLoginOpen(true);
    }
  }, [claims]);

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

  async function logoutAccount() {
    setTokenError(null);
    setTokenStatus(null);
    await logout();
    setToken("");
    setCopied(false);
    setLoginOpen(false);
    setTokenStatus("Logged out.");
    navigate("/replays");
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

  function closeLoginModal() {
    if (claims) {
      setLoginOpen(false);
    } else {
      navigate("/replays");
    }
  }

  if (!claims) {
    return (
      <section className="page account-page">
        {loginOpen ? (
          <LoginModal
            onClose={closeLoginModal}
            onAccessToken={(accessToken, message) => acceptLoginToken(accessToken, message)}
          />
        ) : null}
      </section>
    );
  }

  return (
    <section className="page account-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Account</h1>
        </div>
        <div className="page-header-actions">
          <button className="secondary-button" type="button" onClick={() => setLoginOpen(true)}>
            <LogIn size={16} />
            {claims ? "Switch account" : "Login"}
          </button>
          {claims ? (
            <button
              className="secondary-button is-danger"
              type="button"
              onClick={() => void logoutAccount()}
            >
              <LogOut size={16} />
              Log out
            </button>
          ) : null}
        </div>
      </header>

      {loginOpen ? (
        <LoginModal
          onClose={closeLoginModal}
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
              <dd>
                {claims?.exp
                  ? formatDate(new Date(claims.exp * 1000).toISOString())
                  : claims
                    ? "Never"
                    : "-"}
              </dd>
            </div>
          </dl>
        </section>

        {currentUser && defaultVisibility ? (
          <section className="account-panel">
            <div>
              <h2>Privacy defaults</h2>
              <p className="muted-text">
                The visibility applied to replays you upload and groups you create. You can change
                any item&rsquo;s visibility individually later.
              </p>
            </div>
            <DefaultVisibilitySettings
              replayVisibility={defaultVisibility.replay}
              groupVisibility={defaultVisibility.group}
              onChange={async (settings) => {
                const updated = await updateUserSettings(settings);
                setDefaultVisibility({
                  replay: updated.default_replay_visibility,
                  group: updated.default_group_visibility,
                });
              }}
            />
          </section>
        ) : null}

        <section className="account-panel">
          <div>
            <h2>Create token</h2>
            <p className="muted-text">
              Use your login session, or create a local development token when the server allows it.
            </p>
          </div>
          <div className="button-row">
            <button
              type="button"
              onClick={() => void requestSessionToken()}
              disabled={creatingSessionToken}
            >
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

        <section className="account-panel linked-identities-panel">
          <div>
            <h2>Verified identities</h2>
            <p className="muted-text">Provider accounts Rocket Sense has verified for this user.</p>
          </div>
          {linkedIdentities.loading ? (
            <div className="status-line">
              <RefreshCw size={16} className="spin" />
              Loading identities
            </div>
          ) : linkedIdentities.error ? (
            <p className="inline-status error">{linkedIdentities.error}</p>
          ) : linkedIdentities.identities.length > 0 ? (
            <ul className="linked-identity-list">
              {linkedIdentities.identities.map((identity) => (
                <li
                  key={`${identity.provider_name}:${identity.provider_subject}`}
                  className={`linked-identity provider-${identity.provider_name}`}
                >
                  <ProviderLoginIcon providerId={identity.provider_name} />
                  <span className="linked-identity-main">
                    <strong>{providerLabel(identity.provider_name)}</strong>
                    <span>{identity.email ?? identity.provider_subject}</span>
                  </span>
                  <span className="linked-identity-meta">
                    <span>{identity.provider_subject}</span>
                    <time dateTime={identity.created_at}>{formatDate(identity.created_at)}</time>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted-text">No verified provider identities are stored for this user.</p>
          )}
        </section>
      </div>

      <form className="token-form" onSubmit={saveToken}>
        <div className="token-form-header">
          <label htmlFor="account-token">Bearer token</label>
          <div className="button-row">
            <button
              className="icon-button"
              type="button"
              onClick={() => void copyToken()}
              disabled={!token.trim()}
              title="Copy token"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <button
              className="icon-button"
              type="button"
              onClick={clearStoredToken}
              disabled={!token.trim()}
              title="Clear token"
            >
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
  display_name?: string;
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

    const popup = window.open(
      provider.start_url,
      `rocket-sense-${provider.id}-login`,
      "popup,width=520,height=720",
    );
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
                    <ProviderLoginIcon providerId={provider.id} />
                    <span>Continue with {provider.label}</span>
                  </button>
                ))
              ) : (
                <p className="muted-text">
                  No OAuth login providers are configured for this server.
                </p>
              )}
            </div>
          </div>
        ) : null}

        {options?.mode === "dev" ? (
          <form
            className="login-section inline-token-form"
            onSubmit={(event) => void requestDevToken(event)}
          >
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
    providers: ["google", "github", "discord", "epic", "xbox", "steam"].map((id) => ({
      id,
      label: providerLabel(id),
      configured: true,
      start_url: `${deployedOrigin}/auth/${id}/start`,
    })),
  };
}

function AdminPlayerReportsPage() {
  const currentUser = useCurrentUser();
  const [status, setStatus] = useState<"pending" | "accepted" | "dismissed" | "all">("pending");
  const [reports, setReports] = useState<PlayerIdentityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [reviewingId, setReviewingId] = useState<string | null>(null);

  const loadReports = useCallback(() => {
    const params = new URLSearchParams();
    params.set("status", status);
    params.set("count", "100");
    setLoading(true);
    setError(null);
    listPlayerReports(params)
      .then((response) => setReports(response.reports))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [status]);

  useEffect(() => {
    if (!currentUser?.is_admin) {
      setLoading(false);
      return;
    }
    loadReports();
  }, [currentUser?.is_admin, loadReports]);

  async function review(report: PlayerIdentityReport, nextStatus: "accepted" | "dismissed") {
    setReviewingId(report.id);
    setActionMessage(null);
    try {
      const updated = await reviewPlayerReport(report.id, { status: nextStatus });
      setReports((current) => current.filter((item) => item.id !== updated.id));
      setActionMessage(
        nextStatus === "accepted"
          ? `${humanizeSlug(report.report_type)} report accepted.`
          : `${humanizeSlug(report.report_type)} report dismissed.`,
      );
    } catch (err) {
      setActionMessage(err instanceof Error ? err.message : "Failed to review report.");
    } finally {
      setReviewingId(null);
    }
  }

  if (currentUser && !currentUser.is_admin) {
    return (
      <section className="page admin-player-reports-page">
        <header className="page-header">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Player reports</h1>
          </div>
        </header>
        <ApiNotice label="Player reports" message="Admin access is required." />
      </section>
    );
  }

  return (
    <section className="page admin-player-reports-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Player reports</h1>
        </div>
        <div className="button-row">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as typeof status)}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="dismissed">Dismissed</option>
            <option value="all">All</option>
          </select>
          <button type="button" onClick={loadReports} disabled={loading || !currentUser?.is_admin}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </header>
      <StatusLine loading={loading} error={error} />
      {actionMessage ? <p className="admin-action-message">{actionMessage}</p> : null}
      <div className="table-frame admin-player-reports-table">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Type</th>
              <th>Note</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={6}>No reports match this filter.</td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <Link
                      className="primary-link"
                      to={playerProfileIdPath(report.platform, report.platform_player_id)}
                    >
                      {report.platform}:{report.platform_player_id}
                    </Link>
                  </td>
                  <td>{humanizeSlug(report.report_type)}</td>
                  <td>{report.note ?? "-"}</td>
                  <td>{humanizeSlug(report.status)}</td>
                  <td>{formatShortDate(report.created_at)}</td>
                  <td>
                    {report.status === "pending" ? (
                      <div className="button-row">
                        <button
                          type="button"
                          disabled={reviewingId === report.id}
                          onClick={() => void review(report, "accepted")}
                        >
                          <Check size={16} />
                          Accept
                        </button>
                        <button
                          className="secondary-button"
                          type="button"
                          disabled={reviewingId === report.id}
                          onClick={() => void review(report, "dismissed")}
                        >
                          <X size={16} />
                          Dismiss
                        </button>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminProcessingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [response, setResponse] = useState<ReplayProcessingDiagnosticsResponse | null>(null);
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [includeHealthy, setIncludeHealthy] = useState(
    searchParams.get("include_healthy") === "true",
  );
  const [currentlyFailed, setCurrentlyFailed] = useState(
    searchParams.get("currently_failed") === "true",
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [requeueResults, setRequeueResults] = useState<Record<string, RequeueResult>>({});
  const [reprocessAllState, setReprocessAllState] = useState<RequeueResult | null>(null);

  async function reprocessAllReplays() {
    if (
      !window.confirm(
        "Force-reprocess EVERY replay? This re-parses all replays and is expensive. Only do this after a subtr-actor / processing change that needs a full rebuild.",
      )
    ) {
      return;
    }
    setReprocessAllState({ phase: "pending", message: "Enqueuing full reprocess…" });
    try {
      const result = await reprocessReplaysBatch({ force: true, concurrency: 4 });
      setReprocessAllState({
        phase: "done",
        message: `Enqueued ${result.enqueued_replays.toLocaleString()} of ${result.matched_replays.toLocaleString()} replays (force). They will work through the processing queue.`,
      });
      setRefreshKey((key) => key + 1);
    } catch (err) {
      setReprocessAllState({
        phase: "error",
        message: `Full reprocess failed: ${(err as Error).message}`,
      });
    }
  }

  useEffect(() => {
    setStatus(searchParams.get("status") ?? "");
    setIncludeHealthy(searchParams.get("include_healthy") === "true");
    setCurrentlyFailed(searchParams.get("currently_failed") === "true");
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
    setRequeueResult(replayId, {
      phase: "pending",
      message: force ? "Force-requeuing…" : "Requeuing…",
    });
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
    if (currentlyFailed) {
      params.set("currently_failed", "true");
    } else {
      params.delete("currently_failed");
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
  const visiblePageSizeOptions = [50, 100, 200, 500].includes(pageSize)
    ? [50, 100, 200, 500]
    : [50, 100, 200, 500, pageSize].sort((a, b) => a - b);

  return (
    <section className="page admin-processing-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Replay Processing</h1>
        </div>
        <div className="page-header-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={reprocessAllReplays}
            disabled={reprocessAllState?.phase === "pending"}
            title="Force-reprocess every replay (re-parses all replays)"
          >
            <RefreshCw size={16} />
            {reprocessAllState?.phase === "pending" ? "Reprocessing…" : "Reprocess all (force)"}
          </button>
          <Link className="secondary-button" to="/admin/queue">
            <ListOrdered size={16} />
            Live queue
          </Link>
          <Link className="secondary-button" to="/admin/recently-processed">
            <History size={16} />
            Recently processed
          </Link>
          <a className="secondary-button" href="/api/v1/admin/replays/processing-diagnostics">
            <ExternalLink size={16} />
            JSON
          </a>
        </div>
      </header>

      {reprocessAllState ? (
        <p className={`requeue-result requeue-${reprocessAllState.phase}`}>
          {reprocessAllState.message}
        </p>
      ) : null}

      {response ? (
        <div className="summary-grid admin-summary-grid">
          <Metric
            label="Problem replays"
            value={response.summary.problem_replays.toLocaleString()}
          />
          <Metric
            label="Currently failed"
            value={response.summary.currently_failed_replays.toLocaleString()}
          />
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
                    <span
                      className={
                        worker.alive
                          ? "status-badge status-processed"
                          : "status-badge status-failed"
                      }
                    >
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
          No live replay-processing workers — queued jobs will not be consumed until a worker
          reconnects.
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
          <input
            type="checkbox"
            checked={currentlyFailed}
            onChange={(event) => setCurrentlyFailed(event.currentTarget.checked)}
          />
          <span>Only currently failed (no successful run since last failure)</span>
        </label>
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={includeHealthy}
            onChange={(event) => setIncludeHealthy(event.currentTarget.checked)}
          />
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
            <select
              value={String(pageSize)}
              onChange={(event) => updatePageSize(event.currentTarget.value)}
            >
              {visiblePageSizeOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="icon-button"
            title="Previous page"
            disabled={!canPageBackward || loading}
            onClick={() => goToOffset(previousOffset)}
          >
            <ChevronLeft size={17} />
          </button>
          <button
            type="button"
            className="icon-button"
            title="Next page"
            disabled={!canPageForward || loading}
            onClick={() => goToOffset(nextOffset)}
          >
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
                  className={
                    requeueResult
                      ? `admin-requeue-row admin-requeue-${requeueResult.phase}`
                      : undefined
                  }
                >
                  <td className="admin-replay-cell">
                    <ReplayLink className="primary-link" replayId={diagnostic.replay_id}>
                      {diagnostic.original_file_name || diagnostic.replay_id}
                    </ReplayLink>
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
                    <RunSummary
                      label="Canonical"
                      run={diagnostic.canonical_analysis_run}
                      eventCount={diagnostic.canonical_event_count}
                    />
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
                    {diagnostic.next_queue_run_at ? (
                      <small>Next {formatDate(diagnostic.next_queue_run_at)}</small>
                    ) : null}
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

function queueStatusClassName(status: string): string {
  switch (status.toLowerCase()) {
    case "running":
      return "status-badge status-processing";
    case "done":
      return "status-badge status-processed";
    case "failed":
    case "killed":
      return "status-badge status-failed";
    case "pending":
    case "queued":
    default:
      return "status-badge status-pending";
  }
}

const QUEUE_VIEWS = [
  { key: "outstanding", label: "Outstanding" },
  { key: "completed", label: "Completed" },
  { key: "all", label: "All" },
] as const;

type QueueViewKey = (typeof QUEUE_VIEWS)[number]["key"];

function queueViewParam(params: URLSearchParams): QueueViewKey {
  const raw = params.get("view");
  return QUEUE_VIEWS.some((view) => view.key === raw) ? (raw as QueueViewKey) : "outstanding";
}

function AdminQueuePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [response, setResponse] = useState<ReplayProcessingQueueResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [reprocessFailedState, setReprocessFailedState] = useState<RequeueResult | null>(null);

  async function reprocessFailed() {
    if (
      !window.confirm(
        "Force-reprocess every replay with a failed job in the queue? This re-enqueues them for the workers.",
      )
    ) {
      return;
    }
    setReprocessFailedState({ phase: "pending", message: "Re-enqueuing failed jobs…" });
    try {
      const result = await reprocessFailedQueueJobs();
      setReprocessFailedState({
        phase: "done",
        message:
          result.failed_replays === 0
            ? "No failed jobs to reprocess."
            : `Re-enqueued ${result.enqueued_replays.toLocaleString()} of ${result.failed_replays.toLocaleString()} failed ${result.failed_replays === 1 ? "replay" : "replays"}${
                result.skipped_replays > 0
                  ? ` (${result.skipped_replays.toLocaleString()} already queued)`
                  : ""
              }.`,
      });
      setRefreshKey((key) => key + 1);
    } catch (err) {
      setReprocessFailedState({
        phase: "error",
        message: `Reprocess failed: ${(err as Error).message}`,
      });
    }
  }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listReplayProcessingQueue(searchParams)
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

  function goToOffset(offset: number) {
    const params = new URLSearchParams(searchParams);
    if (offset > 0) {
      params.set("offset", String(offset));
    } else {
      params.delete("offset");
    }
    navigate(`/admin/queue?${params.toString()}`);
  }

  function goToView(nextView: QueueViewKey) {
    const params = new URLSearchParams(searchParams);
    if (nextView === "outstanding") {
      params.delete("view");
    } else {
      params.set("view", nextView);
    }
    // Each view is a different result set, so start back at the first page.
    params.delete("offset");
    navigate(`/admin/queue?${params.toString()}`);
  }

  const view = queueViewParam(searchParams);
  const showFinished = view !== "outstanding";
  const columnCount = showFinished ? 7 : 6;
  const viewBlurb: Record<QueueViewKey, string> = {
    outstanding:
      "Outstanding jobs (pending, queued, running, and failed), ordered the way a worker pops them.",
    completed:
      "Finished history — succeeded (Done) and permanently failed (Killed) jobs, most recent first.",
    all: "Every replay-processing job, regardless of status, with the most recent activity first.",
  };

  const jobs = response?.jobs ?? [];
  const failedInView = jobs.filter((job) => job.status.toLowerCase() === "failed").length;
  const total = response?.total ?? null;
  const offset = positiveIntegerParam(searchParams, "offset", 0);
  const pageSize = positiveIntegerParam(searchParams, "count", 200);
  const canPageBackward = offset > 0;
  const canPageForward = response?.next_offset != null;
  const previousOffset = Math.max(0, offset - pageSize);
  const nextOffset = response?.next_offset ?? offset + pageSize;

  return (
    <section className="page admin-processing-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Processing Queue</h1>
        </div>
        <div className="page-header-actions">
          {view !== "completed" ? (
            <button
              type="button"
              className="secondary-button"
              onClick={() => void reprocessFailed()}
              disabled={reprocessFailedState?.phase === "pending"}
              title="Force-reprocess every replay with a failed job in the queue"
            >
              <RotateCcw
                size={16}
                className={reprocessFailedState?.phase === "pending" ? "spin" : undefined}
              />
              {reprocessFailedState?.phase === "pending"
                ? "Reprocessing…"
                : failedInView > 0
                  ? `Reprocess failed (${failedInView.toLocaleString()})`
                  : "Reprocess failed"}
            </button>
          ) : null}
          <button
            type="button"
            className="secondary-button"
            onClick={() => setRefreshKey((key) => key + 1)}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "spin" : undefined} />
            Refresh
          </button>
          <Link className="secondary-button" to="/admin/processing">
            <ServerCog size={16} />
            Diagnostics
          </Link>
          <Link className="secondary-button" to="/admin/recently-processed">
            <History size={16} />
            Recently processed
          </Link>
          <a
            className="secondary-button"
            href={`/api/v1/admin/replays/queue${
              searchParams.toString() ? `?${searchParams.toString()}` : ""
            }`}
          >
            <ExternalLink size={16} />
            JSON
          </a>
        </div>
      </header>

      <nav className="stat-group-nav admin-queue-views" aria-label="Queue view">
        {QUEUE_VIEWS.map((option) => (
          <button
            key={option.key}
            type="button"
            className={`stat-group-link ${view === option.key ? "active" : ""}`}
            aria-pressed={view === option.key}
            onClick={() => goToView(option.key)}
          >
            {option.label}
          </button>
        ))}
      </nav>

      <p className="subtle">
        The apalis <code>rocket-sense:replay-processing</code> queue. {viewBlurb[view]}
      </p>

      {reprocessFailedState ? (
        <p className={`requeue-result requeue-${reprocessFailedState.phase}`}>
          {reprocessFailedState.message}
        </p>
      ) : null}

      <div className="replay-list-controls">
        <div className="results-readout">
          <ListOrdered size={16} />
          <span>
            {loading
              ? "Loading queue"
              : total == null
                ? `${jobs.length.toLocaleString()} jobs`
                : `${jobs.length.toLocaleString()} of ${total.toLocaleString()} jobs`}
          </span>
        </div>
        <div className="pagination-controls">
          <button
            type="button"
            className="icon-button"
            title="Previous page"
            disabled={!canPageBackward || loading}
            onClick={() => goToOffset(previousOffset)}
          >
            <ChevronLeft size={17} />
          </button>
          <button
            type="button"
            className="icon-button"
            title="Next page"
            disabled={!canPageForward || loading}
            onClick={() => goToOffset(nextOffset)}
          >
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
              <th>Status</th>
              <th>Attempts</th>
              <th>Run at</th>
              {showFinished ? <th>Finished</th> : null}
              <th>Worker</th>
              <th>Last result</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.job_id}>
                <td className="admin-replay-cell">
                  <ReplayLink className="primary-link" replayId={job.replay_id}>
                    {job.original_file_name || job.replay_id}
                  </ReplayLink>
                  <div className="subtle">{job.replay_id.slice(0, 8)}</div>
                  {job.force ? <span className="status-badge status-pending">force</span> : null}
                </td>
                <td>
                  <span className={queueStatusClassName(job.status)}>{job.status}</span>
                  {job.terminal ? (
                    <div
                      className="subtle"
                      title="Retries exhausted — apalis will not rerun this on its own"
                    >
                      retries exhausted
                    </div>
                  ) : null}
                </td>
                <td>
                  {job.attempts.toLocaleString()} / {job.max_attempts.toLocaleString()}
                </td>
                <td className="admin-date-cell">
                  <div>{formatDate(job.run_at)}</div>
                  {job.lock_at ? <small>Locked {formatDate(job.lock_at)}</small> : null}
                </td>
                {showFinished ? (
                  <td className="admin-date-cell">
                    {job.done_at ? formatDate(job.done_at) : <span className="subtle">—</span>}
                  </td>
                ) : null}
                <td>
                  {job.lock_by ? <code>{job.lock_by}</code> : <span className="subtle">—</span>}
                </td>
                <td>
                  {job.last_result ? (
                    <code className="subtle">{job.last_result.slice(0, 120)}</code>
                  ) : (
                    <span className="subtle">—</span>
                  )}
                </td>
              </tr>
            ))}
            {!loading && jobs.length === 0 ? (
              <tr>
                <td colSpan={columnCount} className="empty-cell">
                  {view === "completed"
                    ? "No finished jobs yet."
                    : view === "all"
                      ? "No replay-processing jobs found."
                      : "Queue is empty — no outstanding replay-processing jobs."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminRecentlyProcessedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [response, setResponse] = useState<RecentlyProcessedReplaysResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listRecentlyProcessedReplays(searchParams)
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

  function goToOffset(offset: number) {
    const params = new URLSearchParams(searchParams);
    if (offset > 0) {
      params.set("offset", String(offset));
    } else {
      params.delete("offset");
    }
    navigate(`/admin/recently-processed?${params.toString()}`);
  }

  const replays = response?.replays ?? [];
  const offset = positiveIntegerParam(searchParams, "offset", 0);
  const pageSize = positiveIntegerParam(searchParams, "count", 100);
  const canPageBackward = offset > 0;
  const canPageForward = response?.next_offset != null;
  const previousOffset = Math.max(0, offset - pageSize);
  const nextOffset = response?.next_offset ?? offset + pageSize;

  return (
    <section className="page admin-processing-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Recently Processed</h1>
        </div>
        <div className="page-header-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => setRefreshKey((key) => key + 1)}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "spin" : undefined} />
            Refresh
          </button>
          <Link className="secondary-button" to="/admin/processing">
            <ServerCog size={16} />
            Diagnostics
          </Link>
          <a className="secondary-button" href="/api/v1/admin/replays/recently-processed">
            <ExternalLink size={16} />
            JSON
          </a>
        </div>
      </header>

      <p className="subtle">
        Replays whose canonical analysis run has finished, newest first — i.e. what the workers most
        recently turned into processed replays.
      </p>

      <div className="replay-list-controls">
        <div className="results-readout">
          <ListOrdered size={16} />
          <span>
            {loading
              ? "Loading replays"
              : `${replays.length.toLocaleString()} processed ${
                  replays.length === 1 ? "replay" : "replays"
                }`}
          </span>
        </div>
        <div className="pagination-controls">
          <button
            type="button"
            className="icon-button"
            title="Previous page"
            disabled={!canPageBackward || loading}
            onClick={() => goToOffset(previousOffset)}
          >
            <ChevronLeft size={17} />
          </button>
          <button
            type="button"
            className="icon-button"
            title="Next page"
            disabled={!canPageForward || loading}
            onClick={() => goToOffset(nextOffset)}
          >
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
              <th>Processed</th>
              <th>Status</th>
              <th>Extractor</th>
              <th>Events</th>
            </tr>
          </thead>
          <tbody>
            {replays.map((replay) => (
              <tr key={replay.replay_id}>
                <td className="admin-replay-cell">
                  <ReplayLink className="primary-link" replayId={replay.replay_id}>
                    {replay.original_file_name || replay.replay_id}
                  </ReplayLink>
                  <div className="subtle">{replay.replay_id.slice(0, 8)}</div>
                </td>
                <td className="admin-date-cell">
                  {replay.processed_at ? (
                    <div>{formatDate(replay.processed_at)}</div>
                  ) : (
                    <span className="subtle">—</span>
                  )}
                </td>
                <td>
                  <span className={`status-badge status-${replay.processing_status}`}>
                    {replay.processing_status}
                  </span>
                </td>
                <td>
                  {replay.extractor_version ? (
                    <code className="subtle">
                      {replay.extractor_name ? `${replay.extractor_name} ` : ""}
                      {replay.extractor_version}
                    </code>
                  ) : (
                    <span className="subtle">—</span>
                  )}
                </td>
                <td>{replay.event_count.toLocaleString()}</td>
              </tr>
            ))}
            {!loading && replays.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-cell">
                  No processed replays found.
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

const ABOUT_REPOS = [
  {
    name: "rocket-sense",
    url: "https://github.com/rlrml/rocket-sense",
    description: "Replay analytics backend and web app (this site).",
  },
  {
    name: "subtr-actor",
    url: "https://github.com/rlrml/subtr-actor",
    description: "Rocket League replay parsing and stat extraction.",
  },
];

function AboutPage() {
  const [version, setVersion] = useState<ProcessingVersionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProcessingVersion()
      .then((response) => {
        if (!cancelled) {
          setVersion(response);
          setError(null);
        }
      })
      .catch((caught: unknown) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught.message : "Failed to load version.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const subtrActorSha = version?.subtr_actor_git_sha ?? null;
  const subtrActorCommitTimestamp = version?.subtr_actor_git_commit_timestamp ?? null;
  const rocketSenseSha = version?.rocket_sense_git_sha ?? null;
  const rocketSenseCommitTimestamp = version?.rocket_sense_git_commit_timestamp ?? null;

  return (
    <section className="page about-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">About</p>
          <h1>About Rocket Sense</h1>
        </div>
      </header>

      <p className="page-header-note">
        Rocket Sense is a Rocket League replay analytics service. Upload your replays and it parses
        them with subtr-actor to derive per-player and per-group stats, mechanics, kickoffs, and
        event breakdowns.
      </p>

      <div className="about-section">
        <h2>Server version</h2>
        {loading ? (
          <div className="status-line">
            <RefreshCw size={16} className="spin" />
            Loading
          </div>
        ) : null}
        {error ? <div className="status-line error">{error}</div> : null}
        {version ? (
          <table className="version-breakdown-table about-version-table">
            <tbody>
              <tr>
                <th scope="row">Event schema</th>
                <td>{version.event_stream_schema_version}</td>
              </tr>
              <tr>
                <th scope="row">Extractor</th>
                <td>
                  {version.extractor_name} {version.extractor_version}
                </td>
              </tr>
              <tr>
                <th scope="row">subtr-actor</th>
                <td>
                  {version.subtr_actor_version}
                  <CommitMetadata
                    sha={subtrActorSha}
                    timestamp={subtrActorCommitTimestamp}
                    repositoryUrl="https://github.com/rlrml/subtr-actor"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">rocket-sense</th>
                <td>
                  {rocketSenseSha || rocketSenseCommitTimestamp ? (
                    <CommitMetadata
                      sha={rocketSenseSha}
                      timestamp={rocketSenseCommitTimestamp}
                      repositoryUrl="https://github.com/rlrml/rocket-sense"
                    />
                  ) : (
                    <span className="subtle">unknown</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        ) : null}
      </div>

      {version && version.schema_changelog.length > 0 ? (
        <div className="about-section">
          <h2>Event schema changelog</h2>
          <table className="version-breakdown-table">
            <thead>
              <tr>
                <th>Version</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {version.schema_changelog
                .slice()
                .reverse()
                .map((entry) => (
                  <tr key={entry.version}>
                    <td>{entry.version}</td>
                    <td>{entry.note}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="about-section">
        <h2>Open source</h2>
        <p className="muted-text">
          Rocket Sense is built in the open. Issues and contributions are welcome.
        </p>
        <div className="about-link-grid">
          {ABOUT_REPOS.map((repo) => (
            <a
              key={repo.name}
              className="about-link-card"
              href={repo.url}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={20} />
              <span className="about-link-text">
                <strong>{repo.name}</strong>
                <span>{repo.description}</span>
              </span>
              <ExternalLink size={16} className="about-link-arrow" />
            </a>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2>Contact</h2>
        <div className="about-link-grid">
          <a
            className="about-link-card"
            href="https://github.com/rlrml/rocket-sense/issues"
            target="_blank"
            rel="noreferrer"
          >
            <Info size={20} />
            <span className="about-link-text">
              <strong>Report an issue</strong>
              <span>Bugs and feature requests on GitHub</span>
            </span>
            <ExternalLink size={16} className="about-link-arrow" />
          </a>
          <a className="about-link-card" href="mailto:IvanMalison@gmail.com">
            <Mail size={20} />
            <span className="about-link-text">
              <strong>Email</strong>
              <span>IvanMalison@gmail.com</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function CommitMetadata({
  sha,
  timestamp,
  repositoryUrl,
}: {
  sha: string | null;
  timestamp: string | null;
  repositoryUrl: string;
}) {
  const commitSha = commitShaForUrl(sha);
  return (
    <>
      {commitSha ? (
        <>
          {" "}
          <a
            className="git-sha"
            href={`${repositoryUrl}/commit/${commitSha}`}
            target="_blank"
            rel="noreferrer"
            title={sha ?? commitSha}
          >
            {shortCommitSha(sha)}
          </a>
        </>
      ) : null}
      {timestamp ? (
        <>
          {" "}
          <time className="subtle" dateTime={timestamp}>
            {formatDate(timestamp)}
          </time>
        </>
      ) : null}
    </>
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

function StatusLine({
  loading,
  error,
  count,
  label,
}: {
  loading: boolean;
  error: string | null;
  count?: number | null;
  label?: string;
}) {
  if (loading) {
    return (
      <div className="status-line">
        <RefreshCw size={16} className="spin" />
        Loading
      </div>
    );
  }
  if (error) return <div className="status-line error">{error}</div>;
  if (count != null && label)
    return (
      <div className="status-line">
        {count.toLocaleString()} {label}
      </div>
    );
  return null;
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status}`}>{statusLabel(status)}</span>;
}

const STATUS_TONE: Record<string, ChipTone> = {
  processed: "green",
  processing: "blue",
  pending: "blue",
  failed: "red",
};

/**
 * Replay-list status chip. A stale-but-processed replay renders as a single
 * amber "Processed" chip with a folded-in warning that opens the staleness
 * detail modal; anything else is a plain tone-coded chip.
 */
function ReplayStatusChip({
  replay,
  currentUser,
}: {
  replay: ReplayResponse;
  currentUser: CurrentUserResponse | null;
}) {
  const isStale = replay.status === "processed" && replay.staleness.is_stale;
  if (isStale) {
    const canReprocess = Boolean(
      currentUser && (currentUser.is_admin || replay.uploaded_by_user_id === currentUser.id),
    );
    return (
      <StalenessChip
        staleness={replay.staleness}
        processingVersion={replay.processing_version}
        replayId={replay.id}
        label={statusLabel(replay.status)}
        canReprocess={canReprocess}
      />
    );
  }
  return <Chip tone={STATUS_TONE[replay.status] ?? "neutral"}>{statusLabel(replay.status)}</Chip>;
}

function ReplayAggregateExclusionIcon({
  replay,
  size = 14,
}: {
  replay: ReplayResponse;
  size?: number;
}) {
  if (!replay.exclude_from_aggregates) return null;
  const label = replayAggregateExclusionLabel(replay.aggregate_exclusion_reason);
  return (
    <span className="replay-aggregate-exclusion-icon" title={label} aria-label={label} role="img">
      <AlertTriangle size={size} />
    </span>
  );
}

function replayAggregateExclusionLabel(reason: string | null): string {
  switch (reason) {
    case "player-left-or-inactive":
      return "Excluded from leaderboards, rank trends, and career stats because a player left or was inactive.";
    case "missing-player-active-time":
      return "Excluded from leaderboards, rank trends, and career stats because player activity time is incomplete.";
    default:
      return "Excluded from leaderboards, rank trends, and career stats.";
  }
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

function filterStatsForGroup(
  stats: StatAggregateResponse[],
  group: Pick<StatGroup, "terms" | "excludeKeys">,
): StatAggregateResponse[] {
  const excludeKeys = new Set(group.excludeKeys ?? []);
  return stats.filter(
    (stat) =>
      stat.category !== "context" &&
      !contextEventTypeKeys.has(stat.key) &&
      !excludeKeys.has(stat.key) &&
      group.terms.some((term) => statSearchText(stat).includes(term)),
  );
}

function statSearchText(stat: StatAggregateResponse): string {
  return `${stat.key} ${stat.display_name} ${stat.category}`.toLowerCase();
}

function filterEventsForGroup(
  events: MechanicEventResponse[],
  terms: readonly string[],
): MechanicEventResponse[] {
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

function playlistLabel(
  metadata: ReplayPlaylistMetadata | null | undefined,
  fallback: string | null,
): string {
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

// Prefer the active (in-game, clock-running) duration, with the wall-clock
// length of the replay shown in parentheses. Falls back to wall-clock alone
// when active time is unavailable (e.g. replays processed before active time
// was tracked).
function formatGameDuration(summary: {
  active_seconds: number | null;
  duration_seconds: number | null;
}): string {
  const { active_seconds, duration_seconds } = summary;
  if (active_seconds == null) return formatDuration(duration_seconds);
  if (duration_seconds == null) return formatDuration(active_seconds);
  return `${formatDuration(active_seconds)} (${formatDuration(duration_seconds)})`;
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

function ratePerWindow(perMinute: number | null, rateWindowMinutes: number): number | null {
  return perMinute == null ? null : perMinute * rateWindowMinutes;
}

function isBoostAggregateStat(stat: StatAggregateResponse): boolean {
  return stat.category === "boost" || stat.key.startsWith("boost");
}

function formatCounts(counts: Array<{ status: string; count: number }>): string {
  if (counts.length === 0) return "None";
  return counts
    .map((count) => `${statusLabel(count.status)} ${count.count.toLocaleString()}`)
    .join(", ");
}

function formatPercent(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  return `${Math.round(value * 100)}%`;
}

function isNumber(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
