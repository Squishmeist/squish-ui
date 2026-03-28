import { TableOfContents } from "@/ui/molecules/table-of-contents";
import { TOC_SECTIONS } from "../templates/lib";

type Props = {
  name: string;
  description: React.ReactNode;
  children: React.ReactNode;
};

export function ComponentPageLayout({ name, description, children }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-8 py-8 sm:py-12">
      {/* TOC */}
      <aside className="fixed right-8 top-32 hidden xl:block w-44">
        <TableOfContents sections={TOC_SECTIONS} />
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

      {children}

      <div className="mt-16" />
    </div>
  );
}
