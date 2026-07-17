# mdsum

Sum the integers in the first column of all markdown tables in a file.

# Example usage

Command to install from the root of a local repository:

    deno install --global --allow-read --no-config mdsum/main.ts

Command to install from GitHub:

    deno install --global --allow-read --no-config \
        https://raw.githubusercontent.com/maxwell-k/mdcommands/main/mdsum/main.ts

Command to sum the integerers in the first column of all markdown tables in
`example.md`:

    mdsum example.md

For example if a file contains the following table then this command will output
`3`.

|  M. | Narrative      |
| --: | -------------- |
|   1 | Example        |
|   2 | Second example |
|   3 | Ignored        |

Command to uninstall:

    deno uninstall --global mdsum

<!--
mdsum/README.md
SPDX-License-Identifier: CC0-1.0
Copyright 2024 Keith Maxwell
-->
<!-- vim: set nospell : -->
