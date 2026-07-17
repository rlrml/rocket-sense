//! SQL used to materialize replay-scoped facts for aggregate read paths.
//!
//! Keeping these definitions together makes it easier to compare processing
//! writes with their corresponding API queries and migrations.

// Per-replay materialization of `player_replay_event_counts` for one analysis
// run ($1) and replay ($2). Keep this in sync with the user-facing
// `source_stream` exclusion list (the same set as
// AGGREGATE_VISIBLE_EVENT_SOURCE_STREAM_SQL in api/stats.rs). Counts are deduped
// per player identity (a player may hold more than one roster row in a replay),
// matching the live query's `SELECT DISTINCT event.id`. Modern demolition events
// are role-mapped so attackers contribute to demos and victims to deaths.
pub(super) const INSERT_PLAYER_REPLAY_EVENT_COUNTS_SQL: &str = r#"
        WITH counted_subjects AS (
            SELECT
                rp.replay_id,
                rp.id AS replay_player_id,
                rp.platform,
                rp.platform_player_id,
                rp.team,
                CASE
                    WHEN source_event_type.key = 'demolition' AND subject.role = 'victim'
                        THEN death_event_type.id
                    ELSE event.event_type_id
                END AS event_type_id,
                event.id AS event_id
            FROM replay_players rp
            JOIN play_event_subjects subject ON subject.replay_player_id = rp.id
            JOIN play_events event
              ON event.id = subject.event_id
             AND event.analysis_run_id = $1
            JOIN event_types source_event_type ON source_event_type.id = event.event_type_id
            JOIN event_types death_event_type ON death_event_type.key = 'death'
            WHERE rp.replay_id = $2
              AND rp.platform IS NOT NULL
              AND btrim(rp.platform) <> ''
              AND rp.platform_player_id IS NOT NULL
              AND btrim(rp.platform_player_id) <> ''
              AND event.source_stream NOT IN (
                    'positioning', 'boost_state', 'boost_ledger', 'movement',
                    'rotation_player', 'rotation_role_span', 'rotation_depth_span',
                    'rotation_role', 'ball_depth', 'field_third', 'field_half',
                    'ball_proximity', 'powerslide'
                  )
              AND NOT (
                    source_event_type.key = 'demolition'
                    AND subject.role NOT IN ('attacker', 'victim')
                  )
        )
        INSERT INTO player_replay_event_counts (
            analysis_run_id,
            replay_id,
            replay_player_id,
            player_subject_id,
            platform,
            platform_player_id,
            team,
            event_type_id,
            event_count
        )
        SELECT
            $1,
            counted_subjects.replay_id,
            (array_agg(counted_subjects.replay_player_id))[1],
            concat(counted_subjects.platform, ':', counted_subjects.platform_player_id),
            counted_subjects.platform,
            counted_subjects.platform_player_id,
            MIN(counted_subjects.team),
            counted_subjects.event_type_id,
            COUNT(DISTINCT counted_subjects.event_id)
        FROM counted_subjects
        GROUP BY
            counted_subjects.replay_id,
            counted_subjects.platform,
            counted_subjects.platform_player_id,
            counted_subjects.event_type_id
        ON CONFLICT DO NOTHING
        "#;

// Per-replay materialization of `player_replay_first_man_stints` for one
// analysis run ($1) and replay ($2). One row per first-man rotation stint with
// its duration, baking in the same `state = 'first_man'` jsonb filter the live
// histogram query applied -- keep in sync with `load_rotation_duration_histogram`
// in api/stats.rs and the backfill in this module.
pub(super) const INSERT_PLAYER_REPLAY_FIRST_MAN_STINTS_SQL: &str = r#"
        INSERT INTO player_replay_first_man_stints (
            analysis_run_id,
            replay_id,
            replay_player_id,
            player_subject_id,
            platform,
            platform_player_id,
            team,
            event_id,
            duration_seconds
        )
        SELECT
            $1,
            rp.replay_id,
            rp.id,
            concat(rp.platform, ':', rp.platform_player_id),
            rp.platform,
            rp.platform_player_id,
            rp.team,
            event.id,
            event.duration_seconds
        FROM replay_players rp
        JOIN play_event_subjects subject
          ON subject.replay_player_id = rp.id
         AND subject.role = 'actor'
        JOIN play_events event
          ON event.id = subject.event_id
         AND event.analysis_run_id = $1
         AND event.source_stream IN ('rotation_first_man_stint', 'rotation_role')
        JOIN event_types et ON et.id = event.event_type_id
        LEFT JOIN play_event_attributes attributes ON attributes.event_id = event.id
        WHERE rp.replay_id = $2
          AND rp.platform IS NOT NULL
          AND btrim(rp.platform) <> ''
          AND rp.platform_player_id IS NOT NULL
          AND btrim(rp.platform_player_id) <> ''
          AND event.duration_seconds IS NOT NULL
          AND event.duration_seconds > 0.0
          AND (
                (event.source_stream = 'rotation_first_man_stint' AND et.key = 'rotation_first_man_stint')
             OR (event.source_stream = 'rotation_role' AND attributes.attributes->>'state' = 'first_man')
          )
        ON CONFLICT DO NOTHING
        "#;

// Per-replay materialization of `player_replay_positioning` for one analysis run
// ($1) and replay ($2). One row per player, summing each positioning stream's
// durations. Aggregates positioning streams per absolute player; the read in
// api/positioning_stats.rs reconstructs target-relative cohorts by (replay, team).
pub(super) const INSERT_PLAYER_REPLAY_POSITIONING_SQL: &str = r#"
        INSERT INTO player_replay_positioning (
            analysis_run_id, replay_id, replay_player_id, player_subject_id,
            platform, platform_player_id, team,
            active_seconds, tracked_seconds,
            defensive_third_seconds, neutral_third_seconds, offensive_third_seconds,
            defensive_half_seconds, offensive_half_seconds,
            behind_ball_seconds, level_with_ball_seconds, ahead_of_ball_seconds,
            role_most_back_seconds, role_mid_seconds, role_most_forward_seconds,
            role_other_seconds, role_no_teammates_seconds,
            closest_team_seconds, closest_absolute_seconds, farthest_seconds,
            distance_to_ball_weighted, distance_to_ball_weight,
            distance_to_teammates_weighted, distance_to_teammates_weight
        )
        WITH positioning_events AS (
            SELECT
                actor.id AS replay_player_id,
                actor.platform AS platform,
                actor.platform_player_id AS platform_player_id,
                actor.team AS team,
                event.source_stream AS stream,
                COALESCE(
                    event.duration_seconds,
                    CASE
                        WHEN event.start_time IS NOT NULL AND event.end_time IS NOT NULL
                        THEN GREATEST(event.end_time - event.start_time, 0)
                        ELSE 0
                    END,
                    0
                ) AS duration,
                COALESCE(payload.payload, '{}'::jsonb) AS payload
            FROM play_events event
            JOIN replay_players actor
              ON actor.replay_id = event.replay_id
             AND actor.platform IS NOT NULL
             AND actor.platform_player_id IS NOT NULL
             AND concat(actor.platform, ':', actor.platform_player_id) = event.primary_subject_id
            LEFT JOIN play_event_payloads payload ON payload.event_id = event.id
            WHERE event.analysis_run_id = $1
              AND event.replay_id = $2
              AND event.source_stream IN (
                'player_activity', 'field_third', 'field_half', 'ball_depth',
                'depth_role', 'ball_proximity', 'positioning_distance'
              )
        )
        SELECT
            $1,
            $2,
            (array_agg(replay_player_id))[1],
            concat(platform, ':', platform_player_id),
            platform,
            platform_player_id,
            min(team),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'player_activity'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_third'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_third' AND payload->>'state' = 'defensive'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_third' AND payload->>'state' = 'neutral'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_third' AND payload->>'state' = 'offensive'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_half' AND payload->>'state' = 'defensive'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_half' AND payload->>'state' = 'offensive'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_depth' AND payload->>'state' = 'behind_ball'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_depth' AND payload->>'state' = 'level_with_ball'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_depth' AND payload->>'state' = 'ahead_of_ball'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'depth_role' AND payload->>'state' = 'most_back'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'depth_role' AND payload->>'state' = 'mid'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'depth_role' AND payload->>'state' = 'most_forward'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'depth_role' AND payload->>'state' = 'other'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'depth_role' AND payload->>'state' = 'no_teammates'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_proximity' AND payload->'state'->>'closest_to_ball_team' = 'true'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_proximity' AND payload->'state'->>'closest_to_ball_absolute' = 'true'), 0.0),
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_proximity' AND payload->'state'->>'farthest_from_ball' = 'true'), 0.0),
            COALESCE(SUM(CASE WHEN stream = 'positioning_distance' AND jsonb_typeof(payload->'distance_to_ball') = 'number' THEN (payload->>'distance_to_ball')::float8 * duration ELSE 0 END), 0.0),
            COALESCE(SUM(CASE WHEN stream = 'positioning_distance' AND jsonb_typeof(payload->'distance_to_ball') = 'number' THEN duration ELSE 0 END), 0.0),
            COALESCE(SUM(CASE WHEN stream = 'positioning_distance' AND jsonb_typeof(payload->'distance_to_teammates') = 'number' THEN (payload->>'distance_to_teammates')::float8 * duration ELSE 0 END), 0.0),
            COALESCE(SUM(CASE WHEN stream = 'positioning_distance' AND jsonb_typeof(payload->'distance_to_teammates') = 'number' THEN duration ELSE 0 END), 0.0)
        FROM positioning_events
        GROUP BY platform, platform_player_id
        ON CONFLICT DO NOTHING
        "#;

