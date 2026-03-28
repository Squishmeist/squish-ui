type Props = {
  title: string;
  children?: React.ReactNode;
};

export function SectionHeader({ title, children }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {children}
    </div>
  );
}
