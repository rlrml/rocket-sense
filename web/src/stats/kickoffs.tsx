import type { ReplayModel } from "@rlrml/viewer";
import {
  Anchor,
  CircleDotDashed,
  Gauge,
  type LucideIcon,
  ShieldCheck,
  Trophy,
  Video,
} from "lucide-react";
import {
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  lazy,
  type ReactNode,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from "react";
import { PlayerIdentity } from "../playerIdentity";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import { formatBoostPercent } from "./boostUnits";
import type { EventClip } from "./EventClipPlayer";
import { useEventPreviewSelection } from "./eventPreview";
import { KickoffShapeIcon } from "./KickoffShapeIcon";
import type { KickoffPathPlayer } from "./KickoffShapeDiagram";
import {
  KickoffFilterGroup,
  shapeOptions,
  sideOptions,
  type KickoffShapeFilter,
  type KickoffSideFilter,
} from "./KickoffSpawnBreakdown";
import {
  ComparisonBar,
  outcomeDistributionColorStyle,
  outcomeSegmentClassName,
  PLAYER_RELATIVE_OUTCOME_COLORS,
  PlayerComparisonChart,
  type ComparisonRow,
  type OutcomeDistributionColors,
  type OutcomeDistributionLevel,
  type OutcomeDistributionSegment,
  type SegmentedBarSegment,
} from "./shared";

const KickoffShapeDiagram = lazy(() =>
  import("./KickoffShapeDiagram").then((module) => ({ default: module.KickoffShapeDiagram })),
);

export const kickoffEventTypes = ["kickoff"];

// Kickoff clips are driven entirely by frame indices, which align between the
// upstream event payload and the parsed replay. (Absolute event timestamps do
// NOT: the player rebases frame times to start at 0.) Start and end are resolved
// against the parsed frames inside the player; these seconds-based postrolls add
// breathing room after the resolving beat, with a max-duration cap so the loop
// always terminates promptly.
const KICKOFF_CLIP_FOLLOW_UP_POSTROLL_SECONDS = 1;
const KICKOFF_CLIP_FIRST_TOUCH_POSTROLL_SECONDS = 2.5;
const KICKOFF_CLIP_MAX_DURATION_SECONDS = 7;
const KICKOFF_CLIP_MIN_DURATION_SECONDS = 3;
// How far past the kickoff's start frame to scan for the countdown -> 0 (live
// action) transition when the payload has no indexed live-action frame.
const KICKOFF_LIVE_ACTION_SEARCH_FRAMES = 240;

const TEAM_OUTCOME_COLORS: OutcomeDistributionColors = {
  positive: "#2563eb",
  "positive-strong": "#1e3a8a",
  "positive-clear": "#2563eb",
  "positive-unknown": "#bfdbfe",
  neutral: "#64748b",
  "neutral-clear": "#cbd5e1",
  negative: "#ea580c",
  "negative-strong": "#9a3412",
  "negative-clear": "#ea580c",
  "negative-unknown": "#fed7aa",
};

const EventClipPreview = lazy(() =>
  import("./EventClipPlayer").then((module) => ({ default: module.EventClipPreview })),
);

type KickoffType = "diagonal" | "center_offset" | "center" | "unknown";
type KickoffDirection = "left" | "right" | "center" | "unknown";

interface KickoffDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  replayId?: string;
  scope?: "replay" | "group";
}

interface KickoffRow {
  event: MechanicEventResponse;
  index: number;
  startTime: number | null;
  endTime: number | null;
  liveActionStartTime: number | null;
  liveActionStartFrame: number | null;
  movementStartTime: number | null;
  movementStartFrame: number | null;
  outcome: string | null;
  possessionOutcome: string | null;
  winningTeam: number | null;
  possessionTeam: number | null;
  nextPossession: KickoffPossession | null;
  scoringTeam: number | null;
  kickoffGoal: boolean;
  kickoffType: KickoffType;
  kickoffDirection: KickoffDirection;
  timeToGoal: number | null;
  takerDelayFrames: number | null;
  exitSpeed: number | null;
  winStrength: number | null;
  winStrengthBand: KickoffStrengthBand;
  firstTouch: KickoffTouch;
  followUpTouch: KickoffTouch;
  advantage: string | null;
  advantageTeam: number | null;
  advantagePlayerName: string | null;
  advantageSecondsAfterFirstTouch: number | null;
  teamZeroTaker: KickoffPlayerBehavior | null;
  teamOneTaker: KickoffPlayerBehavior | null;
  teamZeroSupport: KickoffPlayerBehavior[];
  teamOneSupport: KickoffPlayerBehavior[];
}

interface KickoffTouch {
  playerKey: string | null;
  playerName: string;
  team: number | null;
  time: number | null;
  frame: number | null;
}

interface KickoffPossession {
  playerKey: string | null;
  playerName: string;
  team: number | null;
  startTime: number | null;
  frame: number | null;
}

interface PossessionSpan {
  playerKey: string | null;
  playerName: string;
  team: number | null;
  startTime: number | null;
  endTime: number | null;
  frame: number | null;
}

interface KickoffPlayerBehavior {
  playerKey: string | null;
  playerName: string;
  platform: string | null;
  platformPlayerId: string | null;
  team: number | null;
  role: "taker" | "support";
  spawn: string | null;
  approach: string | null;
  outcome: string | null;
  supportBehavior: string | null;
  startBoost: number | null;
  boostAfter: number | null;
  boostAtFirstTouch: number | null;
  timeToBall: number | null;
  boostCollected: number | null;
  boostUsed: number | null;
  firstTouchTime: number | null;
  startPosition: [number, number, number] | null;
  distanceToBallAtFirstTouch: number | null;
}

interface PlayerKickoffSummary {
  key: string;
  name: string;
  platform: string | null;
  platform_player_id: string | null;
  rank_tier: number | null;
  rank_division: number | null;
  rank_mmr: number | null;
  rank_is_fallback?: boolean;
  rank_fallback_replay_date?: string | null;
  team: number | null;
  takerCount: number;
  supportCount: number;
  advantagesFor: number;
  advantagesAgainst: number;
  takerAdvantagesFor: number;
  takerAdvantagesAgainst: number;
  supportAdvantagesFor: number;
  supportAdvantagesAgainst: number;
  touched: number;
  firstTouchesAsTaker: number;
  faked: number;
  missed: number;
  kickoffGoalsFor: number;
  kickoffGoalsAgainst: number;
  timeToBallSum: number;
  timeToBallCount: number;
  boostCollectedSum: number;
  boostCollectedCount: number;
  boostUsedSum: number;
  boostUsedCount: number;
  boostAfterSum: number;
  boostAfterCount: number;
  supportTimeToBallSum: number;
  supportTimeToBallCount: number;
  supportBoostUsedSum: number;
  supportBoostUsedCount: number;
  supportBoostAfterSum: number;
  supportBoostAfterCount: number;
  approaches: Map<string, number>;
  supportBehaviors: Map<string, number>;
  strengthOutcomes: Record<KickoffStrengthBand, KickoffStrengthOutcome>;
  takerStrengthOutcomes: Record<KickoffStrengthBand, KickoffStrengthOutcome>;
  supportStrengthOutcomes: Record<KickoffStrengthBand, KickoffStrengthOutcome>;
}

type KickoffStrengthBand = "narrow" | "clear" | "strong" | "unknown";

/** A player the preview camera should follow, chosen by hovering their chip. */
interface KickoffPerspective {
  playerKey: string | null;
  playerName: string;
}

function perspectiveChipKey(playerKey: string | null, playerName: string): string {
  return playerKey ?? playerName;
}

interface KickoffStrengthOutcome {
  wins: number;
  losses: number;
  neutral: number;
}

export function KickoffDetail({ events, players, replayId, scope }: KickoffDetailProps) {
  // Per-replay every player has one team, so win/loss + advantage bars tint with
  // that team's blue/orange. Grouped views may fold together games where the
  // player was on either team, so team tints are meaningless there — use the
  // neutral player-relative palette instead.
  const teamColored = scope !== "group";
  // Blue/Orange is a per-replay frame of reference. Across a group it folds
  // together unrelated matchups, so the team-outcome summary and the blue/orange
  // hero metrics are meaningless there and are hidden (a proper by-team rollup
  // would have to group on actual team identities, not replay-local sides).
  const grouped = scope === "group";
  const possessionSpans = useMemo(
    () =>
      events
        .filter((event) => event.event_type === "possession")
        .map((event) => possessionSpan(event, players))
        .filter((span): span is PossessionSpan => Boolean(span))
        .sort(
          (left, right) =>
            (left.startTime ?? Number.POSITIVE_INFINITY) -
            (right.startTime ?? Number.POSITIVE_INFINITY),
        ),
    [events, players],
  );
  const kickoffs = useMemo(
    () =>
      events
        .filter((event) => event.event_type === "kickoff")
        .map((event, index) => kickoffRow(event, index, players, possessionSpans))
        .sort(
          (left, right) =>
            (left.startTime ?? Number.POSITIVE_INFINITY) -
            (right.startTime ?? Number.POSITIVE_INFINITY),
        ),
    [events, players, possessionSpans],
  );
  // The player-behavior charts can be narrowed to a kickoff shape/side (the same
  // two axes as the player career view). The filter is scoped to that section;
  // the team-outcome summary and the per-kickoff cards below stay on the full set.
  const [shapeFilter, setShapeFilter] = useState<KickoffShapeFilter>("all");
  const [sideFilter, setSideFilter] = useState<KickoffSideFilter>("all");
  const [tab, setTab] = useState<"stats" | "byKickoff">("stats");
  const behaviorKickoffs = useMemo(
    () => kickoffs.filter((kickoff) => matchesKickoffFilter(kickoff, shapeFilter, sideFilter)),
    [kickoffs, shapeFilter, sideFilter],
  );
  const playerSummaries = useMemo(
    () => kickoffPlayerSummaries(behaviorKickoffs, players),
    [behaviorKickoffs, players],
  );
  const summary = useMemo(() => kickoffSummary(kickoffs), [kickoffs]);
  const kickoffKey = useCallback((kickoff: KickoffRow) => kickoff.event.id, []);
  // Hovering a player chip inside a kickoff card temporarily reseats the preview
  // camera on that player (loser and support players included); leaving the chip
  // falls back to the default winner perspective.
  const [perspective, setPerspective] = useState<KickoffPerspective | null>(null);
  const perspectiveKey = perspective
    ? perspectiveChipKey(perspective.playerKey, perspective.playerName)
    : null;
  const buildClip = useCallback(
    (kickoff: KickoffRow, replayNonce: number): EventClip | null => {
      const previewStart = kickoffPreviewStart(kickoff);
      if (!previewStart) {
        return null;
      }
      // Try the hovered perspective first, then the winner; fall back to a free
      // camera if neither resolves to a player track in the parsed replay.
      const followTargets = [perspective, kickoffWinnerPreviewPlayer(kickoff)].filter(
        (target): target is { playerKey: string | null; playerName: string | null } =>
          Boolean(target),
      );
      return {
        // start/end are inert fallbacks: startFrame + resolveStart/resolveEnd drive
        // playback against the parsed frames (frame indices are rebase-safe; absolute
        // event timestamps are not).
        start: 0,
        end: 0,
        startFrame: previewStart.frame,
        resolveStart: previewStart.resolveStart,
        resolveEnd: (replay) => kickoffClipEndTime(replay, kickoff, previewStart.frame),
        camera: (cam) => {
          for (const target of followTargets) {
            if (
              cam.followPlayer({
                playerKey: target.playerKey,
                playerName: target.playerName,
                ballCam: true,
              })
            ) {
              return;
            }
          }
          cam.freeCamera("side");
        },
        // The perspective is intentionally NOT part of the key: same key means the
        // player re-aims the camera without restarting the loop (see applyClip).
        key: `${kickoff.event.id}:${replayNonce}`,
      };
    },
    [perspective],
  );
  const {
    activeItem: activeKickoff,
    activeKey: activeKickoffId,
    clip,
    activateItem: activateKickoff,
  } = useEventPreviewSelection(kickoffs, kickoffKey, buildClip);

  return (
    <div className="kickoff-detail">
      {kickoffs.length ? (
        <>
          <div className="kickoff-tabs" role="tablist" aria-label="Kickoff view">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "stats"}
              className={tab === "stats" ? "active" : ""}
              onClick={() => setTab("stats")}
            >
              Stats
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "byKickoff"}
              className={tab === "byKickoff" ? "active" : ""}
              onClick={() => setTab("byKickoff")}
            >
              Kickoff by kickoff
            </button>
          </div>

          {tab === "stats" ? (
            <div className="stat-section-grid">
              {grouped ? null : (
                <section className="chart-panel full-span">
                  <div className="chart-panel-header">
                    <div>
                      <h3>Team outcomes</h3>
                      <span>Replay-local Blue versus Orange kickoff results.</span>
                    </div>
                  </div>
                  <KickoffTeamOutcomeSummary summary={summary} />
                </section>
              )}

              <section className="chart-panel full-span">
                <div className="chart-panel-header">
                  <div>
                    <h3>Player behavior</h3>
                    <span>Takers and support compared per metric, filterable by kickoff type.</span>
                  </div>
                </div>
                <KickoffPlayerBehavior
                  allKickoffs={kickoffs}
                  summaries={playerSummaries}
                  players={players}
                  teamColored={teamColored}
                  shapeFilter={shapeFilter}
                  sideFilter={sideFilter}
                  onShapeFilter={setShapeFilter}
                  onSideFilter={setSideFilter}
                />
              </section>
            </div>
          ) : (
            <div className="stat-section-grid">
              <section className="chart-panel full-span">
                <div className="chart-panel-header">
                  <div>
                    <h3>Kickoff by kickoff</h3>
                    <span>
                      Outcome, possession, first touch, and every player&apos;s assignment.
                    </span>
                  </div>
                </div>
                <div className="kickoff-card-list">
                  {kickoffs.map((kickoff) => (
                    <KickoffCard
                      kickoff={kickoff}
                      key={kickoff.event.id}
                      active={kickoff.event.id === activeKickoffId}
                      onActivate={(force) => activateKickoff(kickoff, force)}
                      perspectiveKey={kickoff.event.id === activeKickoffId ? perspectiveKey : null}
                      onPerspective={setPerspective}
                      replayId={replayId}
                    />
                  ))}
                </div>
              </section>

              {replayId ? (
                <Suspense
                  fallback={
                    <aside className="event-preview-pip">
                      <div className="event-preview-pip-bar">
                        <span className="event-preview-pip-label">Loading…</span>
                      </div>
                      <div className="event-clip-player">
                        <div className="event-clip-status">Loading player…</div>
                      </div>
                    </aside>
                  }
                >
                  <EventClipPreview
                    replayId={replayId}
                    clip={clip}
                    label={
                      activeKickoff ? kickoffPreviewLabel(activeKickoff, perspective) : "Loading…"
                    }
                    openHref={`/replays/${encodeURIComponent(replayId)}/player`}
                  />
                </Suspense>
              ) : null}
            </div>
          )}
        </>
      ) : (
        <div className="stat-empty">No kickoff events are available for this selection yet.</div>
      )}
    </div>
  );
}

