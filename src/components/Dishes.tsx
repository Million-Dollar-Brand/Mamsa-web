import Image from "next/image";
import { dishes } from "@/lib/content";
import { Container, Eyebrow, DisplayHeading, Reveal } from "./ui/Section";
import { Pill } from "./ui/Pill";

function DishCard({
  item,
  ariaHidden = false,
}: {
  item: (typeof dishes.items)[number];
  ariaHidden?: boolean;
}) {
  return (
    <li
      aria-hidden={ariaHidden || undefined}
      className="group w-[330px] shrink-0 text-center transition-transform duration-500 ease-out hover:-translate-y-[10px]"
    >
      <div className="overflow-hidden rounded-[14px]">
        <Image
          src={item.image}
          alt={ariaHidden ? "" : item.title}
          width={330}
          height={400}
          className="h-[400px] w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.08]"
        />
      </div>
      <h3 className="pt-[34px] font-display text-[34px] font-light uppercase leading-[40px] text-brown">
        {item.title}
      </h3>
      <p className="pt-2 text-[17px] leading-[25.5px]">{item.caption}</p>
    </li>
  );
}

export function Dishes() {
  return (
    <section id="menus" className="pt-[150px]">
      <Container>
        <Reveal>
          <Eyebrow centered wide>
            {dishes.eyebrow}
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <DisplayHeading className="mx-auto mb-[80px] mt-6 max-w-[625px] text-center text-brown">
            {dishes.heading}
          </DisplayHeading>
        </Reveal>
      </Container>

      {/* Marquee — the four cards duplicated, translating 0 → -50%, paused on hover */}
      <div className="marquee-viewport w-full overflow-hidden">
        <ul className="marquee-track flex w-max gap-[40px] px-[20px]">
          {dishes.items.map((item) => (
            <DishCard key={item.title} item={item} />
          ))}
          {dishes.items.map((item) => (
            <DishCard key={`dup-${item.title}`} item={item} ariaHidden />
          ))}
        </ul>
      </div>

      <Container>
        <Reveal
          delay={0.1}
          className="flex flex-col items-center gap-[40px] pt-[70px] text-center"
        >
          <p className="max-w-[620px] text-[17px] leading-[25.5px]">{dishes.note}</p>
          <Pill href={dishes.cta.href}>{dishes.cta.label}</Pill>
        </Reveal>
      </Container>
    </section>
  );
}
