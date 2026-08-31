import Image from "next/image";
import { ctaBanner } from "@/lib/content";
import { Container, Reveal } from "./ui/Section";
import { Pill } from "./ui/Pill";

export function CtaBanner() {
  return (
    <section className="pt-[150px]">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] px-[30px] py-[80px] text-center md:px-[60px] md:py-[120px]">
            <Image
              src={ctaBanner.image}
              alt=""
              fill
              aria-hidden="true"
              sizes="(max-width: 1410px) 100vw, 1350px"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(30,20,8,.55)" }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center">
              <Image
                src={ctaBanner.avatar}
                alt=""
                width={110}
                height={110}
                aria-hidden="true"
                className="mb-[34px] size-[110px] rounded-full object-cover"
              />
              <h3 className="mb-6 max-w-[820px] text-balance font-display text-[clamp(2rem,4.4vw,64px)] font-light uppercase leading-[1.1] text-white">
                {ctaBanner.heading}
              </h3>
              <p className="mb-[44px] max-w-[700px] text-[17px] leading-[26px] text-white/[0.82]">
                {ctaBanner.body}
              </p>
              <Pill href={ctaBanner.cta.href} arrowLeading>
                {ctaBanner.cta.label}
              </Pill>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
