import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BatteryCharging,
  Gauge,
  Goal,
  Hand,
  type LucideIcon,
  Map as MapIcon,
  MapPinned,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { getRankTrends } from "./api";
import { rankGroupIconUrl, rankIconUrl } from "./rank";
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

// A representative cross-section shown by default (search reveals all 80+).
const FEATURED_KEYS = [
  "goal",
  "save",
  "shot",
  "assist",
  "demolition",
  "touch",
  "speed_flip",
  "air_dribble",
  "flip_reset",
  "double_tap",
  "flick",
  "movement:avg_speed",
  "fact:ball-advance",
  "boost:collected",
  "positioning:behind_ball_share",
  "goaltag:high_aerial_goal",
  "goaltag:flip_reset_goal",
];

// Category sub-pages, aligned with the career-stats stat groups.
interface TrendSection {
  id: string;
  label: string;
  icon: LucideIcon;
}
const SECTIONS: TrendSection[] = [
  { id: "featured", label: "Featured", icon: Star },
  { id: "core", label: "Core", icon: Trophy },
  { id: "goals", label: "Scoring", icon: Goal },
  { id: "mechanics", label: "Mechanics", icon: Sparkles },
  { id: "movement", label: "Movement", icon: Gauge },
  { id: "boost", label: "Boost", icon: BatteryCharging },
  { id: "positioning", label: "Positioning", icon: MapPinned },
  { id: "possession", label: "Possession", icon: MapIcon },
  { id: "touches", label: "Touches", icon: Hand },
];

// Map a metric to its sub-page (roughly the career-stats grouping).
function metricSection(metric: RankTrendMetric): string {
  const key = metric.key;
  if (key.startsWith("goaltag:")) return "goals";
  if (key.startsWith("boost:")) return "boost";
  if (key.startsWith("movement:")) return "movement";
  if (key.startsWith("possession:")) return "possession";
  if (key.startsWith("positioning:")) return "positioning";
  if (key.startsWith("fact:")) return "touches";
  if (key === "boost_pickup" || key === "boost_respawn") return "boost";
  if (key === "possession" || key === "player_possession" || key === "controlled_play")
    return "possession";
  if (key === "touch" || key === "center") return "touches";
  if (metric.category === "mechanic") return "mechanics";
  if (metric.category === "positioning") return "positioning";
  return "core";
}

// Clearer display labels than the auto-humanized key suffix (e.g. "Count").
const LABEL_OVERRIDES: Record<string, string> = {
  "possession:count": "Possessions",
  "possession:touch_count": "Possession Touches",
  "possession:advance_distance": "Ball Advance (possession)",
  "possession:duration_share": "Time in Possession",
  "possession:carry_time_share": "Carry Time",
  "possession:air_dribble_time_share": "Air Dribble Time",
  "boost:avg_amount": "Average Boost",
  "boost:collected": "Boost Collected",
  "boost:big_pads": "Big Pads",
  "boost:small_pads": "Small Pads",
  "movement:avg_speed": "Average Speed",
  "movement:powerslides": "Powerslides",
  "movement:distance": "Distance Travelled",
  "fact:ball-advance": "Ball Advanced",
  "fact:high-aerial-touch-count": "High Aerial Touches",
  "fact:control-touch-count": "Control Touches",
  "fact:possession-time": "Possession Time",
  "positioning:distance_to_ball": "Distance to Ball",
};

function displayLabel(metric: RankTrendMetric): string {
  const override = LABEL_OVERRIDES[metric.key];
  if (override) return override;
  // The "% of time" unit already conveys "share"; drop the redundant suffix.
  return metric.label.replace(/ Share$/, "");
}

interface MetricFormat {
  unit: string;
  // Scale applied to the stored value before display (rates are stored per
  // active minute; the app shows player rates per 5 minutes).
  scale: number;
  format: (value: number) => string;
}

function numberFormat(v: number): string {
  const abs = Math.abs(v);
  if (abs >= 1000) return Math.round(v).toLocaleString();
  if (abs >= 100) return v.toFixed(0);
  if (abs >= 1) return v.toFixed(2);
  return v.toFixed(3);
}

function metricFormat(key: string): MetricFormat {
  // Gauges and shares are levels, not rates — never scaled to a time window.
  if (key.endsWith("_share")) {
    return { unit: "% of time", scale: 1, format: (v) => `${(v * 100).toFixed(1)}%` };
  }
  if (key === "movement:avg_speed") {
    return { unit: "uu/s", scale: 1, format: (v) => Math.round(v).toLocaleString() };
  }
  if (key === "positioning:distance_to_ball") {
    return { unit: "uu", scale: 1, format: (v) => Math.round(v).toLocaleString() };
  }
  if (key === "boost:avg_amount") {
    return { unit: "avg boost", scale: 1, format: (v) => v.toFixed(0) };
  }
  // Counts / per-minute rates -> shown per 5 minutes, like the rest of the app.
  return { unit: "per 5 min", scale: 5, format: numberFormat };
}

