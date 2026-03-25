export const metadata = { title: "Introduction – Squish UI" };

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-8 py-8 sm:py-12">
      <div className="mb-10">
        <div className="mb-3">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium ring-1
            bg-indigo-50 text-indigo-600 ring-indigo-200
            dark:bg-indigo-950 dark:text-indigo-400 dark:ring-indigo-800"
          >
            Introduction
          </span>
        </div>
        <h1 className="mb-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Welcome to Squish UI
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Squish UI has two tracks: Web components (React + Tailwind CSS) and
          Mobile components (React Native + StyleSheet). Pick the platform you
          need and copy the code directly.
        </p>
      </div>

      <hr className="my-10 border-zinc-100 dark:border-zinc-800" />

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Web vs Mobile
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="/docs/components/web/installation"
            className="rounded-xl border p-5 transition-colors border-zinc-200 hover:border-indigo-300 dark:border-zinc-800 dark:hover:border-indigo-700"
          >
            <p className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Web
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              React + Tailwind CSS v4 components, docs, and Vitest setup.
            </p>
          </a>
          <a
            href="/docs/components/mobile/installation"
            className="rounded-xl border p-5 transition-colors border-zinc-200 hover:border-indigo-300 dark:border-zinc-800 dark:hover:border-indigo-700"
          >
            <p className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Mobile
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              React Native components styled with StyleSheet and tested with
              Jest.
            </p>
          </a>
        </div>
      </section>

      <hr className="my-10 border-zinc-100 dark:border-zinc-800" />

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Why Squish UI?
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
              </svg>
            }
            title="Own Your Code"
            description="Copy-paste means you control everything. Customise, refactor, optimise—it's yours."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            }
            title="Minimal Bundle"
            description="No 300KB component library. Each component is just a few lines of focused code."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
            title="Battle-Tested"
            description="Every component includes tests so you can modify with confidence."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            }
            title="Component Stories"
            description="Each component comes with stories for easy visualisation and documentation."
          />
        </div>
      </section>

      <hr className="my-10 border-zinc-100 dark:border-zinc-800" />

      <hr className="my-10 border-zinc-100 dark:border-zinc-800" />

      <section>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          How to use
        </h2>
        <ol className="space-y-4">
          <Step
            number="1"
            title="Browse components"
            description="Check the sidebar for available components. Each page shows live examples and usage."
          />
          <Step
            number="2"
            title="Copy the code"
            description="Click the Component tab and copy the code directly into your project. Optionally copy stories and tests too."
          />
          <Step
            number="3"
            title="Customise freely"
            description="Adjust colors, spacing, behavior—whatever fits your design. The code is yours now."
          />
          <Step
            number="4"
            title="Run the tests"
            description="Execute npm test to verify everything works as expected after your changes."
          />
        </ol>
      </section>

      <div className="mt-12 rounded-2xl border p-6 sm:p-8 border-indigo-200 bg-indigo-50/50 dark:border-indigo-900 dark:bg-indigo-950/30">
        <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Ready to build?
        </h3>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Start with the Button component—it&apos;s a great introduction to the
          structure.
        </p>
        <a
          href="/docs/components/web/button"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors
            bg-indigo-600 text-white hover:bg-indigo-500"
        >
          View Button component
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border p-5 border-zinc-200 dark:border-zinc-800">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
        {icon}
      </div>
      <div>
        <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
        {number}
      </span>
      <div className="pt-0.5">
        <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </li>
  );
}
