import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cliRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(cliRoot, "..", "..");
const sourceDir = path.join(repoRoot, "packages", "web", "src");
const destinationDir = path.join(cliRoot, "web");

if (!existsSync(sourceDir)) {
  throw new Error(`Missing source components directory: ${sourceDir}`);
}

rmSync(destinationDir, { recursive: true, force: true });
mkdirSync(destinationDir, { recursive: true });

const componentDirs = readdirSync(sourceDir).filter((entry) => {
  const entryPath = path.join(sourceDir, entry);
  return statSync(entryPath).isDirectory() && !entry.startsWith(".");
});

for (const component of componentDirs) {
  const componentSource = path.join(sourceDir, component);
  const componentDestination = path.join(destinationDir, component);
  mkdirSync(componentDestination, { recursive: true });

  const files = [
    `${component}.tsx`,
    `${component}.test.tsx`,
    `${component}.stories.tsx`,
  ];

  for (const file of files) {
    const sourceFile = path.join(componentSource, file);
    if (!existsSync(sourceFile)) {
      continue;
    }
    copyFileSync(sourceFile, path.join(componentDestination, file));
  }
}
