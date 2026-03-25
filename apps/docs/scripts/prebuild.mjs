import { spawnSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, "..");
const monorepoRoot = path.resolve(docsRoot, "..", "..");
const mobileRoot = path.resolve(monorepoRoot, "packages", "mobile");

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
const pnpmBin =
  process.platform === "win32"
    ? path.join(monorepoRoot, "node_modules", ".bin", "pnpm.cmd")
    : "pnpm";

const vitestExit = run(vitestBin, [
  "run",
  "--reporter=json",
  "--outputFile=test-results.json",
]);

if (vitestExit !== 0) {
  console.warn("Vitest failed during prebuild; continuing with fallback JSON.");
}

const jestExit = run(pnpmBin, [
  "--dir",
  mobileRoot,
  "exec",
  "jest",
  "--passWithNoTests",
  "--runInBand",
  "--ci",
  "--json",
  "--outputFile",
  path.join(docsRoot, "test-results-mobile.json"),
]);

if (jestExit !== 0) {
  console.warn("Jest failed during prebuild; continuing with fallback JSON.");
}

ensureJson("test-results.json");
ensureJson("test-results-mobile.json");
