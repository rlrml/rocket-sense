#!/usr/bin/env bash
# Guard against duplicate migration version prefixes.
#
# sqlx identifies each migration solely by its leading numeric version. When two
# files share a version, `sqlx::migrate!` becomes ambiguous and, once one of the
# colliding migrations has already been applied to a database, every subsequent
# deploy crashes at startup with "migration <N> was previously applied but has
# been modified". Parallel PRs each picking the next number independently is the
# usual cause, so catch it in CI before it reaches a database.
set -euo pipefail

migrations_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/migrations"

dupes=$(
  for f in "$migrations_dir"/*.sql; do
    base=$(basename "$f")
    printf '%s\n' "${base%%_*}"
  done | sort | uniq -d
)

if [[ -n "$dupes" ]]; then
  echo "error: duplicate migration version prefixes detected:" >&2
  while read -r version; do
    echo "  version $version:" >&2
    ls -1 "$migrations_dir/${version}_"*.sql | sed 's|^|    |' >&2
  done <<< "$dupes"
  echo >&2
  echo "Renumber the newer migration(s) so every version is unique." >&2
  exit 1
fi

echo "Migration versions OK ($(ls -1 "$migrations_dir"/*.sql | wc -l | tr -d ' ') migrations, all unique)."
