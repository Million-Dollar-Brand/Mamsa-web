import Image from "next/image";
import { team } from "@/lib/content";
import { Container, Eyebrow, DisplayHeading, Reveal } from "./ui/Section";

export function Team() {
  return (
    <section className="pt-[150px]">
      <Container>
        <Reveal>
          <Eyebrow centered>{team.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <DisplayHeading className="mb-[80px] mt-6 text-center text-brown">
            {team.heading}
          </DisplayHeading>
        </Reveal>

        <ul className="grid grid-cols-1 gap-[40px] sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member, i) => (
            <Reveal as="li" key={member.image} delay={i * 0.1}>
              <div className="group overflow-hidden rounded-[14px]">
                <Image
                  src={member.image}
                  alt={member.name ?? ""}
                  width={440}
                  height={520}
                  className="h-[520px] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                />
              </div>
              {member.name && (
                <h3 className="pt-[26px] font-display text-[30px] font-light uppercase leading-[34px] text-brown">
                  {member.name}
                </h3>
              )}
              {member.role && (
                <p className="pt-1.5 text-[17px] leading-[25.5px]">{member.role}</p>
              )}
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
