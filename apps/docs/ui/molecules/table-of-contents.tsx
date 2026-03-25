"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

export function TableOfContents({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const onScroll = () => {
      const offset = 120;
      let current = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        On this page
      </p>
      <ul className="space-y-1.5">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={[
                "block text-sm transition-colors",
                active === id
                  ? "font-medium text-indigo-600 dark:text-indigo-400"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200",
              ].join(" ")}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
