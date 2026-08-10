// minutesspent/main.ts
// SPDX-License-Identifier: MPL-2.0
// Copyright 2026 Keith Maxwell

import { marked, Token, Tokens } from "npm:marked@18";

const pattern = /I\s+spent\s+(?:approximately\s+)?([0-9]+)\s+minutes/g;

function spent(markdown: string): number {
  let minutes: number = 0;
  const walkTokens = (token: Token) => {
    if (token.type == "paragraph") {
      const paragraph = token as Tokens.Paragraph;
      for (const match of paragraph.text.matchAll(pattern)) {
        minutes += Number(match[1]);
      }
    }
  };

  marked.use({ walkTokens });
  marked.parse(markdown);

  return minutes;
}

export function main(input: string): string {
  const minutes = spent(input);
  const pad = (i: number) => i.toString().padStart(2, "0");
  return pad(Math.floor(minutes / 60)) + pad(minutes % 60);
}

// deno-coverage-ignore-start
if (import.meta.main) {
  console.log(main(await new Response(Deno.stdin.readable).text()));
}
// deno-coverage-ignore-stop
