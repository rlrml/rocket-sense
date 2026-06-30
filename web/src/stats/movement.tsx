import type { ReactNode } from "react";
import type {
  MechanicEventResponse,
  MovementCohortSummary,
  MovementSummaryResponse,
  RankBenchmarkCohort,
  ReplayPlayer,
  ReplayPlayerMovementSummary,
} from "../types";
import {
  comparisonSubjectLabel,
  StatComparisonGrid,
  StatComparisonPanel,
  subjectIndexByTeam,
  subjectMagnitudeRows,
} from "./comparisonPanels";
import {
  careerCohortClassName,
  careerCohortSegmentClassName,
  careerCohortSubtitle,
  careerRateValue,
  type CareerCohortKey,
  type ComparisonCard,
  ComparisonCardGrid,
  type ComparisonRow,
  type OutcomeDistributionColors,
  type OutcomeDistributionLevel,
  outcomeDistributionColorStyle,
  outcomeSegmentClassName,
  rankCohortDistributionRows,
  rankCohortMagnitudeRows,
  rankCohortValues,
  type SegmentedBarSegment,
  StatPlayerLabel,
  statPercentWithValue,
  statPlayerRank,
  type StatPlayerRank,
  TEAM_OUTCOME_COLORS,
  teamOutcomeTone,
} from "./shared";

export const movementEventTypes = [
  "movement",
  "powerslide",
  "flip_impulse",
  "movement.dodge_refresh",
];

// Movement-flavored mechanics surfaced alongside the movement spans. They are
// "mechanic" stream events (not movement spans), fetched in addition to the
// movement event types and counted separately from the per-frame movement data.
export const movementMechanicEventTypes = ["speed_flip", "half_flip", "wavedash"];

interface PlayerMovementSummary {
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  rank: StatPlayerRank | null;
  team: number | null;
  activeSeconds: number;
  totalDistance: number;
  speedWeighted: number;
  speedWeight: number;
  slowSeconds: number;
  boostSeconds: number;
  supersonicSeconds: number;
  groundSeconds: number;
  lowAirSeconds: number;
  highAirSeconds: number;
  // Powerslide arrives as active:true (start) / active:false (end) toggle pairs,
  // paired up per player into a slide count and total duration.
  powerslideCount: number;
  powerslideSeconds: number;
  speedFlips: number;
  wavedashes: number;
  halfFlips: number;
}

interface MovementBand {
  id: string;
  label: string;
  // Shade tier used for the team-colored (single-game) rendering: light -> dark.
  level: OutcomeDistributionLevel;
  value: (summary: PlayerMovementSummary) => number;
  // Benchmark metric_key for the rank-average row's share of this band.
  metricKey?: string;
}

const BAND_COLORS: OutcomeDistributionColors = {
  positive: "#0f766e",
  "positive-clear": "#0f766e",
  neutral: "#7c3aed",
  "neutral-clear": "#7c3aed",
  negative: "#be123c",
  "negative-clear": "#be123c",
};

const GROUP_BAND_TONES = ["positive", "neutral", "negative"] as const;

