use super::*;

#[test]
fn event_review_playlist_url_preserves_filter_fields() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let filters = MechanicEventFilters::from_query(MechanicEventsQuery {
        event_ids: Vec::new(),
        mechanic: vec![" wavedash ".to_owned(), "speed_flip".to_owned()],
        event_category: vec!["touch".to_owned()],
        detector: vec!["stats_timeline".to_owned()],
        review_status: Some("unreviewed".to_owned()),
        min_confidence: Some(0.7),
        replay_id: Some(replay_id),
        player_id: Some("steam:abc123".to_owned()),
        count: Some(1000),
        offset: Some(25),
    })
    .unwrap();

    let url = event_review_playlist_url(&filters);

    assert!(url.starts_with("/api/v1/events/review-playlist?"));
    assert!(url.contains("event-type=wavedash"));
    assert!(url.contains("event-type=speed_flip"));
    assert!(url.contains("event-category=touch"));
    assert!(url.contains("detector=stats_timeline"));
    assert!(url.contains("review-status=unreviewed"));
    assert!(url.contains("min-confidence=0.7"));
    assert!(url.contains("replay-id=0196f449-e997-7413-af77-28082e6478f0"));
    assert!(url.contains("player-id=steam%3Aabc123"));
    assert!(url.contains("count=1000"));
    assert!(url.contains("offset=25"));
}

#[test]
fn event_review_open_targets_stats_evaluation_player() {
    let filters = MechanicEventFilters::from_query(MechanicEventsQuery {
        event_ids: Vec::new(),
        mechanic: vec!["wavedash".to_owned(), "speed_flip".to_owned()],
        event_category: Vec::new(),
        detector: Vec::new(),
        review_status: None,
        min_confidence: None,
        replay_id: None,
        player_id: None,
        count: Some(10),
        offset: None,
    })
    .unwrap();

    let url = event_review_player_url(&filters);

    assert!(url.starts_with("/subtr-actor/?reviewPlaylist="));
    assert!(!url.starts_with("/subtr-actor/review"));
    assert!(url.contains("event-type%3Dwavedash"));
    assert!(url.contains("event-type%3Dspeed_flip"));
}

#[test]
fn mechanic_events_query_accepts_repeated_event_type_fields() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let query = MechanicEventsQuery::from_raw_query(Some(
        "event-type=wavedash&event-type=speed_flip&event-category=touch&detector=stats_timeline&event-id=019e5336-5e24-7281-8267-189914aa46b5&event-id=019e5336-650b-770a-bd81-7d09c6e4afe9&review-status=unreviewed&min-confidence=0.7&replay-id=0196f449-e997-7413-af77-28082e6478f0&player-id=steam%3Aabc123&count=1000&offset=25",
    ))
    .unwrap();

    assert_eq!(query.mechanic, ["wavedash", "speed_flip"]);
    assert_eq!(query.event_category, ["touch"]);
    assert_eq!(query.detector, ["stats_timeline"]);
    assert_eq!(query.event_ids.len(), 2);
    assert_eq!(query.review_status.as_deref(), Some("unreviewed"));
    assert_eq!(query.min_confidence, Some(0.7));
    assert_eq!(query.replay_id, Some(replay_id));
    assert_eq!(query.player_id.as_deref(), Some("steam:abc123"));
    assert_eq!(query.count, Some(1000));
    assert_eq!(query.offset, Some(25));
}

#[test]
fn mechanic_events_query_still_accepts_legacy_mechanic_fields() {
    let query =
        MechanicEventsQuery::from_raw_query(Some("mechanic=wavedash&mechanic=speed_flip")).unwrap();

    assert_eq!(query.mechanic, ["wavedash", "speed_flip"]);
}

#[test]
fn event_type_filters_include_exact_keys_and_legacy_mechanic_shorthands() {
    let filters = MechanicEventFilters::from_query(MechanicEventsQuery {
        event_ids: Vec::new(),
        mechanic: vec!["ball.touch".to_owned(), "speed_flip".to_owned()],
        event_category: vec!["touch".to_owned(), "mechanic".to_owned()],
        detector: Vec::new(),
        review_status: None,
        min_confidence: None,
        replay_id: None,
        player_id: None,
        count: None,
        offset: None,
    })
    .unwrap();

    assert_eq!(
        filters.event_type_keys(),
        ["ball.touch", "mechanic.speed_flip", "speed_flip"]
    );
    assert_eq!(filters.event_categories, ["touch", "mechanic"]);
}

