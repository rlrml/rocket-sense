# Annotation snapshots

Rocket Sense can export `event_reviews` and review campaign labels as an
immutable NDJSON snapshot. Snapshot endpoints use the existing bearer-token
authentication and require an admin user.

## API

- `POST /api/v1/admin/annotation-snapshots` creates a snapshot and returns its
  metadata.
- `GET /api/v1/admin/annotation-snapshots` lists snapshot metadata.
- `GET /api/v1/admin/annotation-snapshots/{id}/download` downloads the NDJSON
  stream.

## Creation

Snapshot creation reads both annotation sources in one read-only,
repeatable-read transaction. The transaction timestamp is recorded as the
cutoff.

The NDJSON stream is compressed with zstd and written to object storage. The
`annotation_snapshots` table stores the cutoff, source and label counts, replay
count, campaign IDs, byte sizes, storage encoding, and SHA-256 digests for both
the NDJSON content and the stored object.

Snapshot contents are immutable. Reviews added or changed after the cutoff
appear in a later snapshot.

## NDJSON format

The first line is a manifest with schema version
`rocket-sense.annotations/v1`. It contains the snapshot ID, cutoff, creation
metadata, and summary counts.

Each remaining line is an annotation with schema version
`rocket-sense.annotation/v1` and contains:

- annotation ID and source record ID;
- source kind (`event_review` or `campaign`) and campaign identifiers when
  applicable;
- Rocket Sense replay ID and replay-file SHA-256;
- optional event type, source stream, subject, frame and time bounds, payload,
  attributes, and perspective;
- label status, confidence, notes, reviewer ID, and timestamps;
- the original event snapshot or campaign metadata under `provenance`.

Each review remains an individual annotation with its source and label status.
Annotations without an event type remain in the snapshot.

Referenced replay files are available from
`GET /api/v1/replays/{replay_id}/file`.
