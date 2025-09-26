# mdcommands

## Features

- supports [indented] and [fenced] code blocks
- joins lines that use the backslash continuation character
- replaces multiple spaces with one space

### ZSH integration

1. Prompt to choose a code block with `fzf`
2. Print the code block on screen and allow abort
3. Add the code block to the ZSH history
4. Execute the code block

[indented]: https://spec.commonmark.org/0.31.2/#indented-code-blocks
[fenced]: https://spec.commonmark.org/0.31.2/#fenced-code-blocks

## Example usage

Command to install from GitHub:

    deno install --global --name mdcommands --allow-read \
        https://raw.githubusercontent.com/maxwell-k/mdcommands/main/mdcommands/main.ts

Command to print code blocks from [example.md](./example.md):

    mdcommands example.md

### ZSH integration

Install as above, then source the [mdcommand.zsh](./mdcommand.zsh) file, perhaps
in your `~/.zshrc`.

Command to run a code block from `example.md` and add it to your ZSH history:

    mdcommand example.md

Press the space bar to proceed or any other key to abort.

<!--
mdcommnds/README.md
Copyright Keith Maxwell
SPDX-License-Identifier: CC0-1.0
-->
