let
  imalisonKeys = [
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOOFkA5JZkq8mRd7St0jP2P6WyYYhW2CChmQoY20N45f imalison@ryzen-shine"
    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDUSkj7587e+MAUNyU/KRpw9Vk++53Wv5nB+0V1QgiTO3rMQe6HJt0Tm2wi/o/T8GNjueT2D69YgkqOIF1FQwsj2EFLObcMzeBgs5gTSglqggA2I91BIc1vvgjCDpogOMAzAQGlTxRnqrEXhqG0jJtw8KIzLr9WrvWLdTT4rHtWS8RoOBgkQ8oxbggZ4vtbMBIwoIAYGRr70KBRNCsLTPLa8yEf+DDQxq1entzxSjHXHgyeBSVVpPCrBVmhjandk+lIFInjvAiAE1ZkJHSRccL73ORmgb1crwH7xlD9NwBPmypowMi8UIRMKfL2lNehT0AQIlEAikUBLMDzPIPhnwLZ imalison@nixos"
  ];
  railbirdSfKeys = [
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDozY/3Cd9npaYPCgIn/E7MjW9c7Zb5/wTO5Qi7yRU45 root@railbird-sf"
  ];
in {
  "rocket-sense.env.age".publicKeys = imalisonKeys ++ railbirdSfKeys;
}
