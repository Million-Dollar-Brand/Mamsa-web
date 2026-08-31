import { z } from "zod";

/** Guest bounds map to hall capacity — 80–600 indoors, 900 on the garden lawn. */
export const MIN_GUESTS = 20;
export const MAX_GUESTS = 900;

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const bookingSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name."),
  phone: z
    .string()
    .trim()
    .min(1, "We need a phone number to confirm the date.")
    .refine(
      (v) => v.replace(/\D/g, "").length >= 10,
      "That phone number looks too short.",
    ),
  // Optional, but validated when present.
  email: z
    .union([z.literal(""), z.string().email("That email address doesn’t look right.")])
    .optional(),
  company: z.string().optional(),
  eventType: z.string().min(1, "Pick an event type."),
  date: z
    .string()
    .min(1, "Choose a date.")
    .refine(
      (v) => new Date(`${v}T00:00:00`) >= today(),
      "Please choose a date in the future.",
    ),
  // Kept as a string so it types cleanly against the input; converted on submit.
  guests: z
    .string()
    .min(1, "How many guests are you expecting?")
    .refine((v) => {
      const n = Number(v);
      return Number.isInteger(n) && n >= MIN_GUESTS && n <= MAX_GUESTS;
    }, `We host between ${MIN_GUESTS} and ${MAX_GUESTS} guests.`),
  message: z.string().optional(),
  /** Honeypot — bots fill it, people never see it. */
  website: z.string().max(0).optional(),
});

export type BookingValues = z.input<typeof bookingSchema>;
