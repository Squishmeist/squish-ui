import fs from "fs";
import path from "path";

type AssertionResult = {
  title: string;
  fullName: string;
  status: "passed" | "failed";
  duration: number | null;
  failureMessages: string[];
};

export function readComponentFile(
  slug: string,
  filename: string,
  packageName: "web" | "mobile"
) {
  try {
    return fs.readFileSync(
      path.join(
        process.cwd(),
        "..",
        "..",
        "packages",
        packageName,
        "src",
        slug,
        filename,
      ),
      "utf-8",
    );
  } catch {
    return `// ${filename} not found`;
  }
}

export function readTestResult(
  slug: string,
  testResultsFile: string,
): { passed: boolean; output: string } | null {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), testResultsFile),
      "utf-8",
    );
    const data = JSON.parse(raw);
    const suite = data.testResults?.find(
      (r: { testFilePath?: string; name?: string }) =>
        (r.testFilePath ?? r.name ?? "").includes(`/${slug}/${slug}.test.tsx`),
    );
    if (!suite) return null;
    const lines: string[] = suite.assertionResults.map((t: AssertionResult) => {
      const icon = t.status === "passed" ? "✓" : "✗";
      const ms = t.duration != null ? ` ${Math.round(t.duration)}ms` : "";
      const line = `  ${icon} ${t.fullName}${ms}`;
      return t.failureMessages.length > 0
        ? `${line}\n     ${t.failureMessages.join("\n     ")}`
        : line;
    });
    const passed = suite.status === "passed";
    const total = suite.assertionResults.length;
    const failed = suite.assertionResults.filter(
      (t: AssertionResult) => t.status === "failed",
    ).length;
    const summary = passed
      ? `\n  Tests  ${total} passed (${total})`
      : `\n  Tests  ${failed} failed, ${total - failed} passed (${total})`;
    return { passed, output: lines.join("\n") + summary };
  } catch {
    return null;
  }
}

export const TOC_SECTIONS = [
  { id: "preview", label: "Preview" },
  { id: "code", label: "Code" },
  { id: "tests", label: "Tests" },
];
