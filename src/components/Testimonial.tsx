import Image from "next/image";
import { testimonial } from "@/lib/content";
import { Container, Reveal } from "./ui/Section";

export function Testimonial() {
  return (
    <section className="pt-[150px]">
      <Container>
        <Reveal>
          <figure className="flex flex-col items-center gap-[40px] rounded-[20px] bg-brown p-[40px] md:p-[80px] lg:flex-row lg:gap-[60px]">
            <Image
              src={testimonial.photo}
              alt=""
              width={320}
              height={320}
              aria-hidden="true"
              className="size-[240px] shrink-0 rounded-full object-cover lg:size-[320px]"
            />
            <div>
              <blockquote className="mb-[36px] font-display text-[clamp(1.5rem,2.6vw,40px)] font-light leading-[1.4] text-white">
                {testimonial.quote}
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt=""
                  width={64}
                  height={64}
                  aria-hidden="true"
                  className="size-16 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="text-[14px] font-bold uppercase tracking-[1px] text-amber">
                    {testimonial.name}
                  </p>
                  <p className="text-[15px] text-white/[0.62]">{testimonial.role}</p>
                </div>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
