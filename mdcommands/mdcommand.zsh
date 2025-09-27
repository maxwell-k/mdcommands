# mdcommand.zsh
# SPDX-License-Identifier: MPL-2.0
# Copyright 2024 Keith Maxwell
[ -n "${ZSH_VERSION:-}" ] || return 0

mdcommand-widget() {
  LBUFFER="$(command mdcommands $LBUFFER | fzf --layout=reverse)"
  zle reset-prompt
}
zle -N mdcommand-widget
bindkey -M viins '^N' mdcommand-widget
