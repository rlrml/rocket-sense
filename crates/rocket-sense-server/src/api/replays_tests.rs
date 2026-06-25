use super::*;
use super::{accumulate_group_boost_tracks, boost_band_index, GroupBoostAccumulator};
use std::collections::HashMap as TestHashMap;

#[test]
fn subtr_actor_viewer_assets_are_embedded_with_browser_content_types() {
    assert_index_assets_are_embedded(SUBTR_ACTOR_VIEWER_INDEX, "assets/");
    assert!(subtr_actor_asset("assets/missing.js").is_none());
}

#[test]
fn subtr_actor_stats_assets_are_embedded_with_browser_content_types() {
    assert_index_assets_are_embedded(SUBTR_ACTOR_STATS_INDEX, "stats/assets/");
    assert!(subtr_actor_asset("stats/assets/missing.js").is_none());
}

#[test]
fn subtr_actor_review_assets_are_embedded_with_browser_content_types() {
    assert_index_assets_are_embedded(SUBTR_ACTOR_REVIEW_INDEX, "review/assets/");
    assert!(subtr_actor_asset("review/assets/missing.js").is_none());
}

#[test]
fn subtr_actor_viewer_runtime_assets_are_embedded_with_browser_content_types() {
    let stadium = subtr_actor_asset("models/stadium/stadium.glb")
        .expect("viewer stadium model should be embedded");
    assert_eq!(stadium.content_type, "model/gltf-binary");
    assert!(!stadium.bytes.is_empty());

    let draco = subtr_actor_asset("draco/draco_decoder.js")
        .expect("viewer draco decoder should be embedded");
    assert_eq!(draco.content_type, "application/javascript; charset=utf-8");
    assert!(!draco.bytes.is_empty());

    // The viewer renders the arena environment, so its skybox HDR must be
    // embedded and reachable at `/subtr-actor/skyboxes/...`.
    let skybox = subtr_actor_asset("skyboxes/PlanetaryEarth4k.hdr")
        .expect("viewer skybox should be embedded");
    assert!(!skybox.bytes.is_empty());
}

#[test]
fn subtr_actor_shared_3d_assets_resolve_under_every_app_prefix() {
    // The root viewer, stats, and review apps each load with their own base URL
    // and fetch the (byte-identical) 3D asset set under their own prefix. Every
    // prefix must resolve, and to the *same* embedded bytes — the build-time
    // dedup means there is one copy aliased by all three, not three copies.
    let base = subtr_actor_asset("models/ball/scene.gltf").expect("root models should be embedded");
    for prefix in ["stats/", "review/"] {
        let aliased = subtr_actor_asset(&format!("{prefix}models/ball/scene.gltf"))
            .unwrap_or_else(|| panic!("{prefix}models/ball/scene.gltf should be embedded"));
        assert!(
            std::ptr::eq(aliased.bytes.as_ptr(), base.bytes.as_ptr()),
            "{prefix}models should alias the shared embedded copy, not duplicate it"
        );
        assert!(subtr_actor_asset(&format!("{prefix}skyboxes/PlanetaryEarth4k.hdr")).is_some());
    }
}

#[test]
fn public_router_builds_without_route_conflicts() {
    // The single `/subtr-actor/{*asset_path}` wildcard coexists with the static
    // SPA index routes and the root `/models` + `/draco` aliases. Building the
    // router asserts none of these conflict (axum panics on conflict).
    let _ = public_router();
}

#[test]
fn subtr_actor_stats_index_serves_report_app() {
    assert!(SUBTR_ACTOR_STATS_INDEX.contains("subtr-actor stats report"));
    assert!(asset_paths(SUBTR_ACTOR_STATS_INDEX)
        .iter()
        .any(|path| path.ends_with(".js")));
    assert!(asset_paths(SUBTR_ACTOR_STATS_INDEX)
        .iter()
        .any(|path| path.ends_with(".css")));
}

#[test]
fn subtr_actor_review_index_serves_event_review_player() {
    assert!(SUBTR_ACTOR_REVIEW_INDEX.contains("stat evaluation player"));
    assert!(asset_paths(SUBTR_ACTOR_REVIEW_INDEX)
        .iter()
        .any(|path| path.ends_with(".js")));
}

