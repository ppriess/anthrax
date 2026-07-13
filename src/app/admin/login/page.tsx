import { login } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <form
        action={login}
        className="w-full max-w-sm border-2 border-paper bg-card-dark p-6"
      >
        <h1 className="mb-1 font-display text-xl uppercase text-paper">
          Anthrax Brasil
        </h1>
        <p className="mb-5 font-mono text-xs text-on-dark-3">
          painel de conteúdo
        </p>
        {erro && (
          <p className="mb-4 border border-hot bg-hot/10 px-3 py-2 text-sm text-hot">
            senha incorreta
          </p>
        )}
        <label className="mb-1 block font-mono text-xs text-on-dark-3">
          Senha
        </label>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="mb-4 w-full border-2 border-border-dark-2 bg-ink px-3 py-2 text-paper focus:border-signal focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-signal py-2 text-sm font-bold tracking-[0.1em] text-ink"
        >
          ENTRAR
        </button>
      </form>
    </div>
  );
}
