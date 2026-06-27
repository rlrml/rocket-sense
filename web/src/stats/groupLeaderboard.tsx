import { type ReactNode, useMemo, useState } from "react";
import {
  type CareerCohortKey,
  careerCohortClassName,
  type ComparisonRow,
  ComparisonRows,
  StatPlayerLabel,
  type StatPlayerRank,
} from "./shared";

/**
 * Generic stat-major leaderboard for a replay group: pick one metric, rank every
 * participant. This is the transpose of the career view (which fixes one player
 * and shows all their stats) — here the comparison axis is player-vs-player.
 *
 * It is metric-source-agnostic: callers build a flat list of `LeaderboardMetric`
 * (each knows how to produce a value per participant) and the component renders
 * the picker + the sorted bars. Count metrics opt into the total/per-game/per-5m
 * measure toggle; derived ratio/share/rate metrics are single-valued and hide the
 * toggle while selected. The aggregate-stat leaderboard, the kickoff leaderboard,
 * and the boost leaderboard are all instances of this.
 */

export type LeaderboardMeasure = "per5m" | "perGame" | "total";

export const LEADERBOARD_MEASURES: ReadonlyArray<{
  key: LeaderboardMeasure;
  label: string;
  suffix: string;
}> = [
  { key: "per5m", label: "Per 5 min", suffix: "/5m" },
  { key: "perGame", label: "Per game", suffix: "/game" },
  { key: "total", label: "Total", suffix: "" },
];

export interface LeaderboardParticipant {
  /** Stable identity key used by metrics to look up this participant's value. */
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  /** Drill-down link target (e.g. the group-scoped career view). */
  profilePath?: string | null;
  rank?: StatPlayerRank | null;
  /** Cohort palette key for the bar segment (defaults to "player"). */
  cohort?: CareerCohortKey;
}

export interface LeaderboardMetric {
  key: string;
  label: string;
  /** optgroup heading in the picker; metrics without one sort to the top group. */
  group?: string;
  /**
   * When true the total/per-game/per-5m toggle applies and `value` is invoked
   * with the active measure. Derived ratio/share/rate metrics leave this unset:
   * the toggle is hidden while they are selected and `value` is called with
   * "total".
   */
  measurable?: boolean;
  /** Rank ascending (e.g. time-to-ball) instead of the default descending. */
  lowerIsBetter?: boolean;
  /**
   * Which async data source backs this metric (e.g. "kickoff", "boost"). The
   * group stat explorer uses it to show a per-column loading state while that
   * source's fetch is still in flight, instead of a misleading "—" / "0".
   */
  source?: string;
  /** Per-participant value in display units; null drops the participant. */
  value: (participantKey: string, measure: LeaderboardMeasure) => number | null;
  /** Render a value as its label (measure passed for count metrics that vary by it). */
  format: (value: number, measure?: LeaderboardMeasure) => string;
  /** Optional per-row subtitle override (defaults to a generic games count). */
  subtitle?: (participantKey: string) => string;
}

function metricGroups(
  metrics: LeaderboardMetric[],
): Array<{ group: string | null; metrics: LeaderboardMetric[] }> {
  const order: string[] = [];
  const byGroup = new Map<string, LeaderboardMetric[]>();
  for (const metric of metrics) {
    const key = metric.group ?? "";
    if (!byGroup.has(key)) {
      byGroup.set(key, []);
      order.push(key);
    }
    byGroup.get(key)!.push(metric);
  }
  return order.map((key) => ({ group: key === "" ? null : key, metrics: byGroup.get(key)! }));
}

