import Link from "next/link";
import { footer, site } from "@/lib/content";
import { Container } from "./ui/Section";

export function Footer() {
  return (
    <footer className="mt-[150px] bg-brown px-[30px] pb-10 pt-[110px] text-white/[0.72]">
      <Container className="px-0">
        <div className="grid grid-cols-1 gap-[60px] border-b border-[rgba(219,212,194,0.16)] pb-[80px] md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-[44px] font-light uppercase leading-[48px] text-white">
              {site.name}
            </p>
            <p className="mt-6 max-w-[320px] text-[17px] leading-[26px]">
              {footer.blurb}
            </p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="mb-[26px] text-[14px] font-bold uppercase tracking-[1px] text-white">
                {col.heading}
              </h2>
              <ul className="flex flex-col gap-[14px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/[0.72] transition-colors hover:text-amber"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-white/[0.72] transition-colors hover:text-amber"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="mb-[26px] text-[14px] font-bold uppercase tracking-[1px] text-white">
              Contact
            </h2>
            <address className="flex flex-col gap-[14px] not-italic">
              <span>{site.address}</span>
              <a
                href={`mailto:${site.email}`}
                className="text-white/[0.72] transition-colors hover:text-amber"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="text-white/[0.72] transition-colors hover:text-amber"
              >
                {site.phone}
              </a>
            </address>
          </div>
        </div>

        <p className="pt-9 text-[14px] text-white/50">{footer.copyright}</p>
      </Container>
    </footer>
  );
}
