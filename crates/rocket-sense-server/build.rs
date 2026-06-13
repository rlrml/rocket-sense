use std::{
    env,
    fs::{self, File},
    io::{self, Write},
    path::{Path, PathBuf},
    process::Command,
};

fn main() -> io::Result<()> {
    let manifest_dir = PathBuf::from(env::var("CARGO_MANIFEST_DIR").expect("CARGO_MANIFEST_DIR"));
    let repo_root = manifest_dir
        .parent()
        .and_then(Path::parent)
        .expect("server crate lives under <repo>/crates/rocket-sense-server");
    emit_build_metadata(repo_root)?;

    let static_root = manifest_dir.join("static/subtr-actor");
    println!("cargo:rerun-if-changed={}", static_root.display());

    let out_dir = PathBuf::from(env::var("OUT_DIR").expect("OUT_DIR"));
    let mut output = File::create(out_dir.join("subtr_actor_static_assets.rs"))?;

    write_asset_function(
        &mut output,
        "subtr_actor_static_asset",
        &static_root.join("assets"),
    )?;
    write_asset_function(
        &mut output,
        "subtr_actor_stats_static_asset",
        &static_root.join("stats/assets"),
    )?;
    write_asset_function(
        &mut output,
        "subtr_actor_review_static_asset",
        &static_root.join("review/assets"),
    )?;
    write_asset_function(
        &mut output,
        "subtr_actor_model_static_asset",
        &static_root.join("models"),
    )?;
    write_asset_function(
        &mut output,
        "subtr_actor_draco_static_asset",
        &static_root.join("draco"),
    )?;

    let web_dist_root = env::var_os("ROCKET_SENSE_WEB_DIST")
        .map(PathBuf::from)
        .unwrap_or_else(|| repo_root.join("web/dist"));
    println!("cargo:rerun-if-env-changed=ROCKET_SENSE_WEB_DIST");
    println!("cargo:rerun-if-changed={}", web_dist_root.display());
    let mut web_output = File::create(out_dir.join("web_static_assets.rs"))?;
    write_asset_function(&mut web_output, "web_static_asset", &web_dist_root)?;

    Ok(())
}

fn emit_build_metadata(repo_root: &Path) -> io::Result<()> {
    println!("cargo:rerun-if-env-changed=ROCKET_SENSE_GIT_SHA");
    println!("cargo:rerun-if-env-changed=SUBTR_ACTOR_GIT_SHA");
    println!("cargo:rerun-if-env-changed=SUBTR_ACTOR_VERSION");
    println!(
        "cargo:rerun-if-changed={}",
        repo_root.join(".git/HEAD").display()
    );
    println!(
        "cargo:rerun-if-changed={}",
        repo_root.join("vendor/subtr-actor/.git/HEAD").display()
    );
    println!(
        "cargo:rerun-if-changed={}",
        repo_root.join("vendor/subtr-actor/Cargo.toml").display()
    );

    if let Some(value) = env::var("ROCKET_SENSE_GIT_SHA")
        .ok()
        .and_then(meaningful_sha)
        .or_else(|| git_rev_parse(repo_root))
    {
        println!("cargo:rustc-env=GIT_SHA={value}");
    }

    let subtr_actor_root = repo_root.join("vendor/subtr-actor");
    if let Some(value) = env::var("SUBTR_ACTOR_GIT_SHA")
        .ok()
        .and_then(meaningful_sha)
        .or_else(|| git_rev_parse(&subtr_actor_root))
    {
        println!("cargo:rustc-env=SUBTR_ACTOR_GIT_SHA={value}");
    }

    let subtr_actor_version = match env::var("SUBTR_ACTOR_VERSION")
        .ok()
        .filter(|value| !value.trim().is_empty())
    {
        Some(value) => Some(value),
        None => workspace_package_version(&subtr_actor_root.join("Cargo.toml"))?,
    };
    if let Some(value) = subtr_actor_version {
        println!("cargo:rustc-env=SUBTR_ACTOR_VERSION={value}");
    }

    Ok(())
}

