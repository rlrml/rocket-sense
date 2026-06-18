use super::*;

#[test]
fn event_review_playlist_url_preserves_filter_fields() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let uploader_id = Uuid::parse_str("019e5336-5e24-7281-8267-189914aa46b5").unwrap();
    let group_id = Uuid::parse_str("019e5336-650b-770a-bd81-7d09c6e4afe9").unwrap();
    let project_id = Uuid::parse_str("019e5336-7351-7839-b952-bfc954274e78").unwrap();
    let filters = MechanicEventFilters::from_query(MechanicEventsQuery {
        q: Some("Grand Finals".to_owned()),
        event_ids: Vec::new(),
        mechanic: vec![" wavedash ".to_owned(), "speed_flip".to_owned()],
        event_category: vec!["event".to_owned()],
        detector: vec!["stats_timeline".to_owned()],
        player_names: vec!["Zen".to_owned()],
        player_ids: vec!["steam:abc123".to_owned()],
        playlist: vec!["ranked-doubles".to_owned()],
        game_modes: vec!["private".to_owned()],
        maps: vec!["stadium_p".to_owned()],
        pro: Some(true),
        uploader: Some(uploader_id.to_string()),
        group: Some(group_id.to_string()),
        project: Some(project_id.to_string()),
        review_status: Some("unreviewed".to_owned()),
        min_confidence: Some(0.7),
        replay_id: Some(replay_id),
        player_id: Some("steam:abc123".to_owned()),
        created_after: Some("2026-06-01T00:00:00Z".parse().unwrap()),
        created_before: Some("2026-06-02T00:00:00Z".parse().unwrap()),
        replay_date_after: Some("2026-05-01T00:00:00Z".parse().unwrap()),
        replay_date_before: Some("2026-05-02T00:00:00Z".parse().unwrap()),
        event_created_after: Some("2026-04-01T00:00:00Z".parse().unwrap()),
        event_created_before: Some("2026-04-02T00:00:00Z".parse().unwrap()),
        count: Some(1000),
        offset: Some(25),
        ..MechanicEventsQuery::default()
    })
    .unwrap();

    let url = event_review_playlist_url(&filters);

    assert!(url.starts_with("/api/v1/events/review-playlist?"));
    let query = url.split_once('?').unwrap().1;
    let pairs = url::form_urlencoded::parse(query.as_bytes())
        .map(|(key, value)| (key.into_owned(), value.into_owned()))
        .collect::<Vec<_>>();
    assert!(pairs.contains(&("q".to_owned(), "Grand Finals".to_owned())));
    assert!(pairs.contains(&("event-type".to_owned(), "wavedash".to_owned())));
    assert!(pairs.contains(&("event-type".to_owned(), "speed_flip".to_owned())));
    assert!(pairs.contains(&("event-category".to_owned(), "event".to_owned())));
    assert!(pairs.contains(&("detector".to_owned(), "stats_timeline".to_owned())));
    assert!(pairs.contains(&("player-name".to_owned(), "Zen".to_owned())));
    assert!(pairs.contains(&("player-id".to_owned(), "steam:abc123".to_owned())));
    assert!(pairs.contains(&("playlist".to_owned(), "ranked-doubles".to_owned())));
    assert!(pairs.contains(&("playlist".to_owned(), "private".to_owned())));
    assert!(pairs.contains(&("map".to_owned(), "stadium_p".to_owned())));
    assert!(pairs.contains(&("pro".to_owned(), "true".to_owned())));
    assert!(pairs.contains(&("uploader".to_owned(), uploader_id.to_string())));
    assert!(pairs.contains(&("group".to_owned(), group_id.to_string())));
    assert!(pairs.contains(&("project".to_owned(), project_id.to_string())));
    assert!(pairs.contains(&("review-status".to_owned(), "unreviewed".to_owned())));
    assert!(pairs.contains(&("min-confidence".to_owned(), "0.7".to_owned())));
    assert!(pairs.contains(&(
        "replay-id".to_owned(),
        "0196f449-e997-7413-af77-28082e6478f0".to_owned()
    )));
    assert!(pairs.contains(&("created-after".into(), "2026-06-01T00:00:00+00:00".into())));
    assert!(pairs.contains(&("created-before".into(), "2026-06-02T00:00:00+00:00".into())));
    assert!(pairs.contains(&(
        "replay-date-after".into(),
        "2026-05-01T00:00:00+00:00".into()
    )));
    assert!(pairs.contains(&(
        "replay-date-before".into(),
        "2026-05-02T00:00:00+00:00".into()
    )));
    assert!(pairs.contains(&(
        "event-created-after".into(),
        "2026-04-01T00:00:00+00:00".into()
    )));
    assert!(pairs.contains(&(
        "event-created-before".into(),
        "2026-04-02T00:00:00+00:00".into()
    )));
    assert!(pairs.contains(&("count".into(), "1000".into())));
    assert!(pairs.contains(&("offset".into(), "25".into())));
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
        ..MechanicEventsQuery::default()
    })
    .unwrap();

    let url = event_review_player_url(&filters);

    assert!(url.starts_with("/subtr-actor/?reviewPlaylist="));
    assert!(!url.starts_with("/subtr-actor/review"));
    assert!(url.contains("event-type%3Dwavedash"));
    assert!(url.contains("event-type%3Dspeed_flip"));

    let params = url_query_pairs(&url);
    let config = params
        .iter()
        .find_map(|(key, value)| (key == "cfg").then_some(value))
        .expect("review player URL should include a cfg value for mechanic filters");
    let config: Value = serde_json::from_str(config).expect("cfg should be raw JSON");
    assert_eq!(
        config["overlays"]["mechanics"],
        serde_json::json!(["speed_flip", "wavedash"])
    );
    assert_eq!(config["overlays"]["timelineEvents"], serde_json::json!([]));
    assert_eq!(config["overlays"]["boostPads"], serde_json::json!(true));
}

