import Link from "next/link";
import { ArrowRight } from "./icons";

type Variant = "amber" | "brown" | "ghost";

const base =
  "inline-flex items-center gap-2.5 rounded-full font-bold uppercase " +
  "text-[13px] tracking-[0.13px] leading-none transition-[transform,background-color,filter,border-color] " +
  "duration-300 ease-out hover:-translate-y-0.5 cursor-pointer";

const variants: Record<Variant, string> = {
  amber: "bg-amber text-brown px-[30px] py-[17px] hover:brightness-[1.06]",
  brown: "bg-brown text-white px-[30px] py-[17px] hover:bg-brown-hover",
  ghost:
    "border border-white/55 text-white px-[28.92px] py-[16.34px] " +
    "hover:bg-white/14 hover:border-white",
};

export type PillProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Arrow before the label — the design does this with flex-direction: row-reverse. */
  arrowLeading?: boolean;
  icon?: React.ReactNode;
  external?: boolean;
  className?: string;
};

export function Pill({
  href,
  children,
  variant = "amber",
  arrowLeading = false,
  icon,
  external = false,
  className = "",
}: PillProps) {
  const glyph = icon ?? <ArrowRight />;
  const content = (
    <>
      <span>{children}</span>
      {glyph}
    </>
  );

  const cls = `${base} ${variants[variant]} ${
    arrowLeading ? "flex-row-reverse" : ""
  } ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/** Same shape as Pill, for use inside a <form>. */
export function PillButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${base} ${variants.amber} px-[34px] py-[19px] border-0 ${className}`}
    >
      <span>{children}</span>
      <ArrowRight />
    </button>
  );
}