export function MovementDetail({
  events,
  players,
  durationSeconds,
  scope = "replay",
  subjectSubtitle,
  movementSummaries,
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
  scope?: "replay" | "group";
  subjectSubtitle?: string;
  movementSummaries?: ReplayPlayerMovementSummary[];
}) {
  const summaries = applyReplayMovementSummaries(
    playerMovementSummaries(players, events, durationSeconds),
    movementSummaries,
  );

  if (!summaries.some(hasMovementData)) {
    return (
      <div className="stat-empty">
        No movement rows are available for this {scope === "group" ? "group" : "replay"}.
      </div>
    );
  }

  const teamColored = scope !== "group";
  const subjectIndexByKey = subjectIndexByTeam(summaries);
  const speedBands: MovementBand[] = [
    { id: "slow", label: "Slow", level: "unknown", value: (summary) => summary.slowSeconds },
    { id: "boost", label: "Boost", level: "clear", value: (summary) => summary.boostSeconds },
    {
      id: "supersonic",
      label: "Supersonic",
      level: "strong",
      value: (summary) => summary.supersonicSeconds,
    },
  ];
  const heightBands: MovementBand[] = [
    { id: "ground", label: "Ground", level: "unknown", value: (summary) => summary.groundSeconds },
    { id: "low_air", label: "Low air", level: "clear", value: (summary) => summary.lowAirSeconds },
    {
      id: "high_air",
      label: "High air",
      level: "strong",
      value: (summary) => summary.highAirSeconds,
    },
  ];

  return (
    <div className="movement-detail">
      <StatComparisonGrid contained={false}>
        <StatComparisonPanel
          title="Average speed (uu/s)"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "movement-bar-speed",
            metric: averageSpeed,
            format: formatSpeed,
            label: (summary) => movementPlayerLabel(summary, scope, subjectSubtitle),
            placeholder: "—",
          })}
        />
        <StatComparisonPanel
          title="Distance covered (uu)"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "movement-bar-distance",
            metric: (summary) => summary.totalDistance,
            format: formatDistanceShort,
            label: (summary) => movementPlayerLabel(summary, scope, subjectSubtitle),
          })}
        />
        <StatComparisonPanel
          title="Speed bands (seconds)"
          rows={distributionRows(summaries, speedBands, {
            teamColored,
            subjectSubtitle,
            scope,
            sortKey: (summary) => summary.boostSeconds + summary.supersonicSeconds,
            format: formatSeconds,
          })}
        />
        <StatComparisonPanel
          title="Ground & air (seconds)"
          rows={distributionRows(summaries, heightBands, {
            teamColored,
            subjectSubtitle,
            scope,
            sortKey: (summary) => summary.lowAirSeconds + summary.highAirSeconds,
            format: formatSeconds,
          })}
        />
        <StatComparisonPanel
          title="Powerslide time (seconds)"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "movement-bar-powerslide",
            metric: (summary) => summary.powerslideSeconds,
            format: formatSeconds,
            label: (summary) => movementPlayerLabel(summary, scope, subjectSubtitle),
          })}
        />
        <StatComparisonPanel
          title="Powerslide count (count)"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "movement-bar-powerslide",
            metric: (summary) => summary.powerslideCount,
            format: formatCount,
            label: (summary) => movementPlayerLabel(summary, scope, subjectSubtitle),
          })}
        />
        <StatComparisonPanel
          title="Speed flips (count)"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "movement-bar-speed-flip",
            metric: (summary) => summary.speedFlips,
            format: formatCount,
            label: (summary) => movementPlayerLabel(summary, scope, subjectSubtitle),
          })}
        />
        <StatComparisonPanel
          title="Wavedashes (count)"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "movement-bar-wavedash",
            metric: (summary) => summary.wavedashes,
            format: formatCount,
            label: (summary) => movementPlayerLabel(summary, scope, subjectSubtitle),
          })}
        />
        <StatComparisonPanel
          title="Half flips (count)"
          rows={subjectMagnitudeRows(summaries, {
            teamColored,
            subjectIndexByKey,
            groupClassName: "movement-bar-half-flip",
            metric: (summary) => summary.halfFlips,
            format: formatCount,
            label: (summary) => movementPlayerLabel(summary, scope, subjectSubtitle),
          })}
        />
      </StatComparisonGrid>
    </div>
  );
}

type CareerMovementSummary = PlayerMovementSummary & {
  careerCohort: CareerCohortKey;
  appearanceCount: number;
};

export function PlayerMovementCohorts(props: {
  response: MovementSummaryResponse;
  playerName: string;
}) {
  return <ComparisonCardGrid cards={buildMovementCohortCards(props)} />;
}