fn assert_index_assets_are_embedded(index: &str, prefix: &str) {
    let paths = asset_paths(index);
    assert!(!paths.is_empty());
    for path in paths {
        let key = format!("{prefix}{path}");
        let asset = subtr_actor_asset(&key).unwrap_or_else(|| panic!("missing asset {key}"));
        if path.ends_with(".css") {
            assert_eq!(asset.content_type, "text/css; charset=utf-8");
        } else if path.ends_with(".js") {
            assert_eq!(asset.content_type, "application/javascript; charset=utf-8");
            assert!(!asset.bytes.is_empty());
        } else if path.ends_with(".wasm") {
            assert_eq!(asset.content_type, "application/wasm");
            assert!(asset.bytes.len() > 1_000_000);
        }
    }
}

fn asset_paths(index: &str) -> Vec<String> {
    let mut paths = Vec::new();
    let mut rest = index;
    while let Some(start) = rest.find("./assets/") {
        let after_prefix = &rest[start + "./assets/".len()..];
        let Some(end) = after_prefix.find(['"', '\'']) else {
            break;
        };
        paths.push(after_prefix[..end].to_owned());
        rest = &after_prefix[end..];
    }
    paths
}

#[test]
fn subtr_actor_review_without_trailing_slash_redirects_to_slash() {
    assert_eq!(
        subtr_actor_review_trailing_slash_url(Some("playlist=/api/v1/events/review-playlist")),
        "/subtr-actor/review/?playlist=/api/v1/events/review-playlist"
    );
    assert_eq!(
        subtr_actor_review_trailing_slash_url(None),
        "/subtr-actor/review/"
    );
}

#[test]
fn replay_select_includes_uploader_profile() {
    let sql = replay_select_sql("WHERE r.id = $1");

    assert!(sql.contains("LEFT JOIN users uploader ON uploader.id = r.uploaded_by_user_id"));
    assert!(sql.contains("uploader.primary_email AS uploader_primary_email"));
    assert!(sql.contains("uploader.display_name AS uploader_display_name"));
    assert!(sql.contains("AS uploader_provider"));
    assert!(sql.contains("FROM auth_identities ai"));
}

#[test]
fn replay_select_includes_players_without_stats_blob_join() {
    let sql = replay_select_sql("WHERE r.id = $1");

    assert!(sql.contains("jsonb_build_object"));
    assert!(sql.contains("FROM replay_players player"));
    assert!(sql.contains("'rank_tier', COALESCE(player.rank_tier, rank_fallback.tier)"));
    assert!(sql.contains(
        "'rank_is_fallback', player.rank_tier IS NULL AND rank_fallback.tier IS NOT NULL"
    ));
    assert!(sql.contains("'rank_fallback_replay_date'"));
    assert!(sql.contains("FROM replay_player_rank_submissions s"));
    assert!(sql.contains("'score', player.score"));
    assert!(sql.contains("'goals', player.goals"));
    assert!(sql.contains("'assists', player.assists"));
    assert!(sql.contains("'saves', player.saves"));
    assert!(sql.contains("'shots', player.shots"));
    assert!(!sql.contains("replay_stat_blobs"));
    assert!(!sql.contains("latest_stats"));
}

#[test]
fn replay_select_includes_processing_version_metadata() {
    let sql = replay_select_sql("WHERE r.id = $1");

    assert!(sql.contains("r.processed_at"));
    assert!(sql.contains("r.processed_with_extractor_name"));
    assert!(sql.contains("r.processed_with_extractor_version"));
    assert!(sql.contains("r.processed_with_event_stream_schema_version"));
    assert!(sql.contains("r.processed_with_rocket_sense_git_sha"));
    assert!(sql.contains("r.processed_with_subtr_actor_version"));
    assert!(sql.contains("r.processed_with_subtr_actor_git_sha"));
}

#[test]
fn replay_select_includes_game_type_metadata() {
    let sql = replay_select_sql("WHERE r.id = $1");

    assert!(sql.contains("r.replay_game_type"));
    assert!(sql.contains("r.header_match_type"));
    assert!(sql.contains("r.game_playlist_id"));
    assert!(sql.contains("r.match_type_class"));
}

