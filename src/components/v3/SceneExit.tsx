"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useExperience } from "./ExperienceProvider";
import type { BroadcastData } from "./types";

type Signal = {
  kind: string;
  title: string;
  meta?: string;
  href?: string;
};

/**
 * Cena 06 — a saída. Encerramento da transmissão: créditos, rotas de saída
 * pro site normal e o "RECEBER OUTRO SINAL", que sorteia um item do arquivo
 * (vídeos, notícias, discos) já carregado nos props — sem endpoint extra.
 */
export function SceneExit({ data }: { data: BroadcastData }) {
  const { scrollTo } = useExperience();
  const [signal, setSignal] = useState<Signal | null>(null);
  const [seq, setSeq] = useState(0);

  const pool = useMemo<Signal[]>(
    () => [
      ...data.tv.videos.map((v) => ({
        kind: "SINAL DE VÍDEO",
        title: v.title,
        meta: v.meta,
        href: v.sourceUrl,
      })),
      ...data.news.items.map((n) => ({
        kind: "NOTÍCIA INTERCEPTADA",
        title: n.title,
        meta: `${n.source} · ${n.date}`,
        href: n.link,
      })),
      ...data.albuns.items.map((a) => ({
        kind: "REGISTRO DE ARQUIVO",
        title: a.title,
        meta: `${a.year}${a.label ? ` · ${a.label}` : ""}`,
      })),
    ],
    [data],
  );

  function receiveSignal() {
    if (pool.length === 0) return;
    let next = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1) {
      while (next.title === signal?.title) {
        next = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    setSignal(next);
    setSeq((s) => s + 1); // re-dispara a animação de estática
  }

  return (
    <section
      id="s-saida"
      className="v3-scene"
      aria-label="Cena 06 — Fim da transmissão"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      <div className="v3-scene-head">
        <span className="v3-scene-num">06 / FIM DA TRANSMISSÃO</span>
        <span className="v3-rule" />
      </div>

      <h2 className="v3-display v3-title-xl v3-fade">{data.footer.wordmark}</h2>
      <p className="v3-prose v3-fade" style={{ marginTop: 20 }}>
        {data.footer.signature}
      </p>

      <div className="v3-fade" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 40 }}>
        <button type="button" className="v3-btn v3-btn--accent" onClick={receiveSignal}>
          ⟳ RECEBER OUTRO SINAL
        </button>
        <button type="button" className="v3-btn" onClick={() => scrollTo(0)}>
          REINICIAR TRANSMISSÃO
        </button>
        <Link href="/" className="v3-btn">
          SAIR PARA O SITE ↗
        </Link>
      </div>

      {signal && (
        <div key={seq} className="v3-signal-card is-fresh" style={{ marginTop: 36 }} aria-live="polite">
          <p className="v3-kicker" style={{ marginBottom: 8 }}>
            {signal.kind}
          </p>
          <p className="v3-display" style={{ fontSize: "clamp(1.2rem, 2.6vw, 2rem)" }}>
            {signal.title}
          </p>
          {signal.meta && (
            <p className="v3-mono" style={{ marginTop: 10, color: "var(--v3-dim)" }}>
              {signal.meta}
            </p>
          )}
          {signal.href && (
            <a
              className="v3-btn"
              style={{ marginTop: 18 }}
              href={signal.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              SEGUIR O SINAL ↗
            </a>
          )}
        </div>
      )}

      <p className="v3-mono" style={{ marginTop: "var(--v3-space-xl)", color: "var(--v3-dim)", maxWidth: "68ch" }}>
        {data.footer.disclaimer}
      </p>
      <p className="v3-mono" style={{ marginTop: 12, color: "var(--v3-dim)", opacity: 0.6 }}>
        ▚▞ TRANSMISSÃO ENCERRADA — {data.site.edition} ▞▚
      </p>
    </section>
  );
}
