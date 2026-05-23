# Mechanic Events and Review Design

Rocket Sense should store detected mechanics as indexed replay-derived events,
then layer human review metadata on top of those events. Detector output and
human labels have different lifecycles:

- detector output is rebuildable and tied to immutable `analysis_runs`;
- review metadata is user-authored product data and should survive detector
  recalculation when the same gameplay moment can be matched again.

This document focuses on storing mechanic detections after replay processing,
querying them for review playlists, and recording confirmation/rejection labels.

## Goals

- Represent mechanics that happen at a moment or over a span of frames.
- Keep mechanic detections searchable by replay, mechanic, player, team,
  confidence, frame/time, detector, and review state.
- Allow new mechanics and detector payloads without a migration per mechanic.
- Preserve provenance for detector version, `subtr-actor` version, config, and
  replay input via `analysis_runs`.
- Support human review workflows: confirm, reject, correct mechanic type,
  adjust frame span, add notes, and track who reviewed an event.
- Allow recalculation across all replays without corrupting previous detections
  or losing useful review history.

## Non-Goals

- Make detector output the canonical human label. Detector output is a candidate.
- Store full per-frame physics data in Postgres. Large timelines should remain
  in object storage and be referenced from event payloads or replay objects.
- Require every detector to produce the same payload shape. Payloads can vary,
  but top-level indexed columns should stay stable.

## Existing Foundation

The current schema already has the right broad shape:

- `analysis_runs` records replay-processing provenance.
- `replay_stat_blobs` stores full aggregate stat output.
- `mechanic_events` stores indexed mechanic detections.
- `replay_mechanic_rollups` stores fast replay-level mechanic counts.
- `annotations` and `annotation_schemas` provide a generic label mechanism.

The next design step is to make the event identity, event span model, review
model, and playlist query model explicit.

## Event Model

A mechanic event is a candidate gameplay segment emitted by a detector. It can
be a point event, span event, or partially known event.

Recommended normalized fields:

```text
mechanic_events
- id
- analysis_run_id
- index_profile_id
- replay_id
- mechanic
- detector
- detector_version
- subject_kind
- subject_id
- player_id
- team
- start_frame
- end_frame
- event_frame
- start_time
- end_time
- event_time
- confidence
- severity
- reason
- stable_fingerprint
- payload
- created_at
```

The existing table already has most of this. The useful additions are
`detector_version`, `subject_kind`, `subject_id`, `severity`, and
`stable_fingerprint`.

`subject_kind` and `subject_id` should match the generic stat-fact style:

- `replay`: event belongs to the replay as a whole.
- `team`: event belongs to team `0` or `1`.
- `player`: event belongs to a player appearance or canonical player.
- `ball`: event belongs to a ball-only sequence.
- `segment`: event belongs to a future named segment.

For the first implementation, `player_id` can remain the most important subject
field for player mechanics. Longer term, prefer `subject_kind = 'player'` and
`subject_id = <canonical player or replay appearance id>`.

## Moment and Span Semantics

Use all three frame columns because they answer different questions:

- `event_frame`: the most important frame for review and seeking.
- `start_frame`: first frame included in the clip.
- `end_frame`: last frame included in the clip.

Rules:

- A pure point event sets `event_frame`, `start_frame`, and `end_frame` to the
  same frame.
- A span event sets `start_frame` and `end_frame`, and should also set
  `event_frame` to the best representative frame.
- A detector may emit only `event_frame` if it cannot confidently bound the
  span. Review tooling can apply default pre/post-roll for clip playback.
- Time columns mirror frame columns for clients that seek by seconds.
- Frame columns are the canonical indexing fields because replay processing is
  frame based.

Add constraints over time:

```sql
CHECK (start_frame IS NULL OR end_frame IS NULL OR end_frame >= start_frame)
CHECK (
  event_frame IS NULL
  OR start_frame IS NULL
  OR event_frame >= start_frame
)
CHECK (
  event_frame IS NULL
  OR end_frame IS NULL
  OR event_frame <= end_frame
)
```

