import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import type { EventClip } from "./EventClipPlayer";
import { buildGoalRows } from "./goals";
import { subtrActorPlayerUrl } from "../playerLink";
import type { ScoringTouchPoint } from "./ScoringTouchHeatmap3D";

const ScoringTouchHeatmap3D = lazy(() =>
  import("./ScoringTouchHeatmap3D").then((module) => ({
    default: module.ScoringTouchHeatmap3D,
  })),
);
const EventClipPreview = lazy(() =>
  import("./EventClipPlayer").then((module) => ({ default: module.EventClipPreview })),
);

export const shotMapEventTypes = ["goal_context", "touch"];

export function ShotMapDetail({
  events,
  players,
  replayId,
  scope = "replay",
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds?: number | null;
  replayId?: string;
  scope?: "replay" | "group";
}) {
  const goals = useMemo(() => buildGoalRows(events), [events]);
  const shotEvents = useMemo(
    () => events.filter((event) => event.event_type === "touch"),
    [events],
  );
  const [selectedPoint, setSelectedPoint] = useState<ScoringTouchPoint | null>(null);
  const selectedClip = useMemo(() => buildShotMapClip(selectedPoint), [selectedPoint]);
  const handlePointClick = useCallback((point: ScoringTouchPoint) => {
    setSelectedPoint(point);
  }, []);

  if (scope !== "replay" || !replayId) {
    return (
      <div className="stat-empty">
        3D shot maps are available for a single replay, not replay groups.
      </div>
    );
  }

  return (
    <div className="shot-map-detail">
      <div className="stat-section-grid">
        <section className="chart-panel full-span">
          <Suspense fallback={<div className="kickoff-path-status">Loading 3D shot map…</div>}>
            <ScoringTouchHeatmap3D
              goals={goals}
              shotEvents={shotEvents}
              players={players}
              replayId={replayId}
              scope="replay"
              title="3D shot map"
              onPointClick={handlePointClick}
            />
          </Suspense>
        </section>

        {selectedPoint ? (
          <Suspense
            fallback={
              <aside className="event-preview-pip">
                <div className="event-preview-pip-bar">
                  <span className="event-preview-pip-label">Loading…</span>
                </div>
                <div className="event-clip-player">
                  <div className="event-clip-status">Loading player…</div>
                </div>
              </aside>
            }
          >
            <EventClipPreview
              replayId={replayId}
              clip={selectedClip}
              label={shotMapClipLabel(selectedPoint)}
              openHref={subtrActorPlayerUrl(replayId)}
              showDebug={false}
            />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}

function buildShotMapClip(point: ScoringTouchPoint | null): EventClip | null {
  if (!point || point.time == null) return null;
  const prerollSeconds = point.kind === "goal" ? 9 : 7;
  const postrollSeconds = point.kind === "goal" ? 2.5 : 2;
  return {
    start: Math.max(0, point.time - prerollSeconds),
    end: point.time + postrollSeconds,
    prerollSeconds,
    postrollSeconds,
    camera: (camera) => {
      if (!camera.followPlayer({ playerName: point.playerName, ballCam: true })) {
        camera.freeCamera("side");
      }
    },
    key: `${point.id}:${point.kind}:${point.time}`,
  };
}

function shotMapClipLabel(point: ScoringTouchPoint): string {
  const kind = point.kind === "goal" ? `Goal ${(point.goalIndex ?? 0) + 1}` : "Shot";
  return `${kind} · ${point.playerName} · ${formatSeconds(point.time)}`;
}

function formatSeconds(value: number | null): string {
  if (value == null) return "time unknown";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
