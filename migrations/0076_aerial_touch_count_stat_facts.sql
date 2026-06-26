-- Backfill a per-replay/player `aerial-touch-count` stat fact (low-air touches)
-- for existing replays, mirroring 0062's high-aerial/control facts. New replays
-- get it from insert_touch_count_stat_facts; this fills in the history so the
-- rank-benchmark refresh can materialize fact:aerial-touch-count.

DELETE FROM player_replay_stat_facts WHERE stat_key = 'aerial-touch-count';

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
        event.analysis_run_id,
        event.replay_id,
        subject.replay_player_id,
        COUNT(DISTINCT event.id) FILTER (
            WHERE detail.surface = 'air' AND detail.height_band = 'low_air'
        ) AS aerial_touch_count
    FROM play_events event
    JOIN play_event_subjects subject
      ON subject.event_id = event.id
     AND subject.subject_kind = 'player'
     AND subject.role = 'actor'
     AND subject.replay_player_id IS NOT NULL
    JOIN play_event_touch_details detail ON detail.event_id = event.id
    WHERE event.source_stream = 'touch'
    GROUP BY event.analysis_run_id, event.replay_id, subject.replay_player_id
),
touch_counts AS (
    SELECT
        r.canonical_analysis_run_id AS analysis_run_id,
        rp.replay_id,
        rp.id AS replay_player_id,
        concat(rp.platform, ':', rp.platform_player_id) AS player_subject_id,
        rp.platform,
        rp.platform_player_id,
        rp.team,
        rp.active_time_seconds,
        COALESCE(counts.aerial_touch_count, 0) AS aerial_touch_count
    FROM replay_players rp
    JOIN replays r
      ON r.id = rp.replay_id
     AND r.canonical_analysis_run_id IS NOT NULL
    LEFT JOIN player_touch_counts counts
      ON counts.replay_player_id = rp.id
     AND counts.replay_id = rp.replay_id
     AND counts.analysis_run_id = r.canonical_analysis_run_id
    WHERE rp.platform IS NOT NULL
      AND btrim(rp.platform) <> ''
      AND rp.platform_player_id IS NOT NULL
      AND btrim(rp.platform_player_id) <> ''
)
SELECT
    analysis_run_id,
    replay_id,
    replay_player_id,
    player_subject_id,
    platform,
    platform_player_id,
    team,
    'aerial-touch-count'::text AS stat_key,
    aerial_touch_count::double precision AS value,
    'count',
    active_time_seconds,
    'active_time',
    active_time_seconds
FROM touch_counts
ON CONFLICT DO NOTHING;
