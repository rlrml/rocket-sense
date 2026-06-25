# Rank-median benchmark cohort for lifetime stats

> Status: **WIP design doc.** Captures the agreed design; code lands in follow-up work.

## Overview

The lifetime stats view shows, for each stat, a bar for the player plus bars for their
**teammates** and **opponents** — cohorts derived from the player's own games (added in
`a1c93aae` "Show opponent cohorts in lifetime stats" / `26bbdd03` "Add lifetime stats win loss
split").

This adds a **fourth bar: "Rank median"** — a benchmark of *all players at a given rank tier*, in
the relevant game mode. Unlike teammates/opponents, it is **not** drawn from the player's own
matches; it's a global reference answering "how do I compare to a typical player at my rank." It
must also work under the win/loss split (a per-outcome benchmark in each section).

## Decisions

- **Rank granularity:** tier only (`replay_players.rank_tier`).
- **Default rank shown:** the viewed player's representative tier = **modal `rank_tier` over their
  last ~20 ranked replays in the relevant playlist group**.
- **Manual override:** the user can also pick **any other tier** to display (the materialized table
  holds every tier).
- **Methodology — median of per-player rates:** for each qualifying player at the tier, compute
  their own per-active-minute rate = `sum(events) * 60 / sum(active_seconds)`; the benchmark is the
  **median across players** ("the typical player at your rank"). Robust to smurf/one-game outliers
  and to minute-weighting by grinders (which a naive pooled `sum/sum` average suffers from).
- **Time window — configurable strategy:** both a **rolling-window mode** and a **season mode**,
  selected by config and overridable per request (see below). Default: rolling 6 months.
- **Win/loss:** split with outcome — Wins section vs other players' wins at that tier, Losses vs
  their losses; combined when not split.
- **Compute:** a **materialized table**, precomputed and **refreshed periodically** by a recurring
  background job, behind a feature flag.

### Reuse note
`web/src/styles.css` (~4268-4279, 4541-4556) already ships a styled `.career-cohort-rank-peers`
class (slate `#64748b`) and its segment-fill variants. Use cohort key **`rank-peers`** so the
styling lights up with no new CSS.

## Time-window strategy (configurable)

A `BenchmarkWindow` strategy abstracts how the population is bounded. Each concrete window has a
stable `window_key` string used in the table grain, config, and the read/override.

- **Rolling mode** — `Rolling { months }` → `replay_date >= now() - (months || ' months')::interval`.
  `window_key = "rolling-6m"`. Simple, always a healthy sample, drifts as the window slides.
- **Season mode** — `Season { selector }`:
  - `Current` → the season containing the most recent replays, with a **min-sample fallback** to the
    most recent prior season while the new one is thin. `window_key = "season:current"` (resolves to
    a concrete season at refresh and records it).
  - `Code(String)` → a specific season (`window_key = "season:f17"`).
  - Seasons are ordered by their **`replay_date` range**, not by the text code (`"f17"` doesn't sort
    reliably).

Config (settings.rs / env):

- `ROCKET_SENSE_RANK_BENCHMARK_WINDOWS` — list of windows to materialize (default `["rolling-6m"]`;
  e.g. `["rolling-6m","season:current"]` to offer both).
- `ROCKET_SENSE_RANK_BENCHMARK_DEFAULT_WINDOW` — which the read serves when there's no override
  (default `"rolling-6m"`).

The refresh job materializes **every configured window**; the read serves the default and accepts a
`rank-benchmark-window=<key>` override. Rolling-vs-season becomes a config/runtime choice, not a
rebuild.

## Methodology details (drive the schema)

- **Per-player aggregation, then median.** Inner query groups by player → each player's rate; outer
  takes `percentile_cont(0.5) WITHIN GROUP (ORDER BY rate)`.
- **Zero-fill matters.** A qualifying player who never performs event X has rate 0 for X and **must
  be included** in X's median (excluding them biases it upward). The per-player set is
  `(qualifying players at tier) × (event_types)` left-joined to counts, 0-filled.
- **Per-player min-games threshold** (`MIN_PLAYER_GAMES`, e.g. 5) so single-game/smurf rates don't
  pollute the median.
- **Medians are NOT additive**, with two consequences: `outcome` is stored explicitly as
  **`{all, win, loss}`** (`all` computed directly, not reconstructed from win+loss), and the table
  stores the **median scalar per cell** rather than sums.

