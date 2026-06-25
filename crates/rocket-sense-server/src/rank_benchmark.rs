//! Rank-median benchmark cohort: the window strategy plus shared constants used
//! by the refresh job (`processing.rs`), the read path (`api/stats.rs`), and
//! config parsing (`settings.rs`). See `docs/rank-benchmark-cohort.md`.

use std::fmt;

/// Minimum games a player must have in a `(window, group, tier, outcome)` cell
/// for their per-active-minute rates to enter the median. Keeps single-game /
/// smurf rates from polluting the benchmark.
pub const MIN_PLAYER_GAMES: i64 = 5;

/// Minimum distinct players for a `(window, group, tier, outcome)` cell to be
/// treated as an adequate sample. The tier picker exposes
/// `distinct_player_count` so the UI can hide or flag thinner tiers.
pub const MIN_SAMPLE: i64 = 20;

/// When fewer than this fraction of a stat's qualifying players ever perform the
/// event (so the per-player median is ~0), the refresh marks the stat
/// `aggregator = 'mean'` and the read serves the pooled rate instead -- a rare
/// mechanic (flip reset, air dribble, ...) otherwise flatlines at a 0 median.
pub const RARE_NONZERO_FRACTION: f64 = 0.5;

/// How many of a season's qualifying players are needed before `season:current`
/// resolves to that season rather than falling back to the most recent prior
/// season while the new one is still thin.
pub const SEASON_CURRENT_MIN_SAMPLE: i64 = MIN_SAMPLE;

/// Which season a [`BenchmarkWindow::Season`] targets.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SeasonSelector {
    /// The season containing the most recent replays, with a min-sample
    /// fallback to the most recent prior season while the new one is thin.
    Current,
    /// A specific season by its replay `season` code (e.g. `"f17"`).
    Code(String),
}

/// How the benchmark population is bounded in time. Each concrete window has a
/// stable [`window_key`](BenchmarkWindow::window_key) string used as the table
/// grain, the config token, and the read/override key.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum BenchmarkWindow {
    /// `replay_date >= now() - (months || ' months')::interval`. Always a
    /// healthy sample; drifts as the window slides.
    Rolling { months: u32 },
    /// A specific season (or the current one), ordered by `replay_date` range
    /// rather than the text code (`"f17"` does not sort reliably).
    Season(SeasonSelector),
}

/// Error returned when a `window_key` token cannot be parsed.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct BenchmarkWindowParseError(pub String);

impl fmt::Display for BenchmarkWindowParseError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "invalid rank benchmark window key: {:?}", self.0)
    }
}

impl std::error::Error for BenchmarkWindowParseError {}

impl BenchmarkWindow {
    /// The stable key string for this window. Round-trips through [`parse`].
    ///
    /// [`parse`]: BenchmarkWindow::parse
    pub fn window_key(&self) -> String {
        match self {
            BenchmarkWindow::Rolling { months } => format!("rolling-{months}m"),
            BenchmarkWindow::Season(SeasonSelector::Current) => "season:current".to_owned(),
            BenchmarkWindow::Season(SeasonSelector::Code(code)) => format!("season:{code}"),
        }
    }

    /// `"rolling"` or `"season"` -- matches `rank_benchmark_meta.window_kind`.
    pub fn kind(&self) -> &'static str {
        match self {
            BenchmarkWindow::Rolling { .. } => "rolling",
            BenchmarkWindow::Season(_) => "season",
        }
    }

    /// Parse a `window_key` token. Accepts `rolling-<n>m`, `season:current`, and
    /// `season:<code>`.
    pub fn parse(key: &str) -> Result<Self, BenchmarkWindowParseError> {
        let key = key.trim();
        if let Some(rest) = key.strip_prefix("rolling-") {
            let months = rest
                .strip_suffix('m')
                .and_then(|n| n.parse::<u32>().ok())
                .filter(|months| *months > 0)
                .ok_or_else(|| BenchmarkWindowParseError(key.to_owned()))?;
            return Ok(BenchmarkWindow::Rolling { months });
        }
        if let Some(rest) = key.strip_prefix("season:") {
            if rest == "current" {
                return Ok(BenchmarkWindow::Season(SeasonSelector::Current));
            }
            if !rest.is_empty() {
                return Ok(BenchmarkWindow::Season(SeasonSelector::Code(
                    rest.to_owned(),
                )));
            }
        }
        Err(BenchmarkWindowParseError(key.to_owned()))
    }

    /// A human label usable before the window is resolved against the database
    /// (the refresh job records a concrete label in `rank_benchmark_meta`).
    pub fn default_label(&self) -> String {
        match self {
            BenchmarkWindow::Rolling { months } => {
                if *months % 12 == 0 {
                    let years = months / 12;
                    if years == 1 {
                        "Last year".to_owned()
                    } else {
                        format!("Last {years} years")
                    }
                } else {
                    format!("Last {months} months")
                }
            }
            BenchmarkWindow::Season(SeasonSelector::Current) => "Current season".to_owned(),
            BenchmarkWindow::Season(SeasonSelector::Code(code)) => format!("Season {code}"),
        }
    }
}

/// Parse a comma/space/semicolon-separated list of window keys (the
/// `ROCKET_SENSE_RANK_BENCHMARK_WINDOWS` env value). Invalid tokens are
/// skipped with a warning so one bad token does not drop the whole list.
pub fn parse_window_list(value: &str) -> Vec<BenchmarkWindow> {
    let mut windows = Vec::new();
    for token in value.split([',', ';', '\n']) {
        let token = token.trim();
        if token.is_empty() {
            continue;
        }
        match BenchmarkWindow::parse(token) {
            Ok(window) => {
                if !windows.contains(&window) {
                    windows.push(window);
                }
            }
            Err(error) => {
                tracing::warn!(%error, "ignoring invalid rank benchmark window token");
            }
        }
    }
    windows
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rolling_round_trips() {
        let window = BenchmarkWindow::Rolling { months: 6 };
        assert_eq!(window.window_key(), "rolling-6m");
        assert_eq!(BenchmarkWindow::parse("rolling-6m"), Ok(window));
    }

    #[test]
    fn season_round_trips() {
        let current = BenchmarkWindow::Season(SeasonSelector::Current);
        assert_eq!(current.window_key(), "season:current");
        assert_eq!(BenchmarkWindow::parse("season:current"), Ok(current));

        let coded = BenchmarkWindow::Season(SeasonSelector::Code("f17".to_owned()));
        assert_eq!(coded.window_key(), "season:f17");
        assert_eq!(BenchmarkWindow::parse("season:f17"), Ok(coded));
    }

    #[test]
    fn rejects_garbage() {
        assert!(BenchmarkWindow::parse("rolling-0m").is_err());
        assert!(BenchmarkWindow::parse("rolling-m").is_err());
        assert!(BenchmarkWindow::parse("season:").is_err());
        assert!(BenchmarkWindow::parse("nonsense").is_err());
    }

    #[test]
    fn window_list_dedupes_and_skips_invalid() {
        let windows = parse_window_list("rolling-6m, nonsense, season:current, rolling-6m");
        assert_eq!(
            windows,
            vec![
                BenchmarkWindow::Rolling { months: 6 },
                BenchmarkWindow::Season(SeasonSelector::Current),
            ]
        );
    }
}
