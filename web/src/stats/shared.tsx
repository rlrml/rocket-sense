import type { ReactNode } from "react";

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
