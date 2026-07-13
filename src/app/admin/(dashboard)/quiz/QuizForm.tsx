import type { QuizItem } from "@/lib/content";
import { saveQuizItem } from "@/lib/admin-actions";

export function QuizForm({ item }: { item?: QuizItem }) {
  const action = saveQuizItem.bind(null, item?.id ?? null);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">
          Número exibido (ex.: QUIZ DIÁRIO Nº 185)
        </span>
        <input
          name="number"
          defaultValue={item?.number}
          required
          className="admin-input"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs text-on-dark-3">Pergunta</span>
        <textarea
          name="question"
          defaultValue={item?.question}
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
          defaultValue={item?.options.join("\n")}
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
          defaultValue={item?.correct}
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
          defaultValue={item?.stats}
          required
          className="admin-input"
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-on-dark-2">
        <input type="checkbox" name="active" defaultChecked={item?.active} />
        Ativo (é o que aparece na home agora — marcar aqui desmarca os outros)
      </label>
      <button
        type="submit"
        className="mt-2 w-fit bg-signal px-5 py-2 text-sm font-bold tracking-[0.1em] text-ink"
      >
        SALVAR
      </button>
    </form>
  );
}
