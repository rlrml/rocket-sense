use super::*;

#[test]
fn auth_options_reports_mode_and_configured_oauth_providers() {
    let response = auth_options_response(
        AuthMode::OAuth,
        &[OAuthProviderSettings {
            kind: OAuthProviderKind::GitHub,
            client_id: "client-id".to_owned(),
            client_secret: "client-secret".to_owned(),
            deployment_id: None,
            public_base_url: "https://rocket-sense.example".to_owned(),
        }],
    );

    assert_eq!(response.mode, "oauth");
    assert_eq!(response.login_url, "/login");
    let github = response
        .providers
        .iter()
        .find(|provider| provider.id == "github")
        .expect("GitHub should be listed");
    assert_eq!(github.label, "GitHub");
    assert!(github.configured);
    assert_eq!(github.start_url, "/auth/github/start");
    assert!(response
        .providers
        .iter()
        .any(|provider| provider.id == "google" && !provider.configured));
    assert!(response
        .providers
        .iter()
        .any(|provider| provider.id == "epic" && !provider.configured));
    assert!(response
        .providers
        .iter()
        .any(|provider| provider.id == "xbox" && provider.label == "Xbox"));
    assert!(response
        .providers
        .iter()
        .any(|provider| provider.id == "steam" && provider.label == "Steam"));
}

#[test]
fn epic_authorize_url_includes_deployment_id_when_configured() {
    let provider = OAuthProviderSettings {
        kind: OAuthProviderKind::Epic,
        client_id: "epic-client-id".to_owned(),
        client_secret: "epic-client-secret".to_owned(),
        deployment_id: Some("epic-deployment-id".to_owned()),
        public_base_url: "https://rocket-sense.example".to_owned(),
    };

    let url = oauth_authorize_url(&provider, "state", "nonce").expect("authorize url");
    let params: std::collections::HashMap<_, _> = url.query_pairs().into_owned().collect();

    assert_eq!(
        url.as_str().split('?').next(),
        Some(authorize_url(provider.kind))
    );
    assert_eq!(
        params.get("redirect_uri").map(String::as_str),
        Some("https://rocket-sense.example/auth/epic/callback")
    );
    assert_eq!(
        params.get("deployment_id").map(String::as_str),
        Some("epic-deployment-id")
    );
}

#[test]
fn non_epic_authorize_url_does_not_include_deployment_id() {
    let provider = OAuthProviderSettings {
        kind: OAuthProviderKind::GitHub,
        client_id: "github-client-id".to_owned(),
        client_secret: "github-client-secret".to_owned(),
        deployment_id: Some("ignored-deployment-id".to_owned()),
        public_base_url: "https://rocket-sense.example".to_owned(),
    };

    let url = oauth_authorize_url(&provider, "state", "nonce").expect("authorize url");
    let params: std::collections::HashMap<_, _> = url.query_pairs().into_owned().collect();

    assert!(!params.contains_key("deployment_id"));
}

#[test]
fn epic_synthetic_email_is_stable_and_internal() {
    assert_eq!(
        synthetic_epic_email("abc-123.def"),
        "epic+abc123def@users.rocket-sense.invalid"
    );
}

#[test]
fn steam_claimed_id_extracts_steam_id() {
    let steam_id =
        steam_id_from_claimed_id("https://steamcommunity.com/openid/id/76561198000000001")
            .expect("valid claimed id should parse");

    assert_eq!(steam_id, "76561198000000001");
}

#[test]
fn steam_claimed_id_rejects_non_numeric_suffix() {
    assert!(
        steam_id_from_claimed_id("https://steamcommunity.com/openid/id/not-a-steamid").is_err()
    );
}

#[test]
fn steam_synthetic_email_is_stable_and_internal() {
    assert_eq!(
        synthetic_steam_email("76561198000000001"),
        "steam+76561198000000001@users.rocket-sense.invalid"
    );
}
