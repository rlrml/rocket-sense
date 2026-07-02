import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type {
  EventStatDimensionResponse,
  EventStatSummaryResponse,
  MvpSummaryResponse,
  PlayerStatOverviewResponse,
  PossessionSummaryResponse,
  PossessionTeamControl,
  PossessionTeamMetric,
  RankBenchmarkCohort,
  RotationTimeShareResponse,
  StatAggregateResponse,
  StatAggregateSetResponse,
} from "../types";
import { boostAmountToPercent } from "./boostUnits";
import { isIgnoredGoalTag } from "./goalTagFilters";
import {
  careerCohortClassName,
  careerCohortKey,
  careerCohortLabel,
  careerCohortSegmentClassName,
  careerCohortSubtitle,
  careerRateValue,
  careerRateWindowLabel,
  type CareerCohortKey,
  type ComparisonCard,
  ComparisonCardGrid,
  ComparisonBar,
  OutcomeDistributionBar,
  PLAYER_RELATIVE_OUTCOME_COLORS,
  rankCohortDerivedRows,
  rankCohortMagnitudeRows,
  rankCohortValues,
  StatPlayerLabel,
  statPercentWithValue,
  type ComparisonMarker,
  type ComparisonRow,
  type OutcomeDistributionLevel,
  type OutcomeDistributionSegment,
} from "./shared";
import {
  PossessionAdvancedCharts,
  possessionAdvancedCohortLabel,
  type PossessionAdvancedSubject,
} from "./possessionAdvanced";

const rateChartStatLimit = 12;
const rateWindowMinutes = 5;

/**
 * Career fallback for stat sections without a purpose-built profile subview.
 * Each card is one stat; rows compare the profile subject to available cohorts.
 */
export function buildPlayerRateCards(
  stats: StatAggregateResponse[],
  playerName = "Player",
  // Selected rank-average cohorts; each adds one slate-shaded row per card,
  // looked up by the card's stat key (the benchmark metric_key). Empty when the
  // feature is disabled or no rank is selected.
  rankCohorts: RankBenchmarkCohort[] = [],
  rankWindowLabel?: string | null,
  // When provided (wins/losses split), build exactly these cards in this order,
  // regardless of how this side ranks them, so both outcome sides show the same
  // card set; a canonical key absent from this side renders an empty placeholder
  // card so the rows still pair up across outcomes.
  orderedKeys?: Array<{ key: string; display_name: string }>,
  // When provided and it returns a path for a stat key, that card's title links
  // to it (e.g. a clip playlist of those events).
  titleHref?: (key: string) => string | undefined,
): ComparisonCard[] {
  const cardTitle = (key: string, displayName: string): ReactNode => {
    const href = titleHref?.(key);
    return href ? (
      <Link className="rate-card-title-link" to={href} title={`Watch ${displayName} clips`}>
        {displayName}
      </Link>
    ) : (
      displayName
    );
  };
  if (orderedKeys) {
    const statByKey = new Map(stats.map((stat) => [stat.key, stat]));
    return orderedKeys.slice(0, rateChartStatLimit).map(({ key, display_name }) => {
      const stat = statByKey.get(key);
      return {
        key,
        title: cardTitle(key, display_name),
        rows: stat ? playerRateComparisonRows(stat, playerName, rankCohorts, rankWindowLabel) : [],
      };
    });
  }
  return stats
    .filter((stat) => stat.per_active_minute != null)
    .slice(0, rateChartStatLimit)
    .map((stat) => ({
      key: stat.key,
      title: cardTitle(stat.key, stat.display_name),
      rows: playerRateComparisonRows(stat, playerName, rankCohorts, rankWindowLabel),
    }))
    .filter((card) => card.rows.length > 0);
}

export function PlayerRateComparisonChart({
  playerName = "Player",
  stats,
  rankCohorts = [],
  rankWindowLabel,
  orderedKeys,
}: {
  playerName?: string;
  stats: StatAggregateResponse[];
  rankCohorts?: RankBenchmarkCohort[];
  rankWindowLabel?: string | null;
  orderedKeys?: Array<{ key: string; display_name: string }>;
}) {
  const cards = buildPlayerRateCards(stats, playerName, rankCohorts, rankWindowLabel, orderedKeys);
  if (cards.length === 0) {
    return null;
  }
  return <ComparisonCardGrid cards={cards} />;
}

