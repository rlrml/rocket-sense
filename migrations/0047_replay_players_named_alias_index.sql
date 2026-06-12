-- The replay list/get path resolves a fallback display name for players whose
-- own row only carries the raw platform id (common for Epic/PsyNet players
-- whose replay header has no readable name) by scanning the same player's rows
-- on other replays for a real name. Match by platform_player_id alone — the
-- platform string can drift across replays (e.g. epic vs psynet) for the same
-- account, mirroring the rank fallback in 0046. This partial index holds only
-- the rows that carry a usable readable name, which is exactly what the lookup
-- scans.
CREATE INDEX replay_players_named_alias_idx
    ON replay_players (platform_player_id)
    WHERE platform_player_id IS NOT NULL
      AND name IS NOT NULL
      AND name <> platform_player_id;
