ALTER TABLE replay_players
    ADD COLUMN rank_tier integer,
    ADD COLUMN rank_division integer;

CREATE INDEX replay_players_rank_tier_idx
    ON replay_players (rank_tier)
    WHERE rank_tier IS NOT NULL;