// Per-replay materialization of `player_replay_movement` for one analysis run
// ($1) and replay ($2). One row per rostered player, with zero-valued movement
// columns when the player has no movement events; the profile read depends on
// those rows for correct cohort appearance counts.
pub(super) const INSERT_PLAYER_REPLAY_MOVEMENT_SQL: &str = r#"
        INSERT INTO player_replay_movement (
            analysis_run_id,
            replay_id,
            replay_player_id,
            player_subject_id,
            platform,
            platform_player_id,
            team,
            active_seconds,
            total_distance,
            speed_weighted,
            speed_weight,
            slow_seconds,
            boost_seconds,
            supersonic_seconds,
            ground_seconds,
            low_air_seconds,
            high_air_seconds,
            powerslide_count,
            powerslide_seconds,
            speed_flips,
            wavedashes,
            half_flips
        )
        WITH movement_events AS (
            SELECT
                event.primary_subject_id AS player_subject_id,
                event_type.key AS event_type,
                COALESCE(
                    event.duration_seconds,
                    CASE
                        WHEN event.start_time IS NOT NULL AND event.end_time IS NOT NULL
                        THEN GREATEST(event.end_time - event.start_time, 0)
                        ELSE 0
                    END,
                    0
                ) AS duration,
                COALESCE(payload.payload, '{}'::jsonb) AS payload
            FROM play_events event
            JOIN event_types event_type
              ON event_type.id = event.event_type_id
            LEFT JOIN play_event_payloads payload
              ON payload.event_id = event.id
            WHERE event.analysis_run_id = $1
              AND event.replay_id = $2
              AND event.primary_subject_id IS NOT NULL
              AND (
                    event.source_stream IN ('movement', 'powerslide')
                 OR event_type.key IN ('speed_flip', 'wavedash', 'half_flip')
              )
        ),
        event_aggregates AS (
            SELECT
                player_subject_id,
                COALESCE(SUM(
                    CASE WHEN event_type = 'movement' THEN
                        COALESCE(
                            CASE WHEN jsonb_typeof(payload->'total_distance') = 'number' THEN (payload->>'total_distance')::float8 END,
                            CASE WHEN jsonb_typeof(payload->'distance') = 'number' THEN (payload->>'distance')::float8 END,
                            CASE WHEN jsonb_typeof(payload->'distance_traveled') = 'number' THEN (payload->>'distance_traveled')::float8 END,
                            CASE WHEN jsonb_typeof(payload->'distance_uu') = 'number' THEN (payload->>'distance_uu')::float8 END,
                            0.0
                        )
                    ELSE 0 END
                ), 0.0) AS total_distance,
                COALESCE(SUM(
                    CASE WHEN event_type = 'movement' THEN
                        COALESCE(
                            CASE WHEN jsonb_typeof(payload->'avg_speed') = 'number' THEN (payload->>'avg_speed')::float8 END,
                            CASE WHEN jsonb_typeof(payload->'average_speed') = 'number' THEN (payload->>'average_speed')::float8 END,
                            CASE WHEN jsonb_typeof(payload->'speed') = 'number' THEN (payload->>'speed')::float8 END,
                            0.0
                        ) * NULLIF(duration, 0)
                    ELSE 0 END
                ), 0.0) AS speed_weighted,
                COALESCE(SUM(
                    CASE WHEN event_type = 'movement'
                           AND COALESCE(
                               CASE WHEN jsonb_typeof(payload->'avg_speed') = 'number' THEN (payload->>'avg_speed')::float8 END,
                               CASE WHEN jsonb_typeof(payload->'average_speed') = 'number' THEN (payload->>'average_speed')::float8 END,
                               CASE WHEN jsonb_typeof(payload->'speed') = 'number' THEN (payload->>'speed')::float8 END
                           ) IS NOT NULL
                           AND duration > 0
                         THEN duration ELSE 0 END
                ), 0.0) AS speed_weight,
                COALESCE(SUM(CASE WHEN event_type = 'movement' THEN rocket_sense_movement_seconds(payload, duration, ARRAY['time_slow_speed', 'slow_speed_seconds', 'slow_speed_time_seconds', 'time_slow_speed_seconds'], ARRAY['slow_speed', 'slow']) ELSE 0 END), 0.0) AS slow_seconds,
                COALESCE(SUM(CASE WHEN event_type = 'movement' THEN rocket_sense_movement_seconds(payload, duration, ARRAY['time_boost_speed', 'boost_speed_seconds', 'boost_speed_time_seconds', 'time_boost_speed_seconds'], ARRAY['boost_speed', 'boost']) ELSE 0 END), 0.0) AS boost_seconds,
                COALESCE(SUM(CASE WHEN event_type = 'movement' THEN rocket_sense_movement_seconds(payload, duration, ARRAY['time_supersonic_speed', 'supersonic_seconds', 'supersonic_speed_time_seconds', 'time_supersonic_speed_seconds'], ARRAY['supersonic_speed', 'supersonic']) ELSE 0 END), 0.0) AS supersonic_seconds,
                COALESCE(SUM(CASE WHEN event_type = 'movement' THEN rocket_sense_movement_seconds(payload, duration, ARRAY['time_ground', 'ground_seconds', 'ground_time_seconds', 'time_on_ground'], ARRAY['ground', 'on_ground']) ELSE 0 END), 0.0) AS ground_seconds,
                COALESCE(SUM(CASE WHEN event_type = 'movement' THEN rocket_sense_movement_seconds(payload, duration, ARRAY['time_low_air', 'low_air_seconds', 'low_air_time_seconds'], ARRAY['low_air', 'low']) ELSE 0 END), 0.0) AS low_air_seconds,
                COALESCE(SUM(CASE WHEN event_type = 'movement' THEN rocket_sense_movement_seconds(payload, duration, ARRAY['time_high_air', 'high_air_seconds', 'high_air_time_seconds'], ARRAY['high_air', 'high']) ELSE 0 END), 0.0) AS high_air_seconds,
                COUNT(*) FILTER (WHERE event_type = 'speed_flip') AS speed_flips,
                COUNT(*) FILTER (WHERE event_type = 'wavedash') AS wavedashes,
                COUNT(*) FILTER (WHERE event_type = 'half_flip') AS half_flips
            FROM movement_events
            GROUP BY player_subject_id
        ),
        powerslide_toggles AS (
            -- Powerslide events are instantaneous on/off toggles (payload.active),
            -- not spans, so summing per-event `duration` is always zero. Pair each
            -- slide's leading `active:true` toggle with its trailing `active:false`
            -- toggle, mirroring the per-replay client logic in web/src/stats/movement.tsx.
            SELECT
                player_subject_id,
                COALESCE(CASE WHEN jsonb_typeof(payload->'time') = 'number' THEN (payload->>'time')::float8 END, 0.0) AS toggle_time,
                COALESCE(CASE WHEN jsonb_typeof(payload->'frame') = 'number' THEN (payload->>'frame')::float8 END, 0.0) AS toggle_order,
                ((payload->>'active') IS DISTINCT FROM 'false') AS active
            FROM movement_events
            WHERE event_type = 'powerslide'
        ),
        powerslide_edges AS (
            SELECT
                player_subject_id, toggle_time, toggle_order, active,
                (active IS DISTINCT FROM LAG(active) OVER w) AS is_edge
            FROM powerslide_toggles
            WINDOW w AS (PARTITION BY player_subject_id ORDER BY toggle_time, toggle_order)
        ),
        powerslide_paired AS (
            -- After dropping repeated same-state toggles, edges strictly alternate;
            -- each slide-start (active) is closed by the next edge's timestamp.
            SELECT
                player_subject_id, active, toggle_time,
                LEAD(toggle_time) OVER (
                    PARTITION BY player_subject_id ORDER BY toggle_time, toggle_order
                ) AS close_time
            FROM powerslide_edges
            WHERE is_edge
        ),
        powerslide_spans AS (
            SELECT
                player_subject_id,
                COUNT(*) FILTER (WHERE active) AS powerslide_count,
                COALESCE(SUM(CASE WHEN active THEN GREATEST(close_time - toggle_time, 0.0) ELSE 0.0 END), 0.0) AS powerslide_seconds
            FROM powerslide_paired
            GROUP BY player_subject_id
        )
        SELECT
            $1,
            rp.replay_id,
            rp.id,
            concat(rp.platform, ':', rp.platform_player_id),
            rp.platform,
            rp.platform_player_id,
            rp.team,
            GREATEST(COALESCE(rp.active_time_seconds, 0.0), 0.0),
            COALESCE(events.total_distance, 0.0),
            COALESCE(events.speed_weighted, 0.0),
            COALESCE(events.speed_weight, 0.0),
            COALESCE(events.slow_seconds, 0.0),
            COALESCE(events.boost_seconds, 0.0),
            COALESCE(events.supersonic_seconds, 0.0),
            COALESCE(events.ground_seconds, 0.0),
            COALESCE(events.low_air_seconds, 0.0),
            COALESCE(events.high_air_seconds, 0.0),
            COALESCE(slides.powerslide_count, 0),
            COALESCE(slides.powerslide_seconds, 0.0),
            COALESCE(events.speed_flips, 0),
            COALESCE(events.wavedashes, 0),
            COALESCE(events.half_flips, 0)
        FROM replay_players rp
        LEFT JOIN event_aggregates events
          ON events.player_subject_id = concat(rp.platform, ':', rp.platform_player_id)
        LEFT JOIN powerslide_spans slides
          ON slides.player_subject_id = concat(rp.platform, ':', rp.platform_player_id)
        WHERE rp.replay_id = $2
          AND rp.platform IS NOT NULL
          AND btrim(rp.platform) <> ''
          AND rp.platform_player_id IS NOT NULL
          AND btrim(rp.platform_player_id) <> ''
        ON CONFLICT DO NOTHING
        "#;

