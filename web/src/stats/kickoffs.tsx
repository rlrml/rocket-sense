import { CircleDotDashed, Gauge, Goal, type LucideIcon, ShieldCheck, Trophy } from "lucide-react";
import { lazy, Suspense, useCallback, useMemo } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import type { EventClip } from "./EventClipPlayer";
import { useEventPreviewSelection } from "./eventPreview";

export const kickoffEventTypes = ["kickoff"];

const KICKOFF_CLIP_POSTROLL_SECONDS = 5;
const LEGACY_KICKOFF_COUNTDOWN_SECONDS = 3;

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
  scoringTeam: number | null;
  kickoffGoal: boolean;
  kickoffType: KickoffType;
  kickoffDirection: KickoffDirection;
  timeToGoal: number | null;
  takerDelay: number | null;
  exitSpeed: number | null;
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
  firstTouchTime: number | null;
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
  approaches: Map<string, number>;
  supportBehaviors: Map<string, number>;
}

export function KickoffDetail({ events, players, replayId }: KickoffDetailProps) {
  const kickoffs = useMemo(
    () =>
      events
        .filter((event) => event.event_type === "kickoff")
        .map((event, index) => kickoffRow(event, index, players))
        .sort((left, right) => (left.startTime ?? Number.POSITIVE_INFINITY) - (right.startTime ?? Number.POSITIVE_INFINITY)),
    [events, players],
  );
  const playerSummaries = useMemo(() => kickoffPlayerSummaries(kickoffs, players), [kickoffs, players]);
  const summary = useMemo(() => kickoffSummary(kickoffs), [kickoffs]);
  const kickoffKey = useCallback((kickoff: KickoffRow) => kickoff.event.id, []);
  const buildClip = useCallback((kickoff: KickoffRow, replayNonce: number): EventClip | null => {
    const previewStart = kickoffPreviewStart(kickoff);
    if (!previewStart) {
      return null;
    }
    const endTime = kickoff.endTime ?? kickoff.startTime;
    const winnerPlayer = kickoffWinnerPreviewPlayer(kickoff);
    return {
      start: previewStart.time,
      end: (endTime ?? previewStart.time) + KICKOFF_CLIP_POSTROLL_SECONDS,
      startFrame: previewStart.frame,
      camera: winnerPlayer
        ? { kind: "follow-player", playerKey: winnerPlayer.playerKey, playerName: winnerPlayer.playerName, ballCam: true }
        : { kind: "free", preset: "side" },
      key: `${kickoff.event.id}:${replayNonce}`,
    };
  }, []);
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
                <span>Taker results, support choices, and kickoff goal context.</span>
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
                  ? kickoffPreviewLabel(activeKickoff)
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

function KickoffPlayerTable({ summaries }: { summaries: PlayerKickoffSummary[] }) {
  return (
    <div className="table-frame compact-table kickoff-player-table">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Taker</th>
            <th>Support</th>
            <th>Touches</th>
            <th>Fakes</th>
            <th>Misses</th>
            <th>Common approach</th>
            <th>Support habit</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((summary) => (
            <tr className={`team-row-${teamClass(summary.team)}`} key={summary.key}>
              <td>
                <div className={`kickoff-player-cell team-accent-${teamClass(summary.team)}`}>
                  <strong>{summary.name}</strong>
                  <span>{teamLabel(summary.team)}</span>
                </div>
              </td>
              <td>{summary.takerCount}</td>
              <td>{summary.supportCount}</td>
              <td>{summary.touched}</td>
              <td>{summary.faked}</td>
              <td>{summary.missed}</td>
              <td>{topMapLabel(summary.approaches)}</td>
              <td>{topMapLabel(summary.supportBehaviors)}</td>
              <td>
                <span className="kickoff-goal-balance">
                  +{summary.kickoffGoalsFor} / -{summary.kickoffGoalsAgainst}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KickoffCard({
  kickoff,
  active,
  onActivate,
}: {
  kickoff: KickoffRow;
  active: boolean;
  onActivate: (force: boolean) => void;
}) {
  const blueBehaviors = [kickoff.teamZeroTaker, ...kickoff.teamZeroSupport].filter(Boolean) as KickoffPlayerBehavior[];
  const orangeBehaviors = [kickoff.teamOneTaker, ...kickoff.teamOneSupport].filter(Boolean) as KickoffPlayerBehavior[];

  return (
    <button
      type="button"
      className={`kickoff-card winner-${teamClass(kickoff.winningTeam)} ${active ? "selected" : ""}`}
      onClick={() => onActivate(true)}
      onMouseEnter={() => onActivate(false)}
      onFocus={() => onActivate(false)}
    >
      <header className="kickoff-card-header">
        <div className="kickoff-card-heading">
          <KickoffTakerVersus kickoff={kickoff} />
          <div className="kickoff-type-row">
            {kickoffTypeChips(kickoff).map((chip) => (
              <span className={`kickoff-type-pill ${chip.muted ? "muted" : ""}`} key={chip.key}>
                {chip.value}
              </span>
            ))}
            {kickoff.kickoffGoal ? <span className={`kickoff-goal-chip team-chip-${teamClass(kickoff.scoringTeam)}`}>Goal in {formatSeconds(kickoff.timeToGoal)}</span> : null}
          </div>
        </div>
        <div className="kickoff-time-block">
          <strong>{formatSeconds(kickoff.startTime)}</strong>
          <span>{kickoff.takerDelay == null ? "No taker delay" : `${formatSeconds(kickoff.takerDelay)} taker gap`}</span>
        </div>
      </header>

      <div className="kickoff-outcome-grid">
        <KickoffFact icon={Trophy} label="Winner" value={teamLabel(kickoff.winningTeam)} team={kickoff.winningTeam} />
        <KickoffFact icon={ShieldCheck} label="Possession" value={kickoffPossessionLabel(kickoff)} team={kickoff.possessionTeam} />
        <KickoffFact icon={CircleDotDashed} label="First touch" value={kickoff.firstTouch.playerName} team={kickoff.firstTouch.team} />
        <KickoffFact icon={Gauge} label="Exit speed" value={formatSpeed(kickoff.exitSpeed)} team={null} />
      </div>

      <div className="kickoff-team-grid">
        <KickoffTeamColumn label="Blue" team={0} behaviors={blueBehaviors} />
        <KickoffTeamColumn label="Orange" team={1} behaviors={orangeBehaviors} />
      </div>
    </button>
  );
}

function KickoffTakerVersus({ kickoff }: { kickoff: KickoffRow }) {
  return (
    <h4 className="kickoff-taker-versus">
      <span className={`kickoff-taker-name team-accent-${teamClass(0)}`}>
        {kickoff.teamZeroTaker?.playerName ?? "Blue taker"}
      </span>
      <span className="kickoff-versus">vs</span>
      <span className={`kickoff-taker-name team-accent-${teamClass(1)}`}>
        {kickoff.teamOneTaker?.playerName ?? "Orange taker"}
      </span>
    </h4>
  );
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

function KickoffTeamColumn({ label, team, behaviors }: { label: string; team: number; behaviors: KickoffPlayerBehavior[] }) {
  return (
    <section className={`kickoff-team-column team-column-${teamClass(team)}`}>
      <div className="kickoff-team-title">
        <span>{label}</span>
        <strong>{behaviors.length} players</strong>
      </div>
      <div className="kickoff-behavior-list">
        {behaviors.map((behavior, index) => (
          <KickoffBehaviorRow behavior={behavior} key={`${behavior.playerKey ?? behavior.playerName}:${behavior.role}:${index}`} />
        ))}
      </div>
    </section>
  );
}

function KickoffBehaviorRow({ behavior }: { behavior: KickoffPlayerBehavior }) {
  const primary = behavior.role === "taker" ? behavior.outcome : behavior.supportBehavior;
  const secondary = behavior.role === "taker" ? behavior.approach : behavior.spawn;
  const boostDelta = behavior.startBoost == null || behavior.boostAfter == null ? null : behavior.boostAfter - behavior.startBoost;

  return (
    <div className="kickoff-behavior-row">
      <div>
        <strong>{behavior.playerName}</strong>
        <span>{behavior.role === "taker" ? "Taker" : "Support"}</span>
      </div>
      <div className="kickoff-behavior-tags">
        <span>{formatLabel(primary) || "Unknown"}</span>
        {secondary ? <span>{formatLabel(secondary)}</span> : null}
        {boostDelta == null ? null : (
          <span className={boostDelta >= 0 ? "boost-positive" : "boost-negative"}>
            {boostDelta >= 0 ? "+" : ""}
            {Math.round(boostDelta)} boost
          </span>
        )}
      </div>
    </div>
  );
}

function kickoffRow(event: MechanicEventResponse, index: number, players: ReplayPlayer[]): KickoffRow {
  const payload = event.payload;
  const startTime = numberField(payload, "start_time") ?? event.start_time;
  const liveActionStartTime = numberField(payload, "live_action_start_time");
  const liveActionStartFrame = numberField(payload, "live_action_start_frame");
  const movementStartTime = numberField(payload, "movement_start_time");
  const movementStartFrame = numberField(payload, "movement_start_frame");
  return {
    event,
    index,
    startTime,
    endTime: numberField(payload, "end_time") ?? event.end_time,
    liveActionStartTime,
    liveActionStartFrame,
    movementStartTime,
    movementStartFrame,
    outcome: stringField(payload, "outcome"),
    possessionOutcome: stringField(payload, "kickoff_possession_outcome"),
    winningTeam: teamField(payload, "winning_team_is_team_0"),
    possessionTeam: teamField(payload, "kickoff_possession_team_is_team_0"),
    scoringTeam: teamField(payload, "scoring_team_is_team_0"),
    kickoffGoal: booleanField(payload, "kickoff_goal") ?? false,
    kickoffType: kickoffType(payload),
    kickoffDirection: kickoffDirection(payload),
    timeToGoal: numberField(payload, "time_to_goal"),
    takerDelay: numberField(payload, "taker_touch_delay_seconds"),
    exitSpeed: numberField(payload, "exit_speed"),
    firstTouch: kickoffTouch(payload, "first_touch", players),
    followUpTouch: kickoffTouch(payload, "first_follow_up_touch", players),
    teamZeroTaker: kickoffPlayerBehavior(objectField(payload, "team_zero_taker"), 0, "taker", players),
    teamOneTaker: kickoffPlayerBehavior(objectField(payload, "team_one_taker"), 1, "taker", players),
    teamZeroSupport: arrayField(payload, "team_zero_non_takers").map((item) => kickoffPlayerBehavior(item, 0, "support", players)).filter(Boolean) as KickoffPlayerBehavior[],
    teamOneSupport: arrayField(payload, "team_one_non_takers").map((item) => kickoffPlayerBehavior(item, 1, "support", players)).filter(Boolean) as KickoffPlayerBehavior[],
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
    firstTouchTime: numberField(payload, "first_touch_time"),
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

function kickoffPreviewLabel(kickoff: KickoffRow): string {
  const typeLabel = kickoffTypeName(kickoff.kickoffType);
  return typeLabel
    ? `${typeLabel} · ${kickoffDirectionName(kickoff.kickoffDirection)} · ${formatSeconds(kickoff.startTime)}`
    : formatSeconds(kickoff.startTime);
}

function kickoffPreviewStart(kickoff: KickoffRow): { time: number; frame: number | null } | null {
  if (kickoff.liveActionStartTime != null) {
    return { time: kickoff.liveActionStartTime, frame: kickoff.liveActionStartFrame };
  }
  if (
    kickoff.movementStartTime != null &&
    (kickoff.startTime == null || kickoff.movementStartTime > kickoff.startTime + 0.05)
  ) {
    return { time: kickoff.movementStartTime, frame: kickoff.movementStartFrame };
  }
  if (kickoff.startTime != null) {
    return { time: kickoff.startTime + LEGACY_KICKOFF_COUNTDOWN_SECONDS, frame: null };
  }
  return null;
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
        approaches: new Map(),
        supportBehaviors: new Map(),
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
      } else {
        summary.supportCount += 1;
        incrementMap(summary.supportBehaviors, behavior.supportBehavior);
      }
      if (kickoff.kickoffGoal && behavior.team != null && kickoff.scoringTeam != null) {
        if (behavior.team === kickoff.scoringTeam) summary.kickoffGoalsFor += 1;
        else summary.kickoffGoalsAgainst += 1;
      }
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
        approaches: new Map(),
        supportBehaviors: new Map(),
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

function normalizePlatform(value: string): string {
  const lower = value.toLowerCase();
  if (lower === "psynet") return "epic";
  if (lower === "playstation") return "ps4";
  return lower;
}

function objectField(payload: Record<string, unknown>, key: string): Record<string, unknown> | null {
  const value = payload[key];
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function arrayField(payload: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const value = payload[key];
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item)) : [];
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
  return value == null ? "-" : `${Math.round(value).toLocaleString()} uu/s`;
}
