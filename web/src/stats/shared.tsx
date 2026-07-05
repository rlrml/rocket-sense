import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { PlatformIcon } from "../platform";
import { RankBadge, rankGroupIconUrl, rankIconUrl } from "../rank";
import type { RankBenchmarkCohort } from "../types";

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
  // Normalize the flex-grow factors so they sum to 1; otherwise segment values
  // that sum to < 1 leave the fill partly empty (see ComparisonBar for details).
  const segmentSum = visibleSegments.reduce((sum, segment) => sum + segment.value, 0);
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
            style={{ flexGrow: segmentSum > 0 ? segment.value / segmentSum : 0 }}
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
  platformPlayerId,
  profilePath,
  rank,
  showPlatformBadge = true,
  subtitle,
}: {
  className?: string;
  inline?: boolean;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
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
        platformPlayerId={platformPlayerId}
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
  platformPlayerId,
  profilePath,
  showPlatformBadge = true,
}: {
  className?: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  profilePath?: string | null;
  showPlatformBadge?: boolean;
}) {
  const nameNode = profilePath ? <Link to={profilePath}>{name}</Link> : <>{name}</>;
  return (
    <strong className={`stat-player-name-line ${className}`.trim()}>
      {showPlatformBadge ? (
        <PlatformIcon
          platform={platform}
          platformPlayerId={platformPlayerId}
          rlTrackerPlayerName={name}
          linkToRlTracker
        />
      ) : null}
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

export type CareerCohortKey = "player" | "teammates" | "opponents" | "rank-peers";

export function careerCohortKey(value: string | null | undefined): CareerCohortKey | null {
  if (!value) return null;
  if (value === "player" || value === "self" || value === "cohort-self") return "player";
  if (value === "teammate" || value === "teammates" || value === "cohort-teammates")
    return "teammates";
  if (value === "opponent" || value === "opponents" || value === "cohort-opponents")
    return "opponents";
  if (value === "rank" || value === "rank-peers" || value === "cohort-rank-peers")
    return "rank-peers";
  return null;
}

export function careerCohortLabel(
  key: CareerCohortKey,
  playerName = "Player",
  tierLabel?: string | null,
): string {
  if (key === "player") return playerName;
  if (key === "teammates") return "Teammates";
  if (key === "opponents") return "Opponents";
  return `Rank median${tierLabel ? ` (${tierLabel})` : ""}`;
}

export function careerCohortSubtitle(key: CareerCohortKey): string {
  if (key === "player") return "Player";
  if (key === "teammates") return "Teammates";
  if (key === "opponents") return "Opponents";
  return "Rank median";
}

export function careerCohortClassName(key: CareerCohortKey): string {
  return `career-cohort-${key.replace("_", "-")}`;
}

export function careerCohortSegmentClassName(key: CareerCohortKey): string {
  return careerCohortClassName(key);
}

// --- Rank-average comparison cohorts -------------------------------------
//
// The "rank average" cohorts are a provisional extra comparison alongside
// player / teammates / opponents (AGENTS.md: keep them behind a centralized
// enable/disable path). The server also gates them via `rank_benchmark_enabled`
// and returns no ranks when off, but this single client switch lets the whole
// feature be turned off in one place. More than one rank can be shown at once,
// so each rank renders as its own row; a slate ramp shade (keyed by rank group)
// keeps a given rank the same shade regardless of selection order.

export const RANK_AVERAGE_ENABLED = true;

export function rankAverageEnabled(): boolean {
  return RANK_AVERAGE_ENABLED;
}

/** Pooled rank-group id (0..7) for a tier index — mirrors the Rust `rank_group_id`. */
export function tierToRankGroupId(tier: number): number {
  return tier >= 22 ? 7 : Math.max(0, Math.floor((tier - 1) / 3));
}

/** Slate-ramp shade class for a rank cohort, stable per rank group. */
export function rankAverageShadeClass(rankValue: number, grouping: string): string {
  const groupId = grouping === "tier" ? tierToRankGroupId(rankValue) : rankValue;
  const clamped = Math.max(0, Math.min(7, groupId));
  return `career-cohort-rank-avg rank-shade-${clamped}`;
}

function rankCohortAggregatorWord(aggregator: string | null | undefined): "median" | "average" {
  return aggregator === "mean" ? "average" : "median";
}

/**
 * The display values a metric contributes across the selected ranks, so a card
 * can fold them into its shared `maxValue` (otherwise rank bars overflow). Pass
 * the same `toValue` the rows use.
 */
export function rankCohortValues(
  cohorts: RankBenchmarkCohort[],
  metricKey: string,
  toValue: (raw: number) => number,
): number[] {
  return cohorts
    .map((cohort) => cohort.per_stat[metricKey]?.value)
    .filter((value): value is number => value != null && Number.isFinite(value))
    .map(toValue);
}

// The rank-average row label leads with the rank's icon (group or tier) rather
// than a "Rank median (Diamond)" text label; the median/average + window move to
// the subtitle.
export function rankCohortIconUrl(cohort: RankBenchmarkCohort): string | null {
  return cohort.rank_grouping === "tier"
    ? rankIconUrl(cohort.rank_value)
    : rankGroupIconUrl(cohort.rank_value);
}

function rankCohortLabelNode(
  cohort: RankBenchmarkCohort,
  aggregatorWord: "median" | "average",
  windowLabel?: string | null,
): ReactNode {
  const iconUrl = rankCohortIconUrl(cohort);
  const subtitle = [`Rank ${aggregatorWord}`, windowLabel].filter(Boolean).join(" · ");
  return (
    <div
      className={`player-bar-label ${rankAverageShadeClass(cohort.rank_value, cohort.rank_grouping)}`}
    >
      <strong className="stat-player-name-line">
        {iconUrl ? <img className="rank-cohort-icon" src={iconUrl} alt="" /> : null}
        <span className="stat-player-name-text">{cohort.label}</span>
      </strong>
      <span className="stat-player-subtitle">
        <span className="stat-player-subtitle-text">{subtitle}</span>
      </span>
    </div>
  );
}

/**
 * The icon-led label node for a rank-average row, for bespoke subview charts
 * (positioning/possession/...) that build their own rows but want the same
 * rank-icon label the shared helpers produce.
 */
export function rankCohortLabel(
  cohort: RankBenchmarkCohort,
  windowLabel?: string | null,
): ReactNode {
  return rankCohortLabelNode(cohort, "median", windowLabel);
}

/**
 * One magnitude (single-value) bar row per selected rank for a stat, looked up
 * by `metricKey` in each cohort's `per_stat`. `toValue` maps the stored
 * benchmark value into the card's display units (e.g. ×5 for per-active-minute
 * rates shown per 5 min, ×1 for shares/averages); the row is skipped when the
 * cohort has no value for that metric so a card never shows a phantom rank row.
 * Set `valueColumn` for cards that render a right-hand value column (rate
 * cards); leave it off for cards that float the value on the bar.
 */
export function rankCohortMagnitudeRows(config: {
  cohorts: RankBenchmarkCohort[];
  metricKey: string;
  toValue: (raw: number) => number;
  format: (value: number) => string;
  maxValue: number;
  windowLabel?: string | null;
  valueColumn?: boolean;
}): ComparisonRow[] {
  const { cohorts, metricKey, toValue, format, maxValue, windowLabel, valueColumn } = config;
  const rows: ComparisonRow[] = [];
  for (const cohort of cohorts) {
    const stat = cohort.per_stat[metricKey];
    if (!stat || stat.value == null || !Number.isFinite(stat.value)) continue;
    const value = toValue(stat.value);
    if (!Number.isFinite(value)) continue;
    const formatted = format(value);
    const word = rankCohortAggregatorWord(stat.aggregator);
    const safe = Math.max(0, value);
    rows.push({
      key: `rank-${cohort.rank_value}`,
      label: rankCohortLabelNode(cohort, word, windowLabel),
      ariaLabel: `Rank ${word} (${cohort.label}): ${formatted}`,
      segments: [
        {
          key: "value",
          className: rankAverageShadeClass(cohort.rank_value, cohort.rank_grouping),
          label: cohort.label,
          value: safe,
          title: `Rank ${word} (${cohort.label}): ${formatted}`,
        },
      ],
      total: safe,
      maxValue,
      ...(valueColumn ? { valueLabel: formatted } : { barValue: formatted }),
      placeholder: formatted,
    });
  }
  return rows;
}

/**
 * Like {@link rankCohortMagnitudeRows} but the row value is derived from the
 * cohort's whole `per_stat` map (e.g. a ratio of two benchmark metrics such as
 * shooting % = goals/shots). `derive` returns null to skip that rank.
 */
export function rankCohortDerivedRows(config: {
  cohorts: RankBenchmarkCohort[];
  derive: (perStat: RankBenchmarkCohort["per_stat"]) => number | null;
  format: (value: number) => string;
  maxValue: number;
  windowLabel?: string | null;
  valueColumn?: boolean;
}): ComparisonRow[] {
  const { cohorts, derive, format, maxValue, windowLabel, valueColumn } = config;
  const rows: ComparisonRow[] = [];
  for (const cohort of cohorts) {
    const value = derive(cohort.per_stat);
    if (value == null || !Number.isFinite(value)) continue;
    const formatted = format(value);
    const safe = Math.max(0, value);
    rows.push({
      key: `rank-${cohort.rank_value}`,
      label: rankCohortLabelNode(cohort, "median", windowLabel),
      ariaLabel: `Rank median (${cohort.label}): ${formatted}`,
      segments: [
        {
          key: "value",
          className: rankAverageShadeClass(cohort.rank_value, cohort.rank_grouping),
          label: cohort.label,
          value: safe,
          title: `Rank median (${cohort.label}): ${formatted}`,
        },
      ],
      total: safe,
      maxValue,
      ...(valueColumn ? { valueLabel: formatted } : { barValue: formatted }),
      placeholder: formatted,
    });
  }
  return rows;
}

// --- Team-level rank benchmarks -------------------------------------------
//
// `RankBenchmarkCohort.team_per_stat` mirrors `per_stat` at TEAM granularity:
// rates per team-active-minute with the whole roster pooled (additive metrics
// are roster sums; share/gauge metrics are time-weighted roster means). The
// field is optional (old servers) and may be empty (thin samples); every
// helper here treats missing data as "skip the row" so a card never shows a
// phantom rank row.

function rankCohortTeamPerStat(cohort: RankBenchmarkCohort): RankBenchmarkCohort["per_stat"] {
  return cohort.team_per_stat ?? {};
}

/**
 * The display values a metric contributes across the selected ranks' TEAM
 * benchmarks, so a team card can fold them into its shared `maxValue` (the
 * team analogue of {@link rankCohortValues}). Pass the same `toValue` the rows
 * use (e.g. ×5 for per-team-minute rates shown per 5 min).
 */
export function rankCohortTeamValues(
  cohorts: RankBenchmarkCohort[],
  metricKey: string,
  toValue: (raw: number) => number,
): number[] {
  return cohorts
    .map((cohort) => rankCohortTeamPerStat(cohort)[metricKey]?.value)
    .filter((value): value is number => value != null && Number.isFinite(value))
    .map(toValue);
}

/**
 * One magnitude bar row per selected rank for a TEAM stat (the team analogue
 * of {@link rankCohortMagnitudeRows}), looked up by `metricKey` in each
 * cohort's `team_per_stat`. `toValue` maps the stored per-team-active-minute
 * rate into the card's display units (e.g. ×5 for per-5-min team rates).
 */
export function rankCohortTeamMagnitudeRows(config: {
  cohorts: RankBenchmarkCohort[];
  metricKey: string;
  toValue: (raw: number) => number;
  format: (value: number) => string;
  maxValue: number;
  windowLabel?: string | null;
  valueColumn?: boolean;
}): ComparisonRow[] {
  const { cohorts, metricKey, toValue, format, maxValue, windowLabel, valueColumn } = config;
  const rows: ComparisonRow[] = [];
  for (const cohort of cohorts) {
    const stat = rankCohortTeamPerStat(cohort)[metricKey];
    if (!stat || stat.value == null || !Number.isFinite(stat.value)) continue;
    const value = toValue(stat.value);
    if (!Number.isFinite(value)) continue;
    const formatted = format(value);
    const word = rankCohortAggregatorWord(stat.aggregator);
    const safe = Math.max(0, value);
    rows.push({
      key: `rank-${cohort.rank_value}`,
      label: rankCohortLabelNode(cohort, word, windowLabel),
      ariaLabel: `Rank ${word} (${cohort.label}): ${formatted}`,
      segments: [
        {
          key: "value",
          className: rankAverageShadeClass(cohort.rank_value, cohort.rank_grouping),
          label: cohort.label,
          value: safe,
          title: `Rank ${word} (${cohort.label}): ${formatted}`,
        },
      ],
      total: safe,
      maxValue,
      ...(valueColumn ? { valueLabel: formatted } : { barValue: formatted }),
      placeholder: formatted,
    });
  }
  return rows;
}

/**
 * Like {@link rankCohortDerivedRows} but `derive` sees the cohort's whole
 * `team_per_stat` map, for team ratio metrics (e.g. team shooting % = team
 * goal rate / team shot rate — both per-minute, so the duration cancels).
 * `derive` returns null to skip that rank.
 */
export function rankCohortTeamDerivedRows(config: {
  cohorts: RankBenchmarkCohort[];
  derive: (teamPerStat: RankBenchmarkCohort["per_stat"]) => number | null;
  format: (value: number) => string;
  maxValue: number;
  windowLabel?: string | null;
  valueColumn?: boolean;
}): ComparisonRow[] {
  const { cohorts, derive, format, maxValue, windowLabel, valueColumn } = config;
  const rows: ComparisonRow[] = [];
  for (const cohort of cohorts) {
    const value = derive(rankCohortTeamPerStat(cohort));
    if (value == null || !Number.isFinite(value)) continue;
    const formatted = format(value);
    const safe = Math.max(0, value);
    rows.push({
      key: `rank-${cohort.rank_value}`,
      label: rankCohortLabelNode(cohort, "median", windowLabel),
      ariaLabel: `Rank median (${cohort.label}): ${formatted}`,
      segments: [
        {
          key: "value",
          className: rankAverageShadeClass(cohort.rank_value, cohort.rank_grouping),
          label: cohort.label,
          value: safe,
          title: `Rank median (${cohort.label}): ${formatted}`,
        },
      ],
      total: safe,
      maxValue,
      ...(valueColumn ? { valueLabel: formatted } : { barValue: formatted }),
      placeholder: formatted,
    });
  }
  return rows;
}

/**
 * One distribution (parts-of-a-whole) bar row per selected rank, where each band
 * reads a 0..1 share straight from the cohort's `per_stat[band.metricKey]`. Bands
 * reuse the same tone classes the player/teammate/opponent rows use so the only
 * thing distinguishing a rank row is its slate-bordered label.
 */
export function rankCohortDistributionRows(config: {
  cohorts: RankBenchmarkCohort[];
  bands: { id: string; label: string; metricKey: string; className: string }[];
  colorStyle?: CSSProperties;
  windowLabel?: string | null;
  // Derive a band's share from the cohort when it has no direct metric_key
  // (e.g. the "level with ball" middle band = 1 − behind − ahead).
  deriveShare?: (cohort: RankBenchmarkCohort, bandId: string) => number | null;
  // Read the TEAM-grain map (`team_per_stat`) instead of the per-player map:
  // for share metrics the team benchmark is the players' time-weighted team
  // mean, so it stays a 0..1 share and renders identically. Rows whose cohort
  // lacks team data collapse to total 0 and are skipped like any empty row.
  teamGrain?: boolean;
}): ComparisonRow[] {
  const { cohorts, bands, colorStyle, windowLabel, deriveShare, teamGrain } = config;
  const rows: ComparisonRow[] = [];
  for (const cohort of cohorts) {
    const perStat = teamGrain ? rankCohortTeamPerStat(cohort) : cohort.per_stat;
    const segments: SegmentedBarSegment[] = bands.map((band) => {
      const direct = perStat[band.metricKey]?.value;
      const raw = direct != null ? direct : (deriveShare?.(cohort, band.id) ?? 0);
      const share = Number.isFinite(raw) && raw > 0 ? raw : 0;
      return {
        key: band.id,
        className: band.className,
        label: band.label,
        value: share,
        visibleLabel: share >= 0.12 ? `${band.label} ${Math.round(share * 100)}%` : undefined,
        title: share > 0 ? `${band.label} ${Math.round(share * 100)}%` : undefined,
      };
    });
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);
    if (total <= 0) continue;
    rows.push({
      key: `rank-${cohort.rank_value}`,
      label: rankCohortLabelNode(cohort, "median", windowLabel),
      ariaLabel: `Rank median (${cohort.label}): ${bands.map((b) => b.label).join(" / ")}`,
      segments,
      total,
      style: colorStyle,
    });
  }
  return rows;
}

export const CAREER_RATE_WINDOW_SECONDS = 5 * 60;

export function careerRateValue(
  value: number,
  activeSeconds: number | null | undefined,
  windowSeconds = CAREER_RATE_WINDOW_SECONDS,
): number | null {
  if (!Number.isFinite(value) || value < 0) return null;
  if (activeSeconds == null || !Number.isFinite(activeSeconds) || activeSeconds <= 0) return null;
  return (value * windowSeconds) / activeSeconds;
}

export function careerRateWindowLabel(windowSeconds = CAREER_RATE_WINDOW_SECONDS): string {
  const minutes = windowSeconds / 60;
  return `per ${Number.isInteger(minutes) ? minutes.toFixed(0) : minutes.toFixed(1)} active min`;
}

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
  /**
   * Value drawn on the bar's leading edge (single-value magnitude bars): on wide
   * bars it prints inside the colored segment at the tip (light on the bar),
   * keeping the bar full width with no separate column; on short/empty bars it
   * trails just past the tip (dark on the track) so every bar still shows its
   * number. Mutually exclusive with `valueLabel` in practice.
   */
  barValue?: ReactNode;
  /** Extra CSS vars for the track, e.g. outcomeDistributionColorStyle(colors). */
  style?: CSSProperties;
  /** Optional point markers on the same scale, e.g. a teammate/rank-peer average. */
  markers?: ComparisonMarker[];
  /** Shown on the track when there are no filled segments (e.g. a zero value). */
  placeholder?: ReactNode;
}

