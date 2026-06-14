# rocket-sense

`rocket-sense` is a Rocket League gameplay analysis backend. It is intended to
host replay files, track metadata and processing status, and expose replay-derived
statistics built with `subtr-actor`.

## Working Notes

- Treat `subtr-actor` as the source of truth for replay parsing and frame/stat
  extraction. Keep replay-domain logic there unless it is clearly service-specific.
- When working on statistics (computing, aggregating, or presenting them), follow
  the principles in [`docs/stats-principles.md`](docs/stats-principles.md). Most
  importantly: segment stats by player count / playlist by default — pooling
  different player counts is the exception, not the baseline. Treat Blue/Orange
  as replay-local team colors: they are fine for a single replay, but aggregate
  or multi-game stats should be oriented around the subject, roster, or field
  relationship (own/opponent) unless the UI explicitly labels the value as
  replay-local color.
- Keep tests in separate files from production code. For Rust unit tests, prefer
  adjacent `*_tests.rs` files included with `#[cfg(test)] #[path = "..."] mod tests;`.
- Use `cargo fmt`, `cargo test`, and `just` recipes for local validation.
- Prefer `rg` for text search.

## Web typography

Font sizes and weights come from the type scale in
[`web/src/design-tokens.css`](web/src/design-tokens.css): `--text-3xs … --text-3xl`
and `--fw-medium/semibold/bold/heavy`. Always write `font-size: var(--text-sm)` /
`font-weight: var(--fw-bold)` — never a raw `12px` / `700`. Pick the nearest
existing step; only add a new token if a genuinely new size is unavoidable. The
small-screen shrink overrides `--bar-text-font-size` once rather than re-declaring
per element. The only deliberate exceptions are SVG-user-unit diagram labels
(e.g. `.pickup-count`) and the tiny clip-canvas overlay, which are commented as
such. This keeps text from drifting between views.

## Web stats bars

Every horizontal bar on the per-replay stats pages (positioning, kickoffs,
movement, boost, ...) should render through the **one** shared track in
[`web/src/stats/shared.tsx`](web/src/stats/shared.tsx). Do not hand-roll a
bespoke `<div>` + inline-`width` bar for a new chart — reuse the component so
height, rounding, segment borders, label color, and value placement stay
identical across pages. The two are intentionally interchangeable:

- **`ComparisonBar`** is the track itself: one fill made of `segments`, scaled by
  `total` (and an optional cross-row `maxValue` for magnitude charts).
- **`ComparisonRows` / `PlayerComparisonChart`** lay out one `ComparisonRow` per
  player. `PlayerComparisonChart` adds its own titled panel; use `ComparisonRows`
  when the page supplies its own `.chart-panel` header (positioning does this).

Conventions baked into the component — follow them rather than adding CSS:

- **Magnitude bar** (one value per player, e.g. distance, speed, count): a single
  segment, set `maxValue` so rows share a scale, and put the value in
  `valueInBar`. It floats at the fill's end (white inside a nearly-full bar, dark
  in the empty track otherwise). Tint with `team-segment-${color} player-shade-N`
  so teammates get distinct shades of their team hue.
- **Distribution bar** (parts of a whole, e.g. field thirds, speed bands): tone-
  classed segments via `outcomeSegmentClassName(tone, level)` plus an
  `outcomeDistributionColorStyle(colors)` `style`; segment labels show on-bar via
  `visibleLabel` past a share threshold.
- **Value column vs on-bar value:** set `valueLabel` for a right-hand column;
  omit it on every row and the column is dropped automatically (no per-page CSS).
  Don't reintroduce a chart-specific class to toggle the column.
- **Label text color is centralized**: the `outcome-dist-level-*` classes drive
  light-fill levels (narrow/unknown/neutral) to dark text in a single
  track-agnostic rule in `styles.css`. Edit that one rule to restyle labels
  app-wide; don't re-scope it per track.

If a new chart needs something the component can't express, extend the shared
component (a new optional prop / row field) rather than forking it — keeping a
single flexible bar is the point.

## Before committing (avoid CI failures)

CI fails on format/lint/compile issues far more often than on test logic. To
catch those locally without running the whole suite:

- **Always run `just check` clean before committing.** It is the fast gate that
  mirrors CI's blocking checks: migration-version uniqueness
  (`check-migration-versions.sh`), `npm run typecheck` (web), `cargo fmt --
  --check`, and `cargo clippy --workspace -- -D warnings`. If it is not clean, do
  not commit.
- Clippy runs with `-D warnings` over the whole workspace, so a lint in a test
  or any crate fails CI even though a plain `cargo build` passes. Prefer the
  `just clippy` / `just fmt-check` recipes over bare `cargo` — they use CI's
  exact flags. The server crate embeds `web/dist` via `build.rs`, so `clippy`
  (and `check`) build the web bundle first; that's expected.
- `just check` deliberately omits the slow CI jobs (`cargo test --workspace`,
  the release/image build). Run tests targeted at what you changed
  (`cargo test some_test`) or `just test` for the full suite when the change
  warrants it.
- When you add a migration, take the next free number and re-run `just check`
  (or `scripts/check-migration-versions.sh`): parallel branches often grab the
  same number, which the guard catches before it silently breaks a deploy.

## Common Commands

- `direnv allow` - load the Nix development shell.
- `just check` - fast CI preflight gate (migrations + web typecheck + fmt + clippy); run clean before every commit.
- `just build` - build the service.
- `just test` - run tests.
- `just fmt` - format Rust code.
- `just clippy` - run clippy with warnings as errors.
- `just dev` - run the binary locally.
