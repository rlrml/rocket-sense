export const LEGACY_SEASON_COUNT = 12;
export const FREE_TO_PLAY_SEASON_COUNT = 23;

type SeasonEra = "legacy" | "free-to-play";

interface ParsedSeasonCode {
  era: SeasonEra;
  number: number;
}

const seasonCodePattern = /^([sf])(\d+)$/i;

function parseSeasonCode(value: string): ParsedSeasonCode | null {
  const match = value.trim().match(seasonCodePattern);
  if (!match) return null;

  const prefix = match[1].toLowerCase() as "s" | "f";
  const number = Number.parseInt(match[2], 10);
  if (!Number.isFinite(number) || number <= 0) return null;

  return {
    era: prefix === "s" ? "legacy" : "free-to-play",
    number,
  };
}

// The season counter reset when the game went free-to-play, so each era has its
// own season 1. Spelling out the legacy era ("Season 1") and abbreviating the
// free-to-play era ("S1") is what keeps the two numbering schemes apart.
export function formatSeasonLabel(value: string): string {
  const parsed = parseSeasonCode(value);
  if (!parsed) return value;

  return parsed.era === "legacy" ? `Season ${parsed.number}` : `S${parsed.number}`;
}

/** Chronological comparison across the legacy and free-to-play numbering eras. */
export function compareSeasonCodes(left: string, right: string): number {
  const leftSeason = parseSeasonCode(left);
  const rightSeason = parseSeasonCode(right);
  if (!leftSeason || !rightSeason) return left.localeCompare(right);
  if (leftSeason.era !== rightSeason.era) {
    return leftSeason.era === "legacy" ? -1 : 1;
  }
  return leftSeason.number - rightSeason.number;
}

export function buildSeasonOptions(
  anyLabel: string,
  options: { newestFirst?: boolean } = {},
): Array<{ value: string; label: string }> {
  // Chronological order (legacy s1..s12 then free-to-play f1..f23). Callers that
  // step through seasons rely on this order, so `newestFirst` only reverses the
  // display list for dropdowns — the default order is unchanged.
  const seasons = [
    ...Array.from({ length: LEGACY_SEASON_COUNT }, (_, index) => {
      const value = `s${index + 1}`;
      return { value, label: formatSeasonLabel(value) };
    }),
    ...Array.from({ length: FREE_TO_PLAY_SEASON_COUNT }, (_, index) => {
      const value = `f${index + 1}`;
      return { value, label: formatSeasonLabel(value) };
    }),
  ];
  if (options.newestFirst) seasons.reverse();
  return [{ value: "", label: anyLabel }, ...seasons];
}