export interface ComparisonMarker {
  key: string;
  label: string;
  value: number;
  className?: string;
  title?: string;
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
 * automatically when no row carries a `valueLabel` (e.g. pure distribution bars
 * whose values live inside the segments).
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
            markers={row.markers}
            placeholder={row.placeholder}
            barValue={row.barValue}
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
 * One titled comparison chart's worth of data. A "stat section" is, for most
 * sections, just an ordered list of these. Keeping them as data (rather than
 * pre-rendered JSX) lets the layout be shared: the combined view lays the cards
 * out in a grid, while the wins/losses split (see App's player-outcome-split)
 * pairs them card-by-card so each metric keeps its win and loss side by side —
 * and stacks them on a phone — without any section knowing about that layout.
 */
export interface ComparisonCard {
  key: string;
  title: ReactNode;
  rows: ComparisonRow[];
}

/** Render a single comparison card. Used both standalone (win/loss split pairs
 * one of these per outcome) and inside {@link ComparisonCardGrid}. */
export function ComparisonCardChart({ card }: { card: ComparisonCard }) {
  return <PlayerComparisonChart className="career-rate-card" rows={card.rows} title={card.title} />;
}

/** The default combined-view layout for a list of comparison cards. */
export function ComparisonCardGrid({ cards }: { cards: ComparisonCard[] }) {
  return (
    <section className="full-span">
      <div className="stat-comparison-grid">
        {cards.map((card) => (
          <ComparisonCardChart card={card} key={card.key} />
        ))}
      </div>
    </section>
  );
}

// At/above this fill percentage the bar is wide enough to print its value on the
// colored bar; below it the value trails the tip on the open track instead.
const BAR_VALUE_ON_BAR_MIN_PERCENT = 25;

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
  markers = [],
  placeholder,
  barValue,
}: {
  ariaLabel: string;
  segments: SegmentedBarSegment[];
  total: number;
  maxValue?: number;
  style?: CSSProperties;
  markers?: ComparisonMarker[];
  placeholder?: ReactNode;
  barValue?: ReactNode;
}) {
  const visible = segments.filter((segment) => segment.value > 0);
  // Segments split the fill proportionally via flex-grow. The grow factors must
  // sum to >= 1 or flexbox leaves the fill partly unfilled (a single segment with
  // value 0.33 would fill only 33% of its own fill and gain a square end), so
  // normalize by the segment sum — a single segment then always fills its fill.
  const segmentSum = visible.reduce((sum, segment) => sum + segment.value, 0);
  const scaleMax = maxValue ?? total;
  const fillPercent = scaleMax > 0 ? Math.max(0, Math.min(100, (total / scaleMax) * 100)) : 0;
  const hasBarValue = barValue != null;
  // Wide bars print the value on the colored bar at its leading edge; short or
  // empty bars can't hold it, so it trails just past the tip on the track.
  const valueOnBar =
    hasBarValue && visible.length > 0 && fillPercent >= BAR_VALUE_ON_BAR_MIN_PERCENT;
  const lastIndex = visible.length - 1;
  return (
    <div
      className={`metric-bar-track source-bar-track player-comparison-track${
        hasBarValue && !valueOnBar ? " has-bar-value" : ""
      }`}
      style={style}
      aria-label={ariaLabel}
    >
      <span className="source-bar-fill" style={{ width: `${fillPercent}%` }}>
        {visible.map((segment, index) => (
          <span
            className={`source-segment ${segment.className}${
              valueOnBar && index === lastIndex ? " has-bar-value-on-bar" : ""
            }`}
            key={segment.key}
            style={{ flexGrow: segmentSum > 0 ? segment.value / segmentSum : 0 }}
            title={segment.title ?? `${segment.label}: ${segment.value.toLocaleString()}`}
          >
            {segment.visibleLabel ? (
              <span className="source-segment-label">{segment.visibleLabel}</span>
            ) : null}
            {valueOnBar && index === lastIndex ? (
              <span className="bar-value-label on-bar">{barValue}</span>
            ) : null}
          </span>
        ))}
      </span>
      {hasBarValue && !valueOnBar ? (
        <span className="bar-value-label trailing">{barValue}</span>
      ) : null}
      {markers.map((marker) => {
        const leftPercent =
          scaleMax > 0 ? Math.max(0, Math.min(100, (marker.value / scaleMax) * 100)) : 0;
        return (
          <span
            className={`player-comparison-marker ${marker.className ?? ""}`.trim()}
            key={marker.key}
            style={{ left: `${leftPercent}%` }}
            title={marker.title ?? `${marker.label}: ${marker.value.toLocaleString()}`}
          />
        );
      })}
      {visible.length === 0 && placeholder != null ? (
        <span className="player-comparison-placeholder">{placeholder}</span>
      ) : null}
    </div>
  );
}
