"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  campaigns,
  filters,
  latestSignals,
  spotlight,
  timelineItems,
  type EditorialFilter,
  type EditorialItem,
} from "./data";

function Icon({
  name,
  size = 18,
}: {
  name:
    | "search"
    | "signal"
    | "play"
    | "arrow"
    | "external"
    | "video"
    | "social"
    | "archive"
    | "event"
    | "quiz"
    | "close"
    | "menu"
    | "eye"
    | "comment";
  size?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    signal: (
      <>
        <path d="M4 19v-3M9 19v-7M14 19V8M19 19V4" />
      </>
    ),
    play: <path d="m9 6 9 6-9 6Z" />,
    arrow: <path d="m8 5 7 7-7 7" />,
    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v6H5V6h6" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="5" width="18" height="14" />
        <path d="m10 9 6 3-6 3Z" />
      </>
    ),
    social: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" />
      </>
    ),
    archive: (
      <>
        <path d="M4 7h16v13H4zM3 4h18v3H3z" />
        <path d="M9 11h6" />
      </>
    ),
    event: (
      <>
        <path d="M5 3v4M19 3v4M4 8h16v12H4z" />
        <path d="M8 12h3M13 12h3M8 16h3" />
      </>
    ),
    quiz: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.4 2.4 0 1 1 3.4 2.2c-.9.4-1.2 1-1.2 1.8M12 17h.01" />
      </>
    ),
    close: <path d="M5 5l14 14M19 5 5 19" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    eye: (
      <>
        <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" />
        <circle cx="12" cy="12" r="2.3" />
      </>
    ),
    comment: <path d="M4 5h16v11H9l-5 4Z" />,
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {paths[name]}
    </svg>
  );
}

function Action({
  action,
  primary = false,
  onClick,
}: {
  action: EditorialItem["primaryAction"];
  primary?: boolean;
  onClick?: () => void;
}) {
  const className = `v4-action${primary ? " is-primary" : ""}`;
  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {primary && <Icon name="play" size={14} />}
        {action.label}
      </button>
    );
  }
  return (
    <a
      className={className}
      href={action.href ?? "#"}
      target={action.href?.startsWith("http") ? "_blank" : undefined}
      rel={action.href?.startsWith("http") ? "noreferrer" : undefined}
    >
      {action.label}
      {action.href?.startsWith("http") ? (
        <Icon name="external" size={13} />
      ) : (
        <Icon name="arrow" size={13} />
      )}
    </a>
  );
}

