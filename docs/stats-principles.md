# Stats Principles

General principles for how to approach statistics in `rocket-sense` — what to
compute, how to segment it, and how to present it. This is living guidance:
add a principle whenever we learn something that should constrain *every* future
stat, not just the one in front of us. Keep it about the *approach* to stats;
keep query-cost and schema mechanics in the companion docs
([`player-profile-stats-performance.md`](player-profile-stats-performance.md),
[`stats-metadata-indexing.md`](stats-metadata-indexing.md)).

## 1. Segment by player count / playlist by default

**Different player counts are effectively different games.** 1v1, 2v2, and 3v3
have fundamentally different dynamics: rotation, boost economy, positioning,
who-goes-for-what on kickoff, how often a player touches the ball, how much of
the field one player is responsible for. A "shots per minute" or "time in
offensive third" number that pools 1v1 and 3v3 together is not a smaller-sample
version of a real stat — it is a number with no clean interpretation, because
its value depends on the (usually invisible) mix of playlists behind it.

So the default for any stat is: **compute and present it grouped by playlist /
player count.** A blended all-playlists number is the exception, not the
baseline, and when we do show one it should be clearly labeled as a blend and
ideally accompanied by the per-playlist split.

There are genuine exceptions — stats that are roughly playlist-invariant, or
where the question is explicitly "across everything you've played." Treat them
as exceptions: call them out explicitly and justify why pooling is meaningful
for that specific stat. If you can't articulate why pooling is valid, assume it
isn't.

### Two orthogonal dimensions

"Playlist" actually bundles two independent things, and it's worth keeping them
distinct when reasoning about a stat:

1. **Team size / player count** — 1v1 / 2v2 / 3v3 / 4v4. This is the dimension
   that changes the *dynamics* of the game, and it is the one that almost always
   matters. When in doubt, segment by this.
2. **Competitive context** — ranked vs. casual vs. tournament / competitive
   event (and private / offline / LAN). This changes *effort and skill
   distribution* more than core dynamics: casual play is looser, ranked is
   tryhard, tournaments are a different population again. It matters for honest
   baselines and comparisons, less so for the mechanical shape of a stat.

These are orthogonal: "2v2 ranked" and "2v2 casual" share dynamics but differ in
intensity; "2v2 ranked" and "3v3 ranked" share intensity but differ in dynamics.
A good filter UI lets a user pin each dimension independently rather than forcing
them through a single flat playlist list that conflates the two.

### How this maps to the data model

- **Competitive context is stored.** `replays.replay_game_type` is one of
  `ranked` / `casual` / `private` / `offline` / `lan` / `tournament` /
  `unknown` (migration `0025_replay_game_type_metadata.sql`), with supporting
  `header_match_type`, `game_playlist_id`, and `match_type_class` columns.
  "Competitive event" maps to `tournament`. The shared replay-set filter
  exposes it as the `game-type` query param.
- **Player count is derived, not stored.** Team size is computed at query time
  by counting actively-participating `replay_players` per team (see
  `push_replay_team_size_expression` in `api/replay_set.rs` and principle §5),
  and is exposed as the `team-size` query param. The playlist group key
  combines both dimensions into canonical keys like `ranked-2v2` /
  `casual-3v3`, falling back to the raw playlist text when team size cannot be
  derived. If team-size segmentation becomes hot, consider denormalizing a
  `team_size` column at indexing time rather than recomputing the per-team
  subquery on every stats request (mirrors the rollup precedent in
  `player-profile-stats-performance.md`).

### The career page segmentation control

The career / player profile page (`PlayerStatsPage` in `web/src/App.tsx`) has a
**top-level segmentation control parallel to the stats-section navigation**
(Goals / Kickoffs / Positioning / …) with two independent, URL-persisted
selectors — Mode (All / 1v1 / 2v2 / 3v3 / 4v4) and Context (Any / Ranked /
Casual / Tournament). Both feed the shared replay-set filter params, so every
panel on the page (rates, chart, kickoffs, rotation shares, splits) reflects
the same segment. Preserve this property when adding panels: a new panel must
consume the page's search params so it re-segments with the rest of the page.
"All" remains available as an explicit, labeled blend.

## 2. Separate stats by within-event role

When an event has distinct participant roles, the roles' stats are **different
distributions that happen to share an event id** — pooling them produces the
same uninterpretable blend as pooling playlists. The canonical example is
kickoffs: a kickoff *taker*'s stats (approach, first-touch time, outcome) and a
*support* player's stats (cheat/go-for-boost behavior, boost collected,
positioning at resolution) are almost completely unrelated; an "average boost
after kickoff" pooled across both roles describes neither.

Default: condition every per-player event stat on role, and present roles as
separate sections, not as adjacent rows in one pooled table. Team-level
outcomes (the kickoff was won/lost) can be shared context across roles, but
player behavior metrics must be role-scoped.

