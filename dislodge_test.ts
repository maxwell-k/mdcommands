// dislodge_test.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2025 Keith Maxwell
import { main } from "./dislodge.ts";
import { assertEquals } from "jsr:@std/assert";
import { join } from "jsr:@std/path/join";

Deno.test("end to end test with a fenced code block", async (t) => {
  const directory = await Deno.makeTempDir({ dir: "./.tmp" });
  const input = join(directory, "README.md");
  const output = join(directory, "example.txt");
  await t.step(`write ${input}`, async () => {
    await Deno.writeTextFile(
      input,
      "<!-- embedme example.txt -->\n" +
        "\n" +
        "```\n" +
        "1\n" +
        "```\n",
    );
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
  await t.step(`check 2 files in ${directory}`, async () => {
    let files = 0;
    for await (const _ of Deno.readDir(directory)) files++;
    assertEquals(files, 2);
  });
  await t.step(`clean up ${directory}`, async () => {
    await Deno.remove(directory, { recursive: true });
  });
});
Deno.test("end to end test with indented code block", async (t) => {
  const directory = await Deno.makeTempDir({ dir: "./.tmp" });
  const input = join(directory, "README.md");
  const output = join(directory, "example.txt");
  await t.step(`write ${input}`, async () => {
    await Deno.writeTextFile(
      input,
      "<!-- embedme example.txt -->\n" +
        "\n" +
        "    1\n" +
        "\n",
    );
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
Deno.test("end to end test on current working directory", () => {
  const result: string = main([]);
  assertEquals(result, "");
});
