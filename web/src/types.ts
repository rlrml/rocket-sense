export type ReplayStatus = "pending" | "processing" | "processed" | "failed";
export type ReplayProcessingStatus = ReplayStatus;

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
  processing_version: ReplayProcessingVersion;
  staleness: ReplayStaleness;
  status: ReplayStatus;
  created_at: string;
  updated_at: string;
}

export interface ReplayProcessingVersion {
  processed_at: string | null;
  extractor_name: string | null;
  extractor_version: string | null;
  event_stream_schema_version: string | null;
  rocket_sense_git_sha: string | null;
  subtr_actor_version: string | null;
  subtr_actor_git_sha: string | null;
}

export interface ReplayStaleness {
  is_stale: boolean;
  schema_outdated: boolean;
  subtr_actor_outdated: boolean;
  current_event_stream_schema_version: string;
  current_subtr_actor_version: string;
}

export interface ProcessingVersionResponse {
  event_stream_schema_version: string;
  extractor_name: string;
  extractor_version: string;
  subtr_actor_version: string;
  subtr_actor_git_sha: string | null;
  rocket_sense_git_sha: string | null;
  schema_changelog: Array<{ version: string; note: string }>;
}

export interface ProcessingVersionBreakdownRow {
  event_stream_schema_version: string | null;
  subtr_actor_version: string | null;
  subtr_actor_git_sha: string | null;
  replay_count: number;
  is_current: boolean;
}

export interface ProcessingVersionBreakdownResponse {
  current_event_stream_schema_version: string;
  current_subtr_actor_version: string;
  total_replays: number;
  current_replays: number;
  stale_replays: number;
  rows: ProcessingVersionBreakdownRow[];
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

export interface ReplayProcessingDiagnosticsResponse {
  replays: ReplayProcessingDiagnostic[];
  summary: ReplayProcessingDiagnosticsSummary;
  count: number;
  offset: number;
  total: number;
  next_offset: number | null;
}

export interface ReplayProcessingDiagnosticsSummary {
  total_replays: number;
  problem_replays: number;
  status_counts: Array<{
    status: string;
    count: number;
  }>;
  queue_counts: Array<{
    status: string;
    count: number;
  }>;
  workers: ReplayProcessingWorker[];
}

export interface ReplayProcessingWorker {
  id: string;
  last_seen: string;
  alive: boolean;
  active_jobs: number;
}

export interface ReplayProcessingDiagnostic {
  replay_id: string;
  original_file_name: string | null;
  file_sha256: string;
  processing_status: ReplayProcessingStatus;
  created_at: string;
  updated_at: string;
  canonical_analysis_run_id: string | null;
  canonical_analysis_run: AnalysisRunDiagnostic | null;
  latest_analysis_run: AnalysisRunDiagnostic | null;
  canonical_event_count: number;
  needs_reanalysis: boolean;
  needs_reindex: boolean;
  stale_reasons: string[];
  queued_jobs: number;
  running_jobs: number;
  failed_jobs: number;
  finished_jobs: number;
  next_queue_run_at: string | null;
  last_queue_started_at: string | null;
  last_queue_done_at: string | null;
  last_queue_error: string | null;
  reasons: string[];
}

export interface AnalysisRunDiagnostic {
  id: string;
  status: string;
  extractor_name: string;
  extractor_version: string;
  event_stream_schema_version: string | null;
  event_stream_object_key: string | null;
  started_at: string;
  finished_at: string | null;
  error_message: string | null;
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
  teammate_rotation_duration_histogram: Array<{
    min_seconds: number;
    max_seconds: number;
    count: number;
  }> | null;
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

export interface GoalTagAggregateResponse {
  kind: string;
  display_name: string;
  count: number;
  share_of_goals: number | null;
  avg_confidence: number | null;
}

export interface RotationTimeShareResponse {
  key: string;
  display_name: string;
  seconds: number;
  span_count: number;
}

export interface PlayerStatOverviewResponse {
  replay_count: number;
  goals_scored: number;
  goal_tags: GoalTagAggregateResponse[];
  rotation_roles: RotationTimeShareResponse[];
  rotation_depths: RotationTimeShareResponse[];
}

export interface EventStatMetricResponse {
  key: string;
  label: string;
  value: number | null;
  kind: string;
}

export interface EventStatDimensionValueResponse {
  key: string | null;
  display_name: string;
  count: number;
}

export interface EventStatDimensionResponse {
  key: string;
  label: string;
  values: EventStatDimensionValueResponse[];
}

export interface EventStatSampleResponse {
  replay_id: string;
  event_id: string;
  replay_player_id: string | null;
  player_subject_id: string | null;
  event_time: number | null;
  role: string | null;
  team: number | null;
  fields: Record<string, unknown>;
}

export interface EventStatSummaryResponse {
  family: string;
  replay_count: number;
  event_count: number;
  row_count: number;
  metrics: EventStatMetricResponse[];
  dimensions: EventStatDimensionResponse[];
  samples: EventStatSampleResponse[];
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

export interface CurrentUserResponse {
  id: string;
  email: string;
  provider_name: string;
  is_admin: boolean;
}

export interface ReprocessReplayResponse {
  replay_id: string;
  enqueued: boolean;
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

export interface BoostTrackPoint {
  frame: number;
  time: number | null;
  value: number;
}

export interface BoostTrack {
  player_id: string | null;
  is_team_0: boolean;
  // subtr-actor AccumulationQuantity (snake_case): "boost_amount", "boost_used",
  // "boost_used_grounded", "boost_used_airborne", "boost_used_supersonic",
  // "boost_collected", "boost_stolen", "boost_overfill".
  quantity: string;
  points: BoostTrackPoint[];
}

export interface BoostTracksResponse {
  tracks: BoostTrack[];
}
