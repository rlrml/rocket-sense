//! The reranker's inference path: the three model families (`LogReg`,
//! `TreeEnsembleModel`, `BoostedTreeModel`) and the `mistake_models.json`
//! artifact loader (`load_models`), ported from `ml/mistakes.py`.
//!
//! Only inference is ported — training, saving, threshold calibration, and
//! the retrain endpoint stay in the Python system. This module does no file
//! or network I/O: callers hand [`ModelSet::from_json_str`] the artifact
//! document text and pass the result to `pipeline::predict_mistakes`.
//!
//! Loader semantics mirror Python's `load_models` with one deliberate
//! difference: Python silently returns `{}` when the document is unreadable
//! or its `schema_version` doesn't match, whereas here those are `Err` so the
//! caller can fail loudly (log, surface, fall back to an empty set) instead
//! of silently scoring nothing. Per-kind blobs that fail to parse are skipped
//! non-fatally, exactly like Python.

use crate::kinds::{feature_names, FEATURE_SCHEMA_VERSION, KINDS};
use serde_json::{Map, Value};
use std::collections::HashMap;
use std::fmt;

/// `_MODEL_KEEP` — the keep-threshold fallback when a blob omits its own.
pub const MODEL_KEEP: f64 = 0.4;

/// `_sigmoid` (the numerically stable two-branch form).
fn sigmoid(z: f64) -> f64 {
    if z >= 0.0 {
        1.0 / (1.0 + (-z).exp())
    } else {
        let e = z.exp();
        e / (1.0 + e)
    }
}

/// `LogReg`: `sigmoid(b + w·x)` over the center/scale-transformed input.
#[derive(Debug, Clone)]
pub struct LogReg {
    n: usize,
    w: Vec<f64>,
    b: f64,
    keep_threshold: f64,
    /// `input_center`/`input_scale` are both present or both absent
    /// (`set_input_transform`); scale components with `abs(v) <= 1e-12` were
    /// coerced to `1.0` at load time.
    input_center: Option<Vec<f64>>,
    input_scale: Option<Vec<f64>>,
}

impl LogReg {
    /// `LogReg.predict_proba`. Python's `zip` truncates to the shorter side
    /// both in `_transform` and in the dot product; mirror that rather than
    /// assuming `len(x) == n`.
    pub fn predict_proba(&self, x: &[f64]) -> f64 {
        let transformed: Vec<f64> = match (&self.input_center, &self.input_scale) {
            (Some(center), Some(scale)) => x
                .iter()
                .zip(center.iter())
                .zip(scale.iter())
                .map(|((value, center), scale)| (value - center) / scale)
                .collect(),
            _ => x.to_vec(),
        };
        let mut dot = 0.0;
        for (wi, xi) in self.w.iter().zip(transformed.iter()) {
            dot += wi * xi;
        }
        sigmoid(self.b + dot)
    }
}

/// One node of a serialized binary tree. Leaves are nodes with `left < 0` or
/// `right < 0`; `leaf_value` holds `pos_proba` (tree_ensemble) or `value`
/// (boosted_trees).
#[derive(Debug, Clone)]
struct TreeNode {
    left: i64,
    right: i64,
    feature: i64,
    threshold: f64,
    leaf_value: f64,
}

/// Walk a tree from node 0: `left if x[feature] <= threshold else right`,
/// out-of-range feature indices reading as `0.0`.
fn tree_leaf_value(tree: &[TreeNode], x: &[f64]) -> f64 {
    let mut node_index = 0usize;
    loop {
        let node = &tree[node_index];
        if node.left < 0 || node.right < 0 {
            return node.leaf_value;
        }
        let value = if node.feature >= 0 && (node.feature as usize) < x.len() {
            x[node.feature as usize]
        } else {
            0.0
        };
        node_index = if value <= node.threshold {
            node.left as usize
        } else {
            node.right as usize
        };
    }
}

