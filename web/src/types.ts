export type ReplayStatus = "pending" | "processing" | "processed" | "failed";
export type ReplayProcessingStatus = ReplayStatus;

export interface ReplayPlayer {
  name: string | null;
  platform: string | null;
  platform_player_id: string | null;
  team: number | null;
  appearance_count?: number;
  color_switching?: boolean;
  rank_tier?: number | null;
  rank_division?: number | null;
  rank_mmr?: number | null;
  rank_is_fallback?: boolean;
  rank_fallback_replay_date?: string | null;
  is_pro: boolean;
  score?: number | null;
  goals?: number | null;
  assists?: number | null;
  saves?: number | null;
  shots?: number | null;
  active_time_seconds: number | null;
  time_demolished_seconds: number | null;
  non_demo_active_time_seconds: number | null;
  time_most_back_seconds: number | null;
  time_most_forward_seconds: number | null;
}

export interface ReplayUploaderResponse {
  id: string;
  primary_email: string | null;
  display_name: string | null;
  /** Auth provider the uploader signed in with (e.g. "steam", "epic", "google"). */
  provider: string | null;
}

export interface UserGameIdentity {
  platform: string;
  platform_player_id: string;
  display_name: string | null;
  appearance_count: number;
  /** How the link was established: "login" (auto from OAuth subject) or "claim". */
  source: string;
}

export interface UserProfileResponse {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  upload_count: number;
  game_identities: UserGameIdentity[];
}

export type Visibility = "public" | "unlisted" | "private";

export interface ShareResponse {
  user_id: string;
  email: string | null;
  display_name: string | null;
  added_by_user_id: string | null;
  created_at: string;
}

export interface ListSharesResponse {
  shares: ShareResponse[];
}

