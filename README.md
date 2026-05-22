# Rocket Sense

Rocket League replay analytics backend.

`rocket-sense` will be the service home for hosting replay files, metadata,
processing state, and replay-derived stats built on top of
[`subtr-actor`](https://github.com/rlrml/subtr-actor).

## Development

```sh
direnv allow
just test
just build
```

The development environment is provided by Nix and fenix. The flake tracks
current `nixos-unstable` and fenix's latest Rust toolchain.