## Backend

### 1. Migration — `migrations/0068_rank_benchmark.sql`

- `rank_benchmark_stats`: grain `(window_key, playlist_group_key, rank_tier, outcome, event_type_id)`
  → `median_per_active_minute`, `median_per_non_demo_active_minute`.
- `rank_benchmark_population`: grain `(window_key, playlist_group_key, rank_tier, outcome)`
  → `distinct_player_count`, `replay_count`. `distinct_player_count` is the sample-adequacy gate and
  feeds the tier picker.
- `rank_benchmark_meta`: per `window_key` → resolved bounds (interval / season range), `computed_at`,
  display label (for "last 6 months" / "Season X" and staleness checks).
- `outcome ∈ {all, win, loss}`. Index `(window_key, playlist_group_key, rank_tier, outcome)` on both.
- After adding the migration, **`touch crates/rocket-sense-db/src/lib.rs`** to defeat the
  `sqlx::migrate!` stale compile-time embed.

### 2. Refresh job — `crates/rocket-sense-server/src/processing.rs`

Mirror the existing recurring sweeper **`start_event_stream_gc_sweeper`** (`processing.rs:3279`,
`tokio::spawn` + interval loop, registered in `app.rs` build ~63 and `run_worker()` ~103). This is
the right pattern for a single pooled full-recompute — not per-replay durable work, so it does not
use the apalis queue.

- `start_rank_benchmark_refresh_job(pool)` — initial delay + loop every ~12-24h (gated on the flag).
- `refresh_rank_benchmark(pool)` — for **each configured window**, resolve its date/season predicate,
  then **TRUNCATE + INSERT** that window's rows in one transaction. Core query per window:
  - per-(replay, player) appearance CTE: tier, active time, run id, `playlist_group_key` (reuse
    `push_playlist_group_key_expression`), per-player `outcome` (same team-score comparison as
    `append_player_replay_outcome_filter`, `replay_set.rs` ~426-468; ties / NULL scores excluded),
    filtered `canonical_analysis_run_id IS NOT NULL`, `rank_tier NOT NULL`, and the window predicate.
  - per-player rates (join `player_replay_event_counts`, migration 0056), 0-filled across event
    types, `HAVING games >= MIN_PLAYER_GAMES`.
  - `percentile_cont(0.5)` per `(group, tier, outcome, event_type)`; emit `all` rows directly; write
    `rank_benchmark_meta`.
- Manual admin trigger: `POST /admin/stats/refresh-rank-benchmarks` (spawn the same fn; pattern of
  `backfill_boost`, `admin.rs` ~722 / router ~58) for on-demand rebuilds.

### 3. Tier/window resolution + read path — `crates/rocket-sense-server/src/api/stats.rs`

- `load_player_rank_tier(pool, player, group, window) -> Option<i32>`: modal `rank_tier` over the
  player's last ~20 ranked replays in that group within the window; `None` → no default tier (a
  manual override can still apply).
- In `load_stat_aggregates_base` (~1421), beside the teammate/opponent futures, gated on
  `rank_benchmark_enabled` **and a single resolved `playlist_group_key`** (set per-group ~1652; the
  all-playlists top view has no single tier → skip):
  - Window = `rank-benchmark-window` param if present, else the configured default.
  - Tier = `rank-benchmark-tier` param if present, else the derived player tier.
  - Outcome from `filters.replay_set.player_outcome` (`Win` / `Loss` / `None` → `all`). The frontend
    fetches win and loss as **separate** calls, so the endpoint returns one outcome per call.
  - Look up `rank_benchmark_stats` for `(window, group, tier, outcome, event_type)`; attach per-stat
    at the `rows.into_iter().map(...)` (~1544).

New `Option` response fields (default `None`, so existing fixtures / the non-materialized path are
unaffected):

- `StatAggregateResponse` (~148): `rank_benchmark_per_active_minute`,
  `rank_benchmark_per_non_demo_active_minute`.
