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
movement, boost, ...) should render through the **one** shared stat bar track in
[`web/src/stats/shared.tsx`](web/src/stats/shared.tsx). Do not hand-roll a
bespoke `<div>` + inline-`width` bar for a new chart — reuse the component so
height, rounding, segment borders, label color, and value placement stay
identical across pages. The two are intentionally interchangeable:

- **Stat bar track / `ComparisonBar`** is the fundamental bar primitive: one fill
  made of `segments`, scaled by `total` (and an optional cross-row `maxValue` for
  magnitude charts).
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

## Web career stats subviews

Use **career stats subviews** as the consistent name for the subsection pages
under the career stats profile experience. Keep their look, interaction model,
and chart behavior aligned with the established stats pages; look at nearby
views before adding new visual patterns.

Career stats aggregate across multiple games, so do not assume replay-local
team zero / team one, Blue / Orange, or left / right team identity means the
same thing across rows. Orient comparisons around the profile subject and the
relationship to that subject: player, teammates, opponents, and eventually
rank-peer averages. Keep the color assignment for those comparison groups fixed
and centrally defined so the same relationship uses the same color in every
career stats subview. The rank-peer average comparison is still provisional, so
build it behind a centralized enable/disable path when it is introduced.

Prefer the shared stat bar track for career stats charts as much as possible.
Exceptions should be explicit in the request or product note: if a career stats
subview needs a table, scatter plot, timeline, or another visualization, call
that out directly rather than drifting away from bars by default.

In career stats subviews, a bar-chart card should focus on **one statistic**.
The rows/bars inside that card are for comparing the profile subject against
the relevant cohorts (player, teammates, opponents, and any enabled rank-peer
average), not for listing unrelated stats in the same card. A single-stat card
may still have a segmented bar when that one statistic is itself a distribution
(for example, speed bands or aerial type mix), but do not use one card as a
leaderboard-style list of many different metrics. If a view currently has many
metrics, render multiple single-stat cards.

Avoid double card framing. If the whole subview already sits in one containing
card/surface, render the individual bar charts as unframed sections inside that
surface. If the page does not have a page-level containing card, single-stat
bar-chart cards are fine. Do not wrap every chart in both its own card and a
second all-charts card unless there is a specific layout reason.

Use centrally defined palettes for career stats charts. Most charts should use
monochrome ramps: same hue, different lightness, enough contrast for adjacent
segments. Use multi-hue palettes only when there are many categories that need
strong differentiation. Do not encode aggregate career stats with replay-local
team colors unless the UI explicitly labels those colors as replay-local.

Rates should usually be normalized as **per 5 minutes**. Boost is the common
exception where **per minute** values can be appropriate. Be careful with
teammate and opponent rates: their denominator is not always the profile
player's elapsed replay time because a single game can include multiple
teammates and multiple opponents. Put denominator calculation in shared,
centralized code that sums the relevant replay time for each entity type
correctly instead of recomputing it per subview.

Keep career stats fast by relying on per-replay facts for most statistics. Many
facts are already computed automatically, but add new per-replay fact extraction
when a stat would otherwise require expensive replay-wide recomputation at view
time.

Every bar and bar segment should show numerical text whenever there is enough
room. Keep alignment, placement, threshold behavior, and text color consistent
through the shared stat bar track rather than per-subview CSS.

Do not hide an expected chart just because its current values are zero. A
subview should keep its full chart set visible, with zero-value rows/labels or
an in-chart empty state, so the page layout and available statistics remain
predictable across players and replay sets.

## Before committing (avoid CI failures)

CI fails on format/lint/compile issues far more often than on test logic. To
catch those locally without running the whole suite:

- **Always run `just check` clean before committing.** It is the fast gate that
  mirrors CI's blocking checks: migration-version uniqueness
  (`check-migration-versions.sh`), `npm run typecheck` (web), `just fmt-check`,
  and `just clippy`. If it is not clean, do not commit.
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

## Deploying (railbird-sf)

There is **no CD** — deploys are manual and ship whatever image you build, so
**land the change on `master` first**, then deploy from an up-to-date checkout (a
worktree is fine). See [`infra/README.md`](infra/README.md) for the one-time
`.kube/railbird-sf.yaml` kubeconfig setup; the build host's registry
(`railbird-sf:5279`) must be reachable.

The one-shot recipe builds the image with Nix, pushes it to the registry, applies
the agenix-backed Secret, and runs `tofu apply`:

```sh
export KUBECONFIG="$PWD/.kube/railbird-sf.yaml"
just deploy-railbird-sf
```

**Gotcha — `tofu apply` alone usually does not roll the pods.** The Deployments
pin the *mutable* `…/rocket-sense-server:dev` tag
([`infra/terraform/variables.tf`](infra/terraform/variables.tf)), so when only
code changed Terraform sees no diff and leaves the running pods on the old image.
Force the freshly-pushed image out with a rollout restart — the server and the
replay worker share the image, so restart both:

```sh
kubectl -n rocket-sense rollout restart deployment/rocket-sense deployment/rocket-sense-worker
kubectl -n rocket-sense rollout status  deployment/rocket-sense
```

After deploying:

- **Disk gotcha:** if the build/node host hits `no space left`, the Nix store on
  `/var` is the usual culprit — `nix-collect-garbage -d` and retry. (A
  disk-usage watchdog also runs in-cluster.)
- **Smoke-test prod**, not just the UI. Re-curl the key stat read endpoints,
  including the materialized aggregate reads (`?materialized=true`): that path is
  on for all aggregate/possession/positioning/boost endpoints, and a sibling
  branch that landed on `master` can break one you didn't touch.
- The app is public via DuckDNS → host nginx → NodePort `30080`. App health and
  the public URL are separate: an outage right after deploy is often a stale
  DuckDNS IP, not the rollout.
