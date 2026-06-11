-- Re-analyzing a replay inserts a full event set under a new analysis run and
-- then deletes the superseded runs' rows (`prune_superseded_run_events`), so
-- the play-event tables see most of their rows written and later deleted
-- (~4 runs per replay in practice). With the default autovacuum thresholds
-- (scale factor 0.20) dead tuples piled up far faster than vacuum reclaimed
-- them and the heap/index files grew without bound — play_event_scalar_fields
-- alone reached 164 GB holding ~8 GB of live data, which filled the node disk
-- and got every pod evicted (2026-06-11).
--
-- Vacuum these delete-churn tables aggressively: trigger at 2% dead tuples
-- instead of 20%, and let each vacuum do much more work per cycle so it can
-- keep up with bulk prunes. This keeps dead space reusable so the files stop
-- ratcheting; it does not shrink already-bloated files (that needs
-- pg_repack/VACUUM FULL, handled operationally).

DO $$
DECLARE
    hot_table text;
BEGIN
    FOREACH hot_table IN ARRAY ARRAY[
        'play_events',
        'play_event_scalar_fields',
        'play_event_payloads',
        'play_event_attributes',
        'play_event_subjects',
        'play_event_goal_tag_details',
        'play_event_kickoff_details',
        'play_event_kickoff_player_details',
        'play_event_mechanic_details',
        'play_event_rotation_player_details',
        'play_event_timeline_details',
        'play_event_touch_details',
        'replay_boost_tracks'
    ]
    LOOP
        EXECUTE format(
            'ALTER TABLE %I SET (
                autovacuum_vacuum_scale_factor = 0.02,
                autovacuum_vacuum_threshold = 1000,
                autovacuum_vacuum_cost_limit = 2000,
                autovacuum_vacuum_cost_delay = 1,
                autovacuum_analyze_scale_factor = 0.02
            )',
            hot_table
        );
    END LOOP;
END
$$;
