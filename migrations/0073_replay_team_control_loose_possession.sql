-- Loose team-possession seconds for replay_team_control. The existing
-- possession_* columns store the STRICT (control) definition from subtr-actor's
-- backdating resolver (firmly-controlled time only; loose-ball tails go
-- neutral). The new loose_* columns store the LOOSE definition from the new
-- loose_possession stream: the last team to touch owns the ball until the
-- opponent takes it away (sticky through loose balls, passes, repelled 50-50s),
-- so loose possession >= summed player possession >= strict control.
--
-- Sourced from the loose_possession event stream, which only exists for
-- analyses produced by subtr-actor with the loose stream, so these default to 0
-- and are populated by reprocessing (or the team-control backfill once the
-- stream is present).
ALTER TABLE replay_team_control
    ADD COLUMN loose_team_zero_seconds double precision NOT NULL DEFAULT 0.0,
    ADD COLUMN loose_team_one_seconds double precision NOT NULL DEFAULT 0.0,
    ADD COLUMN loose_neutral_seconds double precision NOT NULL DEFAULT 0.0;
