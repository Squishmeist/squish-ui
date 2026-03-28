import * as React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      className={[
        "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors cursor-pointer",
        "bg-white text-zinc-900",
        "dark:bg-zinc-900 dark:text-zinc-100",
        "border-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500",
        "dark:border-zinc-700 dark:focus-visible:ring-indigo-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </select>
  );
}
