// minutesspent/main_test.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2025 Keith Maxwell
import { main } from "./main.ts";
import { assertEquals } from "jsr:@std/assert@^1.0.14";

Deno.test.each([
  ["", "0000"],
  ["I spent 30 minutes.", "0030"],
  ["I spent 60 minutes.", "0100"],
  ["I spent approximately 60 minutes.", "0100"],
  ["I spent approximately\n60 minutes.", "0100"],
])(`main(%i) is %i`, (a, expected) => {
  assertEquals(main(a), expected);
});
