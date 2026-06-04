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
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen text-foreground">
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
