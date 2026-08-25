export type EditorialType =
  | "video"
  | "external"
  | "social"
  | "archive"
  | "event"
  | "quiz"
  | "campaign";

export type EditorialFilter =
  | "todos"
  | "oficial"
  | "noticias"
  | "videos"
  | "ao-vivo"
  | "brasil"
  | "arquivo";

export type EditorialAction = {
  label: string;
  href?: string;
};

export type EditorialItem = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  date: string;
  dateISO: string;
  dayLabel?: string;
  relativeTime: string;
  source: string;
  type: EditorialType;
  category: string;
  official: boolean;
  external: boolean;
  priority: 1 | 2 | 3;
  campaign: boolean;
  campaignExpiration?: string;
  image: string;
  imageAlt: string;
  video?: string;
  primaryAction: EditorialAction;
  secondaryAction?: EditorialAction;
  relatedAlbum?: string;
  brazilCategory?: boolean;
  historicalEra?: string;
  engagement?: string;
  comments?: string;
};

export const spotlight: EditorialItem = {
  id: "edge-of-perfection",
  title: "THE EDGE OF PERFECTION",
  shortTitle: "The Edge of Perfection — clipe oficial já disponível",
  summary:
    "Assista agora ao clipe oficial da nova faixa de Cursum Perficio. O novo álbum do Anthrax chega em 18.09.2026.",
  date: "23 JUL 2026",
  dateISO: "2026-07-23T10:00:00-03:00",
  dayLabel: "QUINTA",
  relativeTime: "AGORA",
  source: "ANTHRAX TV",
  type: "video",
  category: "OFICIAL · CLIPE · CURSUM PERFICIO",
  official: true,
  external: false,
  priority: 3,
  campaign: false,
  image: "/banda-2026.webp",
  imageAlt: "Formação atual do Anthrax em foto promocional",
  video: "https://www.youtube.com/embed/8bACuh6QhW0",
  primaryAction: { label: "ASSISTIR AGORA" },
  secondaryAction: { label: "SOBRE A FAIXA", href: "#timeline" },
  relatedAlbum: "Cursum Perficio",
  engagement: "12.843",
  comments: "342",
};

export const latestSignals: EditorialItem[] = [
  spotlight,
  {
    id: "belladonna-feed",
    title: "JOEY BELLADONNA FALA SOBRE O NOVO ÁLBUM CURSUM PERFICIO",
    shortTitle: "Joey Belladonna fala sobre o novo álbum Cursum Perficio",
    summary:
      "Um recado direto de Joey sobre o disco, o estúdio e o que vem pela frente.",
    date: "23 JUL 2026",
    dateISO: "2026-07-23T08:00:00-03:00",
    relativeTime: "2H",
    source: "INSTAGRAM",
    type: "social",
    category: "FEED OFICIAL",
    official: true,
    external: true,
    priority: 1,
    campaign: false,
    image: "/cursum02.webp",
    imageAlt: "Arte promocional do álbum Cursum Perficio",
    primaryAction: { label: "VER PUBLICAÇÃO", href: "https://instagram.com" },
    engagement: "2.1K",
    comments: "128",
  },
  {
    id: "album-details",
    title: "ANTHRAX ANUNCIA DETALHES DE CURSUM PERFICIO",
    shortTitle: "Anthrax anuncia detalhes de Cursum Perficio",
    summary:
      "Faixas, formatos e bastidores do novo capítulo do Anthrax reunidos pela imprensa especializada.",
    date: "23 JUL 2026",
    dateISO: "2026-07-23T07:00:00-03:00",
    relativeTime: "HOJE",
    source: "LOUDWIRE",
    type: "external",
    category: "NOTÍCIAS",
    official: false,
    external: true,
    priority: 2,
    campaign: false,
    image: "/cursum-formats.webp",
    imageAlt: "Formatos físicos de Cursum Perficio",
    primaryAction: { label: "LER NOTÍCIA", href: "https://loudwire.com" },
  },
  {
    id: "ian-interview",
    title: "SCOTT IAN: “ESTE É O ÁLBUM MAIS FOCADO QUE JÁ FIZEMOS”",
    shortTitle: "Scott Ian: “Este é o álbum mais focado que já fizemos”",
    summary:
      "O guitarrista comenta a precisão, o peso e a urgência do novo material.",
    date: "22 JUL 2026",
    dateISO: "2026-07-22T16:00:00-03:00",
    relativeTime: "ONTEM",
    source: "METAL INJECTION",
    type: "external",
    category: "ENTREVISTA",
    official: false,
    external: true,
    priority: 2,
    campaign: false,
    image: "/banda-2026.webp",
    imageAlt: "Anthrax em retrato promocional",
    primaryAction: {
      label: "LER ENTREVISTA",
      href: "https://metalinjection.net",
    },
  },
  {
    id: "kids-mission",
    title: "IT’S FOR THE KIDS: A MÚSICA QUE VIROU MISSÃO",
    shortTitle: "It’s For The Kids: a música que virou missão",
    summary:
      "A história, o impacto e o legado de uma faixa que atravessou gerações.",
    date: "21 JUL 2026",
    dateISO: "2026-07-21T11:00:00-03:00",
    relativeTime: "2 DIAS",
    source: "BLABBERMOUTH",
    type: "external",
    category: "NOTÍCIAS",
    official: false,
    external: true,
    priority: 2,
    campaign: false,
    image: "/banda-2026.webp",
    imageAlt: "Retrato da banda Anthrax",
    primaryAction: { label: "LER MATÉRIA", href: "https://blabbermouth.net" },
  },
];

