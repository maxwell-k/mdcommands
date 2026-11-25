#!/usr/bin/env node
// Read the version number from package.json (a) and outputs a new version
// number (b)
import { readFileSync } from "node:fs";

const input: string = "package.json";
const format = /^(\d+)\.(\d+)\.(\d+)/; // YYYY.M.PATCH

const a: string = JSON.parse(readFileSync(input, "utf8")).version;
const matches = a.match(format);
if (!matches) throw new Error(`Unrecognised version: ${a}`);
const [aYear, aMonth, aPatch] = matches.slice(1).map(Number);

const now = new Date();
const bYear = now.getUTCFullYear();
const bMonth = now.getUTCMonth() + 1;

if (aYear > bYear || (aYear === bYear && aMonth > bMonth)) {
  throw new Error(
    `package.json version ${a} is ahead of current date ${bYear}.${bMonth}`,
  );
}

const sameMonth = aYear === bYear && aMonth === bMonth;
const bPatch = sameMonth ? aPatch + 1 : 0;
console.log(`${bYear}.${bMonth}.${bPatch}`);
