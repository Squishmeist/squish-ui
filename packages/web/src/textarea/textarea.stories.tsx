import { Textarea } from "./textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    rows: { control: "number" },
  },
};

export default meta;

export const Default = {
  args: { placeholder: "Enter your message..." },
};

export const Disabled = {
  args: { placeholder: "Disabled textarea", disabled: true },
};

export const WithRows = {
  args: { placeholder: "Enter your message...", rows: 6 },
};
