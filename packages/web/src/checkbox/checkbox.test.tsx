import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe("checkbox");
  });

  it("can be checked", async () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox") as HTMLInputElement;
    await userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it("can be unchecked", async () => {
    render(<Checkbox defaultChecked data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    await userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it("can be disabled", () => {
    render(<Checkbox disabled data-testid="checkbox" />);
    expect(screen.getByTestId("checkbox")).toBeDisabled();
  });

  it("applies checked styles", () => {
    render(<Checkbox readOnly checked data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox.className).toContain("checked:bg-indigo-600");
    expect(checkbox.className).toContain("checked:border-indigo-600");
  });

  describe("dark mode", () => {
    it("applies dark mode styles", () => {
      render(
        <div className="dark">
          <Checkbox data-testid="checkbox" />
        </div>
      );
      const checkbox = screen.getByTestId("checkbox");
      expect(checkbox.className).toContain("dark:bg-zinc-900");
      expect(checkbox.className).toContain("dark:border-zinc-700");
    });

    it("applies dark mode checked styles", () => {
      render(
        <div className="dark">
          <Checkbox readOnly checked data-testid="checkbox" />
        </div>
      );
      const checkbox = screen.getByTestId("checkbox");
      expect(checkbox.className).toContain("dark:checked:bg-indigo-500");
      expect(checkbox.className).toContain("dark:checked:border-indigo-500");
    });

    it("applies dark mode focus styles", () => {
      render(
        <div className="dark">
          <Checkbox data-testid="checkbox" />
        </div>
      );
      const checkbox = screen.getByTestId("checkbox");
      expect(checkbox.className).toContain("dark:focus-visible:ring-indigo-400");
    });

    it("applies dark mode disabled styles", () => {
      render(
        <div className="dark">
          <Checkbox disabled data-testid="checkbox" />
        </div>
      );
      const checkbox = screen.getByTestId("checkbox");
      expect(checkbox.className).toContain("disabled:opacity-50");
      expect(checkbox).toBeDisabled();
    });
  });
});
