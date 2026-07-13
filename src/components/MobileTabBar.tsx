// Estrutura de UI (não é conteúdo editável) — fica no código.
const mobileTabs = [
  { label: "INÍCIO", icon: "⌂", href: "#top", active: true },
  { label: "NOTÍCIAS", icon: "▤", href: "#noticias" },
  { label: "TV", icon: "▶", href: "#anthrax-tv" },
  { label: "BUSCA", icon: "⌕", href: "#busca" },
  { label: "BRASIL", icon: "★", href: "#brasil" },
];

/** Fixed bottom tab bar (paper), mobile only. Touch targets ≥44px. */
export function MobileTabBar() {
  return (
    <nav
      aria-label="Navegação"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-around border-t-4 border-black bg-paper px-2 py-3 text-ink md:hidden"
    >
      {mobileTabs.map((tab) => (
        <a
          key={tab.label}
          href={tab.href}
          className={`flex min-w-[44px] flex-col items-center text-center ${tab.active ? "text-ink" : "text-[#8b8578]"}`}
        >
          <span className="text-[17px] leading-none">{tab.icon}</span>
          <span className="mt-1 text-[10px] font-bold tracking-[0.1em]">
            {tab.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
