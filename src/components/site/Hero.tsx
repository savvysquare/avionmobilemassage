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
          {/* Soft offset blob shadow */}
          <div className="pointer-events-none absolute -inset-6 bg-soft-blue-light blob-1 -z-10 translate-x-8 translate-y-8 opacity-60 blur-sm" />
          {/* Decorative thin ring */}
          <div className="pointer-events-none absolute -inset-3 blob-1 border border-sage/25 -rotate-3" />

          <div className="relative overflow-hidden blob-1 shadow-premium aspect-[5/4] rotate-2">
            <img
              src={heroImg}
              alt="Calm Avion Mobile Massage setup — folded linens, warm oil, and eucalyptus in a sunlit Calgary home"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-sage/15 via-transparent to-transparent mix-blend-multiply" />
          </div>

          {/* Floating credential chip */}
          <div className="absolute -bottom-6 -left-6 md:-left-10 bg-white/95 backdrop-blur-md rounded-full shadow-premium px-5 py-3 flex items-center gap-3 border border-soft-blue/40">
            <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
            <div className="leading-tight">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Now Booking</p>
              <p className="text-[11px] text-charcoal/70">Evenings &amp; weekends</p>
            </div>
          </div>

          {/* Floating trust seal */}
          <div className="hidden md:flex absolute -top-5 -right-5 h-28 w-28 rounded-full bg-sage text-white flex-col items-center justify-center shadow-premium rotate-[8deg] border-4 border-white text-center leading-tight">
            <span className="font-display font-bold text-[26px]">100%</span>
            <span className="text-[8.5px] uppercase tracking-[0.18em] opacity-95">Direct<br/>Billing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
