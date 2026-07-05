import type { ReactNode } from "react";
import type { PossessionCohortSummary, PossessionTimeBucket, RankBenchmarkCohort } from "../types";
import {
  careerRateValue,
  careerRateWindowLabel,
  PlayerComparisonChart,
  rankAverageShadeClass,
  rankCohortLabel,
  StatPlayerLabel,
  type ComparisonRow,
} from "./shared";

// Computes a possession chart's rank-average value from a cohort's benchmark
// metrics, in the chart's own units. Returns null when the inputs are missing.
// Per-possession charts derive from two per-minute metrics (the /minute cancels
// to /possession); rate/share charts read a single metric. Only charts whose
// units the benchmark can express carry one.
type PossessionRankMetric = (perStat: RankBenchmarkCohort["per_stat"]) => number | null;

// Which benchmark map a chart's rank rows read: the per-player `per_stat` or
// the whole-roster `team_per_stat` (see shared.tsx "Team-level rank
// benchmarks" for the units).
export type PossessionBenchmarkGrain = "player" | "team";

// Read a single benchmark metric value, or null when absent/non-finite.
function benchmarkValue(perStat: RankBenchmarkCohort["per_stat"], key: string): number | null {
  const value = perStat[key]?.value;
  return value != null && Number.isFinite(value) ? value : null;
}

// Per-possession ratio of two per-minute metrics (the /minute cancels out).
function benchmarkPerPossession(
  perStat: RankBenchmarkCohort["per_stat"],
  numeratorKey: string,
): number | null {
  const numerator = benchmarkValue(perStat, numeratorKey);
  const possessions = benchmarkValue(perStat, "possession:count");
  if (numerator == null || possessions == null || possessions <= 0) return null;
  return numerator / possessions;
}

export interface PossessionAdvancedSubject {
  key: string;
  name: string;
  label: ReactNode;
  activeTimeSeconds: number | null;
  cohort: PossessionCohortSummary;
  segmentClassName: string;
}

interface PossessionAdvancedChart {
  key: string;
  title: string;
  rows: ComparisonRow[];
}

export function PossessionAdvancedComparisonGrid({
  className = "",
  subjects,
}: {
  className?: string;
  subjects: PossessionAdvancedSubject[];
}) {
  const comparisonCharts = possessionAdvancedMetricCharts(subjects);
  if (comparisonCharts.length === 0) return null;

  return (
    <div className={`stat-comparison-grid ${className}`.trim()} aria-label="Possession comparisons">
      <PossessionAdvancedCharts charts={comparisonCharts} />
    </div>
  );
}

export function PossessionAdvancedCharts({
  subjects,
  rankCohorts = [],
  rankWindowLabel,
  grain = "player",
  charts = possessionAdvancedMetricCharts(subjects ?? [], rankCohorts, rankWindowLabel, grain),
}: {
  subjects?: PossessionAdvancedSubject[];
  rankCohorts?: RankBenchmarkCohort[];
  rankWindowLabel?: string | null;
  // "team" reads rank benchmarks from `team_per_stat` (whole-roster rates per
  // team-active-minute / time-weighted team means) for subjects that pool a
  // whole team; only the charts whose team-grain semantics are clean carry a
  // teamRankMetric, the rest simply show no rank row in the team view.
  grain?: PossessionBenchmarkGrain;
  charts?: PossessionAdvancedChart[];
}) {
  return (
    <>
      {charts.map((chart) => (
        <PlayerComparisonChart key={chart.key} rows={chart.rows} title={chart.title} />
      ))}
    </>
  );
}

