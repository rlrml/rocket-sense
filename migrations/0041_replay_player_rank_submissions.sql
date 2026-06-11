-- Durable store of client-submitted player ranks for a replay.
--
-- Replay files do not carry rank/MMR, so clients (e.g. the rlru uploader,
-- mirroring the BakkesMod plugin) submit it out of band: bundled with the
-- upload or via POST /replays/{id}/ranks. Because reprocessing deletes and
-- recreates replay_players, the submitted values are stored here durably and
-- re-applied to replay_players after each metadata upsert.
--
-- This captures the full PsyNet match-history skill snapshot for each player:
-- the after-match values (mu/sigma/tier/division) AND the before-match values
-- (the `pre_*` columns), plus the derived display MMR for convenience and a
-- `valid` flag (false for unranked playlists). `mmr` is `mu * 20 + 100`.
--
-- Keyed by (replay_id, platform_player_id): the platform-specific online id is
-- the stable match key within a replay. `platform` is retained for reference
-- but is not part of the match (crossplay can remap a player's platform between
-- the match-history record and the replay's stored RemoteId).
CREATE TABLE replay_player_rank_submissions (
    replay_id uuid NOT NULL REFERENCES replays (id) ON DELETE CASCADE,
    platform_player_id text NOT NULL,
    platform text,
    playlist integer,
    valid boolean,
    -- After the match (current rank).
    tier integer,
    division integer,
    mu double precision,
    sigma double precision,
    mmr double precision,
    -- Before the match.
    pre_tier integer,
    pre_division integer,
    pre_mu double precision,
    pre_sigma double precision,
    pre_mmr double precision,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (replay_id, platform_player_id)
);

-- Denormalized after-match rank alongside the existing rank_tier /
-- rank_division columns so the read/filter path can surface MMR without a join.
ALTER TABLE replay_players
    ADD COLUMN rank_mmr double precision;