export function buildMovementCohortCards({
  response,
  playerName,
  rankCohorts = [],
  rankWindowLabel,
}: {
  response: MovementSummaryResponse;
  playerName: string;
  rankCohorts?: RankBenchmarkCohort[];
  rankWindowLabel?: string | null;
}): ComparisonCard[] {
  const summaries: CareerMovementSummary[] = [
    movementCohortSummary("cohort-self", "player", playerName || "Player", response.player),
  ];
  if (response.teammates) {
    summaries.push(
      movementCohortSummary("cohort-teammates", "teammates", "Teammates", response.teammates),
    );
  }
  if (response.opponents) {
    summaries.push(
      movementCohortSummary("cohort-opponents", "opponents", "Opponents", response.opponents),
    );
  }

  const speedBands: MovementBand[] = [
    {
      id: "slow",
      label: "Slow",
      level: "unknown",
      value: (summary) => summary.slowSeconds,
      metricKey: "movement:slow_share",
    },
    {
      id: "boost",
      label: "Boost",
      level: "clear",
      value: (summary) => summary.boostSeconds,
      metricKey: "movement:boost_speed_share",
    },
    {
      id: "supersonic",
      label: "Supersonic",
      level: "strong",
      value: (summary) => summary.supersonicSeconds,
      metricKey: "movement:supersonic_share",
    },
  ];
  const heightBands: MovementBand[] = [
    {
      id: "ground",
      label: "Ground",
      level: "unknown",
      value: (summary) => summary.groundSeconds,
      metricKey: "movement:ground_share",
    },
    {
      id: "low_air",
      label: "Low air",
      level: "clear",
      value: (summary) => summary.lowAirSeconds,
      metricKey: "movement:low_air_share",
    },
    {
      id: "high_air",
      label: "High air",
      level: "strong",
      value: (summary) => summary.highAirSeconds,
      metricKey: "movement:high_air_share",
    },
  ];

  // One magnitude card with player/teammate/opponent rows plus a slate row per
  // selected rank, all sharing one scale so the rank bars don't overflow.
  const magnitudeCard = (
    key: string,
    title: string,
    value: (summary: CareerMovementSummary) => number | null,
    format: (value: number) => string,
    metricKey: string | null,
    toRankValue: (raw: number) => number,
  ): ComparisonCard => {
    const rankValues = metricKey ? rankCohortValues(rankCohorts, metricKey, toRankValue) : [];
    const maxValue = Math.max(1, ...summaries.map((s) => value(s) ?? 0), ...rankValues);
    const rows = careerMovementMagnitudeRows(summaries, value, format, maxValue);
    if (metricKey) {
      rows.push(
        ...rankCohortMagnitudeRows({
          cohorts: rankCohorts,
          metricKey,
          toValue: toRankValue,
          format,
          maxValue,
          windowLabel: rankWindowLabel,
        }),
      );
    }
    return { key, title, rows };
  };

  const distributionCard = (
    key: string,
    title: string,
    bands: MovementBand[],
    totalFor: (summary: CareerMovementSummary) => number,
  ): ComparisonCard => {
    const rows = careerMovementDistributionRows(summaries, bands, totalFor);
    rows.push(
      ...rankCohortDistributionRows({
        cohorts: rankCohorts,
        bands: bands.map((band, index) => ({
          id: band.id,
          label: band.label,
          metricKey: band.metricKey ?? "",
          className: outcomeSegmentClassName(GROUP_BAND_TONES[index], "clear"),
        })),
        colorStyle: outcomeDistributionColorStyle(BAND_COLORS),
        windowLabel: rankWindowLabel,
      }),
    );
    return { key, title, rows };
  };

  const cards = [
    magnitudeCard(
      "average-speed",
      "Average speed (uu/s)",
      averageSpeed,
      formatSpeed,
      "movement:avg_speed",
      (raw) => raw,
    ),
    magnitudeCard(
      "distance-covered",
      "Distance covered (uu / 5 min)",
      (summary) => careerRateValue(summary.totalDistance, summary.activeSeconds),
      formatDistanceRate,
      "movement:distance",
      (raw) => raw * 5,
    ),
    distributionCard("speed-bands", "Speed bands (% tracked time)", speedBands, speedBandTotal),
    distributionCard("ground-air", "Ground & air (% tracked time)", heightBands, movementTimeTotal),
    // Powerslide time has no benchmark metric_key, so it shows no rank row.
    magnitudeCard(
      "powerslide-time",
      "Powerslide time (s / 5 min)",
      (summary) => careerRateValue(summary.powerslideSeconds, summary.activeSeconds),
      formatSecondsRate,
      null,
      (raw) => raw,
    ),
    magnitudeCard(
      "powerslide-count",
      "Powerslide count (per 5 min)",
      (summary) => careerRateValue(summary.powerslideCount, summary.activeSeconds),
      formatRate,
      "movement:powerslides",
      (raw) => raw * 5,
    ),
    magnitudeCard(
      "speed-flips",
      "Speed flips (per 5 min)",
      (summary) => careerRateValue(summary.speedFlips, summary.activeSeconds),
      formatRate,
      "speed_flip",
      (raw) => raw * 5,
    ),
    magnitudeCard(
      "wavedashes",
      "Wavedashes (per 5 min)",
      (summary) => careerRateValue(summary.wavedashes, summary.activeSeconds),
      formatRate,
      "wavedash",
      (raw) => raw * 5,
    ),
    magnitudeCard(
      "half-flips",
      "Half flips (per 5 min)",
      (summary) => careerRateValue(summary.halfFlips, summary.activeSeconds),
      formatRate,
      "half_flip",
      (raw) => raw * 5,
    ),
  ];

  return cards;
}

