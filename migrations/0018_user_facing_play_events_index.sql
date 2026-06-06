CREATE INDEX play_events_user_facing_stats_replay_run_type_idx
    ON play_events (replay_id, analysis_run_id, event_type_id)
    WHERE source_stream NOT IN (
        'positioning',
        'boost_state',
        'boost_ledger',
        'movement',
        'rotation_player',
        'rotation_role_span',
        'rotation_depth_span',
        'powerslide',
        'touch_last_touch'
    );
