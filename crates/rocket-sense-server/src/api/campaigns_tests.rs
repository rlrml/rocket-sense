use super::*;

/// A trimmed-down copy of the real emitter output
/// (subtr-actor `labels/beaten-to-ball/playlists/session-1.json`): replays[]
/// ids are replay-file sha256 stems, items carry meta.eventId /
/// meta.provenance / meta.payload / meta.target plus time bounds and a
/// player perspective.
fn emitter_playlist() -> Value {
    json!({
        "version": 1,
        "kind": "mechanic-review-playlist",
        "label": "Beaten-to-ball review (beaten-to-ball)",
        "playback": { "advanceMode": "manual", "endMode": "stop" },
        "meta": {
            "dataset": "beaten-to-ball",
            "eventType": "beaten_to_ball",
            "generatedBy": "event_rate_audit",
            "candidateCount": 304
        },
        "replays": [
            {
                "id": "10c7656223777c2c5c11e8ecc96d7fc0b27cf803b7fbad659279537eda793401",
                "label": "10c7656223777c2c5c11e8ecc96d7fc0b27cf803b7fbad659279537eda793401",
                "path": "/data/storage/replays/sha256/10c765....replay"
            }
        ],
        "items": [
            {
                "id": "10c765622377:beaten_to_ball:new:131:epic:b70aaba205564285ba80b143e6f0f56d",
                "replay": "10c7656223777c2c5c11e8ecc96d7fc0b27cf803b7fbad659279537eda793401",
                "start": { "kind": "time", "value": 15.12 },
                "end": { "kind": "time", "value": 21.12 },
                "label": "Beaten to ball — colonelpanic8 (lost to Βambi)",
                "perspective": {
                    "kind": "player",
                    "playerId": "epic:b70aaba205564285ba80b143e6f0f56d",
                    "playerName": "colonelpanic8",
                    "ballCam": "on"
                },
                "meta": {
                    "eventId": "10c765622377:beaten_to_ball:new:131:epic:b70aaba205564285ba80b143e6f0f56d",
                    "eventType": "beaten_to_ball",
                    "eventTypeLabel": "Beaten to ball",
                    "provenance": "new_only",
                    "reason": "margin_seconds=0.054 distance_at_touch=118.0",
                    "playerName": "colonelpanic8",
                    "reviewEndpoint": "/review-labels/beaten-to-ball?candidate=...",
                    "payload": { "frame": 131, "margin_seconds": 0.054 },
                    "target": { "eventFrame": 131, "eventTime": 19.12 }
                }
            },
            {
                // No meta.eventId: falls back to the item id.
                "id": "fallback-item-id",
                "replay": "10c7656223777c2c5c11e8ecc96d7fc0b27cf803b7fbad659279537eda793401",
                "start": { "kind": "time", "value": 24.8 },
                "end": { "kind": "time", "value": 28.8 },
                "meta": { "eventType": "beaten_to_ball" }
            },
            {
                // Neither meta.eventId nor id: skipped.
                "replay": "10c7656223777c2c5c11e8ecc96d7fc0b27cf803b7fbad659279537eda793401",
                "start": { "kind": "time", "value": 30.0 },
                "end": { "kind": "time", "value": 34.0 }
            },
            {
                // Unresolvable replay ref: skipped.
                "id": "orphan:beaten_to_ball:new:9:steam:1",
                "replay": "not-a-known-replay",
                "start": { "kind": "time", "value": 1.0 },
                "end": { "kind": "time", "value": 2.0 },
                "meta": { "eventId": "orphan:beaten_to_ball:new:9:steam:1" }
            }
        ]
    })
}

#[test]
fn parses_emitter_playlist_items_and_reports_skips() {
    let parsed = parse_import_playlist(&emitter_playlist()).expect("playlist should parse");

    assert_eq!(parsed.kind.as_deref(), Some("mechanic-review-playlist"));
    assert_eq!(
        parsed.label.as_deref(),
        Some("Beaten-to-ball review (beaten-to-ball)")
    );
    assert_eq!(parsed.meta["dataset"], json!("beaten-to-ball"));
    assert_eq!(parsed.source_item_count, 4);
    assert_eq!(parsed.items.len(), 2);
    assert_eq!(
        parsed.skipped,
        vec![
            SkippedImportItem {
                candidate: "item 2".to_owned(),
                reason: "item has neither meta.eventId nor id".to_owned(),
            },
            SkippedImportItem {
                candidate: "orphan:beaten_to_ball:new:9:steam:1".to_owned(),
                reason: "item replay ref \"not-a-known-replay\" does not resolve to a sha256"
                    .to_owned(),
            },
        ]
    );

    let first = &parsed.items[0];
    assert_eq!(
        first.candidate_key,
        "10c765622377:beaten_to_ball:new:131:epic:b70aaba205564285ba80b143e6f0f56d"
    );
    assert_eq!(
        first.replay_sha256,
        "10c7656223777c2c5c11e8ecc96d7fc0b27cf803b7fbad659279537eda793401"
    );
    assert_eq!(first.start_time, 15.12);
    assert_eq!(first.end_time, 21.12);
    assert_eq!(
        first.label.as_deref(),
        Some("Beaten to ball — colonelpanic8 (lost to Βambi)")
    );
    // Perspective and meta are preserved verbatim (camelCase keys included).
    assert_eq!(
        first.perspective.as_ref().unwrap()["playerId"],
        json!("epic:b70aaba205564285ba80b143e6f0f56d")
    );
    assert_eq!(first.item_meta["provenance"], json!("new_only"));
    assert_eq!(first.item_meta["target"]["eventFrame"], json!(131));
    assert_eq!(first.item_meta["payload"]["frame"], json!(131));

    // Second item fell back to the playlist item id as its candidate key.
    assert_eq!(parsed.items[1].candidate_key, "fallback-item-id");
}

