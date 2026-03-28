import { Button } from "./button";

const meta = {
  title: "Mobile/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "ghost"] },
    theme: { control: "select", options: ["light", "dark"] },
  },
};

export default meta;

export const Default = {
  args: {
    children: "Button",
    variant: "default" as const,
  },
};

export const Outline = {
  args: {
    children: "Button",
    variant: "outline" as const,
  },
};

export const Ghost = {
  args: {
    children: "Button",
    variant: "ghost" as const,
  },
};
