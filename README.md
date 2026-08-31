# Mamsa Cafe & Banquet

Single-page marketing site for **Mamsa Cafe & Banquet**, a banquet and catering venue in
Gurugram. Implemented from the Claude Design handoff in
`../design_handoff_kwality_durbar/` (`Kwality Durbar.dc.html` + `README.md`).

---

## Stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 15.5** (App Router, RSC) |
| UI | **React 19** |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`, no `tailwind.config`) |
| Components | **shadcn/ui** (`base-nova` style, **Base UI** primitives) |
| Forms | **react-hook-form** + **zod** via `@hookform/resolvers` |
| Icons | `lucide-react` (shadcn) + hand-rolled inline SVG for the design's own glyphs |
| Images | `next/image`, assets served from `public/images/` |

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

### Two setup gotchas

1. **npm 11+ blocks install scripts.** If `npm install` warns about pending scripts,
   the native binaries for Tailwind's oxide engine and `sharp` never get fetched and
   `next dev` won't start:
   ```bash
   npm approve-scripts @tailwindcss/oxide sharp
   ```
2. **Never run `next build` while `next dev` is running.** The build overwrites
   `.next`, which corrupts the running dev server's manifests — you'll get
   `Cannot find module './289.js'` and every `/_next/static/chunks/*` will 404.
   Stop the dev server, `rm -rf .next`, then build.

---

## Project structure

```
src/
  app/
    layout.tsx           next/font (Koh Santepheap + Roboto Flex), metadata, OG
    page.tsx             section composition, in design DOM order
    globals.css          design tokens, keyframes, reveal styles, shadcn tokens
  lib/
    content.ts           EVERY string + asset path on the page
    booking-schema.ts    zod schema + guest bounds for the booking form
    utils.ts             cn() helper (shadcn)
  hooks/
    useScroll.ts         ONE shared rAF-batched scroll listener
    useCountUp.ts        the 0 → 480 counter
  components/
    Header · Hero · WhoWeAre · EventsStack · WhyChooseUs · Dishes ·
    VideoBand · Process · Team · Gallery · Testimonial · ContactForm ·
    News · CtaBanner · Footer · WhatsAppButton
    ui/
      Section.tsx        Container, Eyebrow, DisplayHeading (+ re-exports Reveal)
      Reveal.tsx         scroll-reveal wrapper (client)
      Pill.tsx           the design's pill button, 3 variants
      icons.tsx          arrow / phone / play / WhatsApp SVGs
      form.tsx           react-hook-form <-> accessible markup wrapper
      button · input · select · textarea · label   (shadcn generated)
public/images/           40 assets pulled local from the design's CDN
_legacy_vite/            previous Vite/Figma export — reference only, safe to delete
```

### Editing content

**All copy lives in `src/lib/content.ts`.** No strings are hard-coded in components.
Change the venue name, phone, address, dishes, blog posts, etc. in that one file.

---

## Design system

Tokens are defined CSS-first in `src/app/globals.css` under `@theme`, so they're
usable as Tailwind utilities (`bg-cream`, `text-brown`, `border-line`, …).

| Token | Value | Use |
|---|---|---|
| `cream` | `rgb(242,234,218)` | page background |
| `brown` | `rgb(68,46,19)` | headings, dark buttons, footer, testimonial |
| `brown-hover` | `rgb(88,60,25)` | dark button hover |
| `amber` | `rgb(243,174,88)` | accent, primary buttons, active nav, link hover |
| `body` | `rgb(103,90,74)` | paragraphs |
| `line` | `rgb(219,212,194)` | dividers, input borders |
| `whatsapp` | `#25D366` (ink `#0b2e18`) | floating button |

**Type** — Display: Koh Santepheap (300/400/700). Body: Roboto Flex, 17px/25.5px.
Both load via `next/font/google`; the theme's original woff2 files were expired links.

**Radii** — `14px` images · `11px` glass event cards · `20px` testimonial + CTA banner ·
`100px` pills · `50%` circles.

---

## Animation

Six continuous keyframes, named as in the design (`anikaFadeA/B`, `anikaKen`,
`anikaMarquee`, `anikaPulse`, `anikaSpin`, `anikaFloat`).

**Scroll-driven work all runs through one rAF-batched passive listener**
(`src/hooks/useScroll.ts`) rather than a listener per component:

- header solidifies past `scrollY > 90`
- hero float parallax (factors `+0.09` / `-0.12`) and decor garnish (`-0.06`)
- the events sticky card stack + dots + background swap

**Scroll reveal** (~42 blocks) uses a single shared `IntersectionObserver`
(`threshold 0.01`, `rootMargin "0px 0px -6% 0px"`, one-shot, unobserved after firing).

**`prefers-reduced-motion: reduce` disables all of it** — every keyframe animation,
the reveals, and smooth scrolling.

### Events card stack math

Section is `420vh`; the inner panel sticks for `100vh`.

```
p   = clamp(-rect.top / (sectionHeight - innerHeight), 0, 1)
pos = p × (n - 1)
d   = pos - i

d >= 0 : translateY(-d × 46px) scale(max(0.84, 1 - d × 0.08))
         opacity = max(0, 1 - max(0, d - 0.85) × 1.6)
d <  0 : translateY(min(110, -d × 110)%)
         opacity = max(0, 1 + d)
z-index = 10 + i
```

---

## The booking form

`src/components/ContactForm.tsx` — react-hook-form + zod, composed with the shadcn
`Form` primitives so ids, `aria-describedby` and `aria-invalid` are wired up.

Rules live in `src/lib/booking-schema.ts`:

| Field | Rule |
|---|---|
| name | required |
| phone | required, ≥10 digits |
| email | **optional**, but format-validated when present |
| eventType | required |
| date | required, must not be in the past |
| guests | required, integer 20–900 (maps to hall capacity) |
| company / message | optional |
| website | honeypot — must stay empty |

**⚠️ It POSTs to `/api/booking`, which does not exist yet.** Submitting always hits the
error branch. Create the route (or repoint the `fetch`) and add real spam protection —
the honeypot is a placeholder, not a substitute.

Submit states: `idle | submitting | success | error`.

### Notes on shadcn here

- Init selected **Base UI**, not Radix (`components.json` → `"style": "base-nova"`).
- The registry **does not ship `form` for the Base UI style** (`shadcn view form` returns
  an item with no files), so `src/components/ui/form.tsx` implements the same
  composition pattern locally.
- The Event Type control is a **native `<select>`**, not shadcn's `Select`. The design
  calls for a flat pill that matches the sibling inputs; the portal/popup Select would
  have to be restyled substantially to match and adds no value for five static options.
- `shadcn init` rewrites `globals.css`. Two things had to be corrected afterwards, and
  will need correcting again if you re-run it:
  1. It emits `--font-sans: var(--font-sans)` (circular, resolves to nothing). Replaced
     with literal family names — `@theme inline` resolves at parse time and cannot read
     a runtime `next/font` variable.
  2. It added Geist to `layout.tsx` and forced `font-sans` on `<html>`. Removed; the
     design's stack is Koh Santepheap + Roboto Flex.
- shadcn's `:root` `--background` / `--foreground` / `--primary` are **re-pointed at the
  brand palette**, so its components inherit site colours and `body` keeps the cream
  ground instead of shadcn's default white.

---

## Gotcha worth knowing: `@layer base`

Element resets in `globals.css` **must** stay inside `@layer base`. Unlayered CSS
outranks Tailwind's `utilities` layer, so an unlayered `h1..h6 { margin: 0 }` silently
kills `mx-auto`, `mt-*` and `mb-*` on every heading — headings render left-aligned with
no spacing and nothing appears wrong in the markup.

---

## Responsive

The source design is **desktop-only at a fixed 1710px** and the handoff explicitly lists
tablet/mobile as needing design decisions before implementation.

Desktop is reproduced to spec. Below that, the breakpoints follow the handoff's own
recommendations and are **not from an approved design — get them signed off**:

- nav collapses to a hamburger drawer below `xl`
- hero floating photos dropped below `xl`; H1 scales via `clamp()`
- 5-col process → 3 → 2 → 1; 4-col gallery → 2 → 1; 3-col team/blog → 2 → 1
- the sticky events stack keeps working but wants a proper small-screen fallback

---

## Before this can launch

- [ ] **Every string is dummy data** from the mock — venue, address, phone, team names,
      testimonial, blog posts and counts (three halls, 480 events/year, "since 1994")
      are unverified. Replace in `src/lib/content.ts`.
- [ ] **All 40 images are placeholder stock** from a WordPress theme preview and are
      **not licensed for this client**. They were downloaded out of the design's
      expiring CDN into `public/images/` so the build doesn't depend on dead hotlinks,
      but every one still needs replacing with real venue photography.
- [ ] Confirm the email/domain — `events@mamsacafe.com` and `metadataBase`
      `https://mamsacafe.com` are placeholders.
- [ ] Build the `/api/booking` endpoint and add spam protection.
- [ ] Wire the video band's play button to a real embed (currently a placeholder lightbox).
- [ ] Replace the text wordmark with a real logo if one exists.
- [ ] Nav links are in-page anchors only. About / Venues / Menus / Blog become real
      routes when those pages exist.

### Intentional deviations from the design file

- The source's `succesfull` typo is corrected to `successful`.
- "Chat on WhatsApp" was removed from the hero and footer; it remains only on the
  floating button, to avoid three copies of the same CTA.
- Brand-derived names follow the venue rename: `Durbar Hall` → **Mamsa Hall**,
  `Durbar Wedding Thali` → **Mamsa Wedding Thali**, menu tier `Durbar` → **Mamsa**.
- Header sub-line is `catering & events`, not the design's `banquet & catering`, which
  would have repeated "Banquet" directly under the wordmark.
