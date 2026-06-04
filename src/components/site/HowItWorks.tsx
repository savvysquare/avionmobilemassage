import React from "react";
import { CalendarCheck, Truck, Sparkles } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book Online",
    description: "Choose your service, preferred time, and location in under a minute. We'll confirm quickly.",
    bg: "bg-soft-blue",
    fg: "text-sage",
    rotate: "rotate-3",
  },
  {
    icon: Truck,
    title: "We Come Prepared",
    description: "Your therapist arrives on time with a professional table, linens, and all supplies. You just need to open the door.",
    bg: "bg-sage",
    fg: "text-white",
    rotate: "-rotate-6",
  },
  {
    icon: Sparkles,
    title: "Relax & Recover",
    description: "Enjoy focused, expert care in your own environment. When the session ends, you're already home — ready to feel better.",
    bg: "bg-soft-blue",
    fg: "text-sage",
    rotate: "rotate-12",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-28 md:py-36 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sage tracking-[0.32em] uppercase text-[11px] font-semibold mb-4">
          The Process
        </p>
        <h2 className="font-display text-5xl md:text-6xl font-bold text-charcoal mb-16">
          How It <span className="text-sage italic font-serif font-medium">Works</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-14 md:gap-12">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex flex-col items-center text-center space-y-6 group">
                <div className="relative">
                  <div
                    className={`w-24 h-24 ${s.bg} rounded-[2rem] flex items-center justify-center shadow-soft ${s.rotate} transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105`}
                  >
                    <Icon className={`w-10 h-10 ${s.fg}`} strokeWidth={1.5} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-soft-blue text-sage font-display font-bold text-xs flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                </div>
                <h4 className="font-display text-xl md:text-2xl font-bold text-charcoal">
                  {s.title}
                </h4>
                <p className="text-[14.5px] text-charcoal-muted leading-[1.8] max-w-xs">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
