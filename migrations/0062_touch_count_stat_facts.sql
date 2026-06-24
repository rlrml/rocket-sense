-- Materialize per-replay/player classified touch counts for fast leaderboards.
-- These facts let the stat leaderboard rank high aerial touches and control
-- touches per game without scanning every touch event at request time.

DELETE FROM player_replay_stat_facts
WHERE stat_key IN ('high-aerial-touch-count', 'control-touch-count');

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
        COUNT(DISTINCT event.id) FILTER (WHERE detail.height_band = 'high_air') AS high_aerial_touch_count,
        COUNT(DISTINCT event.id) FILTER (WHERE detail.kind = 'control') AS control_touch_count
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
        COALESCE(counts.high_aerial_touch_count, 0) AS high_aerial_touch_count,
        COALESCE(counts.control_touch_count, 0) AS control_touch_count
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
),
facts AS (
    SELECT
        analysis_run_id,
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
        analysis_run_id,
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
    analysis_run_id,
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
ON CONFLICT DO NOTHING;