function playerRateComparisonRows(
  stat: StatAggregateResponse,
  playerName: string,
  rankCohorts: RankBenchmarkCohort[] = [],
  rankWindowLabel?: string | null,
): ComparisonRow[] {
  const playerRate = (stat.per_active_minute ?? 0) * rateWindowMinutes;
  const teammateRate =
    stat.teammate_per_active_minute != null
      ? stat.teammate_per_active_minute * rateWindowMinutes
      : null;
  const opponentRate =
    stat.opponent_per_active_minute != null
      ? stat.opponent_per_active_minute * rateWindowMinutes
      : null;
  // Fold every selected rank's per-5-min value into the shared scale so the new
  // rows don't overflow the track.
  const rankRates = rankCohorts
    .map((cohort) => cohort.per_stat[stat.key]?.value)
    .filter((value): value is number => value != null && Number.isFinite(value))
    .map((value) => value * rateWindowMinutes);
  const maxValue = Math.max(1, playerRate, teammateRate ?? 0, opponentRate ?? 0, ...rankRates);
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
  if (opponentRate != null) {
    rows.push(
      playerRateComparisonRow({
        cohortKey: "opponents",
        count: stat.opponent_event_count,
        maxValue,
        playerName,
        rate: opponentRate,
        statName: stat.display_name,
      }),
    );
  }
  // One slate-shaded row per selected rank, looked up by this stat's metric_key.
  rows.push(
    ...rankCohortMagnitudeRows({
      cohorts: rankCohorts,
      metricKey: stat.key,
      toValue: (raw) => raw * rateWindowMinutes,
      format: (value) => `${formatRate(value)}/5m`,
      maxValue,
      windowLabel: rankWindowLabel,
      valueColumn: false,
    }),
  );
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
  // Only the player/teammates/opponents cohorts route through here; rank-average
  // rows are built by `rankCohortMagnitudeRows`.
  cohortKey: CareerCohortKey;
  count?: number;
  maxValue: number;
  playerName: string;
  rate: number;
  statName: string;
}): ComparisonRow {
  const formatted = formatRate(rate);
  const rateLabel = `${formatted}/5m`;
  const cohortLabel = careerCohortLabel(cohortKey, playerName);
  const totalKind = cohortKey === "player" ? "total" : "pooled total";
  const subtitle = `${careerCohortSubtitle(cohortKey)} · ${(count ?? 0).toLocaleString()} ${totalKind}`;
  const segmentTitle = `${rateLabel} (${(count ?? 0).toLocaleString()} ${totalKind})`;
  return {
    key: cohortKey,
    label: (
      <StatPlayerLabel
        className={careerCohortClassName(cohortKey)}
        name={cohortLabel}
        platform={null}
        platformPlayerId={null}
        profilePath={null}
        rank={null}
        showPlatformBadge={false}
        subtitle={subtitle}
      />
    ),
    ariaLabel: `${cohortLabel}: ${rateLabel} ${careerRateWindowLabel(rateWindowMinutes * 60)}`,
    segments: [
      {
        key: "rate",
        className: careerCohortSegmentClassName(cohortKey),
        label: statName,
        value: Math.max(0, rate),
        visibleLabel: rate > 0 ? rateLabel : undefined,
        title: segmentTitle,
      },
    ],
    total: Math.max(0, rate),
    maxValue,
    valueLabel: (
      <span title={`${(count ?? 0).toLocaleString()} ${totalKind}`}>
        {(count ?? 0).toLocaleString()} total
      </span>
    ),
    placeholder: rateLabel,
  };
}

function RateComparisonBar({
  ariaLabel,
  maxValue,
  playerLabel,
  playerName = "Player",
  playerRate,
  playerTitle,
  opponentRate,
  opponentTitle,
  teammateRate,
  teammateTitle,
}: {
  ariaLabel: string;
  maxValue: number;
  playerLabel: string;
  playerName?: string;
  playerRate: number;
  playerTitle?: string;
  opponentRate?: number | null;
  opponentTitle?: string;
  teammateRate: number | null;
  teammateTitle?: string;
}) {
  const markers = [];
  if (teammateRate != null) {
    markers.push({
      key: "teammates",
      className: careerCohortClassName("teammates"),
      label: "Teammates",
      value: Math.max(0, teammateRate),
      title: teammateTitle ?? `Teammates: ${formatRate(teammateRate)} per ${rateWindowMinutes} min`,
    });
  }
  if (opponentRate != null) {
    markers.push({
      key: "opponents",
      className: careerCohortClassName("opponents"),
      label: "Opponents",
      value: Math.max(0, opponentRate),
      title: opponentTitle ?? `Opponents: ${formatRate(opponentRate)} per ${rateWindowMinutes} min`,
    });
  }

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
          title: playerTitle ?? `${playerName}: ${playerLabel} per ${rateWindowMinutes} min`,
        },
      ]}
      total={Math.max(0, playerRate)}
      markers={markers}
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
  opponentEventCount: number;
  opponentPerActiveMinute: number | null;
}

export function CoreProfileComparison(props: {
  overview: PlayerStatOverviewResponse;
  playerName: string;
  stats: StatAggregateResponse[];
  view?: CoreProfileView;
}) {
  return <ComparisonCardGrid cards={buildCoreProfileCards(props)} />;
}