- `StatAggregateSetResponse` (~62) + `StatAggregateGroupResponse` (~117): `rank_benchmark_tier`
  (served tier + label), `rank_benchmark_is_player_default`, `rank_benchmark_distinct_player_count`,
  `rank_benchmark_window` (served key + label), plus the picker lists
  `rank_benchmark_available_tiers` (`{tier, label, distinct_player_count}`) and
  `rank_benchmark_available_windows` (`{key, label}`) so the UI builds both pickers without an extra
  request.

### 4. Manual selection params

- `rank-benchmark-tier=<int>` and `rank-benchmark-window=<key>` parsed into `StatAggregateFilters`
  (~360, default `None`). When set they override; the response echoes the served tier/window +
  `is_player_default`.
- Extension (not first cut): multiple tiers/windows at once → multiple rank bars. The table already
  holds all of them, so this is purely an API/UI follow-up.

### 5. Feature flag — `ROCKET_SENSE_RANK_BENCHMARK`

Wire like `materialized_stat_counts`: `settings.rs` (~120/173) → `app.rs` (~23/51) →
`StatAggregateFilters` (~360, default `false` in `from_query` ~476) → handler (~554). Gate refresh-job
registration on it too. Default `false` until the first refresh has run.

### 6. Extension to other lifetime panels (after the main `aggregates` cut)

The one stats table covers every per-active-minute stat the aggregates panel renders. Panels with a
different source each need a sibling median rollup at the same `(window, group, tier, outcome)` grain:
`rank_benchmark_boost` (from `player_replay_boost`), and equivalents for possession / movement /
positioning. Scoring rates and goal-tags in `player_overview.rs` can read `rank_benchmark_stats`
directly. First-man stint histograms are histogram-shaped (defer). Factor the
window/group/outcome/per-player-median CTE into a shared fragment.

## Frontend

Model `rank-peers` as a **full 4th cohort** (a real bar/row, for parity with teammates/opponents),
except the scoring-rate panel which renders cohorts as markers (rank gets a marker there too). All
new response fields are **optional** (`field?: number | null`); an undeployed / flagged-off backend
omits them → `undefined != null` is false → the row is simply skipped (graceful absence, no extra
guard).

### 1. Foundation — `web/src/stats/shared.tsx`

- `CareerCohortKey` (~244): add `| "rank-peers"`.
- `careerCohortKey()` (~246): recognize `rank` / `rank-peers` / `cohort-rank-peers` → `"rank-peers"`.
- `careerCohortLabel()` (~256): optional 3rd param `tierLabel?` →
  `` `Rank median${tier ? ` (${tier})` : ""}` `` (existing 2-arg callers unaffected). Subtitle (~262)
  → `"Rank median"`; `careerCohortClassName` already yields `career-cohort-rank-peers` (pre-staged CSS).

### 2. Types — `web/src/types.ts`

Optional `rank_benchmark*` fields mirroring the backend on `StatAggregateResponse`,
`StatAggregateSetResponse` (incl. `rank_benchmark_tier_label`, `rank_benchmark_is_player_default`,
`rank_benchmark_window`, `rank_benchmark_available_tiers`, `rank_benchmark_available_windows`),
`StatAggregateGroupResponse`, `GoalTagAggregateResponse`, `ScoringRateResponse`; and `rank_benchmark?`
cohort objects on `MovementSummaryResponse`, `PlayerBoostTotalsResponse`. `PossessionSummaryResponse`
needs no change — its `cohorts[]` simply gains a `rank-peers` entry.

### 3. Render touch points (mirror every place `a1c93aae` added an opponent row)

- **`playerPanels.tsx`**: `playerRateComparisonRows` (~77); the profile/core chain (`ProfileRateStat`,
  `ScoringRateLike` / `scoringRateOrZero`, `rateCardFromOverview`, `aggregateProfileRateStat`,
  `profileRateComparisonRows`); goal-tag mapping in `GoalTagSharePanel` (reuses profile rows → free);
  `ScoringRatePanel` / `RateComparisonBar` (add a `rank-peers` **marker** + legend).
  `playerRateComparisonRow` / `percentageComparisonRow` are already cohort-generic — one tweak: for
  `rank-peers`, show the tier/window as subtitle and **omit the "N total" count label** (it's a median
  rate, no per-row count).
- **`boost.tsx`**: `boostProfileData` (~388) — add a `rank-peers` entry when `totals.rank_benchmark`.
- **`movement.tsx`**: `PlayerMovementCohorts` (~250) — push a `rank-peers` summary when
  `response.rank_benchmark`.
