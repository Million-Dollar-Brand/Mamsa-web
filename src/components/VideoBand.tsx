"use client";

import { useState } from "react";
import Image from "next/image";
import { videoBand } from "@/lib/content";
import { PlayIcon } from "./ui/icons";

export function VideoBand() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative mt-[150px] h-[640px]">
      <Image
        src={videoBand.still}
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(30,20,8,.45)" }}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-[28px] px-[30px]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play the venue walkthrough"
          className="anim-pulse-ring flex size-[104px] cursor-pointer items-center justify-center rounded-full border-0 bg-white/90 text-brown transition-transform duration-300 hover:scale-[1.06]"
        >
          <PlayIcon />
        </button>
        <p className="text-center font-display text-[clamp(1.25rem,3vw,28px)] uppercase tracking-[2px] text-white">
          {videoBand.caption}
        </p>
      </div>

      {/* Lightbox — the prototype's button was not wired to a player. Drop the
          venue tour embed in here when the client supplies one. */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Venue walkthrough"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex aspect-video w-full max-w-[960px] items-center justify-center rounded-[14px] bg-black text-center text-white/70"
          >
            <p className="px-8 text-[15px]">
              Venue walkthrough video goes here — replace with the client&rsquo;s embed.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="absolute right-8 top-8 cursor-pointer border-0 bg-transparent text-[32px] leading-none text-white"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
