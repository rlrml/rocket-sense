import type { MechanicEventResponse, ReplayPlayer } from "../types";
import {
  MetricMeter,
  PlayerSegmentedBarRows,
  SegmentedBar,
  StatPlayerLabel,
  statPlayerRank,
  type SegmentedBarSegment,
  type StatPlayerRank,
} from "./shared";

export const movementEventTypes = ["movement", "powerslide", "flip_impulse", "movement.dodge_refresh"];

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
  powerslideSeconds: number;
  powerslideCount: number;
}

const maxSpeed = 2300;

export function MovementDetail({
  events,
  players,
  durationSeconds,
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
}) {
  const summaries = playerMovementSummaries(players, events, durationSeconds);

  if (!summaries.some(hasMovementData)) {
    return <div className="stat-empty">No movement rows are available for this replay.</div>;
  }

  return (
    <div className="movement-detail">
      <section className="chart-panel full-span">
        <header className="chart-panel-header">
          <h3>Speed & distance</h3>
          <span>Average speed, total distance, and speed bands</span>
        </header>
        <MovementSpeedChart summaries={summaries} />
      </section>

      <section className="chart-panel full-span">
        <header className="chart-panel-header">
          <h3>Ground & air</h3>
          <span>Ground, low-air, and high-air time</span>
        </header>
        <MovementShareRows
          summaries={summaries}
          emptyLabel="No ground or air movement spans are available for this replay."
          total={movementTimeTotal}
          segments={(summary) => [
            movementSegment("ground", "Ground", summary.groundSeconds, movementTimeTotal(summary)),
            movementSegment("low-air", "Low air", summary.lowAirSeconds, movementTimeTotal(summary)),
            movementSegment("high-air", "High air", summary.highAirSeconds, movementTimeTotal(summary)),
          ]}
        />
      </section>

      <section className="chart-panel full-span">
        <header className="chart-panel-header">
          <h3>Powerslide</h3>
          <span>Total duration, average duration, and count</span>
        </header>
        <PowerslideChart summaries={summaries} />
      </section>
    </div>
  );
}

function MovementSpeedChart({ summaries }: { summaries: PlayerMovementSummary[] }) {
  const maxDistance = Math.max(1, ...summaries.map((summary) => summary.totalDistance));
  const maxAvgSpeed = Math.max(1, ...summaries.map((summary) => averageSpeed(summary) ?? 0));

  return (
    <div className="movement-speed-chart">
      {summaries.map((summary) => {
        const speed = averageSpeed(summary);
        const speedTotal = speedBandTotal(summary);

        return (
          <div className="movement-player-row" key={summary.key}>
            {movementPlayerLabel(summary)}
            <div className="movement-player-metrics">
              <MetricMeter
                className="movement-meter-speed"
                label="Avg speed"
                percent={barPercent(speed, maxAvgSpeed)}
                rootClassName="movement-meter"
                value={formatSpeed(speed)}
              />
              <MetricMeter
                className="movement-meter-speed-share"
                label="Speed %"
                percent={speed == null ? 0 : percentage(speed, maxSpeed)}
                rootClassName="movement-meter"
                value={speed == null ? "Unknown" : `${Math.round((speed / maxSpeed) * 100)}%`}
              />
              <MetricMeter
                className="movement-meter-distance"
                label="Tot. dist."
                percent={barPercent(summary.totalDistance, maxDistance)}
                rootClassName="movement-meter"
                value={formatDistance(summary.totalDistance)}
              />
            </div>
            <SegmentedBar
              ariaLabel={`${summary.name} speed band split`}
              className="positioning-track movement-band-track"
              segments={[
                movementSegment("slow", "Slow speed", summary.slowSeconds, speedTotal),
                movementSegment("boost", "Boost speed", summary.boostSeconds, speedTotal),
                movementSegment("supersonic", "Supersonic", summary.supersonicSeconds, speedTotal),
              ]}
              total={speedTotal}
            />
          </div>
        );
      })}
    </div>
  );
}

function MovementShareRows({
  summaries,
  segments,
  total,
  emptyLabel,
}: {
  summaries: PlayerMovementSummary[];
  segments: (summary: PlayerMovementSummary) => SegmentedBarSegment[];
  total: (summary: PlayerMovementSummary) => number;
  emptyLabel: string;
}) {
  return (
    <PlayerSegmentedBarRows
      ariaLabel={(summary) => `${summary.name} ground and air split`}
      className="movement-share-rows"
      emptyLabel={emptyLabel}
      items={summaries}
      label={movementPlayerLabel}
      segments={segments}
      total={total}
      trackClassName="positioning-track movement-band-track"
    />
  );
}

