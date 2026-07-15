import initSubtrActor, {
  get_replay_frames_data,
  get_stats_timeline_json,
} from "@rlrml/subtr-actor";
import initMistakes, {
  detect_mistakes_with_models,
  list_focus_players,
  MistakeModels,
} from "@rocket-sense/mistakes";
import mistakeModelsUrl from "@rocket-sense/mistakes/mistake_models.json.gz?url";
import type { MistakeDetectResponse, MistakeMarker } from "../types";

type WorkerRequest = {
  type: "compute";
  replayId: string;
};

type ProgressStage = "initializing" | "downloading" | "processing" | "encoding";

type WorkerResponse =
  | {
      type: "progress";
      stage: ProgressStage;
      message: string;
      progress: number | null;
      loadedBytes?: number;
      totalBytes?: number;
    }
  | { type: "complete"; scaffoldJson: string }
  | { type: "error"; message: string };

const workerScope = globalThis as unknown as {
  postMessage(message: WorkerResponse): void;
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
};
const decoder = new TextDecoder();

interface FocusPlayer {
  key: string;
  name: string;
  is_team_zero: boolean;
}

interface RawReplayData {
  frame_data?: {
    metadata_frames?: Array<{ time?: number }>;
  };
}

function post(message: WorkerResponse) {
  workerScope.postMessage(message);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function replayFileUrl(replayId: string): string {
  return `/api/v1/replays/${encodeURIComponent(replayId)}/file`;
}

async function loadMistakeModels(): Promise<MistakeModels> {
  const response = await fetch(mistakeModelsUrl);
  if (!response.ok) {
    throw new Error(`Fetching mistake models failed (${response.status})`);
  }
  const body = await response.arrayBuffer();
  const bytes = new Uint8Array(body);
  const isGzip = bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;
  const artifactJson = isGzip
    ? await new Response(
        new Blob([body]).stream().pipeThrough(new DecompressionStream("gzip")),
      ).text()
    : decoder.decode(body);
  return new MistakeModels(artifactJson);
}

function frameIndexAtTime(raw: RawReplayData, replayTime: number): number | null {
  const frames = raw.frame_data?.metadata_frames ?? [];
  const offset = frames[0]?.time;
  if (offset == null || !frames.length) return null;
  const absoluteTime = offset + replayTime;
  let lo = 0;
  let hi = frames.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if ((frames[mid]?.time ?? Number.POSITIVE_INFINITY) <= absoluteTime) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo > 0 ? lo - 1 : null;
}

async function collectMistakes(raw: RawReplayData) {
  await initMistakes();
  const models = await loadMistakeModels();
  const focusPlayers = list_focus_players(raw) as FocusPlayer[];
  let detectorVersion = "mistakes-v1";
  let featuresVersion = 1;
  const players = focusPlayers.map((focus) => {
    const detection = detect_mistakes_with_models(
      raw,
      focus.key,
      undefined,
      models,
    ) as MistakeDetectResponse;
    detectorVersion = detection.detector_version;
    featuresVersion = detection.features_version;
    const markers = detection.markers.map((marker: MistakeMarker) => ({
      ...marker,
      start_frame: frameIndexAtTime(raw, marker.t_start),
      end_frame: frameIndexAtTime(raw, marker.t_end),
      event_frame: frameIndexAtTime(raw, marker.time),
    }));
    return {
      player_key: focus.key,
      player_name: focus.name,
      team: focus.is_team_zero ? 0 : 1,
      markers,
    };
  });
  return {
    detector_version: detectorVersion,
    features_version: featuresVersion,
    model_count: models.model_count,
    players,
  };
}

async function readResponseBytes(response: Response): Promise<Uint8Array> {
  const totalBytesHeader = response.headers.get("content-length");
  const totalBytes = totalBytesHeader ? Number(totalBytesHeader) : undefined;

  if (!response.body) {
    const buffer = await response.arrayBuffer();
    const loadedBytes = buffer.byteLength;
    post({
      type: "progress",
      stage: "downloading",
      message: "Downloaded replay",
      progress: 1,
      loadedBytes,
      totalBytes: totalBytes || loadedBytes,
    });
    return new Uint8Array(buffer);
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let loadedBytes = 0;
  let lastReportedProgress = -1;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
    loadedBytes += value.byteLength;

    const progress =
      totalBytes && Number.isFinite(totalBytes) && totalBytes > 0 ? loadedBytes / totalBytes : null;
    if (progress === null || progress - lastReportedProgress >= 0.01 || progress === 1) {
      lastReportedProgress = progress ?? lastReportedProgress;
      post({
        type: "progress",
        stage: "downloading",
        message: "Downloading replay",
        progress,
        loadedBytes,
        totalBytes,
      });
    }
  }

  const bytes = new Uint8Array(loadedBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  post({
    type: "progress",
    stage: "downloading",
    message: "Downloaded replay",
    progress: 1,
    loadedBytes,
    totalBytes: totalBytes || loadedBytes,
  });
  return bytes;
}

async function computeScaffoldJson(replayId: string): Promise<string> {
  post({
    type: "progress",
    stage: "initializing",
    message: "Initializing replay analyzer",
    progress: null,
  });
  await initSubtrActor();

  post({
    type: "progress",
    stage: "downloading",
    message: "Downloading replay",
    progress: null,
  });
  const response = await fetch(replayFileUrl(replayId));
  if (!response.ok) {
    throw new Error(`Failed to download replay (${response.status})`);
  }

  const bytes = await readResponseBytes(response);
  post({
    type: "progress",
    stage: "processing",
    message: "Processing replay frames and mistakes",
    progress: null,
  });
  const scaffoldBytes = get_stats_timeline_json(bytes);
  const rawReplayData = get_replay_frames_data(bytes) as RawReplayData;
  const mistakes = await collectMistakes(rawReplayData);

  post({
    type: "progress",
    stage: "encoding",
    message: "Preparing upload",
    progress: null,
  });
  const scaffold = JSON.parse(decoder.decode(scaffoldBytes)) as Record<string, unknown>;
  scaffold.mistakes = mistakes;
  return JSON.stringify(scaffold);
}

workerScope.onmessage = (event: MessageEvent<WorkerRequest>) => {
  if (event.data.type !== "compute") return;

  computeScaffoldJson(event.data.replayId)
    .then((scaffoldJson) => post({ type: "complete", scaffoldJson }))
    .catch((error: unknown) => post({ type: "error", message: errorMessage(error) }));
};
