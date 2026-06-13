import {
  loadReplay,
  type ReplayLoadResult,
  type ReplayModel,
} from "@rlrml/viewer";

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
