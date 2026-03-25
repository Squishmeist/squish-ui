import Link from "next/link";
import { navigation } from "@/app/docs/navigation";
import { NavLink } from "../atoms/nav-link";
import { ThemeToggle } from "../atoms/theme-toggle";

export function Sidebar() {
  return (
    <aside
      className="sticky top-0 hidden md:flex h-screen w-60 shrink-0 flex-col overflow-y-auto border-r
      border-zinc-200 bg-white
      dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Brand */}
      <Link
        href="/"
        className="flex items-center gap-2.5 border-b px-5 py-4
        border-zinc-100 dark:border-zinc-800 hover:opacity-80 transition-opacity"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
            <rect
              x="8"
              y="1"
              width="5"
              height="5"
              rx="1"
              fill="white"
              fillOpacity="0.5"
            />
            <rect
              x="1"
              y="8"
              width="5"
              height="5"
              rx="1"
              fill="white"
              fillOpacity="0.5"
            />
            <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Squish UI
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        {navigation.map((section, index) => (
          <div key={index} className={index > 0 ? "mt-4" : ""}>
            {section.title && (
              <p
                className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-widest
                text-zinc-400 dark:text-zinc-500"
              >
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="flex items-center justify-between border-t px-4 py-3
        border-zinc-100 dark:border-zinc-800"
      >
        <p className="text-xs text-zinc-400 dark:text-zinc-500">v1.0.0</p>
        <ThemeToggle />
      </div>
    </aside>
  );
}
