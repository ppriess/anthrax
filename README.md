# Handoff: AnthraxBrasil.com.br — Homepage (2 direções visuais)

## Overview
Homepage do AnthraxBrasil.com.br — hub de fãs em pt-BR que agrega automaticamente notícias, feed oficial, vídeos ao vivo profissionais e conteúdo "Anthrax + Brasil". Esta entrega contém **duas direções visuais** da mesma homepage, cada uma em desktop (1440px) e mobile (390px):

- **1a — Road Case**: aço escuro, adesivos de turnê, amarelo sinalização
- **1b — Fanzine/Comic**: painéis de papel com halftone, recortes tortos, energia de zine anos 80

O plano completo do produto (fases, módulos, stack Next.js + Supabase + Meilisearch) está no plano mestre do projeto; este handoff cobre apenas o design da homepage (Módulo 1).

## About the Design Files
Os arquivos deste pacote são **referências de design criadas em HTML** — protótipos que mostram aparência e comportamento pretendidos, não código de produção. A tarefa é **recriar estes designs no ambiente do codebase alvo** (o plano prevê Next.js + React + TypeScript + TailwindCSS) usando seus padrões e bibliotecas. Se o projeto ainda não existe, criar com essa stack.

O arquivo `AnthraxBrasil Homepage.dc.html` é um documento-canvas com as 4 pranchetas (1a desktop, 1am mobile, 1bm mobile, 1b desktop). Todos os estilos são inline — inspecione qualquer elemento para valores exatos.

## Fidelity
**High-fidelity.** Cores, tipografia, espaçamento e copy são finais (exceto onde marcado como placeholder). Recriar pixel-perfect, convertendo estilos inline em classes Tailwind / componentes React.

## Design Tokens

### Cores — compartilhadas
- Amarelo sinalização (accent primário): `#E8B71A`
- Verde Brasil (accent secundário, só para conteúdo Brasil): `#2E9E5B` (dark bg) / `#2E7D4F` (paper bg)
- Vermelho "quente" (badges de destaque, só em 1b): `#B23A2E`
- Preto puro para bordas/sombras duras: `#000`

### Cores — 1a Road Case
- Fundos: `#141416` (base), `#0f0f11` (seções alternadas), `#0a0a0b` (footer), `#1d1d20`/`#1b1b1e` (cards), `#0e0e10` (inputs)
- Bordas: `#2c2c30`, `#34343a`, `#3a3a40`, `#4a4a50`
- Texto: `#F2F0EA` (primário), `#c9c7c0` (secundário), `#a9a7a0` (corpo card), `#8a8a90` (meta), `#6f6f75` (mudo)

### Cores — 1b Fanzine
- Fundos escuros: `#151318` (base), `#0d0b10` (faixa Anthrax TV), `#1e1b23` (cards escuros)
- Papel: `#EFEAE0` (painéis claros), `#fff` (cards internos), halftone via `radial-gradient(rgba(0,0,0,.13) 1px, transparent 1.5px)` size `7px 7px`
- Texto sobre papel: `#151318` (primário), `#3a362e` (corpo), `#6a655c` (meta)
- Texto sobre escuro: `#EFEAE0`, `#b5b0ba`, `#8a8590`
- Bordas escuras: `#3a3542`, `#55505c`

### Tipografia (Google Fonts)
- Display: **Archivo Black** (títulos, wordmark, números grandes; uppercase, line-height .9–.94)
- UI/corpo: **Barlow Condensed** 400–700 (todo o resto)
- Manuscrita: **Permanent Marker** (só em 1b — anotações de zine, rotação -1° a -5°)
- Meta/labels: `ui-monospace, monospace` (fontes de sistema), 10–13px, letter-spacing .1–.24em, uppercase

### Escala tipográfica (desktop)
- H1 hero: 88px (1a) / 72px (1b), Archivo Black
- H2 seção: 26–30px Archivo Black uppercase
- Card título: 16–26px Barlow Condensed 600–700
- Corpo: 15–22px; meta mono: 11–13px
- Mobile: H1 40–44px; nada abaixo de 10px

### Espaçamento e forma
- Padding de seção desktop: 36–52px vertical, 40px horizontal; mobile: 20–26px / 16px
- Grid gaps: 14–48px conforme densidade
- **Sem border-radius** nos dois temas (exceto chips de filtro em 1a: radius 20px, e search 1a: 4px)
- Sombras duras (sem blur): `4px 4px 0 #000` a `8px 8px 0 <accent>`; 1b usa sombras coloridas (`#E8B71A`, `#2E7D4F`)
- 1b: painéis e cards com `transform: rotate(±0.5–1.5deg)`; bordas grossas 2–4px pretas ou `#EFEAE0`