// Per-replay materialization of the profile Touches breakdown. One row per
// (player, dimension, value), where dimensions are the two UI distributions:
// hit kind and intention category.
pub(super) const INSERT_PLAYER_REPLAY_TOUCH_BREAKDOWNS_SQL: &str = r#"
        INSERT INTO player_replay_touch_breakdowns (
            analysis_run_id,
            replay_id,
            replay_player_id,
            player_subject_id,
            platform,
            platform_player_id,
            team,
            dimension,
            value,
            touch_count,
            advance_distance
        )
        WITH touch_events AS (
            SELECT
                subject.replay_player_id,
                CASE
                    WHEN detail.kind IN ('control', 'medium_hit', 'hard_hit') THEN detail.kind
                    WHEN detail.kind IN ('hit', 'medium') THEN 'medium_hit'
                    WHEN detail.kind = 'hard' THEN 'hard_hit'
                    WHEN detail.kind IN ('soft', 'soft_touch') THEN 'control'
                    ELSE 'other'
                END AS kind,
                CASE
                    WHEN detail.intention IN ('shot', 'pass', 'boom', 'control', 'advance', 'challenge', 'save', 'clear', 'neutral') THEN detail.intention
                    ELSE 'other'
                END AS category,
                CASE
                    WHEN detail.surface = 'wall' THEN 'wall'
                    WHEN detail.surface = 'ground' THEN 'ground'
                    WHEN detail.surface = 'air' AND detail.height_band = 'high_air' THEN 'high_aerial'
                    WHEN detail.surface = 'air' AND detail.height_band = 'low_air' THEN 'aerial'
                    ELSE 'other'
                END AS location,
                COALESCE(GREATEST(detail.advance_distance, 0.0), 0.0) AS advance_distance
            FROM play_events event
            JOIN play_event_touch_details detail
              ON detail.event_id = event.id
            JOIN play_event_subjects subject
              ON subject.event_id = event.id
             AND subject.role = 'actor'
             AND subject.subject_kind = 'player'
             AND subject.replay_player_id IS NOT NULL
            WHERE event.analysis_run_id = $1
              AND event.replay_id = $2
              AND event.source_stream = 'touch'
        ),
        breakdowns AS (
            SELECT replay_player_id, 'kind'::text AS dimension, kind AS value, COUNT(*) AS touch_count, COALESCE(SUM(advance_distance), 0.0) AS advance_distance
            FROM touch_events
            GROUP BY replay_player_id, kind
            UNION ALL
            SELECT replay_player_id, 'category'::text AS dimension, category AS value, COUNT(*) AS touch_count, COALESCE(SUM(advance_distance), 0.0) AS advance_distance
            FROM touch_events
            GROUP BY replay_player_id, category
            UNION ALL
            SELECT replay_player_id, 'location'::text AS dimension, location AS value, COUNT(*) AS touch_count, COALESCE(SUM(advance_distance), 0.0) AS advance_distance
            FROM touch_events
            GROUP BY replay_player_id, location
        )
        SELECT
            $1,
            rp.replay_id,
            rp.id,
            concat(rp.platform, ':', rp.platform_player_id),
            rp.platform,
            rp.platform_player_id,
            rp.team,
            breakdowns.dimension,
            breakdowns.value,
            breakdowns.touch_count,
            breakdowns.advance_distance
        FROM breakdowns
        JOIN replay_players rp ON rp.id = breakdowns.replay_player_id
        WHERE rp.replay_id = $2
          AND rp.platform IS NOT NULL
          AND btrim(rp.platform) <> ''
          AND rp.platform_player_id IS NOT NULL
          AND btrim(rp.platform_player_id) <> ''
        ON CONFLICT DO NOTHING
        "#;

