import { ArrowUpRight } from "lucide-react";

const services = [
  {
    name: "Therapeutic Massage",
    body: "Personalized treatment that targets specific tension patterns, improves mobility, and supports recovery from the physical demands of daily life in Calgary.",
  },
  {
    name: "Deep Tissue Massage",
    body: "Focused work on deeper muscle layers to release chronic tightness, stubborn knots, and long-held stress. Ideal after long workdays or active weekends.",
  },
  {
    name: "Relaxation Massage",
    body: "A calming, flowing session designed to quiet the nervous system, reduce stress, and leave you feeling grounded and recharged.",
  },
  {
    name: "Prenatal Massage",
    body: "Safe, supportive care tailored for pregnancy. We help ease common discomforts while keeping you comfortable in your own home.",
  },
  {
    name: "Corporate Wellness Massage",
    body: "On-site massage for workplaces, team events, and employee wellness programs — a thoughtful way to support your team without leaving the office.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-sage-foreground/80">
              Our Services
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl">
              Care shaped around
              <br />
              <span className="italic font-light text-foreground/70">your body, today.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-muted-foreground">
            Every session is built around what you need now — recovery, relief, or simply quiet,
            restorative time.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <article
              key={s.name}
              className={`rounded-3xl p-8 ring-1 ring-border/60 flex flex-col ${
                i === 0 ? "bg-sage-soft" : "bg-card"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl leading-tight">{s.name}</h3>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-5 text-muted-foreground leading-relaxed">{s.body}</p>
              <a
                href={`#book?service=${encodeURIComponent(s.name)}`}
                className="mt-8 inline-flex w-fit btn-pill btn-outline hover:btn-outline-hover"
              >
                Book This Service
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
