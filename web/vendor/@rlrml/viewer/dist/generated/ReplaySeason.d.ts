import type { SeasonEra } from "./SeasonEra.ts";
/**
 * A resolved competitive season, identified by its numbering era and number.
 */
export type ReplaySeason = {
    /**
     * Which numbering era the season belongs to.
     */
    era: SeasonEra;
    /**
     * Season number within its era (1-based).
     */
    number: number;
};
//# sourceMappingURL=ReplaySeason.d.ts.map