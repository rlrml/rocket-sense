-- Supports the profile/career rank-range filter, which narrows a player's stats
-- to replays where THAT player's per-replay `rank_tier` fell within a tier
-- window. The filter is emitted as a correlated EXISTS over `replay_players`
-- keyed by (replay_id, platform, platform_player_id) with a `rank_tier` range
-- predicate (see `append_replay_set_filters`).
--
-- The existing (platform, platform_player_id, replay_id) profile indexes already
-- resolve the player+replay key, but do not carry `rank_tier`, forcing a heap
-- fetch per candidate replay to evaluate the range. Carrying `rank_tier` as an
-- INCLUDE column makes the EXISTS index-only. Partial on `rank_tier IS NOT NULL`
-- because the EXISTS only matches ranked rows (and the filter is meaningless for
-- replays with no recorded rank).
CREATE INDEX IF NOT EXISTS replay_players_platform_player_rank_idx
    ON replay_players (platform, platform_player_id, replay_id)
    INCLUDE (rank_tier)
    WHERE rank_tier IS NOT NULL;