// Per-replay materialization of `player_replay_kickoff` for one analysis run ($1)
// and replay ($2). Mirrors api/event_stats.rs::load_kickoff_summary and
// load_event_stat_dimensions: each player's kickoff appearances are aggregated to
// the (role, event-taker-spawn-set) grain the read path still filters on, with
// summary counts, average sum/count pairs, and per-dimension {value: count}
// jsonb mixes (NULL value keyed as ''). The read sums matching rows across the
// player's replays.
pub(super) const INSERT_PLAYER_REPLAY_KICKOFF_SQL: &str = r#"
        INSERT INTO player_replay_kickoff (
            analysis_run_id,
            replay_id,
            replay_player_id,
            player_subject_id,
            platform,
            platform_player_id,
            team,
            role,
            taker_spawns,
            row_count,
            touched_count,
            first_touch_count,
            missed_count,
            fake_count,
            win_count,
            loss_count,
            neutral_count,
            kickoff_goals_for,
            kickoff_goals_against,
            advantages_for,
            advantages_against,
            no_advantage_count,
            time_to_ball_sum,
            time_to_ball_count,
            boost_after_sum,
            boost_after_count,
            boost_used_sum,
            boost_used_count,
            spawn_position_mix,
            approach_mix,
            taker_outcome_mix,
            support_behavior_mix,
            kickoff_outcome_mix,
            player_result_mix,
            win_strength_result_mix,
            advantage_result_mix
        )
        WITH kickoff_rows AS (
            SELECT
                detail.event_id,
                detail.replay_id,
                detail.replay_player_id,
                detail.player_subject_id,
                detail.team,
                detail.role,
                detail.spawn_position,
                detail.boost_after,
                detail.boost_used,
                detail.time_to_ball,
                detail.taker_outcome,
                detail.approach,
                detail.support_behavior,
                kickoff.outcome AS kickoff_outcome,
                kickoff.winning_team,
                kickoff.win_strength_band,
                kickoff.kickoff_goal,
                kickoff.scoring_team,
                kickoff.advantage,
                kickoff.advantage_team,
                kickoff.first_touch_subject_id
            FROM play_event_kickoff_player_details detail
            JOIN play_events event
              ON event.id = detail.event_id
             AND event.analysis_run_id = $1
             AND event.replay_id = $2
            JOIN play_event_kickoff_details kickoff
              ON kickoff.event_id = detail.event_id
        ),
        event_takers AS (
            SELECT
                event_id,
                COALESCE(
                    array_agg(DISTINCT spawn_position ORDER BY spawn_position)
                        FILTER (WHERE spawn_position IS NOT NULL),
                    ARRAY[]::text[]
                ) AS taker_spawns
            FROM kickoff_rows
            WHERE role = 'taker'
            GROUP BY event_id
        ),
        enriched AS (
            SELECT
                kr.replay_id,
                kr.replay_player_id,
                kr.player_subject_id,
                kr.team,
                kr.role,
                COALESCE(et.taker_spawns, ARRAY[]::text[]) AS taker_spawns,
                kr.spawn_position,
                kr.boost_after,
                kr.time_to_ball,
                kr.taker_outcome,
                kr.approach,
                kr.support_behavior,
                kr.kickoff_outcome,
                kr.winning_team,
                kr.win_strength_band,
                kr.kickoff_goal,
                kr.scoring_team,
                kr.advantage,
                kr.advantage_team,
                COALESCE(
                    kr.boost_used,
                    (
                        SELECT (
                            payload.payload -> CASE kr.team
                                WHEN 0 THEN 'team_zero_taker'
                                ELSE 'team_one_taker'
                            END
                        ) ->> 'boost_used'
                        FROM play_event_payloads payload
                        WHERE payload.event_id = kr.event_id
                    )::double precision
                ) AS eff_boost_used,
                EXISTS (
                    SELECT 1
                    FROM kickoff_rows taker
                    WHERE taker.event_id = kr.event_id
                      AND taker.team = kr.team
                      AND taker.role = 'taker'
                      AND taker.player_subject_id = kr.first_touch_subject_id
                ) AS team_taker_first_touch
            FROM kickoff_rows kr
            LEFT JOIN event_takers et ON et.event_id = kr.event_id
        ),
        agg AS (
            SELECT
                replay_id,
                replay_player_id,
                player_subject_id,
                team,
                role,
                taker_spawns,
                COUNT(*) AS row_count,
                COUNT(*) FILTER (WHERE taker_outcome = 'touched') AS touched_count,
                COUNT(*) FILTER (WHERE team_taker_first_touch) AS first_touch_count,
                COUNT(*) FILTER (WHERE taker_outcome = 'missed') AS missed_count,
                COUNT(*) FILTER (WHERE taker_outcome = 'fake') AS fake_count,
                COUNT(*) FILTER (WHERE winning_team = team) AS win_count,
                COUNT(*) FILTER (WHERE winning_team IS NOT NULL AND winning_team <> team) AS loss_count,
                COUNT(*) FILTER (WHERE winning_team IS NULL) AS neutral_count,
                COUNT(*) FILTER (WHERE kickoff_goal AND scoring_team = team) AS kickoff_goals_for,
                COUNT(*) FILTER (
                    WHERE kickoff_goal AND scoring_team IS NOT NULL AND scoring_team <> team
                ) AS kickoff_goals_against,
                COUNT(*) FILTER (WHERE advantage_team = team) AS advantages_for,
                COUNT(*) FILTER (
                    WHERE advantage_team IS NOT NULL AND advantage_team <> team
                ) AS advantages_against,
                COUNT(*) FILTER (WHERE advantage = 'no_advantage') AS no_advantage_count,
                COALESCE(
                    SUM(time_to_ball) FILTER (WHERE role = 'taker' AND time_to_ball IS NOT NULL),
                    0.0
                ) AS time_to_ball_sum,
                COUNT(*) FILTER (WHERE role = 'taker' AND time_to_ball IS NOT NULL) AS time_to_ball_count,
                COALESCE(SUM(boost_after) FILTER (WHERE boost_after IS NOT NULL), 0.0) AS boost_after_sum,
                COUNT(*) FILTER (WHERE boost_after IS NOT NULL) AS boost_after_count,
                COALESCE(
                    SUM(eff_boost_used) FILTER (WHERE role = 'taker' AND eff_boost_used IS NOT NULL),
                    0.0
                ) AS boost_used_sum,
                COUNT(*) FILTER (WHERE role = 'taker' AND eff_boost_used IS NOT NULL) AS boost_used_count
            FROM enriched
            GROUP BY replay_id, replay_player_id, player_subject_id, team, role, taker_spawns
        ),
        dim_counts AS (
            SELECT replay_id, player_subject_id, role, taker_spawns,
                'spawn_position'::text AS dimension, COALESCE(spawn_position, '') AS value, COUNT(*) AS cnt
            FROM enriched GROUP BY replay_id, player_subject_id, role, taker_spawns, COALESCE(spawn_position, '')
            UNION ALL
            SELECT replay_id, player_subject_id, role, taker_spawns,
                'approach', COALESCE(approach, ''), COUNT(*)
            FROM enriched GROUP BY replay_id, player_subject_id, role, taker_spawns, COALESCE(approach, '')
            UNION ALL
            SELECT replay_id, player_subject_id, role, taker_spawns,
                'taker_outcome', COALESCE(taker_outcome, ''), COUNT(*)
            FROM enriched GROUP BY replay_id, player_subject_id, role, taker_spawns, COALESCE(taker_outcome, '')
            UNION ALL
            SELECT replay_id, player_subject_id, role, taker_spawns,
                'support_behavior', COALESCE(support_behavior, ''), COUNT(*)
            FROM enriched GROUP BY replay_id, player_subject_id, role, taker_spawns, COALESCE(support_behavior, '')
            UNION ALL
            SELECT replay_id, player_subject_id, role, taker_spawns,
                'kickoff_outcome', COALESCE(kickoff_outcome, ''), COUNT(*)
            FROM enriched GROUP BY replay_id, player_subject_id, role, taker_spawns, COALESCE(kickoff_outcome, '')
            UNION ALL
            SELECT replay_id, player_subject_id, role, taker_spawns,
                'player_result',
                CASE
                    WHEN winning_team IS NULL THEN 'neutral'
                    WHEN winning_team = team THEN 'win'
                    ELSE 'loss'
                END,
                COUNT(*)
            FROM enriched GROUP BY replay_id, player_subject_id, role, taker_spawns,
                CASE WHEN winning_team IS NULL THEN 'neutral' WHEN winning_team = team THEN 'win' ELSE 'loss' END
            UNION ALL
            SELECT replay_id, player_subject_id, role, taker_spawns,
                'win_strength_result',
                CASE
                    WHEN winning_team IS NULL THEN 'neutral'
                    WHEN winning_team = team THEN concat('win_', COALESCE(win_strength_band, 'unknown'))
                    ELSE concat('loss_', COALESCE(win_strength_band, 'unknown'))
                END,
                COUNT(*)
            FROM enriched GROUP BY replay_id, player_subject_id, role, taker_spawns,
                CASE
                    WHEN winning_team IS NULL THEN 'neutral'
                    WHEN winning_team = team THEN concat('win_', COALESCE(win_strength_band, 'unknown'))
                    ELSE concat('loss_', COALESCE(win_strength_band, 'unknown'))
                END
            UNION ALL
            SELECT replay_id, player_subject_id, role, taker_spawns,
                'advantage_result',
                CASE
                    WHEN advantage IS NULL THEN ''
                    WHEN advantage_team IS NULL THEN advantage
                    ELSE concat(
                        CASE WHEN advantage_team = team THEN 'won_' ELSE 'lost_' END,
                        regexp_replace(advantage, '^team_(zero|one)_', '')
                    )
                END,
                COUNT(*)
            FROM enriched GROUP BY replay_id, player_subject_id, role, taker_spawns,
                CASE
                    WHEN advantage IS NULL THEN ''
                    WHEN advantage_team IS NULL THEN advantage
                    ELSE concat(
                        CASE WHEN advantage_team = team THEN 'won_' ELSE 'lost_' END,
                        regexp_replace(advantage, '^team_(zero|one)_', '')
                    )
                END
        ),
        mixes AS (
            SELECT
                replay_id,
                player_subject_id,
                role,
                taker_spawns,
                COALESCE(jsonb_object_agg(value, cnt) FILTER (WHERE dimension = 'spawn_position'), '{}'::jsonb) AS spawn_position_mix,
                COALESCE(jsonb_object_agg(value, cnt) FILTER (WHERE dimension = 'approach'), '{}'::jsonb) AS approach_mix,
                COALESCE(jsonb_object_agg(value, cnt) FILTER (WHERE dimension = 'taker_outcome'), '{}'::jsonb) AS taker_outcome_mix,
                COALESCE(jsonb_object_agg(value, cnt) FILTER (WHERE dimension = 'support_behavior'), '{}'::jsonb) AS support_behavior_mix,
                COALESCE(jsonb_object_agg(value, cnt) FILTER (WHERE dimension = 'kickoff_outcome'), '{}'::jsonb) AS kickoff_outcome_mix,
                COALESCE(jsonb_object_agg(value, cnt) FILTER (WHERE dimension = 'player_result'), '{}'::jsonb) AS player_result_mix,
                COALESCE(jsonb_object_agg(value, cnt) FILTER (WHERE dimension = 'win_strength_result'), '{}'::jsonb) AS win_strength_result_mix,
                COALESCE(jsonb_object_agg(value, cnt) FILTER (WHERE dimension = 'advantage_result'), '{}'::jsonb) AS advantage_result_mix
            FROM dim_counts
            GROUP BY replay_id, player_subject_id, role, taker_spawns
        )
        SELECT
            $1,
            agg.replay_id,
            agg.replay_player_id,
            agg.player_subject_id,
            split_part(agg.player_subject_id, ':', 1),
            substr(agg.player_subject_id, length(split_part(agg.player_subject_id, ':', 1)) + 2),
            agg.team,
            agg.role,
            agg.taker_spawns,
            agg.row_count,
            agg.touched_count,
            agg.first_touch_count,
            agg.missed_count,
            agg.fake_count,
            agg.win_count,
            agg.loss_count,
            agg.neutral_count,
            agg.kickoff_goals_for,
            agg.kickoff_goals_against,
            agg.advantages_for,
            agg.advantages_against,
            agg.no_advantage_count,
            agg.time_to_ball_sum,
            agg.time_to_ball_count,
            agg.boost_after_sum,
            agg.boost_after_count,
            agg.boost_used_sum,
            agg.boost_used_count,
            mixes.spawn_position_mix,
            mixes.approach_mix,
            mixes.taker_outcome_mix,
            mixes.support_behavior_mix,
            mixes.kickoff_outcome_mix,
            mixes.player_result_mix,
            mixes.win_strength_result_mix,
            mixes.advantage_result_mix
        FROM agg
        JOIN mixes
          ON mixes.replay_id = agg.replay_id
         AND mixes.player_subject_id = agg.player_subject_id
         AND mixes.role = agg.role
         AND mixes.taker_spawns = agg.taker_spawns
        WHERE split_part(agg.player_subject_id, ':', 1) <> ''
          AND substr(agg.player_subject_id, length(split_part(agg.player_subject_id, ':', 1)) + 2) <> ''
        ON CONFLICT DO NOTHING
        "#;