#[test]
fn replay_game_type_migration_stores_normalized_and_raw_game_type_signals() {
    let migration = include_str!("../../../../migrations/0025_replay_game_type_metadata.sql");

    assert!(migration.contains("ADD COLUMN replay_game_type text"));
    assert!(migration.contains("ADD COLUMN header_match_type text"));
    assert!(migration.contains("ADD COLUMN game_playlist_id integer"));
    assert!(migration.contains("ADD COLUMN match_type_class text"));
    assert!(migration.contains("replays_replay_game_type_check"));
    assert!(migration.contains("replays_replay_game_type_created_at_idx"));
    assert!(migration.contains("replays_game_playlist_id_idx"));
}

#[test]
fn object_storage_compression_migration_tracks_raw_and_stored_sizes() {
    let migration = include_str!("../../../../migrations/0030_object_storage_compression.sql");

    assert!(migration.contains("ADD COLUMN storage_encoding text"));
    assert!(migration.contains("ADD COLUMN storage_byte_size bigint"));
    assert!(migration.contains("event_stream_storage_encoding"));
    assert!(migration.contains("event_stream_storage_byte_size"));
}

#[test]
fn replay_transfer_encoding_query_defaults_to_identity() {
    let encoding = parse_encoding_query(None, &["download-encoding"], StorageEncoding::Identity)
        .expect("missing query should use default");

    assert_eq!(encoding, StorageEncoding::Identity);
}

#[test]
fn replay_transfer_encoding_query_accepts_aliases() {
    let upload = parse_encoding_query(
        Some("upload-encoding=gz"),
        &["upload-encoding", "upload_encoding"],
        StorageEncoding::Identity,
    )
    .expect("gzip alias should parse");
    let download = parse_encoding_query(
        Some("download_encoding=zst"),
        &["download-encoding", "download_encoding"],
        StorageEncoding::Identity,
    )
    .expect("zstd alias should parse");
    let raw = parse_encoding_query(
        Some("download-encoding=raw"),
        &["download-encoding"],
        StorageEncoding::Zstd,
    )
    .expect("raw alias should parse");

    assert_eq!(upload, StorageEncoding::Gzip);
    assert_eq!(download, StorageEncoding::Zstd);
    assert_eq!(raw, StorageEncoding::Identity);
}

#[test]
fn replay_transfer_encoding_query_rejects_unknown_values() {
    let error = parse_encoding_query(
        Some("download-encoding=br"),
        &["download-encoding"],
        StorageEncoding::Identity,
    )
    .unwrap_err();

    assert_eq!(error.status, StatusCode::BAD_REQUEST);
    assert!(error.message.contains("download-encoding must be one of"));
}

#[test]
fn replay_upload_decode_rejects_compressed_bodies_over_decoded_limit() {
    let compressed =
        encode_bytes(&[b'a'; 128], StorageEncoding::Gzip).expect("test payload should compress");
    let error = decode_transfer_bytes_with_limit(compressed, StorageEncoding::Gzip, 64)
        .expect_err("expanded upload should be rejected");

    assert_eq!(error.status, StatusCode::BAD_REQUEST);
    assert!(error.message.contains("exceeds maximum size"));
}

#[test]
fn replay_upload_decode_rejects_identity_bodies_over_decoded_limit() {
    let error = decode_transfer_bytes_with_limit(
        Bytes::from(vec![b'a'; 65]),
        StorageEncoding::Identity,
        64,
    )
    .expect_err("raw upload should be rejected");

    assert_eq!(error.status, StatusCode::BAD_REQUEST);
    assert!(error.message.contains("exceeds maximum size"));
}

#[test]
fn compressed_upload_file_names_are_normalized_to_raw_replay_names() {
    assert_eq!(
        normalize_uploaded_file_name("match.replay.gz", StorageEncoding::Gzip),
        "match.replay"
    );
    assert_eq!(
        normalize_uploaded_file_name("match.replay.zst", StorageEncoding::Zstd),
        "match.replay"
    );
    assert_eq!(
        normalize_uploaded_file_name("match.replay", StorageEncoding::Identity),
        "match.replay"
    );
}

#[test]
fn compressed_download_file_names_get_encoding_suffix_once() {
    assert_eq!(
        encoded_file_name("match.replay", StorageEncoding::Gzip),
        "match.replay.gz"
    );
    assert_eq!(
        encoded_file_name("match.replay.gz", StorageEncoding::Gzip),
        "match.replay.gz"
    );
    assert_eq!(
        encoded_file_name("match.replay", StorageEncoding::Identity),
        "match.replay"
    );
}

