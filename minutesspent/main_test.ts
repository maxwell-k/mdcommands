#!/usr/bin/env node
// minutesspent/main_test.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2026 Keith Maxwell
import assert from "node:assert/strict";
import { test } from "node:test";
import { spawnSync } from "node:child_process";

import { main } from "./main.ts";

const cases: [string, string][] = [
  ["", "0000"],
  ["I spent 30 minutes.", "0030"],
  ["I spent 60 minutes.", "0100"],
  ["I spent approximately 60 minutes.", "0100"],
  ["I spent approximately\n60 minutes.", "0100"],
];

for (const [input, expected] of cases) {
  test(`main(${JSON.stringify(input)}) is ${expected}`, () => {
    assert.equal(main(input), expected);
  });
}

test("./main.ts on 'I spent 90 minutes.' is '0130\\n'", () => {
  const result = spawnSync(process.execPath, ["./main.ts"], {
    input: "I spent 90 minutes.\n",
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout, "0130\n");
  assert.equal(result.stderr, "");
});
