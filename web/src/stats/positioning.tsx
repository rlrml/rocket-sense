import type { ReactNode } from "react";
import type {
  MechanicEventResponse,
  PositioningCohortSummary,
  PositioningSummaryResponse,
  ReplayPlayer,
} from "../types";
import {
  type ComparisonRow,
  ComparisonRows,
  type OutcomeDistributionLevel,
  type OutcomeDistributionTone,
  outcomeDistributionColorStyle,
  outcomeSegmentClassName,
  PlayerSegmentedBarRows,
  type SegmentedBarSegment,
  StatPlayerLabel,
  statPlayerRank,
  type StatPlayerRank,
  TEAM_OUTCOME_COLORS,
  teamOutcomeTone,
} from "./shared";

export const positioningEventTypes = [
  // PlayerStateSpan facet streams (current analysis runs).
  "player_activity",
  "field_third",
  "field_half",
  "ball_depth_behind_ball",
  "ball_depth_level_with_ball",
  "ball_depth_ahead_of_ball",
  "depth_role",
  "ball_proximity",
  // Retired streams kept so replays processed before the PlayerStateSpan
  // unification still render until they are reprocessed.
  "positioning_activity",
  "positioning_distance",
  "positioning_field_zone",
  "positioning_ball_relative_depth",
  "positioning_teammate_role",
  "positioning_ball_proximity",
  "positioning_goal_context",
];

type PositioningRole = "no_teammates" | "most_back" | "mid" | "most_forward" | "other" | "unknown";

interface PlayerPositioningSummary {
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  rank: StatPlayerRank | null;
  team: number | null;
  activeSeconds: number;
  trackedSeconds: number;
  defensiveThirdSeconds: number;
  neutralThirdSeconds: number;
  offensiveThirdSeconds: number;
  defensiveHalfSeconds: number;
  offensiveHalfSeconds: number;
  behindBallSeconds: number;
  levelWithBallSeconds: number;
  inFrontOfBallSeconds: number;
  roleSeconds: Record<PositioningRole, number>;
  closestTeamSeconds: number;
  closestAbsoluteSeconds: number;
  farthestSeconds: number;
  distanceToBallWeighted: number;
  distanceToBallWeight: number;
  distanceToTeammatesWeighted: number;
  distanceToTeammatesWeight: number;
  caughtAheadGoals: number;
}

const roleOrder: PositioningRole[] = ["most_back", "mid", "most_forward", "other", "no_teammates"];

export function PositioningDetail({
  events,
  players,
  scope,
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
  scope?: "replay" | "group";
}) {
  // Single game and replay group both fold raw span events into one row per
  // player; the group variant just spans every replay (summaries dedupe by
  // player key). Both render through the shared view below.
  const summaries = playerPositioningSummaries(players, events);
  return (
    <PositioningSummariesView
      summaries={summaries}
      emptyContext={scope === "group" ? "this group" : "this replay"}
    />
  );
}

