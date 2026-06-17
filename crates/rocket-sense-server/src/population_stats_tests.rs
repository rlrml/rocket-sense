use super::*;

#[test]
fn percentile_cont_interpolates_between_sorted_values() {
    let values = [10.0, 20.0, 30.0, 40.0];

    assert_eq!(percentile_cont(&values, 0.0), 10.0);
    assert_eq!(percentile_cont(&values, 0.5), 25.0);
    assert_eq!(percentile_cont(&values, 1.0), 40.0);
}

#[test]
fn fixed_buckets_count_underflow_middle_and_overflow() {
    let buckets = fixed_buckets(&[0.0, 1.0, 2.0], &[-1.0, 0.0, 0.5, 1.5, 2.0])
        .expect("fixed bucket strategy should succeed");

    let counts = buckets
        .iter()
        .map(|bucket| bucket.count)
        .collect::<Vec<_>>();
    assert_eq!(counts, vec![1, 2, 1, 1]);
}

#[test]
fn quantile_strategy_deduplicates_edges_for_repeated_values() {
    let edges = quantile_edges(&[1.0, 1.0, 1.0, 2.0, 3.0], 4)
        .expect("quantile bucket strategy should succeed");

    assert_eq!(edges, vec![1.0, 2.0]);
}

#[test]
fn selected_stat_definitions_rejects_unknown_keys() {
    let error = selected_stat_definitions(&["not_a_stat".to_owned()])
        .expect_err("unknown stat keys should fail");

    assert!(error.to_string().contains("unknown population stat key"));
}

#[test]
fn counting_stats_are_registered_as_per_five_minutes() {
    let goals = definition_by_key("goals_per_5_minutes")
        .expect("goals per five minutes should be registered");

    assert!(goals.value_kind.stat_value_sql().contains("/ 300.0"));
    assert!(definition_by_key("goals_per_game").is_none());
}
