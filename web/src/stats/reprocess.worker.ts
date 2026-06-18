import initSubtrActor, { get_stats_timeline_json } from "@rlrml/subtr-actor";

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

function post(message: WorkerResponse) {
  workerScope.postMessage(message);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function replayFileUrl(replayId: string): string {
  return `/api/v1/replays/${encodeURIComponent(replayId)}/file`;
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
    message: "Processing replay frames",
    progress: null,
  });
  const scaffoldBytes = get_stats_timeline_json(bytes);

  post({
    type: "progress",
    stage: "encoding",
    message: "Preparing upload",
    progress: null,
  });
  return decoder.decode(scaffoldBytes);
}

workerScope.onmessage = (event: MessageEvent<WorkerRequest>) => {
  if (event.data.type !== "compute") return;

  computeScaffoldJson(event.data.replayId)
    .then((scaffoldJson) => post({ type: "complete", scaffoldJson }))
    .catch((error: unknown) => post({ type: "error", message: errorMessage(error) }));
};
