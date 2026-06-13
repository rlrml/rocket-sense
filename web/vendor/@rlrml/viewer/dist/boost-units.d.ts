/** The maximum raw boost value stored in replay data. */
export declare const BOOST_RAW_MAX = 255;
/** Converts a raw replay boost amount (`0..=255`) to a percentage (`0..=100`). */
export declare function boostAmountToPercent(amount: number): number;
export declare function boostAmountToPercent(amount: number | null | undefined): number | null;
/** Converts a boost percentage (`0..=100`) to a raw replay boost amount (`0..=255`). */
export declare function boostPercentToAmount(percent: number): number;
export declare function boostPercentToAmount(percent: number | null | undefined): number | null;
//# sourceMappingURL=boost-units.d.ts.map