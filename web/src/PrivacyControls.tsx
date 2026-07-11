import { useEffect, useState } from "react";
import { CircleUser, Lock, UserPlus, Users, X } from "lucide-react";

import type { ShareTarget } from "./api";
import type { ListSharesResponse, ShareResponse, Visibility } from "./types";

const VISIBILITY_OPTIONS: { value: Visibility; label: string; hint: string }[] = [
  { value: "public", label: "Public", hint: "Anyone can find and view this." },
  {
    value: "unlisted",
    label: "Unlisted",
    hint: "Hidden from lists, but anyone with the link can view it.",
  },
  {
    value: "private",
    label: "Private",
    hint: "Only you, people you share with, and admins can view it.",
  },
];

function shareLabel(share: ShareResponse): string {
  return share.display_name?.trim() || share.email?.trim() || share.user_id;
}

/** A three-way visibility selector that persists each change via `onChange`. */
function VisibilityControl({
  visibility,
  onChange,
}: {
  visibility: Visibility;
  onChange: (next: Visibility) => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = VISIBILITY_OPTIONS.find((option) => option.value === visibility);

  async function handleChange(next: Visibility) {
    if (next === visibility) return;
    setBusy(true);
    setError(null);
    try {
      await onChange(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update visibility.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="visibility-control">
      <label className="segment-bar-select-label">
        <span className="eyebrow">Visibility</span>
        <select
          className="segment-bar-select"
          value={visibility}
          disabled={busy}
          onChange={(event) => void handleChange(event.currentTarget.value as Visibility)}
        >
          {VISIBILITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {current ? <p className="muted-text">{current.hint}</p> : null}
      {error ? <p className="replay-selection-feedback is-error">{error}</p> : null}
    </div>
  );
}

/**
 * Manage the per-user share allowlist for a resource. Resource-agnostic: the
 * caller supplies the list/add/remove API calls. Mirrors GroupManagersPanel.
 */
function ShareManager({
  listShares,
  addShare,
  removeShare,
  currentUserId,
}: {
  listShares: () => Promise<ListSharesResponse>;
  addShare: (target: ShareTarget) => Promise<ListSharesResponse>;
  removeShare: (target: ShareTarget) => Promise<ListSharesResponse>;
  currentUserId: string | null;
}) {
  const [shares, setShares] = useState<ShareResponse[] | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "error"; message: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    setShares(null);
    setLoadError(null);
    listShares()
      .then((response) => {
        if (!cancelled) setShares(response.shares);
      })
      .catch((err) => {
        if (!cancelled) {
          setShares([]);
          setLoadError(err instanceof Error ? err.message : "Could not load shared users.");
        }
      });
    return () => {
      cancelled = true;
    };
    // Load once on mount: listShares is a stable closure over the resource id
    // chosen at the call site, and the panel remounts (via key) when it changes.
  }, []);

  async function withBusy(action: () => Promise<void>) {
    setBusy(true);
    setFeedback(null);
    try {
      await action();
    } catch (err) {
      setFeedback({
        kind: "error",
        message: err instanceof Error ? err.message : "Request failed",
      });
    } finally {
      setBusy(false);
    }
  }

  function handleInvite() {
    const email = inviteEmail.trim();
    if (!email) return;
    void withBusy(async () => {
      const response = await addShare({ email });
      setShares(response.shares);
      setInviteEmail("");
      setFeedback({ kind: "ok", message: `${email} can now view this.` });
    });
  }

  function handleRemove(share: ShareResponse) {
    const label = shareLabel(share);
    if (!window.confirm(`Stop sharing with ${label}?`)) return;
    void withBusy(async () => {
      const response = await removeShare({ user_id: share.user_id });
      setShares(response.shares);
      setFeedback({ kind: "ok", message: `Removed ${label}.` });
    });
  }

  return (
    <div className="group-managers-panel">
      <p className="group-managers-title">
        <Users size={14} />
        Shared with
      </p>
      {shares === null && !loadError ? <p className="group-managers-empty">Loading…</p> : null}
      {loadError ? <p className="replay-selection-feedback is-error">{loadError}</p> : null}
      {shares && shares.length > 0 ? (
        <ul className="group-managers-list">
          {shares.map((share) => (
            <li key={share.user_id} className="group-managers-item">
              <span className="group-managers-identity">
                <CircleUser size={16} />
                <span className="group-managers-name">
                  {shareLabel(share)}
                  {share.user_id === currentUserId ? " (you)" : ""}
                </span>
                {share.email && share.email !== shareLabel(share) ? (
                  <span className="group-managers-email">{share.email}</span>
                ) : null}
              </span>
              <button
                type="button"
                className="link-button is-danger"
                onClick={() => handleRemove(share)}
                disabled={busy}
                title="Stop sharing with this user"
              >
                <X size={14} />
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : shares && shares.length === 0 ? (
        <p className="group-managers-empty">Not shared with anyone yet.</p>
      ) : null}
      <div className="group-managers-invite">
        <input
          type="email"
          value={inviteEmail}
          placeholder="Share by email"
          onChange={(event) => setInviteEmail(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleInvite();
            }
          }}
          disabled={busy || shares === null}
        />
        <button
          type="button"
          onClick={handleInvite}
          disabled={busy || shares === null || inviteEmail.trim() === ""}
        >
          <UserPlus size={16} />
          Share
        </button>
      </div>
      <p className="group-managers-hint">The person must have signed in at least once.</p>
      {feedback ? (
        <p
          className={`replay-selection-feedback ${feedback.kind === "error" ? "is-error" : "is-ok"}`}
        >
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Combined privacy panel: a visibility selector plus, for non-public resources,
 * the per-user share manager. Render only when the viewer can manage. Manages
 * its own visibility state seeded from `visibility` so the share manager appears
 * as soon as the resource is made unlisted/private.
 */
export function PrivacyPanel({
  visibility,
  onVisibilityChange,
  listShares,
  addShare,
  removeShare,
  currentUserId,
}: {
  visibility: Visibility;
  onVisibilityChange: (next: Visibility) => Promise<void>;
  listShares: () => Promise<ListSharesResponse>;
  addShare: (target: ShareTarget) => Promise<ListSharesResponse>;
  removeShare: (target: ShareTarget) => Promise<ListSharesResponse>;
  currentUserId: string | null;
}) {
  const [current, setCurrent] = useState<Visibility>(visibility);

  useEffect(() => {
    setCurrent(visibility);
  }, [visibility]);

  return (
    <div className="privacy-panel">
      <p className="privacy-panel-title">
        <Lock size={14} />
        Privacy
      </p>
      <VisibilityControl
        visibility={current}
        onChange={async (next) => {
          await onVisibilityChange(next);
          setCurrent(next);
        }}
      />
      {current !== "public" ? (
        <ShareManager
          // Remount the share list whenever visibility flips so it reloads.
          key={current}
          listShares={listShares}
          addShare={addShare}
          removeShare={removeShare}
          currentUserId={currentUserId}
        />
      ) : null}
    </div>
  );
}

/** Account-level default visibility selectors for new replays and groups. */
export function DefaultVisibilitySettings({
  replayVisibility,
  groupVisibility,
  onChange,
}: {
  replayVisibility: Visibility;
  groupVisibility: Visibility;
  onChange: (settings: {
    default_replay_visibility?: Visibility;
    default_group_visibility?: Visibility;
  }) => Promise<void>;
}) {
  return (
    <div className="privacy-panel">
      <p className="privacy-panel-title">
        <Lock size={14} />
        Default visibility for new uploads
      </p>
      <VisibilityControl
        visibility={replayVisibility}
        onChange={(next) => onChange({ default_replay_visibility: next })}
      />
      <p className="privacy-panel-title">
        <Lock size={14} />
        Default visibility for new groups
      </p>
      <VisibilityControl
        visibility={groupVisibility}
        onChange={(next) => onChange({ default_group_visibility: next })}
      />
    </div>
  );
}
