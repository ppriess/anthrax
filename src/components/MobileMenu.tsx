"use client";

import { useState } from "react";
import type { NavItem } from "@/lib/content";

export function MobileMenu({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex flex-col gap-1"
      >
        <span className="h-[3px] w-[22px] bg-ink" />
        <span className="h-[3px] w-[22px] bg-ink" />
        <span className="h-[3px] w-[22px] bg-ink" />
      </button>
      {open && (
        <div className="halftone-sm absolute inset-x-0 top-full z-50 max-h-[70vh] overflow-y-auto border-b-4 border-ink bg-paper px-4 py-3">
          {nav.map((item) => (
            <div
              key={item.label}
              className="border-b border-[#d8d2c4] py-2 last:border-0"
            >
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block text-sm font-bold no-underline ${item.brasil ? "text-brasil-paper" : "text-ink"}`}
              >
                {item.label}
              </a>
              {item.children && (
                <div className="mt-2 flex flex-col gap-2 pl-3">
                  {item.children.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="text-sm text-paper-hi no-underline"
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