function KickoffTeamOutcomeSummary({ summary }: { summary: ReturnType<typeof kickoffSummary> }) {
  const advantageTotal = summary.blueAdvantages + summary.noAdvantage + summary.orangeAdvantages;
  return (
    <div className="kickoff-team-outcomes">
      {/* Blue-relative (team 0): Blue wins fill from the left shaded by strength,
          Orange wins fill from the right, neutral holds the center — the same
          gradated ramp the taker rows use, framed as Blue vs Orange. */}
      <KickoffTeamWinBar
        ariaLabel="Kickoff wins by replay-local team and strength"
        outcomes={summary.teamStrengthOutcomes}
      />
      {advantageTotal > 0 ? (
        <KickoffTeamOutcomeBar
          ariaLabel="Kickoff advantage by replay-local team"
          blueLabel="Blue advantage"
          blueValue={summary.blueAdvantages}
          neutralLabel="No advantage"
          neutralValue={summary.noAdvantage}
          orangeLabel="Orange advantage"
          orangeValue={summary.orangeAdvantages}
          total={advantageTotal}
        />
      ) : null}
    </div>
  );
}

function KickoffTeamOutcomeBar({
  ariaLabel,
  blueLabel,
  blueValue,
  neutralLabel,
  neutralValue,
  orangeLabel,
  orangeValue,
  total,
}: {
  ariaLabel: string;
  blueLabel: string;
  blueValue: number;
  neutralLabel: string;
  neutralValue: number;
  orangeLabel: string;
  orangeValue: number;
  total: number;
}) {
  const segments = withGuaranteedLabel(
    [
      teamOutcomeSegment("blue", blueLabel, blueValue, total),
      teamOutcomeSegment("neutral", neutralLabel, neutralValue, total),
      teamOutcomeSegment("orange", orangeLabel, orangeValue, total),
    ],
    (segment) => segment.label,
  );
  // Frame the advantage by the team that came out ahead (no-advantage excluded).
  const leader = teamWinLeader(blueValue, orangeValue);
  return (
    <div className="kickoff-team-row">
      <ComparisonBar
        ariaLabel={ariaLabel}
        segments={segments}
        total={total}
        maxValue={total}
        style={outcomeDistributionColorStyle(TEAM_OUTCOME_COLORS)}
      />
      <div className="kickoff-team-row-value">
        <TeamWinRate term="adv" leader={leader} />
      </div>
    </div>
  );
}

function teamOutcomeSegment(
  team: "blue" | "neutral" | "orange",
  label: string,
  value: number,
  total: number,
): SegmentedBarSegment {
  const tone = team === "blue" ? "positive" : team === "orange" ? "negative" : "neutral";
  const share = total > 0 ? value / total : 0;
  return {
    key: team,
    className: outcomeSegmentClassName(tone, "clear"),
    label,
    value,
    // Fold the per-team count into the bar so the section needs no caption beneath it.
    visibleLabel:
      share >= 0.1
        ? `${label}: ${value.toLocaleString()} (${formatSharePercent(share)})`
        : undefined,
    title: `${label}: ${value.toLocaleString()} (${formatSharePercent(share)})`,
  };
}

// Blue-vs-Orange win bar, gradated by win strength. Built like the taker rows'
// KickoffStrengthSummary but rendered full-width (no left label) to match the
// advantage bar above it, and with team-relative labels: a "loss" band is Blue
// losing decisively, i.e. an Orange win, so it reads as "Orange <strength> win".
const TEAM_WIN_BANDS: Array<{
  band: KickoffStrengthBand;
  level: OutcomeDistributionLevel;
  label: string;
}> = [
  { band: "strong", level: "strong", label: "Blue strong win" },
  { band: "clear", level: "clear", label: "Blue clear win" },
  { band: "narrow", level: "narrow", label: "Blue narrow win" },
  { band: "unknown", level: "unknown", label: "Blue win" },
];

const TEAM_LOSS_BANDS: Array<{
  band: KickoffStrengthBand;
  level: OutcomeDistributionLevel;
  label: string;
}> = [
  { band: "unknown", level: "unknown", label: "Orange win" },
  { band: "narrow", level: "narrow", label: "Orange narrow win" },
  { band: "clear", level: "clear", label: "Orange clear win" },
  { band: "strong", level: "strong", label: "Orange strong win" },
];

function KickoffTeamWinBar({
  ariaLabel,
  outcomes,
}: {
  ariaLabel: string;
  outcomes: Record<KickoffStrengthBand, KickoffStrengthOutcome>;
}) {
  const rawSegments: OutcomeDistributionSegment[] = [
    ...TEAM_WIN_BANDS.map(({ band, level, label }) => ({
      key: `blue-${band}`,
      tone: "positive" as const,
      level,
      label,
      value: outcomes[band].wins,
    })),
    {
      key: "neutral",
      tone: "neutral" as const,
      level: "clear" as const,
      label: "Neutral",
      value:
        outcomes.narrow.neutral +
        outcomes.clear.neutral +
        outcomes.strong.neutral +
        outcomes.unknown.neutral,
    },
    ...TEAM_LOSS_BANDS.map(({ band, level, label }) => ({
      key: `orange-${band}`,
      tone: "negative" as const,
      level,
      label,
      value: outcomes[band].losses,
    })),
  ];
  const total = rawSegments.reduce((sum, segment) => sum + segment.value, 0);
  if (total === 0) return null;

  // The strength band shows as a shade, so the count printed inline can be
  // ambiguous about which result it is; the hover title spells it out.
  const segments = rawSegments.map((segment) => ({
    key: segment.key,
    className: outcomeSegmentClassName(segment.tone, segment.level),
    label: segment.label,
    value: segment.value,
    // Always show count with the percentage in parentheses.
    visibleLabel:
      segment.value > 0
        ? `${segment.value} (${formatSharePercent(segment.value / total)})`
        : undefined,
    title:
      segment.value > 0
        ? `${segment.label}: ${segment.value} (${formatSharePercent(segment.value / total)})`
        : undefined,
  }));

  // outcomes is Blue-relative: wins = Blue wins, losses = Orange wins. Frame each
  // win-rate by the team that came out ahead ("all" = decided, "clear" = narrow
  // excluded), so the percentage always names the advantaged team.
  const allLeader = teamWinLeader(
    outcomes.narrow.wins + outcomes.clear.wins + outcomes.strong.wins + outcomes.unknown.wins,
    outcomes.narrow.losses +
      outcomes.clear.losses +
      outcomes.strong.losses +
      outcomes.unknown.losses,
  );
  const clearLeader = teamWinLeader(
    outcomes.clear.wins + outcomes.strong.wins + outcomes.unknown.wins,
    outcomes.clear.losses + outcomes.strong.losses + outcomes.unknown.losses,
  );

  return (
    <div className="kickoff-team-row">
      <ComparisonBar
        ariaLabel={ariaLabel}
        segments={segments}
        total={total}
        maxValue={total}
        style={outcomeDistributionColorStyle(TEAM_OUTCOME_COLORS)}
      />
      <div className="kickoff-team-row-value">
        <TeamWinRate term="all" leader={allLeader} />
        <TeamWinRate term="clear" leader={clearLeader} />
      </div>
    </div>
  );
}

interface TeamWinRateLeader {
  label: string;
  teamClass: string;
  pct: number;
}

// Which team came out ahead over the given decided counts, and by what share.
function teamWinLeader(blueCount: number, orangeCount: number): TeamWinRateLeader | null {
  const decided = blueCount + orangeCount;
  if (decided <= 0) return null;
  if (blueCount === orangeCount) return { label: "Even", teamClass: "neutral", pct: 0.5 };
  const blueLeads = blueCount > orangeCount;
  return {
    label: blueLeads ? "Blue" : "Orange",
    teamClass: blueLeads ? "blue" : "orange",
    pct: (blueLeads ? blueCount : orangeCount) / decided,
  };
}

function TeamWinRate({ term, leader }: { term: string; leader: TeamWinRateLeader | null }) {
  return (
    <span className="kickoff-team-win-rate">
      <span className="winloss-term">{term}</span>
      {leader ? (
        <span className={`team-text-${leader.teamClass}`}>
          {leader.label} {formatWinPct(leader.pct)}
        </span>
      ) : (
        <span className="team-text-neutral">—</span>
      )}
    </span>
  );
}

function matchesKickoffFilter(
  kickoff: KickoffRow,
  shape: KickoffShapeFilter,
  side: KickoffSideFilter,
): boolean {
  if (shape !== "all" && kickoff.kickoffType !== shape) return false;
  if (side !== "all" && kickoff.kickoffDirection !== side) return false;
  return true;
}

function countMatchingKickoffs(
  kickoffs: KickoffRow[],
  shape: KickoffShapeFilter,
  side: KickoffSideFilter,
): number {
  return kickoffs.reduce(
    (count, kickoff) => (matchesKickoffFilter(kickoff, shape, side) ? count + 1 : count),
    0,
  );
}

function KickoffPlayerBehavior({
  allKickoffs,
  summaries,
  players,
  teamColored,
  shapeFilter,
  sideFilter,
  onShapeFilter,
  onSideFilter,
}: {
  allKickoffs: KickoffRow[];
  summaries: PlayerKickoffSummary[];
  players: ReplayPlayer[];
  teamColored: boolean;
  shapeFilter: KickoffShapeFilter;
  sideFilter: KickoffSideFilter;
  onShapeFilter: (value: KickoffShapeFilter) => void;
  onSideFilter: (value: KickoffSideFilter) => void;
}) {
  const takers = summaries.filter((summary) => summary.takerCount > 0);
  const supports = summaries.filter((summary) => summary.supportCount > 0);
  // Stable per-player hue so the same player keeps one shade across every chart,
  // independent of how each chart re-sorts its rows.
  const playerIndexByKey = useMemo(() => teamLocalPlayerIndexByKey(players), [players]);

  return (
    <div className="kickoff-player-behavior">
      <div className="kickoff-filter-stack" aria-label="Kickoff type filters">
        <KickoffFilterGroup
          label="Shape"
          options={shapeOptions.map((option) => ({
            ...option,
            count: countMatchingKickoffs(allKickoffs, option.key, sideFilter),
          }))}
          selected={shapeFilter}
          onSelect={(value) => onShapeFilter(value as KickoffShapeFilter)}
        />
        <KickoffFilterGroup
          label="Side"
          options={sideOptions.map((option) => ({
            ...option,
            count: countMatchingKickoffs(allKickoffs, shapeFilter, option.key),
          }))}
          selected={sideFilter}
          onSelect={(value) => onSideFilter(value as KickoffSideFilter)}
        />
      </div>
      <KickoffRoleSection
        role="taker"
        label="Takers"
        summaries={takers}
        teamColored={teamColored}
        playerIndexByKey={playerIndexByKey}
        emptyLabel="No taker data for this kickoff type."
      />
      <KickoffRoleSection
        role="support"
        label="Support"
        summaries={supports}
        teamColored={teamColored}
        playerIndexByKey={playerIndexByKey}
        emptyLabel="No support data for this kickoff type."
      />
    </div>
  );
}

