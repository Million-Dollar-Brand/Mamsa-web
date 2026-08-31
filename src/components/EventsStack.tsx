"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { events } from "@/lib/content";
import { useScrollEffect } from "@/hooks/useScroll";

/**
 * Scroll-driven sticky card stack. The section is 420vh tall; the inner panel
 * sticks for its full height and the four cards are driven off scroll progress.
 *
 *   p   = clamp(-rect.top / (sectionHeight - innerHeight), 0, 1)
 *   pos = p × (n - 1)
 *   d   = pos - i
 */
export function EventsStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useScrollEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, -rect.top / (total || 1)));
    const n = events.length;
    const pos = p * (n - 1);

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const d = pos - i;
      if (d >= 0) {
        const s = Math.max(0.84, 1 - d * 0.08);
        card.style.transform = `translateY(${-d * 46}px) scale(${s})`;
        card.style.opacity = String(Math.max(0, 1 - Math.max(0, d - 0.85) * 1.6));
      } else {
        card.style.transform = `translateY(${Math.min(110, -d * 110)}%) scale(1)`;
        card.style.opacity = d > -1 ? String(Math.max(0, 1 + d)) : "0";
      }
      card.style.zIndex = String(10 + i);
    });

    setActive(Math.round(pos));
  });

  return (
    <section id="events" ref={sectionRef} className="relative h-[420vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Full-bleed cover, swapped to match the front card.
            Wrapped in a relative box — next/image `fill` rejects a sticky parent. */}
        <div className="absolute inset-0">
          {events.map((event, i) => (
            <Image
              key={event.image}
              src={event.image}
              alt=""
              fill
              aria-hidden="true"
              sizes="100vw"
              className="object-cover transition-opacity duration-[600ms]"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/[0.34]" aria-hidden="true" />

        {/* Giant background wordmark */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[clamp(3rem,13vw,200px)] uppercase leading-[1.2] text-white/[0.24]"
        >
          Events we cater
        </span>

        <h2 className="sr-only">Events we cater</h2>

        {/* Card viewport */}
        <div className="absolute inset-0 flex items-center justify-center px-[30px]">
          <div className="relative h-[645px] w-[460px] max-w-[88vw]">
            {events.map((event, i) => (
              <div
                key={event.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="group absolute inset-x-0 top-0 flex min-h-[645px] flex-col justify-end rounded-[11px] bg-white/[0.24] px-[30px] pb-[88px] pt-[50px] text-center backdrop-blur-[58px]"
                style={{ zIndex: 10 + i }}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  width={300}
                  height={300}
                  className="mx-auto size-[300px] max-w-full rounded-full object-cover"
                />
                <h3 className="pt-8 font-display text-[54px] font-light uppercase leading-[60px] text-white transition-colors group-hover:text-amber">
                  {event.title}
                </h3>
                <p className="px-[30px] pt-[21px] text-[17px] leading-[25.5px] text-white">
                  {event.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute inset-x-0 bottom-[38px] flex justify-center gap-3">
          {events.map((event, i) => (
            <span
              key={event.title}
              aria-hidden="true"
              className="block size-2 rounded-full bg-white transition-all duration-[400ms]"
              style={{
                opacity: i === active ? 1 : 0.35,
                transform: i === active ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
