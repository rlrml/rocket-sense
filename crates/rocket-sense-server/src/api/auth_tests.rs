use super::*;

#[test]
fn auth_options_reports_mode_and_configured_oauth_providers() {
    let response = auth_options_response(
        AuthMode::OAuth,
        &[OAuthProviderSettings {
            kind: OAuthProviderKind::GitHub,
            client_id: "client-id".to_owned(),
            client_secret: "client-secret".to_owned(),
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
}

#[test]
fn epic_synthetic_email_is_stable_and_internal() {
    assert_eq!(
        synthetic_epic_email("abc-123.def"),
        "epic+abc123def@users.rocket-sense.invalid"
    );
}
