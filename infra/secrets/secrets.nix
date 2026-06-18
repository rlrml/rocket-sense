let
  keys = import /srv/dotfiles/nixos/keys.nix;
  unique = publicKeys:
    builtins.attrNames (builtins.listToAttrs (map (key: {
      name = key;
      value = true;
    }) publicKeys));
in {
  "rocket-sense.env.age".publicKeys = unique (keys.agenixKeys ++ keys.railbird-sf);
}
