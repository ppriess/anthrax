"use client";

import { useEffect, useState } from "react";

function daysUntil(target: string): number {
  const ms = new Date(target).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

/**
 * Real countdown to the release date. Renders a chip like "FALTAM 68 DIAS".
 * After release, swaps to "JÁ DISPONÍVEL" per the interaction spec.
 */
export function Countdown({
  target,
  className,
}: {
  target: string;
  className?: string;
}) {
  // Start null to keep SSR/CSR markup identical, then fill on the client.
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysUntil(target));
    const id = setInterval(() => setDays(daysUntil(target)), 60_000);
    return () => clearInterval(id);
  }, [target]);

  const text =
    days === null
      ? " "
      : days === 0
        ? "JÁ DISPONÍVEL"
        : `FALTAM ${days} DIAS`;

  return (
    <span className={className} suppressHydrationWarning>
      {text}
    </span>
  );
}
