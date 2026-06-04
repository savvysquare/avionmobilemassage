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
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <About />
        <div id="areas-faq" className="container mx-auto px-4 md:px-8 py-20 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Areas />
            </div>
            <div className="lg:col-span-7">
              <FAQ />
            </div>
          </div>
        </div>
        <Booking />
        {/* Final Trust / CTA Bar */}
        <section className="bg-sage-light py-16 text-center border-t border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <h3 className="text-xl sm:text-2xl font-medium text-charcoal mb-6 leading-tight font-serif">
              Join busy Calgarians who are making self-care simple.{" "}
              <br className="hidden sm:inline" />
              Professional. Convenient. Delivered to you.
            </h3>
            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-charcoal hover:bg-charcoal/90 text-white text-xs font-semibold rounded-full shadow-soft transition-all duration-200 uppercase tracking-wider"
            >
              Book Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