export interface ReplayResponse {
  id: string;
  file_sha256: string;
  byte_size: number;
  project_id: string | null;
  uploaded_by_user_id: string | null;
  uploaded_by: ReplayUploaderResponse | null;
  storage_key: string;
  original_file_name: string | null;
  external_replay_id: string | null;
  playlist: string | null;
  playlist_metadata: ReplayPlaylistMetadata;
  map_code: string | null;
  replay_date: string | null;
  has_pro_player: boolean;
  exclude_from_aggregates: boolean;
  aggregate_exclusion_reason: string | null;
  players: ReplayPlayer[];
  summary: {
    team_scores: {
      blue: number | null;
      orange: number | null;
    };
    duration_seconds: number | null;
    active_seconds: number | null;
    overtime_seconds: number | null;
    match_guid: string | null;
    season: string | null;
  };
  processing_version: ReplayProcessingVersion;
  staleness: ReplayStaleness;
  status: ReplayStatus;
  visibility: Visibility;
  viewer_can_manage: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReplayGroupResponse {
  id: string;
  project_id: string | null;
  parent_group_id: string | null;
  name: string;
  description: string | null;
  created_by_user_id: string | null;
  replay_count: number;
  total_replay_count: number;
  child_group_count: number;
  ballchasing_group_id: string | null;
  ballchasing_synced_at: string | null;
  ballchasing_sync_status: string | null;
  ballchasing_sync_error: string | null;
  visibility: Visibility;
  viewer_can_manage: boolean;
  created_at: string;
  updated_at: string;
}

export interface ListReplayGroupsResponse {
  groups: ReplayGroupResponse[];
}

export interface ReplayGroupReplayUpdateResponse {
  group: ReplayGroupResponse;
  matched_replays: number;
  changed_replays: number;
}

export interface ReplayGroupManagerResponse {
  user_id: string;
  email: string | null;
  display_name: string | null;
  is_creator: boolean;
  added_by_user_id: string | null;
  created_at: string;
}

export interface ListReplayGroupManagersResponse {
  managers: ReplayGroupManagerResponse[];
}

export interface UploadsLeaderboardRow {
  rank: number;
  user_id: string;
  display_name: string | null;
  upload_count: number;
}

export interface UploadsLeaderboardResponse {
  rows: UploadsLeaderboardRow[];
  count: number;
  offset: number;
  total: number;
  next_offset: number | null;
}

export interface AppearancesLeaderboardRow {
  rank: number;
  platform: string;
  platform_player_id: string;
  display_name: string | null;
  is_pro: boolean;
  estimated_rank_tier?: number | null;
  estimated_rank_division?: number | null;
  estimated_rank_mmr?: number | null;
  appearance_count: number;
}

export interface AppearancesLeaderboardResponse {
  rows: AppearancesLeaderboardRow[];
  count: number;
  offset: number;
  total: number;
  next_offset: number | null;
}

export interface EventLeaderboardEventType {
  key: string;
  display_name: string;
  category: string;
}

export interface EventLeaderboardRow {
  rank: number;
  platform: string;
  platform_player_id: string;
  display_name: string | null;
  is_pro: boolean;
  estimated_rank_tier?: number | null;
  estimated_rank_division?: number | null;
  estimated_rank_mmr?: number | null;
  event_count: number;
  replay_count: number;
  active_time_seconds: number | null;
  count_per_game: number | null;
  per_active_minute: number | null;
}

export interface EventLeaderboardResponse {
  rows: EventLeaderboardRow[];
  count: number;
  offset: number;
  total: number;
  next_offset: number | null;
  matched_event_types: EventLeaderboardEventType[];
}

export interface StatLeaderboardMetric {
  key: string;
  display_name: string;
  description: string;
  unit: string;
}

export interface StatLeaderboardRow {
  rank: number;
  platform: string;
  platform_player_id: string;
  display_name: string | null;
  is_pro: boolean;
  estimated_rank_tier?: number | null;
  estimated_rank_division?: number | null;
  estimated_rank_mmr?: number | null;
  value: number;
  replay_count: number;
  active_time_seconds: number | null;
  sample_count: number | null;
  value_per_game: number | null;
  value_per_active_minute: number | null;
  share_of_active_time: number | null;
}

export interface StatLeaderboardResponse {
  rows: StatLeaderboardRow[];
  count: number;
  offset: number;
  total: number;
  next_offset: number | null;
  metric: StatLeaderboardMetric;
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
  current_subtr_actor_git_sha: string | null;
  current_rocket_sense_git_sha: string | null;
}

export interface ProcessingVersionResponse {
  event_stream_schema_version: string;
  extractor_name: string;
  extractor_version: string;
  subtr_actor_version: string;
  subtr_actor_git_sha: string | null;
  subtr_actor_git_commit_timestamp: string | null;
  rocket_sense_git_sha: string | null;
  rocket_sense_git_commit_timestamp: string | null;
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

export interface ReplayGroupResponse {
  id: string;
  project_id: string | null;
  parent_group_id: string | null;
  name: string;
  description: string | null;
  created_by_user_id: string | null;
  replay_count: number;
  total_replay_count: number;
  child_group_count: number;
  ballchasing_group_id: string | null;
  ballchasing_synced_at: string | null;
  ballchasing_sync_status: string | null;
  ballchasing_sync_error: string | null;
  visibility: Visibility;
  viewer_can_manage: boolean;
  created_at: string;
  updated_at: string;
}

export interface ListReplayGroupsResponse {
  groups: ReplayGroupResponse[];
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
  currently_failed_replays: number;
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

export interface RecentlyProcessedReplaysResponse {
  replays: RecentlyProcessedReplay[];
  count: number;
  offset: number;
  next_offset: number | null;
}

export interface RecentlyProcessedReplay {
  replay_id: string;
  original_file_name: string | null;
  processing_status: ReplayProcessingStatus;
  created_at: string;
  updated_at: string;
  canonical_run_id: string | null;
  canonical_run_status: string | null;
  extractor_name: string | null;
  extractor_version: string | null;
  /** When the canonical analysis run finished — i.e. when the replay became processed. */
  processed_at: string | null;
  event_count: number;
}

export interface ReplayProcessingQueueResponse {
  jobs: ReplayProcessingQueueJob[];
  count: number;
  offset: number;
  total: number;
  next_offset: number | null;
}

export interface ReplayProcessingQueueJob {
  job_id: string;
  replay_id: string;
  original_file_name: string | null;
  force: boolean;
  status: string;
  /** Failed job that has exhausted its retries; apalis will never rerun it on its own. */
  terminal: boolean;
  attempts: number;
  max_attempts: number;
  priority: number;
  run_at: string;
  lock_by: string | null;
  lock_at: string | null;
  done_at: string | null;
  last_result: string | null;
}

export interface ReprocessFailedQueueJobsResponse {
  failed_replays: number;
  enqueued_replays: number;
  skipped_replays: number;
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
  opponent_event_count: number;
  opponent_appearance_count: number;
  opponent_count_per_game: number | null;
  opponent_per_active_minute: number | null;
  opponent_per_non_demo_active_minute: number | null;
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
  opponent_appearance_count: number | null;
  opponent_active_time_seconds: number | null;
  opponent_non_demo_active_time_seconds: number | null;
  opponent_time_most_back_seconds: number | null;
  opponent_time_most_forward_seconds: number | null;
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
  opponent_rotation_duration_histogram: Array<{
    min_seconds: number;
    max_seconds: number;
    count: number;
  }> | null;
  touch_breakdown: TouchAggregateBreakdownResponse | null;
  stats: StatAggregateResponse[];
  groups: StatAggregateGroupResponse[];
  /**
   * Present only when a `group-by=player` set had more distinct players than the
   * per-request cap: `groups` holds the top `limit` (by replay count) of `total`.
   */
  groups_truncated?: GroupTruncation | null;
}

export interface GroupTruncation {
  limit: number;
  total: number;
}

export interface TouchAggregateBreakdownResponse {
  cohorts: TouchAggregateCohortResponse[];
}

export interface TouchAggregateCohortResponse {
  key: string;
  label: string;
  total_touch_count: number;
  total_advance_distance: number;
  active_time_seconds: number | null;
  dimensions: TouchAggregateDimensionResponse[];
}

export interface TouchAggregateDimensionResponse {
  key: string;
  values: TouchAggregateValueResponse[];
}

export interface TouchAggregateValueResponse {
  key: string;
  touch_count: number;
  advance_distance: number;
}

export interface StatAggregateGroupPlayer {
  platform: string;
  platform_player_id: string;
  display_name: string | null;
}

export interface StatAggregateGroupResponse {
  group_by: string;
  key: string;
  display_name: string;
  /** Present only for `group-by=player` rows; identifies the ranked player. */
  player?: StatAggregateGroupPlayer | null;
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
  opponent_appearance_count: number | null;
  opponent_active_time_seconds: number | null;
  opponent_non_demo_active_time_seconds: number | null;
  opponent_time_most_back_seconds: number | null;
  opponent_time_most_forward_seconds: number | null;
  /** Replays the player's team won / lost (score-decided; ties are neither).
   * Present only on `group-by=player` rows; backs the `win_rate` derived metric. */
  win_count?: number;
  loss_count?: number;
  stats: StatAggregateResponse[];
}

export interface GoalTagAggregateResponse {
  kind: string;
  display_name: string;
  count: number;
  share_of_goals: number | null;
  per_active_minute: number | null;
  teammate_count: number;
  teammate_per_active_minute: number | null;
  opponent_count: number;
  opponent_per_active_minute: number | null;
  avg_confidence: number | null;
}

export interface RotationTimeShareResponse {
  key: string;
  display_name: string;
  seconds: number;
  span_count: number;
}

export interface ScoringRateResponse {
  count: number;
  per_active_minute: number | null;
  teammate_count: number;
  teammate_per_active_minute: number | null;
  opponent_count: number;
  opponent_per_active_minute: number | null;
}

export interface MvpSummaryResponse {
  /** Replays in which the player was MVP (top score on the winning team). */
  count: number;
  /** MVPs per game = count / replay_count, as a fraction (null when no games). */
  rate: number | null;
  /** Expected MVP rate if winning teammates were interchangeable scorers. */
  fair_share_rate: number | null;
}

export interface PlayerStatOverviewResponse {
  replay_count: number;
  goals_scored: number;
  /** Team size shared by every replay in the set (2 = doubles), or null when mixed. */
  team_size?: number | null;
  mvp?: MvpSummaryResponse;
  score: ScoringRateResponse;
  goals: ScoringRateResponse;
  assists: ScoringRateResponse;
  shots?: ScoringRateResponse;
  saves?: ScoringRateResponse;
  goal_tags: GoalTagAggregateResponse[];
  rotation_roles: RotationTimeShareResponse[];
  rotation_depths: RotationTimeShareResponse[];
}

export interface PlayerTimelinePoint {
  replay_id: string;
  /** RFC3339 played-at timestamp (replays without one are excluded). */
  replay_date: string;
  /** Canonical playlist group key (e.g. "ranked-2v2"), when derivable. */
  playlist_group: string | null;
  season: string | null;
  rank_tier: number | null;
  rank_division: number | null;
  rank_mmr: number | null;
  /** Rank was carried forward from an earlier submission, not this replay's. */
  rank_is_fallback: boolean;
  /** "win" | "loss", or null for ties and replays missing scores/team. */
  outcome: string | null;
  /** Index into PlayerTimelineResponse.sessions, 0-based oldest first. */
  session_index: number;
}

export interface PlayerTimelineSession {
  session_index: number;
  /** replay_date of the session's first game (game start). */
  start: string;
  /** replay_date of the session's last game (that game's start, not end). */
  end: string;
  replay_count: number;
  wins: number;
  losses: number;
  start_mmr: number | null;
  end_mmr: number | null;
}

export interface PlayerTimelineResponse {
  points: PlayerTimelinePoint[];
  sessions: PlayerTimelineSession[];
  session_gap_minutes: number;
  /** True when `limit` clipped older replays. */
  truncated: boolean;
  /** The season code `season=current` resolved to, when requested. */
  resolved_season: string | null;
}

export interface EventStatMetricResponse {
  key: string;
  label: string;
  value: number | null;
  kind: string;
}

export interface MovementSummaryResponse {
  replay_count: number;
  player: MovementCohortSummary;
  teammates: MovementCohortSummary | null;
  opponents: MovementCohortSummary | null;
}

export interface MovementCohortSummary {
  appearance_count: number;
  active_seconds: number;
  total_distance: number;
  speed_weighted: number;
  speed_weight: number;
  slow_seconds: number;
  boost_seconds: number;
  supersonic_seconds: number;
  ground_seconds: number;
  low_air_seconds: number;
  high_air_seconds: number;
  powerslide_count: number;
  powerslide_seconds: number;
  speed_flips: number;
  wavedashes: number;
  half_flips: number;
}

export interface ReplayPlayerMovementSummary {
  platform: string | null;
  platform_player_id: string | null;
  summary: MovementCohortSummary;
}

export interface ReplayPlayerPositioningSummary {
  platform: string | null;
  platform_player_id: string | null;
  summary: PositioningCohortSummary;
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

export interface PossessionSummaryResponse {
  replay_count: number;
  possessions: PossessionSpanSummary;
  controlled_plays: PossessionSpanSummary;
  teammates: PossessionTeammateComparison | null;
  cohorts: PossessionCohortSummary[];
  touches: PossessionTouchSummary;
  locations: PossessionLocationSummary;
  // Team-level control oriented to the player's team, over the same filtered
  // replay set as the rest of the summary (so the global win/loss outcome
  // control applies). Only present when the summary targets a single player.
  team: PossessionTeamControl | null;
}

export interface PossessionTeamControl {
  // Strict "control": firmly-controlled ball time only (loose tails -> neutral).
  possession: PossessionTeamMetric;
  // Loose possession: last team to touch owns it until the opponent takes it
  // away (sticky through loose balls, passes, repelled 50-50s).
  loose_possession: PossessionTeamMetric;
  ball_halves: PossessionTeamMetric;
  ball_thirds: PossessionTeamMetric;
}

export interface PossessionTeamMetric {
  total_duration_seconds: number;
  buckets: PossessionTimeBucket[];
}

export interface PossessionTeammateComparison {
  appearance_count: number;
  controlled_plays: PossessionSpanSummary;
}

export interface PossessionCohortSummary {
  key: string;
  label: string;
  appearance_count: number;
  active_time_seconds: number | null;
  possessions: PossessionSpanSummary;
  controlled_plays: PossessionSpanSummary;
  touches: PossessionTouchSummary;
  locations: PossessionLocationSummary;
}

export interface PossessionSpanSummary {
  possession_count: number;
  total_duration_seconds: number;
  avg_duration_seconds: number | null;
  total_touch_count: number;
  avg_touches_per_possession: number | null;
  total_advance_distance: number;
  total_retreat_distance: number;
  avg_advance_distance: number | null;
  avg_retreat_distance: number | null;
  carry_time_seconds: number;
  air_dribble_time_seconds: number;
  carry_time_share: number | null;
  air_dribble_time_share: number | null;
  sustained_control_share: number | null;
  with_carry_share: number | null;
  with_air_dribble_share: number | null;
  with_aerial_touch_share: number | null;
  with_wall_touch_share: number | null;
  duration_histogram: PossessionDurationBucket[];
}

export interface PossessionDurationBucket {
  key: string;
  label: string;
  count: number;
}

export interface PossessionLocationSummary {
  total_duration_seconds: number;
  halves: PossessionTimeBucket[];
  thirds: PossessionTimeBucket[];
}

export interface PossessionTimeBucket {
  key: string;
  label: string;
  duration_seconds: number;
  share: number | null;
}

export interface PossessionTouchSummary {
  classified_touch_count: number;
  first_touch_count: number;
  first_touch_control_count: number;
  first_touch_control_share: number | null;
  contested_touch_count: number;
  first_touch_intentions: PossessionMixValue[];
  intentions: PossessionMixValue[];
  surfaces: PossessionMixValue[];
}

export interface PossessionMixValue {
  key: string | null;
  display_name: string;
  count: number;
}

// Career positioning summary over a replay set, split into the player's own
// spans plus the pooled teammate and opponent cohorts that shared those games.
// Mirrors the positioning facets the single-game positioning tab renders so the
// same graph code can compare player vs teammates vs opponents.
export interface PositioningSummaryResponse {
  replay_count: number;
  player: PositioningCohortSummary;
  teammates: PositioningCohortSummary | null;
  opponents: PositioningCohortSummary | null;
  teammate_role_delta_histogram: PositioningRoleDeltaHistogram;
}

export interface PositioningRoleDeltaHistogram {
  /** Target-player 2v2 game samples included in this histogram. */
  sample_count: number;
  /** Bucket width in percentage points for non-tail buckets. */
  bucket_width_pp: number;
  buckets: PositioningRoleDeltaBucket[];
}

export type PositioningRoleDeltaDirection = "back" | "neutral" | "forward";

export interface PositioningRoleDeltaBucket {
  key: string;
  label: string;
  full_label: string;
  direction: PositioningRoleDeltaDirection;
  lower_pp: number | null;
  upper_pp: number | null;
  count: number;
}

export interface PositioningCohortSummary {
  /** Player-game appearances pooled into this cohort. */
  appearance_count: number;
  active_seconds: number;
  tracked_seconds: number;
  defensive_third_seconds: number;
  neutral_third_seconds: number;
  offensive_third_seconds: number;
  defensive_half_seconds: number;
  offensive_half_seconds: number;
  behind_ball_seconds: number;
  level_with_ball_seconds: number;
  ahead_of_ball_seconds: number;
  role_most_back_seconds: number;
  role_mid_seconds: number;
  role_most_forward_seconds: number;
  role_other_seconds: number;
  role_no_teammates_seconds: number;
  closest_team_seconds: number;
  closest_absolute_seconds: number;
  farthest_seconds: number;
  distance_to_ball_weighted: number;
  distance_to_ball_weight: number;
  distance_to_teammates_weighted: number;
  distance_to_teammates_weight: number;
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
  /** Distinct free-form user tags applied to this event (see event_tags). */
  tags?: string[];
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
  email: string | null;
  display_name: string;
  provider_name: string;
  is_admin: boolean;
  default_replay_visibility: Visibility;
  default_group_visibility: Visibility;
}

export interface AdminUserResponse {
  id: string;
  primary_email: string | null;
  display_name: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminUsersResponse {
  users: AdminUserResponse[];
}

export interface LinkedIdentityResponse {
  provider_name: string;
  provider_subject: string;
  email: string | null;
  created_at: string;
}

export interface LinkedIdentitiesResponse {
  identities: LinkedIdentityResponse[];
}

export interface FavoritePlayerResponse {
  platform: string;
  platform_player_id: string;
  display_name: string | null;
  appearance_count: number;
  favorited_at: string;
}

export interface FavoriteUploaderResponse {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  upload_count: number;
  favorited_at: string;
}

export interface FavoritesResponse {
  players: FavoritePlayerResponse[];
  uploaders: FavoriteUploaderResponse[];
}

export interface ReprocessReplayResponse {
  replay_id: string;
  enqueued: boolean;
  forced: boolean;
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
  public_display_name: string | null;
  current_display_name: string | null;
  names: Array<{
    name: string;
    replay_count: number;
    first_seen_at: string | null;
    latest_seen_at: string | null;
  }>;
  replay_count: number;
  first_seen_at: string | null;
  last_seen_at: string | null;
  is_pro: boolean;
  tags: PlayerIdentityTag[];
  latest_replays: PlayerProfileReplayResponse[];
  visibility: Visibility;
  viewer_can_manage: boolean;
}

export interface PlayerIdentityTag {
  tag: string;
  exclude_from_aggregates: boolean;
  note: string | null;
  created_by_user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlayerIdentityReport {
  id: string;
  platform: string;
  platform_player_id: string;
  report_type: string;
  reported_by_user_id: string | null;
  note: string | null;
  status: "pending" | "accepted" | "dismissed";
  reviewed_by_user_id: string | null;
  review_note: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlayerReportsResponse {
  reports: PlayerIdentityReport[];
  count: number;
  offset: number;
  total: number;
  next_offset: number | null;
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

// Per-player boost totals aggregated across every replay in a group, derived
// from the boost accumulation tracks (not discrete events). Band seconds
// (time_*) partition tracked_seconds; the web layer recombines them into the
// stat-table and level-distribution bands. See get_replay_group_boost_totals.
export interface GroupBoostTotal {
  player_id: string;
  is_team_0: boolean;
  boost_used: number;
  boost_used_supersonic: number;
  boost_amount_weighted_sum: number;
  tracked_seconds: number;
  time_empty: number;
  time_low: number;
  time_medium: number;
  time_high: number;
  time_full: number;
  time_over: number;
}

export interface GroupBoostTotalsResponse {
  totals: GroupBoostTotal[];
  duration_seconds: number;
}

export interface PlayerBoostTotal {
  boost_collected: number;
  boost_collected_big: number;
  boost_collected_small: number;
  boost_collected_grant: number;
  boost_collected_unknown: number;
  boost_stolen: number;
  boost_stolen_big: number;
  boost_stolen_small: number;
  boost_overfill: number;
  boost_used: number;
  boost_used_supersonic: number;
  boost_stolen_overfill: number;
  big_pads: number;
  big_pads_offensive: number;
  big_pads_neutral: number;
  big_pads_defensive: number;
  small_pads: number;
  small_pads_offensive: number;
  small_pads_defensive: number;
  stolen_big_pads: number;
  stolen_small_pads: number;
  stolen_pads: number;
  boost_amount_weighted_sum: number;
  tracked_seconds: number;
  time_empty: number;
  time_low: number;
  time_medium: number;
  time_high: number;
  time_full: number;
  time_over: number;
}

export interface PlayerBoostTotalsResponse {
  player: PlayerBoostTotal;
  teammates: PlayerBoostTotal | null;
  opponents: PlayerBoostTotal | null;
}

export interface BoostPadControlPoint {
  pad_id: string;
  x: number;
  y: number;
  pad_size: "big" | "small";
  player_count: number;
  teammate_count: number;
  opponent_count: number;
}

export interface BoostPadControlResponse {
  points: BoostPadControlPoint[];
}

export interface RankTrendRank {
  rank_value: number;
  label: string;
  distinct_player_count: number | null;
}

export interface RankTrendMetric {
  key: string;
  label: string;
  category: string;
  // "median" (typical player) or "mean" (pooled, for rare metrics).
  aggregator: string;
  // Aligned to RankTrendsResponse.ranks order.
  values: Array<number | null>;
}

// The server build that ran a window's aggregation (which build materialized
// the benchmark) -- distinct from the source-replay provenance below.
export interface ProcessingSnapshot {
  subtr_actor_version: string | null;
  subtr_actor_git_sha: string | null;
  rocket_sense_git_sha: string | null;
  event_stream_schema_version: string | null;
}

// One (subtr-actor version, rocket-sense sha) cohort among the replays feeding a
// window. versions[0] is the dominant one.
export interface SourceVersionShare {
  subtr_actor_version: string | null;
  subtr_actor_git_sha: string | null;
  rocket_sense_git_sha: string | null;
  event_stream_schema_version: string | null;
  replay_count: number;
}

// Provenance of the data behind a window: what versions actually processed the
// replays that fed the benchmark. Reveals whether the trends reflect the latest
// subtr-actor or stale, un-reprocessed data.
export interface SourceVersionSummary {
  total_replay_count: number;
  versions: SourceVersionShare[];
}

export interface RankTrendsWindow {
  key: string;
  label: string;
  // When this window was last materialized (ISO 8601). Null for windows
  // materialized before provenance tracking was added.
  computed_at: string | null;
  computed_with: ProcessingSnapshot | null;
  source_versions: SourceVersionSummary | null;
}

export interface RankTrendsResponse {
  playlist_group_key: string | null;
  window: RankTrendsWindow | null;
  outcome: string;
  rank_grouping: string;
  ranks: RankTrendRank[];
  metrics: RankTrendMetric[];
  available_playlist_groups: string[];
  available_windows: RankTrendsWindow[];
}

// Career-stats "rank average" comparison cohorts. The benchmark value for a
// stat is looked up by its metric_key in `RankBenchmarkCohort.per_stat`; the
// value is in the metric's natural units (per-active-minute rate, 0..1 share,
// or raw average) — see web/src/stats/metricFormats.ts for scaling/formatting.
export interface RankBenchmarkWindowOption {
  key: string;
  label: string;
}

export interface RankBenchmarkRankOption {
  rank_value: number;
  label: string;
  distinct_player_count: number | null;
}

export interface RankBenchmarkCohortStat {
  value: number | null;
  // "median" (typical player) or "mean" (pooled, for rare metrics).
  aggregator: string;
}

export interface RankBenchmarkCohort {
  rank_value: number;
  label: string;
  rank_grouping: string;
  // True when this cohort is the server-resolved current-rank estimate.
  is_player_default: boolean;
  distinct_player_count: number | null;
  per_stat: Record<string, RankBenchmarkCohortStat>;
  // Team-level benchmarks: rates per team-active-MINUTE with the whole roster
  // pooled (additive metrics are roster sums; share/gauge metrics are
  // time-weighted roster means). Includes the synthetic key
  // "meta:game_seconds" (average team-game duration in seconds), which
  // converts a per-minute rate into a per-game total. Optional so the page
  // keeps working against servers that predate the field — treat missing as
  // an empty map.
  team_per_stat?: Record<string, RankBenchmarkCohortStat>;
}

export interface RankBenchmarkCohortsResponse {
  rank_grouping: string;
  window: string | null;
  window_label: string | null;
  playlist_group_key: string | null;
  default_rank_value: number | null;
  available_ranks: RankBenchmarkRankOption[];
  available_windows: RankBenchmarkWindowOption[];
  cohorts: RankBenchmarkCohort[];
}

// One game's outcome from the target player's perspective, returned by
// GET /api/v1/stats/game-outcomes. All Outcomes-page distributions (win rate,
// margin histogram, scoreline heatmap, goal-count histograms) are derived from
// these rows client-side.
export interface GameOutcomeRow {
  replay_id: string;
  replay_date: string | null;
  playlist: string | null;
  // Team index (0 or 1) the target player was on.
  player_team: number;
  team_score: number;
  opponent_score: number;
  player_goals: number;
  // Team goals not credited to the player (clamped at zero server-side).
  teammate_goals: number;
  // Individual scoreboard goals for each teammate appearance in the game.
  teammate_goal_counts: number[];
  // Individual scoreboard goals for each opponent appearance in the game.
  opponent_goal_counts: number[];
  // true = win, false = loss, null = tie (rare; e.g. disconnects).
  won: boolean | null;
}

export interface GameOutcomesResponse {
  games: GameOutcomeRow[];
  count: number;
  offset: number;
  total_count: number;
  next_offset: number | null;
}

// --- Review campaigns -------------------------------------------------------

export type ReviewCampaignStatus = "draft" | "active" | "complete" | "archived";

export interface ReviewCampaignDecisionOption {
  key: string;
  status?: string;
  label?: string;
}

export interface ReviewCampaignSummary {
  id: string;
  slug: string;
  title: string;
  question: string;
  status: ReviewCampaignStatus;
  item_count: number;
  label_count: number;
  distinct_labeled_items: number;
  // 0 when the viewer is anonymous.
  my_labeled_count: number;
  created_at: string;
}

export interface ReviewCampaignListResponse {
  count: number;
  campaigns: ReviewCampaignSummary[];
}

export interface ReviewCampaignDetailResponse extends ReviewCampaignSummary {
  description: string | null;
  decision_vocabulary: ReviewCampaignDecisionOption[];
  generator: Record<string, unknown>;
  labels_per_item: number;
}

export interface ReviewCampaignImportSkip {
  candidate: string;
  reason: string;
}

export interface CreateReviewCampaignResponse {
  id: string;
  slug: string;
  imported: number;
  skipped: ReviewCampaignImportSkip[];
}

// --- Mistake detection (native processing + client reprocess WASM) ----------

/** One detected mistake marker persisted by processing or returned by WASM. */
export interface MistakeMarker {
  kind: string;
  time: number;
  t_start: number;
  t_end: number;
  player_idx: number;
  player: string;
  with_player?: string;
  severity: number;
  /** The reranker model's keep probability when the kind has a model,
   * otherwise equal to severity (the heuristic path). */
  score: number;
  /** The model's keep threshold that gated this marker; absent on the
   * heuristic path. */
  model_keep_threshold?: number;
  features: number[];
  features_version: number;
  evidence?: Record<string, unknown>;
}

export interface MistakeDetectResponse {
  detector_version: string;
  features_version: number;
  focus_player_idx: number;
  focus_player_key: string;
  focus_player_name: string;
  /** Kinds gated by a reranker model in this run (0 = pure heuristics). */
  model_count: number;
  markers: MistakeMarker[];
}

export type MistakeReviewStatus =
  | "confirmed"
  | "rejected"
  | "corrected"
  | "uncertain"
  | "needs_second_review";

export interface CreateMistakeReviewRequest {
  kind: string;
  player_key: string;
  player_name?: string;
  time: number;
  t_start: number;
  t_end: number;
  event_frame?: number | null;
  start_frame?: number | null;
  end_frame?: number | null;
  severity: number;
  features: number[];
  features_version?: number;
  evidence?: Record<string, unknown>;
  detector_version?: string;
  status: MistakeReviewStatus;
  notes?: string;
  corrected_kind?: string;
}

export interface MistakeReviewResponse {
  review_id: string;
  event_id: string;
  replay_id: string;
  source_event_id: string;
  status: string;
  created_at: string;
}

export interface MistakeReviewListItem {
  source_event_id: string;
  kind: string;
  status: string;
  review_id: string;
  reviewed_event_type_key: string | null;
  notes: string | null;
  created_at: string;
  player_key: string | null;
  time: number | null;
  t_start: number | null;
  t_end: number | null;
}

export interface MistakeReviewListResponse {
  reviews: MistakeReviewListItem[];
}
