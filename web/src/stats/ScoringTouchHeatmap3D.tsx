import {
  createStaticReplaySceneFromParsed,
  type StaticReplayScene,
  type StaticScenePoint,
} from "@rlrml/player";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import { eventDisplayTime, numberField } from "./eventPreview";
import { PLAYER_ASSET_BASE } from "./playerAssets";
import { preloadReplay } from "./replayModel";
import type { GoalRow } from "./goals";
import { touchIntentionValue } from "./touchTags";

const BALL_RADIUS_UU = 92.75;

const PLAYER_COLORS = [
  "#2563eb",
  "#dc2626",
  "#059669",
  "#9333ea",
  "#d97706",
  "#0891b2",
  "#be185d",
  "#4d7c0f",
  "#7c3aed",
  "#0f766e",
];

const TEAM_COLORS: Record<number, string> = {
  0: "#2f8cff",
  1: "#f97316",
};

export interface ScoringTouchPoint {
  id: string;
  replayId: string;
  kind: "shot" | "goal";
  goalIndex: number | null;
  playerName: string;
  playerKey: string;
  team: number | null;
  position: { x: number; y: number; z: number };
  time: number | null;
  ballSpeed: number | null;
}

type HeatmapColorMode = "team" | "player";

export interface ScoringTouchHeatmap3DProps {
  goals: GoalRow[];
  shotEvents?: MechanicEventResponse[];
  players: ReplayPlayer[];
  replayId: string;
  scope?: "replay" | "group";
  title?: string;
  colorMode?: HeatmapColorMode;
  onPointClick?: (point: ScoringTouchPoint) => void;
}

interface TooltipState {
  x: number;
  y: number;
  point: ScoringTouchPoint;
}