// Per-replay materialization of `replay_team_control` for one analysis run ($1)
// and replay ($2). Collapses the three ball-global streams (possession_state,
// ball_half, ball_third) into one row of absolute team_zero/team_one/neutral
// seconds. Mirrors the live per-event aggregation in api/possession_stats.rs;
// the read orients these to the queried player's team. Only inserts when the
// replay recorded any of these streams.
pub(super) const INSERT_REPLAY_TEAM_CONTROL_SQL: &str = r#"
        INSERT INTO replay_team_control (
            analysis_run_id, replay_id,
            possession_team_zero_seconds, possession_team_one_seconds, possession_neutral_seconds,
            loose_team_zero_seconds, loose_team_one_seconds, loose_neutral_seconds,
            ball_half_team_zero_seconds, ball_half_team_one_seconds, ball_half_neutral_seconds,
            ball_third_team_zero_seconds, ball_third_team_one_seconds, ball_third_neutral_seconds
        )
        SELECT
            $1, $2,
            COALESCE(SUM(dur) FILTER (WHERE stream = 'possession' AND value = 'team_zero'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'possession' AND value = 'team_one'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'possession' AND value = 'neutral'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'loose_possession' AND value = 'team_zero'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'loose_possession' AND value = 'team_one'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'loose_possession' AND value = 'neutral'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'ball_half' AND value = 'team_zero_side'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'ball_half' AND value = 'team_one_side'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'ball_half' AND value = 'neutral'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'ball_third' AND value = 'team_zero_third'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'ball_third' AND value = 'team_one_third'), 0.0),
            COALESCE(SUM(dur) FILTER (WHERE stream = 'ball_third' AND value = 'neutral_third'), 0.0)
        FROM (
            SELECT
                event.source_stream AS stream,
                CASE event.source_stream
                    WHEN 'possession' THEN payload.payload ->> 'possession_state'
                    WHEN 'loose_possession' THEN payload.payload ->> 'possession_state'
                    WHEN 'ball_half' THEN payload.payload ->> 'field_half'
                    WHEN 'ball_third' THEN payload.payload ->> 'field_third'
                END AS value,
                COALESCE(event.duration_seconds, (payload.payload ->> 'duration')::double precision, 0.0) AS dur
            FROM play_events event
            JOIN play_event_payloads payload ON payload.event_id = event.id
            WHERE event.analysis_run_id = $1 AND event.replay_id = $2
              AND event.source_stream IN ('possession', 'loose_possession', 'ball_half', 'ball_third')
              AND COALESCE((payload.payload ->> 'active')::boolean, true)
              AND COALESCE(event.duration_seconds, (payload.payload ->> 'duration')::double precision, 0.0) > 0.0
        ) stream_rows
        HAVING COALESCE(SUM(dur), 0.0) > 0.0
        ON CONFLICT DO NOTHING
        "#;

