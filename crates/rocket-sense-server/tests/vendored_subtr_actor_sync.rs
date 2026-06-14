//! Guards against bumping the vendored subtr-actor submodule without re-running
//! scripts/sync-subtr-actor. The build artifacts derived from the submodule rev
//! (the web app's @rlrml npm packages, the static player assets) are generated
//! at build time, not committed — but their pinned rev is recorded in three
//! committed places (flake.lock and the two .subtr-actor-rev markers). A gitlink
//! bump that skips the sync would leave those pins stale and silently build/ship
//! the wrong wasm — exactly the class of bug this prevents.

use std::{
    path::{Path, PathBuf},
    process::Command,
};

fn repo_root() -> PathBuf {
    let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    manifest_dir
        .parent()
        .and_then(Path::parent)
        .expect("server crate lives under <repo>/crates/rocket-sense-server")
        .to_path_buf()
}

/// The committed/staged submodule gitlink (`git rev-parse :vendor/subtr-actor`).
/// Deliberately the *index* rev, not the submodule working tree: hacking on a
/// dirty submodule must not fail tests, but staging or committing a bump
/// without re-syncing must.
fn index_gitlink_rev(repo_root: &Path) -> Option<String> {
    let output = Command::new("git")
        .arg("-C")
        .arg(repo_root)
        .args(["rev-parse", ":vendor/subtr-actor"])
        .output()
        .ok()?;
    if !output.status.success() {
        return None;
    }
    let rev = String::from_utf8(output.stdout).ok()?;
    let rev = rev.trim();
    (!rev.is_empty()).then(|| rev.to_owned())
}

fn read_rev_marker(path: &Path) -> String {
    let contents = std::fs::read_to_string(path).unwrap_or_else(|err| {
        panic!(
            "missing rev marker {} ({err}); run scripts/sync-subtr-actor",
            path.display()
        )
    });
    contents.trim().to_owned()
}

#[test]
fn vendored_artifacts_match_submodule_gitlink() {
    let repo_root = repo_root();
    // Tolerate non-git contexts (e.g. the nix sandbox builds from a snapshot
    // with no .git), mirroring build.rs's tolerant metadata handling.
    if !repo_root.join(".git").exists() {
        return;
    }
    let Some(expected_rev) = index_gitlink_rev(&repo_root) else {
        return;
    };

    let markers = [
        repo_root.join("web/vendor/@rlrml/.subtr-actor-rev"),
        repo_root.join("crates/rocket-sense-server/static/subtr-actor/.subtr-actor-rev"),
    ];
    for marker in &markers {
        let actual = read_rev_marker(marker);
        assert_eq!(
            actual,
            expected_rev,
            "{} records subtr-actor rev {actual} but the staged submodule \
             gitlink is {expected_rev}; run scripts/sync-subtr-actor",
            marker.display()
        );
    }

    let flake_lock: serde_json::Value = serde_json::from_str(
        &std::fs::read_to_string(repo_root.join("flake.lock")).expect("read flake.lock"),
    )
    .expect("parse flake.lock");
    let locked_rev = flake_lock["nodes"]["subtr-actor-src"]["locked"]["rev"]
        .as_str()
        .expect("flake.lock should pin nodes.subtr-actor-src.locked.rev");
    assert_eq!(
        locked_rev, expected_rev,
        "flake.lock pins subtr-actor-src at {locked_rev} but the staged submodule \
         gitlink is {expected_rev}; run scripts/sync-subtr-actor"
    );
}

#[test]
fn web_app_uses_vendored_rlrml_packages() {
    let repo_root = repo_root();
    let package_json: serde_json::Value = serde_json::from_str(
        &std::fs::read_to_string(repo_root.join("web/package.json"))
            .expect("read web/package.json"),
    )
    .expect("parse web/package.json");
    let dependencies = package_json["dependencies"]
        .as_object()
        .expect("web/package.json should have dependencies");
    for (name, spec) in dependencies {
        if !name.starts_with("@rlrml/") {
            continue;
        }
        let spec = spec.as_str().unwrap_or_default();
        assert!(
            spec.starts_with("file:vendor/"),
            "web dependency {name} resolves to {spec:?}; it must be a \
             `file:vendor/...` dep so the wasm/JS is built from the vendored \
             submodule, never a stale registry tarball"
        );
    }
}
