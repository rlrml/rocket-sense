CREATE TABLE play_event_kickoff_details (
    event_id uuid PRIMARY KEY REFERENCES play_events(id) ON DELETE CASCADE,
    outcome text,
    winning_team integer,
    win_strength double precision,
    win_strength_band text,
    kickoff_possession_outcome text,
    kickoff_possession_team integer,
    kickoff_goal boolean NOT NULL DEFAULT false,
    scoring_team integer,
    time_to_goal double precision,
    taker_touch_delay_seconds double precision,
    exit_speed double precision,
    exit_y_velocity double precision,
    first_touch_subject_id text,
    first_touch_team integer,
    first_touch_time double precision,
    first_touch_frame integer,
    first_follow_up_touch_subject_id text,
    first_follow_up_touch_team integer,
    first_follow_up_touch_time double precision,
    first_follow_up_touch_frame integer,
    CHECK (outcome IS NULL OR outcome <> ''),
    CHECK (winning_team IS NULL OR winning_team IN (0, 1)),
    CHECK (win_strength_band IS NULL OR win_strength_band <> ''),
    CHECK (kickoff_possession_outcome IS NULL OR kickoff_possession_outcome <> ''),
    CHECK (kickoff_possession_team IS NULL OR kickoff_possession_team IN (0, 1)),
    CHECK (scoring_team IS NULL OR scoring_team IN (0, 1)),
    CHECK (time_to_goal IS NULL OR time_to_goal >= 0.0),
    CHECK (taker_touch_delay_seconds IS NULL OR taker_touch_delay_seconds >= 0.0),
    CHECK (first_touch_team IS NULL OR first_touch_team IN (0, 1)),
    CHECK (first_follow_up_touch_team IS NULL OR first_follow_up_touch_team IN (0, 1))
);

CREATE INDEX play_event_kickoff_details_outcome_idx
    ON play_event_kickoff_details (outcome);

CREATE INDEX play_event_kickoff_details_possession_idx
    ON play_event_kickoff_details (kickoff_possession_outcome, kickoff_possession_team);

CREATE INDEX play_event_kickoff_details_goal_idx
    ON play_event_kickoff_details (kickoff_goal, scoring_team)
    WHERE kickoff_goal;

CREATE TABLE play_event_kickoff_player_details (
    event_id uuid NOT NULL REFERENCES play_events(id) ON DELETE CASCADE,
    player_subject_id text NOT NULL,
    team integer NOT NULL,
    role text NOT NULL,
    team_role text NOT NULL,
    player_index integer NOT NULL,
    spawn_position text,
    start_boost double precision,
    boost_after double precision,
    first_touch_time double precision,
    first_touch_frame integer,
    taker_outcome text,
    approach text,
    support_behavior text,
    PRIMARY KEY (event_id, team_role, player_index),
    CHECK (player_subject_id <> ''),
    CHECK (team IN (0, 1)),
    CHECK (role IN ('taker', 'support')),
    CHECK (team_role IN ('team_zero_taker', 'team_one_taker', 'team_zero_support', 'team_one_support')),
    CHECK (player_index >= 0),
    CHECK (spawn_position IS NULL OR spawn_position <> ''),
    CHECK (start_boost IS NULL OR start_boost >= 0.0),
    CHECK (boost_after IS NULL OR boost_after >= 0.0),
    CHECK (taker_outcome IS NULL OR taker_outcome <> ''),
    CHECK (approach IS NULL OR approach <> ''),
    CHECK (support_behavior IS NULL OR support_behavior <> '')
);

CREATE INDEX play_event_kickoff_player_details_player_role_idx
    ON play_event_kickoff_player_details (player_subject_id, role);

CREATE INDEX play_event_kickoff_player_details_taker_idx
    ON play_event_kickoff_player_details (approach, taker_outcome)
    WHERE role = 'taker';

CREATE INDEX play_event_kickoff_player_details_support_idx
    ON play_event_kickoff_player_details (support_behavior)
    WHERE role = 'support';
