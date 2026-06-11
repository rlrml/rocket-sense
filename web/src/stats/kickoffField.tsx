// Scale-accurate geometry for the standard Rocket League soccar pitch, shared by
// every kickoff diagram (mini, icon, and the large path view) so they all agree
// on field shape and coordinate mapping.
//
// Field axes (Unreal units, uu):
//   X  — side to side, walls at +/- 4096 (full width 8192)
//   Y  — goal to goal,  goal lines at +/- 5120 (full length 10240)
// The pitch is PORTRAIT: it is longer (Y) than it is wide (X), aspect ~0.8. The
// previous diagrams drew it landscape and horizontally stretched, which is what
// made them read as not-to-scale. We adopt the convention that +Y is the orange
// end (top of the diagram) and -Y is the blue end (bottom), matching team colors.

export const FIELD = {
  halfWidth: 4096,
  halfLength: 5120,
  width: 8192,
  length: 10240,
  // Goal mouth is 1786 uu wide and sits ~880 uu deep behind the line.
  goalHalfWidth: 893,
  goalDepth: 880,
  // Midfield circle — approximate visual radius, used purely for decoration.
  centerCircleRadius: 940,
  // The six full (100) boost pads. The four corner pads are exactly where
  // diagonal kickoff takers peel toward, so they are meaningful context here.
  cornerBoosts: [
    { x: 3072, y: 4096 },
    { x: -3072, y: 4096 },
    { x: 3072, y: -4096 },
    { x: -3072, y: -4096 },
    { x: 3584, y: 0 },
    { x: -3584, y: 0 },
  ],
} as const;

export interface FieldProjection {
  /** SVG viewBox width. */
  width: number;
  /** SVG viewBox height. */
  height: number;
  /** SVG units per uu. */
  scale: number;
  /** Padding (SVG units) reserved around the pitch for goals / markers. */
  padding: number;
  /** Whether the field length (goal-to-goal) runs vertically or horizontally. */
  orientation: FieldOrientation;
  /** Project a field point (uu) to SVG coordinates. */
  project: (fieldX: number, fieldY: number) => { x: number; y: number };
  /** Convert a length in uu to SVG units. */
  toUnits: (uu: number) => number;
}

export type FieldOrientation = "portrait" | "landscape";

/**
 * Build a projection that draws the full pitch length across `fieldLengthUnits`
 * SVG units, preserving the real field aspect ratio. `padding` reserves space
 * around the pitch (for goals and end markers) on every side.
 *
 * - "portrait" (default): the length axis (goal-to-goal, Y) runs vertically,
 *   with +Y (orange end) at the top. This is the compact mini-diagram layout.
 * - "landscape": the length axis runs horizontally, with +Y (orange end) to the
 *   right and +X up, so the long touchlines sit along the top and bottom.
 */
export function fieldProjection(
  fieldLengthUnits: number,
  padding = 0,
  orientation: FieldOrientation = "portrait",
): FieldProjection {
  const scale = fieldLengthUnits / FIELD.length;
  const lengthUnits = FIELD.length * scale;
  const widthUnits = FIELD.width * scale;
  const landscape = orientation === "landscape";
  const width = (landscape ? lengthUnits : widthUnits) + padding * 2;
  const height = (landscape ? widthUnits : lengthUnits) + padding * 2;
  const cx = width / 2;
  const cy = height / 2;
  return {
    width,
    height,
    scale,
    padding,
    orientation,
    project: landscape
      ? (fieldX: number, fieldY: number) => ({ x: cx + fieldY * scale, y: cy - fieldX * scale })
      : (fieldX: number, fieldY: number) => ({ x: cx + fieldX * scale, y: cy - fieldY * scale }),
    toUnits: (uu: number) => uu * scale,
  };
}

/** Canonical kickoff spawn locations (uu) for the blue team (defending -Y). */
export const SPAWN_POSITIONS: Record<string, { x: number; y: number }> = {
  center: { x: 0, y: -4608 },
  off_center_left: { x: -256, y: -3840 },
  off_center_right: { x: 256, y: -3840 },
  diagonal_left: { x: -2048, y: -2560 },
  diagonal_right: { x: 2048, y: -2560 },
};

/**
 * Resolve a canonical spawn point for a team. Orange (team 1) is the point
 * reflection of blue through the origin, which is exactly how Rocket League
 * mirrors the two kickoff formations and keeps left/right labels consistent
 * from each team's own perspective.
 */
export function canonicalSpawn(spawn: string, team: number): { x: number; y: number } | null {
  const base = SPAWN_POSITIONS[spawn];
  if (!base) return null;
  return team === 1 ? { x: -base.x, y: -base.y } : { x: base.x, y: base.y };
}