#[test]
fn event_review_page_exposes_current_event_type_filters() {
    for event_type in [
        "ball.touch",
        "boost.pickup.both",
        "core.goal",
        "fifty.fifty",
        "goal_tag.double_tap_goal",
        "mechanic.air_dribble",
        "mechanic.speed_flip",
        "pass",
        "rotation.first_man_stint",
        "speed.flip",
        "touch.ball.movement",
        "whiff",
    ] {
        assert!(EVENT_REVIEW_PAGE.contains(&format!(r#"value="{event_type}""#)));
    }

    assert!(EVENT_REVIEW_PAGE.contains("<title>Events review</title>"));
    assert!(EVENT_REVIEW_PAGE.contains(r#"<h1>Events review</h1>"#));
    assert!(EVENT_REVIEW_PAGE.contains(r#"<h2>Event filters</h2>"#));
    assert!(EVENT_REVIEW_PAGE.contains(r#"id="event-type-grid""#));
    assert!(EVENT_REVIEW_PAGE.contains(r#"/api/v1/events/types"#));
    assert!(EVENT_REVIEW_PAGE.contains(r#"name="event-type""#));
    assert!(EVENT_REVIEW_PAGE.contains("ball.touch or boost.pickup.both"));
    assert!(EVENT_REVIEW_PAGE.contains(r#"value="fifty""#));
    assert!(EVENT_REVIEW_PAGE.contains(r#"value="rush""#));
    assert!(EVENT_REVIEW_PAGE.contains(r#"action="/events/review/open""#));
    assert!(EVENT_REVIEW_PAGE.contains(r#"href="/api/v1/events?review-status=unreviewed""#));
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
    assert_eq!(spec["source"]["entity"], "event");
    assert_eq!(
        spec["source"]["filters"]["eventTypes"],
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
            "entity": "event",
            "filters": {
                "eventTypes": "flick",
                "eventCategories": "touch",
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
        spec["source"]["filters"]["eventTypes"],
        serde_json::json!(["flick"])
    );
    assert_eq!(
        spec["source"]["filters"]["eventCategories"],
        serde_json::json!(["touch"])
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
            "entity": "event",
            "itemIds": [first, second]
        }
    }))
    .unwrap();

    assert_eq!(spec["source"]["kind"], "snapshot");
    assert_eq!(spec["source"]["entity"], "event");
    assert_eq!(
        spec["source"]["itemIds"],
        serde_json::json!([first, second])
    );
    assert_eq!(spec["page"]["limit"], 100);
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
    assert!(error.message.contains("event"));
}

#[test]
fn review_playlist_exposes_page_metadata() {
    let filters = MechanicEventFilters {
        event_ids: Vec::new(),
        mechanics: Vec::new(),
        event_categories: Vec::new(),
        detectors: Vec::new(),
        review_status: None,
        min_confidence: None,
        replay_id: None,
        player_id: None,
        count: 50,
        offset: 100,
    };

    let playlist = build_review_playlist(Vec::new(), "Review".to_owned(), &filters, None);

    assert_eq!(playlist.playback.time_base, "rawReplay");
    assert_eq!(playlist.page.count, 0);
    assert_eq!(playlist.page.limit, 50);
    assert_eq!(playlist.page.offset, 100);
    assert_eq!(
        playlist.page.previous.as_deref(),
        Some("/api/v1/events/review-playlist?count=50&offset=50")
    );
    assert_eq!(playlist.page.next, None);
}

#[test]
fn review_playlist_exposes_next_page_when_page_is_full() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let analysis_run_id = Uuid::parse_str("019e5336-650b-770a-bd81-7d09c6e4afe9").unwrap();
    let filters = MechanicEventFilters {
        event_ids: Vec::new(),
        mechanics: vec!["speed_flip".to_owned()],
        event_categories: Vec::new(),
        detectors: Vec::new(),
        review_status: Some("unreviewed".to_owned()),
        min_confidence: None,
        replay_id: None,
        player_id: None,
        count: 2,
        offset: 4,
    };
    let events = (0..2)
        .map(|index| MechanicEventResponse {
            id: Uuid::now_v7(),
            replay_id,
            replay_label: None,
            analysis_run_id,
            event_type: "mechanic.speed_flip".to_owned(),
            event_type_label: "Speed Flip".to_owned(),
            event_category: "mechanic".to_owned(),
            mechanic: "speed_flip".to_owned(),
            detector: "stats_timeline".to_owned(),
            player_id: None,
            player_name: None,
            team: None,
            start_frame: None,
            end_frame: None,
            event_frame: None,
            start_time: Some(index as f64),
            end_time: Some(index as f64 + 1.0),
            event_time: Some(index as f64),
            confidence: None,
            reason: None,
            payload: serde_json::json!({}),
            review_status: None,
            latest_review_id: None,
            created_at: Utc::now(),
        })
        .collect();

    let playlist = build_review_playlist(events, "Review".to_owned(), &filters, None);

    assert_eq!(
        playlist.page.next.as_deref(),
        Some("/api/v1/events/review-playlist?event-type=speed_flip&review-status=unreviewed&count=2&offset=6")
    );
    assert_eq!(
        playlist.page.previous.as_deref(),
        Some("/api/v1/events/review-playlist?event-type=speed_flip&review-status=unreviewed&count=2&offset=2")
    );
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
            replay_label: Some("ranked-doubles.replay".to_owned()),
            analysis_run_id,
            event_type: "mechanic.speed_flip".to_owned(),
            event_type_label: "Speed Flip".to_owned(),
            event_category: "mechanic".to_owned(),
            mechanic: "speed_flip".to_owned(),
            detector: "stats_timeline".to_owned(),
            player_id: Some("steam:abc123".to_owned()),
            player_name: Some("Fast Player".to_owned()),
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

    assert_eq!(item.start.kind, "time");
    assert_eq!(item.start.value, 8.5);
    assert_eq!(item.end.kind, "time");
    assert_eq!(item.end.value, 16.5);
    assert_eq!(item.label, "Fast Player - Speed Flip candidate 1");
    assert_eq!(item.meta.player_name.as_deref(), Some("Fast Player"));
    assert_eq!(item.meta.clip.start_time, 8.5);
    assert_eq!(item.meta.clip.end_time, 16.5);
    assert_eq!(item.meta.clip.preroll_seconds, 4.0);
    assert_eq!(item.meta.clip.postroll_seconds, 3.0);
    assert_eq!(item.meta.target.start_time, Some(12.5));
    assert_eq!(item.meta.target.end_time, Some(13.5));
}

#[test]
fn review_playlist_items_fall_back_to_time_bounds_without_frames() {
    let event_id = Uuid::parse_str("019e5336-5e24-7281-8267-189914aa46b5").unwrap();
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let analysis_run_id = Uuid::parse_str("019e5336-650b-770a-bd81-7d09c6e4afe9").unwrap();
    let item = playlist_item(
        0,
        MechanicEventResponse {
            id: event_id,
            replay_id,
            replay_label: None,
            analysis_run_id,
            event_type: "mechanic.speed_flip".to_owned(),
            event_type_label: "Speed Flip".to_owned(),
            event_category: "mechanic".to_owned(),
            mechanic: "speed_flip".to_owned(),
            detector: "stats_timeline".to_owned(),
            player_id: Some("steam:abc123".to_owned()),
            player_name: None,
            team: Some(0),
            start_frame: None,
            end_frame: None,
            event_frame: None,
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

    assert_eq!(item.start.kind, "time");
    assert_eq!(item.start.value, 8.5);
    assert_eq!(item.end.kind, "time");
    assert_eq!(item.end.value, 16.5);
    assert_eq!(item.label, "Speed Flip candidate 1");
    assert_eq!(item.meta.target.kind, "event");
}

#[test]
fn review_playlist_items_support_non_mechanic_events() {
    let event_id = Uuid::parse_str("019e5336-5e24-7281-8267-189914aa46b5").unwrap();
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let analysis_run_id = Uuid::parse_str("019e5336-650b-770a-bd81-7d09c6e4afe9").unwrap();
    let item = playlist_item(
        0,
        MechanicEventResponse {
            id: event_id,
            replay_id,
            replay_label: None,
            analysis_run_id,
            event_type: "ball.touch".to_owned(),
            event_type_label: "Ball Touch".to_owned(),
            event_category: "touch".to_owned(),
            mechanic: "ball.touch".to_owned(),
            detector: "subtr-actor:stats-timeline".to_owned(),
            player_id: Some("steam:abc123".to_owned()),
            player_name: Some("Toucher".to_owned()),
            team: Some(1),
            start_frame: Some(120),
            end_frame: Some(120),
            event_frame: Some(120),
            start_time: Some(2.0),
            end_time: Some(2.0),
            event_time: Some(2.0),
            confidence: None,
            reason: None,
            payload: serde_json::json!({ "player": { "type": "steam", "value": 123 } }),
            review_status: None,
            latest_review_id: None,
            created_at: Utc::now(),
        },
    );

    assert_eq!(item.label, "Toucher - Ball Touch review item 1");
    assert_eq!(item.meta.event_type, "ball.touch");
    assert_eq!(item.meta.event_type_label, "Ball Touch");
    assert_eq!(item.meta.mechanic, "ball.touch");
    assert_eq!(item.meta.mechanic_label, "Ball Touch");
    assert_eq!(item.meta.team.as_deref(), Some("orange"));
}
