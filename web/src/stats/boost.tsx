import { type ReactNode, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getPlayerBoostTotals, listBoostTracks, listReplayGroupBoostTotals } from "../api";
import type {
  BoostTrack,
  GroupBoostTotal,
  GroupBoostTotalsResponse,
  MechanicEventResponse,
  PlayerBoostTotal,
  PlayerBoostTotalsResponse,
  ReplayPlayer,
} from "../types";
import { boostAmountToPercent } from "./boostUnits";
import {
  SegmentedBar,
  type SegmentedBarSegment,
  statPercentWithValue,
  StatPlayerLabel,
  statPlayerRank,
  type StatPlayerRank,
} from "./shared";

// subtr-actor's consolidated boost model emits one rich pickup event per pad
// collection (with a `detection` provenance attribute) plus respawn events.
// Continuous boost amount and cumulative totals come from accumulation tracks
// fetched separately (see useBoostTracks), not from discrete events.
export const boostEventTypes = ["boost_pickup", "boost_respawn"];
interface BoostPlayerSummary {
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  rank: StatPlayerRank | null;
  team: number | null;
  average: number | null;
  bpm: number | null;
  bcpm: number | null;
  collected: number;
  collectedBig: number;
  collectedSmall: number;
  collectedGrant: number;
  collectedUnknown: number;
  used: number;
  stolen: number;
  stolenBigBoost: number;
  stolenBig: number;
  stolenSmall: number;
  stolenSmallBoost: number;
  stolenCount: number;
  bigPads: number;
  bigPadsOffensive: number;
  bigPadsNeutral: number;
  bigPadsDefensive: number;
  smallPads: number;
  smallPadsOffensive: number;
  smallPadsDefensive: number;
  usedWhileSupersonic: number;
  overfill: number;
  stolenOverfill: number;
  timeZeroBoost: number;
  timeHundredBoost: number;
  timeBoost0To25: number;
  timeBoost25To50: number;
  timeBoost50To75: number;
  timeBoost75To100: number;
  trackedSeconds: number;
}

interface BoostStateSample {
  playerId: string | null;
  team: number | null;
  time: number;
  amount: number;
}

interface BoostPickupMapPoint {
  key: string;
  playerKey: string;
  playerName: string;
  team: number | null;
  padId: string;
  x: number;
  y: number;
  padSize: "big" | "small";
  count: number;
  stolenCount: number;
  smallStolenCount: number;
  stolen: boolean;
  leader: boolean;
}

interface BoostPadLocation {
  id: string;
  x: number;
  y: number;
  size: "big" | "small";
}

const boostLevelBands = [
  { id: "empty", label: "0", min: -Infinity, max: 1 },
  { id: "low", label: "1-25", min: 1, max: 25 },
  { id: "medium", label: "25-50", min: 25, max: 50 },
  { id: "high", label: "50-75", min: 50, max: 75 },
  { id: "full", label: "75-100", min: 75, max: 100 },
  { id: "over", label: "100+", min: 100, max: Infinity },
];

type BoostLevelDistributionRow = {
  key: string;
  name: string;
  team: number | null;
  bands: Array<(typeof boostLevelBands)[number] & { seconds: number; percent: number }>;
};

const boostPadLocations = createBoostPadLocations();

type BoostComparisonMode = "players" | "teams";
type BoostComparisonValueMode = "totals" | "per-minute";
type BigPadZone = "offensive" | "neutral" | "defensive";

export function BoostDetail({
  events,
  players,
  durationSeconds,
  replayId,
  scope,
  groupId,
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
  replayId?: string;
  scope?: "replay" | "group";
  groupId?: string;
}) {
  // The instantaneous boost-amount timeline and cumulative totals are not
  // indexed as events: per replay they come from accumulation tracks, and for a
  // group they are pre-aggregated server-side (boost totals across replays). A
  // single boost-amount timeline has no meaning across a group, so the team
  // stacked line chart is replay-only.
  const isGroup = scope === "group";
  const tracks = useBoostTracks(isGroup ? undefined : replayId);
  const groupTotals = useGroupBoostTotals(isGroup ? groupId : undefined);

  const boostEvents = events.filter((event) => event.event_type.includes("boost"));
  const pickupEvents = boostEvents.filter((event) => event.event_type.startsWith("boost_pickup"));
  const respawnEvents = boostEvents.filter((event) => event.event_type === "boost_respawn");
  const stateSamples = useMemo(() => boostAmountSamplesFromTracks(tracks), [tracks]);
  const trackTotals = useMemo(() => cumulativeTrackTotals(tracks), [tracks]);
  const groupTotalsByKey = useMemo(
    () => new Map((groupTotals?.totals ?? []).map((total) => [total.player_id, total] as const)),
    [groupTotals],
  );
  const groupDurationSeconds = groupTotals?.duration_seconds ?? 0;
  const summaries = useMemo(
    () =>
      isGroup
        ? groupBoostPlayerSummaries(
            players,
            pickupEvents,
            respawnEvents,
            groupTotalsByKey,
            groupDurationSeconds,
          )
        : boostPlayerSummaries(players, stateSamples, pickupEvents, respawnEvents, trackTotals),
    [
      isGroup,
      players,
      stateSamples,
      pickupEvents,
      respawnEvents,
      trackTotals,
      groupTotalsByKey,
      groupDurationSeconds,
    ],
  );
  const pickupMapPoints = boostPickupMapPoints(players, pickupEvents);
  const chartDuration = isGroup
    ? Math.max(1, groupDurationSeconds)
    : (durationSeconds ??
      Math.max(
        60,
        ...stateSamples.map((sample) => sample.time),
        ...boostEvents.map((event) => event.event_time ?? 0),
      ));
  const playerLevelRows = useMemo(
    () =>
      isGroup
        ? groupBoostLevelDistribution(players, groupTotalsByKey)
        : boostLevelDistribution(stateSamples, players, chartDuration),
    [isGroup, players, groupTotalsByKey, stateSamples, chartDuration],
  );
  const isOneVOne = isOneVOneMatch(players);
  const [selectedComparisonMode, setSelectedComparisonMode] =
    useState<BoostComparisonMode>("players");
  const comparisonMode = isOneVOne ? "players" : selectedComparisonMode;

  return (
    <div className="boost-detail">
      {isOneVOne ? null : (
        <BoostComparisonModeToggle
          comparisonMode={comparisonMode}
          onComparisonModeChange={setSelectedComparisonMode}
        />
      )}
      <div className="stat-section-grid">
        <section className="chart-panel full-span">
          <PlayerBoostEconomyChart
            comparisonMode={comparisonMode}
            durationSeconds={chartDuration}
            playerLevelRows={playerLevelRows}
            players={players}
            summaries={summaries}
          />
        </section>

        <section className="chart-panel full-span">
          <BoostStatTable
            comparisonMode={comparisonMode}
            summaries={summaries}
            durationSeconds={chartDuration}
          />
        </section>

        <section className="chart-panel full-span">
          <PadPickupMaps
            comparisonMode={comparisonMode}
            players={players}
            points={pickupMapPoints}
          />
        </section>

        {isGroup ? null : (
          <section className="chart-panel full-span">
            <TeamBoostStackedLineChart
              comparisonMode={comparisonMode}
              samples={stateSamples}
              players={players}
              durationSeconds={chartDuration}
            />
          </section>
        )}
      </div>
    </div>
  );
}

export function BoostProfileDetail({
  platform,
  platformPlayerId,
  playerName,
  search,
}: {
  platform: string;
  platformPlayerId: string;
  playerName: string;
  search: string;
}) {
  const [totals, setTotals] = useState<PlayerBoostTotalsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setTotals(null);
    getPlayerBoostTotals(platform, platformPlayerId, new URLSearchParams(search))
      .then((response) => {
        if (!cancelled) setTotals(response);
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
  }, [platform, platformPlayerId, search]);

  if (loading) {
    return <div className="stat-empty">Loading boost totals...</div>;
  }

  if (error) {
    return <div className="stat-empty">Boost totals are unavailable: {error}</div>;
  }

  if (
    !totals ||
    (!boostTotalHasData(totals.player) &&
      !boostTotalHasData(totals.teammates) &&
      !boostTotalHasData(totals.opponents))
  ) {
    return (
      <div className="stat-empty">No boost-track totals are available for this replay set.</div>
    );
  }

  const { levelRows, summaries } = boostProfileData(totals, {
    platform,
    platformPlayerId,
    playerName,
  });

  return (
    <section className="chart-panel full-span boost-profile-panel">
      <header className="chart-panel-header">
        <h3>Boost economy</h3>
        <span>Boost rates, source breakdowns, and pad pickups across this replay set</span>
      </header>
      <BoostEconomyComparisonGrid
        comparisonMode="players"
        durationSeconds={Math.max(1, ...summaries.map((summary) => summary.trackedSeconds))}
        includeCollectionBreakdownCharts
        includePadBreakdowns
        levelRows={levelRows}
        profilePathForSummary={(summary) => playerProfilePath(summary)}
        segmentColorClassNameForSummary={boostProfileSegmentColorClassName}
        showPlatformBadgeForSummary={(summary) => summary.key === "player"}
        subtitleForSummary={(summary) =>
          summary.key === "player"
            ? "Player"
            : summary.key === "teammates"
              ? "Same-team players"
              : "Other-team players"
        }
        summaries={summaries}
        valueMode="per-minute"
      />
    </section>
  );
}

function boostProfileSegmentColorClassName(summary: BoostPlayerSummary): string {
  if (summary.key === "player") return "boost-profile-subject";
  if (summary.key === "teammates") return "boost-profile-teammates";
  return "boost-profile-opponents";
}

function BoostComparisonModeToggle({
  comparisonMode,
  onComparisonModeChange,
}: {
  comparisonMode: BoostComparisonMode;
  onComparisonModeChange: (mode: BoostComparisonMode) => void;
}) {
  return (
    <div className="boost-page-controls">
      <div className="boost-comparison-tabs" role="tablist" aria-label="Boost comparison mode">
        <button
          className={comparisonMode === "players" ? "active" : ""}
          onClick={() => onComparisonModeChange("players")}
          role="tab"
          type="button"
          aria-selected={comparisonMode === "players"}
        >
          Players
        </button>
        <button
          className={comparisonMode === "teams" ? "active" : ""}
          onClick={() => onComparisonModeChange("teams")}
          role="tab"
          type="button"
          aria-selected={comparisonMode === "teams"}
        >
          Teams
        </button>
      </div>
    </div>
  );
}

function boostProfileData(
  totals: PlayerBoostTotalsResponse,
  player: { platform: string; platformPlayerId: string; playerName: string },
): { summaries: BoostPlayerSummary[]; levelRows: BoostLevelDistributionRow[] } {
  const rows = [
    boostProfileSummary("player", player.playerName || player.platformPlayerId, totals.player, {
      platform: player.platform,
      platformPlayerId: player.platformPlayerId,
    }),
    totals.teammates
      ? boostProfileSummary("teammates", "Teammates", totals.teammates, {
          platform: null,
          platformPlayerId: null,
        })
      : null,
    totals.opponents
      ? boostProfileSummary("opponents", "Opponents", totals.opponents, {
          platform: null,
          platformPlayerId: null,
        })
      : null,
  ].filter((summary): summary is BoostPlayerSummary =>
    Boolean(summary && boostSummaryHasData(summary)),
  );

  return {
    summaries: rows,
    levelRows: rows.map(boostProfileLevelRow),
  };
}

function boostProfileSummary(
  key: string,
  name: string,
  total: PlayerBoostTotal,
  identity: { platform: string | null; platformPlayerId: string | null },
): BoostPlayerSummary {
  const trackedSeconds = Math.max(0, total.tracked_seconds);
  const knownCollected =
    total.boost_collected_big + total.boost_collected_small + total.boost_collected_grant;
  const collected = Math.max(total.boost_collected, knownCollected);
  const knownStolen = total.boost_stolen_big + total.boost_stolen_small;
  const stolen = Math.max(total.boost_stolen, knownStolen);
  return {
    key,
    name,
    platform: identity.platform,
    platformPlayerId: identity.platformPlayerId,
    rank: null,
    team: null,
    average:
      trackedSeconds > 0 ? total.boost_amount_weighted_sum / Math.max(1, trackedSeconds) : null,
    bpm: trackedSeconds > 0 ? (collected * 60) / trackedSeconds : null,
    bcpm: trackedSeconds > 0 ? (collected * 60) / trackedSeconds : null,
    collected,
    collectedBig: total.boost_collected_big,
    collectedSmall: total.boost_collected_small,
    collectedGrant: total.boost_collected_grant,
    collectedUnknown: Math.max(total.boost_collected_unknown, collected - knownCollected),
    used: total.boost_used,
    stolen,
    stolenBigBoost: total.boost_stolen_big,
    stolenBig: total.stolen_big_pads,
    stolenSmall: total.stolen_small_pads,
    stolenSmallBoost: total.boost_stolen_small,
    stolenCount: total.stolen_pads,
    bigPads: total.big_pads,
    bigPadsOffensive: total.big_pads_offensive,
    bigPadsNeutral: total.big_pads_neutral,
    bigPadsDefensive: total.big_pads_defensive,
    smallPads: total.small_pads,
    smallPadsOffensive: total.small_pads_offensive,
    smallPadsDefensive: total.small_pads_defensive,
    usedWhileSupersonic: total.boost_used_supersonic,
    overfill: total.boost_overfill,
    stolenOverfill: total.boost_stolen_overfill,
    timeZeroBoost: total.time_empty,
    timeHundredBoost: total.time_over,
    timeBoost0To25: total.time_empty + total.time_low,
    timeBoost25To50: total.time_medium,
    timeBoost50To75: total.time_high,
    timeBoost75To100: total.time_full + total.time_over,
    trackedSeconds,
  };
}

