import type { ReactNode } from "react";
import type {
  MechanicEventResponse,
  PositioningCohortSummary,
  PositioningRoleDeltaHistogram,
  PositioningSummaryResponse,
  RankBenchmarkCohort,
  ReplayPlayer,
  ReplayPlayerPositioningSummary,
} from "../types";
import {
  careerCohortClassName,
  careerCohortSegmentClassName,
  careerCohortSubtitle,
  type CareerCohortKey,
  type ComparisonRow,
  ComparisonRows,
  type OutcomeDistributionColors,
  type OutcomeDistributionLevel,
  type OutcomeDistributionTone,
  outcomeDistributionColorStyle,
  outcomeSegmentClassName,
  PLAYER_RELATIVE_OUTCOME_COLORS,
  PlayerSegmentedBarRows,
  rankAverageShadeClass,
  rankCohortLabel,
  type SegmentedBarSegment,
  StatPlayerLabel,
  statPercentWithValue,
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
  "ball_depth",
  // Legacy split keys kept so already-indexed rows render until migrated.
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
  careerCohort?: CareerCohortKey | null;
  // Set on synthesized rank-average rows so the label shows the rank icon and the
  // distance bar uses the per-rank slate shade.
  rankCohort?: RankBenchmarkCohort | null;
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
  positioningSummaries,
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
  scope?: "replay" | "group";
  positioningSummaries?: ReplayPlayerPositioningSummary[];
}) {
  // Single game and replay group both fold raw span events into one row per
  // player; the group variant just spans every replay (summaries dedupe by
  // player key). Both render through the shared view below.
  const summaries = applyReplayPositioningSummaries(
    playerPositioningSummaries(players, events),
    positioningSummaries,
  );
  // A player can appear on either team across a group's replays, so their
  // aggregated `team` is null and team-relative colouring would collapse every
  // bar to grey. Render the group in cohort mode (the team-independent fixed
  // teal -> grey -> purple palette) so the directional gradients stay readable.
  const cohort = scope === "group";
  return (
    <PositioningSummariesView
      summaries={summaries}
      cohort={cohort}
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
  cohort = false,
  rankSummaries = [],
  roleDeltaHistogram = null,
}: {
  summaries: PlayerPositioningSummary[];
  emptyContext?: string;
  label?: (summary: PlayerPositioningSummary) => ReactNode;
  preserveOrder?: boolean;
  // Synthesized rank-average rows, appended only to the charts the benchmark
  // covers (thirds, ball-relative depth, teammate role, distance to ball).
  rankSummaries?: PlayerPositioningSummary[];
  // Career/player view: cohort rows already separate self/teammates (one team)
  // from opponents (the other) by row, so we paint the bars with a non-team
  // palette (teal -> grey -> purple) and key the directional zones to a fixed
  // defensive/neutral/offensive ramp instead of each player's team colour.
  cohort?: boolean;
  roleDeltaHistogram?: PositioningRoleDeltaHistogram | null;
}) {
  const colors: OutcomeDistributionColors = cohort
    ? PLAYER_RELATIVE_OUTCOME_COLORS
    : TEAM_OUTCOME_COLORS;
  // Per game the directional charts run own-team colour -> grey -> opponent
  // colour; on the career page they use the fixed positive/neutral/negative
  // ramp so the zone legend's swatches stay meaningful across every cohort row.
  const zoneMode: ZoneToneMode = cohort ? "fixed" : "team";
  // Magnitude (distance) charts only adopt the outcome palette in the cohort
  // view; per game they keep the team-segment classes that shade teammates.
  const distanceColors = cohort ? colors : undefined;
  // The benchmark-backed charts also show one row per selected rank.
  const withRanks = rankSummaries.length ? [...summaries, ...rankSummaries] : summaries;
  // Distance-to-ball and distance-to-teammates share one scale so the two
  // charts stay directly comparable (fold in rank distance-to-ball too).
  const maxDistance = Math.max(
    1,
    ...withRanks.flatMap((summary) => [
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
            <h3>Teammate role</h3>
            <span>Most back, mid, most forward</span>
          </header>
          <p className="chart-panel-note">
            Share of time at each depth relative to teammates, from <strong>most back</strong>{" "}
            (rotated furthest back) through <strong>mid</strong> to <strong>most forward</strong>.{" "}
            <strong>Mid</strong>, <strong>other</strong> (unranked), and <strong>solo</strong>{" "}
            (alone on the team) are grey.
          </p>
          <ZoneLegend
            cohort={cohort}
            colors={colors}
            colorKey
            caption={cohort ? undefined : DIRECTIONAL_COLOUR_CAPTION}
            items={[
              {
                key: "most_back",
                abbr: "B",
                label: "Most back",
                tone: "positive",
                note: "furthest back",
              },
              {
                key: "mid",
                abbr: "M",
                label: "Mid",
                tone: "neutral",
                note: "middle of the rotation",
              },
              {
                key: "most_forward",
                abbr: "F",
                label: "Most forward",
                tone: "negative",
                note: "furthest up",
              },
              { key: "other", abbr: "O", label: "Other", tone: "neutral", note: "unranked moment" },
              { key: "solo", abbr: "S", label: "Solo", tone: "neutral", note: "alone on the team" },
            ]}
          />
          <PositioningBarRows
            colors={colors}
            summaries={withRanks}
            label={label}
            preserveOrder={preserveOrder}
            emptyLabel={`No teammate-role spans are available for ${emptyContext}.`}
            segments={(summary) => {
              const [own, neutral, opposite] = directionalTones(summary.team, zoneMode);
              // Diverging scheme: the two rotation ends carry colour, everything
              // without a clear front/back rank (mid, other, solo, unknown) is grey.
              const roleTone: Record<PositioningRole, OutcomeDistributionTone> = {
                most_back: own,
                mid: neutral,
                most_forward: opposite,
                other: neutral,
                no_teammates: neutral,
                unknown: neutral,
              };
              return roleOrder.map((role) =>
                positioningSegment(
                  `role-${role}`,
                  roleLabel(role),
                  roleAbbr(role),
                  summary.roleSeconds[role],
                  roleTotal(summary),
                  roleTone[role],
                ),
              );
            }}
            sortValue={(summary) => share(summary.roleSeconds.most_forward, roleTotal(summary))}
            total={roleTotal}
          />
        </section>

        {roleDeltaHistogram && roleDeltaHistogram.sample_count > 0 ? (
          <section className="chart-panel full-span">
            <header className="chart-panel-header">
              <h3>2v2 teammate role delta</h3>
              <span>Per-game most-forward share gap against teammate</span>
            </header>
            <p className="chart-panel-note">
              Each sample is one 2v2 game: this player&apos;s{" "}
              <strong>most forward share minus their teammate&apos;s most forward share</strong>.
              Negative buckets mean the player was more often the deeper teammate; positive buckets
              mean they were more often furthest forward.
            </p>
            <RoleDeltaHistogramChart histogram={roleDeltaHistogram} />
          </section>
        ) : null}

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Field position</h3>
            <span>Defensive, neutral, offensive thirds</span>
          </header>
          <p className="chart-panel-note">
            Share of tracked time spent in each third of the pitch. <strong>Defensive</strong> is
            your own third (nearest your goal), <strong>neutral</strong> is midfield, and{" "}
            <strong>offensive</strong> is the attacking third nearest the opponent goal.
          </p>
          <ZoneLegend
            cohort={cohort}
            colors={colors}
            colorKey
            caption={cohort ? undefined : DIRECTIONAL_COLOUR_CAPTION}
            items={[
              {
                key: "defensive",
                abbr: "D",
                label: "Defensive",
                tone: "positive",
                note: "own third",
              },
              { key: "neutral", abbr: "N", label: "Neutral", tone: "neutral", note: "midfield" },
              {
                key: "offensive",
                abbr: "O",
                label: "Offensive",
                tone: "negative",
                note: "attacking third",
              },
            ]}
          />
          <PositioningBarRows
            colors={colors}
            summaries={withRanks}
            label={label}
            preserveOrder={preserveOrder}
            emptyLabel={`No field-zone positioning spans are available for ${emptyContext}.`}
            segments={(summary) => {
              const [defensive, neutral, offensive] = directionalTones(summary.team, zoneMode);
              return [
                positioningSegment(
                  "defensive",
                  "Defensive",
                  "D",
                  summary.defensiveThirdSeconds,
                  summary.trackedSeconds,
                  defensive,
                ),
                positioningSegment(
                  "neutral",
                  "Neutral",
                  "N",
                  summary.neutralThirdSeconds,
                  summary.trackedSeconds,
                  neutral,
                ),
                positioningSegment(
                  "offensive",
                  "Offensive",
                  "O",
                  summary.offensiveThirdSeconds,
                  summary.trackedSeconds,
                  offensive,
                ),
              ];
            }}
            sortValue={(summary) => share(summary.offensiveThirdSeconds, summary.trackedSeconds)}
            total={(summary) => summary.trackedSeconds}
          />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Ball relative position</h3>
            <span>Behind, level, and ahead of the ball</span>
          </header>
          <p className="chart-panel-note">
            Share of tracked time relative to the ball. <strong>Behind</strong> is goal-side of the
            ball (defensively safe), <strong>level</strong> is even with it, and{" "}
            <strong>ahead</strong> is between the ball and the opponent goal.
          </p>
          <ZoneLegend
            cohort={cohort}
            colors={colors}
            colorKey
            caption={cohort ? undefined : DIRECTIONAL_COLOUR_CAPTION}
            items={[
              {
                key: "behind",
                abbr: "B",
                label: "Behind ball",
                tone: "positive",
                note: "goal-side",
              },
              { key: "level", abbr: "L", label: "Level", tone: "neutral", note: "even with ball" },
              { key: "ahead", abbr: "A", label: "Ahead", tone: "negative", note: "past the ball" },
            ]}
          />
          <PositioningBarRows
            colors={colors}
            summaries={withRanks}
            label={label}
            preserveOrder={preserveOrder}
            emptyLabel={`No ball-relative positioning spans are available for ${emptyContext}.`}
            segments={(summary) => {
              const [behind, level, ahead] = directionalTones(summary.team, zoneMode);
              return [
                positioningSegment(
                  "behind",
                  "Behind ball",
                  "B",
                  summary.behindBallSeconds,
                  summary.trackedSeconds,
                  behind,
                ),
                positioningSegment(
                  "level",
                  "Level",
                  "L",
                  summary.levelWithBallSeconds,
                  summary.trackedSeconds,
                  level,
                ),
                positioningSegment(
                  "ahead",
                  "Ahead",
                  "A",
                  summary.inFrontOfBallSeconds,
                  summary.trackedSeconds,
                  ahead,
                ),
              ];
            }}
            sortValue={(summary) => share(summary.inFrontOfBallSeconds, summary.trackedSeconds)}
            total={(summary) => summary.trackedSeconds}
          />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Ball proximity</h3>
            <span>Farthest, other, and closest to the ball</span>
          </header>
          <p className="chart-panel-note">
            Share of time by distance to the ball among teammates. <strong>Farthest</strong> is the
            player furthest back, <strong>closest</strong> is the one nearest the ball on their
            team, and <strong>other</strong> is everyone in between.
          </p>
          <ZoneLegend
            cohort={cohort}
            colors={colors}
            colorKey
            caption={cohort ? undefined : DIRECTIONAL_COLOUR_CAPTION}
            items={[
              {
                key: "farthest",
                abbr: "F",
                label: "Farthest",
                tone: "positive",
                note: "furthest back",
              },
              { key: "other", abbr: "O", label: "Other", tone: "neutral", note: "in between" },
              {
                key: "closest",
                abbr: "C",
                label: "Closest",
                tone: "negative",
                note: "nearest the ball",
              },
            ]}
          />
          <PositioningBarRows
            colors={colors}
            summaries={summaries}
            label={label}
            preserveOrder={preserveOrder}
            emptyLabel={`No ball-proximity spans are available for ${emptyContext}.`}
            segments={(summary) => {
              // Furthest-back end carries the own-team colour and the on-ball end
              // the opponent colour, matching the Teammate role chart's back ->
              // forward direction.
              const [farthest, other, closest] = directionalTones(summary.team, zoneMode);
              return [
                positioningSegment(
                  "farthest",
                  "Farthest",
                  "F",
                  summary.farthestSeconds,
                  ballPriorityTotal(summary),
                  farthest,
                ),
                positioningSegment(
                  "other",
                  "Other",
                  "O",
                  otherBallPrioritySeconds(summary),
                  ballPriorityTotal(summary),
                  other,
                ),
                positioningSegment(
                  "closest",
                  "Closest",
                  "C",
                  summary.closestTeamSeconds,
                  ballPriorityTotal(summary),
                  closest,
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
          <p className="chart-panel-note">
            Average distance from the ball in Unreal units (uu); shorter bars mean a player stays
            closer to the action.
          </p>
          <PositioningDistanceChart
            colors={distanceColors}
            summaries={withRanks}
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
          <p className="chart-panel-note">
            Average spacing from teammates in Unreal units (uu); longer bars mean more spread-out
            positioning, shorter bars mean tighter rotations.
          </p>
          <PositioningDistanceChart
            colors={distanceColors}
            summaries={withRanks}
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
            <p className="chart-panel-note">
              Count of goals conceded while the player was ahead of the ball and out of the
              defensive play; lower is better.
            </p>
            <PositioningDistanceChart
              colors={distanceColors}
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

function RoleDeltaHistogramChart({ histogram }: { histogram: PositioningRoleDeltaHistogram }) {
  const total = histogram.sample_count;
  if (total <= 0) return null;
  const buckets = histogram.buckets.map((bucket) => ({
    bucket,
    share: bucket.count / total,
  }));
  const maxShare = Math.max(0.01, ...buckets.map((bucket) => bucket.share));

  return (
    <div
      className="positioning-role-balance-histogram"
      style={outcomeDistributionColorStyle(PLAYER_RELATIVE_OUTCOME_COLORS)}
    >
      <div className="positioning-role-balance-direction">
        <span>More most back</span>
        <span>Neutral</span>
        <span>More most forward</span>
      </div>
      <div
        className="positioning-role-balance-bars"
        role="img"
        aria-label="2v2 teammate role delta histogram"
      >
        {buckets.map(({ bucket, share }) => {
          const count = bucket.count;
          const shareLabel = formatPercent(count, total);
          const showShareLabel = share >= 0.035;
          const countClassName = [
            "positioning-role-balance-count",
            share >= maxShare * 0.98 ? "is-peak-label" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const barHeight = share > 0 ? Math.max(8, (share / maxShare) * 100) : 0;
          const axisLabel = roleDeltaBucketAxisLabel(bucket);
          const labelClassName = [
            "positioning-role-balance-label",
            roleDeltaBucketIsMajorTick(bucket) ? "is-major-tick" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const title = `${bucket.full_label}: ${shareLabel} (${count.toLocaleString()} ${
            count === 1 ? "game" : "games"
          })`;
          return (
            <div className="positioning-role-balance-column" key={bucket.key} title={title}>
              <span className={countClassName}>{showShareLabel ? shareLabel : ""}</span>
              <span className="positioning-role-balance-track">
                <span
                  className={`source-segment ${outcomeSegmentClassName(
                    roleDeltaBucketTone(bucket.direction),
                    roleDeltaBucketLevel(bucket.direction, bucket.upper_pp),
                  )}`}
                  style={{ height: `${barHeight}%` }}
                />
              </span>
              <span className={labelClassName} aria-label={bucket.full_label}>
                {axisLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function roleDeltaBucketAxisLabel(
  bucket: PositioningRoleDeltaHistogram["buckets"][number],
): string {
  if (bucket.direction === "neutral") return "0";
  const boundary =
    bucket.lower_pp == null
      ? bucket.upper_pp
      : bucket.upper_pp == null
        ? bucket.lower_pp
        : (bucket.lower_pp + bucket.upper_pp) / 2;
  const magnitude = formatRoleDeltaAxisPp(Math.abs(boundary ?? 0));
  const prefix = bucket.direction === "back" ? "-" : "+";
  const suffix = bucket.lower_pp == null || bucket.upper_pp == null ? "+" : "";
  return `${prefix}${magnitude}${suffix}`;
}

function roleDeltaBucketIsMajorTick(
  bucket: PositioningRoleDeltaHistogram["buckets"][number],
): boolean {
  if (bucket.direction === "neutral") return true;
  if (bucket.lower_pp == null || bucket.upper_pp == null) return true;
  const center = Math.abs((bucket.lower_pp + bucket.upper_pp) / 2);
  return center < 50 && Math.round(center) % 10 === 0;
}

function formatRoleDeltaAxisPp(value: number): string {
  const rounded = Math.round(value);
  return Number.isFinite(rounded) ? String(rounded) : "0";
}

function roleDeltaBucketLevel(
  direction: "back" | "neutral" | "forward",
  upperPp: number | null,
): OutcomeDistributionLevel {
  if (direction === "neutral") return "narrow";
  if (upperPp == null || Math.abs(upperPp) >= 37.5) return "strong";
  if (Math.abs(upperPp) <= 12.5) return "clear";
  return "unknown";
}

function roleDeltaBucketTone(direction: "back" | "neutral" | "forward"): OutcomeDistributionTone {
  if (direction === "back") return "positive";
  if (direction === "forward") return "negative";
  return "neutral";
}

function PositioningBarRows({
  summaries,
  segments,
  sortValue,
  total,
  emptyLabel,
  label,
  preserveOrder = false,
  colors = TEAM_OUTCOME_COLORS,
}: {
  summaries: PlayerPositioningSummary[];
  segments: (summary: PlayerPositioningSummary) => SegmentedBarSegment[];
  sortValue?: (summary: PlayerPositioningSummary) => number;
  total: (summary: PlayerPositioningSummary) => number;
  emptyLabel: string;
  label: (summary: PlayerPositioningSummary) => ReactNode;
  preserveOrder?: boolean;
  colors?: OutcomeDistributionColors;
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
      style={outcomeDistributionColorStyle(colors)}
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
  colors,
}: {
  summaries: PlayerPositioningSummary[];
  value: (summary: PlayerPositioningSummary) => number | null;
  max: number;
  format: (value: number | null) => string;
  emptyLabel: string;
  label: (summary: PlayerPositioningSummary) => ReactNode;
  preserveOrder?: boolean;
  // When set (career cohort view) the bars use this outcome palette instead of
  // the blue/orange team-segment classes, keeping the page free of team colours.
  colors?: OutcomeDistributionColors;
}) {
  const indexByKey = teamLocalIndexByKey(summaries);
  const rowStyle = colors ? outcomeDistributionColorStyle(colors) : undefined;
  const ordered = preserveOrder
    ? summaries
    : sortedSummaries(summaries, (summary) => value(summary) ?? 0);
  const rows: ComparisonRow[] = ordered.map((summary) => {
    const metric = value(summary) ?? 0;
    const shade = Math.min(indexByKey.get(summary.key) ?? 0, 3);
    const className = summary.rankCohort
      ? rankAverageShadeClass(summary.rankCohort.rank_value, summary.rankCohort.rank_grouping)
      : summary.careerCohort
        ? careerCohortSegmentClassName(summary.careerCohort)
        : colors
          ? outcomeSegmentClassName(
              teamOutcomeTone(summary.team),
              DISTANCE_LEVELS[shade] ?? "clear",
            )
          : `team-segment-${teamClass(summary.team)} player-shade-${shade}`;
    return {
      key: summary.key,
      label: label(summary),
      ariaLabel: `${summary.name}: ${format(metric)}`,
      style: rowStyle,
      segments: [
        {
          key: "value",
          className,
          label: summary.name,
          value: metric,
        },
      ],
      total: metric,
      maxValue: max,
      barValue: format(metric),
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
// browser) and map onto the same summary rows the per-game view renders. Row
// identity is profile-relative (player, teammates, opponents), not replay-local
// team color; row order is fixed.
export function PlayerPositioningCohorts({
  response,
  playerName,
  rankCohorts = [],
  rankWindowLabel,
}: {
  response: PositioningSummaryResponse;
  playerName: string;
  rankCohorts?: RankBenchmarkCohort[];
  rankWindowLabel?: string | null;
}) {
  const summaries: PlayerPositioningSummary[] = [
    cohortSummary("cohort-self", "player", playerName || "You", 0, response.player),
  ];
  if (response.teammates) {
    summaries.push(
      cohortSummary("cohort-teammates", "teammates", "Teammates", 0, response.teammates),
    );
  }
  if (response.opponents) {
    summaries.push(
      cohortSummary("cohort-opponents", "opponents", "Opponents", 1, response.opponents),
    );
  }

  const rankSummaries = rankCohorts.map(rankPositioningSummary);

  return (
    <PositioningSummariesView
      summaries={summaries}
      rankSummaries={rankSummaries}
      emptyContext="the selected games"
      preserveOrder
      cohort
      roleDeltaHistogram={response.teammate_role_delta_histogram}
      label={(summary) =>
        summary.rankCohort
          ? rankCohortLabel(summary.rankCohort, rankWindowLabel)
          : cohortLabel(summary, cohortAppearances(summary.key, response))
      }
    />
  );
}

// Synthesize a positioning summary from a rank cohort's benchmark shares. Uses
// trackedSeconds = 1 so each "*Seconds" field is the metric's 0..1 share; only
// the benchmark-backed fields are populated (the view only feeds rank rows to
// the charts that cover them). `level`/`mid` are the complements of the present
// shares (no dedicated metric_key).
function rankPositioningSummary(cohort: RankBenchmarkCohort): PlayerPositioningSummary {
  const stat = (key: string): number => {
    const value = cohort.per_stat[key]?.value;
    return value != null && Number.isFinite(value) ? value : 0;
  };
  const behind = stat("positioning:behind_ball_share");
  const ahead = stat("positioning:ahead_of_ball_share");
  const mostBack = stat("positioning:most_back_share");
  const mostForward = stat("positioning:most_forward_share");
  const distance = stat("positioning:distance_to_ball");
  const teammateDistance = stat("positioning:distance_to_teammates");
  return {
    key: `rank-${cohort.rank_value}`,
    name: cohort.label,
    platform: null,
    platformPlayerId: null,
    rank: null,
    team: null,
    careerCohort: "rank-peers",
    rankCohort: cohort,
    activeSeconds: 1,
    trackedSeconds: 1,
    defensiveThirdSeconds: stat("positioning:defensive_third_share"),
    neutralThirdSeconds: stat("positioning:neutral_third_share"),
    offensiveThirdSeconds: stat("positioning:offensive_third_share"),
    defensiveHalfSeconds: 0,
    offensiveHalfSeconds: 0,
    behindBallSeconds: behind,
    levelWithBallSeconds: Math.max(0, 1 - behind - ahead),
    inFrontOfBallSeconds: ahead,
    roleSeconds: {
      no_teammates: 0,
      most_back: mostBack,
      mid: Math.max(0, 1 - mostBack - mostForward),
      most_forward: mostForward,
      other: 0,
      unknown: 0,
    },
    closestTeamSeconds: 0,
    closestAbsoluteSeconds: 0,
    farthestSeconds: 0,
    distanceToBallWeighted: distance,
    distanceToBallWeight: distance > 0 ? 1 : 0,
    distanceToTeammatesWeighted: teammateDistance,
    distanceToTeammatesWeight: teammateDistance > 0 ? 1 : 0,
    caughtAheadGoals: 0,
  };
}

function cohortSummary(
  key: string,
  careerCohort: CareerCohortKey,
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
    careerCohort,
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
  const cohort = summary.careerCohort;
  return (
    <StatPlayerLabel
      className={cohort ? careerCohortClassName(cohort) : `team-accent-${teamClass(summary.team)}`}
      name={summary.name}
      platform={null}
      platformPlayerId={null}
      profilePath={null}
      rank={null}
      showPlatformBadge={false}
      subtitle={
        appearances != null && cohort
          ? `${careerCohortSubtitle(cohort)} · ${appearances.toLocaleString()} ${suffix}`
          : appearances != null
            ? `${appearances.toLocaleString()} ${suffix}`
            : ""
      }
    />
  );
}

function positioningPlayerLabel(summary: PlayerPositioningSummary) {
  return (
    <StatPlayerLabel
      className={`team-accent-${teamClass(summary.team)}`}
      name={summary.name}
      platform={summary.platform}
      platformPlayerId={summary.platformPlayerId}
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

    if (event.event_type === "ball_depth" || event.event_type.startsWith("ball_depth_")) {
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

function applyReplayPositioningSummaries(
  summaries: PlayerPositioningSummary[],
  positioningSummaries?: ReplayPlayerPositioningSummary[],
): PlayerPositioningSummary[] {
  if (!positioningSummaries || positioningSummaries.length === 0) return summaries;
  const byKey = new Map(
    positioningSummaries.flatMap((summary) => {
      const key = replayPositioningSummaryKey(summary);
      return key ? [[key, summary.summary] as const] : [];
    }),
  );

  return summaries.map((summary) => {
    const positioning = byKey.get(summary.key);
    if (!positioning || !positioningCohortHasData(positioning)) return summary;
    return {
      ...summary,
      activeSeconds: positioning.active_seconds,
      trackedSeconds: positioning.tracked_seconds,
      defensiveThirdSeconds: positioning.defensive_third_seconds,
      neutralThirdSeconds: positioning.neutral_third_seconds,
      offensiveThirdSeconds: positioning.offensive_third_seconds,
      defensiveHalfSeconds: positioning.defensive_half_seconds,
      offensiveHalfSeconds: positioning.offensive_half_seconds,
      behindBallSeconds: positioning.behind_ball_seconds,
      levelWithBallSeconds: positioning.level_with_ball_seconds,
      inFrontOfBallSeconds: positioning.ahead_of_ball_seconds,
      roleSeconds: {
        no_teammates: positioning.role_no_teammates_seconds,
        most_back: positioning.role_most_back_seconds,
        mid: positioning.role_mid_seconds,
        most_forward: positioning.role_most_forward_seconds,
        other: positioning.role_other_seconds,
        unknown: 0,
      },
      closestTeamSeconds: positioning.closest_team_seconds,
      closestAbsoluteSeconds: positioning.closest_absolute_seconds,
      farthestSeconds: positioning.farthest_seconds,
      distanceToBallWeighted: positioning.distance_to_ball_weighted,
      distanceToBallWeight: positioning.distance_to_ball_weight,
      distanceToTeammatesWeighted: positioning.distance_to_teammates_weighted,
      distanceToTeammatesWeight: positioning.distance_to_teammates_weight,
    };
  });
}

function positioningCohortHasData(summary: PositioningCohortSummary): boolean {
  return (
    summary.active_seconds > 0 ||
    summary.tracked_seconds > 0 ||
    summary.defensive_third_seconds +
      summary.neutral_third_seconds +
      summary.offensive_third_seconds >
      0 ||
    summary.behind_ball_seconds + summary.level_with_ball_seconds + summary.ahead_of_ball_seconds >
      0 ||
    summary.role_most_back_seconds +
      summary.role_mid_seconds +
      summary.role_most_forward_seconds +
      summary.role_other_seconds +
      summary.role_no_teammates_seconds >
      0 ||
    summary.closest_team_seconds + summary.closest_absolute_seconds + summary.farthest_seconds >
      0 ||
    summary.distance_to_ball_weight > 0 ||
    summary.distance_to_teammates_weight > 0
  );
}

function replayPositioningSummaryKey(summary: ReplayPlayerPositioningSummary): string | null {
  if (!summary.platform || !summary.platform_player_id) return null;
  return `${normalizePlatform(summary.platform)}:${summary.platform_player_id}`;
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
  abbr: string,
  seconds: number,
  total: number,
  tone: OutcomeDistributionTone,
  level: OutcomeDistributionLevel = "clear",
): SegmentedBarSegment {
  const percent = percentage(seconds, total);
  const duration = formatDurationCompact(seconds);
  const percentText = formatPercent(seconds, total);
  return {
    key: id,
    // The positioning charts tell categories apart by hue (own colour -> grey ->
    // opponent colour). The colour alone doesn't say which category a segment is,
    // so we name it in the bar.
    className: outcomeSegmentClassName(tone, level),
    label,
    value: seconds,
    // Label the segment in place with a single-letter abbreviation (D/N/O,
    // B/L/A, ...) so it fits even in narrow segments: wider ones add the share,
    // tighter ones keep just the letter, and slivers stay clear. The label
    // truncates with an ellipsis (see .source-segment-label), and the tooltip
    // always carries the full "category: percent (duration)".
    visibleLabel: percent >= 9 ? `${abbr} ${percentText}` : percent >= 3 ? abbr : undefined,
    title: statPercentWithValue(percentText, duration, label),
  };
}

// Per-player shade ramp for the magnitude (distance) bars when they use the
// outcome palette, so teammates on one cohort stay distinguishable.
const DISTANCE_LEVELS: OutcomeDistributionLevel[] = ["clear", "strong", "narrow", "unknown"];

type ZoneToneMode = "team" | "fixed";

function oppositeTone(tone: OutcomeDistributionTone): OutcomeDistributionTone {
  if (tone === "positive") return "negative";
  if (tone === "negative") return "positive";
  return "neutral";
}

// Tones for a directional split (defensive/neutral/offensive,
// behind/level/ahead): defensive end in one colour, neutral in grey, offensive
// end in the opposite colour. Per game the "own" end is the player's team
// colour and the far end the opponent's; on the career page we use a fixed
// positive/neutral/negative ramp so the legend swatches read the same on every
// cohort row.
function directionalTones(
  team: number | null,
  mode: ZoneToneMode,
): [OutcomeDistributionTone, OutcomeDistributionTone, OutcomeDistributionTone] {
  if (mode === "fixed") return ["positive", "neutral", "negative"];
  const own = teamOutcomeTone(team);
  return [own, "neutral", oppositeTone(own)];
}

interface ZoneLegendItem {
  key: string;
  abbr: string;
  label: string;
  tone: OutcomeDistributionTone;
  note: string;
}

const DIRECTIONAL_COLOUR_CAPTION =
  "Each bar runs from the player's own team colour through grey to the opponent colour.";

// Key for a positioning chart's in-bar letters: one badge per category (D, N,
// O, ...) followed by its full name and a note. When colour encodes the
// category (`colorKey` in the cohort view, which uses a fixed teal -> grey ->
// purple ramp) the badges are tinted so the legend doubles as a colour key. Per
// game colour is team-relative (own -> grey -> opponent), so the badges stay
// neutral and the `caption` explains the colours.
function ZoneLegend({
  cohort,
  colors,
  items,
  colorKey = false,
  caption,
}: {
  cohort: boolean;
  colors: OutcomeDistributionColors;
  items: ZoneLegendItem[];
  colorKey?: boolean;
  caption?: ReactNode;
}) {
  const tintBadges = cohort && colorKey;
  return (
    <div
      className="positioning-legend"
      style={tintBadges ? outcomeDistributionColorStyle(colors) : undefined}
    >
      <ul className="positioning-legend-items">
        {items.map((item) => (
          <li className="positioning-legend-item" key={item.key}>
            <span
              className={`positioning-legend-badge${tintBadges ? ` outcome-dist-${item.tone}` : ""}`}
            >
              {item.abbr}
            </span>
            <span className="positioning-legend-label">{item.label}</span>
            <span className="positioning-legend-note">{item.note}</span>
          </li>
        ))}
      </ul>
      {caption ? <span className="positioning-legend-caption">{caption}</span> : null}
    </div>
  );
}

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
  return `/players/${encodeURIComponent(summary.platform)}/id/${encodeURIComponent(summary.platformPlayerId)}/stats/positioning`;
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

// Single-letter in-bar tags for the teammate-role ramp (full names stay in the
// tooltip): Back / Mid / Forward / Other / Solo (alone on the team).
function roleAbbr(role: PositioningRole): string {
  switch (role) {
    case "no_teammates":
      return "S";
    case "most_back":
      return "B";
    case "mid":
      return "M";
    case "most_forward":
      return "F";
    case "other":
      return "O";
    case "unknown":
      return "?";
  }
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
