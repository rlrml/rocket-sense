import {
  BatteryCharging,
  CircleDotDashed,
  Crosshair,
  Dribbble,
  Gauge,
  Goal,
  Hand,
  type LucideIcon,
  Map as MapIcon,
  MapPinned,
  Plane,
  RotateCw,
  Scale,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { ComponentType } from "react";
import type {
  MechanicEventResponse,
  ReplayPlayer,
  ReplayPlayerMovementSummary,
  ReplayPlayerPositioningSummary,
} from "../types";
import { AerialsDetail, aerialEventTypes } from "./aerials";
import { BoostDetail, boostEventTypes } from "./boost";
import { CoreDetail, coreEventTypes } from "./core";
import { GoalsDetail, goalEventTypes } from "./goals";
import { GroundPlayDetail, groundPlayEventTypes } from "./groundPlay";
import { KickoffDetail, kickoffEventTypes } from "./kickoffs";
import { MechanicsDetail, mechanicEventTypes } from "./mechanics";
import { MovementDetail, movementEventTypes, movementMechanicEventTypes } from "./movement";
import { PositioningDetail, positioningEventTypes } from "./positioning";
import { PossessionDetail, possessionEventTypes } from "./possession";
import { RotationDetail, rotationEventTypes } from "./rotation";
import { ShotMapDetail, shotMapEventTypes } from "./shotMap";
import { TouchesDetail, touchEventTypes } from "./touches";

export interface StatDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
  replayId?: string;
  groupId?: string;
  scope?: "replay" | "group";
  subjectSubtitle?: string;
  movementSummaries?: ReplayPlayerMovementSummary[];
  positioningSummaries?: ReplayPlayerPositioningSummary[];
}

/**
 * How a section renders in a replay-group (multi-player) context:
 * - `"leaderboard"` (default): stat-major per-player ranking — pick a stat, rank
 *   every participant. The group default; works for any countable/rate stat.
 * - `"drill-down-only"`: no group-level aggregate view. The section only makes
 *   sense per player (e.g. the boost control diagram is a single-subject spatial
 *   chart), so the group view links into each player's group-scoped career view
 *   instead of rendering a group panel.
 * - `"event-detail"`: group-level detail view backed by grouped event samples,
 *   for sections whose own detail component already knows how to aggregate
 *   cross-replay events.
 */
export type StatGroupLayout = "leaderboard" | "drill-down-only" | "event-detail";

export interface StatGroup {
  id: string;
  aliases?: readonly string[];
  label: string;
  icon: LucideIcon;
  description: string;
  terms: readonly string[];
  /** Aggregate-stat keys to drop from this section even if they match `terms`. */
  excludeKeys?: readonly string[];
  completed: boolean;
  usesAggregateStats: boolean;
  /** Group-context rendering. Defaults to `"leaderboard"` when unset. */
  groupLayout?: StatGroupLayout;
  /**
   * Stat keys to surface as ranked leaderboard columns for this section, in
   * priority order (the first present becomes the default selection). When unset,
   * the leaderboard offers every aggregate stat matching `terms`.
   */
  leaderboardStats?: readonly string[];
  eventTypes: readonly string[];
  Detail?: ComponentType<StatDetailProps>;
}

/** A section's group-context layout, applying the `"leaderboard"` default. */
export function statGroupLayout(group: StatGroup): StatGroupLayout {
  return group.groupLayout ?? "leaderboard";
}

