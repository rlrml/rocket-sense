{
  description = "rocket-sense development environment";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    fenix = {
      url = "github:nix-community/fenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      fenix,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        rustToolchain = fenix.packages.${system}.latest.toolchain;
        rustPlatform = pkgs.makeRustPlatform {
          cargo = rustToolchain;
          rustc = rustToolchain;
        };
        nativeBuildInputs = [
          pkgs.pkg-config
        ];
        buildInputs = [
          pkgs.openssl
        ];
        shellPackages =
          [
            rustToolchain
            fenix.packages.${system}.latest.rust-analyzer
            pkgs.cargo-watch
            pkgs.curl
            pkgs.just
          ]
          ++ nativeBuildInputs
          ++ buildInputs;
      in
      {
        packages.default = rustPlatform.buildRustPackage {
          pname = "rocket-sense";
          version = "0.1.0";
          src = ./.;
          cargoLock = {
            lockFile = ./Cargo.lock;
            outputHashes = {
              "subtr-actor-0.6.6" = "sha256-nxUZ3vf4yJ7OdDIf/VAtgh8a7rH3hxn7u4c+QQ3iIG0=";
            };
          };
          inherit nativeBuildInputs buildInputs;
        };

        devShells.default = pkgs.mkShell {
          packages = shellPackages;

          shellHook = ''
            export REPO_ROOT=$(git rev-parse --show-toplevel)
            export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath buildInputs}:${pkgs.stdenv.cc.cc.lib.outPath}/lib:''${LD_LIBRARY_PATH:-}"
          '';
        };
      }
    );
}
