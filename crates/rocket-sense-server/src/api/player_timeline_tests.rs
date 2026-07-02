use super::*;
use chrono::TimeZone;

fn point(minutes: i64) -> PlayerTimelinePoint {
    PlayerTimelinePoint {
        replay_id: Uuid::nil(),
        replay_date: Utc.with_ymd_and_hms(2026, 7, 1, 12, 0, 0).unwrap()
            + Duration::minutes(minutes),
        playlist_group: Some("ranked-2v2".to_owned()),
        season: Some("f23".to_owned()),
        rank_tier: None,
        rank_division: None,
        rank_mmr: None,
        rank_is_fallback: false,
        outcome: None,
        session_index: 0,
    }
}

#[test]
fn player_timeline_query_requires_player_id() {
    let error = PlayerTimelineQuery::from_raw_query(Some("playlist=Online"), None)
        .expect_err("timeline should require a player id");
    assert!(format!("{error:?}").contains("player-id"));
}

#[test]
fn player_timeline_query_parses_defaults_and_filters() {
    let query = PlayerTimelineQuery::from_raw_query(
        Some("player-id=Steam:76561198000000000&team-size=2v2&game-type=ranked"),
        None,
    )
    .expect("timeline query should parse");

    assert_eq!(query.player.platform, "steam");
    assert_eq!(query.player.platform_player_id, "76561198000000000");
    assert_eq!(query.replay_set.team_sizes, [2]);
    assert_eq!(query.replay_set.game_types, ["ranked"]);
    assert_eq!(query.session_gap_minutes, DEFAULT_SESSION_GAP_MINUTES);
    assert_eq!(query.limit, DEFAULT_POINT_LIMIT);
    assert!(!query.wants_current_season);
}

#[test]
fn player_timeline_query_clamps_gap_and_limit() {
    let query = PlayerTimelineQuery::from_raw_query(
        Some("player-id=steam:1&session-gap-minutes=1&limit=999999"),
        None,
    )
    .expect("timeline query should parse");
    assert_eq!(query.session_gap_minutes, MIN_SESSION_GAP_MINUTES);
    assert_eq!(query.limit, MAX_POINT_LIMIT);

    let error = PlayerTimelineQuery::from_raw_query(
        Some("player-id=steam:1&session-gap-minutes=soon"),
        None,
    )
    .expect_err("non-numeric gap should be rejected");
    assert!(format!("{error:?}").contains("session-gap-minutes"));
}

#[test]
fn player_timeline_query_extracts_current_season_sentinel() {
    let query = PlayerTimelineQuery::from_raw_query(
        Some("player-id=steam:1&season=Current&season=f22"),
        None,
    )
    .expect("timeline query should parse");
    assert!(query.wants_current_season);
    // The sentinel is removed; concrete codes still filter directly.
    assert_eq!(query.replay_set.seasons, ["f22"]);
}

#[test]
fn assign_sessions_splits_on_gap_but_not_at_threshold() {
    // Games at +0, +30 (exactly the gap: same session), +75 (new session).
    let mut points = vec![point(0), point(30), point(75)];
    points[0].outcome = Some("win".to_owned());
    points[1].outcome = Some("loss".to_owned());

    let sessions = assign_sessions(&mut points, 30);

    assert_eq!(sessions.len(), 2);
    assert_eq!(points[0].session_index, 0);
    assert_eq!(points[1].session_index, 0);
    assert_eq!(points[2].session_index, 1);
    assert_eq!(sessions[0].replay_count, 2);
    assert_eq!(sessions[0].wins, 1);
    assert_eq!(sessions[0].losses, 1);
    assert_eq!(sessions[0].start, points[0].replay_date);
    assert_eq!(sessions[0].end, points[1].replay_date);
    assert_eq!(sessions[1].replay_count, 1);
}

#[test]
fn assign_sessions_handles_single_and_tied_timestamps() {
    let mut single = vec![point(0)];
    let sessions = assign_sessions(&mut single, 30);
    assert_eq!(sessions.len(), 1);
    assert_eq!(sessions[0].replay_count, 1);

    // Identical timestamps (zero gap) never open a new session.
    let mut tied = vec![point(0), point(0)];
    let sessions = assign_sessions(&mut tied, 30);
    assert_eq!(sessions.len(), 1);
    assert_eq!(sessions[0].replay_count, 2);
}

#[test]
fn assign_sessions_tracks_direct_mmr_only() {
    let mut points = vec![point(0), point(10), point(20)];
    points[0].rank_mmr = Some(900.0);
    points[1].rank_mmr = Some(910.0);
    points[1].rank_is_fallback = true; // carried forward, must not count
    points[2].rank_mmr = Some(920.0);

    let sessions = assign_sessions(&mut points, 30);
    assert_eq!(sessions[0].start_mmr, Some(900.0));
    assert_eq!(sessions[0].end_mmr, Some(920.0));
}

#[test]
fn fill_fallback_ranks_carries_forward_within_playlist_group() {
    let mut points = vec![point(0), point(10), point(20), point(30)];
    points[0].rank_mmr = Some(900.0);
    points[0].rank_tier = Some(14);
    points[0].rank_division = Some(2);
    points[2].playlist_group = Some("ranked-3v3".to_owned());
    points[3].playlist_group = None;

    fill_fallback_ranks(&mut points);

    // Same group: carried forward and marked as fallback.
    assert_eq!(points[1].rank_mmr, Some(900.0));
    assert_eq!(points[1].rank_tier, Some(14));
    assert_eq!(points[1].rank_division, Some(2));
    assert!(points[1].rank_is_fallback);
    // Different group: no earlier submission to carry.
    assert_eq!(points[2].rank_mmr, None);
    assert!(!points[2].rank_is_fallback);
    // Unknown group: left untouched.
    assert_eq!(points[3].rank_mmr, None);
    assert!(!points[3].rank_is_fallback);
}