function boostProfileLevelRow(summary: BoostPlayerSummary): BoostLevelDistributionRow {
  return {
    key: summary.key,
    name: summary.name,
    team: summary.team,
    bands: boostLevelBands.map((band) => {
      const seconds =
        band.id === "empty"
          ? summary.timeZeroBoost
          : band.id === "low"
            ? Math.max(0, summary.timeBoost0To25 - summary.timeZeroBoost)
            : band.id === "medium"
              ? summary.timeBoost25To50
              : band.id === "high"
                ? summary.timeBoost50To75
                : band.id === "full"
                  ? Math.max(0, summary.timeBoost75To100 - summary.timeHundredBoost)
                  : summary.timeHundredBoost;
      return {
        ...band,
        seconds,
        percent: percentOf(seconds, summary.trackedSeconds),
      };
    }),
  };
}

function boostTotalHasData(total: PlayerBoostTotal | null): boolean {
  return Boolean(
    total &&
    (total.tracked_seconds > 0 ||
      total.boost_collected > 0 ||
      total.boost_collected_big > 0 ||
      total.boost_collected_small > 0 ||
      total.boost_collected_grant > 0 ||
      total.boost_stolen > 0 ||
      total.boost_overfill > 0 ||
      total.boost_used > 0 ||
      total.boost_used_supersonic > 0 ||
      total.big_pads > 0 ||
      total.small_pads > 0),
  );
}

function boostSummaryHasData(summary: BoostPlayerSummary): boolean {
  return (
    summary.trackedSeconds > 0 ||
    summary.collected > 0 ||
    summary.bigPads > 0 ||
    summary.smallPads > 0 ||
    summary.stolen > 0 ||
    summary.overfill > 0 ||
    summary.used > 0 ||
    summary.usedWhileSupersonic > 0
  );
}

