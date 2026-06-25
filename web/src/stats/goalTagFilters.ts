// Goal tags we never want to surface in the UI. Some tags (notably
// "flip_into_ball_goal") fire on the overwhelming majority of goals, so they
// tower over every other tag in leaderboards and rate cards while telling us
// nothing interesting. Add a tag's `kind` here to hide it everywhere goal tags
// are listed.
//
// Identifiers come from subtr-actor's ALL_GOAL_TAG_DEFINITIONS and match both
// GoalTagAggregateResponse.kind (player overview) and GoalType.key (per-goal
// tags) — they share the same namespace.
export const IGNORED_GOAL_TAGS: ReadonlySet<string> = new Set(["flip_into_ball_goal"]);

/** True when a goal tag `kind`/`key` should be hidden from the UI. */
export function isIgnoredGoalTag(kind: string): boolean {
  return IGNORED_GOAL_TAGS.has(kind);
}
