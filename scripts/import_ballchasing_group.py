#!/usr/bin/env python3
"""Import a (possibly nested) ballchasing.com group into a rocket-sense replay group.

ballchasing groups nest arbitrarily (e.g. event -> Group A/B -> per-match
subgroups -> replays). rocket-sense replay groups are flat, so this walks the
whole subtree under a root group, uploads every replay it finds, and collects
them into a single rocket-sense replay group.

Auth (same as import_ballchasing_silver.py):
  BALLCHASING_API_KEY   ballchasing API key (download source)
  ROCKET_SENSE_TOKEN    rocket-sense bearer token
  ROCKET_SENSE_BASE_URL default https://rocket-sense.duckdns.org

Only stdlib is used. State is checkpointed to <out-dir>/state.json so re-runs
resume, skip already-uploaded replays, and reuse the created group.
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid

BALLCHASING_API = "https://ballchasing.com/api"


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


def child_groups(key, group_id, sleep):
    url = BALLCHASING_API + "/groups?" + urllib.parse.urlencode({"group": group_id})
    status, _, body = bc_get(key, url)
    time.sleep(sleep)
    if status != 200:
        log(f"  list child groups of {group_id} FAILED HTTP {status}")
        return []
    return json.loads(body).get("list", []) or []


def direct_replays(key, group_id, sleep):
    """Direct (non-recursive) replays of a group. ?group= does not recurse."""
    url = BALLCHASING_API + "/replays?" + urllib.parse.urlencode(
        {"group": group_id, "count": "200"}
    )
    status, _, body = bc_get(key, url)
    time.sleep(sleep)
    if status != 200:
        log(f"  list replays of {group_id} FAILED HTTP {status}")
        return []
    return json.loads(body).get("list", []) or []


def walk_group(key, root_id, sleep):
    """Depth-first walk; return ordered, de-duplicated list of replay summaries."""
    stack = [(root_id, "")]
    seen = set()
    collected = []
    while stack:
        gid, path = stack.pop()
        for r in direct_replays(key, gid, sleep):
            rid = r.get("id")
            if rid and rid not in seen:
                seen.add(rid)
                r["_group_path"] = path
                collected.append(r)
        kids = child_groups(key, gid, sleep)
        # push reversed so traversal reads top-to-bottom in listed order
        for kid in reversed(kids):
            name = kid.get("name", kid.get("id"))
            stack.append((kid["id"], f"{path}/{name}" if path else name))
    return collected


def multipart_body(replay_bytes, filename):
    boundary = "----rocketsenseimport" + uuid.uuid4().hex
    nl = b"\r\n"
    parts = [
        b"--" + boundary.encode(),
        f'Content-Disposition: form-data; name="file"; filename="{filename}"'.encode(),
        b"Content-Type: application/octet-stream",
        b"",
        replay_bytes,
        b"--" + boundary.encode() + b"--",
        b"",
    ]
    return nl.join(parts), f"multipart/form-data; boundary={boundary}"


def upload_replay(base_url, token, replay_bytes, filename):
    body, content_type = multipart_body(replay_bytes, filename)
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": content_type,
        "Content-Length": str(len(body)),
    }
    url = base_url.rstrip("/") + "/api/v1/replays"
    return http("POST", url, headers, body, timeout=180)


def rs_post(base_url, token, path, payload):
    body = json.dumps(payload).encode()
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Content-Length": str(len(body)),
    }
    return http("POST", base_url.rstrip("/") + path, headers, body, timeout=120)


def load_state(path):
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    return {"uploaded": {}, "failed": {}, "group_id": None}


def save_state(path, state):
    tmp = path + ".tmp"
    with open(tmp, "w") as f:
        json.dump(state, f, indent=2)
    os.replace(tmp, path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root-group", required=True, help="ballchasing root group id")
    ap.add_argument("--name", required=True, help="rocket-sense replay group name")
    ap.add_argument("--description", default=None)
    ap.add_argument("--out-dir", default="/tmp/bc-group-import")
    ap.add_argument("--sleep", type=float, default=0.6, help="seconds between ballchasing calls")
    ap.add_argument("--dry-run", action="store_true", help="walk the tree, no download/upload")
    args = ap.parse_args()

    key = os.environ.get("BALLCHASING_API_KEY")
    if not key:
        sys.exit("BALLCHASING_API_KEY not set")
    base_url = os.environ.get("ROCKET_SENSE_BASE_URL", "https://rocket-sense.duckdns.org")
    token = os.environ.get("ROCKET_SENSE_TOKEN")
    if not args.dry_run and not token:
        sys.exit("ROCKET_SENSE_TOKEN not set (use --dry-run to skip)")

    os.makedirs(args.out_dir, exist_ok=True)
    state_path = os.path.join(args.out_dir, "state.json")
    state = load_state(state_path)

    log(f"Walking ballchasing group tree under {args.root_group} ...")
    summaries = walk_group(key, args.root_group, args.sleep)
    log(f"Found {len(summaries)} replays across the nested group.")
    for s in summaries:
        log(f"  {s['id']}  {s.get('_group_path','')}  {s.get('title','')}")

    if args.dry_run:
        return

    # Upload every replay; collect the rocket-sense replay ids.
    replay_ids = []
    for i, summary in enumerate(summaries, 1):
        rid = summary["id"]
        prev = state["uploaded"].get(rid)
        if prev and prev.get("rocket_sense_id"):
            replay_ids.append(prev["rocket_sense_id"])
            log(f"[{i}/{len(summaries)}] {rid} already uploaded -> {prev['rocket_sense_id']}")
            continue

        status, _, body = bc_get(key, f"{BALLCHASING_API}/replays/{rid}/file")
        if status != 200:
            log(f"[{i}/{len(summaries)}] download {rid} FAILED HTTP {status}")
            state["failed"][rid] = f"download {status}"
            save_state(state_path, state)
            time.sleep(args.sleep)
            continue

        up_status, _, up_body = upload_replay(base_url, token, body, f"{rid}.replay")
        if up_status in (200, 201):
            resp = json.loads(up_body)
            replay_id = resp.get("replay", {}).get("id")
            dedup = resp.get("deduplicated")
            replay_ids.append(replay_id)
            state["uploaded"][rid] = {"rocket_sense_id": replay_id, "dedup": dedup}
            state["failed"].pop(rid, None)
            log(f"[{i}/{len(summaries)}] {rid} -> {replay_id}"
                f"{' (dedup)' if dedup else ''}")
        else:
            log(f"[{i}/{len(summaries)}] upload {rid} FAILED HTTP {up_status}: {up_body[:200]!r}")
            state["failed"][rid] = f"upload {up_status}"
        save_state(state_path, state)
        time.sleep(args.sleep)

    replay_ids = [r for r in replay_ids if r]
    if not replay_ids:
        sys.exit("No replays uploaded; not creating a group.")

    # Create (or reuse) the rocket-sense replay group.
    group_id = state.get("group_id")
    if not group_id:
        payload = {"name": args.name}
        if args.description:
            payload["description"] = args.description
        status, _, body = rs_post(base_url, token, "/api/v1/replay-groups", payload)
        if status not in (200, 201):
            sys.exit(f"create group FAILED HTTP {status}: {body[:300]!r}")
        group_id = json.loads(body)["id"]
        state["group_id"] = group_id
        save_state(state_path, state)
        log(f"Created replay group {group_id} ({args.name!r})")
    else:
        log(f"Reusing replay group {group_id}")

    # Add the replays to the group (idempotent on the server side).
    status, _, body = rs_post(
        base_url, token,
        f"/api/v1/replay-groups/{group_id}/replays",
        {"replay_ids": replay_ids},
    )
    if status not in (200, 201):
        sys.exit(f"add replays FAILED HTTP {status}: {body[:300]!r}")
    result = json.loads(body)
    log(f"\nDone. group={group_id} "
        f"replays_uploaded={len(replay_ids)} "
        f"matched={result.get('matched_replays')} changed={result.get('changed_replays')} "
        f"group_replay_count={result.get('group', {}).get('replay_count')}")
    log(f"State: {state_path}")
    log(f"View: {base_url.rstrip('/')}/replays?group={group_id}")


if __name__ == "__main__":
    main()