export function GroupMetricLeaderboard({
  title = "Leaderboard",
  participants,
  metrics,
  defaultMetricKey,
  countLabel,
  emptyLabel = "No per-player stats are available for this group yet.",
}: {
  title?: ReactNode;
  participants: LeaderboardParticipant[];
  metrics: LeaderboardMetric[];
  /** Metric key selected first; falls back to the first metric. */
  defaultMetricKey?: string | null;
  /** Right-aligned count chip (e.g. "12 players"). */
  countLabel?: ReactNode;
  emptyLabel?: ReactNode;
}) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [measure, setMeasure] = useState<LeaderboardMeasure>("per5m");

  const activeKey =
    (selectedKey && metrics.some((metric) => metric.key === selectedKey) && selectedKey) ||
    (defaultMetricKey && metrics.some((metric) => metric.key === defaultMetricKey)
      ? defaultMetricKey
      : (metrics[0]?.key ?? null));
  const activeMetric = metrics.find((metric) => metric.key === activeKey) ?? null;
  const showMeasureToggle = activeMetric?.measurable ?? false;
  const effectiveMeasure: LeaderboardMeasure = showMeasureToggle ? measure : "total";
  const measureSuffix = showMeasureToggle
    ? (LEADERBOARD_MEASURES.find((entry) => entry.key === measure)?.suffix ?? "")
    : "";

  const groups = useMemo(() => metricGroups(metrics), [metrics]);

  const rows = useMemo<ComparisonRow[]>(() => {
    if (!activeMetric) return [];
    const entries = participants
      .map((participant) => {
        const value = activeMetric.value(participant.key, effectiveMeasure);
        if (value == null || !Number.isFinite(value)) return null;
        return { participant, value };
      })
      .filter(
        (entry): entry is { participant: LeaderboardParticipant; value: number } => entry != null,
      )
      .sort((left, right) =>
        activeMetric.lowerIsBetter ? left.value - right.value : right.value - left.value,
      );

    const maxValue = Math.max(1, ...entries.map((entry) => Math.abs(entry.value)));
    return entries.map(({ participant, value }) => {
      const cohort = careerCohortClassName(participant.cohort ?? "player");
      const valueLabel = `${activeMetric.format(value)}${measureSuffix}`;
      const subtitle = activeMetric.subtitle?.(participant.key) ?? "";
      return {
        key: participant.key,
        label: (
          <StatPlayerLabel
            className={cohort}
            name={participant.name}
            platform={participant.platform}
            platformPlayerId={participant.platformPlayerId}
            profilePath={participant.profilePath}
            rank={participant.rank}
            subtitle={subtitle}
          />
        ),
        ariaLabel: `${participant.name}: ${valueLabel}`,
        segments: [
          {
            key: "value",
            className: cohort,
            label: activeMetric.label,
            value: Math.abs(value),
            title: `${participant.name}: ${valueLabel}`,
          },
        ],
        total: Math.abs(value),
        maxValue,
        valueLabel: <span>{valueLabel}</span>,
      };
    });
  }, [activeMetric, participants, effectiveMeasure, measureSuffix]);

  return (
    <section className="stat-panel full-span group-leaderboard-panel">
      <div className="stat-panel-heading">
        <h3>{title}</h3>
        {countLabel != null ? <span>{countLabel}</span> : null}
      </div>
      {metrics.length > 0 ? (
        <div className="leaderboard-controls">
          <label className="leaderboard-stat-select">
            <span>Stat</span>
            <select
              value={activeKey ?? ""}
              onChange={(event) => setSelectedKey(event.target.value)}
            >
              {groups.map((entry) =>
                entry.group ? (
                  <optgroup key={entry.group} label={entry.group}>
                    {entry.metrics.map((metric) => (
                      <option key={metric.key} value={metric.key}>
                        {metric.label}
                      </option>
                    ))}
                  </optgroup>
                ) : (
                  entry.metrics.map((metric) => (
                    <option key={metric.key} value={metric.key}>
                      {metric.label}
                    </option>
                  ))
                ),
              )}
            </select>
          </label>
          {showMeasureToggle ? (
            <div
              className="leaderboard-measure-toggle"
              role="group"
              aria-label="Leaderboard measure"
            >
              {LEADERBOARD_MEASURES.map((entry) => (
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
          ) : null}
        </div>
      ) : null}
      <ComparisonRows rows={rows} emptyLabel={emptyLabel} />
    </section>
  );
}
