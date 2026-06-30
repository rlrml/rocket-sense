#!/usr/bin/env bash
#
# Bring up the rocket-sense outbound egress: a single userspace-WireGuard tunnel
# (onetun) to one Mullvad relay, exposing N local SOCKS5 ports — one per chosen
# exit relay via Mullvad's per-relay SOCKS5 proxies. One tunnel = one device
# slot, but as many distinct exit IPs as you list in EXIT_RELAYS.
#
# Feeds the `rocket-sense-egress` pool: the script prints the matching
# ROCKET_SENSE_EGRESS_PROXIES value (stderr) for the server to consume.
#
# Secrets: the WireGuard private key is read from `pass` at runtime and passed to
# onetun via the ONETUN_PRIVATE_KEY env var — never written to disk or argv.
#
# Prereqs: nix (provides onetun + dnsutils), curl, jq, pass, and a WG device
# already registered on the Mullvad account (see scripts/mullvad-egress-register.md
# or the rocket-sense-mullvad-egress-account memory).
#
# Usage:  scripts/mullvad-egress-onetun.sh
# Override any of the env vars below as needed.
set -euo pipefail

PASS_WG_KEY="${PASS_WG_KEY:-rocket-sense-mullvad-wg}"   # pass entry holding the WG private key (line 1)
SOURCE_PEER_IP="${SOURCE_PEER_IP:-10.75.82.134}"        # ipv4_address assigned when the device/key was registered
ENDPOINT_RELAY="${ENDPOINT_RELAY:-us-chi-wg-201}"       # relay whose WG endpoint the tunnel connects to
BASE_PORT="${BASE_PORT:-39001}"                         # first local SOCKS port; one per exit relay, incrementing

# Exit relays: one local SOCKS5 port each, in order from BASE_PORT. Each exits at
# that relay's IP. Pick for IP diversity; add/remove freely (no device cost).
EXIT_RELAYS=(${EXIT_RELAYS:-us-lax-wg-001 us-sea-wg-001 se-mma-wg-001 nl-ams-wg-001 de-fra-wg-001})

# Resolve the endpoint relay's public WG address + key from Mullvad's relay list.
relays_json="$(curl -fsS https://api.mullvad.net/app/v1/relays)"
read -r endpoint_ip endpoint_pubkey < <(
  printf '%s' "$relays_json" \
    | jq -r --arg h "$ENDPOINT_RELAY" '.wireguard.relays[] | select(.hostname==$h) | "\(.ipv4_addr_in) \(.public_key)"'
)
[ -n "$endpoint_ip" ] || { echo "endpoint relay $ENDPOINT_RELAY not found in relay list" >&2; exit 1; }

# Build onetun forwards + the egress-pool proxy list, resolving each relay's
# in-tunnel SOCKS IP from its public DNS name (e.g. se-mma-wg-socks5-001.relays.mullvad.net).
forwards=(); proxies=(); i=0
for r in "${EXIT_RELAYS[@]}"; do
  socks_host="${r/-wg-/-wg-socks5-}.relays.mullvad.net"
  socks_ip="$(getent ahostsv4 "$socks_host" | awk 'NR==1{print $1}')"
  [ -n "$socks_ip" ] || { echo "could not resolve SOCKS IP for $r ($socks_host)" >&2; exit 1; }
  port=$((BASE_PORT + i))
  forwards+=("127.0.0.1:${port}:${socks_ip}:1080")
  proxies+=("${r%-wg-*}=socks5h://127.0.0.1:${port}")
  i=$((i + 1))
done

echo "ROCKET_SENSE_EGRESS_PROXIES=$(IFS=,; echo "${proxies[*]}")" >&2
echo "tunnel: ${ENDPOINT_RELAY} (${endpoint_ip}:51820)  exits: ${#EXIT_RELAYS[@]}" >&2

export ONETUN_PRIVATE_KEY="$(pass show "$PASS_WG_KEY" | head -n1)"
export ONETUN_LOG="${ONETUN_LOG:-info}"
exec nix run nixpkgs#onetun -- \
  --endpoint-addr "${endpoint_ip}:51820" \
  --endpoint-public-key "$endpoint_pubkey" \
  --source-peer-ip "$SOURCE_PEER_IP" \
  --keep-alive 25 \
  "${forwards[@]}"
