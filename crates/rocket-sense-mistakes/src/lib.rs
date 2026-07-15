//! Heuristic mistake detection over Rocket League replay frame data.
//!
//! This crate is a faithful Rust port of RLVision's `ml/mistakes.py`
//! heuristic-detector pipeline (15 detector kinds), targeting subtr-actor
//! frame data and WebAssembly execution in the Rocket Sense replay viewer.
//!
//! The per-kind reranker's *inference* path is ported too ([`model`]): the
//! three model families, the `mistake_models.json` loader, and the
//! keep-threshold gate in [`pipeline::predict_mistakes`]. Out of scope by
//! design: model training, saving, threshold calibration, the retrain
//! endpoint, and the manual-label feature-extraction path — training stays
//! offline in the Python system.
//!
//! See `docs/mistake-detection-port.md` in the repo root for the
//! data-mapping notes (RLAgent parser ↔ subtr-actor divergences).

// This crate is a deliberately line-faithful port of `ml/mistakes.py`. Keep
// max/min chains (their NaN semantics match Python's min/max, unlike
// `clamp`), index loops, and long feature-builder argument lists shaped like
// the Python source so diffs against the oracle stay reviewable.
#![allow(clippy::manual_clamp)]
#![allow(clippy::too_many_arguments)]
#![allow(clippy::needless_range_loop)]
#![allow(clippy::type_complexity)]

pub mod candidate;
pub mod detectors;
pub mod grid;
pub mod kinds;
pub mod model;
pub mod pipeline;
pub mod profile;
pub mod rlagent_json;
pub mod subtr_adapter;
pub mod touches;
pub mod view;

pub use candidate::{Candidate, Marker};
pub use model::{MistakeModel, ModelLoadError, ModelSet};
pub use pipeline::{generate_mistake_candidates, predict_mistakes, resolve_focus_idx};
pub use profile::DetectorProfile;
pub use view::ReplayView;

/// Bump when detector behavior changes in a way that should re-identify
/// eagerly materialized mistake events.
pub const DETECTOR_VERSION: &str = "mistakes-v1";

#[cfg(test)]
#[path = "golden_tests.rs"]
mod golden_tests;
