import { useMemo, useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import { SegmentedBar, type SegmentedBarSegment } from "./shared";

export const possessionEventTypes = ["possession"];

type PossessionState = "team_zero" | "team_one" | "neutral";
type FieldThird = "team_zero_third" | "neutral_third" | "team_one_third";
type FieldHalf = "team_zero_side" | "neutral" | "team_one_side";
type PossessionComparisonMode = "teams" | "players";

interface PossessionSpan {
  key: string;
  start: number;
  end: number;
  duration: number;
  state: PossessionState;
  third: FieldThird | null;
  playerId: string | null;
}

interface PossessionBucket {
  key: string;
  label: string;
  seconds: number;
  stateSeconds: Record<PossessionState, number>;
}

const possessionStates: PossessionState[] = ["team_zero", "neutral", "team_one"];
const fieldThirds: FieldThird[] = ["team_zero_third", "neutral_third", "team_one_third"];
const fieldHalves: FieldHalf[] = ["team_zero_side", "neutral", "team_one_side"];

export function PossessionDetail({
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
  const spans = useMemo(() => possessionSpans(events), [events]);
  const chartDuration = Math.max(1, durationSeconds ?? 0, 60, ...spans.map((span) => span.end));
  const possessionTotals = possessionStateTotals(spans);
  const thirdBuckets = thirdZoneBuckets(spans);
  const halfBuckets = halfZoneBuckets(spans);
  const totalTrackedSeconds = sumObjectValues(possessionTotals);
  const thirdTrackedSeconds = thirdBuckets.reduce((total, bucket) => total + bucket.seconds, 0);
  const halfTrackedSeconds = halfBuckets.reduce((total, bucket) => total + bucket.seconds, 0);
  const [comparisonMode, setComparisonMode] = useState<PossessionComparisonMode>("teams");
  const playerSummaries = playerPossessionSummaries(players, spans);
  const hasPlayerSpans = playerSummaries.some((summary) => summary.seconds > 0);

  return (
    <div className="possession-detail">
      <PossessionComparisonModeToggle
        comparisonMode={comparisonMode}
        hasPlayerSpans={hasPlayerSpans}
        onComparisonModeChange={setComparisonMode}
      />
      <div className="stat-section-grid">
        <section className="chart-panel">
          <header className="chart-panel-header">
            <h3>{comparisonMode === "teams" ? "Possession share" : "Player possession"}</h3>
            <span>{formatSeconds(totalTrackedSeconds)} tracked</span>
          </header>
          {comparisonMode === "teams" ? (
            <PossessionShareChart totals={possessionTotals} totalSeconds={totalTrackedSeconds} />
          ) : (
            <PlayerPossessionChart summaries={playerSummaries} totalSeconds={totalTrackedSeconds} />
          )}
        </section>

        <section className="chart-panel">
          <header className="chart-panel-header">
            <h3>Possession by halves</h3>
            <span>{formatSeconds(halfTrackedSeconds)} tracked</span>
          </header>
          <BallZoneChart ariaLabel="Possession time by field halves" buckets={halfBuckets} totalSeconds={halfTrackedSeconds} />
        </section>

        <section className="chart-panel">
          <header className="chart-panel-header">
            <h3>Possession by thirds</h3>
            <span>{formatSeconds(thirdTrackedSeconds)} tracked</span>
          </header>
          <BallZoneChart ariaLabel="Possession time by field thirds" buckets={thirdBuckets} totalSeconds={thirdTrackedSeconds} />
        </section>

        {scope === "replay" ? (
          <section className="chart-panel full-span">
            <header className="chart-panel-header">
              <h3>Possession timeline</h3>
              <span>{formatSeconds(chartDuration)}</span>
            </header>
            <PossessionTimeline spans={spans} durationSeconds={chartDuration} />
          </section>
        ) : null}
      </div>
    </div>
  );
}

function PossessionComparisonModeToggle({
  comparisonMode,
  hasPlayerSpans,
  onComparisonModeChange,
}: {
  comparisonMode: PossessionComparisonMode;
  hasPlayerSpans: boolean;
  onComparisonModeChange: (mode: PossessionComparisonMode) => void;
}) {
  return (
    <div className="boost-page-controls">
      <div className="boost-comparison-tabs" role="tablist" aria-label="Possession comparison mode">
        <button
          className={comparisonMode === "teams" ? "active" : ""}
          onClick={() => onComparisonModeChange("teams")}
          role="tab"
          type="button"
          aria-selected={comparisonMode === "teams"}
        >
          Teams
        </button>
        <button
          className={comparisonMode === "players" ? "active" : ""}
          disabled={!hasPlayerSpans}
          onClick={() => onComparisonModeChange("players")}
          role="tab"
          title={hasPlayerSpans ? "Player possession" : "Reprocess this replay to populate player possession spans"}
          type="button"
          aria-selected={comparisonMode === "players"}
        >
          Players
        </button>
      </div>
    </div>
  );
}

function PossessionShareChart({
  totals,
  totalSeconds,
}: {
  totals: Record<PossessionState, number>;
  totalSeconds: number;
}) {
  const total = Math.max(0, totalSeconds);
  const segments = possessionStates.map((state) => possessionStateSegment(state, totals[state], total));

  return (
    <div className="possession-share-chart">
      <SegmentedBar ariaLabel="Possession share" className="possession-share-track" segments={segments} total={total} />
      <div className="possession-metric-grid">
        {possessionStates.map((state) => (
          <div className={`possession-metric possession-state-accent-${state}`} key={state}>
            <span>{possessionStateLabel(state)}</span>
            <strong>{formatPercent(percentage(totals[state], total))}</strong>
            <span>{formatSeconds(totals[state])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BallZoneChart({
  ariaLabel,
  buckets,
  totalSeconds,
}: {
  ariaLabel: string;
  buckets: PossessionBucket[];
  totalSeconds: number;
}) {
  const segments = buckets.map((bucket) => ballZoneSegment(bucket, totalSeconds));

  return (
    <div className="ball-zone-chart">
      <SegmentedBar ariaLabel={ariaLabel} className="ball-zone-track" segments={segments} total={totalSeconds} />
      <div className="ball-zone-list">
        {buckets.map((bucket) => {
          const percent = percentage(bucket.seconds, totalSeconds);
          return (
            <div className={`ball-zone-row ${zoneSideClass(bucket.key)}`} key={bucket.key}>
              <span>{bucket.label}</span>
              <strong>{formatPercent(percent)}</strong>
              <span>{formatSeconds(bucket.seconds)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface PlayerPossessionSummary {
  key: string;
  name: string;
  team: number | null;
  seconds: number;
}

function PlayerPossessionChart({
  summaries,
  totalSeconds,
}: {
  summaries: PlayerPossessionSummary[];
  totalSeconds: number;
}) {
  const maxSeconds = Math.max(1, ...summaries.map((summary) => summary.seconds));

  if (!summaries.some((summary) => summary.seconds > 0)) {
    return <div className="stat-empty">No player possession spans are available for this replay.</div>;
  }

  return (
    <div className="possession-player-bars">
      {summaries.map((summary) => {
        const percent = percentage(summary.seconds, totalSeconds);
        return (
          <div className="possession-player-row" key={summary.key}>
            <div className={`player-bar-label team-accent-${teamClass(summary.team)}`}>
              <strong>{summary.name}</strong>
              <span>{teamLabel(summary.team)}</span>
            </div>
            <SegmentedBar
              ariaLabel={`${summary.name} possession`}
              className="possession-player-track"
              maxValue={maxSeconds}
              segments={[
                {
                  key: summary.key,
                  className: `team-segment-${teamClass(summary.team)}`,
                  label: summary.name,
                  value: summary.seconds,
                  visibleLabel: `${formatSeconds(summary.seconds)} (${formatPercent(percent)})`,
                  title: `${summary.name}: ${formatSeconds(summary.seconds)} (${formatPercent(percent)})`,
                },
              ]}
              total={maxSeconds}
            />
          </div>
        );
      })}
    </div>
  );
}

function PossessionTimeline({
  spans,
  durationSeconds,
}: {
  spans: PossessionSpan[];
  durationSeconds: number;
}) {
  const width = 1000;
  const height = 116;
  const ticks = timelineTicks(durationSeconds);

  return (
    <div className="possession-timeline-wrap">
      <svg className="possession-timeline" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Possession over time">
        <rect className="possession-timeline-bg" x="0" y="30" width={width} height="34" rx="6" />
        {ticks.map((tick) => {
          const x = (tick / durationSeconds) * width;
          return (
            <g key={tick}>
              <line className="possession-timeline-grid" x1={x} x2={x} y1="22" y2="76" />
              <text className="possession-timeline-label" textAnchor={timelineTickAnchor(tick, durationSeconds)} x={x} y="98">
                {formatClock(tick)}
              </text>
            </g>
          );
        })}
        {spans.map((span) => {
          const x = (span.start / durationSeconds) * width;
          const segmentWidth = Math.max(0.8, (span.duration / durationSeconds) * width);
          return (
            <rect
              className={`possession-timeline-segment possession-state-${span.state}`}
              key={span.key}
              x={x}
              y="30"
              width={segmentWidth}
              height="34"
            >
              <title>{`${formatClock(span.start)}-${formatClock(span.end)}: ${possessionStateLabel(span.state)} (${formatSeconds(span.duration)})`}</title>
            </rect>
          );
        })}
      </svg>
      <div className="chart-legend possession-legend">
        <span className="legend-team-blue">Blue</span>
        <span className="legend-neutral">Neutral</span>
        <span className="legend-team-orange">Orange</span>
      </div>
    </div>
  );
}

function possessionSpans(events: MechanicEventResponse[]): PossessionSpan[] {
  return events
    .filter((event) => event.event_type === "possession")
    .map((event, index) => possessionSpan(event, index))
    .filter((span): span is PossessionSpan => span != null)
    .sort((left, right) => left.start - right.start || left.end - right.end);
}

function possessionSpan(event: MechanicEventResponse, index: number): PossessionSpan | null {
  if (booleanPayload(event.payload, "active") === false) return null;

  const start = event.start_time ?? numericPayload(event.payload, "time") ?? event.event_time ?? 0;
  const payloadDuration = numericPayload(event.payload, "duration");
  const end = event.end_time ?? numericPayload(event.payload, "end_time") ?? (payloadDuration == null ? start : start + payloadDuration);
  const duration = payloadDuration ?? Math.max(0, end - start);
  const state = possessionState(event.payload.possession_state);
  if (state == null || duration <= 0 || !Number.isFinite(start) || !Number.isFinite(end)) return null;

  return {
    key: event.id || `${index}:${start}:${end}`,
    start,
    end: Math.max(start, end),
    duration,
    state,
    third: fieldThird(event.payload.field_third),
    playerId: event.player_id ?? stringPayload(event.payload, "player_id"),
  };
}

function possessionStateTotals(spans: PossessionSpan[]): Record<PossessionState, number> {
  const totals = emptyStateTotals();
  for (const span of spans) {
    totals[span.state] += span.duration;
  }
  return totals;
}

function thirdZoneBuckets(spans: PossessionSpan[]): PossessionBucket[] {
  const buckets = fieldThirds.map((third) => emptyBucket(third, fieldThirdLabel(third)));
  const bucketByThird = new Map(buckets.map((bucket) => [bucket.key, bucket]));

  for (const span of spans) {
    if (span.third == null) continue;
    addBucketSeconds(bucketByThird.get(span.third), span.state, span.duration);
  }

  return buckets;
}

function halfZoneBuckets(spans: PossessionSpan[]): PossessionBucket[] {
  const buckets = fieldHalves.map((half) => emptyBucket(half, fieldHalfLabel(half)));
  const bucketByHalf = new Map(buckets.map((bucket) => [bucket.key, bucket]));

  for (const span of spans) {
    if (span.third == null) continue;
    addBucketSeconds(bucketByHalf.get(fieldHalfForThird(span.third)), span.state, span.duration);
  }

  return buckets;
}

function emptyBucket(key: string, label: string): PossessionBucket {
  return {
    key,
    label,
    seconds: 0,
    stateSeconds: emptyStateTotals(),
  };
}

function emptyStateTotals(): Record<PossessionState, number> {
  return {
    team_zero: 0,
    team_one: 0,
    neutral: 0,
  };
}

function addBucketSeconds(bucket: PossessionBucket | undefined, state: PossessionState, seconds: number) {
  if (!bucket || seconds <= 0) return;
  bucket.seconds += seconds;
  bucket.stateSeconds[state] += seconds;
}

function playerPossessionSummaries(players: ReplayPlayer[], spans: PossessionSpan[]): PlayerPossessionSummary[] {
  const summaries = players.map((player, index) => {
    const key = playerKey(player, index);
    const seconds = spans
      .filter((span) => span.playerId != null && playerMatchesId(player, span.playerId))
      .reduce((total, span) => total + span.duration, 0);

    return {
      key,
      name: player.name || player.platform_player_id || "Unknown",
      team: player.team,
      seconds,
    };
  });

  return summaries.sort((left, right) => {
    if (right.seconds !== left.seconds) return right.seconds - left.seconds;
    if ((left.team ?? 99) !== (right.team ?? 99)) return (left.team ?? 99) - (right.team ?? 99);
    return left.name.localeCompare(right.name);
  });
}

function possessionStateSegment(state: PossessionState, seconds: number, totalSeconds: number): SegmentedBarSegment {
  const percent = percentage(seconds, totalSeconds);
  return {
    key: state,
    className: `possession-state-${state}`,
    label: possessionStateLabel(state),
    value: seconds,
    visibleLabel: percent >= 8 ? `${formatSeconds(seconds)} (${formatPercent(percent)})` : undefined,
    title: `${possessionStateLabel(state)}: ${formatSeconds(seconds)} (${formatPercent(percent)})`,
  };
}

function ballZoneSegment(bucket: PossessionBucket, totalSeconds: number): SegmentedBarSegment {
  const percent = percentage(bucket.seconds, totalSeconds);
  return {
    key: bucket.key,
    className: zoneSideClass(bucket.key),
    label: bucket.label,
    value: bucket.seconds,
    visibleLabel: percent >= 8 ? `${shortFieldZoneLabel(bucket.key)}: ${formatSeconds(bucket.seconds)} (${formatPercent(percent)})` : undefined,
    title: `${bucket.label}: ${formatSeconds(bucket.seconds)} (${formatPercent(percent)})`,
  };
}

function timelineTicks(durationSeconds: number): number[] {
  const duration = Math.max(1, durationSeconds);
  const targetTickCount = 5;
  const roughStep = duration / targetTickCount;
  const step =
    roughStep <= 30
      ? 30
      : roughStep <= 60
        ? 60
        : roughStep <= 120
          ? 120
          : Math.ceil(roughStep / 60) * 60;
  const ticks = [0];
  for (let tick = step; tick < duration; tick += step) {
    ticks.push(tick);
  }
  ticks.push(duration);
  return ticks;
}

function timelineTickAnchor(tick: number, durationSeconds: number): "start" | "middle" | "end" {
  if (tick === 0) return "start";
  if (tick === durationSeconds) return "end";
  return "middle";
}

function numericPayload(payload: Record<string, unknown>, key: string): number | null {
  const value = payload[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function booleanPayload(payload: Record<string, unknown>, key: string): boolean | null {
  const value = payload[key];
  return typeof value === "boolean" ? value : null;
}

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function possessionState(value: unknown): PossessionState | null {
  return value === "team_zero" || value === "team_one" || value === "neutral" ? value : null;
}

function fieldThird(value: unknown): FieldThird | null {
  return value === "team_zero_third" || value === "team_one_third" || value === "neutral_third" ? value : null;
}

function possessionStateLabel(state: PossessionState): string {
  if (state === "team_zero") return "Blue";
  if (state === "team_one") return "Orange";
  return "Neutral";
}

function fieldThirdLabel(third: FieldThird): string {
  if (third === "team_zero_third") return "Blue third";
  if (third === "team_one_third") return "Orange third";
  return "Neutral third";
}

function fieldHalfForThird(third: FieldThird): FieldHalf {
  if (third === "team_zero_third") return "team_zero_side";
  if (third === "team_one_third") return "team_one_side";
  return "neutral";
}

function fieldHalfLabel(half: FieldHalf): string {
  if (half === "team_zero_side") return "Blue half";
  if (half === "team_one_side") return "Orange half";
  return "Neutral";
}

function shortFieldZoneLabel(key: string): string {
  if (key.includes("team_zero")) return "Blue";
  if (key.includes("team_one")) return "Orange";
  return "Neutral";
}

function playerKey(player: ReplayPlayer, index: number): string {
  return `${player.platform ?? "unknown"}:${player.platform_player_id ?? player.name ?? index}`;
}

function playerMatchesId(player: ReplayPlayer, playerId: string): boolean {
  return player.platform_player_id === playerId || playerKey(player, -1) === playerId || player.name === playerId;
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

function zoneSideClass(key: string): string {
  if (key.includes("team_zero")) return "ball-zone-side-team-zero";
  if (key.includes("team_one")) return "ball-zone-side-team-one";
  return "ball-zone-side-neutral";
}

function percentage(value: number, total: number): number {
  return total > 0 ? (value / total) * 100 : 0;
}

function sumObjectValues(record: Record<string, number>): number {
  return Object.values(record).reduce((total, value) => total + value, 0);
}

function formatSeconds(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  if (value > 0 && value < 10) return `${value.toFixed(1)}s`;
  return `${Math.round(value)}s`;
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return "0%";
  return `${Math.round(value)}%`;
}

function formatClock(value: number): string {
  const clampedValue = Math.max(0, Math.round(value));
  const minutes = Math.floor(clampedValue / 60);
  const seconds = clampedValue % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
