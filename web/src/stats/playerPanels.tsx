import { Link } from "react-router-dom";
import { useState } from "react";
import type { ReactNode } from "react";
import type {
  EventStatDimensionResponse,
  EventStatSummaryResponse,
  PlayerStatOverviewResponse,
  PossessionSummaryResponse,
  RotationTimeShareResponse,
  StatAggregateResponse,
  StatAggregateSetResponse,
} from "../types";
import { boostAmountToPercent } from "./boostUnits";
import {
  careerCohortClassName,
  careerCohortKey,
  careerCohortLabel,
  careerCohortSegmentClassName,
  careerCohortSubtitle,
  careerRateWindowLabel,
  type CareerCohortKey,
  ComparisonBar,
  OutcomeDistributionBar,
  PLAYER_RELATIVE_OUTCOME_COLORS,
  PlayerComparisonChart,
  StatPlayerLabel,
  statPercentWithValue,
  type ComparisonRow,
  type OutcomeDistributionLevel,
  type OutcomeDistributionSegment,
} from "./shared";
import {
  PossessionAdvancedComparisonGrid,
  possessionAdvancedCohortLabel,
  type PossessionAdvancedSubject,
} from "./possessionAdvanced";

const rateChartStatLimit = 12;
const rateWindowMinutes = 5;

/**
 * Career fallback for stat sections without a purpose-built profile subview.
 * Each card is one stat; rows compare the profile subject to available cohorts.
 */
export function PlayerRateComparisonChart({
  playerName = "Player",
  stats,
}: {
  playerName?: string;
  stats: StatAggregateResponse[];
}) {
  const cards = stats
    .filter((stat) => stat.per_active_minute != null)
    .slice(0, rateChartStatLimit)
    .map((stat) => ({ stat, rows: playerRateComparisonRows(stat, playerName) }))
    .filter((card) => card.rows.length > 0);

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="full-span player-rate-chart">
      <div className="stat-comparison-grid player-rate-comparison-grid">
        {cards.map(({ stat, rows }) => (
          <PlayerComparisonChart
            className="career-rate-card"
            key={stat.key}
            rows={rows}
            title={stat.display_name}
          />
        ))}
      </div>
    </section>
  );
}

function playerRateComparisonRows(
  stat: StatAggregateResponse,
  playerName: string,
): ComparisonRow[] {
  const playerRate = (stat.per_active_minute ?? 0) * rateWindowMinutes;
  const teammateRate =
    stat.teammate_per_active_minute != null
      ? stat.teammate_per_active_minute * rateWindowMinutes
      : null;
  const maxValue = Math.max(1, playerRate, teammateRate ?? 0);
  const rows: ComparisonRow[] = [
    playerRateComparisonRow({
      cohortKey: "player",
      count: stat.event_count,
      maxValue,
      playerName,
      rate: playerRate,
      statName: stat.display_name,
    }),
  ];
  if (teammateRate != null) {
    rows.push(
      playerRateComparisonRow({
        cohortKey: "teammates",
        count: stat.teammate_event_count,
        maxValue,
        playerName,
        rate: teammateRate,
        statName: stat.display_name,
      }),
    );
  }
  return rows;
}

function playerRateComparisonRow({
  cohortKey,
  count,
  maxValue,
  playerName,
  rate,
  statName,
}: {
  cohortKey: CareerCohortKey;
  count: number;
  maxValue: number;
  playerName: string;
  rate: number;
  statName: string;
}): ComparisonRow {
  const formatted = formatRate(rate);
  const rateLabel = `${formatted}/5m`;
  const totalKind = cohortKey === "player" ? "total" : "pooled total";
  return {
    key: cohortKey,
    label: (
      <StatPlayerLabel
        className={careerCohortClassName(cohortKey)}
        name={careerCohortLabel(cohortKey, playerName)}
        platform={null}
        profilePath={null}
        rank={null}
        showPlatformBadge={false}
        subtitle={`${careerCohortSubtitle(cohortKey)} · ${count.toLocaleString()} ${totalKind}`}
      />
    ),
    ariaLabel: `${careerCohortLabel(cohortKey, playerName)}: ${rateLabel} ${careerRateWindowLabel(
      rateWindowMinutes * 60,
    )}`,
    segments: [
      {
        key: "rate",
        className: careerCohortSegmentClassName(cohortKey),
        label: statName,
        value: Math.max(0, rate),
        visibleLabel: rate > 0 ? rateLabel : undefined,
        title: `${rateLabel} (${count.toLocaleString()} ${totalKind})`,
      },
    ],
    total: Math.max(0, rate),
    maxValue,
    valueLabel: (
      <span title={`${count.toLocaleString()} ${totalKind}`}>{count.toLocaleString()} total</span>
    ),
    placeholder: rateLabel,
  };
}

function RateComparisonBar({
  ariaLabel,
  maxValue,
  playerLabel,
  playerRate,
  playerTitle,
  teammateRate,
  teammateTitle,
}: {
  ariaLabel: string;
  maxValue: number;
  playerLabel: string;
  playerRate: number;
  playerTitle?: string;
  teammateRate: number | null;
  teammateTitle?: string;
}) {
  return (
    <ComparisonBar
      ariaLabel={ariaLabel}
      maxValue={maxValue}
      segments={[
        {
          key: "player",
          className: careerCohortSegmentClassName("player"),
          label: "Player",
          value: Math.max(0, playerRate),
          visibleLabel: playerRate > 0 ? playerLabel : undefined,
          title: playerTitle ?? `You: ${playerLabel} per ${rateWindowMinutes} min`,
        },
      ]}
      total={Math.max(0, playerRate)}
      markers={
        teammateRate == null
          ? []
          : [
              {
                key: "teammates",
                className: careerCohortClassName("teammates"),
                label: "Teammates",
                value: Math.max(0, teammateRate),
                title:
                  teammateTitle ??
                  `Teammates: ${formatRate(teammateRate)} per ${rateWindowMinutes} min`,
              },
            ]
      }
      placeholder={playerLabel}
    />
  );
}

interface ProfileRateStat {
  key: string;
  displayName: string;
  eventCount: number;
  perActiveMinute: number | null;
  teammateEventCount: number;
  teammatePerActiveMinute: number | null;
}

