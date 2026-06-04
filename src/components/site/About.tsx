import React from "react";
import aboutImg from "@/assets/about-client.jpg";

export function About() {
  return (
    <section id="about" className="w-full py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Organic blob image */}
        <div className="relative">
          <div className="aspect-square bg-soft-blue blob-1 rotate-3 shadow-premium overflow-hidden relative z-10">
            <img src={aboutImg} alt="Avion therapist" className="w-full h-full object-cover mix-blend-multiply opacity-95" />
            <div className="absolute inset-0 bg-sage/10 mix-blend-overlay" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-sage/20 rounded-full blur-2xl" />
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-soft-blue rounded-full blur-2xl opacity-60" />
        </div>

        {/* Text */}
        <div className="space-y-6">
          <p className="inline-block text-sage font-bold tracking-[0.28em] text-[11px] uppercase">
            Our Mission
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-charcoal">
            Wellness that moves
            <br />
            <span className="text-sage italic font-serif font-medium">with your life.</span>
          </h2>
          <div className="space-y-4 text-[15.5px] leading-[1.85] text-charcoal/75 font-light">
            <p>
              Calgary moves fast. Between work, family, and everything else, finding time for your
              well-being shouldn't add more stress. That's why Avion Mobile Massage exists — to bring
              fully Registered Massage Therapists directly to you.
            </p>
            <p>
              Whether at home, in the office, or wherever you spend your days, we deliver professional
              care that respects your time and meets you exactly where you are.
            </p>
            <p>
              Every therapist is a Registered Massage Therapist — trained, insured, and committed to
              clinical standards.
            </p>
          </div>
          <div className="pt-2">
            <p className="font-display font-bold text-sage">Warm regards,</p>
            <p className="font-serif italic opacity-60 text-lg">The Avion Team</p>
          </div>
        </div>
      </div>
    </section>
  );
}