function TeamBoostStackedLineChart({
  comparisonMode,
  samples,
  players,
  durationSeconds,
}: {
  comparisonMode: BoostComparisonMode;
  samples: BoostStateSample[];
  players: ReplayPlayer[];
  durationSeconds: number;
}) {
  const timeSeries = teamBoostContributionsOverTime(samples, players, durationSeconds);
  const [zoomDomain, setZoomDomain] = useState<[number, number] | null>(null);
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null);
  const maxTotal = Math.max(
    100,
    ...timeSeries.map(
      (point) => teamContributionTotal(point.blue) + teamContributionTotal(point.orange),
    ),
  );
  const yMax = Math.ceil(maxTotal / 25) * 25;
  const blueSeries = teamBoostAreaSeries(timeSeries, players, 0, durationSeconds);
  const orangeSeries = teamBoostAreaSeries(timeSeries, players, 1, durationSeconds);
  const chartData = blueSeries.data.map((row, index) => {
    const mergedRow = { ...row };
    const orangeRow = orangeSeries.data[index] ?? {};
    for (const [key, value] of Object.entries(orangeRow)) {
      if (key !== "time" && typeof value === "number") {
        mergedRow[key] = value;
      }
    }
    const blueTotal = teamContributionTotal(timeSeries[index]?.blue ?? []);
    const orangeTotal = teamContributionTotal(timeSeries[index]?.orange ?? []);
    mergedRow.blue_total = blueTotal;
    mergedRow.orange_total = orangeTotal;
    mergedRow.all_total = blueTotal + orangeTotal;
    return mergedRow;
  });
  const stackedPlayers = [...blueSeries.players, ...orangeSeries.players];
  const stackedSeries =
    comparisonMode === "players"
      ? stackedPlayers
      : [
          {
            key: "team:0",
            dataKey: "blue_total",
            name: "Blue team",
            playerIndex: 0,
            team: "blue" as const,
            color: chartPalette.teamBlue[0],
          },
          {
            key: "team:1",
            dataKey: "orange_total",
            name: "Orange team",
            playerIndex: 1,
            team: "orange" as const,
            color: chartPalette.teamOrange[0],
          },
        ];
  const stackedDataKeys = stackedSeries.map((series) => series.dataKey);
  const selectionStart = selectionRange ? Math.min(selectionRange.start, selectionRange.end) : null;
  const selectionEnd = selectionRange ? Math.max(selectionRange.start, selectionRange.end) : null;

  function handleZoomStart(event: BoostTimelineMouseEvent | undefined) {
    const time = timelineEventTime(event);
    if (time == null) return;
    setSelectionRange({ start: time, end: time });
  }

  function handleZoomMove(event: BoostTimelineMouseEvent | undefined) {
    const time = timelineEventTime(event);
    if (time == null) return;
    setSelectionRange((range) => (range ? { ...range, end: time } : range));
  }

  function handleZoomEnd() {
    if (!selectionRange) return;
    const start = Math.min(selectionRange.start, selectionRange.end);
    const end = Math.max(selectionRange.start, selectionRange.end);
    setSelectionRange(null);
    if (end - start < 2) return;
    setZoomDomain([start, end]);
  }

  return (
    <div className="chart-wrap team-boost-chart">
      {zoomDomain ? (
        <div className="chart-control-row">
          <button
            className="secondary-button compact-button"
            type="button"
            onClick={() => setZoomDomain(null)}
          >
            Reset zoom
          </button>
        </div>
      ) : null}
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={chartData}
          margin={{ top: 12, right: 10, bottom: 12, left: -18 }}
          onMouseDown={handleZoomStart}
          onMouseMove={handleZoomMove}
          onMouseUp={handleZoomEnd}
          onMouseLeave={() => setSelectionRange(null)}
          onDoubleClick={() => setZoomDomain(null)}
        >
          <CartesianGrid stroke={chartPalette.grid} vertical={false} />
          <XAxis
            allowDataOverflow
            dataKey="time"
            domain={zoomDomain ?? ["dataMin", "dataMax"]}
            minTickGap={48}
            tick={{ fill: chartPalette.muted, fontSize: 12 }}
            tickFormatter={(value) => formatSeconds(typeof value === "number" ? value : null)}
            tickLine={false}
            type="number"
            axisLine={{ stroke: chartPalette.axis }}
          />
          <YAxis
            domain={[0, yMax]}
            ticks={[0, 50, 100, yMax].filter(
              (value, index, values) => value <= yMax && values.indexOf(value) === index,
            )}
            tick={{ fill: chartPalette.muted, fontSize: 12 }}
            tickFormatter={(value) => formatBoost(typeof value === "number" ? value : null)}
            tickLine={false}
            axisLine={{ stroke: chartPalette.axis }}
          />
          <Tooltip
            content={(props: BoostTimelineTooltipProps) => (
              <BoostTimelineTooltip
                {...props}
                showTeamTotals={comparisonMode === "players"}
                stackedDataKeys={stackedDataKeys}
              />
            )}
          />
          {stackedSeries.map((player) => (
            <Area
              dataKey={player.dataKey}
              fill={player.color}
              fillOpacity={0.62}
              key={player.key}
              isAnimationActive={false}
              name={player.name}
              stackId="all"
              stroke={player.color}
              strokeOpacity={0.74}
              strokeWidth={1.5}
              type="linear"
            />
          ))}
          {comparisonMode === "players" ? (
            <>
              <Line
                dataKey="blue_total"
                dot={false}
                isAnimationActive={false}
                name="Blue subtotal"
                stroke={chartPalette.teamBlue[0]}
                strokeWidth={2.5}
                type="linear"
              />
              <Line
                dataKey="all_total"
                dot={false}
                isAnimationActive={false}
                name="Combined total"
                stroke={chartPalette.total}
                strokeWidth={2.5}
                type="linear"
              />
            </>
          ) : null}
          {selectionStart != null && selectionEnd != null ? (
            <ReferenceArea
              ifOverflow="visible"
              x1={selectionStart}
              x2={selectionEnd}
              strokeOpacity={0.28}
              fill={chartPalette.selection}
              fillOpacity={0.18}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        {stackedSeries.map((player) => (
          <span
            className={`legend-team-${player.team} legend-player-${player.playerIndex}`}
            key={player.key}
          >
            {player.name}
          </span>
        ))}
      </div>
    </div>
  );
}

interface BoostTimelineMouseEvent {
  activeLabel?: unknown;
}

function timelineEventTime(event: BoostTimelineMouseEvent | undefined): number | null {
  const value = event?.activeLabel;
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

interface BoostTimelineTooltipPayloadItem {
  color?: string;
  dataKey?: unknown;
  name?: unknown;
  payload?: Record<string, unknown>;
  value?: unknown;
}

interface BoostTimelineTooltipProps {
  active?: boolean;
  label?: unknown;
  payload?: readonly BoostTimelineTooltipPayloadItem[];
  showTeamTotals?: boolean;
  stackedDataKeys?: readonly string[];
}

function BoostTimelineTooltip({
  active,
  label,
  payload,
  showTeamTotals = false,
  stackedDataKeys = [],
}: BoostTimelineTooltipProps) {
  if (!active || !payload?.length) return null;

  const stackedKeySet = new Set(stackedDataKeys);
  const playerRows = payload.filter(
    (item) => typeof item.dataKey === "string" && stackedKeySet.has(item.dataKey),
  );
  const dataRow = payload.find((item) => item.payload)?.payload ?? {};
  const blueTotal = numericRecordValue(dataRow, "blue_total");
  const orangeTotal = numericRecordValue(dataRow, "orange_total");
  const combinedTotal = numericRecordValue(dataRow, "all_total");

  return (
    <div className="boost-timeline-tooltip">
      <div className="boost-timeline-tooltip-title">
        Time {formatSeconds(typeof label === "number" ? label : null)}
      </div>
      <div className="boost-timeline-tooltip-list">
        {playerRows.map((item) => (
          <div className="boost-timeline-tooltip-row" key={String(item.dataKey)}>
            <span className="boost-timeline-tooltip-label">
              <span className="boost-timeline-tooltip-swatch" style={{ background: item.color }} />
              {typeof item.name === "string" || typeof item.name === "number"
                ? item.name
                : "Unknown"}
            </span>
            <strong>{formatBoost(typeof item.value === "number" ? item.value : null)}</strong>
          </div>
        ))}
      </div>
      {showTeamTotals ? (
        <div className="boost-timeline-tooltip-totals">
          <div className="boost-timeline-tooltip-row">
            <span className="boost-timeline-tooltip-label team-total-blue">Blue subtotal</span>
            <strong>{formatBoost(blueTotal)}</strong>
          </div>
          <div className="boost-timeline-tooltip-row">
            <span className="boost-timeline-tooltip-label team-total-orange">Orange subtotal</span>
            <strong>{formatBoost(orangeTotal)}</strong>
          </div>
          <div className="boost-timeline-tooltip-row">
            <span className="boost-timeline-tooltip-label team-total-combined">Combined total</span>
            <strong>{formatBoost(combinedTotal)}</strong>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function numericRecordValue(record: Record<string, unknown>, key: string): number | null {
  const value = record[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function PlayerBoostEconomyChart({
  comparisonMode,
  summaries,
  playerLevelRows,
  players,
  durationSeconds,
}: {
  comparisonMode: BoostComparisonMode;
  summaries: BoostPlayerSummary[];
  playerLevelRows: BoostLevelDistributionRow[];
  players: ReplayPlayer[];
  durationSeconds: number;
}) {
  const levelRows =
    comparisonMode === "players" ? playerLevelRows : teamBoostLevelDistribution(playerLevelRows);
  const playerIndexByKey = teamLocalPlayerIndexByKey(players);

  return (
    <BoostEconomyComparisonGrid
      comparisonMode={comparisonMode}
      durationSeconds={durationSeconds}
      includePadBreakdowns
      levelRows={levelRows}
      playerIndexByKey={playerIndexByKey}
      summaries={summaries}
    />
  );
}

function BoostEconomyComparisonGrid({
  comparisonMode,
  durationSeconds,
  includeCollectionBreakdownCharts = false,
  includePadBreakdowns,
  levelRows,
  playerIndexByKey = new Map(),
  profilePathForSummary = playerProfilePath,
  segmentColorClassNameForSummary = () => null,
  showPlatformBadgeForSummary = () => comparisonMode === "players",
  subtitleForSummary,
  summaries,
  valueMode = "totals",
}: {
  comparisonMode: BoostComparisonMode;
  durationSeconds: number;
  includeCollectionBreakdownCharts?: boolean;
  includePadBreakdowns: boolean;
  levelRows: BoostLevelDistributionRow[];
  playerIndexByKey?: Map<string, number>;
  profilePathForSummary?: (summary: BoostPlayerSummary) => string | null;
  segmentColorClassNameForSummary?: (summary: BoostPlayerSummary) => string | null;
  showPlatformBadgeForSummary?: (summary: BoostPlayerSummary) => boolean;
  subtitleForSummary?: (summary: BoostPlayerSummary) => string;
  summaries: BoostPlayerSummary[];
  valueMode?: BoostComparisonValueMode;
}) {
  const boostLevelsByPlayer = new Map(levelRows.map((row) => [row.key, row]));
  const summaryPlayerIndex = (summary: BoostPlayerSummary) =>
    comparisonMode === "players" ? (playerIndexByKey.get(summary.key) ?? null) : null;
  const summaryColorClassName = (summary: BoostPlayerSummary) =>
    comparisonMode === "players" ? segmentColorClassNameForSummary(summary) : null;
  const comparisonSummaries =
    comparisonMode === "players"
      ? summaries
      : [
          teamBoostSummary(summaries, 0, durationSeconds),
          teamBoostSummary(summaries, 1, durationSeconds),
        ];
  const durationForSummary = (summary: BoostPlayerSummary) =>
    Math.max(1, summary.trackedSeconds || durationSeconds);
  const scaleBoostValue = (summary: BoostPlayerSummary, value: number) =>
    scaledComparisonValue(value, durationForSummary(summary), valueMode);
  const scaleCountValue = (summary: BoostPlayerSummary, value: number) =>
    scaledComparisonValue(value, durationForSummary(summary), valueMode);
  const boostValueLabel = (summary: BoostPlayerSummary, value: number) =>
    formatBoostComparisonValue(value, durationForSummary(summary), valueMode);
  const countValueLabel = (summary: BoostPlayerSummary, value: number) =>
    formatCountComparisonValue(value, durationForSummary(summary), valueMode);
  const boostSegmentTitle = (label: string, value: number, duration: number) =>
    comparisonSegmentTitle(label, value, duration, valueMode, "boost");
  const countSegmentTitle = (label: string, value: number, duration: number) =>
    comparisonSegmentTitle(label, value, duration, valueMode, "count");
  const boostAmountScaleMax = maxSummaryValue(comparisonSummaries, (summary) =>
    Math.max(
      scaleBoostValue(summary, summary.collected),
      scaleBoostValue(summary, bigPadPotentialBoost(summary)),
      scaleBoostValue(summary, smallPadPotentialBoost(summary)),
      scaleBoostValue(summary, summary.stolen),
      scaleBoostValue(summary, summary.used),
      scaleBoostValue(summary, summary.overfill + summary.usedWhileSupersonic),
    ),
  );
  const collectedSegments = (summary: BoostPlayerSummary): BoostComparisonSegment[] => {
    const rowDuration = durationForSummary(summary);
    return includePadBreakdowns
      ? [
          {
            className: "big-pad-source",
            label: "Big",
            value: scaledComparisonValue(summary.collectedBig, rowDuration, valueMode),
            visibleLabel: `${summary.bigPads.toLocaleString()} big / ${formatBoostComparisonValue(summary.collectedBig, rowDuration, valueMode)}`,
            title: boostSegmentTitle("Big pad boost", summary.collectedBig, rowDuration),
          },
          {
            className: "small-pad-source",
            label: "Small",
            value: scaledComparisonValue(summary.collectedSmall, rowDuration, valueMode),
            visibleLabel: `${summary.smallPads.toLocaleString()} small / ${formatBoostComparisonValue(summary.collectedSmall, rowDuration, valueMode)}`,
            title: boostSegmentTitle("Small pad boost", summary.collectedSmall, rowDuration),
          },
          {
            className: "grant-source",
            label: "Grant",
            value: scaledComparisonValue(summary.collectedGrant, rowDuration, valueMode),
            visibleLabel: `Grant / ${formatBoostComparisonValue(summary.collectedGrant, rowDuration, valueMode)}`,
            title: boostSegmentTitle("Grant boost", summary.collectedGrant, rowDuration),
          },
          {
            className: "unknown-pad-source",
            label: "Other",
            value: scaledComparisonValue(summary.collectedUnknown, rowDuration, valueMode),
            visibleLabel: `Other / ${formatBoostComparisonValue(summary.collectedUnknown, rowDuration, valueMode)}`,
            title: boostSegmentTitle("Other boost", summary.collectedUnknown, rowDuration),
          },
        ]
      : [
          {
            className: "unknown-pad-source",
            label: "Collected",
            value: scaledComparisonValue(summary.collected, rowDuration, valueMode),
            visibleLabel: formatBoostComparisonValue(summary.collected, rowDuration, valueMode),
            title: boostSegmentTitle("Collected boost", summary.collected, rowDuration),
          },
        ];
  };
  const collectionBreakdownGroups: BoostComparisonGroup[] = includeCollectionBreakdownCharts
    ? [
        {
          key: "big-boost-collected",
          title: "Big boost collected",
          legend: [{ className: "legend-big-pad", label: "Big pad boost" }],
          maxValue: maxSummaryValue(comparisonSummaries, (summary) =>
            scaleBoostValue(summary, summary.collectedBig),
          ),
          rows: comparisonSummaries
            .map((summary) => ({
              key: summary.key,
              name: summary.name,
              platform: summary.platform,
              profilePath: profilePathForSummary(summary),
              rank: summary.rank,
              segmentColorClassName: summaryColorClassName(summary),
              showPlatformBadge: showPlatformBadgeForSummary(summary),
              subtitle: subtitleForSummary?.(summary),
              team: summary.team,
              playerIndex: summaryPlayerIndex(summary),
              sortValue: scaleBoostValue(summary, summary.collectedBig),
              total: scaleBoostValue(summary, summary.collectedBig),
              valueLabel: boostValueLabel(summary, summary.collectedBig),
              segments: [
                {
                  className: "big-pad-source",
                  label: "Big",
                  value: scaleBoostValue(summary, summary.collectedBig),
                  visibleLabel: `${summary.bigPads.toLocaleString()} big / ${boostValueLabel(summary, summary.collectedBig)}`,
                  title: boostSegmentTitle(
                    "Big pad boost",
                    summary.collectedBig,
                    durationForSummary(summary),
                  ),
                },
              ],
            }))
            .sort((left, right) => right.sortValue - left.sortValue),
        },
        {
          key: "small-boost-collected",
          title: "Small boost collected",
          legend: [{ className: "legend-small-pad", label: "Small pad boost" }],
          maxValue: maxSummaryValue(comparisonSummaries, (summary) =>
            scaleBoostValue(summary, summary.collectedSmall),
          ),
          rows: comparisonSummaries
            .map((summary) => ({
              key: summary.key,
              name: summary.name,
              platform: summary.platform,
              profilePath: profilePathForSummary(summary),
              rank: summary.rank,
              segmentColorClassName: summaryColorClassName(summary),
              showPlatformBadge: showPlatformBadgeForSummary(summary),
              subtitle: subtitleForSummary?.(summary),
              team: summary.team,
              playerIndex: summaryPlayerIndex(summary),
              sortValue: scaleBoostValue(summary, summary.collectedSmall),
              total: scaleBoostValue(summary, summary.collectedSmall),
              valueLabel: boostValueLabel(summary, summary.collectedSmall),
              segments: [
                {
                  className: "small-pad-source",
                  label: "Small",
                  value: scaleBoostValue(summary, summary.collectedSmall),
                  visibleLabel: `${summary.smallPads.toLocaleString()} small / ${boostValueLabel(summary, summary.collectedSmall)}`,
                  title: boostSegmentTitle(
                    "Small pad boost",
                    summary.collectedSmall,
                    durationForSummary(summary),
                  ),
                },
              ],
            }))
            .sort((left, right) => right.sortValue - left.sortValue),
        },
        {
          key: "grant-boost-collected",
          title: "Grant/gather boost",
          legend: [{ className: "legend-grant", label: "Kickoff/respawn grants" }],
          maxValue: maxSummaryValue(comparisonSummaries, (summary) =>
            scaleBoostValue(summary, summary.collectedGrant),
          ),
          rows: comparisonSummaries
            .map((summary) => ({
              key: summary.key,
              name: summary.name,
              platform: summary.platform,
              profilePath: profilePathForSummary(summary),
              rank: summary.rank,
              segmentColorClassName: summaryColorClassName(summary),
              showPlatformBadge: showPlatformBadgeForSummary(summary),
              subtitle: subtitleForSummary?.(summary),
              team: summary.team,
              playerIndex: summaryPlayerIndex(summary),
              sortValue: scaleBoostValue(summary, summary.collectedGrant),
              total: scaleBoostValue(summary, summary.collectedGrant),
              valueLabel: boostValueLabel(summary, summary.collectedGrant),
              segments: [
                {
                  className: "grant-source",
                  label: "Grant",
                  value: scaleBoostValue(summary, summary.collectedGrant),
                  visibleLabel: boostValueLabel(summary, summary.collectedGrant),
                  title: boostSegmentTitle(
                    "Grant boost",
                    summary.collectedGrant,
                    durationForSummary(summary),
                  ),
                },
              ],
            }))
            .sort((left, right) => right.sortValue - left.sortValue),
        },
        {
          key: "boost-pads-collected",
          title: "Boost pads collected",
          legend: [
            { className: "legend-big-pad", label: "Big pads" },
            { className: "legend-small-pad", label: "Small pads" },
          ],
          maxValue: maxSummaryValue(comparisonSummaries, (summary) =>
            scaleCountValue(summary, summary.bigPads + summary.smallPads),
          ),
          rows: comparisonSummaries
            .map((summary) => {
              const pads = summary.bigPads + summary.smallPads;
              return {
                key: summary.key,
                name: summary.name,
                platform: summary.platform,
                profilePath: profilePathForSummary(summary),
                rank: summary.rank,
                segmentColorClassName: summaryColorClassName(summary),
                showPlatformBadge: showPlatformBadgeForSummary(summary),
                subtitle: subtitleForSummary?.(summary),
                team: summary.team,
                playerIndex: summaryPlayerIndex(summary),
                sortValue: scaleCountValue(summary, pads),
                total: scaleCountValue(summary, pads),
                valueLabel: countValueLabel(summary, pads),
                segments: [
                  {
                    className: "big-pad-source",
                    label: "Big",
                    value: scaleCountValue(summary, summary.bigPads),
                    visibleLabel: `${summary.bigPads.toLocaleString()} big`,
                    title: countSegmentTitle(
                      "Big pads",
                      summary.bigPads,
                      durationForSummary(summary),
                    ),
                  },
                  {
                    className: "small-pad-source",
                    label: "Small",
                    value: scaleCountValue(summary, summary.smallPads),
                    visibleLabel: `${summary.smallPads.toLocaleString()} small`,
                    title: countSegmentTitle(
                      "Small pads",
                      summary.smallPads,
                      durationForSummary(summary),
                    ),
                  },
                ],
              };
            })
            .sort((left, right) => right.sortValue - left.sortValue),
        },
      ]
    : [];
  const stolenSegments = (summary: BoostPlayerSummary): BoostComparisonSegment[] => {
    const rowDuration = durationForSummary(summary);
    return includePadBreakdowns
      ? [
          {
            className: "big-stolen-source",
            label: "Big",
            value: scaledComparisonValue(summary.stolenBigBoost, rowDuration, valueMode),
            visibleLabel: `${formatBoostComparisonValue(summary.stolenBigBoost, rowDuration, valueMode)} big`,
            title: boostSegmentTitle("Big stolen boost", summary.stolenBigBoost, rowDuration),
          },
          {
            className: "small-stolen-source",
            label: "Small",
            value: scaledComparisonValue(summary.stolenSmallBoost, rowDuration, valueMode),
            visibleLabel: `${formatBoostComparisonValue(summary.stolenSmallBoost, rowDuration, valueMode)} small`,
            title: boostSegmentTitle("Small stolen boost", summary.stolenSmallBoost, rowDuration),
          },
        ]
      : [
          {
            className: "stolen-fill",
            label: "Stolen",
            value: scaledComparisonValue(summary.stolen, rowDuration, valueMode),
            visibleLabel: formatBoostComparisonValue(summary.stolen, rowDuration, valueMode),
            title: boostSegmentTitle("Stolen boost", summary.stolen, rowDuration),
          },
        ];
  };
  const groups: BoostComparisonGroup[] = [
    {
      key: "collected-amounts",
      title: "Collected amounts",
      legend: includePadBreakdowns
        ? [
            { className: "legend-big-pad", label: "Big pad boost" },
            { className: "legend-small-pad", label: "Small pad boost" },
            { className: "legend-grant", label: "Kickoff/respawn grants" },
          ]
        : [{ className: "legend-boost-other", label: "Collected boost" }],
      maxValue: boostAmountScaleMax,
      rows: comparisonSummaries
        .map((summary) => ({
          key: summary.key,
          name: summary.name,
          platform: summary.platform,
          profilePath: profilePathForSummary(summary),
          rank: summary.rank,
          segmentColorClassName: summaryColorClassName(summary),
          showPlatformBadge: showPlatformBadgeForSummary(summary),
          subtitle: subtitleForSummary?.(summary),
          team: summary.team,
          playerIndex: summaryPlayerIndex(summary),
          sortValue: scaleBoostValue(summary, summary.collected),
          total: scaleBoostValue(summary, summary.collected),
          valueLabel: boostValueLabel(summary, summary.collected),
          segments: collectedSegments(summary),
        }))
        .sort((left, right) => right.sortValue - left.sortValue),
    },
    ...collectionBreakdownGroups,
    {
      key: "usage",
      title: "Usage",
      legend: [{ className: "legend-boost-used", label: "Boost used" }],
      maxValue: boostAmountScaleMax,
      rows: comparisonSummaries
        .map((summary) => ({
          key: summary.key,
          name: summary.name,
          platform: summary.platform,
          profilePath: profilePathForSummary(summary),
          rank: summary.rank,
          segmentColorClassName: summaryColorClassName(summary),
          showPlatformBadge: showPlatformBadgeForSummary(summary),
          subtitle: subtitleForSummary?.(summary),
          team: summary.team,
          playerIndex: summaryPlayerIndex(summary),
          sortValue: scaleBoostValue(summary, summary.used),
          total: scaleBoostValue(summary, summary.used),
          valueLabel: boostValueLabel(summary, summary.used),
          segments: [
            {
              className: "neutral-fill",
              label: "Used",
              value: scaleBoostValue(summary, summary.used),
              visibleLabel: `Used / ${boostValueLabel(summary, summary.used)}`,
              title: boostSegmentTitle("Boost used", summary.used, durationForSummary(summary)),
            },
          ],
        }))
        .sort((left, right) => right.sortValue - left.sortValue),
    },
    {
      key: "big-boost-pads",
      title: "Big boost pads",
      legend: [
        { className: "legend-big-pad-offensive", label: "Offensive" },
        { className: "legend-big-pad-neutral", label: "Neutral" },
        { className: "legend-big-pad-defensive", label: "Defensive" },
      ],
      maxValue: maxSummaryValue(comparisonSummaries, (summary) =>
        scaleCountValue(summary, summary.bigPads),
      ),
      rows: comparisonSummaries
        .map((summary) => {
          return {
            key: summary.key,
            name: summary.name,
            platform: summary.platform,
            profilePath: profilePathForSummary(summary),
            rank: summary.rank,
            segmentColorClassName: summaryColorClassName(summary),
            showPlatformBadge: showPlatformBadgeForSummary(summary),
            subtitle: subtitleForSummary?.(summary),
            team: summary.team,
            playerIndex: summaryPlayerIndex(summary),
            sortValue: scaleCountValue(summary, summary.bigPads),
            total: scaleCountValue(summary, summary.bigPads),
            valueLabel: countValueLabel(summary, summary.bigPads),
            segments: [
              {
                className: "big-pad-offensive-source",
                label: "Offensive",
                value: scaleCountValue(summary, summary.bigPadsOffensive),
                visibleLabel: `Offensive ${summary.bigPadsOffensive.toLocaleString()}`,
                title: countSegmentTitle(
                  "Offensive corner",
                  summary.bigPadsOffensive,
                  durationForSummary(summary),
                ),
              },
              {
                className: "big-pad-neutral-source",
                label: "Neutral",
                value: scaleCountValue(summary, summary.bigPadsNeutral),
                visibleLabel: `Neutral ${summary.bigPadsNeutral.toLocaleString()}`,
                title: countSegmentTitle(
                  "Neutral midfield",
                  summary.bigPadsNeutral,
                  durationForSummary(summary),
                ),
              },
              {
                className: "big-pad-defensive-source",
                label: "Defensive",
                value: scaleCountValue(summary, summary.bigPadsDefensive),
                visibleLabel: `Defensive ${summary.bigPadsDefensive.toLocaleString()}`,
                title: countSegmentTitle(
                  "Defensive corner",
                  summary.bigPadsDefensive,
                  durationForSummary(summary),
                ),
              },
            ],
          };
        })
        .sort((left, right) => right.sortValue - left.sortValue),
    },
    {
      key: "small-boost-pads",
      title: "Small boost pads",
      legend: [
        { className: "legend-small-pad-offensive", label: "Offensive half" },
        { className: "legend-small-pad-defensive", label: "Defensive half" },
      ],
      maxValue: maxSummaryValue(comparisonSummaries, (summary) =>
        scaleCountValue(summary, summary.smallPads),
      ),
      rows: comparisonSummaries
        .map((summary) => {
          return {
            key: summary.key,
            name: summary.name,
            platform: summary.platform,
            profilePath: profilePathForSummary(summary),
            rank: summary.rank,
            segmentColorClassName: summaryColorClassName(summary),
            showPlatformBadge: showPlatformBadgeForSummary(summary),
            subtitle: subtitleForSummary?.(summary),
            team: summary.team,
            playerIndex: summaryPlayerIndex(summary),
            sortValue: scaleCountValue(summary, summary.smallPads),
            total: scaleCountValue(summary, summary.smallPads),
            valueLabel: countValueLabel(summary, summary.smallPads),
            segments: [
              {
                className: "small-pad-offensive-source",
                label: "Offensive",
                value: scaleCountValue(summary, summary.smallPadsOffensive),
                visibleLabel: `Off. ${summary.smallPadsOffensive.toLocaleString()}`,
                title: countSegmentTitle(
                  "Offensive half",
                  summary.smallPadsOffensive,
                  durationForSummary(summary),
                ),
              },
              {
                className: "small-pad-defensive-source",
                label: "Defensive",
                value: scaleCountValue(summary, summary.smallPadsDefensive),
                visibleLabel: `Def. ${summary.smallPadsDefensive.toLocaleString()}`,
                title: countSegmentTitle(
                  "Defensive half",
                  summary.smallPadsDefensive,
                  durationForSummary(summary),
                ),
              },
            ],
          };
        })
        .sort((left, right) => right.sortValue - left.sortValue),
    },
    {
      key: "stolen-amounts",
      title: "Stolen amounts",
      legend: includePadBreakdowns
        ? [
            { className: "legend-stolen-big", label: "Big stolen boost" },
            { className: "legend-stolen-small", label: "Small stolen boost" },
          ]
        : [{ className: "legend-stolen-big", label: "Stolen boost" }],
      maxValue: boostAmountScaleMax,
      rows: comparisonSummaries
        .map((summary) => ({
          key: summary.key,
          name: summary.name,
          platform: summary.platform,
          profilePath: profilePathForSummary(summary),
          rank: summary.rank,
          segmentColorClassName: summaryColorClassName(summary),
          showPlatformBadge: showPlatformBadgeForSummary(summary),
          subtitle: subtitleForSummary?.(summary),
          team: summary.team,
          playerIndex: summaryPlayerIndex(summary),
          sortValue: scaleBoostValue(summary, summary.stolen),
          total: scaleBoostValue(summary, summary.stolen),
          valueLabel: boostValueLabel(summary, summary.stolen),
          segments: stolenSegments(summary),
        }))
        .sort((left, right) => right.sortValue - left.sortValue),
    },
    {
      key: "overfill",
      title: "Overfill",
      legend: [{ className: "legend-overfill", label: "Overfill" }],
      maxValue: boostAmountScaleMax,
      rows: comparisonSummaries
        .map((summary) => ({
          key: summary.key,
          name: summary.name,
          platform: summary.platform,
          profilePath: profilePathForSummary(summary),
          rank: summary.rank,
          segmentColorClassName: summaryColorClassName(summary),
          showPlatformBadge: showPlatformBadgeForSummary(summary),
          subtitle: subtitleForSummary?.(summary),
          team: summary.team,
          playerIndex: summaryPlayerIndex(summary),
          sortValue: scaleBoostValue(summary, summary.overfill),
          total: scaleBoostValue(summary, summary.overfill),
          valueLabel: boostValueLabel(summary, summary.overfill),
          segments: [
            {
              className: "overfill-source",
              label: "Overfill",
              value: scaleBoostValue(summary, summary.overfill),
              visibleLabel: boostValueLabel(summary, summary.overfill),
              title: boostSegmentTitle("Overfill", summary.overfill, durationForSummary(summary)),
            },
          ],
        }))
        .sort((left, right) => right.sortValue - left.sortValue),
    },
    {
      key: "supersonic-use",
      title: "Supersonic use",
      legend: [{ className: "legend-supersonic", label: "Supersonic use" }],
      maxValue: boostAmountScaleMax,
      rows: comparisonSummaries
        .map((summary) => ({
          key: summary.key,
          name: summary.name,
          platform: summary.platform,
          profilePath: profilePathForSummary(summary),
          rank: summary.rank,
          segmentColorClassName: summaryColorClassName(summary),
          showPlatformBadge: showPlatformBadgeForSummary(summary),
          subtitle: subtitleForSummary?.(summary),
          team: summary.team,
          playerIndex: summaryPlayerIndex(summary),
          sortValue: scaleBoostValue(summary, summary.usedWhileSupersonic),
          total: scaleBoostValue(summary, summary.usedWhileSupersonic),
          valueLabel: boostValueLabel(summary, summary.usedWhileSupersonic),
          segments: [
            {
              className: "supersonic-source",
              label: "Supersonic",
              value: scaleBoostValue(summary, summary.usedWhileSupersonic),
              visibleLabel: boostValueLabel(summary, summary.usedWhileSupersonic),
              title: boostSegmentTitle(
                "Supersonic use",
                summary.usedWhileSupersonic,
                durationForSummary(summary),
              ),
            },
          ],
        }))
        .sort((left, right) => right.sortValue - left.sortValue),
    },
    {
      key: "boost-ranges",
      title: "Boost ranges",
      legend: boostLevelBands.map((band) => ({
        className: `legend-boost-${band.id}`,
        label: band.label,
      })),
      maxValue: 100,
      rows: comparisonSummaries
        .map((summary) => {
          const levelRow = boostLevelsByPlayer.get(summary.key);
          return {
            key: summary.key,
            name: summary.name,
            platform: summary.platform,
            profilePath: profilePathForSummary(summary),
            rank: summary.rank,
            segmentColorClassName: summaryColorClassName(summary),
            showPlatformBadge: showPlatformBadgeForSummary(summary),
            subtitle: subtitleForSummary?.(summary),
            team: summary.team,
            playerIndex: summaryPlayerIndex(summary),
            sortValue: summary.average ?? 0,
            total: 100,
            valueLabel: `Avg ${formatBoost(summary.average)}`,
            segments:
              levelRow?.bands.map((band) => ({
                className: `boost-band-${band.id}`,
                label: band.label,
                value: band.percent,
                visibleLabel: `(${Math.round(band.percent)}%) ${band.label}`,
                title: statPercentWithValue(
                  `${band.percent.toFixed(1)}%`,
                  formatSeconds(band.seconds),
                  band.label,
                ),
              })) ?? [],
          };
        })
        .sort((left, right) => right.sortValue - left.sortValue),
    },
  ];

  return (
    <div className="boost-comparison-grid" aria-label="Boost player comparisons">
      {groups
        .filter(
          (group) =>
            includePadBreakdowns ||
            (group.key !== "big-boost-pads" && group.key !== "small-boost-pads"),
        )
        .map((group) => (
          <BoostComparisonGroupChart group={group} key={group.key} />
        ))}
    </div>
  );
}

interface BoostComparisonGroup {
  key: string;
  title: string;
  legend: Array<{ className: string; label: string }>;
  maxValue: number;
  rows: BoostComparisonRow[];
}

interface BoostComparisonRow {
  key: string;
  name: string;
  platform: string | null;
  profilePath: string | null;
  rank: StatPlayerRank | null;
  segmentColorClassName: string | null;
  showPlatformBadge: boolean;
  subtitle?: string;
  team: number | null;
  playerIndex: number | null;
  sortValue: number;
  total: number;
  valueLabel: string;
  segments: BoostComparisonSegment[];
}

interface BoostComparisonSegment {
  className: string;
  label: string;
  value: number;
  visibleLabel?: string;
  title?: string;
}

function BoostComparisonGroupChart({ group }: { group: BoostComparisonGroup }) {
  const useTeamColoredBars = true;
  // Every comparison group is per-player: each segment takes the player's
  // identity hue (--seg-color), and multi-level bars step that hue's lightness
  // per level (pad zones, sources, boost ranges, stolen) — see styles.css.
  const usePlayerShade = true;

  return (
    <section className="boost-comparison-group">
      <div className="boost-comparison-title">{group.title}</div>
      <div className="boost-comparison-rows">
        {group.rows.map((row) => {
          const rowWidthPercent = barWidthPercent(row.total, group.maxValue);
          const showSegmentLabels = group.key === "boost-ranges" || rowWidthPercent >= 24;

          return (
            <div className="boost-comparison-row" key={row.key}>
              <StatPlayerLabel
                className={`comparison-player-label team-accent-${teamClass(row.team)}`}
                name={row.name}
                platform={row.platform}
                profilePath={row.profilePath}
                rank={row.rank}
                showPlatformBadge={row.showPlatformBadge}
                subtitle={row.subtitle ?? teamLabel(row.team)}
              />
              <div className="metric-bar-track source-bar-track comparison-track">
                <span className="source-bar-fill" style={{ width: `${rowWidthPercent}%` }}>
                  {row.segments.map((segment) => (
                    <BoostSourceSegment
                      key={`${row.key}:${segment.label}`}
                      colorClassName={row.segmentColorClassName}
                      playerIndex={usePlayerShade ? row.playerIndex : null}
                      segment={segment}
                      showLabel={showSegmentLabels}
                      team={useTeamColoredBars ? row.team : null}
                    />
                  ))}
                </span>
              </div>
              <strong className="metric-value comparison-value">
                <span>{row.valueLabel}</span>
              </strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BoostSourceSegment({
  colorClassName,
  playerIndex,
  segment,
  showLabel,
  team,
}: {
  colorClassName: string | null;
  playerIndex: number | null;
  segment: BoostComparisonSegment;
  showLabel: boolean;
  team: number | null;
}) {
  const { className, label, title, value, visibleLabel } = segment;
  if (value < 0.5) return null;

  return (
    <span
      className={`source-segment ${className} ${colorClassName ?? ""} ${team == null ? "" : `team-segment-${teamClass(team)}`} ${playerIndex == null ? "" : `player-shade-${playerIndex}`}`}
      style={{ flexGrow: value }}
      title={title ?? `${label}: ${formatBoost(value)}`}
    >
      {showLabel && visibleLabel ? (
        <span className="source-segment-label">{visibleLabel}</span>
      ) : null}
    </span>
  );
}

function maxSummaryValue(
  summaries: BoostPlayerSummary[],
  selector: (summary: BoostPlayerSummary) => number,
): number {
  return Math.max(1, ...summaries.map(selector));
}

function barWidthPercent(value: number, maxValue: number): number {
  if (value <= 0) return 0;
  return Math.max(2, (value / Math.max(1, maxValue)) * 100);
}

function percentOf(value: number, total: number): number {
  return total > 0 ? (value / total) * 100 : 0;
}

interface PickupMapSubject {
  key: string;
  name: string;
  platform: string | null;
  profilePath: string | null;
  rank: StatPlayerRank | null;
  team: number | null;
  playerIndex: number | null;
  points: BoostPickupMapPoint[];
}

interface TeamPadMarginPoint {
  key: string;
  padId: string;
  x: number;
  y: number;
  padSize: "big" | "small";
  blueCount: number;
  orangeCount: number;
  margin: number;
  total: number;
  winner: 0 | 1 | null;
  intensity: number;
}

function PadPickupMaps({
  comparisonMode,
  players,
  points,
}: {
  comparisonMode: BoostComparisonMode;
  players: ReplayPlayer[];
  points: BoostPickupMapPoint[];
}) {
  const playerIndexByKey = teamLocalPlayerIndexByKey(players);
  const shouldShowPadControl = comparisonMode === "teams";
  const subjects =
    comparisonMode === "players"
      ? players.map((player): PickupMapSubject => {
          const key = playerKey(player);
          return {
            key,
            name: player.name || player.platform_player_id || "Unknown",
            platform: player.platform,
            profilePath: playerProfilePath({
              platform: player.platform,
              platformPlayerId: player.platform_player_id,
            }),
            rank: statPlayerRank(player),
            team: player.team,
            playerIndex: playerIndexByKey.get(key) ?? null,
            points: points.filter((point) => point.playerKey === key),
          };
        })
      : teamPickupMapSubjects(points);

  const marginPoints = shouldShowPadControl ? teamPadMarginPoints(points) : [];
  const mapCards = subjects.map((subject) => {
    const maxCount = Math.max(1, ...subject.points.map((point) => point.count));
    const bigLeaderCount = subject.points.filter(
      (point) => point.leader && point.padSize === "big",
    ).length;
    const smallLeaderCount = subject.points.filter(
      (point) => point.leader && point.padSize === "small",
    ).length;

    return (
      <div
        className={`pickup-map-card pickup-map-team-card team-accent-${teamClass(subject.team)}`}
        key={subject.key}
      >
        <div className="pickup-map-header">
          <StatPlayerLabel
            name={subject.name}
            platform={subject.platform}
            profilePath={subject.profilePath}
            rank={subject.rank}
            showPlatformBadge={subject.playerIndex != null}
            subtitle={subject.playerIndex == null ? "Team" : teamLabel(subject.team)}
          />
          <span className="pickup-leader-count">
            Leader: {bigLeaderCount} big / {smallLeaderCount} small
          </span>
        </div>
        <svg
          className="pickup-map"
          viewBox="0 0 100 125"
          role="img"
          aria-label={`${subject.name} boost pickup map`}
        >
          <rect className="field-bg" x="4" y="4" width="92" height="117" rx="3" />
          <line className="field-line" x1="4" y1="62.5" x2="96" y2="62.5" />
          <line className="field-line" x1="50" y1="4" x2="50" y2="121" />
          <circle className="field-line-fillless" cx="50" cy="62.5" r="10" />
          <rect className="field-line-fillless" x="24" y="4" width="52" height="20" />
          <rect className="field-line-fillless" x="24" y="101" width="52" height="20" />
          {boostPadLocations.map((pad) => {
            const projected = projectFieldPosition(pad.x, pad.y);
            return (
              <circle
                className={`pad-location-dot ${pad.size}`}
                cx={projected.x}
                cy={projected.y}
                key={pad.id}
                r={pad.size === "big" ? 2.1 : 1.15}
              />
            );
          })}
          {subject.points.map((point) => {
            const projected = projectFieldPosition(point.x, point.y);
            const radius =
              point.padSize === "big"
                ? 2.8 + (point.count / maxCount) * 2.4
                : 1.7 + (point.count / maxCount) * 1.8;
            const showCount = point.padSize === "big" || point.count >= 3 || point.leader;
            return (
              <g className="pickup-marker" key={point.key}>
                <circle
                  className={`pickup-dot ${point.padSize} team-pickup-${teamClass(point.team)} ${subject.playerIndex == null ? "" : `player-shade-${subject.playerIndex}`} ${point.leader ? "leader" : ""}`}
                  cx={projected.x}
                  cy={projected.y}
                  r={radius}
                />
                {showCount ? (
                  <text className="pickup-count" x={projected.x} y={projected.y + 1.4}>
                    {point.count}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    );
  });

  if (shouldShowPadControl && mapCards.length > 1) {
    mapCards.splice(
      Math.floor(mapCards.length / 2),
      0,
      <TeamPadMarginMapCard key="__pad-margin" points={marginPoints} />,
    );
  }

  return (
    <div className={`pickup-map-grid ${comparisonMode === "teams" ? "team-pickup-map-grid" : ""}`}>
      {shouldShowPadControl ? <TeamPadMarginBars points={marginPoints} /> : null}
      {mapCards}
      <div className="chart-legend compact-legend pickup-map-legend">
        {shouldShowPadControl ? (
          <>
            <span className="legend-team-blue">Blue margin</span>
            <span className="legend-team-orange">Orange margin</span>
            <span className="legend-neutral">Tied/no pickups</span>
          </>
        ) : null}
        <span className="legend-big-pad">Big pad</span>
        <span className="legend-small-pad">Small pad</span>
        <span className="legend-leader-pad">Pad leader outline</span>
      </div>
    </div>
  );
}

function isOneVOneMatch(players: ReplayPlayer[]): boolean {
  const bluePlayers = players.filter((player) => player.team === 0);
  const orangePlayers = players.filter((player) => player.team === 1);
  const unknownTeamPlayers = players.filter((player) => player.team !== 0 && player.team !== 1);

  return bluePlayers.length === 1 && orangePlayers.length === 1 && unknownTeamPlayers.length === 0;
}

function TeamPadMarginBars({ points }: { points: TeamPadMarginPoint[] }) {
  const summary = (size: "big" | "small") => ({
    blue: points.filter((point) => point.padSize === size && point.winner === 0).length,
    orange: points.filter((point) => point.padSize === size && point.winner === 1).length,
    tied: points.filter(
      (point) => point.padSize === size && point.winner == null && point.total > 0,
    ).length,
  });
  const bigSummary = summary("big");
  const smallSummary = summary("small");

  return (
    <div className="pad-control-summary">
      <strong className="pad-control-summary-title">Pad control</strong>
      <div className="pad-control-bars">
        <PadControlSummaryBar label="Big" summary={bigSummary} />
        <PadControlSummaryBar label="Small" summary={smallSummary} />
      </div>
    </div>
  );
}

function TeamPadMarginMapCard({ points }: { points: TeamPadMarginPoint[] }) {
  return (
    <div className="pickup-map-card team-margin-map-card">
      <div className="pickup-map-header">
        <div className="pickup-map-margin-identity">
          <span className="pickup-map-margin-name">Margin</span>
          <span className="pickup-map-margin-subtitle">Net pickups per pad</span>
        </div>
      </div>
      <svg
        className="pickup-map team-margin-map"
        viewBox="0 0 100 125"
        role="img"
        aria-label="Team boost pad pickup margin map"
      >
        <rect className="field-bg" x="4" y="4" width="92" height="117" rx="3" />
        <line className="field-line" x1="4" y1="62.5" x2="96" y2="62.5" />
        <line className="field-line" x1="50" y1="4" x2="50" y2="121" />
        <circle className="field-line-fillless" cx="50" cy="62.5" r="10" />
        <rect className="field-line-fillless" x="24" y="4" width="52" height="20" />
        <rect className="field-line-fillless" x="24" y="101" width="52" height="20" />
        {points.map((point) => {
          const projected = projectFieldPosition(point.x, point.y);
          const radius = point.padSize === "big" ? 5.2 : 3.2;
          const fill =
            point.winner === 0
              ? `rgba(37, 99, 235, ${0.2 + point.intensity * 0.75})`
              : point.winner === 1
                ? `rgba(234, 88, 12, ${0.2 + point.intensity * 0.75})`
                : "rgba(100, 116, 139, 0.2)";
          const showLabel = point.margin > 0 || point.total > 0;

          return (
            <g className="team-margin-marker" key={point.key}>
              <circle
                className={`team-margin-dot ${point.padSize} ${point.winner == null ? "tied" : `team-pickup-${teamClass(point.winner)}`}`}
                cx={projected.x}
                cy={projected.y}
                fill={fill}
                r={radius}
              />
              {showLabel ? (
                <text className="team-margin-count" x={projected.x} y={projected.y + 1.4}>
                  {point.margin}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PadControlSummaryBar({
  label,
  summary,
}: {
  label: string;
  summary: { blue: number; orange: number; tied: number };
}) {
  const total = summary.blue + summary.orange + summary.tied;
  const denominator = Math.max(1, total);
  const segmentLabel = (value: number) => `${value} (${Math.round((value / denominator) * 100)}%)`;
  const segments: SegmentedBarSegment[] = [
    {
      key: "blue",
      className: "pad-control-blue",
      label: "Blue",
      value: summary.blue,
      visibleLabel: segmentLabel(summary.blue),
      title: `Blue: ${summary.blue}`,
    },
    {
      key: "tied",
      className: "pad-control-tied",
      label: "Tied",
      value: summary.tied,
      visibleLabel: segmentLabel(summary.tied),
      title: `Tied: ${summary.tied}`,
    },
    {
      key: "orange",
      className: "pad-control-orange",
      label: "Orange",
      value: summary.orange,
      visibleLabel: segmentLabel(summary.orange),
      title: `Orange: ${summary.orange}`,
    },
  ];

  return (
    <div className="pad-control-summary-row">
      <span className="pad-control-summary-label">{label}</span>
      <SegmentedBar
        ariaLabel={`${label} pad control: blue ${summary.blue}, tied ${summary.tied}, orange ${summary.orange}`}
        className="pad-control-tug"
        maxValue={total}
        segments={segments}
        total={total}
      />
    </div>
  );
}

function teamPadMarginPoints(points: BoostPickupMapPoint[]): TeamPadMarginPoint[] {
  const countsByPad = new Map<string, { blueCount: number; orangeCount: number }>();
  for (const point of points) {
    const counts = countsByPad.get(point.padId) ?? { blueCount: 0, orangeCount: 0 };
    if (point.team === 0) counts.blueCount += point.count;
    if (point.team === 1) counts.orangeCount += point.count;
    countsByPad.set(point.padId, counts);
  }

  const rawPoints = boostPadLocations.map((pad) => {
    const counts = countsByPad.get(pad.id) ?? { blueCount: 0, orangeCount: 0 };
    const margin = Math.abs(counts.blueCount - counts.orangeCount);
    return {
      key: `margin:${pad.id}`,
      padId: pad.id,
      x: pad.x,
      y: pad.y,
      padSize: pad.size,
      blueCount: counts.blueCount,
      orangeCount: counts.orangeCount,
      margin,
      total: counts.blueCount + counts.orangeCount,
      winner:
        counts.blueCount === counts.orangeCount
          ? null
          : counts.blueCount > counts.orangeCount
            ? (0 as const)
            : (1 as const),
      intensity: 0,
    };
  });
  const maxMargin = Math.max(1, ...rawPoints.map((point) => point.margin));

  return rawPoints.map((point) => ({
    ...point,
    intensity: point.margin / maxMargin,
  }));
}

function teamPickupMapSubjects(points: BoostPickupMapPoint[]): PickupMapSubject[] {
  const teams: Array<0 | 1> = [0, 1];
  const teamPoints = teams.map((team) => {
    const aggregates = new Map<string, BoostPickupMapPoint>();
    for (const point of points.filter((candidate) => candidate.team === team)) {
      const existing = aggregates.get(point.padId);
      if (existing == null) {
        aggregates.set(point.padId, {
          ...point,
          key: `team:${team}:${point.padId}`,
          playerKey: `team:${team}`,
          playerName: `${teamLabel(team)} team`,
          team,
          leader: false,
        });
      } else {
        existing.count += point.count;
      }
    }
    return Array.from(aggregates.values());
  });

  const maxCountByPad = new Map<string, number>();
  for (const point of teamPoints.flat()) {
    maxCountByPad.set(point.padId, Math.max(maxCountByPad.get(point.padId) ?? 0, point.count));
  }
  for (const point of teamPoints.flat()) {
    point.leader = point.count > 0 && point.count === maxCountByPad.get(point.padId);
  }

  return teams.map((team, index) => ({
    key: `team:${team}`,
    name: `${teamLabel(team)} team`,
    platform: null,
    profilePath: null,
    rank: null,
    team,
    playerIndex: null,
    points: teamPoints[index],
  }));
}

function BoostStatTable({
  comparisonMode,
  summaries,
  durationSeconds,
}: {
  comparisonMode: BoostComparisonMode;
  summaries: BoostPlayerSummary[];
  durationSeconds: number;
}) {
  const [teamSort, setTeamSort] = useState<BoostStatSort>({ key: "name", direction: "asc" });
  const [playerSort, setPlayerSort] = useState<BoostStatSort>({ key: "name", direction: "asc" });
  const teamRows = useMemo(
    () =>
      sortBoostStatRows(
        [
          teamBoostSummary(summaries, 0, durationSeconds),
          teamBoostSummary(summaries, 1, durationSeconds),
        ],
        teamSort,
      ),
    [durationSeconds, summaries, teamSort],
  );
  const playerRows = useMemo(
    () => sortBoostStatRows(summaries, playerSort),
    [playerSort, summaries],
  );

  return (
    <div className="split-boost-tables">
      {comparisonMode === "teams" ? (
        <SortableBoostStatTable
          label="Teams"
          rows={teamRows}
          sort={teamSort}
          onSort={setTeamSort}
          teamRows
        />
      ) : (
        <SortableBoostStatTable
          label="Players"
          rows={playerRows}
          sort={playerSort}
          onSort={setPlayerSort}
        />
      )}
    </div>
  );
}

function SortableBoostStatTable({
  label,
  rows,
  sort,
  onSort,
  teamRows = false,
}: {
  label: string;
  rows: BoostPlayerSummary[];
  sort: BoostStatSort;
  onSort: (sort: BoostStatSort) => void;
  teamRows?: boolean;
}) {
  const toggleSort = (key: BoostStatSortKey) => {
    onSort({
      key,
      direction: sort.key === key && sort.direction === "desc" ? "asc" : "desc",
    });
  };

  return (
    <div className="boost-stat-table-group">
      <div className="boost-stat-table-label">{label}</div>
      <div className="table-frame compact-table boost-stat-table">
        <table>
          <thead>
            <tr>
              {boostStatColumns.map((column) => (
                <th key={column.key}>
                  <button
                    className="sort-header"
                    onClick={() => toggleSort(column.key)}
                    type="button"
                  >
                    <span>{column.label}</span>
                    {sort.key === column.key ? (
                      <span aria-hidden="true">{sort.direction === "asc" ? "↑" : "↓"}</span>
                    ) : null}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((summary) => (
              <tr
                className={`${teamRows ? "team-summary-row " : ""}boost-table-row team-row-${teamClass(summary.team)}`}
                key={summary.key}
              >
                {boostStatColumns.map((column) => (
                  <td key={column.key}>{column.render(summary)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type BoostStatSort = {
  key: BoostStatSortKey;
  direction: "asc" | "desc";
};

type BoostStatSortKey =
  | "name"
  | "average"
  | "bpm"
  | "bcpm"
  | "timeZeroBoost"
  | "timeHundredBoost"
  | "timeBoost0To25"
  | "timeBoost25To50"
  | "timeBoost50To75"
  | "timeBoost75To100"
  | "usedWhileSupersonic"
  | "overfill"
  | "stolenOverfill";

const boostStatColumns: Array<{
  key: BoostStatSortKey;
  label: string;
  render: (summary: BoostPlayerSummary) => ReactNode;
}> = [
  {
    key: "name",
    label: "Player",
    render: (summary) => (
      <StatPlayerLabel
        className={`boost-table-player team-accent-${teamClass(summary.team)}`}
        name={summary.name}
        platform={summary.platform}
        profilePath={playerProfilePath(summary)}
        rank={summary.rank}
        subtitle={teamLabel(summary.team)}
      />
    ),
  },
  { key: "average", label: "Avg", render: (summary) => formatBoost(summary.average) },
  { key: "bpm", label: "BPM", render: (summary) => formatNumber(summary.bpm) },
  { key: "bcpm", label: "BCPM", render: (summary) => formatNumber(summary.bcpm) },
  {
    key: "timeZeroBoost",
    label: "0 boost",
    render: (summary) => formatSeconds(summary.timeZeroBoost),
  },
  {
    key: "timeHundredBoost",
    label: "100 boost",
    render: (summary) => formatSeconds(summary.timeHundredBoost),
  },
  {
    key: "timeBoost0To25",
    label: "0-25",
    render: (summary) => formatSeconds(summary.timeBoost0To25),
  },
  {
    key: "timeBoost25To50",
    label: "25-50",
    render: (summary) => formatSeconds(summary.timeBoost25To50),
  },
  {
    key: "timeBoost50To75",
    label: "50-75",
    render: (summary) => formatSeconds(summary.timeBoost50To75),
  },
  {
    key: "timeBoost75To100",
    label: "75-100",
    render: (summary) => formatSeconds(summary.timeBoost75To100),
  },
  {
    key: "usedWhileSupersonic",
    label: "Supersonic use",
    render: (summary) => formatBoost(summary.usedWhileSupersonic),
  },
  { key: "overfill", label: "Overfill", render: (summary) => formatBoost(summary.overfill) },
  {
    key: "stolenOverfill",
    label: "Stolen overfill",
    render: (summary) => formatBoost(summary.stolenOverfill),
  },
];

function compareBoostStatRows(
  left: BoostPlayerSummary,
  right: BoostPlayerSummary,
  key: BoostStatSortKey,
): number {
  if (key === "name") return left.name.localeCompare(right.name);
  return boostStatSortValue(left, key) - boostStatSortValue(right, key);
}

function sortBoostStatRows(rows: BoostPlayerSummary[], sort: BoostStatSort): BoostPlayerSummary[] {
  return rows.slice().sort((left, right) => {
    const comparison = compareBoostStatRows(left, right, sort.key);
    return sort.direction === "asc" ? comparison : -comparison;
  });
}

function boostStatSortValue(summary: BoostPlayerSummary, key: BoostStatSortKey): number {
  if (key === "name") return 0;
  return summary[key] ?? Number.NEGATIVE_INFINITY;
}

// React hook: load the replay's boost accumulation tracks. Returns [] until the
// fetch resolves (or if the replay has not been reprocessed with tracks yet).
function useBoostTracks(replayId: string | undefined): BoostTrack[] {
  const [tracks, setTracks] = useState<BoostTrack[]>([]);
  useEffect(() => {
    let cancelled = false;
    setTracks([]);
    if (!replayId) {
      return () => {
        cancelled = true;
      };
    }
    listBoostTracks(replayId)
      .then((response) => {
        if (!cancelled) setTracks(response.tracks);
      })
      .catch(() => {
        if (!cancelled) setTracks([]);
      });
    return () => {
      cancelled = true;
    };
  }, [replayId]);
  return tracks;
}

// React hook: load a replay group's pre-aggregated boost totals (the
// track-derived quantities summed across the group's replays). Returns null
// until the fetch resolves.
function useGroupBoostTotals(groupId: string | undefined): GroupBoostTotalsResponse | null {
  const [totals, setTotals] = useState<GroupBoostTotalsResponse | null>(null);
  useEffect(() => {
    let cancelled = false;
    setTotals(null);
    if (!groupId) {
      return () => {
        cancelled = true;
      };
    }
    listReplayGroupBoostTotals(groupId)
      .then((response) => {
        if (!cancelled) setTotals(response);
      })
      .catch(() => {
        if (!cancelled) setTotals(null);
      });
    return () => {
      cancelled = true;
    };
  }, [groupId]);
  return totals;
}

// Flatten the per-player `boost_amount` accumulation track into instantaneous
// boost-amount samples (converted from raw 0-255 units to 0-100 percent).
function boostAmountSamplesFromTracks(tracks: BoostTrack[]): BoostStateSample[] {
  const samples: BoostStateSample[] = [];
  for (const track of tracks) {
    if (track.quantity !== "boost_amount") continue;
    const team = track.is_team_0 ? 0 : 1;
    for (const point of track.points) {
      if (point.time == null) continue;
      samples.push({
        playerId: track.player_id,
        team,
        time: point.time,
        amount: boostAmountToPercent(point.value) ?? 0,
      });
    }
  }
  return samples;
}

// Final cumulative value of each `${playerId}:${quantity}` monotonic track, in
// 0-100 percent units (e.g. total boost used, used-while-supersonic, ...).
function cumulativeTrackTotals(tracks: BoostTrack[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const track of tracks) {
    if (track.player_id == null || track.quantity === "boost_amount") continue;
    const last = track.points.at(-1);
    if (!last) continue;
    totals.set(`${track.player_id}:${track.quantity}`, boostAmountToPercent(last.value) ?? 0);
  }
  return totals;
}

// Time-weighted mean boost amount over the tracked window. The change-point
// samples are irregularly spaced, so weight each by the time it holds.
function timeWeightedBoostAverage(
  samples: BoostStateSample[],
  durationSeconds: number,
): number | null {
  const sorted = samples.slice().sort((left, right) => left.time - right.time);
  let weightedSum = 0;
  let trackedSeconds = 0;
  for (let index = 0; index < sorted.length; index += 1) {
    const sample = sorted[index];
    const nextTime = sorted[index + 1]?.time ?? durationSeconds;
    const seconds = Math.max(0, Math.min(durationSeconds, nextTime) - Math.max(0, sample.time));
    if (seconds === 0) continue;
    weightedSum += sample.amount * seconds;
    trackedSeconds += seconds;
  }
  return trackedSeconds > 0 ? weightedSum / trackedSeconds : null;
}

function sumPickupAmounts(events: MechanicEventResponse[], field: string): number {
  return events.reduce(
    (total, event) => total + (boostAmountToPercent(numericPayload(event.payload, field)) ?? 0),
    0,
  );
}

function isStealPickup(event: MechanicEventResponse): boolean {
  return event.payload.is_steal === true;
}

function bigPadZoneCounts(
  events: MechanicEventResponse[],
  player: ReplayPlayer,
): Record<BigPadZone, number> {
  const counts: Record<BigPadZone, number> = {
    offensive: 0,
    neutral: 0,
    defensive: 0,
  };

  for (const event of events) {
    const zone = bigPadZone(event, player);
    if (zone) counts[zone] += 1;
  }

  return counts;
}

function bigPadZone(event: MechanicEventResponse, player: ReplayPlayer): BigPadZone | null {
  if (boostPadSize(event) !== "big") return null;

  const payloadZone = event.payload.pad_zone ?? event.payload.big_pad_zone;
  if (payloadZone === "offensive" || payloadZone === "neutral" || payloadZone === "defensive")
    return payloadZone;

  const position = eventPosition(event);
  const pad = position ? nearestBoostPad(position, "big") : null;
  if (pad) return bigPadZoneForPad(player.team, pad);

  const fieldHalf = event.payload.field_half;
  if (fieldHalf === "opponent") return "offensive";
  if (fieldHalf === "own") return "defensive";
  return isStealPickup(event) ? "offensive" : null;
}

function bigPadZoneForPad(team: number | null, pad: BoostPadLocation): BigPadZone {
  if (Math.abs(pad.y) < 1) return "neutral";
  if (team !== 0 && team !== 1) return "neutral";

  const isOpponentSide = team === 0 ? pad.y > 0 : pad.y < 0;
  return isOpponentSide ? "offensive" : "defensive";
}

function smallPadHalfCounts(
  events: MechanicEventResponse[],
  player: ReplayPlayer,
): Record<"offensive" | "defensive", number> {
  const counts = { offensive: 0, defensive: 0 };
  for (const event of events) {
    if (boostPadSize(event) !== "small") continue;
    const zone = smallPadHalf(event, player);
    if (zone) counts[zone] += 1;
  }
  return counts;
}

function smallPadHalf(
  event: MechanicEventResponse,
  player: ReplayPlayer,
): "offensive" | "defensive" | null {
  const payloadZone = event.payload.pad_zone;
  if (payloadZone === "offensive" || payloadZone === "defensive") return payloadZone;

  const fieldHalf = event.payload.field_half;
  if (fieldHalf === "opponent") return "offensive";
  if (fieldHalf === "own") return "defensive";

  const position = eventPosition(event);
  const pad = position ? nearestBoostPad(position, "small") : null;
  if (pad == null || (player.team !== 0 && player.team !== 1)) return null;
  const isOpponentSide = player.team === 0 ? pad.y > 0 : pad.y < 0;
  return isOpponentSide ? "offensive" : "defensive";
}

// Event-derived boost fields (pickups + respawns). These come from indexed
// events, so they aggregate identically for a single replay or a whole group;
// only the track-derived fields (average/used/bands) differ by scope.
type BoostEventFields = Pick<
  BoostPlayerSummary,
  | "collected"
  | "collectedBig"
  | "collectedSmall"
  | "collectedGrant"
  | "collectedUnknown"
  | "stolen"
  | "stolenBigBoost"
  | "stolenBig"
  | "stolenSmall"
  | "stolenSmallBoost"
  | "stolenCount"
  | "bigPads"
  | "bigPadsOffensive"
  | "bigPadsNeutral"
  | "bigPadsDefensive"
  | "smallPads"
  | "smallPadsOffensive"
  | "smallPadsDefensive"
  | "overfill"
  | "stolenOverfill"
>;

function boostEventFields(
  player: ReplayPlayer,
  pickupEvents: MechanicEventResponse[],
  respawnEvents: MechanicEventResponse[],
): BoostEventFields {
  const matchingPickups = pickupEvents.filter((event) => eventMatchesPlayer(event, player));
  const matchingRespawns = respawnEvents.filter((event) => eventMatchesPlayer(event, player));

  const collectedPads = sumPickupAmounts(matchingPickups, "collected_amount");
  const collectedBig = sumPickupAmounts(
    matchingPickups.filter((event) => boostPadSize(event) === "big"),
    "collected_amount",
  );
  const collectedSmall = sumPickupAmounts(
    matchingPickups.filter((event) => boostPadSize(event) === "small"),
    "collected_amount",
  );
  const collectedGrant = sumPickupAmounts(matchingRespawns, "boost_granted");

  const stealPickups = matchingPickups.filter(isStealPickup);
  const stolenBigPickups = stealPickups.filter((event) => boostPadSize(event) === "big");
  const stolenSmallPickups = stealPickups.filter((event) => boostPadSize(event) === "small");

  const bigPadZones = bigPadZoneCounts(matchingPickups, player);
  const smallPadHalves = smallPadHalfCounts(matchingPickups, player);

  return {
    collected: collectedPads + collectedGrant,
    collectedBig,
    collectedSmall,
    collectedGrant,
    collectedUnknown: Math.max(0, collectedPads - collectedBig - collectedSmall),
    stolen: sumPickupAmounts(stealPickups, "collected_amount"),
    stolenBigBoost: sumPickupAmounts(stolenBigPickups, "collected_amount"),
    stolenBig: stolenBigPickups.length,
    stolenSmall: stolenSmallPickups.length,
    stolenSmallBoost: sumPickupAmounts(stolenSmallPickups, "collected_amount"),
    stolenCount: stealPickups.length,
    bigPads: matchingPickups.filter((event) => boostPadSize(event) === "big").length,
    bigPadsOffensive: bigPadZones.offensive,
    bigPadsNeutral: bigPadZones.neutral,
    bigPadsDefensive: bigPadZones.defensive,
    smallPads: matchingPickups.filter((event) => boostPadSize(event) === "small").length,
    smallPadsOffensive: smallPadHalves.offensive,
    smallPadsDefensive: smallPadHalves.defensive,
    overfill: sumPickupAmounts(matchingPickups, "overfill_amount"),
    stolenOverfill: sumPickupAmounts(stealPickups, "overfill_amount"),
  };
}

function boostPlayerSummaries(
  players: ReplayPlayer[],
  stateSamples: BoostStateSample[],
  pickupEvents: MechanicEventResponse[],
  respawnEvents: MechanicEventResponse[],
  trackTotals: Map<string, number>,
): BoostPlayerSummary[] {
  const durationSeconds = Math.max(1, ...stateSamples.map((sample) => sample.time));
  return players.map((player) => {
    const key = playerKey(player);
    const matchingSamples = stateSamples.filter((sample) => sample.playerId === key);
    const eventFields = boostEventFields(player, pickupEvents, respawnEvents);

    const used = trackTotals.get(`${key}:boost_used`) ?? 0;
    const usedWhileSupersonic = trackTotals.get(`${key}:boost_used_supersonic`) ?? 0;
    const bandDurations = boostBandDurations(matchingSamples, durationSeconds);

    return {
      key,
      name: player.name || player.platform_player_id || "Unknown",
      platform: player.platform,
      platformPlayerId: player.platform_player_id,
      rank: statPlayerRank(player),
      team: player.team,
      average: timeWeightedBoostAverage(matchingSamples, durationSeconds),
      bpm: perMinute(used, durationSeconds),
      bcpm: perMinute(eventFields.collected, durationSeconds),
      ...eventFields,
      used,
      usedWhileSupersonic,
      ...bandDurations,
    };
  });
}

// Group analogue of boostPlayerSummaries: event fields aggregate over the
// group's events, while track-derived fields come pre-summed from the
// boost-totals endpoint. `durationSeconds` is the group's total tracked
// duration (the per-minute denominator).
function groupBoostPlayerSummaries(
  players: ReplayPlayer[],
  pickupEvents: MechanicEventResponse[],
  respawnEvents: MechanicEventResponse[],
  totalsByKey: Map<string, GroupBoostTotal>,
  durationSeconds: number,
): BoostPlayerSummary[] {
  return players.map((player) => {
    const key = playerKey(player);
    const eventFields = boostEventFields(player, pickupEvents, respawnEvents);
    const totals = totalsByKey.get(key);

    const used = totals?.boost_used ?? 0;
    const usedWhileSupersonic = totals?.boost_used_supersonic ?? 0;
    const trackedSeconds = totals?.tracked_seconds ?? 0;
    const average =
      trackedSeconds > 0 ? (totals?.boost_amount_weighted_sum ?? 0) / trackedSeconds : null;

    return {
      key,
      name: player.name || player.platform_player_id || "Unknown",
      platform: player.platform,
      platformPlayerId: player.platform_player_id,
      rank: statPlayerRank(player),
      team: player.team,
      average,
      bpm: perMinute(used, durationSeconds),
      bcpm: perMinute(eventFields.collected, durationSeconds),
      ...eventFields,
      used,
      usedWhileSupersonic,
      ...bandDurationsFromGroupTotals(totals),
    };
  });
}

// Recombine the server's boost-level band partition (empty/low/medium/high/
// full/over) into the summary's overlapping band fields, mirroring
// boostBandDurations.
function bandDurationsFromGroupTotals(totals: GroupBoostTotal | undefined) {
  const empty = totals?.time_empty ?? 0;
  const low = totals?.time_low ?? 0;
  const medium = totals?.time_medium ?? 0;
  const high = totals?.time_high ?? 0;
  const full = totals?.time_full ?? 0;
  const over = totals?.time_over ?? 0;
  return {
    timeZeroBoost: empty,
    timeHundredBoost: over,
    timeBoost0To25: empty + low,
    timeBoost25To50: medium,
    timeBoost50To75: high,
    timeBoost75To100: full + over,
    trackedSeconds: empty + low + medium + high + full + over,
  };
}

// Group analogue of boostLevelDistribution, built from the server's band
// seconds rather than a single replay's instantaneous samples.
function groupBoostLevelDistribution(
  players: ReplayPlayer[],
  totalsByKey: Map<string, GroupBoostTotal>,
): ReturnType<typeof boostLevelDistribution> {
  return players.map((player) => {
    const key = playerKey(player);
    const totals = totalsByKey.get(key);
    const secondsByBand = new Map<string, number>([
      ["empty", totals?.time_empty ?? 0],
      ["low", totals?.time_low ?? 0],
      ["medium", totals?.time_medium ?? 0],
      ["high", totals?.time_high ?? 0],
      ["full", totals?.time_full ?? 0],
      ["over", totals?.time_over ?? 0],
    ]);
    const knownSeconds = Array.from(secondsByBand.values()).reduce(
      (total, seconds) => total + seconds,
      0,
    );
    return {
      key,
      name: player.name || player.platform_player_id || "Unknown",
      team: player.team,
      bands: boostLevelBands.map((band) => ({
        ...band,
        seconds: secondsByBand.get(band.id) ?? 0,
        percent: knownSeconds > 0 ? ((secondsByBand.get(band.id) ?? 0) / knownSeconds) * 100 : 0,
      })),
    };
  });
}

function teamBoostSummary(
  summaries: BoostPlayerSummary[],
  team: 0 | 1,
  durationSeconds: number,
): BoostPlayerSummary {
  const teamRows = summaries.filter((summary) => summary.team === team);
  const sum = (selector: (summary: BoostPlayerSummary) => number) =>
    teamRows.reduce((total, summary) => total + selector(summary), 0);

  return {
    key: `team:${team}`,
    name: `${teamLabel(team)} team`,
    platform: null,
    platformPlayerId: null,
    rank: null,
    team,
    average: average(teamRows.map((summary) => summary.average).filter(isNumber)),
    bpm: perMinute(
      sum((summary) => summary.used),
      durationSeconds,
    ),
    bcpm: perMinute(
      sum((summary) => summary.collected),
      durationSeconds,
    ),
    collected: sum((summary) => summary.collected),
    collectedBig: sum((summary) => summary.collectedBig),
    collectedSmall: sum((summary) => summary.collectedSmall),
    collectedGrant: sum((summary) => summary.collectedGrant),
    collectedUnknown: sum((summary) => summary.collectedUnknown),
    used: sum((summary) => summary.used),
    stolen: sum((summary) => summary.stolen),
    stolenBigBoost: sum((summary) => summary.stolenBigBoost),
    stolenBig: sum((summary) => summary.stolenBig),
    stolenSmall: sum((summary) => summary.stolenSmall),
    stolenSmallBoost: sum((summary) => summary.stolenSmallBoost),
    stolenCount: sum((summary) => summary.stolenCount),
    bigPads: sum((summary) => summary.bigPads),
    bigPadsOffensive: sum((summary) => summary.bigPadsOffensive),
    bigPadsNeutral: sum((summary) => summary.bigPadsNeutral),
    bigPadsDefensive: sum((summary) => summary.bigPadsDefensive),
    smallPads: sum((summary) => summary.smallPads),
    smallPadsOffensive: sum((summary) => summary.smallPadsOffensive),
    smallPadsDefensive: sum((summary) => summary.smallPadsDefensive),
    usedWhileSupersonic: sum((summary) => summary.usedWhileSupersonic),
    overfill: sum((summary) => summary.overfill),
    stolenOverfill: sum((summary) => summary.stolenOverfill),
    timeZeroBoost: sum((summary) => summary.timeZeroBoost),
    timeHundredBoost: sum((summary) => summary.timeHundredBoost),
    timeBoost0To25: sum((summary) => summary.timeBoost0To25),
    timeBoost25To50: sum((summary) => summary.timeBoost25To50),
    timeBoost50To75: sum((summary) => summary.timeBoost50To75),
    timeBoost75To100: sum((summary) => summary.timeBoost75To100),
    trackedSeconds: sum((summary) => summary.trackedSeconds),
  };
}

function perMinute(value: number, durationSeconds: number): number | null {
  return durationSeconds > 0 ? value / (durationSeconds / 60) : null;
}

function scaledComparisonValue(
  value: number,
  durationSeconds: number,
  valueMode: BoostComparisonValueMode,
): number {
  if (valueMode === "per-minute") {
    const rate = perMinute(value, durationSeconds);
    return rate ?? 0;
  }
  return value;
}

function bigPadPotentialBoost(summary: BoostPlayerSummary): number {
  return summary.bigPads * 100;
}

function smallPadPotentialBoost(summary: BoostPlayerSummary): number {
  return summary.smallPads * 12;
}

function boostPickupMapPoints(
  players: ReplayPlayer[],
  pickupEvents: MechanicEventResponse[],
): BoostPickupMapPoint[] {
  const aggregates = new Map<string, BoostPickupMapPoint>();

  const addEvent = (event: MechanicEventResponse, stealKind: "big" | "small" | null) => {
    const position = eventPosition(event);
    const player = players.find((candidate) => eventMatchesPlayer(event, candidate));
    if (position == null || player == null) return;
    const pad = nearestBoostPad(position, boostPadSize(event));
    if (pad == null) return;
    const key = `${playerKey(player)}:${pad.id}`;
    const existing = aggregates.get(key);

    if (existing) {
      existing.count += 1;
      existing.stolenCount += stealKind === "big" ? 1 : 0;
      existing.smallStolenCount += stealKind === "small" ? 1 : 0;
      existing.stolen = existing.stolen || stealKind === "big";
      return;
    }

    aggregates.set(key, {
      key,
      playerKey: playerKey(player),
      playerName: player.name || player.platform_player_id || "Unknown",
      team: player.team,
      padId: pad.id,
      x: pad.x,
      y: pad.y,
      padSize: pad.size,
      count: 1,
      stolenCount: stealKind === "big" ? 1 : 0,
      smallStolenCount: stealKind === "small" ? 1 : 0,
      stolen: stealKind === "big",
      leader: false,
    });
  };

  for (const event of pickupEvents) {
    const stolenPadSize = isStealPickup(event) ? boostPadSize(event) : null;
    addEvent(event, stolenPadSize === "big" ? "big" : stolenPadSize === "small" ? "small" : null);
  }

  const points = Array.from(aggregates.values());
  const maxCountByPad = new Map<string, number>();
  for (const point of points) {
    maxCountByPad.set(point.padId, Math.max(maxCountByPad.get(point.padId) ?? 0, point.count));
  }
  for (const point of points) {
    point.leader = point.count > 0 && point.count === maxCountByPad.get(point.padId);
  }

  return points;
}

function nearestBoostPad(
  position: { x: number; y: number },
  size: "big" | "small" | null,
): BoostPadLocation | null {
  const candidates =
    size == null ? boostPadLocations : boostPadLocations.filter((pad) => pad.size === size);
  return candidates.reduce<BoostPadLocation | null>((nearest, pad) => {
    const distance = Math.hypot(position.x - pad.x, position.y - pad.y);
    if (nearest == null) return pad;
    const nearestDistance = Math.hypot(position.x - nearest.x, position.y - nearest.y);
    return distance < nearestDistance ? pad : nearest;
  }, null);
}

function createBoostPadLocations(): BoostPadLocation[] {
  const pads: BoostPadLocation[] = [];
  const add = (x: number, y: number, size: "big" | "small") => {
    pads.push({ id: `${size}:${Math.round(x)}:${Math.round(y)}`, x, y, size });
  };
  const mirrorX = (x: number, y: number, size: "big" | "small") => {
    add(-x, y, size);
    add(x, y, size);
  };
  const mirrorY = (x: number, y: number, size: "big" | "small") => {
    add(x, -y, size);
    add(x, y, size);
  };
  const mirrorBoth = (x: number, y: number, size: "big" | "small") => {
    mirrorX(x, -y, size);
    mirrorX(x, y, size);
  };

  mirrorY(0, 4240, "small");
  mirrorBoth(1792, 4184, "small");
  mirrorBoth(3072, 4096, "big");
  mirrorBoth(940, 3308, "small");
  mirrorY(0, 2816, "small");
  mirrorBoth(3584, 2484, "small");
  mirrorBoth(1788, 2300, "small");
  mirrorBoth(2048, 1036, "small");
  mirrorY(0, 1024, "small");
  mirrorX(3584, 0, "big");
  mirrorX(1024, 0, "small");

  return pads;
}

function eventPosition(event: MechanicEventResponse): { x: number; y: number } | null {
  const position = event.payload.player_position;
  if (!Array.isArray(position) || position.length < 2) return null;
  const [x, y] = position;
  return typeof x === "number" && typeof y === "number" && Number.isFinite(x) && Number.isFinite(y)
    ? { x, y }
    : null;
}

function projectFieldPosition(x: number, y: number): { x: number; y: number } {
  const fieldHalfWidth = 4096;
  const fieldHalfLength = 5120;
  const projectedX = 4 + clampNumber((x + fieldHalfWidth) / (fieldHalfWidth * 2), 0, 1) * 92;
  const projectedY = 121 - clampNumber((y + fieldHalfLength) / (fieldHalfLength * 2), 0, 1) * 117;
  return { x: projectedX, y: projectedY };
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

interface PlayerBoostContribution {
  key: string;
  amount: number;
  normalizedAmount: number;
  playerIndex: number;
}

interface TeamBoostAreaSeries {
  data: Array<Record<string, number | string>>;
  players: Array<{
    key: string;
    dataKey: string;
    name: string;
    playerIndex: number;
    team: "blue" | "orange";
    color: string;
  }>;
}

function teamBoostContributionsOverTime(
  samples: BoostStateSample[],
  players: ReplayPlayer[],
  durationSeconds: number,
) {
  const teamSizes = {
    blue: Math.max(1, players.filter((player) => player.team === 0).length),
    orange: Math.max(1, players.filter((player) => player.team === 1).length),
  };
  const playerRows = players.map((player, index) => ({
    key: playerKey(player),
    team: player.team,
    playerIndex: index,
  }));
  const sortedSamples = samples
    .slice()
    .sort((left, right) => left.time - right.time)
    .map((sample) => ({
      ...sample,
      playerKey: sample.playerId,
    }));
  let sampleIndex = 0;
  const latestByPlayer = new Map<string, number>();
  const points = [
    {
      time: 0,
      blue: playerRows
        .filter((player) => player.team === 0)
        .map((player) => playerBoostContribution(player, latestByPlayer, teamSizes.blue)),
      orange: playerRows
        .filter((player) => player.team === 1)
        .map((player) => playerBoostContribution(player, latestByPlayer, teamSizes.orange)),
    },
  ];

  while (sampleIndex < sortedSamples.length) {
    const time = sortedSamples[sampleIndex].time;
    while (sampleIndex < sortedSamples.length && sortedSamples[sampleIndex].time === time) {
      const sample = sortedSamples[sampleIndex];
      if (sample.playerKey != null) {
        latestByPlayer.set(sample.playerKey, sample.amount);
      }
      sampleIndex += 1;
    }

    points.push({
      time,
      blue: playerRows
        .filter((player) => player.team === 0)
        .map((player) => playerBoostContribution(player, latestByPlayer, teamSizes.blue)),
      orange: playerRows
        .filter((player) => player.team === 1)
        .map((player) => playerBoostContribution(player, latestByPlayer, teamSizes.orange)),
    });
  }

  const lastTime = points.at(-1)?.time ?? 0;
  if (durationSeconds > lastTime) {
    points.push({
      time: durationSeconds,
      blue: playerRows
        .filter((player) => player.team === 0)
        .map((player) => playerBoostContribution(player, latestByPlayer, teamSizes.blue)),
      orange: playerRows
        .filter((player) => player.team === 1)
        .map((player) => playerBoostContribution(player, latestByPlayer, teamSizes.orange)),
    });
  }

  return points;
}

function playerBoostContribution(
  player: { key: string; playerIndex: number },
  latestByPlayer: Map<string, number>,
  rosterSize: number,
): PlayerBoostContribution {
  const amount = latestByPlayer.get(player.key) ?? 0;
  return {
    key: player.key,
    amount,
    normalizedAmount: (amount / (rosterSize * 100)) * 100,
    playerIndex: player.playerIndex,
  };
}

function teamContributionTotal(contributions: PlayerBoostContribution[]): number {
  return contributions.reduce((total, contribution) => total + contribution.normalizedAmount, 0);
}

function teamBoostAreaSeries(
  points: ReturnType<typeof teamBoostContributionsOverTime>,
  players: ReplayPlayer[],
  team: 0 | 1,
  _durationSeconds: number,
): TeamBoostAreaSeries {
  const teamKey: "blue" | "orange" = team === 0 ? "blue" : "orange";
  const teamPlayers = players
    .map((player, globalIndex) => ({ player, globalIndex }))
    .filter(({ player }) => player.team === team)
    .map(({ player, globalIndex }, teamIndex) => ({
      key: playerKey(player),
      dataKey: `player_${globalIndex}`,
      name: player.name || player.platform_player_id || "Unknown",
      playerIndex: teamIndex,
      team: teamKey,
      color: playerChartColor(team, teamIndex),
    }));

  return {
    players: teamPlayers,
    data: points.map((point) => {
      const row: Record<string, number | string> = {
        time: point.time,
      };
      const contributions = team === 0 ? point.blue : point.orange;
      for (const player of teamPlayers) {
        row[player.dataKey] =
          contributions.find((contribution) => contribution.key === player.key)?.normalizedAmount ??
          0;
      }
      return row;
    }),
  };
}

const chartPalette = {
  axis: "#9aa8b8",
  grid: "#e4e9ef",
  muted: "#617181",
  selection: "#0f172a",
  total: "#475569",
  // Per-player identity hues (variant A): cool family for blue, warm for orange.
  // Index 0 doubles as the team base color. Kept in sync with the player-shade
  // hues in styles.css.
  teamBlue: ["#2563eb", "#8b5cf6", "#14b8a6", "#0ea5e9"],
  teamOrange: ["#ea580c", "#dc2626", "#ec4899", "#eab308"],
};

function playerChartColor(team: 0 | 1, index: number): string {
  const palette = team === 0 ? chartPalette.teamBlue : chartPalette.teamOrange;
  return palette[index % palette.length];
}

function boostLevelDistribution(
  samples: BoostStateSample[],
  players: ReplayPlayer[],
  durationSeconds: number,
) {
  return players.map((player) => {
    const key = playerKey(player);
    const matchingSamples = samples
      .filter((sample) => sample.playerId === playerKey(player))
      .slice()
      .sort((left, right) => left.time - right.time);
    const secondsByBand = new Map(boostLevelBands.map((band) => [band.id, 0]));

    for (let index = 0; index < matchingSamples.length; index += 1) {
      const sample = matchingSamples[index];
      const nextTime = matchingSamples[index + 1]?.time ?? durationSeconds;
      const seconds = Math.max(0, Math.min(durationSeconds, nextTime) - Math.max(0, sample.time));
      if (seconds === 0) continue;
      const band = boostBandForAmount(sample.amount);
      secondsByBand.set(band.id, (secondsByBand.get(band.id) ?? 0) + seconds);
    }

    const knownSeconds = Array.from(secondsByBand.values()).reduce(
      (total, seconds) => total + seconds,
      0,
    );
    return {
      key,
      name: player.name || player.platform_player_id || "Unknown",
      team: player.team,
      bands: boostLevelBands.map((band) => ({
        ...band,
        seconds: secondsByBand.get(band.id) ?? 0,
        percent: knownSeconds > 0 ? ((secondsByBand.get(band.id) ?? 0) / knownSeconds) * 100 : 0,
      })),
    };
  });
}

function teamBoostLevelDistribution(rows: ReturnType<typeof boostLevelDistribution>) {
  return ([0, 1] as const).map((team) => {
    const teamRows = rows.filter((row) => row.team === team);
    const secondsByBand = new Map(boostLevelBands.map((band) => [band.id, 0]));

    for (const row of teamRows) {
      for (const band of row.bands) {
        secondsByBand.set(band.id, (secondsByBand.get(band.id) ?? 0) + band.seconds);
      }
    }

    const knownSeconds = Array.from(secondsByBand.values()).reduce(
      (total, seconds) => total + seconds,
      0,
    );
    return {
      key: `team:${team}`,
      name: `${teamLabel(team)} team`,
      team,
      bands: boostLevelBands.map((band) => ({
        ...band,
        seconds: secondsByBand.get(band.id) ?? 0,
        percent: knownSeconds > 0 ? ((secondsByBand.get(band.id) ?? 0) / knownSeconds) * 100 : 0,
      })),
    };
  });
}

function boostBandDurations(samples: BoostStateSample[], durationSeconds: number) {
  const sortedSamples = samples.slice().sort((left, right) => left.time - right.time);
  const durations = {
    timeZeroBoost: 0,
    timeHundredBoost: 0,
    timeBoost0To25: 0,
    timeBoost25To50: 0,
    timeBoost50To75: 0,
    timeBoost75To100: 0,
    trackedSeconds: 0,
  };

  for (let index = 0; index < sortedSamples.length; index += 1) {
    const sample = sortedSamples[index];
    const nextTime = sortedSamples[index + 1]?.time ?? durationSeconds;
    const seconds = Math.max(0, Math.min(durationSeconds, nextTime) - Math.max(0, sample.time));
    if (seconds === 0) continue;

    durations.trackedSeconds += seconds;
    if (sample.amount < 1) durations.timeZeroBoost += seconds;
    if (sample.amount >= 100) durations.timeHundredBoost += seconds;
    if (sample.amount < 25) durations.timeBoost0To25 += seconds;
    if (sample.amount >= 25 && sample.amount < 50) durations.timeBoost25To50 += seconds;
    if (sample.amount >= 50 && sample.amount < 75) durations.timeBoost50To75 += seconds;
    if (sample.amount >= 75) durations.timeBoost75To100 += seconds;
  }

  return durations;
}

function boostBandForAmount(amount: number) {
  return (
    boostLevelBands.find((band) => amount >= band.min && amount < band.max) ??
    boostLevelBands[boostLevelBands.length - 1]
  );
}

function eventMatchesPlayer(event: MechanicEventResponse, player: ReplayPlayer): boolean {
  if (player.platform && player.platform_player_id) {
    return event.player_id === `${player.platform}:${player.platform_player_id}`;
  }
  return Boolean(player.name && event.player_name === player.name);
}

function playerKey(player: ReplayPlayer): string {
  return player.platform && player.platform_player_id
    ? `${player.platform}:${player.platform_player_id}`
    : `name:${player.name || "unknown"}`;
}

function playerProfilePath(player: {
  platform: string | null;
  platformPlayerId: string | null;
}): string | null {
  if (!player.platform || !player.platformPlayerId) return null;
  return `/players/${encodeURIComponent(player.platform)}/${encodeURIComponent(player.platformPlayerId)}/stats/boost`;
}

function average(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function isNumber(value: number | null): value is number {
  return value != null && Number.isFinite(value);
}

function numericPayload(payload: Record<string, unknown>, key: string): number | null {
  const value = payload[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function teamClass(team: number | null): "blue" | "orange" | "unknown" {
  if (team === 0) return "blue";
  if (team === 1) return "orange";
  return "unknown";
}

function teamLocalPlayerIndexByKey(players: ReplayPlayer[]): Map<string, number> {
  const indexes = new Map<string, number>();
  const counts = new Map<number | null, number>();
  for (const player of players) {
    const index = counts.get(player.team) ?? 0;
    indexes.set(playerKey(player), index);
    counts.set(player.team, index + 1);
  }
  return indexes;
}

function boostPadSize(event: MechanicEventResponse): "big" | "small" | null {
  const direct = event.payload.pad_type ?? event.payload.pad_size;
  if (direct === "big" || direct === "small") return direct;

  const labels = event.payload.labels;
  if (!Array.isArray(labels)) return null;
  const padSize = labels.find((label): label is { key: string; value: string } => {
    if (typeof label !== "object" || label == null) return false;
    const record = label as Record<string, unknown>;
    return record.key === "pad_size" && (record.value === "big" || record.value === "small");
  });
  return padSize?.value === "big" || padSize?.value === "small" ? padSize.value : null;
}

function formatSeconds(value: number | null): string {
  if (value == null) return "Unknown";
  return `${Math.round(value)}s`;
}

function formatNumber(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  const absoluteValue = Math.abs(value);
  if (absoluteValue >= 100) return value.toFixed(0);
  return value.toFixed(absoluteValue >= 10 ? 1 : 2);
}

function formatBoost(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  return Math.round(value).toLocaleString();
}

function formatBoostWithRate(value: number, durationSeconds: number): string {
  const perMinuteValue = perMinute(value, durationSeconds);
  return `${formatBoost(value)} (${formatNumber(perMinuteValue)}/m)`;
}

function formatCountWithRate(count: number, durationSeconds: number): string {
  const perMinuteValue = perMinute(count, durationSeconds);
  return `${count.toLocaleString()} (${formatNumber(perMinuteValue)}/m)`;
}

function formatBoostComparisonValue(
  value: number,
  durationSeconds: number,
  valueMode: BoostComparisonValueMode,
): string {
  if (valueMode === "per-minute") {
    return `${formatNumber(perMinute(value, durationSeconds))}/m`;
  }
  return formatBoostWithRate(value, durationSeconds);
}

function formatCountComparisonValue(
  count: number,
  durationSeconds: number,
  valueMode: BoostComparisonValueMode,
): string {
  if (valueMode === "per-minute") {
    return `${formatNumber(perMinute(count, durationSeconds))}/m`;
  }
  return formatCountWithRate(count, durationSeconds);
}

function comparisonSegmentTitle(
  label: string,
  value: number,
  durationSeconds: number,
  valueMode: BoostComparisonValueMode,
  valueKind: "boost" | "count",
): string {
  const total = valueKind === "boost" ? formatBoost(value) : value.toLocaleString();
  if (valueMode !== "per-minute") {
    return `${label}: ${total}`;
  }
  const rate = formatNumber(perMinute(value, durationSeconds));
  return `${label}: ${rate}/m (${total} total)`;
}

function teamLabel(team: number | null): string {
  if (team === 0) return "Blue";
  if (team === 1) return "Orange";
  return "Unknown";
}
