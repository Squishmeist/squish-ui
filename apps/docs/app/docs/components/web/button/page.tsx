import { ComponentDoc } from "@/ui/templates/component-doc";
import { Button } from "@squishui/web/button";
import * as Stories from "@squishui/web/button/button.stories";

export const metadata = { title: "Button – Squish UI" };

const previews = [
  { name: "Default", children: <Button {...Stories.Default.args} /> },
  { name: "Outline", children: <Button {...Stories.Outline.args} /> },
  { name: "Ghost", children: <Button {...Stories.Ghost.args} /> },
];

const description = (
  <>
    A versatile button with three variants —{" "}
    {(["default", "outline", "ghost"] as const).map((v) => (
      <code
        key={v}
        className="mx-0.5 rounded px-1.5 py-0.5 font-mono text-sm bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      >
        {v}
      </code>
    ))}
    .
  </>
);

export default function ButtonPage() {
  return (
    <ComponentDoc
      name="Button"
      slug="button"
      type="web"
      description={description}
      previews={previews}
    />
  );
}
