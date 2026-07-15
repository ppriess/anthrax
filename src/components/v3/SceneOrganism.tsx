"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceProvider";
import type { BroadcastData } from "./types";

/**
 * Cena 05 — organismo da banda. Membros atuais como retratos sobrepostos
 * (painéis duotone com a inicial gigante, sem fotos no CMS); clicar/tocar
 * seleciona e revela papel, bio e situação atual num painel único.
 * Ex-membros viram a lista mono "SINAIS ANTERIORES".
 */
export function SceneOrganism({ data }: { data: BroadcastData }) {
  const { ready, motion } = useExperience();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const current = data.membros.items.filter((m) => m.current !== false);
  const former = data.membros.items.filter((m) => m.current === false);
  const selected = current.find((m) => m.id === selectedId) ?? null;

  useGSAP(
    () => {
      if (!ready || motion !== "full") return;
      gsap.fromTo(
        ".v3-member",
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
        },
      );
    },
    { scope: sectionRef, dependencies: [ready, motion], revertOnUpdate: true },
  );

  return (
    <section
      id="s-organismo"
      ref={sectionRef}
      className="v3-scene v3-scene--surface"
      aria-label="Cena 05 — Organismo da banda"
    >
      <div className="v3-scene-head">
        <span className="v3-scene-num">05 / ORGANISMO</span>
        <span className="v3-rule" />
      </div>
      <h2 className="v3-display v3-title-lg v3-fade">{data.membros.title}</h2>
      <p className="v3-prose v3-fade" style={{ marginTop: 12 }}>
        {data.membros.subtitle}
      </p>

      <div className="v3-organism" role="group" aria-label="Membros atuais">
        {current.map((member, i) => {
          const tilt = ((i % 3) - 1) * 1.4; // -1.4 / 0 / 1.4 graus
          const off = (i % 4) * 14;
          const pressed = member.id === selectedId;
          return (
            <button
              key={member.id}
              type="button"
              className="v3-member"
              aria-pressed={pressed}
              style={
                {
                  "--v3-tilt": `${tilt}deg`,
                  "--v3-off": `${off}px`,
                  zIndex: pressed ? 6 : i % 3,
                } as React.CSSProperties
              }
              onClick={() => setSelectedId(pressed ? null : member.id)}
            >
              <span className="v3-member-initial" aria-hidden="true">
                {member.name.charAt(0)}
              </span>
              <span className="v3-display" style={{ display: "block", fontSize: "clamp(0.95rem, 1.6vw, 1.3rem)", position: "relative" }}>
                {member.name}
              </span>
              <span className="v3-mono" style={{ display: "block", color: "var(--v3-accent)", marginTop: 6, position: "relative" }}>
                {member.role}
              </span>
            </button>
          );
        })}
      </div>

      <div className="v3-member-detail" aria-live="polite">
        {selected ? (
          <>
            <p className="v3-kicker">
              {selected.name} — {selected.role}
              {selected.years ? ` · ${selected.years}` : ""}
            </p>
            {selected.bio && (
              <p className="v3-prose" style={{ marginTop: 10 }}>
                {selected.bio}
              </p>
            )}
            {selected.now && (
              <p className="v3-mono" style={{ marginTop: 14, color: "var(--v3-dim)" }}>
                AGORA: {selected.now}
              </p>
            )}
          </>
        ) : (
          <p className="v3-mono" style={{ color: "var(--v3-dim)" }}>
            TOQUE NUM SINAL PARA IDENTIFICAR O MEMBRO
          </p>
        )}
      </div>

      {former.length > 0 && (
        <div className="v3-fade" style={{ marginTop: "var(--v3-space-lg)" }}>
          <p className="v3-kicker" style={{ marginBottom: 10 }}>
            SINAIS ANTERIORES
          </p>
          <ul className="v3-mono" style={{ listStyle: "none", margin: 0, padding: 0, color: "var(--v3-dim)", display: "flex", flexWrap: "wrap", gap: "6px 22px" }}>
            {former.map((m) => (
              <li key={m.id}>
                {m.name} — {m.role}
                {m.years ? ` (${m.years})` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
