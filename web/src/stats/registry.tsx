import { BatteryCharging, Gauge, Hand, type LucideIcon, Map as MapIcon, MapPinned, RotateCw, Sparkles } from "lucide-react";
import type { ComponentType } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import { BoostDetail, boostEventTypes } from "./boost";

export interface StatDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
}

export interface StatGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  terms: readonly string[];
  completed: boolean;
  usesAggregateStats: boolean;
  eventTypes: readonly string[];
  Detail?: ComponentType<StatDetailProps>;
}

export const statGroups: StatGroup[] = [
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
    id: "movement",
    label: "Movement",
    icon: Gauge,
    description: "Speed, aerial movement, ground movement, recoveries, jumps, and dodges.",
    terms: ["speed", "movement", "aerial", "air", "ground", "jump", "dodge", "supersonic", "recovery"],
    completed: false,
    usesAggregateStats: true,
    eventTypes: [],
  },
  {
    id: "positioning",
    label: "Positioning",
    icon: MapPinned,
    description: "Field position, team depth, offensive/defensive half time, and forward/back roles.",
    terms: ["position", "offensive", "defensive", "half", "most back", "most forward", "depth"],
    completed: false,
    usesAggregateStats: true,
    eventTypes: [],
  },
  {
    id: "mechanics",
    label: "Mechanics",
    icon: Sparkles,
    description: "Detected mechanics such as flip resets, double taps, air dribbles, and recoveries.",
    terms: ["mechanic", "flip", "reset", "double", "tap", "air dribble", "flick", "wavedash", "ceiling"],
    completed: false,
    usesAggregateStats: true,
    eventTypes: [],
  },
  {
    id: "touches",
    label: "Touches",
    icon: Hand,
    description: "Touches, shots, saves, clears, passes, assists, and ball interaction volume.",
    terms: ["touch", "shot", "save", "clear", "pass", "assist", "goal", "ball"],
    completed: false,
    usesAggregateStats: true,
    eventTypes: [],
  },
  {
    id: "possession-territory",
    label: "Possession & Territory",
    icon: MapIcon,
    description: "Ball control, zone control, pressure, possession, and territory share.",
    terms: ["possession", "territory", "pressure", "control", "offensive", "defensive", "zone"],
    completed: false,
    usesAggregateStats: true,
    eventTypes: [],
  },
  {
    id: "rotation",
    label: "Rotation",
    icon: RotateCw,
    description: "First/second/third-man patterns, role timing, rotation depth, and spacing.",
    terms: ["rotation", "first", "second", "third", "role", "stint", "most back", "most forward"],
    completed: false,
    usesAggregateStats: true,
    eventTypes: [],
  },
];

export const completedStatGroups = statGroups.filter((group) => group.completed);

export function eventTypesForGroup(groupId: string): string[] {
  return [...(statGroups.find((group) => group.id === groupId)?.eventTypes ?? [])];
}