function possessionAdvancedMetricCharts(
  subjects: PossessionAdvancedSubject[],
  rankCohorts: RankBenchmarkCohort[] = [],
  rankWindowLabel?: string | null,
  grain: PossessionBenchmarkGrain = "player",
): PossessionAdvancedChart[] {
  const definitions: Array<{
    key: string;
    title: string;
    metric: (subject: PossessionAdvancedSubject) => number | null;
    format: (value: number) => string;
    maxValue?: number;
    // Only set where the benchmark stores a unit-compatible metric; the other
    // charts are per-possession averages the per-minute benchmark can't match.
    rankMetric?: PossessionRankMetric;
    // Team-view counterpart, fed `team_per_stat`. Only set where the TEAM
    // benchmark's semantics match the pooled team subjects: additive counts
    // are already per team-active-minute, per-possession ratios cancel their
    // /minute, and `carry_time_share` is the time-weighted team mean exactly
    // like the pooled subjects compute it. Charts built on the gauge
    // `possession:duration_share` (a player-mean share) get NO team metric:
    // the team chart shows whole-roster possession seconds per 5 wall-clock
    // minutes, which that player-mean can't express without the roster size.
    teamRankMetric?: PossessionRankMetric;
  }> = [
    {
      key: "possessions-per-5-active-min",
      title: `Possessions ${careerRateWindowLabel()}`,
      metric: (subject) =>
        careerRateValue(subject.cohort.possessions.possession_count, subject.activeTimeSeconds),
      format: formatRate,
      // benchmark possession:count is per active minute -> per 5 min.
      rankMetric: (ps) => {
        const v = benchmarkValue(ps, "possession:count");
        return v == null ? null : v * 5;
      },
      // team possession:count is per team-active-minute -> per 5 team minutes.
      teamRankMetric: (ps) => {
        const v = benchmarkValue(ps, "possession:count");
        return v == null ? null : v * 5;
      },
    },
    {
      key: "possession-time-per-5-active-min",
      title: `Possession time ${careerRateWindowLabel()}`,
      metric: (subject) =>
        careerRateValue(
          subject.cohort.possessions.total_duration_seconds,
          subject.activeTimeSeconds,
        ),
      format: formatDurationSeconds,
      // benchmark possession:duration_share is a fraction of active time -> the
      // seconds spent in possession per 5 active minutes (share * 300s).
      rankMetric: (ps) => {
        const v = benchmarkValue(ps, "possession:duration_share");
        return v == null ? null : v * 300;
      },
    },
    {
      key: "average-possession-length",
      title: "Avg possession length",
      metric: (subject) => subject.cohort.possessions.avg_duration_seconds,
      format: formatSecondsValueRequired,
      // seconds-in-possession per minute (duration_share * 60) over possessions
      // per minute = average seconds per possession.
      rankMetric: (ps) => {
        const share = benchmarkValue(ps, "possession:duration_share");
        const possessions = benchmarkValue(ps, "possession:count");
        if (share == null || possessions == null || possessions <= 0) return null;
        return (share * 60) / possessions;
      },
    },
    {
      key: "touches-per-possession",
      title: "Avg touches per possession",
      metric: (subject) => subject.cohort.possessions.avg_touches_per_possession,
      format: formatRate,
      rankMetric: (ps) => benchmarkPerPossession(ps, "possession:touch_count"),
      teamRankMetric: (ps) => benchmarkPerPossession(ps, "possession:touch_count"),
    },
    {
      key: "advance-per-possession",
      title: "Ball advanced per possession",
      metric: (subject) => subject.cohort.possessions.avg_advance_distance,
      format: formatDistanceRequired,
      rankMetric: (ps) => benchmarkPerPossession(ps, "possession:advance_distance"),
      teamRankMetric: (ps) => benchmarkPerPossession(ps, "possession:advance_distance"),
    },
    {
      key: "own-half-possession",
      title: "Own-half possession",
      metric: (subject) => possessionLocationShare(subject.cohort.locations.halves, "own_side"),
      format: formatShareRequired,
    },
    {
      key: "opponent-half-possession",
      title: "Opponent-half possession",
      metric: (subject) =>
        possessionLocationShare(subject.cohort.locations.halves, "opponent_side"),
      format: formatShareRequired,
    },
    {
      key: "carry-time-share",
      title: "Carry time share",
      metric: (subject) => subject.cohort.possessions.carry_time_share,
      format: formatShareRequired,
      rankMetric: (ps) => benchmarkValue(ps, "possession:carry_time_share"),
      // Gauge: the team benchmark is the players' active-time-weighted mean
      // share, the same statistic the pooled team subject computes.
      teamRankMetric: (ps) => benchmarkValue(ps, "possession:carry_time_share"),
    },
    {
      key: "first-touch-control-rate",
      title: "First-touch control rate",
      metric: (subject) => subject.cohort.touches.first_touch_control_share,
      format: formatShareRequired,
    },
    {
      key: "contested-touch-share",
      title: "Contested touch share",
      metric: (subject) =>
        subject.cohort.touches.classified_touch_count > 0
          ? subject.cohort.touches.contested_touch_count /
            subject.cohort.touches.classified_touch_count
          : null,
      format: formatShareRequired,
    },
  ];

  return definitions.flatMap((definition) => {
    const rows = possessionAdvancedMagnitudeRows(
      subjects,
      definition,
      rankCohorts,
      rankWindowLabel,
      grain,
    );
    return rows.length > 0 ? [{ key: definition.key, title: definition.title, rows }] : [];
  });
}