// The Core section's metric cards, as data. The combined view renders them in a
// single grid; the wins/losses split adds each card as its own pairable panel so
// that — once the columns stack on a phone — a metric's win and loss cards sit
// adjacent instead of all the wins landing above all the losses.
export function buildCoreProfileCards({
  overview,
  playerName,
  stats,
  view = "player",
  rankCohorts = [],
  rankWindowLabel,
}: {
  overview: PlayerStatOverviewResponse;
  playerName: string;
  stats: StatAggregateResponse[];
  // "player" compares the player to per-player teammate/opponent averages.
  // "team" sums the whole team (player + teammates) vs the opponent team and
  // shows per-game team totals (no per-player division).
  view?: CoreProfileView;
  // Rank-average cohorts add a slate row per selected rank to the per-player
  // count cards (goals/assists/shots/saves/demos/deaths). The team view shows
  // per-game team totals, which the per-player benchmark doesn't map onto, so
  // rank rows are player-view only.
  rankCohorts?: RankBenchmarkCohort[];
  rankWindowLabel?: string | null;
}): ComparisonCard[] {
  const demos = aggregateProfileRateStat("demos", "Demos", stats, isDemoStat);
  const deaths = aggregateProfileRateStat("deaths", "Deaths", stats, isDeathStat);
  const score = scoringRateOrZero(overview.score);
  const goals = scoringRateOrZero(overview.goals);
  const assists = scoringRateOrZero(overview.assists);
  const shots = scoringRateOrZero(overview.shots);
  const saves = scoringRateOrZero(overview.saves);
  // MVP is a single-player crown (one per game) compared against a fair-share
  // baseline, so it only renders in the player view; there is no teammate/
  // opponent MVP breakdown in the response to pool into a team total.
  const mvpRows = mvpComparisonRows(overview.mvp, playerName);
  const cards =
    view === "team"
      ? [
          teamRateCard("score", "Score (per game)", score, overview.replay_count),
          teamRateCard("goals", "Goals (per game)", goals, overview.replay_count),
          teamRateCard("assists", "Assists (per game)", assists, overview.replay_count),
          teamRateCard("shots", "Shots (per game)", shots, overview.replay_count),
          teamRateCard("saves", "Saves (per game)", saves, overview.replay_count),
          {
            key: "demos",
            title: "Demos (per game)",
            rows: teamCountCardRows(
              "Demos",
              demos.eventCount + demos.teammateEventCount,
              demos.opponentEventCount,
              overview.replay_count,
            ),
          },
          {
            key: "deaths",
            title: "Deaths (per game)",
            rows: teamCountCardRows(
              "Deaths",
              deaths.eventCount + deaths.teammateEventCount,
              deaths.opponentEventCount,
              overview.replay_count,
            ),
          },
          {
            key: "shooting-percentage",
            title: "Shooting percentage (%)",
            rows: teamPercentageCardRows(
              "Shooting percentage",
              "goals/shots",
              goals.count + goals.teammate_count,
              shots.count + shots.teammate_count,
              goals.opponent_count,
              shots.opponent_count,
            ),
          },
          {
            key: "assist-percentage",
            title: "Assist percentage (%)",
            // Team assist rate is the team's assists over the team's goals; the
            // per-player self-scored-goal adjustment used in the player view
            // does not apply once the whole team is pooled.
            rows: teamPercentageCardRows(
              "Assist percentage",
              "assists/goals",
              assists.count + assists.teammate_count,
              goals.count + goals.teammate_count,
              assists.opponent_count,
              goals.opponent_count,
            ),
          },
        ]
      : [
          ...(mvpRows.length > 0 ? [{ key: "mvp", title: "MVP rate", rows: mvpRows }] : []),
          rateCardFromOverview(
            "score",
            "Score (per 5 min)",
            score,
            playerName,
            rankCohorts,
            "score",
            rankWindowLabel,
          ),
          rateCardFromOverview(
            "goals",
            "Goals (per 5 min)",
            goals,
            playerName,
            rankCohorts,
            "goal",
            rankWindowLabel,
          ),
          rateCardFromOverview(
            "assists",
            "Assists (per 5 min)",
            assists,
            playerName,
            rankCohorts,
            "assist",
            rankWindowLabel,
          ),
          rateCardFromOverview(
            "shots",
            "Shots (per 5 min)",
            shots,
            playerName,
            rankCohorts,
            "shot",
            rankWindowLabel,
          ),
          rateCardFromOverview(
            "saves",
            "Saves (per 5 min)",
            saves,
            playerName,
            rankCohorts,
            "save",
            rankWindowLabel,
          ),
          {
            key: "demos",
            title: "Demos (per 5 min)",
            rows: profileRateComparisonRows(
              demos,
              playerName,
              rankCohorts,
              "demolition",
              rankWindowLabel,
            ),
          },
          {
            key: "deaths",
            title: "Deaths (per 5 min)",
            rows: profileRateComparisonRows(
              deaths,
              playerName,
              rankCohorts,
              "death",
              rankWindowLabel,
            ),
          },
          {
            key: "shooting-percentage",
            title: "Shooting percentage (%)",
            rows: shootingPercentageRows(goals, shots, playerName, rankCohorts, rankWindowLabel),
          },
          {
            key: "assist-percentage",
            title: "Assist percentage (%)",
            rows: assistPercentageRows(
              goals,
              assists,
              playerName,
              overview.team_size,
              rankCohorts,
              rankWindowLabel,
            ),
          },
        ];

  return cards;
}

/**
 * MVP rate as a single magnitude bar (player's MVPs/game) with the fair-share
 * baseline drawn as a reference marker. MVP is a per-game crown — at most one per
 * replay — so the field always averages to its fair share; the marker is what
 * makes a player's rate read as above or below expectation. Returns no rows when
 * the set has no games (rate is null) or MVP data is absent (older responses).
 */
function mvpComparisonRows(
  mvp: MvpSummaryResponse | undefined,
  playerName: string,
): ComparisonRow[] {
  if (!mvp || mvp.rate == null) return [];
  const rate = Math.max(0, mvp.rate);
  const fairShare = mvp.fair_share_rate != null ? Math.max(0, mvp.fair_share_rate) : null;
  // Scale so an at-expectation rate sits near mid-track and the marker stays
  // visible, while a standout rate still reads as filling most of the bar.
  const maxValue = Math.max(rate * 1.15, (fairShare ?? 0) * 2, 0.05);
  const rateLabel = formatMvpRate(rate);
  const markers: ComparisonMarker[] =
    fairShare == null
      ? []
      : [
          {
            key: "fair-share",
            className: "mvp-fair-share-marker",
            label: "Fair share",
            value: fairShare,
            title: `Fair share: ${formatMvpRate(
              fairShare,
            )} — expected if you and your winning teammates split MVP evenly`,
          },
        ];
  return [
    {
      key: "player",
      label: (
        <StatPlayerLabel
          className={careerCohortClassName("player")}
          name={careerCohortLabel("player", playerName)}
          platform={null}
          platformPlayerId={null}
          profilePath={null}
          rank={null}
          showPlatformBadge={false}
          subtitle={`${careerCohortSubtitle("player")} · ${mvp.count.toLocaleString()} MVPs`}
        />
      ),
      ariaLabel: `${playerName}: MVP in ${rateLabel} of games${
        fairShare != null ? `, fair share ${formatMvpRate(fairShare)}` : ""
      }`,
      segments: [
        {
          key: "rate",
          className: careerCohortSegmentClassName("player"),
          label: "MVP rate",
          value: rate,
          visibleLabel: rate > 0 ? rateLabel : undefined,
          title: `${rateLabel} MVP rate (${mvp.count.toLocaleString()} MVPs)`,
        },
      ],
      total: rate,
      maxValue,
      markers,
      valueLabel: <span title={`${mvp.count.toLocaleString()} MVPs`}>{rateLabel}</span>,
      placeholder: rateLabel,
    },
  ];
}

function formatMvpRate(rate: number): string {
  const percent = rate * 100;
  // Sub-1% rates round to "0%" otherwise; keep one decimal so a rare MVP shows.
  const digits = percent > 0 && percent < 1 ? 1 : 0;
  return `${percent.toFixed(digits)}%`;
}