/// A build-provided sha is meaningful only when it is non-empty and not the
/// `"unknown"` sentinel `flake.nix` falls back to for non-git builds. Baking the
/// sentinel as `GIT_SHA`/`SUBTR_ACTOR_GIT_SHA` would defeat the
/// `option_env!(...) -> Option<&str>` semantics downstream: the API would report
/// `"unknown"` instead of `null`, and the web UI would render it as a real sha —
/// a broken GitHub commit link (`/commit/unknown`). Treat it as "not recorded"
/// so we fall back to `git rev-parse` or emit nothing at all.
fn meaningful_sha(value: String) -> Option<String> {
    let trimmed = value.trim();
    if trimmed.is_empty() || trimmed.eq_ignore_ascii_case("unknown") {
        None
    } else {
        Some(trimmed.to_owned())
    }
}

fn git_rev_parse(repo_root: &Path) -> Option<String> {
    let output = Command::new("git")
        .arg("-C")
        .arg(repo_root)
        .arg("rev-parse")
        .arg("HEAD")
        .output()
        .ok()?;
    if !output.status.success() {
        return None;
    }
    let value = String::from_utf8(output.stdout).ok()?;
    let value = value.trim();
    (!value.is_empty()).then(|| value.to_owned())
}

fn workspace_package_version(path: &Path) -> io::Result<Option<String>> {
    let contents = fs::read_to_string(path)?;
    let mut in_workspace_package = false;
    for line in contents.lines() {
        let trimmed = line.trim();
        if trimmed.starts_with('[') && trimmed.ends_with(']') {
            in_workspace_package = trimmed == "[workspace.package]";
            continue;
        }
        if in_workspace_package && trimmed.starts_with("version") {
            let Some((_, value)) = trimmed.split_once('=') else {
                continue;
            };
            let value = value.trim().trim_matches('"');
            if !value.is_empty() {
                return Ok(Some(value.to_owned()));
            }
        }
    }
    Ok(None)
}

fn write_asset_function(output: &mut File, name: &str, asset_dir: &Path) -> io::Result<()> {
    let mut assets = Vec::new();
    if asset_dir.exists() {
        collect_assets(asset_dir, asset_dir, &mut assets)?;
    }
    assets.sort();

    if assets.is_empty() {
        writeln!(
            output,
            "fn {name}(_path: &str) -> Option<StaticAsset> {{\n    None\n}}\n"
        )?;
        return Ok(());
    }

    writeln!(
        output,
        "fn {name}(path: &str) -> Option<StaticAsset> {{\n    match path {{"
    )?;
    for (asset_path, route_path) in assets {
        let content_type = content_type(&asset_path);
        writeln!(
            output,
            "        {route_path:?} => Some(StaticAsset {{ content_type: {content_type:?}, bytes: include_bytes!({:?}) }}),",
            asset_path.display().to_string(),
        )?;
    }
    writeln!(output, "        _ => None,\n    }}\n}}\n")?;

    Ok(())
}

fn collect_assets(
    root: &Path,
    current: &Path,
    assets: &mut Vec<(PathBuf, String)>,
) -> io::Result<()> {
    for entry in fs::read_dir(current)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_dir() {
            collect_assets(root, &path, assets)?;
        } else if path.is_file() {
            let route_path = path
                .strip_prefix(root)
                .expect("asset path should be under root")
                .components()
                .map(|component| component.as_os_str().to_string_lossy())
                .collect::<Vec<_>>()
                .join("/");
            assets.push((path, route_path));
        }
    }
    Ok(())
}

fn content_type(path: &Path) -> &'static str {
    match path.extension().and_then(|value| value.to_str()) {
        Some("css") => "text/css; charset=utf-8",
        Some("html") => "text/html; charset=utf-8",
        Some("ico") => "image/x-icon",
        Some("js") | Some("mjs") => "application/javascript; charset=utf-8",
        Some("json") => "application/json; charset=utf-8",
        Some("png") => "image/png",
        Some("svg") => "image/svg+xml",
        Some("wasm") => "application/wasm",
        _ => "application/octet-stream",
    }
}