// Per-replay materialization of `player_replay_possession` for one analysis run
// ($1) and replay ($2). Aggregates each player's possession spans, classified
// touches (with intention/surface jsonb mixes), and possession location. Mirrors
// the per-event queries in api/possession_stats.rs; the read sums rows across a
// player's replays and reconstructs cohorts by (replay, team).
pub(super) const INSERT_PLAYER_REPLAY_POSSESSION_SQL: &str = r#"
        INSERT INTO player_replay_possession (
            analysis_run_id, replay_id, replay_player_id, player_subject_id,
            platform, platform_player_id, team,
            possession_count, duration_seconds, touch_count, advance_distance, retreat_distance,
            carry_time, air_dribble_time, sustained_control_count,
            with_carry_count, with_air_dribble_count, with_aerial_touch_count, with_wall_touch_count,
            duration_bucket_0, duration_bucket_1, duration_bucket_2, duration_bucket_3, duration_bucket_4,
            sc_possession_count, sc_duration_seconds, sc_touch_count, sc_advance_distance, sc_retreat_distance,
            sc_carry_time, sc_air_dribble_time,
            sc_with_carry_count, sc_with_air_dribble_count, sc_with_aerial_touch_count, sc_with_wall_touch_count,
            sc_duration_bucket_0, sc_duration_bucket_1, sc_duration_bucket_2, sc_duration_bucket_3, sc_duration_bucket_4,
            classified_touch_count, first_touch_count, first_touch_control_count, contested_touch_count,
            intention_mix, first_touch_intention_mix, surface_mix, location_third_seconds
        )
        WITH span AS (
            SELECT
                detail.replay_player_id AS replay_player_id,
                COUNT(*) AS possession_count,
                COALESCE(SUM(detail.duration), 0.0) AS duration_seconds,
                COALESCE(SUM(detail.touch_count), 0)::bigint AS touch_count,
                COALESCE(SUM(detail.advance_distance), 0.0) AS advance_distance,
                COALESCE(SUM(detail.retreat_distance), 0.0) AS retreat_distance,
                COALESCE(SUM(detail.carry_time), 0.0) AS carry_time,
                COALESCE(SUM(detail.air_dribble_time), 0.0) AS air_dribble_time,
                COUNT(*) FILTER (WHERE detail.sustained_control) AS sustained_control_count,
                COUNT(*) FILTER (WHERE detail.carry_count > 0) AS with_carry_count,
                COUNT(*) FILTER (WHERE detail.air_dribble_count > 0) AS with_air_dribble_count,
                COUNT(*) FILTER (WHERE detail.aerial_touch_count > 0) AS with_aerial_touch_count,
                COUNT(*) FILTER (WHERE detail.wall_touch_count > 0) AS with_wall_touch_count,
                COUNT(*) FILTER (WHERE detail.duration >= 0.0 AND detail.duration < 1.0) AS duration_bucket_0,
                COUNT(*) FILTER (WHERE detail.duration >= 1.0 AND detail.duration < 2.0) AS duration_bucket_1,
                COUNT(*) FILTER (WHERE detail.duration >= 2.0 AND detail.duration < 4.0) AS duration_bucket_2,
                COUNT(*) FILTER (WHERE detail.duration >= 4.0 AND detail.duration < 8.0) AS duration_bucket_3,
                COUNT(*) FILTER (WHERE detail.duration >= 8.0) AS duration_bucket_4,
                COUNT(*) FILTER (WHERE detail.sustained_control) AS sc_possession_count,
                COALESCE(SUM(detail.duration) FILTER (WHERE detail.sustained_control), 0.0) AS sc_duration_seconds,
                COALESCE(SUM(detail.touch_count) FILTER (WHERE detail.sustained_control), 0)::bigint AS sc_touch_count,
                COALESCE(SUM(detail.advance_distance) FILTER (WHERE detail.sustained_control), 0.0) AS sc_advance_distance,
                COALESCE(SUM(detail.retreat_distance) FILTER (WHERE detail.sustained_control), 0.0) AS sc_retreat_distance,
                COALESCE(SUM(detail.carry_time) FILTER (WHERE detail.sustained_control), 0.0) AS sc_carry_time,
                COALESCE(SUM(detail.air_dribble_time) FILTER (WHERE detail.sustained_control), 0.0) AS sc_air_dribble_time,
                COUNT(*) FILTER (WHERE detail.sustained_control AND detail.carry_count > 0) AS sc_with_carry_count,
                COUNT(*) FILTER (WHERE detail.sustained_control AND detail.air_dribble_count > 0) AS sc_with_air_dribble_count,
                COUNT(*) FILTER (WHERE detail.sustained_control AND detail.aerial_touch_count > 0) AS sc_with_aerial_touch_count,
                COUNT(*) FILTER (WHERE detail.sustained_control AND detail.wall_touch_count > 0) AS sc_with_wall_touch_count,
                COUNT(*) FILTER (WHERE detail.sustained_control AND detail.duration >= 0.0 AND detail.duration < 1.0) AS sc_duration_bucket_0,
                COUNT(*) FILTER (WHERE detail.sustained_control AND detail.duration >= 1.0 AND detail.duration < 2.0) AS sc_duration_bucket_1,
                COUNT(*) FILTER (WHERE detail.sustained_control AND detail.duration >= 2.0 AND detail.duration < 4.0) AS sc_duration_bucket_2,
                COUNT(*) FILTER (WHERE detail.sustained_control AND detail.duration >= 4.0 AND detail.duration < 8.0) AS sc_duration_bucket_3,
                COUNT(*) FILTER (WHERE detail.sustained_control AND detail.duration >= 8.0) AS sc_duration_bucket_4
            FROM play_event_player_possession_details detail
            JOIN play_events event ON event.id = detail.event_id AND event.analysis_run_id = $1
            WHERE detail.replay_id = $2 AND detail.replay_player_id IS NOT NULL
            GROUP BY detail.replay_player_id
        ),
        touch_base AS (
            SELECT
                subject.replay_player_id AS replay_player_id,
                detail.intention AS intention,
                detail.surface AS surface,
                detail.first_touch AS first_touch,
                detail.contested AS contested
            FROM play_events event
            JOIN play_event_touch_details detail
              ON detail.event_id = event.id AND detail.intention IS NOT NULL
            JOIN play_event_subjects subject
              ON subject.event_id = event.id
             AND subject.role = 'actor'
             AND subject.subject_kind = 'player'
             AND subject.replay_player_id IS NOT NULL
            WHERE event.analysis_run_id = $1 AND event.replay_id = $2 AND event.source_stream = 'touch'
        ),
        touch AS (
            SELECT
                replay_player_id,
                COUNT(*) AS classified_touch_count,
                COUNT(*) FILTER (WHERE first_touch) AS first_touch_count,
                COUNT(*) FILTER (WHERE first_touch AND intention = 'control') AS first_touch_control_count,
                COUNT(*) FILTER (WHERE contested) AS contested_touch_count
            FROM touch_base GROUP BY replay_player_id
        ),
        intention_mix AS (
            SELECT replay_player_id, jsonb_object_agg(intention, cnt) AS mix
            FROM (SELECT replay_player_id, intention, COUNT(*) AS cnt FROM touch_base GROUP BY replay_player_id, intention) g
            GROUP BY replay_player_id
        ),
        ft_intention_mix AS (
            SELECT replay_player_id, jsonb_object_agg(intention, cnt) AS mix
            FROM (SELECT replay_player_id, intention, COUNT(*) AS cnt FROM touch_base WHERE first_touch GROUP BY replay_player_id, intention) g
            GROUP BY replay_player_id
        ),
        surface_mix AS (
            SELECT replay_player_id, jsonb_object_agg(surface, cnt) AS mix
            FROM (SELECT replay_player_id, surface, COUNT(*) AS cnt FROM touch_base WHERE surface IS NOT NULL GROUP BY replay_player_id, surface) g
            GROUP BY replay_player_id
        ),
        location AS (
            SELECT loc.replay_player_id AS replay_player_id,
                jsonb_object_agg(loc.field_third, loc.seconds) AS mix
            FROM (
                SELECT
                    subject.replay_player_id AS replay_player_id,
                    payload.payload ->> 'field_third' AS field_third,
                    SUM(COALESCE(event.duration_seconds, (payload.payload ->> 'duration')::double precision, 0.0)) AS seconds
                FROM play_events event
                JOIN play_event_payloads payload ON payload.event_id = event.id
                JOIN play_event_subjects subject
                  ON subject.event_id = event.id
                 AND subject.subject_kind = 'player'
                 AND subject.replay_player_id IS NOT NULL
                WHERE event.analysis_run_id = $1 AND event.replay_id = $2 AND event.source_stream = 'possession'
                  AND COALESCE((payload.payload ->> 'active')::boolean, true)
                  AND COALESCE(event.duration_seconds, (payload.payload ->> 'duration')::double precision, 0.0) > 0.0
                  AND payload.payload ->> 'field_third' IS NOT NULL
                GROUP BY subject.replay_player_id, field_third
            ) loc
            GROUP BY loc.replay_player_id
        )
        SELECT
            $1, $2, rp.id, concat(rp.platform, ':', rp.platform_player_id),
            rp.platform, rp.platform_player_id, rp.team,
            COALESCE(span.possession_count, 0), COALESCE(span.duration_seconds, 0.0), COALESCE(span.touch_count, 0),
            COALESCE(span.advance_distance, 0.0), COALESCE(span.retreat_distance, 0.0),
            COALESCE(span.carry_time, 0.0), COALESCE(span.air_dribble_time, 0.0), COALESCE(span.sustained_control_count, 0),
            COALESCE(span.with_carry_count, 0), COALESCE(span.with_air_dribble_count, 0), COALESCE(span.with_aerial_touch_count, 0), COALESCE(span.with_wall_touch_count, 0),
            COALESCE(span.duration_bucket_0, 0), COALESCE(span.duration_bucket_1, 0), COALESCE(span.duration_bucket_2, 0), COALESCE(span.duration_bucket_3, 0), COALESCE(span.duration_bucket_4, 0),
            COALESCE(span.sc_possession_count, 0), COALESCE(span.sc_duration_seconds, 0.0), COALESCE(span.sc_touch_count, 0),
            COALESCE(span.sc_advance_distance, 0.0), COALESCE(span.sc_retreat_distance, 0.0),
            COALESCE(span.sc_carry_time, 0.0), COALESCE(span.sc_air_dribble_time, 0.0),
            COALESCE(span.sc_with_carry_count, 0), COALESCE(span.sc_with_air_dribble_count, 0), COALESCE(span.sc_with_aerial_touch_count, 0), COALESCE(span.sc_with_wall_touch_count, 0),
            COALESCE(span.sc_duration_bucket_0, 0), COALESCE(span.sc_duration_bucket_1, 0), COALESCE(span.sc_duration_bucket_2, 0), COALESCE(span.sc_duration_bucket_3, 0), COALESCE(span.sc_duration_bucket_4, 0),
            COALESCE(touch.classified_touch_count, 0), COALESCE(touch.first_touch_count, 0), COALESCE(touch.first_touch_control_count, 0), COALESCE(touch.contested_touch_count, 0),
            COALESCE(intention_mix.mix, '{}'::jsonb), COALESCE(ft_intention_mix.mix, '{}'::jsonb), COALESCE(surface_mix.mix, '{}'::jsonb),
            COALESCE(location.mix, '{}'::jsonb)
        FROM replay_players rp
        LEFT JOIN span ON span.replay_player_id = rp.id
        LEFT JOIN touch ON touch.replay_player_id = rp.id
        LEFT JOIN intention_mix ON intention_mix.replay_player_id = rp.id
        LEFT JOIN ft_intention_mix ON ft_intention_mix.replay_player_id = rp.id
        LEFT JOIN surface_mix ON surface_mix.replay_player_id = rp.id
        LEFT JOIN location ON location.replay_player_id = rp.id
        WHERE rp.replay_id = $2
          AND rp.platform IS NOT NULL AND btrim(rp.platform) <> ''
          AND rp.platform_player_id IS NOT NULL AND btrim(rp.platform_player_id) <> ''
          AND (span.replay_player_id IS NOT NULL OR touch.replay_player_id IS NOT NULL OR location.replay_player_id IS NOT NULL)
        ON CONFLICT DO NOTHING
        "#;