function rateCardFromOverview(
  key: string,
  title: string,
  rate: ScoringRateLike,
  playerName: string,
  rankCohorts: RankBenchmarkCohort[] = [],
  metricKey?: string,
  rankWindowLabel?: string | null,
) {
  const stat: ProfileRateStat = {
    key,
    displayName: title,
    eventCount: rate.count,
    perActiveMinute: rate.per_active_minute,
    teammateEventCount: rate.teammate_count,
    teammatePerActiveMinute: rate.teammate_per_active_minute,
    opponentEventCount: rate.opponent_count,
    opponentPerActiveMinute: rate.opponent_per_active_minute,
  };
  return {
    key,
    title,
    rows: profileRateComparisonRows(stat, playerName, rankCohorts, metricKey, rankWindowLabel),
  };
}

interface ScoringRateLike {
  count: number;
  per_active_minute: number | null;
  teammate_count: number;
  teammate_per_active_minute: number | null;
  opponent_count: number;
  opponent_per_active_minute: number | null;
}

function scoringRateOrZero(rate: ScoringRateLike | null | undefined): ScoringRateLike {
  return {
    count: rate?.count ?? 0,
    per_active_minute: rate?.per_active_minute ?? null,
    teammate_count: rate?.teammate_count ?? 0,
    teammate_per_active_minute: rate?.teammate_per_active_minute ?? null,
    opponent_count: rate?.opponent_count ?? 0,
    opponent_per_active_minute: rate?.opponent_per_active_minute ?? null,
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
  const opponentEventCount = matches.reduce((total, stat) => total + stat.opponent_event_count, 0);
  return {
    key,
    displayName,
    eventCount,
    perActiveMinute: sumNullableRates(matches.map((stat) => stat.per_active_minute)),
    teammateEventCount,
    teammatePerActiveMinute: sumNullableRates(
      matches.map((stat) => stat.teammate_per_active_minute),
    ),
    opponentEventCount,
    opponentPerActiveMinute: sumNullableRates(
      matches.map((stat) => stat.opponent_per_active_minute),
    ),
  };
}

function profileRateComparisonRows(
  stat: ProfileRateStat,
  playerName: string,
  rankCohorts: RankBenchmarkCohort[] = [],
  // The benchmark metric_key for this stat (e.g. "goal"); omit for stats with no
  // benchmark counterpart (e.g. score) so no rank rows are added.
  metricKey?: string,
  rankWindowLabel?: string | null,
): ComparisonRow[] {
  const playerRate = (stat.perActiveMinute ?? 0) * rateWindowMinutes;
  const teammateRate =
    stat.teammatePerActiveMinute != null ? stat.teammatePerActiveMinute * rateWindowMinutes : null;
  const opponentRate =
    stat.opponentPerActiveMinute != null ? stat.opponentPerActiveMinute * rateWindowMinutes : null;
  const rankRates = metricKey
    ? rankCohortValues(rankCohorts, metricKey, (raw) => raw * rateWindowMinutes)
    : [];
  const maxValue = Math.max(1, playerRate, teammateRate ?? 0, opponentRate ?? 0, ...rankRates);
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
  if (opponentRate != null || stat.opponentEventCount > 0) {
    rows.push(
      playerRateComparisonRow({
        cohortKey: "opponents",
        count: stat.opponentEventCount,
        maxValue,
        playerName,
        rate: opponentRate ?? 0,
        statName: stat.displayName,
      }),
    );
  }
  if (metricKey) {
    rows.push(
      ...rankCohortMagnitudeRows({
        cohorts: rankCohorts,
        metricKey,
        toValue: (raw) => raw * rateWindowMinutes,
        format: (value) => `${formatRate(value)}/5m`,
        maxValue,
        windowLabel: rankWindowLabel,
        valueColumn: false,
      }),
    );
  }
  return rows;
}

function shootingPercentageRows(
  goals: ScoringRateLike,
  shots: ScoringRateLike,
  playerName: string,
  rankCohorts: RankBenchmarkCohort[] = [],
  rankWindowLabel?: string | null,
): ComparisonRow[] {
  const playerPercentage = percentage(goals.count, shots.count);
  const teammatePercentage = percentage(goals.teammate_count, shots.teammate_count);
  const opponentPercentage = percentage(goals.opponent_count, shots.opponent_count);
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
  if (opponentPercentage != null || shots.opponent_count > 0) {
    rows.push(
      percentageComparisonRow({
        cohortKey: "opponents",
        denominator: shots.opponent_count,
        label: formatPercentage(opponentPercentage),
        maxValue: 100,
        numerator: goals.opponent_count,
        playerName,
        value: opponentPercentage ?? 0,
      }),
    );
  }
  // Typical-rank shooting %: the rank's goal rate over its shot rate (the
  // per-minute denominators cancel).
  rows.push(
    ...rankCohortDerivedRows({
      cohorts: rankCohorts,
      derive: (perStat) => {
        const goalRate = perStat.goal?.value;
        const shotRate = perStat.shot?.value;
        if (goalRate == null || shotRate == null || shotRate <= 0) return null;
        return (goalRate / shotRate) * 100;
      },
      format: (value) => formatPercentage(value),
      maxValue: 100,
      windowLabel: rankWindowLabel,
      valueColumn: false,
    }),
  );
  return rows;
}

function assistPercentageRows(
  goals: ScoringRateLike,
  assists: ScoringRateLike,
  playerName: string,
  teamSize?: number | null,
  rankCohorts: RankBenchmarkCohort[] = [],
  rankWindowLabel?: string | null,
): ComparisonRow[] {
  const teamGoals = goals.count + goals.teammate_count;
  const opponentTeamGoals = goals.opponent_count;
  // Assist percentage is over goals the cohort could have assisted. For the
  // individual player that excludes the goals they scored themselves (you can't
  // assist your own goal), so the denominator is the goals their teammates
  // scored.
  const playerAssistableGoals = goals.teammate_count;
  const playerPercentage = percentage(assists.count, playerAssistableGoals);
  // The teammate cohort normally keeps the full team-goal denominator: in a pool
  // a teammate can assist another teammate's goal, so self-scored goals can't be
  // subtracted cleanly. In 2v2 there is exactly one teammate per game, whose only
  // assistable goals are the player's own — so the denominator collapses to the
  // player's goals, mirroring the player row. We only apply that when the whole
  // set is doubles; mixing in 3v3 would make the player-goals denominator too
  // small and inflate the percentage.
  const teammateAssistableGoals = teamSize === 2 ? goals.count : teamGoals;
  // The opponent cohort is the entire other team, so subtracting their goals
  // would leave nothing; keep the full opponent-goal denominator.
  const teammatePercentage = percentage(assists.teammate_count, teammateAssistableGoals);
  const opponentPercentage = percentage(assists.opponent_count, opponentTeamGoals);
  const rows: ComparisonRow[] = [
    percentageComparisonRow({
      cohortKey: "player",
      denominator: playerAssistableGoals,
      label: formatPercentage(playerPercentage),
      maxValue: 100,
      numerator: assists.count,
      playerName,
      statName: "Assist percentage",
      totalName: "assists/assistable goals",
      value: playerPercentage ?? 0,
    }),
  ];
  if (teammatePercentage != null || assists.teammate_count > 0) {
    rows.push(
      percentageComparisonRow({
        cohortKey: "teammates",
        denominator: teammateAssistableGoals,
        label: formatPercentage(teammatePercentage),
        maxValue: 100,
        numerator: assists.teammate_count,
        playerName,
        statName: "Assist percentage",
        totalName: teamSize === 2 ? "assists/your goals" : "assists/team goals",
        value: teammatePercentage ?? 0,
      }),
    );
  }
  if (opponentPercentage != null || assists.opponent_count > 0) {
    rows.push(
      percentageComparisonRow({
        cohortKey: "opponents",
        denominator: opponentTeamGoals,
        label: formatPercentage(opponentPercentage),
        maxValue: 100,
        numerator: assists.opponent_count,
        playerName,
        statName: "Assist percentage",
        totalName: "assists/team goals",
        value: opponentPercentage ?? 0,
      }),
    );
  }
  // Typical-rank assist %: the rank's assist rate over its goal rate.
  rows.push(
    ...rankCohortDerivedRows({
      cohorts: rankCohorts,
      derive: (perStat) => {
        const assistRate = perStat.assist?.value;
        const goalRate = perStat.goal?.value;
        if (assistRate == null || goalRate == null || goalRate <= 0) return null;
        return (assistRate / goalRate) * 100;
      },
      format: (value) => formatPercentage(value),
      maxValue: 100,
      windowLabel: rankWindowLabel,
      valueColumn: false,
    }),
  );
  return rows;
}

function percentageComparisonRow({
  cohortKey,
  denominator,
  label,
  maxValue,
  numerator,
  playerName,
  statName = "Shooting percentage",
  totalName = "goals/shots",
  value,
}: {
  cohortKey: CareerCohortKey;
  denominator: number;
  label: string;
  maxValue: number;
  numerator: number;
  playerName: string;
  statName?: string;
  totalName?: string;
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
        platformPlayerId={null}
        profilePath={null}
        rank={null}
        showPlatformBadge={false}
        subtitle={`${careerCohortSubtitle(cohortKey)} · ${totalLabel} ${totalKind}`}
      />
    ),
    ariaLabel: `${careerCohortLabel(cohortKey, playerName)}: ${label}`,
    segments: [
      {
        key: statName.toLowerCase().replaceAll(" ", "-"),
        className: careerCohortSegmentClassName(cohortKey),
        label: statName,
        value,
        visibleLabel: value > 0 ? label : undefined,
        title: `${label} (${totalLabel} ${totalName} ${totalKind})`,
      },
    ],
    total: value,
    maxValue,
    valueLabel: <span title={`${totalLabel} ${totalName} ${totalKind}`}>{totalLabel} total</span>,
    placeholder: label,
  };
}

