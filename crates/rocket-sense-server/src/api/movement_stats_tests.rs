use super::*;

#[test]
fn movement_query_parses_replay_set_filters_and_player() {
    let query = MovementStatsQuery::from_raw_query(
        Some("team-size=2&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("movement query should parse");

    assert_eq!(query.replay_set.team_sizes, [2]);
    assert_eq!(query.player.platform, "steam");
    assert_eq!(query.player.platform_player_id, "76561198000000000");
}

#[test]
fn movement_query_requires_player() {
    assert!(MovementStatsQuery::from_raw_query(Some("team-size=2"), None).is_err());
}

#[test]
fn materialized_movement_summary_avoids_play_event_scan() {
    let query = MovementStatsQuery::from_raw_query(
        Some("team-size=3&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("movement query should parse");
    let builder = build_movement_summary_query_materialized(&query);
    let sql = builder.sql();

    assert!(sql.contains("FROM player_replay_movement movement"));
    assert!(sql.contains("'self'::text AS cohort"));
    assert!(sql.contains("'teammate'::text AS cohort"));
    assert!(sql.contains("'opponent'::text AS cohort"));
    assert!(!sql.contains("play_events"));
    assert!(!sql.contains("play_event_payloads"));
}

#[test]
fn movement_materialization_migration_creates_backfilled_table() {
    let migration = include_str!("../../../../migrations/0066_player_replay_movement.sql");

    assert!(migration.contains("CREATE TABLE player_replay_movement"));
    assert!(migration.contains("CREATE FUNCTION rocket_sense_movement_seconds"));
    assert!(migration.contains("player_replay_movement_player_idx"));
    assert!(migration.contains("player_replay_movement_replay_idx"));
    assert!(!migration.contains("INSERT INTO player_replay_movement"));
}
