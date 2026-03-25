"use client";

import { useState } from "react";

type Status = "idle" | "running" | "pass" | "fail";
type BuiltResult = { passed: boolean; output: string } | null;
type Runner = "vitest" | "jest";

const headerClass = "flex items-center justify-between border-b px-4 py-2.5 border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900";
const badgeBase = "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium";
const containerClass = "overflow-hidden rounded-xl border shadow-sm border-zinc-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100";

function PassBadge() {
  return (
    <span className={`${badgeBase} bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Passed
    </span>
  );
}

function FailBadge() {
  return (
    <span className={`${badgeBase} bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      Failed
    </span>
  );
}

export function TestRunner({
  slug,
  builtResult,
  runner = "vitest",
}: {
  slug: string;
  builtResult: BuiltResult;
  runner?: Runner;
}) {
  const isProduction = process.env.NODE_ENV === "production";
  const [status, setStatus] = useState<Status>("idle");
  const [output, setOutput] = useState("");

  const run = async () => {
    setStatus("running");
    setOutput("");
    try {
      const res = await fetch(`/api/run-tests?slug=${slug}&runner=${runner}`);
      const data = await res.json();
      setOutput(data.output);
      setStatus(data.passed ? "pass" : "fail");
    } catch {
      setOutput("Failed to connect to the test runner.");
      setStatus("fail");
    }
  };

  // Production: show static build-time results
  if (builtResult) {
    return (
      <div className={containerClass}>
        <div className={headerClass}>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-400/70" />
            <span className="font-mono text-xs text-zinc-500">{slug}.test.tsx</span>
            {builtResult.passed ? <PassBadge /> : <FailBadge />}
          </div>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">Ran at build time</span>
        </div>
        <pre className={[
          "overflow-x-auto p-5 font-mono text-[11px] leading-5 whitespace-pre-wrap",
          builtResult.passed ? "text-emerald-800 dark:text-emerald-300" : "text-red-800 dark:text-red-300",
        ].join(" ")}>
          {builtResult.output}
        </pre>
      </div>
    );
  }

  // Production without embedded results: do not expose broken runtime test button.
  if (isProduction) {
    return (
      <div className={containerClass}>
        <div className={headerClass}>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-400/70" />
            <span className="font-mono text-xs text-zinc-500">{slug}.test.tsx</span>
          </div>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">Build-time data unavailable</span>
        </div>
        <div className="px-5 py-10 text-sm text-zinc-600 dark:text-zinc-300">
          Built test results were not embedded for this page. Runtime test execution is only available in development.
        </div>
      </div>
    );
  }

  // Development: interactive run button
  return (
    <div className={containerClass}>
      {/* Header bar */}
      <div className={headerClass}>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-400/70" />
          <span className="font-mono text-xs text-zinc-500">{slug}.test.tsx</span>
          {status === "pass" && <PassBadge />}
          {status === "fail" && <FailBadge />}
        </div>
        <button
          onClick={run}
          disabled={status === "running"}
          className="flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            bg-zinc-800 text-zinc-100 hover:bg-zinc-700
            dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
        >
          {status === "running" ? (
            <>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Running…
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {status === "idle" ? "Run Tests" : "Run Again"}
            </>
          )}
        </button>
      </div>

      {/* Body */}
      {status === "idle" && (
        <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              className="text-zinc-400 dark:text-zinc-500">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="15" x2="15" y2="15" />
              <line x1="9" y1="11" x2="15" y2="11" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">No results yet</p>
            <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">Click Run Tests to execute the test suite</p>
          </div>
        </div>
      )}

      {status === "running" && (
        <div className="flex items-center justify-center gap-3 px-5 py-14">
          <svg className="animate-spin text-indigo-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Running test suite…</span>
        </div>
      )}

      {output && (
        <pre className={[
          "overflow-x-auto p-5 font-mono text-[11px] leading-5 whitespace-pre-wrap",
          status === "pass" ? "text-emerald-800 dark:text-emerald-300" : "text-red-800 dark:text-red-300",
        ].join(" ")}>
          {output}
        </pre>
      )}
    </div>
  );
}
