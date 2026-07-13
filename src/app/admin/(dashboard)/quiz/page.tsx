import { readContentFile, type Quiz } from "@/lib/content";
import { saveQuiz } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function QuizPage() {
  const quiz = await readContentFile<Quiz>("quiz.json");

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl uppercase">Quiz diário</h1>
      <p className="mb-6 text-xs text-on-dark-3">
        Ao publicar um quiz novo, troque o ID — isso reseta o &quot;1 voto por
        pessoa&quot; salvo no navegador de quem já respondeu o anterior.
      </p>
      <form action={saveQuiz} className="flex max-w-xl flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            ID (único por quiz, ex.: 185)
          </span>
          <input
            name="id"
            defaultValue={quiz.id}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Número exibido (ex.: QUIZ DIÁRIO Nº 185)
          </span>
          <input
            name="number"
            defaultValue={quiz.number}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">Pergunta</span>
          <textarea
            name="question"
            defaultValue={quiz.question}
            rows={2}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Opções (uma por linha)
          </span>
          <textarea
            name="options"
            defaultValue={quiz.options.join("\n")}
            rows={4}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Resposta correta (precisa ser idêntica a uma das opções acima)
          </span>
          <input
            name="correct"
            defaultValue={quiz.correct}
            required
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs text-on-dark-3">
            Estatística (ex.: 2.412 FÃS JÁ JOGARAM HOJE · SEQUÊNCIA: 🔥 6 DIAS)
          </span>
          <input
            name="stats"
            defaultValue={quiz.stats}
            required
            className="admin-input"
          />
        </label>
        <button
          type="submit"
          className="mt-2 w-fit bg-signal px-5 py-2 text-sm font-bold tracking-[0.1em] text-ink"
        >
          SALVAR
        </button>
      </form>
    </div>
  );
}