function KickoffRoleSection({
  role,
  label,
  summaries,
  teamColored,
  playerIndexByKey,
  emptyLabel,
}: {
  role: "taker" | "support";
  label: string;
  summaries: PlayerKickoffSummary[];
  teamColored: boolean;
  playerIndexByKey: Map<string, number>;
  emptyLabel: string;
}) {
  return (
    <div className="kickoff-player-table-group">
      <div className="kickoff-player-table-label">{label}</div>
      {summaries.length ? (
        <div className="kickoff-comparison-grid">
          {(role === "taker"
            ? takerComparisonCharts(summaries, teamColored, playerIndexByKey)
            : supportComparisonCharts(summaries, teamColored, playerIndexByKey)
          ).filter(Boolean)}
        </div>
      ) : (
        <div className="kickoff-player-table-empty">{emptyLabel}</div>
      )}
    </div>
  );
}

function comparisonLabel(summary: PlayerKickoffSummary): ReactNode {
  return <PlayerIdentity className="kickoff-comparison-label" player={summary} showRank />;
}

function teamSegmentClass(team: number | null): string {
  return team === 0 ? "blue" : team === 1 ? "orange" : "unknown";
}

// Per-game (teamColored): tint magnitude bars by the player's team plus a
// per-teammate shade so the four players stay distinguishable. Grouped views:
// team is meaningless, so use one neutral accent — length encodes the value and
// the row label the identity.
function magnitudeSegmentClass(
  summary: PlayerKickoffSummary,
  teamColored: boolean,
  playerIndexByKey: Map<string, number>,
): string {
  if (!teamColored) return "kickoff-magnitude-accent";
  return `team-segment-${teamSegmentClass(summary.team)} player-shade-${playerIndexByKey.get(summary.key) ?? 0}`;
}

function teamLocalPlayerIndexByKey(players: ReplayPlayer[]): Map<string, number> {
  const indexes = new Map<string, number>();
  const counts = new Map<number | null, number>();
  for (const player of players) {
    const key = playerKey(player);
    if (!key) continue;
    const index = counts.get(player.team) ?? 0;
    indexes.set(key, index);
    counts.set(player.team, index + 1);
  }
  return indexes;
}

interface MagnitudeChartSpec {
  key: string;
  title: string;
  value: (summary: PlayerKickoffSummary) => number | null;
  format: (value: number) => string;
  scaleMax?: number;
  emptyLabel?: string;
  /** Omit to keep the shared player order; set to rank by the value instead. */
  sort?: "asc" | "desc";
}

// A single-value comparison chart: one hued bar per player, length scaled across
// the group. Rows keep the shared player order unless `sort` ranks them by value.
// Hidden when no data.
function magnitudeChart(
  spec: MagnitudeChartSpec,
  summaries: PlayerKickoffSummary[],
  teamColored: boolean,
  playerIndexByKey: Map<string, number>,
): ReactNode {
  const entries = summaries
    .map((summary) => ({ summary, value: spec.value(summary) }))
    .filter(
      (entry): entry is { summary: PlayerKickoffSummary; value: number } => entry.value != null,
    );
  if (!entries.length) return null;
  if (spec.sort) {
    entries.sort((left, right) =>
      spec.sort === "asc" ? left.value - right.value : right.value - left.value,
    );
  }
  const scaleMax = spec.scaleMax ?? entries.reduce((max, entry) => Math.max(max, entry.value), 0);
  const rows: ComparisonRow[] = entries.map(({ summary, value }) => ({
    key: summary.key,
    label: comparisonLabel(summary),
    ariaLabel: `${summary.name}: ${spec.format(value)}`,
    segments: [
      {
        key: "value",
        className: magnitudeSegmentClass(summary, teamColored, playerIndexByKey),
        label: summary.name,
        value: Math.max(0, value),
        // Put the value on the bar itself so every magnitude bar carries text.
        visibleLabel: spec.format(value),
        title: `${summary.name}: ${spec.format(value)}`,
      },
    ],
    total: Math.max(0, value),
    maxValue: scaleMax,
    valueLabel: spec.format(value),
    // Zero-value bars have nothing to fill; still show the value on the track.
    placeholder: spec.format(value),
  }));
  return (
    <PlayerComparisonChart
      key={spec.key}
      title={spec.title}
      rows={rows}
      emptyLabel={spec.emptyLabel}
    />
  );
}

function bandTotals(outcomes: Record<KickoffStrengthBand, KickoffStrengthOutcome>): {
  wins: number;
  losses: number;
  neutral: number;
  total: number;
} {
  const wins = WIN_BANDS.reduce((sum, { band }) => sum + outcomes[band].wins, 0);
  const losses = LOSS_BANDS.reduce((sum, { band }) => sum + outcomes[band].losses, 0);
  const neutral =
    outcomes.narrow.neutral +
    outcomes.clear.neutral +
    outcomes.strong.neutral +
    outcomes.unknown.neutral;
  return { wins, losses, neutral, total: wins + losses + neutral };
}

function strengthSegments(
  outcomes: Record<KickoffStrengthBand, KickoffStrengthOutcome>,
  total: number,
): SegmentedBarSegment[] {
  const raw: Array<{
    key: string;
    tone: OutcomeDistributionSegment["tone"];
    level: OutcomeDistributionLevel;
    label: string;
    value: number;
  }> = [
    ...WIN_BANDS.map(({ band, level, label }) => ({
      key: `win-${band}`,
      tone: "positive" as const,
      level,
      label,
      value: outcomes[band].wins,
    })),
    {
      key: "neutral",
      tone: "neutral" as const,
      level: "clear" as const,
      label: "Neutral",
      value:
        outcomes.narrow.neutral +
        outcomes.clear.neutral +
        outcomes.strong.neutral +
        outcomes.unknown.neutral,
    },
    ...LOSS_BANDS.map(({ band, level, label }) => ({
      key: `loss-${band}`,
      tone: "negative" as const,
      level,
      label,
      value: outcomes[band].losses,
    })),
  ];
  return raw.map((segment) =>
    outcomeBarSegment(
      segment.key,
      segment.tone,
      segment.level,
      segment.label,
      segment.value,
      total,
    ),
  );
}

// In-bar text, tiered by how much room the segment has: name + count + % when
// wide, then count + %, then just the count. `name` is included for categorical
// bars (approach, take outcomes) where the color alone isn't self-explanatory.
function barSegmentLabel(value: number, total: number, name?: string): string | undefined {
  if (value <= 0) return undefined;
  const share = total > 0 ? value / total : 0;
  const pct = Math.round(share * 100);
  if (name) {
    if (share >= 0.16) return `${name} ${value} (${pct}%)`;
    if (share >= 0.08) return `${value} (${pct}%)`;
    if (share >= 0.04) return String(value);
    return undefined;
  }
  if (share >= 0.08) return `${value} (${pct}%)`;
  if (share >= 0.04) return String(value);
  return undefined;
}

function outcomeBarSegment(
  key: string,
  tone: OutcomeDistributionSegment["tone"],
  level: OutcomeDistributionLevel,
  label: string,
  value: number,
  total: number,
): SegmentedBarSegment {
  const share = total > 0 ? value / total : 0;
  return {
    key,
    className: outcomeSegmentClassName(tone, level),
    label,
    value,
    visibleLabel: barSegmentLabel(value, total),
    title: value > 0 ? `${label}: ${value} (${Math.round(share * 100)}%)` : undefined,
  };
}

// Per-game: tint by the player's team (own team good, opponent bad). Grouped:
// the team-neutral player-relative palette, matching the career kickoff panel.
function distributionColors(
  summary: PlayerKickoffSummary,
  teamColored: boolean,
): OutcomeDistributionColors {
  return teamColored ? kickoffPlayerOutcomeColors(summary.team) : PLAYER_RELATIVE_OUTCOME_COLORS;
}

function formatWinPct(value: number | null): string {
  return value == null ? "—" : `${Math.round(value * 100)}%`;
}

// Guarantee a bar shows at least some text: if no segment cleared its own label
// threshold, label the largest one. Mutates the (freshly built) segment array.
function withGuaranteedLabel(
  segments: SegmentedBarSegment[],
  labelFor: (segment: SegmentedBarSegment) => string,
): SegmentedBarSegment[] {
  const visible = segments.filter((segment) => segment.value > 0);
  if (visible.length && !visible.some((segment) => segment.visibleLabel != null)) {
    let largest = visible[0];
    for (const segment of visible) {
      if (segment.value > largest.value) largest = segment;
    }
    largest.visibleLabel = labelFor(largest);
  }
  return segments;
}

function winLossChart(
  summaries: PlayerKickoffSummary[],
  outcomesOf: (
    summary: PlayerKickoffSummary,
  ) => Record<KickoffStrengthBand, KickoffStrengthOutcome>,
  teamColored: boolean,
): ReactNode {
  const entries = summaries
    .map((summary) => {
      const outcomes = outcomesOf(summary);
      const totals = bandTotals(outcomes);
      // Win rate excludes neutral kickoffs from the denominator. Two ways: over
      // all decided kickoffs, and over decisive ones only (narrow excluded).
      const decided = totals.wins + totals.losses;
      const winsDecisive = totals.wins - outcomes.narrow.wins;
      const decidedDecisive = decided - outcomes.narrow.wins - outcomes.narrow.losses;
      const inclPct = decided > 0 ? totals.wins / decided : null;
      const exclPct = decidedDecisive > 0 ? winsDecisive / decidedDecisive : null;
      // Sort by the average of whichever win-rate percentages are defined.
      const defined = [inclPct, exclPct].filter((value): value is number => value != null);
      const sortKey = defined.length
        ? defined.reduce((sum, value) => sum + value, 0) / defined.length
        : -1;
      return { summary, outcomes, totals, inclPct, exclPct, sortKey };
    })
    .filter((entry) => entry.totals.total > 0)
    .sort((left, right) => right.sortKey - left.sortKey);
  if (!entries.length) return null;
  const rows: ComparisonRow[] = entries.map(({ summary, outcomes, totals, inclPct, exclPct }) => {
    return {
      key: summary.key,
      label: comparisonLabel(summary),
      ariaLabel: `${summary.name} kickoff win rate`,
      segments: withGuaranteedLabel(strengthSegments(outcomes, totals.total), (segment) =>
        String(segment.value),
      ),
      total: totals.total,
      valueLabel: (
        <span className="winloss-value">
          <span
            className="winloss-rate"
            title="Win rate over all decided kickoffs (narrow included)"
          >
            <span className="winloss-term">all</span>
            {formatWinPct(inclPct)}
          </span>
          <span
            className="winloss-rate winloss-rate-secondary"
            title="Win rate over clear kickoffs only (narrow excluded)"
          >
            <span className="winloss-term">clear</span>
            {formatWinPct(exclPct)}
          </span>
        </span>
      ),
      style: outcomeDistributionColorStyle(distributionColors(summary, teamColored)),
    };
  });
  return (
    <PlayerComparisonChart
      key="winloss"
      title="Win / loss"
      rows={rows}
      emptyLabel="No kickoff outcomes yet."
    />
  );
}

function controlChart(
  summaries: PlayerKickoffSummary[],
  forOf: (summary: PlayerKickoffSummary) => number,
  againstOf: (summary: PlayerKickoffSummary) => number,
  countOf: (summary: PlayerKickoffSummary) => number,
  teamColored: boolean,
): ReactNode {
  const entries = summaries
    .map((summary) => {
      const total = countOf(summary);
      const advFor = forOf(summary);
      const against = againstOf(summary);
      return { summary, total, advFor, against, neutral: Math.max(0, total - advFor - against) };
    })
    .filter((entry) => entry.total > 0);
  if (!entries.length) return null;
  const rows: ComparisonRow[] = entries.map(({ summary, total, advFor, against, neutral }) => ({
    key: summary.key,
    label: comparisonLabel(summary),
    ariaLabel: `${summary.name} kickoff control`,
    segments: withGuaranteedLabel(
      [
        outcomeBarSegment("for", "positive", "clear", "Advantage for", advFor, total),
        outcomeBarSegment("neutral", "neutral", "clear", "Neutral", neutral, total),
        outcomeBarSegment("against", "negative", "clear", "Advantage against", against, total),
      ],
      (segment) => String(segment.value),
    ),
    total,
    valueLabel: `${Math.round((advFor / total) * 100)}%`,
    style: outcomeDistributionColorStyle(distributionColors(summary, teamColored)),
  }));
  return (
    <PlayerComparisonChart
      key="control"
      title="Control / advantage"
      rows={rows}
      emptyLabel="No control data yet."
    />
  );
}

