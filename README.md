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

Command to install:

    deno install --global --name mdcommands --allow-read \
        https://raw.githubusercontent.com/maxwell-k/mdcommands/main/main.ts

Command to print code blocks from [example.md](/example.md):

    mdcommands example.md

### ZSH integration

Install as above, then source the [mdcommand.zsh](/mdcommand.zsh) file, perhaps
in your `~/.zshrc`.

Command to run a code block from `example.md` and add it to your ZSH history:

    mdcommand example.md

Press `y` or `Y` to abort and any other key to proceed.

## Dependencies

- [Deno](https://deno.com/)

For ZSH integration:

- [fzf](https://junegunn.github.io/fzf/)
- [zsh](https://www.zsh.org/)

## Prior art

- <https://core.pipedown.dev/>
- <https://github.com/aaronmyatt/pipedown>
- <https://github.com/earldouglas/codedown/>
- <https://github.com/eclecticiq/rundoc>
- <https://github.com/jacobdeichert/mask>
- <https://github.com/stateful/runme/>

<!--
README.md
Copyright Keith Maxwell
SPDX-License-Identifier: CC0-1.0
-->
