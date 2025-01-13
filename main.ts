// main.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2024 Keith Maxwell

import { marked, Token } from "marked";
import { EOL } from "@std/fs";

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
  const [file] = args;
  const result: string[] = mdcommands(Deno.readTextFileSync(file));
  return result.join(EOL);
}

if (import.meta.main) console.log(main(Deno.args));
