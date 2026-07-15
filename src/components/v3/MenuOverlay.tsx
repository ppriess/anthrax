"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useExperience } from "./ExperienceProvider";
import { SCENES } from "./types";

const EXITS = [
  { label: "SITE PRINCIPAL", href: "/" },
  { label: "A BANDA — MEMBROS", href: "/banda/membros" },
  { label: "A BANDA — DISCOGRAFIA", href: "/banda/albuns" },
  { label: "A BANDA — HISTÓRIA", href: "/banda/historia" },
];

/**
 * Índice em tela cheia — o atalho convencional da experiência. Dialog com
 * foco preso, Esc fecha e devolve o foco pro botão do HUD.
 */
export function MenuOverlay() {
  const { menuOpen, setMenuOpen, scrollTo } = useExperience();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const el = ref.current;
    if (!el) return;
    const focusables = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
    focusables()[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document
        .querySelector<HTMLElement>("[data-v3-menu-button]")
        ?.focus();
    };
  }, [menuOpen, setMenuOpen]);

  if (!menuOpen) return null;

  return (
    <div
      id="v3-menu"
      ref={ref}
      className="v3-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Índice da transmissão"
    >
      <p className="v3-kicker" style={{ marginBottom: 24 }}>
        ÍNDICE DA TRANSMISSÃO
      </p>
      <div>
        {SCENES.map((scene) => (
          <a
            key={scene.id}
            href={`#${scene.id}`}
            className="v3-index-row"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              scrollTo(`#${scene.id}`);
            }}
          >
            <span className="v3-mono">{scene.num}</span>
            {scene.label}
          </a>
        ))}
      </div>
      <p className="v3-kicker" style={{ margin: "48px 0 12px" }}>
        SAIR DA TRANSMISSÃO
      </p>
      <nav aria-label="Sair da transmissão" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {EXITS.map((exit) => (
          <Link key={exit.href} href={exit.href} className="v3-btn">
            {exit.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
