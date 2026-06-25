-- Ensure role-mapped demo/death aggregate materialization always has stable
-- event type ids to target, even on databases without legacy kill/death rows.

INSERT INTO event_types (
    key,
    display_name,
    category
)
VALUES
    ('demolition', 'Demolition', 'contact'),
    ('kill', 'Kill', 'contact'),
    ('death', 'Death', 'contact')
ON CONFLICT (key) DO NOTHING;
