import React from "react";
import therapeuticImg from "@/assets/service-therapeutic.jpg";
import deepTissueImg from "@/assets/service-deep-tissue.jpg";
import relaxationImg from "@/assets/service-relaxation.jpg";
import prenatalImg from "@/assets/service-prenatal.jpg";
import corporateImg from "@/assets/service-corporate.jpg";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scrollTo";

interface ServiceItem {
  name: string;
  accent: string;
  description: string;
  duration: string;
  image: string;
  tint: string;
}

const services: ServiceItem[] = [
  {
    name: "Therapeutic",
    accent: "Massage",
    description:
      "Personalized treatment that targets your specific tension patterns, improves mobility, and supports recovery from the physical demands of daily life in Calgary. Ideal for clients managing chronic stress or rebuilding after injury.",
    duration: "30*, 45, 60, or 90 Minutes",
    image: therapeuticImg,
    tint: "#f5d3a8",
  },
  {
    name: "Deep Tissue",
    accent: "Massage",
    description:
      "Focused work on deeper muscle layers to release chronic tightness, stubborn knots, and long-held stress. Ideal after long workdays, intense training, or active Calgary weekends in the mountains.",
    duration: "30*, 45, 60, or 90 Minutes",
    image: deepTissueImg,
    tint: "#d4d9c4",
  },
  {
    name: "Relaxation",
    accent: "Massage",
    description:
      "A calming, flowing session designed to quiet the nervous system, reduce stress, and leave you feeling grounded and recharged — without ever leaving the comfort of your own space.",
    duration: "30*, 45, 60, or 90 Minutes",
    image: relaxationImg,
    tint: "#fde8d4",
  },
  {
    name: "Prenatal",
    accent: "Massage",
    description:
      "Safe, supportive care tailored for every stage of pregnancy. We ease lower back and hip discomfort, reduce leg swelling, and create a comfortable side-lying setup right in your home.",
    duration: "30*, 45, 60, or 90 Minutes",
    image: prenatalImg,
    tint: "#fce4e6",
  },
  {
    name: "Corporate Wellness",
    accent: "Massage",
    description:
      "On-site massage for workplaces, team events, and employee wellness programs. A thoughtful way to support your team without anyone leaving the office.",
    duration: "15 to 30 mins per person",
    image: corporateImg,
    tint: "#e3eaf2",
  },
];

