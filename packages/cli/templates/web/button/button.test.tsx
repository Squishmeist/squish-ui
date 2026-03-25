import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("applies default variant by default", () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole("button").className).toContain("bg-zinc-900");
  });

  it("applies outline variant styles", () => {
    render(<Button variant="outline">Button</Button>);
    expect(screen.getByRole("button").className).toContain("border");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is set", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  describe("dark mode", () => {
    it("applies dark mode styles for default variant", () => {
      render(
        <div className="dark">
          <Button>Button</Button>
        </div>
      );
      const button = screen.getByRole("button");
      expect(button.className).toContain("dark:bg-zinc-100");
    });

    it("applies dark mode styles for outline variant", () => {
      render(
        <div className="dark">
          <Button variant="outline">Button</Button>
        </div>
      );
      const button = screen.getByRole("button");
      expect(button.className).toContain("dark:border-zinc-700");
      expect(button.className).toContain("dark:text-zinc-100");
    });

    it("applies dark mode styles for ghost variant", () => {
      render(
        <div className="dark">
          <Button variant="ghost">Button</Button>
        </div>
      );
      const button = screen.getByRole("button");
      expect(button.className).toContain("dark:text-zinc-100");
      expect(button.className).toContain("dark:hover:bg-zinc-800");
    });

    it("respects disabled opacity in dark mode", () => {
      render(
        <div className="dark">
          <Button disabled>Button</Button>
        </div>
      );
      const button = screen.getByRole("button");
      expect(button.className).toContain("disabled:opacity-50");
      expect(button).toBeDisabled();
    });
  });
});