#[test]
fn playlist_metadata_classifies_ranked_casual_and_soccar_playlists() {
    let ranked = playlist_metadata(
        Some("ranked-doubles"),
        ReplayGameTypeResponse {
            replay_game_type: Some("ranked".to_owned()),
            header_match_type: Some("Online".to_owned()),
            game_playlist_id: Some(11),
            match_type_class: Some("TAGame.MatchType_PublicRanked_TA".to_owned()),
        },
    );
    assert_eq!(ranked.label.as_deref(), Some("Ranked Soccar Doubles"));
    assert_eq!(ranked.category.as_deref(), Some("ranked"));
    assert_eq!(ranked.ruleset.as_deref(), Some("soccar"));
    assert_eq!(ranked.team_size, Some(2));
    assert_eq!(ranked.ranked, Some(true));
    assert_eq!(ranked.casual, Some(false));
    assert_eq!(ranked.soccar, Some(true));
    assert_eq!(ranked.replay_game_type.as_deref(), Some("ranked"));
    assert_eq!(ranked.header_match_type.as_deref(), Some("Online"));
    assert_eq!(ranked.game_playlist_id, Some(11));
    assert_eq!(
        ranked.match_type_class.as_deref(),
        Some("TAGame.MatchType_PublicRanked_TA")
    );

    let casual = playlist_metadata(Some("unranked-standard"), ReplayGameTypeResponse::default());
    assert_eq!(casual.label.as_deref(), Some("Casual Soccar Standard"));
    assert_eq!(casual.category.as_deref(), Some("casual"));
    assert_eq!(casual.team_size, Some(3));
    assert_eq!(casual.ranked, Some(false));
    assert_eq!(casual.casual, Some(true));
    assert_eq!(casual.soccar, Some(true));

    let hoops = playlist_metadata(Some("ranked-hoops"), ReplayGameTypeResponse::default());
    assert_eq!(hoops.label.as_deref(), Some("Ranked Hoops"));
    assert_eq!(hoops.ruleset.as_deref(), Some("hoops"));
    assert_eq!(hoops.ranked, Some(true));
    assert_eq!(hoops.soccar, Some(false));

    let lan = playlist_metadata(Some("lan"), ReplayGameTypeResponse::default());
    assert_eq!(lan.label.as_deref(), Some("LAN"));
    assert_eq!(lan.category.as_deref(), Some("lan"));
    assert_eq!(lan.ranked, None);
    assert_eq!(lan.casual, None);
}

#[test]
fn playlist_metadata_does_not_invent_ranked_status_for_generic_online() {
    let metadata = playlist_metadata(Some("online-2v2"), ReplayGameTypeResponse::default());

    assert_eq!(metadata.label.as_deref(), Some("Online Soccar 2v2"));
    assert_eq!(metadata.category.as_deref(), Some("online"));
    assert_eq!(metadata.ruleset.as_deref(), Some("soccar"));
    assert_eq!(metadata.team_size, Some(2));
    assert_eq!(metadata.ranked, None);
    assert_eq!(metadata.casual, None);
    assert_eq!(metadata.soccar, Some(true));
}

#[test]
fn replay_list_query_pages_replay_ids_before_hydrating_rows() {
    use sqlx::Execute;

    let filters =
        ReplayFilters::from_query(ListReplaysQuery::default(), None).expect("filters should parse");
    let mut query_builder = find_replays_query(&filters);
    let query = query_builder.build();
    let sql = query.sql();
    let filtered_replays_position = sql
        .find("WITH filtered_replays AS (SELECT r.id FROM replays r")
        .expect("list query should page replay ids first");
    let hydrate_position = sql
        .find("LEFT JOIN users uploader ON uploader.id = r.uploaded_by_user_id")
        .expect("list query should hydrate replay rows");
    let players_position = sql
        .find("FROM replay_players player")
        .expect("list query should include player hydration");

    assert!(filtered_replays_position < hydrate_position);
    assert!(hydrate_position < players_position);
    assert!(sql.contains("JOIN filtered_replays filtered_replay ON filtered_replay.id = r.id"));
    assert_eq!(sql.matches(" LIMIT ").count(), 1);
    assert_eq!(sql.matches(" OFFSET ").count(), 1);
}

