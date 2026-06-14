import type {
  AccessTokenResponse,
  AuthOptionsResponse,
  BoostTracksResponse,
  CurrentUserResponse,
  EventStatSummaryResponse,
  EventTypesResponse,
  GroupBoostTotalsResponse,
  ListReplayGroupsResponse,
  ListReplaysResponse,
  MechanicEventsResponse,
  PlayerProfileResponse,
  PlayerStatOverviewResponse,
  ProcessingVersionBreakdownResponse,
  ProcessingVersionResponse,
  ReplayProcessingDiagnosticsResponse,
  ReplayFilterOptionsResponse,
  ReplayGroupResponse,
  ReplayGroupReplayUpdateResponse,
  ReplayResponse,
  ReprocessReplayResponse,
  StatAggregateSetResponse,
  PossessionSummaryResponse,
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

export function listReplayGroups(): Promise<ListReplayGroupsResponse> {
  return request<ListReplayGroupsResponse>("/api/v1/replay-groups");
}

export function createReplayGroup(body: {
  name: string;
  description?: string;
}): Promise<ReplayGroupResponse> {
  return request<ReplayGroupResponse>("/api/v1/replay-groups", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function addReplaysToGroup(
  groupId: string,
  replayIds: string[],
): Promise<ReplayGroupReplayUpdateResponse> {
  return request<ReplayGroupReplayUpdateResponse>(
    `/api/v1/replay-groups/${encodeURIComponent(groupId)}/replays`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ replay_ids: replayIds }),
    },
  );
}

export function removeReplaysFromGroup(
  groupId: string,
  replayIds: string[],
): Promise<ReplayGroupReplayUpdateResponse> {
  return request<ReplayGroupReplayUpdateResponse>(
    `/api/v1/replay-groups/${encodeURIComponent(groupId)}/replays`,
    {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ replay_ids: replayIds }),
    },
  );
}

// The delete-group endpoint returns 204 with no body, so it bypasses the JSON
// `request` helper that always parses a response body.
export async function deleteReplayGroup(groupId: string): Promise<void> {
  const token = getAccessToken();
  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const response = await fetch(`/api/v1/replay-groups/${encodeURIComponent(groupId)}`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(apiErrorMessage(body) || `${response.status} ${response.statusText}`);
  }
}

export function listReplayProcessingDiagnostics(
  searchParams: URLSearchParams,
): Promise<ReplayProcessingDiagnosticsResponse> {
  const params = new URLSearchParams(searchParams);
  if (!params.has("count")) {
    params.set("count", "100");
  }
  return request<ReplayProcessingDiagnosticsResponse>(
    `/api/v1/admin/replays/processing-diagnostics?${params.toString()}`,
    {
      includeAccessToken: false,
    },
  );
}

type GetReplayOptions = {
  forceRefresh?: boolean;
};

export async function getReplay(
  replayId: string,
  options: GetReplayOptions = {},
): Promise<ReplayResponse> {
  const cached = options.forceRefresh ? null : getCachedReplay(replayId);
  if (cached) return cached;

  if (options.forceRefresh) {
    const replay = await request<ReplayResponse>(
      `/api/v1/replays/${encodeURIComponent(replayId)}`,
      { cache: "no-store" },
    );
    cacheReplay(replay);
    return replay;
  }

  const recentParams = new URLSearchParams({ count: "200" });
  const recent = await listReplays(recentParams);
  const recentReplay = recent.replays.find((replay) => replay.id === replayId);
  if (recentReplay) return recentReplay;

  const replay = await request<ReplayResponse>(`/api/v1/replays/${encodeURIComponent(replayId)}`);
  cacheReplay(replay);
  return replay;
}

export function getReplayGroup(groupId: string): Promise<ReplayGroupResponse> {
  return request<ReplayGroupResponse>(`/api/v1/replay-groups/${encodeURIComponent(groupId)}`);
}

export function listReplayGroupReplays(groupId: string): Promise<ListReplaysResponse> {
  return request<ListReplaysResponse>(
    `/api/v1/replay-groups/${encodeURIComponent(groupId)}/replays`,
  ).then((response) => {
    cacheReplays(response.replays);
    return response;
  });
}

export function getReplayStatAggregates(replayId: string): Promise<StatAggregateSetResponse> {
  const params = new URLSearchParams({
    "replay-id": replayId,
    count: "200",
  });
  return request<StatAggregateSetResponse>(`/api/v1/stats/aggregates?${params.toString()}`);
}

export function getReplayGroupStatAggregates(groupId: string): Promise<StatAggregateSetResponse> {
  const params = new URLSearchParams({
    group: groupId,
    count: "200",
  });
  return request<StatAggregateSetResponse>(`/api/v1/stats/aggregates?${params.toString()}`);
}

