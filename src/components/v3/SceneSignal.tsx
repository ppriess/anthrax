"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceProvider";
import type { BroadcastData } from "./types";

/**
 * Cena 02 — o sinal atual. O vídeo já virou mini-frame no canto; aqui o
 * single ocupa a tela como interrupção tipográfica, com as ações ao redor.
 */
export function SceneSignal({ data }: { data: BroadcastData }) {
  const { ready, motion, setSound, scrollTo } = useExperience();
  const sectionRef = useRef<HTMLElement>(null);
  const featured = data.tv.videos[0];

  useGSAP(
    () => {
      if (!ready || motion !== "full") return;
      gsap.fromTo(
        ".v3-signal-title",
        { skewY: 2.5, y: 60, autoAlpha: 0 },
        {
          skewY: 0,
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        },
      );
    },
    { scope: sectionRef, dependencies: [ready, motion], revertOnUpdate: true },
  );

  return (
    <section
      id="s-sinal"
      ref={sectionRef}
      className="v3-scene"
      aria-label="Cena 02 — Sinal atual"
      style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      <div className="v3-scene-head">
        <span className="v3-scene-num">02 / SINAL ATUAL</span>
        <span className="v3-rule" />
      </div>

      <p className="v3-kicker v3-fade">{data.hero.panelLabel}</p>
      <h1 className="v3-display v3-title-xl v3-signal-title" style={{ margin: "12px 0 28px" }}>
        {data.hero.singleName}
      </h1>
      <p className="v3-prose v3-fade">{data.hero.body}</p>

      <div className="v3-fade" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 40 }}>
        <button
          type="button"
          className="v3-btn v3-btn--accent"
          onClick={() => {
            setSound(true);
            scrollTo("#s-transmissao");
          }}
        >
          {data.hero.primaryCta || "OUVIR O SINAL"}
        </button>
        {featured?.sourceUrl && (
          <a
            className="v3-btn"
            href={featured.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            ASSISTIR NA FONTE ↗
          </a>
        )}
        <button type="button" className="v3-btn" onClick={() => scrollTo("#s-arquivo")}>
          {data.hero.secondaryCta || "ENTRAR NO ARQUIVO"}
        </button>
      </div>

      {featured && (
        <p className="v3-mono v3-fade" style={{ marginTop: 36, color: "var(--v3-dim)" }}>
          NA TELA: {featured.title} — {featured.meta}
          {featured.duration ? ` · ${featured.duration}` : ""}
        </p>
      )}
    </section>
  );
}
