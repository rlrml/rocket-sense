-- The replay list/get path resolves a fallback rank for players without a
-- submission on the viewed replay by scanning that player's submissions on
-- other replays; index the player id to keep that lookup cheap.
CREATE INDEX replay_player_rank_submissions_player_idx
    ON replay_player_rank_submissions (platform_player_id);
