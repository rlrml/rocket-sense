import type { ReactNode } from "react";
import {
  type ComparisonRow,
  ComparisonRows,
  StatPlayerLabel,
  type StatPlayerRank,
  type SegmentedBarSegment,
  statPercentWithValue,
} from "./shared";

export interface ComparisonSubject {
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  rank: StatPlayerRank | null;
  team: number | null;
  showPlatformBadge?: boolean;
}

export interface SplitValue {
  id: string;
  label: string;
  segmentClass: string;
}

export function StatComparisonGrid({
  children,
  className = "",
  bare = false,
}: {
  children: ReactNode;
  className?: string;
  bare?: boolean;
}) {
  if (bare) {
    return <div className={`stat-comparison-grid ${className}`.trim()}>{children}</div>;
  }

  return (
    <section className="chart-panel full-span">
      <div className={`stat-comparison-grid ${className}`.trim()}>{children}</div>
    </section>
  );
}

export function StatComparisonPanel({
  title,
  rows,
  emptyLabel,
  className = "",
  footer,
}: {
  title: ReactNode;
  rows: ComparisonRow[];
  emptyLabel?: ReactNode;
  className?: string;
  footer?: ReactNode;
}) {
  return (
    <section className={`player-comparison-chart stat-comparison-card ${className}`.trim()}>
      <div className="player-comparison-title">{title}</div>
      <ComparisonRows rows={rows} emptyLabel={emptyLabel} />
      {footer}
    </section>
  );
}

export function subjectMagnitudeRows<T extends ComparisonSubject>(
  subjects: T[],
  options: {
    metric: (subject: T) => number | null;
    format: (value: number) => string;
    groupClassName: string;
    teamColored: boolean;
    subjectIndexByKey: Map<string, number>;
    label: (subject: T) => ReactNode;
    placeholder?: ReactNode;
    ariaSuffix?: string;
  },
): ComparisonRow[] {
  const maxValue = Math.max(1, ...subjects.map((subject) => options.metric(subject) ?? 0));
  return [...subjects]
    .sort(
      (left, right) =>
        (options.metric(right) ?? -1) - (options.metric(left) ?? -1) ||
        left.name.localeCompare(right.name),
    )
    .map((subject) => {
      const rawValue = options.metric(subject);
      const value = rawValue ?? 0;
      const formatted = options.format(value);
      return {
        key: subject.key,
        label: options.label(subject),
        ariaLabel: `${subject.name}: ${formatted}${options.ariaSuffix ? ` ${options.ariaSuffix}` : ""}`,
        segments: [
          {
            key: "value",
            className: subjectMagnitudeSegmentClass(
              subject,
              options.teamColored,
              options.subjectIndexByKey,
              options.groupClassName,
            ),
            label: subject.name,
            value,
          },
        ],
        total: value,
        maxValue,
        valueInBar: rawValue != null && value > 0 ? formatted : undefined,
        placeholder: rawValue != null && value > 0 ? undefined : (options.placeholder ?? "0"),
      };
    });
}

export function subjectSplitRows<T extends ComparisonSubject>(
  subjects: T[],
  values: SplitValue[],
  options: {
    amount: (subject: T, value: SplitValue) => number;
    total: (subject: T) => number;
    format: (value: number) => string;
    label: (subject: T) => ReactNode;
    minLabelShare?: number;
    emptyPlaceholder?: ReactNode;
    valueLabel?: boolean;
  },
): ComparisonRow[] {
  const minLabelShare = options.minLabelShare ?? 0.14;
  const maxValue = Math.max(1, ...subjects.map((subject) => options.total(subject)));
  return [...subjects]
    .sort(
      (left, right) =>
        options.total(right) - options.total(left) || left.name.localeCompare(right.name),
    )
    .map((subject) => {
      const total = options.total(subject);
      const segments: SegmentedBarSegment[] = values.map((value) => {
        const amount = options.amount(subject, value);
        const share = total > 0 ? amount / total : 0;
        return {
          key: value.id,
          className: value.segmentClass,
          label: value.label,
          value: amount,
          visibleLabel: amount > 0 && share >= minLabelShare ? options.format(amount) : undefined,
          title:
            amount > 0
              ? statPercentWithValue(
                  `${Math.round(share * 100)}%`,
                  options.format(amount),
                  value.label,
                )
              : undefined,
        };
      });
      return {
        key: subject.key,
        label: options.label(subject),
        ariaLabel: `${subject.name}: ${options.format(total)}`,
        segments,
        total,
        maxValue,
        valueLabel: options.valueLabel === false ? undefined : options.format(total),
        placeholder: total > 0 ? undefined : (options.emptyPlaceholder ?? "0"),
      };
    });
}

export function comparisonSubjectLabel(
  subject: ComparisonSubject,
  statPath: string,
  options: {
    teamSubtitle?: string;
    showPlatformBadge?: boolean;
  } = {},
) {
  return (
    <StatPlayerLabel
      className={`team-accent-${teamClass(subject.team)}`}
      name={subject.name}
      platform={subject.platform}
      profilePath={playerProfilePath(subject, statPath)}
      rank={subject.rank}
      showPlatformBadge={options.showPlatformBadge ?? subject.showPlatformBadge ?? true}
      subtitle={options.teamSubtitle ?? teamLabel(subject.team)}
    />
  );
}

export function subjectIndexByTeam<T extends { key: string; team: number | null }>(
  subjects: T[],
): Map<string, number> {
  const indexes = new Map<string, number>();
  const counts = new Map<number | null, number>();
  subjects.forEach((subject) => {
    const next = counts.get(subject.team) ?? 0;
    indexes.set(subject.key, next);
    counts.set(subject.team, next + 1);
  });
  return indexes;
}

export function subjectMagnitudeSegmentClass(
  subject: { key: string; team: number | null },
  teamColored: boolean,
  subjectIndexByKey: Map<string, number>,
  groupClassName: string,
): string {
  if (!teamColored) return groupClassName;
  return `team-segment-${teamClass(subject.team)} player-shade-${Math.min(
    subjectIndexByKey.get(subject.key) ?? 0,
    3,
  )}`;
}

export function teamClass(team: number | null): string {
  if (team === 0) return "blue";
  if (team === 1) return "orange";
  return "unknown";
}

export function teamLabel(team: number | null): string {
  if (team === 0) return "Blue";
  if (team === 1) return "Orange";
  return "Unknown";
}

function playerProfilePath(
  subject: { platform: string | null; platformPlayerId: string | null },
  statPath: string,
): string | null {
  if (!subject.platform || !subject.platformPlayerId) return null;
  return `/players/${encodeURIComponent(subject.platform)}/id/${encodeURIComponent(
    subject.platformPlayerId,
  )}/stats/${statPath}`;
}
