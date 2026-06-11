import type { ReplayModel } from "@rlrml/player";
import { CircleDotDashed, Gauge, Goal, type LucideIcon, ShieldCheck, Trophy, Video } from "lucide-react";
import { type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, lazy, type ReactNode, Suspense, useCallback, useMemo, useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import { formatBoostPercent } from "./boostUnits";
import type { EventClip } from "./EventClipPlayer";
import { useEventPreviewSelection } from "./eventPreview";
import { KickoffShapeIcon } from "./KickoffShapeIcon";
import type { KickoffPathPlayer } from "./KickoffShapeDiagram";

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

const EventClipPreview = lazy(() =>
  import("./EventClipPlayer").then((module) => ({ default: module.EventClipPreview })),
);

type KickoffType = "diagonal" | "center_offset" | "center" | "unknown";
type KickoffDirection = "left" | "right" | "center" | "unknown";

interface KickoffDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  replayId: string;
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
  team: number | null;
  takerCount: number;
  supportCount: number;
  touched: number;
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
  approaches: Map<string, number>;
  supportBehaviors: Map<string, number>;
  strengthOutcomes: Record<KickoffStrengthBand, KickoffStrengthOutcome>;
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

export function KickoffDetail({ events, players, replayId }: KickoffDetailProps) {
  const possessionSpans = useMemo(
    () =>
      events
        .filter((event) => event.event_type === "possession")
        .map((event) => possessionSpan(event, players))
        .filter((span): span is PossessionSpan => Boolean(span))
        .sort((left, right) => (left.startTime ?? Number.POSITIVE_INFINITY) - (right.startTime ?? Number.POSITIVE_INFINITY)),
    [events, players],
  );
  const kickoffs = useMemo(
    () =>
      events
        .filter((event) => event.event_type === "kickoff")
        .map((event, index) => kickoffRow(event, index, players, possessionSpans))
        .sort((left, right) => (left.startTime ?? Number.POSITIVE_INFINITY) - (right.startTime ?? Number.POSITIVE_INFINITY)),
    [events, players, possessionSpans],
  );
  const playerSummaries = useMemo(() => kickoffPlayerSummaries(kickoffs, players), [kickoffs, players]);
  const summary = useMemo(() => kickoffSummary(kickoffs), [kickoffs]);
  const kickoffKey = useCallback((kickoff: KickoffRow) => kickoff.event.id, []);
  // Hovering a player chip inside a kickoff card temporarily reseats the preview
  // camera on that player (loser and support players included); leaving the chip
  // falls back to the default winner perspective.
  const [perspective, setPerspective] = useState<KickoffPerspective | null>(null);
  const perspectiveKey = perspective ? perspectiveChipKey(perspective.playerKey, perspective.playerName) : null;
  const buildClip = useCallback((kickoff: KickoffRow, replayNonce: number): EventClip | null => {
    const previewStart = kickoffPreviewStart(kickoff);
    if (!previewStart) {
      return null;
    }
    // Try the hovered perspective first, then the winner; fall back to a free
    // camera if neither resolves to a player track in the parsed replay.
    const followTargets = [perspective, kickoffWinnerPreviewPlayer(kickoff)].filter(
      (target): target is { playerKey: string | null; playerName: string | null } => Boolean(target),
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
          if (cam.followPlayer({ playerKey: target.playerKey, playerName: target.playerName, ballCam: true })) {
            return;
          }
        }
        cam.freeCamera("side");
      },
      // The perspective is intentionally NOT part of the key: same key means the
      // player re-aims the camera without restarting the loop (see applyClip).
      key: `${kickoff.event.id}:${replayNonce}`,
    };
  }, [perspective]);
  const {
    activeItem: activeKickoff,
    activeKey: activeKickoffId,
    clip,
    activateItem: activateKickoff,
  } = useEventPreviewSelection(kickoffs, kickoffKey, buildClip);

  return (
    <div className="kickoff-detail">
      <section className="kickoff-hero">
        <div>
          <p className="eyebrow">Kickoff report</p>
          <h2>Kickoffs</h2>
          <p>{kickoffs.length ? kickoffReportSentence(summary, kickoffs.length) : "No kickoff events have been indexed for this replay yet."}</p>
        </div>
        <div className="kickoff-hero-metrics">
          <KickoffMetric icon={CircleDotDashed} label="Kickoffs" value={kickoffs.length.toLocaleString()} />
          <KickoffMetric icon={Trophy} label="Blue wins" value={summary.blueWins.toLocaleString()} />
          <KickoffMetric icon={Trophy} label="Orange wins" value={summary.orangeWins.toLocaleString()} />
          <KickoffMetric icon={Goal} label="Kickoff goals" value={summary.goals.toLocaleString()} />
        </div>
      </section>

      {kickoffs.length ? (
        <div className="stat-section-grid">
          <section className="chart-panel full-span">
            <div className="chart-panel-header">
              <div>
                <h3>Player behavior</h3>
                <span>Takers and support split out, with kickoff goal context.</span>
              </div>
            </div>
            <KickoffPlayerTable summaries={playerSummaries} />
          </section>

          <section className="chart-panel full-span">
            <div className="chart-panel-header">
              <div>
                <h3>Kickoff by kickoff</h3>
                <span>Outcome, possession, first touch, and every player&apos;s assignment.</span>
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
                activeKickoff
                  ? kickoffPreviewLabel(activeKickoff, perspective)
                  : "Loading…"
              }
              openHref={`/replays/${encodeURIComponent(replayId)}/player`}
            />
          </Suspense>
        </div>
      ) : (
        <div className="stat-empty">No kickoff events are available for this replay yet.</div>
      )}
    </div>
  );
}

function KickoffMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="kickoff-metric">
      <Icon size={17} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

interface KickoffPlayerColumn {
  key: string;
  label: string;
  render: (summary: PlayerKickoffSummary) => ReactNode;
}

const PLAYER_COLUMN: KickoffPlayerColumn = {
  key: "player",
  label: "Player",
  render: (summary) => (
    <div className={`kickoff-player-cell team-accent-${teamClass(summary.team)}`}>
      <strong>{summary.name}</strong>
      <span>{teamLabel(summary.team)}</span>
    </div>
  ),
};

const GOALS_COLUMN: KickoffPlayerColumn = {
  key: "goals",
  label: "Goals",
  render: (summary) => (
    <span className="kickoff-goal-balance">
      +{summary.kickoffGoalsFor} / -{summary.kickoffGoalsAgainst}
    </span>
  ),
};

// Win strength is a property of the kickoff a player took, so it belongs with the
// taker table only; support rows stay lean.
const STRENGTH_COLUMN: KickoffPlayerColumn = {
  key: "strength",
  label: "Outcomes",
  render: (summary) => <KickoffStrengthSummary outcomes={summary.strengthOutcomes} />,
};

const TAKER_COLUMNS: KickoffPlayerColumn[] = [
  PLAYER_COLUMN,
  { key: "takes", label: "Takes", render: (summary) => summary.takerCount },
  { key: "touched", label: "Touch", render: (summary) => summary.touched },
  { key: "faked", label: "Fake", render: (summary) => summary.faked },
  { key: "missed", label: "Miss", render: (summary) => summary.missed },
  { key: "toBall", label: "To ball", render: (summary) => formatAverageDuration(summary.timeToBallSum, summary.timeToBallCount) },
  { key: "boostPlus", label: "Boost +", render: (summary) => formatAverageBoost(summary.boostCollectedSum, summary.boostCollectedCount) },
  { key: "boostUsed", label: "Boost used", render: (summary) => formatAverageBoost(summary.boostUsedSum, summary.boostUsedCount) },
  { key: "approach", label: "Approach", render: (summary) => topMapLabel(summary.approaches) },
  GOALS_COLUMN,
  STRENGTH_COLUMN,
];

