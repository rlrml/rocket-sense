# Stats Metadata Indexing

Rocket Sense stores replay-derived stats in two layers:

- The full stats output is stored as an authoritative blob tied to an
  `analysis_runs` row.
- A selected subset of stats and mechanic detections is projected into
  searchable index tables tied to both the analysis run and an index profile.

This keeps stat iteration cheap. When `subtr-actor`, extractor code, or index
profile configuration changes, existing blobs and projections can be marked
stale without changing the database shape. The indexed tables are rebuildable
cache data; the stat blob and its analysis-run provenance are the durable record.

## Versioning

Each `analysis_runs` row records the code and configuration that produced a stat
blob:

- extractor name and version
- extractor git SHA when available
- `subtr-actor` version and git SHA when available
- Rocket Sense git SHA when available
- input replay file SHA-256
- analysis config hash
- stats schema version

`replay_analysis_states` tracks the desired extractor/config state for a replay
and index profile. It gives workers a simple queue for reanalysis or reindexing
while still allowing staleness to be audited from immutable run metadata.

## Processing

The initial implementation starts processing from the upload request by spawning
a Tokio task after the replay bytes and metadata have been committed. The task
marks the replay `parsing`, creates an `analysis_runs` row, runs aggregate
`subtr-actor` stats on a blocking thread, writes `replay_stat_blobs`, then marks
the replay `parsed` or `failed`.

This is intentionally not a durable queue. A crash can lose in-flight work, and
there is no startup sweep yet. That is acceptable for the first pass because the
database schema already has enough run/state metadata to grow into a stronger
worker later without changing the stat blob/index model.

Set `ROCKET_SENSE_PROCESS_REPLAYS_IN_BACKGROUND=false` to disable the spawned
processor.

## Blobs

`replay_stat_blobs.stats` is JSONB so aggregate stats remain queryable for
debugging and ad-hoc inspection. Large frame/timeline artifacts should stay in
object storage via `replay_objects`; the blob table should hold replay-level,
team-level, and player-level aggregate output.

## Indexed Facts

`indexed_stat_facts` is intentionally generic:

- `subject_kind` and `subject_id` describe whether a fact belongs to the replay,
  a team, a player, or a later segment.
- `stat_key` is a stable dotted key such as `boost.bpm` or
  `touch.touch_count`.
- `labels` holds optional stat dimensions as a JSON object.
- exactly one typed value column is populated.

This table should contain only stats selected by the active index profile. New
stats do not require migrations unless they need a new query shape that the
generic fact model cannot express.

## Mechanics

Mechanic detections use `mechanic_events` rather than only stat facts because
they have time spans, players, detector provenance, confidence, and payloads.
`replay_mechanic_rollups` is the fast path for replay-level searches such as
"at least two flip resets" or "any ceiling shot with confidence over 0.8".

See [Mechanic Events and Review Design](mechanic-events-review-design.md) for
the event identity, point/span semantics, review metadata, and review playlist
model.

## Query Policy

Search endpoints should use indexed projections for normal queries. If a stat is
not present in the active index profile, the API should report that the stat is
not indexed rather than silently scanning every blob. Slow JSONB blob inspection
can exist as an explicit debugging/admin path.
