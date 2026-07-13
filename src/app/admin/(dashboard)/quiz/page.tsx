import Link from "next/link";
import { readContentFile, type Quiz } from "@/lib/content";
import { deleteQuizItem } from "@/lib/admin-actions";
import { AccordionItem } from "@/components/admin/AccordionItem";
import { QuizForm } from "./QuizForm";

export const dynamic = "force-dynamic";

export default async function QuizPage() {
  const quiz = await readContentFile<Quiz>("quiz.json");

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <h1 className="font-display text-2xl uppercase">Quiz diário</h1>
        <Link
          href="/admin/quiz/novo"
          className="bg-signal px-4 py-2 text-sm font-bold tracking-[0.1em] text-ink no-underline"
        >
          + NOVO QUIZ
        </Link>
      </div>
      <p className="mb-6 text-xs text-on-dark-3">
        Só o quiz marcado como &quot;ativo&quot; aparece na home. Publicar um
        novo e marcá-lo como ativo reseta o &quot;1 voto por pessoa&quot; de
        quem já respondeu os outros.
      </p>

      <div className="flex flex-col gap-2">
        {quiz.items.map((item) => (
          <AccordionItem
            key={item.id}
            summary={
              <div>
                <div className="mb-1 flex gap-2 font-mono text-[11px] text-on-dark-3">
                  <span>{item.number}</span>
                  {item.active && <span className="text-signal">ATIVO</span>}
                </div>
                <div className="text-sm font-bold text-paper">
                  {item.question}
                </div>
              </div>
            }
            actions={
              <form action={deleteQuizItem.bind(null, item.id)}>
                <button
                  type="submit"
                  className="border border-border-dark-2 px-3 py-[6px] text-xs font-bold text-on-dark-2 hover:border-hot hover:text-hot"
                >
                  EXCLUIR
                </button>
              </form>
            }
          >
            <QuizForm item={item} />
          </AccordionItem>
        ))}
        {quiz.items.length === 0 && (
          <p className="text-sm text-on-dark-3">Nenhum quiz ainda.</p>
        )}
      </div>
    </div>
  );
}