const SUPPORT_COLUMNS: KickoffPlayerColumn[] = [
  PLAYER_COLUMN,
  { key: "plays", label: "Plays", render: (summary) => summary.supportCount },
  { key: "habit", label: "Habit", render: (summary) => topMapLabel(summary.supportBehaviors) },
  GOALS_COLUMN,
];

function KickoffPlayerTable({ summaries }: { summaries: PlayerKickoffSummary[] }) {
  const takers = summaries.filter((summary) => summary.takerCount > 0);
  const supports = summaries.filter((summary) => summary.supportCount > 0);
  return (
    <div className="kickoff-player-tables">
      <KickoffRoleTable label="Takers" columns={TAKER_COLUMNS} summaries={takers} emptyLabel="No taker data yet." />
      <KickoffRoleTable label="Support" columns={SUPPORT_COLUMNS} summaries={supports} emptyLabel="No support data yet." />
    </div>
  );
}

function KickoffRoleTable({
  label,
  columns,
  summaries,
  emptyLabel,
}: {
  label: string;
  columns: KickoffPlayerColumn[];
  summaries: PlayerKickoffSummary[];
  emptyLabel: string;
}) {
  return (
    <div className="kickoff-player-table-group">
      <div className="kickoff-player-table-label">{label}</div>
      {summaries.length ? (
        <div className="table-frame compact-table kickoff-player-table">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summaries.map((summary) => (
                <tr className={`team-row-${teamClass(summary.team)}`} key={summary.key}>
                  {columns.map((column) => (
                    <td key={column.key}>{column.render(summary)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="kickoff-player-table-empty">{emptyLabel}</div>
      )}
    </div>
  );
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
  replayId: string;
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
      <KickoffTakerSection kickoff={kickoff} perspectiveKey={perspectiveKey} onPerspective={onPerspective} />

      <div className="kickoff-team-grid">
        <KickoffTeamColumn label="Blue support" team={0} behaviors={blueSupport} kickoff={kickoff} perspectiveKey={perspectiveKey} onPerspective={onPerspective} />
        <KickoffTeamColumn label="Orange support" team={1} behaviors={orangeSupport} kickoff={kickoff} perspectiveKey={perspectiveKey} onPerspective={onPerspective} />
      </div>

      <div className="kickoff-card-body">
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
                {kickoff.takerDelayFrames == null ? "No taker gap" : `${formatFrames(kickoff.takerDelayFrames)} taker gap`}
              </span>
              {kickoff.kickoffGoal ? <span className={`kickoff-goal-chip team-chip-${teamClass(kickoff.scoringTeam)}`}>Goal in {formatSeconds(kickoff.timeToGoal)}</span> : null}
            </div>
          </header>

          <div className="kickoff-outcome-grid">
            <KickoffFact icon={Trophy} label="Winner" value={teamLabel(kickoff.winningTeam)} team={kickoff.winningTeam} />
            <KickoffFact icon={ShieldCheck} label="Possession" value={kickoffPossessionLabel(kickoff)} team={kickoff.possessionTeam} />
            <KickoffFact icon={ShieldCheck} label="Next possession" value={formatNextPossession(kickoff.nextPossession)} team={kickoff.nextPossession?.team ?? kickoff.possessionTeam} />
            <KickoffFact icon={CircleDotDashed} label="First touch" value={kickoff.firstTouch.playerName} team={kickoff.firstTouch.team} />
            <KickoffFact icon={Gauge} label="Exit speed" value={formatSpeed(kickoff.exitSpeed)} team={null} />
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
      <span className="kickoff-perspective-chip-name">{behavior.playerName}</span>
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
    onMouseEnter: () => onPerspective({ playerKey: behavior.playerKey, playerName: behavior.playerName }),
    onMouseLeave: () => onPerspective(null),
  };
}

function kickoffPathStartFrame(kickoff: KickoffRow): number | null {
  return kickoff.liveActionStartFrame ?? kickoff.movementStartFrame ?? kickoff.event.start_frame ?? null;
}

function kickoffPathEndFrame(kickoff: KickoffRow): number | null {
  return kickoff.followUpTouch.frame ?? kickoff.firstTouch.frame ?? null;
}

function kickoffPathPlayers(kickoff: KickoffRow): KickoffPathPlayer[] {
  return [kickoff.teamZeroTaker, kickoff.teamOneTaker, ...kickoff.teamZeroSupport, ...kickoff.teamOneSupport]
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

function KickoffTakerSection({ kickoff, perspectiveKey, onPerspective }: { kickoff: KickoffRow } & KickoffPerspectiveProps) {
  return (
    <section className="kickoff-taker-section">
      <div className="kickoff-section-title">
        <span>Takers</span>
        <strong>
          {strengthBandLabel(kickoff.winStrengthBand)} win
          {kickoff.winStrength == null ? "" : ` · ${Math.round(clampFraction(kickoff.winStrength) * 100)}%`}
        </strong>
      </div>
      <div className="kickoff-taker-grid">
        <KickoffTakerTile behavior={kickoff.teamZeroTaker} team={0} kickoff={kickoff} perspectiveKey={perspectiveKey} onPerspective={onPerspective} />
        <KickoffTakerTile behavior={kickoff.teamOneTaker} team={1} kickoff={kickoff} perspectiveKey={perspectiveKey} onPerspective={onPerspective} />
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
  ].filter(Boolean).join(" ");
  const boostAfter = behavior?.boostAfter == null ? "-" : `${formatBoostAmount(behavior.boostAfter)} after`;
  const boostUsed = behavior?.boostUsed == null ? "-" : `${formatBoostAmount(behavior.boostUsed)} used`;
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
          <strong>Strategy</strong>
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
  const boostDelta = behavior.startBoost == null || behavior.boostAfter == null ? null : behavior.boostAfter - behavior.startBoost;
  const showTakerBoost = behavior.role === "taker" && (behavior.boostCollected != null || behavior.boostUsed != null);
  const ballDistance = behavior.distanceToBallAtFirstTouch ?? startDistanceToCenteredBall(behavior.startPosition);
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
        {behavior.role === "taker" && behavior.timeToBall != null ? <span>{formatDuration(behavior.timeToBall)} to ball</span> : null}
        {showTakerBoost && behavior.boostCollected != null ? (
          <span className="boost-positive">+{formatBoostAmount(behavior.boostCollected)} boost</span>
        ) : null}
        {showTakerBoost && behavior.boostUsed != null ? (
          <span className="boost-negative">{formatBoostAmount(behavior.boostUsed)} used</span>
        ) : null}
        {!showTakerBoost && boostDelta != null ? (
          <span className={boostDelta >= 0 ? "boost-positive" : "boost-negative"}>
            {boostDelta >= 0 ? "+" : ""}
            {Math.round(boostDelta)} boost
          </span>
        ) : null}
      </div>
      {behavior.role === "support" ? (
        <div className="kickoff-support-details">
          <span>
            <strong>Ball dist {behavior.distanceToBallAtFirstTouch == null ? "start" : "50/50"}</strong>
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

function KickoffStrengthSummary({ outcomes }: { outcomes: Record<KickoffStrengthBand, KickoffStrengthOutcome> }) {
  const bands: KickoffStrengthBand[] = ["narrow", "clear", "strong", "unknown"];
  const visibleBands = bands.filter((band) => {
    const outcome = outcomes[band];
    return outcome.wins > 0 || outcome.losses > 0 || outcome.neutral > 0;
  });

  if (visibleBands.length === 0) return <span>-</span>;

  return (
    <div className="kickoff-strength-summary">
      {visibleBands.map((band) => {
        const outcome = outcomes[band];
        return (
          <span className={`kickoff-strength-chip strength-${band}`} key={band}>
            <strong>{strengthBandLabel(band)}</strong>
            {outcome.wins}W/{outcome.losses}L{outcome.neutral > 0 ? `/${outcome.neutral}N` : ""}
          </span>
        );
      })}
    </div>
  );
}

function kickoffRow(event: MechanicEventResponse, index: number, players: ReplayPlayer[], possessionSpans: PossessionSpan[]): KickoffRow {
  const payload = event.payload;
  const teamZeroTouchFrame = numberField(payload, "team_zero_taker_touch_frame");
  const teamOneTouchFrame = numberField(payload, "team_one_taker_touch_frame");
  const takerDelayFrames = teamZeroTouchFrame == null || teamOneTouchFrame == null ? null : Math.abs(teamZeroTouchFrame - teamOneTouchFrame);
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
    teamZeroTaker: kickoffPlayerBehavior(objectField(payload, "team_zero_taker"), 0, "taker", players),
    teamOneTaker: kickoffPlayerBehavior(objectField(payload, "team_one_taker"), 1, "taker", players),
    teamZeroSupport: arrayField(payload, "team_zero_non_takers").map((item) => kickoffPlayerBehavior(item, 0, "support", players)).filter(Boolean) as KickoffPlayerBehavior[],
    teamOneSupport: arrayField(payload, "team_one_non_takers").map((item) => kickoffPlayerBehavior(item, 1, "support", players)).filter(Boolean) as KickoffPlayerBehavior[],
  };
}

function possessionSpan(event: MechanicEventResponse, players: ReplayPlayer[]): PossessionSpan | null {
  const payload = event.payload;
  const playerKey = remoteIdKey(payload.player_id) ?? normalizedRemoteKey(event.player_id);
  const player = playerKey ? playerByRemoteKey(players, playerKey) : null;
  const team = possessionStateTeam(stringField(payload, "possession_state")) ?? event.team ?? player?.team ?? null;
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
    return span.startTime >= cutoff - 0.1 || (span.endTime != null && span.endTime >= cutoff && span.startTime >= (startTime ?? cutoff) - 0.1);
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

function kickoffTouch(payload: Record<string, unknown>, prefix: string, players: ReplayPlayer[]): KickoffTouch {
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
    team: teamField(payload, "is_team_0") ?? player?.team ?? fallbackTeam,
    role,
    spawn: stringField(payload, "spawn_position"),
    approach: stringField(payload, "approach"),
    outcome: stringField(payload, "outcome"),
    supportBehavior: stringField(payload, "support_behavior"),
    startBoost: numberField(payload, "start_boost"),
    boostAfter: numberField(payload, "boost_after"),
    boostAtFirstTouch: numberField(payload, "boost_at_first_touch") ?? numberField(payload, "boost_at_kickoff_50"),
    timeToBall: numberField(payload, "time_to_ball"),
    boostCollected: numberField(payload, "boost_collected"),
    boostUsed: numberField(payload, "boost_used"),
    firstTouchTime: numberField(payload, "first_touch_time"),
    startPosition: vector3Field(payload, "start_position"),
    distanceToBallAtFirstTouch: numberField(payload, "distance_to_ball_at_first_touch") ?? numberField(payload, "distance_to_ball_at_kickoff_50"),
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

function kickoffTypeFromSpawns(teamZeroSpawn: string | null, teamOneSpawn: string | null): KickoffType {
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

function isSymmetricSpawn(teamZeroSpawn: string | null, teamOneSpawn: string | null, family: "diagonal" | "off_center"): boolean {
  return (
    (teamZeroSpawn === `${family}_left` && teamOneSpawn === `${family}_left`) ||
    (teamZeroSpawn === `${family}_right` && teamOneSpawn === `${family}_right`)
  );
}

function isKickoffType(value: string | null): value is KickoffType {
  return (
    value === "diagonal" ||
    value === "center_offset" ||
    value === "center" ||
    value === "unknown"
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

function kickoffDirectionFromSpawns(teamZeroSpawn: string | null, teamOneSpawn: string | null): KickoffDirection {
  if ((teamZeroSpawn === "diagonal_left" && teamOneSpawn === "diagonal_left") || (teamZeroSpawn === "off_center_left" && teamOneSpawn === "off_center_left")) {
    return "left";
  }
  if ((teamZeroSpawn === "diagonal_right" && teamOneSpawn === "diagonal_right") || (teamZeroSpawn === "off_center_right" && teamOneSpawn === "off_center_right")) {
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

function kickoffPreviewStart(kickoff: KickoffRow): { frame: number | null; resolveStart?: EventClip["resolveStart"] } | null {
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
function kickoffClipEndTime(replay: ReplayModel, kickoff: KickoffRow, startFrame: number | null): number {
  const frames = replay.frames;
  const timeAtFrame = (frameIndex: number | null): number | null =>
    frameIndex != null && frameIndex >= 0 && frameIndex < frames.length ? frames[frameIndex].time : null;

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

function kickoffWinnerPreviewPlayer(kickoff: KickoffRow): { playerKey: string | null; playerName: string | null } | null {
  const perspectiveTeam = kickoff.winningTeam ?? kickoff.possessionTeam;
  const winningTaker =
    perspectiveTeam === 0 ? kickoff.teamZeroTaker : perspectiveTeam === 1 ? kickoff.teamOneTaker : null;
  if (winningTaker?.playerKey || winningTaker?.playerName) {
    return { playerKey: winningTaker.playerKey, playerName: winningTaker.playerName };
  }
  if (kickoff.firstTouch.team === perspectiveTeam && (kickoff.firstTouch.playerKey || kickoff.firstTouch.playerName)) {
    return { playerKey: kickoff.firstTouch.playerKey, playerName: kickoff.firstTouch.playerName };
  }
  if (kickoff.followUpTouch.team === perspectiveTeam && (kickoff.followUpTouch.playerKey || kickoff.followUpTouch.playerName)) {
    return { playerKey: kickoff.followUpTouch.playerKey, playerName: kickoff.followUpTouch.playerName };
  }
  return null;
}

function kickoffTypeChips(kickoff: KickoffRow): Array<{ key: string; value: string; muted?: boolean }> {
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
      if (kickoff.kickoffGoal) summary.goals += 1;
      return summary;
    },
    { blueWins: 0, orangeWins: 0, neutral: 0, goals: 0 },
  );
}

function kickoffReportSentence(summary: ReturnType<typeof kickoffSummary>, total: number): string {
  const winLeader = summary.blueWins === summary.orangeWins ? "Neither team controlled the kickoff count" : summary.blueWins > summary.orangeWins ? "Blue had the kickoff edge" : "Orange had the kickoff edge";
  const goalPart = summary.goals === 0 ? "no kickoff goals" : `${summary.goals} kickoff ${summary.goals === 1 ? "goal" : "goals"}`;
  return `${winLeader} across ${total} kickoffs with ${goalPart}.`;
}

function kickoffPlayerSummaries(kickoffs: KickoffRow[], players: ReplayPlayer[]): PlayerKickoffSummary[] {
  const summaries = new Map<string, PlayerKickoffSummary>();
  const ensureSummary = (behavior: KickoffPlayerBehavior): PlayerKickoffSummary => {
    const key = behavior.playerKey ?? `${behavior.team ?? "unknown"}:${behavior.playerName}`;
    if (!summaries.has(key)) {
      summaries.set(key, {
        key,
        name: behavior.playerName,
        team: behavior.team,
        takerCount: 0,
        supportCount: 0,
        touched: 0,
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
        approaches: new Map(),
        supportBehaviors: new Map(),
        strengthOutcomes: emptyStrengthOutcomes(),
      });
    }
    return summaries.get(key)!;
  };

  for (const kickoff of kickoffs) {
    for (const behavior of [kickoff.teamZeroTaker, kickoff.teamOneTaker, ...kickoff.teamZeroSupport, ...kickoff.teamOneSupport].filter(Boolean) as KickoffPlayerBehavior[]) {
      const summary = ensureSummary(behavior);
      if (behavior.role === "taker") {
        summary.takerCount += 1;
        incrementMap(summary.approaches, behavior.approach);
        if (behavior.outcome === "touched") summary.touched += 1;
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
      } else {
        summary.supportCount += 1;
        incrementMap(summary.supportBehaviors, behavior.supportBehavior);
      }
      if (kickoff.kickoffGoal && behavior.team != null && kickoff.scoringTeam != null) {
        if (behavior.team === kickoff.scoringTeam) summary.kickoffGoalsFor += 1;
        else summary.kickoffGoalsAgainst += 1;
      }
      incrementStrengthOutcome(summary.strengthOutcomes, kickoff.winStrengthBand, kickoff.winningTeam, behavior.team);
    }
  }

  for (const player of players) {
    const key = playerKey(player);
    if (key && !summaries.has(key)) {
      summaries.set(key, {
        key,
        name: player.name || key,
        team: player.team,
        takerCount: 0,
        supportCount: 0,
        touched: 0,
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
        approaches: new Map(),
        supportBehaviors: new Map(),
        strengthOutcomes: emptyStrengthOutcomes(),
      });
    }
  }

  return [...summaries.values()].sort((left, right) => (left.team ?? 99) - (right.team ?? 99) || left.name.localeCompare(right.name));
}

function incrementMap(map: Map<string, number>, value: string | null): void {
  if (!value) return;
  map.set(value, (map.get(value) ?? 0) + 1);
}

function topMapLabel(map: Map<string, number>): string {
  const [top] = [...map.entries()].sort((left, right) => right[1] - left[1]);
  return top ? `${formatLabel(top[0])} (${top[1]})` : "-";
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
  if (typeof id === "string" || typeof id === "number") return `${normalizePlatform(platform)}:${String(id)}`;
  if (id && typeof id === "object" && !Array.isArray(id)) {
    const nested = id as Record<string, unknown>;
    const onlineId = nested.online_id ?? nested.id;
    if (typeof onlineId === "string" || typeof onlineId === "number") return `${normalizePlatform(platform)}:${String(onlineId)}`;
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
  return touch.playerName !== "" && touch.playerName !== "Unknown" && touch.playerName === behavior.playerName;
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
  return kickoff.startTime == null ? behavior.firstTouchTime : Math.max(0, behavior.firstTouchTime - kickoff.startTime);
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

function objectField(payload: Record<string, unknown>, key: string): Record<string, unknown> | null {
  const value = payload[key];
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function arrayField(payload: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const value = payload[key];
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item)) : [];
}

function vector3Field(payload: Record<string, unknown>, key: string): [number, number, number] | null {
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
  return value == null ? "-" : `${Math.round(value).toLocaleString()} ${Math.round(value) === 1 ? "frame" : "frames"}`;
}

function formatNextPossession(value: KickoffPossession | null): string {
  if (!value) return "Unknown";
  return value.playerName || teamLabel(value.team);
}

function formatDuration(value: number | null): string {
  return value == null ? "-" : `${value.toFixed(1)}s`;
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

function formatAverageDuration(sum: number, count: number): string {
  return count > 0 ? formatDuration(sum / count) : "-";
}

function formatAverageBoost(sum: number, count: number): string {
  return count > 0 ? formatBoostAmount(sum / count) : "-";
}
