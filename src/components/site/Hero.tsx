import { MessageCircle, ShieldCheck, Star } from "lucide-react";
import heroImg from "@/assets/hero-massage.jpg";

const trustPoints = [
  "Registered Massage Therapists",
  "Direct Billing for Most Plans",
  "Evening & Weekend Appointments",
  "Calgary & Surrounding Areas",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Professional in-home massage therapy in Calgary"
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Multi-layer overlay for contrast + warmth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c10]/80 via-[#0d1118]/65 to-[#111820]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Subtle warm tint top-left */}
        <div className="absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-[#a8b5a2]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-[#a8b5a2]/8 blur-[140px]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container-page pt-32 pb-24 md:pt-36 md:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide uppercase mb-8"
            style={{
              background: "rgba(168,181,162,0.18)",
              border: "1px solid rgba(168,181,162,0.35)",
              backdropFilter: "blur(10px)",
              color: "rgba(200,220,196,0.95)",
            }}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Direct Billing Available
          </div>

          {/* Headline */}
          <h1
            className="text-[2.8rem] sm:text-6xl md:text-[4.5rem] leading-[1.04] text-white animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Massage Therapy,
            <br />
            <span className="italic font-light text-white/75">Made Effortless.</span>
          </h1>

          {/* Subtext */}
          <p
            className="mt-7 mx-auto max-w-xl text-base md:text-lg text-white/65 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.22s" }}
          >
            Professional Registered Massage Therapists come directly to your home, office, or
            workplace across Calgary — you just open the door.
          </p>

          {/* CTAs */}
          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.34s" }}
          >
            <a
              href="#book"
              className="btn-pill btn-sage hover:brightness-110 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(168,181,162,0.4)]"
            >
              Book Your Appointment
            </a>
            <a
              href="https://wa.me/14039230323"
              target="_blank"
              rel="noreferrer"
              className="btn-pill btn-glass hover:bg-white/25 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Rating strip */}
          <div
            className="mt-12 inline-flex items-center gap-3 rounded-2xl px-5 py-3 animate-fade-up"
            style={{
              animationDelay: "0.46s",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#a8b5a2] text-[#a8b5a2]" />
              ))}
            </div>
            <span className="text-sm text-white/80">
              <span className="font-semibold text-white">5.0</span> · Trusted across Calgary
            </span>
          </div>
        </div>
      </div>

      {/* ── Trust bar at bottom ── */}
      <div
        className="relative z-10 border-t border-white/10"
        style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(16px)" }}
      >
        <div className="container-page py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustPoints.map((t) => (
            <div key={t} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full shrink-0 bg-[#a8b5a2]" />
              <span className="text-sm text-white/70">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 opacity-40">
        <span className="text-[10px] uppercase tracking-widest text-white/70">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
