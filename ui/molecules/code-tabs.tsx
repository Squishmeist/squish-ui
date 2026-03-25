"use client";

import { useState } from "react";
import { CopyButton } from "../atoms/copy-button";

type Tab = {
  label: string;
  filename: string;
  code: string;
};

export function CodeTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <div className="overflow-hidden rounded-xl border shadow-sm
      border-zinc-200 bg-white text-zinc-800
      dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">

      {/* Tab bar */}
      <div className="flex items-end border-b px-4 pt-3
        border-zinc-200 bg-zinc-50
        dark:border-zinc-800 dark:bg-zinc-900">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={[
              "relative -mb-px mr-1 rounded-t-md px-4 py-2 text-xs font-medium transition-colors cursor-pointer",
              i === active
                ? "border border-b-white border-zinc-200 bg-white text-zinc-800 dark:border-b-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                : "border border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
        <div className="ml-auto pb-2">
          <CopyButton code={current.code} />
        </div>
      </div>

      {/* Filename strip */}
      <div className="flex items-center gap-2 border-b px-5 py-2
        border-zinc-200/60 bg-zinc-50/50
        dark:border-zinc-800/60 dark:bg-transparent">
        <span className="h-2 w-2 rounded-full bg-indigo-400/70" />
        <span className="font-mono text-xs text-zinc-500">{current.filename}</span>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-5 text-[13px] leading-6 tracking-wide">
        <code>{current.code}</code>
      </pre>

    </div>
  );
}
