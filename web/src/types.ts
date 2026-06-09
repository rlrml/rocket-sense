export type ReplayStatus = "pending" | "parsing" | "parsed" | "failed";

export interface ReplayPlayer {
  name: string | null;
  platform: string | null;
  platform_player_id: string | null;
  team: number | null;
  rank_tier?: number | null;
  rank_division?: number | null;
  is_pro: boolean;
  active_time_seconds: number | null;
  time_demolished_seconds: number | null;
  non_demo_active_time_seconds: number | null;
  time_most_back_seconds: number | null;
  time_most_forward_seconds: number | null;
}

export interface ReplayResponse {
  id: string;
  file_sha256: string;
  byte_size: number;
  project_id: string | null;
  uploaded_by_user_id: string | null;
  storage_key: string;
  original_file_name: string | null;
  external_replay_id: string | null;
  playlist: string | null;
  playlist_metadata: ReplayPlaylistMetadata;
  map_code: string | null;
  replay_date: string | null;
  has_pro_player: boolean;
  players: ReplayPlayer[];
  summary: {
    team_scores: {
      blue: number | null;
      orange: number | null;
    };
    duration_seconds: number | null;
    overtime_seconds: number | null;
    match_guid: string | null;
    season: string | null;
  };
  status: ReplayStatus;
  created_at: string;
  updated_at: string;
}

export interface ReplayPlaylistMetadata {
  id: string | null;
  label: string | null;
  category: string | null;
  ruleset: string | null;
  team_size: number | null;
  ranked: boolean | null;
  casual: boolean | null;
  soccar: boolean | null;
  replay_game_type: string | null;
  header_match_type: string | null;
  game_playlist_id: number | null;
  match_type_class: string | null;
}

export interface ListReplaysResponse {
  replays: ReplayResponse[];
  count: number;
  offset: number;
  total: number;
  next_offset: number | null;
}

export interface ReplayFilterOption {
  value: string;
  label: string;
  count: number;
}

export interface ReplayFilterOptionsResponse {
  maps: ReplayFilterOption[];
  seasons: ReplayFilterOption[];
}

export interface StatAggregateResponse {
  key: string;
  display_name: string;
  category: string;
  event_count: number;
  count_per_game: number;
  per_active_minute: number | null;
  per_non_demo_active_minute: number | null;
  teammate_event_count: number;
  teammate_appearance_count: number;
  teammate_count_per_game: number | null;
  teammate_per_active_minute: number | null;
  teammate_per_non_demo_active_minute: number | null;
}

export interface StatAggregateSetResponse {
  replay_count: number;
  player_appearance_count: number | null;
  active_time_seconds: number | null;
  non_demo_active_time_seconds: number | null;
  time_most_back_seconds: number | null;
  time_most_forward_seconds: number | null;
  teammate_appearance_count: number | null;
  teammate_active_time_seconds: number | null;
  teammate_non_demo_active_time_seconds: number | null;
  teammate_time_most_back_seconds: number | null;
  teammate_time_most_forward_seconds: number | null;
  rotation_duration_bucket_seconds: number;
  rotation_duration_histogram: Array<{
    min_seconds: number;
    max_seconds: number;
    count: number;
  }>;
  stats: StatAggregateResponse[];
  groups: StatAggregateGroupResponse[];
}

export interface StatAggregateGroupResponse {
  group_by: string;
  key: string;
  display_name: string;
  replay_count: number;
  player_appearance_count: number | null;
  active_time_seconds: number | null;
  non_demo_active_time_seconds: number | null;
  time_most_back_seconds: number | null;
  time_most_forward_seconds: number | null;
  teammate_appearance_count: number | null;
  teammate_active_time_seconds: number | null;
  teammate_non_demo_active_time_seconds: number | null;
  teammate_time_most_back_seconds: number | null;
  teammate_time_most_forward_seconds: number | null;
  stats: StatAggregateResponse[];
}

export interface MechanicEventResponse {
  id: string;
  replay_id: string;
  event_type: string;
  event_type_label: string;
  event_category: string;
  mechanic: string;
  detector: string;
  player_id: string | null;
  player_name: string | null;
  team: number | null;
  start_frame: number | null;
  end_frame: number | null;
  event_frame: number | null;
  start_time: number | null;
  end_time: number | null;
  event_time: number | null;
  confidence: number | null;
  reason: string | null;
  payload: Record<string, unknown>;
  review_status: string | null;
}

export interface MechanicEventsResponse {
  events: MechanicEventResponse[];
  count: number;
  offset: number;
  next_offset: number | null;
}

export interface EventTypeResponse {
  key: string;
  display_name: string;
  category: string;
  description: string | null;
}

export interface EventTypesResponse {
  event_types: EventTypeResponse[];
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in_seconds: number | null;
}

export interface AuthProviderResponse {
  id: string;
  label: string;
  configured: boolean;
  start_url: string;
}

export interface AuthOptionsResponse {
  mode: "dev" | "oauth";
  providers: AuthProviderResponse[];
  login_url: string;
}

export interface PlayerProfileResponse {
  platform: string;
  platform_player_id: string;
  display_name: string | null;
  names: Array<{
    name: string;
    replay_count: number;
    latest_seen_at: string | null;
  }>;
  replay_count: number;
  first_seen_at: string | null;
  last_seen_at: string | null;
  is_pro: boolean;
  latest_replays: PlayerProfileReplayResponse[];
}

export interface PlayerProfileReplayResponse {
  id: string;
  original_file_name: string | null;
  replay_date: string | null;
  created_at: string;
  team_scores: {
    blue: number | null;
    orange: number | null;
  };
}
