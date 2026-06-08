import { CircleDotDashed, ExternalLink, Gauge, Goal, type LucideIcon, ShieldCheck, Trophy } from "lucide-react";
import { useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";

export const kickoffEventTypes = ["kickoff"];

interface KickoffDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
  replayId: string;
}

interface KickoffRow {
  event: MechanicEventResponse;
  index: number;
  startTime: number | null;
  endTime: number | null;
  outcome: string | null;
  possessionOutcome: string | null;
  winningTeam: number | null;
  possessionTeam: number | null;
  scoringTeam: number | null;
  kickoffGoal: boolean;
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

export function KickoffDetail({ events, players, durationSeconds, replayId }: KickoffDetailProps) {
  const kickoffs = events
    .filter((event) => event.event_type === "kickoff")
    .map((event, index) => kickoffRow(event, index, players))
    .sort((left, right) => (left.startTime ?? Number.POSITIVE_INFINITY) - (right.startTime ?? Number.POSITIVE_INFINITY));
  const playerSummaries = kickoffPlayerSummaries(kickoffs, players);
  const summary = kickoffSummary(kickoffs);
  const [selectedKickoffId, setSelectedKickoffId] = useState<string | null>(null);
  const selectedKickoff = kickoffs.find((kickoff) => kickoff.event.id === selectedKickoffId) ?? kickoffs[0] ?? null;

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
            <div className="kickoff-preview">
              <div className="kickoff-preview-copy">
                <div className="chart-panel-header">
                  <div>
                    <h3>Replay preview</h3>
                    <span>
                      {selectedKickoff
                        ? `Selected kickoff ${selectedKickoff.index + 1} at ${formatSeconds(selectedKickoff.startTime)}`
                        : "Select a kickoff below"}
                    </span>
                  </div>
                  <a className="secondary-button" href={`/replays/${encodeURIComponent(replayId)}/player`}>
                    <ExternalLink size={15} />
                    Open player
                  </a>
                </div>
                {selectedKickoff ? <SelectedKickoffSummary kickoff={selectedKickoff} /> : null}
              </div>
              <iframe
                className="kickoff-preview-frame"
                title="Kickoff replay preview"
                src={subtrActorViewerUrl(replayId)}
              />
            </div>
          </section>

          <section className="chart-panel full-span">
            <div className="chart-panel-header">
              <div>
                <h3>Kickoff flow</h3>
                <span>{durationSeconds ? `Spread across ${formatSeconds(durationSeconds)}` : "Ordered by game clock"}</span>
              </div>
            </div>
            <KickoffFlow kickoffs={kickoffs} durationSeconds={durationSeconds} />
          </section>

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
                  selected={kickoff.event.id === selectedKickoff?.event.id}
                  onSelect={() => setSelectedKickoffId(kickoff.event.id)}
                />
              ))}
            </div>
          </section>
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

