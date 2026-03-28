import * as React from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ className = "", ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={[
        "h-4 w-4 rounded border-2 cursor-pointer transition-colors",
        "bg-white text-zinc-900",
        "dark:bg-zinc-900 dark:text-zinc-100",
        "border-zinc-200 checked:bg-indigo-600 checked:border-indigo-600",
        "dark:border-zinc-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
        "dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-zinc-950",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
