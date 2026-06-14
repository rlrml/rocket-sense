import { type ReactNode, useMemo, useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import {
  type ComparisonRow,
  PlayerComparisonChart,
  StatPlayerLabel,
  statPlayerRank,
  type StatPlayerRank,
} from "./shared";

// Scoreboard core stats (score, goals, assists, saves, shots) are parsed onto
// each ReplayPlayer directly — for a group they are summed across the group's
// replays — so this page reads them off `players`. Demolitions are not on the
// scoreboard, so they are counted from indexed "kill" events (each attributed
// to the demolisher).
export const coreEventTypes: string[] = ["kill"];

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
  const playerIndexByKey = useMemo(() => teamLocalPlayerIndexByKey(players), [players]);

  if (!summaries.some(hasCoreData)) {
    return (
      <div className="stat-empty">
        No core stats are available for this {scope === "group" ? "group" : "replay"} yet.
      </div>
    );
  }

  const scoreScale = Math.max(1, ...summaries.map((summary) => summary.score));
  const goalScale = Math.max(1, ...summaries.map((summary) => summary.goals));
  const assistScale = Math.max(1, ...summaries.map((summary) => summary.assists));
  const saveScale = Math.max(1, ...summaries.map((summary) => summary.saves));
  const shotScale = Math.max(1, ...summaries.map((summary) => summary.shots));
  const demoScale = Math.max(1, ...summaries.map((summary) => summary.demos));

  return (
    <div className="core-detail">
      <section className="chart-panel full-span">
        <CoreStatTable summaries={summaries} />
      </section>

      <section className="chart-panel full-span">
        <div className="core-comparison-grid">
          <PlayerComparisonChart
            className="core-chart"
            title="Score"
            rows={magnitudeRows(summaries, {
              teamColored,
              playerIndexByKey,
              groupClassName: "core-bar-score",
              metric: (summary) => summary.score,
              maxValue: scoreScale,
              format: formatCount,
            })}
          />
          <PlayerComparisonChart
            className="core-chart"
            title="Goals"
            rows={magnitudeRows(summaries, {
              teamColored,
              playerIndexByKey,
              groupClassName: "core-bar-goals",
              metric: (summary) => summary.goals,
              maxValue: goalScale,
              format: formatCount,
            })}
          />
          <PlayerComparisonChart
            className="core-chart"
            title="Assists"
            rows={magnitudeRows(summaries, {
              teamColored,
              playerIndexByKey,
              groupClassName: "core-bar-assists",
              metric: (summary) => summary.assists,
              maxValue: assistScale,
              format: formatCount,
            })}
          />
          <PlayerComparisonChart
            className="core-chart"
            title="Saves"
            rows={magnitudeRows(summaries, {
              teamColored,
              playerIndexByKey,
              groupClassName: "core-bar-saves",
              metric: (summary) => summary.saves,
              maxValue: saveScale,
              format: formatCount,
            })}
          />
          <PlayerComparisonChart
            className="core-chart"
            title="Shots"
            rows={magnitudeRows(summaries, {
              teamColored,
              playerIndexByKey,
              groupClassName: "core-bar-shots",
              metric: (summary) => summary.shots,
              maxValue: shotScale,
              format: formatCount,
            })}
          />
          <PlayerComparisonChart
            className="core-chart"
            title="Demos"
            rows={magnitudeRows(summaries, {
              teamColored,
              playerIndexByKey,
              groupClassName: "core-bar-demos",
              metric: (summary) => summary.demos,
              maxValue: demoScale,
              format: formatCount,
            })}
          />
        </div>
      </section>
    </div>
  );
}

