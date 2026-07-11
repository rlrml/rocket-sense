use super::*;
use base64::Engine as _;

fn valid_request() -> PublishTrainingPackRequest {
    PublishTrainingPackRequest {
        name: "Backboard Reads".to_owned(),
        description: Some("Double taps off the backboard".to_owned()),
        training_type: 3,
        difficulty: 2,
        map_name: "EuroStadium_P".to_owned(),
        tags: vec!["Aerials".to_owned(), "Backboard".to_owned()],
        rounds: vec![
            PublishTrainingRoundRequest {
                time_limit: 8.0,
                serialized_archetypes: vec![
                    "Archetypes.Ball.Ball_Default".to_owned(),
                    "Archetypes.SpawnPoints.PlayerSpawn".to_owned(),
                ],
            },
            PublishTrainingRoundRequest {
                time_limit: 10.0,
                serialized_archetypes: vec!["Archetypes.Ball.Ball_Default".to_owned()],
            },
        ],
    }
}

#[test]
fn publish_request_lowers_to_save_training_data() {
    let pack = build_save_training_data(&valid_request()).expect("valid request should convert");

    // A fresh GUID is minted server-side: base64 of exactly 16 random bytes.
    let guid_bytes = base64::engine::general_purpose::STANDARD
        .decode(&pack.tm_guid)
        .expect("tm_guid should be base64");
    assert_eq!(guid_bytes.len(), 16);

    assert_eq!(pack.tm_name, "Backboard Reads");
    assert_eq!(pack.training_type, 3);
    assert_eq!(pack.difficulty, 2);
    assert_eq!(pack.map_name, "EuroStadium_P");
    assert_eq!(pack.num_rounds, 2);
    assert_eq!(pack.rounds.len(), 2);
    assert_eq!(pack.rounds[0].serialized_archetypes.len(), 2);
    assert_eq!(
        pack.description.as_deref(),
        Some("Double taps off the backboard")
    );

    // Tags stay strings on the wire (PsyNet's `Tags` field is `Vec<String>`).
    assert_eq!(pack.tags, ["Aerials", "Backboard"]);
    let wire = serde_json::to_value(&pack).expect("pack should serialize");
    assert_eq!(
        wire["Tags"],
        serde_json::json!(["Aerials", "Backboard"]),
        "tags must serialize as an array of strings under the PascalCase key"
    );
    assert_eq!(wire["NumRounds"], serde_json::json!(2));
    assert!(wire["TM_Guid"].is_string());
}

#[test]
fn publish_requests_mint_distinct_guids() {
    let request = valid_request();
    let first = build_save_training_data(&request).unwrap();
    let second = build_save_training_data(&request).unwrap();

    assert_ne!(first.tm_guid, second.tm_guid);
}

#[test]
fn publish_request_normalizes_tags_and_description() {
    let mut request = valid_request();
    request.tags = vec!["  Shooting  ".to_owned(), "   ".to_owned()];
    request.description = Some("   ".to_owned());

    let pack = build_save_training_data(&request).unwrap();

    assert_eq!(pack.tags, ["Shooting"]);
    assert_eq!(pack.description, None);
}

#[test]
fn publish_request_rejects_empty_rounds() {
    let mut request = valid_request();
    request.rounds.clear();

    let error = build_save_training_data(&request).unwrap_err();
    assert!(error.contains("at least one round"));
}

#[test]
fn publish_request_rejects_blank_name_and_map() {
    let mut request = valid_request();
    request.name = "   ".to_owned();
    assert!(build_save_training_data(&request)
        .unwrap_err()
        .contains("name"));

    let mut request = valid_request();
    request.map_name = String::new();
    assert!(build_save_training_data(&request)
        .unwrap_err()
        .contains("map_name"));
}

#[test]
fn publish_request_rejects_invalid_ordinals() {
    // 4 is ETrainingType's enum-end sentinel, not a real pack type.
    let mut request = valid_request();
    request.training_type = 4;
    assert!(build_save_training_data(&request)
        .unwrap_err()
        .contains("training_type"));

    let mut request = valid_request();
    request.training_type = -1;
    assert!(build_save_training_data(&request)
        .unwrap_err()
        .contains("training_type"));

    let mut request = valid_request();
    request.difficulty = MAX_DIFFICULTY + 1;
    assert!(build_save_training_data(&request)
        .unwrap_err()
        .contains("difficulty"));
}

