-- Materialize per-replay ball-advance facts for the cross-replay stat
-- leaderboard. New and reprocessed analyses write the same fact from
-- processing.rs; this backfills existing canonical runs.

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
SELECT
    r.canonical_analysis_run_id,
    rp.replay_id,
    rp.id,
    concat(rp.platform, ':', rp.platform_player_id),
    rp.platform,
    rp.platform_player_id,
    rp.team,
    'ball-advance',
    SUM(detail.advance_distance) AS value,
    'uu',
    rp.active_time_seconds,
    'active_time',
    rp.active_time_seconds
FROM replay_players rp
JOIN replays r ON r.id = rp.replay_id
JOIN play_event_player_possession_details detail
  ON detail.replay_player_id = rp.id
JOIN play_events event
  ON event.id = detail.event_id
 AND event.analysis_run_id = r.canonical_analysis_run_id
WHERE r.canonical_analysis_run_id IS NOT NULL
  AND rp.platform IS NOT NULL
  AND btrim(rp.platform) <> ''
  AND rp.platform_player_id IS NOT NULL
  AND btrim(rp.platform_player_id) <> ''
GROUP BY
    r.canonical_analysis_run_id,
    rp.replay_id,
    rp.id,
    rp.platform,
    rp.platform_player_id,
    rp.team,
    rp.active_time_seconds
HAVING SUM(detail.advance_distance) > 0.0
ON CONFLICT DO NOTHING;
