//! Helpers for sourcing [`ExitConfig`]s from Mullvad's per-relay SOCKS5 proxies.
//!
//! Every Mullvad WireGuard relay runs a SOCKS5 proxy on port [`RELAY_SOCKS_PORT`]
//! that is reachable *from inside any other relay's tunnel*, each with a distinct
//! exit IP. So a single WireGuard tunnel (one of your 5 device slots) yields as
//! many exit IPs as there are relays — no second handshake, no extra device.
//!
//! Two deployment shapes, both fed by these helpers:
//!
//! * **Kernel WireGuard** (`wg-mullvad` up, AllowedIPs covering the relay
//!   subnet): point exits straight at the relay SOCKS hostnames with
//!   [`exits_via_relay_hosts`]. Needs `NET_ADMIN` on the host/pod.
//!
//! * **Userspace WireGuard, rootless** (`onetun`): run one tunnel and forward a
//!   local port per relay to that relay's in-tunnel SOCKS IP with
//!   [`onetun_forward_args`], then point exits at the local ports via
//!   [`exits_via_local_ports`]. No root, no `NET_ADMIN` — drops into an existing
//!   container.
//!
//! The relay codenames and their in-tunnel SOCKS IPs come from Mullvad's relay
//! list: `https://api.mullvad.net/app/v1/relays` (each WireGuard relay carries a
//! `hostname` like `nl-ams-wg-001` and a `socks_name` / `ipv4_addr_in`). This
//! module deliberately does not fetch that list itself — pass the relays you've
//! selected.

use crate::ExitConfig;

/// Port every Mullvad relay's SOCKS5 proxy listens on.
pub const RELAY_SOCKS_PORT: u16 = 1080;

/// The in-tunnel SOCKS5 hostname for a WireGuard relay codename.
///
/// Mullvad derives the SOCKS hostname from the relay codename by inserting
/// `socks5` into the `-wg-` segment, e.g. `nl-ams-wg-001` →
/// `nl-ams-wg-socks5-001.relays.mullvad.net`.
pub fn relay_socks_host(wg_codename: &str) -> String {
    let stem = wg_codename.replace("-wg-", "-wg-socks5-");
    format!("{stem}.relays.mullvad.net")
}

/// Build exits that target relay SOCKS hostnames directly (kernel-WireGuard
/// mode). Requires the `wg-mullvad` interface up with the relay subnet routed.
///
/// Uses the `socks5h` scheme so DNS resolves through the tunnel.
pub fn exits_via_relay_hosts<I, S>(wg_codenames: I) -> Vec<ExitConfig>
where
    I: IntoIterator<Item = S>,
    S: AsRef<str>,
{
    wg_codenames
        .into_iter()
        .map(|codename| {
            let codename = codename.as_ref();
            let host = relay_socks_host(codename);
            ExitConfig::proxy(codename, format!("socks5h://{host}:{RELAY_SOCKS_PORT}"))
        })
        .collect()
}

/// One relay's coordinates for the rootless (`onetun`) mode.
#[derive(Clone, Debug)]
pub struct RelaySocks {
    /// Relay codename, used as the exit label (e.g. `nl-ams-wg-001`).
    pub codename: String,
    /// The relay's in-tunnel SOCKS IPv4 (`ipv4_addr_in` from the relay list,
    /// e.g. `10.124.0.4`). `onetun` forwards to this address; it is only
    /// reachable while the WireGuard tunnel is up.
    pub socks_ipv4: String,
}

impl RelaySocks {
    pub fn new(codename: impl Into<String>, socks_ipv4: impl Into<String>) -> Self {
        Self {
            codename: codename.into(),
            socks_ipv4: socks_ipv4.into(),
        }
    }
}

/// Build the `onetun` positional forward arguments that expose each relay's
/// in-tunnel SOCKS proxy on a local port, starting at `base_port`.
///
/// The relay at index `i` is forwarded to `127.0.0.1:{base_port + i}`. Feed the
/// matching exits to the pool with [`exits_via_local_ports`] using the same
/// `base_port` and relay order.
///
/// ```
/// # use rocket_sense_egress::mullvad::{onetun_forward_args, RelaySocks};
/// let relays = vec![
///     RelaySocks::new("se-mma-wg-001", "10.124.0.2"),
///     RelaySocks::new("nl-ams-wg-001", "10.124.0.4"),
/// ];
/// let args = onetun_forward_args(&relays, 9001);
/// assert_eq!(
///     args,
///     vec!["127.0.0.1:9001:10.124.0.2:1080", "127.0.0.1:9002:10.124.0.4:1080"]
/// );
/// // Then: onetun --endpoint-addr <relay>:51820 --endpoint-public-key ... \
/// //              --private-key ... --source-peer-ip 10.x.x.x <args...>
/// ```
pub fn onetun_forward_args(relays: &[RelaySocks], base_port: u16) -> Vec<String> {
    relays
        .iter()
        .enumerate()
        .map(|(i, relay)| {
            let local_port = base_port + i as u16;
            format!(
                "127.0.0.1:{local_port}:{}:{RELAY_SOCKS_PORT}",
                relay.socks_ipv4
            )
        })
        .collect()
}

/// Build exits pointing at the local ports that `onetun` exposes, matching
/// [`onetun_forward_args`] called with the same `relays` and `base_port`.
pub fn exits_via_local_ports(relays: &[RelaySocks], base_port: u16) -> Vec<ExitConfig> {
    relays
        .iter()
        .enumerate()
        .map(|(i, relay)| {
            let local_port = base_port + i as u16;
            ExitConfig::proxy(
                relay.codename.clone(),
                format!("socks5h://127.0.0.1:{local_port}"),
            )
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn socks_hostname_is_derived_from_codename() {
        assert_eq!(
            relay_socks_host("nl-ams-wg-001"),
            "nl-ams-wg-socks5-001.relays.mullvad.net"
        );
        assert_eq!(
            relay_socks_host("se-mma-wg-101"),
            "se-mma-wg-socks5-101.relays.mullvad.net"
        );
    }

    #[test]
    fn hostname_exits_use_socks5h_scheme() {
        let exits = exits_via_relay_hosts(["nl-ams-wg-001"]);
        assert_eq!(exits.len(), 1);
        assert_eq!(exits[0].name, "nl-ams-wg-001");
        assert_eq!(
            exits[0].proxy.as_deref(),
            Some("socks5h://nl-ams-wg-socks5-001.relays.mullvad.net:1080")
        );
    }

    #[test]
    fn onetun_args_and_exits_line_up_by_port() {
        let relays = vec![
            RelaySocks::new("se-mma-wg-001", "10.124.0.2"),
            RelaySocks::new("nl-ams-wg-001", "10.124.0.4"),
        ];
        let args = onetun_forward_args(&relays, 9001);
        assert_eq!(
            args,
            vec![
                "127.0.0.1:9001:10.124.0.2:1080",
                "127.0.0.1:9002:10.124.0.4:1080",
            ]
        );

        let exits = exits_via_local_ports(&relays, 9001);
        assert_eq!(exits[0].proxy.as_deref(), Some("socks5h://127.0.0.1:9001"));
        assert_eq!(exits[1].proxy.as_deref(), Some("socks5h://127.0.0.1:9002"));
    }
}