## Screens / Views

### 1a — Road Case, desktop 1440
Seções em ordem (todas full-width):
1. **Ticker** — faixa amarela `#E8B71A`, texto preto 15px/700, letter-spacing .14em, itens separados por `★`, border-bottom 3px preto. Em produção: marquee com animação CSS lenta (~60s loop), conteúdo vindo do CMS.
2. **Nav** — gradient `#1d1d20→#161618`; wordmark "ANTHRAX" + "BRASIL" (Archivo Black 26px, "BRASIL" amarelo com `skewX(-8deg)`); badge mono "FANSITE NÃO-OFICIAL"; links 17px/600 letter-spacing .1em (BRASIL em amarelo); busca à direita (input 230px, bg `#0e0e10`).
3. **Hero** — grid `1fr 500px`, gap 48px. Esquerda: badge "NOVO ÁLBUM", H1 "CURSUM PERFICIO" 88px, parágrafo 22px, dois CTAs (primário amarelo com borda 2px preta + sombra `4px 4px 0 #000`; secundário outline `#4a4a50`), countdown (caixas `#1d1d20`, números Archivo Black 30px amarelos) — countdown real até 2026-09-18. Direita: capa 460×460 (placeholder), borda 3px preta, sombra `8px 8px 0 #000`, dois adesivos rotacionados (amarelo +6°, verde -4°) com borda preta 2px. Fundo: listras verticais sutis + glow radial amarelo 7%.
4. **Notícias + Feed** — grid `1fr 360px`, border-top 3px amarelo. Notícias: header com status "● ATUALIZADO HÁ X MIN" (verde, mono); card destaque (thumb 300px + texto, badge DESTAQUE amarelo); 3 cards menores em grid. Feed Oficial: painel `#111113`, 4 itens (avatar 44px + fonte/hora mono + texto 16px).
5. **Ao Vivo · Profissional** — bg `#0f0f11`; chips de filtro pill (ativo: borda/texto amarelo; inativo: borda `#4a4a50`): TODOS, FESTIVAL, ERA BELLADONNA, ERA BUSH, 4K, BRASIL 🇧🇷; 3 cards de vídeo (thumb 220px com badge duração canto inf. dir. e badge categoria sup. esq.; título 19px; meta mono).
6. **Shows + Anthrax+Brasil** — grid `520px 1fr`. Shows: linhas com data (Archivo Black amarelo) + título + botão outline; abaixo, caixa **Alerta Brasil** (bg gradient verde-escuro, borda 2px dashed `#2E9E5B`, input + botão verde "ME AVISA"). Anthrax+Brasil: cards com border-top 3px (verde/amarelo alternado), label mono colorida, título 20px, corpo 16px; card largo "Arquivo Brasil" com thumb + CTA outline verde.
7. **Fan zone** — 2 colunas: card Quiz Diário ("?" gigante rotacionado, contagem de participantes, botão amarelo) e card Enquete (barras de resultado: track `#0e0e10`, fill `rgba(232,183,26,.22)`, percentuais à direita).
8. **Footer** — bg `#0a0a0b`, border-top 3px amarelo; linha do tempo horizontal (mono 12px, marcos 1981→2026, extremos em amarelo); disclaimer + links em mono 13px.

### 1am — Road Case, mobile 390
Mesmo sistema, empilhado: ticker; nav compacta (wordmark 18px, busca + hambúrguer); hero (badge, H1 44px, capa 260px, CTAs full-width empilhados); notícias (1 card com foto + 2 sem); 1 card de vídeo; Anthrax+Brasil (1 card) + Alerta Brasil; **tab bar fixa** com 5 itens (INÍCIO ativo em amarelo; ícone 18px + label 11px). Alvos de toque ≥44px.

