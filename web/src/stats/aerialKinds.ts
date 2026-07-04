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

// Collapses the eight attack-relative WallAerialWall values into a left / right
// handedness, folding each rounded corner into its side wall. The pure end
// walls (front / back) have no side, so they land in "end". Shared by the
// stats panel and the clip playlist's `?side=` filter.
export type WallAerialSide = "left" | "right" | "end";

export function wallAerialSide(wall: string): WallAerialSide | null {
  switch (wall) {
    case "left":
    case "front_left":
    case "back_left":
      return "left";
    case "right":
    case "front_right":
    case "back_right":
      return "right";
    case "front":
    case "back":
      return "end";
    default:
      return null;
  }
}
