import React from "react";
import aboutImg from "@/assets/about-client.jpg";
import { Compass, Award, Home, HeartHandshake } from "lucide-react";

const pillars = [
  {
    title: "True Convenience",
    desc: "We come to you. No driving, no parking, no waiting rooms.",
    icon: Compass,
  },
  {
    title: "Genuine Professionalism",
    desc: "Every therapist is a Registered Massage Therapist (RMT) — trained, insured, and committed to clinical standards.",
    icon: Award,
  },
  {
    title: "Real Comfort",
    desc: "Receive treatment in the familiar, private space where you already relax best.",
    icon: Home,
  },
  {
    title: "Personalized Care",
    desc: "We listen first. Every session is shaped around your body’s needs and goals that day.",
    icon: HeartHandshake,
  },
];

export function About() {
  return (
    <section id="about" className="w-full py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text & Promise */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <span className="text-xs font-semibold text-sage uppercase tracking-wider block mb-3">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal tracking-tight leading-tight mb-8">
              Care Designed <br />
              Around Your Life
            </h2>
            <div className="text-charcoal-muted space-y-4 text-md leading-relaxed font-light mb-8">
              <p>
                Calgary moves fast. Between work, family, and everything else, finding time for your
                well-being shouldn’t add more stress.
              </p>
              <p>
                That’s why Avion Mobile Massage exists. We bring fully Registered Massage Therapists
                directly to you — at home, in the office, or wherever you spend your days. No more
                rearranging your schedule or fighting traffic. Just professional care that respects
                your time and meets you exactly where you are.
              </p>
            </div>

            {/* Our Promise Callout */}
            <div className="p-6 rounded-2xl bg-sage-light border border-sage/20 text-left">
              <span className="text-[11px] font-semibold text-sage uppercase tracking-wider block mb-2">
                Our Promise
              </span>
              <p className="text-sm font-medium text-charcoal leading-relaxed">
                Professional care. Exceptional convenience. A treatment experience designed entirely
                around you.
              </p>
            </div>
          </div>

          {/* Right Column: Image & Pillars */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            {/* Bright cropped Calgary lifestyle image */}
            <div className="w-full rounded-2xl overflow-hidden shadow-soft aspect-[16/10] max-h-[300px]">
              <img
                src={aboutImg}
                alt="Relaxing Calgary client receiving professional in-home care"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Why Clients Choose Avion Grid */}
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-6">Why Clients Choose Avion</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pillars.map((p) => {
                  const IconComponent = p.icon;
                  return (
                    <div
                      key={p.title}
                      className="p-5 bg-background border border-border/50 rounded-2xl flex flex-col gap-3 shadow-soft hover:shadow-premium transition-shadow duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-soft-blue-light flex items-center justify-center text-sage">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-charcoal mb-1">{p.title}</h4>
                        <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