export function getPlayerStatAggregates(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
  statTerms: readonly string[] = [],
): Promise<StatAggregateSetResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  params.set("include-teammates", "true");
  params.set("group-by", "playlist");
  params.set("count", "200");
  for (const term of statTerms) {
    params.append("stat-term", term);
  }
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
  role?: "taker" | "support",
): Promise<EventStatSummaryResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  if (role) {
    params.set("role", role);
  }
  params.set("include-samples", "false");
  return request<EventStatSummaryResponse>(
    `/api/v1/stats/events/kickoff/summary?${params.toString()}`,
  );
}

export function getPlayerPossessionSummary(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<PossessionSummaryResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  return request<PossessionSummaryResponse>(
    `/api/v1/stats/possession/summary?${params.toString()}`,
  );
}

export async function listReplayEvents(
  replayId: string,
  eventTypes: string[] = [],
  processedAt: string | null = null,
): Promise<MechanicEventsResponse> {
  const cacheKey = replayEventsKey(replayId, eventTypes, processedAt);
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

export async function listReplayGroupEvents(
  groupId: string,
  eventTypes: string[] = [],
): Promise<MechanicEventsResponse> {
  const cacheKey = replayEventsKey(`group:${groupId}`, eventTypes, null);
  const cached = getCachedReplayEvents(cacheKey);
  if (cached) return cached;

  const events: MechanicEventsResponse["events"] = [];
  let offset = 0;
  let nextOffset: number | null = 0;

  while (nextOffset != null && events.length < maxReplayEvents) {
    const params = new URLSearchParams({
      group: groupId,
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

// Cross-replay variant of listReplayEvents: every event whose primary subject is
// the given player (platform:platform_player_id), e.g. all goals they scored.
export async function listPlayerEvents(
  playerId: string,
  eventTypes: string[] = [],
): Promise<MechanicEventsResponse> {
  const cacheKey = replayEventsKey(`player:${playerId}`, eventTypes, null);
  const cached = getCachedReplayEvents(cacheKey);
  if (cached) return cached;

  const events: MechanicEventsResponse["events"] = [];
  let offset = 0;
  let nextOffset: number | null = 0;

  while (nextOffset != null && events.length < maxReplayEvents) {
    const params = new URLSearchParams({
      "player-id": playerId,
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

export function listReplayGroupBoostTotals(groupId: string): Promise<GroupBoostTotalsResponse> {
  return request<GroupBoostTotalsResponse>(
    `/api/v1/replay-groups/${encodeURIComponent(groupId)}/stats/boost-totals`,
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

export function reprocessReplay(
  replayId: string,
  options: { force?: boolean } = {},
): Promise<ReprocessReplayResponse> {
  const query = options.force ? "?force=true" : "";
  return request<ReprocessReplayResponse>(
    `/api/v1/replays/${encodeURIComponent(replayId)}/reprocess${query}`,
    { method: "POST" },
  );
}

export interface ReprocessReplayClientResponse {
  replay_id: string;
  analysis_run_id: string;
  status: string;
}

// Upload a browser-computed stats-timeline scaffold for the server to persist as
// a new canonical analysis run (no server-side subtr-actor re-run). `scaffoldJson`
// is the raw JSON text from `computeStatsTimelineScaffoldJson`; it is spliced into
// the body directly rather than re-stringified, since it can be many megabytes.
export function reprocessReplayClient(
  replayId: string,
  payload: { subtrActorGitSha: string; scaffoldJson: string },
): Promise<ReprocessReplayClientResponse> {
  const body = `{"subtr_actor_git_sha":${JSON.stringify(payload.subtrActorGitSha)},"scaffold":${payload.scaffoldJson}}`;
  return request<ReprocessReplayClientResponse>(
    `/api/v1/replays/${encodeURIComponent(replayId)}/reprocess/client`,
    { method: "POST", headers: { "content-type": "application/json" }, body },
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

export function createAccountToken(
  options: { includeAccessToken?: boolean } = {},
): Promise<AccessTokenResponse> {
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

function cacheReplay(replay: ReplayResponse): void {
  cacheReplays([replay]);
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

function replayEventsKey(
  replayId: string,
  eventTypes: string[],
  processedAt: string | null,
): string {
  const scope = processedAt ? `${replayId}@${processedAt}` : replayId;
  return eventTypes.length > 0 ? `${scope}::${eventTypes.slice().sort().join(",")}` : scope;
}

function cacheReplayEvents(cacheKey: string, response: MechanicEventsResponse): void {
  try {
    const cache = readReplayEventsCache();
    const scope = cacheKey.split("::")[0];
    const replayId = scope.split("@")[0];
    for (const key of Object.keys(cache)) {
      const keyScope = key.split("::")[0];
      if (keyScope !== scope && keyScope.split("@")[0] === replayId) {
        delete cache[key];
      }
    }
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