function goalsChart(summaries: PlayerKickoffSummary[], teamColored: boolean): ReactNode {
  const entries = summaries
    .map((summary) => ({
      summary,
      forGoals: summary.kickoffGoalsFor,
      against: summary.kickoffGoalsAgainst,
    }))
    .filter((entry) => entry.forGoals + entry.against > 0);
  if (!entries.length) return null;
  const rows: ComparisonRow[] = entries.map(({ summary, forGoals, against }) => {
    const total = forGoals + against;
    return {
      key: summary.key,
      label: comparisonLabel(summary),
      ariaLabel: `${summary.name} kickoff goals`,
      segments: withGuaranteedLabel(
        [
          outcomeBarSegment("for", "positive", "clear", "Goals for", forGoals, total),
          outcomeBarSegment("against", "negative", "clear", "Goals against", against, total),
        ],
        (segment) => String(segment.value),
      ),
      total,
      valueLabel: `+${forGoals} / -${against}`,
      style: outcomeDistributionColorStyle(distributionColors(summary, teamColored)),
    };
  });
  return (
    <PlayerComparisonChart
      key="goals"
      title="Kickoff goals"
      rows={rows}
      emptyLabel="No kickoff goals from these kickoffs."
    />
  );
}

// Assign each category a stable color index across all players (most-used first)
// so the same approach/behavior reads as the same color in every player's bar.
function categoryColorIndex(
  summaries: PlayerKickoffSummary[],
  mapOf: (summary: PlayerKickoffSummary) => Map<string, number>,
): Map<string, number> {
  const totals = new Map<string, number>();
  for (const summary of summaries) {
    for (const [key, value] of mapOf(summary)) {
      totals.set(key, (totals.get(key) ?? 0) + value);
    }
  }
  return new Map(
    [...totals.entries()]
      .sort((left, right) => right[1] - left[1])
      .map(([key], index) => [key, index]),
  );
}

// Shorter display names for known strategy keys; everything else title-cases.
const STRATEGY_LABELS: Record<string, string> = {
  boost_into_ball: "Boost",
};

function formatStrategyLabel(key: string): string {
  return STRATEGY_LABELS[key] ?? (formatLabel(key) || "Unknown");
}

// A per-player breakdown of a categorical dimension (approach types, support
// behaviors): each player's bar splits across the strategies they used.
function categoryChart(
  chartKey: string,
  title: string,
  summaries: PlayerKickoffSummary[],
  mapOf: (summary: PlayerKickoffSummary) => Map<string, number>,
  emptyLabel: string,
): ReactNode {
  const colorIndex = categoryColorIndex(summaries, mapOf);
  const entries = summaries
    .map((summary) => {
      const items = [...mapOf(summary).entries()];
      const total = items.reduce((sum, [, value]) => sum + value, 0);
      return { summary, items, total };
    })
    .filter((entry) => entry.total > 0);
  if (!entries.length) return null;
  const rows: ComparisonRow[] = entries.map(({ summary, items, total }) => {
    const ordered = [...items].sort(
      (left, right) => (colorIndex.get(left[0]) ?? 0) - (colorIndex.get(right[0]) ?? 0),
    );
    const top = [...items].sort((left, right) => right[1] - left[1])[0];
    return {
      key: summary.key,
      label: comparisonLabel(summary),
      ariaLabel: `${summary.name} ${title.toLowerCase()}`,
      segments: withGuaranteedLabel(
        ordered.map(([category, value], index) => {
          const share = total > 0 ? value / total : 0;
          const niceLabel = formatStrategyLabel(category);
          return {
            key: category || `unknown-${index}`,
            className: `kickoff-role-segment-map-${(colorIndex.get(category) ?? 0) % 6}`,
            label: niceLabel,
            value,
            visibleLabel: barSegmentLabel(value, total, niceLabel),
            title: `${niceLabel}: ${value} (${Math.round(share * 100)}%)`,
          };
        }),
        (segment) => segment.label,
      ),
      total,
      valueLabel: top ? formatStrategyLabel(top[0]) : "—",
    };
  });
  return <PlayerComparisonChart key={chartKey} title={title} rows={rows} emptyLabel={emptyLabel} />;
}

// Breakdown of each taker's takes into outcome segments (touched / fake / miss /
// other). Sorted by number of takes rather than by player, per request.
const TAKE_OUTCOME_SEGMENTS: Array<{
  key: string;
  className: string;
  label: string;
  value: (summary: PlayerKickoffSummary) => number;
}> = [
  {
    key: "touched",
    className: "kickoff-take-touched",
    label: "Touched",
    value: (summary) => summary.touched,
  },
  { key: "fake", className: "kickoff-take-fake", label: "Fake", value: (summary) => summary.faked },
  {
    key: "miss",
    className: "kickoff-take-miss",
    label: "Miss",
    value: (summary) => summary.missed,
  },
];

function takeOutcomeChart(summaries: PlayerKickoffSummary[]): ReactNode {
  const entries = summaries
    .map((summary) => ({ summary, takes: summary.takerCount }))
    .filter((entry) => entry.takes > 0)
    .sort((left, right) => right.takes - left.takes);
  if (!entries.length) return null;
  const rows: ComparisonRow[] = entries.map(({ summary, takes }) => {
    const named = TAKE_OUTCOME_SEGMENTS.map((segment) => ({
      ...segment,
      count: segment.value(summary),
    }));
    const other = Math.max(0, takes - named.reduce((sum, segment) => sum + segment.count, 0));
    const parts = [
      ...named,
      { key: "other", className: "kickoff-take-other", label: "Other", count: other },
    ];
    return {
      key: summary.key,
      label: comparisonLabel(summary),
      ariaLabel: `${summary.name} take outcomes`,
      segments: withGuaranteedLabel(
        parts.map((part) => {
          const share = takes > 0 ? part.count / takes : 0;
          return {
            key: part.key,
            className: part.className,
            label: part.label,
            value: part.count,
            visibleLabel: barSegmentLabel(part.count, takes, part.label),
            title: `${part.label}: ${part.count} (${Math.round(share * 100)}%)`,
          };
        }),
        (segment) => segment.label,
      ),
      total: takes,
      valueLabel: `${takes}`,
    };
  });
  return (
    <PlayerComparisonChart
      key="take-outcomes"
      title="Take outcomes"
      rows={rows}
      emptyLabel="No takes yet."
    />
  );
}

function takerComparisonCharts(
  summaries: PlayerKickoffSummary[],
  teamColored: boolean,
  playerIndexByKey: Map<string, number>,
): ReactNode[] {
  return [
    // Good-vs-bad outcomes first, then the descriptive breakdowns (approach,
    // take outcomes) at the end since they aren't a directional good/bad metric.
    winLossChart(summaries, (summary) => summary.takerStrengthOutcomes, teamColored),
    controlChart(
      summaries,
      (summary) => summary.takerAdvantagesFor,
      (summary) => summary.takerAdvantagesAgainst,
      (summary) => summary.takerCount,
      teamColored,
    ),
    magnitudeChart(
      {
        key: "first-touch",
        title: "First touch %",
        value: (summary) =>
          summary.takerCount > 0 ? (summary.firstTouchesAsTaker / summary.takerCount) * 100 : null,
        format: (value) => `${Math.round(value)}%`,
        scaleMax: 100,
        sort: "desc",
        emptyLabel: "No takes yet.",
      },
      summaries,
      teamColored,
      playerIndexByKey,
    ),
    goalsChart(summaries, teamColored),
    magnitudeChart(
      {
        key: "boost-after",
        title: "Boost after ball",
        value: (summary) =>
          summary.boostAfterCount > 0 ? summary.boostAfterSum / summary.boostAfterCount : null,
        format: (value) => formatBoostAmount(value),
        emptyLabel: "No boost-after data yet.",
      },
      summaries,
      teamColored,
      playerIndexByKey,
    ),
    magnitudeChart(
      {
        key: "boost-used",
        title: "Boost used",
        value: (summary) =>
          summary.boostUsedCount > 0 ? summary.boostUsedSum / summary.boostUsedCount : null,
        format: (value) => formatBoostAmount(value),
        sort: "desc",
        emptyLabel: "No boost-used data yet.",
      },
      summaries,
      teamColored,
      playerIndexByKey,
    ),
    magnitudeChart(
      {
        key: "time-to-ball",
        title: "Time to ball",
        value: (summary) =>
          summary.timeToBallCount > 0 ? summary.timeToBallSum / summary.timeToBallCount : null,
        format: (value) => formatDuration(value),
        sort: "asc",
        emptyLabel: "No time-to-ball data yet.",
      },
      summaries,
      teamColored,
      playerIndexByKey,
    ),
    categoryChart(
      "taker-approach",
      "Approach",
      summaries,
      (summary) => summary.approaches,
      "No approach data yet.",
    ),
    takeOutcomeChart(summaries),
  ];
}

function supportComparisonCharts(
  summaries: PlayerKickoffSummary[],
  teamColored: boolean,
  playerIndexByKey: Map<string, number>,
): ReactNode[] {
  return [
    controlChart(
      summaries,
      (summary) => summary.supportAdvantagesFor,
      (summary) => summary.supportAdvantagesAgainst,
      (summary) => summary.supportCount,
      teamColored,
    ),
    goalsChart(summaries, teamColored),
    magnitudeChart(
      {
        key: "support-boost-after",
        title: "Boost after ball",
        value: (summary) =>
          summary.supportBoostAfterCount > 0
            ? summary.supportBoostAfterSum / summary.supportBoostAfterCount
            : null,
        format: (value) => formatBoostAmount(value),
        emptyLabel: "No boost-after data yet.",
      },
      summaries,
      teamColored,
      playerIndexByKey,
    ),
    magnitudeChart(
      {
        key: "support-boost-used",
        title: "Boost used",
        value: (summary) =>
          summary.supportBoostUsedCount > 0
            ? summary.supportBoostUsedSum / summary.supportBoostUsedCount
            : null,
        format: (value) => formatBoostAmount(value),
        sort: "desc",
        emptyLabel: "No boost-used data yet.",
      },
      summaries,
      teamColored,
      playerIndexByKey,
    ),
    magnitudeChart(
      {
        key: "support-time-to-ball",
        title: "Time to ball",
        value: (summary) =>
          summary.supportTimeToBallCount > 0
            ? summary.supportTimeToBallSum / summary.supportTimeToBallCount
            : null,
        format: (value) => formatDuration(value),
        sort: "asc",
        emptyLabel: "No time-to-ball data yet.",
      },
      summaries,
      teamColored,
      playerIndexByKey,
    ),
    categoryChart(
      "support-behavior",
      "Support behavior",
      summaries,
      (summary) => summary.supportBehaviors,
      "No support behavior yet.",
    ),
  ];
}

interface KickoffPerspectiveProps {
  /** Chip key of the perspective currently shown, or null for the default winner view. */
  perspectiveKey: string | null;
  onPerspective: (perspective: KickoffPerspective | null) => void;
}

