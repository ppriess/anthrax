import Link from "next/link";
import { logout } from "@/lib/admin-actions";

const links = [
  { href: "/admin", label: "Painel" },
  { href: "/admin/noticias", label: "Notícias" },
  { href: "/admin/videos", label: "Anthrax TV" },
  { href: "/admin/brasil", label: "Anthrax + Brasil" },
  { href: "/admin/agenda", label: "Agenda" },
  { href: "/admin/nav", label: "Menu" },
  { href: "/admin/hero", label: "Destaque (hero)" },
  { href: "/admin/site", label: "Masthead" },
  { href: "/admin/quiz", label: "Quiz" },
  { href: "/admin/footer", label: "Rodapé" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ink text-paper">
      <aside className="w-[220px] flex-none border-r-2 border-border-dark bg-card-dark p-4">
        <div className="mb-6">
          <div className="font-display text-lg uppercase text-signal">
            Admin
          </div>
          <div className="font-mono text-[11px] text-on-dark-3">
            Anthrax Brasil
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded px-2 py-[6px] text-sm text-on-dark-2 no-underline hover:bg-border-dark hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-6 border-t border-border-dark pt-4">
          <button
            type="submit"
            className="w-full border border-border-dark-2 py-[6px] text-xs font-bold tracking-[0.1em] text-on-dark-2 hover:border-hot hover:text-hot"
          >
            SAIR
          </button>
        </form>
        <Link
          href="/"
          target="_blank"
          className="mt-3 block text-center text-xs text-on-dark-3 no-underline hover:text-signal"
        >
          ver site →
        </Link>
      </aside>
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
