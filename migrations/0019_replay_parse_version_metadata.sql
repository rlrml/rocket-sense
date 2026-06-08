ALTER TABLE replays
    ADD COLUMN parsed_at timestamptz,
    ADD COLUMN parsed_with_extractor_name text,
    ADD COLUMN parsed_with_extractor_version text,
    ADD COLUMN parsed_with_event_stream_schema_version text,
    ADD COLUMN parsed_with_rocket_sense_git_sha text,
    ADD COLUMN parsed_with_subtr_actor_version text,
    ADD COLUMN parsed_with_subtr_actor_git_sha text;

UPDATE replays replay
SET
    parsed_at = COALESCE(replay.parsed_at, analysis_run.finished_at),
    parsed_with_extractor_name = COALESCE(replay.parsed_with_extractor_name, analysis_run.extractor_name),
    parsed_with_extractor_version = COALESCE(replay.parsed_with_extractor_version, analysis_run.extractor_version),
    parsed_with_event_stream_schema_version = COALESCE(
        replay.parsed_with_event_stream_schema_version,
        analysis_run.event_stream_schema_version
    ),
    parsed_with_rocket_sense_git_sha = COALESCE(
        replay.parsed_with_rocket_sense_git_sha,
        analysis_run.rocket_sense_git_sha,
        analysis_run.extractor_git_sha
    ),
    parsed_with_subtr_actor_version = COALESCE(
        replay.parsed_with_subtr_actor_version,
        analysis_run.subtr_actor_version
    ),
    parsed_with_subtr_actor_git_sha = COALESCE(
        replay.parsed_with_subtr_actor_git_sha,
        analysis_run.subtr_actor_git_sha
    )
FROM analysis_runs analysis_run
WHERE analysis_run.id = replay.canonical_analysis_run_id
  AND analysis_run.status = 'succeeded'
  AND replay.parse_status = 'parsed';
