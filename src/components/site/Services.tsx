import React from "react";
import heroImg from "@/assets/hero-massage.jpg";
import prenatalImg from "@/assets/service-prenatal.jpg";
import corporateImg from "@/assets/service-corporate.jpg";
import aboutImg from "@/assets/about-client.jpg";

interface ServiceItem {
  name: string;
  accent: string;
  description: string;
  duration: string;
  image: string;
  bgColor: string;
}

const services: ServiceItem[] = [
  {
    name: "Therapeutic",
    accent: "Massage",
    description:
      "Personalized treatment that targets your specific tension patterns, improves mobility, and supports recovery from the physical demands of daily life in Calgary. Ideal for clients managing chronic stress or rebuilding after injury.",
    duration: "60 or 90 Minutes",
    image: heroImg,
    bgColor: "#fde8d4",
  },
  {
    name: "Deep Tissue",
    accent: "Massage",
    description:
      "Focused work on deeper muscle layers to release chronic tightness, stubborn knots, and long-held stress. Ideal after long workdays, intense training, or active Calgary weekends in the mountains.",
    duration: "60 or 90 Minutes",
    image: aboutImg,
    bgColor: "#e8f0d6",
  },
  {
    name: "Relaxation",
    accent: "Massage",
    description:
      "A calming, flowing session designed to quiet the nervous system, reduce stress, and leave you feeling grounded and recharged — without ever leaving the comfort of your own space.",
    duration: "60 or 90 Minutes",
    image: heroImg,
    bgColor: "#fdf4e7",
  },
  {
    name: "Prenatal",
    accent: "Massage",
    description:
      "Safe, supportive care tailored for every stage of pregnancy. We ease lower back and hip discomfort, reduce leg swelling, and create a comfortable side-lying setup right in your home.",
    duration: "60 or 90 Minutes",
    image: prenatalImg,
    bgColor: "#fce4e6",
  },
  {
    name: "Corporate Wellness",
    accent: "Massage",
    description:
      "On-site massage for workplaces, team events, and employee wellness programs. A thoughtful way to support your team without anyone leaving the office.",
    duration: "15 to 30 mins per person",
    image: corporateImg,
    bgColor: "#e3eaf2",
  },
];

export function Services() {
  const scrollToBook = () => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="services" className="w-full py-24 md:py-32 bg-[#fafafa]">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-[44px] md:text-[56px] leading-[1.05] font-extrabold text-charcoal">
            Our <span className="text-sage">Services</span>
          </h2>
          <p className="mt-4 text-charcoal-muted text-[15px] leading-relaxed">
            Tailored care for your body and mind — delivered to your door.
          </p>
        </div>

        {/* Alternating rows */}
        <div className="flex flex-col gap-20 md:gap-28">
          {services.map((s, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={s.name}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image with colored circle backdrop */}
                <div className="relative w-full flex justify-center">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: s.bgColor, transform: "scale(0.9)" }}
                  />
                  <div className="relative z-10 w-[78%] aspect-square rounded-full overflow-hidden shadow-soft">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-display text-[36px] md:text-[44px] leading-[1.05] font-extrabold text-charcoal mb-5">
                    {s.name} <span className="text-sage">{s.accent}</span>
                  </h3>
                  <p className="text-charcoal-muted text-[15px] leading-[1.85] mb-6">
                    {s.description}
                  </p>
                  <p className="font-display font-semibold text-charcoal mb-6">
                    Duration: <span className="text-sage">{s.duration}</span>
                  </p>
                  <button
                    onClick={scrollToBook}
                    className="inline-flex items-center px-7 py-3 border-2 border-sage text-sage hover:bg-sage hover:text-white font-display font-semibold text-sm uppercase tracking-wider transition-all duration-200"
                  >
                    Book Now
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