// Event-derived columns for `player_replay_boost`, grouped per absolute player
// (replay_player) rather than per target-relative cohort -- the read
// reconstructs player/teammates/opponents by (replay, team). Adapts the body of
// load_player_boost_event_fields in api/stats.rs (the same boost_pickup /
// boost_respawn play_events scan and pad-zone/field-half fallback logic) but
// keyed by actor.id, returning percent-scaled amounts (* 100 / 255) so the
// stored columns sum directly. Run for one analysis run ($1) and replay ($2).
pub(crate) const PLAYER_REPLAY_BOOST_EVENT_FIELDS_SQL: &str = r#"
        WITH boost_events AS MATERIALIZED (
            SELECT
                actor.id AS replay_player_id,
                et.key AS event_type,
                COALESCE(payload.payload, '{}'::jsonb) AS payload
            FROM play_events event
            JOIN event_types et
              ON et.id = event.event_type_id
             AND et.key IN ('boost_pickup', 'boost_respawn')
            JOIN play_event_subjects subject
              ON subject.event_id = event.id
             AND subject.role = 'actor'
             AND subject.replay_player_id IS NOT NULL
            JOIN replay_players actor ON actor.id = subject.replay_player_id
            LEFT JOIN play_event_payloads payload ON payload.event_id = event.id
            WHERE event.analysis_run_id = $1 AND event.replay_id = $2
        ),
        normalized AS (
            SELECT
                replay_player_id,
                event_type,
                COALESCE(payload->>'pad_type', payload->>'pad_size') AS pad_size,
                COALESCE(payload->>'pad_zone', payload->>'big_pad_zone') AS pad_zone,
                payload->>'field_half' AS field_half,
                COALESCE((payload->>'is_steal')::boolean, false) AS is_steal,
                COALESCE((payload->>'collected_amount')::double precision, 0.0) AS collected_amount,
                COALESCE((payload->>'overfill_amount')::double precision, 0.0) AS overfill_amount,
                COALESCE((payload->>'boost_granted')::double precision, 0.0) AS boost_granted
            FROM boost_events
        )
        SELECT
            replay_player_id,
            COALESCE(SUM(collected_amount) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'big'), 0.0) * 100.0 / 255.0 AS boost_collected_big,
            COALESCE(SUM(collected_amount) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'small'), 0.0) * 100.0 / 255.0 AS boost_collected_small,
            COALESCE(SUM(boost_granted) FILTER (WHERE event_type = 'boost_respawn'), 0.0) * 100.0 / 255.0 AS boost_collected_grant,
            COALESCE(SUM(collected_amount) FILTER (WHERE event_type = 'boost_pickup' AND is_steal AND pad_size = 'big'), 0.0) * 100.0 / 255.0 AS boost_stolen_big,
            COALESCE(SUM(collected_amount) FILTER (WHERE event_type = 'boost_pickup' AND is_steal AND pad_size = 'small'), 0.0) * 100.0 / 255.0 AS boost_stolen_small,
            COALESCE(SUM(overfill_amount) FILTER (WHERE event_type = 'boost_pickup' AND is_steal), 0.0) * 100.0 / 255.0 AS boost_stolen_overfill,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'big')::bigint AS big_pads,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'big' AND (pad_zone = 'offensive' OR (pad_zone IS NULL AND field_half = 'opponent')))::bigint AS big_pads_offensive,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'big' AND pad_zone = 'neutral')::bigint AS big_pads_neutral,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'big' AND (pad_zone = 'defensive' OR (pad_zone IS NULL AND field_half = 'own')))::bigint AS big_pads_defensive,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'small')::bigint AS small_pads,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'small' AND (pad_zone = 'offensive' OR (pad_zone IS NULL AND field_half = 'opponent')))::bigint AS small_pads_offensive,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'small' AND (pad_zone = 'defensive' OR (pad_zone IS NULL AND field_half = 'own')))::bigint AS small_pads_defensive,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND is_steal AND pad_size = 'big')::bigint AS stolen_big_pads,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND is_steal AND pad_size = 'small')::bigint AS stolen_small_pads
        FROM normalized
        GROUP BY replay_player_id
        "#;

