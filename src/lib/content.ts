/**
 * All page copy and asset paths from the Mamsa Cafe & Banquet design handoff.
 *
 * NOTE: every string here is dummy data written for the mock — the venue,
 * address, phone, team names, testimonial and counts are unverified.
 * Replace with real client copy before launch.
 */

export const site = {
  name: "Mamsa Cafe & Banquet",
  tagline: "catering & events",
  phone: "+977 9812345678",
  phoneHref: "tel:+9779812345678",
  email: "events@mamsacafe.com",
  address: "Plot 14, Sector 29, Golf Course Road, Gurugram 122002",
  whatsapp:
    "https://wa.me/9779812345678?text=Hi%2C%20I%27d%20like%20to%20check%20a%20date",
} as const;

export const nav = [
  { label: "Home", href: "#top", active: true },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menus" },
  { label: "Event", href: "#events" },
  { label: "Venues", href: "#gallery" },
  { label: "News", href: "#news" },
] as const;

export const hero = {
  eyebrow: "The Best Events Start Here",
  heading: "Creation of Memorable Events",
  primaryCta: { label: "Book an event online", href: "#contact" },
  backgrounds: ["/images/hero-bg-1.jpg", "/images/hero-bg-2.jpg"],
} as const;

export const about = {
  eyebrow: "who we are",
  heading: "Professional Catering Teams at Mamsa Cafe & Banquet",
  counter: { to: 480, suffix: "+", caption: "events hosted each year" },
  lead: "every event is a unique opportunity to craft a culinary experience as extraordinary as delicious.",
  body: "A wedding, a mehndi or a board dinner — every date on our calendar is somebody’s once-only evening. Mamsa Cafe & Banquet runs three halls and a garden lawn in Gurugram, with an in-house kitchen brigade of 42 and a planning desk that handles décor, licences, valet and coordination end to end.",
  cta: { label: "learn about us", href: "#contact" },
} as const;

export const events = [
  {
    title: "Corporate",
    body: "Conferences, annual days and award nights for 80 to 600 guests, with AV, staging and a plated or live-counter menu.",
    image: "/images/event-corporate.jpg",
  },
  {
    title: "Social Event",
    body: "Birthdays, anniversaries and receptions in the Mamsa Hall, with themed décor and a twelve-dish buffet.",
    image: "/images/event-social.jpg",
  },
  {
    title: "Weddings",
    body: "Mehndi, sangeet, pheras and reception across the lawn and both halls, handled as one continuous plan.",
    image: "/images/event-weddings.jpg",
  },
  {
    title: "Parties",
    body: "Cocktail evenings and house parties with live grills, full bar service and a DJ console on the terrace.",
    image: "/images/event-parties.jpg",
  },
] as const;

export const whyChooseUs = {
  eyebrow: "why choose us",
  heading: "Unforgettable Catering For Any Occasion!",
  features: [
    {
      title: "Premium dining",
      body: "Seasonal menus tasted with you before the date, cooked fresh in our own kitchen on the day.",
      icon: "/images/icon-premium-dining.svg",
    },
    {
      title: "Abundant flavors",
      body: "Awadhi, Punjabi, Continental and Pan-Asian counters, plus a full Jain and vegan spread.",
      icon: "/images/icon-abundant-flavors.svg",
    },
  ],
  body: "Three halls, one garden lawn and a kitchen that has served more than 6,000 events since 1994. Your coordinator stays on the floor from the first guest to the last, so none of the evening lands back on you.",
  cta: { label: "call us now", href: site.phoneHref },
} as const;

export const dishes = {
  eyebrow: "Catering Menus",
  heading: "Most Popular Dishes",
  note: "Every menu is settled at a tasting with you — nine vegetarian counters, six non-vegetarian, and a dessert table that changes with the season.",
  cta: { label: "Explore Menu", href: "#contact" },
  items: [
    {
      title: "Mamsa Wedding Thali",
      caption:
        "Nine vegetarian courses served on brass, the way a Mamsa wedding is meant to be eaten.",
      image: "/images/dish-thali.jpg",
    },
    {
      title: "Awadhi Dum Biryani",
      caption:
        "Long-grain rice, slow-sealed handi, served with burani raita and mirch ka salan.",
      image: "/images/dish-biryani.jpg",
    },
    {
      title: "Live Chaat Counter",
      caption: "Six chaats made to order, from Delhi aloo tikki to Bombay bhel.",
      image: "/images/dish-chaat.jpg",
    },
    {
      title: "Shahi Dessert Table",
      caption: "Rabri, gajar halwa, baked rasmalai and a live jalebi station.",
      image: "/images/dish-dessert.jpg",
    },
  ],
} as const;

export const videoBand = {
  caption: "a walk through the mamsa hall",
  still: "/images/video-still.jpg",
} as const;

