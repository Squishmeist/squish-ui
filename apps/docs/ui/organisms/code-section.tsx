import { CodeTabs } from "@/ui/molecules/code-tabs";
import { SectionHeader } from "@/ui/atoms/section-header";

type CodeTab = {
  label: string;
  filename: string;
  code: string;
};

type Props = {
  tabs: CodeTab[];
};

export function CodeSection({ tabs }: Props) {
  return (
    <section id="code" className="mb-10">
      <SectionHeader title="Code" />
      <CodeTabs tabs={tabs} />

      <hr className="my-10 border-zinc-100 dark:border-zinc-800" />
    </section>
  );
}