#[test]
fn publish_request_rejects_bad_rounds() {
    let mut request = valid_request();
    request.rounds[1].time_limit = -1.0;
    assert!(build_save_training_data(&request)
        .unwrap_err()
        .contains("time_limit"));

    let mut request = valid_request();
    request.rounds[0].serialized_archetypes.clear();
    assert!(build_save_training_data(&request)
        .unwrap_err()
        .contains("serialized archetypes"));

    let mut request = valid_request();
    request.rounds[0]
        .serialized_archetypes
        .push("  ".to_owned());
    assert!(build_save_training_data(&request)
        .unwrap_err()
        .contains("serialized archetypes"));
}

fn test_key() -> [u8; 32] {
    [7u8; 32]
}

fn test_aad() -> String {
    token_aad(
        Uuid::from_u128(0x1234),
        "abcdef0123456789",
        TokenKind::EgsRefresh,
    )
}

#[test]
fn token_cipher_roundtrips() {
    let cipher = TokenCipher::new(&test_key());
    let blob = cipher.encrypt("refresh-token-value", &test_aad()).unwrap();

    assert_eq!(blob[0], TOKEN_CIPHERTEXT_VERSION);
    assert_eq!(
        cipher.decrypt(&blob, &test_aad()).unwrap(),
        "refresh-token-value"
    );
}

#[test]
fn token_cipher_uses_random_nonces() {
    let cipher = TokenCipher::new(&test_key());
    let first = cipher.encrypt("refresh-token-value", &test_aad()).unwrap();
    let second = cipher.encrypt("refresh-token-value", &test_aad()).unwrap();

    assert_ne!(first, second, "encrypting twice must never reuse a nonce");
}

#[test]
fn token_cipher_rejects_wrong_aad() {
    let cipher = TokenCipher::new(&test_key());
    let blob = cipher.encrypt("refresh-token-value", &test_aad()).unwrap();

    // Same row, different token kind: the ciphertext must not be replayable
    // into the other column.
    let other_aad = token_aad(
        Uuid::from_u128(0x1234),
        "abcdef0123456789",
        TokenKind::EosRefresh,
    );
    assert!(cipher.decrypt(&blob, &other_aad).is_err());

    // Different user entirely.
    let other_user_aad = token_aad(
        Uuid::from_u128(0x9999),
        "abcdef0123456789",
        TokenKind::EgsRefresh,
    );
    assert!(cipher.decrypt(&blob, &other_user_aad).is_err());
}

#[test]
fn token_cipher_rejects_wrong_key_and_tampering() {
    let cipher = TokenCipher::new(&test_key());
    let blob = cipher.encrypt("refresh-token-value", &test_aad()).unwrap();

    let other_cipher = TokenCipher::new(&[8u8; 32]);
    assert!(other_cipher.decrypt(&blob, &test_aad()).is_err());

    let mut tampered = blob.clone();
    *tampered.last_mut().unwrap() ^= 1;
    assert!(cipher.decrypt(&tampered, &test_aad()).is_err());

    let mut wrong_version = blob;
    wrong_version[0] = 2;
    assert!(cipher.decrypt(&wrong_version, &test_aad()).is_err());

    assert!(cipher.decrypt(&[], &test_aad()).is_err());
    assert!(cipher
        .decrypt(&[TOKEN_CIPHERTEXT_VERSION, 1, 2, 3], &test_aad())
        .is_err());
}

#[test]
fn epic_link_migration_creates_encrypted_link_table() {
    let migration = include_str!("../../../../migrations/0091_epic_account_links.sql");

    assert!(migration.contains("CREATE TABLE epic_account_links"));
    assert!(migration.contains("user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE"));
    assert!(migration.contains("egs_refresh_token_ciphertext bytea NOT NULL"));
    assert!(migration.contains("eos_refresh_token_ciphertext bytea"));
    assert!(migration.contains("epic_account_id text NOT NULL"));
}