export const process = {
  eyebrow: "our work process",
  heading: "steps to plan a successful event",
  steps: [
    {
      number: "01",
      title: "Tell us about your event",
      body: "Share the date, the guest count and the kind of evening you have in mind.",
      image: "/images/process-1.jpg",
    },
    {
      number: "02",
      title: "Choose your package",
      body: "Pick a hall and a menu tier — Silver, Gold or Mamsa — with per-plate pricing in writing.",
      image: "/images/process-2.jpg",
    },
    {
      number: "03",
      title: "Meet your coordinator",
      body: "One named coordinator takes over décor, vendors, licences and the run sheet.",
      image: "/images/process-3.jpg",
    },
    {
      number: "04",
      title: "Walk through and polish details",
      body: "Walk the hall a week before, taste the final menu and lock the timings.",
      image: "/images/process-4.jpg",
    },
    {
      number: "05",
      title: "Put your trust in our team",
      body: "On the day our floor team runs the evening while you stay with your guests.",
      image: "/images/process-5.jpg",
    },
  ],
} as const;

export const team = {
  eyebrow: "Meet incredible people",
  heading: "Meet the people behind Mamsa Cafe & Banquet.",
  members: [
    {
      name: "Rohit Malhotra",
      role: "Founder & Executive Chef",
      image: "/images/team-rohit.jpg",
    },
    {
      name: "Ananya Verma",
      role: "Head of Events",
      image: "/images/team-ananya.jpg",
    },
    // Third card is image-only — intentional, from the source layout.
    { name: null, role: null, image: "/images/team-third.jpg" },
  ],
} as const;

export const gallery = {
  eyebrow: "Gallery",
  heading: "Catering that creates moments!",
  images: [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-3.jpg",
    "/images/gallery-4.jpg",
  ],
} as const;

export const testimonial = {
  quote:
    "“Mamsa Cafe & Banquet ran our daughter’s reception for 480 guests without a single reminder from us. Six months on, people still bring up the biryani counter.”",
  name: "Meera Raghavan",
  role: "Mother of the bride, December 2025",
  photo: "/images/testimonial-photo.jpg",
  avatar: "/images/testimonial-avatar.jpg",
} as const;

export const contact = {
  eyebrow: "Contact and reservations",
  heading: "Book Your Date at Mamsa Cafe & Banquet",
  eventTypes: ["Corporate", "Social Event", "Weddings", "Parties"],
  successNote: "Thanks — we’ll be in touch within one business day.",
} as const;

export const news = {
  eyebrow: "NEWS & BLOG",
  heading: "Discover the Art of Catering",
  posts: [
    {
      date: "March 3, 2026",
      comments: 6,
      title: "What 480 guests actually eat: planning quantities",
      image: "/images/blog-1.jpg",
    },
    {
      date: "February 18, 2026",
      comments: 4,
      title: "Choosing between the garden lawn and the Mamsa Hall",
      image: "/images/blog-2.jpg",
    },
    {
      date: "January 27, 2026",
      comments: 9,
      title: "Booking in wedding season: what to lock first",
      image: "/images/blog-3.jpg",
    },
  ],
} as const;

export const ctaBanner = {
  heading: "Unforgettable Catering For Any Occasion!",
  body: "Halls for 80 to 600 guests, a garden lawn for 900, and dates open from October through February. Send us your date and we will hold it for 48 hours.",
  cta: { label: "Reserve Now", href: "#contact" },
  image: "/images/cta-banner.jpg",
  avatar: "/images/cta-avatar.jpg",
} as const;

export const footer = {
  blurb:
    "Banquet halls, garden lawn and catering in Gurugram since 1994. Three halls, one kitchen, 480 events a year.",
  columns: [
    {
      heading: "Discover",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Menus", href: "#menus" },
        { label: "Gallery", href: "#gallery" },
        { label: "Blog", href: "#news" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      heading: "Events",
      links: [
        { label: "Corporate", href: "#events" },
        { label: "Wedding", href: "#events" },
        { label: "Social Events", href: "#events" },
        { label: "Parties", href: "#events" },
      ],
    },
  ],
  copyright: "© 2026 Mamsa Cafe & Banquet. All rights reserved.",
} as const;

export const decor = {
  garnishRotated: "/images/decor-garnish-rotated.png",
  garnishFloat: "/images/decor-garnish-float.png",
  badgeSpin: "/images/badge-spin.png",
  aboutStat: "/images/about-stat.jpg",
  aboutMain: "/images/about-main.jpg",
  whyChooseMain: "/images/why-choose-main.jpg",
  heroFloatLeft: "/images/hero-float-left.jpg",
  heroFloatRight: "/images/hero-float-right.jpg",
} as const;
