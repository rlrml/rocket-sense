-- Team grain for the rank benchmark.
--
-- Alongside the per-player benchmark ("how does a typical player at this rank
-- perform"), the refresh job now also materializes a TEAM grain: one sample
-- unit per (replay, team) whose roster is complete and fully ranked. Team rows
-- answer "how much does a whole team at this rank produce per team-active
-- minute" -- the denominator is the replay's live-play length, not the sum of
-- the players' seconds, so a 3v3 team doesn't get 3x the minutes.
--
-- `grain` distinguishes the two populations in both tables:
--   * 'player' -- the existing per-player rows (unchanged semantics).
--   * 'team'   -- per-team-game rows; rank_value is the team's rounded average
--                 tier (or its pooled group), and for `rank_benchmark_population`
--                 `replay_count` counts distinct team-games while
--                 `distinct_player_count` counts the distinct players
--                 contributing to the bucket's teams.
--
-- Existing rows are all player-grain, so the column defaults to 'player'. The
-- PKs and lookup indexes are rebuilt to include `grain` right after
-- `playlist_group_key` (every read filters by exactly one grain).

ALTER TABLE rank_benchmark_stats
    ADD COLUMN grain text NOT NULL DEFAULT 'player',
    ADD CONSTRAINT rank_benchmark_stats_grain_check CHECK (grain IN ('player', 'team'));

ALTER TABLE rank_benchmark_stats DROP CONSTRAINT rank_benchmark_stats_pkey;
ALTER TABLE rank_benchmark_stats
    ADD PRIMARY KEY (window_key, playlist_group_key, grain, rank_grouping, rank_value, outcome, metric_key);

DROP INDEX rank_benchmark_stats_lookup_idx;
CREATE INDEX rank_benchmark_stats_lookup_idx
    ON rank_benchmark_stats (window_key, playlist_group_key, grain, rank_grouping, rank_value, outcome);

ALTER TABLE rank_benchmark_population
    ADD COLUMN grain text NOT NULL DEFAULT 'player',
    ADD CONSTRAINT rank_benchmark_population_grain_check CHECK (grain IN ('player', 'team'));

ALTER TABLE rank_benchmark_population DROP CONSTRAINT rank_benchmark_population_pkey;
ALTER TABLE rank_benchmark_population
    ADD PRIMARY KEY (window_key, playlist_group_key, grain, rank_grouping, rank_value, outcome);

DROP INDEX rank_benchmark_population_lookup_idx;
CREATE INDEX rank_benchmark_population_lookup_idx
    ON rank_benchmark_population (window_key, playlist_group_key, grain, rank_grouping, rank_value, outcome);
