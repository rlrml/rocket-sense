# Player Profile Stats: Query Cost and Denormalization Plan

The player profile page now issues four queries per view:

- `GET /api/v1/stats/aggregates` — event counts and per-minute rates, grouped
  by playlist, with teammate baselines.
- `GET /api/v1/stats/events/kickoff/summary` — kickoff outcome shares,
  dimension distributions, and headline metrics.
- `GET /api/v1/stats/player-overview` — goal tag proportions and rotation
  role/depth time shares (new).
- `GET /api/v1/players/{platform}/{id}` — profile metadata.

All of them resolve the target player the same way: a `target_appearances`
CTE over `replay_players (platform, platform_player_id)`, then a join through
`play_event_subjects.replay_player_id` to `play_events`, filtered to the
replay's `canonical_analysis_run_id`.

## What is already fast

- `replay_players_platform_player_profile_cover_idx` covers the appearance
  lookup without heap fetches.
- `play_event_subjects_replay_player_role_idx` and
  `play_event_subjects_replay_player_event_idx` make the subjects join an
  index-only range scan per appearance.
- Kickoff career queries were denormalized in migration
  `0028_kickoff_detail_denormalized_links.sql`: the kickoff detail tables
  carry `replay_id`/`replay_player_id` directly plus career indexes, so the
  kickoff summary endpoint does not pay the generic subjects→events join.
- Goal tag extraction unnests the `tags` jsonb array from
  `play_event_payloads`, but only for rows already narrowed to the player's
  `goal_context` events — goals are rare (a handful per game), so the lateral
  unnest is noise.

## Where cost grows

Per-player work scales with the number of indexed events the player appears
in, not with replay count alone:

1. **Rotation span sums** (`rotation_role_span` / `rotation_depth_span`) are
   the densest streams a profile query touches — a role or depth span ends
   every few seconds, so a single game contributes hundreds of rows per
   player. The time-share query in `player_overview.rs` and the duration
   sums in `stats.rs` both walk all of them.
2. **`/stats/aggregates`** walks every event the player is a subject of, for
   every event type, plus the same again for teammates when
   `include-teammates` is set. The subjects index makes each probe cheap, but
   the event rows themselves are fetched by primary key — random I/O that
   grows linearly with career size.
3. Every event row also requires a join back to `replays` to check
   `canonical_analysis_run_id`, because stale runs can coexist with the
   canonical one.

For players with thousands of indexed replays this lands in the
hundreds-of-thousands-of-rows range per request, repeated for each profile
view (there is no caching layer).

## Recommendation: staged denormalization

### Stage 0 (now) — ship and measure

The new endpoints reuse the existing partial indexes and the canonical-run
filter pattern. Nothing on the profile page needs a migration to be correct.
Add `EXPLAIN (ANALYZE, BUFFERS)` sampling for the two heaviest queries
(aggregates, rotation time shares) on the largest real profiles before
denormalizing further.

### Stage 1 — per-appearance event rollups

If profile latency becomes a problem, the highest-leverage change is a rollup
table written at indexing time, following the 0028 precedent:

```sql
CREATE TABLE replay_player_event_rollups (
    analysis_run_id  uuid    NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id        uuid    NOT NULL,
    replay_player_id uuid    NOT NULL REFERENCES replay_players(id) ON DELETE CASCADE,
    event_type_id    integer NOT NULL REFERENCES event_types(id),
    event_count      integer NOT NULL,
    total_duration_seconds double precision,
    PRIMARY KEY (analysis_run_id, replay_player_id, event_type_id)
);
CREATE INDEX replay_player_event_rollups_career_idx
    ON replay_player_event_rollups (replay_player_id, event_type_id);
```

- One row per (appearance, event type) instead of one per event: a ~100×
  reduction for dense streams like rotation spans, and aggregates become a
  sum over a few dozen rows per replay.
- Keying by `analysis_run_id` makes invalidation trivial: reprocessing writes
  rollups for the new run; queries filter through
  `replays.canonical_analysis_run_id` exactly as they do today; stale-run
  rollups are deleted with their run.
- Backfill mirrors 0028: one statement aggregating from
  `play_event_subjects` × `play_events`.
- Both `/stats/aggregates` (counts, durations, teammate baselines) and the
  rotation time shares in `/stats/player-overview` can be ported to it
  without changing response shapes.

### Stage 2 — only if needed

If even per-replay rollups are too slow for whale profiles, add a per-player
career cache (table or materialized view) refreshed when a replay's canonical
run changes. This brings consistency bookkeeping (replay deletion, filter
combinations can no longer be served from a single career row), so it should
wait for evidence that Stage 1 is insufficient. Most profile filters
(playlist, date range, pro) would have to fall back to Stage 1 tables anyway.

### Goal tags

Tags currently live only in `goal_context` payloads (`goal_tags` is a
non-indexed timeline stream, so `play_event_goal_tag_details` receives no
rows from the current pipeline). Given goal sparsity the payload unnest is
fine indefinitely; if tags ever need filtering (e.g. "show me all flip reset
goals"), populate a `(replay_player_id, tag_kind, event_id)` detail table at
indexing time instead of widening the rollup table.
