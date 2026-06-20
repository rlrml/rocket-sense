-- Recompute ball-opponent-half leaderboard facts so the numerator is measured
-- only while the specific player was active in the replay. The original 0053
-- backfill applied full-replay ball-half time to every roster entry, which made
-- short substitute/late-join appearances report impossible shares above 100%.

DELETE FROM player_replay_stat_facts
WHERE stat_key = 'ball-opponent-half';

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
    WHERE event.source_stream = 'ball_half'
),
player_activity_spans AS (
    SELECT DISTINCT
        event.replay_id,
        event.analysis_run_id,
        subject.replay_player_id,
        COALESCE(event.start_time, event.event_time, event.end_time) AS start_time,
        COALESCE(event.end_time, event.event_time, event.start_time) AS end_time
    FROM play_events event
    JOIN play_event_subjects subject
      ON subject.event_id = event.id
     AND subject.replay_player_id IS NOT NULL
    WHERE event.source_stream = 'player_activity'
)
SELECT
    r.canonical_analysis_run_id,
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
JOIN replays r
  ON r.id = rp.replay_id
 AND r.canonical_analysis_run_id IS NOT NULL
JOIN player_activity_spans activity
  ON activity.replay_player_id = rp.id
 AND activity.replay_id = rp.replay_id
 AND activity.analysis_run_id = r.canonical_analysis_run_id
 AND activity.start_time IS NOT NULL
 AND activity.end_time IS NOT NULL
 AND activity.end_time > activity.start_time
JOIN ball_half_spans ball
  ON ball.replay_id = rp.replay_id
 AND ball.analysis_run_id = r.canonical_analysis_run_id
 AND ball.start_time IS NOT NULL
 AND ball.end_time IS NOT NULL
 AND ball.end_time > ball.start_time
 AND ball.end_time > activity.start_time
 AND ball.start_time < activity.end_time
WHERE rp.platform IS NOT NULL
  AND btrim(rp.platform) <> ''
  AND rp.platform_player_id IS NOT NULL
  AND btrim(rp.platform_player_id) <> ''
  AND rp.team IN (0, 1)
GROUP BY
    r.canonical_analysis_run_id,
    rp.replay_id,
    rp.id,
    rp.platform,
    rp.platform_player_id,
    rp.team,
    rp.active_time_seconds
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
ON CONFLICT DO NOTHING;
