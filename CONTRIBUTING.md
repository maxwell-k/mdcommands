## Commit messages

Please follow the [@commitlint/config-conventional] conventions document for
your commit messages.

To run `commitlint` locally I recommend Podman, see
[`.github/workflows/commitlint.yaml`](/.github/workflows/commitlint.yaml).

[@commitlint/config-conventional]:
  https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional

## Test suite

Command to run the linter and test suite:

    deno task all

Command to update the [snapshot] tests:

    cd mdcommands && deno test -P --allow-write -- --update

[snapshot]: https://jsr.io/@std/testing/doc/snapshot

Please maintain branch and line test coverage at 100%.

## Install locally

Command to install from a local clone:

    deno install --global --name mdcommands --allow-read $PWD/main.ts

<!--
CONTRIBUTING.md
Copyright Keith Maxwell
SPDX-License-Identifier: CC0-1.0
-->
