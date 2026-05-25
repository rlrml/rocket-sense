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
        rustToolchain = fenix.packages.${system}.stable.toolchain;
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
            fenix.packages.${system}.stable.rust-analyzer
            pkgs.cargo-watch
            pkgs.curl
            pkgs.just
            pkgs.kubectl
            pkgs.opentofu
            pkgs.skopeo
          ]
          ++ nativeBuildInputs
          ++ buildInputs;
        rocketSenseServer = rustPlatform.buildRustPackage {
          pname = "rocket-sense-server";
          version = "0.1.0";
          src = ./.;
          cargoBuildFlags = [
            "-p"
            "rocket-sense-server"
          ];
          cargoLock = {
            lockFile = ./Cargo.lock;
            outputHashes = {
              "subtr-actor-0.8.3" = "sha256-CAyY/0zRdpTdlN9y6BE7RBfiq6Pti3sxp2g5YOZi8vc=";
            };
          };
          RUST_MIN_STACK = "33554432";
          inherit nativeBuildInputs buildInputs;
        };
      in
      {
        packages = {
          default = rocketSenseServer;
          rocket-sense-server = rocketSenseServer;
          rocket-sense-server-image = pkgs.dockerTools.buildLayeredImage {
            name = "localhost:5279/rocket-sense-server";
            tag = "dev";
            contents = [
              pkgs.cacert
            ];
            config = {
              Cmd = [
                "${rocketSenseServer}/bin/rocket-sense-server"
              ];
              Env = [
                "SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
                "ROCKET_SENSE_BIND_ADDR=0.0.0.0:8080"
              ];
              ExposedPorts = {
                "8080/tcp" = {};
              };
            };
          };
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
