# Client-side WASM reprocessing

## Goal

Let trusted users spend **their own browser compute** to reprocess a replay,
instead of queueing a job on the server. The browser already ships a WebAssembly
build of `subtr-actor` (it powers the in-browser replay player), and that build
exposes the very same analysis collector the server runs. So a user can
regenerate a replay's analysis locally and upload the result; the server simply
persists it as a new canonical analysis run, **without re-running `subtr-actor`
itself**.

Who is allowed: the **replay owner OR an admin** — the same authorization the
existing `POST /replays/{id}/reprocess` endpoint already enforces. This is a
deliberately trust-based feature (see [Trust model](#trust-model)).

## Why this is cheap (the key realizations)

The feature sounds heavy ("port the analysis pipeline to the browser") but the
pieces already line up:

1. **The WASM build already does the expensive work.**
   `web/vendor/@rlrml/subtr-actor` exports `get_stats_timeline_json(bytes) ->
   Uint8Array`, which runs `StatsTimelineEventCollector::get_replay_stats_timeline_scaffold`
   — the *exact same* collector the server invokes inside
   `collect_replay_analysis` (`crates/rocket-sense-server/src/processing.rs`).
   The boxcars network-data parse plus the per-frame stat reducers — the costly
   part — already run in the browser today for the player.

2. **The server's persistence is cleanly separable from analysis.**
   In the original `process_replay`, only `collect_replay_analysis` touched
   `subtr-actor`. Everything after it (serialize/store the event stream, index
   `play_events`, write boost tracks, carry forward reviews, flip the canonical
   pointer, prune/GC) is pure DB + object-storage work that does not care *how*
   the analysis was produced.

3. **The auth gate already exists.** `POST /replays/{id}/reprocess` is already
   "owner-or-admin"; the new endpoint reuses that check verbatim.

Net result: **no `subtr-actor` change, no WASM rebuild, no re-vendor / re-pin /
submodule dance.** The work is one server endpoint + a refactor + a migration,
plus a web button.

## The boxcars constraint (why we read JSON instead of deserializing)

The obvious design — deserialize the uploaded JSON straight back into the typed
`subtr_actor::ReplayStatsTimelineScaffold` and call the existing functions — is
**not possible**, for two independent reasons:

1. The entire timeline event tree (`Event`, `EventPayload`, and its ~40 payload
   variants) derives only `Serialize`, not `Deserialize`. These types were built
   for one-way export to TypeScript.

2. `ReplayMeta.all_headers` and `PlayerInfo.stats` contain
   `boxcars::HeaderProp`, which is **serialize-only**. boxcars is a crates.io
   dependency (`>=0.11.3`) that we deliberately do **not** fork/patch anymore
   (the git-patch approach was retired). Note that `boxcars::RemoteId` /
   `PlayerId` *do* derive `Deserialize`; `HeaderProp` is the lone blocker there.

Adding `Deserialize` upstream was attempted and reverted: it compiles for the
shallow types but dies on `HeaderProp`, and it would still require the giant
event-tree change and a WASM rebuild for no real benefit — because the server
already processes events as `serde_json::Value` anyway (see below).

**Therefore the server treats the uploaded scaffold as `serde_json::Value`** and
reads the fields it needs directly. This keeps the whole feature inside this
repo with zero `subtr-actor` involvement.

## Architecture

```
Browser (owner/admin)                       Server
─────────────────────                       ──────
fetch /replays/{id}/file  ──► replay bytes
get_stats_timeline_json(bytes)
   = scaffold JSON (the WASM output)
POST /replays/{id}/reprocess/client
   { subtr_actor_git_sha, scaffold } ──────► auth: owner-or-admin
                                             version gate: client sha == server sha
                                             build ReplayAnalysisOutput from JSON:
                                               • event_stream  (reshape Value)
                                               • indexed_events (build_indexed_events, Value-based)
                                               • metadata       (JSON twins, full parity)
                                               • boost_tracks   (JSON twin)
                                             persist_analysis_output(...)  ← shared with server path
                                             new run becomes canonical
                                       ◄───── { replay_id, analysis_run_id, status }
```

The uploaded scaffold has top-level keys `config`, `replay_meta`, `events`
(`{"events":[...]}`), `frames`, `positioning_summary`, `accumulation_tracks`.
Only `replay_meta`, `events`, `frames`, and `accumulation_tracks` are consumed.

## Server implementation

All in `crates/rocket-sense-server`.

### Refactor: separate "persist" from "analyze"

`process_replay` was split so the post-analysis half is reusable:

- `persist_analysis_output(pool, storage, replay_id, analysis_run_id,
  file_sha256, output: ReplayAnalysisOutput)` — contains the original lines that
  store the event stream, `upsert_replay_search_metadata`, `ensure_event_types`,
  `insert_play_events`, `insert_boost_accumulation_tracks`,
  `carry_forward_event_reviews`, mark succeeded, mark parse succeeded, prune
  superseded events, GC superseded event-stream objects.
- `process_replay` now = set status → `insert_analysis_run` →
  read bytes → `collect_replay_analysis` → `persist_analysis_output`. Behavior
  unchanged.

### JSON path (the new code)

- `process_client_scaffold(pool, storage, replay_id, file_sha256,
  submitted_by_user_id, client_subtr_actor_git_sha, scaffold, source_block) ->
  Uuid` — the `pub(crate)` entry point. Sets status `processing`,
  `insert_analysis_run_client` (records provenance), builds the output from JSON,
  calls `persist_analysis_output`, and on error marks the run failed + replay
  failed — mirroring `process_replay`'s bookkeeping. Returns the new
  `analysis_run_id`.
- `replay_analysis_output_from_scaffold_json(scaffold, source_block)` — assembles
  `ReplayAnalysisOutput { event_stream, indexed_events, metadata, boost_tracks }`.
- `build_indexed_events_from_events(&Value)` — extracted from the existing
  `build_indexed_events`, which already started by serializing the timeline to a
  `Value` and walking it. The typed function now calls this; the JSON path passes
  the uploaded `events` value directly (same shape).
- **JSON twins** of the typed metadata/boost functions, mirroring their typed
  counterparts and reusing the primitive helpers (`normalize_playlist`,
  `normalize_header_value`, `parse_replay_date`, `player_lookup_key`,
  `finite_nonnegative`) plus the existing `ReplaySearchMetadata` / `…Player` /
  `…GameType` / `…Summary` structs:
  - `replay_search_metadata_from_scaffold_json`, `replay_search_player_json`,
    `replay_game_type_metadata_json`, `season_code_json`,
    `replay_summary_metadata_json`, `team_score_from_events_json`,
    `apply_player_timing_metadata_json`, `replay_playlist_json` (+ helpers).
  - `collect_boost_accumulation_tracks_from_json`, `frame_times_from_scaffold_json`.
  - Leaf shape readers: `remote_id_parts_json`, `scalar_id_string`,
    `header_prop_text_json`, `struct_fields_first_text`, `header_stat_int_json`,
    `header_text_json`.

### JSON shapes the twins depend on (verified)

- **`RemoteId`** is externally tagged: `{"Steam":"<u64-as-string>"}`,
  `{"Epic":"<id>"}`, `{"Xbox":"…"}`, `{"QQ":"…"}`, `{"SplitScreen":<n>}`,
  `{"PlayStation":{online_id,name,unknown1}}`, `{"PsyNet":{online_id,…}}`,
  `{"Switch":{online_id,…}}`. Mapped to `(platform, id)` identically to the typed
  `remote_id_parts` (`PlayStation→ps4`, etc.).
- **`HeaderProp`** (boxcars custom Serialize): `Bool`→raw bool, `Int`/`Float`→raw
  number, `QWord`→**string**, `Name`/`Str`→string, `Byte`→`{"kind","value"}`,
  `Struct`→`{"name","fields"}`, `Array`→`[…]`.
- **Timeline events**: `{ meta, payload: { kind, payload: {…inner…} } }`. Score
  scan reads `kind=="core_player"` → inner `{is_team_0, goals_delta}`. Timing scan
  reads `kind=="player_activity"` → inner `{duration, player, state}` (`state`
  serialized snake_case, e.g. `"demolished"`) and `kind=="depth_role"` →
  `{duration, player, state}` (`"most_back"` / `"most_forward"`).
- **Frames**: `{ frame_number, time, seconds_remaining, players: [{player_id,…}] }`.
- **Accumulation tracks**: `{ player_id, is_team_0, quantity, points: [{frame,value}] }`.

### Endpoint

`crates/rocket-sense-server/src/api/replays.rs`:

- Route `POST /replays/{replay_id}/reprocess/client`, handler
  `reprocess_replay_client`.
- Request `{ subtr_actor_git_sha: String, scaffold: serde_json::Value }`,
  response `{ replay_id, analysis_run_id, status }`.
- **Auth**: load `uploaded_by_user_id` + `file_sha256`; `is_owner = uploaded_by
  == auth_user.id`; otherwise require admin via `resolve_is_admin`, else 403.
- **Version gate**: if `option_env!("SUBTR_ACTOR_GIT_SHA")` is `Some` and differs
  from the client's sha → **409** "stale client: refresh the page". Skipped on dev
  builds where the server sha is unknown.
- Processes **inline** (awaits `process_client_scaffold`) and returns the result
  synchronously — unlike the queued server reprocess, the new analysis is live as
  soon as the response returns.
- OpenAPI path + schemas registered in `api/openapi.rs`.

### Migration

`migrations/0048_analysis_run_client_provenance.sql` adds to `analysis_runs`:

- `source text NOT NULL DEFAULT 'server'` (client runs set `'client_wasm'`)
- `submitted_by_user_id uuid REFERENCES users(id)` (nullable)
- `client_subtr_actor_git_sha text` (nullable)

The codebase uses runtime `sqlx::query(...)` (no `query!` macros, no `.sqlx`
offline cache), so the new columns need no codegen.

## Web implementation

- `web/vite.config.ts` — reads `web/vendor/@rlrml/.subtr-actor-rev` at config time
  and injects it as the global `__SUBTR_ACTOR_REV__` via Vite `define`. This bakes
  the *built-against* sha into the bundle (declared in `web/src/globals.d.ts`).
- `web/src/stats/replayModel.ts` — `computeStatsTimelineScaffoldJson(replayId)`:
  init the standalone `@rlrml/subtr-actor` WASM (default `initSubtrActor()`,
  memoized — it is a separate module from the one `@rlrml/viewer` drives for
  playback) → fetch `/replays/{id}/file` → `get_stats_timeline_json` → return the
  raw JSON **text** (not parsed, to avoid re-stringifying megabytes). Note
  `@rlrml/subtr-actor` is a transitive dep of `@rlrml/viewer`, hoisted into
  `web/node_modules/@rlrml/`, so it imports directly.
- `web/src/api.ts` — `reprocessReplayClient(replayId, { subtrActorGitSha,
  scaffoldJson })`. Builds the body by string concatenation so the multi-MB
  scaffold text is spliced in without a parse/serialize round-trip.
- `web/src/App.tsx` — a "Reprocess locally" button next to the existing Reprocess
  button, shown under the same `canReprocess` (owner-or-admin) condition. Runs the
  WASM, uploads, and surfaces progress/result through the existing result chip.

## Trust model

The server cannot verify a client-submitted analysis without re-running
`subtr-actor`, which would defeat the entire purpose. So a malicious owner could
upload fabricated stats — **for a replay they already own**. Owner-or-admin
gating bounds the blast radius to replays the user already controls, which is
acceptable. Mitigations in place:

- Provenance is recorded on every client run (`source='client_wasm'`, the
  submitting user, the claimed `subtr-actor` sha) so client runs are
  distinguishable and auditable.
- The **version gate** ensures a client run is only accepted when its WASM was
  built from the same `subtr-actor` revision the server runs. Because the web
  bundle and the server are deployed from the same checkout (the
  `.subtr-actor-rev` guard test enforces agreement), this normally always passes
  — it exists to reject a stale cached browser tab whose WASM predates a server
  bump.

## Verification status

- `cargo check -p rocket-sense-server` — clean.
- `tsc -b` (web typecheck) — clean.
- `vendor/subtr-actor` submodule — untouched (zero changes), by design.
- **Not yet run end-to-end** against a live DB + a real replay. The natural next
  step is to drive a reprocess through and confirm the persisted output (event
  stream, `play_events`, boost tracks, search metadata) matches a server-side run
  of the same replay.

## Caveats / future work

- **Upload size**: the scaffold is sent inline as JSON under the existing global
  64 MiB body limit (`app.rs`), which comfortably covers the event-only scaffold.
  gzip-on-upload (client compress, server decompress) is an obvious future
  optimization for very long matches.
- **Inline processing**: `process_client_scaffold` runs synchronously in the
  request. The expensive parse already happened in the browser, so the server
  work is DB inserts (fast), but a background-task variant would be more robust
  for pathological inputs.
- **`clean_player_display_name` parity**: the typed version replaces a player's
  name when it equals the Rust `Debug` of the remote id, which can't be replicated
  from JSON. The JSON twin uses the stored name as-is, falling back to the
  platform id only when the name is empty/whitespace.
- **Metadata parity**: full parity was chosen — the JSON twins recompute the same
  analysis-derived search fields (match duration, team scores, per-player
  active/demo/rotation timing) as the server path, so a client reprocess is
  behaviorally identical to a server reprocess.
```

## Files touched

| File | Change |
|------|--------|
| `crates/rocket-sense-server/src/processing.rs` | `persist_analysis_output` extraction; `process_client_scaffold`; `insert_analysis_run_client`; `build_indexed_events_from_events`; all JSON twins + leaf readers |
| `crates/rocket-sense-server/src/api/replays.rs` | `reprocess_replay_client` handler, request/response types, route |
| `crates/rocket-sense-server/src/api/openapi.rs` | OpenAPI registration |
| `migrations/0048_analysis_run_client_provenance.sql` | provenance columns |
| `web/vite.config.ts` | inject `__SUBTR_ACTOR_REV__` |
| `web/src/globals.d.ts` | declare `__SUBTR_ACTOR_REV__` (new) |
| `web/src/stats/replayModel.ts` | `computeStatsTimelineScaffoldJson` |
| `web/src/api.ts` | `reprocessReplayClient` + response type |
| `web/src/App.tsx` | "Reprocess locally" button + handler |