// Renders the positioning chart sections off an array of per-row summaries.
// Every surface (single game, replay group, player-profile cohorts) builds the
// summaries differently but renders them here so the graphs stay identical.
// `emptyContext` fills the "...available for {context}." copy, `label` renders
// each row's identity, and `preserveOrder` keeps the caller's row order instead
// of letting each chart re-sort by its own metric.
export function PositioningSummariesView({
  summaries,
  emptyContext = "this replay",
  label = positioningPlayerLabel,
  preserveOrder = false,
}: {
  summaries: PlayerPositioningSummary[];
  emptyContext?: string;
  label?: (summary: PlayerPositioningSummary) => ReactNode;
  preserveOrder?: boolean;
}) {
  // Distance-to-ball and distance-to-teammates share one scale so the two
  // charts stay directly comparable.
  const maxDistance = Math.max(
    1,
    ...summaries.flatMap((summary) => [
      weightedAverage(summary.distanceToBallWeighted, summary.distanceToBallWeight) ?? 0,
      weightedAverage(summary.distanceToTeammatesWeighted, summary.distanceToTeammatesWeight) ?? 0,
    ]),
  );
  const maxCaughtAhead = Math.max(1, ...summaries.map((summary) => summary.caughtAheadGoals));
  const showCaughtAhead = summaries.some((summary) => summary.caughtAheadGoals > 0);

  return (
    <div className="positioning-detail">
      <div className="stat-section-grid">
        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Field position</h3>
            <span>Defensive, neutral, offensive thirds</span>
          </header>
          <PositioningBarRows
            summaries={summaries}
            label={label}
            preserveOrder={preserveOrder}
            emptyLabel={`No field-zone positioning spans are available for ${emptyContext}.`}
            segments={(summary) => {
              const tone = teamOutcomeTone(summary.team);
              return [
                positioningSegment(
                  "defensive",
                  "Defensive",
                  summary.defensiveThirdSeconds,
                  summary.trackedSeconds,
                  tone,
                  SEGMENT_LEVELS[0],
                ),
                positioningSegment(
                  "neutral",
                  "Neutral",
                  summary.neutralThirdSeconds,
                  summary.trackedSeconds,
                  tone,
                  SEGMENT_LEVELS[1],
                ),
                positioningSegment(
                  "offensive",
                  "Offensive",
                  summary.offensiveThirdSeconds,
                  summary.trackedSeconds,
                  tone,
                  SEGMENT_LEVELS[2],
                ),
              ];
            }}
            sortValue={(summary) => share(summary.offensiveThirdSeconds, summary.trackedSeconds)}
            total={(summary) => summary.trackedSeconds}
          />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Ball depth</h3>
            <span>Behind, level, and ahead of the ball</span>
          </header>
          <PositioningBarRows
            summaries={summaries}
            label={label}
            preserveOrder={preserveOrder}
            emptyLabel={`No ball-depth positioning spans are available for ${emptyContext}.`}
            segments={(summary) => {
              const tone = teamOutcomeTone(summary.team);
              return [
                positioningSegment(
                  "behind",
                  "Behind ball",
                  summary.behindBallSeconds,
                  summary.trackedSeconds,
                  tone,
                  SEGMENT_LEVELS[0],
                ),
                positioningSegment(
                  "level",
                  "Level",
                  summary.levelWithBallSeconds,
                  summary.trackedSeconds,
                  tone,
                  SEGMENT_LEVELS[1],
                ),
                positioningSegment(
                  "ahead",
                  "Ahead",
                  summary.inFrontOfBallSeconds,
                  summary.trackedSeconds,
                  tone,
                  SEGMENT_LEVELS[2],
                ),
              ];
            }}
            sortValue={(summary) => share(summary.inFrontOfBallSeconds, summary.trackedSeconds)}
            total={(summary) => summary.trackedSeconds}
          />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Teammate role</h3>
            <span>Most back, mid, most forward</span>
          </header>
          <PositioningBarRows
            summaries={summaries}
            label={label}
            preserveOrder={preserveOrder}
            emptyLabel={`No teammate-role spans are available for ${emptyContext}.`}
            segments={(summary) => {
              const tone = teamOutcomeTone(summary.team);
              return roleOrder.map((role) => {
                const shade = roleShade[role];
                return positioningSegment(
                  `role-${role}`,
                  roleLabel(role),
                  summary.roleSeconds[role],
                  roleTotal(summary),
                  shade.neutral ? "neutral" : tone,
                  shade.level,
                );
              });
            }}
            sortValue={(summary) => share(summary.roleSeconds.most_forward, roleTotal(summary))}
            total={roleTotal}
          />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Ball priority</h3>
            <span>Closest, other, and farthest from the ball</span>
          </header>
          <PositioningBarRows
            summaries={summaries}
            label={label}
            preserveOrder={preserveOrder}
            emptyLabel={`No ball-priority spans are available for ${emptyContext}.`}
            segments={(summary) => {
              const tone = teamOutcomeTone(summary.team);
              return [
                positioningSegment(
                  "closest",
                  "Closest",
                  summary.closestTeamSeconds,
                  ballPriorityTotal(summary),
                  tone,
                  SEGMENT_LEVELS[0],
                ),
                positioningSegment(
                  "other",
                  "Other",
                  otherBallPrioritySeconds(summary),
                  ballPriorityTotal(summary),
                  tone,
                  SEGMENT_LEVELS[1],
                ),
                positioningSegment(
                  "farthest",
                  "Farthest",
                  summary.farthestSeconds,
                  ballPriorityTotal(summary),
                  tone,
                  SEGMENT_LEVELS[2],
                ),
              ];
            }}
            sortValue={(summary) => share(summary.closestTeamSeconds, ballPriorityTotal(summary))}
            total={ballPriorityTotal}
          />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Distance to ball</h3>
            <span>Average distance from the ball</span>
          </header>
          <PositioningDistanceChart
            summaries={summaries}
            value={(summary) =>
              weightedAverage(summary.distanceToBallWeighted, summary.distanceToBallWeight)
            }
            max={maxDistance}
            format={formatDistance}
            emptyLabel={`No ball-distance rows are available for ${emptyContext}.`}
            label={label}
            preserveOrder={preserveOrder}
          />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Distance to teammates</h3>
            <span>Average spacing from teammates</span>
          </header>
          <PositioningDistanceChart
            summaries={summaries}
            value={(summary) =>
              weightedAverage(
                summary.distanceToTeammatesWeighted,
                summary.distanceToTeammatesWeight,
              )
            }
            max={maxDistance}
            format={formatDistance}
            emptyLabel={`No teammate-distance rows are available for ${emptyContext}.`}
            label={label}
            preserveOrder={preserveOrder}
          />
        </section>

        {showCaughtAhead ? (
          <section className="chart-panel full-span">
            <header className="chart-panel-header">
              <h3>Caught ahead of play</h3>
              <span>Conceded goals while caught ahead of the ball</span>
            </header>
            <PositioningDistanceChart
              summaries={summaries}
              value={(summary) => summary.caughtAheadGoals}
              max={maxCaughtAhead}
              format={(value) => (value ?? 0).toLocaleString()}
              emptyLabel={`No caught-ahead goals were recorded for ${emptyContext}.`}
              label={label}
              preserveOrder={preserveOrder}
            />
          </section>
        ) : null}
      </div>
    </div>
  );
}

