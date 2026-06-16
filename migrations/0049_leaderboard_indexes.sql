-- Indexes backing the cross-replay leaderboards (/api/v1/leaderboards/*).
--
-- The two leaderboard aggregations are otherwise already well covered by
-- existing indexes:
--   * uploads rank/total group `replays` by `uploaded_by_user_id`, served by
--     `replays_uploaded_by_user_id_idx` / `replays_uploader_created_at_idx`.
--   * the unfiltered appearances rank rides `replay_players_platform_player_replay_idx`
--     as an index-only scan (the query drops the `replays` join when no replay
--     filter is active).
--
-- The one genuine gap is the team-size filter. Team size is derived per replay
-- by counting active players per team (see `push_replay_team_size_expression`),
-- whose subquery filters on `active_time_seconds`. That column lives in no
-- existing index, so every evaluation falls back to a heap fetch. This covering
-- index makes that subquery index-only, which speeds up team-size-filtered
-- leaderboards and, since the same expression backs every team-size-filtered
-- stats query, the rest of the app as well.
CREATE INDEX IF NOT EXISTS replay_players_replay_team_active_idx
    ON replay_players (replay_id, team)
    INCLUDE (active_time_seconds)
    WHERE team IS NOT NULL;