/// `TreeEnsembleModel`: unweighted mean of per-tree leaf `pos_proba`.
#[derive(Debug, Clone)]
pub struct TreeEnsembleModel {
    n: usize,
    trees: Vec<Vec<TreeNode>>,
    keep_threshold: f64,
}

impl TreeEnsembleModel {
    pub fn predict_proba(&self, x: &[f64]) -> f64 {
        if self.trees.is_empty() {
            return 0.0;
        }
        let mut total = 0.0;
        for tree in &self.trees {
            total += tree_leaf_value(tree, x);
        }
        total / self.trees.len() as f64
    }
}

/// `BoostedTreeModel`: `sigmoid(base_score + learning_rate * Σ tree_value)`.
#[derive(Debug, Clone)]
pub struct BoostedTreeModel {
    n: usize,
    trees: Vec<Vec<TreeNode>>,
    base_score: f64,
    learning_rate: f64,
    keep_threshold: f64,
}

impl BoostedTreeModel {
    pub fn predict_proba(&self, x: &[f64]) -> f64 {
        let mut raw = self.base_score;
        for tree in &self.trees {
            raw += self.learning_rate * tree_leaf_value(tree, x);
        }
        sigmoid(raw)
    }
}

/// One loaded per-kind model (`MistakeModel` in Python).
#[derive(Debug, Clone)]
pub enum MistakeModel {
    LogReg(LogReg),
    TreeEnsemble(TreeEnsembleModel),
    BoostedTrees(BoostedTreeModel),
}

impl MistakeModel {
    pub fn predict_proba(&self, x: &[f64]) -> f64 {
        match self {
            MistakeModel::LogReg(m) => m.predict_proba(x),
            MistakeModel::TreeEnsemble(m) => m.predict_proba(x),
            MistakeModel::BoostedTrees(m) => m.predict_proba(x),
        }
    }

    pub fn keep_threshold(&self) -> f64 {
        match self {
            MistakeModel::LogReg(m) => m.keep_threshold,
            MistakeModel::TreeEnsemble(m) => m.keep_threshold,
            MistakeModel::BoostedTrees(m) => m.keep_threshold,
        }
    }

    fn n(&self) -> usize {
        match self {
            MistakeModel::LogReg(m) => m.n,
            MistakeModel::TreeEnsemble(m) => m.n,
            MistakeModel::BoostedTrees(m) => m.n,
        }
    }
}

/// Why an artifact document was rejected as a whole (per-kind failures are
/// skips, not errors).
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ModelLoadError {
    /// The text is not valid JSON.
    InvalidJson(String),
    /// The document or its `models` member has the wrong shape.
    InvalidDocument(&'static str),
    /// `schema_version` doesn't match `FEATURE_SCHEMA_VERSION` — a stale
    /// artifact must be discarded, not scored (Python silently returns `{}`).
    SchemaVersionMismatch { found: i64, expected: i64 },
}

impl fmt::Display for ModelLoadError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ModelLoadError::InvalidJson(err) => write!(f, "invalid JSON: {err}"),
            ModelLoadError::InvalidDocument(what) => write!(f, "invalid artifact: {what}"),
            ModelLoadError::SchemaVersionMismatch { found, expected } => write!(
                f,
                "schema_version {found} does not match detector feature schema {expected}"
            ),
        }
    }
}

/// The per-kind models loaded from one `mistake_models.json` document.
/// An empty set reproduces the heuristic (`score == severity`) path exactly.
#[derive(Debug, Clone, Default)]
pub struct ModelSet {
    models: HashMap<&'static str, MistakeModel>,
}

