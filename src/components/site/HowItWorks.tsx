import React from "react";
import { CalendarCheck, Truck, Sparkles, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "1. Book Online",
    description:
      "Choose your service, preferred time, and location in under a minute. We’ll confirm quickly.",
  },
  {
    icon: Truck,
    title: "2. We Come Prepared",
    description:
      "Your therapist arrives on time with a professional massage table, linens, and all supplies. You just need to open the door.",
  },
  {
    icon: Sparkles,
    title: "3. Relax & Recover",
    description:
      "Enjoy focused, expert care in your own environment. When the session ends, you’re already home — ready to continue your day feeling better.",
  },
];

export function HowItWorks() {
  const handleScrollToBooking = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#book");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="how-it-works" className="w-full py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-semibold text-sage uppercase tracking-wider block mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal tracking-tight leading-tight">
            Professional Care. <br className="sm:hidden" />
            Exceptional Convenience.
          </h2>
          <div className="mt-6 text-charcoal-muted space-y-4 text-md sm:text-lg leading-relaxed font-light">
            <p>
              At Avion Mobile Massage we believe quality care should never feel like another task on
              your list. Our Registered Massage Therapists bring clinical expertise and genuine
              warmth straight to you — whether you’re recovering from desk posture, training for
              your next adventure in the Rockies, or simply carving out time for yourself.
            </p>
            <p>
              We handle everything: professional table, fresh linens, oils, and a calm, respectful
              experience in the space where you already feel comfortable.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.title}
                className="flex flex-col bg-background p-8 rounded-lg shadow-sm hover:shadow-soft transition-all duration-300 border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-sage-light flex items-center justify-center text-sage mb-6">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-charcoal mb-3">{step.title}</h3>
                <p className="text-charcoal-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-start">
          <a
            href="#book"
            onClick={handleScrollToBooking}
            className="inline-flex items-center gap-2 text-sage hover:text-soft-blue text-md font-semibold transition-colors duration-200 group"
          >
            Ready when you are
            <span className="group-hover:translate-x-1.5 transition-transform duration-200 flex items-center">
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="underline ml-1">Book Now</span>
          </a>
        </div>
      </div>
    </section>
  );
}
