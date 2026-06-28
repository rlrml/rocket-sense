-- These streams remain available in the serialized event-stream object but are
-- too high-volume / low-value to keep as permanent `play_events` projections.
-- `depth_role` feeds positioning facts from in-memory processing now; `dodge`
-- and `shadow_defense` do not feed current materialized facts. Deleting the
-- parent rows cascades payloads, attributes, subjects, and stream-specific
-- details.

DELETE FROM play_events
WHERE source_stream IN ('depth_role', 'dodge', 'shadow_defense');
