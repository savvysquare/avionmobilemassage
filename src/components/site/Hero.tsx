import React from "react";
import { Check, MessageCircle, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-massage.jpg";

export function Hero() {
  const handleScrollToBooking = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector("#book");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 bg-background flex flex-col items-center"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl flex flex-col items-center text-center">
        {/* Direct Billing Badge */}
        <a
          href="#book"
          onClick={handleScrollToBooking}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-soft-blue-light border border-soft-blue/50 text-xs font-semibold text-[#2A4B35] hover:bg-soft-blue transition-colors duration-200 mb-8"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-sage animate-pulse" />
          Direct Billing Available
        </a>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-charcoal max-w-4xl leading-[1.1]">
          Massage Therapy, <br />
          <span className="text-sage">Made Effortless.</span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 text-md sm:text-lg md:text-xl text-charcoal-muted max-w-2xl leading-relaxed">
          Professional Registered Massage Therapists come directly to your home, office, or
          workplace across Calgary. Skip the commute and enjoy expert care exactly where you need
          it.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleScrollToBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-sage hover:bg-sage-hover text-white text-sm font-semibold rounded-lg shadow-soft hover:shadow-premium transition-all duration-200"
          >
            Book Your Appointment
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href="https://wa.me/14039230323"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-soft-blue-light border border-border text-charcoal text-sm font-semibold rounded-lg shadow-soft transition-all duration-200"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" />
            Chat with us on WhatsApp
          </a>
        </div>

        {/* Large Lifestyle Hero Image */}
        <div className="mt-16 w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-premium max-h-[500px]">
          <img
            src={heroImg}
            alt="Professional RMT massage therapy session in Calgary home"
            className="w-full h-full object-cover aspect-[16/9] object-center"
          />
        </div>

        {/* Trust Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full border-y border-border py-8 text-left">
          {[
            "Registered Massage Therapists",
            "Direct Billing for Most Plans",
            "Evening & Weekend Appointments",
            "Serving Calgary & Surrounding Areas",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-light flex items-center justify-center text-sage">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium text-charcoal">{item}</span>
            </div>
          ))}
        </div>

        {/* Short Intro Paragraph below hero */}
        <div className="mt-16 max-w-3xl text-center">
          <p className="text-md sm:text-lg text-charcoal-muted leading-relaxed font-light">
            You work hard. You move through busy Calgary days. Now self-care can meet you where you
            are — no traffic, no parking, no waiting rooms. Just professional, personalized massage
            therapy that fits your real life.
          </p>
        </div>
      </div>
    </section>
  );
}
