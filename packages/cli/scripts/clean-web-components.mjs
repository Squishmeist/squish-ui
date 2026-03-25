import { rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cliRoot = path.resolve(__dirname, "..");
const destinationDir = path.join(cliRoot, "web");

rmSync(destinationDir, { recursive: true, force: true });
