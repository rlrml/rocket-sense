import {
  ensureBindingsReady,
  normalizeReplayData,
  type RawReplayFramesData,
  type ReplayModel,
} from "@rlrml/player";
import * as subtrActor from "@rlrml/subtr-actor";

// Parsing a replay is expensive, so cache the fully-decoded model per replay.
// Every consumer in the app (the event clip player, the kickoff path diagrams)
// shares this one cache, so a replay is only ever downloaded and parsed once and
// switching between views is instant.
//
// This loader lives in its own module (rather than alongside the three.js-backed
// ReplayPlayer in EventClipPlayer) so that consumers which only need the parsed
// frame data — e.g. the kickoff shape diagram — can lazy-load it without pulling
// the renderer into their bundle.
const replayModelCache = new Map<string, Promise<ReplayModel>>();

export function preloadReplayModel(replayId: string): Promise<ReplayModel> {
  let pending = replayModelCache.get(replayId);
  if (!pending) {
    pending = (async () => {
      await ensureBindingsReady();
      const response = await fetch(`/api/v1/replays/${encodeURIComponent(replayId)}/file`);
      if (!response.ok) {
        throw new Error(`Failed to download replay (${response.status})`);
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      // Parse on the main thread instead of loadReplayFromBytes: the published
      // @rlrml/player ships its web worker as an IIFE that references an unbound
      // `subtrActor` global, so the worker path throws "subtrActor is not defined".
      const framesJson = subtrActor.get_replay_frames_data_json_with_progress(bytes, () => undefined, null);
      const raw = JSON.parse(new TextDecoder().decode(framesJson)) as RawReplayFramesData;
      return normalizeReplayData(raw);
    })();
    pending.catch(() => replayModelCache.delete(replayId));
    replayModelCache.set(replayId, pending);
  }
  return pending;
}
