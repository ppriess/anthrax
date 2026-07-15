"use client";

import { useExperience } from "./ExperienceProvider";
import { SCENES } from "./types";
import { RecBadge, Timecode } from "./Telemetry";

/**
 * Chrome fixo da transmissão: wordmark, hambúrguer, indicador de cena e os
 * dois controles de usabilidade (SOM e MOVIMENTO), sempre visíveis.
 */
export function Hud() {
  const {
    sound,
    setSound,
    motion,
    setMotion,
    menuOpen,
    setMenuOpen,
    activeScene,
    scrollTo,
  } = useExperience();

  return (
    <div className="v3-hud">
      <div className="v3-hud-tl" style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <button
          type="button"
          className="v3-hud-btn"
          onClick={() => scrollTo(0)}
          aria-label="Voltar ao início da transmissão"
        >
          ANTHRAX//BR — TRANSMISSÃO
        </button>
        <span className="hidden md:inline-flex" style={{ gap: 12, alignItems: "center" }}>
          <RecBadge />
        </span>
      </div>

      <div className="v3-hud-tr">
        <button
          type="button"
          className="v3-hud-btn"
          aria-label={menuOpen ? "Fechar índice da transmissão" : "Abrir índice da transmissão"}
          aria-expanded={menuOpen}
          aria-controls="v3-menu"
          data-v3-menu-button
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕ FECHAR" : "☰ ÍNDICE"}
        </button>
      </div>

      <nav className="v3-hud-bl v3-scene-nav" aria-label="Cenas da transmissão">
        {SCENES.map((scene, i) => (
          <a
            key={scene.id}
            href={`#${scene.id}`}
            className={i === activeScene ? "is-active" : undefined}
            aria-current={i === activeScene ? "true" : undefined}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(`#${scene.id}`);
            }}
          >
            {scene.num} <span className="v3-scene-label">{scene.label}</span>
          </a>
        ))}
      </nav>

      <div className="v3-hud-br" style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
        <Timecode />
        <button
          type="button"
          className="v3-hud-btn"
          aria-pressed={sound}
          onClick={() => setSound(!sound)}
        >
          SOM: {sound ? "ON" : "OFF"}
        </button>
        <button
          type="button"
          className="v3-hud-btn"
          aria-pressed={motion === "reduced"}
          onClick={() => setMotion(motion === "full" ? "reduced" : "full")}
        >
          MOVIMENTO: {motion === "full" ? "TOTAL" : "REDUZIDO"}
        </button>
      </div>
    </div>
  );
}