export function Services() {
  const scrollToBook = () => scrollToSection("#book");

  return (
    <section id="services" className="w-full py-28 md:py-36 px-6 bg-soft-blue-light/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-24">
          <p className="text-sage tracking-[0.32em] uppercase text-[11px] font-semibold mb-4">
            What we offer
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-charcoal">
            Our <span className="text-sage italic font-serif font-medium">Services</span>
          </h2>
          <p className="mt-5 text-charcoal-muted text-[15px] max-w-xl mx-auto">
            Tailored care for your body and mind — delivered to your door.
          </p>
        </div>

        <div className="space-y-28 md:space-y-36">
          {services.map((s, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={s.name}
                className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-20 group`}
              >
                <div className="w-full md:w-1/2 relative">
                  <div
                    className={`absolute -inset-6 opacity-50 blur-xl ${reverse ? "blob-1r" : "blob-1"}`}
                    style={{ background: s.tint }}
                  />
                  <div className={`relative aspect-[4/3] overflow-hidden shadow-soft ${reverse ? "blob-1r -rotate-2" : "blob-1 rotate-2"}`}>
                    <img
                      src={s.image}
                      alt={`${s.name} ${s.accent}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Theme gradient overlay (sage → soft-blue) */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sage/25 via-transparent to-soft-blue/20 mix-blend-multiply" />
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-15 transition-opacity duration-500 group-hover:opacity-0"
                      style={{ background: s.tint }}
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-sage/70 font-semibold mb-4">
                    {String(idx + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-5 leading-[1.05]">
                    {s.name} <span className="text-sage italic font-serif font-medium">{s.accent}</span>
                  </h3>
                  <p className="text-charcoal-muted text-[15px] leading-[1.85] mb-6">
                    {s.description}
                  </p>
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-sage-light/70 border border-soft-blue/20 rounded-xl mb-8">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal-muted/70 font-bold">
                      Duration
                    </div>
                    <div className="h-3 w-px bg-charcoal/15" />
                    <div className="text-xs font-bold text-sage">{s.duration}</div>
                  </div>
                  <button
                    onClick={scrollToBook}
                    className="group/btn inline-flex items-center gap-2 px-7 py-3 border border-sage text-sage rounded-full text-[11px] font-bold uppercase tracking-[0.22em] hover:bg-sage hover:text-white transition-all duration-300"
                  >
                    Book Now
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Summary Divider */}
        <div className="h-px bg-charcoal/10 my-28" />

        {/* Pricing Summary Section */}
        <div id="pricing" className="scroll-mt-24">
          <div className="text-center mb-16">
            <p className="text-sage tracking-[0.32em] uppercase text-[11px] font-semibold mb-4">
              Rates &amp; Packages
            </p>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
              Transparent <span className="text-sage italic font-serif font-medium">Pricing</span>
            </h3>
            <p className="mt-4 text-charcoal-muted text-sm max-w-xl mx-auto">
              Professional, fully-equipped mobile RMT visits with no travel fees. We offer premium concierge rates for single clients, groups, and multi-session bundles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Single Booking */}
            <div className="bg-white border border-border/80 rounded-3xl p-8 shadow-soft flex flex-col justify-between hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
              <div>
                <span className="inline-block px-3 py-1 bg-sage-light text-sage border border-sage/10 rounded-full text-[9px] font-bold uppercase tracking-wider mb-5">
                  Individual
                </span>
                <h4 className="font-display text-2xl font-bold text-charcoal mb-2">Single Booking</h4>
                <p className="text-sm text-charcoal-muted mb-6 leading-relaxed">
                  One-on-one session with your dedicated therapist. Perfect for regular maintenance or specific pain relief.
                </p>
                <div className="space-y-4 border-t border-border/60 pt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-charcoal-muted">60 Minutes</span>
                    <span className="font-display font-extrabold text-charcoal text-xl">$130 <span className="text-[11px] text-charcoal-muted font-normal">CAD</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-charcoal-muted">90 Minutes</span>
                    <span className="font-display font-extrabold text-charcoal text-xl">$175 <span className="text-[11px] text-charcoal-muted font-normal">CAD</span></span>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-[11px] text-charcoal-muted/70 italic border-t border-border/40 pt-4">
                *30 and 45-minute sessions are not available for single individual bookings.
              </div>
            </div>

            {/* Card 2: Group Booking */}
            <div className="bg-white border border-sage/35 rounded-3xl p-8 shadow-soft flex flex-col justify-between hover:shadow-premium hover:-translate-y-1 transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white shadow-sm">
                Most Efficient
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-sage/10 text-sage border border-sage/15 rounded-full text-[9px] font-bold uppercase tracking-wider mb-5">
                  Multiple People
                </span>
                <h4 className="font-display text-2xl font-bold text-charcoal mb-2">Group at Same Address</h4>
                <p className="text-sm text-charcoal-muted mb-6 leading-relaxed">
                  Back-to-back sessions at the same location. Save on travel overhead and split the savings.
                </p>
                <div className="space-y-4 border-t border-border/60 pt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-charcoal-muted">30 Minutes *</span>
                    <span className="font-display font-extrabold text-sage text-xl">$80 <span className="text-[11px] text-charcoal-muted font-normal">/ person</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-charcoal-muted">45 Minutes</span>
                    <span className="font-display font-extrabold text-sage text-xl">$100 <span className="text-[11px] text-charcoal-muted font-normal">/ person</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-charcoal-muted">60 Minutes</span>
                    <span className="font-display font-extrabold text-sage text-xl">$125 <span className="text-[11px] text-charcoal-muted font-normal">/ person</span></span>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-[11px] text-charcoal-muted/70 italic border-t border-border/40 pt-4">
                *30-minute duration is only available for multi-person or package bookings.
              </div>
            </div>

            {/* Card 3: Packages */}
            <div className="bg-white border border-border/80 rounded-3xl p-8 shadow-soft flex flex-col justify-between hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
              <div>
                <span className="inline-block px-3 py-1 bg-soft-blue-light text-charcoal-muted border border-soft-blue/20 rounded-full text-[9px] font-bold uppercase tracking-wider mb-5">
                  Bundles
                </span>
                <h4 className="font-display text-2xl font-bold text-charcoal mb-2">Multi-Session Packages</h4>
                <p className="text-sm text-charcoal-muted mb-6 leading-relaxed">
                  Book multiple appointments together. Lock in recurring relaxation and enjoy significant bulk discounts.
                </p>
                <div className="space-y-4 border-t border-border/60 pt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-charcoal-muted">2 Sessions Booked</span>
                    <span className="font-display font-extrabold text-charcoal text-xl"><span className="text-sage">5%</span> Off Total</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-charcoal-muted">3 Sessions Booked</span>
                    <span className="font-display font-extrabold text-charcoal text-xl"><span className="text-sage">10%</span> Off Total</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-charcoal-muted">4+ Sessions Booked</span>
                    <span className="font-display font-extrabold text-charcoal text-xl"><span className="text-sage">15%</span> Off Total</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-[11px] text-charcoal-muted/70 leading-relaxed border-t border-border/40 pt-4">
                Share sessions with family members in your household. Select your package option directly on the booking form.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
