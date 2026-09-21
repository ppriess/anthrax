import { EnterSiteLink } from "@/components/EnterSiteLink";

export function GateHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-4 md:px-10 md:py-6">
      <span className="font-display text-lg uppercase leading-none text-paper md:text-xl">
        Anthrax{" "}
        <span className="inline-block -rotate-[1.5deg] bg-signal px-[6px] text-ink">
          Brasil
        </span>
      </span>
      <EnterSiteLink className="font-mono text-[11px] tracking-[0.1em] text-on-dark-2 no-underline hover:text-signal" />
    </div>
  );
}
