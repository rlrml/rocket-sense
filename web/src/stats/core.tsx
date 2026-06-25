import { type ReactNode, useMemo, useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import {
  StatComparisonGrid,
  StatComparisonPanel,
  subjectIndexByTeam,
  subjectMagnitudeRows,
} from "./comparisonPanels";
import { StatPlayerLabel, statPlayerRank, type StatPlayerRank } from "./shared";

// Scoreboard core stats (score, goals, assists, saves, shots) are usually
// parsed onto each ReplayPlayer directly. Some replay formats lack those header
// stats, so the Core tab also loads subtr-actor's scoreboard delta stream and
// reconstructs the totals as a fallback. Demolitions are not on the scoreboard,
// so they are counted from indexed events. The current subtr-actor emits one
// "demolition" event carrying both sides — the attacker (top-level `player_id`)
// takes a demo inflicted and `payload.victim` takes a death. Older replays
// (indexed before that merge) instead have separate "kill" (demolisher) and
// "death" (victim) events; both shapes are tallied so the page works without
// reprocessing.
export const coreEventTypes: string[] = ["core_player_scoreboard", "demolition", "kill", "death"];

interface CorePlayerSummary {
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  rank: StatPlayerRank | null;
  team: number | null;
  score: number;
  goals: number;
  assists: number;
  saves: number;
  shots: number;
  demos: number;
  deaths: number;
  teamGoals: number;
}

export function CoreDetail({
  events,
  players,
  scope = "replay",
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  scope?: "replay" | "group";
}) {
  const summaries = useMemo(() => corePlayerSummaries(players, events), [players, events]);
  const teamColored = scope !== "group";

  if (!summaries.some(hasCoreData)) {
    return (
      <div className="stat-empty">
        No core stats are available for this {scope === "group" ? "group" : "replay"} yet.
      </div>
    );
  }

  const subjectIndexByKey = subjectIndexByTeam(summaries);

  return (
    <div className="core-detail">
      <section className="chart-panel full-span">
        <CoreStatTable summaries={summaries} />
      </section>

      <StatComparisonGrid>
        <StatComparisonPanel
          title="Score"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "core-bar-score",
            metric: (summary) => summary.score,
            format: formatCount,
            label: corePlayerLabel,
          })}
        />
        <StatComparisonPanel
          title="Goals"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "core-bar-goals",
            metric: (summary) => summary.goals,
            format: formatCount,
            label: corePlayerLabel,
          })}
        />
        <StatComparisonPanel
          title="Assists"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "core-bar-assists",
            metric: (summary) => summary.assists,
            format: formatCount,
            label: corePlayerLabel,
          })}
        />
        <StatComparisonPanel
          title="Assist %"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "core-bar-assist-percentage",
            metric: assistPercentage,
            format: formatPercentage,
            label: corePlayerLabel,
            placeholder: "0%",
          })}
        />
        <StatComparisonPanel
          title="Saves"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "core-bar-saves",
            metric: (summary) => summary.saves,
            format: formatCount,
            label: corePlayerLabel,
          })}
        />
        <StatComparisonPanel
          title="Shots"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "core-bar-shots",
            metric: (summary) => summary.shots,
            format: formatCount,
            label: corePlayerLabel,
          })}
        />
        <StatComparisonPanel
          title="Demos"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "core-bar-demos",
            metric: (summary) => summary.demos,
            format: formatCount,
            label: corePlayerLabel,
          })}
        />
        <StatComparisonPanel
          title="Deaths"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "core-bar-deaths",
            metric: (summary) => summary.deaths,
            format: formatCount,
            label: corePlayerLabel,
          })}
        />
      </StatComparisonGrid>
    </div>
  );
}

