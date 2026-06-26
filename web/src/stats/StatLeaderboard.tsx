import { type ReactNode, useMemo, useState } from "react";
import type { ReplayPlayer, StatAggregateGroupPlayer, StatAggregateGroupResponse } from "../types";
import {
  careerCohortClassName,
  type ComparisonRow,
  ComparisonRows,
  StatPlayerLabel,
  statPlayerRank,
} from "./shared";

/**
 * Stat-major leaderboard for a replay group: pick one stat, rank every
 * participant. This is the transpose of the career view (which fixes one player
 * and shows all their stats) — here the comparison axis is player-vs-player,
 * which is what matters once the set spans many players.
 *
 * Driven by the `groups[]` of a `group-by=player` aggregate set: each entry is
 * one participant's own stats restricted to the group's replays.
 */

type LeaderboardMeasure = "per5m" | "perGame" | "total";

const MEASURES: ReadonlyArray<{ key: LeaderboardMeasure; label: string; suffix: string }> = [
  { key: "per5m", label: "Per 5 min", suffix: "/5m" },
  { key: "perGame", label: "Per game", suffix: "/game" },
  { key: "total", label: "Total", suffix: "" },
];

function leaderboardIdentityKey(platform: string, platformPlayerId: string): string {
  return `${platform.toLowerCase()}:${platformPlayerId}`;
}

/** Build the identity → participant lookup the leaderboard uses for rank chips. */
export function leaderboardRankIndex(players: ReplayPlayer[]): Map<string, ReplayPlayer> {
  const index = new Map<string, ReplayPlayer>();
  for (const player of players) {
    if (!player.platform || !player.platform_player_id) continue;
    index.set(leaderboardIdentityKey(player.platform, player.platform_player_id), player);
  }
  return index;
}

function formatMagnitude(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0";
  if (value >= 100) return value.toFixed(0);
  if (value >= 10) return value.toFixed(1);
  return value.toFixed(2);
}

function formatMeasureValue(value: number, measure: LeaderboardMeasure): string {
  if (measure === "total") return Math.round(value).toLocaleString();
  return formatMagnitude(value);
}

