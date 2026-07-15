use super::*;
use serde_json::json;

// Expected probabilities below were produced by the Python classes themselves
// (`LogReg` / `TreeEnsembleModel` / `BoostedTreeModel` in `ml/mistakes.py`)
// over the same hand-built blobs, printed at full precision.
const TOL: f64 = 1e-12;

fn logreg_blob() -> Value {
    json!({
        "n": 3,
        "w": [0.75, -1.5, 2.0],
        "b": -0.25,
        "keep_threshold": 0.446289,
        "input_center": [1.0, 2.0, -3.0],
        // The 0.0 component must be coerced to 1.0 (`abs(v) <= 1e-12`).
        "input_scale": [2.0, 0.0, 0.5],
    })
}

fn tree_ensemble_trees() -> Value {
    json!([
        [
            {"left": 1, "right": 2, "feature": 0, "threshold": 0.5},
            {"left": -1, "right": -1, "pos_proba": 0.2},
            // Feature 5 is out of range for a 2-feature input: reads 0.0.
            {"left": 3, "right": 4, "feature": 5, "threshold": -0.25},
            {"left": -1, "right": -1, "pos_proba": 0.9},
            {"left": -1, "right": -1, "pos_proba": 0.6},
        ],
        [{"left": -1, "right": -1, "pos_proba": 0.35}],
    ])
}

fn boosted_trees() -> Value {
    json!([
        [
            {"left": 1, "right": 2, "feature": 1, "threshold": 10.0},
            {"left": -1, "right": -1, "value": -1.5},
            {"left": -1, "right": -1, "value": 2.25},
        ],
        [{"left": -1, "right": -1, "value": 0.75}],
    ])
}

fn parse(blob: Value) -> MistakeModel {
    parse_model_blob(blob.as_object().unwrap()).expect("blob should parse")
}

fn assert_close(ours: f64, python: f64) {
    assert!(
        (ours - python).abs() <= TOL,
        "ours={ours} python oracle={python}"
    );
}

#[test]
fn logreg_transform_matches_python() {
    let model = parse(logreg_blob());
    assert_close(model.predict_proba(&[2.0, 5.0, -2.5]), 0.08509904500702024);
    assert_eq!(model.keep_threshold(), 0.446289);
}

#[test]
fn logreg_without_transform_defaults_keep_and_truncates() {
    let model = parse(json!({"n": 3, "w": [0.4, -0.2, 0.9], "b": 0.1}));
    assert_close(model.predict_proba(&[1.0, 2.0, 3.0]), 0.9426758241011313);
    // Python's zip truncates when x is shorter than w.
    assert_close(model.predict_proba(&[1.0, 2.0]), 0.52497918747894);
    assert_eq!(model.keep_threshold(), MODEL_KEEP);
}

#[test]
fn logreg_sigmoid_negative_branch() {
    let model = parse(json!({"n": 1, "w": [-3.0], "b": -2.0}));
    assert_close(model.predict_proba(&[4.0]), 8.315280276641321e-07);
}

#[test]
fn logreg_transform_length_mismatch_is_a_parse_failure() {
    let blob = json!({
        "n": 3,
        "w": [0.4, -0.2, 0.9],
        "b": 0.1,
        "input_center": [1.0, 2.0],
        "input_scale": [1.0, 1.0],
    });
    assert!(parse_model_blob(blob.as_object().unwrap()).is_none());
}

#[test]
fn logreg_transform_needs_both_center_and_scale() {
    // Python only applies the transform when both are lists.
    let blob = json!({
        "n": 3,
        "w": [0.4, -0.2, 0.9],
        "b": 0.1,
        "input_center": [10.0, 10.0, 10.0],
        "input_scale": null,
    });
    let model = parse(blob);
    assert_close(model.predict_proba(&[1.0, 2.0, 3.0]), 0.9426758241011313);
}

#[test]
fn tree_ensemble_matches_python() {
    let model = parse(json!({
        "model_type": "tree_ensemble",
        "n": 2,
        "trees": tree_ensemble_trees(),
        "keep_threshold": 0.55,
    }));
    // x[0] == threshold branches LEFT (`value <= threshold`).
    assert_close(model.predict_proba(&[0.5, 0.0]), 0.275);
    // Right subtree reads out-of-range feature 5 as 0.0 -> right leaf.
    assert_close(model.predict_proba(&[0.6, 0.0]), 0.475);
    assert_eq!(model.keep_threshold(), 0.55);
}

#[test]
fn tree_ensemble_with_no_trees_scores_zero() {
    let model = parse(json!({"model_type": "tree_ensemble", "n": 2, "trees": []}));
    assert_close(model.predict_proba(&[1.0, 2.0]), 0.0);
    assert_eq!(model.keep_threshold(), MODEL_KEEP);
}

#[test]
fn boosted_trees_match_python() {
    let model = parse(json!({
        "model_type": "boosted_trees",
        "n": 2,
        "trees": boosted_trees(),
        "base_score": 0.125,
        "learning_rate": 0.3,
        "keep_threshold": 0.6,
    }));
    assert_close(model.predict_proba(&[0.0, 10.0]), 0.47502081252106);
    assert_close(model.predict_proba(&[0.0, 10.5]), 0.7359453939271484);
}

#[test]
fn boosted_trees_defaults_match_python() {
    let model = parse(json!({
        "model_type": "boosted_trees",
        "n": 2,
        "trees": [[{"left": -1, "right": -1, "value": 1.0}]],
    }));
    assert_close(model.predict_proba(&[0.0, 0.0]), 0.52497918747894);
    assert_eq!(model.keep_threshold(), MODEL_KEEP);
}

