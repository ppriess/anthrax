import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // shared accents — todos indiretos via CSS var pra suportar skins
        // (ver :root / [data-theme="pirate"] em globals.css)
        signal: "var(--color-signal)",
        "brasil-dark": "var(--color-brasil-dark)",
        "brasil-paper": "var(--color-brasil-paper)",
        hot: "var(--color-hot)",
        ink: "var(--color-ink)",
        "tv-black": "var(--color-tv-black)",
        "card-dark": "var(--color-card-dark)",
        paper: "var(--color-paper)",
        "paper-hi": "var(--color-paper-hi)",
        "paper-meta": "var(--color-paper-meta)",
        "on-dark-2": "var(--color-on-dark-2)",
        "on-dark-3": "var(--color-on-dark-3)",
        "border-dark": "var(--color-border-dark)",
        "border-dark-2": "var(--color-border-dark-2)",
        // extras pra cobrir valores que eram hex soltos no JSX
        "card-paper": "var(--color-card-paper)",
        hardline: "var(--color-hardline)",
        "border-soft": "var(--color-border-soft)",
        "border-soft-2": "var(--color-border-soft-2)",
        "muted-soft": "var(--color-muted-soft)",
        "brasil-alert-bg": "var(--color-brasil-alert-bg)",
      },
      fontFamily: {
        display: ["var(--theme-font-display)", "sans-serif"],
        body: ["var(--theme-font-body)", "sans-serif"],
        marker: ["var(--theme-font-marker)", "cursive"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