#[test]
fn duplicate_candidate_keys_are_skipped() {
    let mut playlist = emitter_playlist();
    let duplicate = playlist["items"][0].clone();
    playlist["items"].as_array_mut().unwrap().push(duplicate);

    let parsed = parse_import_playlist(&playlist).expect("playlist should parse");
    assert_eq!(parsed.items.len(), 2);
    assert!(parsed.skipped.iter().any(|skipped| {
        skipped.reason == "duplicate candidate key in playlist"
            && skipped.candidate.starts_with("10c765622377:beaten_to_ball")
    }));
}

#[test]
fn non_playlist_json_is_an_error() {
    assert!(parse_import_playlist(&json!("nope")).is_err());
    assert!(parse_import_playlist(&json!({ "kind": "playlist" })).is_err());
}

#[test]
fn label_status_validates_against_the_decision_vocabulary() {
    let vocabulary = default_decision_vocabulary();
    assert_eq!(
        validate_label_status(&vocabulary, "confirmed").unwrap(),
        "confirmed"
    );
    assert_eq!(
        validate_label_status(&vocabulary, " bad_candidate ").unwrap(),
        "bad_candidate"
    );
    assert!(validate_label_status(&vocabulary, "maybe").is_err());
    assert!(validate_label_status(&vocabulary, "").is_err());

    // Custom vocabularies validate their own statuses, with `key` as the
    // fallback when an entry has no explicit `status`.
    let custom = json!([
        { "key": "yes", "status": "genuine_challenge", "label": "Genuine" },
        { "key": "no", "label": "Not a challenge" },
    ]);
    assert!(validate_label_status(&custom, "genuine_challenge").is_ok());
    assert!(validate_label_status(&custom, "no").is_ok());
    assert!(validate_label_status(&custom, "yes").is_err());
}

#[test]
fn item_meta_merge_overrides_review_keys_and_preserves_the_rest() {
    let stored = json!({
        "eventId": "stored-key",
        "eventType": "beaten_to_ball",
        "reviewEndpoint": "/review-labels/beaten-to-ball?candidate=old",
        "target": { "eventFrame": 131, "eventTime": 19.12 },
        "payload": { "frame": 131 }
    });
    let merged = campaign_item_meta(
        stored,
        "sha12:beaten_to_ball:new:131:epic:abc",
        Some("confirmed".to_owned()),
        "/api/v1/campaigns/cid/items/iid/labels".to_owned(),
    );

    assert_eq!(
        merged["eventId"],
        json!("sha12:beaten_to_ball:new:131:epic:abc")
    );
    assert_eq!(merged["reviewStatus"], json!("confirmed"));
    assert_eq!(
        merged["reviewEndpoint"],
        json!("/api/v1/campaigns/cid/items/iid/labels")
    );
    // The player derives clock offsets from target — preserved verbatim.
    assert_eq!(
        merged["target"],
        json!({ "eventFrame": 131, "eventTime": 19.12 })
    );
    assert_eq!(merged["payload"], json!({ "frame": 131 }));
    assert_eq!(merged["eventType"], json!("beaten_to_ball"));

    let unlabeled = campaign_item_meta(json!({}), "key", None, "/endpoint".to_owned());
    assert_eq!(unlabeled["reviewStatus"], Value::Null);
}

#[test]
fn slugify_produces_url_safe_slugs() {
    assert_eq!(
        slugify("Beaten to ball — session 1"),
        "beaten-to-ball-session-1"
    );
    assert_eq!(slugify("  Already-Slugged  "), "already-slugged");
    assert_eq!(slugify("???"), "");
}

#[test]
fn playlist_urls_round_trip_paging_options() {
    let campaign_id = Uuid::parse_str("019f0605-064c-7a91-b408-65b227ab06ca").unwrap();
    assert_eq!(
        campaign_playlist_url(campaign_id, false, 500, 0),
        "/api/v1/campaigns/019f0605-064c-7a91-b408-65b227ab06ca/playlist?limit=500&offset=0"
    );
    assert_eq!(
        campaign_playlist_url(campaign_id, true, 100, 200),
        "/api/v1/campaigns/019f0605-064c-7a91-b408-65b227ab06ca/playlist?include-labeled=true&limit=100&offset=200"
    );
}
