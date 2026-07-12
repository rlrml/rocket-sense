use sqlx::{Postgres, QueryBuilder};
use uuid::Uuid;

use super::{
    push_replay_direct_visibility, push_replay_list_visibility, replay_list_visibility_sql,
    Visibility,
};

#[test]
fn unknown_database_visibility_fails_closed() {
    assert_eq!(Visibility::from_db("future-value"), Visibility::Private);
}

#[test]
fn anonymous_replay_lists_only_include_public_rows() {
    assert_eq!(
        replay_list_visibility_sql("r", None),
        " AND r.visibility = 'public'"
    );

    let mut query = QueryBuilder::<Postgres>::new("SELECT r.id FROM replays r WHERE TRUE");
    push_replay_list_visibility(&mut query, "r", None);
    assert!(query.sql().contains("AND r.visibility = 'public'"));
}

#[test]
fn authenticated_replay_lists_include_owned_and_shared_rows() {
    let viewer_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let mut query = QueryBuilder::<Postgres>::new("SELECT r.id FROM replays r WHERE TRUE");
    push_replay_list_visibility(&mut query, "r", Some(viewer_id));
    let sql = query.sql();

    assert!(sql.contains("r.visibility = 'public'"));
    assert!(sql.contains("r.uploaded_by_user_id = $1"));
    assert!(sql.contains("s.replay_id = r.id AND s.user_id = $2"));
}

#[test]
fn direct_replay_access_allows_unlisted_but_gates_private() {
    let viewer_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let mut query = QueryBuilder::<Postgres>::new("SELECT r.id FROM replays r WHERE TRUE");
    push_replay_direct_visibility(&mut query, "r", Some(viewer_id));
    let sql = query.sql();

    assert!(sql.contains("r.visibility <> 'private'"));
    assert!(sql.contains("r.uploaded_by_user_id = $1"));
    assert!(sql.contains("s.replay_id = r.id AND s.user_id = $2"));
    assert!(sql.contains("u.id = $3 AND u.is_admin"));
    assert_eq!(
        sql.matches('(').count(),
        sql.matches(')').count(),
        "direct replay visibility SQL must have balanced parentheses: {sql}"
    );
}
