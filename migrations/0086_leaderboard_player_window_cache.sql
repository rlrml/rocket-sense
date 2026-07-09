-- Disposable read models for cross-player leaderboards.
--
-- IMPORTANT: these tables are caches, not sources of truth. Canonical replay
-- metadata plus the per-replay/player fact tables remain authoritative. The
-- refresh job intentionally deletes and rebuilds these rows often; callers and
-- future migrations must never rely on cache rows surviving a refresh.

CREATE TABLE leaderboard_cache_windows (
    window_key text PRIMARY KEY,
    window_kind text NOT NULL,
    season text,
    window_start timestamptz,
    window_end timestamptz,
    is_current boolean NOT NULL DEFAULT false,
    refreshed_at timestamptz NOT NULL DEFAULT now(),
    CHECK (window_key <> ''),
    CHECK (window_kind IN ('daily', 'trailing-7d', 'season')),
    CHECK ((window_kind = 'season') = (season IS NOT NULL))
);

COMMENT ON TABLE leaderboard_cache_windows IS
    'Disposable leaderboard refresh metadata; canonical replay data is authoritative and this table is rebuilt often.';

-- One row per player and fully materialized scope. `*` / 0 mean that dimension
-- is unfiltered. Refresh uses a CUBE over the three dimensions, so normal UI
-- reads never need to GROUP BY the population before ordering it.
CREATE TABLE leaderboard_player_window_totals (
    window_key text NOT NULL REFERENCES leaderboard_cache_windows(window_key) ON DELETE CASCADE,
    scope_game_type text NOT NULL,
    scope_team_size smallint NOT NULL,
    scope_playlist text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    replay_count bigint NOT NULL,
    active_time_seconds double precision NOT NULL,
    refreshed_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (
        window_key,
        scope_game_type,
        scope_team_size,
        scope_playlist,
        platform,
        platform_player_id
    ),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> ''),
    CHECK (replay_count > 0),
    CHECK (active_time_seconds >= 0.0)
);

COMMENT ON TABLE leaderboard_player_window_totals IS
    'Disposable player/window leaderboard cache rebuilt from canonical replay appearances; never a source of truth.';

CREATE INDEX leaderboard_player_window_totals_rank_idx
    ON leaderboard_player_window_totals (
        window_key,
        scope_game_type,
        scope_team_size,
        scope_playlist,
        replay_count DESC,
        platform,
        platform_player_id
    );

-- Metric rows carry their already-matched appearance/time denominators. This
-- duplicates a little data deliberately: total and per-5-minute leaderboards
-- become bounded ordered-index reads rather than population-wide aggregates.
CREATE TABLE leaderboard_player_window_metrics (
    window_key text NOT NULL REFERENCES leaderboard_cache_windows(window_key) ON DELETE CASCADE,
    scope_game_type text NOT NULL,
    scope_team_size smallint NOT NULL,
    scope_playlist text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    metric_kind text NOT NULL,
    metric_key text NOT NULL,
    total_value double precision NOT NULL,
    replay_count bigint NOT NULL,
    active_time_seconds double precision NOT NULL,
    value_per_5_minutes double precision,
    sample_count bigint,
    average_value double precision,
    refreshed_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (
        window_key,
        scope_game_type,
        scope_team_size,
        scope_playlist,
        platform,
        platform_player_id,
        metric_kind,
        metric_key
    ),
    CHECK (metric_kind IN ('event', 'stat')),
    CHECK (metric_key <> ''),
    CHECK (total_value >= 0.0),
    CHECK (replay_count > 0),
    CHECK (active_time_seconds >= 0.0),
    CHECK (sample_count IS NULL OR sample_count >= 0)
);

COMMENT ON TABLE leaderboard_player_window_metrics IS
    'Disposable player/window metric cache rebuilt often from canonical per-replay facts; never a source of truth.';

CREATE INDEX leaderboard_player_window_metrics_total_rank_idx
    ON leaderboard_player_window_metrics (
        window_key,
        metric_kind,
        metric_key,
        scope_game_type,
        scope_team_size,
        scope_playlist,
        total_value DESC,
        platform,
        platform_player_id
    );

CREATE INDEX leaderboard_player_window_metrics_rate_rank_idx
    ON leaderboard_player_window_metrics (
        window_key,
        metric_kind,
        metric_key,
        scope_game_type,
        scope_team_size,
        scope_playlist,
        value_per_5_minutes DESC,
        total_value DESC,
        platform,
        platform_player_id
    )
    WHERE value_per_5_minutes IS NOT NULL;
