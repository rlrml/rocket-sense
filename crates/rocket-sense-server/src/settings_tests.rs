use super::*;

fn public_bind_addr() -> SocketAddr {
    "0.0.0.0:8080".parse().unwrap()
}

fn loopback_bind_addr() -> SocketAddr {
    "127.0.0.1:8080".parse().unwrap()
}

#[test]
fn oauth_requires_configured_jwt_secret() {
    let error = validate_auth_settings(
        AuthMode::OAuth,
        public_bind_addr(),
        DEV_JWT_SECRET,
        false,
        false,
    )
    .unwrap_err();

    assert!(error
        .to_string()
        .contains("ROCKET_SENSE_APP_JWT_SECRET is required"));
}

#[test]
fn configured_jwt_secret_must_be_long_enough() {
    let error = validate_auth_settings(AuthMode::OAuth, public_bind_addr(), "short", true, false)
        .unwrap_err();

    assert!(error.to_string().contains("at least"));
}

#[test]
fn dev_auth_default_secret_is_allowed_on_loopback() {
    validate_auth_settings(
        AuthMode::Dev,
        loopback_bind_addr(),
        DEV_JWT_SECRET,
        false,
        false,
    )
    .expect("local dev auth should remain easy to run");
}

#[test]
fn dev_auth_rejects_public_bind_without_explicit_override() {
    let error = validate_auth_settings(
        AuthMode::Dev,
        public_bind_addr(),
        DEV_JWT_SECRET,
        false,
        false,
    )
    .unwrap_err();

    assert!(error.to_string().contains("dev auth mode may only bind"));
}

#[test]
fn dev_auth_allows_public_bind_with_explicit_override() {
    validate_auth_settings(
        AuthMode::Dev,
        public_bind_addr(),
        DEV_JWT_SECRET,
        false,
        true,
    )
    .expect("explicit insecure dev override should be honored");
}

#[test]
fn egress_proxies_unset_yields_no_exits() {
    assert!(parse_egress_proxies(None).is_none());
    assert!(parse_egress_proxies(Some("  ,  ".to_owned())).is_none());
}

#[test]
fn egress_proxies_parse_bare_and_named_entries() {
    let exits = parse_egress_proxies(Some(
        "socks5h://127.0.0.1:9001, nl-ams = socks5h://127.0.0.1:9002 ".to_owned(),
    ))
    .expect("should parse two exits");

    assert_eq!(exits.len(), 2);
    // Bare entry: the URL doubles as the label.
    assert_eq!(exits[0].name, "socks5h://127.0.0.1:9001");
    assert_eq!(exits[0].proxy.as_deref(), Some("socks5h://127.0.0.1:9001"));
    // `name = url` entry is split and trimmed.
    assert_eq!(exits[1].name, "nl-ams");
    assert_eq!(exits[1].proxy.as_deref(), Some("socks5h://127.0.0.1:9002"));
}

#[test]
fn epic_token_key_parses_hex_and_base64() {
    let key_bytes = [0xabu8; 32];

    let hex_encoded = hex::encode(key_bytes);
    assert_eq!(
        parse_epic_token_encryption_key(&hex_encoded).unwrap(),
        key_bytes
    );

    let base64_encoded = {
        use base64::Engine as _;
        base64::engine::general_purpose::STANDARD.encode(key_bytes)
    };
    assert_eq!(
        parse_epic_token_encryption_key(&base64_encoded).unwrap(),
        key_bytes
    );
}

#[test]
fn epic_token_key_rejects_wrong_length_and_garbage() {
    // 16 bytes instead of 32.
    let error = parse_epic_token_encryption_key(&hex::encode([1u8; 16])).unwrap_err();
    assert!(error.to_string().contains("32 bytes"));

    assert!(parse_epic_token_encryption_key("not hex, not base64!!").is_err());
}
