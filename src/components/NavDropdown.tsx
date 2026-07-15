"use client";

import { useState } from "react";
import type { NavChild } from "@/lib/content";

export function NavDropdown({
  label,
  active,
  children,
}: {
  label: string;
  active?: boolean;
  children: NavChild[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`text-ink no-underline hover:text-brasil-paper ${active ? "border-b-[3px] border-ink" : ""}`}
      >
        {label} ▾
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[170px] border-2 border-ink bg-paper py-1 shadow-[3px_3px_0_var(--color-ink)]">
          {children.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="block px-3 py-2 text-sm font-bold text-ink no-underline hover:bg-signal"
            >
              {c.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
