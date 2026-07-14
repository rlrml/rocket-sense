//! Adapter cross-validation harness: parse a real `.replay` through the
//! vendored subtr-actor, adapt it to a [`ReplayView`], run detection, and
//! compare against the RLAgent-parser path (the Python system's exact input).
//!
//! Exact equality is NOT expected here — the two parsers disagree on clock
//! (pause compression), sample precision, boost modeling and segment
//! boundaries (see `subtr_adapter.rs` module docs). What this harness asserts
//! is *behavioral agreement*: the same players produce broadly the same
//! mistakes. Run with `--nocapture` to see the full per-kind diff report.

use flate2::read::GzDecoder;
use rocket_sense_mistakes::pipeline::predict_mistakes;
use rocket_sense_mistakes::profile::DetectorProfile;
use rocket_sense_mistakes::rlagent_json::replay_view_from_rlagent_text;
use rocket_sense_mistakes::subtr_adapter::replay_view_from_json;
use rocket_sense_mistakes::view::ReplayView;
use std::collections::BTreeMap;
use std::io::Read;
use subtr_actor::collector::replay_data::ReplayDataCollector;

fn fixture_path(name: &str) -> String {
    format!("{}/fixtures/{name}", env!("CARGO_MANIFEST_DIR"))
}

fn subtr_view(replay_file: &str) -> ReplayView {
    let bytes = std::fs::read(fixture_path(replay_file)).expect("read .replay fixture");
    let parsed = boxcars::ParserBuilder::new(&bytes)
        .must_parse_network_data()
        .on_error_check_crc()
        .parse()
        .expect("boxcars parse");
    let replay_data = ReplayDataCollector::new()
        .get_replay_data(&parsed)
        .expect("collect replay data");
    let json = serde_json::to_value(&replay_data).expect("serialize replay data");
    replay_view_from_json(&json).expect("adapt replay data")
}

fn rlagent_view(parsed_gz: &str) -> ReplayView {
    let bytes = std::fs::read(fixture_path(parsed_gz)).expect("read parsed fixture");
    let mut text = String::new();
    GzDecoder::new(&bytes[..])
        .read_to_string(&mut text)
        .expect("gunzip parsed fixture");
    replay_view_from_rlagent_text(&text).expect("parse rlagent fixture")
}

fn kind_counts(view: &ReplayView, player_idx: usize) -> BTreeMap<&'static str, usize> {
    let mut counts = BTreeMap::new();
    for marker in predict_mistakes(view, player_idx, &DetectorProfile::default()) {
        *counts.entry(marker.kind).or_insert(0) += 1;
    }
    counts
}

#[test]
fn subtr_adapter_agrees_with_rlagent_parser_on_replay13() {
    let subtr = subtr_view("replay13.replay");
    let rlagent = rlagent_view("replay13.parsed.json.gz");

    // Same roster size. Names are matched exactly where possible; leftovers
    // are paired by team (the parsers can decode exotic Unicode names
    // differently, e.g. `saıborg` vs `sa1borg`).
    assert_eq!(
        subtr.players.len(),
        rlagent.players.len(),
        "player counts differ"
    );

    // Same kickoff structure.
    assert_eq!(
        subtr.balls.len(),
        rlagent.balls.len(),
        "ball segment (kickoff) count differs"
    );

    // Pair players: exact name match first, then leftovers by team.
    let mut pairs: Vec<(usize, usize)> = Vec::new();
    let mut used_subtr: Vec<usize> = Vec::new();
    for (rl_idx, rl_player) in rlagent.players.iter().enumerate() {
        if let Some(s_idx) = subtr
            .players
            .iter()
            .enumerate()
            .position(|(i, p)| p.name == rl_player.name && !used_subtr.contains(&i))
        {
            pairs.push((rl_idx, s_idx));
            used_subtr.push(s_idx);
        }
    }
    for (rl_idx, rl_player) in rlagent.players.iter().enumerate() {
        if pairs.iter().any(|&(r, _)| r == rl_idx) {
            continue;
        }
        let s_idx = subtr
            .players
            .iter()
            .enumerate()
            .position(|(i, p)| p.team == rl_player.team && !used_subtr.contains(&i))
            .expect("leftover player pairable by team");
        pairs.push((rl_idx, s_idx));
        used_subtr.push(s_idx);
    }

    let mut total_rlagent = 0usize;
    let mut total_subtr = 0usize;
    let mut total_agree = 0usize;
    for &(rl_idx, subtr_idx) in &pairs {
        let name = rlagent.players[rl_idx].name.clone();
        assert_eq!(
            subtr.players[subtr_idx].team, rlagent.players[rl_idx].team,
            "team mismatch for {name}"
        );

        let ours = kind_counts(&subtr, subtr_idx);
        let reference = kind_counts(&rlagent, rl_idx);
        println!("--- {name}");
        let all_kinds: Vec<&&str> = reference.keys().chain(ours.keys()).collect();
        let mut seen: Vec<&str> = Vec::new();
        for kind in all_kinds {
            if seen.contains(kind) {
                continue;
            }
            seen.push(kind);
            let a = reference.get(*kind).copied().unwrap_or(0);
            let b = ours.get(*kind).copied().unwrap_or(0);
            println!("    {kind}: rlagent={a} subtr={b}");
            total_rlagent += a;
            total_subtr += b;
            total_agree += a.min(b);
        }
    }
    println!("totals: rlagent={total_rlagent} subtr={total_subtr} per-kind-overlap={total_agree}");

    // Behavioral agreement bands, not exactness: the parsers disagree on
    // clock, precision, and boost modeling (documented in subtr_adapter.rs).
    // Measured on this fixture: 62/63 markers agree per player+kind (the one
    // miss is a pick_up_small_pads window whose max-boost sits on the 50.0
    // threshold, where subtr-actor's modeled drain and RLAgent's stepped
    // integer boost disagree by a fraction of a unit).
    assert!(total_rlagent > 0 && total_subtr > 0);
    let ratio = total_subtr as f64 / total_rlagent as f64;
    assert!(
        (0.92..=1.08).contains(&ratio),
        "marker volume diverged: rlagent={total_rlagent} subtr={total_subtr}"
    );
    let overlap = total_agree as f64 / total_rlagent as f64;
    assert!(
        overlap >= 0.92,
        "per-kind overlap too low: {total_agree}/{total_rlagent}"
    );
}
