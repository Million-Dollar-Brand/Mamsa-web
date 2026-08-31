import Image from "next/image";
import { whyChooseUs, decor } from "@/lib/content";
import { Container, Eyebrow, DisplayHeading, Reveal } from "./ui/Section";
import { Pill } from "./ui/Pill";

export function WhyChooseUs() {
  return (
    <section className="pt-[150px]">
      <Container>
        <div className="flex flex-col gap-[60px] lg:flex-row lg:gap-[125px]">
          {/* Left column */}
          <div className="lg:flex-1 lg:basis-[695px]">
            <Reveal>
              <Eyebrow>{whyChooseUs.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.1}>
              <DisplayHeading className="mb-[50px] mt-6 text-brown">
                {whyChooseUs.heading}
              </DisplayHeading>
            </Reveal>

            <div className="mb-[30px] flex flex-col gap-[40px] border-b border-line pb-[40px] sm:flex-row">
              {whyChooseUs.features.map((feature, i) => (
                <Reveal key={feature.title} delay={0.15 + i * 0.1} className="flex-1">
                  <div className="flex flex-col gap-[17px]">
                    <Image
                      src={feature.icon}
                      alt=""
                      width={54}
                      height={54}
                      aria-hidden="true"
                      className="size-[54px]"
                    />
                    <h3 className="font-display text-[30px] font-light leading-[30px] text-brown">
                      {feature.title}
                    </h3>
                    <p className="text-[17px] leading-[24px]">{feature.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.24}>
              <p className="mb-[60px] max-w-[657px] text-[17px] leading-[25.5px]">
                {whyChooseUs.body}
              </p>
              <Pill href={whyChooseUs.cta.href} variant="brown">
                {whyChooseUs.cta.label}
              </Pill>
            </Reveal>
          </div>

          {/* Right column — photo with the spinning badge */}
          <Reveal delay={0.2} className="relative lg:w-[480px] lg:shrink-0">
            <Image
              src={decor.whyChooseMain}
              alt="The Mamsa Hall set for a reception"
              width={480}
              height={620}
              className="h-[620px] w-full rounded-[14px] object-cover"
            />
            <Image
              src={decor.badgeSpin}
              alt=""
              width={190}
              height={190}
              aria-hidden="true"
              className="anim-spin-badge absolute bottom-[-40px] left-[-70px] hidden size-[190px] object-contain lg:block"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
