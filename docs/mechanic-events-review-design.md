# Mechanic Events and Review Design

Rocket Sense stores mechanic detections as typed rows in the generic
`play_events` table, then layers human review metadata on top. Detector output
and human labels have different lifecycles:

- detector output is rebuildable and tied to immutable `analysis_runs`;
- review metadata is user-authored product data and should survive detector
  recalculation when the same gameplay moment can be matched again.

## Goals

- Represent mechanics that happen at a moment or over a span of frames.
- Keep detections searchable by replay, mechanic, player, team, confidence,
  frame/time, detector, and review state.
- Allow new mechanics and detector payloads without a migration per mechanic.
- Preserve provenance through `analysis_runs`.
- Support human review workflows: confirm, reject, correct event type, adjust
  frame span, add notes, and track who reviewed an event.

## Event Model

Mechanics are `play_events` whose `event_types.category = 'mechanic'` and whose
event type key is `mechanic.<name>`, for example `mechanic.flip_reset`.

Important columns:

```text
play_events
- id
- analysis_run_id
- replay_id
- event_type_id
- source
- source_event_id
- primary_subject_kind
- primary_subject_id
- start_frame
- end_frame
- event_frame
- start_time
- end_time
- event_time
- confidence
- attributes
- payload
- created_at
```

`source` identifies the detector family. `source_event_id` should be stable
within the serialized event stream. `attributes` holds compact dimensions such
as team. `payload` is optional detector detail for review UI; the complete
analysis output remains in the event stream blob.

## Moment and Span Semantics

Use all three frame columns because they answer different questions:

- `event_frame`: the most important frame for review and seeking.
- `start_frame`: first frame included in the clip.
- `end_frame`: last frame included in the clip.

A point event sets all three frame columns to the same value. A span event sets
start and end and should also choose the best representative event frame. Frame
columns are canonical for indexing; time columns mirror them for clients that
seek by seconds.

## Subjects

The primary mechanic actor should be stored on `play_events`:

```text
primary_subject_kind = 'player'
primary_subject_id = <remote player id or replay-local player identity>
```

Additional participants belong in `play_event_subjects`. When the subject can be
resolved to a replay-player appearance, `play_event_subjects.replay_player_id`
should be populated for joins to names, teams, and platform identity.

## Stable Event Identity

`play_events.id` is a database identity for one analysis run. It should not be
used as the only durable identity for review carry-forward because a
`subtr-actor` or detector version bump can produce new rows.

For exact identity within a run, `play_events` is unique over analysis run,
event type, source, source event id, primary subject, frame span, event frame,
and indexed attributes. Detector code should prefer stable `source_event_id`
values derived from the serialized event stream.

Longer term, review carry-forward can add a stable fingerprint generated from
the replay file SHA-256, event type, detector family, subject identity, rounded
frame/span, and important normalized payload features. The fingerprint should
ignore volatile details such as detector version and confidence.

## Review Model

Review metadata does not mutate `play_events`. It is stored as append-only
records in `event_reviews`:

```text
event_reviews
- id
- event_id
- replay_id
- reviewer_user_id
- status
- reviewed_event_type_key
- reviewed_subject_kind
- reviewed_subject_id
- reviewed_start_frame
- reviewed_end_frame
- reviewed_event_frame
- confidence
- notes
- supersedes_review_id
- source_review_id
- carry_forward_method
- carry_forward_distance_frames
- created_at
```

Initial statuses are `confirmed`, `rejected`, `corrected`, `uncertain`, and
`needs_second_review`. The current review state is the latest review for an
event unless a later supersession model requires a stricter projection.

## Review Carry-Forward

When a new analysis generation is produced:

1. Write the new event stream and new `play_events`.
2. Match old reviewed events to new events by stable source identity or a future
   fingerprint.
3. If the match is unique and close, create a carry-forward review record with
   provenance pointing at the old review.
4. If matching is ambiguous, leave the new event unreviewed and optionally queue
   it for review.

Do not silently copy a rejection or confirmation across a materially different
span, player, or mechanic.

## Playlist and Queue Model

A mechanic review playlist is a query over `play_events` plus latest review
state. It does not need materialized rows for every queue at first.

Example filters:

```text
event type / mechanic
source / detector
min_confidence
max_confidence
review_status
player_id
team
map_code
replay date range
created_at range
```

Saved playlists use `mechanic_review_playlists.query` as versioned JSONB query
definitions. They are definitions, not snapshots, unless snapshot tables are
added later.

## Indexing

Mechanic queries should filter through `replays.canonical_analysis_run_id` so old
analysis runs are hidden unless explicitly requested:

```sql
SELECT event.*
FROM play_events event
JOIN event_types event_type
  ON event_type.id = event.event_type_id
JOIN replays replay
  ON replay.id = event.replay_id
WHERE event.analysis_run_id = replay.canonical_analysis_run_id
  AND event_type.category = 'mechanic';
```

The generic indexes on `play_events` cover event type, replay, frame, primary
subject, analysis run, and JSONB attributes. `event_reviews` has indexes for
latest-review lookup and status queues.

## Open Questions

- Should player subjects normalize immediately to `replay_players.id`, or keep a
  stable platform identity in `primary_subject_id` and join through
  `play_event_subjects`?
- Should carry-forward happen automatically during reprocessing, or as a
  separate auditable job?
- Do saved playlists need snapshots for reproducible labeling batches, or should
  they remain live queries at first?
- Which detector payload keys are important enough to promote into indexed
  attributes for common review filters?
