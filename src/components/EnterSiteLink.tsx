"use client";

import { GATE_BYPASS_COOKIE } from "@/lib/gate";

export function EnterSiteLink({ className }: { className?: string }) {
  function handleClick() {
    // cookie de sessão (sem max-age) — some quando o navegador fecha, então
    // uma visita nova durante a campanha volta a ver o gate em "/"
    document.cookie = `${GATE_BYPASS_COOKIE}=1; path=/`;
  }

  return (
    <a href="/" onClick={handleClick} className={className}>
      ENTRAR NO SITE →
    </a>
  );
}