#[test]
fn unknown_model_type_falls_back_to_logreg() {
    let model = parse(json!({
        "model_type": "random_forest",
        "n": 3,
        "w": [0.4, -0.2, 0.9],
        "b": 0.1,
    }));
    assert!(matches!(model, MistakeModel::LogReg(_)));
}

#[test]
fn empty_or_invalid_trees_fail_the_blob() {
    for trees in [json!([[]]), json!("nope"), json!([[{"left": "x"}]])] {
        let blob = json!({"model_type": "tree_ensemble", "n": 2, "trees": trees});
        assert!(
            parse_model_blob(blob.as_object().unwrap()).is_none(),
            "trees={trees} should fail"
        );
    }
}

#[test]
fn backward_or_out_of_bounds_children_fail_the_blob() {
    // Python only crashes at predict time on these; we reject them at load so
    // the tree walk provably terminates.
    for tree in [
        json!([{"left": 0, "right": 1, "feature": 0, "threshold": 0.0},
               {"left": -1, "right": -1, "pos_proba": 1.0}]),
        json!([{"left": 1, "right": 9, "feature": 0, "threshold": 0.0},
               {"left": -1, "right": -1, "pos_proba": 1.0}]),
    ] {
        let blob = json!({"model_type": "tree_ensemble", "n": 2, "trees": [tree]});
        assert!(parse_model_blob(blob.as_object().unwrap()).is_none());
    }
}

// --- ModelSet / artifact-document loading -----------------------------------

fn valid_doc() -> Value {
    json!({
        "schema_version": FEATURE_SCHEMA_VERSION,
        "models": {
            // 9 features — matches FEATURE_NAMES["too_far_from_play"].
            "too_far_from_play": {
                "n": 9,
                "w": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
                "b": 0.0,
            },
            "overcommitting_last_man": {
                "model_type": "tree_ensemble",
                "n": 9,
                "trees": [[{"left": -1, "right": -1, "pos_proba": 0.8}]],
                "keep_threshold": 0.5,
            },
        },
    })
}

#[test]
fn loads_known_kinds_and_leaves_the_rest_on_the_heuristic_path() {
    let set = ModelSet::from_json_str(&valid_doc().to_string()).unwrap();
    assert_eq!(set.len(), 2);
    assert!(set.get("too_far_from_play").is_some());
    assert!(set.get("overcommitting_last_man").is_some());
    // Per-kind fallback: kinds without a model stay heuristic.
    assert!(set.get("floating_with_boost").is_none());
}

#[test]
fn schema_version_mismatch_discards_the_document() {
    let mut doc = valid_doc();
    doc["schema_version"] = json!(2);
    assert_eq!(
        ModelSet::from_json_str(&doc.to_string()).unwrap_err(),
        ModelLoadError::SchemaVersionMismatch {
            found: 2,
            expected: FEATURE_SCHEMA_VERSION as i64
        }
    );
    // Absent reads as 0 (Python `doc.get("schema_version", 0)`).
    let mut doc = valid_doc();
    doc.as_object_mut().unwrap().remove("schema_version");
    assert_eq!(
        ModelSet::from_json_str(&doc.to_string()).unwrap_err(),
        ModelLoadError::SchemaVersionMismatch {
            found: 0,
            expected: FEATURE_SCHEMA_VERSION as i64
        }
    );
}

#[test]
fn invalid_documents_are_errors_not_empty_sets() {
    assert!(matches!(
        ModelSet::from_json_str("{not json"),
        Err(ModelLoadError::InvalidJson(_))
    ));
    assert!(matches!(
        ModelSet::from_json_str("[1, 2]"),
        Err(ModelLoadError::InvalidDocument(_))
    ));
    let doc = json!({"schema_version": FEATURE_SCHEMA_VERSION, "models": [1]});
    assert!(matches!(
        ModelSet::from_json_str(&doc.to_string()),
        Err(ModelLoadError::InvalidDocument(_))
    ));
}

#[test]
fn missing_or_null_models_load_as_empty() {
    let doc = json!({"schema_version": FEATURE_SCHEMA_VERSION});
    assert!(ModelSet::from_json_str(&doc.to_string())
        .unwrap()
        .is_empty());
    let doc = json!({"schema_version": FEATURE_SCHEMA_VERSION, "models": null});
    assert!(ModelSet::from_json_str(&doc.to_string())
        .unwrap()
        .is_empty());
}

#[test]
fn unknown_kinds_and_bad_blobs_are_skipped_not_fatal() {
    let mut doc = valid_doc();
    let models = doc["models"].as_object_mut().unwrap();
    models.insert("not_a_kind".into(), json!({"n": 9, "w": [], "b": 0.0}));
    models.insert("bad_kickoff".into(), json!({"n": 9, "w": "corrupt"}));
    models.insert("poor_landing".into(), json!(42));
    let set = ModelSet::from_json_str(&doc.to_string()).unwrap();
    assert_eq!(set.len(), 2);
    assert!(set.get("bad_kickoff").is_none());
    assert!(set.get("poor_landing").is_none());
}

#[test]
fn feature_count_mismatch_is_a_load_failure_for_that_kind() {
    let mut doc = valid_doc();
    // bumping_teammate has 10 feature columns; a 9-feature model is stale.
    doc["models"]["bumping_teammate"] = json!({
        "n": 9,
        "w": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
        "b": 0.0,
    });
    let set = ModelSet::from_json_str(&doc.to_string()).unwrap();
    assert!(set.get("bumping_teammate").is_none());
    assert_eq!(set.len(), 2);
}
