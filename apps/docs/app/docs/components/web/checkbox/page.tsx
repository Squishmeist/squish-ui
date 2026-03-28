import { ComponentDoc } from "@/ui/templates/component-doc";
import { Checkbox } from "@squishui/web/checkbox";
import * as Stories from "@squishui/web/checkbox/checkbox.stories";

export const metadata = { title: "Checkbox – Squish UI" };

const previews = [
  {
    name: "Unchecked",
    children: <Checkbox {...Stories.Unchecked.args} />,
  },
  {
    name: "Checked",
    children: <Checkbox {...Stories.Checked.args} />,
  },
  {
    name: "Disabled",
    children: <Checkbox {...Stories.Disabled.args} />,
  },
  {
    name: "Disabled Checked",
    children: <Checkbox {...Stories.DisabledChecked.args} />,
  },
];

const description = (
  <>
    A checkbox input for boolean selections. Features focus ring styling and
    full dark mode support with clear visual feedback for checked, unchecked,
    and disabled states.
  </>
);

export default function CheckboxPage() {
  return (
    <ComponentDoc
      name="Checkbox"
      slug="checkbox"
      type="web"
      description={description}
      previews={previews}
    />
  );
}
