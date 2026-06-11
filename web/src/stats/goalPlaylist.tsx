import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlayerProfile, getReplay, listPlayerEvents, listReplayEvents } from "../api";
import type { MechanicEventResponse } from "../types";
import { EventClipPlayer } from "./EventClipPlayer";
import {
  buildGoalClip,
  buildGoalRows,
  formatSeconds,
  GoalCard,
  goalEventTypes,
  goalTypeLabel,
  type GoalRow,
  type GoalType,
} from "./goals";
import { preloadReplayModel } from "./replayModel";

/** Playlist of every goal of one type within a single replay. */
export function ReplayGoalPlaylistPage() {
  const { replayId = "", goalType = "" } = useParams();
  const { events, loading, error } = useGoalEvents(
    useCallback(() => listReplayEvents(replayId, goalEventTypes), [replayId]),
  );
  const [replayName, setReplayName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setReplayName(null);
    getReplay(replayId)
      .then((replay) => {
        if (!cancelled) setReplayName(replay.original_file_name || replay.id);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [replayId]);

  const goals = useMemo(() => playlistGoals(events, goalType), [events, goalType]);
  const typeHref = useCallback(
    (type: GoalType) => `/replays/${encodeURIComponent(replayId)}/goals/${encodeURIComponent(type.key)}`,
    [replayId],
  );

  return (
    <GoalPlaylist
      goalTypeKey={goalType}
      goals={goals}
      loading={loading}
      error={error}
      contextLabel={replayName ?? replayId}
      backHref={`/replays/${encodeURIComponent(replayId)}/stats/goals`}
      typeHref={typeHref}
      showReplayGroups={false}
    />
  );
}

/** Playlist of every goal of one type scored by a player, across their replays. */
export function PlayerGoalPlaylistPage() {
  const { platform = "", platformPlayerId = "", goalType = "" } = useParams();
  const playerId = `${platform}:${platformPlayerId}`;
  const { events, loading, error } = useGoalEvents(
    useCallback(() => listPlayerEvents(playerId, goalEventTypes), [playerId]),
  );
  const [playerName, setPlayerName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setPlayerName(null);
    getPlayerProfile(platform, platformPlayerId, new URLSearchParams())
      .then((profile) => {
        if (!cancelled) setPlayerName(profile.display_name);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [platform, platformPlayerId]);

  const goals = useMemo(() => playlistGoals(events, goalType), [events, goalType]);
  const typeHref = useCallback(
    (type: GoalType) =>
      `/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}/goals/${encodeURIComponent(type.key)}`,
    [platform, platformPlayerId],
  );

  return (
    <GoalPlaylist
      goalTypeKey={goalType}
      goals={goals}
      loading={loading}
      error={error}
      contextLabel={playerName ?? platformPlayerId}
      backHref={`/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}/stats/goals`}
      typeHref={typeHref}
      showReplayGroups
    />
  );
}

function useGoalEvents(fetchEvents: () => Promise<{ events: MechanicEventResponse[] }>) {
  const [events, setEvents] = useState<MechanicEventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchEvents()
      .then((response) => {
        if (!cancelled) setEvents(response.events);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetchEvents]);

  return { events, loading, error };
}

/**
 * Goals in playlist order, optionally limited to one type (an empty key keeps
 * every goal). Events arrive grouped by replay; build rows per replay group
 * (so per-goal ordering and timing stay correct within each game), then
 * renumber for the playlist.
 */
function playlistGoals(events: MechanicEventResponse[], goalTypeKey: string): GoalRow[] {
  const byReplay = new Map<string, MechanicEventResponse[]>();
  for (const event of events) {
    const group = byReplay.get(event.replay_id);
    if (group) {
      group.push(event);
    } else {
      byReplay.set(event.replay_id, [event]);
    }
  }
  const goals: GoalRow[] = [];
  for (const group of byReplay.values()) {
    for (const goal of buildGoalRows(group)) {
      if (!goalTypeKey || goal.types.some((type) => type.key === goalTypeKey)) {
        goals.push({ ...goal, index: goals.length });
      }
    }
  }
  return goals;
}

/**
 * Human-readable labels for each replay heading in a cross-replay playlist.
 * Resolved lazily: headings render immediately with game numbers, then pick up
 * the match date once the replay metadata loads. getReplay serves most lookups
 * from the session cache after one recent-replays listing.
 */
function useReplayDateLabels(goals: GoalRow[], enabled: boolean): Map<string, string> {
  const [labels, setLabels] = useState<Map<string, string>>(new Map());
  const replayIds = useMemo(() => {
    const ids = new Set<string>();
    for (const goal of goals) {
      ids.add(goal.event.replay_id);
    }
    return [...ids];
  }, [goals]);

  useEffect(() => {
    if (!enabled || replayIds.length === 0) {
      return;
    }
    let cancelled = false;
    void Promise.allSettled(
      replayIds.map(async (replayId) => {
        const replay = await getReplay(replayId);
        const date = replay.replay_date || replay.created_at;
        return [replayId, date ? formatReplayDate(date) : null] as const;
      }),
    ).then((results) => {
      if (cancelled) return;
      const next = new Map<string, string>();
      for (const result of results) {
        if (result.status === "fulfilled" && result.value[1]) {
          next.set(result.value[0], result.value[1]);
        }
      }
      setLabels(next);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, replayIds]);

  return labels;
}

function formatReplayDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function GoalPlaylist({
  goalTypeKey,
  goals,
  loading,
  error,
  contextLabel,
  backHref,
  typeHref,
  showReplayGroups,
}: {
  goalTypeKey: string;
  goals: GoalRow[];
  loading: boolean;
  error: string | null;
  contextLabel: string;
  backHref: string;
  typeHref: (type: GoalType) => string;
  showReplayGroups: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [replayNonce, setReplayNonce] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Keep the playing goal visible as auto-advance walks down a long list.
  useEffect(() => {
    listRef.current
      ?.querySelector(".goal-card.selected")
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  // A new goal set (type switch, refetch) restarts the playlist from the top.
  useEffect(() => {
    setActiveIndex(0);
  }, [goalTypeKey, goals.length]);

  const activeGoal = goals[activeIndex] ?? null;
  const clip = useMemo(
    () => (activeGoal ? buildGoalClip(activeGoal, replayNonce) : null),
    [activeGoal, replayNonce],
  );

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((index) => {
        if (goals.length === 0) return 0;
        return (index + delta + goals.length) % goals.length;
      });
    },
    [goals.length],
  );

  const onClipEnd = useCallback(
    (clipKey: string) => {
      if (!autoAdvance || goals.length < 2) return;
      // Stray end notifications for an already-replaced clip must not double-advance.
      if (!clip || clipKey !== clip.key) return;
      step(1);
    },
    [autoAdvance, clip, goals.length, step],
  );

  // Warm the next goal's replay so cross-replay advances don't stall on parsing.
  useEffect(() => {
    if (goals.length < 2 || !activeGoal) return;
    const next = goals[(activeIndex + 1) % goals.length];
    if (next && next.event.replay_id !== activeGoal.event.replay_id) {
      preloadReplayModel(next.event.replay_id).catch(() => {});
    }
  }, [activeGoal, activeIndex, goals]);

  const typeLabel = goalTypeKey ? goalTypeLabel(goalTypeKey) : "All";
  // Game N ordinals: short UUIDv7 prefixes collide for replays uploaded close
  // together, so headings need a per-playlist number to stay distinguishable.
  const replayOrdinals = useMemo(() => {
    const ordinals = new Map<string, number>();
    for (const goal of goals) {
      if (!ordinals.has(goal.event.replay_id)) {
        ordinals.set(goal.event.replay_id, ordinals.size + 1);
      }
    }
    return ordinals;
  }, [goals]);
  const replayDateLabels = useReplayDateLabels(goals, showReplayGroups);

  return (
    <section className="page goal-playlist-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Goal playlist</p>
          <h1>{typeLabel} goals</h1>
          <p className="subtle">{contextLabel}</p>
        </div>
        <div className="button-row">
          <Link className="secondary-button" to={backHref}>
            <ChevronLeft size={16} />
            Back to goals
          </Link>
        </div>
      </header>

      {error ? (
        <div className="api-notice">
          <strong>Goal events</strong>
          <span>{error}</span>
        </div>
      ) : null}

      {loading ? (
        <div className="stat-empty">Loading goals…</div>
      ) : goals.length === 0 ? (
        <div className="stat-empty">
          {goalTypeKey ? `No ${typeLabel.toLowerCase()} goals found here yet.` : "No goals found here yet."}
        </div>
      ) : (
        <div className="goal-playlist-layout">
          <section className="chart-panel goal-playlist-player-panel">
            <div className="chart-panel-header">
              <div>
                <h3>
                  {activeGoal
                    ? `${activeIndex + 1} / ${goals.length} · ${activeGoal.scorerName} · ${formatSeconds(activeGoal.time)}`
                    : "No goal selected"}
                </h3>
              </div>
              <div className="goal-playlist-controls">
                <label className="goal-playlist-autoplay" title="Move to the next goal when the clip ends">
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={(event) => setAutoAdvance(event.currentTarget.checked)}
                  />
                  Auto-advance
                </label>
                <button type="button" className="icon-button" title="Previous goal" onClick={() => step(-1)}>
                  <ChevronLeft size={17} />
                </button>
                <button type="button" className="icon-button" title="Next goal" onClick={() => step(1)}>
                  <ChevronRight size={17} />
                </button>
                {activeGoal ? (
                  <a
                    className="icon-button"
                    title="Open full player"
                    href={`/replays/${encodeURIComponent(activeGoal.event.replay_id)}/player`}
                  >
                    <ExternalLink size={15} />
                  </a>
                ) : null}
              </div>
            </div>
            {activeGoal ? (
              <EventClipPlayer replayId={activeGoal.event.replay_id} clip={clip} onClipEnd={onClipEnd} />
            ) : null}
          </section>

          <section className="chart-panel goal-playlist-list-panel">
            <div className="chart-panel-header">
              <div>
                <h3>Goals</h3>
              </div>
            </div>
            <div className="goal-card-list kickoff-card-list" ref={listRef}>
              {goals.map((goal, index) => {
                const previous = goals[index - 1];
                const startsNewReplay =
                  showReplayGroups && (!previous || previous.event.replay_id !== goal.event.replay_id);
                return (
                  <Fragment key={goal.event.id}>
                    {startsNewReplay ? (
                      <Link
                        className="goal-playlist-replay-heading"
                        to={`/replays/${encodeURIComponent(goal.event.replay_id)}/stats/goals`}
                      >
                        Game {replayOrdinals.get(goal.event.replay_id)}
                        {" · "}
                        {replayDateLabels.get(goal.event.replay_id) ?? goal.event.replay_id.slice(0, 8)}
                      </Link>
                    ) : null}
                    <GoalCard
                      goal={goal}
                      active={index === activeIndex}
                      onActivate={(force) => {
                        // Unlike the per-replay goals tab, hover never switches
                        // clips here: a hover could trigger a whole-replay load.
                        if (!force) return;
                        setActiveIndex(index);
                        if (index === activeIndex) {
                          setReplayNonce((nonce) => nonce + 1);
                        }
                      }}
                      typeHref={typeHref}
                    />
                  </Fragment>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
