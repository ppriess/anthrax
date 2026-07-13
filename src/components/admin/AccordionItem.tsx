"use client";

import { useState } from "react";

export function AccordionItem({
  summary,
  actions,
  children,
}: {
  summary: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-2 border-border-dark bg-card-dark">
      <div className="flex items-center gap-4 p-4">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <span
            className={`text-on-dark-3 transition-transform ${open ? "rotate-90" : ""}`}
          >
            ▶
          </span>
          <div className="flex-1">{summary}</div>
        </button>
        {actions && (
          <div onClick={(e) => e.stopPropagation()} className="flex gap-2">
            {actions}
          </div>
        )}
      </div>
      {open && (
        <div className="border-t border-border-dark p-4">{children}</div>
      )}
    </div>
  );
}
