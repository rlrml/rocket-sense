import { Search, X } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import type {
  PlayerBoostTotal,
  StatAggregateGroupResponse,
  StatAggregateSetResponse,
  TouchAggregateBreakdownResponse,
} from "../types";
import { formatBoostPercent } from "./boostUnits";
import type {
  LeaderboardMeasure,
  LeaderboardMetric,
  LeaderboardParticipant,
} from "./groupLeaderboard";
import { LEADERBOARD_MEASURES } from "./groupLeaderboard";
import {
  buildKickoffMetrics,
  type KickoffLeaderboardPlayerMeta,
  type PlayerKickoffSummary,
} from "./kickoffs";
import { careerCohortClassName, SegmentedBar, StatPlayerLabel } from "./shared";

/**
 * The group stat explorer: one searchable catalogue of every per-player metric we
 * can rank for a group, rendered as a custom table. Pick any combination of
 * stats and each becomes a sortable column (players are the rows). This replaces
 * the old per-section group leaderboards — there are no subsections, just one
 * picker over scoring / aerials / touches / movement / boost / kickoffs /
 * positioning metrics.
 *
 * Metrics come from three sources, all joined on the `platform:id` identity:
 *  - the group-by=player aggregate block (every flat event count, as a rate),
 *  - derived ratios computable from that block (shooting %, time-share, ...),
 *  - the event-derived kickoff summaries and per-player boost totals.
 */

export function identityKey(
  platform: string | null | undefined,
  platformPlayerId: string | null | undefined,
): string | null {
  if (!platform || !platformPlayerId) return null;
  return `${platform.toLowerCase()}:${platformPlayerId}`;
}

function aggregateIdentity(group: StatAggregateGroupResponse): string | null {
  return identityKey(group.player?.platform, group.player?.platform_player_id);
}

// Friendlier top-level buckets for the picker than the raw backend categories.
// The backend tags by coarse `category` (core/basic/mechanic/...); we re-bucket a
// handful of well-known keys so e.g. Wall Shot / Ceiling Shot land under Aerials
// instead of leaking into Scoring.
const STAT_KEY_CATEGORY: Record<string, string> = {
  goal: "Scoring",
  shot: "Scoring",
  save: "Scoring",
  assist: "Scoring",
  demolition: "Scoring",
  death: "Scoring",
  air_dribble: "Aerials",
  wall_aerial: "Aerials",
  wall_aerial_shot: "Aerials",
  flip_reset: "Aerials",
  ceiling_shot: "Aerials",
  double_tap: "Aerials",
  dodge_reset: "Aerials",
  flick: "Aerials",
  half_volley: "Aerials",
  touch: "Touches",
  backboard_bounce: "Touches",
  center: "Touches",
  controlled_play: "Touches",
  fifty_fifty: "Touches",
  whiff: "Touches",
  bump: "Touches",
  speed_flip: "Movement",
  wavedash: "Movement",
  half_flip: "Movement",
  dodge: "Movement",
  powerslide: "Movement",
  boost_pickup: "Boost",
  boost_respawn: "Boost",
  kickoff: "Kickoffs",
  possession: "Possession",
  player_possession: "Possession",
  ball_carry: "Possession",
  depth_role: "Positioning",
  positioning_distance: "Positioning",
  player_activity: "Positioning",
  shadow_defense: "Positioning",
};

const CATEGORY_ORDER = [
  "Scoring",
  "Kickoffs",
  "Aerials",
  "Touches",
  "Possession",
  "Positioning",
  "Movement",
  "Boost",
  "Other",
];

function categoryForStat(key: string, backendCategory: string): string {
  if (STAT_KEY_CATEGORY[key]) return STAT_KEY_CATEGORY[key];
  if (backendCategory === "mechanic") return "Movement";
  if (backendCategory === "positioning") return "Positioning";
  if (backendCategory === "core") return "Scoring";
  return "Other";
}

function formatCount(value: number, measure: LeaderboardMeasure): string {
  if (measure === "total") return Math.round(value).toLocaleString();
  if (value >= 100) return value.toFixed(0);
  if (value >= 10) return value.toFixed(1);
  return value.toFixed(2);
}

function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

function formatRate(value: number): string {
  if (value >= 100) return value.toFixed(0);
  if (value >= 10) return value.toFixed(1);
  if (value >= 1) return value.toFixed(2);
  return value.toFixed(3);
}

