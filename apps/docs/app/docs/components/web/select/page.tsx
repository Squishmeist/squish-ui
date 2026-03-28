import { ComponentDoc } from "@/ui/templates/component-doc";
import { Select } from "@squishui/web/select";
import * as Stories from "@squishui/web/select/select.stories";

export const metadata = { title: "Select – Squish UI" };

const previews = [
  {
    name: "Default",
    children: <Select {...Stories.Default.args} />,
  },
  {
    name: "With Value",
    children: <Select {...Stories.WithValue.args} />,
  },
  {
    name: "Disabled",
    children: <Select {...Stories.Disabled.args} />,
  },
];

const description = (
  <>
    A dropdown select component for choosing from a list of options. Provides
    native browser behavior with consistent styling across light and dark modes.
  </>
);

export default function SelectPage() {
  return (
    <ComponentDoc
      name="Select"
      slug="select"
      type="web"
      description={description}
      previews={previews}
    />
  );
}
