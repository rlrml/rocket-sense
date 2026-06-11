-- play_event_scalar_fields was a write-only EAV index: every indexed event was
-- exploded into ~26 rows (one per scalar payload/attribute field, with payload
-- and normalized-attribute values largely duplicating each other) plus three
-- partial indexes, but nothing in the server or web app ever queried it —
-- play-event reads go through play_events' typed columns, the per-stream
-- detail tables, and the payload/attribute JSONB tables. At ~86 M rows it was
-- 164 GB (~71% of the database) when the node disk filled on 2026-06-11.
--
-- The write path was removed from the server in the same change; drop the
-- table and its indexes outright. If field-level filtering is ever needed,
-- reintroduce it as expression/GIN indexes over play_event_payloads /
-- play_event_attributes instead of a row-per-field table.

DROP TABLE IF EXISTS play_event_scalar_fields;
