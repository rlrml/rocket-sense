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
