# justfile for rocket-sense

nix_develop := "nix develop -c"

default:
    @just --list

build:
    {{nix_develop}} cargo build --workspace

test:
    {{nix_develop}} cargo test --workspace

dev:
    {{nix_develop}} cargo run -p rocket-sense-server

watch:
    {{nix_develop}} cargo watch -x "run -p rocket-sense-server"

fmt:
    {{nix_develop}} cargo fmt

fmt-check:
    {{nix_develop}} cargo fmt -- --check

clippy:
    {{nix_develop}} cargo clippy --workspace -- -D warnings
