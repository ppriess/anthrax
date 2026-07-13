import type { NewsItem } from "@/lib/content";
import { saveNewsItem } from "@/lib/admin-actions";

export function NewsForm({ item }: { item?: NewsItem }) {
  const action = saveNewsItem.bind(null, item?.id ?? null);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <Field label="Título">
        <input
          name="title"
          defaultValue={item?.title}
          required
          className="admin-input"
        />
      </Field>
      <Field label="Fonte (ex.: BLABBERMOUTH · 10 JUL)">
        <input
          name="source"
          defaultValue={item?.source}
          required
          className="admin-input"
        />
      </Field>
      <Field label="Data">
        <input
          type="date"
          name="date"
          defaultValue={item?.date}
          required
          className="admin-input"
        />
      </Field>
      <Field label="Resumo (só aparece no card grande)">
        <textarea
          name="excerpt"
          defaultValue={item?.excerpt}
          rows={3}
          className="admin-input"
        />
      </Field>
      <Field label="Texto completo (markdown — **negrito**, [link](url), parágrafos; opcional, aparece só no card grande, abaixo do resumo)">
        <textarea
          name="body"
          defaultValue={item?.body}
          rows={6}
          className="admin-input"
        />
      </Field>
      <Field label="Link da matéria original (URL — vira link no título)">
        <input
          type="url"
          name="link"
          defaultValue={item?.link}
          placeholder="https://..."
          className="admin-input"
        />
      </Field>
      <Field label="Imagem (URL — substitui o placeholder de foto)">
        <input
          type="url"
          name="image"
          defaultValue={item?.image}
          placeholder="https://..."
          className="admin-input"
        />
      </Field>
      <Field label="Label da foto (placeholder, usado se não houver imagem acima)">
        <input
          name="photoLabel"
          defaultValue={item?.photoLabel}
          placeholder="[ FOTO: ... ]"
          className="admin-input"
        />
      </Field>
      <Field label="Tipo de card">
        <select
          name="variant"
          defaultValue={item?.variant ?? "dark"}
          className="admin-input"
        >
          <option value="dark">Padrão (coluna)</option>
          <option value="feature">Destaque (card grande)</option>
        </select>
      </Field>
      <label className="flex items-center gap-2 text-sm text-on-dark-2">
        <input type="checkbox" name="hot" defaultChecked={item?.hot} />
        Selo &quot;QUENTE&quot;
      </label>
      <label className="flex items-center gap-2 text-sm text-on-dark-2">
        <input type="checkbox" name="feed" defaultChecked={item?.feed} />
        É post de feed social (mostra &quot;ver feed completo&quot;)
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-xs text-on-dark-3">{label}</span>
      {children}
    </label>
  );
}
