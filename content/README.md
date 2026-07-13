# Conteúdo do site (CMS de arquivos)

Todo texto editável da home é um JSON, editável item por item pelo painel
**`/admin`** (login por senha — ver `.env.local` / Vercel env vars).

Em runtime o conteúdo mora no **Vercel Blob** (store `anthrax-content`,
pathnames `content/*.json`), não no filesystem — Vercel é serverless e o disco
não é gravável entre requests. Os JSONs desta pasta são a **cópia inicial
versionada** (seed): `node scripts/seed-content.mjs` carrega/reseta o Blob a
partir deles. Editar estes arquivos aqui no repo **não** muda o site sozinho —
é preciso rodar o seed de novo (ou editar pelo `/admin`, que é o caminho
normal do dia a dia).

| Arquivo | O que controla |
| --- | --- |
| `site.json` | Masthead: linha "SITE OFICIAL…", adesivo amarelo, placeholder da busca e data de lançamento (usada no countdown) |
| `nav.json` | Menu do topo (lista; `active` sublinha, `brasil` deixa verde) |
| `hero.json` | Destaque principal: título, texto (`body` desktop / `bodyMobile`), CTAs, capa |
| `news.json` | Seção de notícias: título/kicker + `items` (1 item `"variant": "feature"` vira o card grande; os `"dark"` preenchem as colunas). Cada item pode ter `link` (URL da matéria original), `image` (URL de foto real — sem isso usa o placeholder `photoLabel`) e `body` (markdown, texto completo, só aparece no card grande) |
| `tv.json` | Anthrax TV: `videos` (os 3 cards; `brasil: true` ganha selo 🇧🇷; `sourceUrl` linka pro YouTube/Vimeo/etc. e mostra o botão "▶ ASSISTIR") e `archive` (contador/CTA) |
| `brasil.json` | Cards da seção Anthrax + Brasil (`photoLabel` é o placeholder de imagem; o card com `wide: true` é a faixa larga) |
| `agenda.json` | Agenda de datas + texto do alerta de e-mail |
| `quiz.json` | Lista de quizzes (`items`) — só o que tem `active: true` aparece na home. Publicar um novo e marcá-lo ativo desativa o anterior e reseta o "1 voto por pessoa" (é o `id` do item que controla isso no navegador) |
| `footer.json` | Rodapé |

Regras práticas:
- Aspas dentro de texto: escapar com `\"`.
- Quebra de linha em texto: `\n` (usado no `blurb` do tv.json).
- `body` da notícia aceita **markdown** (`**negrito**`, `[link](url)`, parágrafos) — é renderizado de verdade no site, não como texto puro.
- Se um JSON ficar inválido, a página mostra erro dizendo qual arquivo quebrou.
- Os tipos/estrutura esperados estão em `src/lib/content.ts`.
