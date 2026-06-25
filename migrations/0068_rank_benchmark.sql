-- Rank-median benchmark cohort for lifetime stats.
--
-- The lifetime stats view shows, per stat, a bar for the player plus bars for
-- their teammates and opponents -- cohorts derived from the player's OWN games
-- (added in a1c93aae / 26bbdd03). This materializes a fourth cohort, "Rank
-- median": a benchmark of *all players at a given rank tier* in the relevant
-- playlist group, NOT drawn from the viewed player's matches. It answers "how do
-- I compare to a typical player at my rank."
--
-- Methodology -- median of per-player rates (see docs/rank-benchmark-cohort.md):
-- for each qualifying player at the tier we compute their own per-active-minute
-- rate (sum(events) * 60 / sum(active_seconds)); the benchmark is the median
-- across players (percentile_cont(0.5)). Robust to smurf/one-game outliers and
-- to minute-weighting by grinders that a naive pooled sum/sum average suffers
-- from. Medians are NOT additive, so `outcome` ('all', 'win', 'loss') is stored
-- explicitly -- `all` is computed directly, never reconstructed from win+loss --
-- and each cell stores the median scalar, not sums.
--
-- The population is bounded by a `window_key` (a `BenchmarkWindow` strategy in
-- the server: rolling N months or a season). The refresh job materializes every
-- configured window; the read serves a default window and accepts an override.
--
-- DDL-only: these tables are populated by `refresh_rank_benchmark` (a recurring
-- background job + manual admin trigger), gated behind ROCKET_SENSE_RANK_BENCHMARK
-- (default off) until the first refresh has run.

-- Median per (window, playlist group, tier, outcome, event type). One scalar
-- per cell -- medians are not additive, so we cannot store sums and divide.
--
-- `rank_grouping` picks the rank granularity: 'tier' rows key on the exact
-- PsyNet tier (`rank_value` = 1..22), 'group' rows pool a rank's three
-- divisions into one bucket (`rank_value` = 0 Bronze .. 7 Supersonic Legend) so
-- sparse tiers still get a usable sample. The read path serves the exact tier
-- when its population clears the sample gate, else falls back to the group.
CREATE TABLE rank_benchmark_stats (
    window_key text NOT NULL,
    playlist_group_key text NOT NULL,
    rank_grouping text NOT NULL,
    rank_value integer NOT NULL,
    outcome text NOT NULL,
    event_type_id integer NOT NULL REFERENCES event_types(id),
    -- Median of per-player rates ("the typical player") and the pooled mean
    -- (total events / total active time). `aggregator` records which one the
    -- read path serves: 'median' for common stats, 'mean' for rare mechanics
    -- whose per-player median is 0 (so the bar isn't flatlined). Both are stored
    -- so the choice can be revisited without a recompute.
    median_per_active_minute double precision,
    median_per_non_demo_active_minute double precision,
    mean_per_active_minute double precision,
    mean_per_non_demo_active_minute double precision,
    aggregator text NOT NULL DEFAULT 'median',
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (window_key, playlist_group_key, rank_grouping, rank_value, outcome, event_type_id),
    CHECK (window_key <> ''),
    CHECK (playlist_group_key <> ''),
    CHECK (rank_grouping IN ('tier', 'group')),
    CHECK (aggregator IN ('median', 'mean')),
    CHECK (outcome IN ('all', 'win', 'loss'))
);

-- Sample adequacy per (window, group, rank_grouping, rank_value, outcome).
-- distinct_player_count gates noisy buckets, feeds the tier picker, and drives
-- the tier->group fallback; replay_count is informational.
CREATE TABLE rank_benchmark_population (
    window_key text NOT NULL,
    playlist_group_key text NOT NULL,
    rank_grouping text NOT NULL,
    rank_value integer NOT NULL,
    outcome text NOT NULL,
    distinct_player_count integer NOT NULL,
    replay_count integer NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (window_key, playlist_group_key, rank_grouping, rank_value, outcome),
    CHECK (window_key <> ''),
    CHECK (playlist_group_key <> ''),
    CHECK (rank_grouping IN ('tier', 'group')),
    CHECK (outcome IN ('all', 'win', 'loss'))
);

-- Per-window resolved bounds + display metadata. A rolling window records the
-- concrete [window_start, window_end] it resolved to; a season window also
-- records the season code. display_label drives "last 6 months" / "Season X"
-- copy and staleness checks (computed_at).
CREATE TABLE rank_benchmark_meta (
    window_key text PRIMARY KEY,
    window_kind text NOT NULL,
    window_start timestamptz,
    window_end timestamptz,
    season_code text,
    display_label text NOT NULL,
    calc_style text NOT NULL DEFAULT 'per-appearance',
    computed_at timestamptz NOT NULL DEFAULT now(),
    CHECK (window_key <> ''),
    CHECK (window_kind IN ('rolling', 'season')),
    CHECK (calc_style IN ('per-appearance', 'per-player'))
);

-- Reads look up a single (window, group, rank_grouping, rank_value, outcome) and
-- fan out over event types; the PK already orders by that prefix, but an
-- explicit index keeps the per-cell lookup covering when the PK is not chosen.
CREATE INDEX rank_benchmark_stats_lookup_idx
    ON rank_benchmark_stats (window_key, playlist_group_key, rank_grouping, rank_value, outcome);

-- The tier/window picker scans all buckets for a (window, group): population
-- rows keyed by the same prefix serve the available-tier list and sample gate.
CREATE INDEX rank_benchmark_population_lookup_idx
    ON rank_benchmark_population (window_key, playlist_group_key, rank_grouping, rank_value, outcome);
