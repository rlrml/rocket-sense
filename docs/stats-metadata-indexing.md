# Event Stream Indexing

Rocket Sense stores replay-derived analysis in two layers:

- The complete event stream is serialized to object storage and tied to an
  immutable `analysis_runs` row.
- Searchable events are projected into `play_events` and `play_event_subjects`
  as lean index rows.

The event stream is the durable replay-processing output. Database rows are an
index over that stream, not a second aggregate-stat product. If indexing policy
changes, rows can be rebuilt from a new run without preserving old projection
tables.

## Versioning

Each `analysis_runs` row records the provenance for one serialized event stream:

- extractor name and version
- extractor git SHA when available
- `subtr-actor` version and git SHA when available
- Rocket Sense git SHA when available
- input replay file SHA-256
- event stream schema version
- event stream object key, SHA-256, and byte size once processing succeeds

`replays.canonical_analysis_run_id` points at the active analysis run for normal
queries. Older runs can remain for audit or debugging, but user-facing event
queries should filter through the canonical run.

## Processing

The upload processor creates an `analysis_runs` row, runs `subtr-actor`, builds
an event stream, writes that stream to object storage, and then indexes selected
events into Postgres. It also updates replay metadata and replay-player rows.

The initial worker still runs as a spawned Tokio task after upload commit. This
is not a durable queue; a crash can lose in-flight work. The schema keeps enough
run provenance to support a stronger worker later without changing the event
stream model.

Set `ROCKET_SENSE_PROCESS_REPLAYS_IN_BACKGROUND=false` to disable the spawned
processor.

## Event Stream Blob

The serialized event stream contains replay metadata, exact replay-data events,
and timeline-derived events. It should remain the canonical output for analysis.
High-volume or highly-shaped payloads belong here first.

Object storage keeps the full stream out of hot Postgres tables while still
making it feasible to re-index, inspect, or export a complete replay analysis.
The `replay_objects` table records the stored object; raw replay storage remains
owned by `replays.storage_key` and is not removed by analysis migrations.

## Indexed Events

`play_events` is the canonical event index table:

- `event_type_id` references `event_types`, whose keys are stable flat names
  such as `touch`, `boost_pickup_both`, and `flip_reset`.
- `source` identifies the producing subsystem, such as exact replay data or a
  timeline detector.
- `source_event_id` gives stable identity within the event stream when known.
- subject columns identify the primary replay, team, player, ball, boost pad, or
  segment involved.
- frame/time columns support replay seeking and range queries.
- `attributes` holds small indexed dimensions.
- `payload` is optional and should only contain compact detail needed directly
  by indexed workflows.

`play_event_subjects` stores secondary participants and normalized player
appearance links. It should be used when an event has multiple players, teams,
or objects involved.

## Indexing Policy

The current policy indexes serialized stats-timeline streams as lean rows,
including core, possession, positioning, movement, contact, boost, and mechanic
events. Replay-data `touch_events` are intentionally not indexed because they
are a narrow replay signal rather than the canonical player touch count. Full
payloads remain in the serialized event stream unless a product query needs a
compact copy in Postgres.

Event type metadata should follow `subtr-actor`'s static event definitions when
available. Rocket Sense keeps explicit fallbacks for serialized streams that do
not yet have upstream definitions, and special-cases review-friendly flat keys
for mechanic tags, boost pickup outcomes, boost ledger transactions, and derived
rotation role/depth/stint events. Goal tags are indexed as `goal_type` labels,
not mechanics, because they describe a goal event rather than being independent
events. Goal context and core-player scoreboard/context rows are indexed as
`context` metadata and should not appear in the default event-review type picker.
Touches, touch-ball-movement rows, and whiffs are indexed as `other`, not
`mechanic`, because they are low-level ball-interaction signals rather than
repeatable mechanical executions.

Measured fixture volumes from `subtr-actor` v0.8.14 support indexing touches by
default: touches averaged about 124 per replay, with a fixture maximum of 209.
Boost pad events were higher volume, averaging about 1,414 per replay and
peaking at 3,521, so they should stay lean and avoid per-row payload expansion.

Rocket Sense is still pre-compatibility, so old aggregate stat tables, index
profiles, and mechanic-specific event tables can be removed in favor of this
single event model. Aggregates should be computed from `play_events` or from
the serialized stream when needed, rather than persisted as the primary output.

## Query Policy

Normal API queries should use `play_events` filtered to the replay's canonical
analysis run. Queries that need the entire replay output should fetch the event
stream blob. Slow blob scans can exist as explicit debugging or admin paths, but
not as hidden fallbacks for ordinary search.
