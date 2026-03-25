export const metadata = { title: "Installation – Squish UI" };

export default function InstallationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
      <div className="mb-10">
        <div className="mb-3">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium ring-1
            bg-indigo-50 text-indigo-600 ring-indigo-200
            dark:bg-indigo-950 dark:text-indigo-400 dark:ring-indigo-800"
          >
            Setup
          </span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Installation
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Use this setup for components in <code>packages/web</code>.
        </p>
      </div>

      <ol className="space-y-6">
        <Step
          number="1"
          title="Install Tailwind CSS v4"
          code={`npm install -D tailwindcss@latest @tailwindcss/postcss`}
        />
        <Step
          number="2"
          title="Import Tailwind"
          code={`@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));`}
          filename="app/globals.css"
        />
        <Step
          number="3"
          title="Install test tooling"
          code={`npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`}
        />
      </ol>
    </div>
  );
}

function Step({
  number,
  title,
  code,
  filename,
}: {
  number: string;
  title: string;
  code: string;
  filename?: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
        {number}
      </span>
      <div className="flex-1 pt-0.5">
        <h2 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h2>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          {filename && (
            <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              {filename}
            </div>
          )}
          <pre className="overflow-x-auto bg-zinc-50 px-4 py-3 font-mono text-xs text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            {code}
          </pre>
        </div>
      </div>
    </li>
  );
}
