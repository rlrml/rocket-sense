use super::*;
use uuid::Uuid;

#[tokio::test]
async fn refresh_rebuilds_an_empty_database() {
    let Ok(database_url) = std::env::var("ROCKET_SENSE_TEST_DATABASE_URL") else {
        return;
    };
    let pool = rocket_sense_db::connect(&database_url)
        .await
        .expect("test database should connect");
    rocket_sense_db::run_migrations(&pool)
        .await
        .expect("test migrations should run");

    let summary = refresh(&pool)
        .await
        .expect("empty cache refresh should succeed")
        .expect("test should acquire the refresh lock");

    assert_eq!(summary.windows, 0);
    assert_eq!(summary.player_rows, 0);
    assert_eq!(summary.metric_rows, 0);

    let replay_id = Uuid::now_v7();
    let analysis_run_id = Uuid::now_v7();
    sqlx::query(
        r#"
        INSERT INTO replays (
            id, file_sha256, byte_size, storage_byte_size, storage_key, playlist,
            replay_game_type, season, replay_date
        )
        VALUES ($1, 'leaderboard-cache-test', 1, 1, 'test.replay',
                'ranked-duels', 'ranked', 'f23', now())
        "#,
    )
    .bind(replay_id)
    .execute(&pool)
    .await
    .expect("test replay should insert");
    sqlx::query(
        r#"
        INSERT INTO analysis_runs (
            id, replay_id, status, extractor_name, extractor_version,
            input_file_sha256, event_stream_schema_version, finished_at
        )
        VALUES ($1, $2, 'succeeded', 'test', '1',
                'leaderboard-cache-test', 'test', now())
        "#,
    )
    .bind(analysis_run_id)
    .bind(replay_id)
    .execute(&pool)
    .await
    .expect("test analysis run should insert");
    sqlx::query("UPDATE replays SET canonical_analysis_run_id = $2 WHERE id = $1")
        .bind(replay_id)
        .bind(analysis_run_id)
        .execute(&pool)
        .await
        .expect("test replay should become canonical");

    let player_id = Uuid::now_v7();
    for (id, platform_player_id, team, goals) in [
        (player_id, "player-one", 0, 2),
        (Uuid::now_v7(), "player-two", 1, 0),
    ] {
        sqlx::query(
            r#"
            INSERT INTO replay_players (
                id, replay_id, name, platform, platform_player_id,
                team, active_time_seconds, goals, assists, saves, shots
            )
            VALUES ($1, $2, $3, 'steam', $3, $4, 300.0, $5, 0, 0, 0)
            "#,
        )
        .bind(id)
        .bind(replay_id)
        .bind(platform_player_id)
        .bind(team)
        .bind(goals)
        .execute(&pool)
        .await
        .expect("test replay player should insert");
    }
    sqlx::query(
        r#"
        INSERT INTO player_replay_stat_facts (
            analysis_run_id, replay_id, replay_player_id, player_subject_id,
            platform, platform_player_id, team, stat_key, value, unit,
            active_time_seconds, denominator_key, denominator_value
        )
        VALUES ($1, $2, $3, 'steam:player-one', 'steam', 'player-one', 0,
                'possession-time', 30.0, 'seconds', 300.0, 'active_time', 300.0)
        "#,
    )
    .bind(analysis_run_id)
    .bind(replay_id)
    .bind(player_id)
    .execute(&pool)
    .await
    .expect("test stat fact should insert");

    let summary = refresh(&pool)
        .await
        .expect("populated cache refresh should succeed")
        .expect("test should reacquire the refresh lock");
    assert_eq!(summary.windows, 3);
    assert_eq!(summary.player_rows, 48);
    assert_eq!(summary.metric_rows, 48);

    let cached_goal: (f64, i64, f64) = sqlx::query_as(
        r#"
        SELECT total_value, replay_count, value_per_5_minutes
        FROM leaderboard_player_window_metrics
        WHERE window_key = 'trailing-7d'
          AND scope_game_type = '*'
          AND scope_team_size = 0
          AND scope_playlist = '*'
          AND platform = 'steam'
          AND platform_player_id = 'player-one'
          AND metric_kind = 'event'
          AND metric_key = 'goal'
        "#,
    )
    .fetch_one(&pool)
    .await
    .expect("goal cache row should exist");
    assert_eq!(cached_goal, (2.0, 1, 2.0));
}
