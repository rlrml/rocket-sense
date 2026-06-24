use super::*;

#[test]
fn movement_query_parses_replay_set_filters_and_player() {
    let query = MovementStatsQuery::from_raw_query(
        Some("team-size=2&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
        true,
    )
    .expect("movement query should parse");

    assert_eq!(query.replay_set.team_sizes, [2]);
    assert_eq!(query.player.platform, "steam");
    assert_eq!(query.player.platform_player_id, "76561198000000000");
    assert!(query.materialized);
}

#[test]
fn movement_query_requires_player() {
    assert!(MovementStatsQuery::from_raw_query(Some("team-size=2"), None, true).is_err());
}

#[test]
fn movement_query_parses_materialized_override() {
    let query = MovementStatsQuery::from_raw_query(
        Some("player-id=Steam:76561198000000000&materialized=false"),
        None,
        true,
    )
    .expect("movement query should parse");

    assert!(!query.materialized);
}

#[test]
fn movement_summary_query_splits_cohorts_and_reads_movement_facets() {
    let query = MovementStatsQuery::from_raw_query(
        Some("team-size=3&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
        true,
    )
    .expect("movement query should parse");
    let builder = build_movement_summary_query(&query);
    let sql = builder.sql();

    assert!(sql.contains("WHEN concat(actor.platform, ':', actor.platform_player_id) = ta.target_subject_id THEN 'self'"));
    assert!(sql.contains("WHEN actor.team = ta.target_team THEN 'teammate'"));
    assert!(sql.contains("ELSE 'opponent'"));
    assert!(sql.contains("event.source_stream = ANY("));
    assert!(sql.contains("event_type.key = ANY("));
    assert!(sql.contains("total_distance"));
    assert!(sql.contains("avg_speed"));
    assert!(sql.contains("time_ground"));
    assert!(sql.contains("THEN duration ELSE 0 END"));
    assert!(sql.contains("speed_flip"));
    assert!(sql.contains("GROUP BY cohort"));
}

#[test]
fn materialized_movement_summary_avoids_play_event_scan() {
    let query = MovementStatsQuery::from_raw_query(
        Some("team-size=3&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
        true,
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
fn movement_aggregate_references_duration_column_not_raw_event_columns() {
    // Regression: the per-state second expressions are summed in event_aggregates,
    // which is FROM movement_events -- a CTE that projects a `duration` column.
    // They must reference that column, not event.duration_seconds / event.start_time
    // (only in scope inside movement_events), or Postgres rejects the whole query
    // with "missing FROM-clause entry for table \"event\"" and the movement tab 500s.
    let query = MovementStatsQuery::from_raw_query(
        Some("team-size=3&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
        false,
    )
    .expect("movement query should parse");
    let sql = build_movement_summary_query(&query).sql().to_owned();

    // The `event` table (play_events) is only joined inside movement_events. From
    // event_aggregates onward the query reads movement_events' projected columns
    // (duration, event_type, payload), so no `event.` table reference may appear
    // there -- one is what 500'd the tab with "missing FROM-clause entry".
    let aggregate_start = sql
        .find("event_aggregates AS")
        .expect("query should define event_aggregates");
    let after = &sql[aggregate_start..];
    assert!(
        !after.contains("event."),
        "event_aggregates (FROM movement_events) must not reference the `event` table:\n{after}"
    );
}

#[test]
fn movement_summary_streams_cover_movement_spans() {
    let streams = movement_summary_streams();
    assert!(streams.iter().any(|stream| stream == "movement"));
    assert!(streams.iter().any(|stream| stream == "powerslide"));
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
