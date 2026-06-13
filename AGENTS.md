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
