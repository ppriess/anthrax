# Changelog

## 2026-07-13

- **Homepage e conteúdo oficial**: site "Anthrax Brasil" construído (Next.js
  15 + Tailwind), texto ajustado de "fanzine" pra site oficial.
- **CMS via `/admin`**: painel com login por senha, CRUD completo (notícias,
  vídeos, cards Brasil, agenda, menu, quiz) com edição inline em acordeão.
  Conteúdo persistido no **Vercel Blob** (não filesystem — serverless).
- **Deploy**: projeto na Vercel (conta `ppriess-projects`), repositório
  `github.com/ppriess/anthrax` com deploy automático a cada push, domínio
  `anthrax.com.br` (DNS delegado pra Vercel).
- **Seção "Banda"**: páginas `/banda/membros`, `/banda/albuns`,
  `/banda/historia` — menu dropdown no desktop, menu mobile funcional.
  História com timeline reordenável. Membros ganhou "Ex-integrantes" (10
  vocalistas/instrumentistas históricos, dados verificados via busca) e
  "Notáveis Substitutos" (8 músicos de turnê, incluindo Andreas Kisser com
  vídeo real de 2011, e a curiosidade do quase-ingresso do Corey Taylor em
  2007).
- **Hero com vídeo de fundo**: painel de texto "Em Destaque" aceita vídeo do
  YouTube como fundo (mutado, loop), com toggle de som e tela cheia. Clicar
  em "OUVIR O SINGLE" esconde o texto e mostra só os controles de vídeo +
  botão de voltar.

Detalhes técnicos e decisões de arquitetura documentados em `CLAUDE.md` e
`content/README.md`.
