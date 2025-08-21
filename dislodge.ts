// main.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2024 Keith Maxwell

import { marked, Token } from "npm:marked@16";
import { EOL } from "jsr:@std/fs/eol";
import { dirname } from "jsr:@std/path";
import { join } from "jsr:@std/path/join";

// https://github.com/zakhenry/embedme/blob/master/src/embedme.lib.ts#L458
const marker = /<!--\s*?embedme[ ]+?(\S+?)\s*?-->/;

export function main(args: string[]): string {
  const [file] = args.length ? args : ["README.md"];
  const markdown: string = Deno.readTextFileSync(file);

  type Block = [
    path: string,
    data: string,
  ];
  const blocks: Block[] = [];

  let path: string | null = null;
  const walkTokens = (token: Token) => {
    if (path && token.type === "code") {
      blocks.push([path, token.text + "\n"]);
      path = null;
    } else if (token.type === "html") {
      const match = token.raw.match(marker);
      if (match) path = join(dirname(file), match[1]);
    }
  };

  marked.use({ walkTokens });
  marked.parse(markdown);

  for (const block of blocks) Deno.writeTextFileSync(...block);
  return blocks.map(([path, data]) =>
    `Wrote ${data.length} characters to ${path}`
  ).join(EOL);
}

// deno-coverage-ignore
if (import.meta.main) console.log(main(Deno.args));
