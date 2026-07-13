import ReactMarkdown from "react-markdown";
import type { News, NewsItem } from "@/lib/content";

function Title({ item, className }: { item: NewsItem; className: string }) {
  if (!item.link) return <span className={className}>{item.title}</span>;
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} no-underline hover:underline`}
    >
      {item.title}
    </a>
  );
}

function FeatureCard({ item, mobile }: { item: NewsItem; mobile?: boolean }) {
  return (
    <article
      className={
        mobile
          ? "mb-[10px] border-[3px] border-black bg-paper p-[14px] text-ink shadow-[4px_4px_0_#000]"
          : "border-[3px] border-black bg-paper text-ink shadow-[5px_5px_0_#000]"
      }
    >
      {!mobile &&
        (item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-[200px] w-full border-b-[3px] border-black object-cover"
          />
        ) : (
          <div className="hatch-paper flex h-[200px] items-center justify-center border-b-[3px] border-black">
            <span className="font-mono text-[11px] text-paper-meta">
              {item.photoLabel}
            </span>
          </div>
        ))}
      <div className={mobile ? "" : "px-[18px] py-4"}>
        <div className="mb-2 flex gap-2 font-mono text-[11px]">
          {item.hot && (
            <span className="bg-hot px-[7px] py-[2px] font-bold text-paper">
              QUENTE
            </span>
          )}
          <span className="text-paper-meta">{item.source}</span>
        </div>
        <h3 className={mobile ? "m-0 text-lg font-bold leading-[1.1]" : "m-0"}>
          <Title
            item={item}
            className={
              mobile
                ? "font-bold leading-[1.1] text-lg"
                : "mb-[6px] block text-2xl font-bold leading-[1.1]"
            }
          />
        </h3>
        {!mobile && item.excerpt && (
          <p className="m-0 text-base leading-[1.35] text-paper-hi">
            {item.excerpt}
          </p>
        )}
        {!mobile && item.body && (
          <div className="prose-news mt-2 text-base leading-[1.35] text-paper-hi">
            <ReactMarkdown>{item.body}</ReactMarkdown>
          </div>
        )}
      </div>
    </article>
  );
}

function DarkCard({ item, grow }: { item: NewsItem; grow?: boolean }) {
  return (
    <article
      className={`border-2 border-border-dark bg-card-dark p-[15px] ${grow ? "flex-1" : ""}`}
    >
      <div className="mb-[5px] font-mono text-[11px] text-on-dark-3">
        {item.source}
      </div>
      <h4 className="m-0">
        <Title
          item={item}
          className="block text-lg font-semibold leading-[1.2] text-paper"
        />
      </h4>
      {item.feed && (
        <span className="mt-[6px] inline-block text-[13px] font-semibold tracking-[0.08em] text-signal">
          VER FEED COMPLETO →
        </span>
      )}
    </article>
  );
}

export function NewsSection({ news }: { news: News }) {
  const feature = news.items.find((n) => n.variant === "feature")!;
  const dark = news.items.filter((n) => n.variant === "dark");

  return (
    <section id="noticias" aria-label="Notícias" className="px-4 py-[22px] md:px-10 md:pb-10 md:pt-[10px]">
      <div className="mb-3 flex items-center gap-[14px] md:mb-5">
        <h2 className="m-0 inline-block -rotate-[0.8deg] bg-signal px-[10px] py-[3px] font-display text-[19px] uppercase text-ink md:px-[14px] md:py-1 md:text-[28px]">
          {news.title}
        </h2>
        <span className="hidden font-mono text-xs text-brasil-dark md:inline">
          {news.kicker}
        </span>
        <a
          href="#noticias"
          className="ml-auto hidden text-[15px] font-bold tracking-[0.1em] text-signal no-underline md:inline"
        >
          {news.archiveCta}
        </a>
      </div>

      {/* Desktop grid */}
      <div className="hidden grid-cols-[1.4fr_1fr_1fr] gap-[18px] md:grid">
        <FeatureCard item={feature} />
        <div className="flex flex-col gap-[14px]">
          {dark.slice(0, 2).map((n) => (
            <DarkCard key={n.id} item={n} />
          ))}
        </div>
        <div className="flex flex-col gap-[14px]">
          {dark.slice(2).map((n, i) => (
            <DarkCard key={n.id} item={n} grow={i === dark.slice(2).length - 1} />
          ))}
        </div>
      </div>

      {/* Mobile stack */}
      <div className="block md:hidden">
        <FeatureCard item={feature} mobile />
        <div className="flex flex-col gap-2">
          <DarkCard item={dark[0]} />
          <DarkCard item={dark.find((n) => n.feed) ?? dark[dark.length - 1]} />
        </div>
      </div>
    </section>
  );
}
