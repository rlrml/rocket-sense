-- Parity check for the player_replay_event_counts materialization (migration 0056).
--
-- Run AFTER the 0056 backfill has completed, against staging or prod, to confirm
-- the materialized read path returns the same numbers as the live
-- play_event_subjects/play_events scan it replaces. Set the target player first:
--
--   psql "$DATABASE_URL" \
--     -v platform="steam" -v player_id="76561198…" \
--     -f scripts/verify-event-counts-parity.sql
--
-- Expectation:
--   * TARGET diffs: must all be 0. The stored count equals COUNT(DISTINCT event.id)
--     for a single player, so any nonzero row is a real bug (missing/extra events,
--     a stale fact, or a source_stream-filter mismatch).
--   * TEAMMATE diffs: 0 for every event type that has at most one same-team
--     subject per event. Event types where two teammates share an event (passes,
--     possession hand-offs) will show the materialized SUM exceeding the live
--     DISTINCT count -- that is the known, intended teammate-semantics change.
--     Investigate any teammate diff on a single-subject mechanic (flick, air
--     dribble, double tap, etc.) -- those should be 0.

\set plat :platform
\set pid :player_id

-- ---- TARGET parity -------------------------------------------------------
WITH live AS (
    SELECT event.event_type_id, COUNT(DISTINCT event.id) AS live_count
    FROM replay_players rp
    JOIN replays r ON r.id = rp.replay_id
    JOIN play_event_subjects subject ON subject.replay_player_id = rp.id
    JOIN play_events event
      ON event.id = subject.event_id
     AND event.analysis_run_id = r.canonical_analysis_run_id
    WHERE rp.platform = :'plat' AND rp.platform_player_id = :'pid'
      AND r.canonical_analysis_run_id IS NOT NULL
      AND event.source_stream NOT IN (
            'positioning','boost_state','boost_ledger','movement',
            'rotation_player','rotation_role_span','rotation_depth_span',
            'rotation_role','ball_depth','field_third','field_half',
            'ball_proximity','powerslide')
    GROUP BY event.event_type_id
),
mat AS (
    SELECT counts.event_type_id, SUM(counts.event_count) AS mat_count
    FROM player_replay_event_counts counts
    JOIN replays r
      ON r.id = counts.replay_id
     AND r.canonical_analysis_run_id = counts.analysis_run_id
    WHERE counts.platform = :'plat' AND counts.platform_player_id = :'pid'
    GROUP BY counts.event_type_id
)
SELECT 'TARGET' AS scope, et.key,
       COALESCE(live.live_count, 0) AS live_count,
       COALESCE(mat.mat_count, 0)   AS mat_count,
       COALESCE(mat.mat_count, 0) - COALESCE(live.live_count, 0) AS diff
FROM live
FULL OUTER JOIN mat ON mat.event_type_id = live.event_type_id
JOIN event_types et ON et.id = COALESCE(live.event_type_id, mat.event_type_id)
WHERE COALESCE(mat.mat_count, 0) <> COALESCE(live.live_count, 0)
ORDER BY abs(COALESCE(mat.mat_count, 0) - COALESCE(live.live_count, 0)) DESC;

-- ---- TEAMMATE parity (diffs expected only on multi-subject event types) ---
WITH target_appearances AS (
    SELECT rp.id, rp.replay_id, rp.team, r.canonical_analysis_run_id AS run_id
    FROM replay_players rp
    JOIN replays r ON r.id = rp.replay_id
    WHERE rp.platform = :'plat' AND rp.platform_player_id = :'pid'
      AND r.canonical_analysis_run_id IS NOT NULL
),
live AS (
    SELECT event.event_type_id, COUNT(DISTINCT event.id) AS live_count
    FROM target_appearances target
    JOIN replay_players teammate
      ON teammate.replay_id = target.replay_id
     AND teammate.team = target.team
     AND teammate.id <> target.id
    JOIN play_event_subjects subject ON subject.replay_player_id = teammate.id
    JOIN play_events event
      ON event.id = subject.event_id
     AND event.analysis_run_id = target.run_id
    WHERE event.source_stream NOT IN (
            'positioning','boost_state','boost_ledger','movement',
            'rotation_player','rotation_role_span','rotation_depth_span',
            'rotation_role','ball_depth','field_third','field_half',
            'ball_proximity','powerslide')
    GROUP BY event.event_type_id
),
target_mat AS (
    SELECT DISTINCT counts.replay_id, counts.team
    FROM player_replay_event_counts counts
    JOIN replays r
      ON r.id = counts.replay_id
     AND r.canonical_analysis_run_id = counts.analysis_run_id
    WHERE counts.platform = :'plat' AND counts.platform_player_id = :'pid'
),
mat AS (
    SELECT counts.event_type_id, SUM(counts.event_count) AS mat_count
    FROM target_mat appearance
    JOIN player_replay_event_counts counts
      ON counts.replay_id = appearance.replay_id
     AND counts.team = appearance.team
     AND NOT (counts.platform = :'plat' AND counts.platform_player_id = :'pid')
    GROUP BY counts.event_type_id
)
SELECT 'TEAMMATE' AS scope, et.key,
       COALESCE(live.live_count, 0) AS live_count,
       COALESCE(mat.mat_count, 0)   AS mat_count,
       COALESCE(mat.mat_count, 0) - COALESCE(live.live_count, 0) AS diff
FROM live
FULL OUTER JOIN mat ON mat.event_type_id = live.event_type_id
JOIN event_types et ON et.id = COALESCE(live.event_type_id, mat.event_type_id)
WHERE COALESCE(mat.mat_count, 0) <> COALESCE(live.live_count, 0)
ORDER BY abs(COALESCE(mat.mat_count, 0) - COALESCE(live.live_count, 0)) DESC;
