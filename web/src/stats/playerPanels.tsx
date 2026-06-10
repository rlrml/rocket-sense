import type {
  EventStatDimensionResponse,
  EventStatSummaryResponse,
  PlayerStatOverviewResponse,
  RotationTimeShareResponse,
  StatAggregateResponse,
  StatAggregateSetResponse,
} from "../types";
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
export function GoalTagSharePanel({ overview }: { overview: PlayerStatOverviewResponse }) {
  const tags = overview.goal_tags;

  return (
    <section className="chart-panel goal-tag-share-panel">
      <header className="chart-panel-header">
        <h3>Goal types</h3>
        <span>{overview.goals_scored.toLocaleString()} goals tagged by the analyzer</span>
      </header>
      {tags.length === 0 ? (
        <p className="subtle">No tagged goals yet for this replay set.</p>
      ) : (
        <div className="rate-chart-rows">
          {tags.map((tag) => (
            <div className="rate-chart-row" key={tag.kind}>
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
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const rotationRoleOrder = ["first_man", "second_man", "third_man", "ambiguous", "unknown"];
const rotationDepthOrder = ["behind_play", "level_with_play", "ahead_of_play", "unknown"];

const rotationDepthSegmentClass: Record<string, string> = {
  behind_play: "positioning-segment-behind",
  level_with_play: "positioning-segment-level",
  ahead_of_play: "positioning-segment-ahead",
  unknown: "positioning-segment-neutral",
};

/** Rotation role/depth time shares plus most-back/forward comparison and stint histogram. */
export function RotationTimeSharePanel({
  overview,
  stats,
}: {
  overview: PlayerStatOverviewResponse;
  stats: StatAggregateSetResponse;
}) {
  const roles = orderTimeShares(overview.rotation_roles, "rotation_role_", rotationRoleOrder);
  const depths = orderTimeShares(overview.rotation_depths, "rotation_depth_", rotationDepthOrder);
  const roleTotal = totalSeconds(roles);
  const depthTotal = totalSeconds(depths);
  const histogram = stats.rotation_duration_histogram;
  const maxHistogramCount = histogram.reduce((max, bucket) => Math.max(max, bucket.count), 0);

  return (
    <section className="chart-panel full-span rotation-share-panel">
      <header className="chart-panel-header">
        <h3>Rotation time shares</h3>
        <span>Where this player spends time in the rotation across the replay set</span>
      </header>
      <div className="rotation-share-grid">
        <div className="rotation-share-block">
          <h4>Role</h4>
          <SegmentedBar
            ariaLabel="Rotation role time share"
            className="positioning-track"
            segments={roles.map((share) => rotationSegment(share, "rotation_role_", roleTotal))}
            total={roleTotal}
          />
          <TimeShareLegend prefix="rotation_role_" shares={roles} total={roleTotal} />
        </div>
        <div className="rotation-share-block">
          <h4>Depth</h4>
          <SegmentedBar
            ariaLabel="Rotation depth time share"
            className="positioning-track"
            segments={depths.map((share) => rotationSegment(share, "rotation_depth_", depthTotal))}
            total={depthTotal}
          />
          <TimeShareLegend prefix="rotation_depth_" shares={depths} total={depthTotal} />
        </div>
        <MostBackForwardBlock stats={stats} />
        {histogram.length > 0 ? (
          <div className="rotation-share-block rotation-histogram-block">
            <h4>First man stint lengths</h4>
            <div className="rotation-histogram" role="img" aria-label="First man stint length histogram">
              {histogram.map((bucket) => (
                <div
                  className="rotation-histogram-bar"
                  key={bucket.min_seconds}
                  title={`${bucket.min_seconds}-${bucket.max_seconds}s: ${bucket.count.toLocaleString()} stints`}
                >
                  <span
                    className="rotation-histogram-fill"
                    style={{ height: `${barPercent(bucket.count, maxHistogramCount)}%` }}
                  />
                  <span className="rotation-histogram-label">{bucket.min_seconds}s</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
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

function TimeShareLegend({
  prefix,
  shares,
  total,
}: {
  prefix: string;
  shares: RotationTimeShareResponse[];
  total: number;
}) {
  return (
    <ul className="rotation-share-legend">
      {shares.map((share) => (
        <li key={share.key}>
          <span className={`rotation-legend-swatch source-segment ${rotationSegmentClass(share.key, prefix)}`} />
          {share.display_name}
          <strong>{formatShare(total > 0 ? share.seconds / total : null)}</strong>
        </li>
      ))}
    </ul>
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
        <KickoffMetric label="Avg first touch" value={formatSecondsValue(metric("avg_first_touch_time"))} />
        <KickoffMetric label="Avg boost delta" value={formatSigned(metric("avg_boost_delta"))} />
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

function rotationSegment(share: RotationTimeShareResponse, prefix: string, total: number): SegmentedBarSegment {
  const fraction = total > 0 ? share.seconds / total : 0;
  return {
    key: share.key,
    className: rotationSegmentClass(share.key, prefix),
    label: share.display_name,
    value: share.seconds,
    visibleLabel: fraction >= 0.12 ? `${share.display_name}: ${formatShare(fraction)}` : undefined,
    title: `${share.display_name}: ${formatDurationSeconds(share.seconds)} (${formatShare(fraction)})`,
  };
}

function rotationSegmentClass(key: string, prefix: string): string {
  const suffix = key.startsWith(prefix) ? key.slice(prefix.length) : key;
  if (prefix === "rotation_depth_") {
    return rotationDepthSegmentClass[suffix] ?? "positioning-segment-neutral";
  }
  return `rotation-role-segment-${suffix}`;
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

function totalSeconds(shares: RotationTimeShareResponse[]): number {
  return shares.reduce((total, share) => total + share.seconds, 0);
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