function PositioningBarRows({
  summaries,
  segments,
  sortValue,
  total,
  emptyLabel,
  label,
  preserveOrder = false,
}: {
  summaries: PlayerPositioningSummary[];
  segments: (summary: PlayerPositioningSummary) => SegmentedBarSegment[];
  sortValue?: (summary: PlayerPositioningSummary) => number;
  total: (summary: PlayerPositioningSummary) => number;
  emptyLabel: string;
  label: (summary: PlayerPositioningSummary) => ReactNode;
  preserveOrder?: boolean;
}) {
  return (
    <PlayerSegmentedBarRows
      ariaLabel={(summary) => `${summary.name} positioning split`}
      className="positioning-bar-rows"
      emptyLabel={emptyLabel}
      items={summaries}
      label={label}
      segments={segments}
      sortItems={preserveOrder ? undefined : (items) => sortedSummaries(items, sortValue)}
      style={outcomeDistributionColorStyle(TEAM_OUTCOME_COLORS)}
      total={total}
      trackClassName="positioning-track"
    />
  );
}

// One magnitude metric per player (avg distance, caught-ahead count, ...),
// rendered with the shared comparison bar so it reads identically to the
// movement magnitude charts: a single team-tinted segment with the value
// floated on the bar. `max` is shared across related charts so their bars stay
// comparable.
function PositioningDistanceChart({
  summaries,
  value,
  max,
  format,
  emptyLabel,
  label,
  preserveOrder = false,
}: {
  summaries: PlayerPositioningSummary[];
  value: (summary: PlayerPositioningSummary) => number | null;
  max: number;
  format: (value: number | null) => string;
  emptyLabel: string;
  label: (summary: PlayerPositioningSummary) => ReactNode;
  preserveOrder?: boolean;
}) {
  const indexByKey = teamLocalIndexByKey(summaries);
  const ordered = preserveOrder
    ? summaries
    : sortedSummaries(summaries, (summary) => value(summary) ?? 0);
  const rows: ComparisonRow[] = ordered.map((summary) => {
    const metric = value(summary) ?? 0;
    const shade = Math.min(indexByKey.get(summary.key) ?? 0, 3);
    return {
      key: summary.key,
      label: label(summary),
      ariaLabel: `${summary.name}: ${format(metric)}`,
      segments: [
        {
          key: "value",
          className: `team-segment-${teamClass(summary.team)} player-shade-${shade}`,
          label: summary.name,
          value: metric,
        },
      ],
      total: metric,
      maxValue: max,
      valueInBar: metric > 0 ? format(metric) : undefined,
      placeholder: metric > 0 ? undefined : format(metric),
    };
  });

  if (!rows.some((row) => row.total > 0)) {
    return <div className="stat-empty">{emptyLabel}</div>;
  }

  return <ComparisonRows rows={rows} />;
}

