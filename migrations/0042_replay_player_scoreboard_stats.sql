-- Scoreboard stats from the replay header's PlayerStats array (Score, Goals,
-- Assists, Saves, Shots). Extracted during processing; existing replays are
-- populated on their next reprocess.
ALTER TABLE replay_players
    ADD COLUMN score integer,
    ADD COLUMN goals integer,
    ADD COLUMN assists integer,
    ADD COLUMN saves integer,
    ADD COLUMN shots integer;