function statValue(
  stat: { event_count: number; count_per_game: number; per_active_minute: number | null },
  measure: LeaderboardMeasure,
): number {
  if (measure === "total") return stat.event_count;
  if (measure === "perGame") return stat.count_per_game;
  return (stat.per_active_minute ?? 0) * 5;
}

interface GroupMetricSources {
  aggregates: StatAggregateSetResponse | null;
  kickoffSummaries: Map<string, PlayerKickoffSummary>;
  boost: Map<string, PlayerBoostTotal>;
  /** Per-player touch breakdown (group-scoped), for location/kind touch splits. */
  touch: Map<string, TouchAggregateBreakdownResponse>;
}

/** Player-cohort touch count for one breakdown dimension value (e.g. location=aerial). */
function touchDimensionCount(
  breakdown: TouchAggregateBreakdownResponse,
  dimension: string,
  value: string,
): number | null {
  const cohort = breakdown.cohorts.find((entry) => entry.key === "player");
  const dim = cohort?.dimensions.find((entry) => entry.key === dimension);
  const match = dim?.values.find((entry) => entry.key === value);
  return match ? match.touch_count : null;
}

/** Assemble every available per-player metric, joined on the identity key. */
export function buildGroupStatMetrics({
  aggregates,
  kickoffSummaries,
  boost,
  touch,
}: GroupMetricSources): LeaderboardMetric[] {
  const metrics: LeaderboardMetric[] = [];
  const aggByIdentity = new Map<string, StatAggregateGroupResponse>();
  for (const group of aggregates?.groups ?? []) {
    const id = aggregateIdentity(group);
    if (id) aggByIdentity.set(id, group);
  }
  const gameMeta = (id: string): KickoffLeaderboardPlayerMeta | undefined => {
    const group = aggByIdentity.get(id);
    if (!group) return undefined;
    return { activeSeconds: group.active_time_seconds, games: group.replay_count };
  };

  // 1) Flat aggregate stats — every countable event becomes a measurable column.
  const seen = new Map<string, { display_name: string; category: string }>();
  for (const group of aggByIdentity.values()) {
    for (const stat of group.stats) {
      if (stat.category === "context") continue;
      if (!seen.has(stat.key))
        seen.set(stat.key, { display_name: stat.display_name, category: stat.category });
    }
  }
  for (const [key, meta] of seen) {
    metrics.push({
      key: `stat:${key}`,
      label: meta.display_name,
      group: categoryForStat(key, meta.category),
      measurable: true,
      format: (value, measure) => formatCount(value, measure ?? "per5m"),
      value: (participantKey, measure) => {
        const group = aggByIdentity.get(participantKey);
        if (!group) return null;
        const stat = group.stats.find((candidate) => candidate.key === key);
        return stat ? statValue(stat, measure) : 0;
      },
    });
  }

  // 2) Derived ratios computable straight from the block.
  const aggStat = (id: string, key: string) =>
    aggByIdentity.get(id)?.stats.find((s) => s.key === key) ?? null;
  metrics.push({
    key: "derived:shooting_pct",
    label: "Shooting %",
    group: "Scoring",
    format: formatPercent,
    value: (id) => {
      const goals = aggStat(id, "goal")?.event_count ?? 0;
      const shots = aggStat(id, "shot")?.event_count ?? 0;
      return shots > 0 ? (goals / shots) * 100 : null;
    },
  });
  const timeShare = (id: string, field: "time_most_back_seconds" | "time_most_forward_seconds") => {
    const group = aggByIdentity.get(id);
    const active = group?.active_time_seconds ?? null;
    const seconds = group?.[field] ?? null;
    return active && active > 0 && seconds != null ? (seconds / active) * 100 : null;
  };
  metrics.push({
    key: "derived:most_back_pct",
    label: "% time most back",
    group: "Positioning",
    format: formatPercent,
    value: (id) => timeShare(id, "time_most_back_seconds"),
  });
  metrics.push({
    key: "derived:most_forward_pct",
    label: "% time most forward",
    group: "Positioning",
    format: formatPercent,
    value: (id) => timeShare(id, "time_most_forward_seconds"),
  });

  // 3) Event-derived kickoff metrics (already keyed by identity).
  for (const metric of buildKickoffMetrics(kickoffSummaries, gameMeta)) {
    metrics.push({ ...metric, key: `kickoff:${metric.key}`, group: "Kickoffs" });
  }

  // 4) Per-player boost totals (group-scoped) — BPM and pad rates.
  if (boost.size > 0) {
    const boostOf = (id: string) => boost.get(id) ?? null;
    const rateMetric = (
      key: string,
      label: string,
      pick: (total: PlayerBoostTotal) => number,
    ): LeaderboardMetric => ({
      key: `boost:${key}`,
      label,
      group: "Boost",
      measurable: true,
      format: (value, measure) => formatCount(value, measure ?? "per5m"),
      value: (id, measure) => {
        const total = boostOf(id);
        if (!total) return null;
        const raw = pick(total);
        if (measure === "total") return raw;
        if (measure === "perGame") {
          const games = gameMeta(id)?.games ?? null;
          return games && games > 0 ? raw / games : null;
        }
        return total.tracked_seconds > 0 ? (raw / total.tracked_seconds) * 300 : null;
      },
    });
    metrics.push({
      key: "boost:bpm",
      label: "BPM (boost used / min)",
      group: "Boost",
      format: formatRate,
      value: (id) => {
        const total = boostOf(id);
        return total && total.tracked_seconds > 0
          ? (total.boost_used / total.tracked_seconds) * 60
          : null;
      },
    });
    metrics.push(rateMetric("used", "Boost used", (t) => t.boost_used));
    metrics.push(rateMetric("collected", "Boost collected", (t) => t.boost_collected));
    metrics.push(rateMetric("big_pads", "Big pads", (t) => t.big_pads));
    metrics.push(rateMetric("small_pads", "Small pads", (t) => t.small_pads));
    metrics.push(
      rateMetric("big_pads_offensive", "Big pads (offensive)", (t) => t.big_pads_offensive),
    );
    metrics.push(rateMetric("stolen_pads", "Stolen pads", (t) => t.stolen_pads));
    metrics.push(rateMetric("overfill", "Boost overfill", (t) => t.boost_overfill));
    metrics.push(
      rateMetric("supersonic_used", "Supersonic boost used", (t) => t.boost_used_supersonic),
    );
    metrics.push({
      key: "boost:avg",
      label: "Avg boost",
      group: "Boost",
      format: (value) => formatBoostPercent(value),
      value: (id) => {
        const total = boostOf(id);
        return total && total.tracked_seconds > 0
          ? total.boost_amount_weighted_sum / total.tracked_seconds
          : null;
      },
    });
    metrics.push({
      key: "boost:time_empty",
      label: "Time at 0 boost",
      group: "Boost",
      format: formatPercent,
      value: (id) => {
        const total = boostOf(id);
        return total && total.tracked_seconds > 0
          ? (total.time_empty / total.tracked_seconds) * 100
          : null;
      },
    });
  }

  // 5) Per-player touch breakdown (group-scoped) — location/kind touch splits the
  // flat `touch` count can't provide. Rated against the same active-time base as
  // the other count stats so the per-5m toggle stays consistent.
  if (touch.size > 0) {
    const touchCountMetric = (
      key: string,
      label: string,
      dimension: string,
      value: string,
    ): LeaderboardMetric => ({
      key: `touch:${key}`,
      label,
      group: "Touches",
      measurable: true,
      format: (raw, measure) => formatCount(raw, measure ?? "per5m"),
      value: (id, measure) => {
        const breakdown = touch.get(id);
        if (!breakdown) return null;
        const raw = touchDimensionCount(breakdown, dimension, value);
        if (raw == null) return null;
        if (measure === "total") return raw;
        const meta = gameMeta(id);
        if (measure === "perGame") {
          const games = meta?.games ?? null;
          return games && games > 0 ? raw / games : null;
        }
        const seconds = meta?.activeSeconds ?? null;
        return seconds && seconds > 0 ? (raw / seconds) * 300 : null;
      },
    });
    metrics.push(touchCountMetric("aerial", "Aerial touches", "location", "aerial"));
    metrics.push(touchCountMetric("high_aerial", "High aerial touches", "location", "high_aerial"));
    metrics.push(touchCountMetric("wall", "Wall touches", "location", "wall"));
    metrics.push(touchCountMetric("ground", "Ground touches", "location", "ground"));
  }

  return metrics;
}

