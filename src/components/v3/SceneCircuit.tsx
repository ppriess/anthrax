"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceProvider";
import type { BroadcastData } from "./types";

/**
 * Cena 03 — circuito ao vivo. As datas da agenda ficam ao longo de uma rota
 * SVG em zigue-zague que se desenha com o scroll (stroke-dashoffset); cada
 * parada "acende" quando a rota chega nela e expande detalhes ao clique.
 */
export function SceneCircuit({ data }: { data: BroadcastData }) {
  const { ready, motion } = useExperience();
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const items = data.agenda.items;
  const n = Math.max(items.length, 1);
  // coordenadas normalizadas (viewBox 0..100 x, 0..100n y), esticadas pelo container
  const points = items.map((_, i) => ({
    x: i % 2 === 0 ? 22 : 78,
    y: ((i + 0.5) / n) * (n * 100),
  }));
  const d =
    `M 50 0 ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L 50 ${n * 100}`;

  useGSAP(
    () => {
      if (!ready || motion !== "full") return;
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
      gsap.utils.toArray<HTMLElement>(".v3-stop").forEach((stop) => {
        ScrollTrigger.create({
          trigger: stop,
          start: "top 65%",
          onEnter: () => stop.classList.add("is-lit"),
          onLeaveBack: () => stop.classList.remove("is-lit"),
        });
      });
    },
    { scope: sectionRef, dependencies: [ready, motion], revertOnUpdate: true },
  );

  return (
    <section
      id="s-circuito"
      ref={sectionRef}
      className="v3-scene v3-scene--surface v3-circuit"
      aria-label="Cena 03 — Circuito ao vivo"
    >
      <div className="v3-scene-head">
        <span className="v3-scene-num">03 / CIRCUITO AO VIVO</span>
        <span className="v3-rule" />
      </div>
      <h2 className="v3-display v3-title-lg v3-fade" style={{ marginBottom: 16 }}>
        {data.agenda.title}
      </h2>
      <p className="v3-mono v3-fade" style={{ color: "var(--v3-dim)", maxWidth: 520 }}>
        {data.agenda.alert}
      </p>

      <div style={{ position: "relative", marginTop: "var(--v3-space-lg)" }}>
        <svg
          className="v3-circuit-svg"
          viewBox={`0 0 100 ${n * 100}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path ref={pathRef} d={d} />
        </svg>

        <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative" }}>
          {items.map((item) => {
            const open = openId === item.id;
            return (
              <li key={item.id} className="v3-stop v3-fade">
                {/* só phrasing content dentro do <button>: spans com display block */}
                <button
                  type="button"
                  className="v3-stop-card"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  <span className="v3-mono" style={{ display: "block", color: "var(--v3-accent)", marginBottom: 8 }}>
                    <span className="v3-stop-dot" aria-hidden="true" />
                    {item.date}
                  </span>
                  <span className="v3-display" style={{ display: "block", fontSize: "clamp(1.2rem, 2.4vw, 1.9rem)" }}>
                    {item.title}
                  </span>
                  <span className={`v3-expand${open ? " is-open" : ""}`}>
                    <span style={{ display: "block" }}>
                      <span className="v3-prose" style={{ display: "block", paddingTop: 12, fontSize: 16 }}>
                        {item.meta}
                      </span>
                    </span>
                  </span>
                  <span className="v3-mono" style={{ display: "block", marginTop: 10, color: "var(--v3-dim)", fontSize: 10 }}>
                    {open ? "− FECHAR" : "+ DETALHES"}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="v3-mono v3-fade" style={{ marginTop: 32, color: "var(--v3-dim)" }}>
        {data.agenda.alertConfirm}
      </p>
    </section>
  );
}
