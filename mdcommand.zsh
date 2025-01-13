# mdcommand.zsh
# SPDX-License-Identifier: MPL-2.0
# Copyright 2024 Keith Maxwell
[ -n "${ZSH_VERSION:-}" ] || return 0

mdcommand() {
  local block="$(command mdcommands $@ | fzf)"

  printf '%% %s\n' "$block"
  read -q "REPLY?Abort? "
  if [ "$REPLY" = "n" ] ; then
    print -S "$block"
    eval "$block"
  else
    printf "Aborted."
  fi
}
