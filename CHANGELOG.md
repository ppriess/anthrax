# Changelog

## 2026-07-15

- **Terceira UI "A Transmissão" em `/v3`** (aditiva — o site em `/` e a skin
  pirata ficam intocados; acesso só pela URL, `noindex`). Conceito: a home
  como transmissão interceptada — o último clipe (YouTube do CMS) abre em
  tela cheia mutado e o scroll viaja pela transmissão em 6 cenas: hero pinado
  com estilhaços/hotspots e colapso do vídeo em mini-frame persistente →
  sinal atual → circuito ao vivo (agenda numa rota SVG que se desenha) →
  arquivo sonoro (discografia horizontal pinada) → organismo da banda
  (retratos sobrepostos clicáveis) → saída com "RECEBER OUTRO SINAL"
  (item aleatório do arquivo). Menu hambúrguer full-screen como atalho
  convencional (focus trap, Esc) + HUD fixo com toggles SOM e MOVIMENTO.
- Stack novo só da rota: **GSAP (ScrollTrigger) + Lenis** (`gsap`,
  `@gsap/react`, `lenis`). Identidade própria em `src/app/v3/v3.css`
  (paleta OKLCH carvão/âmbar escopada em `[data-v3]`, fontes já existentes).
  Reduced-motion (SO ou toggle) desliga Lenis/pins e mantém tudo legível;
  mobile sem pin horizontal. `ThemeNeutralizer` remove o `data-theme` pirata
  enquanto /v3 está montada (regras globais da skin vazariam — inclusive o
  `[class*="rotate"]{transform:none}`; nenhum className em v3 pode conter
  "rotate").

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