impl ModelSet {
    /// `load_models` over an already-read artifact document. Kinds outside
    /// `KINDS`, blobs that fail to parse, and models whose `n` doesn't match
    /// `len(FEATURE_NAMES[kind])` are skipped; the whole document is rejected
    /// on JSON/shape errors or a `schema_version` mismatch.
    pub fn from_json_str(text: &str) -> Result<ModelSet, ModelLoadError> {
        let doc: Value =
            serde_json::from_str(text).map_err(|e| ModelLoadError::InvalidJson(e.to_string()))?;
        let doc = doc
            .as_object()
            .ok_or(ModelLoadError::InvalidDocument("document is not an object"))?;

        // Python: `int(doc.get("schema_version", 0))` — absent reads as 0
        // and floats truncate toward zero.
        let found = match doc.get("schema_version") {
            None => 0,
            Some(v) => as_int(v).ok_or(ModelLoadError::InvalidDocument(
                "schema_version is not a number",
            ))?,
        };
        if found != FEATURE_SCHEMA_VERSION as i64 {
            return Err(ModelLoadError::SchemaVersionMismatch {
                found,
                expected: FEATURE_SCHEMA_VERSION as i64,
            });
        }

        let blobs = match doc.get("models") {
            None | Some(Value::Null) => return Ok(ModelSet::default()),
            Some(value) => value
                .as_object()
                .ok_or(ModelLoadError::InvalidDocument("models is not an object"))?,
        };

        let mut models: HashMap<&'static str, MistakeModel> = HashMap::new();
        for (kind, blob) in blobs {
            let Some(kind) = KINDS.iter().copied().find(|k| k == kind) else {
                continue;
            };
            let Some(blob) = blob.as_object() else {
                continue;
            };
            let Some(model) = parse_model_blob(blob) else {
                continue;
            };
            // Not in Python (its zips silently truncate): a model trained on
            // a different column count than this build's feature schema is a
            // load failure for that kind, not a silent partial dot product.
            if model.n() != feature_names(kind).len() {
                continue;
            }
            models.insert(kind, model);
        }
        Ok(ModelSet { models })
    }

    pub fn get(&self, kind: &str) -> Option<&MistakeModel> {
        self.models.get(kind)
    }

    pub fn len(&self) -> usize {
        self.models.len()
    }

    pub fn is_empty(&self) -> bool {
        self.models.is_empty()
    }
}

/// `float(...)` over the JSON types the artifact can carry (Python also
/// accepts numeric strings; a non-number here fails the blob instead).
fn as_float(value: &Value) -> Option<f64> {
    match value {
        Value::Number(n) => n.as_f64(),
        Value::Bool(b) => Some(if *b { 1.0 } else { 0.0 }),
        _ => None,
    }
}

/// `int(...)`: truncation toward zero.
fn as_int(value: &Value) -> Option<i64> {
    as_float(value).map(|f| f.trunc() as i64)
}

fn get_float(blob: &Map<String, Value>, key: &str, default: f64) -> Option<f64> {
    match blob.get(key) {
        None => Some(default),
        Some(value) => as_float(value),
    }
}

/// `load_models`' per-kind dispatch: `"tree_ensemble"` / `"boosted_trees"`
/// by `model_type`, anything else (including absent) parses as `LogReg`.
/// `None` means the blob is skipped (Python's caught `KeyError` /
/// `ValueError` / `TypeError`).
fn parse_model_blob(blob: &Map<String, Value>) -> Option<MistakeModel> {
    match blob.get("model_type").and_then(Value::as_str) {
        Some("tree_ensemble") => parse_tree_ensemble(blob),
        Some("boosted_trees") => parse_boosted_trees(blob),
        _ => parse_logreg(blob),
    }
}

