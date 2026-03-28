import { ComponentDoc } from "@/ui/templates/component-doc";
import { DefaultPreview, GhostPreview, OutlinePreview } from "./preview";

export const metadata = { title: "Button – Squish UI" };

const previews = [
  { name: "Default", children: <DefaultPreview /> },
  { name: "Outline", children: <OutlinePreview /> },
  { name: "Ghost", children: <GhostPreview /> },
];

const description = (
  <>
    A versatile button with three variants —{" "}
    {(["default", "outline", "ghost"] as const).map((v) => (
      <code
        key={v}
        className="mx-0.5 rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      >
        {v}
      </code>
    ))}
    .
  </>
);

export default function MobileButtonPage() {
  return (
    <ComponentDoc
      name="Button"
      slug="button"
      type="mobile"
      description={description}
      previews={previews}
    />
  );
}