function movementCohortSummary(
  key: string,
  careerCohort: CareerCohortKey,
  name: string,
  cohort: MovementCohortSummary,
): CareerMovementSummary {
  return {
    key,
    name,
    platform: null,
    platformPlayerId: null,
    rank: null,
    team: null,
    careerCohort,
    appearanceCount: cohort.appearance_count,
    activeSeconds: cohort.active_seconds,
    totalDistance: cohort.total_distance,
    speedWeighted: cohort.speed_weighted,
    speedWeight: cohort.speed_weight,
    slowSeconds: cohort.slow_seconds,
    boostSeconds: cohort.boost_seconds,
    supersonicSeconds: cohort.supersonic_seconds,
    groundSeconds: cohort.ground_seconds,
    lowAirSeconds: cohort.low_air_seconds,
    highAirSeconds: cohort.high_air_seconds,
    powerslideCount: cohort.powerslide_count,
    powerslideSeconds: cohort.powerslide_seconds,
    speedFlips: cohort.speed_flips,
    wavedashes: cohort.wavedashes,
    halfFlips: cohort.half_flips,
  };
}

function careerMovementMagnitudeRows(
  summaries: CareerMovementSummary[],
  value: (summary: CareerMovementSummary) => number | null,
  format: (value: number) => string,
  // Share the scale with any rank-average rows the card also renders.
  maxValueOverride?: number,
): ComparisonRow[] {
  const maxValue =
    maxValueOverride ?? Math.max(1, ...summaries.map((summary) => value(summary) ?? 0));
  return summaries.map((summary) => {
    const metric = value(summary);
    const total = metric ?? 0;
    const formatted = format(total);
    return {
      key: summary.key,
      label: movementCohortLabel(summary),
      ariaLabel: `${summary.name}: ${formatted}`,
      segments: [
        {
          key: "value",
          className: careerCohortSegmentClassName(summary.careerCohort),
          label: summary.name,
          value: total,
        },
      ],
      total,
      maxValue,
      barValue: formatted,
    };
  });
}

function careerMovementDistributionRows(
  summaries: CareerMovementSummary[],
  bands: MovementBand[],
  totalFor: (summary: CareerMovementSummary) => number,
): ComparisonRow[] {
  return summaries.map((summary) => {
    const total = totalFor(summary);
    const segments: SegmentedBarSegment[] = bands.map((band, index) => {
      const value = band.value(summary);
      const share = total > 0 ? value / total : 0;
      return {
        key: band.id,
        className: outcomeSegmentClassName(GROUP_BAND_TONES[index], "clear"),
        label: band.label,
        value,
        visibleLabel:
          value > 0 && share >= 0.12 ? `${band.label} ${Math.round(share * 100)}%` : undefined,
        title:
          value > 0
            ? statPercentWithValue(`${Math.round(share * 100)}%`, formatSeconds(value), band.label)
            : undefined,
      };
    });
    return {
      key: summary.key,
      label: movementCohortLabel(summary),
      ariaLabel: `${summary.name}: ${bands.map((band) => band.label).join(" / ")}`,
      segments,
      total,
      style: outcomeDistributionColorStyle(BAND_COLORS),
      placeholder: total > 0 ? undefined : "0%",
    };
  });
}

