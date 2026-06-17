-- Materialized population statistics.
--
-- Population stats are computed by explicit batch runs, not request-time
-- aggregation. Runs first reduce appearances to one row per qualifying player
-- in a segment, then compute distributions over those player rows so players
-- with many replays do not dominate the population baseline.

CREATE TABLE population_stat_runs (
    id uuid PRIMARY KEY,
    status text NOT NULL DEFAULT 'running',
    stat_version integer NOT NULL,
    min_games integer NOT NULL,
    bucket_strategy_version integer NOT NULL,
    requested_stat_keys text[],
    segment_spec jsonb NOT NULL DEFAULT '{}'::jsonb,
    player_segment_count bigint NOT NULL DEFAULT 0,
    distribution_count bigint NOT NULL DEFAULT 0,
    error_message text,
    created_at timestamptz NOT NULL DEFAULT now(),
    started_at timestamptz NOT NULL DEFAULT now(),
    finished_at timestamptz,
    CONSTRAINT population_stat_runs_status_check
        CHECK (status IN ('running', 'succeeded', 'failed')),
    CONSTRAINT population_stat_runs_min_games_check
        CHECK (min_games > 0)
);

CREATE TABLE population_player_stat_segments (
    run_id uuid NOT NULL REFERENCES population_stat_runs(id) ON DELETE CASCADE,
    stat_key text NOT NULL,
    season text NOT NULL,
    replay_game_type text NOT NULL,
    playlist_key text NOT NULL,
    game_playlist_id integer,
    team_size integer NOT NULL,
    rank_bucket text NOT NULL,
    rank_tier integer,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    game_count integer NOT NULL,
    active_time_seconds double precision NOT NULL DEFAULT 0.0,
    stat_value double precision NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (
        run_id,
        stat_key,
        season,
        replay_game_type,
        playlist_key,
        team_size,
        rank_bucket,
        platform,
        platform_player_id
    ),
    CONSTRAINT population_player_stat_segments_game_count_check
        CHECK (game_count > 0),
    CONSTRAINT population_player_stat_segments_team_size_check
        CHECK (team_size BETWEEN 1 AND 4),
    CONSTRAINT population_player_stat_segments_value_check
        CHECK (stat_value = stat_value)
);

CREATE INDEX population_player_stat_segments_lookup_idx
    ON population_player_stat_segments (
        run_id,
        stat_key,
        season,
        replay_game_type,
        playlist_key,
        team_size,
        rank_bucket
    );

CREATE TABLE population_stat_distributions (
    run_id uuid NOT NULL REFERENCES population_stat_runs(id) ON DELETE CASCADE,
    stat_key text NOT NULL,
    season text NOT NULL,
    replay_game_type text NOT NULL,
    playlist_key text NOT NULL,
    game_playlist_id integer,
    team_size integer NOT NULL,
    rank_bucket text NOT NULL,
    rank_tier integer,
    bucket_strategy jsonb NOT NULL,
    buckets jsonb NOT NULL,
    player_count integer NOT NULL,
    game_count_total integer NOT NULL,
    mean double precision NOT NULL,
    stddev double precision,
    min_value double precision NOT NULL,
    p10 double precision NOT NULL,
    p25 double precision NOT NULL,
    p50 double precision NOT NULL,
    p75 double precision NOT NULL,
    p90 double precision NOT NULL,
    max_value double precision NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (
        run_id,
        stat_key,
        season,
        replay_game_type,
        playlist_key,
        team_size,
        rank_bucket
    ),
    CONSTRAINT population_stat_distributions_player_count_check
        CHECK (player_count > 0),
    CONSTRAINT population_stat_distributions_game_count_total_check
        CHECK (game_count_total > 0),
    CONSTRAINT population_stat_distributions_team_size_check
        CHECK (team_size BETWEEN 1 AND 4)
);

CREATE INDEX population_stat_distributions_latest_idx
    ON population_stat_distributions (
        stat_key,
        season,
        replay_game_type,
        playlist_key,
        team_size,
        rank_bucket,
        created_at DESC
    );
