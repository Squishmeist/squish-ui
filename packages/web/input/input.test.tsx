import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders with a placeholder", () => {
    render(<Input placeholder="Enter text…" />);
    expect(screen.getByPlaceholderText("Enter text…")).toBeInTheDocument();
  });

  it("renders with a default value", () => {
    render(<Input defaultValue="Hello" />);
    expect(screen.getByDisplayValue("Hello")).toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "typing");
    expect(input).toHaveValue("typing");
  });

  it("calls onChange when the value changes", async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  describe("dark mode", () => {
    it("applies dark mode styles", () => {
      render(
        <div className="dark">
          <Input placeholder="Dark mode" />
        </div>
      );
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("dark:border-zinc-700");
      expect(input.className).toContain("dark:bg-zinc-900");
      expect(input.className).toContain("dark:text-zinc-100");
    });

    it("applies dark mode focus ring styles", () => {
      render(
        <div className="dark">
          <Input />
        </div>
      );
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("dark:focus-visible:ring-indigo-400");
    });

    it("applies dark mode placeholder styles", () => {
      render(
        <div className="dark">
          <Input placeholder="Type here" />
        </div>
      );
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("dark:placeholder:text-zinc-500");
    });

    it("respects disabled opacity in dark mode", () => {
      render(
        <div className="dark">
          <Input disabled />
        </div>
      );
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("disabled:opacity-50");
      expect(input).toBeDisabled();
    });
  });
});
