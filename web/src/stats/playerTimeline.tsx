import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Customized,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  usePlotArea,
  useXAxisScale,
  XAxis,
  YAxis,
} from "recharts";
import { getPlayerTimeline } from "../api";
import { rankIconUrl, rankLabel } from "../rank";
import { formatSeasonCode } from "../seasons";
import type { PlayerTimelinePoint, PlayerTimelineResponse, PlayerTimelineSession } from "../types";
import {
  applyPeriodToParams,
  formatLocalDateAnchor,
  PERIOD_PARAM,
  periodBounds,
  sessionPeriodBounds,
  type PeriodBounds,
  type PeriodSelection,
} from "./periods";
import { useSearchParamState } from "./useSearchParamState";

// Frontend-only marker params, stripped from the stats search string before it
// becomes an API request or a period-scoped stats link. The time window itself
// is the active `period` (and its `replay-date-*` / `min/max-season` bounds),
// set by the shared Period selector — the timeline has no separate control.
const TIMELINE_BUCKETS_PARAM = "timeline-buckets";

const BUCKET_KINDS = ["session", "day", "week"] as const;
type BucketKind = (typeof BUCKET_KINDS)[number];

const seriesPalette = [
  "#2563eb",
  "#ea580c",
  "#14b8a6",
  "#8b5cf6",
  "#dc2626",
  "#0ea5e9",
  "#ec4899",
  "#eab308",
];

const chartAxis = "#9aa8b8";
const chartGrid = "#e4e9ef";
const tierShades = ["rgba(37, 99, 235, 0.05)", "rgba(37, 99, 235, 0.12)"];
// Alternating fills for the clickable period bands, with a stronger hover shade.
const bandShades = ["rgba(100, 116, 139, 0.08)", "rgba(100, 116, 139, 0.16)"];
const bandHoverShade = "rgba(37, 99, 235, 0.22)";

// Strip the frontend-only markers, keeping the period's replay-set bounds
// (`replay-date-*`, `min/max-season`) so the request stays scoped to the active
// period. The `period` marker itself is dropped from stats links but kept out of
// API requests either way.
function stripTimelineViewParams(params: URLSearchParams): URLSearchParams {
  params.delete(TIMELINE_BUCKETS_PARAM);
  params.delete(PERIOD_PARAM);
  return params;
}

/** Link to the career stats page scoped to a period, carrying the current
 * mode/context filters along. */
function periodScopedStatsHref(
  routeBasePath: string,
  search: string,
  selection: PeriodSelection,
  bounds: PeriodBounds | null,
): string {
  const params = stripTimelineViewParams(new URLSearchParams(search));
  applyPeriodToParams(params, selection, bounds);
  const query = params.toString();
  return `${routeBasePath}/stats/core${query ? `?${query}` : ""}`;
}

interface BucketRow {
  key: string;
  label: string;
  start: Date;
  /** Epoch-ms span of the period, used to shade+click the matching chart band. */
  x1: number;
  x2: number;
  games: number;
  wins: number;
  losses: number;
  startMmr: number | null;
  endMmr: number | null;
  href: string;
}

// Running "last known MMR" up to and including each point. A period's *entry*
// MMR is then the last known value BEFORE its first game — the rating the
// player carried into it — so consecutive periods chain (one's end == the
// next's start) and the delta is the true net change over the period. (Using
// the first game's own after-match MMR as the start would double-count that
// game and leave day-to-day values that don't line up.)
function lastKnownMmrPrefix(points: PlayerTimelinePoint[]): (number | null)[] {
  const prefix: (number | null)[] = [];
  let last: number | null = null;
  for (const point of points) {
    if (point.rank_mmr != null) last = point.rank_mmr;
    prefix.push(last);
  }
  return prefix;
}

function bucketKeyForPoint(point: PlayerTimelinePoint, kind: BucketKind): string {
  if (kind === "session") return `s${point.session_index}`;
  const anchor = formatLocalDateAnchor(new Date(point.replay_date));
  if (kind === "day") return anchor;
  // A week bucket keys on its Monday, which periodBounds derives from any date
  // inside the week.
  return formatLocalDateAnchor(
    periodBounds({ kind: "week", anchor })?.after ?? new Date(point.replay_date),
  );
}