#[test]
fn replay_list_sort_uses_index_friendly_nulls_ordering() {
    use sqlx::Execute;

    // Default sort is replay-date. replay_date is nullable and its index is
    // `(replay_date DESC NULLS LAST, id DESC)`, so this sort MUST keep
    // `NULLS LAST` to match the index.
    let default_sort =
        ReplayFilters::from_query(ListReplaysQuery::default(), None).expect("filters should parse");
    let mut builder = find_replays_query(&default_sort);
    let sql = builder.build().sql().to_owned();
    assert!(
        sql.contains("ORDER BY r.replay_date DESC NULLS LAST, r.id DESC"),
        "default replay-date sort must keep NULLS LAST to match replays_replay_date_id_idx, got: {sql}"
    );

    // Explicit upload-date sort uses created_at. created_at is NOT NULL and the
    // backing index `replays_created_at_id_idx` is `(created_at DESC, id DESC)`
    // (NULLS FIRST), so the ORDER BY must NOT emit `NULLS LAST` or the planner
    // falls back to a full Seq Scan + Sort instead of an index scan.
    let upload_sort = ReplayFilters::from_query(
        ListReplaysQuery {
            sort_by: Some("upload-date".to_owned()),
            ..ListReplaysQuery::default()
        },
        None,
    )
    .expect("filters should parse");
    let mut builder = find_replays_query(&upload_sort);
    let sql = builder.build().sql().to_owned();
    assert!(
        sql.contains("ORDER BY r.created_at DESC, r.id DESC"),
        "upload-date sort should use index-friendly ordering, got: {sql}"
    );
    assert!(
        !sql.contains("r.created_at DESC NULLS LAST"),
        "upload-date sort must not emit NULLS LAST (defeats replays_created_at_id_idx)"
    );
}

#[test]
fn replay_filter_indexes_include_trigram_search_and_sort_pagination_support() {
    let migration = include_str!("../../../../migrations/0020_replay_filter_query_indexes.sql");

    assert!(migration.contains("CREATE EXTENSION IF NOT EXISTS pg_trgm"));
    assert!(migration.contains("replays_created_at_id_idx"));
    assert!(migration.contains("replays_replay_date_id_idx"));
    assert!(migration.contains("replays_original_file_name_trgm_idx"));
    assert!(migration.contains("replays_external_replay_id_trgm_idx"));
    assert!(migration.contains("replays_file_sha256_trgm_idx"));
    assert!(migration.contains("replay_players_name_trgm_idx"));
    assert!(migration.contains("replay_players_platform_player_replay_idx"));
}

#[test]
fn replay_filter_options_query_sources_maps_and_seasons() {
    assert!(ReplayFilterOptionKind::Map
        .sql()
        .contains("SELECT map_code AS value"));
    assert!(ReplayFilterOptionKind::Map
        .sql()
        .contains("GROUP BY map_code"));
    assert!(ReplayFilterOptionKind::Season
        .sql()
        .contains("SELECT season AS value"));
    assert!(ReplayFilterOptionKind::Season
        .sql()
        .contains("GROUP BY season"));
}

#[test]
fn replay_group_select_includes_member_count() {
    let sql = replay_group_select_sql("WHERE replay_group.id = $1");

    assert!(sql.contains("FROM replay_groups replay_group"));
    assert!(sql.contains("FROM replay_group_replays group_replay"));
    assert!(sql.contains("COALESCE(replay_counts.replay_count, 0) AS replay_count"));
}

#[test]
fn replay_filters_parse_group_as_replay_group_and_project_separately() {
    let group_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let project_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f1").unwrap();
    let auth_user_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f2").unwrap();
    let filters = ReplayFilters::from_query(
        ListReplaysQuery {
            group: Some(group_id.to_string()),
            project: Some(project_id.to_string()),
            ..ListReplaysQuery::default()
        },
        Some(auth_user_id),
    )
    .expect("filters should parse");

    assert_eq!(filters.group_id, Some(group_id));
    assert_eq!(filters.project_id, Some(project_id));
}

#[test]
fn list_replays_query_accepts_html_form_array_filters() {
    let query = ListReplaysQuery::from_raw_query(Some(
        "player-name=colonelpanic8&player-id=epic%3Aabc&playlist=Online&map=Stadium_P",
    ))
    .expect("single-value HTML form filters should deserialize");

    assert_eq!(query.player_names, ["colonelpanic8"]);
    assert_eq!(query.player_ids, ["epic:abc"]);
    assert_eq!(query.playlist, ["Online"]);
    assert_eq!(query.maps, ["Stadium_P"]);
}

