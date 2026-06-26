// The aerial mechanic event types that anchor a watchable clip, paired with the
// human label shown in the playlist header and on links. These mirror the MIX
// panel mechanics in aerials.tsx (each is a discrete, time-anchored mechanic
// event). Kept in a dependency-light module so both the lightweight stats views
// and the lazily-loaded clip playlist can share one source of truth without
// pulling the replay player into the main bundle.
export const AERIAL_KIND_LABELS: Record<string, string> = {
  flip_reset: "Flip reset",
  double_tap: "Double tap",
  air_dribble: "Air dribble",
  wall_aerial: "Wall aerial",
  ceiling_shot: "Ceiling shot",
};

export const aerialPlaylistKinds = Object.keys(AERIAL_KIND_LABELS);

export function aerialKindLabel(kind: string): string {
  return (
    AERIAL_KIND_LABELS[kind] ??
    kind.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase())
  );
}
