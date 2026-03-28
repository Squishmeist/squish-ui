type Props = {
  slug: string;
  builtResult: { passed: boolean; output: string } | null;
  runner: "vitest" | "jest";
};

export function TestResults({ slug, builtResult, runner }: Props) {
  return (
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
          Powered by {runner === "vitest" ? "Vitest" : "Jest"}
        </span>
      </div>
      {builtResult ? (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b text-xs px-4 py-2.5 border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-zinc-500">{slug}.test.tsx</span>
              {builtResult.passed ? <PassBadge /> : <FailBadge />}
            </div>
            <span className="text-xs text-zinc-500">Ran at build time</span>
          </div>
          {/* Results */}
          <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap wrap-break-word p-5 text-[11px] leading-5">
            {builtResult.output.split("\n").map((line, idx) => {
              const isSuccess = line.includes("✓");
              const isFailed = line.includes("✗");
              const isSummary = line.includes("Tests");

              return (
                <div
                  key={idx}
                  className={
                    isSuccess
                      ? "text-emerald-400"
                      : isFailed
                        ? "text-red-400"
                        : isSummary
                          ? "text-zinc-300"
                          : "text-zinc-400"
                  }
                >
                  {line}
                </div>
              );
            })}
          </pre>
        </div>
      ) : (
        <div className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
          <p className="text-sm text-zinc-500">No test results available</p>
        </div>
      )}
    </section>
  );
}

function PassBadge() {
  return (
    <span
      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Passed
    </span>
  );
}

function FailBadge() {
  return (
    <span
      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      Failed
    </span>
  );
}
