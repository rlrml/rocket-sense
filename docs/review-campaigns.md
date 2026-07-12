# Review campaigns

A **review campaign** organizes a human labeling effort: a question ("Was this
player genuinely challenging for the ball?"), a curated candidate set imported
from a subtr-actor–emitted review playlist, per-reviewer labels, progress
tracking, and JSONL export for training.

## The concept: a question over curated candidates

Detector development produces large candidate universes (every event a tuned
emitter fires across a corpus). A campaign is *not* that universe — it is the
curated slice a human should actually look at, framed as a single question with
a fixed decision vocabulary (default: `confirmed` / `rejected` / `uncertain` /
`bad_candidate`; a campaign may define its own `{key, status, label}` set).
Multiple reviewers label the same items independently; progress is tracked both
campaign-wide (distinct labeled items) and per reviewer.

## Candidate identity is content-derived

Campaign items are keyed by `candidate_key` — the imported item's
`meta.eventId`, of the form `<sha12>:<event_type>:<frame>:<player>`. That key
is derived from the replay content and the event's position in it, **not** from
a `play_events` row id.

This is the deliberate contrast with the `event_reviews` flow: event reviews
anchor to detected `play_events`, whose ids are replaced on every detector
re-run, so review carry-forward requires snapshotting and re-matching. A
campaign label keyed by content survives detector re-runs untouched — relabel
nothing, rematch nothing. The same key is what the subtr-actor local flat-file
labeling flow uses, so labels collected either way join trivially.

## Where the data lives

- **Database** (`review_campaigns`, `review_campaign_items`,
  `review_campaign_labels`, migration `0093`): the campaign definition, the
  curated items (a few hundred rows of ~1KB JSONB `item_meta` each — the
  imported item meta stored verbatim, including `payload`, `provenance`, and
  `target`), and the labels. Labels are small, precious, and multi-user; they
  belong in the DB.
- **Object storage & subtr-actor tools**: the bulky candidate universe,
  emitter output, and playlist generation stay outside the DB. A campaign only
  ever holds the curated slice; regenerating candidates never mutates campaign
  rows.

## Import / export interchange

- **Import**: `POST /api/v1/campaigns` accepts the emitter's playlist manifest
  (`{version, kind, label, replays[], items[], meta}`). `replays[].id` is the
  replay file's sha256 stem, resolved to hosted replays via
  `replays.file_sha256`; items whose replay is not hosted are skipped and
  reported. The playlist's own label/meta are snapshotted into the campaign's
  `generator` column as provenance.
- **Serving**: `GET /api/v1/campaigns/{id}/playlist` re-emits the same
  manifest shape over the stored items, defaulting to *only the items the
  current reviewer has not labeled yet* (`?include-labeled=true` for all).
  Each item's `meta.reviewEndpoint` points at
  `POST /api/v1/campaigns/{id}/items/{item_id}/labels`, which the subtr-actor
  review player uses in preference to the event-review fallback.
- **Export**: `GET /api/v1/campaigns/{id}/labels.jsonl` emits one NDJSON line
  per label (`campaign`, `candidate`, `status`, `reviewer`, timestamps, replay
  sha, provenance/frame/payload from the stored item meta) — the same
  flat-file interchange the local labeling tools consume for training-set
  assembly, so DB-collected and locally-collected labels merge by
  `(campaign, candidate, reviewer)`.

## Phase roadmap

- **Phase 1 (this)**: import a playlist into a campaign, serve the campaign
  playlist to the review player, upsert per-reviewer labels, progress
  tracking, JSONL export, and a minimal `/campaigns` SPA page.
- **Phase 2**: emitter-side `--push-campaign` (the subtr-actor tools create or
  extend a campaign directly instead of via file upload), plus richer export
  joins (reviewer identity/display names, replay metadata, per-item agreement
  columns).
- **Phase 3**: labeling quotas (`labels_per_item` enforcement and assignment),
  inter-reviewer agreement surfacing, and outcome records — the adjudicated
  final answer per candidate, distinct from individual labels.
