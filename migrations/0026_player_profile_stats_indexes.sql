CREATE INDEX replay_players_platform_player_profile_cover_idx
    ON replay_players (platform, platform_player_id, replay_id)
    INCLUDE (
        id,
        team,
        active_time_seconds,
        time_demolished_seconds,
        time_most_back_seconds,
        time_most_forward_seconds
    )
    WHERE platform IS NOT NULL AND platform_player_id IS NOT NULL;

CREATE INDEX replay_players_replay_team_id_idx
    ON replay_players (replay_id, team, id)
    WHERE team IS NOT NULL;

CREATE INDEX play_event_subjects_replay_player_event_idx
    ON play_event_subjects (replay_player_id, event_id)
    WHERE replay_player_id IS NOT NULL;
