use std::{
    env,
    fs::{self, File},
    io::{self, Write},
    path::{Path, PathBuf},
};

fn main() -> io::Result<()> {
    let manifest_dir = PathBuf::from(env::var("CARGO_MANIFEST_DIR").expect("CARGO_MANIFEST_DIR"));
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

    Ok(())
}

fn write_asset_function(output: &mut File, name: &str, asset_dir: &Path) -> io::Result<()> {
    let mut assets = Vec::new();
    for entry in fs::read_dir(asset_dir)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_file() {
            assets.push(path);
        }
    }
    assets.sort();

    writeln!(
        output,
        "fn {name}(path: &str) -> Option<StaticAsset> {{\n    match path {{"
    )?;
    for asset in assets {
        let file_name = asset
            .file_name()
            .and_then(|value| value.to_str())
            .expect("asset file name is utf-8");
        let content_type = content_type(&asset);
        writeln!(
            output,
            "        {file_name:?} => Some(StaticAsset {{ content_type: {content_type:?}, bytes: include_bytes!({:?}) }}),",
            asset.display().to_string(),
        )?;
    }
    writeln!(output, "        _ => None,\n    }}\n}}\n")?;

    Ok(())
}

fn content_type(path: &Path) -> &'static str {
    match path.extension().and_then(|value| value.to_str()) {
        Some("css") => "text/css; charset=utf-8",
        Some("html") => "text/html; charset=utf-8",
        Some("js") | Some("mjs") => "application/javascript; charset=utf-8",
        Some("wasm") => "application/wasm",
        _ => "application/octet-stream",
    }
}
