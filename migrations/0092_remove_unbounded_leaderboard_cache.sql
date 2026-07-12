-- Remove the unbounded leaderboard read model. It expanded every canonical
-- player appearance across every nonzero metric and all eight combinations of
-- game type / team size / playlist, producing 14M rows and 97 GB of heap plus
-- indexes from only ~75k appearances. Leaderboards now aggregate the compact
-- per-replay facts (`player_replay_event_counts`, `player_replay_stat_facts`,
-- and the other player_replay_* summaries) for the one requested metric.
DROP TABLE IF EXISTS leaderboard_player_window_metrics;
DROP TABLE IF EXISTS leaderboard_player_window_totals;
DROP TABLE IF EXISTS leaderboard_cache_windows;

-- These generic JSON containment indexes were created speculatively. Runtime
-- queries locate payload/attribute rows by event_id and inspect JSON values
-- after that primary-key join; no query uses @>, @?, or ? against either JSON
-- column. In production the indexes had zero scans while occupying ~14 GB and
-- adding write/WAL cost to every replay process.
DROP INDEX IF EXISTS play_event_payloads_payload_gin_idx;
DROP INDEX IF EXISTS play_event_attributes_gin_idx;
