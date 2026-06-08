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