export type CoreProfileView = "player" | "team";

// The team view pools the player with their teammates into "your team" and
// compares against the opponent team. We reuse the your-side / their-side cohort
// colors (player vs opponents) since blue/orange swap game to game.
type TeamSide = "team" | "opponentTeam";

const TEAM_SIDE_LABEL: Record<TeamSide, string> = {
  team: "Your team",
  opponentTeam: "Opponent team",
};

function teamSideCohortKey(side: TeamSide): CareerCohortKey {
  return side === "team" ? "player" : "opponents";
}

function teamRateCard(key: string, title: string, rate: ScoringRateLike, replayCount: number) {
  return {
    key,
    title,
    rows: teamCountCardRows(
      title.replace(/\s*\(.*\)\s*$/, ""),
      rate.count + rate.teammate_count,
      rate.opponent_count,
      replayCount,
    ),
  };
}

function teamCountCardRows(
  statName: string,
  teamCount: number,
  opponentTeamCount: number,
  replayCount: number,
): ComparisonRow[] {
  const games = Math.max(1, replayCount);
  const teamPerGame = teamCount / games;
  const opponentPerGame = opponentTeamCount / games;
  const maxValue = Math.max(1, teamPerGame, opponentPerGame);
  return [
    teamCountRow("team", statName, teamCount, teamPerGame, maxValue),
    teamCountRow("opponentTeam", statName, opponentTeamCount, opponentPerGame, maxValue),
  ];
}

