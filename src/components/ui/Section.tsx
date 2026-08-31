/** Shared section furniture: the amber-dot eyebrow and the 74px display H2. */

export function Eyebrow({
  children,
  tone = "brown",
  centered = false,
  wide = false,
  className = "",
}: {
  children: React.ReactNode;
  tone?: "brown" | "white";
  centered?: boolean;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 ${
        centered ? "justify-center" : ""
      } ${className}`}
    >
      <span className="block size-[11px] shrink-0 rounded-full bg-amber" />
      <span
        className={`font-bold text-[13px] uppercase leading-none ${
          wide ? "tracking-[2px]" : "tracking-[1px]"
        } ${tone === "white" ? "text-white" : "text-brown"}`}
      >
        {children}
      </span>
    </div>
  );
}

export function DisplayHeading({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={
        "font-display font-light uppercase text-balance " +
        "text-[clamp(2.25rem,5.2vw,74px)] leading-[1.02] " +
        className
      }
    >
      {children}
    </Tag>
  );
}

/** Page container — 1410px content width on a 30px gutter. */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1410px] px-[30px] ${className}`}>
      {children}
    </div>
  );
}

export { Reveal } from "./Reveal";