// Per-team appearance order of the players, so teammates get distinct shades of
// their team color (mirrors the movement magnitude charts).
function teamLocalIndexByKey(summaries: PlayerPositioningSummary[]): Map<string, number> {
  const index = new Map<string, number>();
  const counts = new Map<number | null, number>();
  for (const summary of summaries) {
    const next = counts.get(summary.team) ?? 0;
    index.set(summary.key, next);
    counts.set(summary.team, next + 1);
  }
  return index;
}

// Player profile: compare the player's own positioning against the pooled
// teammate and opponent cohorts that shared their games. The cohorts come from
// a server-side aggregate (career-scale span data can't be re-summed in the
// browser) and map onto the same summary rows the per-game view renders. Self +
// teammates paint as one team color, opponents the other; row order is fixed.
export function PlayerPositioningCohorts({
  response,
  playerName,
}: {
  response: PositioningSummaryResponse;
  playerName: string;
}) {
  const summaries: PlayerPositioningSummary[] = [
    cohortSummary("cohort-self", playerName || "You", 0, response.player),
  ];
  if (response.teammates) {
    summaries.push(cohortSummary("cohort-teammates", "Teammates", 0, response.teammates));
  }
  if (response.opponents) {
    summaries.push(cohortSummary("cohort-opponents", "Opponents", 1, response.opponents));
  }

  return (
    <PositioningSummariesView
      summaries={summaries}
      emptyContext="the selected games"
      preserveOrder
      label={(summary) => cohortLabel(summary, cohortAppearances(summary.key, response))}
    />
  );
}

function cohortSummary(
  key: string,
  name: string,
  team: number,
  cohort: PositioningCohortSummary,
): PlayerPositioningSummary {
  return {
    key,
    name,
    platform: null,
    platformPlayerId: null,
    rank: null,
    team,
    activeSeconds: cohort.active_seconds,
    trackedSeconds: cohort.tracked_seconds,
    defensiveThirdSeconds: cohort.defensive_third_seconds,
    neutralThirdSeconds: cohort.neutral_third_seconds,
    offensiveThirdSeconds: cohort.offensive_third_seconds,
    defensiveHalfSeconds: cohort.defensive_half_seconds,
    offensiveHalfSeconds: cohort.offensive_half_seconds,
    behindBallSeconds: cohort.behind_ball_seconds,
    levelWithBallSeconds: cohort.level_with_ball_seconds,
    inFrontOfBallSeconds: cohort.ahead_of_ball_seconds,
    roleSeconds: {
      no_teammates: cohort.role_no_teammates_seconds,
      most_back: cohort.role_most_back_seconds,
      mid: cohort.role_mid_seconds,
      most_forward: cohort.role_most_forward_seconds,
      other: cohort.role_other_seconds,
      unknown: 0,
    },
    closestTeamSeconds: cohort.closest_team_seconds,
    closestAbsoluteSeconds: cohort.closest_absolute_seconds,
    farthestSeconds: cohort.farthest_seconds,
    distanceToBallWeighted: cohort.distance_to_ball_weighted,
    distanceToBallWeight: cohort.distance_to_ball_weight,
    distanceToTeammatesWeighted: cohort.distance_to_teammates_weighted,
    distanceToTeammatesWeight: cohort.distance_to_teammates_weight,
    caughtAheadGoals: 0,
  };
}

function cohortAppearances(key: string, response: PositioningSummaryResponse): number | null {
  if (key === "cohort-self") return response.player.appearance_count;
  if (key === "cohort-teammates") return response.teammates?.appearance_count ?? null;
  if (key === "cohort-opponents") return response.opponents?.appearance_count ?? null;
  return null;
}