#[test]
fn event_review_player_config_ignores_non_mechanic_event_types() {
    let filters = MechanicEventFilters::from_query(MechanicEventsQuery {
        event_ids: Vec::new(),
        mechanic: vec![
            "touch".to_owned(),
            "flip_reset".to_owned(),
            "speed_flip".to_owned(),
        ],
        event_category: Vec::new(),
        detector: Vec::new(),
        review_status: None,
        min_confidence: None,
        replay_id: None,
        player_id: None,
        count: Some(10),
        offset: None,
        ..MechanicEventsQuery::default()
    })
    .unwrap();

    assert_eq!(
        event_review_mechanic_timeline_kinds(&filters),
        ["flip_reset", "speed_flip"]
    );
}

#[test]
fn event_review_player_url_omits_cfg_without_mechanic_filters() {
    let filters = MechanicEventFilters::from_query(MechanicEventsQuery {
        event_ids: Vec::new(),
        mechanic: vec!["touch".to_owned()],
        event_category: vec!["event".to_owned()],
        detector: Vec::new(),
        review_status: None,
        min_confidence: None,
        replay_id: None,
        player_id: None,
        count: Some(10),
        offset: None,
        ..MechanicEventsQuery::default()
    })
    .unwrap();

    let url = event_review_player_url(&filters);
    let params = url_query_pairs(&url);

    assert!(params.iter().any(|(key, _)| key == "reviewPlaylist"));
    assert!(!params.iter().any(|(key, _)| key == "cfg"));
}