function sortCategories(
  metrics: LeaderboardMetric[],
): Array<{ category: string; metrics: LeaderboardMetric[] }> {
  const byCategory = new Map<string, LeaderboardMetric[]>();
  for (const metric of metrics) {
    const category = metric.group ?? "Other";
    if (!byCategory.has(category)) byCategory.set(category, []);
    byCategory.get(category)!.push(metric);
  }
  const ordered = [...byCategory.keys()].sort((left, right) => {
    const li = CATEGORY_ORDER.indexOf(left);
    const ri = CATEGORY_ORDER.indexOf(right);
    return (li === -1 ? 99 : li) - (ri === -1 ? 99 : ri) || left.localeCompare(right);
  });
  return ordered.map((category) => ({ category, metrics: byCategory.get(category)! }));
}

const DEFAULT_COLUMN_PREFERENCES = [
  "stat:goal",
  "stat:save",
  "stat:shot",
  "stat:demolition",
  "stat:touch",
  "kickoff:kickoff_goal_share",
];

export function GroupStatExplorer({
  participants,
  metrics,
  title = "Group stats",
  emptyLabel = "No per-player stats are available for this group yet.",
}: {
  participants: LeaderboardParticipant[];
  metrics: LeaderboardMetric[];
  title?: ReactNode;
  emptyLabel?: ReactNode;
}) {
  const metricByKey = useMemo(
    () => new Map(metrics.map((metric) => [metric.key, metric])),
    [metrics],
  );
  const categories = useMemo(() => sortCategories(metrics), [metrics]);

  const defaultColumns = useMemo(() => {
    const preferred = DEFAULT_COLUMN_PREFERENCES.filter((key) => metricByKey.has(key));
    if (preferred.length > 0) return preferred.slice(0, 6);
    return metrics.slice(0, 5).map((metric) => metric.key);
  }, [metricByKey, metrics]);

  const [selected, setSelected] = useState<string[] | null>(null);
  const columns = (selected ?? defaultColumns).filter((key) => metricByKey.has(key));
  const [measure, setMeasure] = useState<LeaderboardMeasure>("per5m");
  const [search, setSearch] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);

  const toggleColumn = (key: string) => {
    setSelected((current) => {
      const base = (current ?? defaultColumns).filter((entry) => metricByKey.has(entry));
      return base.includes(key) ? base.filter((entry) => entry !== key) : [...base, key];
    });
  };

  const activeSort =
    sort && metricByKey.has(sort.key)
      ? sort
      : columns[0]
        ? { key: columns[0], dir: "desc" as const }
        : null;
  const hasMeasurableColumn = columns.some((key) => metricByKey.get(key)?.measurable);

  const rows = useMemo(() => {
    const computed = participants.map((participant) => {
      const values = new Map<string, number | null>();
      for (const key of columns) {
        values.set(key, metricByKey.get(key)?.value(participant.key, measure) ?? null);
      }
      return { participant, values };
    });
    if (activeSort) {
      const metric = metricByKey.get(activeSort.key);
      const lowerIsBetter = metric?.lowerIsBetter ?? false;
      computed.sort((left, right) => {
        const lv = left.values.get(activeSort.key);
        const rv = right.values.get(activeSort.key);
        if (lv == null && rv == null) return 0;
        if (lv == null) return 1;
        if (rv == null) return -1;
        const diff = activeSort.dir === "asc" ? lv - rv : rv - lv;
        return diff;
      });
      // For "best first" semantics the default desc already surfaces the top; the
      // lowerIsBetter flag only flips the implied "good" direction, not the toggle.
      void lowerIsBetter;
    }
    return computed;
  }, [participants, columns, metricByKey, measure, activeSort]);

  const columnMax = useMemo(() => {
    const max = new Map<string, number>();
    for (const key of columns) {
      let value = 0;
      for (const row of rows) {
        const cell = row.values.get(key);
        if (cell != null && Number.isFinite(cell)) value = Math.max(value, Math.abs(cell));
      }
      max.set(key, value || 1);
    }
    return max;
  }, [columns, rows]);

  const onHeaderClick = (key: string) => {
    setSort((current) =>
      current && current.key === key
        ? { key, dir: current.dir === "desc" ? "asc" : "desc" }
        : { key, dir: "desc" },
    );
  };

  const filteredCategories = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return categories;
    return categories
      .map((entry) => ({
        category: entry.category,
        metrics: entry.metrics.filter((metric) => metric.label.toLowerCase().includes(needle)),
      }))
      .filter((entry) => entry.metrics.length > 0);
  }, [categories, search]);

  return (
    <section className="stat-panel full-span group-stat-explorer">
      <div className="stat-panel-heading">
        <h3>{title}</h3>
        <span>{participants.length.toLocaleString()} players</span>
      </div>

      <div className="gse-controls">
        <button
          type="button"
          className={`gse-picker-toggle${pickerOpen ? " active" : ""}`}
          onClick={() => setPickerOpen((open) => !open)}
        >
          <Search size={14} />
          Add stats
          <span className="gse-column-count">{columns.length}</span>
        </button>
        <div className="leaderboard-measure-toggle" role="group" aria-label="Measure">
          {LEADERBOARD_MEASURES.map((entry) => (
            <button
              key={entry.key}
              type="button"
              className={`leaderboard-measure-button${entry.key === measure ? " active" : ""}`}
              onClick={() => setMeasure(entry.key)}
              disabled={!hasMeasurableColumn}
              title={hasMeasurableColumn ? undefined : "Add a count stat to switch measures"}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>

      {pickerOpen ? (
        <div className="gse-picker">
          <label className="gse-search">
            <Search size={14} />
            <input
              type="text"
              value={search}
              placeholder="Search stats…"
              onChange={(event) => setSearch(event.target.value)}
              autoFocus
            />
          </label>
          <div className="gse-picker-groups">
            {filteredCategories.map((entry) => (
              <div className="gse-picker-group" key={entry.category}>
                <div className="gse-picker-group-label">{entry.category}</div>
                <div className="gse-picker-options">
                  {entry.metrics.map((metric) => {
                    const checked = columns.includes(metric.key);
                    return (
                      <button
                        key={metric.key}
                        type="button"
                        className={`gse-option${checked ? " checked" : ""}`}
                        onClick={() => toggleColumn(metric.key)}
                      >
                        {metric.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {filteredCategories.length === 0 ? (
              <div className="stat-empty">No stats match “{search}”.</div>
            ) : null}
          </div>
        </div>
      ) : null}

      {columns.length > 0 ? (
        <div className="gse-chips" aria-label="Selected stats">
          {columns.map((key) => {
            const metric = metricByKey.get(key);
            if (!metric) return null;
            return (
              <button
                key={key}
                type="button"
                className="gse-chip"
                onClick={() => toggleColumn(key)}
                title="Remove column"
              >
                {metric.label}
                <X size={12} />
              </button>
            );
          })}
        </div>
      ) : null}

      {participants.length === 0 ? (
        <div className="stat-empty">{emptyLabel}</div>
      ) : columns.length === 0 ? (
        <div className="stat-empty">Add a stat to build the table.</div>
      ) : (
        <div className="table-frame gse-table-frame">
          <table className="gse-table">
            <thead>
              <tr>
                <th className="gse-player-col">Player</th>
                {columns.map((key) => {
                  const metric = metricByKey.get(key)!;
                  const isSorted = activeSort?.key === key;
                  return (
                    <th key={key}>
                      <button
                        type="button"
                        className="gse-sort-header"
                        onClick={() => onHeaderClick(key)}
                      >
                        <span>{metric.label}</span>
                        <span className="gse-sort-arrow">
                          {isSorted ? (activeSort?.dir === "asc" ? "▲" : "▼") : ""}
                        </span>
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ participant, values }) => {
                const cohort = careerCohortClassName(participant.cohort ?? "player");
                return (
                  <tr key={participant.key}>
                    <td className="gse-player-col">
                      <StatPlayerLabel
                        className={cohort}
                        inline
                        name={participant.name}
                        platform={participant.platform}
                        platformPlayerId={participant.platformPlayerId}
                        profilePath={participant.profilePath}
                        rank={participant.rank}
                        subtitle=""
                      />
                    </td>
                    {columns.map((key) => {
                      const metric = metricByKey.get(key)!;
                      const value = values.get(key);
                      const max = columnMax.get(key) ?? 1;
                      const present = value != null && Number.isFinite(value);
                      return (
                        <td key={key} className="gse-value-cell">
                          <div className="gse-cell">
                            <SegmentedBar
                              ariaLabel={`${participant.name}: ${metric.label}`}
                              className="gse-cell-track"
                              maxValue={max}
                              total={present ? Math.abs(value) : 0}
                              segments={
                                present
                                  ? [
                                      {
                                        key,
                                        className: cohort,
                                        label: metric.label,
                                        value: Math.abs(value),
                                      },
                                    ]
                                  : []
                              }
                            />
                            <span className="gse-cell-value">
                              {present ? metric.format(value, measure) : "—"}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
