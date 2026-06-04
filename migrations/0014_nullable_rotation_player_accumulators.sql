ALTER TABLE play_event_rotation_player_details
    ALTER COLUMN active_game_time DROP NOT NULL,
    ALTER COLUMN tracked_time DROP NOT NULL,
    ALTER COLUMN time_first_man DROP NOT NULL,
    ALTER COLUMN time_second_man DROP NOT NULL,
    ALTER COLUMN time_third_man DROP NOT NULL,
    ALTER COLUMN time_ambiguous_role DROP NOT NULL,
    ALTER COLUMN time_behind_play DROP NOT NULL,
    ALTER COLUMN time_level_with_play DROP NOT NULL,
    ALTER COLUMN time_ahead_of_play DROP NOT NULL,
    ALTER COLUMN longest_first_man_stint_time DROP NOT NULL,
    ALTER COLUMN first_man_stint_count DROP NOT NULL,
    ALTER COLUMN became_first_man_count DROP NOT NULL,
    ALTER COLUMN lost_first_man_count DROP NOT NULL;
