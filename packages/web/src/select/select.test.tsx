import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

describe("Select", () => {
  const renderSelect = () =>
    render(
      <Select data-testid="select">
        <option value="">Choose...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    );

  it("renders a select element", () => {
    renderSelect();
    expect(screen.getByTestId("select")).toBeInTheDocument();
  });

  it("displays all options", () => {
    renderSelect();
    expect(screen.getByText("Choose...")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("changes value on selection", async () => {
    renderSelect();
    const select = screen.getByTestId("select") as HTMLSelectElement;
    await userEvent.selectOptions(select, "option2");
    expect(select.value).toBe("option2");
  });

  it("can be disabled", () => {
    render(
      <Select disabled data-testid="select">
        <option value="option1">Option 1</option>
      </Select>
    );
    expect(screen.getByTestId("select")).toBeDisabled();
  });

  it("respects defaultValue prop", () => {
    render(
      <Select defaultValue="option2" data-testid="select">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    );
    expect((screen.getByTestId("select") as HTMLSelectElement).value).toBe(
      "option2"
    );
  });

  describe("dark mode", () => {
    it("applies dark mode styles", () => {
      render(
        <div className="dark">
          <Select data-testid="select">
            <option value="1">Option</option>
          </Select>
        </div>
      );
      const select = screen.getByTestId("select");
      expect(select.className).toContain("dark:bg-zinc-900");
      expect(select.className).toContain("dark:text-zinc-100");
    });

    it("applies dark mode focus styles", () => {
      render(
        <div className="dark">
          <Select data-testid="select">
            <option value="1">Option</option>
          </Select>
        </div>
      );
      const select = screen.getByTestId("select");
      expect(select.className).toContain("dark:focus-visible:ring-indigo-400");
    });

    it("applies dark mode disabled styles", () => {
      render(
        <div className="dark">
          <Select disabled data-testid="select">
            <option value="1">Option</option>
          </Select>
        </div>
      );
      const select = screen.getByTestId("select");
      expect(select.className).toContain("disabled:opacity-50");
      expect(select).toBeDisabled();
    });
  });
});
