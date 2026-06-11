import type {
  AccessTokenResponse,
  AuthOptionsResponse,
  BoostTracksResponse,
  CurrentUserResponse,
  EventStatSummaryResponse,
  EventTypesResponse,
  ListReplaysResponse,
  MechanicEventsResponse,
  PlayerProfileResponse,
  PlayerStatOverviewResponse,
  ProcessingVersionBreakdownResponse,
  ProcessingVersionResponse,
  ReplayProcessingDiagnosticsResponse,
  ReplayFilterOptionsResponse,
  ReplayResponse,
  ReprocessReplayResponse,
  StatAggregateSetResponse,
} from "./types";

const tokenKey = "rocket_sense_access_token";
const replayCacheKey = "rocket_sense_replay_cache";
const replayEventsCacheKey = "rocket_sense_replay_events_cache";
const eventPageSize = 5000;
const maxReplayEvents = 50000;

type ApiRequestOptions = RequestInit & {
  includeAccessToken?: boolean;
};

export function getAccessToken(): string | null {
  return localStorage.getItem(tokenKey);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(tokenKey, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(tokenKey);
}

async function request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { includeAccessToken = true, ...fetchOptions } = options;
  const token = getAccessToken();
  const headers = new Headers(fetchOptions.headers);
  if (includeAccessToken && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(path, { ...fetchOptions, headers });
  if (!response.ok) {
    const body = await response.text();
    const message = apiErrorMessage(body);
    throw new Error(message || `${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

function apiErrorMessage(body: string): string {
  try {
    const parsed = JSON.parse(body) as { error?: unknown };
    if (typeof parsed.error === "string") {
      return parsed.error;
    }
  } catch {
    // Fall through to the raw response body for non-JSON errors.
  }
  return body;
}

export function listReplays(searchParams: URLSearchParams): Promise<ListReplaysResponse> {
  const params = new URLSearchParams(searchParams);
  if (!params.has("count")) {
    params.set("count", "50");
  }
  return request<ListReplaysResponse>(`/api/v1/replays?${params.toString()}`).then((response) => {
    cacheReplays(response.replays);
    return response;
  });
}

export function listReplayFilterOptions(): Promise<ReplayFilterOptionsResponse> {
  return request<ReplayFilterOptionsResponse>("/api/v1/replays/filter-options");
}

export function listReplayProcessingDiagnostics(searchParams: URLSearchParams): Promise<ReplayProcessingDiagnosticsResponse> {
  const params = new URLSearchParams(searchParams);
  if (!params.has("count")) {
    params.set("count", "100");
  }
  return request<ReplayProcessingDiagnosticsResponse>(`/api/v1/admin/replays/processing-diagnostics?${params.toString()}`, {
    includeAccessToken: false,
  });
}

export async function getReplay(replayId: string): Promise<ReplayResponse> {
  const cached = getCachedReplay(replayId);
  if (cached) return cached;

  const recentParams = new URLSearchParams({ count: "200" });
  const recent = await listReplays(recentParams);
  const recentReplay = recent.replays.find((replay) => replay.id === replayId);
  if (recentReplay) return recentReplay;

  return request<ReplayResponse>(`/api/v1/replays/${encodeURIComponent(replayId)}`);
}

export function getReplayStatAggregates(replayId: string): Promise<StatAggregateSetResponse> {
  const params = new URLSearchParams({
    "replay-id": replayId,
    count: "200",
  });
  return request<StatAggregateSetResponse>(`/api/v1/stats/aggregates?${params.toString()}`);
}

export function getPlayerStatAggregates(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<StatAggregateSetResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  params.set("include-teammates", "true");
  params.set("group-by", "playlist");
  params.set("count", "200");
  return request<StatAggregateSetResponse>(`/api/v1/stats/aggregates?${params.toString()}`);
}

export function getProcessingVersion(): Promise<ProcessingVersionResponse> {
  return request<ProcessingVersionResponse>("/api/v1/processing-version");
}

export function getPlayerProcessingVersions(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<ProcessingVersionBreakdownResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  return request<ProcessingVersionBreakdownResponse>(
    `/api/v1/stats/processing-versions?${params.toString()}`,
  );
}

export function getPlayerStatOverview(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<PlayerStatOverviewResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  return request<PlayerStatOverviewResponse>(`/api/v1/stats/player-overview?${params.toString()}`);
}

export function getPlayerKickoffSummary(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<EventStatSummaryResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  params.set("include-samples", "false");
  return request<EventStatSummaryResponse>(`/api/v1/stats/events/kickoff/summary?${params.toString()}`);
}

export async function listReplayEvents(replayId: string, eventTypes: string[] = []): Promise<MechanicEventsResponse> {
  const cacheKey = replayEventsKey(replayId, eventTypes);
  const cached = getCachedReplayEvents(cacheKey);
  if (cached) return cached;

  const events: MechanicEventsResponse["events"] = [];
  let offset = 0;
  let nextOffset: number | null = 0;

  while (nextOffset != null && events.length < maxReplayEvents) {
    const params = new URLSearchParams({
      "replay-id": replayId,
      count: String(eventPageSize),
      offset: String(offset),
    });
    for (const eventType of eventTypes) {
      params.append("event-type", eventType);
    }
    const response = await request<MechanicEventsResponse>(`/api/v1/events?${params.toString()}`);
    events.push(...response.events);
    nextOffset = response.next_offset;
    offset = nextOffset ?? offset;
  }

  const response = {
    events,
    count: events.length,
    offset: 0,
    next_offset: nextOffset,
  };
  cacheReplayEvents(cacheKey, response);
  return response;
}

export function listEventTypes(): Promise<EventTypesResponse> {
  return request<EventTypesResponse>("/api/v1/events/types");
}

export function listBoostTracks(replayId: string): Promise<BoostTracksResponse> {
  return request<BoostTracksResponse>(
    `/api/v1/replays/${encodeURIComponent(replayId)}/stats/boost-tracks`,
  );
}

export function getPlayerProfile(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<PlayerProfileResponse> {
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : "";
  return request<PlayerProfileResponse>(
    `/api/v1/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}${suffix}`,
  );
}

export function getAuthOptions(): Promise<AuthOptionsResponse> {
  return request<AuthOptionsResponse>("/api/v1/auth/options");
}

export function getCurrentUser(): Promise<CurrentUserResponse> {
  return request<CurrentUserResponse>("/api/v1/me");
}

export function reprocessReplay(replayId: string): Promise<ReprocessReplayResponse> {
  return request<ReprocessReplayResponse>(
    `/api/v1/replays/${encodeURIComponent(replayId)}/reprocess`,
    { method: "POST" },
  );
}

export async function uploadReplay(file: File): Promise<ReplayResponse> {
  const body = new FormData();
  body.set("file", file);
  const result = await request<{ replay: ReplayResponse }>("/api/v1/replays", {
    method: "POST",
    body,
  });
  return result.replay;
}

export function createDevToken(email: string): Promise<AccessTokenResponse> {
  return request<AccessTokenResponse>("/api/v1/auth/dev-token", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export function createAccountToken(options: { includeAccessToken?: boolean } = {}): Promise<AccessTokenResponse> {
  return request<AccessTokenResponse>("/api/v1/auth/profile-token", {
    method: "POST",
    credentials: "same-origin",
    includeAccessToken: options.includeAccessToken,
  });
}

function cacheReplays(replays: ReplayResponse[]): void {
  const cache = readReplayCache();
  for (const replay of replays) {
    cache[replay.id] = replay;
  }
  const entries = Object.entries(cache).slice(-300);
  sessionStorage.setItem(replayCacheKey, JSON.stringify(Object.fromEntries(entries)));
}

function getCachedReplay(replayId: string): ReplayResponse | null {
  return readReplayCache()[replayId] ?? null;
}

function readReplayCache(): Record<string, ReplayResponse> {
  try {
    const raw = sessionStorage.getItem(replayCacheKey);
    return raw ? (JSON.parse(raw) as Record<string, ReplayResponse>) : {};
  } catch {
    return {};
  }
}

function replayEventsKey(replayId: string, eventTypes: string[]): string {
  return eventTypes.length > 0 ? `${replayId}:${eventTypes.slice().sort().join(",")}` : replayId;
}

function cacheReplayEvents(cacheKey: string, response: MechanicEventsResponse): void {
  try {
    const cache = readReplayEventsCache();
    cache[cacheKey] = response;
    sessionStorage.setItem(replayEventsCacheKey, JSON.stringify(cache));
  } catch {
    // Large replay event streams can exceed browser storage quota; fetching still succeeded.
  }
}

function getCachedReplayEvents(cacheKey: string): MechanicEventsResponse | null {
  return readReplayEventsCache()[cacheKey] ?? null;
}

function readReplayEventsCache(): Record<string, MechanicEventsResponse> {
  try {
    const raw = sessionStorage.getItem(replayEventsCacheKey);
    return raw ? (JSON.parse(raw) as Record<string, MechanicEventsResponse>) : {};
  } catch {
    return {};
  }
}
