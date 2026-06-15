import type { MechanicEventResponse, ReplayPlayer } from "../types";
import {
  type ComparisonRow,
  type OutcomeDistributionColors,
  type OutcomeDistributionLevel,
  outcomeDistributionColorStyle,
  outcomeSegmentClassName,
  PlayerComparisonChart,
  type SegmentedBarSegment,
  statPercentWithValue,
  StatPlayerLabel,
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
}

// Fixed band palette for replay-group views, where there is no replay-local team
// to color by: the three bands keep distinct hues (teal / purple / crimson) via
// the positive / neutral / negative tones. Single games override this with
// TEAM_OUTCOME_COLORS so each player's bands tier their own team color.
const BAND_COLORS: OutcomeDistributionColors = {
  positive: "#0f766e",
  "positive-clear": "#0f766e",
  neutral: "#7c3aed",
  "neutral-clear": "#7c3aed",
  negative: "#be123c",
  "negative-clear": "#be123c",
};

// Group views give each band its own hue (one tone per band); single games give
// every band the player's team tone and tell them apart by the shade level.
const GROUP_BAND_TONES = ["positive", "neutral", "negative"] as const;

export function MovementDetail({
  events,
  players,
  durationSeconds,
  scope = "replay",
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
  scope?: "replay" | "group";
}) {
  const summaries = playerMovementSummaries(players, events, durationSeconds);

  if (!summaries.some(hasMovementData)) {
    return (
      <div className="stat-empty">
        No movement rows are available for this {scope === "group" ? "group" : "replay"}.
      </div>
    );
  }

  const teamColored = scope !== "group";
  const playerIndexByKey = teamLocalPlayerIndexByKey(players);

  const speedScale = Math.max(1, ...summaries.map((summary) => averageSpeed(summary) ?? 0));
  const distanceScale = Math.max(1, ...summaries.map((summary) => summary.totalDistance));
  const powerslideTimeScale = Math.max(1, ...summaries.map((summary) => summary.powerslideSeconds));
  const powerslideCountScale = Math.max(1, ...summaries.map((summary) => summary.powerslideCount));
  const speedFlipScale = Math.max(1, ...summaries.map((summary) => summary.speedFlips));
  const wavedashScale = Math.max(1, ...summaries.map((summary) => summary.wavedashes));
  const halfFlipScale = Math.max(1, ...summaries.map((summary) => summary.halfFlips));

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

  const formatCount = (value: number) => value.toLocaleString();

  return (
    <div className="movement-detail">
      <PlayerComparisonChart
        className="movement-chart"
        title="Average speed"
        rows={magnitudeRows(summaries, {
          teamColored,
          playerIndexByKey,
          groupClassName: "movement-bar-speed",
          metric: (summary) => averageSpeed(summary) ?? 0,
          maxValue: speedScale,
          format: (value) => formatSpeed(value),
        })}
      />

      <PlayerComparisonChart
        className="movement-chart"
        title="Distance covered"
        rows={magnitudeRows(summaries, {
          teamColored,
          playerIndexByKey,
          groupClassName: "movement-bar-distance",
          metric: (summary) => summary.totalDistance,
          maxValue: distanceScale,
          format: (value) => formatDistanceShort(value),
        })}
      />

      <PlayerComparisonChart
        className="movement-chart"
        title="Speed bands"
        rows={distributionRows(summaries, speedBands, {
          teamColored,
          sortKey: (summary) => summary.boostSeconds + summary.supersonicSeconds,
          format: formatSeconds,
        })}
      />

      <PlayerComparisonChart
        className="movement-chart"
        title="Ground & air"
        rows={distributionRows(summaries, heightBands, {
          teamColored,
          sortKey: (summary) => summary.lowAirSeconds + summary.highAirSeconds,
          format: formatSeconds,
        })}
      />

      <PlayerComparisonChart
        className="movement-chart"
        title="Powerslide time"
        rows={magnitudeRows(summaries, {
          teamColored,
          playerIndexByKey,
          groupClassName: "movement-bar-powerslide",
          metric: (summary) => summary.powerslideSeconds,
          maxValue: powerslideTimeScale,
          format: formatSeconds,
        })}
      />

      <PlayerComparisonChart
        className="movement-chart"
        title="Powerslide count"
        rows={magnitudeRows(summaries, {
          teamColored,
          playerIndexByKey,
          groupClassName: "movement-bar-powerslide",
          metric: (summary) => summary.powerslideCount,
          maxValue: powerslideCountScale,
          format: formatCount,
        })}
      />

      <PlayerComparisonChart
        className="movement-chart"
        title="Speed flips"
        rows={magnitudeRows(summaries, {
          teamColored,
          playerIndexByKey,
          groupClassName: "movement-bar-speed-flip",
          metric: (summary) => summary.speedFlips,
          maxValue: speedFlipScale,
          format: formatCount,
        })}
      />

      <PlayerComparisonChart
        className="movement-chart"
        title="Wavedashes"
        rows={magnitudeRows(summaries, {
          teamColored,
          playerIndexByKey,
          groupClassName: "movement-bar-wavedash",
          metric: (summary) => summary.wavedashes,
          maxValue: wavedashScale,
          format: formatCount,
        })}
      />

      <PlayerComparisonChart
        className="movement-chart"
        title="Half flips"
        rows={magnitudeRows(summaries, {
          teamColored,
          playerIndexByKey,
          groupClassName: "movement-bar-half-flip",
          metric: (summary) => summary.halfFlips,
          maxValue: halfFlipScale,
          format: formatCount,
        })}
      />
    </div>
  );
}

