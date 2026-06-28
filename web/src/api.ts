import type {
  AccessTokenResponse,
  AuthOptionsResponse,
  BoostPadControlResponse,
  BoostTracksResponse,
  CurrentUserResponse,
  EventStatSummaryResponse,
  EventTypesResponse,
  FavoritesResponse,
  GroupBoostTotalsResponse,
  LinkedIdentitiesResponse,
  ListReplayGroupsResponse,
  ListReplayGroupManagersResponse,
  ListReplaysResponse,
  UploadsLeaderboardResponse,
  AppearancesLeaderboardResponse,
  EventLeaderboardResponse,
  StatLeaderboardResponse,
  MechanicEventsResponse,
  MovementSummaryResponse,
  PlayerProfileResponse,
  PlayerBoostTotalsResponse,
  PlayerStatOverviewResponse,
  ProcessingVersionBreakdownResponse,
  ProcessingVersionResponse,
  RankBenchmarkCohortsResponse,
  RankTrendsResponse,
  RecentlyProcessedReplaysResponse,
  ReplayProcessingDiagnosticsResponse,
  ReplayProcessingQueueResponse,
  ReprocessFailedQueueJobsResponse,
  ReplayFilterOptionsResponse,
  ReplayGroupResponse,
  ReplayGroupReplayUpdateResponse,
  ReplayResponse,
  ReprocessReplayResponse,
  StatAggregateSetResponse,
  PossessionSummaryResponse,
  PositioningSummaryResponse,
  UserProfileResponse,
} from "./types";

const tokenKey = "rocket_sense_access_token";
const replayCacheKey = "rocket_sense_replay_cache";
const replayEventsCacheKey = "rocket_sense_replay_events_cache";
const maxCachedReplays = 300;
const maxReplayCacheCharacters = 1_500_000;
const eventPageSize = 5000;
const maxReplayEvents = 50000;
export const authChangeEvent = "rocket-sense-auth-change";

type ApiRequestOptions = RequestInit & {
  includeAccessToken?: boolean;
};

export function getAccessToken(): string | null {
  return localStorage.getItem(tokenKey);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(tokenKey, token);
  window.dispatchEvent(new Event(authChangeEvent));
}

export function clearAccessToken(): void {
  localStorage.removeItem(tokenKey);
  window.dispatchEvent(new Event(authChangeEvent));
}

