import { Checkbox } from "./checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;

export const Unchecked = {
  args: { defaultChecked: false },
};

export const Checked = {
  args: { defaultChecked: true },
};

export const Disabled = {
  args: { defaultChecked: false, disabled: true },
};

export const DisabledChecked = {
  args: { defaultChecked: true, disabled: true },
};
