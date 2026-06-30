#!/usr/bin/env python3
"""Import ranked replays from ballchasing.com into rocket-sense.

Searches ballchasing for replays matching a rank/playlist/date filter, downloads
each replay file, and uploads it to a rocket-sense instance with the per-player
rank metadata bundled in the multipart `ranks` field (so the games are recorded
with their rank, e.g. silver).

Auth:
  BALLCHASING_API_KEY   ballchasing API key (download source)
  ROCKET_SENSE_TOKEN    rocket-sense bearer token / session cookie value
  ROCKET_SENSE_BASE_URL default https://rocket-sense.duckdns.org

Only stdlib is used. Run via: nix shell nixpkgs#python3 --command python3 ...

State is checkpointed to <out-dir>/state.json so re-runs resume and skip
already-uploaded replays.
"""
import argparse
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid

BALLCHASING_API = "https://ballchasing.com/api"

# ballchasing playlist id -> PsyNet playlist (queue) id used by rocket-sense.
PLAYLIST_PSYNET_ID = {
    "ranked-duels": 10,
    "ranked-doubles": 11,
    "ranked-solo-standard": 12,
    "ranked-standard": 13,
}


def log(msg):
    print(msg, flush=True)


def http(method, url, headers=None, data=None, timeout=120):
    """Return (status, headers_dict, body_bytes); never raises on HTTP error."""
    req = urllib.request.Request(url, data=data, method=method)
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, dict(resp.headers), resp.read()
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers or {}), e.read()
    except urllib.error.URLError as e:
        return 0, {}, str(e).encode()


def bc_get(key, url, timeout=120):
    """ballchasing GET with 429-aware retry; returns (status, headers, body)."""
    for attempt in range(8):
        status, hdrs, body = http("GET", url, {"Authorization": key}, timeout=timeout)
        if status == 429:
            retry = float(hdrs.get("Retry-After", "2") or "2")
            log(f"  429 rate-limited, sleeping {retry:.1f}s")
            time.sleep(retry + 0.5)
            continue
        if status in (500, 502, 503, 504):
            time.sleep(2 * (attempt + 1))
            continue
        return status, hdrs, body
    return status, hdrs, body


def search_replays(key, params, target, sleep):
    """Paginate ballchasing search, collecting up to `target` replay summaries.

    NOTE: ballchasing's returned `next` URL drops the `max-rank` filter, so
    following it verbatim leaks higher-ranked replays into the results. We
    instead extract only the opaque `after` cursor from `next` and re-issue the
    request with our *full* filter set preserved, so every page stays within the
    requested rank band.
    """
    base = params.copy()
    base["count"] = "200"
    after = None
    collected = []
    seen = set()
    while len(collected) < target:
        page_params = base.copy()
        if after:
            page_params["after"] = after
        url = BALLCHASING_API + "/replays?" + urllib.parse.urlencode(page_params)
        status, _, body = bc_get(key, url)
        if status != 200:
            log(f"search failed: HTTP {status}: {body[:300]!r}")
            break
        payload = json.loads(body)
        page = payload.get("list", [])
        if not page:
            break
        new = 0
        for r in page:
            rid = r.get("id")
            if rid and rid not in seen:
                seen.add(rid)
                collected.append(r)
                new += 1
        log(f"  search: total reported={payload.get('count')} collected={len(collected)}")
        nxt = payload.get("next")
        if not nxt or new == 0:
            break
        # Pull just the `after` cursor out of the next link; discard its params.
        q = urllib.parse.parse_qs(urllib.parse.urlsplit(nxt).query)
        after = q.get("after", [None])[0]
        if not after:
            break
        if len(collected) < target:
            time.sleep(sleep)
    return collected[:target]


def build_rank_submission(summary, playlist_psynet_id):
    """Build a rocket-sense RankSubmission from a ballchasing replay summary.

    ballchasing tier numbering matches rocket-sense PsyNet tiers (4/5/6 =
    Silver I/II/III). ballchasing divisions are 1-4; PsyNet/rocket-sense are
    0-3, so we subtract one.
    """
    players = []
    for color in ("blue", "orange"):
        for p in summary.get(color, {}).get("players", []):
            pid = p.get("id", {}) or {}
            platform_player_id = pid.get("id")
            if not platform_player_id:
                continue
            entry = {
                "platform_player_id": str(platform_player_id),
                "player_name": p.get("name"),
                "platform": pid.get("platform"),
                "playlist": playlist_psynet_id,
            }
            rank = p.get("rank")
            if rank and rank.get("tier") is not None:
                div = rank.get("division")
                entry["valid"] = True
                entry["after"] = {
                    "tier": rank.get("tier"),
                    "division": (div - 1) if isinstance(div, int) else div,
                }
            players.append(entry)
    return {"players": players}


def multipart_body(replay_bytes, filename, ranks_json):
    boundary = "----rocketsenseimport" + uuid.uuid4().hex
    nl = b"\r\n"
    parts = []
    parts.append(b"--" + boundary.encode())
    parts.append(
        f'Content-Disposition: form-data; name="file"; filename="{filename}"'.encode()
    )
    parts.append(b"Content-Type: application/octet-stream")
    parts.append(b"")
    parts.append(replay_bytes)
    parts.append(b"--" + boundary.encode())
    parts.append(b'Content-Disposition: form-data; name="ranks"')
    parts.append(b"")
    parts.append(ranks_json.encode())
    parts.append(b"--" + boundary.encode() + b"--")
    parts.append(b"")
    body = nl.join(parts)
    return body, f"multipart/form-data; boundary={boundary}"


