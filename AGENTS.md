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
  different player counts is the exception, not the baseline.
- Keep tests in separate files from production code. For Rust unit tests, prefer
  adjacent `*_tests.rs` files included with `#[cfg(test)] #[path = "..."] mod tests;`.
- Use `cargo fmt`, `cargo test`, and `just` recipes for local validation.
- Prefer `rg` for text search.

## Common Commands

- `direnv allow` - load the Nix development shell.
- `just build` - build the service.
- `just test` - run tests.
- `just fmt` - format Rust code.
- `just clippy` - run clippy with warnings as errors.
- `just dev` - run the binary locally.