function KickoffCard({
  kickoff,
  active,
  onActivate,
  perspectiveKey,
  onPerspective,
  replayId,
}: {
  kickoff: KickoffRow;
  active: boolean;
  onActivate: (force: boolean) => void;
  replayId?: string;
} & KickoffPerspectiveProps) {
  const blueSupport = kickoff.teamZeroSupport;
  const orangeSupport = kickoff.teamOneSupport;

  // The card is a clickable region but it contains its own interactive controls
  // (the per-player perspective buttons), so it can't be a <button> — nested
  // buttons are invalid. It behaves as a button via role + keyboard handlers.
  const activate = (force: boolean) => onActivate(force);
  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate(true);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`kickoff-card winner-${teamClass(kickoff.winningTeam)} ${active ? "selected" : ""}`}
      onClick={() => activate(true)}
      onMouseEnter={() => activate(false)}
      onFocus={() => activate(false)}
      onKeyDown={onKeyDown}
    >
      <KickoffTakerSection
        kickoff={kickoff}
        perspectiveKey={perspectiveKey}
        onPerspective={onPerspective}
      />

      <div className="kickoff-team-grid">
        <KickoffTeamColumn
          label="Blue support"
          team={0}
          behaviors={blueSupport}
          kickoff={kickoff}
          perspectiveKey={perspectiveKey}
          onPerspective={onPerspective}
        />
        <KickoffTeamColumn
          label="Orange support"
          team={1}
          behaviors={orangeSupport}
          kickoff={kickoff}
          perspectiveKey={perspectiveKey}
          onPerspective={onPerspective}
        />
      </div>

      <div className="kickoff-card-body">
        {replayId ? (
          <section className="kickoff-diagram-panel">
            <div className="kickoff-section-title">
              <span>Shape</span>
              <strong>{kickoffShapeLabel(kickoff)}</strong>
            </div>
            <Suspense fallback={<div className="kickoff-path-status">Loading kickoff paths…</div>}>
              <KickoffShapeDiagram
                replayId={replayId}
                startFrame={kickoffPathStartFrame(kickoff)}
                endFrame={kickoffPathEndFrame(kickoff)}
                winningTeam={kickoff.winningTeam}
                players={kickoffPathPlayers(kickoff)}
              />
            </Suspense>
          </section>
        ) : null}

        <div className="kickoff-card-details">
          <header className="kickoff-card-header">
            <div className="kickoff-type-row">
              <KickoffShapeIcon
                type={kickoff.kickoffType}
                direction={kickoff.kickoffDirection}
                size={26}
                className="kickoff-type-icon"
                title={`${kickoffTypeName(kickoff.kickoffType) ?? "Other"} ${kickoffDirectionName(kickoff.kickoffDirection)} kickoff`}
              />
              {kickoffTypeChips(kickoff).map((chip) => (
                <span className={`kickoff-type-pill ${chip.muted ? "muted" : ""}`} key={chip.key}>
                  {chip.value}
                </span>
              ))}
              <span className="kickoff-time-pill">{formatSeconds(kickoff.startTime)}</span>
              <span className="kickoff-type-pill muted">
                {kickoff.takerDelayFrames == null
                  ? "No taker gap"
                  : `${formatFrames(kickoff.takerDelayFrames)} taker gap`}
              </span>
              {kickoff.kickoffGoal ? (
                <span className={`kickoff-goal-chip team-chip-${teamClass(kickoff.scoringTeam)}`}>
                  Goal in {formatSeconds(kickoff.timeToGoal)}
                </span>
              ) : null}
            </div>
          </header>

          <div className="kickoff-outcome-grid">
            <KickoffFact
              icon={Trophy}
              label="Winner"
              value={teamLabel(kickoff.winningTeam)}
              team={kickoff.winningTeam}
            />
            <KickoffFact
              icon={ShieldCheck}
              label="Possession"
              value={kickoffPossessionLabel(kickoff)}
              team={kickoff.possessionTeam}
            />
            <KickoffFact
              icon={ShieldCheck}
              label="Next possession"
              value={formatNextPossession(kickoff.nextPossession)}
              team={kickoff.nextPossession?.team ?? kickoff.possessionTeam}
            />
            <KickoffFact
              icon={Anchor}
              label="Advantage"
              value={kickoffAdvantageLabel(kickoff)}
              team={kickoff.advantageTeam}
            />
            <KickoffFact
              icon={CircleDotDashed}
              label="First touch"
              value={kickoff.firstTouch.playerName}
              team={kickoff.firstTouch.team}
            />
            <KickoffFact
              icon={Gauge}
              label="Exit speed"
              value={formatSpeed(kickoff.exitSpeed)}
              team={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * A player name badged as a camera target. The hover handling lives on the whole
 * enclosing tile/row (see perspectiveHoverProps) so the entire surface retargets
 * the preview camera; the chip shows who and lights up while active.
 */
function KickoffPerspectiveChip({
  behavior,
  perspectiveKey,
}: {
  behavior: KickoffPlayerBehavior;
} & Pick<KickoffPerspectiveProps, "perspectiveKey">) {
  const chipKey = perspectiveChipKey(behavior.playerKey, behavior.playerName);
  const activePerspective = perspectiveKey === chipKey;
  return (
    <span
      className={`kickoff-perspective-chip team-perspective-${teamClass(behavior.team)} ${activePerspective ? "active" : ""}`}
      title={`Watch from ${behavior.playerName}'s perspective`}
    >
      <Video size={13} aria-hidden />
      <PlayerIdentity
        className="kickoff-perspective-chip-name"
        link={false}
        name={behavior.playerName}
        platform={behavior.platform}
        platformPlayerId={behavior.platformPlayerId}
        showPlatform={false}
        showTeam={false}
        team={behavior.team}
      />
    </span>
  );
}

/**
 * Hover handlers that point the preview camera at a player while the cursor is
 * anywhere over the element, restoring the default view on leave.
 */
function perspectiveHoverProps(
  behavior: KickoffPlayerBehavior | null,
  onPerspective: KickoffPerspectiveProps["onPerspective"],
): { onMouseEnter?: () => void; onMouseLeave?: () => void } {
  if (!behavior) {
    return {};
  }
  return {
    onMouseEnter: () =>
      onPerspective({ playerKey: behavior.playerKey, playerName: behavior.playerName }),
    onMouseLeave: () => onPerspective(null),
  };
}

function kickoffPathStartFrame(kickoff: KickoffRow): number | null {
  return (
    kickoff.liveActionStartFrame ?? kickoff.movementStartFrame ?? kickoff.event.start_frame ?? null
  );
}

function kickoffPathEndFrame(kickoff: KickoffRow): number | null {
  // Prefer the first non-kickoff (follow-up) touch as a clean stopping point, but
  // most kickoffs never get one. Falling back to the first touch would cut the ball
  // path off the instant it's struck, hiding where the ball actually goes. Use the
  // kickoff's logical end frame (≈2s after first touch) so the post-kickoff
  // trajectory is shown.
  return kickoff.followUpTouch.frame ?? kickoff.event.end_frame ?? kickoff.firstTouch.frame ?? null;
}

function kickoffPathPlayers(kickoff: KickoffRow): KickoffPathPlayer[] {
  return [
    kickoff.teamZeroTaker,
    kickoff.teamOneTaker,
    ...kickoff.teamZeroSupport,
    ...kickoff.teamOneSupport,
  ]
    .filter(Boolean)
    .map((behavior) => {
      const player = behavior as KickoffPlayerBehavior;
      return {
        playerKey: player.playerKey,
        playerName: player.playerName,
        team: player.team,
        role: player.role,
      };
    });
}

function KickoffFact({
  icon: Icon,
  label,
  value,
  team,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  team: number | null;
}) {
  return (
    <div className={`kickoff-fact team-soft-${teamClass(team)}`}>
      <Icon size={15} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function KickoffTakerSection({
  kickoff,
  perspectiveKey,
  onPerspective,
}: { kickoff: KickoffRow } & KickoffPerspectiveProps) {
  return (
    <section className="kickoff-taker-section">
      <div className="kickoff-section-title">
        <span>Takers</span>
        <strong>
          {strengthBandLabel(kickoff.winStrengthBand)} win
          {kickoff.winStrength == null
            ? ""
            : ` · ${Math.round(clampFraction(kickoff.winStrength) * 100)}%`}
        </strong>
      </div>
      <div className="kickoff-taker-grid">
        <KickoffTakerTile
          behavior={kickoff.teamZeroTaker}
          team={0}
          kickoff={kickoff}
          perspectiveKey={perspectiveKey}
          onPerspective={onPerspective}
        />
        <KickoffTakerTile
          behavior={kickoff.teamOneTaker}
          team={1}
          kickoff={kickoff}
          perspectiveKey={perspectiveKey}
          onPerspective={onPerspective}
        />
      </div>
    </section>
  );
}

function KickoffTakerTile({
  behavior,
  team,
  kickoff,
  perspectiveKey,
  onPerspective,
}: {
  behavior: KickoffPlayerBehavior | null;
  team: number;
  kickoff: KickoffRow;
} & KickoffPerspectiveProps) {
  const won = kickoff.winningTeam === team;
  const winShade = won ? kickoffWinShade(kickoff.winStrength) : null;
  const className = [
    "kickoff-taker-tile",
    `team-taker-${teamClass(team)}`,
    won ? `winner strength-${kickoff.winStrengthBand}` : "",
    winShade == null ? "" : "shade-scaled",
    winShade != null && winShade >= 0.55 ? "shade-dark" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const boostAfter =
    behavior?.boostAfter == null ? "-" : `${formatBoostAmount(behavior.boostAfter)} after`;
  const boostUsed =
    behavior?.boostUsed == null ? "-" : `${formatBoostAmount(behavior.boostUsed)} used`;
  const touchTime = behavior ? playerKickoffTime(kickoff, behavior) : null;

  return (
    <div
      className={className}
      style={winShade == null ? undefined : ({ "--win-shade": String(winShade) } as CSSProperties)}
      {...perspectiveHoverProps(behavior, onPerspective)}
    >
      <div className="kickoff-taker-heading">
        <div>
          <span>{teamLabel(team)}</span>
          <strong>
            {behavior ? (
              <KickoffPerspectiveChip behavior={behavior} perspectiveKey={perspectiveKey} />
            ) : (
              "Unknown taker"
            )}
          </strong>
        </div>
        <span className="kickoff-taker-badges">
          {behavior != null && isFirstToucher(kickoff, behavior) ? (
            <span className="kickoff-first-touch-pill">
              <CircleDotDashed size={12} />
              First touch
            </span>
          ) : null}
          <span className={`kickoff-taker-result ${won ? "won" : "lost"}`}>
            {won ? "Won" : kickoff.winningTeam == null ? "Neutral" : "Lost"}
          </span>
        </span>
      </div>
      <div className="kickoff-taker-details">
        <span>
          <strong>Approach</strong>
          {formatLabel(behavior?.approach ?? null) || "Unknown"}
        </span>
        <span>
          <strong>Result</strong>
          {formatLabel(behavior?.outcome ?? null) || "Unknown"}
        </span>
        <span>
          <strong>Boost used</strong>
          {boostUsed}
        </span>
        <span>
          <strong>Boost after</strong>
          {boostAfter}
        </span>
        <span>
          <strong>Time to ball</strong>
          {formatDuration(touchTime)}
        </span>
      </div>
    </div>
  );
}

function KickoffTeamColumn({
  label,
  team,
  behaviors,
  kickoff,
  perspectiveKey,
  onPerspective,
}: {
  label: string;
  team: number;
  behaviors: KickoffPlayerBehavior[];
  kickoff: KickoffRow;
} & KickoffPerspectiveProps) {
  return (
    <section className={`kickoff-team-column team-column-${teamClass(team)}`}>
      <div className="kickoff-team-title">
        <span>{label}</span>
        <strong>{behaviors.length} players</strong>
      </div>
      <div className="kickoff-behavior-list">
        {behaviors.map((behavior, index) => (
          <KickoffBehaviorRow
            behavior={behavior}
            kickoff={kickoff}
            key={`${behavior.playerKey ?? behavior.playerName}:${behavior.role}:${index}`}
            perspectiveKey={perspectiveKey}
            onPerspective={onPerspective}
          />
        ))}
      </div>
    </section>
  );
}

function KickoffBehaviorRow({
  behavior,
  kickoff,
  perspectiveKey,
  onPerspective,
}: {
  behavior: KickoffPlayerBehavior;
  kickoff: KickoffRow;
} & KickoffPerspectiveProps) {
  const primary = behavior.role === "taker" ? behavior.outcome : behavior.supportBehavior;
  const secondary = behavior.role === "taker" ? behavior.approach : behavior.spawn;
  const boostDelta =
    behavior.startBoost == null || behavior.boostAfter == null
      ? null
      : behavior.boostAfter - behavior.startBoost;
  const showTakerBoost =
    behavior.role === "taker" && (behavior.boostCollected != null || behavior.boostUsed != null);
  const ballDistance =
    behavior.distanceToBallAtFirstTouch ?? startDistanceToCenteredBall(behavior.startPosition);
  const boostAtFifty = behavior.boostAtFirstTouch ?? behavior.boostAfter;

  return (
    <div className="kickoff-behavior-row" {...perspectiveHoverProps(behavior, onPerspective)}>
      <div>
        <strong>
          <KickoffPerspectiveChip behavior={behavior} perspectiveKey={perspectiveKey} />
        </strong>
        <span>{behavior.role === "taker" ? "Taker" : "Support"}</span>
      </div>
      <div className="kickoff-behavior-tags">
        {isFirstToucher(kickoff, behavior) ? (
          <span className="kickoff-first-touch-pill">
            <CircleDotDashed size={12} />
            First touch
          </span>
        ) : null}
        <span>{formatLabel(primary) || "Unknown"}</span>
        {secondary ? <span>{formatLabel(secondary)}</span> : null}
        {behavior.role === "taker" && behavior.timeToBall != null ? (
          <span>{formatDuration(behavior.timeToBall)} to ball</span>
        ) : null}
        {showTakerBoost && behavior.boostCollected != null ? (
          <span className="boost-positive">
            +{formatBoostAmount(behavior.boostCollected)} boost
          </span>
        ) : null}
        {showTakerBoost && behavior.boostUsed != null ? (
          <span className="boost-negative">{formatBoostAmount(behavior.boostUsed)} used</span>
        ) : null}
        {!showTakerBoost && boostDelta != null ? (
          <span className={boostDelta >= 0 ? "boost-positive" : "boost-negative"}>
            {boostDelta >= 0 ? "+" : ""}
            {formatBoostAmount(boostDelta)} boost
          </span>
        ) : null}
      </div>
      {behavior.role === "support" ? (
        <div className="kickoff-support-details">
          <span>
            <strong>
              Ball dist {behavior.distanceToBallAtFirstTouch == null ? "start" : "50/50"}
            </strong>
            {formatDistance(ballDistance)}
          </span>
          <span>
            <strong>Boost {behavior.boostAtFirstTouch == null ? "after" : "50/50"}</strong>
            {formatBoostValue(boostAtFifty)}
          </span>
          <span>
            <strong>Start boost</strong>
            {formatBoostValue(behavior.startBoost)}
          </span>
          <span>
            <strong>Time to ball</strong>
            {formatDuration(playerKickoffTime(kickoff, behavior))}
          </span>
        </div>
      ) : null}
    </div>
  );
}

// The outcomes column is player-relative: wins fill from the left, losses fill
// from the right, and neutral kickoffs hold the center. Within each side the
// strength band sets the shade (darkest = strongest result).
const WIN_BANDS: Array<{
  band: KickoffStrengthBand;
  level: OutcomeDistributionLevel;
  label: string;
}> = [
  { band: "strong", level: "strong", label: "Strong win" },
  { band: "clear", level: "clear", label: "Clear win" },
  { band: "narrow", level: "narrow", label: "Narrow win" },
  { band: "unknown", level: "unknown", label: "Win" },
];

// Losses mirror the win ramp so the strongest loss sits at the far (right) edge.
const LOSS_BANDS: Array<{
  band: KickoffStrengthBand;
  level: OutcomeDistributionLevel;
  label: string;
}> = [
  { band: "unknown", level: "unknown", label: "Loss" },
  { band: "narrow", level: "narrow", label: "Narrow loss" },
  { band: "clear", level: "clear", label: "Clear loss" },
  { band: "strong", level: "strong", label: "Strong loss" },
];

function kickoffPlayerOutcomeColors(team: number | null): OutcomeDistributionColors {
  if (team === 0) {
    return {
      positive: "#2563eb",
      "positive-strong": "#1e3a8a",
      "positive-clear": "#2563eb",
      "positive-unknown": "#bfdbfe",
      neutral: "#94a3b8",
      "neutral-clear": "#cbd5e1",
      negative: "#ea580c",
      "negative-strong": "#9a3412",
      "negative-clear": "#ea580c",
      "negative-unknown": "#fed7aa",
    };
  }
  if (team === 1) {
    return {
      positive: "#ea580c",
      "positive-strong": "#9a3412",
      "positive-clear": "#ea580c",
      "positive-unknown": "#fed7aa",
      neutral: "#94a3b8",
      "neutral-clear": "#cbd5e1",
      negative: "#2563eb",
      "negative-strong": "#1e3a8a",
      "negative-clear": "#2563eb",
      "negative-unknown": "#bfdbfe",
    };
  }
  return PLAYER_RELATIVE_OUTCOME_COLORS;
}

function kickoffRow(
  event: MechanicEventResponse,
  index: number,
  players: ReplayPlayer[],
  possessionSpans: PossessionSpan[],
): KickoffRow {
  const payload = event.payload;
  const teamZeroTouchFrame = numberField(payload, "team_zero_taker_touch_frame");
  const teamOneTouchFrame = numberField(payload, "team_one_taker_touch_frame");
  const takerDelayFrames =
    teamZeroTouchFrame == null || teamOneTouchFrame == null
      ? null
      : Math.abs(teamZeroTouchFrame - teamOneTouchFrame);
  const startTime = numberField(payload, "start_time") ?? event.start_time;
  const endTime = numberField(payload, "end_time") ?? event.end_time;
  const possessionTeam = teamField(payload, "kickoff_possession_team_is_team_0");
  const liveActionStartTime = numberField(payload, "live_action_start_time");
  const liveActionStartFrame = numberField(payload, "live_action_start_frame");
  const movementStartTime = numberField(payload, "movement_start_time");
  const movementStartFrame = numberField(payload, "movement_start_frame");
  return {
    event,
    index,
    startTime,
    endTime,
    liveActionStartTime,
    liveActionStartFrame,
    movementStartTime,
    movementStartFrame,
    outcome: stringField(payload, "outcome"),
    possessionOutcome: stringField(payload, "kickoff_possession_outcome"),
    winningTeam: teamField(payload, "winning_team_is_team_0"),
    possessionTeam,
    nextPossession: nextKickoffPossession(startTime, endTime, possessionTeam, possessionSpans),
    scoringTeam: teamField(payload, "scoring_team_is_team_0"),
    kickoffGoal: booleanField(payload, "kickoff_goal") ?? false,
    kickoffType: kickoffType(payload),
    kickoffDirection: kickoffDirection(payload),
    timeToGoal: numberField(payload, "time_to_goal"),
    takerDelayFrames,
    exitSpeed: numberField(payload, "exit_speed"),
    winStrength: numberField(payload, "win_strength"),
    winStrengthBand: strengthBand(stringField(payload, "win_strength_band")),
    firstTouch: kickoffTouch(payload, "first_touch", players),
    followUpTouch: kickoffTouch(payload, "first_follow_up_touch", players),
    advantage: stringField(payload, "advantage"),
    advantageTeam: teamField(payload, "advantage_team_is_team_0"),
    advantagePlayerName: advantagePlayerName(payload, players),
    advantageSecondsAfterFirstTouch: numberField(payload, "advantage_seconds_after_first_touch"),
    teamZeroTaker: kickoffPlayerBehavior(
      objectField(payload, "team_zero_taker"),
      0,
      "taker",
      players,
    ),
    teamOneTaker: kickoffPlayerBehavior(
      objectField(payload, "team_one_taker"),
      1,
      "taker",
      players,
    ),
    teamZeroSupport: arrayField(payload, "team_zero_non_takers")
      .map((item) => kickoffPlayerBehavior(item, 0, "support", players))
      .filter(Boolean) as KickoffPlayerBehavior[],
    teamOneSupport: arrayField(payload, "team_one_non_takers")
      .map((item) => kickoffPlayerBehavior(item, 1, "support", players))
      .filter(Boolean) as KickoffPlayerBehavior[],
  };
}

function possessionSpan(
  event: MechanicEventResponse,
  players: ReplayPlayer[],
): PossessionSpan | null {
  const payload = event.payload;
  const playerKey = remoteIdKey(payload.player_id) ?? normalizedRemoteKey(event.player_id);
  const player = playerKey ? playerByRemoteKey(players, playerKey) : null;
  const team =
    possessionStateTeam(stringField(payload, "possession_state")) ??
    event.team ??
    player?.team ??
    null;
  return {
    playerKey,
    playerName: player?.name || event.player_name || playerKey || teamLabel(team),
    team,
    startTime: numberField(payload, "time") ?? event.start_time ?? event.event_time,
    endTime: numberField(payload, "end_time") ?? event.end_time,
    frame: numberField(payload, "frame"),
  };
}

function nextKickoffPossession(
  startTime: number | null,
  endTime: number | null,
  possessionTeam: number | null,
  possessionSpans: PossessionSpan[],
): KickoffPossession | null {
  const cutoff = endTime ?? startTime;
  if (cutoff == null) return null;
  const matchingSpan = possessionSpans.find((span) => {
    if (span.startTime == null) return false;
    if (span.playerKey == null && span.team == null) return false;
    if (possessionTeam != null && span.team != null && span.team !== possessionTeam) return false;
    return (
      span.startTime >= cutoff - 0.1 ||
      (span.endTime != null &&
        span.endTime >= cutoff &&
        span.startTime >= (startTime ?? cutoff) - 0.1)
    );
  });
  if (!matchingSpan) return null;
  return {
    playerKey: matchingSpan.playerKey,
    playerName: matchingSpan.playerName,
    team: matchingSpan.team,
    startTime: matchingSpan.startTime,
    frame: matchingSpan.frame,
  };
}

function advantagePlayerName(
  payload: Record<string, unknown>,
  players: ReplayPlayer[],
): string | null {
  const playerKey = remoteIdKey(payload.advantage_player);
  if (!playerKey) return null;
  return playerByRemoteKey(players, playerKey)?.name || playerKey;
}

/**
 * Who the kickoff actually ended up being good for: the advantage verdict
 * (possession run, established pressure, or kickoff goal) with how long after
 * the first touch it took. Distinct from "Winner" (the immediate exchange) —
 * a lost first touch that the other team cleanly collects is their advantage.
 */
function kickoffAdvantageLabel(kickoff: KickoffRow): string {
  if (!kickoff.advantage) return "Unknown";
  if (kickoff.advantage === "no_advantage") return "None";
  const kind = kickoff.advantage.replace(/^team_(zero|one)_/, "");
  const kindLabel =
    kind === "possession" ? (kickoff.advantagePlayerName ?? "Possession") : formatLabel(kind);
  const seconds = kickoff.advantageSecondsAfterFirstTouch;
  return seconds == null ? kindLabel : `${kindLabel} · ${seconds.toFixed(1)}s`;
}

function kickoffTouch(
  payload: Record<string, unknown>,
  prefix: string,
  players: ReplayPlayer[],
): KickoffTouch {
  const playerValue = payload[`${prefix}_player`];
  const playerKey = remoteIdKey(playerValue);
  const player = playerKey ? playerByRemoteKey(players, playerKey) : null;
  const team = teamField(payload, `${prefix}_team_is_team_0`) ?? player?.team ?? null;
  return {
    playerKey,
    playerName: player?.name || playerKey || "Unknown",
    team,
    time: numberField(payload, `${prefix}_time`),
    frame: numberField(payload, `${prefix}_frame`),
  };
}

function kickoffPlayerBehavior(
  payload: Record<string, unknown> | null,
  fallbackTeam: number,
  role: "taker" | "support",
  players: ReplayPlayer[],
): KickoffPlayerBehavior | null {
  if (!payload) return null;
  const playerKey = remoteIdKey(payload.player);
  const player = playerKey ? playerByRemoteKey(players, playerKey) : null;
  return {
    playerKey,
    playerName: player?.name || playerKey || "Unknown",
    platform: player?.platform ?? null,
    platformPlayerId: player?.platform_player_id ?? null,
    team: teamField(payload, "is_team_0") ?? player?.team ?? fallbackTeam,
    role,
    spawn: stringField(payload, "spawn_position"),
    approach: stringField(payload, "approach"),
    outcome: stringField(payload, "outcome"),
    supportBehavior: stringField(payload, "support_behavior"),
    startBoost: numberField(payload, "start_boost"),
    boostAfter: numberField(payload, "boost_after"),
    boostAtFirstTouch:
      numberField(payload, "boost_at_first_touch") ?? numberField(payload, "boost_at_kickoff_50"),
    timeToBall: numberField(payload, "time_to_ball"),
    boostCollected: numberField(payload, "boost_collected"),
    boostUsed: numberField(payload, "boost_used"),
    firstTouchTime: numberField(payload, "first_touch_time"),
    startPosition: vector3Field(payload, "start_position"),
    distanceToBallAtFirstTouch:
      numberField(payload, "distance_to_ball_at_first_touch") ??
      numberField(payload, "distance_to_ball_at_kickoff_50"),
  };
}

function kickoffType(payload: Record<string, unknown>): KickoffType {
  const emittedType = stringField(payload, "kickoff_type");
  if (isKickoffType(emittedType)) {
    return emittedType;
  }
  if (emittedType === "center_offset_left" || emittedType === "center_offset_right") {
    return "center_offset";
  }
  return kickoffTypeFromSpawns(
    stringField(objectField(payload, "team_zero_taker") ?? {}, "spawn_position"),
    stringField(objectField(payload, "team_one_taker") ?? {}, "spawn_position"),
  );
}

function kickoffTypeFromSpawns(
  teamZeroSpawn: string | null,
  teamOneSpawn: string | null,
): KickoffType {
  if (isSymmetricSpawn(teamZeroSpawn, teamOneSpawn, "diagonal")) {
    return "diagonal";
  }
  if (isSymmetricSpawn(teamZeroSpawn, teamOneSpawn, "off_center")) {
    return "center_offset";
  }
  if (teamZeroSpawn === "center" && teamOneSpawn === "center") {
    return "center";
  }
  return "unknown";
}

function isSymmetricSpawn(
  teamZeroSpawn: string | null,
  teamOneSpawn: string | null,
  family: "diagonal" | "off_center",
): boolean {
  return (
    (teamZeroSpawn === `${family}_left` && teamOneSpawn === `${family}_left`) ||
    (teamZeroSpawn === `${family}_right` && teamOneSpawn === `${family}_right`)
  );
}

function isKickoffType(value: string | null): value is KickoffType {
  return (
    value === "diagonal" || value === "center_offset" || value === "center" || value === "unknown"
  );
}

function kickoffDirection(payload: Record<string, unknown>): KickoffDirection {
  const emittedDirection = stringField(payload, "kickoff_direction");
  if (isKickoffDirection(emittedDirection)) {
    return emittedDirection;
  }
  const legacyType = stringField(payload, "kickoff_type");
  if (legacyType === "center_offset_left") {
    return "left";
  }
  if (legacyType === "center_offset_right") {
    return "right";
  }
  return kickoffDirectionFromSpawns(
    stringField(objectField(payload, "team_zero_taker") ?? {}, "spawn_position"),
    stringField(objectField(payload, "team_one_taker") ?? {}, "spawn_position"),
  );
}

function kickoffDirectionFromSpawns(
  teamZeroSpawn: string | null,
  teamOneSpawn: string | null,
): KickoffDirection {
  if (
    (teamZeroSpawn === "diagonal_left" && teamOneSpawn === "diagonal_left") ||
    (teamZeroSpawn === "off_center_left" && teamOneSpawn === "off_center_left")
  ) {
    return "left";
  }
  if (
    (teamZeroSpawn === "diagonal_right" && teamOneSpawn === "diagonal_right") ||
    (teamZeroSpawn === "off_center_right" && teamOneSpawn === "off_center_right")
  ) {
    return "right";
  }
  if (teamZeroSpawn === "center" && teamOneSpawn === "center") {
    return "center";
  }
  return "unknown";
}

function isKickoffDirection(value: string | null): value is KickoffDirection {
  return value === "left" || value === "right" || value === "center" || value === "unknown";
}

function kickoffPreviewLabel(kickoff: KickoffRow, perspective: KickoffPerspective | null): string {
  const typeLabel = kickoffTypeName(kickoff.kickoffType);
  const base = typeLabel
    ? `${typeLabel} · ${kickoffDirectionName(kickoff.kickoffDirection)} · ${formatSeconds(kickoff.startTime)}`
    : formatSeconds(kickoff.startTime);
  const followedPlayer = perspective ?? kickoffWinnerPreviewPlayer(kickoff);
  return followedPlayer?.playerName ? `${base} · Following ${followedPlayer.playerName}` : base;
}

function kickoffPreviewStart(
  kickoff: KickoffRow,
): { frame: number | null; resolveStart?: EventClip["resolveStart"] } | null {
  // Indexed live-action frame (reprocessed replays): rebase-safe, seek straight to it.
  if (kickoff.liveActionStartFrame != null) {
    return { frame: kickoff.liveActionStartFrame };
  }
  if (
    kickoff.movementStartFrame != null &&
    kickoff.movementStartTime != null &&
    kickoff.startTime != null &&
    kickoff.movementStartTime > kickoff.startTime + 0.05
  ) {
    return { frame: kickoff.movementStartFrame };
  }
  // No indexed live-action timing (legacy replays, and the opening kickoff that
  // subtr-actor never tags): scan forward from the start frame for the countdown.
  const startFrame = kickoff.event.start_frame;
  if (startFrame != null) {
    return {
      frame: startFrame,
      resolveStart: (replay) => kickoffLiveActionFrameTime(replay, startFrame),
    };
  }
  return null;
}

// Scan forward from the kickoff's start frame for the frame where the countdown
// transitions to zero (live action begins), returning that frame's player-clock
// time. Index-based so it is immune to the player's frame-time rebasing.
function kickoffLiveActionFrameTime(replay: ReplayModel, startFrame: number): number | null {
  const frames = replay.frames;
  const from = Math.max(1, startFrame);
  const limit = Math.min(frames.length, startFrame + KICKOFF_LIVE_ACTION_SEARCH_FRAMES);
  let fallbackZeroCountdown: number | null = null;
  for (let index = from; index < limit; index += 1) {
    const frame = frames[index];
    const previous = frames[index - 1];
    if (!frame) {
      break;
    }
    if (frame.kickoffCountdown === 0 && previous && previous.kickoffCountdown > 0) {
      return frame.time;
    }
    if (fallbackZeroCountdown == null && frame.kickoffCountdown === 0) {
      fallbackZeroCountdown = frame.time;
    }
  }
  return fallbackZeroCountdown;
}

// Decide where a kickoff clip should stop looping, in player-clock time. Ends on
// the first "non-kickoff" touch (the follow-up touch), else a fixed beat after the
// taker's first touch, clamped to a [min, max] window from the clip's start frame
// so the loop never overshoots into open play or feels too abrupt. All bounds come
// from frame indices (rebase-safe), resolved against the parsed frames.
function kickoffClipEndTime(
  replay: ReplayModel,
  kickoff: KickoffRow,
  startFrame: number | null,
): number {
  const frames = replay.frames;
  const timeAtFrame = (frameIndex: number | null): number | null =>
    frameIndex != null && frameIndex >= 0 && frameIndex < frames.length
      ? frames[frameIndex].time
      : null;

  const startTime = timeAtFrame(startFrame) ?? 0;
  const cap = Math.min(startTime + KICKOFF_CLIP_MAX_DURATION_SECONDS, replay.duration);
  const floor = startTime + KICKOFF_CLIP_MIN_DURATION_SECONDS;

  const followUpTime = timeAtFrame(kickoff.followUpTouch.frame);
  const firstTouchTime = timeAtFrame(kickoff.firstTouch.frame);

  let end: number | null = null;
  if (followUpTime != null) {
    end = followUpTime + KICKOFF_CLIP_FOLLOW_UP_POSTROLL_SECONDS;
  } else if (firstTouchTime != null) {
    end = firstTouchTime + KICKOFF_CLIP_FIRST_TOUCH_POSTROLL_SECONDS;
  }

  if (end == null) {
    return cap;
  }
  return Math.min(cap, Math.max(floor, end));
}

function kickoffWinnerPreviewPlayer(
  kickoff: KickoffRow,
): { playerKey: string | null; playerName: string | null } | null {
  const perspectiveTeam = kickoff.winningTeam ?? kickoff.possessionTeam;
  const winningTaker =
    perspectiveTeam === 0
      ? kickoff.teamZeroTaker
      : perspectiveTeam === 1
        ? kickoff.teamOneTaker
        : null;
  if (winningTaker?.playerKey || winningTaker?.playerName) {
    return { playerKey: winningTaker.playerKey, playerName: winningTaker.playerName };
  }
  if (
    kickoff.firstTouch.team === perspectiveTeam &&
    (kickoff.firstTouch.playerKey || kickoff.firstTouch.playerName)
  ) {
    return { playerKey: kickoff.firstTouch.playerKey, playerName: kickoff.firstTouch.playerName };
  }
  if (
    kickoff.followUpTouch.team === perspectiveTeam &&
    (kickoff.followUpTouch.playerKey || kickoff.followUpTouch.playerName)
  ) {
    return {
      playerKey: kickoff.followUpTouch.playerKey,
      playerName: kickoff.followUpTouch.playerName,
    };
  }
  return null;
}

function kickoffTypeChips(
  kickoff: KickoffRow,
): Array<{ key: string; value: string; muted?: boolean }> {
  return [
    {
      key: "type",
      value: kickoffTypeName(kickoff.kickoffType) ?? "Other",
      muted: kickoff.kickoffType === "unknown",
    },
    {
      key: "direction",
      value: kickoffDirectionName(kickoff.kickoffDirection),
      muted: kickoff.kickoffDirection === "unknown",
    },
  ];
}

function kickoffTypeName(type: KickoffType): string | null {
  switch (type) {
    case "diagonal":
      return "Diagonal";
    case "center_offset":
      return "Center offset";
    case "center":
      return "Center";
    case "unknown":
      return null;
  }
}

function kickoffDirectionName(direction: KickoffDirection): string {
  switch (direction) {
    case "left":
      return "Left";
    case "right":
      return "Right";
    case "center":
      return "Center";
    case "unknown":
      return "Mixed";
  }
}

function kickoffPossessionLabel(kickoff: KickoffRow): string {
  switch (kickoff.possessionOutcome) {
    case "team_zero_possession":
      return "Blue possession";
    case "team_one_possession":
      return "Orange possession";
    case "team_zero_advantage":
      return "Blue advantage";
    case "team_one_advantage":
      return "Orange advantage";
    case "contested":
      return "Contested";
    default:
      return teamLabel(kickoff.possessionTeam);
  }
}

function kickoffSummary(kickoffs: KickoffRow[]) {
  return kickoffs.reduce(
    (summary, kickoff) => {
      if (kickoff.winningTeam === 0) summary.blueWins += 1;
      else if (kickoff.winningTeam === 1) summary.orangeWins += 1;
      else summary.neutral += 1;
      // Blue-relative (team 0): wins = Blue wins, losses = Orange wins. Drives the
      // gradated team win bar so it shades wins by strength like the taker rows.
      incrementStrengthOutcome(
        summary.teamStrengthOutcomes,
        kickoff.winStrengthBand,
        kickoff.winningTeam,
        0,
      );
      if (kickoff.kickoffGoal) summary.goals += 1;
      if (kickoff.advantageTeam === 0) summary.blueAdvantages += 1;
      else if (kickoff.advantageTeam === 1) summary.orangeAdvantages += 1;
      else if (kickoff.advantage === "no_advantage") summary.noAdvantage += 1;
      return summary;
    },
    {
      blueWins: 0,
      orangeWins: 0,
      neutral: 0,
      goals: 0,
      blueAdvantages: 0,
      orangeAdvantages: 0,
      noAdvantage: 0,
      teamStrengthOutcomes: emptyStrengthOutcomes(),
    },
  );
}

function kickoffPlayerSummaries(
  kickoffs: KickoffRow[],
  players: ReplayPlayer[],
): PlayerKickoffSummary[] {
  const summaries = new Map<string, PlayerKickoffSummary>();
  const ensureSummary = (behavior: KickoffPlayerBehavior): PlayerKickoffSummary => {
    const key = behavior.playerKey ?? `${behavior.team ?? "unknown"}:${behavior.playerName}`;
    if (!summaries.has(key)) {
      const identity = playerIdentityFromRemoteKey(behavior.playerKey);
      const player = behavior.playerKey ? playerByRemoteKey(players, behavior.playerKey) : null;
      summaries.set(
        key,
        emptyPlayerKickoffSummary({
          key,
          name: behavior.playerName,
          platform: identity.platform ?? behavior.platform,
          platform_player_id: identity.platform_player_id ?? behavior.platformPlayerId,
          rank_tier: player?.rank_tier ?? null,
          rank_division: player?.rank_division ?? null,
          rank_mmr: player?.rank_mmr ?? null,
          rank_is_fallback: player?.rank_is_fallback,
          rank_fallback_replay_date: player?.rank_fallback_replay_date,
          team: behavior.team,
        }),
      );
    }
    return summaries.get(key)!;
  };

  for (const kickoff of kickoffs) {
    for (const behavior of [
      kickoff.teamZeroTaker,
      kickoff.teamOneTaker,
      ...kickoff.teamZeroSupport,
      ...kickoff.teamOneSupport,
    ].filter(Boolean) as KickoffPlayerBehavior[]) {
      const summary = ensureSummary(behavior);
      if (behavior.role === "taker") {
        summary.takerCount += 1;
        incrementMap(summary.approaches, behavior.approach);
        if (behavior.outcome === "touched") summary.touched += 1;
        if (isFirstToucher(kickoff, behavior)) summary.firstTouchesAsTaker += 1;
        if (behavior.outcome === "fake") summary.faked += 1;
        if (behavior.outcome === "missed") summary.missed += 1;
        if (behavior.timeToBall != null) {
          summary.timeToBallSum += behavior.timeToBall;
          summary.timeToBallCount += 1;
        }
        if (behavior.boostCollected != null) {
          summary.boostCollectedSum += behavior.boostCollected;
          summary.boostCollectedCount += 1;
        }
        if (behavior.boostUsed != null) {
          summary.boostUsedSum += behavior.boostUsed;
          summary.boostUsedCount += 1;
        }
        if (behavior.boostAfter != null) {
          summary.boostAfterSum += behavior.boostAfter;
          summary.boostAfterCount += 1;
        }
      } else {
        summary.supportCount += 1;
        incrementMap(summary.supportBehaviors, behavior.supportBehavior);
        // Support players still drive to the ball and spend/keep boost; track the
        // relevant economy metrics separately so the taker charts stay taker-only.
        if (behavior.timeToBall != null) {
          summary.supportTimeToBallSum += behavior.timeToBall;
          summary.supportTimeToBallCount += 1;
        }
        if (behavior.boostUsed != null) {
          summary.supportBoostUsedSum += behavior.boostUsed;
          summary.supportBoostUsedCount += 1;
        }
        if (behavior.boostAfter != null) {
          summary.supportBoostAfterSum += behavior.boostAfter;
          summary.supportBoostAfterCount += 1;
        }
      }
      if (kickoff.kickoffGoal && behavior.team != null && kickoff.scoringTeam != null) {
        if (behavior.team === kickoff.scoringTeam) summary.kickoffGoalsFor += 1;
        else summary.kickoffGoalsAgainst += 1;
      }
      if (behavior.team != null && kickoff.advantageTeam != null) {
        if (behavior.team === kickoff.advantageTeam) {
          summary.advantagesFor += 1;
          if (behavior.role === "taker") summary.takerAdvantagesFor += 1;
          else summary.supportAdvantagesFor += 1;
        } else {
          summary.advantagesAgainst += 1;
          if (behavior.role === "taker") summary.takerAdvantagesAgainst += 1;
          else summary.supportAdvantagesAgainst += 1;
        }
      }
      incrementStrengthOutcome(
        summary.strengthOutcomes,
        kickoff.winStrengthBand,
        kickoff.winningTeam,
        behavior.team,
      );
      incrementStrengthOutcome(
        behavior.role === "taker" ? summary.takerStrengthOutcomes : summary.supportStrengthOutcomes,
        kickoff.winStrengthBand,
        kickoff.winningTeam,
        behavior.team,
      );
    }
  }

  for (const player of players) {
    const key = playerKey(player);
    if (key && !summaries.has(key)) {
      summaries.set(
        key,
        emptyPlayerKickoffSummary({
          key,
          name: player.name || key,
          platform: player.platform,
          platform_player_id: player.platform_player_id,
          rank_tier: player.rank_tier ?? null,
          rank_division: player.rank_division ?? null,
          rank_mmr: player.rank_mmr ?? null,
          rank_is_fallback: player.rank_is_fallback,
          rank_fallback_replay_date: player.rank_fallback_replay_date,
          team: player.team,
        }),
      );
    }
  }

  return [...summaries.values()].sort(
    (left, right) => (left.team ?? 99) - (right.team ?? 99) || left.name.localeCompare(right.name),
  );
}

// Identity-only seed for a player's kickoff aggregates; every counter starts at
// zero so new fields are added in exactly one place.
function emptyPlayerKickoffSummary(identity: {
  key: string;
  name: string;
  platform: string | null;
  platform_player_id: string | null;
  rank_tier: number | null;
  rank_division: number | null;
  rank_mmr: number | null;
  rank_is_fallback?: boolean;
  rank_fallback_replay_date?: string | null;
  team: number | null;
}): PlayerKickoffSummary {
  return {
    ...identity,
    takerCount: 0,
    supportCount: 0,
    advantagesFor: 0,
    advantagesAgainst: 0,
    takerAdvantagesFor: 0,
    takerAdvantagesAgainst: 0,
    supportAdvantagesFor: 0,
    supportAdvantagesAgainst: 0,
    touched: 0,
    firstTouchesAsTaker: 0,
    faked: 0,
    missed: 0,
    kickoffGoalsFor: 0,
    kickoffGoalsAgainst: 0,
    timeToBallSum: 0,
    timeToBallCount: 0,
    boostCollectedSum: 0,
    boostCollectedCount: 0,
    boostUsedSum: 0,
    boostUsedCount: 0,
    boostAfterSum: 0,
    boostAfterCount: 0,
    supportTimeToBallSum: 0,
    supportTimeToBallCount: 0,
    supportBoostUsedSum: 0,
    supportBoostUsedCount: 0,
    supportBoostAfterSum: 0,
    supportBoostAfterCount: 0,
    approaches: new Map(),
    supportBehaviors: new Map(),
    strengthOutcomes: emptyStrengthOutcomes(),
    takerStrengthOutcomes: emptyStrengthOutcomes(),
    supportStrengthOutcomes: emptyStrengthOutcomes(),
  };
}

function playerIdentityFromRemoteKey(playerKey: string | null): {
  platform: string | null;
  platform_player_id: string | null;
} {
  const separator = playerKey?.indexOf(":") ?? -1;
  if (!playerKey || separator <= 0 || separator === playerKey.length - 1) {
    return { platform: null, platform_player_id: null };
  }
  return {
    platform: playerKey.slice(0, separator),
    platform_player_id: playerKey.slice(separator + 1),
  };
}

function incrementMap(map: Map<string, number>, value: string | null): void {
  if (!value) return;
  map.set(value, (map.get(value) ?? 0) + 1);
}

function playerByRemoteKey(players: ReplayPlayer[], key: string): ReplayPlayer | null {
  return players.find((player) => playerKey(player) === key) ?? null;
}

function playerKey(player: ReplayPlayer): string | null {
  if (!player.platform || !player.platform_player_id) return null;
  return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
}

function remoteIdKey(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length !== 1) return null;
  const [platform, id] = entries[0];
  if (typeof id === "string" || typeof id === "number")
    return `${normalizePlatform(platform)}:${String(id)}`;
  if (id && typeof id === "object" && !Array.isArray(id)) {
    const nested = id as Record<string, unknown>;
    const onlineId = nested.online_id ?? nested.id;
    if (typeof onlineId === "string" || typeof onlineId === "number")
      return `${normalizePlatform(platform)}:${String(onlineId)}`;
  }
  return null;
}

function normalizedRemoteKey(value: string | null | undefined): string | null {
  if (!value) return null;
  const separatorIndex = value.indexOf(":");
  if (separatorIndex < 0) return value;
  return `${normalizePlatform(value.slice(0, separatorIndex))}:${value.slice(separatorIndex + 1)}`;
}

function normalizePlatform(value: string): string {
  const lower = value.toLowerCase();
  if (lower === "psynet") return "epic";
  if (lower === "playstation") return "ps4";
  return lower;
}

function possessionStateTeam(value: string | null): number | null {
  if (value === "team_zero") return 0;
  if (value === "team_one") return 1;
  return null;
}

function strengthBand(value: string | null): KickoffStrengthBand {
  return value === "narrow" || value === "clear" || value === "strong" ? value : "unknown";
}

// The first touch can belong to a support player, so match identity rather
// than role; player keys are missing for some platforms, hence the name
// fallback.
function isFirstToucher(kickoff: KickoffRow, behavior: KickoffPlayerBehavior): boolean {
  const touch = kickoff.firstTouch;
  if (touch.playerKey != null && behavior.playerKey != null) {
    return touch.playerKey === behavior.playerKey;
  }
  return (
    touch.playerName !== "" &&
    touch.playerName !== "Unknown" &&
    touch.playerName === behavior.playerName
  );
}

// win_strength is a 0..1 half-field fraction; clamping also tames values from
// analysis runs that predate the redesigned metric.
function clampFraction(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

// Fraction of the winning team's color mixed into the tile background: keep a
// visible floor for narrow wins and saturate fully at win_strength 1.0.
function kickoffWinShade(winStrength: number | null): number | null {
  if (winStrength == null) return null;
  return 0.15 + 0.85 * clampFraction(winStrength);
}

function strengthBandLabel(value: KickoffStrengthBand): string {
  if (value === "unknown") return "Unknown";
  return formatLabel(value);
}

function kickoffShapeLabel(kickoff: KickoffRow): string {
  const blue = shortSpawnLabel(kickoff.teamZeroTaker?.spawn ?? null);
  const orange = shortSpawnLabel(kickoff.teamOneTaker?.spawn ?? null);
  if (!blue && !orange) return "Unknown setup";
  if (blue && orange && blue === orange) return `${blue} mirror`;
  return `${blue || "Unknown"} vs ${orange || "Unknown"}`;
}

function shortSpawnLabel(value: string | null): string {
  if (!value) return "";
  if (value.includes("diagonal")) return "Diagonal";
  if (value.includes("straight") || value.includes("center")) return "Center";
  if (value.includes("off")) return "Off-center";
  return formatLabel(value);
}

function playerKickoffTime(kickoff: KickoffRow, behavior: KickoffPlayerBehavior): number | null {
  if (behavior.timeToBall != null) return behavior.timeToBall;
  if (behavior.firstTouchTime == null) return null;
  return kickoff.startTime == null
    ? behavior.firstTouchTime
    : Math.max(0, behavior.firstTouchTime - kickoff.startTime);
}

function emptyStrengthOutcomes(): Record<KickoffStrengthBand, KickoffStrengthOutcome> {
  return {
    narrow: { wins: 0, losses: 0, neutral: 0 },
    clear: { wins: 0, losses: 0, neutral: 0 },
    strong: { wins: 0, losses: 0, neutral: 0 },
    unknown: { wins: 0, losses: 0, neutral: 0 },
  };
}

function incrementStrengthOutcome(
  outcomes: Record<KickoffStrengthBand, KickoffStrengthOutcome>,
  band: KickoffStrengthBand,
  winningTeam: number | null,
  playerTeam: number | null,
): void {
  if (winningTeam == null || playerTeam == null) {
    outcomes[band].neutral += 1;
  } else if (winningTeam === playerTeam) {
    outcomes[band].wins += 1;
  } else {
    outcomes[band].losses += 1;
  }
}

function objectField(
  payload: Record<string, unknown>,
  key: string,
): Record<string, unknown> | null {
  const value = payload[key];
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function arrayField(payload: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const value = payload[key];
  return Array.isArray(value)
    ? value.filter(
        (item): item is Record<string, unknown> =>
          Boolean(item) && typeof item === "object" && !Array.isArray(item),
      )
    : [];
}

function vector3Field(
  payload: Record<string, unknown>,
  key: string,
): [number, number, number] | null {
  const value = payload[key];
  if (!Array.isArray(value) || value.length < 3) return null;
  const [x, y, z] = value;
  return typeof x === "number" && typeof y === "number" && typeof z === "number" ? [x, y, z] : null;
}

function numberField(payload: Record<string, unknown>, key: string): number | null {
  const value = payload[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function stringField(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const keys = Object.keys(value);
    if (keys.length === 1) return keys[0];
  }
  return null;
}

function booleanField(payload: Record<string, unknown>, key: string): boolean | null {
  const value = payload[key];
  return typeof value === "boolean" ? value : null;
}

function teamField(payload: Record<string, unknown>, key: string): number | null {
  const value = booleanField(payload, key);
  return value == null ? null : value ? 0 : 1;
}

function teamClass(team: number | null): string {
  return team === 0 ? "blue" : team === 1 ? "orange" : "neutral";
}

function teamLabel(team: number | null): string {
  return team === 0 ? "Blue" : team === 1 ? "Orange" : "Neutral";
}

function formatLabel(value: string | null): string {
  if (!value) return "";
  return value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatSeconds(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "-";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  const tenths = value < 10 ? `.${Math.round((value % 1) * 10)}` : "";
  return `${minutes}:${seconds.toString().padStart(2, "0")}${tenths}`;
}

function formatSpeed(value: number | null): string {
  if (value == null) return "-";
  const kph = value * 0.036;
  const mph = value * 0.0223694;
  return `${Math.round(mph).toLocaleString()} mph / ${Math.round(kph).toLocaleString()} km/h`;
}

function formatFrames(value: number | null): string {
  return value == null
    ? "-"
    : `${Math.round(value).toLocaleString()} ${Math.round(value) === 1 ? "frame" : "frames"}`;
}

function formatNextPossession(value: KickoffPossession | null): string {
  if (!value) return "Unknown";
  return value.playerName || teamLabel(value.team);
}

function formatDuration(value: number | null): string {
  return value == null ? "-" : `${value.toFixed(3)}s`;
}

// Kickoff taker/support boost fields arrive in raw 0-255 units; rescale to the
// 0-100 display scale via the shared converter (see ./boostUnits).
function formatBoostAmount(value: number): string {
  return formatBoostPercent(value);
}

function formatBoostValue(value: number | null): string {
  return formatBoostPercent(value);
}

function startDistanceToCenteredBall(position: [number, number, number] | null): number | null {
  if (!position) return null;
  return Math.hypot(position[0], position[1], position[2]);
}

function formatDistance(value: number | null): string {
  return value == null ? "-" : `${Math.round(value).toLocaleString()} uu`;
}

function formatSharePercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}