export function StatLeaderboard({
  title = "Leaderboard",
  groups,
  rankIndex,
  buildPlayerHref,
  defaultStatKeys,
  emptyLabel = "No per-player stats are available for this group yet.",
}: {
  title?: ReactNode;
  groups: StatAggregateGroupResponse[];
  /** identity → participant, for rank badges (see `leaderboardRankIndex`). */
  rankIndex?: Map<string, ReplayPlayer>;
  /** Drill-down link for a ranked player (e.g. the group-scoped career view). */
  buildPlayerHref?: (player: StatAggregateGroupPlayer) => string | null;
  /** Section's preferred stat keys, in priority order (first present is default). */
  defaultStatKeys?: readonly string[];
  emptyLabel?: ReactNode;
}) {
  const playerGroups = useMemo(() => groups.filter((group) => group.player != null), [groups]);

  // The selectable stats are the union of stat keys across all participants,
  // ordered by the section's priority list then by overall volume so the busiest
  // stat is the default selection.
  const statOptions = useMemo(() => {
    const byKey = new Map<string, { key: string; display_name: string; totalCount: number }>();
    for (const group of playerGroups) {
      for (const stat of group.stats) {
        // Drop umbrella/context rows (e.g. the raw scoreboard or goal-context
        // events) — they aren't rankable measures and would otherwise win the
        // default by sheer volume. Mirrors the career view's stat filtering.
        if (stat.category === "context") continue;
        const existing = byKey.get(stat.key);
        if (existing) {
          existing.totalCount += stat.event_count;
        } else {
          byKey.set(stat.key, {
            key: stat.key,
            display_name: stat.display_name,
            totalCount: stat.event_count,
          });
        }
      }
    }
    const priority = new Map((defaultStatKeys ?? []).map((key, index) => [key, index]));
    return [...byKey.values()].sort((left, right) => {
      const leftPriority = priority.get(left.key) ?? Number.POSITIVE_INFINITY;
      const rightPriority = priority.get(right.key) ?? Number.POSITIVE_INFINITY;
      if (leftPriority !== rightPriority) return leftPriority - rightPriority;
      return right.totalCount - left.totalCount;
    });
  }, [playerGroups, defaultStatKeys]);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [measure, setMeasure] = useState<LeaderboardMeasure>("per5m");
  const activeKey =
    selectedKey && statOptions.some((option) => option.key === selectedKey)
      ? selectedKey
      : (statOptions[0]?.key ?? null);
  const measureSuffix = MEASURES.find((entry) => entry.key === measure)?.suffix ?? "";

  const rows = useMemo<ComparisonRow[]>(() => {
    if (!activeKey) return [];
    const valueOf = (stat: {
      event_count: number;
      count_per_game: number;
      per_active_minute: number | null;
    }) => {
      if (measure === "total") return stat.event_count;
      if (measure === "perGame") return stat.count_per_game;
      return (stat.per_active_minute ?? 0) * 5;
    };

    const entries = playerGroups
      .map((group) => {
        const player = group.player!;
        const stat = group.stats.find((candidate) => candidate.key === activeKey);
        if (!stat) return null;
        return { group, player, stat, value: Math.max(0, valueOf(stat)) };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry != null)
      .sort((left, right) => right.value - left.value);

    const maxValue = Math.max(1, ...entries.map((entry) => entry.value));

    return entries.map(({ group, player, stat, value }) => {
      const identityKey = leaderboardIdentityKey(player.platform, player.platform_player_id);
      const participant = rankIndex?.get(identityKey);
      const name = participant?.name || player.display_name || identityKey;
      const href = buildPlayerHref?.(player) ?? null;
      const rank = participant ? statPlayerRank(participant) : null;
      const valueLabel = `${formatMeasureValue(value, measure)}${measureSuffix}`;
      const subtitle = `${stat.event_count.toLocaleString()} total · ${group.replay_count.toLocaleString()} games`;
      return {
        key: identityKey,
        label: (
          <StatPlayerLabel
            className={careerCohortClassName("player")}
            name={name}
            platform={player.platform}
            platformPlayerId={player.platform_player_id}
            profilePath={href}
            rank={rank}
            subtitle={subtitle}
          />
        ),
        ariaLabel: `${name}: ${valueLabel}`,
        segments: [
          {
            key: "value",
            className: careerCohortClassName("player"),
            label: stat.display_name,
            value,
            title: `${name}: ${valueLabel}`,
          },
        ],
        total: value,
        maxValue,
        valueLabel: <span>{valueLabel}</span>,
      };
    });
  }, [activeKey, measure, measureSuffix, playerGroups, rankIndex, buildPlayerHref]);

  return (
    <section className="stat-panel full-span group-leaderboard-panel">
      <div className="stat-panel-heading">
        <h3>{title}</h3>
        <span>{playerGroups.length.toLocaleString()} players</span>
      </div>
      {statOptions.length > 0 ? (
        <div className="leaderboard-controls">
          <label className="leaderboard-stat-select">
            <span>Stat</span>
            <select
              value={activeKey ?? ""}
              onChange={(event) => setSelectedKey(event.target.value)}
            >
              {statOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.display_name}
                </option>
              ))}
            </select>
          </label>
          <div className="leaderboard-measure-toggle" role="group" aria-label="Leaderboard measure">
            {MEASURES.map((entry) => (
              <button
                key={entry.key}
                type="button"
                className={`leaderboard-measure-button${entry.key === measure ? " active" : ""}`}
                onClick={() => setMeasure(entry.key)}
              >
                {entry.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <ComparisonRows rows={rows} emptyLabel={emptyLabel} />
    </section>
  );
}
