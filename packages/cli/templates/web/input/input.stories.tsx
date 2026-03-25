import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;

export const Default = {
  args: { placeholder: "Enter text…" },
};

export const Filled = {
  args: { defaultValue: "Hello world", placeholder: "Enter text…" },
};

export const Disabled = {
  args: { placeholder: "Disabled", disabled: true },
};