function KickoffFlow({ kickoffs, durationSeconds }: { kickoffs: KickoffRow[]; durationSeconds: number | null }) {
  const maxTime = Math.max(durationSeconds ?? 0, ...kickoffs.map((kickoff) => kickoff.startTime ?? 0), 1);

  return (
    <div className="kickoff-flow" aria-label="Kickoff timeline">
      <div className="kickoff-flow-track">
        {kickoffs.map((kickoff) => {
          const position = Math.max(0, Math.min(100, (((kickoff.startTime ?? 0) / maxTime) * 100)));
          return (
            <div
              className={`kickoff-flow-marker team-marker-${teamClass(kickoff.winningTeam)}`}
              key={kickoff.event.id}
              style={{ left: `${position}%` }}
              title={`Kickoff ${kickoff.index + 1}: ${formatLabel(kickoff.outcome)}`}
            >
              {kickoff.kickoffGoal ? <Goal size={12} /> : <span>{kickoff.index + 1}</span>}
            </div>
          );
        })}
      </div>
      <div className="kickoff-flow-legend">
        <span><i className="legend-dot team-marker-blue" />Blue win</span>
        <span><i className="legend-dot team-marker-orange" />Orange win</span>
        <span><i className="legend-dot team-marker-neutral" />Neutral</span>
        <span><Goal size={13} />Kickoff goal</span>
      </div>
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

function SelectedKickoffSummary({ kickoff }: { kickoff: KickoffRow }) {
  return (
    <div className="selected-kickoff-summary">
      <KickoffFact icon={Trophy} label="Winner" value={teamLabel(kickoff.winningTeam)} team={kickoff.winningTeam} />
      <KickoffFact icon={ShieldCheck} label="Possession" value={formatLabel(kickoff.possessionOutcome) || teamLabel(kickoff.possessionTeam)} team={kickoff.possessionTeam} />
      <KickoffFact icon={CircleDotDashed} label="First touch" value={kickoff.firstTouch.playerName} team={kickoff.firstTouch.team} />
      <KickoffFact icon={Goal} label="Goal" value={kickoff.kickoffGoal ? `${teamLabel(kickoff.scoringTeam)} ${formatSeconds(kickoff.timeToGoal)}` : "No"} team={kickoff.scoringTeam} />
    </div>
  );
}

function KickoffCard({ kickoff, selected, onSelect }: { kickoff: KickoffRow; selected: boolean; onSelect: () => void }) {
  const blueBehaviors = [kickoff.teamZeroTaker, ...kickoff.teamZeroSupport].filter(Boolean) as KickoffPlayerBehavior[];
  const orangeBehaviors = [kickoff.teamOneTaker, ...kickoff.teamOneSupport].filter(Boolean) as KickoffPlayerBehavior[];

  return (
    <article className={`kickoff-card winner-${teamClass(kickoff.winningTeam)} ${selected ? "selected" : ""}`}>
      <header className="kickoff-card-header">
        <div>
          <span className="kickoff-index">Kickoff {kickoff.index + 1}</span>
          <h4>
            <span>{formatLabel(kickoff.outcome) || "Unknown outcome"}</span>
            {kickoff.kickoffGoal ? <span className={`kickoff-goal-chip team-chip-${teamClass(kickoff.scoringTeam)}`}>Goal in {formatSeconds(kickoff.timeToGoal)}</span> : null}
          </h4>
        </div>
        <div className="kickoff-time-block">
          <strong>{formatSeconds(kickoff.startTime)}</strong>
          <span>{kickoff.takerDelay == null ? "No taker delay" : `${formatSeconds(kickoff.takerDelay)} taker gap`}</span>
        </div>
        <button className="icon-button kickoff-view-button" type="button" onClick={onSelect} title="Show kickoff in preview">
          <CircleDotDashed size={16} />
        </button>
      </header>

      <div className="kickoff-outcome-grid">
        <KickoffFact icon={Trophy} label="Winner" value={teamLabel(kickoff.winningTeam)} team={kickoff.winningTeam} />
        <KickoffFact icon={ShieldCheck} label="Possession" value={formatLabel(kickoff.possessionOutcome) || teamLabel(kickoff.possessionTeam)} team={kickoff.possessionTeam} />
        <KickoffFact icon={CircleDotDashed} label="First touch" value={kickoff.firstTouch.playerName} team={kickoff.firstTouch.team} />
        <KickoffFact icon={Gauge} label="Exit speed" value={formatSpeed(kickoff.exitSpeed)} team={null} />
      </div>

      <div className="kickoff-team-grid">
        <KickoffTeamColumn label="Blue" team={0} behaviors={blueBehaviors} />
        <KickoffTeamColumn label="Orange" team={1} behaviors={orangeBehaviors} />
      </div>
    </article>
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
  return {
    event,
    index,
    startTime: numberField(payload, "start_time") ?? event.start_time,
    endTime: numberField(payload, "end_time") ?? event.end_time,
    outcome: stringField(payload, "outcome"),
    possessionOutcome: stringField(payload, "kickoff_possession_outcome"),
    winningTeam: teamField(payload, "winning_team_is_team_0"),
    possessionTeam: teamField(payload, "kickoff_possession_team_is_team_0"),
    scoringTeam: teamField(payload, "scoring_team_is_team_0"),
    kickoffGoal: booleanField(payload, "kickoff_goal") ?? false,
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

function subtrActorViewerUrl(replayId: string): string {
  const params = new URLSearchParams({
    replayUrl: `/api/v1/replays/${encodeURIComponent(replayId)}/file`,
    mode: "viewer",
  });
  return `/subtr-actor/?${params.toString()}`;
}