export const campaigns: EditorialItem[] = [
  {
    id: "cursum-campaign",
    title: "CURSUM PERFICIO",
    shortTitle: "Cursum Perficio",
    summary: "NOVO ÁLBUM · PRÉ-VENDA DISPONÍVEL EM BREVE",
    date: "18.09.2026",
    dateISO: "2026-09-18T00:00:00-03:00",
    relativeTime: "CAMPANHA ATIVA",
    source: "ANTHRAX",
    type: "campaign",
    category: "NOVO ÁLBUM",
    official: true,
    external: false,
    priority: 3,
    campaign: true,
    campaignExpiration: "2026-10-18",
    image: "/cursum02.webp",
    imageAlt: "Capa do álbum Cursum Perficio",
    primaryAction: { label: "OUVIR SINGLE" },
    secondaryAction: { label: "VER ÁLBUM", href: "/banda/albuns" },
    relatedAlbum: "Cursum Perficio",
  },
  {
    id: "kids-feature",
    title: "IT’S FOR THE KIDS",
    shortTitle: "It’s For The Kids",
    summary: "A história, o impacto e o legado da música que se tornou hino.",
    date: "21 JUL 2026",
    dateISO: "2026-07-21T11:00:00-03:00",
    relativeTime: "EM DESTAQUE",
    source: "ANTHRAX BRASIL",
    type: "archive",
    category: "EDITORIAL",
    official: false,
    external: false,
    priority: 3,
    campaign: true,
    image: "/banda-2026.webp",
    imageAlt: "Anthrax em foto promocional tratada como arquivo",
    primaryAction: { label: "LER MATÉRIA", href: "#timeline" },
    historicalEra: "Cursum Perficio",
  },
];