#[test]
fn mechanic_events_query_accepts_repeated_event_type_fields() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let query = MechanicEventsQuery::from_raw_query(Some(
        "q=grand&event-type=wavedash&event-type=speed_flip&event-category=event&detector=stats_timeline&event-id=019e5336-5e24-7281-8267-189914aa46b5&event-id=019e5336-650b-770a-bd81-7d09c6e4afe9&player-name=Zen&player-name=Alpha&player-id=steam%3Aabc123&playlist=ranked-doubles&game-mode=private&map=stadium_p&pro=true&uploader=019e5336-5e24-7281-8267-189914aa46b5&group=019e5336-650b-770a-bd81-7d09c6e4afe9&project=019e5336-7351-7839-b952-bfc954274e78&review-status=unreviewed&min-confidence=0.7&replay-id=0196f449-e997-7413-af77-28082e6478f0&created-after=2026-06-01T00%3A00%3A00Z&created-before=2026-06-02T00%3A00%3A00Z&replay-date-after=2026-05-01T00%3A00%3A00Z&replay-date-before=2026-05-02T00%3A00%3A00Z&event-created-after=2026-04-01T00%3A00%3A00Z&event-created-before=2026-04-02T00%3A00%3A00Z&count=1000&offset=25",
    ))
    .unwrap();

    assert_eq!(query.q.as_deref(), Some("grand"));
    assert_eq!(query.mechanic, ["wavedash", "speed_flip"]);
    assert_eq!(query.event_category, ["event"]);
    assert_eq!(query.detector, ["stats_timeline"]);
    assert_eq!(query.event_ids.len(), 2);
    assert_eq!(query.player_names, ["Zen", "Alpha"]);
    assert_eq!(query.player_ids, ["steam:abc123"]);
    assert_eq!(query.playlist, ["ranked-doubles"]);
    assert_eq!(query.game_modes, ["private"]);
    assert_eq!(query.maps, ["stadium_p"]);
    assert_eq!(query.pro, Some(true));
    assert_eq!(
        query.uploader.as_deref(),
        Some("019e5336-5e24-7281-8267-189914aa46b5")
    );
    assert_eq!(
        query.group.as_deref(),
        Some("019e5336-650b-770a-bd81-7d09c6e4afe9")
    );
    assert_eq!(
        query.project.as_deref(),
        Some("019e5336-7351-7839-b952-bfc954274e78")
    );
    assert_eq!(query.review_status.as_deref(), Some("unreviewed"));
    assert_eq!(query.min_confidence, Some(0.7));
    assert_eq!(query.replay_id, Some(replay_id));
    assert_eq!(query.player_id.as_deref(), Some("steam:abc123"));
    assert_eq!(
        query.created_after.unwrap().to_rfc3339(),
        "2026-06-01T00:00:00+00:00"
    );
    assert_eq!(
        query.replay_date_after.unwrap().to_rfc3339(),
        "2026-05-01T00:00:00+00:00"
    );
    assert_eq!(
        query.event_created_after.unwrap().to_rfc3339(),
        "2026-04-01T00:00:00+00:00"
    );
    assert_eq!(query.count, Some(1000));
    assert_eq!(query.offset, Some(25));
}

#[test]
fn review_status_accepts_accepted_as_confirmed_alias() {
    assert_eq!(normalize_review_status("accepted").unwrap(), "confirmed");
    assert_eq!(
        normalize_review_status_filter("accepted")
            .unwrap()
            .as_deref(),
        Some("confirmed")
    );
}

#[test]
fn reviewed_mechanic_normalizes_to_event_type_key() {
    assert_eq!(
        normalize_reviewed_event_type_key("speed_flip").unwrap(),
        "speed_flip"
    );
    assert_eq!(
        normalize_reviewed_event_type_key("mechanic.center").unwrap(),
        "center"
    );
    assert_eq!(normalize_reviewed_event_type_key("touch").unwrap(), "touch");
}

#[test]
fn event_type_catalog_is_code_defined_and_canonical() {
    let event_types = code_defined_event_types();
    let event_type = |key: &str| event_types.iter().find(|event_type| event_type.key == key);

    assert_eq!(event_type("center").unwrap().category, "mechanic");
    assert!(event_type("mechanic.center").is_none());
    assert_eq!(event_type("air_dribble").unwrap().category, "mechanic");
    assert!(event_type("goal_tag_air_dribble_goal").is_none());
    assert_eq!(event_type("boost_pickup").unwrap().category, "other");
    assert!(event_type("boost_pickup_both").is_none());
    assert_eq!(
        event_type("rotation_role_first_man").unwrap().category,
        "positioning"
    );
    assert_eq!(event_type("goal").unwrap().category, "core");

    assert!(event_type("timeline").is_none());
    assert!(event_type("mechanics").is_none());
    assert!(event_type("boost_pickups").is_none());
    assert!(event_type("rotation_role_span").is_none());
}

