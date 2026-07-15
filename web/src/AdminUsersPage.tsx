import { Search, ShieldCheck, ShieldOff, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, listAdminUsers, setUserAdminStatus } from "./api";
import type { AdminUserResponse } from "./types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserResponse[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([listAdminUsers(), getCurrentUser()])
      .then(([response, currentUser]) => {
        if (cancelled) return;
        setUsers(response.users);
        setCurrentUserId(currentUser.id);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return users;
    return users.filter((user) =>
      [user.display_name, user.primary_email, user.id].some((value) =>
        value?.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [query, users]);

  async function updateAdminStatus(user: AdminUserResponse) {
    const nextIsAdmin = !user.is_admin;
    if (
      !nextIsAdmin &&
      !window.confirm(
        `Remove admin access from ${user.display_name || user.primary_email || "this user"}?`,
      )
    ) {
      return;
    }

    setUpdatingUserId(user.id);
    setError(null);
    try {
      const updated = await setUserAdminStatus(user.id, nextIsAdmin);
      setUsers((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update admin access.");
    } finally {
      setUpdatingUserId(null);
    }
  }

  const adminCount = users.filter((user) => user.is_admin).length;

  return (
    <section className="page admin-users-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>User access</h1>
          <p className="subtle">Grant or revoke administrator access for registered users.</p>
        </div>
        <div className="admin-user-count" aria-label={`${adminCount} administrators`}>
          <ShieldCheck size={18} />
          <strong>{adminCount}</strong> admin{adminCount === 1 ? "" : "s"}
        </div>
      </header>

      <label className="admin-user-search">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search users</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, email, or user ID"
        />
      </label>

      {error ? <p className="status-line error">{error}</p> : null}
      {loading ? <p className="status-line">Loading users…</p> : null}

      {!loading && !error ? (
        <div className="table-frame admin-users-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-users-empty">
                    <Users size={18} /> No users match this search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isCurrentUser = user.id === currentUserId;
                  const isUpdating = updatingUserId === user.id;
                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="admin-user-identity">
                          <strong>{user.display_name || "Unnamed user"}</strong>
                          <code>{user.id}</code>
                        </div>
                      </td>
                      <td>{user.primary_email || "—"}</td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            user.is_admin ? "status-processed" : "status-neutral"
                          }`}
                        >
                          {user.is_admin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={user.is_admin ? "secondary-button" : undefined}
                          disabled={isUpdating || (isCurrentUser && user.is_admin)}
                          title={
                            isCurrentUser && user.is_admin
                              ? "You cannot remove your own admin access"
                              : undefined
                          }
                          onClick={() => void updateAdminStatus(user)}
                        >
                          {user.is_admin ? <ShieldOff size={16} /> : <ShieldCheck size={16} />}
                          {isUpdating
                            ? "Updating…"
                            : user.is_admin
                              ? isCurrentUser
                                ? "Current admin"
                                : "Remove admin"
                              : "Make admin"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