function movementCohortLabel(summary: CareerMovementSummary): ReactNode {
  const suffix = summary.careerCohort === "player" ? "games" : "appearances";
  return (
    <StatPlayerLabel
      className={careerCohortClassName(summary.careerCohort)}
      name={summary.name}
      platform={null}
      platformPlayerId={null}
      profilePath={null}
      rank={null}
      showPlatformBadge={false}
      subtitle={`${careerCohortSubtitle(summary.careerCohort)} · ${summary.appearanceCount.toLocaleString()} ${suffix}`}
    />
  );
}

function distributionRows(
  summaries: PlayerMovementSummary[],
  bands: MovementBand[],
  options: {
    teamColored: boolean;
    scope: "replay" | "group";
    subjectSubtitle?: string;
    sortKey: (summary: PlayerMovementSummary) => number;
    format: (value: number) => string;
  },
): ComparisonRow[] {
  const colors = options.teamColored ? TEAM_OUTCOME_COLORS : BAND_COLORS;

  return [...summaries]
    .sort(
      (left, right) =>
        options.sortKey(right) - options.sortKey(left) || left.name.localeCompare(right.name),
    )
    .map((summary) => {
      const total = bandTotal(summary, bands);
      const segments: SegmentedBarSegment[] = bands.map((band, index) => {
        const value = band.value(summary);
        const share = total > 0 ? value / total : 0;
        const tone = options.teamColored ? teamOutcomeTone(summary.team) : GROUP_BAND_TONES[index];
        const level = options.teamColored ? band.level : "clear";
        return {
          key: band.id,
          className: outcomeSegmentClassName(tone, level),
          label: band.label,
          value,
          visibleLabel:
            value > 0 && share >= 0.12 ? `${band.label} ${Math.round(share * 100)}%` : undefined,
          title:
            value > 0
              ? statPercentWithValue(
                  `${Math.round(share * 100)}%`,
                  options.format(value),
                  band.label,
                )
              : undefined,
        };
      });
      return {
        key: summary.key,
        label: movementPlayerLabel(summary, options.scope, options.subjectSubtitle),
        ariaLabel: `${summary.name} ${bands.map((band) => band.label).join(" / ")}`,
        segments,
        total,
        style: outcomeDistributionColorStyle(colors),
        placeholder: total > 0 ? undefined : "—",
      };
    });
}

function movementPlayerLabel(
  summary: PlayerMovementSummary,
  scope: "replay" | "group",
  subjectSubtitle?: string,
) {
  return comparisonSubjectLabel(
    summary,
    "movement",
    scope === "group" ? { teamSubtitle: subjectSubtitle ?? "Player" } : {},
  );
}

function playerMovementSummaries(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
  durationSeconds: number | null,
): PlayerMovementSummary[] {
  const summaries = players.map((player, index) => emptySummary(player, index, durationSeconds));
  const byKey = new Map(summaries.map((summary) => [summary.key, summary]));
  const powerslideToggles = new Map<string, Array<{ time: number; active: boolean }>>();

  for (const event of events) {
    const summary = summaryForEvent(event, summaries, byKey);
    if (!summary) continue;
    if (event.event_type === "movement") {
      addMovementEvent(summary, event);
    } else if (event.event_type === "powerslide") {
      const time = firstNumber(event.payload, ["time"]) ?? event.start_time;
      if (time != null) {
        const toggles = powerslideToggles.get(summary.key) ?? [];
        toggles.push({ time, active: event.payload.active !== false });
        powerslideToggles.set(summary.key, toggles);
      }
    } else if (event.event_type === "speed_flip") {
      summary.speedFlips += 1;
    } else if (event.event_type === "wavedash") {
      summary.wavedashes += 1;
    } else if (event.event_type === "half_flip") {
      summary.halfFlips += 1;
    }
  }

  for (const summary of summaries) {
    addPowerslideToggles(summary, powerslideToggles.get(summary.key) ?? []);
  }

  return summaries.sort(compareSummaries);
}

