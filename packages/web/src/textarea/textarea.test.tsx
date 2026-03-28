import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays placeholder text", () => {
    render(<Textarea placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
  });

  it("updates value on user input", async () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea") as HTMLTextAreaElement;
    await userEvent.type(textarea, "Hello world");
    expect(textarea.value).toBe("Hello world");
  });

  it("can be disabled", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("accepts rows attribute", () => {
    render(<Textarea rows={8} data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveAttribute("rows", "8");
  });

  describe("dark mode", () => {
    it("applies dark mode styles", () => {
      render(
        <div className="dark">
          <Textarea data-testid="textarea" />
        </div>
      );
      const textarea = screen.getByTestId("textarea");
      expect(textarea.className).toContain("dark:bg-zinc-900");
      expect(textarea.className).toContain("dark:text-zinc-100");
    });

    it("applies dark mode focus styles", () => {
      render(
        <div className="dark">
          <Textarea data-testid="textarea" />
        </div>
      );
      const textarea = screen.getByTestId("textarea");
      expect(textarea.className).toContain("dark:focus-visible:ring-indigo-400");
    });

    it("applies dark mode disabled styles", () => {
      render(
        <div className="dark">
          <Textarea disabled data-testid="textarea" />
        </div>
      );
      const textarea = screen.getByTestId("textarea");
      expect(textarea.className).toContain("disabled:opacity-50");
      expect(textarea).toBeDisabled();
    });
  });
});
