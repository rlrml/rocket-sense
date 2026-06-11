import { Link } from "react-router-dom";
import type {
  EventStatDimensionResponse,
  EventStatSummaryResponse,
  PlayerStatOverviewResponse,
  RotationTimeShareResponse,
  StatAggregateResponse,
  StatAggregateSetResponse,
} from "../types";
import { boostAmountToPercent } from "./boostUnits";
import { SegmentedBar, type SegmentedBarSegment } from "./shared";

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
        stat.teammate_per_active_minute != null ? stat.teammate_per_active_minute * rateWindowMinutes : null,
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
            <div className="rate-chart-track" aria-label={`${stat.display_name} per ${rateWindowMinutes} minutes`}>
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
              {teammateRate != null ? <span className="subtle"> vs {formatRate(teammateRate)}</span> : null}
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
  const tags = overview.goal_tags;

  return (
    <section className="chart-panel goal-tag-share-panel">
      <header className="chart-panel-header">
        <h3>Goal types</h3>
        <span>
          {overview.goals_scored.toLocaleString()} goals tagged by the analyzer
          {goalTypeHref ? " — pick a type to watch those goals" : ""}
        </span>
        {allGoalsHref ? (
          <Link className="goal-tag-watch-all" to={allGoalsHref}>
            Watch all goals
          </Link>
        ) : null}
      </header>
      {tags.length === 0 ? (
        <p className="subtle">No tagged goals yet for this replay set.</p>
      ) : (
        <div className="rate-chart-rows">
          {tags.map((tag) => {
            const row = (
              <>
                <div className="rate-chart-label" title={tag.display_name}>
                  {tag.display_name}
                </div>
                <div className="rate-chart-track" aria-label={`${tag.display_name} share of goals`}>
                  <span
                    className="rate-chart-fill goal-tag-fill"
                    style={{ width: `${barPercent(tag.share_of_goals ?? 0, 1)}%` }}
                    title={shareTitle(tag.display_name, tag.share_of_goals, tag.count)}
                  />
                </div>
                <div className="rate-chart-value">
                  <strong>{formatShare(tag.share_of_goals)}</strong>
                  <span className="subtle"> {tag.count.toLocaleString()}×</span>
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
  const depths = orderTimeShares(overview.rotation_depths, "rotation_depth_", rotationDepthOrder);

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
    depths.find((share) => depthSuffix(share.key) === suffix)?.seconds ?? 0;
  const behind = secondsFor("behind_play");
  const level = secondsFor("level_with_play");
  const ahead = secondsFor("ahead_of_play");
  const unknown = secondsFor("unknown");
  const neutral = level + unknown;
  const total = behind + neutral + ahead;

  if (total <= 0) return null;

  const segments: Array<{ key: string; className: string; label: string; seconds: number }> = [
    { key: "behind_play", className: "positioning-segment-behind", label: rotationDepthLabels.behind_play, seconds: behind },
    { key: "neutral", className: "positioning-segment-neutral", label: rotationDepthLabels.level_with_play, seconds: neutral },
    { key: "ahead_of_play", className: "positioning-segment-ahead", label: rotationDepthLabels.ahead_of_play, seconds: ahead },
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
              title={`${segment.label}: ${formatDurationSeconds(segment.seconds)} (${formatShare(segment.seconds / total)})`}
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
  return key.startsWith("rotation_depth_") ? key.slice("rotation_depth_".length) : key;
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
              (hasTeammates ? ` · teammates ${teammateCount.toLocaleString()} (${formatShare(teammateShare)})` : "")
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
  const rows = [
    {
      key: "most_back",
      label: "Most back",
      player: shareOf(stats.time_most_back_seconds, stats.active_time_seconds),
      teammates: shareOf(stats.teammate_time_most_back_seconds, stats.teammate_active_time_seconds),
    },
    {
      key: "most_forward",
      label: "Most forward",
      player: shareOf(stats.time_most_forward_seconds, stats.active_time_seconds),
      teammates: shareOf(stats.teammate_time_most_forward_seconds, stats.teammate_active_time_seconds),
    },
  ].filter((row) => row.player != null);

  if (rows.length === 0) return null;
  return (
    <div className="rotation-share-block">
      <h4>Field position share</h4>
      <div className="rate-chart-rows">
        {rows.map((row) => (
          <div className="rate-chart-row" key={row.key}>
            <div className="rate-chart-label">{row.label}</div>
            <div className="rate-chart-track" aria-label={`${row.label} share of active time`}>
              <span
                className="rate-chart-fill"
                style={{ width: `${barPercent(row.player ?? 0, 1)}%` }}
                title={`You: ${formatShare(row.player)} of active time`}
              />
              {row.teammates != null ? (
                <span
                  className="rate-chart-teammate-marker"
                  style={{ left: `${barPercent(row.teammates, 1)}%` }}
                  title={`Teammates: ${formatShare(row.teammates)} of active time`}
                />
              ) : null}
            </div>
            <div className="rate-chart-value">
              <strong>{formatShare(row.player)}</strong>
              {row.teammates != null ? <span className="subtle"> vs {formatShare(row.teammates)}</span> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const kickoffDimensionKeys = ["approach", "spawn_position", "taker_outcome", "support_behavior", "player_result"];

/** Kickoff outcome shares, headline metrics, and per-dimension distributions. */
export function KickoffSummaryPanel({ summary }: { summary: EventStatSummaryResponse }) {
  const metric = (key: string) => summary.metrics.find((entry) => entry.key === key)?.value ?? null;
  const wins = metric("win_count") ?? 0;
  const losses = metric("loss_count") ?? 0;
  const neutral = metric("neutral_count") ?? 0;
  const outcomeTotal = wins + losses + neutral;
  // Avg time to touch is conditional on the taker touching at all; show the
  // touch rate alongside so the conditioning is visible.
  const takerCount = metric("taker_count") ?? 0;
  const takerTouchRate = takerCount > 0 ? (metric("touched_count") ?? 0) / takerCount : null;
  const dimensions = kickoffDimensionKeys
    .map((key) => summary.dimensions.find((dimension) => dimension.key === key))
    .filter((dimension): dimension is EventStatDimensionResponse => Boolean(dimension && dimension.values.length > 0));

  return (
    <section className="chart-panel full-span kickoff-summary-panel">
      <header className="chart-panel-header">
        <h3>Kickoffs</h3>
        <span>
          {summary.event_count.toLocaleString()} kickoffs across {summary.replay_count.toLocaleString()} replays
        </span>
      </header>
      {outcomeTotal > 0 ? (
        <div className="kickoff-outcome-share">
          <SegmentedBar
            ariaLabel="Kickoff outcome share"
            className="positioning-track"
            segments={[
              kickoffOutcomeSegment("win", "Won", wins, outcomeTotal),
              kickoffOutcomeSegment("neutral", "Neutral", neutral, outcomeTotal),
              kickoffOutcomeSegment("loss", "Lost", losses, outcomeTotal),
            ]}
            total={outcomeTotal}
          />
        </div>
      ) : null}
      <div className="kickoff-headline-metrics">
        <KickoffMetric label="Kickoff goals for" value={formatCount(metric("kickoff_goals_for"))} />
        <KickoffMetric label="Kickoff goals against" value={formatCount(metric("kickoff_goals_against"))} />
        <KickoffMetric label="Avg time to touch (taker)" value={formatSecondsValue(metric("avg_taker_time_to_touch"))} />
        <KickoffMetric label="Taker touch rate" value={formatShare(takerTouchRate)} />
        {/* avg_boost_delta arrives in raw 0-255 replay units; rescale to the 0-100 display scale. */}
        <KickoffMetric label="Avg boost delta" value={formatSigned(boostAmountToPercent(metric("avg_boost_delta")))} />
        <KickoffMetric label="Taker rows" value={formatCount(metric("taker_count"))} />
        <KickoffMetric label="Support rows" value={formatCount(metric("support_count"))} />
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
            <div className="rate-chart-track" aria-label={`${dimension.label}: ${value.display_name}`}>
              <span
                className="rate-chart-fill kickoff-dimension-fill"
                style={{ width: `${barPercent(value.count, total)}%` }}
                title={shareTitle(value.display_name, total > 0 ? value.count / total : null, value.count)}
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

function kickoffOutcomeSegment(id: string, label: string, value: number, total: number): SegmentedBarSegment {
  const share = total > 0 ? value / total : 0;
  return {
    key: id,
    className: `kickoff-outcome-segment-${id}`,
    label,
    value,
    visibleLabel: share >= 0.08 ? `${label}: ${formatShare(share)}` : undefined,
    title: `${label}: ${value.toLocaleString()} (${formatShare(share)})`,
  };
}

function orderTimeShares(
  shares: RotationTimeShareResponse[],
  prefix: string,
  order: string[],
): RotationTimeShareResponse[] {
  return shares
    .slice()
    .sort((left, right) => orderIndex(left.key, prefix, order) - orderIndex(right.key, prefix, order));
}

function orderIndex(key: string, prefix: string, order: string[]): number {
  const suffix = key.startsWith(prefix) ? key.slice(prefix.length) : key;
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

function formatRate(value: number): string {
  if (!Number.isFinite(value)) return "–";
  const absolute = Math.abs(value);
  if (absolute >= 100) return value.toFixed(0);
  return value.toFixed(absolute >= 10 ? 1 : 2);
}

function formatCount(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "–";
  return Math.round(value).toLocaleString();
}

function formatSecondsValue(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "–";
  return `${value.toFixed(2)}s`;
}

function formatSigned(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "–";
  const formatted = formatRate(Math.abs(value));
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

function formatDurationSeconds(value: number): string {
  const totalSeconds = Math.round(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
