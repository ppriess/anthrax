import type { NavItem, Site } from "@/lib/content";
import { SearchBar } from "./SearchBar";
import { NavDropdown } from "./NavDropdown";
import { MobileMenu } from "./MobileMenu";
import { SkinToggle } from "./SkinToggle";

function Wordmark({ size }: { size: "lg" | "sm" }) {
  const big = size === "lg";
  return (
    <span
      className={`font-display uppercase leading-[0.9] ${big ? "text-[64px]" : "text-[26px] leading-none"}`}
    >
      Anthrax{" "}
      <span
        className={`inline-block -rotate-[1.5deg] bg-ink text-signal ${big ? "px-3" : "px-[6px]"}`}
      >
        Brasil
      </span>
    </span>
  );
}

export function Masthead({ site, nav }: { site: Site; nav: NavItem[] }) {
  return (
    <header
      id="top"
      className="halftone relative border-b-[6px] border-ink bg-paper text-ink"
    >
      {/* Desktop */}
      <div className="hidden px-10 pb-[18px] pt-[22px] md:block">
        <div className="flex items-end gap-5">
          <div>
            <div className="mb-[2px] font-mono text-xs tracking-[0.24em]">
              {site.edition}
            </div>
            <h1 className="m-0">
              <Wordmark size="lg" />
            </h1>
          </div>
          <div className="ml-auto flex flex-col items-end gap-2">
            <nav className="flex items-center gap-5 text-base font-bold tracking-[0.12em]">
              {nav.map((item) =>
                item.children ? (
                  <NavDropdown
                    key={item.label}
                    label={item.label}
                    active={item.active}
                    children={item.children}
                  />
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className={
                      item.brasil
                        ? "text-brasil-paper no-underline hover:text-brasil-dark"
                        : `text-ink no-underline hover:text-brasil-paper ${item.active ? "border-b-[3px] border-ink" : ""}`
                    }
                  >
                    {item.label}
                  </a>
                ),
              )}
            </nav>
            <div className="flex items-center gap-2">
              <SearchBar placeholder={site.searchPlaceholder} />
              <SkinToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="halftone-sm relative block px-4 pb-3 pt-[14px] md:hidden">
        <div className="flex items-center gap-[10px]">
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em]">
              {site.editionShort}
            </div>
            <Wordmark size="sm" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <a href="/#busca" aria-label="Busca" className="text-lg text-ink">
              ⌕
            </a>
            <MobileMenu nav={nav} />
          </div>
        </div>
      </div>
    </header>
  );
}
