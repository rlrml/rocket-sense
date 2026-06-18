import { loadReplay, type ReplayLoadResult, type ReplayModel } from "@rlrml/player";
import initSubtrActor, { get_stats_timeline_json } from "@rlrml/subtr-actor";

// Parsing a replay is expensive, so cache the fully-decoded model per replay.
// Every consumer in the app (the event clip player, the kickoff path diagrams)
// shares this one cache, so a replay is only ever downloaded and parsed once and
// switching between views is instant.
//
// This loader lives in its own module (rather than alongside the three.js-backed
// ReplayPlayer in EventClipPlayer) so that consumers which only need the parsed
// frame data — e.g. the kickoff shape diagram — can lazy-load it without pulling
// the renderer into their bundle.
const replayLoadCache = new Map<string, Promise<ReplayLoadResult>>();

// The standalone subtr-actor WASM (used for the stats-timeline scaffold below)
// is a separate module from the one @rlrml/player drives for playback, so it
// needs its own one-time wasm-bindgen init. Memoize it.
let subtrActorReady: Promise<unknown> | null = null;
function ensureSubtrActorReady(): Promise<unknown> {
  if (!subtrActorReady) {
    subtrActorReady = initSubtrActor();
  }
  return subtrActorReady;
}

// Run the subtr-actor WASM stats-timeline collector on a replay entirely in the
// browser and return the raw JSON scaffold text (the same artifact the server
// computes from subtr-actor). Used by the client-side reprocess flow: trusted
// users spend their own compute to regenerate a replay's analysis, then upload
// this scaffold for the server to persist without re-running subtr-actor. The
// text is returned as a string on purpose — callers splice it straight into the
// request body to avoid re-stringifying a multi-MB payload.
export async function computeStatsTimelineScaffoldJson(replayId: string): Promise<string> {
  await ensureSubtrActorReady();
  const response = await fetch(`/api/v1/replays/${encodeURIComponent(replayId)}/file`);
  if (!response.ok) {
    throw new Error(`Failed to download replay (${response.status})`);
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  const scaffoldJson = get_stats_timeline_json(bytes);
  return new TextDecoder().decode(scaffoldJson);
}

export function preloadReplay(replayId: string): Promise<ReplayLoadResult> {
  let pending = replayLoadCache.get(replayId);
  if (!pending) {
    pending = (async () => {
      const response = await fetch(`/api/v1/replays/${encodeURIComponent(replayId)}/file`);
      if (!response.ok) {
        throw new Error(`Failed to download replay (${response.status})`);
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      return loadReplay(bytes);
    })();
    pending.catch(() => replayLoadCache.delete(replayId));
    replayLoadCache.set(replayId, pending);
  }
  return pending;
}

export async function preloadReplayModel(replayId: string): Promise<ReplayModel> {
  return (await preloadReplay(replayId)).replay;
}
