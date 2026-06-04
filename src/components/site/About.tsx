import aboutImg from "@/assets/about-client.jpg";

const pillars = [
  { t: "True Convenience", b: "We come to you. No driving, no parking, no waiting rooms." },
  {
    t: "Genuine Professionalism",
    b: "Every therapist is a Registered Massage Therapist — trained, insured, and committed to clinical standards.",
  },
  {
    t: "Real Comfort",
    b: "Receive treatment in the familiar, private space where you already relax best.",
  },
  {
    t: "Personalized Care",
    b: "We listen first. Every session is shaped around your body's needs and goals that day.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-surface-muted/80 via-background to-surface-muted/40" />
      <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-sage/6 blur-[110px] -z-10" />

      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage-foreground font-semibold mb-4">
              About Avion
            </span>
            <h2 className="text-4xl md:text-5xl leading-tight">
              Care designed
              <br />
              <span className="italic font-light text-foreground/55">around your life.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Calgary moves fast. Between work, family, and everything else, finding time for your
              well-being shouldn't add more stress.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              That's why Avion Mobile Massage exists. We bring fully Registered Massage Therapists
              directly to you — at home, in the office, or wherever you spend your days. Just
              professional care that meets you exactly where you are.
            </p>
          </div>

          {/* Image with glass badge */}
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-[0_24px_60px_rgba(0,0,0,0.14)] ring-1 ring-black/6">
              <img
                src={aboutImg}
                alt="Happy clients after a session"
                className="h-full w-full object-cover aspect-[5/4]"
                loading="lazy"
              />
            </div>
            {/* Glass badge */}
            <div
              className="absolute -bottom-5 -left-5 hidden md:block rounded-2xl px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <p className="text-xs text-muted-foreground">Avion Promise</p>
              <p className="font-semibold text-sm">Professional. Convenient. Yours.</p>
            </div>
          </div>
        </div>

        {/* Pillar cards */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div
              key={p.t}
              className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-base font-semibold mb-3">{p.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
