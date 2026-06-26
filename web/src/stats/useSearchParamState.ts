import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * useState-like hook whose value is stored in a URL search param, so a selected
 * sub-view (e.g. the kickoffs "Kickoff by kickoff" tab) is shareable via the
 * link and survives reloads / back-forward navigation.
 *
 * The param falls back to `defaultValue` when it is absent or holds a value
 * outside `allowed`, and writing the default clears the param to keep URLs
 * clean. Updates use history `replace` so toggling a view doesn't pile entries
 * onto the back stack.
 *
 * Keys are scoped to a single stat group: the stat-group nav links drop the
 * query string when switching groups, so the same key can't leak across groups.
 */
export function useSearchParamState<T extends string>(
  key: string,
  defaultValue: T,
  allowed: readonly T[],
): [T, (value: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get(key);
  const value =
    raw != null && (allowed as readonly string[]).includes(raw) ? (raw as T) : defaultValue;
  const setValue = useCallback(
    (next: T) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (next === defaultValue) params.delete(key);
          else params.set(key, next);
          return params;
        },
        { replace: true },
      );
    },
    [key, defaultValue, setSearchParams],
  );
  return [value, setValue];
}
