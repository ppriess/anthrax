"use client";

import { useState } from "react";

/**
 * Global search entry point. In production this opens the Meilisearch overlay
 * with typed suggestions (notícia, vídeo, show, álbum). Here it is the styled,
 * focusable field from the design.
 */
export function SearchBar({ placeholder }: { placeholder: string }) {
  const [value, setValue] = useState("");

  return (
    <label
      id="busca"
      className="flex w-[280px] items-center gap-2 border-2 border-ink bg-card-paper px-3 py-[7px] shadow-[3px_3px_0_var(--color-ink)] focus-within:shadow-[3px_3px_0_var(--color-signal)]"
    >
      <span className="text-sm text-ink">⌕</span>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Busca global"
        className="w-full bg-transparent text-[15px] text-ink placeholder:text-paper-meta focus:outline-none"
      />
    </label>
  );
}