function possessionAdvancedMagnitudeRows(
  subjects: PossessionAdvancedSubject[],
  definition: {
    key: string;
    metric: (subject: PossessionAdvancedSubject) => number | null;
    format: (value: number) => string;
    maxValue?: number;
    rankMetric?: PossessionRankMetric;
    teamRankMetric?: PossessionRankMetric;
  },
  rankCohorts: RankBenchmarkCohort[] = [],
  rankWindowLabel?: string | null,
  grain: PossessionBenchmarkGrain = "player",
): ComparisonRow[] {
  const values = subjects.map((subject) => definition.metric(subject));
  if (!values.some((value) => value != null)) return [];
  // Rank values participate in the shared scale only when this chart has a
  // unit-compatible benchmark metric for the requested grain.
  const rankMetric = grain === "team" ? definition.teamRankMetric : definition.rankMetric;
  const rankRows = rankMetric
    ? rankCohorts.flatMap((cohort) => {
        const value = rankMetric(grain === "team" ? (cohort.team_per_stat ?? {}) : cohort.per_stat);
        if (value == null || !Number.isFinite(value)) return [];
        return [{ cohort, value }];
      })
    : [];
  const measuredMaxValue = Math.max(
    ...values.map((value) => value ?? 0),
    ...rankRows.map((rankRow) => rankRow.value),
  );
  const maxValue = definition.maxValue ?? (measuredMaxValue > 0 ? measuredMaxValue : 1);

  const rows: ComparisonRow[] = subjects.map((subject) => {
    const rawValue = definition.metric(subject);
    const value = rawValue ?? 0;
    const scaledValue = maxValue > 0 ? value / maxValue : 0;
    const formatted = rawValue == null ? "-" : definition.format(value);
    return {
      key: `${definition.key}:${subject.key}`,
      label: subject.label,
      ariaLabel: `${subject.name}: ${formatted}`,
      segments: [
        {
          key: "value",
          className: subject.segmentClassName,
          label: subject.name,
          value: scaledValue,
          title: `${subject.name}: ${formatted}`,
        },
      ],
      total: scaledValue,
      maxValue: 1,
      barValue: formatted,
    };
  });

  for (const { cohort, value } of rankRows) {
    const scaledValue = maxValue > 0 ? value / maxValue : 0;
    const formatted = definition.format(value);
    rows.push({
      key: `${definition.key}:rank-${cohort.rank_value}`,
      label: rankCohortLabel(cohort, rankWindowLabel),
      ariaLabel: `Rank (${cohort.label}): ${formatted}`,
      segments: [
        {
          key: "value",
          className: rankAverageShadeClass(cohort.rank_value, cohort.rank_grouping),
          label: cohort.label,
          value: scaledValue,
          title: `Rank (${cohort.label}): ${formatted}`,
        },
      ],
      total: scaledValue,
      maxValue: 1,
      barValue: formatted,
    });
  }

  return rows;
}

export function possessionAdvancedCohortLabel({
  appearanceCount,
  className,
  name,
  subtitle,
}: {
  appearanceCount: number;
  className: string;
  name: string;
  subtitle: string;
}) {
  return (
    <StatPlayerLabel
      className={`possession-profile-label ${className}`}
      name={name}
      platform={null}
      platformPlayerId={null}
      showPlatformBadge={false}
      subtitle={`${subtitle} · ${appearanceCount.toLocaleString()} appearances`}
    />
  );
}

function possessionLocationShare(buckets: PossessionTimeBucket[], key: string): number | null {
  return buckets.find((bucket) => bucket.key === key)?.share ?? null;
}

function formatShare(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "-";
  return `${Math.round(value * 100)}%`;
}

function formatRate(value: number): string {
  if (!Number.isFinite(value)) return "-";
  const absolute = Math.abs(value);
  if (absolute >= 100) return value.toFixed(0);
  return value.toFixed(absolute >= 10 ? 1 : 2);
}

function formatSecondsValue(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "-";
  return `${value.toFixed(2)}s`;
}

function formatDurationSeconds(value: number): string {
  const totalSeconds = Math.round(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatSecondsValueRequired(value: number): string {
  return formatSecondsValue(value);
}

function formatDistanceRequired(value: number): string {
  return formatDistance(value);
}

function formatShareRequired(value: number): string {
  return formatShare(value);
}

function formatDistance(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "-";
  return `${Math.round(value).toLocaleString()} uu`;
}
