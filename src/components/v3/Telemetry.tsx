"use client";

import { useEffect, useState } from "react";

/** Timecode fake de telemetria — tempo decorrido desde a interceptação. */
export function Timecode() {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");

  return (
    <span className="v3-mono" style={{ color: "var(--v3-dim)" }} suppressHydrationWarning>
      TC {h}:{m}:{s}
    </span>
  );
}

export function RecBadge() {
  return (
    <span
      className="v3-mono"
      style={{ color: "var(--v3-alert)", display: "inline-flex", alignItems: "center", gap: 6 }}
    >
      <span className="v3-live-dot" /> REC
    </span>
  );
}
