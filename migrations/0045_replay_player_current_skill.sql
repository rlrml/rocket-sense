-- Current per-playlist skill counters submitted alongside a replay's ranks.
--
-- The match-history snapshot (the existing tier/division/mu/sigma/mmr and their
-- pre_* counterparts) is tied to the specific match. These columns come from a
-- separate PsyNet endpoint (Skills/GetPlayersSkills) that the client fetches at
-- sync time, and carry counters match history does not expose: win streak,
-- matches played, and placement matches played, plus PsyNet's own MMR value.
--
-- They are a point-in-time value as of `current_fetched_at` (a moment AFTER the
-- match), so they are only meaningful when that timestamp is close to the match
-- time. `current_fetched_at` (Unix epoch seconds) is stored so consumers can
-- gauge staleness — `current_fetched_at` minus the match timestamp — before
-- trusting these values for an old/backfilled replay.
ALTER TABLE replay_player_rank_submissions
    ADD COLUMN current_mmr double precision,
    ADD COLUMN win_streak integer,
    ADD COLUMN matches_played integer,
    ADD COLUMN placement_matches_played integer,
    ADD COLUMN current_fetched_at bigint;
