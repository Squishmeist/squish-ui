import * as React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "./button";

describe("Button", () => {
  it("renders with default variant", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeTruthy();
  });

  it("renders with outline variant", () => {
    const { getByText } = render(<Button variant="outline">Outline</Button>);
    expect(getByText("Outline")).toBeTruthy();
  });

  it("renders with ghost variant", () => {
    const { getByText } = render(<Button variant="ghost">Ghost</Button>);
    expect(getByText("Ghost")).toBeTruthy();
  });

  it("handles press events", () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Press me</Button>);
    
    fireEvent.press(getByText("Press me"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={onPress}>
        Disabled
      </Button>
    );

    fireEvent.press(getByText("Disabled"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
