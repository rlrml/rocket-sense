-- Materialized per-replay/player stat facts for fast cross-replay leaderboards.
-- Facts are tied to an analysis run, but store durable player identity fields so
-- they survive replay_players being deleted/recreated during a later reprocess
-- attempt. Leaderboard reads join facts to replays.canonical_analysis_run_id.

CREATE TABLE player_replay_stat_facts (
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    player_subject_id text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    team integer,
    stat_key text NOT NULL,
    value double precision NOT NULL,
    unit text NOT NULL,
    active_time_seconds double precision,
    denominator_key text,
    denominator_value double precision,
    labels jsonb NOT NULL DEFAULT '{}'::jsonb,
    labels_hash text GENERATED ALWAYS AS (md5(labels::text)) STORED,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (analysis_run_id, player_subject_id, stat_key, labels_hash),
    CHECK (player_subject_id <> ''),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> ''),
    CHECK (stat_key <> ''),
    CHECK (value >= 0.0),
    CHECK (unit <> ''),
    CHECK (active_time_seconds IS NULL OR active_time_seconds >= 0.0),
    CHECK (denominator_key IS NULL OR denominator_key <> ''),
    CHECK (denominator_value IS NULL OR denominator_value >= 0.0),
    CHECK (jsonb_typeof(labels) = 'object')
);

CREATE INDEX player_replay_stat_facts_stat_player_idx
    ON player_replay_stat_facts (stat_key, platform, platform_player_id)
    INCLUDE (
        replay_id,
        analysis_run_id,
        value,
        active_time_seconds,
        denominator_value
    );

CREATE INDEX player_replay_stat_facts_replay_run_idx
    ON player_replay_stat_facts (replay_id, analysis_run_id);

CREATE INDEX player_replay_stat_facts_replay_player_idx
    ON player_replay_stat_facts (replay_player_id)
    WHERE replay_player_id IS NOT NULL;

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
    'ball-opponent-half',
    SUM(
        CASE
            WHEN COALESCE((payload.payload ->> 'active')::boolean, true)
             AND (
                (rp.team = 0 AND payload.payload ->> 'field_half' = 'team_one_side')
                OR (rp.team = 1 AND payload.payload ->> 'field_half' = 'team_zero_side')
             )
            THEN COALESCE(
                event.duration_seconds,
                CASE
                    WHEN event.start_time IS NOT NULL AND event.end_time IS NOT NULL
                    THEN GREATEST(event.end_time - event.start_time, 0)
                    ELSE 0
                END,
                0
            )
            ELSE 0
        END
    ) AS value,
    'seconds',
    rp.active_time_seconds,
    'active_time',
    rp.active_time_seconds
FROM replay_players rp
JOIN replays r ON r.id = rp.replay_id
JOIN play_events event
  ON event.replay_id = rp.replay_id
 AND event.analysis_run_id = r.canonical_analysis_run_id
 AND event.source_stream = 'ball_half'
JOIN play_event_payloads payload ON payload.event_id = event.id
WHERE r.canonical_analysis_run_id IS NOT NULL
  AND rp.platform IS NOT NULL
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
        WHEN COALESCE((payload.payload ->> 'active')::boolean, true)
         AND (
            (rp.team = 0 AND payload.payload ->> 'field_half' = 'team_one_side')
            OR (rp.team = 1 AND payload.payload ->> 'field_half' = 'team_zero_side')
         )
        THEN COALESCE(
            event.duration_seconds,
            CASE
                WHEN event.start_time IS NOT NULL AND event.end_time IS NOT NULL
                THEN GREATEST(event.end_time - event.start_time, 0)
                ELSE 0
            END,
            0
        )
        ELSE 0
    END
) > 0.0
ON CONFLICT DO NOTHING;

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
    'possession-time',
    SUM(detail.duration) AS value,
    'seconds',
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
HAVING SUM(detail.duration) > 0.0
ON CONFLICT DO NOTHING;
