import { Input } from "@squishui/web/input/input";
import * as Stories from "@squishui/web/input/input.stories";
import { ComponentDoc } from "@/ui/templates/component-doc";

export const metadata = { title: "Input – Squish UI" };

const previews = [
  { name: "Default", children: <Input {...Stories.Default.args} /> },
  { name: "Filled", children: <Input {...Stories.Filled.args} /> },
  { name: "Disabled", children: <Input {...Stories.Disabled.args} /> },
];

const description = (
  <>
    A text input built on the native{" "}
    <code className="rounded px-1.5 py-0.5 font-mono text-sm bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
      input
    </code>{" "}
    element, with consistent styling and focus states.
  </>
);

export default function InputPage() {
  return (
    <ComponentDoc
      name="Input"
      slug="input"
      description={description}
      previews={previews}
    />
  );
}