#[test]
fn event_evaluation_options_parse_candidate_run_and_tolerances() {
    let analysis_run_id = Uuid::parse_str("019e5336-5e24-7281-8267-189914aa46b5").unwrap();
    let options = EventEvaluationOptions::from_raw_query(Some(
        "analysis-run-id=019e5336-5e24-7281-8267-189914aa46b5&frame-tolerance=45&time-tolerance-seconds=1.25",
    ))
    .unwrap();

    assert_eq!(options.candidate_analysis_run_id, Some(analysis_run_id));
    assert_eq!(options.frame_tolerance, 45);
    assert_eq!(options.time_tolerance_seconds, 1.25);
}

#[test]
fn event_evaluation_options_reject_negative_tolerances() {
    let error = EventEvaluationOptions::from_raw_query(Some("frame-tolerance=-1")).unwrap_err();
    assert_eq!(error.status, StatusCode::BAD_REQUEST);
    assert!(error.message.contains("frame-tolerance"));

    let error =
        EventEvaluationOptions::from_raw_query(Some("time-tolerance-seconds=-0.1")).unwrap_err();
    assert_eq!(error.status, StatusCode::BAD_REQUEST);
    assert!(error.message.contains("time-tolerance-seconds"));
}

#[test]
fn reviewed_ratio_is_empty_when_denominator_is_zero() {
    assert_eq!(ratio(0, 0), None);
    assert_eq!(ratio(3, 4), Some(0.75));
}

fn url_query_pairs(url: &str) -> Vec<(String, String)> {
    let query = url.split_once('?').map(|(_, query)| query).unwrap_or("");
    url::form_urlencoded::parse(query.as_bytes())
        .map(|(key, value)| (key.into_owned(), value.into_owned()))
        .collect()
}

#[test]
fn mechanic_events_query_still_accepts_legacy_mechanic_fields() {
    let query =
        MechanicEventsQuery::from_raw_query(Some("mechanic=wavedash&mechanic=speed_flip")).unwrap();

    assert_eq!(query.mechanic, ["wavedash", "speed_flip"]);
}

