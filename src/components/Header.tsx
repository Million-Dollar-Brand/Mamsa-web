"use client";

import { useState } from "react";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import { useScrollEffect } from "@/hooks/useScroll";
import { Pill } from "./ui/Pill";
import { PhoneIcon } from "./ui/icons";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Design: past 90px the bar gets a translucent brown fill + blur.
  useScrollEffect((y) => setSolid(y > 90));

  return (
    <header className="sticky top-0 z-[99] h-0">
      <div
        className={`px-[30px] transition-[background-color,padding,backdrop-filter] duration-[450ms] ease-out ${
          solid
            ? "bg-[rgba(45,30,12,0.9)] pt-2.5 backdrop-blur-[14px]"
            : "bg-transparent pt-5"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1730px] items-center justify-between gap-5 border-b border-[rgba(219,212,194,0.14)] pb-5">
          {/* Nav — 40% column on desktop, drawer toggle below xl */}
          <nav
            aria-label="Primary Navigation"
            className="hidden w-2/5 xl:block"
          >
            <ul className="flex flex-wrap items-center">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 text-[14px] font-semibold uppercase leading-[21px] transition-colors hover:text-amber ${
                      "active" in item && item.active ? "text-amber" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-2 xl:hidden"
          >
            <span className="block h-[2px] w-6 bg-white" />
            <span className="block h-[2px] w-6 bg-white" />
            <span className="block h-[2px] w-6 bg-white" />
          </button>

          {/* Wordmark */}
          <Link href="#top" className="shrink-0 text-center">
            <span className="block font-display text-[clamp(1.25rem,2.2vw,32px)] font-light uppercase leading-none tracking-[2px] text-white">
              {site.name}
            </span>
            <span className="block pt-[7px] text-[10px] uppercase leading-none tracking-[4px] text-amber">
              {site.tagline}
            </span>
          </Link>

          {/* Phone + CTA */}
          <div className="flex w-2/5 items-center justify-end gap-[30px]">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-[14px] text-[18px] font-semibold uppercase leading-[21.6px] text-white transition-colors hover:text-amber lg:flex"
            >
              <PhoneIcon />
              {site.phone}
            </a>
            <Pill href="#contact" className="hidden sm:inline-flex">
              Get a quote
            </Pill>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="bg-[rgba(45,30,12,0.97)] px-[30px] py-6 backdrop-blur-[14px] xl:hidden">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[14px] font-semibold uppercase tracking-wide text-white transition-colors hover:text-amber"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={site.phoneHref}
                className="flex items-center gap-[14px] py-3 text-[16px] font-semibold uppercase text-white"
              >
                <PhoneIcon />
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
