import Link from "next/link";
import {
  getContent,
  readContentFile,
  type Albuns,
  type Historia,
  type Membros,
  type Substitutos,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [content, membros, albuns, historia, substitutos] = await Promise.all([
    getContent(),
    readContentFile<Membros>("membros.json"),
    readContentFile<Albuns>("albuns.json"),
    readContentFile<Historia>("historia.json"),
    readContentFile<Substitutos>("substitutos.json"),
  ]);

  const cards = [
    { href: "/admin/noticias", label: "Notícias", count: content.news.items.length },
    { href: "/admin/videos", label: "Anthrax TV", count: content.tv.videos.length },
    { href: "/admin/brasil", label: "Anthrax + Brasil", count: content.brasil.cards.length },
    { href: "/admin/agenda", label: "Agenda", count: content.agenda.items.length },
    { href: "/admin/membros", label: "Banda: Membros", count: membros.items.length },
    { href: "/admin/albuns", label: "Banda: Álbuns", count: albuns.items.length },
    { href: "/admin/historia", label: "Banda: Timeline", count: historia.timeline.length },
    { href: "/admin/substitutos", label: "Banda: Substitutos", count: substitutos.items.length },
    { href: "/admin/quiz", label: "Quiz diário", count: content.quiz.items.length },
    { href: "/admin/nav", label: "Menu", count: content.nav.length },
  ];

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl uppercase">Painel de conteúdo</h1>
      <p className="mb-6 text-sm text-on-dark-3">
        Edita aqui, salva, e o site atualiza na hora — sem rebuild.
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border-2 border-border-dark bg-card-dark p-5 no-underline hover:border-signal"
          >
            <div className="font-display text-3xl text-signal">{c.count}</div>
            <div className="mt-1 text-sm font-bold text-paper">{c.label}</div>
            <div className="mt-1 text-xs text-on-dark-3">itens</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
