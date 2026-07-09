// mdsum/main.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2026 Keith Maxwell

import { marked, Token, Tokens } from "npm:marked@18";

export function mdsum(markdown: string): string {
  let found: boolean = false;
  let total: number = 0;
  const walkTokens = (token: Token) => {
    if (token.type === "table") {
      const data: Tokens.TableCell[][] = token.rows.slice(0, -1);
      const minutes: number[] = data.map((row) => parseInt(row[0].text, 10));
      total += minutes.reduce((sum, value) => sum + value, 0);
      found = true;
    }
  };

  marked.use({ walkTokens });
  marked.parse(markdown);
  return found ? String(total) : "No tables found.";
}

export function main(args: string[]): string {
  const [file] = args.length ? args : ["README.md"];
  const result: string = mdsum(Deno.readTextFileSync(file));
  return result;
}

// deno-coverage-ignore
if (import.meta.main) console.log(main(Deno.args));
