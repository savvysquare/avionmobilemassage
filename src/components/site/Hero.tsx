import React from "react";
import heroImg from "@/assets/hero-massage.jpg";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const scrollToBook = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full pt-36 md:pt-40 pb-20 md:pb-28 px-6 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] bg-soft-blue rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: headline */}
        <div className="relative">
          <h1 className="font-display font-bold leading-[0.95] tracking-tight text-[64px] sm:text-[88px] lg:text-[112px]">
            <span className="block text-charcoal">Avion</span>
            <span className="block text-sage">Mobile Massage</span>
          </h1>

          <div className="mt-10 flex items-start gap-5">
            <span className="block w-px h-16 bg-charcoal/30 mt-2" />
            <div>
              <p className="text-xl md:text-2xl text-charcoal/80 font-light leading-snug max-w-md">
                Calgary&apos;s Concierge Registered Massage Therapist,{" "}
                <span className="italic font-serif text-sage">delivered to you.</span>
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-sage/80">
                Registered Massage Therapists
              </p>
            </div>
          </div>

          <button
            onClick={scrollToBook}
            className="group mt-12 inline-flex items-center gap-3 bg-sage text-white pl-10 pr-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.25em] relative overflow-hidden transition-all duration-500 hover:pl-8 hover:pr-16 hover:bg-sage-hover hover:shadow-premium active:scale-95"
          >
            <span className="relative z-10">Experience the Concierge</span>
            <ArrowRight className="w-4 h-4 absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" />
          </button>
        </div>

        {/* Right: image */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 bg-soft-blue-light rounded-[3rem] -z-10 translate-x-6 translate-y-6 opacity-70" />
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-premium aspect-[5/4]">
            <img
              src={heroImg}
              alt="Registered Massage Therapist providing in-home massage in Calgary"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
