import { useEffect, useMemo, useState } from "react";
import { getPlayerGameOutcomes } from "../api";
import type { GameOutcomeRow } from "../types";

// The Outcomes section distributes game results for one target player: win/loss
// record, records by goal margin, a signed margin histogram, goal-count
// histograms, and a scoreline heatmap. Everything is computed client-side from
// the per-game rows returned by /api/v1/stats/game-outcomes; there is no
// replay- or group-scope analogue, so this section is player-scope only.

// --- distribution computation ---------------------------------------------------

interface OutcomeSummary {
  games: number;
  wins: number;
  losses: number;
  ties: number;
  /** Wins over all games (ties count against, matching the record strip). */
  winRate: number | null;
  /** Signed goal margin (team − opponent) per game. */
  margins: number[];
  marginRecords: MarginRecord[];
}

interface MarginRecord {
  label: string;
  wins: number;
  losses: number;
}

function computeOutcomeSummary(games: GameOutcomeRow[]): OutcomeSummary {
  let wins = 0;
  let losses = 0;
  let ties = 0;
  const margins: number[] = [];
  for (const game of games) {
    const margin = game.team_score - game.opponent_score;
    margins.push(margin);
    if (margin > 0) wins += 1;
    else if (margin < 0) losses += 1;
    else ties += 1;
  }

  const marginRecords: MarginRecord[] = [1, 2, 3].map((magnitude) => ({
    label: `${magnitude}-goal games`,
    wins: margins.filter((margin) => margin === magnitude).length,
    losses: margins.filter((margin) => margin === -magnitude).length,
  }));
  marginRecords.push({
    label: "4+ goal games",
    wins: margins.filter((margin) => margin >= 4).length,
    losses: margins.filter((margin) => margin <= -4).length,
  });

  return {
    games: games.length,
    wins,
    losses,
    ties,
    winRate: games.length > 0 ? wins / games.length : null,
    margins,
    marginRecords,
  };
}

function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function formatStat(value: number | null): string {
  if (value == null) return "–";
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function formatPercent(value: number | null): string {
  return value == null ? "–" : `${(value * 100).toFixed(1)}%`;
}

function formatCountNoun(count: number, noun: string): string {
  return `${count} ${count === 1 ? noun : `${noun}s`}`;
}

function possessiveName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "Player's";
  return trimmed.endsWith("s") ? `${trimmed}'` : `${trimmed}'s`;
}

interface IntegerBucket {
  value: number;
  label: string;
  count: number;
}

interface IntegerBucketOptions {
  floor?: number;
  minBucket?: number;
  maxBucket?: number;
}

// Contiguous integer buckets covering the clamped value range plus the floor, so
// histograms always show every intermediate bucket (including empty ones).
function integerBuckets(values: number[], options: IntegerBucketOptions = {}): IntegerBucket[] {
  if (values.length === 0) return [];
  const { floor = 0, minBucket, maxBucket } = options;
  const bucketValues = values.map((value) => {
    const lowerBounded = minBucket == null ? value : Math.max(value, minBucket);
    return maxBucket == null ? lowerBounded : Math.min(lowerBounded, maxBucket);
  });
  const lo = Math.min(floor, minBucket ?? floor, ...bucketValues);
  let hi = Math.max(floor, maxBucket ?? floor, ...bucketValues);
  // Guard against a degenerate single-bucket span rendering as one giant bar.
  if (lo === hi) hi = lo + 1;
  const buckets: IntegerBucket[] = [];
  for (let value = lo; value <= hi; value += 1) {
    const lowerCapped = minBucket != null && value === minBucket;
    const upperCapped = maxBucket != null && value === maxBucket;
    const label = lowerCapped ? `<=${value}` : upperCapped ? `${value}+` : String(value);
    buckets.push({ value, label, count: 0 });
  }
  for (const value of bucketValues) {
    buckets[value - lo].count += 1;
  }
  return buckets;
}