export async function logout(): Promise<void> {
  try {
    await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
  } catch {
    // Local logout should still complete if the session-clearing request fails.
  } finally {
    clearAccessToken();
  }
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

export function getUserProfile(userId: string): Promise<UserProfileResponse> {
  return request<UserProfileResponse>(`/api/v1/users/${encodeURIComponent(userId)}`);
}

export function getRankTrends(searchParams: URLSearchParams): Promise<RankTrendsResponse> {
  const query = searchParams.toString();
  return request<RankTrendsResponse>(`/api/v1/stats/rank-trends${query ? `?${query}` : ""}`);
}

// The career-stats "rank average" cohorts for the viewed player's filter
// context. player-id drives the default current-rank estimate; the caller adds
// the rank-benchmark-rank / -grouping / -window selection params.
export function getRankBenchmarkCohorts(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<RankBenchmarkCohortsResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  return request<RankBenchmarkCohortsResponse>(`/api/v1/stats/rank-benchmark?${params.toString()}`);
}

export function listReplayFilterOptions(): Promise<ReplayFilterOptionsResponse> {
  return request<ReplayFilterOptionsResponse>("/api/v1/replays/filter-options");
}

export type ReplayGroupListScope = "mine" | "all";

export function listReplayGroups(
  options: { scope?: ReplayGroupListScope; q?: string } = {},
): Promise<ListReplayGroupsResponse> {
  const params = new URLSearchParams();
  if (options.scope) {
    params.set("scope", options.scope);
  }
  const q = options.q?.trim();
  if (q) {
    params.set("q", q);
  }
  const query = params.toString();
  return request<ListReplayGroupsResponse>(`/api/v1/replay-groups${query ? `?${query}` : ""}`);
}

export function getUploadsLeaderboard(
  searchParams: URLSearchParams,
): Promise<UploadsLeaderboardResponse> {
  const params = new URLSearchParams(searchParams);
  return request<UploadsLeaderboardResponse>(`/api/v1/leaderboards/uploads?${params.toString()}`);
}

export function getAppearancesLeaderboard(
  searchParams: URLSearchParams,
): Promise<AppearancesLeaderboardResponse> {
  const params = new URLSearchParams(searchParams);
  return request<AppearancesLeaderboardResponse>(
    `/api/v1/leaderboards/appearances?${params.toString()}`,
  );
}

export function getEventLeaderboard(
  searchParams: URLSearchParams,
): Promise<EventLeaderboardResponse> {
  const params = new URLSearchParams(searchParams);
  return request<EventLeaderboardResponse>(`/api/v1/leaderboards/event?${params.toString()}`);
}

export function getStatLeaderboard(
  searchParams: URLSearchParams,
): Promise<StatLeaderboardResponse> {
  const params = new URLSearchParams(searchParams);
  return request<StatLeaderboardResponse>(`/api/v1/leaderboards/stat?${params.toString()}`);
}

export function createReplayGroup(body: {
  name: string;
  description?: string;
  parent_id?: string | null;
}): Promise<ReplayGroupResponse> {
  return request<ReplayGroupResponse>("/api/v1/replay-groups", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function updateReplayGroup(
  groupId: string,
  body: {
    name?: string;
    description?: string | null;
    parent_id?: string | null;
  },
): Promise<ReplayGroupResponse> {
  return request<ReplayGroupResponse>(`/api/v1/replay-groups/${encodeURIComponent(groupId)}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function createBallchasingMirror(body: {
  group: string;
  parent_id?: string | null;
  name?: string;
}): Promise<ReplayGroupResponse> {
  return request<ReplayGroupResponse>("/api/v1/replay-groups/ballchasing-mirror", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function syncBallchasingGroup(groupId: string): Promise<ReplayGroupResponse> {
  return request<ReplayGroupResponse>(
    `/api/v1/replay-groups/${encodeURIComponent(groupId)}/ballchasing-sync`,
    { method: "POST" },
  );
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

export function addMatchingReplaysToGroup(
  groupId: string,
  searchParams: URLSearchParams,
): Promise<ReplayGroupReplayUpdateResponse> {
  return updateMatchingReplayGroupReplays("POST", groupId, searchParams);
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

export function removeMatchingReplaysFromGroup(
  groupId: string,
  searchParams: URLSearchParams,
): Promise<ReplayGroupReplayUpdateResponse> {
  return updateMatchingReplayGroupReplays("DELETE", groupId, searchParams);
}

function updateMatchingReplayGroupReplays(
  method: "POST" | "DELETE",
  groupId: string,
  searchParams: URLSearchParams,
): Promise<ReplayGroupReplayUpdateResponse> {
  const params = new URLSearchParams(searchParams);
  params.delete("count");
  params.delete("offset");
  return request<ReplayGroupReplayUpdateResponse>(
    `/api/v1/replay-groups/${encodeURIComponent(groupId)}/replays`,
    {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ replay_filter_query: params.toString() }),
    },
  );
}

export function listReplayGroupManagers(groupId: string): Promise<ListReplayGroupManagersResponse> {
  return request<ListReplayGroupManagersResponse>(
    `/api/v1/replay-groups/${encodeURIComponent(groupId)}/managers`,
  );
}

// Identify the invitee by email (matched case-insensitively against an existing
// user) or by user_id. The target must already have signed in at least once.
export function addReplayGroupManager(
  groupId: string,
  target: { email: string } | { user_id: string },
): Promise<ListReplayGroupManagersResponse> {
  return request<ListReplayGroupManagersResponse>(
    `/api/v1/replay-groups/${encodeURIComponent(groupId)}/managers`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(target),
    },
  );
}

export function removeReplayGroupManager(
  groupId: string,
  userId: string,
): Promise<ListReplayGroupManagersResponse> {
  return request<ListReplayGroupManagersResponse>(
    `/api/v1/replay-groups/${encodeURIComponent(groupId)}/managers/${encodeURIComponent(userId)}`,
    { method: "DELETE" },
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

// Deletes a replay and all of its derived data. Returns 204 with no body, so it
// bypasses the JSON `request` helper. Allowed for the replay's uploader or an admin.
export async function deleteReplay(replayId: string): Promise<void> {
  const token = getAccessToken();
  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const response = await fetch(`/api/v1/replays/${encodeURIComponent(replayId)}`, {
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
  );
}

export function listRecentlyProcessedReplays(
  searchParams: URLSearchParams,
): Promise<RecentlyProcessedReplaysResponse> {
  const params = new URLSearchParams(searchParams);
  if (!params.has("count")) {
    params.set("count", "100");
  }
  return request<RecentlyProcessedReplaysResponse>(
    `/api/v1/admin/replays/recently-processed?${params.toString()}`,
  );
}

export function listReplayProcessingQueue(
  searchParams: URLSearchParams,
): Promise<ReplayProcessingQueueResponse> {
  const params = new URLSearchParams(searchParams);
  if (!params.has("count")) {
    params.set("count", "200");
  }
  return request<ReplayProcessingQueueResponse>(`/api/v1/admin/replays/queue?${params.toString()}`);
}

// Admin: force-reprocess every replay that currently has a failed job in the
// queue (both retriable and retry-exhausted failures).
export function reprocessFailedQueueJobs(): Promise<ReprocessFailedQueueJobsResponse> {
  return request<ReprocessFailedQueueJobsResponse>("/api/v1/admin/replays/queue/reprocess-failed", {
    method: "POST",
  });
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

export function getReplayGroupStatAggregates(
  groupId: string,
  searchParams?: URLSearchParams,
): Promise<StatAggregateSetResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("group", groupId);
  params.set("count", "200");
  withMaterializedStatsDefault(params);
  return request<StatAggregateSetResponse>(`/api/v1/stats/aggregates?${params.toString()}`);
}

// Per-player breakdown across a replay group: one aggregate block per
// participant (in `groups[]`), the data source for the group leaderboard. Each
// block is that player's own stats restricted to the group's replays — i.e. the
// same numbers the career view shows, scoped to the group.
export function getReplayGroupPlayerAggregates(
  groupId: string,
  searchParams?: URLSearchParams,
  statTerms: readonly string[] = [],
): Promise<StatAggregateSetResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("group", groupId);
  params.set("group-by", "player");
  params.set("count", "200");
  for (const term of statTerms) {
    params.append("stat-term", term);
  }
  withMaterializedStatsDefault(params);
  return request<StatAggregateSetResponse>(`/api/v1/stats/aggregates?${params.toString()}`);
}

// Stat reads default to the materialized tables (fast). The server also defaults
// to materializing, but asserting it client-side keeps the UI fast regardless of
// the server's ROCKET_SENSE_MATERIALIZED_STAT_COUNTS setting. An explicit
// `materialized=false` (e.g. the admin live-recompute toggle) always wins.
function withMaterializedStatsDefault(params: URLSearchParams): URLSearchParams {
  if (!params.has("materialized")) {
    params.set("materialized", "true");
  }
  return params;
}

export function getPlayerStatAggregates(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
  statTerms: readonly string[] = [],
  options: {
    includeRotationHistogram?: boolean;
    groupBy?: "playlist" | null;
  } = {},
): Promise<StatAggregateSetResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  params.set("include-teammates", "true");
  params.set("count", "200");
  if (options.groupBy) {
    params.set("group-by", options.groupBy);
  }
  if (options.includeRotationHistogram != null) {
    params.set("include-rotation-histogram", String(options.includeRotationHistogram));
  }
  for (const term of statTerms) {
    params.append("stat-term", term);
  }
  withMaterializedStatsDefault(params);
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
  withMaterializedStatsDefault(params);
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
  withMaterializedStatsDefault(params);
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
  withMaterializedStatsDefault(params);
  return request<PossessionSummaryResponse>(
    `/api/v1/stats/possession/summary?${params.toString()}`,
  );
}

export function getPlayerPositioningSummary(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<PositioningSummaryResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  withMaterializedStatsDefault(params);
  return request<PositioningSummaryResponse>(
    `/api/v1/stats/positioning/summary?${params.toString()}`,
  );
}

export function getPlayerMovementSummary(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<MovementSummaryResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  withMaterializedStatsDefault(params);
  return request<MovementSummaryResponse>(`/api/v1/stats/movement/summary?${params.toString()}`);
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
  searchParams: URLSearchParams = new URLSearchParams(),
): Promise<MechanicEventsResponse> {
  const scopedParams = new URLSearchParams(searchParams);
  scopedParams.set("player-id", playerId);
  scopedParams.delete("count");
  scopedParams.delete("offset");
  const cacheKey = replayEventsKey(
    `player:${playerId}?${scopedParams.toString()}`,
    eventTypes,
    null,
  );
  const cached = getCachedReplayEvents(cacheKey);
  if (cached) return cached;

  const events: MechanicEventsResponse["events"] = [];
  let offset = 0;
  let nextOffset: number | null = 0;

  while (nextOffset != null && events.length < maxReplayEvents) {
    const params = new URLSearchParams(scopedParams);
    params.set("count", String(eventPageSize));
    params.set("offset", String(offset));
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

export function getPlayerBoostTotals(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<PlayerBoostTotalsResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  params.set("include-teammates", "true");
  withMaterializedStatsDefault(params);
  return request<PlayerBoostTotalsResponse>(`/api/v1/stats/boost-totals?${params.toString()}`);
}

export function getPlayerBoostPadControl(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<BoostPadControlResponse> {
  const params = new URLSearchParams(searchParams);
  params.set("player-id", `${platform}:${platformPlayerId}`);
  params.set("include-teammates", "true");
  return request<BoostPadControlResponse>(`/api/v1/stats/boost-pad-control?${params.toString()}`);
}

export function getPlayerProfile(
  platform: string,
  platformPlayerId: string,
  searchParams: URLSearchParams,
): Promise<PlayerProfileResponse> {
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : "";
  return request<PlayerProfileResponse>(
    `/api/v1/players/${encodeURIComponent(platform)}/id/${encodeURIComponent(platformPlayerId)}${suffix}`,
  );
}

export function getPlayerProfileByRef(
  platform: string,
  playerRef: string,
  searchParams: URLSearchParams,
): Promise<PlayerProfileResponse> {
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : "";
  return request<PlayerProfileResponse>(
    `/api/v1/players/${encodeURIComponent(platform)}/${encodeURIComponent(playerRef)}${suffix}`,
  );
}

export function getAuthOptions(): Promise<AuthOptionsResponse> {
  return request<AuthOptionsResponse>("/api/v1/auth/options");
}

export function getCurrentUser(): Promise<CurrentUserResponse> {
  return request<CurrentUserResponse>("/api/v1/me");
}

export function listLinkedIdentities(): Promise<LinkedIdentitiesResponse> {
  return request<LinkedIdentitiesResponse>("/api/v1/me/linked-identities");
}

export function getFavorites(): Promise<FavoritesResponse> {
  return request<FavoritesResponse>("/api/v1/me/favorites");
}

// The favorite mutation endpoints return 204 with no body, so they bypass the
// JSON `request` helper that always parses a response body.
async function favoriteMutation(path: string, method: "PUT" | "DELETE"): Promise<void> {
  const token = getAccessToken();
  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const response = await fetch(path, { method, headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(apiErrorMessage(body) || `${response.status} ${response.statusText}`);
  }
}

export function addFavoritePlayer(platform: string, platformPlayerId: string): Promise<void> {
  return favoriteMutation(
    `/api/v1/me/favorites/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}`,
    "PUT",
  );
}

export function removeFavoritePlayer(platform: string, platformPlayerId: string): Promise<void> {
  return favoriteMutation(
    `/api/v1/me/favorites/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}`,
    "DELETE",
  );
}

export function addFavoriteUploader(userId: string): Promise<void> {
  return favoriteMutation(`/api/v1/me/favorites/uploaders/${encodeURIComponent(userId)}`, "PUT");
}

export function removeFavoriteUploader(userId: string): Promise<void> {
  return favoriteMutation(`/api/v1/me/favorites/uploaders/${encodeURIComponent(userId)}`, "DELETE");
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

export interface ReprocessReplaysBatchResponse {
  matched_replays: number;
  enqueued_replays: number;
  skipped_replays: number;
  concurrency: number;
  force: boolean;
}

// Admin: enqueue reprocessing for a set of replays. An empty `replay_ids`
// targets every replay; pass `force` to ignore staleness checks (needed when
// the subtr-actor build changed but the schema version did not).
export function reprocessReplaysBatch(options: {
  replayIds?: string[];
  force?: boolean;
  concurrency?: number;
}): Promise<ReprocessReplaysBatchResponse> {
  return request<ReprocessReplaysBatchResponse>("/api/v1/admin/replays/reprocess", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      replay_ids: options.replayIds ?? [],
      force: options.force ?? false,
      concurrency: options.concurrency,
    }),
  });
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
  try {
    const cache = readReplayCache();
    for (const replay of replays) {
      cache[replay.id] = replay;
    }
    writeReplayCache(cache);
  } catch {
    // Browser storage is an opportunistic cache; API calls should still succeed
    // when the session quota is full or storage is unavailable.
  }
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

function writeReplayCache(cache: Record<string, ReplayResponse>): void {
  const entries = Object.entries(cache).slice(-maxCachedReplays);
  while (entries.length > 0) {
    const serialized = JSON.stringify(Object.fromEntries(entries));
    if (serialized.length <= maxReplayCacheCharacters && tryWriteReplayCache(serialized)) {
      return;
    }
    entries.splice(0, Math.max(1, Math.ceil(entries.length / 2)));
  }
  try {
    sessionStorage.removeItem(replayCacheKey);
  } catch {
    // Storage access itself may be disabled.
  }
}

function tryWriteReplayCache(serialized: string): boolean {
  try {
    sessionStorage.setItem(replayCacheKey, serialized);
    return true;
  } catch {
    return false;
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
