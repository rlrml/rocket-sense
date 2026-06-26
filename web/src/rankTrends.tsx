import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getRankTrends } from "./api";
import type { RankTrendMetric, RankTrendsResponse } from "./types";

const outcomeOptions = [
  { value: "all", label: "All games" },
  { value: "win", label: "Wins" },
  { value: "loss", label: "Losses" },
];

const rankGroupingOptions = [
  { value: "group", label: "Rank groups" },
  { value: "tier", label: "Exact tiers" },
];

function formatValue(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1000) return Math.round(value).toLocaleString();
  if (abs >= 100) return value.toFixed(0);
  if (abs >= 1) return value.toFixed(2);
  return value.toFixed(3);
}

function formatPlaylistGroup(key: string): string {
  // e.g. "ranked-2v2" -> "Ranked 2v2"
  return key
    .split("-")
    .map((part) => (/^\d/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
}

/** A small auto-scaled line chart of one metric across the rank ladder. */
function Sparkline({ metric, rankLabels }: { metric: RankTrendMetric; rankLabels: string[] }) {
  const width = 240;
  const height = 96;
  const padX = 10;
  const padY = 12;
  const n = metric.values.length;

  const finite = metric.values.filter((v): v is number => v != null && Number.isFinite(v));
  if (finite.length === 0) {
    return <div className="rank-trend-empty">No data</div>;
  }
  const min = Math.min(...finite);
  const max = Math.max(...finite);
  const span = max - min || 1;

  const x = (i: number) => (n <= 1 ? width / 2 : padX + (i / (n - 1)) * (width - 2 * padX));
  const y = (v: number) => height - padY - ((v - min) / span) * (height - 2 * padY);

  // Split into connected segments (skip null gaps).
  const segments: Array<Array<{ x: number; y: number }>> = [];
  let current: Array<{ x: number; y: number }> = [];
  metric.values.forEach((v, i) => {
    if (v == null || !Number.isFinite(v)) {
      if (current.length) segments.push(current);
      current = [];
    } else {
      current.push({ x: x(i), y: y(v) });
    }
  });
  if (current.length) segments.push(current);

  const firstFinite = metric.values.find((v) => v != null) ?? null;
  const lastFinite = [...metric.values].reverse().find((v) => v != null) ?? null;
  const direction =
    firstFinite != null && lastFinite != null
      ? lastFinite > firstFinite
        ? "up"
        : lastFinite < firstFinite
          ? "down"
          : "flat"
      : "flat";
  const stroke = direction === "up" ? "#0f766e" : direction === "down" ? "#7c3aed" : "#64748b";

  return (
    <svg
      className="rank-trend-spark"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${metric.label} across ranks`}
    >
      {segments.map((seg, si) => (
        <polyline
          key={si}
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          points={seg.map((p) => `${p.x},${p.y}`).join(" ")}
        />
      ))}
      {metric.values.map((v, i) =>
        v != null && Number.isFinite(v) ? (
          <circle key={i} cx={x(i)} cy={y(v)} r={2.6} fill={stroke}>
            <title>{`${rankLabels[i]}: ${formatValue(v)}`}</title>
          </circle>
        ) : null,
      )}
    </svg>
  );
}

function MetricCard({ metric, rankLabels }: { metric: RankTrendMetric; rankLabels: string[] }) {
  const finite = metric.values
    .map((v, i) => ({ v, i }))
    .filter((p): p is { v: number; i: number } => p.v != null && Number.isFinite(p.v));
  const first = finite[0];
  const last = finite[finite.length - 1];
  const change =
    first && last && first.v !== 0 ? ((last.v - first.v) / Math.abs(first.v)) * 100 : null;
  const arrow = last && first ? (last.v > first.v ? "▲" : last.v < first.v ? "▼" : "—") : "—";

  return (
    <div className="rank-trend-card">
      <div className="rank-trend-card-head">
        <span className="rank-trend-card-title" title={metric.key}>
          {metric.label}
        </span>
        {metric.aggregator === "mean" ? (
          <span className="rank-trend-badge" title="Served as a pooled average (rare metric)">
            avg
          </span>
        ) : null}
      </div>
      <Sparkline metric={metric} rankLabels={rankLabels} />
      <div className="rank-trend-card-foot">
        <span>
          {first ? formatValue(first.v) : "–"} → {last ? formatValue(last.v) : "–"}
        </span>
        {change != null ? (
          <span
            className={`rank-trend-change rank-trend-change-${arrow === "▲" ? "up" : arrow === "▼" ? "down" : "flat"}`}
          >
            {arrow} {Math.abs(change) >= 1 ? `${Math.round(Math.abs(change))}%` : "~0%"}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function RankTrendsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<RankTrendsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = searchParams.toString();
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getRankTrends(new URLSearchParams(query))
      .then((response) => {
        if (!cancelled) setData(response);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const rankLabels = useMemo(() => data?.ranks.map((r) => r.label) ?? [], [data]);
  const categories = useMemo(() => {
    if (!data) return [];
    const byCategory = new Map<string, RankTrendMetric[]>();
    for (const metric of data.metrics) {
      const list = byCategory.get(metric.category) ?? [];
      list.push(metric);
      byCategory.set(metric.category, list);
    }
    return [...byCategory.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [data]);

  return (
    <section className="page rank-trends-page">
      <header className="rank-trends-header">
        <div>
          <h1>Rank Trends</h1>
          <p className="rank-trends-subtitle">
            How every lifetime stat shifts across the rank ladder — the typical (or, for rare
            mechanics, average) value at each rank.
          </p>
        </div>
        <div className="rank-trends-controls">
          <label>
            <span>Mode</span>
            <select
              value={data?.playlist_group_key ?? ""}
              onChange={(e) => setParam("playlist-group", e.target.value)}
            >
              {(data?.available_playlist_groups ?? []).map((group) => (
                <option key={group} value={group}>
                  {formatPlaylistGroup(group)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Window</span>
            <select
              value={data?.window?.key ?? ""}
              onChange={(e) => setParam("window", e.target.value)}
            >
              {(data?.available_windows ?? []).map((w) => (
                <option key={w.key} value={w.key}>
                  {w.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Ranks</span>
            <select
              value={data?.rank_grouping ?? "group"}
              onChange={(e) => setParam("rank-grouping", e.target.value)}
            >
              {rankGroupingOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Outcome</span>
            <select
              value={data?.outcome ?? "all"}
              onChange={(e) => setParam("outcome", e.target.value)}
            >
              {outcomeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      {data && data.ranks.length > 0 ? (
        <div className="rank-trends-axis">
          <span className="rank-trends-axis-label">Ranks</span>
          {data.ranks.map((r) => (
            <span key={r.rank_value} className="rank-trends-axis-rank">
              {r.label}
              {r.distinct_player_count != null ? (
                <em>n={r.distinct_player_count.toLocaleString()}</em>
              ) : null}
            </span>
          ))}
        </div>
      ) : null}

      {error ? <div className="stat-empty">Couldn’t load rank trends: {error}</div> : null}
      {loading && !data ? <div className="stat-empty">Loading…</div> : null}
      {data && !loading && data.metrics.length === 0 ? (
        <div className="stat-empty">
          No benchmark data yet. The rank benchmark may not have been refreshed for this mode.
        </div>
      ) : null}

      {categories.map(([category, metrics]) => (
        <section key={category} className="rank-trend-category">
          <h2 className="rank-trend-category-title">{category}</h2>
          <div className="rank-trend-grid">
            {metrics.map((metric) => (
              <MetricCard key={metric.key} metric={metric} rankLabels={rankLabels} />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
