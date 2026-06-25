-- Generalize the rank-median benchmark from event counts to *every* lifetime
-- stat. The grain's stat dimension changes from `event_type_id` (an FK into
-- event_types) to a free-form `metric_key`, so the same median/mean/aggregator/
-- rank-group machinery can carry metrics drawn from any per-replay-player fact
-- table: event counts (`goal`, `save`, ...), boost (`boost:collected`, ...),
-- movement (`movement:avg_speed`, ...), stat facts (`fact:ball-advance`, ...),
-- possession, and positioning.
--
-- Every metric reduces to a per-unit `(numerator, denominator)` pair so the read
-- columns stay the same: `*_per_active_minute` holds the served scalar (a
-- per-minute rate for counts/totals, or the level itself for gauges like avg
-- speed). Event metric keys stay unprefixed so the existing read path keeps
-- matching them by stat key.
--
-- `rank_benchmark_stats` is a regenerable cache (rebuilt by every refresh), so
-- this drops and recreates it rather than migrating rows.

DROP TABLE IF EXISTS rank_benchmark_stats;

CREATE TABLE rank_benchmark_stats (
    window_key text NOT NULL,
    playlist_group_key text NOT NULL,
    rank_grouping text NOT NULL,
    rank_value integer NOT NULL,
    outcome text NOT NULL,
    metric_key text NOT NULL,
    median_per_active_minute double precision,
    median_per_non_demo_active_minute double precision,
    mean_per_active_minute double precision,
    mean_per_non_demo_active_minute double precision,
    aggregator text NOT NULL DEFAULT 'median',
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (window_key, playlist_group_key, rank_grouping, rank_value, outcome, metric_key),
    CHECK (window_key <> ''),
    CHECK (playlist_group_key <> ''),
    CHECK (rank_grouping IN ('tier', 'group')),
    CHECK (aggregator IN ('median', 'mean')),
    CHECK (metric_key <> ''),
    CHECK (outcome IN ('all', 'win', 'loss'))
);

CREATE INDEX rank_benchmark_stats_lookup_idx
    ON rank_benchmark_stats (window_key, playlist_group_key, rank_grouping, rank_value, outcome);