// Group the (chronological) points into contiguous session/day/week buckets,
// each labelled + linked to its period-scoped stats and annotated with the
// entry/exit MMR that makes the list chain sensibly.
function buildBucketRows(
  points: PlayerTimelinePoint[],
  sessions: PlayerTimelineSession[],
  kind: BucketKind,
  routeBasePath: string,
  search: string,
): BucketRow[] {
  const lastMmr = lastKnownMmrPrefix(points);
  const order: string[] = [];
  const indicesByKey = new Map<string, number[]>();
  points.forEach((point, index) => {
    const key = bucketKeyForPoint(point, kind);
    let indices = indicesByKey.get(key);
    if (!indices) {
      indices = [];
      indicesByKey.set(key, indices);
      order.push(key);
    }
    indices.push(index);
  });

  return order.map((key) => {
    const indices = indicesByKey.get(key)!;
    const startIdx = indices[0]!;
    const endIdx = indices[indices.length - 1]!;
    const bucketPoints = indices.map((index) => points[index]!);
    const first = bucketPoints[0]!;
    const last = bucketPoints[bucketPoints.length - 1]!;

    // Entry = MMR carried into the period; fall back to the period's own first
    // known MMR at the very start of history (nothing precedes it).
    const entryMmr =
      (startIdx > 0 ? lastMmr[startIdx - 1] : null) ??
      bucketPoints.find((point) => point.rank_mmr != null)?.rank_mmr ??
      null;
    const exitMmr = lastMmr[endIdx];

    let selection: PeriodSelection;
    let bounds: PeriodBounds;
    let label: string;
    if (kind === "session") {
      const session = sessions[first.session_index];
      const startIso = session?.start ?? first.replay_date;
      const endIso = session?.end ?? last.replay_date;
      selection = { kind: "session", anchor: startIso };
      bounds = sessionPeriodBounds(startIso, endIso);
      label = new Date(startIso).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } else {
      selection = { kind, anchor: key };
      bounds = periodBounds(selection)!;
      const dayLabel = bounds.after.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      label = kind === "day" ? dayLabel : `Week of ${dayLabel}`;
    }

    return {
      key: `${kind}-${key}`,
      label,
      start: bounds.after,
      x1: bounds.after.getTime(),
      x2: bounds.before.getTime(),
      games: bucketPoints.length,
      wins: bucketPoints.filter((point) => point.outcome === "win").length,
      losses: bucketPoints.filter((point) => point.outcome === "loss").length,
      startMmr: entryMmr,
      endMmr: exitMmr,
      href: periodScopedStatsHref(routeBasePath, search, selection, bounds),
    };
  });
}

interface TierBand {
  tier: number;
  y1: number;
  y2: number;
}

// Approximate MMR bands for the rank tiers visible in the data, inferred from
// the directly-submitted (mmr, tier) pairs: each boundary sits midway between
// adjacent tiers' observed ranges. Thresholds vary by playlist and season, so
// this is a per-view visual aid, not a lookup table.
function inferTierBands(points: PlayerTimelinePoint[], yMin: number, yMax: number): TierBand[] {
  const byTier = new Map<number, { min: number; max: number; count: number }>();
  for (const point of points) {
    if (point.rank_is_fallback || point.rank_mmr == null || point.rank_tier == null) continue;
    if (point.rank_tier <= 0) continue;
    const entry = byTier.get(point.rank_tier);
    if (entry) {
      entry.min = Math.min(entry.min, point.rank_mmr);
      entry.max = Math.max(entry.max, point.rank_mmr);
      entry.count += 1;
    } else {
      byTier.set(point.rank_tier, { min: point.rank_mmr, max: point.rank_mmr, count: 1 });
    }
  }
  const tiers = [...byTier.entries()]
    .filter(([, entry]) => entry.count >= 2)
    .sort(([a], [b]) => a - b);
  if (tiers.length < 2) return [];
  return tiers.map(([tier, entry], index) => {
    const lower = index === 0 ? yMin : (tiers[index - 1]![1].max + entry.min) / 2;
    const upper = index === tiers.length - 1 ? yMax : (entry.max + tiers[index + 1]![1].min) / 2;
    return { tier, y1: lower, y2: upper };
  });
}

