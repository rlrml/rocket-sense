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
CREATE TABLE rank_benchmark_stats (
    window_key text NOT NULL,
    playlist_group_key text NOT NULL,
    rank_tier integer NOT NULL,
    outcome text NOT NULL,
    event_type_id integer NOT NULL REFERENCES event_types(id),
    median_per_active_minute double precision,
    median_per_non_demo_active_minute double precision,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (window_key, playlist_group_key, rank_tier, outcome, event_type_id),
    CHECK (window_key <> ''),
    CHECK (playlist_group_key <> ''),
    CHECK (outcome IN ('all', 'win', 'loss'))
);

-- Sample adequacy per (window, playlist group, tier, outcome). distinct_player_count
-- gates noisy tiers and feeds the tier picker; replay_count is informational.
CREATE TABLE rank_benchmark_population (
    window_key text NOT NULL,
    playlist_group_key text NOT NULL,
    rank_tier integer NOT NULL,
    outcome text NOT NULL,
    distinct_player_count integer NOT NULL,
    replay_count integer NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (window_key, playlist_group_key, rank_tier, outcome),
    CHECK (window_key <> ''),
    CHECK (playlist_group_key <> ''),
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
    computed_at timestamptz NOT NULL DEFAULT now(),
    CHECK (window_key <> ''),
    CHECK (window_kind IN ('rolling', 'season'))
);

-- Reads look up a single (window, group, tier, outcome) and fan out over event
-- types; the PK already orders by that prefix, but an explicit index keeps the
-- per-cell lookup covering when the PK is not chosen.
CREATE INDEX rank_benchmark_stats_lookup_idx
    ON rank_benchmark_stats (window_key, playlist_group_key, rank_tier, outcome);

-- The tier/window picker scans all tiers for a (window, group): population rows
-- keyed by the same prefix serve the available-tier list and sample gate.
CREATE INDEX rank_benchmark_population_lookup_idx
    ON rank_benchmark_population (window_key, playlist_group_key, rank_tier, outcome);
