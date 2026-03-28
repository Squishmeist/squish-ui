import { Select } from "./select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  args: {
    children: [
      <option key="choose" value="">
        Choose an option
      </option>,
      <option key="1" value="option1">
        Option 1
      </option>,
      <option key="2" value="option2">
        Option 2
      </option>,
      <option key="3" value="option3">
        Option 3
      </option>,
    ],
  },
};

export const WithValue = {
  args: {
    defaultValue: "option2",
    children: [
      <option key="1" value="option1">
        Option 1
      </option>,
      <option key="2" value="option2">
        Option 2
      </option>,
      <option key="3" value="option3">
        Option 3
      </option>,
    ],
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: [
      <option key="1" value="option1">
        Option 1
      </option>,
      <option key="2" value="option2">
        Option 2
      </option>,
    ],
  },
};
