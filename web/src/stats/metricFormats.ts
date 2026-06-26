// Shared metric_key -> display formatting for benchmark values.
//
// Benchmark values are stored in their natural units: per-active-minute rates
// (counts, boost flows, possession counts, distance), `_share` fractions in
// 0..1, or raw averages (avg speed, avg boost, distance to ball). Both the Rank
// Trends page and the career-stats rank-average cohorts use this catalog so the
// same metric is scaled and formatted identically everywhere.

export interface MetricFormat {
  unit: string;
  // Scale applied to the stored value before display. Rates are stored per
  // active minute; the app shows player rates per 5 minutes (scale 5). Levels
  // (shares, averages) are never time-scaled (scale 1).
  scale: number;
  format: (value: number) => string;
}

export function numberFormat(v: number): string {
  const abs = Math.abs(v);
  if (abs >= 1000) return Math.round(v).toLocaleString();
  if (abs >= 100) return v.toFixed(0);
  if (abs >= 1) return v.toFixed(2);
  return v.toFixed(3);
}

export function metricFormat(key: string): MetricFormat {
  // Gauges and shares are levels, not rates — never scaled to a time window.
  if (key.endsWith("_share")) {
    return { unit: "% of time", scale: 1, format: (v) => `${(v * 100).toFixed(1)}%` };
  }
  if (key === "movement:avg_speed") {
    return { unit: "uu/s", scale: 1, format: (v) => Math.round(v).toLocaleString() };
  }
  if (key === "positioning:distance_to_ball") {
    return { unit: "uu", scale: 1, format: (v) => Math.round(v).toLocaleString() };
  }
  if (key === "boost:avg_amount") {
    return { unit: "avg boost", scale: 1, format: (v) => v.toFixed(0) };
  }
  // Counts / per-minute rates -> shown per 5 minutes, like the rest of the app.
  return { unit: "per 5 min", scale: 5, format: numberFormat };
}
