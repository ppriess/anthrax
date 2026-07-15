"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceProvider";
import { RecBadge } from "./Telemetry";
import type { BroadcastData } from "./types";

/**
 * Cena 01 — a interceptação. Seção pinada (~3 alturas de viewport no
 * desktop): o wordmark recua, "estilhaços" com legendas atravessam o quadro
 * em profundidades diferentes, hotspots aparecem e por fim a camada fixa do
 * vídeo (#v3-video) colapsa até virar o mini-frame no canto. Toda a timeline
 * é scrubada — rolar pra trás desfaz tudo.
 */
export function SceneHero({ data }: { data: BroadcastData }) {
  const { ready, motion, setSound, scrollTo } = useExperience();
  const sectionRef = useRef<HTMLElement>(null);
  const [lyricsOpen, setLyricsOpen] = useState(false);

  const shards = [
    { text: data.hero.annotation, top: "22%", left: "8%", depth: 1 },
    { text: data.site.tagline, top: "58%", left: "62%", depth: 1.8 },
    { text: data.hero.panelLabel, top: "72%", left: "14%", depth: 1.4 },
    { text: `CANAL 3 — ${data.site.editionShort}`, top: "30%", left: "70%", depth: 2.2 },
  ].filter((s) => s.text);

  useGSAP(
    () => {
      const videoWrap = document.getElementById("v3-video");
      const videoLayer = videoWrap?.querySelector(".v3-video-layer");
      if (!ready) return;
      if (motion !== "full") {
        // sem pin/scrub: hero é uma tela estática; garante mini-frame desfeito
        videoWrap?.classList.remove("is-docked");
        if (videoLayer) gsap.set(videoLayer, { clearProps: "all" });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: desktop ? "+=200%" : "+=120%",
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate(self) {
                videoWrap?.classList.toggle("is-docked", self.progress > 0.94);
              },
            },
          });

          tl.to(".v3-hero-intro", { autoAlpha: 0, y: -40, duration: 0.16 }, 0.02)
            .to(".v3-wordmark", { y: -100, scale: 0.9, opacity: 0.18, duration: 0.34 }, 0.05)
            .fromTo(
              ".v3-shard",
              { yPercent: (i: number) => 60 + i * 30, autoAlpha: 0 },
              {
                yPercent: (i: number) => -80 - i * 40,
                autoAlpha: 1,
                duration: 0.46,
                stagger: 0.05,
              },
              0.16,
            )
            .to(".v3-shard", { autoAlpha: 0, duration: 0.12 }, 0.6)
            .fromTo(
              ".v3-hotspot",
              { autoAlpha: 0, scale: 0.6 },
              { autoAlpha: 1, scale: 1, duration: 0.08, stagger: 0.03 },
              0.34,
            )
            .to(".v3-hotspot", { autoAlpha: 0, duration: 0.08 }, 0.66);

          if (videoLayer) {
            tl.fromTo(
              videoLayer,
              { scale: 1, x: 0, y: 0, transformOrigin: "100% 100%" },
              {
                scale: () =>
                  (desktop
                    ? Math.min(340, window.innerWidth * 0.32)
                    : window.innerWidth * 0.44) / window.innerWidth,
                x: -16,
                y: -16,
                duration: 0.26,
                ease: "power1.inOut",
              },
              0.74,
            );
          }
        },
      );
    },
    { scope: sectionRef, dependencies: [ready, motion], revertOnUpdate: true },
  );

  // Esc fecha o overlay da letra
  useEffect(() => {
    if (!lyricsOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLyricsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lyricsOpen]);

  return (
    <section
      id="s-transmissao"
      ref={sectionRef}
      className="v3-hero"
      aria-label="Cena 01 — Transmissão interceptada"
    >
      {/* wordmark */}
      <div
        className="v3-wordmark v3-display"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 clamp(20px, 6vw, 90px)",
          pointerEvents: "none",
        }}
      >
        {data.hero.titleLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
        <span className="v3-kicker" style={{ marginTop: 18, letterSpacing: "0.3em" }}>
          {data.hero.label || "TRANSMISSÃO INTERCEPTADA"}
        </span>
      </div>

      {/* estilhaços com legendas em profundidades diferentes */}
      {shards.map((shard, i) => (
        <div
          key={i}
          className="v3-shard v3-mono"
          style={{ top: shard.top, left: shard.left }}
          aria-hidden="true"
        >
          {shard.text}
        </div>
      ))}

      {/* hotspots */}
      <button
        type="button"
        className="v3-hotspot"
        style={{ top: "40%", left: "12%" }}
        onClick={() => setLyricsOpen(true)}
      >
        <span>LER O SINAL</span>
      </button>
      <button
        type="button"
        className="v3-hotspot"
        style={{ top: "64%", left: "58%" }}
        onClick={() => scrollTo("#s-circuito")}
      >
        <span>CIRCUITO AO VIVO</span>
      </button>
      <button
        type="button"
        className="v3-hotspot"
        style={{ top: "26%", left: "76%" }}
        onClick={() => scrollTo("#s-arquivo")}
      >
        <span>ARQUIVO SONORO</span>
      </button>

      {/* telemetria + entrada */}
      <div
        className="v3-hero-intro"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "clamp(56px, 9vh, 96px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            className="v3-btn v3-btn--accent"
            onClick={() => setSound(true)}
          >
            ▶ ENTRAR COM SOM
          </button>
          <button
            type="button"
            className="v3-btn"
            onClick={() => scrollTo("#s-sinal")}
          >
            EXPLORAR EM SILÊNCIO
          </button>
        </div>
        <p className="v3-mono" style={{ color: "var(--v3-dim)" }}>
          ▼ ROLE PELA TRANSMISSÃO ▼
        </p>
        <p className="v3-mono" style={{ color: "var(--v3-dim)", opacity: 0.7 }}>
          <RecBadge /> · SINAL {data.videoId ? "ESTÁVEL" : "PERDIDO"} ·{" "}
          {data.site.editionShort}
        </p>
      </div>

      {/* overlay da letra / anotações do sinal */}
      {lyricsOpen && (
        <div
          className="v3-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Anotações do sinal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLyricsOpen(false);
          }}
        >
          <div className="v3-dialog-card">
            <p className="v3-kicker" style={{ marginBottom: 12 }}>
              ANOTAÇÕES DO SINAL — {data.hero.singleName}
            </p>
            <p className="v3-prose" style={{ whiteSpace: "pre-line" }}>
              {data.hero.body}
            </p>
            {data.hero.annotation && (
              <p className="v3-mono" style={{ marginTop: 20, color: "var(--v3-dim)" }}>
                {data.hero.annotation}
              </p>
            )}
            <button
              type="button"
              className="v3-btn"
              style={{ marginTop: 24 }}
              onClick={() => setLyricsOpen(false)}
              autoFocus
            >
              FECHAR
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
