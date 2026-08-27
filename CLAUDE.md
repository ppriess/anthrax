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
- Hospedagem: **VPS Hetzner** (188.245.248.9), Docker atrás do Nginx Proxy
  Manager. Porta do container: **3028**. Deploy = `git pull && doppler run --
  docker compose up -d --build` na pasta `~/anthrax` do VPS.
- Migrou da Vercel em 27/08/2026: o Blob store estourou a cota do plano Hobby e
  foi suspenso, derrubando o site (todo read virava 403 e o Server Component da
  home lançava). Ver CHANGELOG.
- Porta de dev local: **3321** (`pnpm dev`, já fixada em `package.json`).

## CMS de conteúdo
- Conteúdo editável é JSON por seção, gravado em **arquivos no disco** via
  `src/lib/content.ts`. Duas pastas:
  - `CONTENT_DIR` — onde o `/admin` grava. Em produção é o volume
    `./data/content` (bind mount do compose). **Nunca deletar essa pasta.**
  - `CONTENT_SEED_DIR` — a cópia versionada em `content/` no repo. Serve de
    fallback de leitura.
- A leitura tenta o `CONTENT_DIR` primeiro e cai para o `content/` do repo
  quando o arquivo ainda não existe lá. Ou seja: JSON novo que chega junto com
  o código já funciona no primeiro deploy, sem passo de seed. Não existe mais
  `scripts/seed-content.mjs`.
- Escrita é atômica (`.tmp` + `rename`), para nunca deixar JSON truncado
  servindo o site.
- Editar `content/*.json` no repo muda o site **só enquanto aquele arquivo não
  tiver sido salvo pelo `/admin`** — depois disso o volume manda. O caminho
  normal de edição é o `/admin`.
- Painel de administração em `/admin` (login por senha única, `ADMIN_PASSWORD` /
  `ADMIN_SESSION_TOKEN` via Doppler no VPS).
- Repositório: `github.com/ppriess/anthrax`, branch `main`.
