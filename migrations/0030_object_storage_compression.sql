ALTER TABLE replays
    ADD COLUMN storage_encoding text NOT NULL DEFAULT 'identity',
    ADD COLUMN storage_byte_size bigint;

UPDATE replays
SET storage_byte_size = byte_size
WHERE storage_byte_size IS NULL;

ALTER TABLE replays
    ALTER COLUMN storage_byte_size SET NOT NULL,
    ADD CONSTRAINT replays_storage_encoding_check
        CHECK (storage_encoding IN ('identity', 'gzip', 'zstd')),
    ADD CONSTRAINT replays_storage_byte_size_check
        CHECK (byte_size >= 0 AND storage_byte_size >= 0);

ALTER TABLE replay_objects
    ADD COLUMN storage_encoding text NOT NULL DEFAULT 'identity',
    ADD COLUMN storage_byte_size bigint;

UPDATE replay_objects
SET storage_byte_size = byte_size
WHERE storage_byte_size IS NULL;

ALTER TABLE replay_objects
    ALTER COLUMN storage_byte_size SET NOT NULL,
    ADD CONSTRAINT replay_objects_storage_encoding_check
        CHECK (storage_encoding IN ('identity', 'gzip', 'zstd')),
    ADD CONSTRAINT replay_objects_storage_byte_size_check
        CHECK (byte_size >= 0 AND storage_byte_size >= 0);

ALTER TABLE analysis_runs
    ADD COLUMN event_stream_storage_encoding text,
    ADD COLUMN event_stream_storage_byte_size bigint;

UPDATE analysis_runs
SET event_stream_storage_encoding = 'identity',
    event_stream_storage_byte_size = event_stream_byte_size
WHERE event_stream_object_key IS NOT NULL
  AND event_stream_storage_encoding IS NULL;

ALTER TABLE analysis_runs
    DROP CONSTRAINT IF EXISTS analysis_runs_event_stream_object_metadata_check,
    ADD CONSTRAINT analysis_runs_event_stream_storage_encoding_check
        CHECK (
            event_stream_storage_encoding IS NULL
            OR event_stream_storage_encoding IN ('identity', 'gzip', 'zstd')
        ),
    ADD CONSTRAINT analysis_runs_event_stream_object_metadata_check CHECK (
        (
            event_stream_object_key IS NULL
            AND event_stream_sha256 IS NULL
            AND event_stream_byte_size IS NULL
            AND event_stream_storage_encoding IS NULL
            AND event_stream_storage_byte_size IS NULL
        )
        OR (
            event_stream_object_key IS NOT NULL
            AND event_stream_sha256 IS NOT NULL
            AND event_stream_byte_size IS NOT NULL
            AND event_stream_storage_encoding IS NOT NULL
            AND event_stream_storage_byte_size IS NOT NULL
        )
    );