function magnitudeRows(
  summaries: PlayerMovementSummary[],
  options: {
    teamColored: boolean;
    playerIndexByKey: Map<string, number>;
    groupClassName: string;
    metric: (summary: PlayerMovementSummary) => number;
    maxValue: number;
    format: (value: number) => string;
  },
): ComparisonRow[] {
  // Every player appears in every graph (sorted high -> low); a zero value reads
  // as an empty track with a "0" placeholder rather than a dropped row.
  return [...summaries]
    .sort(
      (left, right) =>
        options.metric(right) - options.metric(left) || left.name.localeCompare(right.name),
    )
    .map((summary) => {
      const value = options.metric(summary);
      return {
        key: summary.key,
        label: movementPlayerLabel(summary),
        ariaLabel: `${summary.name}: ${options.format(value)}`,
        segments: [
          {
            key: "value",
            className: magnitudeSegmentClass(
              summary,
              options.teamColored,
              options.playerIndexByKey,
              options.groupClassName,
            ),
            label: summary.name,
            value,
          },
        ],
        total: value,
        maxValue: options.maxValue,
        valueInBar: value > 0 ? options.format(value) : undefined,
        placeholder: value > 0 ? undefined : "0",
      };
    });
}

function distributionRows(
  summaries: PlayerMovementSummary[],
  bands: MovementBand[],
  options: {
    teamColored: boolean;
    sortKey: (summary: PlayerMovementSummary) => number;
    format: (value: number) => string;
  },
): ComparisonRow[] {
  const colors = options.teamColored ? TEAM_OUTCOME_COLORS : BAND_COLORS;

  // Every player appears (sorted high -> low); an all-zero split reads as an
  // empty track with a placeholder rather than a dropped row.
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
        label: movementPlayerLabel(summary),
        ariaLabel: `${summary.name} ${bands.map((band) => band.label).join(" / ")}`,
        segments,
        total,
        style: outcomeDistributionColorStyle(colors),
        placeholder: total > 0 ? undefined : "—",
      };
    });
}

// Single game: tint by the player's team with a per-player shade. Group: there
// is no replay-local team, so fall back to the fixed per-metric hue.
function magnitudeSegmentClass(
  summary: PlayerMovementSummary,
  teamColored: boolean,
  playerIndexByKey: Map<string, number>,
  groupClassName: string,
): string {
  if (!teamColored) return groupClassName;
  return `team-segment-${teamClass(summary.team)} player-shade-${Math.min(playerIndexByKey.get(summary.key) ?? 0, 3)}`;
}

