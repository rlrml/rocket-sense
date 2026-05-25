use super::*;

#[test]
fn mechanic_review_playlist_url_preserves_filter_fields() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let filters = MechanicEventFilters::from_query(MechanicEventsQuery {
        event_ids: Vec::new(),
        mechanic: vec![" wavedash ".to_owned(), "speed_flip".to_owned()],
        detector: vec!["stats_timeline".to_owned()],
        review_status: Some("unreviewed".to_owned()),
        min_confidence: Some(0.7),
        replay_id: Some(replay_id),
        player_id: Some("steam:abc123".to_owned()),
        count: Some(1000),
        offset: Some(25),
    })
    .unwrap();

    let url = mechanic_review_playlist_url(&filters);

    assert!(url.starts_with("/api/v1/mechanics/review-playlist?"));
    assert!(url.contains("mechanic=wavedash"));
    assert!(url.contains("mechanic=speed_flip"));
    assert!(url.contains("detector=stats_timeline"));
    assert!(url.contains("review-status=unreviewed"));
    assert!(url.contains("min-confidence=0.7"));
    assert!(url.contains("replay-id=0196f449-e997-7413-af77-28082e6478f0"));
    assert!(url.contains("player-id=steam%3Aabc123"));
    assert!(url.contains("count=1000"));
    assert!(url.contains("offset=25"));
}

#[test]
fn mechanic_review_page_exposes_current_mechanic_filters() {
    for mechanic in [
        "air_dribble",
        "ball_carry",
        "ceiling_shot",
        "double_tap",
        "flick",
        "flip_reset",
        "half_flip",
        "half_volley",
        "musty_flick",
        "one_timer",
        "pass",
        "speed_flip",
        "wavedash",
    ] {
        assert!(MECHANIC_REVIEW_PAGE.contains(&format!(r#"value="{mechanic}""#)));
    }

    assert!(MECHANIC_REVIEW_PAGE.contains(r#"action="/mechanics/review/open""#));
}

#[test]
fn saved_playlist_spec_normalizes_flat_legacy_filters() {
    let spec = normalize_saved_playlist_spec(serde_json::json!({
        "mechanics": ["double_tap"],
        "reviewStatus": "unreviewed",
        "count": 25,
        "offset": 50
    }))
    .unwrap();

    assert_eq!(spec["source"]["kind"], "query");
    assert_eq!(spec["source"]["entity"], "mechanic_event");
    assert_eq!(
        spec["source"]["filters"]["mechanics"],
        serde_json::json!(["double_tap"])
    );
    assert_eq!(spec["source"]["filters"]["reviewStatus"], "unreviewed");
    assert_eq!(spec["page"]["limit"], 25);
    assert_eq!(spec["page"]["offset"], 50);
}

#[test]
fn saved_playlist_spec_accepts_generic_query_source() {
    let spec = normalize_saved_playlist_spec(serde_json::json!({
        "source": {
            "kind": "query",
            "entity": "mechanic_event",
            "filters": {
                "mechanics": "flick",
                "minConfidence": 0.75
            }
        },
        "page": {
            "limit": 75
        }
    }))
    .unwrap();

    assert_eq!(spec["source"]["kind"], "query");
    assert_eq!(
        spec["source"]["filters"]["mechanics"],
        serde_json::json!(["flick"])
    );
    assert_eq!(spec["source"]["filters"]["minConfidence"], 0.75);
    assert_eq!(spec["page"]["limit"], 75);
    assert_eq!(spec["page"]["offset"], 0);
}

#[test]
fn saved_playlist_spec_accepts_snapshot_source() {
    let first = Uuid::parse_str("019e5336-5e24-7281-8267-189914aa46b5").unwrap();
    let second = Uuid::parse_str("019e5336-650b-770a-bd81-7d09c6e4afe9").unwrap();
    let spec = normalize_saved_playlist_spec(serde_json::json!({
        "source": {
            "kind": "snapshot",
            "entity": "mechanic_event",
            "itemIds": [first, second]
        }
    }))
    .unwrap();

    assert_eq!(spec["source"]["kind"], "snapshot");
    assert_eq!(spec["source"]["entity"], "mechanic_event");
    assert_eq!(
        spec["source"]["itemIds"],
        serde_json::json!([first, second])
    );
    assert_eq!(spec["page"]["limit"], 500);
}

#[test]
fn saved_playlist_spec_rejects_unknown_entities() {
    let error = normalize_saved_playlist_spec(serde_json::json!({
        "source": {
            "kind": "query",
            "entity": "replay",
            "filters": {}
        }
    }))
    .unwrap_err();

    assert_eq!(error.status, StatusCode::BAD_REQUEST);
    assert!(error.message.contains("mechanic_event"));
}

#[test]
fn review_playlist_exposes_page_metadata() {
    let filters = MechanicEventFilters {
        event_ids: Vec::new(),
        mechanics: Vec::new(),
        detectors: Vec::new(),
        review_status: None,
        min_confidence: None,
        replay_id: None,
        player_id: None,
        count: 50,
        offset: 100,
    };

    let playlist = build_review_playlist(Vec::new(), "Review".to_owned(), &filters, None);

    assert_eq!(playlist.page.count, 0);
    assert_eq!(playlist.page.limit, 50);
    assert_eq!(playlist.page.offset, 100);
}

#[test]
fn review_playlist_items_apply_explicit_preroll_and_postroll() {
    let event_id = Uuid::parse_str("019e5336-5e24-7281-8267-189914aa46b5").unwrap();
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let analysis_run_id = Uuid::parse_str("019e5336-650b-770a-bd81-7d09c6e4afe9").unwrap();
    let item = playlist_item(
        0,
        MechanicEventResponse {
            id: event_id,
            replay_id,
            analysis_run_id,
            mechanic: "speed_flip".to_owned(),
            detector: "stats_timeline".to_owned(),
            player_id: Some("steam:abc123".to_owned()),
            team: Some(0),
            start_frame: Some(100),
            end_frame: Some(130),
            event_frame: Some(130),
            start_time: Some(12.5),
            end_time: Some(13.5),
            event_time: Some(13.5),
            confidence: Some(0.84),
            reason: Some("candidate".to_owned()),
            payload: serde_json::json!({ "kind": "speed_flip" }),
            review_status: None,
            latest_review_id: None,
            created_at: Utc::now(),
        },
    );

    assert_eq!(item.start.value, 8.5);
    assert_eq!(item.end.value, 16.5);
    assert_eq!(item.meta.clip.start_time, 8.5);
    assert_eq!(item.meta.clip.end_time, 16.5);
    assert_eq!(item.meta.clip.preroll_seconds, 4.0);
    assert_eq!(item.meta.clip.postroll_seconds, 3.0);
    assert_eq!(item.meta.target.start_time, Some(12.5));
    assert_eq!(item.meta.target.end_time, Some(13.5));
}