function formatPlaylistGroup(key: string): string {
  return key
    .split("-")
    .map((part) => (/^\d/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
}

interface RankAxisEntry {
  label: string;
  count: number | null;
  iconUrl: string | null;
}

// Compact rank labels for the x-axis (full names are cramped under the icons).
function shortRankLabel(label: string): string {
  if (label === "Supersonic Legend") return "SSL";
  if (label.startsWith("Grand Champion")) return label.replace("Grand Champion", "GC");
  return label;
}

/** One full-width line chart of a metric across the rank ladder. */
function MetricChart({ metric, rankAxis }: { metric: RankTrendMetric; rankAxis: RankAxisEntry[] }) {
  const fmt = metricFormat(metric.key);
  const values = metric.values.map((v) =>
    v == null || !Number.isFinite(v) ? null : v * fmt.scale,
  );
  const W = 1000;
  const H = 300;
  const m = { left: 84, right: 40, top: 24, bottom: 84 };
  const plotW = W - m.left - m.right;
  const plotH = H - m.top - m.bottom;
  const n = values.length;

  const finite = values.filter((v): v is number => v != null && Number.isFinite(v));
  const hasData = finite.length > 0;
  const rawMin = hasData ? Math.min(...finite) : 0;
  const rawMax = hasData ? Math.max(...finite) : 1;
  const pad = (rawMax - rawMin || Math.abs(rawMax) || 1) * 0.12;
  const yMin = rawMin - pad;
  const yMax = rawMax + pad;
  const ySpan = yMax - yMin || 1;

  const x = (i: number) => (n <= 1 ? m.left + plotW / 2 : m.left + (i / (n - 1)) * plotW);
  const y = (v: number) => m.top + plotH - ((v - yMin) / ySpan) * plotH;

  const tickCount = 4;
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => yMin + (ySpan * i) / tickCount);

  const first = values.find((v) => v != null) ?? null;
  const last = [...values].reverse().find((v) => v != null) ?? null;
  const direction =
    first != null && last != null ? (last > first ? "up" : last < first ? "down" : "flat") : "flat";
  const stroke = direction === "up" ? "#0f766e" : direction === "down" ? "#7c3aed" : "#64748b";

  // Connected segments (skip null gaps).
  const segments: string[] = [];
  let current: string[] = [];
  values.forEach((v, i) => {
    if (v == null || !Number.isFinite(v)) {
      if (current.length) segments.push(current.join(" "));
      current = [];
    } else {
      current.push(`${x(i)},${y(v)}`);
    }
  });
  if (current.length) segments.push(current.join(" "));

  return (
    <svg
      className="rank-trend-chart"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`${displayLabel(metric)} across ranks (${fmt.unit})`}
    >
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={m.left} x2={W - m.right} y1={y(t)} y2={y(t)} stroke="#eef2f7" strokeWidth={1} />
          <text x={m.left - 10} y={y(t) + 4} textAnchor="end" className="rank-trend-ytick">
            {fmt.format(t)}
          </text>
        </g>
      ))}
      <text
        transform={`translate(20 ${m.top + plotH / 2}) rotate(-90)`}
        textAnchor="middle"
        className="rank-trend-axis-title"
      >
        {fmt.unit}
      </text>

      {rankAxis.map((rank, i) => (
        <g key={i}>
          <line
            x1={x(i)}
            x2={x(i)}
            y1={m.top}
            y2={m.top + plotH}
            stroke="#f5f7fa"
            strokeWidth={1}
          />
          {rank.iconUrl ? (
            <image href={rank.iconUrl} x={x(i) - 18} y={m.top + plotH + 8} width={36} height={36} />
          ) : null}
          <text x={x(i)} y={m.top + plotH + 58} textAnchor="middle" className="rank-trend-xlabel">
            {rank.label}
          </text>
          {rank.count != null ? (
            <text x={x(i)} y={m.top + plotH + 72} textAnchor="middle" className="rank-trend-xcount">
              n={rank.count.toLocaleString()}
            </text>
          ) : null}
        </g>
      ))}

      {hasData ? (
        <>
          {segments.map((pts, si) => (
            <polyline key={si} fill="none" stroke={stroke} strokeWidth={2.5} points={pts} />
          ))}
          {values.map((v, i) =>
            v != null && Number.isFinite(v) ? (
              <g key={i}>
                <circle cx={x(i)} cy={y(v)} r={4} fill={stroke} />
                <text x={x(i)} y={y(v) - 10} textAnchor="middle" className="rank-trend-point">
                  {fmt.format(v)}
                </text>
              </g>
            ) : null,
          )}
        </>
      ) : (
        <text x={W / 2} y={H / 2} textAnchor="middle" className="rank-trend-xlabel">
          No data
        </text>
      )}
    </svg>
  );
}

