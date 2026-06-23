-- Career/profile stats can filter a target player's appearances by rank tier.
-- Keep the rank-bounded scan on the same player identity key used by the
-- profile aggregate queries.
CREATE INDEX replay_players_platform_player_rank_profile_idx
    ON replay_players (platform, platform_player_id, rank_tier, replay_id)
    WHERE platform IS NOT NULL
      AND platform_player_id IS NOT NULL
      AND rank_tier IS NOT NULL;
