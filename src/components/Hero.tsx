"use client";

import { useRef } from "react";
import Image from "next/image";
import { hero, decor } from "@/lib/content";
import { useScrollEffect } from "@/hooks/useScroll";
import { Pill } from "./ui/Pill";
import { Eyebrow } from "./ui/Section";

/** translateY(scrollY × factor) appended to each float's base rotation. */
const FLOATS = [
  {
    src: decor.heroFloatLeft,
    factor: 0.09,
    rotate: 7.98,
    w: 400,
    h: 500,
    position: "left-[132px] top-[284px]",
  },
  {
    src: decor.heroFloatRight,
    factor: -0.12,
    rotate: -11.16,
    w: 340,
    h: 400,
    position: "right-[126px] top-[173px]",
  },
] as const;

export function Hero() {
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useScrollEffect((y) => {
    FLOATS.forEach((f, i) => {
      const el = floatRefs.current[i];
      if (el) {
        el.style.transform = `rotate(${f.rotate}deg) translateY(${y * f.factor}px)`;
      }
    });
  });

  return (
    <section
      id="top"
      className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden px-[30px] lg:min-h-[950px]"
    >
      {/* Two cover layers crossfading on a 16s loop, each running Ken Burns */}
      <div
        className="anim-fade-a absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgrounds[0]})` }}
        aria-hidden="true"
      />
      <div
        className="anim-fade-b absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgrounds[1]})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(30,20,8,.62) 0%, rgba(30,20,8,.34) 45%, rgba(30,20,8,.66) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Floating photos — hidden below xl, where they'd collide with the copy */}
      {FLOATS.map((f, i) => (
        <div
          key={f.src}
          ref={(el) => {
            floatRefs.current[i] = el;
          }}
          className={`absolute z-[2] hidden overflow-hidden rounded-[14px] shadow-[0_30px_70px_rgba(20,12,4,0.35)] xl:block ${f.position}`}
          style={{ transform: `rotate(${f.rotate}deg)` }}
          aria-hidden="true"
        >
          <Image
            src={f.src}
            alt=""
            width={f.w}
            height={f.h}
            className="block object-cover"
            style={{ width: f.w, height: f.h }}
            priority
          />
        </div>
      ))}

      <div className="relative z-[3] mt-[53px] w-full max-w-[690px] text-center">
        <Eyebrow tone="white" centered className="mb-[30px]">
          {hero.eyebrow}
        </Eyebrow>

        <h1 className="mb-[50px] text-balance font-display text-[clamp(2.75rem,8.5vw,100px)] font-light uppercase leading-none text-white">
          {hero.heading}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Pill href={hero.primaryCta.href}>{hero.primaryCta.label}</Pill>
        </div>
      </div>
    </section>
  );
}
