import React from "react";
import logo from "@/assets/avion-logo.png";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const scrollToBook = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center pt-32 pb-24 px-6 overflow-hidden"
    >
      {/* Organic background blobs */}
      <div className="pointer-events-none absolute top-[-12%] right-[-8%] w-[560px] h-[560px] bg-soft-blue rounded-full blur-3xl opacity-30 animate-drift" />
      <div className="pointer-events-none absolute bottom-[-15%] left-[-8%] w-[640px] h-[640px] bg-sage rounded-full blur-3xl opacity-[0.12] animate-drift" style={{ animationDelay: "-7s" }} />

      {/* Logo lockup */}
      <div className="relative z-10 mb-10 group">
        <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto">
          <div className="absolute inset-0 border-2 border-sage rounded-full opacity-20 animate-spin-slow" />
          <div className="absolute inset-4 border border-dashed border-sage rounded-full opacity-30" />
          <div className="absolute inset-6 rounded-full bg-soft-blue/40 blur-2xl" />
          <div className="absolute inset-2 flex items-center justify-center animate-float">
            <div className="w-[88%] h-[88%] rounded-full bg-white shadow-premium border-[6px] border-white flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Avion Mobile Massage — Registered Massage Therapists"
                className="w-[92%] h-[92%] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <h1 className="font-display font-bold text-[64px] sm:text-[88px] md:text-[120px] leading-[0.88] tracking-tight text-sage relative z-10">
        Avion
      </h1>
      <p className="font-display font-light text-xl sm:text-2xl md:text-3xl tracking-[0.22em] uppercase text-charcoal mt-2 relative z-10">
        Mobile Massage
      </p>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-sage/70 relative z-10">
        Registered Massage Therapists
      </p>

      <p className="relative z-10 mt-10 max-w-xl text-lg md:text-xl text-charcoal/80 leading-relaxed">
        Calgary's Concierge Registered Massage Therapist,{" "}
        <span className="italic font-serif text-sage">delivered to you.</span>
      </p>

      <button
        onClick={scrollToBook}
        className="group relative z-10 mt-12 inline-flex items-center gap-3 bg-sage text-white pl-10 pr-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.25em] overflow-hidden transition-all duration-500 hover:pl-8 hover:pr-16 hover:bg-sage-hover hover:shadow-premium active:scale-95"
      >
        <span className="relative z-10">Experience the Concierge</span>
        <ArrowRight className="w-4 h-4 absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" />
      </button>
    </section>
  );
}