function CoreStatTable({ summaries }: { summaries: CorePlayerSummary[] }) {
  const [sort, setSort] = useState<CoreStatSort>({ key: "score", direction: "desc" });
  const rows = useMemo(() => sortCoreStatRows(summaries, sort), [summaries, sort]);

  const toggleSort = (key: CoreStatSortKey) => {
    setSort({
      key,
      direction: sort.key === key && sort.direction === "desc" ? "asc" : "desc",
    });
  };

  return (
    <div className="table-frame compact-table core-stat-table">
      <table>
        <thead>
          <tr>
            {coreStatColumns.map((column) => (
              <th key={column.key}>
                <button
                  className="sort-header"
                  onClick={() => toggleSort(column.key)}
                  type="button"
                >
                  <span>{column.label}</span>
                  {sort.key === column.key ? (
                    <span aria-hidden="true">{sort.direction === "asc" ? "↑" : "↓"}</span>
                  ) : null}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((summary) => (
            <tr className={`core-table-row team-row-${teamClass(summary.team)}`} key={summary.key}>
              {coreStatColumns.map((column) => (
                <td key={column.key}>{column.render(summary)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type CoreStatSortKey =
  | "name"
  | "score"
  | "goals"
  | "assists"
  | "saves"
  | "shots"
  | "demos"
  | "deaths"
  | "assistPercentage"
  | "shooting";

type CoreStatSort = {
  key: CoreStatSortKey;
  direction: "asc" | "desc";
};

const coreStatColumns: Array<{
  key: CoreStatSortKey;
  label: string;
  render: (summary: CorePlayerSummary) => ReactNode;
}> = [
  {
    key: "name",
    label: "Player",
    render: (summary) => corePlayerLabel(summary),
  },
  { key: "score", label: "Score", render: (summary) => formatCount(summary.score) },
  { key: "goals", label: "Goals", render: (summary) => formatCount(summary.goals) },
  { key: "assists", label: "Assists", render: (summary) => formatCount(summary.assists) },
  {
    key: "assistPercentage",
    label: "Assist %",
    render: (summary) => formatAssistPercentage(summary),
  },
  { key: "saves", label: "Saves", render: (summary) => formatCount(summary.saves) },
  { key: "shots", label: "Shots", render: (summary) => formatCount(summary.shots) },
  { key: "demos", label: "Demos", render: (summary) => formatCount(summary.demos) },
  { key: "deaths", label: "Deaths", render: (summary) => formatCount(summary.deaths) },
  {
    key: "shooting",
    label: "Shooting %",
    render: (summary) => formatShootingPercentage(summary),
  },
];

function corePlayerLabel(summary: CorePlayerSummary) {
  return (
    <StatPlayerLabel
      className={`core-table-player team-accent-${teamClass(summary.team)}`}
      name={summary.name}
      platform={summary.platform}
      platformPlayerId={summary.platformPlayerId}
      profilePath={playerProfilePath(summary)}
      rank={summary.rank}
      subtitle={teamLabel(summary.team)}
    />
  );
}

function compareCoreStatRows(
  left: CorePlayerSummary,
  right: CorePlayerSummary,
  key: CoreStatSortKey,
): number {
  if (key === "name") return left.name.localeCompare(right.name);
  return coreStatSortValue(left, key) - coreStatSortValue(right, key);
}

function sortCoreStatRows(rows: CorePlayerSummary[], sort: CoreStatSort): CorePlayerSummary[] {
  return rows.slice().sort((left, right) => {
    const comparison = compareCoreStatRows(left, right, sort.key);
    return sort.direction === "asc" ? comparison : -comparison;
  });
}

function coreStatSortValue(summary: CorePlayerSummary, key: CoreStatSortKey): number {
  switch (key) {
    case "name":
      return 0;
    case "assistPercentage":
      return assistPercentage(summary) ?? Number.NEGATIVE_INFINITY;
    case "shooting":
      return shootingPercentage(summary) ?? Number.NEGATIVE_INFINITY;
    default:
      return summary[key];
  }
}

function corePlayerSummaries(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): CorePlayerSummary[] {
  const { inflicted, taken } = demoCountsByPlayerKey(players, events);
  const scoreboardTotals = scoreboardTotalsByPlayerKey(players, events);
  const summaries = players.map((player, index) => {
    const key = playerKey(player, index);
    const fallback = scoreboardTotals.get(key);
    return {
      key,
      name: player.name || player.platform_player_id || "Unknown",
      platform: player.platform,
      platformPlayerId: player.platform_player_id,
      rank: statPlayerRank(player),
      team: player.team,
      score: numberOr(player.score, fallback?.score),
      goals: numberOr(player.goals, fallback?.goals),
      assists: numberOr(player.assists, fallback?.assists),
      saves: numberOr(player.saves, fallback?.saves),
      shots: numberOr(player.shots, fallback?.shots),
      demos: inflicted.get(key) ?? 0,
      deaths: taken.get(key) ?? 0,
      teamGoals: 0,
    };
  });
  const totalGoals = summaries.reduce((total, summary) => total + summary.goals, 0);
  const goalsByTeam = new Map<number, number>();
  for (const summary of summaries) {
    if (summary.team == null) continue;
    goalsByTeam.set(summary.team, (goalsByTeam.get(summary.team) ?? 0) + summary.goals);
  }
  return summaries.map((summary) => ({
    ...summary,
    teamGoals: summary.team == null ? totalGoals : (goalsByTeam.get(summary.team) ?? 0),
  }));
}

type ScoreboardTotals = Pick<CorePlayerSummary, "score" | "goals" | "assists" | "saves" | "shots">;

function scoreboardTotalsByPlayerKey(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): Map<string, ScoreboardTotals> {
  const totals = new Map<string, ScoreboardTotals>();
  const increment = (
    event: MechanicEventResponse,
    field: keyof ScoreboardTotals,
    value: unknown,
  ) => {
    if (typeof value !== "number" || !Number.isFinite(value)) return;
    const index = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (index < 0) return;
    const key = playerKey(players[index], index);
    const current = totals.get(key) ?? {
      score: 0,
      goals: 0,
      assists: 0,
      saves: 0,
      shots: 0,
    };
    current[field] += value;
    totals.set(key, current);
  };

  for (const event of events) {
    if (event.event_type !== "core_player_scoreboard") continue;
    const payload = event.payload;
    increment(event, "score", payload.score_delta);
    increment(event, "goals", payload.goals_delta);
    increment(event, "assists", payload.assists_delta);
    increment(event, "saves", payload.saves_delta);
    increment(event, "shots", payload.shots_delta);
  }

  return totals;
}

// Demolitions come in two indexed shapes. The current "demolition" event carries
// both sides in its payload: `payload.attacker` is credited a demo inflicted and
// `payload.victim` a death (demo taken). We read both from the payload rather
// than the top-level `player_id` because which side `player_id` represents has
// not been stable across server versions. Legacy replays instead have one-sided
// "kill" (demolisher) and "death" (victim) events keyed by their top-level
// `player_id`. Tally both into the same keys as the scoreboard summaries.
function demoCountsByPlayerKey(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): { inflicted: Map<string, number>; taken: Map<string, number> } {
  const inflicted = new Map<string, number>();
  const taken = new Map<string, number>();
  const increment = (counts: Map<string, number>, key: string) =>
    counts.set(key, (counts.get(key) ?? 0) + 1);
  const creditPrimaryPlayer = (counts: Map<string, number>, event: MechanicEventResponse) => {
    const index = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (index >= 0) increment(counts, playerKey(players[index], index));
  };
  const creditPayloadPlayer = (counts: Map<string, number>, participant: unknown) => {
    const identity = remoteIdKey(participant);
    const index = identity
      ? players.findIndex((player) => playerIdentity(player) === identity)
      : -1;
    if (index >= 0) increment(counts, playerKey(players[index], index));
  };

  for (const event of events) {
    switch (event.event_type) {
      case "demolition": {
        const payload = event.payload as Record<string, unknown>;
        creditPayloadPlayer(inflicted, payload?.attacker);
        creditPayloadPlayer(taken, payload?.victim);
        break;
      }
      case "kill":
        creditPrimaryPlayer(inflicted, event);
        break;
      case "death":
        creditPrimaryPlayer(taken, event);
        break;
    }
  }
  return { inflicted, taken };
}

// A payload participant (e.g. demolition `victim`) is encoded as a single-key
// platform map — `{"Epic": "…"}`, `{"Xbox": 123}`, or a nested PlayStation
// object — matching subtr-actor's serialized boxcars RemoteId. Normalize to the
// same `platform:id` form as `playerIdentity` so it matches a roster player.
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

function eventMatchesPlayer(player: ReplayPlayer, event: MechanicEventResponse): boolean {
  const identity = playerIdentity(player);
  const eventKey = event.player_id ? normalizePlayerKey(event.player_id) : null;
  if (identity && eventKey && identity === eventKey) return true;
  const eventName = event.player_name?.trim().toLowerCase();
  return Boolean(eventName && player.name?.trim().toLowerCase() === eventName);
}

function playerIdentity(player: ReplayPlayer): string | null {
  if (!player.platform || !player.platform_player_id) return null;
  return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
}

function normalizePlayerKey(value: string): string {
  const [platform, ...rest] = value.split(":");
  return rest.length > 0 ? `${normalizePlatform(platform)}:${rest.join(":")}` : value;
}

function hasCoreData(summary: CorePlayerSummary): boolean {
  return (
    summary.score > 0 ||
    summary.goals > 0 ||
    summary.assists > 0 ||
    summary.saves > 0 ||
    summary.shots > 0 ||
    summary.demos > 0 ||
    summary.deaths > 0
  );
}

function shootingPercentage(summary: CorePlayerSummary): number | null {
  return summary.shots > 0 ? (summary.goals / summary.shots) * 100 : null;
}

function assistPercentage(summary: CorePlayerSummary): number | null {
  // Assist percentage is over goals the player could have assisted, which
  // excludes the goals they scored themselves (you can't assist your own goal).
  const assistableGoals = summary.teamGoals - summary.goals;
  return assistableGoals > 0 ? (summary.assists / assistableGoals) * 100 : null;
}

function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

function formatAssistPercentage(summary: CorePlayerSummary): string {
  const value = assistPercentage(summary);
  if (value == null) return "—";
  return formatPercentage(value);
}

function formatShootingPercentage(summary: CorePlayerSummary): string {
  const value = shootingPercentage(summary);
  if (value == null) return "—";
  return formatPercentage(value);
}

function formatCount(value: number): string {
  return value.toLocaleString();
}

function numberOr(value: number | null | undefined, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  return typeof fallback === "number" && Number.isFinite(fallback) ? fallback : 0;
}

function playerKey(player: ReplayPlayer, index: number): string {
  if (player.platform && player.platform_player_id)
    return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
  return `name:${player.name || index}`;
}

function playerProfilePath(summary: CorePlayerSummary): string | null {
  if (!summary.platform || !summary.platformPlayerId) return null;
  return `/players/${encodeURIComponent(summary.platform)}/id/${encodeURIComponent(summary.platformPlayerId)}/stats/core`;
}

function normalizePlatform(value: string): string {
  const lower = value.toLowerCase();
  if (lower === "psynet") return "epic";
  if (lower === "playstation") return "ps4";
  return lower;
}

function teamClass(team: number | null): string {
  if (team === 0) return "blue";
  if (team === 1) return "orange";
  return "unknown";
}

function teamLabel(team: number | null): string {
  if (team === 0) return "Blue";
  if (team === 1) return "Orange";
  return "Unknown";
}
