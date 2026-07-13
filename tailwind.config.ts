import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // shared accents
        signal: "#E8B71A", // amarelo sinalização
        "brasil-dark": "#2E9E5B", // verde sobre bg escuro
        "brasil-paper": "#2E7D4F", // verde sobre papel
        hot: "#B23A2E", // vermelho quente (badges)
        // 1b fanzine — escuros
        ink: "#151318", // base / texto sobre papel
        "tv-black": "#0d0b10", // faixa Anthrax TV
        "card-dark": "#1e1b23", // cards escuros
        // papel
        paper: "#EFEAE0",
        "paper-hi": "#3a362e", // corpo sobre papel
        "paper-meta": "#6a655c", // meta sobre papel
        // texto sobre escuro
        "on-dark-2": "#b5b0ba",
        "on-dark-3": "#8a8590",
        // bordas escuras
        "border-dark": "#3a3542",
        "border-dark-2": "#55505c",
      },
      fontFamily: {
        display: ["var(--font-archivo-black)", "sans-serif"],
        body: ["var(--font-barlow)", "sans-serif"],
        marker: ["var(--font-marker)", "cursive"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