## Stable Event Identity

`mechanic_events.id` is a database identity for one analysis run. It should not
be used as the only durable identity for review carry-forward because a
`subtr-actor` or detector version bump can produce new rows.

Add `stable_fingerprint` for best-effort matching across recalculation:

```text
stable_fingerprint = hash(
  replay file sha256,
  mechanic,
  detector family,
  subject identity when known,
  rounded event frame or span,
  important normalized payload features
)
```

The fingerprint should intentionally ignore volatile details such as detector
version and confidence. It is not guaranteed globally unique, but it lets the
system propose review carry-forward when a new analysis generation detects the
same moment again.

For exact identity within a run, use a unique index over:

```text
analysis_run_id,
index_profile_id,
mechanic,
detector,
subject_kind,
subject_id,
start_frame,
end_frame,
event_frame,
md5(payload::text)
```

This is stronger than the current unique index because two span detections can
share the same `event_frame`.

## Detector Definitions

Mechanic and detector names should be stable identifiers, not display text.

```text
mechanic_definitions
- key                  -- "flip_reset", "ceiling_shot", "speed_flip"
- display_name
- description
- schema_version
- payload_schema
- created_at

mechanic_detectors
- key                  -- "subtr_actor.flip_reset.basic"
- mechanic_key
- version
- config_hash
- payload_schema
- created_at
```

These tables are optional for the first migration, but the API should behave as
if the names are stable. They become useful when UI needs descriptions, filters,
payload validation, or detector-specific thresholds.

## Review Model

Review metadata should not mutate `mechanic_events`. It should be stored as
separate human-authored records.

Recommended table:

```text
mechanic_event_reviews
- id
- mechanic_event_id
- replay_id
- reviewer_user_id
- status
- reviewed_mechanic
- reviewed_subject_kind
- reviewed_subject_id
- reviewed_start_frame
- reviewed_end_frame
- reviewed_event_frame
- confidence
- notes
- supersedes_review_id
- created_at
```

`status` should start with:

- `confirmed`: detector candidate is correct.
- `rejected`: detector candidate is not the claimed mechanic.
- `corrected`: reviewer accepted the general event but changed mechanic,
  player, team, or span.
- `uncertain`: reviewer could not decide.
- `needs_second_review`: reviewer flagged for another pass.

Use append-only reviews with `supersedes_review_id` rather than updating rows in
place. The current review state is the latest non-superseded review for an
event, or a materialized projection of that rule.

If the generic `annotations` table is used instead, each review should still
reference `mechanic_event_id` in `payload` or through a typed join table. A
typed `mechanic_event_reviews` table is preferable because review state is a
first-class query dimension for playlists.

## Review Carry-Forward

When a new analysis generation is produced:

1. Write new `mechanic_events`.
2. Match old reviewed events to new events by `stable_fingerprint`.
3. If the match is unique and the span is close, create a carry-forward review
   record with provenance pointing at the old review.
4. If matching is ambiguous, leave the new event unreviewed and optionally
   enqueue it for review.

Do not silently copy a rejection or confirmation across a materially different
span/player/mechanic. The review UI should make ambiguous carry-forward visible.

Optional fields for carry-forward:

```text
mechanic_event_reviews
- source_review_id
- carry_forward_method
- carry_forward_distance_frames
```

## Playlist and Queue Model

A mechanic review playlist is a query over indexed event candidates plus review
state. It should not require materializing rows for every possible queue at
first.

Example filters:

```text
mechanic in (...)
detector in (...)
min_confidence
max_confidence
review_status in (unreviewed, rejected, confirmed, uncertain)
player_id
team
playlist
map_code
replay_date range
created_at range
analysis generation / index profile
```

API shape:

```text
GET /api/v1/mechanics/events
GET /api/v1/mechanics/review-queue
POST /api/v1/mechanics/events/{event_id}/reviews
GET /api/v1/mechanics/playlists/{playlist_id}
POST /api/v1/mechanics/playlists
```

