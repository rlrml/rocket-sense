import { useMemo, useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import {
  comparisonSubjectLabel,
  StatComparisonGrid,
  StatComparisonPanel,
  subjectIndexByTeam,
  subjectMagnitudeRows,
  subjectSplitRows,
  type SplitValue,
} from "./comparisonPanels";
import {
  SegmentedBar,
  StatPlayerLabel,
  statPercentWithValue,
  statPlayerRank,
  type SegmentedBarSegment,
  type StatPlayerRank,
} from "./shared";

export const possessionEventTypes = ["possession", "player_possession", "ball_half", "ball_third"];

type PossessionState = "team_zero" | "team_one" | "neutral";
type FieldThird = "team_zero_third" | "neutral_third" | "team_one_third";
type FieldHalf = "team_zero_side" | "neutral" | "team_one_side";
type PossessionComparisonMode = "teams" | "players";
type PossessionZone = "offensive" | "neutral" | "defensive";
type GroupPossessionView = "leaderboard" | "share" | "ball-half" | "ball-thirds" | "zones";

interface PossessionSpan {
  key: string;
  start: number;
  end: number;
  duration: number;
  state: PossessionState;
  playerId: string | null;
  playerName: string | null;
}

interface PlayerPossessionSpan {
  key: string;
  start: number;
  end: number;
  duration: number;
  playerId: string | null;
  playerName: string | null;
  team: number | null;
  startThird: FieldThird | null;
  endThird: FieldThird | null;
}

interface BallThirdSpan {
  key: string;
  start: number;
  end: number;
  duration: number;
  third: FieldThird;
}

const possessionStates: PossessionState[] = ["team_zero", "neutral", "team_one"];
const possessionZones: PossessionZone[] = ["offensive", "neutral", "defensive"];
const possessionZoneValues: SplitValue[] = [
  { id: "offensive", label: "Offensive", segmentClass: "possession-zone-offensive" },
  { id: "neutral", label: "Neutral", segmentClass: "possession-zone-neutral" },
  { id: "defensive", label: "Defensive", segmentClass: "possession-zone-defensive" },
];

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
  const playerSpans = useMemo(() => playerPossessionSpans(events, spans), [events, spans]);
  const ballThirdSpans = useMemo(() => ballThirdSpansFromEvents(events, spans), [events, spans]);
  const ballHalfTotals = useMemo(() => ballHalfTotalsFromEvents(events), [events]);
  const chartSpans = spans.length > 0 ? spans : playerPossessionTimelineSpans(playerSpans);
  const chartDuration = Math.max(
    1,
    durationSeconds ?? 0,
    60,
    ...chartSpans.map((span) => span.end),
  );
  const possessionTotals = possessionStateTotals(spans);
  const ballThirdsTotals = ballThirdsStateTotals(ballThirdSpans);
  const totalTrackedSeconds = sumObjectValues(possessionTotals);
  const playerTrackedSeconds = sumPlayerPossessionSeconds(playerSpans);
  const ballThirdsTrackedSeconds = sumObjectValues(ballThirdsTotals);
  const ballHalfTrackedSeconds = sumObjectValues(ballHalfTotals);
  const [comparisonMode, setComparisonMode] = useState<PossessionComparisonMode>("players");
  const [groupView, setGroupView] = useState<GroupPossessionView>("leaderboard");
  const playerSummaries = playerPossessionSummaries(players, playerSpans);
  const zoneSubjects = possessionZoneSubjects(
    players,
    spans,
    playerSpans,
    ballThirdSpans,
    comparisonMode,
  );
  const hasPlayerSpans = playerSummaries.some((summary) => summary.seconds > 0);

  if (scope === "group") {
    return (
      <div className="possession-detail">
        <GroupPossessionViewToggle
          activeView={groupView}
          hasPlayerSpans={hasPlayerSpans}
          onViewChange={setGroupView}
        />
        {groupView === "leaderboard" ? (
          <section className="chart-panel full-span">
            <header className="chart-panel-header">
              <h3>Possession leaderboard</h3>
              <span>{formatSeconds(totalTrackedSeconds)} tracked</span>
            </header>
            <PlayerPossessionLeaderboard
              summaries={playerSummaries}
              totalSeconds={playerTrackedSeconds}
            />
          </section>
        ) : null}
        {groupView === "share" ? (
          <section className="chart-panel full-span">
            <header className="chart-panel-header">
              <h3>Replay-local Blue/Orange share</h3>
              <span>{formatSeconds(totalTrackedSeconds)} tracked</span>
            </header>
            <PossessionShareChart totals={possessionTotals} totalSeconds={totalTrackedSeconds} />
          </section>
        ) : null}
        {groupView === "ball-half" ? (
          <section className="chart-panel full-span">
            <header className="chart-panel-header">
              <h3>Replay-local ball half</h3>
              <span>{formatSeconds(ballHalfTrackedSeconds)} tracked</span>
            </header>
            <BallHalfChart
              scope="group"
              totals={ballHalfTotals}
              totalSeconds={ballHalfTrackedSeconds}
            />
          </section>
        ) : null}
        {groupView === "ball-thirds" ? (
          <section className="chart-panel full-span">
            <header className="chart-panel-header">
              <h3>Replay-local ball thirds</h3>
              <span>{formatSeconds(ballThirdsTrackedSeconds)} tracked</span>
            </header>
            <PossessionShareChart
              ariaLabel="Ball time by field third"
              totals={ballThirdsTotals}
              totalSeconds={ballThirdsTrackedSeconds}
              showMetrics={false}
            />
          </section>
        ) : null}
        {groupView === "zones" ? (
          <div className="stat-section-grid">
            {possessionZones.map((zone) => (
              <section className="chart-panel" key={zone}>
                <header className="chart-panel-header">
                  <h3>{possessionZoneTitle(zone)}</h3>
                  <span>{formatSeconds(zoneTotal(zoneSubjects, zone))} tracked</span>
                </header>
                <PossessionZoneChart comparisonMode="teams" subjects={zoneSubjects} zone={zone} />
              </section>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="possession-detail">
      <PossessionComparisonModeToggle
        comparisonMode={comparisonMode}
        hasPlayerSpans={hasPlayerSpans}
        onComparisonModeChange={setComparisonMode}
      />
      <StatComparisonGrid className="possession-comparison-grid">
        <section className="player-comparison-chart stat-comparison-card possession-overview-card">
          <header className="chart-panel-header">
            <h3>Ball half</h3>
            <span>{formatSeconds(ballHalfTrackedSeconds)} tracked</span>
          </header>
          <BallHalfChart
            scope="replay"
            totals={ballHalfTotals}
            totalSeconds={ballHalfTrackedSeconds}
          />
        </section>

        <section className="player-comparison-chart stat-comparison-card possession-overview-card">
          <header className="chart-panel-header">
            <h3>Ball thirds</h3>
            <span>{formatSeconds(ballThirdsTrackedSeconds)} tracked</span>
          </header>
          <PossessionShareChart
            ariaLabel="Ball time by field third"
            totals={ballThirdsTotals}
            totalSeconds={ballThirdsTrackedSeconds}
            showMetrics={false}
          />
        </section>

        {comparisonMode === "teams" ? (
          <section className="player-comparison-chart stat-comparison-card possession-overview-card">
            <header className="chart-panel-header">
              <h3>Possession share</h3>
              <span>{formatSeconds(totalTrackedSeconds)} tracked</span>
            </header>
            <PossessionShareChart totals={possessionTotals} totalSeconds={totalTrackedSeconds} />
          </section>
        ) : (
          <PlayerPossessionChart summaries={playerSummaries} totalSeconds={playerTrackedSeconds} />
        )}

        {hasPlayerSpans ? <PlayerPossessionStatPanels summaries={playerSummaries} /> : null}
        <PossessionZonesPanel
          comparisonMode={comparisonMode}
          subjects={zoneSubjects}
          title="Possession zones"
        />
      </StatComparisonGrid>

      <div className="stat-section-grid">
        {scope === "replay" ? (
          <section className="chart-panel full-span">
            <header className="chart-panel-header">
              <h3>Possession timeline</h3>
              <span>{formatSeconds(chartDuration)}</span>
            </header>
            <PossessionTimeline spans={chartSpans} durationSeconds={chartDuration} />
          </section>
        ) : null}
      </div>
    </div>
  );
}

function GroupPossessionViewToggle({
  activeView,
  hasPlayerSpans,
  onViewChange,
}: {
  activeView: GroupPossessionView;
  hasPlayerSpans: boolean;
  onViewChange: (view: GroupPossessionView) => void;
}) {
  const views: Array<{
    key: GroupPossessionView;
    label: string;
    disabled?: boolean;
    title?: string;
  }> = [
    {
      key: "leaderboard",
      label: "Leaderboard",
      disabled: !hasPlayerSpans,
      title: hasPlayerSpans
        ? "Possession leaderboard"
        : "Reprocess these replays to populate player possession spans",
    },
    { key: "share", label: "Blue/Orange" },
    { key: "ball-half", label: "Ball half" },
    { key: "ball-thirds", label: "Ball thirds" },
    { key: "zones", label: "Zones" },
  ];

  return (
    <div className="boost-page-controls">
      <div className="boost-comparison-tabs" role="tablist" aria-label="Group possession view">
        {views.map((view) => (
          <button
            aria-selected={activeView === view.key}
            className={activeView === view.key ? "active" : ""}
            disabled={view.disabled}
            key={view.key}
            onClick={() => onViewChange(view.key)}
            role="tab"
            title={view.title ?? view.label}
            type="button"
          >
            {view.label}
          </button>
        ))}
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
          title={
            hasPlayerSpans
              ? "Player possession"
              : "Reprocess this replay to populate player possession spans"
          }
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
  ariaLabel = "Possession share",
  totals,
  totalSeconds,
  showMetrics = true,
}: {
  ariaLabel?: string;
  totals: Record<PossessionState, number>;
  totalSeconds: number;
  showMetrics?: boolean;
}) {
  const total = Math.max(0, totalSeconds);
  const segments = possessionStates.map((state) =>
    possessionStateSegment(state, totals[state], total),
  );

  return (
    <div className="possession-share-chart">
      <SegmentedBar
        ariaLabel={ariaLabel}
        className="possession-share-track"
        segments={segments}
        total={total}
      />
      {showMetrics ? (
        <div className="possession-metric-grid">
          {possessionStates.map((state) => (
            <div className={`possession-metric possession-state-accent-${state}`} key={state}>
              <span>{possessionStateLabel(state)}</span>
              <strong>{formatPercent(percentage(totals[state], total))}</strong>
              <span>{formatSeconds(totals[state])}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BallHalfChart({
  scope,
  totals,
  totalSeconds,
}: {
  scope: "replay" | "group";
  totals: Record<PossessionState, number>;
  totalSeconds: number;
}) {
  if (totalSeconds <= 0) {
    return (
      <div className="stat-empty">
        No ball-half data is available for {scope === "group" ? "these replays" : "this replay"}.
        Reprocess to populate it.
      </div>
    );
  }

  return (
    <PossessionShareChart
      ariaLabel="Ball time by field half"
      totals={totals}
      totalSeconds={totalSeconds}
      showMetrics={false}
    />
  );
}

interface PlayerPossessionSummary {
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  rank: StatPlayerRank | null;
  team: number | null;
  seconds: number;
  spans: number;
  games: number | null;
}

interface PossessionZoneSubject {
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  rank: StatPlayerRank | null;
  showPlatformBadge: boolean;
  team: number | null;
  zoneSeconds: Record<PossessionZone, number>;
}

function PlayerPossessionChart({
  summaries,
  totalSeconds,
}: {
  summaries: PlayerPossessionSummary[];
  totalSeconds: number;
}) {
  if (!summaries.some((summary) => summary.seconds > 0)) {
    return (
      <div className="stat-empty">No player possession spans are available for this replay.</div>
    );
  }

  const subjectIndexByKey = subjectIndexByTeam(summaries);
  return (
    <StatComparisonPanel
      title={`Possession time · ${formatSeconds(totalSeconds)} tracked`}
      rows={subjectMagnitudeRows(summaries, {
        teamColored: true,
        subjectIndexByKey,
        groupClassName: "possession-bar-player",
        metric: (summary) => summary.seconds,
        format: formatSeconds,
        label: possessionSummaryLabel,
      })}
    />
  );
}

function PlayerPossessionStatPanels({ summaries }: { summaries: PlayerPossessionSummary[] }) {
  const subjectIndexByKey = subjectIndexByTeam(summaries);
  return (
    <>
      <StatComparisonPanel
        title="Possession spans"
        rows={subjectMagnitudeRows(summaries, {
          teamColored: true,
          subjectIndexByKey,
          groupClassName: "possession-bar-spans",
          metric: (summary) => summary.spans,
          format: formatCount,
          label: possessionSummaryLabel,
        })}
      />
      <StatComparisonPanel
        title="Average span"
        rows={subjectMagnitudeRows(summaries, {
          teamColored: true,
          subjectIndexByKey,
          groupClassName: "possession-bar-average-span",
          metric: (summary) => (summary.spans > 0 ? summary.seconds / summary.spans : null),
          format: formatSeconds,
          label: possessionSummaryLabel,
          placeholder: "—",
        })}
      />
    </>
  );
}

function PossessionZonesPanel({
  comparisonMode,
  subjects,
  title,
}: {
  comparisonMode: PossessionComparisonMode;
  subjects: PossessionZoneSubject[];
  title: string;
}) {
  const rows = subjectSplitRows(subjects, possessionZoneValues, {
    amount: (subject, value) => subject.zoneSeconds[value.id as PossessionZone] ?? 0,
    total: (subject) => sumObjectValues(subject.zoneSeconds),
    format: formatSeconds,
    label: possessionZoneSubjectLabel,
    minLabelShare: 0.16,
  });

  return (
    <StatComparisonPanel
      emptyLabel={`No ${comparisonMode === "players" ? "player" : "team"} possession zone data is available yet.`}
      footer={<PossessionZoneLegend />}
      rows={rows}
      title={title}
    />
  );
}

function PossessionZoneLegend() {
  return (
    <div className="chart-legend possession-zone-legend">
      {possessionZoneValues.map((value) => (
        <span className={value.segmentClass} key={value.id}>
          {value.label}
        </span>
      ))}
    </div>
  );
}

function PossessionZoneChart({
  comparisonMode,
  subjects,
  zone,
}: {
  comparisonMode: PossessionComparisonMode;
  subjects: PossessionZoneSubject[];
  zone: PossessionZone;
}) {
  const rows = subjects
    .filter((subject) => subject.zoneSeconds[zone] > 0)
    .sort(
      (left, right) =>
        right.zoneSeconds[zone] - left.zoneSeconds[zone] || compareZoneSubjects(left, right),
    );
  const maxSeconds = Math.max(1, ...rows.map((subject) => subject.zoneSeconds[zone]));

  if (rows.length === 0) {
    return (
      <div className="stat-empty">
        No {comparisonMode === "players" ? "player" : "team"} possession spans are available for
        this zone.
      </div>
    );
  }

  return (
    <div className="possession-player-bars">
      {rows.map((subject) => {
        const seconds = subject.zoneSeconds[zone];
        const total = zoneTotal(subjects, zone);
        const percent = percentage(seconds, total);
        return (
          <div className="possession-player-row" key={subject.key}>
            <StatPlayerLabel
              className={`team-accent-${teamClass(subject.team)}`}
              name={subject.name}
              platform={subject.platform}
              profilePath={playerProfilePath(subject)}
              rank={subject.rank}
              showPlatformBadge={subject.showPlatformBadge}
              subtitle={subject.showPlatformBadge ? teamLabel(subject.team) : "Team"}
            />
            <SegmentedBar
              ariaLabel={`${subject.name} ${possessionZoneTitle(zone).toLowerCase()}`}
              className="possession-player-track"
              maxValue={maxSeconds}
              segments={[
                {
                  key: subject.key,
                  className: `team-segment-${teamClass(subject.team)}`,
                  label: subject.name,
                  value: seconds,
                  visibleLabel: statPercentWithValue(
                    formatPercent(percent),
                    formatSeconds(seconds),
                  ),
                  title: statPercentWithValue(
                    formatPercent(percent),
                    formatSeconds(seconds),
                    subject.name,
                  ),
                },
              ]}
              total={seconds}
            />
          </div>
        );
      })}
    </div>
  );
}

function PlayerPossessionLeaderboard({
  summaries,
  totalSeconds,
}: {
  summaries: PlayerPossessionSummary[];
  totalSeconds: number;
}) {
  const rows = summaries.filter((summary) => summary.seconds > 0);

  if (rows.length === 0) {
    return (
      <div className="stat-empty">No player possession spans are available for this group.</div>
    );
  }

  return (
    <div className="table-frame compact-table possession-leaderboard-table">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Possession</th>
            <th>Share</th>
            <th>Spans</th>
            <th>Avg span</th>
            <th>Games</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((summary) => (
            <tr key={summary.key}>
              <td>
                <StatPlayerLabel
                  className={`team-accent-${teamClass(summary.team)}`}
                  name={summary.name}
                  platform={summary.platform}
                  profilePath={playerProfilePath(summary)}
                  rank={summary.rank}
                  subtitle={summary.team == null ? "Mixed colors" : teamLabel(summary.team)}
                />
              </td>
              <td>{formatSeconds(summary.seconds)}</td>
              <td>{formatPercent(percentage(summary.seconds, totalSeconds))}</td>
              <td>{summary.spans.toLocaleString()}</td>
              <td>{formatSeconds(summary.spans > 0 ? summary.seconds / summary.spans : 0)}</td>
              <td>{summary.games == null ? "Unknown" : summary.games.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <svg
        className="possession-timeline"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Possession over time"
      >
        <rect className="possession-timeline-bg" x="0" y="30" width={width} height="34" rx="6" />
        {ticks.map((tick) => {
          const x = (tick / durationSeconds) * width;
          return (
            <g key={tick}>
              <line className="possession-timeline-grid" x1={x} x2={x} y1="22" y2="76" />
              <text
                className="possession-timeline-label"
                textAnchor={timelineTickAnchor(tick, durationSeconds)}
                x={x}
                y="98"
              >
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
  const end =
    event.end_time ??
    numericPayload(event.payload, "end_time") ??
    (payloadDuration == null ? start : start + payloadDuration);
  const duration = payloadDuration ?? Math.max(0, end - start);
  const state = possessionState(event.payload.possession_state);
  if (state == null || duration <= 0 || !Number.isFinite(start) || !Number.isFinite(end))
    return null;

  return {
    key: event.id || `${index}:${start}:${end}`,
    start,
    end: Math.max(start, end),
    duration,
    state,
    playerId: event.player_id ?? stringPayload(event.payload, "player_id"),
    playerName: event.player_name ?? null,
  };
}

function playerPossessionSpans(
  events: MechanicEventResponse[],
  teamSpans: PossessionSpan[],
): PlayerPossessionSpan[] {
  const spans = events
    .filter((event) => event.event_type === "player_possession")
    .map((event, index) => playerPossessionSpan(event, index))
    .filter((span): span is PlayerPossessionSpan => span != null)
    .sort((left, right) => left.start - right.start || left.end - right.end);

  return spans.length > 0 ? spans : legacyPlayerPossessionSpans(teamSpans, events);
}

function playerPossessionSpan(
  event: MechanicEventResponse,
  index: number,
): PlayerPossessionSpan | null {
  const start = event.start_time ?? numericPayload(event.payload, "start_time");
  const end = event.end_time ?? numericPayload(event.payload, "end_time");
  const duration = numericPayload(event.payload, "duration") ?? (end ?? 0) - (start ?? 0);
  const playerId = event.player_id ?? playerIdPayload(event.payload, "player_id");
  if (
    playerId == null ||
    start == null ||
    end == null ||
    duration <= 0 ||
    !Number.isFinite(start) ||
    !Number.isFinite(end)
  ) {
    return null;
  }

  return {
    key: event.id || `player:${index}:${start}:${end}`,
    start,
    end: Math.max(start, end),
    duration,
    playerId,
    playerName: event.player_name ?? null,
    team: event.team ?? teamFromBoolean(booleanPayload(event.payload, "is_team_0")),
    startThird: fieldThird(event.payload.start_field_third),
    endThird: fieldThird(event.payload.end_field_third),
  };
}

function legacyPlayerPossessionSpans(
  teamSpans: PossessionSpan[],
  events: MechanicEventResponse[],
): PlayerPossessionSpan[] {
  const legacyThirds = new Map<string, FieldThird | null>();
  for (const event of events) {
    if (event.event_type !== "possession") continue;
    const span = possessionSpan(event, legacyThirds.size);
    if (!span) continue;
    legacyThirds.set(span.key, fieldThird(event.payload.field_third));
  }

  return teamSpans
    .filter((span) => span.playerId != null)
    .map((span): PlayerPossessionSpan => {
      const team = possessionStateTeam(span.state);
      const third = legacyThirds.get(span.key) ?? null;
      return {
        key: span.key,
        start: span.start,
        end: span.end,
        duration: span.duration,
        playerId: span.playerId,
        playerName: span.playerName,
        team,
        startThird: third,
        endThird: third,
      };
    });
}

function possessionStateTotals(spans: PossessionSpan[]): Record<PossessionState, number> {
  const totals = emptyStateTotals();
  for (const span of spans) {
    totals[span.state] += span.duration;
  }
  return totals;
}

function ballThirdsStateTotals(spans: BallThirdSpan[]): Record<PossessionState, number> {
  const totals = emptyStateTotals();
  for (const span of spans) {
    const state = ballThirdsState(span.third);
    totals[state] += span.duration;
  }
  return totals;
}

function ballThirdSpansFromEvents(
  events: MechanicEventResponse[],
  possessionSpans: PossessionSpan[],
): BallThirdSpan[] {
  const spans = events
    .filter((event) => event.event_type === "ball_third")
    .map((event, index) => ballThirdSpan(event, index))
    .filter((span): span is BallThirdSpan => span != null)
    .sort((left, right) => left.start - right.start || left.end - right.end);

  return spans.length > 0 ? spans : legacyBallThirdSpans(events, possessionSpans);
}

function ballThirdSpan(event: MechanicEventResponse, index: number): BallThirdSpan | null {
  if (booleanPayload(event.payload, "active") === false) return null;
  const third = fieldThird(event.payload.field_third);
  if (third == null) return null;
  const start = event.start_time ?? numericPayload(event.payload, "time") ?? event.event_time ?? 0;
  const payloadDuration = numericPayload(event.payload, "duration");
  const end =
    event.end_time ??
    numericPayload(event.payload, "end_time") ??
    (payloadDuration == null ? start : start + payloadDuration);
  const duration = payloadDuration ?? Math.max(0, end - start);
  if (!(duration > 0) || !Number.isFinite(start) || !Number.isFinite(end)) return null;

  return {
    key: event.id || `ball-third:${index}:${start}:${end}`,
    start,
    end: Math.max(start, end),
    duration,
    third,
  };
}

function legacyBallThirdSpans(
  events: MechanicEventResponse[],
  possessionSpans: PossessionSpan[],
): BallThirdSpan[] {
  const eventThirds = new Map<string, FieldThird>();
  for (const event of events) {
    if (event.event_type !== "possession") continue;
    const span = possessionSpan(event, eventThirds.size);
    const third = fieldThird(event.payload.field_third);
    if (span && third) eventThirds.set(span.key, third);
  }

  return possessionSpans.flatMap((span): BallThirdSpan[] => {
    const third = eventThirds.get(span.key);
    if (!third) return [];
    return [
      {
        key: `legacy-third:${span.key}`,
        start: span.start,
        end: span.end,
        duration: span.duration,
        third,
      },
    ];
  });
}

function ballHalfTotalsFromEvents(
  events: MechanicEventResponse[],
): Record<PossessionState, number> {
  const totals = emptyStateTotals();
  for (const event of events) {
    if (event.event_type !== "ball_half") continue;
    if (booleanPayload(event.payload, "active") === false) continue;
    const state = fieldHalfState(fieldHalf(event.payload.field_half));
    if (state == null) continue;
    const start =
      event.start_time ?? numericPayload(event.payload, "time") ?? event.event_time ?? 0;
    const payloadDuration = numericPayload(event.payload, "duration");
    const end =
      event.end_time ??
      numericPayload(event.payload, "end_time") ??
      (payloadDuration == null ? start : start + payloadDuration);
    const duration = payloadDuration ?? Math.max(0, end - start);
    if (!(duration > 0) || !Number.isFinite(duration)) continue;
    totals[state] += duration;
  }
  return totals;
}

function emptyStateTotals(): Record<PossessionState, number> {
  return {
    team_zero: 0,
    team_one: 0,
    neutral: 0,
  };
}

function sumPlayerPossessionSeconds(spans: PlayerPossessionSpan[]): number {
  return spans.reduce((total, span) => total + span.duration, 0);
}

function playerPossessionTimelineSpans(spans: PlayerPossessionSpan[]): PossessionSpan[] {
  return spans.map((span): PossessionSpan => {
    const team = span.team === 0 || span.team === 1 ? span.team : null;
    return {
      key: `timeline:${span.key}`,
      start: span.start,
      end: span.end,
      duration: span.duration,
      state: team === 0 ? "team_zero" : team === 1 ? "team_one" : "neutral",
      playerId: span.playerId,
      playerName: span.playerName,
    };
  });
}

function playerPossessionSummaries(
  players: ReplayPlayer[],
  spans: PlayerPossessionSpan[],
): PlayerPossessionSummary[] {
  const usedSpanKeys = new Set<string>();
  const summaries = players.map((player, index) => {
    const key = playerKey(player, index);
    const playerSpans = spans.filter(
      (span) => span.playerId != null && playerMatchesId(player, span.playerId),
    );
    for (const span of playerSpans) usedSpanKeys.add(span.key);
    const seconds = playerSpans.reduce((total, span) => total + span.duration, 0);

    return {
      key,
      name: player.name || player.platform_player_id || "Unknown",
      platform: player.platform,
      platformPlayerId: player.platform_player_id,
      rank: statPlayerRank(player),
      team: player.team,
      seconds,
      spans: playerSpans.length,
      games: player.appearance_count ?? null,
    };
  });

  for (const span of spans) {
    if (span.playerId == null || usedSpanKeys.has(span.key)) continue;
    summaries.push({
      key: `event:${span.playerId}`,
      name: span.playerName || span.playerId,
      platform: null,
      platformPlayerId: null,
      rank: null,
      team: null,
      seconds: span.duration,
      spans: 1,
      games: null,
    });
  }

  return summaries.sort((left, right) => {
    if (right.seconds !== left.seconds) return right.seconds - left.seconds;
    if ((left.team ?? 99) !== (right.team ?? 99)) return (left.team ?? 99) - (right.team ?? 99);
    return left.name.localeCompare(right.name);
  });
}

function possessionZoneSubjects(
  players: ReplayPlayer[],
  teamSpans: PossessionSpan[],
  playerSpans: PlayerPossessionSpan[],
  ballThirdSpans: BallThirdSpan[],
  comparisonMode: PossessionComparisonMode,
): PossessionZoneSubject[] {
  return comparisonMode === "players"
    ? playerPossessionZoneSubjects(players, playerSpans, ballThirdSpans)
    : teamPossessionZoneSubjects(teamSpans, ballThirdSpans);
}

function playerPossessionZoneSubjects(
  players: ReplayPlayer[],
  spans: PlayerPossessionSpan[],
  ballThirdSpans: BallThirdSpan[],
): PossessionZoneSubject[] {
  const subjects = players.map(
    (player, index): PossessionZoneSubject => ({
      key: playerKey(player, index),
      name: player.name || player.platform_player_id || "Unknown",
      platform: player.platform,
      platformPlayerId: player.platform_player_id,
      rank: statPlayerRank(player),
      showPlatformBadge: true,
      team: player.team,
      zoneSeconds: emptyZoneSeconds(),
    }),
  );

  for (const span of spans) {
    if (span.playerId == null) continue;
    const playerId = span.playerId;
    const subject = subjects.find((_, index) => playerMatchesId(players[index], playerId));
    if (!subject) continue;
    addSpanZoneSeconds(
      subject.zoneSeconds,
      span,
      ballThirdSpans,
      subject.team ?? span.team,
      span.startThird,
      span.endThird,
    );
  }

  return subjects;
}

function teamPossessionZoneSubjects(
  spans: PossessionSpan[],
  ballThirdSpans: BallThirdSpan[],
): PossessionZoneSubject[] {
  const subjects: PossessionZoneSubject[] = ([0, 1] as const).map((team) => ({
    key: `team:${team}`,
    name: teamLabel(team),
    platform: null,
    platformPlayerId: null,
    rank: null,
    showPlatformBadge: false,
    team,
    zoneSeconds: emptyZoneSeconds(),
  }));

  for (const span of spans) {
    const team = possessionStateTeam(span.state);
    if (team == null) continue;
    const subject = subjects[team];
    addSpanZoneSeconds(subject.zoneSeconds, span, ballThirdSpans, team, null, null);
  }

  return subjects;
}

function addSpanZoneSeconds(
  zoneSeconds: Record<PossessionZone, number>,
  span: Pick<PlayerPossessionSpan, "start" | "end" | "duration">,
  ballThirdSpans: BallThirdSpan[],
  team: number | null,
  fallbackStartThird: FieldThird | null,
  fallbackEndThird: FieldThird | null,
) {
  const wallDuration = Math.max(0, span.end - span.start);
  let allocated = 0;

  if (wallDuration > 0) {
    for (const thirdSpan of ballThirdSpans) {
      const overlap = overlapSeconds(span, thirdSpan);
      if (overlap <= 0) continue;
      const zone = possessionZoneForTeam(thirdSpan.third, team);
      if (!zone) continue;
      const seconds = Math.min(span.duration - allocated, (overlap / wallDuration) * span.duration);
      if (seconds <= 0) continue;
      zoneSeconds[zone] += seconds;
      allocated += seconds;
    }
  }

  const remaining = Math.max(0, span.duration - allocated);
  if (remaining <= 0) return;
  for (const [third, fraction] of fallbackThirdFractions(fallbackStartThird, fallbackEndThird)) {
    const zone = possessionZoneForTeam(third, team);
    if (zone) zoneSeconds[zone] += remaining * fraction;
  }
}

function fallbackThirdFractions(
  startThird: FieldThird | null,
  endThird: FieldThird | null,
): Array<[FieldThird, number]> {
  if (startThird && endThird && startThird !== endThird) {
    return [
      [startThird, 0.5],
      [endThird, 0.5],
    ];
  }
  const third = startThird ?? endThird;
  return third ? [[third, 1]] : [];
}

function overlapSeconds(
  left: Pick<PlayerPossessionSpan, "start" | "end">,
  right: Pick<BallThirdSpan, "start" | "end">,
): number {
  return Math.max(0, Math.min(left.end, right.end) - Math.max(left.start, right.start));
}

function emptyZoneSeconds(): Record<PossessionZone, number> {
  return {
    offensive: 0,
    neutral: 0,
    defensive: 0,
  };
}

function possessionZoneForTeam(third: FieldThird, team: number | null): PossessionZone | null {
  if (third === "neutral_third") return "neutral";
  if (team === 0) return third === "team_one_third" ? "offensive" : "defensive";
  if (team === 1) return third === "team_zero_third" ? "offensive" : "defensive";
  return null;
}

function possessionStateTeam(state: PossessionState): 0 | 1 | null {
  if (state === "team_zero") return 0;
  if (state === "team_one") return 1;
  return null;
}

function ballThirdsState(third: FieldThird): PossessionState {
  if (third === "team_zero_third") return "team_zero";
  if (third === "team_one_third") return "team_one";
  return "neutral";
}

function fieldHalf(value: unknown): FieldHalf | null {
  return value === "team_zero_side" || value === "team_one_side" || value === "neutral"
    ? value
    : null;
}

function fieldHalfState(half: FieldHalf | null): PossessionState | null {
  if (half === "team_zero_side") return "team_zero";
  if (half === "team_one_side") return "team_one";
  if (half === "neutral") return "neutral";
  return null;
}

function zoneTotal(subjects: PossessionZoneSubject[], zone: PossessionZone): number {
  return subjects.reduce((total, subject) => total + subject.zoneSeconds[zone], 0);
}

function possessionZoneTitle(zone: PossessionZone): string {
  if (zone === "offensive") return "Offensive possession";
  if (zone === "defensive") return "Defensive possession";
  return "Neutral possession";
}

function compareZoneSubjects(left: PossessionZoneSubject, right: PossessionZoneSubject): number {
  if (left.team !== right.team) return (left.team ?? 99) - (right.team ?? 99);
  return left.name.localeCompare(right.name);
}

function possessionStateSegment(
  state: PossessionState,
  seconds: number,
  totalSeconds: number,
): SegmentedBarSegment {
  const percent = percentage(seconds, totalSeconds);
  return {
    key: state,
    className: `possession-state-${state}`,
    label: possessionStateLabel(state),
    value: seconds,
    visibleLabel:
      percent >= 8
        ? statPercentWithValue(formatPercent(percent), formatSeconds(seconds))
        : undefined,
    title: statPercentWithValue(
      formatPercent(percent),
      formatSeconds(seconds),
      possessionStateLabel(state),
    ),
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

function teamFromBoolean(value: boolean | null): number | null {
  if (value == null) return null;
  return value ? 0 : 1;
}

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function playerIdPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  if (typeof value === "string" && value.length > 0) return value;
  if (value == null || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length !== 1) return null;
  const [[platform, id]] = entries;
  if (typeof id !== "string" && typeof id !== "number") return null;
  return `${platform.toLowerCase()}:${id}`;
}

function possessionState(value: unknown): PossessionState | null {
  return value === "team_zero" || value === "team_one" || value === "neutral" ? value : null;
}

function fieldThird(value: unknown): FieldThird | null {
  return value === "team_zero_third" || value === "team_one_third" || value === "neutral_third"
    ? value
    : null;
}

function possessionStateLabel(state: PossessionState): string {
  if (state === "team_zero") return "Blue";
  if (state === "team_one") return "Orange";
  return "Neutral";
}

function playerKey(player: ReplayPlayer, index: number): string {
  return `${player.platform ?? "unknown"}:${player.platform_player_id ?? player.name ?? index}`;
}

function playerProfilePath(player: {
  platform: string | null;
  platformPlayerId: string | null;
}): string | null {
  if (!player.platform || !player.platformPlayerId) return null;
  return `/players/${encodeURIComponent(player.platform)}/${encodeURIComponent(player.platformPlayerId)}/stats/possession`;
}

function possessionSummaryLabel(summary: PlayerPossessionSummary) {
  return comparisonSubjectLabel(summary, "possession");
}

function possessionZoneSubjectLabel(subject: PossessionZoneSubject) {
  return comparisonSubjectLabel(subject, "possession", {
    showPlatformBadge: subject.showPlatformBadge,
    teamSubtitle: subject.showPlatformBadge ? teamLabel(subject.team) : "Team",
  });
}

function playerMatchesId(player: ReplayPlayer, playerId: string): boolean {
  return (
    player.platform_player_id === playerId ||
    playerKey(player, -1) === playerId ||
    player.name === playerId
  );
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

function formatCount(value: number): string {
  return Math.round(value).toLocaleString();
}

function formatClock(value: number): string {
  const clampedValue = Math.max(0, Math.round(value));
  const minutes = Math.floor(clampedValue / 60);
  const seconds = clampedValue % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