function teamCountRow(
  side: TeamSide,
  statName: string,
  total: number,
  perGame: number,
  maxValue: number,
): ComparisonRow {
  const cohortKey = teamSideCohortKey(side);
  const label = TEAM_SIDE_LABEL[side];
  const perGameLabel = `${formatRate(perGame)}/game`;
  const totalLabel = `${total.toLocaleString()} total`;
  return {
    key: side,
    label: (
      <StatPlayerLabel
        className={careerCohortClassName(cohortKey)}
        name={label}
        platform={null}
        platformPlayerId={null}
        profilePath={null}
        rank={null}
        showPlatformBadge={false}
        subtitle={`${label} · ${totalLabel}`}
      />
    ),
    ariaLabel: `${label}: ${perGameLabel}`,
    segments: [
      {
        key: "rate",
        className: careerCohortSegmentClassName(cohortKey),
        label: statName,
        value: Math.max(0, perGame),
        visibleLabel: perGame > 0 ? perGameLabel : undefined,
        title: `${perGameLabel} (${totalLabel})`,
      },
    ],
    total: Math.max(0, perGame),
    maxValue,
    valueLabel: <span title={totalLabel}>{totalLabel}</span>,
    placeholder: perGameLabel,
  };
}

function teamPercentageCardRows(
  statName: string,
  totalName: string,
  teamNumerator: number,
  teamDenominator: number,
  opponentNumerator: number,
  opponentDenominator: number,
): ComparisonRow[] {
  return [
    teamPercentageRow("team", statName, totalName, teamNumerator, teamDenominator),
    teamPercentageRow("opponentTeam", statName, totalName, opponentNumerator, opponentDenominator),
  ];
}