### 1b — Fanzine/Comic, desktop 1440
1. **Masthead** — papel `#EFEAE0` com halftone, border-bottom 6px preto; "EDIÇÃO Nº 001 · JULHO 2026 · FEITO POR FÃS, PARA FÃS" (mono); wordmark 64px com "BRASIL" invertido (bg preto, texto amarelo, rotate -1.5°); nav à direita (links pretos 700, ativo com underline 3px, BRASIL em verde); busca com borda 2px + sombra 3px; etiqueta Permanent Marker amarela rotacionada sobreposta ao topo.
2. **Hero** — grid `1fr 470px`. Painel-quadrinho papel: borda 4px preta, sombra `8px 8px 0 #E8B71A`, etiqueta "CAPA DESTA EDIÇÃO" (preto, mono, sobreposta ao topo), anotação vermelha Permanent Marker, H2 72px, corpo 21px, CTAs rotacionados (±1°), chips mono de rodapé. Direita: capa 420px rotacionada +1.2°, borda 4px preta, sombra verde, etiqueta manuscrita + fita adesiva translúcida (retângulo `rgba(239,234,224,.7)` rotate -38°).
3. **Últimas do Front** — título em bloco amarelo rotacionado; grid `1.4fr 1fr 1fr`: card papel grande (badge QUENTE vermelho) + 4 cards escuros `#1e1b23` borda 2px `#3a3542`; último card é o teaser do Feed Oficial.
4. **Anthrax TV** — faixa `#0d0b10` entre bordas 4px pretas; título com "TV" em bloco vermelho; filtros quadrados (ativo borda amarela); 4 colunas: 3 cards de vídeo com bordas 3px `#EFEAE0` (card Brasil: borda verde) e leve rotação alternada; 4º card: contador "+147" + CTA "ABRIR ANTHRAX TV".
5. **Brasil + agenda** — grid `1fr 460px`. Painel papel "ANTHRAX + BRASIL" (sombra verde, etiqueta "SEÇÃO ESPECIAL", subtítulo manuscrito verde, cards brancos borda 2px preta, card largo Arquivo Brasil). Direita: card Agenda (borda 3px `#EFEAE0`, datas Archivo Black amarelas, nota manuscrita "Brasil 2027??") + card Quiz (opções como chips outline, streak "🔥 6 DIAS").
6. **Footer** — papel com halftone, border-top 6px preto; wordmark, disclaimer mono, assinatura manuscrita rotacionada.

### 1bm — Fanzine, mobile 390
Masthead compacto; painel hero papel (H2 40px, capa 200px, CTA full-width); notícias (1 card papel + 2 escuros); faixa Anthrax TV com 1 card + CTA "+147 VÍDEOS"; painel Anthrax+Brasil com 2 cards; **tab bar papel** (5 itens, ativo preto, inativos `#8b8578`).

## Interactions & Behavior
- **Ticker**: marquee infinito, pausa on-hover.
- **Countdown**: tempo real até 2026-09-18T00:00 (BRT); após lançamento, trocar por bloco "JÁ DISPONÍVEL".
- **Busca**: campo abre busca global (Meilisearch) — sugestões por tipo (notícia, vídeo, show, álbum).
- **Filtros de vídeo**: chips toggle; filtram a grade client-side; estado na URL.
- **Alerta Brasil**: form de e-mail, validação padrão, sucesso troca a caixa por confirmação.
- **Quiz/Enquete**: clicar em opção revela resultado com animação de barra (300ms ease-out); 1 voto por usuário (localStorage/conta).
- **Cards**: hover = translateY(-2px) sutil em 1a; em 1b, hover endireita a rotação para 0° (transition 150ms).
- **Links**: cor padrão `#E8B71A`, hover `#fff` (em papel: preto, hover verde).
- **Tab bar mobile**: fixa no bottom, item ativo colorido.
- Homepage inteira é gerada de dados (CMS/collectors) — nenhum conteúdo hard-coded.

## State Management
- `newsItems[]`, `officialFeed[]`, `videos[]` (+ filtros ativos), `shows[]`, `triviaCards[]`, `quizOfDay`, `poll` — todos vindos da API (Supabase).
- `countdown` derivado de data de lançamento (config).
- `alertaBrasilSubmitted: boolean`; `quizAnswered / pollVoted` persistidos.

## Assets
- Nenhuma imagem final incluída. Todos os retângulos listrados com etiqueta mono `[ ... ]` são **placeholders** a substituir por: capa do álbum, fotos de imprensa, thumbnails do YouTube (via API), pôsteres/ingressos do acervo.
- Bandeira 🇧🇷 usada como glyph em badges — substituível por ícone SVG.
- Fontes: Google Fonts (Archivo Black, Barlow Condensed, Permanent Marker).
- **Não** usar o logo oficial do Anthrax sem licença — o wordmark tipográfico deste design é o substituto proposital.

## Content Notes (verificar antes de publicar)
- Fatos reais usados: Cursum Perficio 18/09/2026 (Megaforce/Nuclear Blast, prod. Jay Ruston, Studio 606); singles "It's For The Kids" (15/05/2026) e "The Edge of Perfection" (10/07/2026); abertura para Iron Maiden na América do Norte (set/2026).
- Ilustrativos/fictícios: números de quiz/enquete, "+147 vídeos", "Wacken 2025", "Hellfest 2024", "Monsters of Rock SP", timestamps das notícias.

## Files
- `AnthraxBrasil Homepage.dc.html` — as 4 pranchetas (1a, 1am, 1b, 1bm). Abrir no navegador; todos os estilos são inline.