export const statGroups: StatGroup[] = [
  {
    id: "core",
    label: "Core",
    icon: Trophy,
    description:
      "Scoreboard core stats: score, goals, assists, assist %, saves, shots, shooting %, demos, and deaths.",
    terms: [
      "score",
      "goal",
      "assist",
      "assist percentage",
      "save",
      "shot",
      "shooting",
      "demo",
      "death",
    ],
    completed: true,
    usesAggregateStats: false,
    leaderboardStats: ["goal", "assist", "save", "shot", "demolition", "death"],
    eventTypes: coreEventTypes,
    Detail: CoreDetail,
  },
  {
    id: "goals",
    label: "Scoring",
    icon: Goal,
    description:
      "Goals and assists with scorer, scoring team, ball speed, air time, and detected goal types, with clip preview.",
    terms: ["goal", "score", "finish", "assist", "aerial", "flick", "double tap"],
    completed: true,
    usesAggregateStats: false,
    // Goal buildup diagrams place the real attributed touches, so load them too.
    eventTypes: [...goalEventTypes, "touch"],
    Detail: GoalsDetail,
  },
  {
    id: "shot-map",
    label: "Shot Map",
    icon: Crosshair,
    description: "3D shot and goal locations in the replay player scene.",
    terms: ["shot", "goal", "finish", "touch", "heatmap", "map"],
    completed: true,
    usesAggregateStats: false,
    eventTypes: shotMapEventTypes,
    Detail: ShotMapDetail,
  },
  {
    id: "boost",
    label: "Boost",
    icon: BatteryCharging,
    description: "Boost pickups, boost pressure, boost usage, and starvation patterns.",
    terms: ["boost", "pickup", "pad"],
    completed: true,
    usesAggregateStats: false,
    // The boost detail centres on the per-player pad-control diagram (a
    // single-subject spatial chart), which doesn't collapse to a leaderboard.
    // Surface it per player via the group-scoped career drill-down instead.
    groupLayout: "drill-down-only",
    eventTypes: boostEventTypes,
    Detail: BoostDetail,
  },
  {
    id: "kickoffs",
    label: "Kickoffs",
    icon: CircleDotDashed,
    description:
      "Kickoff outcomes, taker approach, support behavior, first touches, and kickoff goals.",
    terms: ["kickoff"],
    completed: true,
    usesAggregateStats: false,
    groupLayout: "event-detail",
    eventTypes: [...kickoffEventTypes, "possession"],
    Detail: KickoffDetail,
  },
  {
    id: "movement",
    label: "Movement",
    icon: Gauge,
    description:
      "Speed, air/ground movement, powerslides, speed flips, wavedashes, and half flips.",
    terms: [
      "speed",
      "movement",
      "ground",
      "powerslide",
      "dodge",
      "supersonic",
      "recovery",
      "speed flip",
      "wavedash",
      "half flip",
    ],
    completed: true,
    usesAggregateStats: false,
    eventTypes: [...movementEventTypes, ...movementMechanicEventTypes],
    Detail: MovementDetail,
  },
  {
    id: "positioning",
    label: "Positioning",
    icon: MapPinned,
    description:
      "Field position, team depth, offensive/defensive half time, and forward/back roles.",
    terms: ["position", "offensive", "defensive", "half", "most back", "most forward", "depth"],
    completed: true,
    usesAggregateStats: false,
    eventTypes: positioningEventTypes,
    Detail: PositioningDetail,
  },
  {
    id: "mechanics",
    label: "Mechanics",
    icon: Sparkles,
    description:
      "Detected mechanics such as flip resets, double taps, air dribbles, and recoveries.",
    terms: [
      "mechanic",
      "flip",
      "reset",
      "double",
      "tap",
      "air dribble",
      "flick",
      "wavedash",
      "ceiling",
    ],
    // Hidden for now — slated for a fresh rewrite. Flip back to true to restore.
    completed: false,
    usesAggregateStats: false,
    eventTypes: mechanicEventTypes,
    Detail: MechanicsDetail,
  },
  {
    id: "touches",
    label: "Touches",
    icon: Hand,
    description:
      "Touch volume and ball advanced, split by hit kind (control / medium / hard) and intention category (shot, save, clear, pass, ...).",
    terms: ["touch", "ball", "control", "hard", "hit", "advance", "shot", "save", "pass", "clear"],
    // "ball" also matches the positioning ball-proximity stat; keep it out of Touches.
    excludeKeys: ["positioning_ball_proximity"],
    completed: true,
    usesAggregateStats: false,
    eventTypes: touchEventTypes,
    Detail: TouchesDetail,
  },
  {
    id: "aerials",
    label: "Aerials",
    icon: Plane,
    description:
      "Aerial mechanics ranked per player: flip resets, double taps, air dribbles (by origin), wall aerials (by wall and side), ceiling shots, aerial goals, and aerial touches by height.",
    terms: [
      "aerial",
      "air",
      "flip reset",
      "double tap",
      "air dribble",
      "wall aerial",
      "ceiling",
      "flight",
    ],
    completed: true,
    usesAggregateStats: false,
    eventTypes: aerialEventTypes,
    Detail: AerialsDetail,
  },
  {
    id: "ground-play",
    label: "Ground Play",
    icon: Dribbble,
    description:
      "Flick breakdown ranked per player: flick volume, power, vertical pop, carry setup, and flick type/side mix.",
    terms: ["flick", "carry"],
    completed: true,
    usesAggregateStats: false,
    eventTypes: groundPlayEventTypes,
    Detail: GroundPlayDetail,
  },
  {
    // Player-scope (career/period) only: distributions of game results for one
    // target player have no replay- or group-level analogue, so App.tsx keeps
    // this section off the replay/group stats pages. The panel self-fetches
    // per-game rows from /stats/game-outcomes (see stats/outcomes.tsx).
    id: "outcomes",
    label: "Outcomes",
    icon: Scale,
    description:
      "Game outcomes: win/loss record, records by goal margin, margin distribution, goal-count histograms, and a scoreline heatmap.",
    terms: [],
    completed: true,
    usesAggregateStats: false,
    eventTypes: [],
  },
  {
    id: "possession",
    aliases: ["possession-territory"],
    label: "Possession",
    icon: MapIcon,
    description: "Ball control, zone control, pressure, and possession share.",
    terms: ["possession", "territory", "pressure", "control", "offensive", "defensive", "zone"],
    completed: true,
    usesAggregateStats: false,
    eventTypes: possessionEventTypes,
    Detail: PossessionDetail,
  },
  {
    id: "rotation",
    label: "Rotation",
    icon: RotateCw,
    description: "First/second/third-man patterns, role timing, rotation depth, and spacing.",
    terms: ["rotation", "first", "second", "third", "role", "stint", "most back", "most forward"],
    // Hidden for now — slated for a fresh rewrite. Flip back to true to restore.
    completed: false,
    usesAggregateStats: false,
    eventTypes: rotationEventTypes,
    Detail: RotationDetail,
  },
];

export const completedStatGroups = statGroups.filter((group) => group.completed);

export function statGroupById(
  groupId: string | undefined,
  groups: readonly StatGroup[] = statGroups,
): StatGroup | undefined {
  if (!groupId) return undefined;
  return groups.find((group) => group.id === groupId || group.aliases?.includes(groupId));
}

export function eventTypesForGroup(groupId: string): string[] {
  return [...(statGroupById(groupId)?.eventTypes ?? [])];
}
