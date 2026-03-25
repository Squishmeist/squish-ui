import { Button } from "@squishui/web/button/button";
import { ThemeToggle } from "@/ui/atoms/theme-toggle";
import Link from "next/link";
import {
  DefaultPreview,
  GhostPreview,
  OutlinePreview,
} from "./docs/components/mobile/button/preview";

const components = [
  {
    name: "Web Button",
    href: "/docs/components/web/button",
    preview: (
      <div className="flex items-center gap-2">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    ),
  },
  {
    name: "Mobile Button",
    href: "/docs/components/mobile/button",
    preview: (
      <div className="flex items-center gap-2">
        <DefaultPreview />
        <OutlinePreview />
        <GhostPreview />
      </div>
    ),
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col bg-white dark:bg-zinc-950">
      {/* Nav */}
      <header
        className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4
        border-zinc-200 bg-white/80 backdrop-blur-sm
        dark:border-zinc-800 dark:bg-zinc-950/80"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
              <rect
                x="8"
                y="1"
                width="5"
                height="5"
                rx="1"
                fill="white"
                fillOpacity="0.5"
              />
              <rect
                x="1"
                y="8"
                width="5"
                height="5"
                rx="1"
                fill="white"
                fillOpacity="0.5"
              />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Squish UI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/docs"
            className="rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors
              border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900
              dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
          >
            Documentation
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-20 pt-24 text-center sm:pt-32">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-x-0 -top-40 flex justify-center">
            <div className="h-100 w-200 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/5" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1
              border-indigo-200 bg-indigo-50 text-xs font-medium text-indigo-600
              dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Open source · Free to use
            </div>

            <h1 className="mb-5 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-100">
              <span className="text-indigo-600 dark:text-indigo-400">
                Squish UI
              </span>{" "}
              — ready to ship
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
              Production-ready components for both React web and React Native
              mobile. Copy, paste, and make it yours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs/components/web/button"
                className="rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors
                  bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/20"
              >
                Browse components →
              </Link>
              <Link
                href="/docs"
                className="rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors
                  text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </section>

        {/* Component cards */}
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <div className="grid gap-4 sm:grid-cols-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Web Components
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Mobile Components
            </p>
            {components.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="group rounded-2xl border p-8 transition-all
                  border-zinc-200 bg-zinc-50 hover:border-indigo-200 hover:bg-indigo-50/40
                  dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/20"
              >
                {c.preview}
              </Link>
            ))}
          </div>
        </section>

        {/* Feature strip */}
        <section className="border-t px-6 py-12 border-zinc-100 dark:border-zinc-800/60">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="8" height="8" x="2" y="2" rx="1" />
                  <rect width="8" height="8" x="14" y="2" rx="1" />
                  <rect width="8" height="8" x="2" y="14" rx="1" />
                  <rect width="8" height="8" x="14" y="14" rx="1" />
                </svg>
              }
              title="Copy & paste"
              description="No package to install. Copy the component file directly into your project and make it yours."
            />
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              }
              title="Tests included"
              description="Web components ship with Vitest tests, and mobile components ship with Jest tests."
            />
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              }
              title="Dark mode"
              description="Every component supports light and dark mode out of the box."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
        bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
      >
        {icon}
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </p>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}
