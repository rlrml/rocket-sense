// Canonical place for converting raw Rocket League boost amounts into the
// 0-100 display scale.
//
// subtr-actor stores boost in raw replay units (0-255, where a full tank is
// 255 and a standard kickoff starts at 85). Values are kept raw all the way
// through storage and the bindings; the 0-255 -> 0-100 rescale must happen at
// the last moment, here at display time. Every boost number shown in the UI
// should go through these helpers so the conversion lives in exactly one spot.
//
// This is a local mirror of `boostAmountToPercent` from `@rlrml/player` (see
// subtr-actor `js/player/src/boost-units.ts`, which itself mirrors
// `boost_amount_to_percent` in `src/domain/boost_units.rs`). Once the web app
// consumes an `@rlrml/player` that exports it, drop this file and import the
// shared helper instead.

export const BOOST_RAW_MAX = 255;

export function boostAmountToPercent(value: number | null | undefined): number | null {
  if (value == null) return null;
  return (value * 100) / BOOST_RAW_MAX;
}

/** Formats a raw boost amount as a rounded, localized display percentage. */
export function formatBoostPercent(value: number | null | undefined): string {
  const percent = boostAmountToPercent(value);
  return percent == null ? "-" : Math.round(percent).toLocaleString();
}
