export const SHORT_SHA_LENGTH = 7;

const GIT_COMMIT_SHA_PATTERN = /^[0-9a-f]{7,40}/i;

export function commitShaForUrl(sha?: string | null): string | null {
  const trimmed = sha?.trim();
  if (!trimmed) return null;
  return trimmed.match(GIT_COMMIT_SHA_PATTERN)?.[0] ?? null;
}

export function shortCommitSha(sha?: string | null): string | null {
  return commitShaForUrl(sha)?.slice(0, SHORT_SHA_LENGTH) ?? null;
}
