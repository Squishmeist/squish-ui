"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/app/docs/navigation";
import { NavLink } from "../atoms/nav-link";
import { ThemeToggle } from "../atoms/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close drawer on navigation
  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b px-4 py-3 md:hidden
      border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">

      {/* Brand */}
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
            <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
            <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
            <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">UI Docs</span>
      </Link>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div className={[
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r transition-transform duration-200",
        "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
        open ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}>
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b px-5 py-4 border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Squish UI</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4">
          {navigation.map((section, index) => (
            <div key={index} className={index > 0 ? "mt-4" : ""}>
              {section.title && (
                <p className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
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

        <div className="border-t px-5 py-3 border-zinc-100 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">v1.0.0</p>
        </div>
      </div>
    </header>
  );
}
