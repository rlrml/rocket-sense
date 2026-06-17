use super::*;

#[test]
fn auth_options_reports_mode_and_configured_oauth_providers() {
    let response = auth_options_response(
        AuthMode::OAuth,
        &[OAuthProviderSettings {
            kind: OAuthProviderKind::GitHub,
            client_id: "client-id".to_owned(),
            client_secret: Some("client-secret".to_owned()),
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
        .any(|provider| provider.id == "xbox" && provider.label == "Xbox"));
    assert!(response
        .providers
        .iter()
        .any(|provider| provider.id == "steam" && provider.label == "Steam"));
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
