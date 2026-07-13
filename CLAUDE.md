# CLAUDE.md — Anthrax Brasil

> Regras gerais de infra (rm -rf, docker compose, git rm --cached, Doppler, nvm,
> proxy.ts, Syne) estão em `~/.claude/CLAUDE.md`. Regras da VPS Hetzner estão em
> `~/projetos/CLAUDE.md`. Este arquivo é específico deste projeto.

> Existe um `CHANGELOG.md` na raiz com o histórico do que já foi feito. Não
> precisa ler ele a cada sessão (gasta tokens à toa) — só consultar se for
> preciso entender o que já foi construído/decidido antes.

## Domínio
- **anthrax.com.br** — domínio de produção deste site. Registrado no
  Registro.br, mas **DNS delegado pra Vercel** (nameservers `ns1.vercel-dns.com`
  / `ns2.vercel-dns.com`) — Registro.br não oferece editor de zona DNS (só
  troca de nameserver), então essa foi a única opção viável.
- **Importante para o futuro**: e-mail deste domínio ainda não existe. Quando
  for configurado, os registros MX/TXT/SPF entram no **painel da Vercel**
  (Project anthrax → Settings → Domains → clicar no domínio → DNS Records),
  **não** no Registro.br — o DNS não é mais gerenciado lá.

## Deploy
- Conteúdo público → **Vercel** (padrão do usuário para sites públicos, vs. VPS
  para apps internos).
- Porta de dev local: **3321** (`pnpm dev`, já fixada em `package.json`).

## CMS de conteúdo
- Conteúdo editável é JSON por seção, persistido no **Vercel Blob** (store
  `anthrax-content`, pathnames `content/*.json`) via `src/lib/content.ts`
  (`@vercel/blob` `get`/`put`, `useCache: false` pra refletir edição na hora).
  Não usa filesystem em runtime (serverless não tem disco gravável).
- `content/*.json` no repo é só a **cópia inicial versionada** — `node
  scripts/seed-content.mjs` carrega/reseta o Blob a partir dela. Editar esses
  arquivos no repo não muda o site sozinho; o caminho normal é o `/admin`.
- Painel de administração em `/admin` (login por senha única, `ADMIN_PASSWORD` /
  `ADMIN_SESSION_TOKEN` via env — Doppler no VPS; na Vercel são env vars do
  projeto, `vercel env add`, com confirmação antes de gravar em produção).
- Projeto Vercel: `anthrax` (team **`ppriess-projects`** — conta
  paulo.priess@gmail.com / GitHub `ppriess`, a conta certa do usuário; NÃO
  usar `mobigrapp-4610`, que é outra conta). Blob store: `anthrax-content`
  (privado, região `iad1`), linkado ao projeto — `BLOB_READ_WRITE_TOKEN`
  injetado automaticamente em todas as envs.
- Repositório: `github.com/ppriess/anthrax`, branch `main`, já conectado ao
  projeto Vercel (deploy automático a cada push).
- `ADMIN_PASSWORD`/`ADMIN_SESSION_TOKEN` cadastradas nas 3 envs da Vercel
  (production/preview/development) — senha combinada com o usuário.
