import { ComponentDoc } from "@/ui/templates/component-doc";
import { Textarea } from "@squishui/web/textarea";
import * as Stories from "@squishui/web/textarea/textarea.stories";

export const metadata = { title: "Textarea – Squish UI" };

const previews = [
  {
    name: "Default",
    children: <Textarea {...Stories.Default.args} />,
  },
  {
    name: "With Rows",
    children: <Textarea {...Stories.WithRows.args} />,
  },
  {
    name: "Disabled",
    children: <Textarea {...Stories.Disabled.args} />,
  },
];

const description = (
  <>
    A multi-line text input field for collecting longer text content. Inherits
    the same styling as the Input component with resizing disabled for
    consistency.
  </>
);

export default function TextareaPage() {
  return (
    <ComponentDoc
      name="Textarea"
      slug="textarea"
      type="web"
      description={description}
      previews={previews}
    />
  );
}