export function CoreProfileComparison({
  overview,
  playerName,
  stats,
}: {
  overview: PlayerStatOverviewResponse;
  playerName: string;
  stats: StatAggregateResponse[];
}) {
  const demos = aggregateProfileRateStat("demos", "Demos", stats, isDemoStat);
  const deaths = aggregateProfileRateStat("deaths", "Deaths", stats, isDeathStat);
  const goals = scoringRateOrZero(overview.goals);
  const assists = scoringRateOrZero(overview.assists);
  const shots = scoringRateOrZero(overview.shots);
  const cards = [
    rateCardFromOverview("goals", "Goals (per 5 min)", goals, playerName),
    rateCardFromOverview("assists", "Assists (per 5 min)", assists, playerName),
    rateCardFromOverview("shots", "Shots (per 5 min)", shots, playerName),
    {
      key: "demos",
      title: "Demos (per 5 min)",
      rows: profileRateComparisonRows(demos, playerName),
    },
    {
      key: "deaths",
      title: "Deaths (per 5 min)",
      rows: profileRateComparisonRows(deaths, playerName),
    },
    {
      key: "shooting-percentage",
      title: "Shooting percentage (%)",
      rows: shootingPercentageRows(goals, shots, playerName),
    },
  ];

  return (
    <section className="core-profile-comparison full-span">
      <div className="stat-comparison-grid player-rate-comparison-grid">
        {cards.map((card) => (
          <PlayerComparisonChart
            className="career-rate-card"
            key={card.key}
            rows={card.rows}
            title={card.title}
          />
        ))}
      </div>
    </section>
  );
}

function rateCardFromOverview(
  key: string,
  title: string,
  rate: ScoringRateLike,
  playerName: string,
) {
  const stat: ProfileRateStat = {
    key,
    displayName: title,
    eventCount: rate.count,
    perActiveMinute: rate.per_active_minute,
    teammateEventCount: rate.teammate_count,
    teammatePerActiveMinute: rate.teammate_per_active_minute,
  };
  return { key, title, rows: profileRateComparisonRows(stat, playerName) };
}

interface ScoringRateLike {
  count: number;
  per_active_minute: number | null;
  teammate_count: number;
  teammate_per_active_minute: number | null;
}

function scoringRateOrZero(rate: ScoringRateLike | null | undefined): ScoringRateLike {
  return {
    count: rate?.count ?? 0,
    per_active_minute: rate?.per_active_minute ?? null,
    teammate_count: rate?.teammate_count ?? 0,
    teammate_per_active_minute: rate?.teammate_per_active_minute ?? null,
  };
}

function aggregateProfileRateStat(
  key: string,
  displayName: string,
  stats: StatAggregateResponse[],
  predicate: (stat: StatAggregateResponse) => boolean,
): ProfileRateStat {
  const matches = stats.filter(predicate);
  const eventCount = matches.reduce((total, stat) => total + stat.event_count, 0);
  const teammateEventCount = matches.reduce((total, stat) => total + stat.teammate_event_count, 0);
  return {
    key,
    displayName,
    eventCount,
    perActiveMinute: sumNullableRates(matches.map((stat) => stat.per_active_minute)),
    teammateEventCount,
    teammatePerActiveMinute: sumNullableRates(
      matches.map((stat) => stat.teammate_per_active_minute),
    ),
  };
}

function profileRateComparisonRows(stat: ProfileRateStat, playerName: string): ComparisonRow[] {
  const playerRate = (stat.perActiveMinute ?? 0) * rateWindowMinutes;
  const teammateRate =
    stat.teammatePerActiveMinute != null ? stat.teammatePerActiveMinute * rateWindowMinutes : null;
  const maxValue = Math.max(1, playerRate, teammateRate ?? 0);
  const rows = [
    playerRateComparisonRow({
      cohortKey: "player",
      count: stat.eventCount,
      maxValue,
      playerName,
      rate: playerRate,
      statName: stat.displayName,
    }),
  ];
  if (teammateRate != null || stat.teammateEventCount > 0) {
    rows.push(
      playerRateComparisonRow({
        cohortKey: "teammates",
        count: stat.teammateEventCount,
        maxValue,
        playerName,
        rate: teammateRate ?? 0,
        statName: stat.displayName,
      }),
    );
  }
  return rows;
}

function shootingPercentageRows(
  goals: ScoringRateLike,
  shots: ScoringRateLike,
  playerName: string,
): ComparisonRow[] {
  const playerPercentage = percentage(goals.count, shots.count);
  const teammatePercentage = percentage(goals.teammate_count, shots.teammate_count);
  const rows: ComparisonRow[] = [
    percentageComparisonRow({
      cohortKey: "player",
      denominator: shots.count,
      label: formatPercentage(playerPercentage),
      maxValue: 100,
      numerator: goals.count,
      playerName,
      value: playerPercentage ?? 0,
    }),
  ];
  if (teammatePercentage != null || shots.teammate_count > 0) {
    rows.push(
      percentageComparisonRow({
        cohortKey: "teammates",
        denominator: shots.teammate_count,
        label: formatPercentage(teammatePercentage),
        maxValue: 100,
        numerator: goals.teammate_count,
        playerName,
        value: teammatePercentage ?? 0,
      }),
    );
  }
  return rows;
}

function percentageComparisonRow({
  cohortKey,
  denominator,
  label,
  maxValue,
  numerator,
  playerName,
  value,
}: {
  cohortKey: CareerCohortKey;
  denominator: number;
  label: string;
  maxValue: number;
  numerator: number;
  playerName: string;
  value: number;
}): ComparisonRow {
  const totalKind = cohortKey === "player" ? "total" : "pooled total";
  const totalLabel = `${numerator.toLocaleString()}/${denominator.toLocaleString()}`;
  return {
    key: cohortKey,
    label: (
      <StatPlayerLabel
        className={careerCohortClassName(cohortKey)}
        name={careerCohortLabel(cohortKey, playerName)}
        platform={null}
        profilePath={null}
        rank={null}
        showPlatformBadge={false}
        subtitle={`${careerCohortSubtitle(cohortKey)} · ${totalLabel} ${totalKind}`}
      />
    ),
    ariaLabel: `${careerCohortLabel(cohortKey, playerName)}: ${label}`,
    segments: [
      {
        key: "shooting-percentage",
        className: careerCohortSegmentClassName(cohortKey),
        label: "Shooting percentage",
        value,
        visibleLabel: value > 0 ? label : undefined,
        title: `${label} (${totalLabel} goals/shots ${totalKind})`,
      },
    ],
    total: value,
    maxValue,
    valueLabel: <span title={`${totalLabel} goals/shots ${totalKind}`}>{totalLabel} total</span>,
    placeholder: label,
  };
}

