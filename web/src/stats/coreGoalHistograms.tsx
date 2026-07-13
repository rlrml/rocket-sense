import { useEffect, useMemo, useState } from "react";
import { getPlayerGameOutcomes } from "../api";
import type { GameOutcomeRow, RankBenchmarkCohort } from "../types";
import {
  careerCohortClassName,
  playerTeamLabel,
  rankAverageShadeClass,
  rankCohortIconUrl,
} from "./shared";
import type { CoreProfileView } from "./playerPanels";

const GOAL_BUCKETS = [
  { id: "0", label: "0", min: 0, max: 0 },
  { id: "1", label: "1", min: 1, max: 1 },
  { id: "2", label: "2", min: 2, max: 2 },
  { id: "3", label: "3", min: 3, max: 3 },
  { id: "4", label: "4", min: 4, max: 4 },
  { id: "5_plus", label: "5+", min: 5, max: null },
] as const;

interface GoalBucketValue {
  id: string;
  label: string;
  count: number | null;
  share: number;
}

interface GoalHistogramSubject {
  key: string;
  title: string;
  subtitle: string;
  className: string;
  buckets: GoalBucketValue[];
  iconUrl?: string;
}

function bucketMetricKey(bucketId: string): string {
  return `core:goal_games:${bucketId}`;
}

function bucketIncludes(bucket: (typeof GOAL_BUCKETS)[number], value: number): boolean {
  return value >= bucket.min && (bucket.max == null || value <= bucket.max);
}

function bucketValues(values: number[]): GoalBucketValue[] {
  const total = values.length;
  return GOAL_BUCKETS.map((bucket) => {
    const count = values.filter((value) => bucketIncludes(bucket, value)).length;
    return {
      id: bucket.id,
      label: bucket.label,
      count,
      share: total > 0 ? count / total : 0,
    };
  });
}

function rankBucketValues(
  cohort: RankBenchmarkCohort,
  view: CoreProfileView,
): GoalBucketValue[] | null {
  const stats = view === "team" ? (cohort.team_per_stat ?? {}) : cohort.per_stat;
  const hasAny = GOAL_BUCKETS.some((bucket) => {
    const value = stats[bucketMetricKey(bucket.id)]?.value;
    return value != null && Number.isFinite(value);
  });
  if (!hasAny) return null;

  return GOAL_BUCKETS.map((bucket) => {
    const value = stats[bucketMetricKey(bucket.id)]?.value;
    const share = value != null && Number.isFinite(value) ? Math.max(0, value) : 0;
    return {
      id: bucket.id,
      label: bucket.label,
      count: null,
      share,
    };
  });
}

