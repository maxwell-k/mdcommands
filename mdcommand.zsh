# mdcommand.zsh
# SPDX-License-Identifier: MPL-2.0
# Copyright 2024 Keith Maxwell
[ -n "${ZSH_VERSION:-}" ] || return 0

mdcommand() {
  local block="$(command mdcommands $@ | fzf --layout=reverse)"
  if [ -z "$block" ] ; then
    printf '\nInterrupted.\n'
    return 1
  fi

  printf '%% %s\n' "$block"
  read -s -k "REPLY?Press [Space] to continue or any other key to abort."
  if [ "$REPLY" != " " ] ; then
    printf '\nAborted.\n'
    return 1
  fi

  print -S "$block"
  printf '\n'
  eval "$block"
}
