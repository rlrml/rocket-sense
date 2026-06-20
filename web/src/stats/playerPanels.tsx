import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type {
  EventStatDimensionResponse,
  EventStatSummaryResponse,
  PlayerStatOverviewResponse,
  PossessionMixValue,
  PossessionSpanSummary,
  PossessionSummaryResponse,
  PossessionTeammateComparison,
  PossessionTimeBucket,
  RotationTimeShareResponse,
  StatAggregateResponse,
  StatAggregateSetResponse,
} from "../types";
import { boostAmountToPercent } from "./boostUnits";
import {
  OutcomeDistributionBar,
  PLAYER_RELATIVE_OUTCOME_COLORS,
  SegmentedBar,
  statPercentWithValue,
  type OutcomeDistributionLevel,
  type OutcomeDistributionSegment,
  type SegmentedBarSegment,
} from "./shared";

const rateChartStatLimit = 12;
const rateWindowMinutes = 5;

/**
 * Horizontal "per 5 minutes" comparison chart for the active stat section:
 * one row per stat, player rate as a filled bar with the teammate average
 * rendered as a marker on the same scale.
 */
export function PlayerRateComparisonChart({ stats }: { stats: StatAggregateResponse[] }) {
  const rows = stats
    .filter((stat) => stat.per_active_minute != null)
    .slice(0, rateChartStatLimit)
    .map((stat) => ({
      stat,
      playerRate: (stat.per_active_minute ?? 0) * rateWindowMinutes,
      teammateRate:
        stat.teammate_per_active_minute != null
          ? stat.teammate_per_active_minute * rateWindowMinutes
          : null,
    }));
  const maxRate = rows.reduce(
    (max, row) => Math.max(max, row.playerRate, row.teammateRate ?? 0),
    0,
  );

  if (rows.length === 0) {
    return null;
  }

  return (
    <section className="chart-panel full-span player-rate-chart">
      <header className="chart-panel-header">
        <h3>Per {rateWindowMinutes} minutes</h3>
        <span>Player rate vs teammate average, scaled to a {rateWindowMinutes}-minute window</span>
      </header>
      <div className="rate-chart-rows">
        {rows.map(({ stat, playerRate, teammateRate }) => (
          <div className="rate-chart-row" key={stat.key}>
            <div className="rate-chart-label" title={stat.display_name}>
              {stat.display_name}
            </div>
            <div
              className="rate-chart-track"
              aria-label={`${stat.display_name} per ${rateWindowMinutes} minutes`}
            >
              <span
                className="rate-chart-fill"
                style={{ width: `${barPercent(playerRate, maxRate)}%` }}
                title={`You: ${formatRate(playerRate)} per ${rateWindowMinutes} min`}
              />
              {teammateRate != null ? (
                <span
                  className="rate-chart-teammate-marker"
                  style={{ left: `${barPercent(teammateRate, maxRate)}%` }}
                  title={`Teammates: ${formatRate(teammateRate)} per ${rateWindowMinutes} min`}
                />
              ) : null}
            </div>
            <div className="rate-chart-value">
              <strong>{formatRate(playerRate)}</strong>
              {teammateRate != null ? (
                <span className="subtle"> vs {formatRate(teammateRate)}</span>
              ) : null}
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
              <span
                className="rate-chart-fill"
                style={{ width: `${barPercent(playerRate, maxRate)}%` }}
                title={`You: ${formatRate(playerRate)} per ${rateWindowMinutes} min`}
              />
              {teammateRate != null ? (
                <span
                  className="rate-chart-teammate-marker"
                  style={{ left: `${barPercent(teammateRate, maxRate)}%` }}
                  title={`Teammates: ${formatRate(teammateRate)} per ${rateWindowMinutes} min`}
                />
              ) : null}
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
  goalTypeHref,
  allGoalsHref,
}: {
  overview: PlayerStatOverviewResponse;
  /** When provided, each goal type row links to a playlist of those goals. */
  goalTypeHref?: (kind: string) => string;
  /** When provided, the header links to a playlist of every goal. */
  allGoalsHref?: string;
}) {
  const rows = overview.goal_tags.map((tag) => ({
    tag,
    playerRate: (tag.per_active_minute ?? 0) * rateWindowMinutes,
    teammateRate:
      tag.teammate_per_active_minute != null
        ? tag.teammate_per_active_minute * rateWindowMinutes
        : null,
  }));
  const maxRate = rows.reduce(
    (max, row) => Math.max(max, row.playerRate, row.teammateRate ?? 0),
    0,
  );

  return (
    <section className="chart-panel goal-tag-share-panel">
      <header className="chart-panel-header">
        <h3>Goal types</h3>
        <span>
          {overview.goals_scored.toLocaleString()} goals tagged by the analyzer — per{" "}
          {rateWindowMinutes} minutes vs teammate average
          {goalTypeHref ? ", pick a type to watch those goals" : ""}
        </span>
        {allGoalsHref ? (
          <Link className="goal-tag-watch-all" to={allGoalsHref}>
            Watch all goals
          </Link>
        ) : null}
      </header>
      {rows.length === 0 ? (
        <p className="subtle">No tagged goals yet for this replay set.</p>
      ) : (
        <div className="rate-chart-rows">
          {rows.map(({ tag, playerRate, teammateRate }) => {
            const row = (
              <>
                <div className="rate-chart-label" title={tag.display_name}>
                  {tag.display_name}
                </div>
                <div
                  className="rate-chart-track"
                  aria-label={`${tag.display_name} per ${rateWindowMinutes} minutes`}
                >
                  <span
                    className="rate-chart-fill goal-tag-fill"
                    style={{ width: `${barPercent(playerRate, maxRate)}%` }}
                    title={`You: ${formatRate(playerRate)} per ${rateWindowMinutes} min · ${shareTitle(tag.display_name, tag.share_of_goals, tag.count)}`}
                  />
                  {teammateRate != null ? (
                    <span
                      className="rate-chart-teammate-marker"
                      style={{ left: `${barPercent(teammateRate, maxRate)}%` }}
                      title={`Teammates: ${formatRate(teammateRate)} per ${rateWindowMinutes} min (${tag.teammate_count.toLocaleString()}×)`}
                    />
                  ) : null}
                </div>
                <div className="rate-chart-value">
                  <strong>{formatRate(playerRate)}</strong>
                  {teammateRate != null ? (
                    <span className="subtle"> vs {formatRate(teammateRate)}</span>
                  ) : null}
                  <span className="subtle"> · {tag.count.toLocaleString()}×</span>
                </div>
              </>
            );
            return goalTypeHref ? (
              <Link
                className="rate-chart-row goal-tag-row-link"
                key={tag.kind}
                to={goalTypeHref(tag.kind)}
                title={`Watch all ${tag.display_name.toLowerCase()} goals`}
              >
                {row}
              </Link>
            ) : (
              <div className="rate-chart-row" key={tag.kind}>
                {row}
              </div>
            );
          })}
        </div>
      )}
      <p className="rate-chart-legend subtle">
        <span className="rate-chart-legend-fill" /> player
        <span className="rate-chart-legend-marker" /> teammate average
      </p>
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
              <span
                className="rate-chart-fill kickoff-dimension-fill"
                style={{ width: `${barPercent(value.count, total)}%` }}
                title={shareTitle(
                  value.display_name,
                  total > 0 ? value.count / total : null,
                  value.count,
                )}
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

const possessionSurfaceClasses: Record<string, string> = {
  ground: "possession-surface-segment-ground",
  air: "possession-surface-segment-air",
  wall: "possession-surface-segment-wall",
};

/**
 * Career possession summary: how often and how long the player holds the
 * ball, what they do with it (advance, carry, take it airborne or up the
 * wall), and how their first touches resolve.
 */
export function PossessionSummaryPanel({ summary }: { summary: PossessionSummaryResponse }) {
  const spans = summary.possessions;
  const controlledPlays = summary.controlled_plays;
  const touches = summary.touches;
  const locations = summary.locations;
  const possessionsPerGame =
    summary.replay_count > 0 ? spans.possession_count / summary.replay_count : null;
  const possessionTimePerGame =
    summary.replay_count > 0 ? spans.total_duration_seconds / summary.replay_count : null;
  const ownHalfPossessionShare = possessionLocationShare(locations.halves, "own_side");
  const opponentHalfPossessionShare = possessionLocationShare(locations.halves, "opponent_side");
  const surfaceTotal = touches.surfaces.reduce((sum, value) => sum + value.count, 0);
  const histogramTotal = spans.duration_histogram.reduce((sum, bucket) => sum + bucket.count, 0);
  const histogramMax = Math.max(...spans.duration_histogram.map((bucket) => bucket.count), 1);
  const playStyles = [
    { key: "sustained_control", label: "Sustained control", share: spans.sustained_control_share },
    { key: "carry", label: "Ball carry", share: spans.with_carry_share },
    { key: "air_dribble", label: "Air dribble", share: spans.with_air_dribble_share },
    { key: "aerial_touch", label: "Aerial touch", share: spans.with_aerial_touch_share },
    { key: "wall_touch", label: "Wall touch", share: spans.with_wall_touch_share },
  ].filter((style) => style.share != null);

  return (
    <section className="chart-panel full-span possession-summary-panel">
      <header className="chart-panel-header">
        <h3>Possession</h3>
        <span>
          {spans.possession_count.toLocaleString()} possessions across{" "}
          {summary.replay_count.toLocaleString()} replays
        </span>
      </header>
      <div className="kickoff-headline-metrics">
        <PossessionMetric
          label="Possessions per game"
          value={possessionsPerGame != null ? formatRate(possessionsPerGame) : "—"}
        />
        <PossessionMetric
          label="Possession time per game"
          value={possessionTimePerGame != null ? formatDurationSeconds(possessionTimePerGame) : "—"}
        />
        <PossessionMetric
          label="Avg possession length"
          value={formatSecondsValue(spans.avg_duration_seconds)}
        />
        <PossessionMetric
          label="Avg touches per possession"
          value={
            spans.avg_touches_per_possession != null
              ? formatRate(spans.avg_touches_per_possession)
              : "—"
          }
        />
        <PossessionMetric
          label="Ball advanced per possession"
          value={formatDistance(spans.avg_advance_distance)}
        />
        <PossessionMetric label="Own-half possession" value={formatShare(ownHalfPossessionShare)} />
        <PossessionMetric
          label="Opponent-half possession"
          value={formatShare(opponentHalfPossessionShare)}
        />
        <PossessionMetric label="Carry time share" value={formatShare(spans.carry_time_share)} />
        <PossessionMetric
          label="First-touch control rate"
          value={formatShare(touches.first_touch_control_share)}
        />
        <PossessionMetric
          label="Contested touch share"
          value={formatShare(
            touches.classified_touch_count > 0
              ? touches.contested_touch_count / touches.classified_touch_count
              : null,
          )}
        />
      </div>

      <ControlledPlayComparison
        player={controlledPlays}
        replayCount={summary.replay_count}
        teammates={summary.teammates}
      />

      {surfaceTotal > 0 ? (
        <div className="possession-surface-share">
          <h4>Touch surfaces</h4>
          <SegmentedBar
            ariaLabel="Touch surface share"
            className="positioning-track"
            segments={touches.surfaces.map((value) =>
              possessionSurfaceSegment(value, surfaceTotal),
            )}
            total={surfaceTotal}
          />
        </div>
      ) : null}

      {locations.total_duration_seconds > 0 ? (
        <div className="possession-location-grid">
          <PossessionLocationBreakdown
            ariaLabel="Possession time by field halves"
            buckets={locations.halves}
            title="Possession by halves"
            totalSeconds={locations.total_duration_seconds}
          />
          <PossessionLocationBreakdown
            ariaLabel="Possession time by field thirds"
            buckets={locations.thirds}
            title="Possession by thirds"
            totalSeconds={locations.total_duration_seconds}
          />
        </div>
      ) : null}

      <div className="kickoff-dimension-grid possession-breakdown-grid">
        {playStyles.length > 0 ? (
          <div className="kickoff-dimension">
            <h4>Possessions including…</h4>
            <div className="rate-chart-rows">
              {playStyles.map((style) => (
                <div className="rate-chart-row kickoff-dimension-row" key={style.key}>
                  <div className="rate-chart-label" title={style.label}>
                    {style.label}
                  </div>
                  <div
                    className="rate-chart-track"
                    aria-label={`Possessions including ${style.label}`}
                  >
                    <span
                      className="rate-chart-fill kickoff-dimension-fill"
                      style={{ width: `${Math.max(0, Math.min(100, (style.share ?? 0) * 100))}%` }}
                      title={`${style.label}: ${formatShare(style.share)}`}
                    />
                  </div>
                  <div className="rate-chart-value">
                    <strong>{formatShare(style.share)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {histogramTotal > 0 ? (
          <div className="kickoff-dimension">
            <h4>Possession length</h4>
            <div className="rate-chart-rows">
              {spans.duration_histogram.map((bucket) => (
                <div className="rate-chart-row kickoff-dimension-row" key={bucket.key}>
                  <div className="rate-chart-label" title={bucket.label}>
                    {bucket.label}
                  </div>
                  <div
                    className="rate-chart-track"
                    aria-label={`Possession length ${bucket.label}`}
                  >
                    <span
                      className="rate-chart-fill kickoff-dimension-fill"
                      style={{ width: `${barPercent(bucket.count, histogramMax)}%` }}
                      title={shareTitle(
                        bucket.label,
                        histogramTotal > 0 ? bucket.count / histogramTotal : null,
                        bucket.count,
                      )}
                    />
                  </div>
                  <div className="rate-chart-value">
                    <strong>
                      {formatShare(histogramTotal > 0 ? bucket.count / histogramTotal : null)}
                    </strong>
                    <span className="subtle"> {bucket.count.toLocaleString()}×</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <PossessionMixList title="First-touch intentions" values={touches.first_touch_intentions} />
        <PossessionMixList title="All touch intentions" values={touches.intentions} />
      </div>
    </section>
  );
}

function PossessionLocationBreakdown({
  ariaLabel,
  buckets,
  title,
  totalSeconds,
}: {
  ariaLabel: string;
  buckets: PossessionTimeBucket[];
  title: string;
  totalSeconds: number;
}) {
  return (
    <div className="possession-location-breakdown">
      <h4>{title}</h4>
      <SegmentedBar
        ariaLabel={ariaLabel}
        className="possession-location-track"
        segments={buckets.map((bucket) => possessionLocationSegment(bucket, totalSeconds))}
        total={totalSeconds}
      />
      <div className="possession-location-list">
        {buckets.map((bucket) => (
          <div
            className={`possession-location-row ${possessionLocationClass(bucket.key)}`}
            key={bucket.key}
          >
            <span>{bucket.label}</span>
            <strong>{formatShare(bucket.share)}</strong>
            <span>{formatDurationSeconds(bucket.duration_seconds)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function possessionLocationShare(buckets: PossessionTimeBucket[], key: string): number | null {
  return buckets.find((bucket) => bucket.key === key)?.share ?? null;
}

function ControlledPlayComparison({
  player,
  replayCount,
  teammates,
}: {
  player: PossessionSpanSummary;
  replayCount: number;
  teammates: PossessionTeammateComparison | null;
}) {
  const teammateControlledPlays = teammates?.controlled_plays ?? null;
  const hasPlayer = player.possession_count > 0;
  const hasTeammates = (teammateControlledPlays?.possession_count ?? 0) > 0;
  if (!hasPlayer && !hasTeammates) return null;

  const playerPerGame = replayCount > 0 ? player.possession_count / replayCount : null;
  const teammatePerGame =
    teammates && teammates.appearance_count > 0
      ? teammates.controlled_plays.possession_count / teammates.appearance_count
      : null;
  const metrics = [
    {
      key: "count",
      label: "Controlled plays per game",
      playerValue: playerPerGame,
      teammateValue: teammatePerGame,
      formatter: (value: number | null) => (value != null ? formatRate(value) : "—"),
    },
    {
      key: "duration",
      label: "Avg controlled length",
      playerValue: player.avg_duration_seconds,
      teammateValue: teammateControlledPlays?.avg_duration_seconds ?? null,
      formatter: formatSecondsValue,
    },
    {
      key: "touches",
      label: "Touches per controlled play",
      playerValue: player.avg_touches_per_possession,
      teammateValue: teammateControlledPlays?.avg_touches_per_possession ?? null,
      formatter: (value: number | null) => (value != null ? formatRate(value) : "—"),
    },
    {
      key: "advance",
      label: "Advance per controlled play",
      playerValue: player.avg_advance_distance,
      teammateValue: teammateControlledPlays?.avg_advance_distance ?? null,
      formatter: formatDistance,
    },
  ];
  const maxMetric = Math.max(
    1,
    ...metrics.flatMap((metric) => [metric.playerValue ?? 0, metric.teammateValue ?? 0]),
  );

  return (
    <div className="controlled-play-comparison">
      <div className="kickoff-dimension-grid possession-breakdown-grid">
        <div className="kickoff-dimension">
          <h4>Controlled plays{hasTeammates ? " vs teammates" : ""}</h4>
          <div className="rate-chart-rows">
            {metrics.map((metric) => (
              <div className="rate-chart-row kickoff-dimension-row" key={metric.key}>
                <div className="rate-chart-label" title={metric.label}>
                  {metric.label}
                </div>
                <div className="rate-chart-track" aria-label={metric.label}>
                  <span
                    className="rate-chart-fill kickoff-dimension-fill"
                    style={{ width: `${barPercent(metric.playerValue ?? 0, maxMetric)}%` }}
                    title={`Player: ${metric.formatter(metric.playerValue)}`}
                  />
                  {metric.teammateValue != null ? (
                    <span
                      className="rate-chart-teammate-marker"
                      style={{ left: `${barPercent(metric.teammateValue, maxMetric)}%` }}
                      title={`Teammates: ${metric.formatter(metric.teammateValue)}`}
                    />
                  ) : null}
                </div>
                <div className="rate-chart-value">
                  <strong>{metric.formatter(metric.playerValue)}</strong>
                  {metric.teammateValue != null ? (
                    <span className="subtle"> vs {metric.formatter(metric.teammateValue)}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          {hasTeammates ? (
            <p className="rate-chart-legend subtle">
              <span className="rate-chart-legend-fill" /> player
              <span className="rate-chart-legend-marker" /> teammate average
            </p>
          ) : null}
        </div>
        <ControlledPlayHistogram player={player} teammates={teammateControlledPlays} />
      </div>
    </div>
  );
}

function ControlledPlayHistogram({
  player,
  teammates,
}: {
  player: PossessionSpanSummary;
  teammates: PossessionSpanSummary | null;
}) {
  const playerTotal = player.duration_histogram.reduce((sum, bucket) => sum + bucket.count, 0);
  const teammateTotal =
    teammates?.duration_histogram.reduce((sum, bucket) => sum + bucket.count, 0) ?? 0;
  if (playerTotal === 0 && teammateTotal === 0) return null;

  const teammateCountFor = (key: string) =>
    teammates?.duration_histogram.find((bucket) => bucket.key === key)?.count ?? 0;
  const rows = player.duration_histogram.map((bucket) => {
    const teammateCount = teammateCountFor(bucket.key);
    return {
      bucket,
      playerShare: playerTotal > 0 ? bucket.count / playerTotal : 0,
      teammateShare: teammateTotal > 0 ? teammateCount / teammateTotal : 0,
      teammateCount,
    };
  });
  const maxShare = Math.max(0.01, ...rows.flatMap((row) => [row.playerShare, row.teammateShare]));

  return (
    <div className="kickoff-dimension">
      <h4>Controlled length{teammateTotal > 0 ? " vs teammates" : ""}</h4>
      <div className="rate-chart-rows">
        {rows.map(({ bucket, playerShare, teammateShare, teammateCount }) => (
          <div className="rate-chart-row kickoff-dimension-row" key={bucket.key}>
            <div className="rate-chart-label" title={bucket.label}>
              {bucket.label}
            </div>
            <div className="rate-chart-track" aria-label={`Controlled length ${bucket.label}`}>
              <span
                className="rate-chart-fill kickoff-dimension-fill"
                style={{ width: `${barPercent(playerShare, maxShare)}%` }}
                title={shareTitle(bucket.label, playerShare, bucket.count)}
              />
              {teammateTotal > 0 ? (
                <span
                  className="rate-chart-teammate-marker"
                  style={{ left: `${barPercent(teammateShare, maxShare)}%` }}
                  title={`Teammates: ${formatShare(teammateShare)} (${teammateCount.toLocaleString()})`}
                />
              ) : null}
            </div>
            <div className="rate-chart-value">
              <strong>{formatShare(playerShare)}</strong>
              {teammateTotal > 0 ? (
                <span className="subtle"> vs {formatShare(teammateShare)}</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PossessionMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="kickoff-headline-metric">
      <span className="subtle">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PossessionMixList({ title, values }: { title: string; values: PossessionMixValue[] }) {
  const total = values.reduce((sum, value) => sum + value.count, 0);
  if (total === 0) return null;
  return (
    <div className="kickoff-dimension">
      <h4>{title}</h4>
      <div className="rate-chart-rows">
        {values.map((value) => (
          <div className="rate-chart-row kickoff-dimension-row" key={value.key ?? "unknown"}>
            <div className="rate-chart-label" title={value.display_name}>
              {value.display_name}
            </div>
            <div className="rate-chart-track" aria-label={`${title}: ${value.display_name}`}>
              <span
                className="rate-chart-fill kickoff-dimension-fill"
                style={{ width: `${barPercent(value.count, total)}%` }}
                title={shareTitle(
                  value.display_name,
                  total > 0 ? value.count / total : null,
                  value.count,
                )}
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

function possessionSurfaceSegment(value: PossessionMixValue, total: number): SegmentedBarSegment {
  const share = total > 0 ? value.count / total : 0;
  return {
    key: value.key ?? "unknown",
    className: possessionSurfaceClasses[value.key ?? ""] ?? "possession-surface-segment-other",
    label: value.display_name,
    value: value.count,
    visibleLabel: share >= 0.08 ? `${value.display_name} ${formatShare(share)}` : undefined,
    title: shareTitle(value.display_name, share, value.count),
  };
}

function possessionLocationSegment(
  bucket: PossessionTimeBucket,
  totalSeconds: number,
): SegmentedBarSegment {
  const share = totalSeconds > 0 ? bucket.duration_seconds / totalSeconds : 0;
  return {
    key: bucket.key,
    className: possessionLocationClass(bucket.key),
    label: bucket.label,
    value: bucket.duration_seconds,
    visibleLabel: share >= 0.08 ? `${bucket.label}: ${formatShare(share)}` : undefined,
    title: statPercentWithValue(
      formatShare(share),
      formatDurationSeconds(bucket.duration_seconds),
      bucket.label,
    ),
  };
}

function possessionLocationClass(key: string): string {
  if (key.includes("own")) return "possession-location-team-zero";
  if (key.includes("team_zero")) return "possession-location-team-zero";
  if (key.includes("opponent")) return "possession-location-team-one";
  if (key.includes("team_one")) return "possession-location-team-one";
  return "possession-location-neutral";
}

function formatDistance(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "—";
  return `${Math.round(value).toLocaleString()} uu`;
}
