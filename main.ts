// main.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2024 Keith Maxwell

import { marked, Token } from "npm:marked@16";
import { EOL } from "jsr:@std/fs/eol";

export function mdcommands(markdown: string): string[] {
  const walkTokens = (token: Token) => {
    if (token.type === "code") {
      const text = token.text.replaceAll("\\\n", "").replaceAll(/ +/g, " ");
      result.push(...text.split(/\r?\n/));
    }
  };

  const result: string[] = [];
  marked.use({ walkTokens });
  marked.parse(markdown);
  return result;
}

export function main(args: string[]): string {
  const [file] = args.length ? args : ["README.md"];
  const result: string[] = mdcommands(Deno.readTextFileSync(file));
  return result.join(EOL);
}

if (import.meta.main) console.log(main(Deno.args));
