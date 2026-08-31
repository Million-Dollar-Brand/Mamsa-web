"use client";

import { useRef } from "react";
import Image from "next/image";
import { about, decor } from "@/lib/content";
import { useScrollEffect, prefersReducedMotion } from "@/hooks/useScroll";
import { useCountUp } from "@/hooks/useCountUp";
import { Container, Eyebrow, DisplayHeading, Reveal } from "./ui/Section";
import { Pill } from "./ui/Pill";

export function WhoWeAre() {
  const garnishRef = useRef<HTMLImageElement>(null);
  const reducedRef = useRef<boolean | null>(null);
  const { ref: counterRef, value } = useCountUp(about.counter.to);

  useScrollEffect((y) => {
    const el = garnishRef.current;
    if (!el) return;
    // Checked lazily — the callback only ever runs on the client.
    if (reducedRef.current === null) reducedRef.current = prefersReducedMotion();
    // Plate keeps its 50deg tilt as the base and spins on from there with scroll.
    // translateY comes first so the parallax stays vertical as the plate turns.
    const spin = reducedRef.current ? 0 : y * 0.08;
    el.style.transform = `translateY(${y * -0.06}px) rotate(${50 + spin}deg)`;
  });

  return (
    <section id="about" className="relative pb-[140px] pt-[140px] lg:pt-[228px]">
      {/* Decorative garnish — parallax and bob, purely ornamental */}
      <Image
        ref={garnishRef}
        src={decor.garnishRotated}
        alt=""
        width={300}
        height={300}
        aria-hidden="true"
        className="pointer-events-none absolute right-[29%] top-[-11%] hidden size-[300px] object-contain lg:block"
        style={{ transform: "rotate(50deg)" }}
      />
      <Image
        src={decor.garnishFloat}
        alt=""
        width={267}
        height={242}
        aria-hidden="true"
        className="anim-float pointer-events-none absolute left-[16.5%] top-[11.5%] hidden h-[241.84px] w-[266.72px] -translate-y-[200px] object-contain lg:block"
      />

      <Container className="relative">
        <Reveal>
          <Eyebrow centered>{about.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <DisplayHeading className="mx-auto mb-[80px] mt-6 max-w-[695px] text-center text-brown">
            {about.heading}
          </DisplayHeading>
        </Reveal>

        <div className="flex flex-col items-start gap-[60px] lg:flex-row lg:gap-[77px]">
          {/* Stat column */}
          <Reveal delay={0.12} className="w-full lg:mr-[23px] lg:w-[260px] lg:shrink-0">
            <Image
              src={decor.aboutStat}
              alt="Guests seated at a Mamsa Cafe & Banquet event"
              width={260}
              height={180}
              className="mb-[30px] h-[180px] w-full rounded-[14px] object-cover lg:w-[260px]"
            />
            <div className="flex items-baseline text-brown">
              <span
                ref={counterRef}
                className="font-display text-[95px] font-light leading-[95px]"
              >
                {value}
              </span>
              <span className="font-display text-[55px] font-light leading-[70px]">
                {about.counter.suffix}
              </span>
            </div>
            <p className="text-[20px] leading-[24px] text-brown">
              {about.counter.caption}
            </p>
          </Reveal>

          {/* Text column */}
          <Reveal delay={0.2} className="w-full lg:flex-1">
            <p className="mb-[30px] font-display text-[30px] font-light uppercase leading-[40px] text-brown">
              {about.lead}
            </p>
            <p className="mb-[50px] max-w-[443px] text-[17px] leading-[24px]">
              {about.body}
            </p>
            <Pill href={about.cta.href} variant="brown">
              {about.cta.label}
            </Pill>
          </Reveal>

          {/* Photo column */}
          <Reveal delay={0.26} className="w-full lg:w-[440px] lg:shrink-0">
            <Image
              src={decor.aboutMain}
              alt="A plated course from the Mamsa Cafe & Banquet kitchen"
              width={440}
              height={540}
              className="h-[540px] w-full rounded-[14px] object-cover"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
