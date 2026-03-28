import * as React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={[
        "flex min-h-20 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors resize-none",
        "bg-white text-zinc-900 placeholder:text-zinc-400",
        "dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500",
        "border-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500",
        "dark:border-zinc-700 dark:focus-visible:ring-indigo-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
