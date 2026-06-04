import React from "react";
import heroImg from "@/assets/hero-massage.jpg";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div className="flex flex-col">
            <h1 className="font-display font-extrabold text-charcoal text-[56px] sm:text-[72px] md:text-[88px] leading-[0.95] tracking-tight">
              Avion <br />
              <span className="text-sage">Mobile Massage</span>
            </h1>
            <span className="block w-px h-14 bg-sage my-8" />
            <p className="font-display text-xl sm:text-2xl text-charcoal-muted font-light">
              Calgary's Concierge RMT, Delivered to You
            </p>
          </div>

          {/* Right: Image with peach blob */}
          <div className="relative w-full">
            <div className="peach-blob" />
            <div className="relative z-10 overflow-hidden rounded-[40px] rounded-bl-[120px] shadow-soft">
              <img
                src={heroImg}
                alt="Professional Registered Massage Therapist in Calgary home"
                className="w-full h-[420px] md:h-[560px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
