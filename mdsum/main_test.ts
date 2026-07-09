// mdsum/main_test.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2024 Keith Maxwell
import { main, mdsum } from "./main.ts";
import { assertEquals } from "jsr:@std/assert@^1.0.14";
import { join } from "jsr:@std/path@^1.1.2";

const empty = "No tables found.";

Deno.test("1 + 1 = 2", () => {
  const result = mdsum(`

| A | B |
| --- | --- |
| 1 | X |
| 1 | Y |
| 1 | Z |
`);
  assertEquals(result, "2");
});

Deno.test("message if no tables found", () => {
  const result = mdsum("");
  assertEquals(result, empty);
});

Deno.test(
  `snapshot test against example.md`,
  async function (t): Promise<void> {
    const result: string = main([
      join(import.meta.dirname as string, "example.md"),
    ]);
    await t.assertSnapshot(result);
  },
);

Deno.test(
  `snapshot test against defaults`,
  async function (t): Promise<void> {
    const result: string = main([]);
    if (Deno.cwd() == import.meta.dirname) {
      await t.assertSnapshot(result);
    } else { // to allow running tests from the repository root
      assertEquals(result, empty);
    }
  },
);
