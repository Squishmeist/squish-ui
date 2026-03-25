#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webPackageDir = path.resolve(__dirname, "web");

function printHelp() {
  console.log(`squishui

Usage:
  squishui add <component> [--storybook] [--force]

Examples:
  squishui add button
  squishui add input --storybook
  squishui add button --storybook --force
`);
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === "--help" || command === "-h") {
  printHelp();
  process.exit(0);
}

if (command !== "add") {
  fail(`Unknown command "${command}".`);
}

const component = args[1];
if (!component) {
  fail("Missing component name. Example: squishui add button");
}

if (!/^[a-z0-9-]+$/.test(component)) {
  fail("Component name must use lowercase letters, numbers, or hyphens.");
}

const withStorybook = args.includes("--storybook") || args.includes("-s");
const force = args.includes("--force") || args.includes("-f");

const sourceDir = path.join(webPackageDir, component);
if (!existsSync(sourceDir)) {
  fail(`Component "${component}" was not found in web components.`);
}

const destinationDir = path.join(process.cwd(), "ui", component);
mkdirSync(destinationDir, { recursive: true });

const filesToCopy = [`${component}.tsx`, `${component}.test.tsx`];
if (withStorybook) {
  filesToCopy.push(`${component}.stories.tsx`);
}

for (const file of filesToCopy) {
  const source = path.join(sourceDir, file);
  const destination = path.join(destinationDir, file);

  if (!existsSync(source)) {
    fail(`Component file is missing: ${file}`);
  }

  if (existsSync(destination) && !force) {
    fail(`File already exists: ${destination}. Use --force to overwrite.`);
  }

  copyFileSync(source, destination);
  console.log(`✓ Copied ${path.join("ui", component, file)}`);
}

console.log("Done.");
