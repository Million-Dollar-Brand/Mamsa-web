import Image from "next/image";
import { process } from "@/lib/content";
import { Container, Eyebrow, DisplayHeading, Reveal } from "./ui/Section";

export function Process() {
  return (
    <section id="process" className="pt-[150px]">
      <Container>
        <Reveal>
          <Eyebrow centered>{process.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <DisplayHeading className="mx-auto mb-[90px] mt-6 max-w-[760px] text-center text-brown">
            {process.heading}
          </DisplayHeading>
        </Reveal>

        <ol className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {process.steps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.1}>
              <div className="group overflow-hidden rounded-[14px]">
                <Image
                  src={step.image}
                  alt=""
                  width={260}
                  height={260}
                  aria-hidden="true"
                  className="h-[260px] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.07]"
                />
              </div>
              <p className="pt-6 font-display text-[22px] leading-none text-amber">
                {step.number}
              </p>
              <h3 className="pt-2 font-display text-[26px] font-light uppercase leading-[30px] text-brown">
                {step.title}
              </h3>
              <p className="pt-3 text-[17px] leading-[24px]">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