function cohortLabel(summary: PlayerPositioningSummary, appearances: number | null): ReactNode {
  const suffix = summary.key === "cohort-self" ? "games" : "appearances";
  return (
    <StatPlayerLabel
      className={`team-accent-${teamClass(summary.team)}`}
      name={summary.name}
      platform={null}
      profilePath={null}
      rank={null}
      showPlatformBadge={false}
      subtitle={appearances != null ? `${appearances.toLocaleString()} ${suffix}` : ""}
    />
  );
}

function positioningPlayerLabel(summary: PlayerPositioningSummary) {
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

function playerPositioningSummaries(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): PlayerPositioningSummary[] {
  const summaries = players.map(emptySummary);
  const byKey = new Map(summaries.map((summary) => [summary.key, summary]));

  for (const event of events) {
    const summary = summaryForEvent(event, summaries, byKey);
    if (!summary) continue;
    const duration = eventDuration(event);

    if (event.event_type === "player_activity") {
      // Tracked and demolished spans both count as active, matching the
      // retired positioning_activity stream's semantics.
      summary.activeSeconds += duration;
      continue;
    }

    if (event.event_type === "field_third") {
      summary.trackedSeconds += duration;
      const state = stringPayload(event.payload, "state");
      if (state === "defensive") summary.defensiveThirdSeconds += duration;
      else if (state === "neutral") summary.neutralThirdSeconds += duration;
      else if (state === "offensive") summary.offensiveThirdSeconds += duration;
      continue;
    }

    if (event.event_type === "field_half") {
      const state = stringPayload(event.payload, "state");
      if (state === "defensive") summary.defensiveHalfSeconds += duration;
      else if (state === "offensive") summary.offensiveHalfSeconds += duration;
      continue;
    }

    if (event.event_type.startsWith("ball_depth_")) {
      const state = stringPayload(event.payload, "state");
      if (state === "behind_ball") summary.behindBallSeconds += duration;
      else if (state === "level_with_ball") summary.levelWithBallSeconds += duration;
      else if (state === "ahead_of_ball") summary.inFrontOfBallSeconds += duration;
      continue;
    }

    if (event.event_type === "depth_role") {
      summary.roleSeconds[rolePayload(event.payload, "state")] += duration;
      continue;
    }

    if (event.event_type === "ball_proximity") {
      const state = event.payload.state;
      if (state && typeof state === "object") {
        const flags = state as Record<string, unknown>;
        if (flags.closest_to_ball_team === true) summary.closestTeamSeconds += duration;
        if (flags.closest_to_ball_absolute === true) summary.closestAbsoluteSeconds += duration;
        if (flags.farthest_from_ball === true) summary.farthestSeconds += duration;
      }
      continue;
    }

    if (event.event_type === "positioning_activity") {
      if (booleanPayload(event.payload, "active")) summary.activeSeconds += duration;
      continue;
    }

    if (event.event_type === "positioning_field_zone") {
      summary.trackedSeconds += duration;
      summary.defensiveThirdSeconds +=
        duration * fractionPayload(event.payload, "defensive_zone_fraction");
      summary.neutralThirdSeconds +=
        duration * fractionPayload(event.payload, "neutral_zone_fraction");
      summary.offensiveThirdSeconds +=
        duration * fractionPayload(event.payload, "offensive_zone_fraction");
      summary.defensiveHalfSeconds +=
        duration * fractionPayload(event.payload, "defensive_half_fraction");
      summary.offensiveHalfSeconds +=
        duration * fractionPayload(event.payload, "offensive_half_fraction");
      continue;
    }

    if (event.event_type === "positioning_ball_relative_depth") {
      summary.behindBallSeconds +=
        duration * fractionPayload(event.payload, "behind_ball_fraction");
      summary.levelWithBallSeconds +=
        duration * fractionPayload(event.payload, "level_with_ball_fraction");
      summary.inFrontOfBallSeconds +=
        duration * fractionPayload(event.payload, "in_front_of_ball_fraction");
      continue;
    }

    if (event.event_type === "positioning_teammate_role") {
      summary.roleSeconds[rolePayload(event.payload, "teammate_role")] += duration;
      continue;
    }

    if (event.event_type === "positioning_ball_proximity") {
      if (booleanPayload(event.payload, "closest_to_ball_team"))
        summary.closestTeamSeconds += duration;
      if (booleanPayload(event.payload, "closest_to_ball_absolute"))
        summary.closestAbsoluteSeconds += duration;
      if (booleanPayload(event.payload, "farthest_from_ball")) summary.farthestSeconds += duration;
      continue;
    }

    if (event.event_type === "positioning_distance") {
      addWeightedPayload(event.payload, "distance_to_ball", duration, (value) => {
        summary.distanceToBallWeighted += value;
        summary.distanceToBallWeight += duration;
      });
      addWeightedPayload(event.payload, "distance_to_teammates", duration, (value) => {
        summary.distanceToTeammatesWeighted += value;
        summary.distanceToTeammatesWeight += duration;
      });
      continue;
    }

    if (
      event.event_type === "positioning_goal_context" &&
      booleanPayload(event.payload, "caught_ahead_of_play_on_conceded_goal")
    ) {
      summary.caughtAheadGoals += 1;
    }
  }

  return summaries.sort(compareSummaries);
}

function emptySummary(player: ReplayPlayer, index: number): PlayerPositioningSummary {
  return {
    key: playerKey(player, index),
    name: player.name || player.platform_player_id || "Unknown",
    platform: player.platform,
    platformPlayerId: player.platform_player_id,
    rank: statPlayerRank(player),
    team: player.team,
    activeSeconds: player.active_time_seconds ?? 0,
    trackedSeconds: 0,
    defensiveThirdSeconds: 0,
    neutralThirdSeconds: 0,
    offensiveThirdSeconds: 0,
    defensiveHalfSeconds: 0,
    offensiveHalfSeconds: 0,
    behindBallSeconds: 0,
    levelWithBallSeconds: 0,
    inFrontOfBallSeconds: 0,
    roleSeconds: {
      no_teammates: 0,
      most_back: player.time_most_back_seconds ?? 0,
      mid: 0,
      most_forward: player.time_most_forward_seconds ?? 0,
      other: 0,
      unknown: 0,
    },
    closestTeamSeconds: 0,
    closestAbsoluteSeconds: 0,
    farthestSeconds: 0,
    distanceToBallWeighted: 0,
    distanceToBallWeight: 0,
    distanceToTeammatesWeighted: 0,
    distanceToTeammatesWeight: 0,
    caughtAheadGoals: 0,
  };
}

function summaryForEvent(
  event: MechanicEventResponse,
  summaries: PlayerPositioningSummary[],
  byKey: Map<string, PlayerPositioningSummary>,
): PlayerPositioningSummary | null {
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

function positioningSegment(
  id: string,
  label: string,
  seconds: number,
  total: number,
  tone: OutcomeDistributionTone,
  level: OutcomeDistributionLevel,
): SegmentedBarSegment {
  const percent = percentage(seconds, total);
  const duration = formatDurationCompact(seconds);
  return {
    key: id,
    // Tint each player's split in their team color, telling the categories apart
    // by shade (light -> dark) the same way the movement bands do.
    className: outcomeSegmentClassName(tone, level),
    label,
    value: seconds,
    // Show both the share and the raw time on the bar; the category name stays
    // in the tooltip so the in-bar label keeps fitting at narrow widths.
    visibleLabel: percent >= 10 ? `${formatPercent(seconds, total)} · ${duration}` : undefined,
    title: `${label}: ${duration} (${formatPercent(seconds, total)})`,
  };
}

// Ordered shade ramp for a player's split: categories go light -> dark in the
// order they render (e.g. defensive -> neutral -> offensive). "Other"/no-role
// buckets fall back to the neutral (grey) tone regardless of team.
const SEGMENT_LEVELS: OutcomeDistributionLevel[] = ["unknown", "clear", "strong"];

const roleShade: Record<PositioningRole, { neutral?: boolean; level: OutcomeDistributionLevel }> = {
  most_back: { level: "unknown" },
  mid: { level: "clear" },
  most_forward: { level: "strong" },
  other: { neutral: true, level: "clear" },
  no_teammates: { neutral: true, level: "clear" },
  unknown: { neutral: true, level: "clear" },
};

function eventDuration(event: MechanicEventResponse): number {
  const duration = numberPayload(event.payload, "duration");
  if (duration != null) return duration;
  if (event.start_time != null && event.end_time != null)
    return Math.max(0, event.end_time - event.start_time);
  return 0;
}

function roleTotal(summary: PlayerPositioningSummary): number {
  return roleOrder.reduce((total, role) => total + summary.roleSeconds[role], 0);
}

function otherBallPrioritySeconds(summary: PlayerPositioningSummary): number {
  return Math.max(0, summary.trackedSeconds - summary.closestTeamSeconds - summary.farthestSeconds);
}

function ballPriorityTotal(summary: PlayerPositioningSummary): number {
  return summary.closestTeamSeconds + otherBallPrioritySeconds(summary) + summary.farthestSeconds;
}

function addWeightedPayload(
  payload: Record<string, unknown>,
  key: string,
  duration: number,
  add: (weightedValue: number) => void,
) {
  const value = numberPayload(payload, key);
  if (value == null || duration <= 0) return;
  add(value * duration);
}

function weightedAverage(weightedValue: number, weight: number): number | null {
  return weight > 0 ? weightedValue / weight : null;
}

function sortedSummaries(
  summaries: PlayerPositioningSummary[],
  sortValue: ((summary: PlayerPositioningSummary) => number) | undefined,
): PlayerPositioningSummary[] {
  if (!sortValue) return summaries;
  return summaries.slice().sort((left, right) => {
    const valueDiff = sortValue(right) - sortValue(left);
    return valueDiff || compareSummaries(left, right);
  });
}

function compareSummaries(left: PlayerPositioningSummary, right: PlayerPositioningSummary): number {
  if (left.team !== right.team) return (left.team ?? 9) - (right.team ?? 9);
  return right.trackedSeconds - left.trackedSeconds || left.name.localeCompare(right.name);
}

function playerKey(player: ReplayPlayer, index: number): string {
  if (player.platform && player.platform_player_id)
    return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
  return `name:${player.name || index}`;
}

function playerProfilePath(summary: PlayerPositioningSummary): string | null {
  if (!summary.platform || !summary.platformPlayerId) return null;
  return `/players/${encodeURIComponent(summary.platform)}/${encodeURIComponent(summary.platformPlayerId)}/stats/positioning`;
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

function numberPayload(payload: Record<string, unknown>, key: string): number | null {
  const value = payload[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function fractionPayload(payload: Record<string, unknown>, key: string): number {
  return Math.max(0, Math.min(1, numberPayload(payload, key) ?? 0));
}

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" ? value : null;
}

function booleanPayload(payload: Record<string, unknown>, key: string): boolean {
  return payload[key] === true;
}

function rolePayload(payload: Record<string, unknown>, key: string): PositioningRole {
  const value = payload[key];
  return value === "no_teammates" ||
    value === "most_back" ||
    value === "mid" ||
    value === "most_forward" ||
    value === "other" ||
    value === "unknown"
    ? value
    : "unknown";
}

function roleLabel(role: PositioningRole): string {
  switch (role) {
    case "no_teammates":
      return "No teammates";
    case "most_back":
      return "Most back";
    case "mid":
      return "Mid";
    case "most_forward":
      return "Most forward";
    case "other":
      return "Other";
    case "unknown":
      return "Unknown";
  }
}

function percentage(value: number, total: number): number {
  return total > 0 ? (value / total) * 100 : 0;
}

function share(value: number, total: number): number {
  return total > 0 ? value / total : 0;
}

// Compact, scale-aware duration for positioning labels: spans range from a few
// seconds in one game to many hours once pooled across a career, so step from
// "45s" through "12m 30s" up to "3h 12m" instead of showing raw seconds.
function formatDurationCompact(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0s";
  const total = Math.round(value);
  if (total < 60) return value < 10 ? `${value.toFixed(1)}s` : `${total}s`;
  const minutes = Math.floor(total / 60);
  if (minutes < 60) {
    const seconds = total % 60;
    return seconds ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  return remMinutes ? `${hours}h ${remMinutes}m` : `${hours}h`;
}

function formatPercent(value: number, total: number): string {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

function formatDistance(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  return `${Math.round(value).toLocaleString()} uu`;
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
