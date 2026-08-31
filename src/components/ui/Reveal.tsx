"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll reveal. One shared IntersectionObserver for the whole page (per the
 * handoff), but each element's shown/hidden state lives in React — writing the
 * attribute imperatively would be undone the next time a parent re-renders
 * (e.g. while the 480 counter animates).
 */
const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cb = callbacks.get(entry.target);
          observer!.unobserve(entry.target);
          callbacks.delete(entry.target);
          cb?.();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -6% 0px" },
    );
  }
  return observer;
}

export function Reveal({
  children,
  delay = 0,
  y = 26,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "section";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = getObserver();
    callbacks.set(el, () => setShown(true));
    io.observe(el);

    return () => {
      io.unobserve(el);
      callbacks.delete(el);
    };
  }, [shown]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal={shown ? "shown" : ""}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
      className={className}
    >
      {children}
    </Tag>
  );
}