def upload_replay(base_url, token, replay_bytes, filename, ranks):
    ranks_json = json.dumps(ranks)
    body, content_type = multipart_body(replay_bytes, filename, ranks_json)
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": content_type,
        "Content-Length": str(len(body)),
    }
    url = base_url.rstrip("/") + "/api/v1/replays"
    return http("POST", url, headers, body, timeout=180)


def load_state(path):
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    return {"uploaded": {}, "failed": {}}


def save_state(path, state):
    tmp = path + ".tmp"
    with open(tmp, "w") as f:
        json.dump(state, f, indent=2)
    os.replace(tmp, path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--target", type=int, default=400)
    ap.add_argument("--playlist", default="ranked-doubles")
    ap.add_argument("--min-rank", default="silver-1")
    ap.add_argument("--max-rank", default="silver-3")
    ap.add_argument("--date-after", default="2025-12-25T00:00:00Z")
    ap.add_argument("--out-dir", default="/tmp/bc-silver-import")
    ap.add_argument("--sleep", type=float, default=0.8, help="seconds between ballchasing calls")
    ap.add_argument("--dry-run", action="store_true", help="search + build ranks, no download/upload")
    args = ap.parse_args()

    key = os.environ.get("BALLCHASING_API_KEY")
    if not key:
        sys.exit("BALLCHASING_API_KEY not set")
    base_url = os.environ.get("ROCKET_SENSE_BASE_URL", "https://rocket-sense.duckdns.org")
    token = os.environ.get("ROCKET_SENSE_TOKEN")
    if not args.dry_run and not token:
        sys.exit("ROCKET_SENSE_TOKEN not set (needed for upload; use --dry-run to skip)")

    os.makedirs(args.out_dir, exist_ok=True)
    state_path = os.path.join(args.out_dir, "state.json")
    state = load_state(state_path)

    playlist_psynet_id = PLAYLIST_PSYNET_ID.get(args.playlist)

    search_params = {
        "playlist": args.playlist,
        "min-rank": args.min_rank,
        "max-rank": args.max_rank,
        "replay-date-after": args.date_after,
        "sort-by": "replay-date",
        "sort-dir": "desc",
    }

    log(f"Searching ballchasing for up to {args.target} {args.playlist} "
        f"[{args.min_rank}..{args.max_rank}] after {args.date_after} ...")
    # Over-fetch a little so failures/dupes still let us reach the target.
    summaries = search_replays(key, search_params, int(args.target * 1.15) + 20, args.sleep)
    log(f"Collected {len(summaries)} candidate replays.")

    if args.dry_run:
        sample = build_rank_submission(summaries[0], playlist_psynet_id) if summaries else {}
        log("DRY RUN — sample RankSubmission for first replay:")
        log(json.dumps(sample, indent=2))
        ranked_players = sum(
            1 for s in summaries
            for pl in build_rank_submission(s, playlist_psynet_id)["players"]
            if "after" in pl
        )
        total_players = sum(len(build_rank_submission(s, playlist_psynet_id)["players"]) for s in summaries)
        log(f"\nAcross {len(summaries)} replays: {total_players} players, "
            f"{ranked_players} carry an explicit per-player rank.")
        return

    uploaded_ok = len(state["uploaded"])
    attempted = 0
    for summary in summaries:
        if uploaded_ok >= args.target:
            break
        rid = summary["id"]
        if rid in state["uploaded"]:
            continue
        attempted += 1
        ranks = build_rank_submission(summary, playlist_psynet_id)

        status, hdrs, body = bc_get(key, f"{BALLCHASING_API}/replays/{rid}/file")
        if status != 200:
            log(f"[{uploaded_ok}/{args.target}] download {rid} FAILED HTTP {status}")
            state["failed"][rid] = f"download {status}"
            save_state(state_path, state)
            time.sleep(args.sleep)
            continue

        up_status, up_hdrs, up_body = upload_replay(
            base_url, token, body, f"{rid}.replay", ranks
        )
        if up_status in (200, 201):
            try:
                resp = json.loads(up_body)
                replay_id = resp.get("replay", {}).get("id")
                dedup = resp.get("deduplicated")
            except Exception:
                replay_id, dedup = None, None
            uploaded_ok += 1
            state["uploaded"][rid] = {
                "rocket_sense_id": replay_id,
                "status": up_status,
                "dedup": dedup,
                "ranked_players": sum(1 for p in ranks["players"] if "after" in p),
            }
            state["failed"].pop(rid, None)
            log(f"[{uploaded_ok}/{args.target}] {rid} -> {replay_id} "
                f"(HTTP {up_status}{', dedup' if dedup else ''})")
        else:
            log(f"[{uploaded_ok}/{args.target}] upload {rid} FAILED HTTP {up_status}: {up_body[:200]!r}")
            state["failed"][rid] = f"upload {up_status}: {up_body[:200].decode(errors='replace')}"
        save_state(state_path, state)
        time.sleep(args.sleep)

    log(f"\nDone. uploaded={uploaded_ok} attempted_this_run={attempted} "
        f"failed={len(state['failed'])}")
    log(f"State: {state_path}")


if __name__ == "__main__":
    main()
