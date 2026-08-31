import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhoWeAre } from "@/components/WhoWeAre";
import { EventsStack } from "@/components/EventsStack";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Dishes } from "@/components/Dishes";
import { VideoBand } from "@/components/VideoBand";
import { Process } from "@/components/Process";
import { Team } from "@/components/Team";
import { Gallery } from "@/components/Gallery";
import { Testimonial } from "@/components/Testimonial";
import { ContactForm } from "@/components/ContactForm";
import { News } from "@/components/News";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="relative overflow-x-clip bg-cream">
      <Header />
      <main>
        <Hero />
        <WhoWeAre />
        <EventsStack />
        <WhyChooseUs />
        <Dishes />
        <VideoBand />
        <Process />
        <Team />
        <Gallery />
        <Testimonial />
        <ContactForm />
        <News />
        <CtaBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
