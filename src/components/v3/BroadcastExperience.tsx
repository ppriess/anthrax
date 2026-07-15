"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExperienceProvider, useExperience } from "./ExperienceProvider";
import { BroadcastVideo } from "./BroadcastVideo";
import { Hud } from "./Hud";
import { MenuOverlay } from "./MenuOverlay";
import { SceneHero } from "./SceneHero";
import { SceneSignal } from "./SceneSignal";
import { SceneCircuit } from "./SceneCircuit";
import { SceneArchive } from "./SceneArchive";
import { SceneOrganism } from "./SceneOrganism";
import { SceneExit } from "./SceneExit";
import { SCENES, type BroadcastData } from "./types";

export function BroadcastExperience({ data }: { data: BroadcastData }) {
  return (
    <ExperienceProvider>
      <BroadcastInner data={data} />
    </ExperienceProvider>
  );
}

function BroadcastInner({ data }: { data: BroadcastData }) {
  const { ready, motion, sound, setSound, setActiveScene } = useExperience();
  const rootRef = useRef<HTMLDivElement>(null);

  // indicador de cena via IntersectionObserver — funciona igual nos modos
  // total e reduzido, sem depender do GSAP
  useEffect(() => {
    const sections = SCENES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = SCENES.findIndex((s) => s.id === entry.target.id);
          if (idx >= 0) setActiveScene(idx);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [setActiveScene]);

  // entradas .v3-fade — um único batch pra todas as cenas
  useGSAP(
    () => {
      if (!ready || motion !== "full") return;
      ScrollTrigger.batch(".v3-fade", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
    },
    { scope: rootRef, dependencies: [ready, motion], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="v3-root" id="top">
      <BroadcastVideo videoId={data.videoId} />
      <div className="v3-grain" aria-hidden="true" />
      <div className="v3-vignette" aria-hidden="true" />
      <CursorSpotlight />

      <Hud />
      <MenuOverlay />

      {/* UI do mini-frame — aparece quando #v3-video ganha .is-docked */}
      <div className="v3-miniframe-ui">
        <span className="v3-mono" style={{ color: "var(--v3-fg)", background: "oklch(0.16 0.012 260 / 0.8)", padding: "5px 8px", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span className="v3-live-dot" /> AO VIVO
        </span>
        <button
          type="button"
          className="v3-hud-btn"
          aria-label={sound ? "Silenciar transmissão" : "Ativar som da transmissão"}
          onClick={() => setSound(!sound)}
        >
          {sound ? "🔊" : "🔇"}
        </button>
      </div>

      <main>
        <SceneHero data={data} />
        <SceneSignal data={data} />
        <SceneCircuit data={data} />
        <SceneArchive data={data} />
        <SceneOrganism data={data} />
        <SceneExit data={data} />
      </main>
    </div>
  );
}

/** Holofote que segue o cursor — só desktop com hover e movimento total. */
function CursorSpotlight() {
  const { ready, motion } = useExperience();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || motion !== "full") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    function onMove(e: PointerEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [ready, motion]);

  if (motion !== "full") return null;
  return <div ref={ref} className="v3-spot" aria-hidden="true" />;
}
