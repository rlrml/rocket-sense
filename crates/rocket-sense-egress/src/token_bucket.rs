use std::time::{Duration, Instant};

/// A simple token bucket used to rate-limit a single exit.
///
/// `reserve` always succeeds and instead reports how long the caller should
/// wait before sending, letting the bucket go transiently negative and "pay it
/// back" via refill. This keeps the sustained dispatch rate at `rate` req/s
/// with bursts up to `burst`, without ever rejecting a request outright.
pub(crate) struct TokenBucket {
    tokens: f64,
    rate: f64,
    burst: f64,
    last_refill: Instant,
}

impl TokenBucket {
    pub(crate) fn new(rate: f64, burst: f64) -> Self {
        let rate = rate.max(f64::MIN_POSITIVE);
        let burst = burst.max(1.0);
        Self {
            tokens: burst,
            rate,
            burst,
            last_refill: Instant::now(),
        }
    }

    fn refill(&mut self, now: Instant) {
        let elapsed = now
            .saturating_duration_since(self.last_refill)
            .as_secs_f64();
        self.tokens = (self.tokens + elapsed * self.rate).min(self.burst);
        self.last_refill = now;
    }

    /// Consume one token and return the delay to wait before sending (zero if a
    /// token was available immediately).
    pub(crate) fn reserve(&mut self) -> Duration {
        self.reserve_at(Instant::now())
    }

    fn reserve_at(&mut self, now: Instant) -> Duration {
        self.refill(now);
        self.tokens -= 1.0;
        if self.tokens >= 0.0 {
            Duration::ZERO
        } else {
            Duration::from_secs_f64(-self.tokens / self.rate)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn burst_is_free_then_throttles() {
        let now = Instant::now();
        // 1 req/s, burst of 2: two reservations are free, the third waits ~1s.
        let mut bucket = TokenBucket::new(1.0, 2.0);
        assert_eq!(bucket.reserve_at(now), Duration::ZERO);
        assert_eq!(bucket.reserve_at(now), Duration::ZERO);
        let wait = bucket.reserve_at(now);
        assert!((wait.as_secs_f64() - 1.0).abs() < 1e-6, "got {wait:?}");
    }

    #[test]
    fn deficit_grows_then_recovers_with_time() {
        let start = Instant::now();
        let mut bucket = TokenBucket::new(2.0, 1.0); // 2 req/s
        assert_eq!(bucket.reserve_at(start), Duration::ZERO);
        // Immediately reserve again: deficit of 1 token at 2/s -> wait 0.5s.
        let wait = bucket.reserve_at(start);
        assert!((wait.as_secs_f64() - 0.5).abs() < 1e-6, "got {wait:?}");
        // After a second, plenty refilled -> free again.
        let later = start + Duration::from_secs(1);
        assert_eq!(bucket.reserve_at(later), Duration::ZERO);
    }
}
