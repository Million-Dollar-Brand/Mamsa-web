"use client";

import { useEffect, useState } from "react";

/**
 * One passive scroll listener for the whole page, batched into a single rAF
 * frame — the handoff calls for all scroll-driven work in one handler rather
 * than a listener per component.
 */
type Listener = (scrollY: number) => void;

const listeners = new Set<Listener>();
let ticking = false;
let attached = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const y = window.scrollY;
    for (const fn of listeners) fn(y);
  });
}

function subscribe(fn: Listener) {
  listeners.add(fn);
  if (!attached) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    attached = true;
  }
  fn(window.scrollY);

  return () => {
    listeners.delete(fn);
    if (listeners.size === 0 && attached) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      attached = false;
    }
  };
}

/** Subscribe to scrollY with an imperative callback (no re-render). */
export function useScrollEffect(fn: Listener, deps: unknown[] = []) {
  useEffect(() => subscribe(fn), deps); // eslint-disable-line react-hooks/exhaustive-deps
}

/** Scroll position as state, for components that need to re-render on it. */
export function useScrollY(): number {
  const [y, setY] = useState(0);
  useEffect(() => subscribe(setY), []);
  return y;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
