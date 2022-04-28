import path from "path";
import fs from "fs";
import Table from "cli-table";
import { performance } from "perf_hooks";
import { execSync } from "child_process";

import { testsConfig } from "./config";
import type { TestConfig, TestConfigItem } from "./config";

const rootDir = path.join(process.cwd(), "../..");
const contentDir = path.join(rootDir, "content");
const warmFilename = "warm-file.md";
const warmFileSrc = path.join(process.cwd(), warmFilename);
const warmFileDest = path.join(contentDir, warmFilename);
const config: TestConfig = testsConfig(rootDir);

type TestOutputItem = {
  name: string;
  cold: number;
  warm: number;
};

type TestOutput = TestOutputItem[];

let output: TestOutput = [];

function msToS(ms: number): number {
  const s = ms / 1000.0;
  return Math.round(s * 100) / 100;
}

function getAverage(results: TestOutputItem[], key: "cold" | "warm"): number {
  return results.reduce((prev, curr) => prev + curr[key], 0) / results.length;
}

function runTest(config: TestConfigItem): TestOutputItem {
  // Delete cache items.
  for (const cacheItem of config.cache) {
    execSync(`cd ${config.path} && rm -rf ${cacheItem}`);
  }
  // Cold build
  const c0 = performance.now();
  execSync(`cd ${config.path} && npm run build`, { stdio: "inherit" });
  const c1 = performance.now();
  // Move a single new file for the warm build, so we take advantage of the
  // cache, but also aren't running the same exact build time after time, to be
  // more realistic.
  fs.copyFileSync(warmFileSrc, warmFileDest);
  // Warm build
  const w0 = performance.now();
  execSync(`cd ${config.path} && npm run build`, { stdio: "inherit" });
  const w1 = performance.now();
  // Delete warm file
  fs.unlinkSync(warmFileDest);
  // Return results
  const results = {
    name: config.name,
    cold: msToS(c1 - c0),
    warm: msToS(w1 - w0),
  };
  console.log(results);
  return results;
}

// Run the tests
for (const test of config.tests) {
  const results = [...Array(config.runs)].map((_) => runTest(test));
  // Report the average of the cold and warm builds.
  output.push({
    name: test.name,
    cold: getAverage(results, "cold"),
    warm: getAverage(results, "warm"),
  });
}

// Log output
let table = new Table({
  head: ["", "Cold (sec)", "Warm (sec)"],
});
output.map((row) => table.push([row.name, row.cold, row.warm]));
console.log(table.toString());
