#!/usr/bin/env bash
#
# Container entrypoint for rocket-sense-server.
#
# If a Mullvad WireGuard private key is provided, this brings up a userspace
# WireGuard tunnel (onetun) in the background — one local SOCKS5 port per exit
# relay — and points the egress pool at those ports, so ballchasing downloads
# rotate across Mullvad exit IPs with no sidecar, no extra image, and no edits
# to the Deployment manifest. onetun is userspace, so the pod needs no NET_ADMIN
# / tun / privilege. If no key is provided, the server starts exactly as before
# (direct egress, or whatever ROCKET_SENSE_EGRESS_PROXIES is set to).
#
# The only prod inputs that can't be defaulted (provide via a k8s Secret):
#   ROCKET_SENSE_MULLVAD_WG_PRIVATE_KEY   the device WG private key (enables the tunnel)
#   ROCKET_SENSE_MULLVAD_SOURCE_PEER_IP   the device's assigned tunnel IP (e.g. 10.75.82.134)
#
# Everything else has a baked default and can be overridden via env:
#   ROCKET_SENSE_MULLVAD_ENDPOINT_ADDR    relay WG endpoint (default us-chi-wg-201)
#   ROCKET_SENSE_MULLVAD_ENDPOINT_PUBKEY  that relay's public key
#   ROCKET_SENSE_MULLVAD_EXIT_RELAYS      comma-separated exit relay codenames
#   ROCKET_SENSE_MULLVAD_BASE_PORT        first local SOCKS port (default 39001)
set -euo pipefail

SERVER_BIN="${ROCKET_SENSE_SERVER_BIN:-rocket-sense-server}"

start_tunnel() {
  local source_peer_ip endpoint_addr endpoint_pubkey base_port relays_csv
  source_peer_ip="${ROCKET_SENSE_MULLVAD_SOURCE_PEER_IP:?required when ROCKET_SENSE_MULLVAD_WG_PRIVATE_KEY is set}"
  endpoint_addr="${ROCKET_SENSE_MULLVAD_ENDPOINT_ADDR:-87.249.134.1:51820}"
  endpoint_pubkey="${ROCKET_SENSE_MULLVAD_ENDPOINT_PUBKEY:-+Xx2mJnoJ+JS11Z6g8mp6aUZV7p6DAN9ZTAzPaHakhM=}"
  base_port="${ROCKET_SENSE_MULLVAD_BASE_PORT:-39001}"
  relays_csv="${ROCKET_SENSE_MULLVAD_EXIT_RELAYS:-us-lax-wg-001,us-sea-wg-001,se-mma-wg-001,nl-ams-wg-001,de-fra-wg-001}"

  local relays=() forwards=() proxies=() port i=0 r socks_host socks_ip
  IFS=',' read -ra relays <<<"$relays_csv"
  for r in "${relays[@]}"; do
    r="${r// /}"
    [ -n "$r" ] || continue
    socks_host="${r/-wg-/-wg-socks5-}.relays.mullvad.net"
    socks_ip=""
    # Mullvad publishes each relay's in-tunnel SOCKS IP via public DNS; retry a
    # few times in case cluster DNS isn't ready yet at container start.
    for _ in 1 2 3 4 5; do
      socks_ip="$(dig +short "$socks_host" | head -1 || true)"
      [ -n "$socks_ip" ] && break
      sleep 2
    done
    if [ -z "$socks_ip" ]; then
      echo "entrypoint: WARN could not resolve SOCKS IP for $r ($socks_host); skipping" >&2
      continue
    fi
    port=$((base_port + i))
    forwards+=("127.0.0.1:${port}:${socks_ip}:1080")
    proxies+=("${r%-wg-*}=socks5h://127.0.0.1:${port}")
    i=$((i + 1))
  done

  if [ "${#forwards[@]}" -eq 0 ]; then
    echo "entrypoint: FATAL Mullvad tunnel requested but no exit relays resolved" >&2
    exit 1
  fi

  ROCKET_SENSE_EGRESS_PROXIES="$(
    IFS=','
    echo "${proxies[*]}"
  )"
  export ROCKET_SENSE_EGRESS_PROXIES
  export ONETUN_PRIVATE_KEY="$ROCKET_SENSE_MULLVAD_WG_PRIVATE_KEY"
  export ONETUN_LOG="${ONETUN_LOG:-info}"

  echo "entrypoint: starting onetun tunnel via ${endpoint_addr} with ${#forwards[@]} exit(s): ${ROCKET_SENSE_EGRESS_PROXIES}" >&2
  # Supervise: if onetun dies, restart it so the proxies recover.
  (
    while true; do
      onetun \
        --endpoint-addr "$endpoint_addr" \
        --endpoint-public-key "$endpoint_pubkey" \
        --source-peer-ip "$source_peer_ip" \
        --keep-alive 25 \
        "${forwards[@]}" || true
      echo "entrypoint: onetun exited; restarting in 3s" >&2
      sleep 3
    done
  ) &
}

if [ -n "${ROCKET_SENSE_MULLVAD_WG_PRIVATE_KEY:-}" ]; then
  start_tunnel
else
  echo "entrypoint: no Mullvad WG key set; starting server with direct/explicit egress" >&2
fi

exec "$SERVER_BIN"