interface ChartDatum {
  t: number;
  point: PlayerTimelinePoint;
  [seriesKey: string]: number | PlayerTimelinePoint | null | undefined;
}

function TimelineTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ChartDatum }>;
}) {
  const datum = active && payload && payload.length > 0 ? payload[0]!.payload : null;
  if (!datum) return null;
  const point = datum.point;
  const icon = point.rank_tier != null ? rankIconUrl(point.rank_tier) : null;
  const label = rankLabel(point.rank_tier, point.rank_division);
  return (
    <div className="chart-tooltip player-timeline-tooltip">
      <strong>
        {new Date(point.replay_date).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </strong>
      <div>
        {icon ? <img src={icon} alt="" width="18" height="18" /> : null}
        <span>
          {point.rank_mmr != null ? `${Math.round(point.rank_mmr)} MMR` : "No rank submitted"}
          {label ? ` · ${label}` : ""}
          {point.rank_is_fallback ? " · estimated from an earlier submission" : ""}
        </span>
      </div>
      <div>
        {point.playlist_group ?? "unknown playlist"}
        {point.outcome ? ` · ${point.outcome}` : ""}
        {point.season ? ` · ${formatSeasonCode(point.season)}` : ""}
      </div>
    </div>
  );
}

// Clickable period bands drawn over the plot, shaded per bucket and linked to
// the list below by hover. Rendered inside a recharts `Customized` slot so the
// v3 plot-area / x-scale hooks resolve against this chart's context.
function PeriodBands({
  rows,
  hoverKey,
  setHoverKey,
  onSelect,
}: {
  rows: BucketRow[];
  hoverKey: string | null;
  setHoverKey: Dispatch<SetStateAction<string | null>>;
  onSelect: (href: string) => void;
}) {
  const plot = usePlotArea();
  const scale = useXAxisScale();
  if (!plot || !scale) return null;
  const left = plot.x;
  const right = plot.x + plot.width;
  const toPixel = (value: number) => Math.max(left, Math.min(right, Number(scale(value))));
  return (
    <g>
      {rows.map((row, index) => {
        const a = toPixel(row.x1);
        const b = toPixel(row.x2);
        const bandLeft = Math.min(a, b);
        // Single-game sessions collapse to a hairline; keep a clickable minimum.
        const bandWidth = Math.max(Math.abs(b - a), 3);
        return (
          <rect
            key={`band-${row.key}`}
            x={bandLeft}
            y={plot.y}
            width={bandWidth}
            height={plot.height}
            className="player-timeline-band"
            fill={hoverKey === row.key ? bandHoverShade : bandShades[index % bandShades.length]}
            onClick={() => onSelect(row.href)}
            onMouseEnter={() => setHoverKey(row.key)}
            onMouseLeave={() => setHoverKey((current) => (current === row.key ? null : current))}
          />
        );
      })}
    </g>
  );
}

export function PlayerTimelineSection({
  platform,
  platformPlayerId,
  routeBasePath,
  requestSearch,
  search,
}: {
  platform: string;
  platformPlayerId: string;
  /** Normalized stats request params (team-size/game-type defaults applied). */
  requestSearch: string;
  /** The raw location search, used to build shareable stats links. */
  search: string;
  routeBasePath: string;
}) {
  const navigate = useNavigate();
  const [buckets, setBuckets] = useSearchParamState<BucketKind>(
    TIMELINE_BUCKETS_PARAM,
    "session",
    BUCKET_KINDS,
  );
  const [response, setResponse] = useState<PlayerTimelineResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // The period band / list row under the cursor, highlighted in both places so
  // the graph and the list read as one control.
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  // The chart window IS the active period: requestSearch already carries its
  // `replay-date-*` / `min/max-season` bounds (an unset period = all games).
  const requestKey = useMemo(
    () => stripTimelineViewParams(new URLSearchParams(requestSearch)).toString(),
    [requestSearch],
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getPlayerTimeline(platform, platformPlayerId, new URLSearchParams(requestKey))
      .then((timeline) => {
        if (!cancelled) setResponse(timeline);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [platform, platformPlayerId, requestKey]);

  const points = useMemo(() => response?.points ?? [], [response]);
  const sessions = useMemo(() => response?.sessions ?? [], [response]);

  // One line per playlist group, most games first, so the chart stays legible
  // when the mode filter is "all".
  const seriesGroups = useMemo(() => {
    const counts = new Map<string, number>();
    for (const point of points) {
      const group = point.playlist_group ?? "unknown";
      counts.set(group, (counts.get(group) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([group]) => group);
  }, [points]);

  const chartData = useMemo(
    () =>
      points
        .filter((point) => point.rank_mmr != null)
        .map((point) => ({
          t: new Date(point.replay_date).getTime(),
          point,
          [`mmr:${point.playlist_group ?? "unknown"}`]: point.rank_mmr,
        })) satisfies ChartDatum[],
    [points],
  );

  const mmrValues = chartData
    .map((datum) => datum.point.rank_mmr)
    .filter((value): value is number => value != null);
  const yMin = mmrValues.length > 0 ? Math.floor(Math.min(...mmrValues) / 20) * 20 - 20 : 0;
  const yMax = mmrValues.length > 0 ? Math.ceil(Math.max(...mmrValues) / 20) * 20 + 20 : 100;

  // Tier bands from the dominant playlist group only: MMR thresholds differ per
  // playlist, so mixing groups would smear the bands.
  const tierBands = useMemo(() => {
    if (seriesGroups.length === 0) return [];
    const dominant = seriesGroups[0]!;
    return inferTierBands(
      points.filter((point) => (point.playlist_group ?? "unknown") === dominant),
      yMin,
      yMax,
    );
  }, [points, seriesGroups, yMin, yMax]);

  const bucketRows = useMemo(() => {
    const rows = buildBucketRows(points, sessions, buckets, routeBasePath, search);
    // Most recent first for the list.
    return rows.sort((a, b) => b.start.getTime() - a.start.getTime());
  }, [buckets, points, routeBasePath, search, sessions]);

  return (
    <section className="stat-detail player-timeline">
      <header className="stat-detail-header">
        <div>
          <p className="eyebrow">Timeline</p>
          <h2>Rank over time</h2>
          <p>
            MMR per game over the selected <strong>Period</strong> above (all games when none is
            set). Toggle the granularity below to shade the chart by session, day, or week; click
            any band (or its row) to open the full career stat pages scoped to just that period.
          </p>
        </div>
      </header>

      {loading ? <p className="muted-text">Loading timeline…</p> : null}
      {error ? <p className="muted-text">Failed to load timeline: {error}</p> : null}
      {!loading && !error && points.length === 0 ? (
        <p className="muted-text">No games with a known play date match this period and filter.</p>
      ) : null}
      {response?.truncated ? (
        <p className="muted-text">
          Showing only the most recent {points.length.toLocaleString()} games of this period.
        </p>
      ) : null}

      {chartData.length > 0 ? (
        <div className="stat-panel player-timeline-chart">
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid stroke={chartGrid} vertical={false} />
              <XAxis
                dataKey="t"
                type="number"
                domain={["dataMin", "dataMax"]}
                scale="time"
                stroke={chartAxis}
                tickFormatter={(value: number) =>
                  new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                }
              />
              <YAxis
                domain={[yMin, yMax]}
                stroke={chartAxis}
                width={48}
                tickFormatter={(value: number) => String(Math.round(value))}
              />
              {tierBands.map((band, index) => (
                <ReferenceArea
                  key={`tier-${band.tier}`}
                  y1={band.y1}
                  y2={band.y2}
                  fill={tierShades[index % tierShades.length]}
                  stroke="none"
                  label={{
                    value: rankLabel(band.tier, null) ?? "",
                    position: "insideRight",
                    fill: chartAxis,
                    fontSize: 11,
                  }}
                />
              ))}
              <Customized
                component={
                  <PeriodBands
                    rows={bucketRows}
                    hoverKey={hoverKey}
                    setHoverKey={setHoverKey}
                    onSelect={(href) => navigate(href)}
                  />
                }
              />
              <Tooltip content={<TimelineTooltip />} />
              {seriesGroups.map((group, index) => (
                <Line
                  key={group}
                  type="monotone"
                  dataKey={`mmr:${group}`}
                  name={group}
                  stroke={seriesPalette[index % seriesPalette.length]}
                  strokeWidth={2}
                  connectNulls
                  isAnimationActive={false}
                  dot={({ key, cx, cy, payload }) =>
                    cx == null || cy == null ? (
                      <g key={key} />
                    ) : (
                      <circle
                        key={key}
                        cx={cx}
                        cy={cy}
                        r={2.5}
                        stroke={seriesPalette[index % seriesPalette.length]}
                        strokeWidth={1.5}
                        // Hollow dot: the rank was carried forward, not submitted
                        // with this game.
                        fill={
                          (payload as ChartDatum).point.rank_is_fallback
                            ? "#ffffff"
                            : seriesPalette[index % seriesPalette.length]
                        }
                      />
                    )
                  }
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          {seriesGroups.length > 1 ? (
            <div className="player-timeline-legend">
              {seriesGroups.map((group, index) => (
                <span key={group}>
                  <span
                    className="player-timeline-legend-swatch"
                    style={{ background: seriesPalette[index % seriesPalette.length] }}
                  />
                  {group}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {points.length > 0 ? (
        <section className="stat-panel">
          <div className="player-timeline-buckets-header">
            <h3>Periods</h3>
            <nav className="stat-group-nav" aria-label="Period granularity">
              {BUCKET_KINDS.map((kind) => (
                <button
                  key={kind}
                  type="button"
                  className={`stat-group-link ${buckets === kind ? "active" : ""}`}
                  onClick={() => setBuckets(kind)}
                >
                  {kind === "session" ? "Sessions" : kind === "day" ? "Days" : "Weeks"}
                </button>
              ))}
            </nav>
          </div>
          <div className="table-frame compact-table">
            <table>
              <thead>
                <tr>
                  <th>{buckets === "session" ? "Session" : buckets === "day" ? "Day" : "Week"}</th>
                  <th>Games</th>
                  <th>W – L</th>
                  <th>MMR (start → end)</th>
                  <th aria-label="Open period stats" />
                </tr>
              </thead>
              <tbody>
                {bucketRows.map((row) => {
                  const delta =
                    row.startMmr != null && row.endMmr != null
                      ? Math.round(row.endMmr - row.startMmr)
                      : null;
                  return (
                    <tr
                      key={row.key}
                      className={`player-timeline-row ${hoverKey === row.key ? "is-hovered" : ""}`}
                      onMouseEnter={() => setHoverKey(row.key)}
                      onMouseLeave={() =>
                        setHoverKey((current) => (current === row.key ? null : current))
                      }
                      onClick={() => navigate(row.href)}
                    >
                      <td>{row.label}</td>
                      <td>{row.games.toLocaleString()}</td>
                      <td>
                        {row.wins} – {row.losses}
                      </td>
                      <td>
                        {row.startMmr != null && row.endMmr != null ? (
                          <>
                            {Math.round(row.startMmr)} → {Math.round(row.endMmr)}
                            {delta != null && delta !== 0 ? (
                              <span className={delta > 0 ? "delta-positive" : "delta-negative"}>
                                {" "}
                                ({delta > 0 ? "+" : ""}
                                {delta})
                              </span>
                            ) : null}
                          </>
                        ) : row.endMmr != null ? (
                          Math.round(row.endMmr)
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>
                        <Link
                          className="primary-link"
                          to={row.href}
                          onClick={(event) => event.stopPropagation()}
                        >
                          View stats
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </section>
  );
}
