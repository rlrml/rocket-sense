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
  const platformPlayerId = playerIdFromProfilePath(profilePath);
  return (
    <strong className={`stat-player-name-line ${className}`.trim()}>
      {showPlatformBadge ? (
        <PlatformIcon platform={platform} platformPlayerId={platformPlayerId} linkToRlTracker />
      ) : null}
      <span className="stat-player-name-text">{nameNode}</span>
    </strong>
  );
}

function playerIdFromProfilePath(profilePath: string | null | undefined): string | null {
  const match = /^\/players\/[^/]+\/([^/?#]+)/.exec(profilePath ?? "");
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
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
  style,
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
  /** Extra CSS vars for the rows, e.g. outcomeDistributionColorStyle(colors). */
  style?: CSSProperties;
  total: (item: T) => number;
  trackClassName: string;
}) {
  if (!items.some((item) => total(item) > 0)) {
    return <div className="stat-empty">{emptyLabel}</div>;
  }

  const rows = sortItems ? sortItems(items) : items;

  return (
    <div className={className} style={style}>
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
  "positive-unknown": "#ccfbf1",
  neutral: "#94a3b8",
  "neutral-clear": "#cbd5e1",
  negative: "#7c3aed",
  "negative-strong": "#5b21b6",
  "negative-clear": "#7c3aed",
  "negative-unknown": "#ddd6fe",
};

// Team-colored ramp for OutcomeDistributionBar / comparison distribution rows:
// blue maps to the positive tone, orange to negative, and the level tiers a
// single team color from light (unknown) -> base (clear) -> dark (strong).
// Shared so any per-player breakdown (kickoff outcomes, movement bands, ...)
// tiers team colors identically instead of re-deriving shades. The "narrow"
// level isn't defined here, so it falls back to the base team fill.
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

// Standard "percent (absolute)" pairing used across every stats page, e.g.
// "45% (2m 30s)". Route all value+percent displays (bar labels, tooltips, table
// cells) through here so the order and punctuation stay consistent everywhere.
export function statPercentWithValue(percent: string, value: string, prefix?: string): string {
  const pair = `${percent} (${value})`;
  return prefix ? `${prefix}: ${pair}` : pair;
}

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
  /** Right-column value (e.g. "2.10s", "67%", "+1 / -0"). Omit to drop the column. */
  valueLabel?: ReactNode;
  /** Value floated at the bar's end instead of a right column (magnitude bars). */
  valueInBar?: ReactNode;
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
/**
 * The rows of a comparison chart without the surrounding titled panel, so a page
 * can drop them into its own section (e.g. a `.chart-panel` with a custom header)
 * while still using the one shared bar. The right-hand value column is dropped
 * automatically when no row carries a `valueLabel` — magnitude bars float their
 * value on the track via `valueInBar` instead, so they need no column.
 */
export function ComparisonRows({
  rows,
  emptyLabel = "No data yet.",
}: {
  rows: ComparisonRow[];
  emptyLabel?: ReactNode;
}) {
  if (!rows.length) {
    return <div className="stat-empty">{emptyLabel}</div>;
  }
  const hasValueColumn = rows.some((row) => row.valueLabel != null);
  return (
    <div className={`player-comparison-rows${hasValueColumn ? "" : " no-value-column"}`}>
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
            valueInBar={row.valueInBar}
          />
          {row.valueLabel != null ? (
            <strong className="metric-value player-comparison-value">
              <span>{row.valueLabel}</span>
            </strong>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function PlayerComparisonChart({
  title,
  rows,
  emptyLabel = "No data yet.",
  className = "",
}: {
  title: ReactNode;
  rows: ComparisonRow[];
  emptyLabel?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`player-comparison-chart ${className}`.trim()}>
      <div className="player-comparison-title">{title}</div>
      <ComparisonRows rows={rows} emptyLabel={emptyLabel} />
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
  valueInBar,
}: {
  ariaLabel: string;
  segments: SegmentedBarSegment[];
  total: number;
  maxValue?: number;
  style?: CSSProperties;
  placeholder?: ReactNode;
  /** Value floated at the bar's end: inside the fill when nearly full, in the
   *  empty track otherwise, so it stays readable on bars of any length. */
  valueInBar?: ReactNode;
}) {
  const visible = segments.filter((segment) => segment.value > 0);
  const scaleMax = maxValue ?? total;
  const fillPercent = scaleMax > 0 ? Math.max(0, Math.min(100, (total / scaleMax) * 100)) : 0;
  // The value hugs the right tip of its own bar (white, right-aligned inside the
  // fill's end) so every row reads the same way regardless of bar length. Only a
  // bar too short to hold the text at all falls back to dark text just past the
  // fill, since there is no room to place it inside.
  const valueInside = fillPercent > 10;
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
      {valueInBar != null && visible.length > 0 ? (
        <span
          className={`player-comparison-inbar-value${valueInside ? " inside" : ""}`}
          style={valueInside ? { right: `${100 - fillPercent}%` } : { left: `${fillPercent}%` }}
        >
          {valueInBar}
        </span>
      ) : null}
      {visible.length === 0 && placeholder != null ? (
        <span className="player-comparison-placeholder">{placeholder}</span>
      ) : null}
    </div>
  );
}
