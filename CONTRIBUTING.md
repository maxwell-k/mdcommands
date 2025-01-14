## Commit messages

Please follow the [@commitlint/config-conventional] conventions document for
your commit messages.

To run `commitlint` locally I recommend Podman, see
[`.github/workflows/commitlint.yaml`](/.github/workflows/commitlint.yaml).

[@commitlint/config-conventional]:
  https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional

## Test suite

Command to run the test suite:

    deno task test

Command to update the [snapshot] tests:

    deno test --allow-all -- --update

[snapshot]: https://jsr.io/@std/testing/doc/snapshot

<!--
CONTRIBUTING.md
Copyright Keith Maxwell
SPDX-License-Identifier: CC0-1.0
-->