function applyReplayMovementSummaries(
  summaries: PlayerMovementSummary[],
  movementSummaries?: ReplayPlayerMovementSummary[],
): PlayerMovementSummary[] {
  if (!movementSummaries || movementSummaries.length === 0) return summaries;
  const byKey = new Map(
    movementSummaries.flatMap((summary) => {
      const key = replayMovementSummaryKey(summary);
      return key ? [[key, summary.summary] as const] : [];
    }),
  );

  return summaries.map((summary) => {
    const movement = byKey.get(summary.key);
    if (!movement || !movementCohortHasData(movement)) return summary;
    return {
      ...summary,
      activeSeconds: movement.active_seconds,
      totalDistance: movement.total_distance,
      speedWeighted: movement.speed_weighted,
      speedWeight: movement.speed_weight,
      slowSeconds: movement.slow_seconds,
      boostSeconds: movement.boost_seconds,
      supersonicSeconds: movement.supersonic_seconds,
      groundSeconds: movement.ground_seconds,
      lowAirSeconds: movement.low_air_seconds,
      highAirSeconds: movement.high_air_seconds,
      powerslideCount: movement.powerslide_count,
      powerslideSeconds: movement.powerslide_seconds,
      speedFlips: movement.speed_flips,
      wavedashes: movement.wavedashes,
      halfFlips: movement.half_flips,
    };
  });
}

function movementCohortHasData(summary: MovementCohortSummary): boolean {
  return (
    summary.total_distance > 0 ||
    summary.speed_weight > 0 ||
    summary.slow_seconds + summary.boost_seconds + summary.supersonic_seconds > 0 ||
    summary.ground_seconds + summary.low_air_seconds + summary.high_air_seconds > 0 ||
    summary.powerslide_count > 0 ||
    summary.speed_flips + summary.wavedashes + summary.half_flips > 0
  );
}

function replayMovementSummaryKey(summary: ReplayPlayerMovementSummary): string | null {
  if (!summary.platform || !summary.platform_player_id) return null;
  return `${normalizePlatform(summary.platform)}:${summary.platform_player_id}`;
}

function addPowerslideToggles(
  summary: PlayerMovementSummary,
  toggles: Array<{ time: number; active: boolean }>,
) {
  const ordered = [...toggles].sort((left, right) => left.time - right.time);
  let inSlide = false;
  let start = 0;
  for (const { time, active } of ordered) {
    if (active) {
      if (!inSlide) {
        summary.powerslideCount += 1;
        start = time;
        inSlide = true;
      }
    } else if (inSlide) {
      summary.powerslideSeconds += Math.max(0, time - start);
      inSlide = false;
    }
  }
}

