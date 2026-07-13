import type { Footer as FooterContent } from "@/lib/content";

export function Footer({ footer }: { footer: FooterContent }) {
  return (
    <footer className="halftone-soft border-t-[6px] border-black bg-paper px-4 py-5 text-ink md:px-10 md:py-[22px]">
      <div className="flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
        <span className="font-display text-base uppercase">
          {footer.wordmark}
        </span>
        <span className="font-mono text-xs text-paper-hi">
          {footer.disclaimer}
        </span>
        <span className="-rotate-2 font-marker text-sm">
          {footer.signature}
        </span>
      </div>
    </footer>
  );
}
