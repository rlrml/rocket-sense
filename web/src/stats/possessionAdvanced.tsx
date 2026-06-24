import type { ReactNode } from "react";
import type { PossessionCohortSummary, PossessionTimeBucket } from "../types";
import {
  careerRateValue,
  careerRateWindowLabel,
  PlayerComparisonChart,
  StatPlayerLabel,
  type ComparisonRow,
} from "./shared";

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
  charts = possessionAdvancedMetricCharts(subjects ?? []),
}: {
  subjects?: PossessionAdvancedSubject[];
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
): PossessionAdvancedChart[] {
  const definitions: Array<{
    key: string;
    title: string;
    metric: (subject: PossessionAdvancedSubject) => number | null;
    format: (value: number) => string;
    maxValue?: number;
  }> = [
    {
      key: "possessions-per-5-active-min",
      title: `Possessions ${careerRateWindowLabel()}`,
      metric: (subject) =>
        careerRateValue(subject.cohort.possessions.possession_count, subject.activeTimeSeconds),
      format: formatRate,
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
    },
    {
      key: "average-possession-length",
      title: "Avg possession length",
      metric: (subject) => subject.cohort.possessions.avg_duration_seconds,
      format: formatSecondsValueRequired,
    },
    {
      key: "touches-per-possession",
      title: "Avg touches per possession",
      metric: (subject) => subject.cohort.possessions.avg_touches_per_possession,
      format: formatRate,
    },
    {
      key: "advance-per-possession",
      title: "Ball advanced per possession",
      metric: (subject) => subject.cohort.possessions.avg_advance_distance,
      format: formatDistanceRequired,
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
    const rows = possessionAdvancedMagnitudeRows(subjects, definition);
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
  },
): ComparisonRow[] {
  const values = subjects.map((subject) => definition.metric(subject));
  if (!values.some((value) => value != null)) return [];
  const measuredMaxValue = Math.max(...values.map((value) => value ?? 0));
  const maxValue = definition.maxValue ?? (measuredMaxValue > 0 ? measuredMaxValue : 1);

  return subjects.map((subject) => {
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
      valueInBar: rawValue != null && value > 0 ? formatted : undefined,
      placeholder: rawValue != null && value > 0 ? undefined : formatted,
    };
  });
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