function addMovementEvent(summary: PlayerMovementSummary, event: MechanicEventResponse) {
  const payload = event.payload;
  const duration = eventDuration(event);
  const explicitTotal = firstNumber(payload, [
    "active_time_seconds",
    "movement_time_seconds",
    "total_time_seconds",
    "duration",
  ]);

  if (explicitTotal != null) {
    summary.activeSeconds = Math.max(summary.activeSeconds, explicitTotal);
  } else {
    summary.activeSeconds += duration;
  }
  summary.totalDistance +=
    firstNumber(payload, ["total_distance", "distance", "distance_traveled", "distance_uu"]) ?? 0;

  addMax(summary, "slowSeconds", payload, [
    "time_slow_speed",
    "slow_speed_seconds",
    "slow_speed_time_seconds",
    "time_slow_speed_seconds",
  ]);
  addMax(summary, "boostSeconds", payload, [
    "time_boost_speed",
    "boost_speed_seconds",
    "boost_speed_time_seconds",
    "time_boost_speed_seconds",
  ]);
  addMax(summary, "supersonicSeconds", payload, [
    "time_supersonic_speed",
    "supersonic_seconds",
    "supersonic_speed_time_seconds",
    "time_supersonic_speed_seconds",
  ]);
  addMax(summary, "groundSeconds", payload, [
    "time_ground",
    "ground_seconds",
    "ground_time_seconds",
    "time_on_ground",
  ]);
  addMax(summary, "lowAirSeconds", payload, [
    "time_low_air",
    "low_air_seconds",
    "low_air_time_seconds",
  ]);
  addMax(summary, "highAirSeconds", payload, [
    "time_high_air",
    "high_air_seconds",
    "high_air_time_seconds",
  ]);

  const speed = firstNumber(payload, ["avg_speed", "average_speed", "speed"]);
  if (speed != null && duration > 0) {
    summary.speedWeighted += speed * duration;
    summary.speedWeight += duration;
  } else if (speed != null) {
    summary.speedWeighted += speed;
    summary.speedWeight += 1;
  }

  const band = firstString(payload, ["speed_band", "band", "speed_state", "state", "kind"]);
  if (duration > 0) {
    if (band === "slow_speed" || band === "slow") summary.slowSeconds += duration;
    if (band === "boost_speed" || band === "boost") summary.boostSeconds += duration;
    if (band === "supersonic_speed" || band === "supersonic") summary.supersonicSeconds += duration;
  }

  const height = firstString(payload, ["height_band", "surface", "air_state", "state", "kind"]);
  if (duration > 0) {
    if (height === "ground" || height === "on_ground") summary.groundSeconds += duration;
    if (height === "low_air" || height === "low") summary.lowAirSeconds += duration;
    if (height === "high_air" || height === "high") summary.highAirSeconds += duration;
  }
}

function addMax(
  summary: PlayerMovementSummary,
  key: keyof PlayerMovementSummary,
  payload: Record<string, unknown>,
  names: string[],
) {
  const value = firstNumber(payload, names);
  if (value == null || typeof summary[key] !== "number") return;
  summary[key] = Math.max(summary[key] as number, value) as never;
}

function emptySummary(
  player: ReplayPlayer,
  index: number,
  durationSeconds: number | null,
): PlayerMovementSummary {
  return {
    key: playerKey(player, index),
    name: player.name || player.platform_player_id || "Unknown",
    platform: player.platform,
    platformPlayerId: player.platform_player_id,
    rank: statPlayerRank(player),
    team: player.team,
    activeSeconds:
      player.non_demo_active_time_seconds ?? player.active_time_seconds ?? durationSeconds ?? 0,
    totalDistance: 0,
    speedWeighted: 0,
    speedWeight: 0,
    slowSeconds: 0,
    boostSeconds: 0,
    supersonicSeconds: 0,
    groundSeconds: 0,
    lowAirSeconds: 0,
    highAirSeconds: 0,
    powerslideCount: 0,
    powerslideSeconds: 0,
    speedFlips: 0,
    wavedashes: 0,
    halfFlips: 0,
  };
}

function summaryForEvent(
  event: MechanicEventResponse,
  summaries: PlayerMovementSummary[],
  byKey: Map<string, PlayerMovementSummary>,
): PlayerMovementSummary | null {
  for (const key of eventPlayerKeys(event)) {
    const summary = byKey.get(key);
    if (summary) return summary;
  }
  if (event.player_name) {
    return summaries.find((summary) => summary.name === event.player_name) ?? null;
  }
  return null;
}

function eventPlayerKeys(event: MechanicEventResponse): string[] {
  const keys = [
    event.player_id,
    stringPayload(event.payload, "player_id"),
    remoteIdKey(event.payload.player),
  ].filter((key): key is string => Boolean(key));
  return keys.flatMap((key) => [key, normalizePlayerKey(key)]);
}

function hasMovementData(summary: PlayerMovementSummary): boolean {
  return (
    summary.totalDistance > 0 ||
    summary.speedWeight > 0 ||
    speedBandTotal(summary) > 0 ||
    movementTimeTotal(summary) > 0 ||
    summary.powerslideCount > 0 ||
    flipTotal(summary) > 0
  );
}

