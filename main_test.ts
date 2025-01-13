// mdcommands_test.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2024 Keith Maxwell
import { main, mdcommands } from "./main.ts";
import { assertEquals } from "@std/assert";
import { assertSnapshot } from "@std/testing/snapshot";

Deno.test("indented code block test", () => {
  const result = mdcommands(`
Paragraph:

    indented code block
`);
  assertEquals(result, ["indented code block"]);
});

Deno.test("fenced code block test", () => {
  const result = mdcommands(`
Paragraph:

\`\`\`
fenced code block
\`\`\`
`);
  assertEquals(result, ["fenced code block"]);
});

Deno.test("joins lines that use the backslash continuation character", () => {
  const result = mdcommands(`
Paragraph:


    echo \
      1 \
      2 \
      3
    echo 4

`);
  assertEquals(result, ["echo 1 2 3", "echo 4"]);
});

Deno.test(
  "snapshot test against example.md",
  async function (t): Promise<void> {
    const result: string = main(["example.md"]);
    await assertSnapshot<string>(t, result);
  },
);
