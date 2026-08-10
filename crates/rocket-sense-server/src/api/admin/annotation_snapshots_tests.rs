use super::*;

fn timestamp(value: &str) -> DateTime<Utc> {
    value.parse().expect("valid timestamp")
}

#[test]
fn event_review_normalization_prefers_reviewed_values_and_preserves_source() {
    let review_id = Uuid::parse_str("019f4aa7-56cf-71d2-b032-68038b5eb535").unwrap();
    let replay_id = Uuid::parse_str("019f4aa7-56cf-71d2-b032-68038b5eb536").unwrap();
    let annotation = event_review_annotation(EventReviewRow {
        id: review_id,
        event_id: None,
        replay_id,
        replay_sha256: "a".repeat(64),
        reviewer_user_id: None,
        status: "corrected".to_owned(),
        reviewed_event_type_key: Some("speed_flip".to_owned()),
        reviewed_subject_kind: Some("player".to_owned()),
        reviewed_subject_id: Some("steam:reviewed".to_owned()),
        reviewed_start_frame: Some(100),
        reviewed_end_frame: Some(140),
        reviewed_event_frame: Some(121),
        confidence: Some(0.9),
        notes: Some("corrected anchor".to_owned()),
        supersedes_review_id: None,
        source_review_id: None,
        carry_forward_method: None,
        carry_forward_distance_frames: None,
        event_snapshot: json!({
            "analysisRunId": "019f4aa7-56cf-71d2-b032-68038b5eb537",
            "source": "subtr-actor",
            "sourceStream": "mechanics",
            "eventType": { "key": "speed_flip", "category": "mechanic" },
            "primarySubject": { "kind": "player", "id": "steam:old" },
            "frames": { "start": 1, "end": 2, "event": 2 },
            "times": { "start": 3.0, "end": 4.0, "event": 3.5 },
            "payload": { "distance": 900.0 }
        }),
        created_at: timestamp("2026-08-10T10:00:00Z"),
    });

    assert_eq!(annotation.id, format!("event_review:{review_id}"));
    assert_eq!(annotation.source.kind, "event_review");
    assert_eq!(annotation.event.event_type.as_deref(), Some("speed_flip"));
    assert_eq!(annotation.event.source_stream.as_deref(), Some("mechanics"));
    assert_eq!(annotation.event.frames.start, Some(100));
    assert_eq!(annotation.event.frames.end, Some(140));
    assert_eq!(annotation.event.frames.event, Some(121));
    assert_eq!(
        annotation
            .event
            .subject
            .as_ref()
            .and_then(|subject| subject.id.as_deref()),
        Some("steam:reviewed")
    );
    assert_eq!(annotation.provenance["source_stream"], json!("mechanics"));
    assert_eq!(
        annotation.provenance["event_snapshot"]["eventType"]["category"],
        json!("mechanic")
    );
}

#[test]
fn campaign_label_normalization_uses_neutral_event_and_replay_fields() {
    let label_id = Uuid::parse_str("019f4aa7-56cf-71d2-b032-68038b5eb538").unwrap();
    let campaign_id = Uuid::parse_str("019f4aa7-56cf-71d2-b032-68038b5eb539").unwrap();
    let annotation = campaign_label_annotation(CampaignLabelRow {
        id: label_id,
        campaign_id,
        campaign_slug: "beaten-to-ball".to_owned(),
        candidate_key: "sha12:speed_flip:new:131:epic:player".to_owned(),
        replay_id: Uuid::parse_str("019f4aa7-56cf-71d2-b032-68038b5eb53a").unwrap(),
        replay_sha256: "b".repeat(64),
        item_label: Some("candidate".to_owned()),
        start_time: 15.12,
        end_time: 21.12,
        perspective: Some(json!({
            "kind": "player",
            "playerId": "epic:player",
            "playerName": "Player"
        })),
        item_meta: json!({
            "eventType": "speed_flip",
            "eventCategory": "mechanic",
            "sourceStream": "mechanics",
            "target": { "eventFrame": 131, "eventTime": 19.12 },
            "payload": { "margin_seconds": 0.054 },
            "provenance": "new_only"
        }),
        generator: json!({ "source": { "kind": "mechanic-review-playlist" } }),
        reviewer_user_id: Uuid::parse_str("019f4aa7-56cf-71d2-b032-68038b5eb53b").unwrap(),
        status: "confirmed".to_owned(),
        notes: None,
        created_at: timestamp("2026-08-10T10:00:00Z"),
        updated_at: timestamp("2026-08-10T10:05:00Z"),
    });

    assert_eq!(annotation.source.kind, "campaign");
    assert_eq!(annotation.source.campaign_id, Some(campaign_id));
    assert_eq!(annotation.event.event_type.as_deref(), Some("speed_flip"));
    assert_eq!(annotation.event.source_stream.as_deref(), Some("mechanics"));
    assert_eq!(
        annotation.provenance["item_meta"]["eventCategory"],
        json!("mechanic")
    );
    assert_eq!(annotation.event.frames.event, Some(131));
    assert_eq!(annotation.event.times.start, Some(15.12));
    assert_eq!(annotation.event.times.end, Some(21.12));
    assert_eq!(annotation.event.times.event, Some(19.12));
    assert_eq!(
        annotation
            .event
            .subject
            .as_ref()
            .and_then(|subject| subject.id.as_deref()),
        Some("epic:player")
    );
}