pub(super) const INSERT_BALL_OPPONENT_HALF_FACTS_SQL: &str = r#"
        INSERT INTO player_replay_stat_facts (
            analysis_run_id,
            replay_id,
            replay_player_id,
            player_subject_id,
            platform,
            platform_player_id,
            team,
            stat_key,
            value,
            unit,
            active_time_seconds,
            denominator_key,
            denominator_value
        )
        WITH ball_half_spans AS (
            SELECT
                event.replay_id,
                event.analysis_run_id,
                payload.payload,
                COALESCE(event.start_time, event.event_time, event.end_time) AS start_time,
                COALESCE(event.end_time, event.event_time, event.start_time) AS end_time
            FROM play_events event
            JOIN play_event_payloads payload ON payload.event_id = event.id
            WHERE event.analysis_run_id = $1
              AND event.replay_id = $2
              AND event.source_stream = 'ball_half'
        ),
        player_activity_spans AS (
            SELECT DISTINCT
                subject.replay_player_id,
                COALESCE(event.start_time, event.event_time, event.end_time) AS start_time,
                COALESCE(event.end_time, event.event_time, event.start_time) AS end_time
            FROM play_events event
            JOIN play_event_subjects subject
              ON subject.event_id = event.id
             AND subject.replay_player_id IS NOT NULL
            WHERE event.analysis_run_id = $1
              AND event.replay_id = $2
              AND event.source_stream = 'player_activity'
        )
        SELECT
            $1,
            rp.replay_id,
            rp.id,
            concat(rp.platform, ':', rp.platform_player_id),
            rp.platform,
            rp.platform_player_id,
            rp.team,
            'ball-opponent-half',
            SUM(
                CASE
                    WHEN COALESCE((ball.payload ->> 'active')::boolean, true)
                     AND (
                        (rp.team = 0 AND ball.payload ->> 'field_half' = 'team_one_side')
                        OR (rp.team = 1 AND ball.payload ->> 'field_half' = 'team_zero_side')
                     )
                    THEN GREATEST(
                        LEAST(ball.end_time, activity.end_time)
                            - GREATEST(ball.start_time, activity.start_time),
                        0.0
                    )
                    ELSE 0.0
                END
            ) AS value,
            'seconds',
            rp.active_time_seconds,
            'active_time',
            rp.active_time_seconds
        FROM replay_players rp
        JOIN player_activity_spans activity
          ON activity.replay_player_id = rp.id
         AND activity.start_time IS NOT NULL
         AND activity.end_time IS NOT NULL
         AND activity.end_time > activity.start_time
        JOIN ball_half_spans ball
          ON ball.replay_id = rp.replay_id
         AND ball.analysis_run_id = $1
         AND ball.start_time IS NOT NULL
         AND ball.end_time IS NOT NULL
         AND ball.end_time > ball.start_time
         AND ball.end_time > activity.start_time
         AND ball.start_time < activity.end_time
        WHERE rp.replay_id = $2
          AND rp.platform IS NOT NULL
          AND btrim(rp.platform) <> ''
          AND rp.platform_player_id IS NOT NULL
          AND btrim(rp.platform_player_id) <> ''
          AND rp.team IN (0, 1)
        GROUP BY rp.replay_id, rp.id, rp.platform, rp.platform_player_id, rp.team, rp.active_time_seconds
        HAVING SUM(
            CASE
                WHEN COALESCE((ball.payload ->> 'active')::boolean, true)
                 AND (
                    (rp.team = 0 AND ball.payload ->> 'field_half' = 'team_one_side')
                    OR (rp.team = 1 AND ball.payload ->> 'field_half' = 'team_zero_side')
                 )
                THEN GREATEST(
                    LEAST(ball.end_time, activity.end_time)
                        - GREATEST(ball.start_time, activity.start_time),
                    0.0
                )
                ELSE 0.0
            END
        ) > 0.0
        ON CONFLICT DO NOTHING
        "#;

pub(super) const INSERT_TOUCH_COUNT_FACTS_SQL: &str = r#"
        INSERT INTO player_replay_stat_facts (
            analysis_run_id,
            replay_id,
            replay_player_id,
            player_subject_id,
            platform,
            platform_player_id,
            team,
            stat_key,
            value,
            unit,
            active_time_seconds,
            denominator_key,
            denominator_value
        )
        WITH player_touch_counts AS (
            SELECT
                subject.replay_player_id,
                COUNT(DISTINCT event.id) FILTER (WHERE detail.height_band = 'high_air') AS high_aerial_touch_count,
                COUNT(DISTINCT event.id) FILTER (WHERE detail.surface = 'air' AND detail.height_band = 'low_air') AS aerial_touch_count,
                COUNT(DISTINCT event.id) FILTER (WHERE detail.kind = 'control') AS control_touch_count
            FROM play_events event
            JOIN play_event_subjects subject
              ON subject.event_id = event.id
             AND subject.subject_kind = 'player'
             AND subject.role = 'actor'
             AND subject.replay_player_id IS NOT NULL
            JOIN play_event_touch_details detail ON detail.event_id = event.id
            WHERE event.analysis_run_id = $1
              AND event.replay_id = $2
              AND event.source_stream = 'touch'
            GROUP BY subject.replay_player_id
        ),
        touch_counts AS (
            SELECT
                rp.replay_id,
                rp.id AS replay_player_id,
                concat(rp.platform, ':', rp.platform_player_id) AS player_subject_id,
                rp.platform,
                rp.platform_player_id,
                rp.team,
                rp.active_time_seconds,
                COALESCE(counts.high_aerial_touch_count, 0) AS high_aerial_touch_count,
                COALESCE(counts.aerial_touch_count, 0) AS aerial_touch_count,
                COALESCE(counts.control_touch_count, 0) AS control_touch_count
            FROM replay_players rp
            LEFT JOIN player_touch_counts counts ON counts.replay_player_id = rp.id
            WHERE rp.replay_id = $2
              AND rp.platform IS NOT NULL
              AND btrim(rp.platform) <> ''
              AND rp.platform_player_id IS NOT NULL
              AND btrim(rp.platform_player_id) <> ''
        ),
        facts AS (
            SELECT
                replay_id,
                replay_player_id,
                player_subject_id,
                platform,
                platform_player_id,
                team,
                'high-aerial-touch-count'::text AS stat_key,
                high_aerial_touch_count::double precision AS value,
                active_time_seconds
            FROM touch_counts
            UNION ALL
            SELECT
                replay_id,
                replay_player_id,
                player_subject_id,
                platform,
                platform_player_id,
                team,
                'aerial-touch-count'::text AS stat_key,
                aerial_touch_count::double precision AS value,
                active_time_seconds
            FROM touch_counts
            UNION ALL
            SELECT
                replay_id,
                replay_player_id,
                player_subject_id,
                platform,
                platform_player_id,
                team,
                'control-touch-count'::text AS stat_key,
                control_touch_count::double precision AS value,
                active_time_seconds
            FROM touch_counts
        )
        SELECT
            $1,
            replay_id,
            replay_player_id,
            player_subject_id,
            platform,
            platform_player_id,
            team,
            stat_key,
            value,
            'count',
            active_time_seconds,
            'active_time',
            active_time_seconds
        FROM facts
        ON CONFLICT DO NOTHING
        "#;