export function ScoringTouchHeatmap3D({
  goals,
  shotEvents = [],
  players,
  replayId,
  scope = "replay",
  title = "3D shot map",
  colorMode,
  onPointClick,
}: ScoringTouchHeatmap3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<StaticReplayScene | null>(null);
  const scenePointsRef = useRef<StaticScenePoint<ScoringTouchPoint>[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const points = useMemo(() => shotMapPoints(goals, shotEvents), [goals, shotEvents]);
  const resolvedColorMode = colorMode ?? (scope === "group" ? "player" : "team");
  const colorByScorer = useMemo(
    () => scorerColorMap(points, players, resolvedColorMode),
    [points, players, resolvedColorMode],
  );
  const scenePoints = useMemo(
    () =>
      points.map<StaticScenePoint<ScoringTouchPoint>>((point) => ({
        id: point.id,
        position: point.position,
        color: colorByScorer.get(point.playerKey),
        label: point.playerName,
        radiusUu: point.kind === "goal" ? 150 : 82,
        metadata: point,
      })),
    [points, colorByScorer],
  );
  const legend = useMemo(() => scorerLegend(points, colorByScorer), [points, colorByScorer]);

  useEffect(() => {
    scenePointsRef.current = scenePoints;
    sceneRef.current?.setPoints(scenePoints, pointLayerOptions);
  }, [scenePoints]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    let cancelled = false;
    setLoadError(null);
    preloadReplay(replayId)
      .then((loadedReplay) => {
        if (cancelled || !containerRef.current) return;
        const scene = createStaticReplaySceneFromParsed(containerRef.current, loadedReplay, {
          assetBase: PLAYER_ASSET_BASE,
          environment: false,
          effects: false,
          initialCameraPreset: "side",
          preserveDrawingBuffer: true,
        });
        sceneRef.current = scene;
        scene.setPoints(scenePointsRef.current, pointLayerOptions);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : String(error));
        }
      });
    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [replayId]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const onPointerMove = (event: PointerEvent) => {
      const scene = sceneRef.current;
      if (!scene) return;
      const rect = root.getBoundingClientRect();
      const point = scene.pickPoint<ScoringTouchPoint>(event.clientX, event.clientY)?.metadata;
      setTooltip(
        point ? { x: event.clientX - rect.left, y: event.clientY - rect.top, point } : null,
      );
    };
    const onPointerLeave = () => setTooltip(null);
    const onPointerDown = (event: PointerEvent) => {
      const scene = sceneRef.current;
      if (!scene || event.button !== 0) return;
      const point = scene.pickPoint<ScoringTouchPoint>(event.clientX, event.clientY)?.metadata;
      if (point) onPointClick?.(point);
    };
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    root.addEventListener("pointerdown", onPointerDown);
    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("pointerdown", onPointerDown);
    };
  }, [onPointClick]);

  const touchCount = points.length;
  const goalCount = points.filter((point) => point.kind === "goal").length;
  const shotCount = points.filter((point) => point.kind === "shot").length;
  const playerCount = new Set(points.map((point) => point.playerKey)).size;

  return (
    <div className="scoring-touch-heatmap">
      <div className="scoring-touch-heatmap-header">
        <div>
          <h3>{title}</h3>
          <span>
            {shotCount.toLocaleString()} shots · {goalCount.toLocaleString()} goals ·{" "}
            {playerCount.toLocaleString()} players
          </span>
        </div>
      </div>
      <div className="scoring-touch-heatmap-viewport" ref={containerRef}>
        {loadError ? (
          <div className="scoring-touch-heatmap-empty">
            Couldn&apos;t load player scene: {loadError}
          </div>
        ) : null}
        {touchCount === 0 ? (
          <div className="scoring-touch-heatmap-empty">No shot positions available.</div>
        ) : null}
        {tooltip ? (
          <div
            className="scoring-touch-heatmap-tooltip"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <strong>{tooltip.point.playerName}</strong>
            <span>
              {tooltip.point.kind === "goal" && tooltip.point.goalIndex != null
                ? `Goal ${tooltip.point.goalIndex + 1}`
                : "Shot"}
            </span>
            <span>{formatSeconds(tooltip.point.time)}</span>
            <span>{formatHeight(tooltip.point.position.z)} high</span>
            <span>{formatSpeed(tooltip.point.ballSpeed)}</span>
          </div>
        ) : null}
      </div>
      {legend.length ? (
        <ul className="scoring-touch-heatmap-legend" aria-label="Scoring touch scorers">
          {legend.map((item) => (
            <li key={item.key}>
              <span style={{ backgroundColor: item.color }} />
              <strong>{item.name}</strong>
              <em>{item.count.toLocaleString()}</em>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const pointLayerOptions = {
  pointRadiusUu: 92,
  heatmap: {
    enabled: true,
    binSizeUu: 560,
    radiusUu: 340,
    maxOpacity: 0.28,
  },
} as const;

function shotMapPoints(goals: GoalRow[], shotEvents: MechanicEventResponse[]): ScoringTouchPoint[] {
  const goalTouchIds = new Set(
    goals.flatMap((goal) => {
      const id = goal.scoringTouch?.touchId;
      return id == null ? [] : [id];
    }),
  );
  const shots = shotEvents.flatMap((event) => {
    if (event.event_type !== "touch") return [];
    const payload = event.payload ?? {};
    if (touchIntentionValue(payload) !== "shot") return [];
    const touchId = numberField(payload, "touch_id");
    if (touchId != null && goalTouchIds.has(touchId)) return [];
    const position = arrayVec3(payload, "ball_position");
    if (!position) return [];
    return [
      {
        id: event.id,
        replayId: event.replay_id,
        kind: "shot" as const,
        goalIndex: null,
        playerName: event.player_name ?? "Unknown",
        playerKey: event.player_id ?? `name:${(event.player_name ?? "unknown").toLowerCase()}`,
        team: event.team,
        position,
        time: eventDisplayTime(event),
        ballSpeed: numberField(payload, "ball_speed_change"),
      },
    ];
  });
  const goalTouches = goals.flatMap((goal) => {
    const touch = goal.scoringTouch;
    if (!touch) return [];
    const scorerKey = goal.event.player_id ?? `name:${goal.scorerName.trim().toLowerCase()}`;
    return [
      {
        id: goal.event.id,
        replayId: goal.event.replay_id,
        kind: "goal" as const,
        goalIndex: goal.index,
        playerName: goal.scorerName,
        playerKey: scorerKey,
        team: goal.scoringTeam,
        position: {
          x: touch.ball.x,
          y: touch.ball.y,
          z: touch.ball.z ?? BALL_RADIUS_UU,
        },
        time: goal.time,
        ballSpeed: goal.ballSpeed,
      },
    ];
  });
  return [...shots, ...goalTouches].sort((left, right) => (left.time ?? 0) - (right.time ?? 0));
}

function scorerColorMap(
  points: ScoringTouchPoint[],
  players: ReplayPlayer[],
  colorMode: HeatmapColorMode,
): Map<string, string> {
  const keys = uniqueScorers(points);
  const playerIndexByKey = new Map(
    players.map((player, index) => [playerKey(player, index), index] as const),
  );
  const colors = new Map<string, string>();
  keys.forEach((key, index) => {
    const point = points.find((candidate) => candidate.playerKey === key);
    if (colorMode === "team" && point?.team != null) {
      colors.set(key, TEAM_COLORS[point.team] ?? PLAYER_COLORS[index % PLAYER_COLORS.length]);
      return;
    }
    const playerIndex = playerIndexByKey.get(key);
    colors.set(key, PLAYER_COLORS[(playerIndex ?? index) % PLAYER_COLORS.length]);
  });
  return colors;
}

function scorerLegend(points: ScoringTouchPoint[], colors: Map<string, string>) {
  const rows = new Map<string, { key: string; name: string; color: string; count: number }>();
  for (const point of points) {
    const row = rows.get(point.playerKey);
    rows.set(point.playerKey, {
      key: point.playerKey,
      name: row?.name ?? point.playerName,
      color: colors.get(point.playerKey) ?? "#64748b",
      count: (row?.count ?? 0) + 1,
    });
  }
  return [...rows.values()].sort(
    (left, right) => right.count - left.count || left.name.localeCompare(right.name),
  );
}

function uniqueScorers(points: ScoringTouchPoint[]): string[] {
  return [...new Set(points.map((point) => point.playerKey))];
}

function playerKey(player: ReplayPlayer, index: number): string {
  if (player.platform && player.platform_player_id) {
    return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
  }
  return `name:${player.name?.trim().toLowerCase() || index}`;
}

function normalizePlatform(value: string): string {
  const lower = value.toLowerCase();
  if (lower === "psynet") return "epic";
  if (lower === "playstation") return "ps4";
  return lower;
}

function arrayVec3(
  payload: Record<string, unknown>,
  key: string,
): { x: number; y: number; z: number } | null {
  const value = payload[key];
  if (!Array.isArray(value) || value.length < 2) return null;
  const [x, y, z] = value;
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    !Number.isFinite(x) ||
    !Number.isFinite(y)
  ) {
    return null;
  }
  return {
    x,
    y,
    z: typeof z === "number" && Number.isFinite(z) ? z : BALL_RADIUS_UU,
  };
}

function formatHeight(value: number): string {
  return `${Math.round(value).toLocaleString()} uu`;
}

function formatSpeed(value: number | null): string {
  if (value == null) return "Speed unknown";
  return `${Math.round(value).toLocaleString()} uu/s`;
}

function formatSeconds(value: number | null): string {
  if (value == null) return "Time unknown";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