function flattenGoalCounts(
  games: GameOutcomeRow[],
  key: "teammate_goal_counts" | "opponent_goal_counts",
): number[] {
  return games.flatMap((game) => game[key] ?? []);
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count.toLocaleString()} ${count === 1 ? singular : plural}`;
}

function actualSubject(
  key: string,
  title: string,
  subtitle: string,
  className: string,
  values: number[],
): GoalHistogramSubject | null {
  if (values.length === 0) return null;
  return {
    key,
    title,
    subtitle,
    className,
    buckets: bucketValues(values),
  };
}

function buildSubjects(
  games: GameOutcomeRow[],
  playerName: string,
  view: CoreProfileView,
  rankCohorts: RankBenchmarkCohort[],
  rankWindowLabel?: string | null,
): GoalHistogramSubject[] {
  const teammateGoalCounts = flattenGoalCounts(games, "teammate_goal_counts");
  const opponentGoalCounts = flattenGoalCounts(games, "opponent_goal_counts");
  const actual =
    view === "team"
      ? [
          actualSubject(
            "team",
            playerTeamLabel(playerName),
            pluralize(games.length, "game"),
            careerCohortClassName("player"),
            games.map((game) => game.team_score),
          ),
          actualSubject(
            "opponent-team",
            "Opponent team",
            pluralize(games.length, "game"),
            careerCohortClassName("opponents"),
            games.map((game) => game.opponent_score),
          ),
        ]
      : [
          actualSubject(
            "player",
            playerName,
            pluralize(games.length, "game"),
            careerCohortClassName("player"),
            games.map((game) => game.player_goals),
          ),
          actualSubject(
            "teammates",
            "Teammates",
            pluralize(teammateGoalCounts.length, "appearance"),
            careerCohortClassName("teammates"),
            teammateGoalCounts,
          ),
          actualSubject(
            "opponents",
            "Opponents",
            pluralize(opponentGoalCounts.length, "appearance"),
            careerCohortClassName("opponents"),
            opponentGoalCounts,
          ),
        ];

  const rankSubjects = rankCohorts.flatMap((cohort): GoalHistogramSubject[] => {
    const buckets = rankBucketValues(cohort, view);
    if (!buckets) return [];
    const icon = rankCohortIconUrl(cohort);
    const subtitle = ["Rank average", rankWindowLabel].filter(Boolean).join(" · ");
    return [
      {
        key: `rank-${cohort.rank_value}`,
        title: cohort.label,
        subtitle,
        className: rankAverageShadeClass(cohort.rank_value, cohort.rank_grouping),
        buckets,
        iconUrl: icon ?? undefined,
      },
    ];
  });

  return [
    ...actual.filter((subject): subject is GoalHistogramSubject => subject !== null),
    ...rankSubjects,
  ];
}

function HistogramTitle({ subject }: { subject: GoalHistogramSubject }) {
  return (
    <div className={`core-goal-histogram-title ${subject.className}`}>
      <strong className="stat-player-name-line">
        {subject.iconUrl ? <img className="rank-cohort-icon" src={subject.iconUrl} alt="" /> : null}
        <span className="stat-player-name-text">{subject.title}</span>
      </strong>
      <span className="stat-player-subtitle">
        <span className="stat-player-subtitle-text">{subject.subtitle}</span>
      </span>
    </div>
  );
}

function GoalHistogram({ subject }: { subject: GoalHistogramSubject }) {
  return (
    <div className={`core-goal-histogram ${subject.className}`}>
      <HistogramTitle subject={subject} />
      <div
        className="outcomes-histogram-bars"
        role="img"
        aria-label={`${subject.title} goal-game distribution`}
      >
        {subject.buckets.map((bucket) => {
          const shareLabel = formatPercent(bucket.share);
          const countLabel = bucket.count == null ? shareLabel : bucket.count.toLocaleString();
          const title =
            bucket.count == null
              ? `${bucket.label} goals: ${shareLabel}`
              : `${bucket.label} goals: ${shareLabel} (${bucket.count.toLocaleString()})`;
          return (
            <div key={bucket.id} className="outcomes-histogram-column" title={title}>
              <div className="outcomes-histogram-count">{bucket.share > 0 ? countLabel : ""}</div>
              <div className="outcomes-histogram-track">
                <div
                  className="outcomes-histogram-bar core-goal-histogram-bar"
                  style={{ height: `${Math.max(0, Math.min(1, bucket.share)) * 100}%` }}
                />
              </div>
              <div className="outcomes-histogram-label">{bucket.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CoreGoalGameHistograms({
  platform,
  platformPlayerId,
  playerName,
  rankCohorts = [],
  rankWindowLabel,
  search,
  view,
}: {
  platform: string;
  platformPlayerId: string;
  playerName: string;
  rankCohorts?: RankBenchmarkCohort[];
  rankWindowLabel?: string | null;
  search: string;
  view: CoreProfileView;
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

  const subjects = useMemo(
    () => (games ? buildSubjects(games, playerName, view, rankCohorts, rankWindowLabel) : []),
    [games, playerName, rankCohorts, rankWindowLabel, view],
  );

  if (loading) {
    return <div className="stat-empty">Loading goal-game distribution...</div>;
  }
  if (error) {
    return <div className="stat-empty">Goal-game distribution is unavailable: {error}</div>;
  }
  if (!games || games.length === 0 || subjects.length === 0) {
    return <div className="stat-empty">No finished games are in this replay set yet.</div>;
  }

  return (
    <section className="chart-panel core-goal-histograms">
      <header className="chart-panel-header">
        <h3>Goal games</h3>
        <span>Share by scoreboard goals</span>
      </header>
      <div className="core-goal-histogram-grid">
        {subjects.map((subject) => (
          <GoalHistogram key={subject.key} subject={subject} />
        ))}
      </div>
    </section>
  );
}