function Header({
  signalMode,
  onMode,
}: {
  signalMode: string;
  onMode: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["NOTÍCIAS", "#timeline"],
    ["ANTHRAX TV", "#spotlight"],
    ["DISCOGRAFIA", "/banda/albuns"],
    ["BANDA", "/banda/membros"],
    ["SHOWS", "#shows"],
    ["ANTHRAX + BRASIL", "#brasil"],
  ];

  return (
    <header className="v4-header">
      <a className="v4-brand" href="#top" aria-label="Anthrax Brasil, início">
        <strong>ANTHRAX BRASIL</strong>
        <span>SITE OFICIAL NO BRASIL</span>
        <b>EST. 2004</b>
      </a>
      <nav className={menuOpen ? "is-open" : ""} aria-label="Navegação principal">
        {links.map(([label, href], index) => (
          <a
            key={label}
            href={href}
            className={index === 0 ? "is-active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="v4-header-tools">
        <button className="v4-icon-button v4-search" aria-label="Abrir busca">
          <Icon name="search" size={20} />
        </button>
        <button className="v4-mode" onClick={onMode}>
          SINAL: {signalMode}
          <Icon name="signal" size={17} />
        </button>
        <button
          className="v4-icon-button v4-menu-button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={21} />
        </button>
      </div>
    </header>
  );
}

function Spotlight({
  item,
  isTemporary,
  onRestore,
  onVideo,
}: {
  item: EditorialItem;
  isTemporary: boolean;
  onRestore: () => void;
  onVideo: (item: EditorialItem) => void;
}) {
  return (
    <article className="v4-spotlight" id="spotlight" key={item.id}>
      <img src={item.image} alt={item.imageAlt} />
      <div className="v4-media-treatment" aria-hidden="true" />
      <div className="v4-target target-a" aria-hidden="true" />
      <div className="v4-video-spec">
        <span>PLAY ▶</span>
        <span>{item.type === "video" ? "OFFICIAL VIDEO" : item.source}</span>
        <span>1080P / 24FPS</span>
      </div>
      {item.video && (
        <button
          type="button"
          className="v4-big-play"
          aria-label={`Reproduzir ${item.title}`}
          onClick={() => onVideo(item)}
        >
          <Icon name="play" size={38} />
        </button>
      )}
      <div className="v4-spotlight-copy">
        {isTemporary && (
          <button className="v4-restore" type="button" onClick={onRestore}>
            ← VOLTAR AO DESTAQUE
          </button>
        )}
        <p className={`v4-kicker type-${item.type}`}>
          {item.external ? `${item.source} · ` : ""}
          {item.category}
        </p>
        <h1>{item.title}</h1>
        <p className="v4-summary">{item.summary}</p>
        <div className="v4-actions">
          <Action
            action={item.primaryAction}
            primary
            onClick={item.video ? () => onVideo(item) : undefined}
          />
          {item.secondaryAction && <Action action={item.secondaryAction} />}
        </div>
      </div>
      <div className="v4-position" aria-label="Destaque 1 de 5">
        <span>01</span> / 05
      </div>
    </article>
  );
}

function LatestRail({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (item: EditorialItem) => void;
}) {
  const iconFor = (type: EditorialItem["type"]) =>
    type === "video"
      ? "video"
      : type === "social"
        ? "social"
        : type === "archive"
          ? "archive"
          : "external";

  return (
    <aside className="v4-latest" aria-labelledby="latest-title">
      <div className="v4-latest-heading">
        <h2 id="latest-title">ÚLTIMO SINAL</h2>
        <span className="v4-live-dot" />
        <span className="v4-wave" aria-hidden="true" />
      </div>
      <div className="v4-latest-list">
        {latestSignals.map((item) => (
          <button
            type="button"
            key={item.id}
            className={selected === item.id ? "is-selected" : ""}
            onClick={() => onSelect(item)}
          >
            <span className={`v4-signal-icon type-${item.type}`}>
              <Icon name={iconFor(item.type)} size={18} />
            </span>
            <span className="v4-signal-copy">
              <span className="v4-signal-meta">
                <b>{item.relativeTime}</b> · {item.category}
              </span>
              <strong>{item.shortTitle}</strong>
              <span className="v4-signal-source">
                {item.source}
                {item.external && <Icon name="external" size={11} />}
              </span>
            </span>
          </button>
        ))}
      </div>
      <a className="v4-all-signals" href="#timeline">
        VER TODOS OS SINAIS <Icon name="arrow" size={14} />
      </a>
    </aside>
  );
}

function CampaignDock({ compact }: { compact: boolean }) {
  return (
    <section className={`v4-campaigns${compact ? " is-compact" : ""}`}>
      {campaigns.map((item, index) => (
        <article className={`v4-campaign campaign-${index + 1}`} key={item.id}>
          <span className="v4-campaign-index">{index === 0 ? "A" : "B"}</span>
          <div className="v4-campaign-image">
            <img src={item.image} alt={item.imageAlt} />
            {index === 1 && <span>IT’S FOR<br />THE KIDS</span>}
          </div>
          <div className="v4-campaign-copy">
            <p>{item.relativeTime}</p>
            <h2>{item.title}</h2>
            {index === 0 ? (
              <div className="v4-release">
                <span>{item.category}</span>
                <strong>{item.date}</strong>
              </div>
            ) : (
              <p className="v4-campaign-summary">{item.summary}</p>
            )}
            <div className="v4-actions">
              <Action action={item.primaryAction} primary={index === 0} />
              {item.secondaryAction && <Action action={item.secondaryAction} />}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function TimelineCard({
  item,
  onVideo,
}: {
  item: EditorialItem;
  onVideo: (item: EditorialItem) => void;
}) {
  const icon =
    item.type === "video"
      ? "play"
      : item.type === "social"
        ? "social"
        : item.type === "archive"
          ? "archive"
          : item.type === "event"
            ? "event"
            : item.type === "quiz"
              ? "quiz"
              : "external";
  return (
    <article
      className={`v4-timeline-row priority-${item.priority} type-${item.type}`}
      id={item.type === "event" ? "shows" : item.type === "archive" ? "brasil" : item.type === "quiz" ? "quiz" : undefined}
    >
      <div className="v4-date">
        <strong>{item.date.replace(" 2026", "")}</strong>
        {item.date.includes("2026") && <strong>2026</strong>}
        <span>{item.dayLabel ?? item.relativeTime}</span>
      </div>
      <span className="v4-node-icon">
        <Icon name={icon} size={20} />
      </span>
      <div className="v4-story">
        {item.priority > 1 && (
          <div className="v4-story-media">
            <img src={item.image} alt={item.imageAlt} />
            {item.video && (
              <button
                type="button"
                aria-label={`Reproduzir ${item.title}`}
                onClick={() => onVideo(item)}
              >
                <Icon name="play" size={26} />
              </button>
            )}
          </div>
        )}
        <div className="v4-story-copy">
          <div className="v4-story-meta">
            <span>{item.category}</span>
            <b>{item.source} · {item.relativeTime}</b>
          </div>
          {item.priority > 1 && <h3>{item.title}</h3>}
          <p>{item.summary}</p>
          <div className="v4-story-footer">
            {item.engagement && (
              <span className="v4-engagement">
                <Icon name="eye" size={14} /> {item.engagement}
                <Icon name="comment" size={14} /> {item.comments}
              </span>
            )}
            {item.video ? (
              <Action
                action={item.primaryAction}
                primary
                onClick={() => onVideo(item)}
              />
            ) : (
              <Action action={item.primaryAction} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function matchesFilter(item: EditorialItem, filter: EditorialFilter) {
  if (filter === "todos") return true;
  if (filter === "oficial") return item.official;
  if (filter === "noticias") return item.type === "external";
  if (filter === "videos") return item.type === "video";
  if (filter === "ao-vivo") return item.type === "event";
  if (filter === "brasil") return Boolean(item.brazilCategory);
  return item.type === "archive";
}

function VideoDialog({
  item,
  onClose,
}: {
  item: EditorialItem | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!item) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);
  if (!item) return null;
  return (
    <div className="v4-modal" role="dialog" aria-modal="true" aria-label={item.title}>
      <button
        className="v4-modal-backdrop"
        onClick={onClose}
        aria-label="Fechar vídeo"
      />
      <div className="v4-modal-panel">
        <div className="v4-modal-head">
          <div>
            <span>ANTHRAX TV · TRANSMISSÃO SOB DEMANDA</span>
            <strong>{item.title}</strong>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Fechar vídeo">
            <Icon name="close" size={22} />
          </button>
        </div>
        <div className="v4-player">
          {item.video ? (
            <iframe
              src={`${item.video}?autoplay=1`}
              title={item.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img src={item.image} alt={item.imageAlt} />
          )}
        </div>
      </div>
    </div>
  );
}

export function V4Homepage() {
  const [signalMode, setSignalMode] = useState("PADRÃO");
  const [activeSpotlight, setActiveSpotlight] = useState(spotlight);
  const [activeFilter, setActiveFilter] =
    useState<EditorialFilter>("todos");
  const [newestFirst, setNewestFirst] = useState(true);
  const [videoItem, setVideoItem] = useState<EditorialItem | null>(null);
  const [compactDock, setCompactDock] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompactDock(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleTimeline = useMemo(() => {
    const items = timelineItems.filter((item) =>
      matchesFilter(item, activeFilter),
    );
    return [...items].sort((a, b) =>
      newestFirst
        ? b.dateISO.localeCompare(a.dateISO)
        : a.dateISO.localeCompare(b.dateISO),
    );
  }, [activeFilter, newestFirst]);

  function cycleSignalMode() {
    const modes = ["PADRÃO", "DENSO", "SÓ OFICIAL"];
    const index = modes.indexOf(signalMode);
    const next = modes[(index + 1) % modes.length];
    setSignalMode(next);
    if (next === "SÓ OFICIAL") setActiveFilter("oficial");
    if (signalMode === "SÓ OFICIAL") setActiveFilter("todos");
  }

  return (
    <div className={`v4-page mode-${signalMode.toLowerCase().replace(" ", "-")}`} id="top">
      <Header signalMode={signalMode} onMode={cycleSignalMode} />
      <main>
        <section className="v4-dashboard" aria-label="Destaques e sinais recentes">
          <Spotlight
            item={activeSpotlight}
            isTemporary={activeSpotlight.id !== spotlight.id}
            onRestore={() => setActiveSpotlight(spotlight)}
            onVideo={setVideoItem}
          />
          <LatestRail
            selected={activeSpotlight.id}
            onSelect={setActiveSpotlight}
          />
          <CampaignDock compact={compactDock} />
        </section>

        <section className="v4-timeline" id="timeline" aria-labelledby="timeline-title">
          <h2 className="sr-only" id="timeline-title">Linha do tempo editorial</h2>
          <div className="v4-filterbar">
            <div className="v4-filter-scroll" role="group" aria-label="Filtrar sinais">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter.id}
                  className={activeFilter === filter.id ? "is-active" : ""}
                  aria-pressed={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="v4-order"
              onClick={() => setNewestFirst((value) => !value)}
            >
              ORDENAR: {newestFirst ? "MAIS RECENTES" : "MAIS ANTIGOS"}⌄
            </button>
          </div>
          <div className="v4-timeline-list">
            {visibleTimeline.map((item) => (
              <TimelineCard key={item.id} item={item} onVideo={setVideoItem} />
            ))}
            {visibleTimeline.length === 0 && (
              <p className="v4-empty">
                NENHUM SINAL NESTA FREQUÊNCIA. SELECIONE OUTRO FILTRO.
              </p>
            )}
          </div>
        </section>
      </main>
      <footer className="v4-footer">
        <strong>ANTHRAX BRASIL</strong>
        <span>SINAL INDEPENDENTE · NO AR DESDE 2004</span>
        <a href="#top">VOLTAR AO TOPO ↑</a>
      </footer>
      <VideoDialog item={videoItem} onClose={() => setVideoItem(null)} />
    </div>
  );
}
