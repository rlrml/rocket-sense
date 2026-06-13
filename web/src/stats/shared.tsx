import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { PlatformIcon } from "../platform";

export interface SegmentedBarSegment {
  key: string;
  className: string;
  label: string;
  value: number;
  visibleLabel?: string;
  title?: string;
}

export function SegmentedBar({
  ariaLabel,
  className = "",
  maxValue,
  segments,
  total,
}: {
  ariaLabel: string;
  className?: string;
  maxValue?: number;
  segments: SegmentedBarSegment[];
  total: number;
}) {
  const visibleSegments = segments.filter((segment) => segment.value > 0);
  const scaleMax = maxValue ?? total;
  const fillPercent = scaleMax > 0 ? Math.max(0, Math.min(100, (total / scaleMax) * 100)) : 0;

  return (
    <div className={`metric-bar-track source-bar-track stat-segmented-track ${className}`} aria-label={ariaLabel}>
      <span className="source-bar-fill" style={{ width: `${fillPercent}%` }}>
        {visibleSegments.map((segment) => (
          <span
            className={`source-segment ${segment.className}`}
            key={segment.key}
            style={{ flexGrow: total > 0 ? segment.value : 0 }}
            title={segment.title ?? `${segment.label}: ${segment.value.toLocaleString()}`}
          >
            {segment.visibleLabel ? <span className="source-segment-label">{segment.visibleLabel}</span> : null}
          </span>
        ))}
      </span>
    </div>
  );
}

export function MetricMeter({
  className,
  label,
  percent,
  rootClassName = "",
  value,
}: {
  className: string;
  label: string;
  percent: number;
  rootClassName?: string;
  value: string;
}) {
  const clampedPercent = Math.max(0, Math.min(100, percent));

  return (
    <div className={`positioning-meter ${rootClassName}`.trim()} title={`${label}: ${value}`}>
      <span className="positioning-meter-label">{label}</span>
      <span className="positioning-meter-track" aria-label={`${label}: ${value}`}>
        <span className={`positioning-meter-fill ${className}`} style={{ width: `${clampedPercent}%` }} />
      </span>
      <strong>{value}</strong>
    </div>
  );
}

export function StatPlayerLabel({
  className = "",
  inline = false,
  name,
  platform,
  profilePath,
  showPlatformBadge = true,
  subtitle,
}: {
  className?: string;
  inline?: boolean;
  name: string;
  platform: string | null;
  profilePath?: string | null;
  showPlatformBadge?: boolean;
  subtitle: string;
}) {
  const nameNode = profilePath ? <Link to={profilePath}>{name}</Link> : <>{name}</>;
  const content = (
    <>
      <strong className="stat-player-name-line">
        {showPlatformBadge ? <PlatformIcon platform={platform} /> : null}
        <span className="stat-player-name-text">{nameNode}</span>
      </strong>
      <span className="stat-player-subtitle">{subtitle}</span>
    </>
  );

  if (inline) {
    return <span className={`player-bar-label player-bar-label-inline ${className}`.trim()}>{content}</span>;
  }

  return (
    <div className={`player-bar-label ${className}`.trim()}>
      {content}
    </div>
  );
}

export function PlayerSegmentedBarRows<T>({
  ariaLabel,
  className,
  emptyLabel,
  items,
  label,
  rowClassName = "positioning-bar-row",
  segments,
  sortItems,
  total,
  trackClassName,
}: {
  ariaLabel: (item: T) => string;
  className: string;
  emptyLabel: string;
  items: T[];
  label: (item: T) => ReactNode;
  rowClassName?: string;
  segments: (item: T) => SegmentedBarSegment[];
  sortItems?: (items: T[]) => T[];
  total: (item: T) => number;
  trackClassName: string;
}) {
  if (!items.some((item) => total(item) > 0)) {
    return <div className="stat-empty">{emptyLabel}</div>;
  }

  const rows = sortItems ? sortItems(items) : items;

  return (
    <div className={className}>
      {rows.map((item, index) => (
        <div className={rowClassName} key={rowKey(item, index)}>
          {label(item)}
          <SegmentedBar
            ariaLabel={ariaLabel(item)}
            className={trackClassName}
            segments={segments(item)}
            total={total(item)}
          />
        </div>
      ))}
    </div>
  );
}

function rowKey<T>(item: T, index: number): string {
  if (item && typeof item === "object" && "key" in item) {
    const key = (item as { key?: unknown }).key;
    if (typeof key === "string" || typeof key === "number") return String(key);
  }
  return String(index);
}

export type OutcomeDistributionTone = "positive" | "neutral" | "negative";
export type OutcomeDistributionLevel = "strong" | "clear" | "narrow" | "unknown";
export type OutcomeDistributionColorKey = OutcomeDistributionTone | `${OutcomeDistributionTone}-${OutcomeDistributionLevel}`;
export type OutcomeDistributionColors = Partial<Record<OutcomeDistributionColorKey, string>>;

export const PLAYER_RELATIVE_OUTCOME_COLORS: OutcomeDistributionColors = {
  positive: "#0f766e",
  "positive-strong": "#115e59",
  "positive-clear": "#0f766e",
  "positive-narrow": "#0f766e",
  "positive-unknown": "#ccfbf1",
  neutral: "#94a3b8",
  "neutral-clear": "#cbd5e1",
  negative: "#7c3aed",
  "negative-strong": "#5b21b6",
  "negative-clear": "#7c3aed",
  "negative-narrow": "#7c3aed",
  "negative-unknown": "#ddd6fe",
};

export interface OutcomeDistributionSegment {
  key: string;
  label: string;
  value: number;
  tone: OutcomeDistributionTone;
  level?: OutcomeDistributionLevel;
  visibleLabel?: string;
  title?: string;
}

export function OutcomeDistributionBar({
  ariaLabel,
  caption,
  className = "",
  colors,
  maxValue,
  segments,
  total,
  visibleCountThreshold,
}: {
  ariaLabel: string;
  caption?: ReactNode;
  className?: string;
  colors?: OutcomeDistributionColors;
  maxValue?: number;
  segments: OutcomeDistributionSegment[];
  total: number;
  visibleCountThreshold?: number;
}) {
  const barSegments: SegmentedBarSegment[] = segments.map((segment) => {
    const level = segment.level ?? "clear";
    const visibleLabel =
      segment.visibleLabel ??
      (visibleCountThreshold != null && segment.value > 0 && total > 0 && segment.value / total >= visibleCountThreshold
        ? String(segment.value)
        : undefined);
    return {
      key: segment.key,
      className: `outcome-dist-segment outcome-dist-${segment.tone} outcome-dist-level-${level}`,
      label: segment.label,
      value: segment.value,
      visibleLabel,
      title: segment.title,
    };
  });

  return (
    <div className={`outcome-distribution ${className}`} style={outcomeDistributionColorStyle(colors)}>
      <SegmentedBar
        ariaLabel={ariaLabel}
        className="outcome-distribution-track"
        maxValue={maxValue}
        segments={barSegments}
        total={total}
      />
      {caption ? <div className="outcome-distribution-caption">{caption}</div> : null}
    </div>
  );
}

function outcomeDistributionColorStyle(colors: OutcomeDistributionColors | undefined): CSSProperties | undefined {
  if (!colors) return undefined;

  const style: Record<string, string> = {};
  for (const [key, value] of Object.entries(colors)) {
    if (!value) continue;
    style[`--outcome-${key}`] = value;
  }
  return style as CSSProperties;
}
