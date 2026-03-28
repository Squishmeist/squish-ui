import { TestResults } from "@/ui/molecules/test-results";
import { ComponentPageLayout } from "../layouts/component-page-layout";
import { CodeSection } from "../organisms/code-section";
import { PreviewSection } from "../organisms/preview-section";
import { readComponentFile, readTestResult } from "./lib";

type PreviewItem = {
  name: string;
  children: React.ReactNode;
};

type Props = {
  name: string;
  slug: string;
  type: "web" | "mobile";
  description: React.ReactNode;
  previews: PreviewItem[];
};

export function ComponentDoc({
  name,
  slug,
  type,
  description,
  previews,
}: Props) {
  const builtResult = readTestResult(slug, `test-results-${type}.json`);
  const runner = type === "web" ? "vitest" : "jest";
  const codeTabs = [
    {
      label: "Component",
      filename: `${slug}.tsx`,
      code: readComponentFile(slug, `${slug}.tsx`, type),
    },
    {
      label: "Storybook",
      filename: `${slug}.stories.tsx`,
      code: readComponentFile(slug, `${slug}.stories.tsx`, type),
    },
    {
      label: "Tests",
      filename: `${slug}.test.tsx`,
      code: readComponentFile(slug, `${slug}.test.tsx`, type),
    },
  ];

  return (
    <ComponentPageLayout name={name} description={description}>
      <PreviewSection previews={previews} />
      <CodeSection tabs={codeTabs} />
      <TestResults slug={slug} builtResult={builtResult} runner={runner} />
    </ComponentPageLayout>
  );
}
