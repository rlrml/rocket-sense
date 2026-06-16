import { useMemo, useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import {
  SegmentedBar,
  StatPlayerLabel,
  statPercentWithValue,
  statPlayerRank,
  type SegmentedBarSegment,
  type StatPlayerRank,
} from "./shared";

export const possessionEventTypes = ["possession", "ball_half"];

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
  third: FieldThird | null;
  playerId: string | null;
  playerName: string | null;
}

const possessionStates: PossessionState[] = ["team_zero", "neutral", "team_one"];
const possessionZones: PossessionZone[] = ["offensive", "neutral", "defensive"];

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
  const ballHalfTotals = useMemo(() => ballHalfTotalsFromEvents(events), [events]);
  const chartDuration = Math.max(1, durationSeconds ?? 0, 60, ...spans.map((span) => span.end));
  const possessionTotals = possessionStateTotals(spans);
  const ballThirdsTotals = ballThirdsStateTotals(spans);
  const totalTrackedSeconds = sumObjectValues(possessionTotals);
  const ballThirdsTrackedSeconds = sumObjectValues(ballThirdsTotals);
  const ballHalfTrackedSeconds = sumObjectValues(ballHalfTotals);
  const [comparisonMode, setComparisonMode] = useState<PossessionComparisonMode>("players");
  const [groupView, setGroupView] = useState<GroupPossessionView>("leaderboard");
  const playerSummaries = playerPossessionSummaries(players, spans);
  const zoneSubjects = possessionZoneSubjects(players, spans, comparisonMode);
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
              totalSeconds={totalTrackedSeconds}
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
      <div className="stat-section-grid">
        <section className="chart-panel">
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

        <section className="chart-panel">
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

        {possessionZones.map((zone) => (
          <section className="chart-panel" key={zone}>
            <header className="chart-panel-header">
              <h3>{possessionZoneTitle(zone)}</h3>
              <span>{formatSeconds(zoneTotal(zoneSubjects, zone))} tracked</span>
            </header>
            <PossessionZoneChart
              comparisonMode={comparisonMode}
              subjects={zoneSubjects}
              zone={zone}
            />
          </section>
        ))}

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
  const maxSeconds = Math.max(1, ...summaries.map((summary) => summary.seconds));

  if (!summaries.some((summary) => summary.seconds > 0)) {
    return (
      <div className="stat-empty">No player possession spans are available for this replay.</div>
    );
  }

  return (
    <div className="possession-player-bars">
      {summaries.map((summary) => {
        const percent = percentage(summary.seconds, totalSeconds);
        return (
          <div className="possession-player-row" key={summary.key}>
            <StatPlayerLabel
              className={`team-accent-${teamClass(summary.team)}`}
              name={summary.name}
              platform={summary.platform}
              profilePath={playerProfilePath(summary)}
              rank={summary.rank}
              subtitle={teamLabel(summary.team)}
            />
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
                  visibleLabel: statPercentWithValue(
                    formatPercent(percent),
                    formatSeconds(summary.seconds),
                  ),
                  title: statPercentWithValue(
                    formatPercent(percent),
                    formatSeconds(summary.seconds),
                    summary.name,
                  ),
                },
              ]}
              total={summary.seconds}
            />
          </div>
        );
      })}
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
    third: fieldThird(event.payload.field_third),
    playerId: event.player_id ?? stringPayload(event.payload, "player_id"),
    playerName: event.player_name ?? null,
  };
}

function possessionStateTotals(spans: PossessionSpan[]): Record<PossessionState, number> {
  const totals = emptyStateTotals();
  for (const span of spans) {
    totals[span.state] += span.duration;
  }
  return totals;
}

function ballThirdsStateTotals(spans: PossessionSpan[]): Record<PossessionState, number> {
  const totals = emptyStateTotals();
  for (const span of spans) {
    const state = ballThirdsState(span.third);
    if (state) totals[state] += span.duration;
  }
  return totals;
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

function playerPossessionSummaries(
  players: ReplayPlayer[],
  spans: PossessionSpan[],
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
  spans: PossessionSpan[],
  comparisonMode: PossessionComparisonMode,
): PossessionZoneSubject[] {
  return comparisonMode === "players"
    ? playerPossessionZoneSubjects(players, spans)
    : teamPossessionZoneSubjects(spans);
}

function playerPossessionZoneSubjects(
  players: ReplayPlayer[],
  spans: PossessionSpan[],
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
    if (span.playerId == null || span.third == null) continue;
    const playerId = span.playerId;
    const subject = subjects.find((_, index) => playerMatchesId(players[index], playerId));
    if (!subject) continue;
    const zone = possessionZoneForTeam(span.third, subject.team);
    if (zone) subject.zoneSeconds[zone] += span.duration;
  }

  return subjects;
}

function teamPossessionZoneSubjects(spans: PossessionSpan[]): PossessionZoneSubject[] {
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
    if (span.third == null) continue;
    const team = possessionStateTeam(span.state);
    if (team == null) continue;
    const subject = subjects[team];
    const zone = possessionZoneForTeam(span.third, team);
    if (zone) subject.zoneSeconds[zone] += span.duration;
  }

  return subjects;
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

function ballThirdsState(third: FieldThird | null): PossessionState | null {
  if (third === "team_zero_third") return "team_zero";
  if (third === "team_one_third") return "team_one";
  if (third === "neutral_third") return "neutral";
  return null;
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

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
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

function formatClock(value: number): string {
  const clampedValue = Math.max(0, Math.round(value));
  const minutes = Math.floor(clampedValue / 60);
  const seconds = clampedValue % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
