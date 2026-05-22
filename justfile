# justfile for rocket-sense

nix_develop := "nix develop -c"

default:
    @just --list

build:
    {{nix_develop}} cargo build

test:
    {{nix_develop}} cargo test

dev:
    {{nix_develop}} cargo run

watch:
    {{nix_develop}} cargo watch -x run

fmt:
    {{nix_develop}} cargo fmt

fmt-check:
    {{nix_develop}} cargo fmt -- --check

clippy:
    {{nix_develop}} cargo clippy -- -D warnings