For saved playlists:

```text
mechanic_review_playlists
- id
- project_id
- name
- description
- query
- created_by_user_id
- created_at
- updated_at
```

`query` can be JSONB using a versioned schema. Saved playlists are definitions,
not snapshots, unless `snapshot_at` or explicit item tables are added later.

For stable human task assignment, add materialized queue items:

```text
mechanic_review_queue_items
- id
- playlist_id
- mechanic_event_id
- assigned_to_user_id
- state                  -- queued, in_progress, done, skipped
- priority
- created_at
- updated_at
```

This should be added only when assignment or progress tracking needs to be
durable. Dynamic query playlists are enough for early review.

## Indexing

Core indexes:

```sql
CREATE INDEX mechanic_events_active_lookup_idx
    ON mechanic_events (replay_id, index_profile_id, mechanic);

CREATE INDEX mechanic_events_review_queue_idx
    ON mechanic_events (mechanic, confidence DESC, replay_id);

CREATE INDEX mechanic_events_subject_mechanic_idx
    ON mechanic_events (subject_kind, subject_id, mechanic)
    WHERE subject_id IS NOT NULL;

CREATE INDEX mechanic_events_span_idx
    ON mechanic_events (replay_id, start_frame, end_frame)
    WHERE start_frame IS NOT NULL AND end_frame IS NOT NULL;

CREATE INDEX mechanic_events_event_frame_idx
    ON mechanic_events (replay_id, event_frame)
    WHERE event_frame IS NOT NULL;

CREATE INDEX mechanic_events_payload_gin_idx
    ON mechanic_events USING gin (payload jsonb_path_ops);

CREATE INDEX mechanic_event_reviews_event_created_idx
    ON mechanic_event_reviews (mechanic_event_id, created_at DESC);

CREATE INDEX mechanic_event_reviews_status_idx
    ON mechanic_event_reviews (status, created_at DESC);
```

For active user-facing queries, join through `replay_analysis_states` so old
analysis runs are hidden unless explicitly requested:

```sql
SELECT event.*
FROM mechanic_events event
JOIN replay_analysis_states state
  ON state.replay_id = event.replay_id
 AND state.index_profile_id = event.index_profile_id
 AND state.active_analysis_run_id = event.analysis_run_id
WHERE event.mechanic = $1;
```

## Rollups

`replay_mechanic_rollups` should remain rebuildable cache data for search and
facets.

Useful rollup dimensions:

- replay + mechanic
- replay + mechanic + player
- replay + mechanic + team
- replay + mechanic + review status

Review status rollups can be a separate table because review metadata is not
tied to `analysis_run_id` in quite the same way:

```text
replay_mechanic_review_rollups
- replay_id
- index_profile_id
- mechanic
- subject_kind
- subject_id
- status
- event_count
- updated_at
```

This lets replay search answer questions like:

- replays with at least one unreviewed flip reset candidate;
- replays with confirmed ceiling shots;
- replays where a detector produced rejected speed flips.

## Suggested Migration Sequence

1. Extend `mechanic_events` with `detector_version`, `subject_kind`,
   `subject_id`, `severity`, and `stable_fingerprint`.
2. Strengthen the event identity unique index to include span fields.
3. Add `mechanic_event_reviews`.
4. Add a view or query helper for current review state.
5. Add saved dynamic playlists as JSONB query definitions.
6. Add materialized queue items only when assignment/progress tracking needs it.
7. Add definition tables for mechanics/detectors when UI metadata or payload
   validation becomes important.

## Open Questions

- Should `subject_id` point to `replay_players.id`, a future canonical
  `players.id`, or a string platform identity initially?
- Should review carry-forward happen automatically during reindexing, or only
  as a separate auditable job?
- Do saved playlists need to be snapshots for reproducible labeling batches, or
  should they remain live queries at first?
- Which detector payload keys are important enough to promote into indexed
  columns for common review filters?
