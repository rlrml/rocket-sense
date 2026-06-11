-- `rotation_player` and `positioning_ball_relative_depth` are per-frame
-- telemetry streams (~1100 and ~1050 events per replay) that nothing reads
-- back out of the database: rotation_player's only readers were the profile
-- timing backfill's own staleness checks, and positioning_ball_relative_depth
-- had no readers at all. Together they were ~26% of all play events, each
-- fanned out into payload/attribute/subject (and for rotation_player, detail)
-- rows — a large share of the churn behind the 2026-06-11 disk-full incident.
--
-- The server no longer indexes these streams (they remain available in each
-- analysis run's event stream object). Delete the existing rows — payloads,
-- attributes, subjects, and details cascade from play_events — and drop the
-- now-unwritten rotation player detail table.

DELETE FROM play_events
WHERE source_stream IN ('rotation_player', 'positioning_ball_relative_depth');

DROP TABLE IF EXISTS play_event_rotation_player_details;