## 3. Orient replay-local teams before aggregating

Blue and Orange are **replay-local colors**, not durable teams. They are valid
labels for a single replay: scoreboards, replay timelines, kickoff path
diagrams, boost maps, and field-position diagrams can use Blue/Orange because
the viewer is looking at one match with fixed sides.

The moment a view spans multiple games, Blue/Orange stops being a stable
statistical dimension. The same player can be Blue in one replay and Orange in
the next, so an aggregate "Blue possession" or "Blue wins" number may combine
that player's team, their opponent's team, and unrelated roster arrangements.
That produces the same kind of hidden blend as pooling playlists.

Default: normalize multi-game stats to the question being asked:

- On a player page, orient team/field concepts around the subject: own team,
  opponent team, own half, opponent half.
- On a fixed-roster group, use roster-relative labels only when the roster split
  is actually stable across the group.
- If players switch sides, either suppress side-level team aggregates or label
  them explicitly as replay-local color totals.
- Raw storage and parser outputs may keep `team_zero` / `team_one` or
  `team = 0/1`; the API/UI layer is responsible for choosing a scope-safe label.

This is especially important for possession, territory, kickoffs, boost control,
and any chart that compares "Blue" to "Orange" outside a single replay.

## 4. Prefer graded outcomes over binary win/loss

A "just barely" win and a dominant win should not count the same. Wherever an
event has a win/loss outcome, look for a continuous **margin/strength measure**
and carry it alongside (or instead of) the boolean:

- Keep the continuous value (for averages, distributions, weighting).
- Band it for presentation (e.g. narrow / clear / strong) rather than
  collapsing to a single rate.
- A headline "win rate" that ignores margin is acceptable only as a secondary,
  clearly-labeled summary of the graded data.

For kickoffs specifically, strength is measured by how hard the ball is driven
into the opposing half (displacement past a y-threshold, falling back to
y-velocity) — `subtr-actor` already computes this as `win_strength` +
`win_strength_band` (narrow/clear/strong) in
`vendor/subtr-actor/src/stats/calculators/kickoff.rs`, persisted in
`play_event_kickoff_details`; surfacing it in the summary API/UI is the
remaining work. The principle generalizes: 50/50 outcomes, aerial duels,
demos-for-position, etc. should all prefer a margin measure when one is
derivable.

## 5. Event-type segmentation and chirality

Some stats only make sense conditioned on the *type* of the event instance —
e.g. boost used during a kickoff and boost remaining after depend heavily on
the spawn position the player started from. Provide type filters for such
stats rather than pooling across types.

When types come in mirrored left/right pairs (kickoff diagonal-left vs
diagonal-right, mechanics performed to the left vs right), treat chirality
**both ways**:

- Model the type as two orthogonal parameters — the *shape* (e.g. diagonal /
  off-center / back-center) and the *side* (left / right) — rather than a flat
  enum.
- Default presentation collapses side (a "diagonal kickoff" aggregates both
  corners) because the shape carries most of the dynamics.
- Always allow side-specific drilldown, because execution is chiral: most
  players are mechanically stronger on one side (speedflip direction, camera
  settings), and left/right asymmetries are themselves a coachable finding.

Community-standard kickoff spawn names, for reference: the five spawns are the
two **diagonal** (far corner) spawns, the two **off-center** spawns, and
**back-center**. Our `spawn_position` values (`diagonal_left`,
`diagonal_right`, `off_center_left`, `off_center_right`, `center`) decompose
cleanly into shape × side.

## 6. Trust derived gameplay facts over header metadata

Replay header metadata (team size, playlist, match type) describes the lobby,
not necessarily the gameplay — e.g. RLCS/private lobbies can report 3v3 while
the actual series was played 2v2 with a spectating referee on a roster slot.
When a fact can be derived from what actually happened in the replay (players
with nonzero active time, actual touches, actual team counts), derive it, and
use header metadata only as a fallback or cross-check. The team-size
derivation in `api/replay_set.rs` follows this: it counts teamed players with
nonzero recorded active time instead of reading the header `TeamSize`.

## 7. Persist upstream-computed measures; don't re-derive downstream

Before deriving a measure in SQL or the UI, check what `subtr-actor` already
emits — it usually computes the semantically-right quantity (correct epoch,
clamping, edge cases) at extraction time. The cautionary example: kickoff
payloads carry `time_to_ball` (the taker's seconds from movement start to
first touch, countdown excluded), but indexing only persisted the absolute
`first_touch_time` timestamp, so the summary endpoint averaged raw timestamps
— "Avg first touch: 195.92s". If an upstream field is missing from a detail
table, add the column and backfill from `play_event_payloads` rather than
approximating with arithmetic over a subtly different epoch.

---

*Add further principles below as they come up.*