function PowerslideChart({ summaries }: { summaries: PlayerMovementSummary[] }) {
  if (!summaries.some((summary) => summary.powerslideSeconds > 0 || summary.powerslideCount > 0)) {
    return <div className="stat-empty">No powerslide spans are available for this replay.</div>;
  }

  const maxSeconds = Math.max(1, ...summaries.map((summary) => summary.powerslideSeconds));
  const maxCount = Math.max(1, ...summaries.map((summary) => summary.powerslideCount));

  return (
    <div className="movement-speed-chart">
      {summaries.map((summary) => (
        <div className="movement-player-row movement-powerslide-row" key={summary.key}>
          {movementPlayerLabel(summary)}
          <div className="movement-player-metrics">
            <MetricMeter
              className="movement-meter-powerslide"
              label="Total"
              percent={barPercent(summary.powerslideSeconds, maxSeconds)}
              rootClassName="movement-meter"
              value={formatSeconds(summary.powerslideSeconds)}
            />
            <MetricMeter
              className="movement-meter-powerslide-avg"
              label="Average"
              percent={barPercent(averagePowerslideDuration(summary), Math.max(0.01, ...summaries.map(averagePowerslideDuration)))}
              rootClassName="movement-meter"
              value={formatSeconds(averagePowerslideDuration(summary))}
            />
            <MetricMeter
              className="movement-meter-powerslide-count"
              label="Count"
              percent={barPercent(summary.powerslideCount, maxCount)}
              rootClassName="movement-meter"
              value={summary.powerslideCount.toLocaleString()}
            />
          </div>
        </div>
      ))}
    </div>
  );
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

function playerMovementSummaries(players: ReplayPlayer[], events: MechanicEventResponse[], durationSeconds: number | null): PlayerMovementSummary[] {
  const summaries = players.map((player, index) => emptySummary(player, index, durationSeconds));
  const byKey = new Map(summaries.map((summary) => [summary.key, summary]));

  for (const event of events) {
    const summary = summaryForEvent(event, summaries, byKey);
    if (!summary) continue;
    if (event.event_type === "movement") {
      addMovementEvent(summary, event);
    } else if (event.event_type === "powerslide") {
      addPowerslideEvent(summary, event);
    }
  }

  return summaries.sort(compareSummaries);
}

function addMovementEvent(summary: PlayerMovementSummary, event: MechanicEventResponse) {
  const payload = event.payload;
  const duration = eventDuration(event);
  const explicitTotal = firstNumber(payload, ["active_time_seconds", "movement_time_seconds", "total_time_seconds", "duration"]);

  if (explicitTotal != null) {
    summary.activeSeconds = Math.max(summary.activeSeconds, explicitTotal);
  } else {
    summary.activeSeconds += duration;
  }
  summary.totalDistance += firstNumber(payload, ["total_distance", "distance", "distance_traveled", "distance_uu"]) ?? 0;

  addMax(summary, "slowSeconds", payload, ["time_slow_speed", "slow_speed_seconds", "slow_speed_time_seconds", "time_slow_speed_seconds"]);
  addMax(summary, "boostSeconds", payload, ["time_boost_speed", "boost_speed_seconds", "boost_speed_time_seconds", "time_boost_speed_seconds"]);
  addMax(summary, "supersonicSeconds", payload, ["time_supersonic_speed", "supersonic_seconds", "supersonic_speed_time_seconds", "time_supersonic_speed_seconds"]);
  addMax(summary, "groundSeconds", payload, ["time_ground", "ground_seconds", "ground_time_seconds", "time_on_ground"]);
  addMax(summary, "lowAirSeconds", payload, ["time_low_air", "low_air_seconds", "low_air_time_seconds"]);
  addMax(summary, "highAirSeconds", payload, ["time_high_air", "high_air_seconds", "high_air_time_seconds"]);

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

function addPowerslideEvent(summary: PlayerMovementSummary, event: MechanicEventResponse) {
  const duration = eventDuration(event);
  const totalDuration = firstNumber(event.payload, ["total_duration", "total_duration_seconds", "duration_seconds", "duration"]) ?? duration;
  const count = firstNumber(event.payload, ["count", "powerslide_count"]);
  summary.powerslideSeconds += totalDuration;
  summary.powerslideCount += count ?? (totalDuration > 0 ? 1 : 0);
}

function addMax(summary: PlayerMovementSummary, key: keyof PlayerMovementSummary, payload: Record<string, unknown>, names: string[]) {
  const value = firstNumber(payload, names);
  if (value == null || typeof summary[key] !== "number") return;
  summary[key] = Math.max(summary[key] as number, value) as never;
}

function emptySummary(player: ReplayPlayer, index: number, durationSeconds: number | null): PlayerMovementSummary {
  return {
    key: playerKey(player, index),
    name: player.name || player.platform_player_id || "Unknown",
    platform: player.platform,
    platformPlayerId: player.platform_player_id,
    rank: statPlayerRank(player),
    team: player.team,
    activeSeconds: player.non_demo_active_time_seconds ?? player.active_time_seconds ?? durationSeconds ?? 0,
    totalDistance: 0,
    speedWeighted: 0,
    speedWeight: 0,
    slowSeconds: 0,
    boostSeconds: 0,
    supersonicSeconds: 0,
    groundSeconds: 0,
    lowAirSeconds: 0,
    highAirSeconds: 0,
    powerslideSeconds: 0,
    powerslideCount: 0,
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
  const keys = [event.player_id, stringPayload(event.payload, "player_id"), remoteIdKey(event.payload.player)].filter(
    (key): key is string => Boolean(key),
  );
  return keys.flatMap((key) => [key, normalizePlayerKey(key)]);
}

function movementSegment(id: string, label: string, seconds: number, total: number): SegmentedBarSegment {
  const share = percentage(seconds, total);
  return {
    key: id,
    className: `movement-segment-${id}`,
    label,
    value: seconds,
    visibleLabel: share >= 12 ? `${label}: ${formatPercent(seconds, total)}` : undefined,
    title: `${label}: ${formatSeconds(seconds)} (${formatPercent(seconds, total)})`,
  };
}

function hasMovementData(summary: PlayerMovementSummary): boolean {
  return (
    summary.totalDistance > 0 ||
    summary.speedWeight > 0 ||
    speedBandTotal(summary) > 0 ||
    movementTimeTotal(summary) > 0 ||
    summary.powerslideSeconds > 0 ||
    summary.powerslideCount > 0
  );
}

function averageSpeed(summary: PlayerMovementSummary): number | null {
  if (summary.speedWeight > 0) return summary.speedWeighted / summary.speedWeight;
  return summary.activeSeconds > 0 && summary.totalDistance > 0 ? summary.totalDistance / summary.activeSeconds : null;
}

function averagePowerslideDuration(summary: PlayerMovementSummary): number {
  return summary.powerslideCount > 0 ? summary.powerslideSeconds / summary.powerslideCount : 0;
}

function speedBandTotal(summary: PlayerMovementSummary): number {
  return summary.slowSeconds + summary.boostSeconds + summary.supersonicSeconds;
}

function movementTimeTotal(summary: PlayerMovementSummary): number {
  return summary.groundSeconds + summary.lowAirSeconds + summary.highAirSeconds;
}

function eventDuration(event: MechanicEventResponse): number {
  const duration = firstNumber(event.payload, ["duration", "duration_seconds"]);
  if (duration != null) return duration;
  if (event.start_time != null && event.end_time != null) return Math.max(0, event.end_time - event.start_time);
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
  if (typeof id === "string" || typeof id === "number") return `${normalizePlatform(platform)}:${String(id)}`;
  if (id && typeof id === "object" && !Array.isArray(id)) {
    const nested = id as Record<string, unknown>;
    const onlineId = nested.online_id ?? nested.id;
    if (typeof onlineId === "string" || typeof onlineId === "number") return `${normalizePlatform(platform)}:${String(onlineId)}`;
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
  if (player.platform && player.platform_player_id) return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
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
  return value.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

function percentage(value: number, total: number): number {
  return total > 0 ? (value / total) * 100 : 0;
}

function barPercent(value: number | null, max: number): number {
  if (value == null || !Number.isFinite(value) || !Number.isFinite(max) || max <= 0) return 0;
  return (value / max) * 100;
}

function formatSpeed(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  return `${Math.round(value).toLocaleString()} uu/s`;
}

function formatDistance(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "Unknown";
  return `${Math.round(value).toLocaleString()} uu`;
}

function formatSeconds(value: number): string {
  if (!Number.isFinite(value)) return "Unknown";
  if (value > 0 && value < 10) return `${value.toFixed(1)}s`;
  return `${Math.round(value)}s`;
}

function formatPercent(value: number, total: number): string {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
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
