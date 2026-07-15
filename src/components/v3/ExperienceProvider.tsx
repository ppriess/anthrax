"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type Motion = "full" | "reduced";

type ExperienceCtx = {
  /** false até o cliente resolver prefers-reduced-motion — cenas só montam GSAP com ready */
  ready: boolean;
  motion: Motion;
  setMotion: (m: Motion) => void;
  sound: boolean;
  setSound: (on: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  activeScene: number;
  setActiveScene: (n: number) => void;
  scrollTo: (target: string | number) => void;
};

const Ctx = createContext<ExperienceCtx | null>(null);

const MOTION_KEY = "anthrax-v3-motion";

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [motion, setMotionState] = useState<Motion>("full");
  const [sound, setSound] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // resolve o modo de movimento no cliente: toggle salvo > preferência do SO
  useEffect(() => {
    let initial: Motion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "reduced"
      : "full";
    try {
      const saved = sessionStorage.getItem(MOTION_KEY);
      if (saved === "full" || saved === "reduced") initial = saved;
    } catch {
      /* storage indisponível — ignora */
    }
    setMotionState(initial);
    setReady(true);
  }, []);

  const setMotion = useCallback((m: Motion) => {
    setMotionState(m);
    try {
      sessionStorage.setItem(MOTION_KEY, m);
    } catch {
      /* storage indisponível — ignora */
    }
  }, []);

  // o CSS de v3.css lê [data-motion] no shell (renderizado no layout server)
  useEffect(() => {
    const shell = document.getElementById("v3-shell");
    if (shell) shell.dataset.motion = motion;
  }, [motion]);

  // Lenis só existe em movimento total; dirigido pelo ticker do GSAP pra
  // manter ScrollTrigger e scroll na mesma batida.
  useEffect(() => {
    if (!ready || motion !== "full") return;
    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [ready, motion]);

  // medidas mudam quando fontes/iframe terminam de carregar
  useEffect(() => {
    if (!ready) return;
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      requestAnimationFrame(refresh);
      return;
    }
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, [ready, motion]);

  // menu aberto congela o scroll
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen]);

  const scrollTo = useCallback((target: string | number) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target);
    } else if (typeof target === "number") {
      window.scrollTo({ top: target });
    } else {
      document.querySelector(target)?.scrollIntoView();
    }
  }, []);

  return (
    <Ctx.Provider
      value={{
        ready,
        motion,
        setMotion,
        sound,
        setSound,
        menuOpen,
        setMenuOpen,
        activeScene,
        setActiveScene,
        scrollTo,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useExperience deve ser usado dentro de ExperienceProvider");
  return ctx;
}
