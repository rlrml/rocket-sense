# rocket-sense-egress

Round-robin HTTP egress over a pool of SOCKS5 exits, with per-exit cooldown and
token-bucket throttling. Built so rate-limited / ban-prone upstreams (currently
the ballchasing.com replay-file proxy) rotate across many exit IPs and back off a
parked exit instead of hammering one address into a ban.

The crate is **provider-agnostic**: it only ever sees a list of SOCKS5 proxy
URLs (or direct egress). The intended IP source is **Mullvad's per-relay SOCKS5
proxies**, but nothing here is Mullvad-specific except the `mullvad` helper
module.

## Why Mullvad's per-relay SOCKS5 is the whole trick

Every Mullvad WireGuard relay runs a SOCKS5 proxy on port `1080` that is
reachable *from inside any other relay's tunnel*, each with a distinct exit IP.
So you bring up **one** WireGuard tunnel (one of your 5 device slots) and get
**hundreds** of exit IPs as SOCKS5 endpoints — no second handshake, no extra
device, and the 5-device account limit never becomes a constraint.

`reqwest` only supports one proxy per client and cannot chain SOCKS-over-SOCKS,
so the tunnel has to make each relay's SOCKS proxy look like a *single* proxy
from reqwest's point of view. Two ways to do that:

### Rootless: userspace WireGuard via `onetun` (recommended)

Run one `onetun` process that forwards a local port per relay to that relay's
in-tunnel SOCKS IP. No root, no `NET_ADMIN` — drops straight into the existing
container.

```sh
# One tunnel, N local SOCKS ports (one per relay).
onetun \
  --endpoint-addr <relay-endpoint>:51820 \
  --endpoint-public-key <relay-pubkey> \
  --private-key <your-wg-private-key> \
  --source-peer-ip 10.x.x.x \
  127.0.0.1:9001:10.124.0.2:1080 \   # se-mma  -> local 9001
  127.0.0.1:9002:10.124.0.4:1080     # nl-ams  -> local 9002
```

Then point the pool at the local ports:

```sh
ROCKET_SENSE_EGRESS_PROXIES="se-mma=socks5h://127.0.0.1:9001,nl-ams=socks5h://127.0.0.1:9002"
```

`mullvad::onetun_forward_args` and `mullvad::exits_via_local_ports` generate the
forward specs and the matching `ROCKET_SENSE_EGRESS_PROXIES` entries from a list
of relays (codename + `ipv4_addr_in`), keeping the ports lined up.

### Kernel WireGuard

Bring up `wg-mullvad` with `AllowedIPs` covering the relay subnet, then target
relay SOCKS hostnames directly — `mullvad::exits_via_relay_hosts` /
`ROCKET_SENSE_EGRESS_MULLVAD_RELAYS`. Cleanest at the Rust layer, but the pod
needs `NET_ADMIN`.

Relay codenames and their in-tunnel SOCKS IPs come from Mullvad's relay list:
`https://api.mullvad.net/app/v1/relays`.

## Server configuration (env)

Exit source — first match wins; otherwise a single **direct** exit (today's
behavior, unchanged):

| Variable | Meaning |
| --- | --- |
| `ROCKET_SENSE_EGRESS_PROXIES` | Comma-separated `socks5h://host:port`, each optionally `name=url`. |
| `ROCKET_SENSE_EGRESS_MULLVAD_RELAYS` | Comma-separated WG relay codenames (kernel-WG mode). |

Policy knobs (all optional):

| Variable | Default | Meaning |
| --- | --- | --- |
| `ROCKET_SENSE_EGRESS_PER_EXIT_RPS` | `1.0` | Sustained requests/sec per exit IP. |
| `ROCKET_SENSE_EGRESS_PER_EXIT_BURST` | `2.0` | Burst allowance per exit. |
| `ROCKET_SENSE_EGRESS_COOLDOWN_SECS` | `60` | Park duration after a 429/403/503 or transport error. |
| `ROCKET_SENSE_EGRESS_MAX_ATTEMPTS` | `4` | Exits tried per request before giving up. |

Always use the `socks5h` scheme (not `socks5`) so DNS resolves through the
tunnel — otherwise you leak your real resolver/region alongside a rotated IP.

## Verifying exits are live and distinct

`EgressPool::observed_exit_ips("https://am.i.mullvad.net/ip")` probes each exit
and returns the IP it observed, so you can confirm at startup that the exits are
up and that no two collapse to the same address.
