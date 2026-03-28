import { SectionHeader } from "@/ui/atoms/section-header";

type PreviewItem = {
  name: string;
  children: React.ReactNode;
};

type Props = {
  previews: PreviewItem[];
};

export function PreviewSection({ previews }: Props) {
  return (
    <section id="preview" className="mb-10">
      <SectionHeader title="Preview">
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
      </SectionHeader>
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

      <hr className="my-10 border-zinc-100 dark:border-zinc-800" />
    </section>
  );
}
