// mdcommands/mdcommands_test.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2024 Keith Maxwell
import { main, mdcommands } from "./main.ts";
import { assertEquals } from "jsr:@std/assert@^1.0.14";
import { assertSnapshot } from "jsr:@std/testing@^1.0.15/snapshot";
import { join } from "jsr:@std/path@^1.1.2";

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
  `snapshot test against example.md`,
  async function (t): Promise<void> {
    const result: string = main([
      join(import.meta.dirname as string, "example.md"),
    ]);
    await assertSnapshot<string>(t, result);
  },
);

Deno.test(
  `snapshot test against defaults`,
  async function (t): Promise<void> {
    const result: string = main([]);
    if (Deno.cwd() == import.meta.dirname) {
      await assertSnapshot<string>(t, result);
    } else { // to allow running tests from the repository root
      assertEquals(result, "");
    }
  },
);
