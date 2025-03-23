// dislodge_test.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2025 Keith Maxwell
import { main } from "./dislodge.ts";
import { assertEquals } from "jsr:@std/assert@1";
import { join } from "jsr:@std/path/join";

const tmpdir = "./.tmp";
const fixture_one = "<!-- embedme example.txt -->\n" +
  "\n" +
  "```\n" +
  "1\n" +
  "```\n";
Deno.test("end to end test", async (t) => {
  const directory = await Deno.makeTempDir({ dir: tmpdir });
  const input = join(directory, "README.md");
  const output = join(directory, "example.txt");
  await t.step(`write ${input}`, async () => {
    await Deno.writeTextFile(input, fixture_one);
  });
  await t.step(`process ${input}`, () => {
    const result: string = main([input]);
    const expected = `Wrote 2 characters to ${output}`;
    assertEquals(result, expected);
  });
  await t.step(`check ${output}`, async () => {
    const contents = await Deno.readTextFile(output);
    assertEquals(contents, "1\n");
  });
  await t.step(`clean up ${directory}`, async () => {
    await Deno.remove(directory, { recursive: true });
  });
});
