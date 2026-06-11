use super::*;

#[test]
fn subtr_actor_viewer_assets_are_embedded_with_browser_content_types() {
    assert_index_assets_are_embedded(SUBTR_ACTOR_VIEWER_INDEX, subtr_actor_static_asset);
    assert!(subtr_actor_static_asset("missing.js").is_none());
}

#[test]
fn subtr_actor_stats_assets_are_embedded_with_browser_content_types() {
    assert_index_assets_are_embedded(SUBTR_ACTOR_STATS_INDEX, subtr_actor_stats_static_asset);
    assert!(subtr_actor_stats_static_asset("missing.js").is_none());
}

#[test]
fn subtr_actor_review_assets_are_embedded_with_browser_content_types() {
    assert_index_assets_are_embedded(SUBTR_ACTOR_REVIEW_INDEX, subtr_actor_review_static_asset);
    assert!(subtr_actor_review_static_asset("missing.js").is_none());
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

fn assert_index_assets_are_embedded(index: &str, load: fn(&str) -> Option<StaticAsset>) {
    let paths = asset_paths(index);
    assert!(!paths.is_empty());
    for path in paths {
        let asset = load(&path).unwrap_or_else(|| panic!("missing asset {path}"));
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
}

#[test]
fn replay_select_includes_players_without_stats_blob_join() {
    let sql = replay_select_sql("WHERE r.id = $1");

    assert!(sql.contains("jsonb_build_object"));
    assert!(sql.contains("FROM replay_players player"));
    assert!(sql.contains("'rank_tier', player.rank_tier"));
    assert!(sql.contains("'rank_division', player.rank_division"));
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

    // Default sort is upload-date (created_at). created_at is NOT NULL and the
    // backing index `replays_created_at_id_idx` is `(created_at DESC, id DESC)`
    // (NULLS FIRST), so the ORDER BY must NOT emit `NULLS LAST` or the planner
    // falls back to a full Seq Scan + Sort instead of an index scan.
    let upload_sort =
        ReplayFilters::from_query(ListReplaysQuery::default(), None).expect("filters should parse");
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

    // replay_date is nullable and its index is `(replay_date DESC NULLS LAST,
    // id DESC)`, so this sort MUST keep `NULLS LAST` to match the index.
    let replay_sort = ReplayFilters::from_query(
        ListReplaysQuery {
            sort_by: Some("replay-date".to_owned()),
            ..ListReplaysQuery::default()
        },
        None,
    )
    .expect("filters should parse");
    let mut builder = find_replays_query(&replay_sort);
    let sql = builder.build().sql().to_owned();
    assert!(
        sql.contains("ORDER BY r.replay_date DESC NULLS LAST, r.id DESC"),
        "replay-date sort must keep NULLS LAST to match replays_replay_date_id_idx, got: {sql}"
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
