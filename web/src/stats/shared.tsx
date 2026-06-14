import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { PlatformIcon } from "../platform";
import { RankBadge } from "../rank";

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
    <div
      className={`metric-bar-track source-bar-track stat-segmented-track ${className}`}
      aria-label={ariaLabel}
    >
      <span className="source-bar-fill" style={{ width: `${fillPercent}%` }}>
        {visibleSegments.map((segment) => (
          <span
            className={`source-segment ${segment.className}`}
            key={segment.key}
            style={{ flexGrow: total > 0 ? segment.value : 0 }}
            title={segment.title ?? `${segment.label}: ${segment.value.toLocaleString()}`}
          >
            {segment.visibleLabel ? (
              <span className="source-segment-label">{segment.visibleLabel}</span>
            ) : null}
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
        <span
          className={`positioning-meter-fill ${className}`}
          style={{ width: `${clampedPercent}%` }}
        />
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
  rank,
  showPlatformBadge = true,
  subtitle,
}: {
  className?: string;
  inline?: boolean;
  name: string;
  platform: string | null;
  profilePath?: string | null;
  rank?: StatPlayerRank | null;
  showPlatformBadge?: boolean;
  subtitle: string;
}) {
  const content = (
    <>
      <StatPlayerName
        name={name}
        platform={platform}
        profilePath={profilePath}
        showPlatformBadge={showPlatformBadge}
      />
      <span className="stat-player-subtitle">
        <span className="stat-player-subtitle-text">{subtitle}</span>
        {rank ? (
          <RankBadge
            tier={rank.tier}
            division={rank.division}
            mmr={rank.mmr}
            approximate={rank.approximate}
            approximateAsOf={rank.approximateAsOf}
          />
        ) : null}
      </span>
    </>
  );

  if (inline) {
    return (
      <span className={`player-bar-label player-bar-label-inline ${className}`.trim()}>
        {content}
      </span>
    );
  }

  return <div className={`player-bar-label ${className}`.trim()}>{content}</div>;
}

export interface StatPlayerRank {
  tier: number | null | undefined;
  division: number | null | undefined;
  mmr: number | null | undefined;
  approximate?: boolean;
  approximateAsOf?: string | null;
}

export function statPlayerRank(player: {
  rank_tier?: number | null;
  rank_division?: number | null;
  rank_mmr?: number | null;
  rank_is_fallback?: boolean;
  rank_fallback_replay_date?: string | null;
}): StatPlayerRank | null {
  if (player.rank_tier == null) return null;
  return {
    tier: player.rank_tier,
    division: player.rank_division,
    mmr: player.rank_mmr,
    approximate: player.rank_is_fallback,
    approximateAsOf: player.rank_fallback_replay_date,
  };
}

export function StatPlayerName({
  className = "",
  name,
  platform,
  profilePath,
  showPlatformBadge = true,
}: {
  className?: string;
  name: string;
  platform: string | null;
  profilePath?: string | null;
  showPlatformBadge?: boolean;
}) {
  const nameNode = profilePath ? <Link to={profilePath}>{name}</Link> : <>{name}</>;
  return (
    <strong className={`stat-player-name-line ${className}`.trim()}>
      {showPlatformBadge ? <PlatformIcon platform={platform} /> : null}
      <span className="stat-player-name-text">{nameNode}</span>
    </strong>
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
export type OutcomeDistributionColorKey =
  | OutcomeDistributionTone
  | `${OutcomeDistributionTone}-${OutcomeDistributionLevel}`;
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

// Team-colored ramp for OutcomeDistributionBar / comparison distribution rows:
// blue maps to the positive tone, orange to negative, and the level tiers a
// single team color from light (unknown) -> base (clear) -> dark (strong).
// Shared so any per-player breakdown (kickoff outcomes, movement bands, ...)
// tiers team colors identically instead of re-deriving shades. Avoid the
// "narrow" level here — the track renders it as an outline rather than a fill.
export const TEAM_OUTCOME_COLORS: OutcomeDistributionColors = {
  positive: "#2563eb",
  "positive-strong": "#1e3a8a",
  "positive-clear": "#2563eb",
  "positive-unknown": "#bfdbfe",
  neutral: "#64748b",
  "neutral-clear": "#cbd5e1",
  negative: "#ea580c",
  "negative-strong": "#9a3412",
  "negative-clear": "#ea580c",
  "negative-unknown": "#fed7aa",
};

// Which tone a replay-local team paints as. Pair with TEAM_OUTCOME_COLORS so a
// blue player's segments render blue and an orange player's render orange.
export function teamOutcomeTone(team: number | null): OutcomeDistributionTone {
  if (team === 0) return "positive";
  if (team === 1) return "negative";
  return "neutral";
}

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
      (visibleCountThreshold != null &&
      segment.value > 0 &&
      total > 0 &&
      segment.value / total >= visibleCountThreshold
        ? String(segment.value)
        : undefined);
    return {
      key: segment.key,
      className: outcomeSegmentClassName(segment.tone, level),
      label: segment.label,
      value: segment.value,
      visibleLabel,
      title: segment.title,
    };
  });

  return (
    <div
      className={`outcome-distribution ${className}`}
      style={outcomeDistributionColorStyle(colors)}
    >
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

/** Tone+level → the segment classes whose CSS resolves `--outcome-*` vars. */
export function outcomeSegmentClassName(
  tone: OutcomeDistributionTone,
  level: OutcomeDistributionLevel = "clear",
): string {
  return `outcome-dist-segment outcome-dist-${tone} outcome-dist-level-${level}`;
}

/** Build the `--outcome-*` CSS-var style an outcome palette resolves against. */
export function outcomeDistributionColorStyle(
  colors: OutcomeDistributionColors | undefined,
): CSSProperties | undefined {
  if (!colors) return undefined;

  const style: Record<string, string> = {};
  for (const [key, value] of Object.entries(colors)) {
    if (!value) continue;
    style[`--outcome-${key}`] = value;
  }
  return style as CSSProperties;
}

export interface ComparisonRow {
  key: string;
  /** Left-column identity node (e.g. <PlayerIdentity />). */
  label: ReactNode;
  ariaLabel: string;
  segments: SegmentedBarSegment[];
  /** Sum of segment values; with `maxValue` it sets how full the track reads. */
  total: number;
  /** Cross-row scale for magnitude charts. Omit to fill the track (distributions). */
  maxValue?: number;
  /** Right-column value (e.g. "2.10s", "67%", "+1 / -0"). */
  valueLabel: ReactNode;
  /** Extra CSS vars for the track, e.g. outcomeDistributionColorStyle(colors). */
  style?: CSSProperties;
  /** Shown on the track when there are no filled segments (e.g. a zero value). */
  placeholder?: ReactNode;
}

/**
 * One comparison chart: a titled block with a row per player, every row using
 * the same track so magnitude bars and distribution bars read identically.
 * Distribution rows pass tone-classed segments + a `--outcome-*` `style`;
 * magnitude rows pass a single hue-classed segment and a `maxValue` scale.
 */
export function PlayerComparisonChart({
  title,
  rows,
  emptyLabel = "No data yet.",
  className = "",
}: {
  title: ReactNode;
  rows: ComparisonRow[];
  emptyLabel?: string;
  className?: string;
}) {
  return (
    <section className={`player-comparison-chart ${className}`.trim()}>
      <div className="player-comparison-title">{title}</div>
      {rows.length ? (
        <div className="player-comparison-rows">
          {rows.map((row) => (
            <div className="player-comparison-row" key={row.key}>
              {row.label}
              <ComparisonBar
                ariaLabel={row.ariaLabel}
                segments={row.segments}
                total={row.total}
                maxValue={row.maxValue}
                style={row.style}
                placeholder={row.placeholder}
              />
              <strong className="metric-value player-comparison-value">
                <span>{row.valueLabel}</span>
              </strong>
            </div>
          ))}
        </div>
      ) : (
        <div className="stat-empty">{emptyLabel}</div>
      )}
    </section>
  );
}

/**
 * The single shared bar track used by every comparison chart AND any standalone
 * full-width distribution bar, so they all read identically (same height,
 * rounding, segment styling). Pass `--outcome-*` vars via `style` for tone-keyed
 * fills, or hue classes on the segments for magnitude bars.
 */
export function ComparisonBar({
  ariaLabel,
  segments,
  total,
  maxValue,
  style,
  placeholder,
}: {
  ariaLabel: string;
  segments: SegmentedBarSegment[];
  total: number;
  maxValue?: number;
  style?: CSSProperties;
  placeholder?: ReactNode;
}) {
  const visible = segments.filter((segment) => segment.value > 0);
  const scaleMax = maxValue ?? total;
  const fillPercent = scaleMax > 0 ? Math.max(0, Math.min(100, (total / scaleMax) * 100)) : 0;
  return (
    <div
      className="metric-bar-track source-bar-track player-comparison-track"
      style={style}
      aria-label={ariaLabel}
    >
      <span className="source-bar-fill" style={{ width: `${fillPercent}%` }}>
        {visible.map((segment) => (
          <span
            className={`source-segment ${segment.className}`}
            key={segment.key}
            style={{ flexGrow: segment.value }}
            title={segment.title ?? `${segment.label}: ${segment.value.toLocaleString()}`}
          >
            {segment.visibleLabel ? (
              <span className="source-segment-label">{segment.visibleLabel}</span>
            ) : null}
          </span>
        ))}
      </span>
      {visible.length === 0 && placeholder != null ? (
        <span className="player-comparison-placeholder">{placeholder}</span>
      ) : null}
    </div>
  );
}
