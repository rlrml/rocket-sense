-- subtr-actor stored the Rust `Debug` representation of the remote id as the
-- player name whenever a player had no resolvable in-game name. For Epic users
-- this surfaced in the UI as `Epic("3f67e5d2349f491c8b99825ec396a2…")`. Replace
-- those debug strings with the bare platform id so existing replays display a
-- clean name. Only rows whose name is exactly the debug fallback are touched.
UPDATE replay_players
SET name = platform_player_id
WHERE platform_player_id IS NOT NULL
  AND name IN (
    'Epic("' || platform_player_id || '")', -- Epic(String)
    'Steam(' || platform_player_id || ')',  -- Steam(u64)
    'Xbox(' || platform_player_id || ')',   -- Xbox(u64)
    'QQ(' || platform_player_id || ')',     -- QQ(u64)
    'SplitScreen(' || platform_player_id || ')' -- SplitScreen(u32)
  );
