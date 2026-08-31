"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contact } from "@/lib/content";
import {
  bookingSchema,
  MIN_GUESTS,
  MAX_GUESTS,
  type BookingValues,
} from "@/lib/booking-schema";
import { Container, Eyebrow, Reveal } from "./ui/Section";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ArrowRight } from "./ui/icons";

type Status = "idle" | "submitting" | "success" | "error";

/** Design spec: transparent pill, 1px line border, amber focus ring. */
const FIELD =
  "w-full h-auto bg-transparent border border-line rounded-full " +
  "px-[26px] py-[18px] text-brown text-[16px] shadow-none " +
  "placeholder:text-[rgba(68,46,19,0.45)] " +
  "focus-visible:border-amber focus-visible:ring-0 " +
  "aria-invalid:border-[#a8321f] aria-invalid:ring-0";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "", phone: "", email: "", company: "",
      eventType: "", date: "", guests: "", message: "", website: "",
    } as unknown as BookingValues,
  });

  async function onSubmit(values: BookingValues) {
    setStatus("submitting");
    try {
      // TODO: point at the real booking endpoint / CRM.
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, guests: Number(values.guests) }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="pt-[150px]">
      <Container>
        <Reveal>
          <Eyebrow centered>{contact.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="mb-[70px] mt-6 text-center font-display text-[clamp(2rem,4.4vw,64px)] font-light uppercase leading-[1.1] text-brown">
            {contact.heading}
          </h3>
        </Reveal>

        <Reveal delay={0.15}>
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              aria-label="Booking enquiry"
              className="mx-auto max-w-[1000px]"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Your Name*" aria-label="Your name" className={FIELD} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="Phone Number*" aria-label="Phone number" className={FIELD} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Email" aria-label="Email" className={FIELD} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Company" aria-label="Company" className={FIELD} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Native select keeps the design's pill shape and needs no portal */}
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select {...field} aria-label="Event type" className={`${FIELD} appearance-none outline-none`}>
                          <option value="">Event Type</option>
                          {contact.eventTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          aria-label="Event date"
                          min={new Date().toISOString().slice(0, 10)}
                          className={FIELD}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          inputMode="numeric"
                          min={MIN_GUESTS}
                          max={MAX_GUESTS}
                          placeholder="Number of Guests*"
                          aria-label="Number of guests"
                          className={FIELD}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={3}
                          placeholder="Wishes / questions / requests"
                          aria-label="Wishes, questions or requests"
                          className={`${FIELD} rounded-[22px] py-5`}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Honeypot */}
              <input
                {...form.register("website")}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute size-0 opacity-0"
              />

              <div className="flex flex-wrap items-center gap-5 pt-[34px]">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border-0 bg-amber px-[34px] py-[19px] text-[13px] font-bold uppercase leading-none tracking-[0.13px] text-brown transition-[transform,filter] duration-300 ease-out hover:-translate-y-0.5 hover:brightness-[1.06] disabled:pointer-events-none disabled:opacity-70"
                >
                  <span>{status === "submitting" ? "sending…" : "submit request"}</span>
                  <ArrowRight />
                </button>

                <p role="status" aria-live="polite" className="text-[15px]">
                  {status === "success" && contact.successNote}
                  {status === "error" &&
                    "Something went wrong sending that — please call us instead."}
                </p>
              </div>
            </form>
          </Form>
        </Reveal>
      </Container>
    </section>
  );
}
