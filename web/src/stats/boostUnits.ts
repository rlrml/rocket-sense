// Boost display-unit helpers for the web UI.
//
// subtr-actor stores boost in raw replay units (0-255, where a full tank is 255
// and a standard kickoff starts at 85), kept raw all the way through storage
// and the bindings. The raw 0-255 -> 0-100 rescale lives in `@rlrml/player`
// (`boostAmountToPercent`, from subtr-actor `js/player/src/boost-units.ts`,
// which mirrors `boost_amount_to_percent` in `src/domain/boost_units.rs`) and
// is imported here through the player package so the
// conversion has a single home shared across subtr-actor and this app. This
// module only layers the web's presentation conventions on top.

export { boostAmountToPercent } from "@rlrml/player";

import { boostAmountToPercent } from "@rlrml/player";

/** Formats a raw boost amount as a rounded, localized display percentage. */
export function formatBoostPercent(value: number | null | undefined): string {
  const percent = boostAmountToPercent(value);
  return percent == null ? "-" : Math.round(percent).toLocaleString();
}
