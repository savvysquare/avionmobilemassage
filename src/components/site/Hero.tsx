import { MessageCircle, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-massage.jpg";
import prenatalImg from "@/assets/service-prenatal.jpg";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* curved connector lines, Tetra-style */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[55%] -z-10 hidden md:block"
        viewBox="0 0 1440 600"
        fill="none"
      >
        <path
          d="M120 80 C 360 460, 1080 460, 1320 80"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
          className="text-foreground"
        />
        <path
          d="M720 460 C 720 540, 720 560, 720 600"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
          className="text-foreground"
        />
      </svg>

      <div className="container-page relative pt-10 md:pt-16 pb-24 md:pb-32">
        <div className="grid md:grid-cols-[1fr_minmax(0,640px)_1fr] items-center gap-10">
          {/* left tilted card */}
          <div className="hidden md:flex justify-end">
            <div
              className="tilt-left w-[280px] aspect-[3/4] overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5"
              style={{ animation: "float-slow 8s ease-in-out infinite" }}
            >
              <img
                src={heroImg}
                alt="In-home massage session in a Calgary apartment"
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* center text */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-1.5 text-xs font-medium text-sage-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Direct Billing Available
            </span>

            <h1 className="mt-6 text-[2.6rem] sm:text-5xl md:text-[3.75rem] leading-[1.05] text-foreground">
              Massage Therapy,
              <br />
              <span className="italic font-light">Made Effortless.</span>
            </h1>

            <p className="mt-6 mx-auto max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Professional Registered Massage Therapists come directly to your home, office, or workplace across Calgary.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#book" className="btn-pill btn-sage hover:brightness-95">
                Book Your Appointment
              </a>
              <a
                href="https://wa.me/14039230323"
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-outline hover:bg-surface-muted"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* right tilted card */}
          <div className="hidden md:flex justify-start">
            <div
              className="tilt-right w-[280px] aspect-[3/4] overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5"
              style={{ animation: "float-slow 9s ease-in-out infinite" }}
            >
              <img
                src={prenatalImg}
                alt="Prenatal mobile massage in a calm home"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* mobile single image */}
          <div className="md:hidden">
            <div className="mx-auto w-full max-w-sm aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
              <img src={heroImg} alt="In-home massage session" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* trust bar */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 text-sm text-foreground/75">
          {[
            "Registered Massage Therapists",
            "Direct Billing for Most Plans",
            "Evening & Weekend Appointments",
            "Calgary & Surrounding Areas",
          ].map((t) => (
            <div key={t} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sage" />
              <span>{t}</span>
            </div>
          ))}
        </div>

        <p className="mt-12 mx-auto max-w-2xl text-center text-muted-foreground">
          You work hard. You move through busy Calgary days. Now self-care can meet you where you are — no traffic, no parking, no waiting rooms. Just professional, personalized massage therapy that fits your real life.
        </p>
      </div>
    </section>
  );
}
