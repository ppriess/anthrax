"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceProvider";
import type { BroadcastData } from "./types";

/**
 * Cena 04 — arquivo sonoro. No desktop com movimento total a discografia é
 * uma viagem horizontal pinada (scroll vertical translada o trilho no eixo
 * x). No mobile e em movimento reduzido vira pilha vertical comum (CSS).
 */
export function SceneArchive({ data }: { data: BroadcastData }) {
  const { ready, motion } = useExperience();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready || motion !== "full") return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + distance(),
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [ready, motion], revertOnUpdate: true },
  );

  return (
    <section
      id="s-arquivo"
      ref={sectionRef}
      className="v3-scene"
      aria-label="Cena 04 — Arquivo sonoro"
      style={{ padding: 0 }}
    >
      <div className="v3-archive-viewport" style={{ padding: "var(--v3-space-xl) clamp(20px, 5vw, 80px)" }}>
        <div ref={trackRef} className="v3-archive-track">
          <header style={{ alignSelf: "center", flex: "none", maxWidth: 380 }}>
            <div className="v3-scene-head" style={{ marginBottom: 20 }}>
              <span className="v3-scene-num">04 / ARQUIVO SONORO</span>
            </div>
            <h2 className="v3-display v3-title-lg">{data.albuns.title}</h2>
            <p className="v3-prose" style={{ marginTop: 16 }}>
              {data.albuns.subtitle}
            </p>
            <p className="v3-mono" style={{ marginTop: 24, color: "var(--v3-dim)" }}>
              → ROLE PARA ATRAVESSAR AS ERAS
            </p>
          </header>

          {data.albuns.items.map((album) => (
            <article key={album.id} className="v3-album v3-fade">
              <span className="v3-album-year" aria-hidden="true">
                {album.year}
              </span>
              {album.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={album.cover}
                  alt={`Capa de ${album.title}`}
                  loading="lazy"
                  style={{
                    width: 180,
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    display: "block",
                    marginBottom: 14,
                  }}
                />
              ) : (
                album.coverLabel && (
                  <span className="v3-tape">{album.coverLabel}</span>
                )
              )}
              <h3 className="v3-display" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)" }}>
                {album.title}
              </h3>
              <p className="v3-mono" style={{ margin: "10px 0 16px", color: "var(--v3-accent)" }}>
                {album.year}
                {album.label ? ` · ${album.label}` : ""}
              </p>
              {album.description && (
                <p className="v3-prose" style={{ fontSize: 16 }}>
                  {album.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
