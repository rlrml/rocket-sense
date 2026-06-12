-- Preserve player display names submitted with rank metadata.
--
-- Replay parsing can produce platform-id/debug names for some uploads. rlru's
-- PsyNet match-history rank payload includes the in-match display name, so keep
-- that alongside the rank submission and apply it to replay_players when
-- present.
ALTER TABLE replay_player_rank_submissions
    ADD COLUMN player_name text;
