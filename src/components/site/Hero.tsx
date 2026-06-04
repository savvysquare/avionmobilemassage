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
          <div className="absolute -bottom-6 -left-6 md:-left-10 bg-white/95 backdrop-blur-md rounded-full shadow-premium px-5 py-3 flex items-center gap-3 border border-soft-blue/40">
            <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
            <div className="leading-tight">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Now Booking</p>
              <p className="text-[11px] text-charcoal/70">Evenings &amp; weekends</p>
            </div>
          </div>

          {/* Floating trust seal */}
          <div className="hidden md:flex absolute -top-6 -right-6 h-32 w-32 rounded-full bg-sage text-white flex-col items-center justify-center shadow-premium rotate-[8deg] border-[5px] border-white text-center leading-tight">
            <span className="font-display font-bold text-[30px]">100%</span>
            <span className="text-[9px] uppercase tracking-[0.2em] opacity-95 mt-0.5">Direct<br/>Billing</span>
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
              <p className="text-charcoal/75 text-sm leading-relaxed font-light">
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
