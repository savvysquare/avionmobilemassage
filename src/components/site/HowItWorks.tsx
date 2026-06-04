import { CalendarCheck, Truck, Sparkles } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    step: "01",
    title: "Book Online",
    body: "Choose your service, preferred time, and location in under a minute. We'll confirm quickly.",
  },
  {
    icon: Truck,
    step: "02",
    title: "We Come Prepared",
    body: "Your therapist arrives on time with a professional massage table, linens, and all supplies. You just open the door.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Relax & Recover",
    body: "Enjoy focused, expert care in your own environment. When the session ends, you're already home.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Subtle background mesh */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-sage/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-sky-soft/40 blur-[100px] -z-10" />

      <div className="container-page">
        {/* Header — tenity-style two-column layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage-foreground font-semibold mb-4">
              How it works
            </span>
            <h2 className="text-4xl md:text-5xl leading-tight">
              Professional care.
              <br />
              <span className="italic font-light text-foreground/55">Exceptional convenience.</span>
            </h2>
          </div>
          <p className="md:max-w-xs text-muted-foreground leading-relaxed">
            We handle everything — table, linens, oils — and bring a calm, respectful experience to
            the space where you already feel comfortable.
          </p>
        </div>

        {/* Cards — glassmorphic */}
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div
              key={s.title}
              className="group relative glass-card rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              {/* Step number watermark */}
              <span className="absolute top-5 right-6 text-6xl font-display font-semibold text-foreground/5 select-none leading-none">
                {s.step}
              </span>

              {/* Icon */}
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/15 text-sage-foreground mb-8">
                <s.icon className="h-5 w-5" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{s.body}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <a
            href="#book"
            className="btn-pill btn-charcoal hover:opacity-85 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            Ready when you are — Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
