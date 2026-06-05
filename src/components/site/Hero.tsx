import React from "react";
import heroImg from "@/assets/hero-massage.jpg";
import { ArrowRight, Shield, Activity, Home, Flame } from "lucide-react";

export function Hero() {
  const scrollToBook = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full pt-48 md:pt-56 pb-20 md:pb-28 px-6 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] bg-soft-blue rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: headline */}
        <div className="relative">
          <h1 className="font-display font-bold leading-[0.95] tracking-tight text-[48px] sm:text-[68px] lg:text-[88px]">
            <span className="block text-charcoal">Avion</span>
            <span className="block text-sage">Mobile Massage</span>
          </h1>

          <div className="mt-10 flex items-start gap-5">
            <span className="block w-px h-16 bg-charcoal/30 mt-2" />
            <div>
              <p className="text-xl md:text-2xl text-charcoal/80 font-normal leading-snug max-w-md">
                Calgary&apos;s Concierge Registered Massage Therapist,{" "}
                <span className="italic font-serif font-medium text-sage">delivered to you.</span>
              </p>
              <div className="mt-3 flex items-center gap-2.5 flex-wrap text-[11px] font-semibold uppercase tracking-[0.25em] text-sage/90">
                <span>Licensed RMTs</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sage/40" />
                <span>Direct Billing Available</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sage/40" />
                <span>No Travel Fees</span>
              </div>
            </div>
          </div>

          <button
            onClick={scrollToBook}
            className="group mt-12 inline-flex items-center gap-3 text-white pl-10 pr-14 py-5 rounded-full text-sm font-semibold tracking-[0.18em] relative overflow-hidden transition-all duration-500 hover:pr-16 hover:shadow-[0_8px_40px_-8px_rgba(184,148,90,0.6)] active:scale-95 shadow-premium"
            style={{ background: 'linear-gradient(135deg, #a6844e 0%, #d4aa72 50%, #b8945a 100%)' }}
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out pointer-events-none" />
            <span className="relative z-10">BOOK A SESSION NOW</span>
            <ArrowRight className="w-4 h-4 relative z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" />
          </button>
        </div>

        {/* Right: image (mirrored, larger, refined) */}
        <div className="relative lg:scale-[0.95] lg:-mr-2">
          {/* Soft offset shadow */}
          <div className="pointer-events-none absolute -inset-8 bg-soft-blue-light blob-1r -z-10 translate-x-10 translate-y-10 opacity-55 blur" />
          {/* Outer thin ring */}
          <div className="pointer-events-none absolute -inset-5 blob-1r border border-sage/30 rotate-3" />
          {/* Inner dashed ring detail */}
          <div className="pointer-events-none absolute -inset-2 blob-1r border border-dashed border-sage/20 -rotate-2" />

          <div className="relative overflow-hidden blob-1r shadow-premium aspect-[6/5] -rotate-2">
            <img
              src={heroImg}
              alt="Calm Avion Mobile Massage setup — folded linens, warm oil, and eucalyptus in a sunlit Calgary home"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-sage/15 via-transparent to-transparent mix-blend-multiply" />
          </div>

          {/* Floating credential chip */}
          <div className="absolute bottom-4 -left-4 md:-left-8 bg-white/95 backdrop-blur-md rounded-full shadow-premium px-6 py-4 flex items-center gap-4 border border-soft-blue/40">
            <span className="h-3 w-3 rounded-full bg-sage animate-pulse shrink-0" />
            <div className="leading-tight">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sage">Now Booking</p>
              <p className="text-sm text-charcoal/70 font-medium">Evenings &amp; Weekends</p>
            </div>
          </div>

          {/* Floating trust seal */}
          <div className="flex absolute -top-4 -right-4 md:-top-6 md:-right-6 h-24 w-24 md:h-32 md:w-32 rounded-full bg-sage text-white flex-col items-center justify-center shadow-premium rotate-[8deg] border-[4px] md:border-[5px] border-white text-center leading-[1.15] z-20">
            <span className="font-display font-bold text-[10px] md:text-[12px] uppercase tracking-widest text-white/90">Direct</span>
            <span className="font-serif italic font-medium text-[14px] md:text-[20px] my-0.5">Billing</span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.12em] opacity-95">Available</span>
          </div>
        </div>
      </div>

      {/* Does This Sound Like You? */}
      <div className="max-w-7xl mx-auto mt-20 md:mt-28 px-0">
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage mb-3">Sound Familiar?</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal">
            Does This Sound Like You?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Shield,
              quote:
                "I pay for extended health benefits every month — but I never actually find time to use them.",
            },
            {
              icon: Activity,
              quote:
                "My neck, shoulders and back are always tense, but getting to a clinic after work feels impossible.",
            },
            {
              icon: Home,
              quote:
                "I'd love a massage, but I hate driving across the city after an already exhausting day.",
            },
            {
              icon: Flame,
              quote:
                "I'm burnt out and running on empty. I just need someone to come to me — on my schedule.",
            },
          ].map(({ icon: Icon, quote }, i) => (
            <div
              key={i}
              className="group bg-sage-light/50 border border-soft-blue/60 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-soft hover:border-sage/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-full bg-white/80 border border-soft-blue/50 flex items-center justify-center shadow-sm group-hover:bg-sage/10 transition-colors">
                <Icon className="h-6 w-6 text-sage" />
              </div>
              <p className="text-charcoal/80 text-base leading-relaxed font-medium">
                <span className="text-sage font-medium not-italic">&ldquo;</span>
                {quote}
                <span className="text-sage font-medium">&rdquo;</span>
              </p>
            </div>
          ))}
        </div>

        {/* Connector line to next section */}
        <div className="flex justify-center mt-12">
          <span className="block w-px h-12 bg-gradient-to-b from-sage/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
