"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Skin = "default" | "pirate";

const STORAGE_KEY = "anthrax-skin";

const ThemeContext = createContext<{
  skin: Skin;
  setSkin: (skin: Skin) => void;
} | null>(null);

/** Script inline pra aplicar a skin salva antes do primeiro paint (sem flash). */
export const themeInitScript = `
(function () {
  try {
    var skin = localStorage.getItem("${STORAGE_KEY}");
    if (skin === "pirate") document.documentElement.dataset.theme = "pirate";
  } catch (e) {}
})();
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [skin, setSkinState] = useState<Skin>("default");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pirate") setSkinState("pirate");
    } catch {
      /* storage unavailable — ignore */
    }
  }, []);

  function setSkin(next: Skin) {
    setSkinState(next);
    document.documentElement.dataset.theme = next === "pirate" ? "pirate" : "";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — ignore */
    }
  }

  return (
    <ThemeContext.Provider value={{ skin, setSkin }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  return ctx;
}
