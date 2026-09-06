use super::*;

#[tokio::test]
#[ignore = "requires RS_REPROCESS_TEST_DATABASE_URL"]
async fn reprocess_selection_respects_force_and_replay_filter() {
    let database_url = std::env::var("RS_REPROCESS_TEST_DATABASE_URL").expect("test database URL");
    let pool = sqlx::postgres::PgPoolOptions::new()
        .max_connections(1)
        .connect(&database_url)
        .await
        .expect("connect to test database");

    // Temporary tables keep these selection fixtures isolated from other DB tests.
    sqlx::raw_sql(
        r#"
        CREATE TEMP TABLE replays (
            id uuid, canonical_analysis_run_id uuid,
            created_at timestamptz DEFAULT now()
        );
        CREATE TEMP TABLE analysis_runs (
            id uuid, status text, event_stream_schema_version text,
            event_stream_object_key text
        );
        CREATE TEMP TABLE play_events (analysis_run_id uuid);
        INSERT INTO replays (id, canonical_analysis_run_id)
        SELECT lpad(n::text, 32, '0')::uuid,
               CASE WHEN n > 1 THEN lpad(n::text, 32, '0')::uuid END
        FROM generate_series(1, 4) n;
        INSERT INTO analysis_runs (id, status, event_stream_object_key)
        SELECT canonical_analysis_run_id, 'succeeded', 'events.json'
        FROM replays WHERE canonical_analysis_run_id IS NOT NULL;
        INSERT INTO play_events
        SELECT id FROM analysis_runs
        WHERE id <> '00000000-0000-0000-0000-000000000004';
        "#,
    )
    .execute(&pool)
    .await
    .expect("create replay selection fixtures");
    sqlx::query(
        "UPDATE analysis_runs SET event_stream_schema_version = CASE
         WHEN id = '00000000-0000-0000-0000-000000000003' THEN 'outdated'
         ELSE $1 END",
    )
    .bind(EVENT_STREAM_SCHEMA_VERSION)
    .execute(&pool)
    .await
    .expect("set fixture versions");

    let [unparsed, current, outdated, unindexed] = [1, 2, 3, 4].map(Uuid::from_u128);
    for (force, replay_ids, expected) in [
        (false, vec![], vec![unparsed, outdated, unindexed]),
        (true, vec![], vec![unparsed, current, outdated, unindexed]),
        (false, vec![current, outdated], vec![outdated]),
        (true, vec![current, outdated], vec![current, outdated]),
        (true, vec![Uuid::from_u128(5)], vec![]),
    ] {
        let options = ReplayReprocessOptions {
            replay_ids,
            force,
            concurrency: 1,
        };
        assert_eq!(
            reprocess_replay_ids(&pool, &options).await.unwrap(),
            expected,
            "selection for {options:?}"
        );
    }
}

#[tokio::test]
#[ignore = "requires RS_REPROCESS_TEST_DATABASE_URL"]
async fn profile_timing_backfill_selection_and_stream_cleanup() {
    let database_url = std::env::var("RS_REPROCESS_TEST_DATABASE_URL").expect("test database URL");
    let pool = sqlx::postgres::PgPoolOptions::new()
        .max_connections(1)
        .connect(&database_url)
        .await
        .expect("connect to test database");
    sqlx::raw_sql(
        r#"
        CREATE TEMP TABLE replays (
            id uuid, canonical_analysis_run_id uuid, storage_key text,
            created_at timestamptz DEFAULT now()
        );
        CREATE TEMP TABLE play_events (
            analysis_run_id uuid, replay_id uuid, source_stream text
        );
        INSERT INTO replays
        SELECT lpad(n::text, 32, '0')::uuid,
               CASE WHEN n > 1 THEN lpad(n::text, 32, '0')::uuid END,
               'replay-' || n, now()
        FROM generate_series(1, 5) n;
        INSERT INTO play_events
        SELECT id, id, stream FROM replays
        CROSS JOIN (VALUES ('player_activity'), ('positioning_distance')) streams(stream)
        WHERE storage_key IN ('replay-3', 'replay-5');
        INSERT INTO play_events
        SELECT id, id, stream FROM replays
        CROSS JOIN (VALUES ('rotation_role'), ('ball_depth')) streams(stream)
        WHERE storage_key IN ('replay-4', 'replay-5');
        "#,
    )
    .execute(&pool)
    .await
    .expect("create backfill fixtures");

    for (force, replay_ids, expected) in [
        (
            false,
            vec![],
            vec![(2, true, true), (3, false, true), (4, true, false)],
        ),
        (
            true,
            vec![],
            vec![
                (2, true, true),
                (3, true, true),
                (4, true, true),
                (5, true, true),
            ],
        ),
        (false, vec![4, 5], vec![(4, true, false)]),
        (true, vec![5], vec![(5, true, true)]),
        (true, vec![1], vec![]),
    ] {
        let options = ReplayProfileTimingBackfillOptions {
            replay_ids: replay_ids.into_iter().map(Uuid::from_u128).collect(),
            force,
            concurrency: 1,
        };
        let targets = profile_timing_backfill_targets(&pool, &options)
            .await
            .unwrap();
        let actual = targets
            .into_iter()
            .map(|target| {
                (
                    target.replay_id.as_u128(),
                    target.needs_positioning,
                    target.needs_rotation_spans,
                )
            })
            .collect::<Vec<_>>();
        assert_eq!(actual, expected, "selection for {options:?}");
    }

    delete_profile_timing_streams(&pool, Uuid::from_u128(5), &["rotation_role", "ball_depth"])
        .await
        .unwrap();
    let remaining: Vec<String> = sqlx::query_scalar(
        "SELECT source_stream FROM play_events WHERE analysis_run_id = $1 ORDER BY source_stream",
    )
    .bind(Uuid::from_u128(5))
    .fetch_all(&pool)
    .await
    .unwrap();
    assert_eq!(remaining, ["player_activity", "positioning_distance"]);
    for (replay_id, expected) in [(3, 0), (4, 2)] {
        assert_eq!(
            delete_materialized_dense_stream_events(
                &pool,
                Uuid::from_u128(4),
                Uuid::from_u128(replay_id)
            )
            .await
            .unwrap(),
            expected,
        );
    }
}