function magnitudeRows(
  summaries: CorePlayerSummary[],
  options: {
    teamColored: boolean;
    playerIndexByKey: Map<string, number>;
    groupClassName: string;
    metric: (summary: CorePlayerSummary) => number;
    maxValue: number;
    format: (value: number) => string;
  },
): ComparisonRow[] {
  // Every player appears in every chart (sorted high -> low); a zero value reads
  // as an empty track with a "0" placeholder rather than a dropped row.
  return [...summaries]
    .sort(
      (left, right) =>
        options.metric(right) - options.metric(left) || left.name.localeCompare(right.name),
    )
    .map((summary) => {
      const value = options.metric(summary);
      return {
        key: summary.key,
        label: corePlayerLabel(summary),
        ariaLabel: `${summary.name}: ${options.format(value)}`,
        segments: [
          {
            key: "value",
            className: magnitudeSegmentClass(
              summary,
              options.teamColored,
              options.playerIndexByKey,
              options.groupClassName,
            ),
            label: summary.name,
            value,
          },
        ],
        total: value,
        maxValue: options.maxValue,
        valueInBar: value > 0 ? options.format(value) : undefined,
        placeholder: value > 0 ? undefined : "0",
      };
    });
}

// Single game: tint by the player's team with a per-player shade. Group: there
// is no replay-local team, so fall back to the fixed per-metric hue.
function magnitudeSegmentClass(
  summary: CorePlayerSummary,
  teamColored: boolean,
  playerIndexByKey: Map<string, number>,
  groupClassName: string,
): string {
  if (!teamColored) return groupClassName;
  return `team-segment-${teamClass(summary.team)} player-shade-${Math.min(playerIndexByKey.get(summary.key) ?? 0, 3)}`;
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
  { key: "saves", label: "Saves", render: (summary) => formatCount(summary.saves) },
  { key: "shots", label: "Shots", render: (summary) => formatCount(summary.shots) },
  { key: "demos", label: "Demos", render: (summary) => formatCount(summary.demos) },
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
  const demosByKey = demosByPlayerKey(players, events);
  return players.map((player, index) => {
    const key = playerKey(player, index);
    return {
      key,
      name: player.name || player.platform_player_id || "Unknown",
      platform: player.platform,
      platformPlayerId: player.platform_player_id,
      rank: statPlayerRank(player),
      team: player.team,
      score: numberOr(player.score),
      goals: numberOr(player.goals),
      assists: numberOr(player.assists),
      saves: numberOr(player.saves),
      shots: numberOr(player.shots),
      demos: demosByKey.get(key) ?? 0,
    };
  });
}

// A demolition is a "kill" event attributed to the demolisher; tally them per
// player so they read off the same key as the scoreboard summaries.
function demosByPlayerKey(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const event of events) {
    if (event.event_type !== "kill") continue;
    const index = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (index < 0) continue;
    const key = playerKey(players[index], index);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
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
    summary.demos > 0
  );
}

function shootingPercentage(summary: CorePlayerSummary): number | null {
  return summary.shots > 0 ? (summary.goals / summary.shots) * 100 : null;
}

function formatShootingPercentage(summary: CorePlayerSummary): string {
  const value = shootingPercentage(summary);
  if (value == null) return "—";
  return `${Math.round(value)}%`;
}

function formatCount(value: number): string {
  return value.toLocaleString();
}

function numberOr(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function teamLocalPlayerIndexByKey(players: ReplayPlayer[]): Map<string, number> {
  const indexes = new Map<string, number>();
  const counts = new Map<number | null, number>();
  players.forEach((player, index) => {
    const next = counts.get(player.team) ?? 0;
    indexes.set(playerKey(player, index), next);
    counts.set(player.team, next + 1);
  });
  return indexes;
}

function playerKey(player: ReplayPlayer, index: number): string {
  if (player.platform && player.platform_player_id)
    return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
  return `name:${player.name || index}`;
}

function playerProfilePath(summary: CorePlayerSummary): string | null {
  if (!summary.platform || !summary.platformPlayerId) return null;
  return `/players/${encodeURIComponent(summary.platform)}/${encodeURIComponent(summary.platformPlayerId)}/stats/core`;
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
