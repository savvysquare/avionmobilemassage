import { CalendarCheck, Truck, Sparkles } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book Online",
    body: "Choose your service, preferred time, and location in under a minute. We'll confirm quickly.",
  },
  {
    icon: Truck,
    title: "We Come Prepared",
    body: "Your therapist arrives on time with a professional massage table, linens, and all supplies. You just open the door.",
  },
  {
    icon: Sparkles,
    title: "Relax & Recover",
    body: "Enjoy focused, expert care in your own environment. When the session ends, you're already home.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-surface-muted/60 py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-sage-foreground/80">How it works</span>
          <h2 className="mt-4 text-3xl md:text-5xl">
            Professional care.
            <br />
            <span className="italic font-light text-foreground/70">Exceptional convenience.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            At Avion Mobile Massage we believe quality care should never feel like another task on your list. We handle everything — table, linens, oils — and bring a calm, respectful experience to the space where you already feel comfortable.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="group rounded-3xl bg-card p-8 shadow-card ring-1 ring-border/60 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">0{i + 1}</span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sage-soft text-sage-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-8 text-xl">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <a href="#book" className="btn-pill btn-charcoal hover:opacity-90">
            Ready when you are — Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