function isDemoStat(stat: StatAggregateResponse): boolean {
  const key = stat.key.toLowerCase();
  const displayName = stat.display_name.toLowerCase();
  return (
    key === "demolition" ||
    key === "kill" ||
    key === "core.demo" ||
    key.includes("demo") ||
    displayName.includes("demo")
  );
}

function isDeathStat(stat: StatAggregateResponse): boolean {
  const key = stat.key.toLowerCase();
  const displayName = stat.display_name.toLowerCase();
  return key === "death" || key.includes("death") || displayName.includes("death");
}

function sumNullableRates(values: Array<number | null>): number | null {
  const finite = values.filter((value): value is number => value != null && Number.isFinite(value));
  if (finite.length === 0) return null;
  return finite.reduce((total, value) => total + value, 0);
}

function percentage(numerator: number, denominator: number): number | null {
  return denominator > 0 ? (numerator / denominator) * 100 : null;
}

function formatPercentage(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "0%";
  return `${Math.round(value)}%`;
}

/** Headline goal and assist rates, player vs pooled teammate average. */
export function ScoringRatePanel({ overview }: { overview: PlayerStatOverviewResponse }) {
  const rows = [
    { label: "Goals", rate: overview.goals },
    { label: "Assists", rate: overview.assists },
  ].map(({ label, rate }) => ({
    label,
    count: rate.count,
    playerRate: (rate.per_active_minute ?? 0) * rateWindowMinutes,
    teammateRate:
      rate.teammate_per_active_minute != null
        ? rate.teammate_per_active_minute * rateWindowMinutes
        : null,
  }));
  const maxRate = rows.reduce(
    (max, row) => Math.max(max, row.playerRate, row.teammateRate ?? 0),
    0,
  );

  return (
    <section className="chart-panel scoring-rate-panel">
      <header className="chart-panel-header">
        <h3>Goals &amp; assists</h3>
        <span>Per {rateWindowMinutes} minutes vs teammate average</span>
      </header>
      <div className="rate-chart-rows">
        {rows.map(({ label, count, playerRate, teammateRate }) => (
          <div className="rate-chart-row" key={label}>
            <div className="rate-chart-label">{label}</div>
            <div
              className="rate-chart-track"
              aria-label={`${label} per ${rateWindowMinutes} minutes`}
            >
              <RateComparisonBar
                ariaLabel={`${label} per ${rateWindowMinutes} minutes`}
                maxValue={maxRate}
                playerLabel={formatRate(playerRate)}
                playerRate={playerRate}
                teammateRate={teammateRate}
              />
            </div>
            <div className="rate-chart-value">
              <strong>{formatRate(playerRate)}</strong>
              {teammateRate != null ? (
                <span className="subtle"> vs {formatRate(teammateRate)}</span>
              ) : null}
              <span className="subtle"> · {count.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="rate-chart-legend subtle">
        <span className="rate-chart-legend-fill" /> player
        <span className="rate-chart-legend-marker" /> teammate average
      </p>
    </section>
  );
}

/** Goal tag proportions over the player's goals. */
export function GoalTagSharePanel({
  overview,
  playerName = "Player",
  goalTypeHref,
  allGoalsHref,
}: {
  overview: PlayerStatOverviewResponse;
  playerName?: string;
  /** When provided, each goal type row links to a playlist of those goals. */
  goalTypeHref?: (kind: string) => string;
  /** When provided, the header links to a playlist of every goal. */
  allGoalsHref?: string;
}) {
  const cards = overview.goal_tags.map((tag) => {
    const rows = profileRateComparisonRows(
      {
        key: tag.kind,
        displayName: tag.display_name,
        eventCount: tag.count,
        perActiveMinute: tag.per_active_minute,
        teammateEventCount: tag.teammate_count,
        teammatePerActiveMinute: tag.teammate_per_active_minute,
      },
      playerName,
    );
    const title = goalTypeHref ? (
      <Link
        className="goal-tag-card-title"
        to={goalTypeHref(tag.kind)}
        title={`Watch all ${tag.display_name.toLowerCase()} goals`}
      >
        {tag.display_name} (per 5 min)
      </Link>
    ) : (
      `${tag.display_name} (per 5 min)`
    );
    return { key: tag.kind, rows, title };
  });

  return (
    <section className="goal-tag-share-panel full-span">
      <header className="goal-tag-share-header">
        <h3>Goal types</h3>
        <span>
          {overview.goals_scored.toLocaleString()} goals tagged by the analyzer — per{" "}
          {rateWindowMinutes} minutes vs teammate average.
        </span>
        {allGoalsHref ? (
          <Link className="goal-tag-watch-all" to={allGoalsHref}>
            Watch all goals
          </Link>
        ) : null}
      </header>
      {cards.length === 0 ? (
        <p className="subtle">No tagged goals yet for this replay set.</p>
      ) : (
        <div className="stat-comparison-grid player-rate-comparison-grid">
          {cards.map((card) => (
            <PlayerComparisonChart
              className="career-rate-card"
              key={card.key}
              rows={card.rows}
              title={card.title}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const rotationDepthOrder = ["behind_play", "level_with_play", "ahead_of_play", "unknown"];

/** Rotation role/depth time shares plus most-back/forward comparison and stint histogram. */
export function RotationTimeSharePanel({
  overview,
  stats,
}: {
  overview: PlayerStatOverviewResponse;
  stats: StatAggregateSetResponse;
}) {
  const depths = orderTimeSharesBySuffix(overview.rotation_depths, depthSuffix, rotationDepthOrder);

  return (
    <section className="chart-panel full-span rotation-share-panel">
      <header className="chart-panel-header">
        <h3>Rotation time shares</h3>
        <span>Where this player spends time in the rotation across the replay set</span>
      </header>
      <div className="rotation-share-grid">
        <RotationDepthTugOfWar depths={depths} />
        <MostBackForwardBlock stats={stats} />
        <FirstManStintHistogram stats={stats} />
      </div>
    </section>
  );
}

const rotationDepthLabels: Record<string, string> = {
  behind_play: "Behind play",
  level_with_play: "Level with play",
  ahead_of_play: "Ahead of play",
  unknown: "Unknown",
};

/** Single tug-of-war bar: defensive (behind play) vs offensive (ahead of play), level/unknown as a neutral center band. */
function RotationDepthTugOfWar({ depths }: { depths: RotationTimeShareResponse[] }) {
  const secondsFor = (suffix: string) =>
    depths
      .filter((share) => depthSuffix(share.key) === suffix)
      .reduce((total, share) => total + share.seconds, 0);
  const behind = secondsFor("behind_play");
  const level = secondsFor("level_with_play");
  const ahead = secondsFor("ahead_of_play");
  const unknown = secondsFor("unknown");
  const neutral = level + unknown;
  const total = behind + neutral + ahead;

  if (total <= 0) return null;

  const segments: Array<{ key: string; className: string; label: string; seconds: number }> = [
    {
      key: "behind_play",
      className: "positioning-segment-behind",
      label: rotationDepthLabels.behind_play,
      seconds: behind,
    },
    {
      key: "neutral",
      className: "positioning-segment-neutral",
      label: rotationDepthLabels.level_with_play,
      seconds: neutral,
    },
    {
      key: "ahead_of_play",
      className: "positioning-segment-ahead",
      label: rotationDepthLabels.ahead_of_play,
      seconds: ahead,
    },
  ];

  return (
    <div className="rotation-share-block rotation-depth-tug-block">
      <h4>Rotation depth</h4>
      <div className="rotation-depth-tug">
        <div className="rotation-depth-tug-track" role="img" aria-label="Rotation depth tug of war">
          {segments.map((segment) => (
            <span
              className={`source-segment ${segment.className}`}
              key={segment.key}
              style={{ flexGrow: segment.seconds }}
              title={statPercentWithValue(
                formatShare(segment.seconds / total),
                formatDurationSeconds(segment.seconds),
                segment.label,
              )}
            />
          ))}
          <span className="rotation-depth-tug-center" aria-hidden="true" />
        </div>
        <div className="rotation-depth-tug-labels">
          <span className="rotation-depth-tug-label">
            <span className="rotation-legend-swatch source-segment positioning-segment-behind" />
            {rotationDepthLabels.behind_play}
            <strong>{formatShare(behind / total)}</strong>
          </span>
          <span className="rotation-depth-tug-label rotation-depth-tug-label-center">
            {rotationDepthLabels.level_with_play}
            <strong>{formatShare(neutral / total)}</strong>
          </span>
          <span className="rotation-depth-tug-label rotation-depth-tug-label-right">
            <strong>{formatShare(ahead / total)}</strong>
            {rotationDepthLabels.ahead_of_play}
            <span className="rotation-legend-swatch source-segment positioning-segment-ahead" />
          </span>
        </div>
      </div>
    </div>
  );
}

function depthSuffix(key: string): string {
  const suffix = key.startsWith("rotation_depth_")
    ? key.slice("rotation_depth_".length)
    : key.startsWith("ball_depth_")
      ? key.slice("ball_depth_".length)
      : key;
  // PlayerStateSpan ball-depth states map onto the legacy play-depth buckets so
  // replay sets mixing old and new analysis runs aggregate into one bar.
  switch (suffix) {
    case "behind_ball":
      return "behind_play";
    case "level_with_ball":
      return "level_with_play";
    case "ahead_of_ball":
      return "ahead_of_play";
    default:
      return suffix;
  }
}

/** First-man stint length distribution, player overlaid against teammate average. */
function FirstManStintHistogram({ stats }: { stats: StatAggregateSetResponse }) {
  const histogram = stats.rotation_duration_histogram;
  const teammateHistogram = stats.teammate_rotation_duration_histogram ?? [];
  if (histogram.length === 0) return null;

  const teammateCountFor = (minSeconds: number) =>
    teammateHistogram.find((bucket) => bucket.min_seconds === minSeconds)?.count ?? 0;
  const playerTotal = histogram.reduce((sum, bucket) => sum + bucket.count, 0);
  const teammateTotal = teammateHistogram.reduce((sum, bucket) => sum + bucket.count, 0);
  const hasTeammates = teammateTotal > 0;

  // Compare share-of-stints so player and teammate distributions are on the same scale.
  const rows = histogram.map((bucket) => {
    const teammateCount = teammateCountFor(bucket.min_seconds);
    return {
      bucket,
      playerShare: playerTotal > 0 ? bucket.count / playerTotal : 0,
      teammateShare: teammateTotal > 0 ? teammateCount / teammateTotal : 0,
      teammateCount,
    };
  });
  const maxShare = rows.reduce((max, row) => Math.max(max, row.playerShare, row.teammateShare), 0);

  return (
    <div className="rotation-share-block rotation-histogram-block">
      <h4>First man stint lengths{hasTeammates ? " vs teammates" : ""}</h4>
      <div className="rotation-histogram" role="img" aria-label="First man stint length histogram">
        {rows.map(({ bucket, playerShare, teammateShare, teammateCount }) => (
          <div
            className="rotation-histogram-bar"
            key={bucket.min_seconds}
            title={
              `${bucket.min_seconds}-${bucket.max_seconds}s: ${bucket.count.toLocaleString()} stints (${formatShare(playerShare)})` +
              (hasTeammates
                ? ` · teammates ${teammateCount.toLocaleString()} (${formatShare(teammateShare)})`
                : "")
            }
          >
            <div className="rotation-histogram-plot">
              <span
                className="rotation-histogram-fill"
                style={{ height: `${barPercent(playerShare, maxShare)}%` }}
              />
              {hasTeammates ? (
                <span
                  className="rotation-histogram-teammate-marker"
                  style={{ bottom: `${barPercent(teammateShare, maxShare)}%` }}
                />
              ) : null}
            </div>
            <span className="rotation-histogram-label">{bucket.min_seconds}s</span>
          </div>
        ))}
      </div>
      {hasTeammates ? (
        <p className="rotation-histogram-legend subtle">
          <span className="rotation-histogram-legend-fill" /> you
          <span className="rotation-histogram-legend-marker" /> teammate average
        </p>
      ) : null}
    </div>
  );
}

function MostBackForwardBlock({ stats }: { stats: StatAggregateSetResponse }) {
  const mostBack = shareOf(stats.time_most_back_seconds, stats.active_time_seconds);
  const mostForward = shareOf(stats.time_most_forward_seconds, stats.active_time_seconds);
  if (mostBack == null && mostForward == null) return null;

  const playerBack = mostBack ?? 0;
  const playerForward = mostForward ?? 0;
  const playerNeutral = Math.max(0, 1 - playerBack - playerForward);
  const teammateBack = shareOf(
    stats.teammate_time_most_back_seconds,
    stats.teammate_active_time_seconds,
  );
  const teammateForward = shareOf(
    stats.teammate_time_most_forward_seconds,
    stats.teammate_active_time_seconds,
  );
  const hasTeammates = teammateBack != null || teammateForward != null;
  const teammateBackPosition = teammateBack == null ? null : barPercent(teammateBack, 1);
  const teammateForwardPosition =
    teammateForward == null ? null : 100 - barPercent(teammateForward, 1);

  return (
    <div className="rotation-share-block field-position-tug-block">
      <h4>Field position share</h4>
      <div className="field-position-tug">
        <div
          className="field-position-tug-track"
          role="img"
          aria-label="Most back versus most forward share"
        >
          <span
            className="source-segment positioning-segment-role-most_back"
            style={{ flexGrow: playerBack }}
            title={`Most back: ${formatShare(mostBack)} of active time`}
          />
          <span
            className="source-segment positioning-segment-role-mid"
            style={{ flexGrow: playerNeutral }}
            title={`Middle/other: ${formatShare(playerNeutral)} of active time`}
          />
          <span
            className="source-segment positioning-segment-role-most_forward"
            style={{ flexGrow: playerForward }}
            title={`Most forward: ${formatShare(mostForward)} of active time`}
          />
          {teammateBackPosition != null ? (
            <span
              className="field-position-teammate-marker back"
              style={{ left: `${teammateBackPosition}%` }}
              title={`Teammates most back: ${formatShare(teammateBack)}`}
            />
          ) : null}
          {teammateForwardPosition != null ? (
            <span
              className="field-position-teammate-marker forward"
              style={{ left: `${teammateForwardPosition}%` }}
              title={`Teammates most forward: ${formatShare(teammateForward)}`}
            />
          ) : null}
        </div>
        <div className="rotation-depth-tug-labels field-position-tug-labels">
          <span className="rotation-depth-tug-label">
            <span className="rotation-legend-swatch source-segment positioning-segment-role-most_back" />
            Most back
            <strong>{formatShare(mostBack)}</strong>
          </span>
          {hasTeammates ? (
            <span className="field-position-teammate-label">Markers show teammate averages</span>
          ) : null}
          <span className="rotation-depth-tug-label rotation-depth-tug-label-right">
            <strong>{formatShare(mostForward)}</strong>
            Most forward
            <span className="rotation-legend-swatch source-segment positioning-segment-role-most_forward" />
          </span>
        </div>
      </div>
    </div>
  );
}

type KickoffSummaryRole = "taker" | "support";

const kickoffTakerDimensionKeys = ["approach", "taker_outcome", "advantage_result"];
const kickoffSupportDimensionKeys = ["support_behavior", "advantage_result"];

/** Kickoff outcome shares, headline metrics, and per-dimension distributions. */
export function KickoffSummaryPanel({
  role,
  summary,
}: {
  role: KickoffSummaryRole;
  summary: EventStatSummaryResponse;
}) {
  const metric = (key: string) => summary.metrics.find((entry) => entry.key === key)?.value ?? null;
  const wins = metric("win_count") ?? 0;
  const losses = metric("loss_count") ?? 0;
  const neutral = metric("neutral_count") ?? 0;
  const outcomeTotal = wins + losses + neutral;
  // Avg time to touch is conditional on the taker touching at all; show the
  // touch rate alongside so the conditioning is visible.
  const takerCount = metric("taker_count") ?? 0;
  const takerTouchRate = takerCount > 0 ? (metric("touched_count") ?? 0) / takerCount : null;
  // Who the kickoff was actually good for once play settled (possession run,
  // established pressure, or kickoff goal), independent of the immediate
  // win/loss read above. Zero for replay sets processed before the advantage
  // columns existed, in which case the bar is hidden.
  const advantagesFor = metric("advantages_for") ?? 0;
  const advantagesAgainst = metric("advantages_against") ?? 0;
  const noAdvantage = metric("no_advantage_count") ?? 0;
  const advantageTotal = advantagesFor + advantagesAgainst + noAdvantage;
  const kickoffGoalsFor = metric("kickoff_goals_for") ?? 0;
  const kickoffGoalsAgainst = metric("kickoff_goals_against") ?? 0;
  const strengthDimension = summary.dimensions.find(
    (dimension) => dimension.key === "win_strength_result",
  );
  const strengthSegments = kickoffStrengthSegments(strengthDimension);
  const strengthTotal = strengthSegments.reduce((total, segment) => total + segment.value, 0);
  const winRateBars = kickoffWinRateBars(strengthDimension, wins, losses);
  const dimensionKeys = role === "taker" ? kickoffTakerDimensionKeys : kickoffSupportDimensionKeys;
  const dimensions = dimensionKeys
    .map((key) => summary.dimensions.find((dimension) => dimension.key === key))
    .filter((dimension): dimension is EventStatDimensionResponse =>
      Boolean(dimension && dimension.values.length > 0),
    );

  return (
    <section className="chart-panel full-span kickoff-summary-panel">
      <header className="chart-panel-header">
        <h3>{role === "taker" ? "Kickoff taker" : "Kickoff support"}</h3>
        <span>
          {summary.event_count.toLocaleString()}{" "}
          {role === "taker" ? "attempts" : "support appearances"} across{" "}
          {summary.replay_count.toLocaleString()} replays
        </span>
      </header>
      {strengthTotal > 0 ? (
        <KickoffProfileOutcomeBar
          ariaLabel="Kickoff win strength share"
          title="By result"
          segments={strengthSegments}
          total={strengthTotal}
          value={`${strengthTotal.toLocaleString()}×`}
        />
      ) : outcomeTotal > 0 ? (
        <KickoffProfileOutcomeBar
          ariaLabel="Kickoff outcome share"
          title="By result"
          segments={[
            kickoffOutcomeSegment("win", "Won", wins, outcomeTotal),
            kickoffOutcomeSegment("neutral", "Neutral", neutral, outcomeTotal),
            kickoffOutcomeSegment("loss", "Lost", losses, outcomeTotal),
          ]}
          total={outcomeTotal}
          value={`${outcomeTotal.toLocaleString()}×`}
        />
      ) : null}
      <KickoffWinRateBars bars={winRateBars} />
      {advantageTotal > 0 ? (
        <KickoffProfileOutcomeBar
          ariaLabel="Kickoff advantage share"
          title="Advantage"
          segments={[
            kickoffOutcomeSegment("win", "Advantage gained", advantagesFor, advantageTotal),
            kickoffOutcomeSegment("neutral", "No advantage", noAdvantage, advantageTotal),
            kickoffOutcomeSegment("loss", "Advantage conceded", advantagesAgainst, advantageTotal),
          ]}
          total={advantageTotal}
          value={`${advantageTotal.toLocaleString()}×`}
        />
      ) : null}
      <div className="kickoff-profile-bars">
        <KickoffFirstTouchBar
          firstTouches={metric("first_touch_count") ?? 0}
          totalKickoffs={summary.event_count}
        />
        <KickoffGoalBar
          goalsFor={kickoffGoalsFor}
          goalsAgainst={kickoffGoalsAgainst}
          totalKickoffs={summary.event_count}
        />
      </div>
      <div className="kickoff-headline-metrics">
        {role === "taker" ? (
          <>
            <KickoffMetric label="Taker touch rate" value={formatShare(takerTouchRate)} />
            <KickoffMetric
              label="Avg time to touch"
              value={formatSecondsValue(metric("avg_taker_time_to_touch"))}
            />
            {/* avg_boost_used arrives in raw 0-255 replay units; rescale to the 0-100 display scale. */}
            <KickoffMetric
              label="Avg boost used"
              value={formatNumberValue(boostAmountToPercent(metric("avg_boost_used")))}
            />
          </>
        ) : null}
      </div>
      {dimensions.length > 0 ? (
        <div className="kickoff-dimension-grid">
          {dimensions.map((dimension) => (
            <KickoffDimensionList dimension={dimension} key={dimension.key} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

interface KickoffWinRateBarData {
  wins: number;
  losses: number;
  total: number;
}

function KickoffWinRateBars({
  bars,
}: {
  bars: {
    overall: KickoffWinRateBarData;
    clear: KickoffWinRateBarData | null;
  };
}) {
  const hasClearBar = Boolean(bars.clear && bars.clear.total > 0);
  if (bars.overall.total <= 0 && !hasClearBar) return null;
  return (
    <div className="kickoff-profile-bars">
      {bars.overall.total > 0 ? <KickoffWinRateBar title="Overall" data={bars.overall} /> : null}
      {bars.clear && bars.clear.total > 0 ? (
        <KickoffWinRateBar title="Clear" data={bars.clear} />
      ) : null}
    </div>
  );
}

function KickoffWinRateBar({ title, data }: { title: string; data: KickoffWinRateBarData }) {
  return (
    <KickoffProfileBar title={title} value={formatShare(shareOf(data.wins, data.total))}>
      <OutcomeDistributionBar
        ariaLabel={title}
        colors={PLAYER_RELATIVE_OUTCOME_COLORS}
        segments={[
          kickoffProfileSegment("win", "Won", data.wins, data.total),
          kickoffProfileSegment("loss", "Lost", data.losses, data.total),
        ]}
        total={data.total}
      />
    </KickoffProfileBar>
  );
}

function KickoffFirstTouchBar({
  firstTouches,
  totalKickoffs,
}: {
  firstTouches: number;
  totalKickoffs: number;
}) {
  const noFirstTouch = Math.max(0, totalKickoffs - firstTouches);
  return (
    <KickoffProfileBar
      title="First touch"
      value={formatShare(shareOf(firstTouches, totalKickoffs))}
    >
      <OutcomeDistributionBar
        ariaLabel="First touch share"
        colors={PLAYER_RELATIVE_OUTCOME_COLORS}
        segments={[
          kickoffProfileSegment("win", "First touch", firstTouches, totalKickoffs),
          kickoffProfileSegment("loss", "No first touch", noFirstTouch, totalKickoffs),
        ]}
        total={totalKickoffs}
      />
    </KickoffProfileBar>
  );
}

function KickoffProfileOutcomeBar({
  ariaLabel,
  segments,
  title,
  total,
  value,
}: {
  ariaLabel: string;
  segments: OutcomeDistributionSegment[];
  title: string;
  total: number;
  value: ReactNode;
}) {
  return (
    <div className="kickoff-outcome-share">
      <h4>{title}</h4>
      <OutcomeDistributionBar
        ariaLabel={ariaLabel}
        colors={PLAYER_RELATIVE_OUTCOME_COLORS}
        segments={segments}
        total={total}
      />
      <span className="kickoff-profile-bar-value">{value}</span>
    </div>
  );
}

function KickoffGoalBar({
  goalsFor,
  goalsAgainst,
  totalKickoffs,
}: {
  goalsFor: number;
  goalsAgainst: number;
  totalKickoffs: number;
}) {
  const goalTotal = goalsFor + goalsAgainst;
  return (
    <KickoffProfileBar title="Goals" value={`${goalTotal.toLocaleString()}×`}>
      <OutcomeDistributionBar
        ariaLabel="Team kickoff goals for versus against balance"
        colors={PLAYER_RELATIVE_OUTCOME_COLORS}
        segments={[
          kickoffGoalBalanceSegment("win", "For", goalsFor, goalTotal, totalKickoffs),
          kickoffGoalBalanceSegment("loss", "Against", goalsAgainst, goalTotal, totalKickoffs),
        ]}
        total={goalTotal}
      />
    </KickoffProfileBar>
  );
}

function KickoffProfileBar({
  title,
  children,
  value,
}: {
  title: string;
  children: ReactNode;
  value?: ReactNode;
}) {
  return (
    <div className="kickoff-profile-bar">
      <h4>{title}</h4>
      {children}
      <span className="kickoff-profile-bar-value">{value ?? ""}</span>
    </div>
  );
}

function kickoffWinRateBars(
  dimension: EventStatDimensionResponse | undefined,
  fallbackWins: number,
  fallbackLosses: number,
): {
  overall: KickoffWinRateBarData;
  clear: KickoffWinRateBarData | null;
} {
  if (!dimension) {
    const total = fallbackWins + fallbackLosses;
    return {
      overall: { wins: fallbackWins, losses: fallbackLosses, total },
      clear: null,
    };
  }
  const count = (key: string) => dimension.values.find((value) => value.key === key)?.count ?? 0;
  const overallWins =
    count("win_narrow") + count("win_clear") + count("win_strong") + count("win_unknown");
  const overallLosses =
    count("loss_narrow") + count("loss_clear") + count("loss_strong") + count("loss_unknown");
  const clearWins = count("win_clear") + count("win_strong");
  const clearLosses = count("loss_clear") + count("loss_strong");
  return {
    overall: {
      wins: overallWins,
      losses: overallLosses,
      total: overallWins + overallLosses,
    },
    clear: {
      wins: clearWins,
      losses: clearLosses,
      total: clearWins + clearLosses,
    },
  };
}

function kickoffProfileSegment(
  id: "win" | "neutral" | "loss",
  label: string,
  value: number,
  total: number,
  showVisibleLabel = true,
): OutcomeDistributionSegment {
  const share = total > 0 ? value / total : 0;
  return {
    key: id,
    tone: id === "win" ? "positive" : id === "loss" ? "negative" : "neutral",
    label,
    value,
    visibleLabel: showVisibleLabel && value > 0 ? `${label} ${formatShare(share)}` : undefined,
    title: statPercentWithValue(formatShare(share), value.toLocaleString(), label),
  };
}

function kickoffGoalBalanceSegment(
  id: "win" | "loss",
  label: string,
  value: number,
  balanceTotal: number,
  totalKickoffs: number,
): OutcomeDistributionSegment {
  const balanceShare = balanceTotal > 0 ? value / balanceTotal : 0;
  const kickoffShare = totalKickoffs > 0 ? value / totalKickoffs : 0;
  const totalKickoffShare = formatDetailedShare(kickoffShare);
  return {
    key: id,
    tone: id === "win" ? "positive" : "negative",
    label,
    value,
    visibleLabel:
      value > 0 ? `${label} ${formatShare(balanceShare)} (${totalKickoffShare})` : undefined,
    title: `${label}: ${formatShare(balanceShare)} of kickoff goals; ${totalKickoffShare} of all kickoffs (${value.toLocaleString()})`,
  };
}

function KickoffMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="kickoff-headline-metric">
      <span className="subtle">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function KickoffDimensionList({ dimension }: { dimension: EventStatDimensionResponse }) {
  const total = dimension.values.reduce((sum, value) => sum + value.count, 0);
  return (
    <div className="kickoff-dimension">
      <h4>{dimension.label}</h4>
      <div className="rate-chart-rows">
        {dimension.values.map((value) => (
          <div className="rate-chart-row kickoff-dimension-row" key={value.key ?? "unknown"}>
            <div className="rate-chart-label" title={value.display_name}>
              {value.display_name}
            </div>
            <div
              className="rate-chart-track"
              aria-label={`${dimension.label}: ${value.display_name}`}
            >
              <ComparisonBar
                ariaLabel={`${dimension.label}: ${value.display_name}`}
                maxValue={total}
                segments={[
                  {
                    key: "value",
                    className: "kickoff-dimension-fill",
                    label: value.display_name,
                    value: value.count,
                    visibleLabel:
                      value.count > 0
                        ? formatShare(total > 0 ? value.count / total : null)
                        : undefined,
                    title: shareTitle(
                      value.display_name,
                      total > 0 ? value.count / total : null,
                      value.count,
                    ),
                  },
                ]}
                total={value.count}
                placeholder={formatShare(total > 0 ? value.count / total : null)}
              />
            </div>
            <div className="rate-chart-value">
              <strong>{formatShare(total > 0 ? value.count / total : null)}</strong>
              <span className="subtle"> {value.count.toLocaleString()}×</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function kickoffOutcomeSegment(
  id: string,
  label: string,
  value: number,
  total: number,
): OutcomeDistributionSegment {
  const share = total > 0 ? value / total : 0;
  return {
    key: id,
    tone: id === "win" ? "positive" : id === "loss" ? "negative" : "neutral",
    label,
    value,
    visibleLabel: value > 0 ? `${label} ${formatShare(share)}` : undefined,
    title: statPercentWithValue(formatShare(share), value.toLocaleString(), label),
  };
}

function kickoffStrengthSegments(
  dimension: EventStatDimensionResponse | undefined,
): OutcomeDistributionSegment[] {
  if (!dimension) return [];
  const order = [
    "win_strong",
    "win_clear",
    "win_narrow",
    "win_unknown",
    "neutral",
    "loss_narrow",
    "loss_clear",
    "loss_strong",
    "loss_unknown",
  ];
  const counts = new Map(dimension.values.map((value) => [value.key ?? "unknown", value.count]));
  const total = dimension.values.reduce((sum, value) => sum + value.count, 0);
  return order
    .map((key) => ({ key, count: counts.get(key) ?? 0 }))
    .filter(({ count }) => count > 0)
    .map(({ key, count }) => kickoffStrengthSegment(key, count, total));
}

function kickoffStrengthSegment(
  key: string,
  value: number,
  total: number,
): OutcomeDistributionSegment {
  const share = total > 0 ? value / total : 0;
  const outcome = key.startsWith("win_") ? "win" : key.startsWith("loss_") ? "loss" : "neutral";
  const label = kickoffStrengthLabel(key);
  return {
    key,
    tone: outcome === "win" ? "positive" : outcome === "loss" ? "negative" : "neutral",
    level: kickoffStrengthLevel(key),
    label,
    value,
    visibleLabel: value > 0 ? `${label} ${formatShare(share)}` : undefined,
    title: statPercentWithValue(formatShare(share), value.toLocaleString(), label),
  };
}

function kickoffStrengthLevel(key: string): OutcomeDistributionLevel {
  if (key.endsWith("_strong")) return "strong";
  if (key.endsWith("_clear")) return "clear";
  if (key.endsWith("_narrow")) return "narrow";
  return "unknown";
}

function kickoffStrengthLabel(key: string): string {
  switch (key) {
    case "win_strong":
      return "Strong win";
    case "win_clear":
      return "Clear win";
    case "win_narrow":
      return "Narrow win";
    case "win_unknown":
      return "Win";
    case "loss_narrow":
      return "Narrow loss";
    case "loss_clear":
      return "Clear loss";
    case "loss_strong":
      return "Strong loss";
    case "loss_unknown":
      return "Loss";
    case "neutral":
      return "Neutral";
    default:
      return key.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
  }
}

function orderTimeSharesBySuffix(
  shares: RotationTimeShareResponse[],
  suffixForKey: (key: string) => string,
  order: string[],
): RotationTimeShareResponse[] {
  return shares
    .slice()
    .sort(
      (left, right) =>
        orderSuffixIndex(suffixForKey(left.key), order) -
        orderSuffixIndex(suffixForKey(right.key), order),
    );
}

function orderSuffixIndex(suffix: string, order: string[]): number {
  const index = order.indexOf(suffix);
  return index === -1 ? order.length : index;
}

function shareOf(value: number | null, total: number | null): number | null {
  if (value == null || total == null || total <= 0) return null;
  return value / total;
}

function barPercent(value: number, max: number): number {
  if (max <= 0) return 0;
  return Math.max(0, Math.min(100, (value / max) * 100));
}

function shareTitle(label: string, share: number | null, count: number): string {
  return `${label}: ${count.toLocaleString()} (${formatShare(share)})`;
}

function formatShare(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "–";
  return `${Math.round(value * 100)}%`;
}

function formatDetailedShare(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "–";
  return `${(value * 100).toFixed(2)}%`;
}

function formatRate(value: number): string {
  if (!Number.isFinite(value)) return "–";
  const absolute = Math.abs(value);
  if (absolute >= 100) return value.toFixed(0);
  return value.toFixed(absolute >= 10 ? 1 : 2);
}

function formatSecondsValue(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "–";
  return `${value.toFixed(2)}s`;
}

function formatNumberValue(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "–";
  return formatRate(value);
}

function formatDurationSeconds(value: number): string {
  const totalSeconds = Math.round(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Career possession summary: how often and how long the player holds the
 * ball, what they do with it (advance, carry, take it airborne or up the
 * wall), and how their first touches resolve.
 */
export function PossessionSummaryPanel({
  playerName = "Player",
  summary,
}: {
  playerName?: string;
  summary: PossessionSummaryResponse;
}) {
  const allSubjects = possessionProfileSubjects(summary, playerName);
  const hasRankPeers = allSubjects.some((subject) => subject.cohortKey === "rank_peers");
  const [showRankPeers, setShowRankPeers] = useState(true);
  const subjects =
    hasRankPeers && !showRankPeers
      ? allSubjects.filter((subject) => subject.cohortKey !== "rank_peers")
      : allSubjects;

  return (
    <>
      {hasRankPeers ? (
        <div className="possession-profile-controls">
          <span>Same-rank comparison</span>
          <div
            className="boost-comparison-tabs possession-rank-peer-toggle"
            role="group"
            aria-label="Rank peer comparison"
          >
            <button
              className={showRankPeers ? "active" : ""}
              onClick={() => setShowRankPeers(true)}
              type="button"
              aria-pressed={showRankPeers}
            >
              Show
            </button>
            <button
              className={showRankPeers ? "" : "active"}
              onClick={() => setShowRankPeers(false)}
              type="button"
              aria-pressed={!showRankPeers}
            >
              Hide
            </button>
          </div>
        </div>
      ) : null}
      <PossessionAdvancedComparisonGrid
        className="possession-profile-grid"
        subjects={subjects.map(possessionAdvancedProfileSubject)}
      />
    </>
  );
}

interface PossessionProfileSubject {
  key: string;
  cohortKey: CareerCohortKey;
  name: string;
  subtitle: string;
  appearances: number;
  activeTimeSeconds: number | null;
  cohort: PossessionSummaryResponse["cohorts"][number];
  segmentClassName: string;
}

function possessionProfileSubjects(
  summary: PossessionSummaryResponse,
  playerName: string,
): PossessionProfileSubject[] {
  const responseCohorts = summary.cohorts ?? [];
  const cohorts: PossessionSummaryResponse["cohorts"] =
    responseCohorts.length > 0
      ? responseCohorts
      : [
          {
            key: "player",
            label: playerName,
            appearance_count: summary.replay_count,
            active_time_seconds: null,
            possessions: summary.possessions,
            controlled_plays: summary.controlled_plays,
            touches: summary.touches,
            locations: summary.locations,
          },
        ];

  return cohorts.map((cohort) => {
    const cohortKey = careerCohortKey(cohort.key) ?? "rank_peers";
    return {
      key: cohort.key,
      cohortKey,
      name: careerCohortLabel(cohortKey, playerName),
      subtitle: careerCohortSubtitle(cohortKey),
      appearances: cohort.appearance_count,
      activeTimeSeconds: cohort.active_time_seconds,
      cohort,
      segmentClassName: careerCohortSegmentClassName(cohortKey),
    };
  });
}

function possessionAdvancedProfileSubject(
  subject: PossessionProfileSubject,
): PossessionAdvancedSubject {
  return {
    key: subject.key,
    name: subject.name,
    label: possessionAdvancedCohortLabel({
      appearanceCount: subject.appearances,
      className: careerCohortClassName(subject.cohortKey),
      name: subject.name,
      subtitle: subject.subtitle,
    }),
    activeTimeSeconds: subject.activeTimeSeconds,
    cohort: subject.cohort,
    segmentClassName: subject.segmentClassName,
  };
}
