import { CodeTabs } from "@/ui/molecules/code-tabs";
import { TableOfContents } from "@/ui/molecules/table-of-contents";
import { TestRunner } from "@/ui/molecules/test-runner";
import fs from "fs";
import path from "path";

type PreviewItem = {
  name: string;
  children: React.ReactNode;
};

type Props = {
  name: string;
  slug: string;
  description: React.ReactNode;
  previews: PreviewItem[];
};

function readUiFile(slug: string, filename: string) {
  try {
    return fs.readFileSync(
      path.join(process.cwd(), "components/web", slug, filename),
      "utf-8",
    );
  } catch {
    return `// ${filename} not found`;
  }
}

type AssertionResult = {
  title: string;
  fullName: string;
  status: "passed" | "failed";
  duration: number | null;
  failureMessages: string[];
};

function readTestResult(
  slug: string,
): { passed: boolean; output: string } | null {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "test-results.json"),
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

const tocSections = [
  { id: "preview", label: "Preview" },
  { id: "code", label: "Code" },
  { id: "tests", label: "Tests" },
];

export function ComponentDoc({ name, slug, description, previews }: Props) {
  const builtResult = readTestResult(slug);
  const codeTabs = [
    {
      label: "Component",
      filename: `${slug}.tsx`,
      code: readUiFile(slug, `${slug}.tsx`),
    },
    {
      label: "Storybook",
      filename: `${slug}.stories.tsx`,
      code: readUiFile(slug, `${slug}.stories.tsx`),
    },
    {
      label: "Tests",
      filename: `${slug}.test.tsx`,
      code: readUiFile(slug, `${slug}.test.tsx`),
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-8 py-8 sm:py-12">
      {/* TOC */}
      <aside className="fixed right-8 top-32 hidden xl:block w-44">
        <TableOfContents sections={tocSections} />
      </aside>

      {/* Header */}
      <div className="mb-10">
        <div className="mb-3">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium ring-1
            bg-indigo-50 text-indigo-600 ring-indigo-200
            dark:bg-indigo-950 dark:text-indigo-400 dark:ring-indigo-800"
          >
            Component
          </span>
        </div>
        <h1 className="mb-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {name}
        </h1>
        <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>

      <hr className="my-10 border-zinc-100 dark:border-zinc-800" />

      {/* Preview */}
      <section id="preview" className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Preview
          </h2>
          <span className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            <svg
              width="12"
              height="12"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M210.94 75.66 161.73 18A16 16 0 0 0 149.46 12H40a16 16 0 0 0-16 16v200a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V88.27a16 16 0 0 0-5.06-12.61ZM152 34.56 189.54 80H152ZM216 228H40V28h96v64a8 8 0 0 0 8 8h72v128Z" />
            </svg>
            Rendered from Storybook stories
          </span>
        </div>
        <div className="dot-grid rounded-xl border p-6 shadow-sm border-zinc-200 dark:border-zinc-700">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {previews.map(({ name: label, children }) => (
              <div
                key={label}
                className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700"
              >
                <div className="flex min-h-24 items-center justify-center p-6 bg-white dark:bg-zinc-900">
                  {children}
                </div>
                <div className="border-t px-3 py-2 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                  <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="my-10 border-zinc-100 dark:border-zinc-800" />

      {/* Code */}
      <section id="code" className="mb-10">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Code
        </h2>
        <CodeTabs tabs={codeTabs} />
      </section>

      <hr className="my-10 border-zinc-100 dark:border-zinc-800" />

      {/* Tests */}
      <section id="tests">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Tests
          </h2>
          <span className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
            </svg>
            Powered by Vitest
          </span>
        </div>
        <TestRunner slug={slug} builtResult={builtResult} />
      </section>

      <div className="mt-16" />
    </div>
  );
}