#[test]
fn campaign_label_without_event_type_is_preserved() {
    let annotation = campaign_label_annotation(CampaignLabelRow {
        id: Uuid::now_v7(),
        campaign_id: Uuid::now_v7(),
        campaign_slug: "custom-review".to_owned(),
        candidate_key: "custom-candidate".to_owned(),
        replay_id: Uuid::now_v7(),
        replay_sha256: "c".repeat(64),
        item_label: Some("Custom candidate".to_owned()),
        start_time: 1.0,
        end_time: 2.0,
        perspective: None,
        item_meta: json!({ "custom": true }),
        generator: json!({ "source": { "kind": "custom-playlist" } }),
        reviewer_user_id: Uuid::now_v7(),
        status: "accepted".to_owned(),
        notes: None,
        created_at: timestamp("2026-08-10T10:00:00Z"),
        updated_at: timestamp("2026-08-10T10:05:00Z"),
    });

    assert_eq!(annotation.event.event_type, None);
    assert_eq!(annotation.label.status, "accepted");
    assert_eq!(annotation.source.kind, "campaign");
}

#[test]
fn snapshot_document_is_manifest_first_sorted_and_summarized() {
    let snapshot_id = Uuid::parse_str("019f4aa7-56cf-71d2-b032-68038b5eb53c").unwrap();
    let creator_id = Uuid::parse_str("019f4aa7-56cf-71d2-b032-68038b5eb53d").unwrap();
    let campaign_id = Uuid::parse_str("019f4aa7-56cf-71d2-b032-68038b5eb53e").unwrap();
    let at = timestamp("2026-08-10T10:00:00Z");
    let annotations = vec![
        test_annotation("event_review:z", "event_review", "confirmed", "a", None, at),
        test_annotation(
            "campaign_label:a",
            "campaign",
            "rejected",
            "b",
            Some(campaign_id),
            at,
        ),
        test_annotation("event_review:a", "event_review", "confirmed", "a", None, at),
    ];

    let built = build_snapshot_document(snapshot_id, at, at, creator_id, annotations).unwrap();
    assert_eq!(built.annotation_count, 3);
    assert_eq!(built.replay_count, 2);
    assert_eq!(built.source_counts["event_review"], 2);
    assert_eq!(built.source_counts["campaign"], 1);
    assert_eq!(built.label_counts["confirmed"], 2);
    assert_eq!(built.campaign_ids, vec![campaign_id]);

    let lines = std::str::from_utf8(&built.bytes)
        .unwrap()
        .lines()
        .map(|line| serde_json::from_str::<Value>(line).unwrap())
        .collect::<Vec<_>>();
    assert_eq!(lines.len(), 4);
    assert_eq!(lines[0]["record_type"], json!("manifest"));
    assert_eq!(lines[0]["schema_version"], json!(SNAPSHOT_SCHEMA_VERSION));
    assert_eq!(lines[1]["id"], json!("campaign_label:a"));
    assert_eq!(lines[2]["id"], json!("event_review:a"));
    assert_eq!(lines[3]["id"], json!("event_review:z"));
}

fn test_annotation(
    id: &str,
    source_kind: &'static str,
    status: &str,
    replay_sha_prefix: &str,
    campaign_id: Option<Uuid>,
    at: DateTime<Utc>,
) -> NeutralAnnotation {
    NeutralAnnotation {
        record_type: "annotation",
        schema_version: ANNOTATION_SCHEMA_VERSION,
        id: id.to_owned(),
        source: AnnotationSource {
            kind: source_kind,
            record_id: Uuid::now_v7(),
            campaign_id,
            campaign_slug: None,
            candidate_key: None,
        },
        replay: AnnotationReplay {
            id: Uuid::now_v7(),
            sha256: replay_sha_prefix.repeat(64),
        },
        event: AnnotationEvent {
            event_type: Some("kind".to_owned()),
            source_stream: None,
            subject: None,
            frames: AnnotationFrames::default(),
            times: AnnotationTimes::default(),
            payload: None,
            attributes: None,
            perspective: None,
        },
        label: AnnotationLabel {
            status: status.to_owned(),
            confidence: None,
            notes: None,
        },
        reviewer_user_id: None,
        created_at: at,
        updated_at: at,
        provenance: json!({}),
    }
}

#[test]
fn migration_registers_immutable_snapshot_metadata() {
    let migration = include_str!("../../../../../migrations/0095_annotation_snapshots.sql");
    assert!(migration.contains("CREATE TABLE annotation_snapshots"));
    assert!(migration.contains("storage_sha256"));
    assert!(!migration.contains("updated_at"));
}
