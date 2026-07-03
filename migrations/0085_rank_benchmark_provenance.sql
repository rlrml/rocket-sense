-- Provenance / freshness for the rank benchmark (the "Rank Trends" page).
--
-- `rank_benchmark_meta.computed_at` already records *when* a window was
-- materialized, but not *what versions produced the numbers*. The rank
-- benchmark is a pure SQL re-aggregation of the already-materialized
-- `player_replay_event_counts`; it does NOT reprocess replays. So there are two
-- distinct notions of "which version was used", and we record both:
--
--   1. The server pipeline snapshot that RAN the aggregation (`computed_with_*`).
--      Cheap to capture and useful for auditing which build materialized a
--      window, but it does NOT describe the provenance of the underlying event
--      data.
--
--   2. The distribution of `processed_with_*` versions across the replays that
--      FED the window (`source_version_summary`, JSONB). This is what actually
--      reveals whether the trends reflect the latest subtr-actor or stale,
--      un-reprocessed data -- e.g. "94% of replays processed with a078e256, 6%
--      on an older build; reprocess to update."
--
-- All columns are nullable: pre-existing rows (materialized before this
-- migration) carry no provenance until the next refresh repopulates them.

ALTER TABLE rank_benchmark_meta
    ADD COLUMN computed_with_subtr_actor_version text,
    ADD COLUMN computed_with_subtr_actor_git_sha text,
    ADD COLUMN computed_with_rocket_sense_git_sha text,
    ADD COLUMN computed_with_event_stream_schema_version text,
    -- Shape: {"total_replay_count": int,
    --         "versions": [{"subtr_actor_version": text|null,
    --                       "subtr_actor_git_sha": text|null,
    --                       "rocket_sense_git_sha": text|null,
    --                       "event_stream_schema_version": text|null,
    --                       "replay_count": int}, ...]}
    -- ordered by replay_count DESC (dominant version first).
    ADD COLUMN source_version_summary jsonb;