#[test]
fn event_type_filters_include_exact_flat_keys() {
    let filters = MechanicEventFilters::from_query(MechanicEventsQuery {
        event_ids: Vec::new(),
        mechanic: vec![
            "touch".to_owned(),
            "speed_flip".to_owned(),
            "mechanic.center".to_owned(),
        ],
        event_category: vec!["event".to_owned()],
        detector: Vec::new(),
        review_status: None,
        min_confidence: None,
        replay_id: None,
        player_id: None,
        count: None,
        offset: None,
        ..MechanicEventsQuery::default()
    })
    .unwrap();

    assert_eq!(filters.event_type_keys(), ["center", "speed_flip", "touch"]);
    assert_eq!(filters.event_categories, ["event"]);
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
        count: 50,
        offset: 100,
        ..MechanicEventFilters::default()
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
        count: 2,
        offset: 4,
        ..MechanicEventFilters::default()
    };
    let events = (0..2)
        .map(|index| MechanicEventResponse {
            id: Uuid::now_v7(),
            replay_id,
            replay_label: None,
            analysis_run_id,
            event_type: "speed_flip".to_owned(),
            event_type_label: "Speed Flip".to_owned(),
            event_category: "event".to_owned(),
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
            event_type: "speed_flip".to_owned(),
            event_type_label: "Speed Flip".to_owned(),
            event_category: "event".to_owned(),
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
    assert_eq!(item.label, "Fast Player - Speed Flip review item 1");
    assert_eq!(item.meta.event_category, "mechanic");
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
            event_type: "speed_flip".to_owned(),
            event_type_label: "Speed Flip".to_owned(),
            event_category: "event".to_owned(),
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
    assert_eq!(item.label, "Speed Flip review item 1");
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
            event_type: "touch".to_owned(),
            event_type_label: "Ball Touch".to_owned(),
            event_category: "event".to_owned(),
            mechanic: "touch".to_owned(),
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
    assert_eq!(item.meta.event_type, "touch");
    assert_eq!(item.meta.event_type_label, "Ball Touch");
    assert_eq!(item.meta.event_category, "other");
    assert_eq!(item.meta.mechanic, "touch");
    assert_eq!(item.meta.mechanic_label, "Ball Touch");
    assert_eq!(item.meta.team.as_deref(), Some("orange"));
}

#[test]
fn stale_event_categories_are_canonicalized_by_event_type_key() {
    assert_eq!(canonical_event_type_key("mechanic.center"), "center");
    assert_eq!(
        canonical_event_type_category("speed_flip", "event"),
        "mechanic"
    );
    assert_eq!(
        canonical_event_type_category("goal_context", "core"),
        "context"
    );
    assert_eq!(
        canonical_event_type_category("core_player_scoreboard", "core"),
        "context"
    );
    assert_eq!(canonical_event_type_category("whiff", "mechanic"), "other");
    assert_eq!(
        canonical_event_type_category("boost_ledger_collected", "event"),
        "boost"
    );
    assert_eq!(
        canonical_event_type_category("rotation_role_first_man", "event"),
        "positioning"
    );
    assert_eq!(canonical_event_type_category("touch", "event"), "other");
    assert_eq!(
        canonical_event_type_category("touch_ball_movement", "contact"),
        "other"
    );
    assert_eq!(
        canonical_event_type_category("controlled_play", "event"),
        "mechanic"
    );
}

fn missed_event_review_request() -> CreateMissedEventReviewRequest {
    CreateMissedEventReviewRequest {
        replay_id: Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap(),
        reviewed_mechanic: "flick".to_owned(),
        reviewed_subject_kind: Some("player".to_owned()),
        reviewed_subject_id: Some("steam:76561198298819443".to_owned()),
        reviewed_event_frame: 1187,
        reviewed_start_frame: Some(1182),
        reviewed_end_frame: Some(1190),
        reviewed_event_time: Some(52.89),
        confidence: Some(1.0),
        notes: Some("clear flick the engine missed".to_owned()),
        status: None,
        context: Some(serde_json::json!({ "ball": [-784.0, -3182.0, 204.0] })),
    }
}

#[test]
fn missed_event_review_validates_a_well_formed_request() {
    assert!(validate_missed_event_review_request(&missed_event_review_request()).is_ok());
}

#[test]
fn missed_event_review_rejects_unknown_subject_kind() {
    let mut request = missed_event_review_request();
    request.reviewed_subject_kind = Some("car".to_owned());
    assert!(validate_missed_event_review_request(&request).is_err());
}

#[test]
fn missed_event_review_rejects_event_frame_outside_span() {
    let mut request = missed_event_review_request();
    request.reviewed_event_frame = 2000;
    assert!(validate_missed_event_review_request(&request).is_err());
}

#[test]
fn missed_event_review_rejects_out_of_range_confidence() {
    let mut request = missed_event_review_request();
    request.confidence = Some(1.5);
    assert!(validate_missed_event_review_request(&request).is_err());
}

#[test]
fn missed_event_snapshot_records_source_subject_and_frames() {
    let request = missed_event_review_request();
    let reviewer = Uuid::parse_str("019e5336-5e24-7281-8267-189914aa46b5").unwrap();
    let snapshot = build_missed_event_snapshot(&request, "flick", "confirmed", reviewer);

    assert_eq!(
        snapshot["source"].as_str(),
        Some(MISSED_EVENT_REVIEW_SOURCE)
    );
    assert_eq!(snapshot["authored"].as_bool(), Some(true));
    assert_eq!(snapshot["eventType"]["key"].as_str(), Some("flick"));
    assert_eq!(snapshot["primarySubject"]["kind"].as_str(), Some("player"));
    assert_eq!(snapshot["frames"]["event"].as_i64(), Some(1187));
    assert_eq!(snapshot["frames"]["start"].as_i64(), Some(1182));
    assert_eq!(snapshot["times"]["event"].as_f64(), Some(52.89));
    assert!(snapshot["context"].is_object());
}
