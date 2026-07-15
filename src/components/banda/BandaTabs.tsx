const tabs = [
  { key: "membros", label: "Membros", href: "/banda/membros" },
  { key: "albuns", label: "Álbuns", href: "/banda/albuns" },
  { key: "historia", label: "História", href: "/banda/historia" },
] as const;

export function BandaTabs({
  active,
}: {
  active: "membros" | "albuns" | "historia";
}) {
  return (
    <div className="flex gap-2 border-b-[3px] border-hardline bg-paper px-4 pt-4 md:px-10">
      {tabs.map((tab) => (
        <a
          key={tab.key}
          href={tab.href}
          className={`-mb-[3px] border-b-[3px] px-3 py-2 text-sm font-bold tracking-[0.08em] no-underline md:text-base ${
            tab.key === active
              ? "border-ink text-ink"
              : "border-transparent text-paper-meta hover:text-ink"
          }`}
        >
          {tab.label.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