function averageSpeed(summary: PlayerMovementSummary): number | null {
  if (summary.speedWeight > 0) return summary.speedWeighted / summary.speedWeight;
  return summary.activeSeconds > 0 && summary.totalDistance > 0
    ? summary.totalDistance / summary.activeSeconds
    : null;
}

function speedBandTotal(summary: PlayerMovementSummary): number {
  return summary.slowSeconds + summary.boostSeconds + summary.supersonicSeconds;
}

function movementTimeTotal(summary: PlayerMovementSummary): number {
  return summary.groundSeconds + summary.lowAirSeconds + summary.highAirSeconds;
}

function flipTotal(summary: PlayerMovementSummary): number {
  return summary.speedFlips + summary.wavedashes + summary.halfFlips;
}

function bandTotal(summary: PlayerMovementSummary, bands: MovementBand[]): number {
  return bands.reduce((total, band) => total + band.value(summary), 0);
}

function compareSummaries(left: PlayerMovementSummary, right: PlayerMovementSummary): number {
  if ((left.team ?? 99) !== (right.team ?? 99)) return (left.team ?? 99) - (right.team ?? 99);
  return left.name.localeCompare(right.name);
}

function eventDuration(event: MechanicEventResponse): number {
  const payloadDuration = firstNumber(event.payload, ["duration"]);
  if (payloadDuration != null) return Math.max(0, payloadDuration);
  if (event.start_time != null && event.end_time != null) {
    return Math.max(0, event.end_time - event.start_time);
  }
  return 0;
}

function firstNumber(payload: Record<string, unknown>, names: string[]): number | null {
  for (const name of names) {
    const value = payload[name];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return null;
}

function firstString(payload: Record<string, unknown>, names: string[]): string | null {
  for (const name of names) {
    const value = payload[name];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return null;
}

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function remoteIdKey(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length !== 1) return null;
  const [platform, id] = entries[0];
  if (typeof id === "string" || typeof id === "number")
    return `${normalizePlatform(platform)}:${String(id)}`;
  if (id && typeof id === "object" && !Array.isArray(id)) {
    const nested = id as Record<string, unknown>;
    const onlineId = nested.online_id ?? nested.id;
    if (typeof onlineId === "string" || typeof onlineId === "number")
      return `${normalizePlatform(platform)}:${String(onlineId)}`;
  }
  return null;
}

function normalizePlayerKey(value: string): string {
  const [platform, ...rest] = value.split(":");
  return rest.length > 0 ? `${normalizePlatform(platform)}:${rest.join(":")}` : value;
}

function normalizePlatform(value: string): string {
  const lower = value.toLowerCase();
  if (lower === "psynet") return "epic";
  if (lower === "playstation") return "ps4";
  return lower;
}

function playerKey(player: ReplayPlayer, index: number): string {
  if (player.platform && player.platform_player_id)
    return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
  return `name:${player.name || index}`;
}

function formatSpeed(value: number): string {
  return `${Math.round(value).toLocaleString()} uu/s`;
}

function formatDistanceShort(value: number): string {
  if (value >= 1000) return `${Math.round(value / 1000).toLocaleString()}k uu`;
  return `${Math.round(value).toLocaleString()} uu`;
}

function formatDistanceRate(value: number): string {
  return `${Math.round(value).toLocaleString()} uu/5m`;
}

function formatSeconds(value: number): string {
  if (value > 0 && value < 10) return `${value.toFixed(1)}s`;
  return `${Math.round(value).toLocaleString()}s`;
}

function formatSecondsRate(value: number): string {
  if (value > 0 && value < 10) return `${value.toFixed(1)}s/5m`;
  return `${Math.round(value).toLocaleString()}s/5m`;
}

function formatCount(value: number): string {
  return Math.round(value).toLocaleString();
}

function formatRate(value: number): string {
  if (!Number.isFinite(value)) return "0/5m";
  const absolute = Math.abs(value);
  const formatted = absolute >= 100 ? value.toFixed(0) : value.toFixed(absolute >= 10 ? 1 : 2);
  return `${formatted}/5m`;
}
