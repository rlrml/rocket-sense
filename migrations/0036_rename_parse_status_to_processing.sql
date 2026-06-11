-- Rename the replay "parse" terminology to "processing": the replay lifecycle
-- does far more than parse the binary (it extracts stats, builds the event
-- stream, etc.), so "processed/processing" is the accurate status. Column
-- RENAMEs are metadata-only (no table rewrite); the data UPDATE rewrites the
-- two affected status values.

-- Status column + values.
ALTER TABLE replays RENAME COLUMN parse_status TO processing_status;
UPDATE replays SET processing_status = 'processing' WHERE processing_status = 'parsing';
UPDATE replays SET processing_status = 'processed' WHERE processing_status = 'parsed';

-- Processing-version metadata columns.
ALTER TABLE replays RENAME COLUMN parsed_at TO processed_at;
ALTER TABLE replays RENAME COLUMN parsed_with_extractor_name TO processed_with_extractor_name;
ALTER TABLE replays RENAME COLUMN parsed_with_extractor_version TO processed_with_extractor_version;
ALTER TABLE replays RENAME COLUMN parsed_with_event_stream_schema_version TO processed_with_event_stream_schema_version;
ALTER TABLE replays RENAME COLUMN parsed_with_rocket_sense_git_sha TO processed_with_rocket_sense_git_sha;
ALTER TABLE replays RENAME COLUMN parsed_with_subtr_actor_version TO processed_with_subtr_actor_version;
ALTER TABLE replays RENAME COLUMN parsed_with_subtr_actor_git_sha TO processed_with_subtr_actor_git_sha;

-- Keep the supporting index name aligned with its renamed leading column.
ALTER INDEX replays_parse_status_created_at_idx RENAME TO replays_processing_status_created_at_idx;