function teamPercentageRow(
  side: TeamSide,
  statName: string,
  totalName: string,
  numerator: number,
  denominator: number,
): ComparisonRow {
  const cohortKey = teamSideCohortKey(side);
  const label = TEAM_SIDE_LABEL[side];
  const pct = percentage(numerator, denominator);
  const pctLabel = formatPercentage(pct);
  const totalLabel = `${numerator.toLocaleString()}/${denominator.toLocaleString()}`;
  const value = pct ?? 0;
  return {
    key: side,
    label: (
      <StatPlayerLabel
        className={careerCohortClassName(cohortKey)}
        name={label}
        platform={null}
        platformPlayerId={null}
        profilePath={null}
        rank={null}
        showPlatformBadge={false}
        subtitle={`${label} · ${totalLabel} total`}
      />
    ),
    ariaLabel: `${label}: ${pctLabel}`,
    segments: [
      {
        key: statName.toLowerCase().replaceAll(" ", "-"),
        className: careerCohortSegmentClassName(cohortKey),
        label: statName,
        value,
        visibleLabel: value > 0 ? pctLabel : undefined,
        title: `${pctLabel} (${totalLabel} ${totalName} total)`,
      },
    ],
    total: value,
    maxValue: 100,
    valueLabel: <span title={`${totalLabel} ${totalName} total`}>{totalLabel} total</span>,
    placeholder: pctLabel,
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
export function ScoringRatePanel({
  overview,
  playerName = "Player",
}: {
  overview: PlayerStatOverviewResponse;
  playerName?: string;
}) {
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
    opponentRate:
      rate.opponent_per_active_minute != null
        ? rate.opponent_per_active_minute * rateWindowMinutes
        : null,
  }));
  const maxRate = rows.reduce(
    (max, row) => Math.max(max, row.playerRate, row.teammateRate ?? 0, row.opponentRate ?? 0),
    0,
  );

  return (
    <section className="chart-panel scoring-rate-panel">
      <header className="chart-panel-header">
        <h3>Goals &amp; assists</h3>
        <span>Per {rateWindowMinutes} minutes vs teammate and opponent averages</span>
      </header>
      <div className="rate-chart-rows">
        {rows.map(({ label, count, playerRate, teammateRate, opponentRate }) => (
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
                playerName={playerName}
                playerRate={playerRate}
                opponentRate={opponentRate}
                teammateRate={teammateRate}
              />
            </div>
            <div className="rate-chart-value">
              <strong>{formatRate(playerRate)}</strong>
              {teammateRate != null ? (
                <span className="subtle"> vs {formatRate(teammateRate)}</span>
              ) : null}
              {opponentRate != null ? (
                <span className="subtle"> / {formatRate(opponentRate)} opp</span>
              ) : null}
              <span className="subtle"> · {count.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="rate-chart-legend subtle">
        <span className="rate-chart-legend-fill" /> player
        <span className="rate-chart-legend-marker" /> teammate average
        <span className="rate-chart-legend-marker" /> opponent average
      </p>
    </section>
  );
}

/** Goal tag proportions over the player's goals. */
export function buildGoalTagCards({
  overview,
  playerName = "Player",
  goalTypeHref,
  orderedKeys,
  rankCohorts = [],
  rankWindowLabel,
}: {
  overview: PlayerStatOverviewResponse;
  playerName?: string;
  /** When provided, each goal type card title links to a playlist of those goals. */
  goalTypeHref?: (kind: string) => string;
  // When provided (wins/losses split), build exactly these goal types in this
  // order across every outcome side. A goal type this side never scored still
  // renders a card (showing 0) instead of being dropped, so the wins and losses
  // grids stay aligned card-for-card.
  orderedKeys?: Array<{ kind: string; display_name: string }>;
  rankCohorts?: RankBenchmarkCohort[];
  rankWindowLabel?: string | null;
}): ComparisonCard[] {
  const visibleTags = overview.goal_tags.filter((tag) => !isIgnoredGoalTag(tag.kind));
  const tagByKind = new Map(visibleTags.map((tag) => [tag.kind, tag] as const));
  const entries = orderedKeys
    ? orderedKeys.map(({ kind, display_name }) => ({
        kind,
        displayName: display_name,
        tag: tagByKind.get(kind) ?? null,
      }))
    : visibleTags.map((tag) => ({ kind: tag.kind, displayName: tag.display_name, tag }));

  return entries.map(({ kind, displayName, tag }) => {
    const rows = profileRateComparisonRows(
      tag
        ? {
            key: tag.kind,
            displayName: tag.display_name,
            eventCount: tag.count,
            perActiveMinute: tag.per_active_minute,
            teammateEventCount: tag.teammate_count,
            teammatePerActiveMinute: tag.teammate_per_active_minute,
            opponentEventCount: tag.opponent_count,
            opponentPerActiveMinute: tag.opponent_per_active_minute,
          }
        : {
            key: kind,
            displayName,
            eventCount: 0,
            perActiveMinute: 0,
            teammateEventCount: 0,
            teammatePerActiveMinute: null,
            opponentEventCount: 0,
            opponentPerActiveMinute: null,
          },
      playerName,
      rankCohorts,
      `goaltag:${kind}`,
      rankWindowLabel,
    );
    const title = goalTypeHref ? (
      <Link
        className="goal-tag-card-title"
        to={goalTypeHref(kind)}
        title={`Watch all ${displayName.toLowerCase()} goals`}
      >
        {displayName} (per 5 min)
      </Link>
    ) : (
      `${displayName} (per 5 min)`
    );
    return { key: kind, rows, title };
  });
}

/** Goal tag proportions over the player's goals. */
export function GoalTagSharePanel({
  overview,
  playerName = "Player",
  goalTypeHref,
  allGoalsHref,
  rankCohorts = [],
  rankWindowLabel,
}: {
  overview: PlayerStatOverviewResponse;
  playerName?: string;
  /** When provided, each goal type row links to a playlist of those goals. */
  goalTypeHref?: (kind: string) => string;
  /** When provided, the header links to a playlist of every goal. */
  allGoalsHref?: string;
  rankCohorts?: RankBenchmarkCohort[];
  rankWindowLabel?: string | null;
}) {
  const cards = buildGoalTagCards({
    overview,
    playerName,
    goalTypeHref,
    rankCohorts,
    rankWindowLabel,
  });

  return (
    <section className="goal-tag-share-panel full-span">
      <header className="goal-tag-share-header">
        <h3>Goal types</h3>
        <span>
          {overview.goals_scored.toLocaleString()} goals tagged by the analyzer — per{" "}
          {rateWindowMinutes} minutes vs teammate and opponent averages.
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
        <ComparisonCardGrid cards={cards} />
      )}
    </section>
  );
}

const rotationDepthOrder = ["behind_play", "level_with_play", "ahead_of_play", "unknown"];

/** Rotation role/depth time shares plus most-back/forward comparison and stint histogram. */
export function RotationTimeSharePanel({
  overview,
  playerName = "Player",
  stats,
}: {
  overview: PlayerStatOverviewResponse;
  playerName?: string;
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
        <FirstManStintHistogram playerName={playerName} stats={stats} />
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
function FirstManStintHistogram({
  playerName,
  stats,
}: {
  playerName: string;
  stats: StatAggregateSetResponse;
}) {
  const histogram = stats.rotation_duration_histogram;
  const teammateHistogram = stats.teammate_rotation_duration_histogram ?? [];
  const opponentHistogram = stats.opponent_rotation_duration_histogram ?? [];
  if (histogram.length === 0) return null;

  const teammateCountFor = (minSeconds: number) =>
    teammateHistogram.find((bucket) => bucket.min_seconds === minSeconds)?.count ?? 0;
  const opponentCountFor = (minSeconds: number) =>
    opponentHistogram.find((bucket) => bucket.min_seconds === minSeconds)?.count ?? 0;
  const playerTotal = histogram.reduce((sum, bucket) => sum + bucket.count, 0);
  const teammateTotal = teammateHistogram.reduce((sum, bucket) => sum + bucket.count, 0);
  const opponentTotal = opponentHistogram.reduce((sum, bucket) => sum + bucket.count, 0);
  const hasTeammates = teammateTotal > 0;
  const hasOpponents = opponentTotal > 0;

  // Compare share-of-stints so every cohort distribution is on the same scale.
  const rows = histogram.map((bucket) => {
    const teammateCount = teammateCountFor(bucket.min_seconds);
    const opponentCount = opponentCountFor(bucket.min_seconds);
    return {
      bucket,
      playerShare: playerTotal > 0 ? bucket.count / playerTotal : 0,
      teammateShare: teammateTotal > 0 ? teammateCount / teammateTotal : 0,
      opponentShare: opponentTotal > 0 ? opponentCount / opponentTotal : 0,
      teammateCount,
      opponentCount,
    };
  });
  const maxShare = rows.reduce(
    (max, row) => Math.max(max, row.playerShare, row.teammateShare, row.opponentShare),
    0,
  );

  return (
    <div className="rotation-share-block rotation-histogram-block">
      <h4>First man stint lengths{hasTeammates || hasOpponents ? " vs cohorts" : ""}</h4>
      <div className="rotation-histogram" role="img" aria-label="First man stint length histogram">
        {rows.map(
          ({ bucket, playerShare, teammateShare, opponentShare, teammateCount, opponentCount }) => (
            <div
              className="rotation-histogram-bar"
              key={bucket.min_seconds}
              title={
                `${bucket.min_seconds}-${bucket.max_seconds}s: ${bucket.count.toLocaleString()} stints (${formatShare(playerShare)})` +
                (hasTeammates
                  ? ` · teammates ${teammateCount.toLocaleString()} (${formatShare(teammateShare)})`
                  : "") +
                (hasOpponents
                  ? ` · opponents ${opponentCount.toLocaleString()} (${formatShare(opponentShare)})`
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
                {hasOpponents ? (
                  <span
                    className="rotation-histogram-teammate-marker career-cohort-opponents"
                    style={{ bottom: `${barPercent(opponentShare, maxShare)}%` }}
                  />
                ) : null}
              </div>
              <span className="rotation-histogram-label">{bucket.min_seconds}s</span>
            </div>
          ),
        )}
      </div>
      {hasTeammates || hasOpponents ? (
        <p className="rotation-histogram-legend subtle">
          <span className="rotation-histogram-legend-fill" /> {playerName}
          {hasTeammates ? (
            <>
              <span className="rotation-histogram-legend-marker" /> teammate average
            </>
          ) : null}
          {hasOpponents ? (
            <>
              <span className="rotation-histogram-legend-marker career-cohort-opponents" /> opponent
              average
            </>
          ) : null}
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
  const opponentBack = shareOf(
    stats.opponent_time_most_back_seconds,
    stats.opponent_active_time_seconds,
  );
  const opponentForward = shareOf(
    stats.opponent_time_most_forward_seconds,
    stats.opponent_active_time_seconds,
  );
  const hasTeammates = teammateBack != null || teammateForward != null;
  const hasOpponents = opponentBack != null || opponentForward != null;
  const teammateBackPosition = teammateBack == null ? null : barPercent(teammateBack, 1);
  const teammateForwardPosition =
    teammateForward == null ? null : 100 - barPercent(teammateForward, 1);
  const opponentBackPosition = opponentBack == null ? null : barPercent(opponentBack, 1);
  const opponentForwardPosition =
    opponentForward == null ? null : 100 - barPercent(opponentForward, 1);

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
          {opponentBackPosition != null ? (
            <span
              className="field-position-teammate-marker back career-cohort-opponents"
              style={{ left: `${opponentBackPosition}%` }}
              title={`Opponents most back: ${formatShare(opponentBack)}`}
            />
          ) : null}
          {opponentForwardPosition != null ? (
            <span
              className="field-position-teammate-marker forward career-cohort-opponents"
              style={{ left: `${opponentForwardPosition}%` }}
              title={`Opponents most forward: ${formatShare(opponentForward)}`}
            />
          ) : null}
        </div>
        <div className="rotation-depth-tug-labels field-position-tug-labels">
          <span className="rotation-depth-tug-label">
            <span className="rotation-legend-swatch source-segment positioning-segment-role-most_back" />
            Most back
            <strong>{formatShare(mostBack)}</strong>
          </span>
          {hasTeammates || hasOpponents ? (
            <span className="field-position-teammate-label">Markers show cohort averages</span>
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
  rankCohorts = [],
  rankWindowLabel,
}: {
  playerName?: string;
  summary: PossessionSummaryResponse;
  rankCohorts?: RankBenchmarkCohort[];
  rankWindowLabel?: string | null;
}) {
  const subjects = possessionProfileSubjects(summary, playerName).map(
    possessionAdvancedProfileSubject,
  );
  const teamCharts = summary.team ? teamControlCharts(summary.team) : [];

  return (
    <div
      className="stat-comparison-grid possession-profile-grid"
      aria-label="Possession comparisons"
    >
      {/* Team-control charts are team-relative, not rank-comparable. */}
      <PossessionAdvancedCharts charts={teamCharts} />
      <PossessionAdvancedCharts
        subjects={subjects}
        rankCohorts={rankCohorts}
        rankWindowLabel={rankWindowLabel}
      />
    </div>
  );
}

interface TeamControlChart {
  key: string;
  title: string;
  rows: ComparisonRow[];
}

/**
 * Team-level ball control (possession share, ball half, ball thirds) oriented
 * to the player's team, rendered as extra cards in the same possession grid so
 * they ride the global win/loss outcome control like every other stat — each
 * card shows your-team / neutral / opponents shares.
 */
function teamControlCharts(team: PossessionTeamControl): TeamControlChart[] {
  return [
    teamControlChart("team-possession-share", "Team possession", team.loose_possession),
    teamControlChart("team-control-share", "Team control", team.possession),
    teamControlChart("ball-half", "Ball half", team.ball_halves),
    teamControlChart("ball-thirds", "Ball thirds", team.ball_thirds),
  ];
}

// Always renders the three buckets (your team / neutral / opponents); with no
// tracked time they show as 0% so the cards stay visible and discoverable in
// the possession tab rather than disappearing on empty data.
function teamControlChart(
  key: string,
  title: string,
  metric: PossessionTeamMetric,
): TeamControlChart {
  const total = metric.total_duration_seconds;
  const buckets =
    metric.buckets.length > 0
      ? metric.buckets
      : [
          { key: "own", label: "Your team", duration_seconds: 0, share: 0 },
          { key: "neutral", label: "Neutral", duration_seconds: 0, share: 0 },
          { key: "opponent", label: "Opponents", duration_seconds: 0, share: 0 },
        ];
  const rows: ComparisonRow[] = buckets.map((bucket) => {
    const share = total > 0 ? bucket.duration_seconds / total : 0;
    const formatted = formatShare(share);
    // Seconds in this bucket per 5 minutes of tracked time (share * 5 min).
    const per5 = careerRateValue(bucket.duration_seconds, total) ?? 0;
    const per5Label = `${formatDurationSeconds(per5)}/5m`;
    return {
      key: `${key}:${bucket.key}`,
      label: <span className="possession-team-bucket-label">{bucket.label}</span>,
      ariaLabel: `${bucket.label}: ${per5Label} (${formatted})`,
      segments: [
        {
          key: "value",
          className: teamControlClass(bucket.key),
          label: bucket.label,
          value: share,
          title: `${bucket.label}: ${per5Label} (${formatted})`,
        },
      ],
      total: share,
      maxValue: 1,
      barValue: `${per5Label} · ${formatted}`,
    };
  });
  return { key, title, rows };
}

// Oriented keys (own_* / opponent_* / neutral*) are player-relative, so they
// use the career "your team vs opponents" palette (teal -> grey -> purple) like
// the positioning/cohort views — not per-game blue/orange, which is meaningless
// across a lifetime where the player switches teams game to game.
function teamControlClass(key: string): string {
  if (key.includes("own")) return "possession-team-own";
  if (key.includes("opponent")) return "possession-team-opponent";
  return "possession-team-neutral";
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
    const cohortKey = careerCohortKey(cohort.key) ?? "opponents";
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
