import { spawnSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, "..");
const monorepoRoot = path.resolve(docsRoot, "..", "..");

function run(cmd, args) {
  const res = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, NODE_ENV: "test" },
    cwd: docsRoot,
  });
  return typeof res.status === "number" ? res.status : 1;
}

function ensureJson(file) {
  const fullPath = path.join(docsRoot, file);
  if (!existsSync(fullPath)) {
    writeFileSync(fullPath, JSON.stringify({ testResults: [] }));
  }
}

const vitestBin = path.join(monorepoRoot, "node_modules", ".bin", "vitest");
const jestBin = path.join(monorepoRoot, "node_modules", ".bin", "jest");

const vitestExit = run(vitestBin, [
  "run",
  "--reporter=json",
  "--outputFile=test-results.json",
]);

if (vitestExit !== 0) {
  console.warn("Vitest failed during prebuild; continuing with fallback JSON.");
}

const jestExit = run(jestBin, [
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
