import {
  canonicalSpawn,
  fieldProjection,
  FIELD,
  spawnForShape,
  supportSpawnForShape,
} from "./kickoffField";

interface KickoffShapeIconProps {
  type: string;
  direction: string;
  /** Rendered height in pixels. Width follows the field aspect (~0.8). */
  size?: number;
  /** Draw the taker -> ball approach lanes. Default true. */
  showLanes?: boolean;
  className?: string;
  title?: string;
}

// The icon is a compact, schematic stand-in for a kickoff formation. It is keyed
// purely on the classified (type, direction) so the same shape always renders the
// same symbol — true iconography that reads at small sizes (chips, tables, legends)
// rather than a faithful plot of one kickoff. Each team's taker and a single
// contextual support partner (assumed 2v2) plus the ball are drawn on a portrait
// pitch outline using the shared, scale-accurate canonical spawns.
export function KickoffShapeIcon({
  type,
  direction,
  size = 30,
  showLanes = true,
  className,
  title,
}: KickoffShapeIconProps) {
  // Field length 10240 -> the icon's interior height. Padding leaves room for the
  // near-goal-line center spawns and the dot radii.
  const fieldHeight = size * 0.86;
  const projection = fieldProjection(fieldHeight, size * 0.07);
  const { project, toUnits } = projection;
  const takerSpawn = spawnForShape(type, direction);
  const supportSpawn = supportSpawnForShape(type, direction);
  const center = project(0, 0);
  const takerR = Math.max(2, toUnits(620));
  const supportR = Math.max(1.5, toUnits(440));
  const ballR = Math.max(1.4, toUnits(360));
  const aspect = projection.width / projection.height;
  const pixelWidth = size * aspect;

  const renderPlayer = (spawn: string, team: 0 | 1, role: "taker" | "support") => {
    const point = canonicalSpawn(spawn, team);
    if (!point) return null;
    const projected = project(point.x, point.y);
    return (
      <g
        className={`kickoff-icon-${role} ${team === 0 ? "blue" : "orange"}`}
        key={`${role}-${team}`}
      >
        {role === "taker" && showLanes ? (
          <line
            className="kickoff-icon-lane"
            x1={projected.x}
            y1={projected.y}
            x2={center.x}
            y2={center.y}
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
        <circle
          cx={projected.x}
          cy={projected.y}
          r={role === "taker" ? takerR : supportR}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    );
  };

  return (
    <svg
      className={`kickoff-shape-icon ${className ?? ""}`}
      viewBox={`0 0 ${projection.width} ${projection.height}`}
      width={pixelWidth}
      height={size}
      role="img"
      aria-label={title ?? `${type} ${direction} kickoff shape`}
    >
      {title ? <title>{title}</title> : null}
      <rect
        className="kickoff-icon-field"
        x={project(-FIELD.halfWidth, FIELD.halfLength).x}
        y={project(-FIELD.halfWidth, FIELD.halfLength).y}
        width={toUnits(FIELD.width)}
        height={toUnits(FIELD.length)}
        rx={toUnits(900)}
        vectorEffect="non-scaling-stroke"
      />
      <line
        className="kickoff-icon-midline"
        x1={project(-FIELD.halfWidth, 0).x}
        x2={project(FIELD.halfWidth, 0).x}
        y1={center.y}
        y2={center.y}
        vectorEffect="non-scaling-stroke"
      />
      {renderPlayer(supportSpawn, 1, "support")}
      {renderPlayer(supportSpawn, 0, "support")}
      {renderPlayer(takerSpawn, 1, "taker")}
      {renderPlayer(takerSpawn, 0, "taker")}
      <circle className="kickoff-icon-ball" cx={center.x} cy={center.y} r={ballR} />
    </svg>
  );
}