function teamLocalPlayerIndexByKey(players: ReplayPlayer[]): Map<string, number> {
  const indexes = new Map<string, number>();
  const counts = new Map<number | null, number>();
  players.forEach((player, index) => {
    const next = counts.get(player.team) ?? 0;
    indexes.set(playerKey(player, index), next);
    counts.set(player.team, next + 1);
  });
  return indexes;
}

function movementPlayerLabel(summary: PlayerMovementSummary) {
  return (
    <StatPlayerLabel
      className={`team-accent-${teamClass(summary.team)}`}
      name={summary.name}
      platform={summary.platform}
      profilePath={playerProfilePath(summary)}
      rank={summary.rank}
      subtitle={teamLabel(summary.team)}
    />
  );
}

function playerMovementSummaries(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
  durationSeconds: number | null,
): PlayerMovementSummary[] {
  const summaries = players.map((player, index) => emptySummary(player, index, durationSeconds));
  const byKey = new Map(summaries.map((summary) => [summary.key, summary]));
  // Powerslide arrives as separate start/end toggles; collect per player and
  // pair them once all events are seen (order-independent).
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

// Pair active:true (start) -> active:false (end) toggles in time order into a
// slide count and total duration. A trailing unclosed start still counts as a
// slide (with no measurable duration).
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
  return bands.reduce((sum, band) => sum + band.value(summary), 0);
}

function eventDuration(event: MechanicEventResponse): number {
  const duration = firstNumber(event.payload, ["duration", "duration_seconds"]);
  if (duration != null) return duration;
  if (event.start_time != null && event.end_time != null)
    return Math.max(0, event.end_time - event.start_time);
  return 0;
}

function firstNumber(payload: Record<string, unknown>, keys: string[]): number | null {
  for (const key of keys) {
    const value = nestedValue(payload, key);
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return null;
}

function firstString(payload: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = nestedValue(payload, key);
    if (typeof value === "string") return normalizeKey(value);
  }
  return null;
}

function nestedValue(payload: Record<string, unknown>, key: string): unknown {
  if (key in payload) return payload[key];
  for (const value of Object.values(payload)) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    const nested = value as Record<string, unknown>;
    if (key in nested) return nested[key];
  }
  return undefined;
}

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" ? value : null;
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

function compareSummaries(left: PlayerMovementSummary, right: PlayerMovementSummary): number {
  const leftSpeed = averageSpeed(left) ?? 0;
  const rightSpeed = averageSpeed(right) ?? 0;
  if (rightSpeed !== leftSpeed) return rightSpeed - leftSpeed;
  if (left.team !== right.team) return (left.team ?? 9) - (right.team ?? 9);
  return left.name.localeCompare(right.name);
}

function playerKey(player: ReplayPlayer, index: number): string {
  if (player.platform && player.platform_player_id)
    return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
  return `name:${player.name || index}`;
}

function playerProfilePath(summary: PlayerMovementSummary): string | null {
  if (!summary.platform || !summary.platformPlayerId) return null;
  return `/players/${encodeURIComponent(summary.platform)}/${encodeURIComponent(summary.platformPlayerId)}/stats/movement`;
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

function normalizeKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
}

function formatSpeed(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  return `${Math.round(value).toLocaleString()} uu/s`;
}

function formatDistanceShort(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "Unknown";
  if (value >= 1000) return `${Math.round(value / 1000).toLocaleString()}k uu`;
  return `${Math.round(value).toLocaleString()} uu`;
}

function formatSeconds(value: number): string {
  if (!Number.isFinite(value)) return "Unknown";
  if (value > 0 && value < 10) return `${value.toFixed(1)}s`;
  return `${Math.round(value)}s`;
}

function teamClass(team: number | null): string {
  if (team === 0) return "blue";
  if (team === 1) return "orange";
  return "unknown";
}

function teamLabel(team: number | null): string {
  if (team === 0) return "Blue";
  if (team === 1) return "Orange";
  return "Unknown";
}
