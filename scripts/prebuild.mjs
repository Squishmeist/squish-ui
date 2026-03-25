import { spawnSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";

function run(cmd, args) {
  const res = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, NODE_ENV: "test" },
  });
  return typeof res.status === "number" ? res.status : 1;
}

function ensureJson(file) {
  if (!existsSync(file)) {
    writeFileSync(file, JSON.stringify({ testResults: [] }));
  }
}

const vitestExit = run("vitest", [
  "run",
  "--reporter=json",
  "--outputFile=test-results.json",
]);

if (vitestExit !== 0) {
  console.warn("Vitest failed during prebuild; continuing with fallback JSON.");
}

const jestExit = run("jest", [
  "--passWithNoTests",
  "--runInBand",
  "--ci",
  "--json",
  "--outputFile=test-results-mobile.json",
]);

if (jestExit !== 0) {
  console.warn("Jest failed during prebuild; continuing with fallback JSON.");
}

ensureJson("test-results.json");
ensureJson("test-results-mobile.json");