/** Map a (type, direction) classification to the spawn both takers use. */
export function spawnForShape(type: string, direction: string): string {
  switch (type) {
    case "diagonal":
      return direction === "right" ? "diagonal_right" : "diagonal_left";
    case "center_offset":
      return direction === "right" ? "off_center_right" : "off_center_left";
    case "center":
      return "center";
    default:
      return direction === "right" ? "diagonal_right" : "diagonal_left";
  }
}

/**
 * A canonical partner (support) spawn for the icon, assuming a 2v2 setup. This is
 * purely contextual — we don't model the real support location, just place a
 * second player at a sensible back spot that doesn't collide with the taker so the
 * icon reads as a formation. When the taker is at center, the partner sits back-
 * off-center; otherwise the partner holds the back-center "goalie" spot.
 */
export function supportSpawnForShape(type: string, direction: string): string {
  if (type === "center") {
    return direction === "right" ? "off_center_left" : "off_center_right";
  }
  return "center";
}

interface FieldBackgroundProps {
  projection: FieldProjection;
  /** Render the six full-boost pads. Default true. */
  showBoosts?: boolean;
  /** Render the midfield circle + ball dot. Default true. */
  showCenter?: boolean;
  /** Radius of the ball dot in SVG units (default scales with the field). */
  ballRadius?: number;
}

/**
 * The pitch itself: boundary, halfway line, center circle, both goals, and the
 * full-boost pads. Caller is responsible for the enclosing <svg> element; this
 * returns a <g> of field furniture to layer player/ball geometry on top of.
 */
export function KickoffFieldBackground({
  projection,
  showBoosts = true,
  showCenter = true,
  ballRadius,
}: FieldBackgroundProps) {
  const { project, toUnits } = projection;
  // Derive the bounding rect from projected corners so it is correct in either
  // orientation. The two opposite corners pin the min/max extents.
  const cornerA = project(-FIELD.halfWidth, FIELD.halfLength);
  const cornerB = project(FIELD.halfWidth, -FIELD.halfLength);
  const boundsX = Math.min(cornerA.x, cornerB.x);
  const boundsY = Math.min(cornerA.y, cornerB.y);
  const boundsW = Math.abs(cornerA.x - cornerB.x);
  const boundsH = Math.abs(cornerA.y - cornerB.y);
  const center = project(0, 0);
  const midA = project(-FIELD.halfWidth, 0);
  const midB = project(FIELD.halfWidth, 0);
  const dotRadius = ballRadius ?? Math.max(1.5, toUnits(160));

  // Goals are drawn as an open "U" of posts anchored on the goal line and opening
  // toward the field, projected from field coordinates so they connect to the
  // pitch and stay correct in any orientation.
  const goalPoints = (lineY: number): string => {
    const back = lineY + Math.sign(lineY) * FIELD.goalDepth;
    return [
      project(-FIELD.goalHalfWidth, lineY),
      project(-FIELD.goalHalfWidth, back),
      project(FIELD.goalHalfWidth, back),
      project(FIELD.goalHalfWidth, lineY),
    ]
      .map((p) => `${p.x},${p.y}`)
      .join(" ");
  };

  return (
    <g className="kickoff-field">
      <rect
        className="kickoff-field-bounds"
        x={boundsX}
        y={boundsY}
        width={boundsW}
        height={boundsH}
        rx={toUnits(260)}
        vectorEffect="non-scaling-stroke"
      />
      <line
        className="kickoff-field-midline"
        x1={midA.x}
        x2={midB.x}
        y1={midA.y}
        y2={midB.y}
        vectorEffect="non-scaling-stroke"
      />
      {/* Blue goal (-Y end). */}
      <polyline
        className="kickoff-goal kickoff-goal-blue"
        points={goalPoints(-FIELD.halfLength)}
        vectorEffect="non-scaling-stroke"
      />
      {/* Orange goal (+Y end). */}
      <polyline
        className="kickoff-goal kickoff-goal-orange"
        points={goalPoints(FIELD.halfLength)}
        vectorEffect="non-scaling-stroke"
      />
      {showBoosts
        ? FIELD.cornerBoosts.map((pad, index) => {
            const point = project(pad.x, pad.y);
            return (
              <circle
                key={`boost-${index}`}
                className="kickoff-field-boost"
                cx={point.x}
                cy={point.y}
                r={Math.max(1.2, toUnits(120))}
                vectorEffect="non-scaling-stroke"
              />
            );
          })
        : null}
      {showCenter ? (
        <>
          <circle
            className="kickoff-field-circle"
            cx={center.x}
            cy={center.y}
            r={toUnits(FIELD.centerCircleRadius)}
            vectorEffect="non-scaling-stroke"
          />
          <circle className="kickoff-ball-dot" cx={center.x} cy={center.y} r={dotRadius} vectorEffect="non-scaling-stroke" />
        </>
      ) : null}
    </g>
  );
}
