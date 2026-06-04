import { ArrowUpRight } from "lucide-react";

const services = [
  {
    name: "Therapeutic Massage",
    body: "Personalized treatment that targets specific tension patterns, improves mobility, and supports recovery from the physical demands of daily life in Calgary.",
    accent: true,
  },
  {
    name: "Deep Tissue Massage",
    body: "Focused work on deeper muscle layers to release chronic tightness, stubborn knots, and long-held stress. Ideal after long workdays or active weekends.",
    accent: false,
  },
  {
    name: "Relaxation Massage",
    body: "A calming, flowing session designed to quiet the nervous system, reduce stress, and leave you feeling grounded and recharged.",
    accent: false,
  },
  {
    name: "Prenatal Massage",
    body: "Safe, supportive care tailored for pregnancy. We help ease common discomforts while keeping you comfortable in your own home.",
    accent: false,
  },
  {
    name: "Corporate Wellness Massage",
    body: "On-site massage for workplaces, team events, and employee wellness programs — a thoughtful way to support your team without leaving the office.",
    accent: false,
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted/60 to-background" />
      <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-sage/6 blur-[120px] -z-10" />

      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage-foreground font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl leading-tight">
              Care shaped around
              <br />
              <span className="italic font-light text-foreground/55">your body, today.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-muted-foreground leading-relaxed">
            Every session is built around what you need now — recovery, relief, or simply quiet,
            restorative time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <article
              key={s.name}
              className={`group relative rounded-3xl p-8 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] ${
                s.accent
                  ? "bg-gradient-to-br from-sage/25 via-sage-soft to-background border border-sage/25"
                  : "glass-card"
              }`}
            >
              {/* Arrow icon */}
              <div className="self-end mb-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground/8 text-foreground/60 group-hover:bg-sage/20 group-hover:text-sage-foreground transition-all duration-200">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <h3 className="text-xl font-semibold leading-tight mb-4">{s.name}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm flex-1">{s.body}</p>

              <a
                href={`#book?service=${encodeURIComponent(s.name)}`}
                className="mt-8 w-fit btn-pill btn-outline hover:bg-background/80 hover:-translate-y-0.5 text-sm"
              >
                Book This Service
              </a>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage/25 to-transparent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
