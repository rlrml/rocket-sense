-- Add a third touch-breakdown dimension, `location`, to player_replay_touch_breakdowns.
--
-- The Touches stats view already breaks touches down by `kind` (hit strength)
-- and `category` (action/possession). This adds where the touch happened --
-- Ground / Aerial / High aerial / Wall -- combining subtr-actor's `surface`
-- (ground/air/wall) and `height_band` (ground/low_air/high_air) facets from
-- play_event_touch_details into one set of buckets.

ALTER TABLE player_replay_touch_breakdowns
    DROP CONSTRAINT IF EXISTS player_replay_touch_breakdowns_dimension_check;

ALTER TABLE player_replay_touch_breakdowns
    ADD CONSTRAINT player_replay_touch_breakdowns_dimension_check
        CHECK (dimension IN ('kind', 'category', 'location'));

-- Backfill the new `location` dimension for canonical runs that were ALREADY
-- materialized (they have kind/category rows but no location yet). This only
-- adds rows -- the (run, player, dimension, value) PK and ON CONFLICT DO NOTHING
-- leave existing kind/category rows untouched.
--
-- Scoped to replays that already have breakdown rows on purpose: replays that
-- were never materialized (e.g. processed before 0067) are left entirely to
-- backfill_player_replay_touch_breakdowns, which now emits all three dimensions
-- in one pass. Adding only `location` here would otherwise make that backfill's
-- "no rows exist" guard skip them, stranding them without kind/category.
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
        event.analysis_run_id,
        subject.replay_player_id,
        CASE
            WHEN detail.surface = 'wall' THEN 'wall'
            WHEN detail.surface = 'ground' THEN 'ground'
            WHEN detail.surface = 'air' AND detail.height_band = 'high_air' THEN 'high_aerial'
            WHEN detail.surface = 'air' AND detail.height_band = 'low_air' THEN 'aerial'
            ELSE 'other'
        END AS location,
        COALESCE(GREATEST(detail.advance_distance, 0.0), 0.0) AS advance_distance
    FROM replays r
    JOIN play_events event
      ON event.replay_id = r.id
     AND event.analysis_run_id = r.canonical_analysis_run_id
     AND event.source_stream = 'touch'
    JOIN play_event_touch_details detail
      ON detail.event_id = event.id
    JOIN play_event_subjects subject
      ON subject.event_id = event.id
     AND subject.role = 'actor'
     AND subject.subject_kind = 'player'
     AND subject.replay_player_id IS NOT NULL
    WHERE r.canonical_analysis_run_id IS NOT NULL
      AND EXISTS (
          SELECT 1
          FROM player_replay_touch_breakdowns existing
          WHERE existing.replay_id = r.id
            AND existing.analysis_run_id = r.canonical_analysis_run_id
      )
),
breakdowns AS (
    SELECT
        replay_player_id,
        analysis_run_id,
        location AS value,
        COUNT(*) AS touch_count,
        COALESCE(SUM(advance_distance), 0.0) AS advance_distance
    FROM touch_events
    GROUP BY replay_player_id, analysis_run_id, location
)
SELECT
    breakdowns.analysis_run_id,
    rp.replay_id,
    rp.id,
    concat(rp.platform, ':', rp.platform_player_id),
    rp.platform,
    rp.platform_player_id,
    rp.team,
    'location',
    breakdowns.value,
    breakdowns.touch_count,
    breakdowns.advance_distance
FROM breakdowns
JOIN replay_players rp ON rp.id = breakdowns.replay_player_id
WHERE rp.platform IS NOT NULL
  AND btrim(rp.platform) <> ''
  AND rp.platform_player_id IS NOT NULL
  AND btrim(rp.platform_player_id) <> ''
ON CONFLICT DO NOTHING;
