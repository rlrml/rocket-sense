-- Materialized per-replay/player event counts for fast lifetime stat aggregates.
--
-- The lifetime stats page (`/api/v1/stats/aggregates`) previously counted events
-- on every request by scanning the player's `play_event_subjects` and joining to
-- `play_events` across all of their replays -- O(every event the player ever
-- participated in), re-run per playlist group. This table pre-aggregates that
-- scan to one integer per (canonical run, player, event type) so reads become a
-- `SUM(event_count)` over a few thousand rows joined to `replays` for filtering.
--
-- Grain mirrors `player_replay_stat_facts` (0054): rows are tied to an analysis
-- run but carry durable player identity (`player_subject_id`, platform/id) so
-- they survive `replay_players` being deleted/recreated during a later reprocess.
-- Reads join to `replays.canonical_analysis_run_id` to ignore superseded runs.
--
-- Only "user-facing" event streams are materialized (the same `source_stream`
-- exclusion list the live query applied via AGGREGATE_VISIBLE_EVENT_SOURCE_STREAM_SQL);
-- stat-term and replay filters stay at read time, so no replay dimensions are
-- denormalized here -- the read already joins `replays` for its full filter set.

CREATE TABLE player_replay_event_counts (
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    player_subject_id text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    team integer,
    event_type_id integer NOT NULL REFERENCES event_types(id),
    event_count integer NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (analysis_run_id, player_subject_id, event_type_id),
    CHECK (player_subject_id <> ''),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> ''),
    CHECK (event_count > 0)
);

-- "My lifetime stats": filter by player, join replays, GROUP BY event type.
CREATE INDEX player_replay_event_counts_player_idx
    ON player_replay_event_counts (platform, platform_player_id)
    INCLUDE (event_type_id, replay_id, analysis_run_id, team, event_count);

-- Teammates/opponents: fan out from the player's replays to co-players, then
-- split by team relative to the target. Also serves the replays join by replay.
CREATE INDEX player_replay_event_counts_replay_idx
    ON player_replay_event_counts (replay_id, analysis_run_id)
    INCLUDE (team, event_type_id, platform, platform_player_id, event_count);

-- Cross-player leaderboards: filter by a single event type, GROUP BY player.
CREATE INDEX player_replay_event_counts_event_type_idx
    ON player_replay_event_counts (event_type_id, platform, platform_player_id)
    INCLUDE (replay_id, analysis_run_id, event_count);

-- One-time backfill for existing canonical analysis runs. This runs the slow
-- subject/event scan once for every player; on large databases consider running
-- it batched by replay range outside the migration if it locks for too long.
-- The SELECT mirrors `insert_player_replay_event_counts` in processing.rs scoped
-- to a single replay -- keep the two in sync.
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
    r.canonical_analysis_run_id,
    rp.replay_id,
    (array_agg(rp.id))[1],
    concat(rp.platform, ':', rp.platform_player_id),
    rp.platform,
    rp.platform_player_id,
    MIN(rp.team),
    event.event_type_id,
    COUNT(DISTINCT event.id)
FROM replay_players rp
JOIN replays r ON r.id = rp.replay_id
JOIN play_event_subjects subject ON subject.replay_player_id = rp.id
JOIN play_events event
  ON event.id = subject.event_id
 AND event.analysis_run_id = r.canonical_analysis_run_id
WHERE r.canonical_analysis_run_id IS NOT NULL
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
GROUP BY
    r.canonical_analysis_run_id,
    rp.replay_id,
    rp.platform,
    rp.platform_player_id,
    event.event_type_id
ON CONFLICT DO NOTHING;