function MetricCard({ metric, rankAxis }: { metric: RankTrendMetric; rankAxis: RankAxisEntry[] }) {
  return (
    <div className="rank-trend-card">
      <div className="rank-trend-card-head">
        <h3 className="rank-trend-card-title" title={metric.key}>
          {displayLabel(metric)}
        </h3>
        <span className="rank-trend-card-meta">
          <span className="rank-trend-tag">{metric.category}</span>
          <span
            className="rank-trend-agg"
            title={
              metric.aggregator === "mean"
                ? "Pooled average (rare metric — the median would be 0)"
                : "Median of the typical player at each rank"
            }
          >
            {metric.aggregator === "mean" ? "average" : "median"}
          </span>
        </span>
      </div>
      <MetricChart metric={metric} rankAxis={rankAxis} />
    </div>
  );
}

export function RankTrendsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<RankTrendsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("featured");

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

  const rankAxis: RankAxisEntry[] = useMemo(() => {
    if (!data) return [];
    const grouping = data.rank_grouping;
    return data.ranks.map((r) => ({
      label: shortRankLabel(r.label),
      count: r.distinct_player_count,
      iconUrl: grouping === "group" ? rankGroupIconUrl(r.rank_value) : rankIconUrl(r.rank_value),
    }));
  }, [data]);

  // Which sub-pages actually have metrics (always offer Featured).
  const sectionCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const metric of data?.metrics ?? []) {
      const id = metricSection(metric);
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    return counts;
  }, [data]);
  const sections = useMemo(
    () => SECTIONS.filter((s) => s.id === "featured" || (sectionCounts.get(s.id) ?? 0) > 0),
    [sectionCounts],
  );

  const visibleMetrics: RankTrendMetric[] = useMemo(() => {
    if (!data) return [];
    const term = search.trim().toLowerCase();
    if (term) {
      // Search spans every sub-page.
      return data.metrics
        .filter(
          (metric) =>
            metric.label.toLowerCase().includes(term) ||
            metric.key.toLowerCase().includes(term) ||
            metric.category.toLowerCase().includes(term),
        )
        .sort((a, b) => a.category.localeCompare(b.category) || a.label.localeCompare(b.label));
    }
    if (section === "featured") {
      const order = new Map(FEATURED_KEYS.map((key, i) => [key, i]));
      return data.metrics
        .filter((metric) => order.has(metric.key))
        .sort((a, b) => (order.get(a.key) ?? 0) - (order.get(b.key) ?? 0));
    }
    return data.metrics
      .filter((metric) => metricSection(metric) === section)
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [data, search, section]);

  const total = data?.metrics.length ?? 0;

  return (
    <section className="page rank-trends-page">
      <header className="rank-trends-header">
        <div>
          <h1>Rank Trends</h1>
          <p className="rank-trends-subtitle">
            How a stat changes across the rank ladder — the typical value (or, for rare mechanics,
            the average) at each rank.
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

      <nav className="stat-group-nav rank-trends-tabs" aria-label="Rank trend categories">
        {sections.map((s) => {
          const Icon = s.icon;
          const active = !search.trim() && section === s.id;
          return (
            <button
              key={s.id}
              type="button"
              className={`stat-group-link ${active ? "active" : ""}`}
              onClick={() => {
                setSearch("");
                setSection(s.id);
              }}
            >
              <Icon size={16} aria-hidden />
              <span>{s.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="rank-trends-searchbar">
        <input
          type="search"
          className="rank-trends-search"
          placeholder="Search every stat (e.g. flip reset, boost, speed, behind ball)…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="rank-trends-count">
          {search.trim()
            ? `${visibleMetrics.length} of ${total} stats`
            : `${visibleMetrics.length} stats · search spans all ${total}`}
        </span>
      </div>

      {error ? <div className="stat-empty">Couldn’t load rank trends: {error}</div> : null}
      {loading && !data ? <div className="stat-empty">Loading…</div> : null}
      {data && !loading && total === 0 ? (
        <div className="stat-empty">No benchmark data yet for this mode.</div>
      ) : null}
      {data && !loading && total > 0 && visibleMetrics.length === 0 ? (
        <div className="stat-empty">No stats match “{search}”.</div>
      ) : null}

      <div className="rank-trend-list">
        {visibleMetrics.map((metric) => (
          <MetricCard key={metric.key} metric={metric} rankAxis={rankAxis} />
        ))}
      </div>
    </section>
  );
}
