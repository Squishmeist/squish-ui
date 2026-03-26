import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliPath = path.resolve(__dirname, "index.mjs");

let webDir;

function run(args, { projectDir } = {}) {
  const cwd = projectDir ?? mkdtempSync(path.join(tmpdir(), "squishui-project-"));
  return spawnSync("node", [cliPath, ...args], {
    cwd,
    env: { ...process.env, SQUISHUI_WEB_DIR: webDir },
    encoding: "utf8",
  });
}

function makeProject() {
  return mkdtempSync(path.join(tmpdir(), "squishui-project-"));
}

before(() => {
  webDir = mkdtempSync(path.join(tmpdir(), "squishui-web-"));

  // button — full set of files
  mkdirSync(path.join(webDir, "button"));
  writeFileSync(path.join(webDir, "button", "button.tsx"), "// button");
  writeFileSync(path.join(webDir, "button", "button.test.tsx"), "// button test");
  writeFileSync(path.join(webDir, "button", "button.stories.tsx"), "// button stories");

  // input — no stories file
  mkdirSync(path.join(webDir, "input"));
  writeFileSync(path.join(webDir, "input", "input.tsx"), "// input");
  writeFileSync(path.join(webDir, "input", "input.test.tsx"), "// input test");
});

after(() => {
  rmSync(webDir, { recursive: true, force: true });
});

// --- help & unknown commands ---

test("prints help with no args", () => {
  const result = run([]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /squishui add <component>/);
});

test("prints help with --help", () => {
  const result = run(["--help"]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /squishui add <component>/);
});

test("prints help with -h", () => {
  const result = run(["-h"]);
  assert.equal(result.status, 0);
});

test("fails on unknown command", () => {
  const result = run(["remove", "button"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown command/);
});

// --- argument validation ---

test("fails when component name is missing", () => {
  const result = run(["add"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Missing component name/);
});

test("fails on invalid component name with uppercase", () => {
  const result = run(["add", "Button"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /lowercase/);
});

test("fails on invalid component name with spaces", () => {
  const result = run(["add", "my button"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /lowercase/);
});

test("fails on unknown component", () => {
  const result = run(["add", "nonexistent"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /not found/);
});

// --- happy path ---

test("copies component and test files", () => {
  const projectDir = makeProject();
  const result = run(["add", "button"], { projectDir });

  assert.equal(result.status, 0);
  assert.ok(existsSync(path.join(projectDir, "ui", "button", "button.tsx")));
  assert.ok(existsSync(path.join(projectDir, "ui", "button", "button.test.tsx")));
  assert.ok(!existsSync(path.join(projectDir, "ui", "button", "button.stories.tsx")));
});

test("copies stories file with --storybook", () => {
  const projectDir = makeProject();
  const result = run(["add", "button", "--storybook"], { projectDir });

  assert.equal(result.status, 0);
  assert.ok(existsSync(path.join(projectDir, "ui", "button", "button.stories.tsx")));
});

test("copies stories file with -s shorthand", () => {
  const projectDir = makeProject();
  const result = run(["add", "button", "-s"], { projectDir });

  assert.equal(result.status, 0);
  assert.ok(existsSync(path.join(projectDir, "ui", "button", "button.stories.tsx")));
});

test("creates ui/<component> directory if it does not exist", () => {
  const projectDir = makeProject();
  run(["add", "button"], { projectDir });

  assert.ok(existsSync(path.join(projectDir, "ui", "button")));
});

// --- overwrite protection ---

test("fails if file already exists without --force", () => {
  const projectDir = makeProject();
  run(["add", "button"], { projectDir });

  const result = run(["add", "button"], { projectDir });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /already exists/);
  assert.match(result.stderr, /--force/);
});

test("overwrites existing files with --force", () => {
  const projectDir = makeProject();
  run(["add", "button"], { projectDir });

  const result = run(["add", "button", "--force"], { projectDir });
  assert.equal(result.status, 0);
});

test("overwrites existing files with -f shorthand", () => {
  const projectDir = makeProject();
  run(["add", "button"], { projectDir });

  const result = run(["add", "button", "-f"], { projectDir });
  assert.equal(result.status, 0);
});

// --- missing stories file ---

test("fails with --storybook when stories file is not bundled", () => {
  const result = run(["add", "input", "--storybook"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing/i);
});

test("does not create destination dir if source files are missing", () => {
  const projectDir = makeProject();
  run(["add", "input", "--storybook"], { projectDir });

  assert.ok(!existsSync(path.join(projectDir, "ui", "input")));
});