#[test]
fn list_replays_query_accepts_bracketed_array_filters() {
    let query = ListReplaysQuery::from_raw_query(Some(
        "player-name%5B%5D=colonelpanic8&player-id%5B%5D=epic%3Aabc&playlist%5B%5D=Online&map%5B%5D=Stadium_P",
    ))
    .expect("bracketed array filters should deserialize");

    assert_eq!(query.player_names, ["colonelpanic8"]);
    assert_eq!(query.player_ids, ["epic:abc"]);
    assert_eq!(query.playlist, ["Online"]);
    assert_eq!(query.maps, ["Stadium_P"]);
}

#[test]
fn list_replays_query_accepts_repeated_array_filters() {
    let query = ListReplaysQuery::from_raw_query(Some(
        "player-name=colonelpanic8&player-name=teammate&player-id=epic%3Aabc&player-id=steam%3Adef&playlist=Online&playlist=Private&season=f17&season=f18",
    ))
    .expect("repeated array filters should deserialize");

    assert_eq!(query.player_names, ["colonelpanic8", "teammate"]);
    assert_eq!(query.player_ids, ["epic:abc", "steam:def"]);
    assert_eq!(query.playlist, ["Online", "Private"]);
    assert_eq!(query.season, ["f17", "f18"]);
}

#[test]
fn replay_filters_parse_rank_range_slugs() {
    let filters = ReplayFilters::from_query(
        ListReplaysQuery {
            min_rank: Some("champion-1".to_owned()),
            max_rank: Some("ssl".to_owned()),
            ..ListReplaysQuery::default()
        },
        None,
    )
    .expect("rank filters should parse");

    assert_eq!(filters.min_rank_tier, Some(16));
    assert_eq!(filters.max_rank_tier, Some(22));
}

#[test]
fn replay_list_query_searches_players_and_rank_ranges() {
    use sqlx::Execute;

    let filters = ReplayFilters::from_query(
        ListReplaysQuery {
            q: Some("colonelpanic8".to_owned()),
            season: vec!["f18".to_owned()],
            min_rank: Some("diamond-1".to_owned()),
            max_rank: Some("grand-champion-3".to_owned()),
            ..ListReplaysQuery::default()
        },
        None,
    )
    .expect("filters should parse");
    let mut query_builder = find_replays_query(&filters);
    let query = query_builder.build();
    let sql = query.sql();

    assert!(sql.contains("replay_players.name ILIKE"));
    assert!(sql.contains("r.season = ANY("));
    assert!(sql.contains("rank_player.rank_tier >="));
    assert!(sql.contains("rank_player.rank_tier <="));
}

#[test]
fn replay_filters_do_not_require_authentication_without_me_filter() {
    let filters = ReplayFilters::from_query(ListReplaysQuery::default(), None)
        .expect("anonymous replay filters should parse");

    assert_eq!(filters.uploader_user_id, None);
}

#[test]
fn replay_filters_require_authentication_for_me_uploader_filter() {
    let result = ReplayFilters::from_query(
        ListReplaysQuery {
            uploader: Some("me".to_owned()),
            ..ListReplaysQuery::default()
        },
        None,
    );
    let Err(error) = result else {
        panic!("uploader=me should require auth");
    };

    assert_eq!(error.status, StatusCode::UNAUTHORIZED);
}

#[test]
fn replay_filters_parse_me_uploader_when_authenticated() {
    let auth_user_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f2").unwrap();
    let filters = ReplayFilters::from_query(
        ListReplaysQuery {
            uploader: Some("me".to_owned()),
            ..ListReplaysQuery::default()
        },
        Some(auth_user_id),
    )
    .expect("uploader=me should parse with auth");

    assert_eq!(filters.uploader_user_id, Some(auth_user_id));
}

#[test]
fn normalize_sha256_hex_accepts_lower_and_uppercase_hashes() {
    let lowercase = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    let uppercase = "0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF";

    assert_eq!(normalize_sha256_hex(lowercase).unwrap(), lowercase);
    assert_eq!(normalize_sha256_hex(uppercase).unwrap(), lowercase);
}