/// `LogReg.from_dict` + `set_input_transform`.
fn parse_logreg(blob: &Map<String, Value>) -> Option<MistakeModel> {
    let n = as_int(blob.get("n")?)?;
    if n < 0 {
        return None;
    }
    let n = n as usize;
    let w: Vec<f64> = blob
        .get("w")?
        .as_array()?
        .iter()
        .map(as_float)
        .collect::<Option<_>>()?;
    let b = as_float(blob.get("b")?)?;
    let keep_threshold = get_float(blob, "keep_threshold", MODEL_KEEP)?;

    // The transform only applies when BOTH center and scale are lists; a
    // length mismatch raises in Python and discards the kind.
    let (input_center, input_scale) = match (blob.get("input_center"), blob.get("input_scale")) {
        (Some(Value::Array(center)), Some(Value::Array(scale))) => {
            if center.len() != n || scale.len() != n {
                return None;
            }
            let center: Vec<f64> = center.iter().map(as_float).collect::<Option<_>>()?;
            let scale: Vec<f64> = scale
                .iter()
                .map(|v| as_float(v).map(|v| if v.abs() > 1e-12 { v } else { 1.0 }))
                .collect::<Option<_>>()?;
            (Some(center), Some(scale))
        }
        _ => (None, None),
    };

    Some(MistakeModel::LogReg(LogReg {
        n,
        w,
        b,
        keep_threshold,
        input_center,
        input_scale,
    }))
}

/// The shared tree normalization from the two tree `from_dict`s. `leaf_key`
/// is `"pos_proba"` (tree_ensemble) or `"value"` (boosted_trees). Beyond
/// Python (which would loop or index out of bounds at *predict* time on a
/// corrupt tree — an uncaught crash there, an unacceptable wasm abort here),
/// child indices must point forward and in bounds, which guarantees the walk
/// terminates.
fn parse_trees(blob: &Map<String, Value>, leaf_key: &str) -> Option<Vec<Vec<TreeNode>>> {
    let trees = blob.get("trees")?.as_array()?;
    let mut normalized: Vec<Vec<TreeNode>> = Vec::with_capacity(trees.len());
    for raw_tree in trees {
        let raw_tree = raw_tree.as_array()?;
        if raw_tree.is_empty() {
            return None;
        }
        let mut tree: Vec<TreeNode> = Vec::with_capacity(raw_tree.len());
        for raw_node in raw_tree {
            let raw_node = raw_node.as_object()?;
            let get_int = |key: &str| match raw_node.get(key) {
                None => Some(-1),
                Some(value) => as_int(value),
            };
            tree.push(TreeNode {
                left: get_int("left")?,
                right: get_int("right")?,
                feature: get_int("feature")?,
                threshold: get_float(raw_node, "threshold", 0.0)?,
                leaf_value: get_float(raw_node, leaf_key, 0.0)?,
            });
        }
        for (i, node) in tree.iter().enumerate() {
            if node.left < 0 || node.right < 0 {
                continue;
            }
            let (left, right) = (node.left as usize, node.right as usize);
            if left <= i || right <= i || left >= tree.len() || right >= tree.len() {
                return None;
            }
        }
        normalized.push(tree);
    }
    Some(normalized)
}

/// `TreeEnsembleModel.from_dict`.
fn parse_tree_ensemble(blob: &Map<String, Value>) -> Option<MistakeModel> {
    let n = as_int(blob.get("n")?)?;
    if n < 0 {
        return None;
    }
    Some(MistakeModel::TreeEnsemble(TreeEnsembleModel {
        n: n as usize,
        trees: parse_trees(blob, "pos_proba")?,
        keep_threshold: get_float(blob, "keep_threshold", MODEL_KEEP)?,
    }))
}

/// `BoostedTreeModel.from_dict`.
fn parse_boosted_trees(blob: &Map<String, Value>) -> Option<MistakeModel> {
    let n = as_int(blob.get("n")?)?;
    if n < 0 {
        return None;
    }
    Some(MistakeModel::BoostedTrees(BoostedTreeModel {
        n: n as usize,
        trees: parse_trees(blob, "value")?,
        base_score: get_float(blob, "base_score", 0.0)?,
        learning_rate: get_float(blob, "learning_rate", 0.1)?,
        keep_threshold: get_float(blob, "keep_threshold", MODEL_KEEP)?,
    }))
}

#[cfg(test)]
#[path = "model_tests.rs"]
mod tests;
