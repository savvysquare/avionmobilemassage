import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Services } from "@/components/site/Services";
import { About } from "@/components/site/About";
import { Areas } from "@/components/site/Areas";
import { FAQ } from "@/components/site/FAQ";
import { Booking } from "@/components/site/Booking";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Avion Mobile Massage — Calgary's Concierge RMT, Delivered to You" },
      {
        name: "description",
        content:
          "Registered Massage Therapists who come to your home or office across Calgary. Direct billing, evening & weekend appointments. Book in minutes.",
      },
      { property: "og:title", content: "Avion Mobile Massage — Calgary's Concierge RMT" },
      {
        property: "og:description",
        content:
          "Professional mobile massage therapy across Calgary. Registered Massage Therapists. Direct billing available.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <About />
        <Areas />
        <FAQ />
        <Booking />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
