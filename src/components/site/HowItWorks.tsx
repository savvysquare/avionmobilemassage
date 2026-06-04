import React from "react";
import { CalendarCheck, Truck, Sparkles } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book",
    accent: "Online",
    description:
      "Choose your service, preferred time, and location in under a minute. We'll confirm quickly.",
  },
  {
    icon: Truck,
    title: "We Come",
    accent: "Prepared",
    description:
      "Your therapist arrives on time with a professional massage table, linens, and all supplies. You just need to open the door.",
  },
  {
    icon: Sparkles,
    title: "Relax &",
    accent: "Recover",
    description:
      "Enjoy focused, expert care in your own environment. When the session ends, you're already home — ready to continue your day feeling better.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-[44px] md:text-[56px] leading-[1.05] font-extrabold text-charcoal">
            How It <span className="text-sage">Works</span>
          </h2>
          <p className="mt-4 text-charcoal-muted text-[15px] leading-relaxed">
            Professional care. Exceptional convenience. Delivered in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.accent} className="text-center px-4">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-soft-blue-light flex items-center justify-center text-sage">
                  <Icon className="h-9 w-9" />
                </div>
                <h3 className="font-display text-[26px] font-extrabold text-charcoal mb-3">
                  {step.title} <span className="text-sage">{step.accent}</span>
                </h3>
                <p className="text-charcoal-muted text-[15px] leading-[1.8]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