- **Possession** (`playerPanels.tsx` ~1718): no work — iterates `summary.cohorts` generically.
- **Deferred (only if backend supplies data):** positioning cohort, rotation stint histogram,
  field-position back/forward markers.

### 4. Tier + window pickers (manual selection)

Two small selects near the lifetime-stats header: tiers from `rank_benchmark_available_tiers` (label +
count), windows from `rank_benchmark_available_windows`. Selecting one sets a `rank-benchmark-tier` /
`rank-benchmark-window` URL param (mirror the `player-outcome` plumbing in `App.tsx` ~3816 / 4059-4079)
and re-fetches; defaults = the player's own tier + configured window. Show the served tier + window in
the cohort label/subtitle.

### 5. Win/loss split — no extra work

`App.tsx` (~4388-4416) renders one section per outcome bundle, each calling `renderStatsContent` with
that bundle's own responses, which carry their own per-outcome `rank_benchmark*` values. The tier/window
overrides are shared params, so each win/loss section shows the selected tier+window's benchmark for its
outcome.

## Implementation order

1. Migration + `touch lib.rs`; `BenchmarkWindow` strategy + config; refresh fn + recurring job
   (flag-gated) + manual admin endpoint; flag wiring.
2. Tier/window resolution + read path (overrides + available lists) + response fields; `cargo fmt` +
   **`cargo test`** (fixtures need the new `Option` fields) + clippy.
3. Run the refresh once (admin endpoint) on a real DB; sanity-check medians + per-tier sample counts
   per window.
4. Frontend `types.ts` → `shared.tsx` → `playerPanels.tsx` → `boost.tsx` → `movement.tsx` → pickers.
5. `cd web && npm run typecheck && npm run lint && npm run format:check`.

## Verification

- **Backend:** apply the migration, hit `POST /admin/stats/refresh-rank-benchmarks`, then curl
  `/api/v1/stats/aggregates?player-id=…&include-teammates=true&materialized=true` with
  `player-outcome=win`, `=loss`, and none; also `&rank-benchmark-tier=<other>` and
  `&rank-benchmark-window=<key>`. Confirm `rank_benchmark_*` is populated, the default tier matches the
  player's recent ranked games, the overrides swap tier/window, and the `available_*` lists are present.
  Re-curl every materialized read endpoint after deploy (per the "verify ALL materialized reads" rule —
  master advances from sibling branches).
- **Frontend:** vite proxies `/api` to prod; prod won't yet return the new fields, so use a temporary
  uncommitted `fetch` shim to splice mock `rank_benchmark*` (incl. `available_tiers` /
  `available_windows`) into stats/overview/movement/boost responses. Confirm the slate
  "Rank median (Tier)" bar in aggregates, core profile, scoring rate (marker), goal types, boost,
  movement, possession; the pickers swap tier/window; `split-outcome=true` shows it per section; a
  `null` value hides it everywhere.
- No vitest in `web/`; verification is typecheck/lint + manual UI (Chrome DevTools MCP / `run` skill).

## Risks / gotchas

- **Key on the playlist-group expression**, never raw `replays.playlist`, or the population won't match
  the cohort the read filters.
- **Median needs the explicit `all` outcome** stored directly (not win+loss recombined) and **0-fill**
  across event types, or the medians skew.
- **Season mode** depends on `replays.season` being tagged on recent replays; order seasons by their
  `replay_date` range; apply the min-sample fallback while a new season is thin. Rolling mode has neither
  concern.
- **Per-player min-games + per-tier min-sample** (`MIN_PLAYER_GAMES`, `MIN_SAMPLE`) need sane defaults;
  expose `distinct_player_count` so the UI hides/flags noisy tiers in the picker.
- NULL tier is excluded everywhere; a player with no derived tier → no default bar (manual override still
  works).
- Tier is per-playlist (Diamond 2v2 ≠ Champ 3v3) — never reuse a tier across groups; and per-season in
  season mode.
- **Refresh cost:** per-player grouping + percentile over each window of canonical replay-players ×
  event counts — run on the worker, off-peak; reads are index lookups. More configured windows =
  proportionally more refresh work.
- Run formatters / typecheck / clippy before commit (CI aborts the job on unformatted Rust).
