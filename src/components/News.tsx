import Image from "next/image";
import Link from "next/link";
import { news } from "@/lib/content";
import { Container, Eyebrow, DisplayHeading, Reveal } from "./ui/Section";
import { ArrowRight } from "./ui/icons";

export function News() {
  return (
    <section id="news" className="pt-[150px]">
      <Container>
        <Reveal>
          <Eyebrow centered>{news.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <DisplayHeading className="mb-[80px] mt-6 text-center text-brown">
            {news.heading}
          </DisplayHeading>
        </Reveal>

        <ul className="grid grid-cols-1 gap-[40px] md:grid-cols-2 lg:grid-cols-3">
          {news.posts.map((post, i) => (
            <Reveal as="li" key={post.title} delay={i * 0.1}>
              <article className="group">
                <div className="overflow-hidden rounded-[14px]">
                  <Image
                    src={post.image}
                    alt=""
                    width={440}
                    height={320}
                    aria-hidden="true"
                    className="h-[320px] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.07]"
                  />
                </div>
                <div className="flex gap-5 pt-6 text-[14px] uppercase tracking-[0.6px]">
                  <time>{post.date}</time>
                  <span>
                    {post.comments} comment{Number(post.comments) === 1 ? "" : "s"}
                  </span>
                </div>
                <h3 className="pt-3 font-display text-[30px] font-light uppercase leading-[38px] text-brown">
                  {post.title}
                </h3>
                <Link
                  href="#news"
                  className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[1px] text-brown transition-colors hover:text-amber"
                >
                  Read More
                  <ArrowRight />
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
