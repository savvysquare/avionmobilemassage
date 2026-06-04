import React from "react";
import aboutImg from "@/assets/about-client.jpg";

export function About() {
  return (
    <section id="about" className="w-full py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: round image with peach circle */}
          <div className="relative w-full flex justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg,#e8f0d6 0%,#cfe2a6 100%)",
                transform: "scale(0.85)",
              }}
            />
            <div className="relative z-10 w-[80%] aspect-square rounded-full overflow-hidden shadow-soft">
              <img
                src={aboutImg}
                alt="Avion Mobile Massage founder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: text */}
          <div>
            <h2 className="font-display text-[44px] md:text-[56px] leading-[1.05] font-extrabold text-charcoal mb-6">
              Mission <span className="text-sage">Statement</span>
            </h2>
            <div className="space-y-5 text-charcoal-muted text-[15px] leading-[1.85] font-sans">
              <p>
                Calgary moves fast. Between work, family, and everything else, finding time for your
                well-being shouldn't add more stress. That's why Avion Mobile Massage exists — to
                bring fully Registered Massage Therapists directly to you.
              </p>
              <p>
                Whether at home, in the office, or wherever you spend your days, we deliver
                professional care that respects your time and meets you exactly where you are. No
                more rearranging your schedule or fighting traffic.
              </p>
              <p>
                Every therapist is a Registered Massage Therapist — trained, insured, and committed
                to clinical standards. We listen first, then shape every session around your body's
                needs and goals that day.
              </p>
              <p className="font-display font-semibold text-charcoal pt-2">
                Warm regards,
                <br />
                The Avion Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
