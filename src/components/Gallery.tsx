import Image from "next/image";
import { gallery } from "@/lib/content";
import { Container, Eyebrow, DisplayHeading, Reveal } from "./ui/Section";

export function Gallery() {
  return (
    <section id="gallery" className="pt-[150px]">
      <Container>
        <Reveal>
          <Eyebrow centered>{gallery.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <DisplayHeading className="mb-[80px] mt-6 text-center text-brown">
            {gallery.heading}
          </DisplayHeading>
        </Reveal>

        <ul className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 xl:grid-cols-4">
          {gallery.images.map((src, i) => (
            <Reveal as="li" key={src} delay={i * 0.1}>
              <div className="group overflow-hidden rounded-[14px]">
                <Image
                  src={src}
                  alt=""
                  width={340}
                  height={420}
                  aria-hidden="true"
                  className="h-[420px] w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.1]"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