export const timelineItems: EditorialItem[] = [
  spotlight,
  {
    id: "belladonna-interview",
    title: "JOEY BELLADONNA FALA SOBRE CURSUM PERFICIO E A TURNÊ",
    shortTitle: "Joey Belladonna sobre Cursum Perficio",
    summary:
      "“Esse álbum tem muita verdade. É pesado, direto e melódico do jeito que o Anthrax sempre foi.”",
    date: "22 JUL 2026",
    dateISO: "2026-07-22T14:00:00-03:00",
    dayLabel: "QUARTA",
    relativeTime: "2H",
    source: "LOUDWIRE",
    type: "external",
    category: "EXTERNO · ENTREVISTA",
    official: false,
    external: true,
    priority: 2,
    campaign: false,
    image: "/banda-2026.webp",
    imageAlt: "Joey Belladonna em foto da banda",
    primaryAction: { label: "LER ENTREVISTA", href: "https://loudwire.com" },
  },
  {
    id: "mix-finished",
    title: "MIX FINALIZADO. CURSUM PERFICIO ESTÁ PRONTO PARA VOCÊS.",
    shortTitle: "Mix finalizado",
    summary:
      "@anthrax: “Mix finalizado. Cursum Perficio está pronto para vocês.” 🔥🎸 #CursumPerficio",
    date: "22 JUL 2026",
    dateISO: "2026-07-22T19:43:00-03:00",
    relativeTime: "19:43",
    source: "INSTAGRAM",
    type: "social",
    category: "OFICIAL · REDE SOCIAL",
    official: true,
    external: true,
    priority: 1,
    campaign: false,
    image: "/cursum01.webp",
    imageAlt: "Arte de estúdio do Anthrax",
    primaryAction: { label: "VER POST", href: "https://instagram.com" },
    engagement: "2.1K",
    comments: "128",
  },
  {
    id: "brasil-1991",
    title: "ANTHRAX NO BRASIL (1991): A PRIMEIRA INVASÃO",
    shortTitle: "Anthrax no Brasil em 1991",
    summary:
      "Matéria de arquivo sobre a primeira passagem do Anthrax pelo Brasil e o encontro com uma cena em ebulição.",
    date: "21 JUL 2026",
    dateISO: "2026-07-21T12:00:00-03:00",
    dayLabel: "TERÇA",
    relativeTime: "ARQUIVO",
    source: "ANTHRAX + BRASIL",
    type: "archive",
    category: "BRASIL · ARQUIVO",
    official: false,
    external: false,
    priority: 2,
    campaign: false,
    image: "/banda-2026.webp",
    imageAlt: "Anthrax em retrato tratado como material de arquivo",
    primaryAction: { label: "LER NO ARQUIVO", href: "/banda/historia" },
    brazilCategory: true,
    historicalEra: "1991",
  },
  {
    id: "latin-america-2026",
    title: "ANTHRAX — LATIN AMERICA TOUR 2026",
    shortTitle: "Latin America Tour 2026",
    summary: "27.10 — SP · 29.10 — RJ · 31.10 — BH · 02.11 — POA",
    date: "20 JUL 2026",
    dateISO: "2026-07-20T10:00:00-03:00",
    dayLabel: "SEGUNDA",
    relativeTime: "EM BREVE",
    source: "AGENDA",
    type: "event",
    category: "AO VIVO · SHOW",
    official: true,
    external: false,
    priority: 2,
    campaign: false,
    image: "/cursum01.webp",
    imageAlt: "Arte do Anthrax usada como cartaz da turnê",
    primaryAction: { label: "VER DATAS", href: "#shows" },
    brazilCategory: true,
  },
  {
    id: "community-quiz",
    title: "QUIZ: QUANTO VOCÊ SABE SOBRE ANTHRAX?",
    shortTitle: "Quanto você sabe sobre Anthrax?",
    summary:
      "Teste seus conhecimentos sobre a banda e compartilhe seu resultado com os amigos.",
    date: "18 JUL 2026",
    dateISO: "2026-07-18T10:00:00-03:00",
    dayLabel: "SÁBADO",
    relativeTime: "COMUNIDADE",
    source: "ANTHRAX BRASIL",
    type: "quiz",
    category: "QUIZ · COMUNIDADE",
    official: false,
    external: false,
    priority: 2,
    campaign: false,
    image: "/cursum02.webp",
    imageAlt: "Arte gráfica para o quiz da comunidade Anthrax Brasil",
    primaryAction: { label: "FAZER QUIZ", href: "#quiz" },
  },
];

export const filters: { id: EditorialFilter; label: string }[] = [
  { id: "todos", label: "TODOS" },
  { id: "oficial", label: "OFICIAL" },
  { id: "noticias", label: "NOTÍCIAS" },
  { id: "videos", label: "VÍDEOS" },
  { id: "ao-vivo", label: "AO VIVO" },
  { id: "brasil", label: "BRASIL 🇧🇷" },
  { id: "arquivo", label: "ARQUIVO" },
];
