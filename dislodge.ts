// main.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2024 Keith Maxwell

import { marked, Token } from "npm:marked@15";
import { EOL } from "jsr:@std/fs@1/eol";
import { dirname } from "jsr:@std/path";
import { join } from "jsr:@std/path/join";

// https://github.com/zakhenry/embedme/blob/master/src/embedme.lib.ts#L458
const marker = /<!--\s*?embedme[ ]+?(\S+?)\s*?-->/;

export function main(args: string[]): string {
  const [file] = args.length ? args : ["README.md"];
  const markdown: string = Deno.readTextFileSync(file);
  const result: string[] = [];

  let path: string | null = null;
  const walkTokens = (token: Token) => {
    if (path && token.type === "code") {
      // use replace to guarantee a string, match may return null
      const contents = token.raw.replace(/^```.*\n/, "").replace(/```\n$/, "");
      Deno.writeTextFileSync(path, contents);
      result.push(`Wrote ${contents.length} characters to ${path}`);
      path = null;
    } else if (token.type === "html") {
      const match = token.raw.match(marker);
      if (match) path = join(dirname(file), match[1]);
    }
  };

  marked.use({ walkTokens });
  marked.parse(markdown);
  return result.join(EOL);
}

if (import.meta.main) console.log(main(Deno.args));