#[test]
fn normalize_sha256_hex_rejects_non_sha256_values() {
    assert!(normalize_sha256_hex("abc").is_err());
    assert!(normalize_sha256_hex(
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdeg"
    )
    .is_err());
}

fn boost_amount_point(time: f64, value: f64) -> BoostTrackPoint {
    BoostTrackPoint {
        frame: 0,
        time: Some(time),
        value,
    }
}

fn boost_track(player_id: &str, quantity: &str, points: Vec<BoostTrackPoint>) -> BoostTrack {
    BoostTrack {
        player_id: Some(player_id.to_string()),
        is_team_0: true,
        quantity: quantity.to_string(),
        points,
    }
}

#[test]
fn boost_band_index_partitions_match_web_bands() {
    assert_eq!(boost_band_index(0.0), 0);
    assert_eq!(boost_band_index(0.5), 0);
    assert_eq!(boost_band_index(1.0), 1);
    assert_eq!(boost_band_index(24.9), 1);
    assert_eq!(boost_band_index(25.0), 2);
    assert_eq!(boost_band_index(49.9), 2);
    assert_eq!(boost_band_index(50.0), 3);
    assert_eq!(boost_band_index(74.9), 3);
    assert_eq!(boost_band_index(75.0), 4);
    assert_eq!(boost_band_index(99.9), 4);
    assert_eq!(boost_band_index(100.0), 5);
    assert_eq!(boost_band_index(150.0), 5);
}

#[test]
fn accumulate_group_boost_tracks_time_weights_and_sums_across_replays() {
    let mut accumulators: TestHashMap<String, GroupBoostAccumulator> = TestHashMap::new();

    // Replay 1: held 0% for 10s, then a final 100% sample (zero-duration tail).
    let replay_one = vec![
        boost_track(
            "p1",
            "boost_amount",
            vec![
                boost_amount_point(0.0, 0.0),
                boost_amount_point(10.0, 255.0),
            ],
        ),
        // 51/255 -> 20% used, 25.5/255 -> 10% supersonic.
        boost_track("p1", "boost_used", vec![boost_amount_point(0.0, 51.0)]),
        boost_track(
            "p1",
            "boost_used_supersonic",
            vec![boost_amount_point(0.0, 25.5)],
        ),
    ];
    // Replay 2: held 50% for 5s, then a final 75% sample (zero-duration tail).
    let replay_two = vec![
        boost_track(
            "p1",
            "boost_amount",
            vec![
                boost_amount_point(0.0, 127.5),
                boost_amount_point(5.0, 191.25),
            ],
        ),
        boost_track("p1", "boost_used", vec![boost_amount_point(0.0, 25.5)]),
    ];

    let mut duration = 0.0;
    duration += accumulate_group_boost_tracks(&replay_one, &mut accumulators);
    duration += accumulate_group_boost_tracks(&replay_two, &mut accumulators);

    assert_eq!(duration, 15.0);
    let p1 = accumulators.get("p1").expect("p1 accumulated");
    assert_eq!(p1.tracked_seconds, 15.0);
    assert_eq!(p1.boost_used, 30.0); // 20% + 10%
    assert_eq!(p1.boost_used_supersonic, 10.0);
    // 10s at 0% + 5s at 50% -> weighted sum 250, mean 250/15.
    assert_eq!(p1.boost_amount_weighted_sum, 250.0);
    assert_eq!(p1.bands[0], 10.0); // empty band, replay 1
    assert_eq!(p1.bands[3], 5.0); // high band (50-75), replay 2
    assert_eq!(p1.bands[1] + p1.bands[2] + p1.bands[4] + p1.bands[5], 0.0);
}

#[test]
fn accumulate_group_boost_tracks_ignores_tracks_without_a_player() {
    let mut accumulators: TestHashMap<String, GroupBoostAccumulator> = TestHashMap::new();
    let tracks = vec![BoostTrack {
        player_id: None,
        is_team_0: false,
        quantity: "boost_amount".to_string(),
        points: vec![boost_amount_point(0.0, 255.0), boost_amount_point(8.0, 0.0)],
    }];

    let duration = accumulate_group_boost_tracks(&tracks, &mut accumulators);

    // Duration still reflects the (team-level) boost-amount samples...
    assert_eq!(duration, 8.0);
    // ...but no per-player totals are recorded for an absent player id.
    assert!(accumulators.is_empty());
}
