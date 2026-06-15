import {
  BatteryCharging,
  CircleDotDashed,
  Gauge,
  Goal,
  Hand,
  type LucideIcon,
  Map as MapIcon,
  MapPinned,
  RotateCw,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { ComponentType } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import { BoostDetail, boostEventTypes } from "./boost";
import { CoreDetail, coreEventTypes } from "./core";
import { GoalsDetail, goalEventTypes } from "./goals";
import { KickoffDetail, kickoffEventTypes } from "./kickoffs";
import { MechanicsDetail, mechanicEventTypes } from "./mechanics";
import { MovementDetail, movementEventTypes, movementMechanicEventTypes } from "./movement";
import { PositioningDetail, positioningEventTypes } from "./positioning";
import { PossessionDetail, possessionEventTypes } from "./possession";
import { RotationDetail, rotationEventTypes } from "./rotation";
import { TouchesDetail, touchEventTypes } from "./touches";

export interface StatDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
  replayId?: string;
  groupId?: string;
  scope?: "replay" | "group";
}

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
  eventTypes: readonly string[];
  Detail?: ComponentType<StatDetailProps>;
}

export const statGroups: StatGroup[] = [
  {
    id: "core",
    label: "Core",
    icon: Trophy,
    description: "Scoreboard core stats: score, goals, assists, saves, shots, and shooting %.",
    terms: ["score", "goal", "assist", "save", "shot", "shooting"],
    completed: true,
    usesAggregateStats: false,
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
    id: "boost",
    label: "Boost",
    icon: BatteryCharging,
    description: "Boost pickups, boost pressure, boost usage, and starvation patterns.",
    terms: ["boost", "pickup", "pad"],
    completed: true,
    usesAggregateStats: false,
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
    eventTypes: [...kickoffEventTypes, "possession"],
    Detail: KickoffDetail,
  },
  {
    id: "movement",
    label: "Movement",
    icon: Gauge,
    description:
      "Speed, aerial movement, ground movement, powerslides, speed flips, wavedashes, and half flips.",
    terms: [
      "speed",
      "movement",
      "aerial",
      "air",
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
