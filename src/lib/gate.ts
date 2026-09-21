// gate de lançamento do Cursum Perficio: "/" abre a página de audição em vez
// da home até essa data, depois volta a ser a home direto — sem revert manual.
export const GATE_UNTIL = new Date("2026-10-19T00:00:00-03:00");

// setado pelo EnterSiteLink quando alguém clica "ENTRAR NO SITE" — evita que
// os links internos do próprio site (nav, busca, menu mobile), que sempre
// apontam pra "/#secao", caiam de volta no gate durante a navegação.
export const GATE_BYPASS_COOKIE = "anthrax_gate_bypass";

export function isGateActive(bypassCookieValue?: string): boolean {
  if (bypassCookieValue === "1") return false;
  return new Date() < GATE_UNTIL;
}