function maxBucketShare(series: Array<{ values: number[] } & IntegerBucketOptions>): number {
  return Math.max(
    0,
    ...series.flatMap(({ values, ...options }) =>
      integerBuckets(values, options).map((bucket) =>
        values.length > 0 ? bucket.count / values.length : 0,
      ),
    ),
  );
}

function signedBucketLabel(bucket: IntegerBucket): string {
  return bucket.value > 0 ? `+${bucket.label}` : bucket.label;
}

// --- histogram -------------------------------------------------------------------

type BarTone = "positive" | "negative" | "neutral";

function Histogram({
  title,
  values,
  noun,
  tone,
  minBucket,
  maxBucket,
  scaleMaxShare,
}: {
  title: string;
  values: number[];
  noun: string;
  /** Fixed tone for every bar, or per-bucket-value tone (the margin histogram). */
  tone: BarTone | ((bucketValue: number) => BarTone);
  minBucket?: number;
  maxBucket?: number;
  scaleMaxShare?: number;
}) {
  const buckets = useMemo(
    () => integerBuckets(values, { minBucket, maxBucket }),
    [maxBucket, minBucket, values],
  );
  const meanValue = mean(values);
  const medianValue = median(values);
  const ownMaxShare = Math.max(
    0,
    ...buckets.map((bucket) => (values.length > 0 ? bucket.count / values.length : 0)),
  );
  const yScaleMaxShare = Math.max(Number.EPSILON, scaleMaxShare ?? ownMaxShare);
  const signedLabels = typeof tone === "function";

  return (
    <div className="outcomes-histogram">
      <div className="outcomes-histogram-heading">
        <h4>{title}</h4>
        <span>
          mean {formatStat(meanValue)} · median {formatStat(medianValue)}
        </span>
      </div>
      {buckets.length === 0 ? (
        <div className="stat-empty">No games in the current replay set.</div>
      ) : (
        <div className="outcomes-histogram-bars" role="img" aria-label={`${title} histogram`}>
          {buckets.map((bucket) => {
            const barTone = typeof tone === "function" ? tone(bucket.value) : tone;
            const share = values.length > 0 ? bucket.count / values.length : 0;
            const shareLabel = formatPercent(share);
            const label = signedLabels ? signedBucketLabel(bucket) : bucket.label;
            const scaledHeight = share > 0 ? (share / yScaleMaxShare) * 100 : 0;
            return (
              <div
                key={bucket.value}
                className="outcomes-histogram-column"
                title={`${label}: ${formatCountNoun(bucket.count, noun)} (${shareLabel})`}
              >
                <div className="outcomes-histogram-count">
                  {bucket.count > 0 ? bucket.count : ""}
                </div>
                <div className="outcomes-histogram-track">
                  <div
                    className={`outcomes-histogram-bar outcomes-bar-${barTone}${bucket.count > 0 ? " outcomes-histogram-bar-labeled" : ""}`}
                    style={{ height: `${scaledHeight}%` }}
                  >
                    {bucket.count > 0 ? (
                      <span className="outcomes-histogram-share">{shareLabel}</span>
                    ) : null}
                  </div>
                </div>
                <div className="outcomes-histogram-label">{label}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- scoreline heatmap -------------------------------------------------------------

function ScorelineHeatmap({ games, playerName }: { games: GameOutcomeRow[]; playerName: string }) {
  const { cells, maxTeam, maxOpponent, maxCount } = useMemo(() => {
    const counts = new Map<string, number>();
    let maxTeam = 0;
    let maxOpponent = 0;
    let maxCount = 0;
    for (const game of games) {
      maxTeam = Math.max(maxTeam, game.team_score);
      maxOpponent = Math.max(maxOpponent, game.opponent_score);
      const key = `${game.team_score}:${game.opponent_score}`;
      const next = (counts.get(key) ?? 0) + 1;
      counts.set(key, next);
      maxCount = Math.max(maxCount, next);
    }
    return { cells: counts, maxTeam, maxOpponent, maxCount };
  }, [games]);

  if (games.length === 0) {
    return <div className="stat-empty">No games in the current replay set.</div>;
  }

  const playerPossessive = possessiveName(playerName);
  // Rows: the profile player's team goals descending so wins collect toward the top-right.
  const teamValues: number[] = [];
  for (let value = maxTeam; value >= 0; value -= 1) teamValues.push(value);
  const opponentValues: number[] = [];
  for (let value = 0; value <= maxOpponent; value += 1) opponentValues.push(value);

  return (
    <div className="outcomes-heatmap-wrap">
      <div className="outcomes-heatmap-y-title">{playerPossessive} team goals</div>
      <div className="outcomes-heatmap-body">
        <div
          className="outcomes-heatmap"
          style={{ gridTemplateColumns: `auto repeat(${opponentValues.length}, 1fr)` }}
        >
          {teamValues.map((team) => (
            <div
              key={`row-${team}`}
              className="outcomes-heatmap-row"
              style={{ display: "contents" }}
            >
              <div className="outcomes-heatmap-axis-label">{team}</div>
              {opponentValues.map((opponent) => {
                const count = cells.get(`${team}:${opponent}`) ?? 0;
                const tone =
                  team > opponent
                    ? "var(--outcome-positive)"
                    : team < opponent
                      ? "var(--outcome-negative)"
                      : "var(--muted)";
                // Opacity scale over frequency; empty cells stay near-white so
                // the win/loss/tie regions still read from the faint base tint.
                // Capped at 70% so the count stays legible on the densest cell.
                const share = maxCount > 0 ? count / maxCount : 0;
                const mix = count > 0 ? 16 + Math.round(share * 54) : 4;
                return (
                  <div
                    key={`${team}:${opponent}`}
                    className={`outcomes-heatmap-cell${team === opponent ? " outcomes-heatmap-tie" : ""}`}
                    style={{ background: `color-mix(in srgb, ${tone} ${mix}%, white)` }}
                    title={`${team}–${opponent}: ${count} game${count === 1 ? "" : "s"}${team === opponent ? " (tie)" : ""}`}
                  >
                    {count > 0 ? count : ""}
                  </div>
                );
              })}
            </div>
          ))}
          <div className="outcomes-heatmap-axis-label" />
          {opponentValues.map((opponent) => (
            <div key={`col-${opponent}`} className="outcomes-heatmap-axis-label">
              {opponent}
            </div>
          ))}
        </div>
        <div className="outcomes-heatmap-x-title">{playerPossessive} opponents' goals</div>
      </div>
    </div>
  );
}

// --- page ---------------------------------------------------------------------------

function RecordStrip({ summary, playerName }: { summary: OutcomeSummary; playerName: string }) {
  const items: Array<{ label: string; value: string }> = [
    { label: "Games", value: summary.games.toLocaleString() },
    { label: "Wins", value: summary.wins.toLocaleString() },
    { label: "Losses", value: summary.losses.toLocaleString() },
  ];
  if (summary.ties > 0) {
    items.push({ label: "Ties", value: summary.ties.toLocaleString() });
  }
  items.push({ label: "Win rate", value: formatPercent(summary.winRate) });

  return (
    <section className="chart-panel outcomes-summary" aria-label={`${playerName} record`}>
      {items.map((item) => (
        <div key={item.label} className="outcomes-summary-item">
          <div className="outcomes-summary-value">{item.value}</div>
          <div className="outcomes-summary-label">{item.label}</div>
        </div>
      ))}
    </section>
  );
}

const MARGIN_SEGMENT_LABEL_MIN_SCALED_SHARE = 0.12;

function MarginRecords({
  records,
  games,
  playerName,
}: {
  records: MarginRecord[];
  games: number;
  playerName: string;
}) {
  const playerPossessive = possessiveName(playerName);
  const playerTeamLabel = `${playerPossessive} team wins`;
  const opponentTeamLabel = "Opponent team wins";
  const maxShare = Math.max(
    Number.EPSILON,
    ...records.map((record) => (games > 0 ? (record.wins + record.losses) / games : 0)),
  );
  return (
    <div className="outcomes-margin-records">
      <div className="outcomes-margin-chart-legend" aria-hidden="true">
        <span className="outcomes-margin-legend-item">
          <span className="outcomes-margin-swatch outcomes-margin-swatch-positive" />
          {playerTeamLabel}
        </span>
        <span className="outcomes-margin-legend-item">
          <span className="outcomes-margin-swatch outcomes-margin-swatch-negative" />
          {opponentTeamLabel}
        </span>
      </div>
      <div className="outcomes-margin-chart">
        {records.map((record) => {
          const total = record.wins + record.losses;
          const share = games > 0 ? total / games : 0;
          const heightPercent = total > 0 ? (share / maxShare) * 100 : 0;
          const winHeight = total > 0 ? (record.wins / total) * 100 : 0;
          const lossHeight = total > 0 ? (record.losses / total) * 100 : 0;
          const winScaledShare = games > 0 ? record.wins / games / maxShare : 0;
          const lossScaledShare = games > 0 ? record.losses / games / maxShare : 0;
          const recordLabel = `${record.wins.toLocaleString()}–${record.losses.toLocaleString()}`;
          const valueLabel = `${record.wins.toLocaleString()}–${record.losses.toLocaleString()} (${total.toLocaleString()}, ${formatPercent(share)})`;
          return (
            <div
              key={record.label}
              className="outcomes-margin-column"
              title={`${record.label}: ${record.wins} wins, ${record.losses} losses (${formatPercent(share)})`}
            >
              <div className="outcomes-margin-column-value">
                <span>{recordLabel}</span>
                <span className="outcomes-margin-column-share">
                  ({total.toLocaleString()}, {formatPercent(share)})
                </span>
              </div>
              <div
                aria-label={`${record.label}: ${valueLabel}`}
                className="outcomes-margin-vertical-track"
                role="img"
              >
                <div
                  className="outcomes-margin-vertical-fill"
                  style={{ height: `${heightPercent}%` }}
                >
                  <div
                    className="outcomes-margin-vertical-segment outcomes-bar-positive"
                    style={{ height: `${winHeight}%` }}
                    title={`${playerTeamLabel}: ${formatCountNoun(record.wins, "game")}`}
                  >
                    {winScaledShare >= MARGIN_SEGMENT_LABEL_MIN_SCALED_SHARE
                      ? record.wins.toLocaleString()
                      : ""}
                  </div>
                  <div
                    className="outcomes-margin-vertical-segment outcomes-bar-negative"
                    style={{ height: `${lossHeight}%` }}
                    title={`${opponentTeamLabel}: ${formatCountNoun(record.losses, "game")}`}
                  >
                    {lossScaledShare >= MARGIN_SEGMENT_LABEL_MIN_SCALED_SHARE
                      ? record.losses.toLocaleString()
                      : ""}
                  </div>
                </div>
              </div>
              <div className="outcomes-margin-record-label">{record.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Career / period view: fetches every per-game outcome row for the player's
// filtered replay set. Self-fetching like BoostProfileDetail/GroundPlayProfileDetail
// so the section drops into the player stats page without threading state.
export function OutcomesProfileDetail({
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
  const [games, setGames] = useState<GameOutcomeRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setGames(null);
    getPlayerGameOutcomes(platform, platformPlayerId, new URLSearchParams(search))
      .then((rows) => {
        if (!cancelled) setGames(rows);
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

  const summary = useMemo(() => (games ? computeOutcomeSummary(games) : null), [games]);
  const goalSeries = useMemo(() => {
    if (!games) return null;
    return {
      team: {
        total: games.map((game) => game.team_score + game.opponent_score),
        playerTeam: games.map((game) => game.team_score),
        opponentTeam: games.map((game) => game.opponent_score),
      },
      players: {
        player: games.map((game) => game.player_goals),
        teammates: games.flatMap((game) => game.teammate_goal_counts),
        opponents: games.flatMap((game) => game.opponent_goal_counts),
      },
    };
  }, [games]);
  const goalScales = useMemo(() => {
    if (!goalSeries) return null;
    return {
      team: maxBucketShare([
        { values: goalSeries.team.total },
        { values: goalSeries.team.playerTeam, maxBucket: 7 },
        { values: goalSeries.team.opponentTeam, maxBucket: 7 },
      ]),
      players: maxBucketShare([
        { values: goalSeries.players.player, maxBucket: 5 },
        { values: goalSeries.players.teammates, maxBucket: 5 },
        { values: goalSeries.players.opponents, maxBucket: 5 },
      ]),
    };
  }, [goalSeries]);

  if (loading) {
    return <div className="stat-empty">Loading game outcomes...</div>;
  }
  if (error) {
    return <div className="stat-empty">Game outcomes are unavailable: {error}</div>;
  }
  if (!games || !summary || !goalSeries || !goalScales || games.length === 0) {
    return <div className="stat-empty">No finished games are in this replay set yet.</div>;
  }

  const marginTone = (margin: number): BarTone =>
    margin > 0 ? "positive" : margin < 0 ? "negative" : "neutral";
  const playerPossessive = possessiveName(playerName);

  return (
    <div className="outcomes-detail">
      <RecordStrip summary={summary} playerName={playerName} />

      <section className="chart-panel">
        <h3>Goal margin outcomes</h3>
        <MarginRecords
          records={summary.marginRecords}
          games={summary.games}
          playerName={playerName}
        />
      </section>

      <section className="chart-panel">
        <h3>Goal margin</h3>
        <Histogram
          title="Margin distribution"
          values={summary.margins}
          noun="game"
          tone={marginTone}
          minBucket={-4}
          maxBucket={4}
        />
      </section>

      <section className="chart-panel">
        <h3>Team goals per game</h3>
        <div className="outcomes-histogram-grid">
          <Histogram
            title="Total goals in game"
            values={goalSeries.team.total}
            noun="game"
            tone="neutral"
            scaleMaxShare={goalScales.team}
          />
          <Histogram
            title={`${playerPossessive} team goals`}
            values={goalSeries.team.playerTeam}
            noun="game"
            tone="positive"
            maxBucket={7}
            scaleMaxShare={goalScales.team}
          />
          <Histogram
            title={`${playerPossessive} opponents' team goals`}
            values={goalSeries.team.opponentTeam}
            noun="game"
            tone="negative"
            maxBucket={7}
            scaleMaxShare={goalScales.team}
          />
        </div>
      </section>

      <section className="chart-panel">
        <h3>Player goals by appearance</h3>
        <div className="outcomes-histogram-grid">
          <Histogram
            title={`${playerPossessive} goals`}
            values={goalSeries.players.player}
            noun="game"
            tone="positive"
            maxBucket={5}
            scaleMaxShare={goalScales.players}
          />
          <Histogram
            title={`${playerPossessive} teammates' goals`}
            values={goalSeries.players.teammates}
            noun="appearance"
            tone="positive"
            maxBucket={5}
            scaleMaxShare={goalScales.players}
          />
          <Histogram
            title={`${playerPossessive} opponents' goals`}
            values={goalSeries.players.opponents}
            noun="appearance"
            tone="negative"
            maxBucket={5}
            scaleMaxShare={goalScales.players}
          />
        </div>
      </section>

      <section className="chart-panel">
        <h3>Scorelines</h3>
        <ScorelineHeatmap games={games} playerName={playerName} />
      </section>
    </div>
  );
}
