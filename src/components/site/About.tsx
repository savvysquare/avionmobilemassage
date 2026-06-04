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
    <section id="about" className="py-24 md:py-32 bg-surface-muted/60">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-sage-foreground/80">
              About Avion
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl">
              Care designed
              <br />
              <span className="italic font-light text-foreground/70">around your life.</span>
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

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-black/5">
              <img
                src={aboutImg}
                alt="Happy clients after a session"
                className="h-full w-full object-cover aspect-[5/4]"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-card px-5 py-4 shadow-card ring-1 ring-border">
              <p className="text-xs text-muted-foreground">Avion Promise</p>
              <p className="font-medium">Professional. Convenient. Yours.</p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div key={p.t} className="rounded-2xl bg-card p-6 ring-1 ring-border/60">
              <h3 className="text-lg">{p.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
