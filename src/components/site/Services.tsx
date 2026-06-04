import React from "react";
import therapeuticImg from "@/assets/service-therapeutic.jpg";
import deepTissueImg from "@/assets/service-deep-tissue.jpg";
import relaxationImg from "@/assets/service-relaxation.jpg";
import prenatalImg from "@/assets/service-prenatal.jpg";
import corporateImg from "@/assets/service-corporate.jpg";
import { ArrowRight } from "lucide-react";

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
    duration: "60 or 90 Minutes",
    image: therapeuticImg,
    tint: "#f5d3a8",
  },
  {
    name: "Deep Tissue",
    accent: "Massage",
    description:
      "Focused work on deeper muscle layers to release chronic tightness, stubborn knots, and long-held stress. Ideal after long workdays, intense training, or active Calgary weekends in the mountains.",
    duration: "60 or 90 Minutes",
    image: deepTissueImg,
    tint: "#d4d9c4",
  },
  {
    name: "Relaxation",
    accent: "Massage",
    description:
      "A calming, flowing session designed to quiet the nervous system, reduce stress, and leave you feeling grounded and recharged — without ever leaving the comfort of your own space.",
    duration: "60 or 90 Minutes",
    image: relaxationImg,
    tint: "#fde8d4",
  },
  {
    name: "Prenatal",
    accent: "Massage",
    description:
      "Safe, supportive care tailored for every stage of pregnancy. We ease lower back and hip discomfort, reduce leg swelling, and create a comfortable side-lying setup right in your home.",
    duration: "60 or 90 Minutes",
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
  const scrollToBook = () =>
    document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });

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
                    className="absolute -inset-6 blob-1 opacity-50 blur-xl"
                    style={{ background: s.tint }}
                  />
                  <div className={`relative aspect-[4/3] overflow-hidden blob-1 shadow-soft ${reverse ? "-rotate-2" : "rotate-2"}`}>
                    <img
                      src={s.image}
                      alt={`${s.name} ${s.accent}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-20 transition-opacity duration-500 group-hover:opacity-0"
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
                  <div className="flex items-center gap-8 mb-8">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-charcoal/40 font-semibold">
                      Duration
                    </div>
                    <div className="text-sm font-bold text-sage">{s.duration}</div>
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
      </div>
    </section>
  );
}
