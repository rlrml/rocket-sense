import { FormEvent, useEffect, useMemo, useState } from "react";
import { ExternalLink, Play, Upload } from "lucide-react";
import {
  createReviewCampaign,
  getAccessToken,
  listReviewCampaigns,
  reviewCampaignLabelsExportUrl,
  reviewCampaignPlaylistUrl,
} from "./api";
import type { CreateReviewCampaignResponse, ReviewCampaignSummary } from "./types";

// Build the standalone review-player link for a campaign. The player fetches
// the playlist manifest itself, so it needs its own credential: it reads
// Authorization from the reviewToken URL param (or its own localStorage), not
// the SPA's. We hand it the same bearer token this SPA stores after login
// (in dev mode, the Account page's dev-token flow).
function campaignPlayerUrl(campaignId: string): string {
  const params = new URLSearchParams();
  params.set("reviewPlaylist", reviewCampaignPlaylistUrl(campaignId));
  const token = getAccessToken();
  if (token) {
    params.set("reviewToken", token);
  }
  return `/subtr-actor/?${params.toString()}`;
}

function formatCreatedAt(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function ProgressBar({ done, total, label }: { done: number; total: number; label: string }) {
  const share = total > 0 ? Math.min(1, done / total) : 0;
  return (
    <div className="campaign-progress">
      <div className="campaign-progress-header">
        <span>{label}</span>
        <span className="muted-text">
          {done.toLocaleString()} / {total.toLocaleString()}
        </span>
      </div>
      <div
        className="campaign-progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label={label}
      >
        <div className="campaign-progress-fill" style={{ width: `${share * 100}%` }} />
      </div>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: ReviewCampaignSummary }) {
  const remainingForMe = Math.max(0, campaign.item_count - campaign.my_labeled_count);
  return (
    <article className="campaign-card">
      <header className="campaign-card-header">
        <div>
          <h3>{campaign.title}</h3>
          <p className="muted-text">{campaign.question}</p>
        </div>
        <span className={`status-badge campaign-status-${campaign.status}`}>{campaign.status}</span>
      </header>
      <ProgressBar
        done={campaign.distinct_labeled_items}
        total={campaign.item_count}
        label="Items with at least one label"
      />
      <ProgressBar
        done={campaign.my_labeled_count}
        total={campaign.item_count}
        label="Your labels"
      />
      <footer className="campaign-card-actions">
        <a
          className="secondary-button campaign-primary-action"
          href={campaignPlayerUrl(campaign.id)}
        >
          <Play size={16} />
          {remainingForMe > 0 ? `Continue review (${remainingForMe} left)` : "Review again"}
        </a>
        <a className="secondary-button" href={reviewCampaignPlaylistUrl(campaign.id)}>
          <ExternalLink size={16} />
          Playlist JSON
        </a>
        <a className="secondary-button" href={reviewCampaignLabelsExportUrl(campaign.id)}>
          <ExternalLink size={16} />
          Export labels
        </a>
        <span className="muted-text campaign-card-meta">
          {campaign.label_count.toLocaleString()} labels · created{" "}
          {formatCreatedAt(campaign.created_at)}
        </span>
      </footer>
    </article>
  );
}

function NewCampaignForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [playlistFile, setPlaylistFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateReviewCampaignResponse | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!playlistFile || !title.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const playlist: unknown = JSON.parse(await playlistFile.text());
      const created = await createReviewCampaign({
        title: title.trim(),
        question: question.trim() || undefined,
        playlist,
      });
      setResult(created);
      setTitle("");
      setQuestion("");
      setPlaylistFile(null);
      onCreated();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : String(submitError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="campaign-new-form" onSubmit={submit}>
      <h3>New campaign</h3>
      <p className="muted-text">
        Import a subtr-actor review playlist (the emitter&apos;s JSON manifest). Items whose replays
        are not hosted here are skipped and reported.
      </p>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Beaten-to-ball session 1"
          required
        />
      </label>
      <label>
        Question (optional)
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Was this player genuinely challenging for the ball?"
        />
      </label>
      <label>
        Playlist JSON
        <input
          type="file"
          accept="application/json,.json"
          onChange={(event) => setPlaylistFile(event.target.files?.[0] ?? null)}
          required
        />
      </label>
      <button type="submit" disabled={submitting || !playlistFile || !title.trim()}>
        <Upload size={16} />
        {submitting ? "Importing…" : "Create campaign"}
      </button>
      {error ? <p className="campaign-form-error">{error}</p> : null}
      {result ? (
        <div className="campaign-import-result">
          <p>
            Imported <strong>{result.imported}</strong> items into <strong>{result.slug}</strong>
            {result.skipped.length > 0 ? ` (${result.skipped.length} skipped)` : ""}.
          </p>
          {result.skipped.length > 0 ? (
            <ul className="muted-text">
              {result.skipped.slice(0, 10).map((skip) => (
                <li key={skip.candidate}>
                  <code>{skip.candidate}</code>: {skip.reason}
                </li>
              ))}
              {result.skipped.length > 10 ? <li>… and {result.skipped.length - 10} more</li> : null}
            </ul>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

export function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<ReviewCampaignSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);
  const loggedIn = useMemo(() => getAccessToken() != null, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listReviewCampaigns()
      .then((response) => {
        if (cancelled) return;
        setCampaigns(response.campaigns);
        setLoadError(null);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setLoadError(error instanceof Error ? error.message : String(error));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reloadNonce]);

  return (
    <section className="page campaigns-page">
      <header className="page-header">
        <div>
          <h2>Review campaigns</h2>
          <p className="muted-text">
            Organized labeling efforts: a question over a curated candidate set, with per-reviewer
            progress and JSONL export for training.
          </p>
        </div>
      </header>
      {!loggedIn ? (
        <p className="muted-text">
          You are browsing anonymously — sign in (Account page) to record labels and track your own
          progress. In dev mode the Account page can mint a dev token.
        </p>
      ) : null}
      <div className="campaigns-layout">
        <div className="campaigns-list">
          {loading ? <p className="muted-text">Loading campaigns…</p> : null}
          {loadError ? <p className="campaign-form-error">{loadError}</p> : null}
          {!loading && !loadError && campaigns.length === 0 ? (
            <p className="muted-text">No campaigns yet — import a playlist to start one.</p>
          ) : null}
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        <aside className="campaigns-side">
          <NewCampaignForm onCreated={() => setReloadNonce((nonce) => nonce + 1)} />
        </aside>
      </div>
    </section>
  );
}
