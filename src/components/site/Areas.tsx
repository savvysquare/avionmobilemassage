import { MapPin } from "lucide-react";

const calgary = [
  "North Calgary",
  "Northwest Calgary",
  "Northeast Calgary",
  "South Calgary",
  "Southwest Calgary",
  "Southeast Calgary",
];
const nearby = ["Airdrie", "Cochrane", "Chestermere"];

export function Areas() {
  return (
    <section id="areas" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-surface-muted/50" />
      <div className="absolute bottom-0 right-1/3 h-[350px] w-[350px] rounded-full bg-sage/6 blur-[100px] -z-10" />

      <div className="container-page">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage-foreground font-semibold mb-4">
              Areas We Serve
            </span>
            <h2 className="text-4xl md:text-5xl leading-tight">
              We come
              <br />
              <span className="italic font-light text-foreground/55">to you.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Proudly bringing expert mobile massage therapy throughout Calgary and nearby
              communities. Not sure if we cover your exact neighbourhood? Message us — we usually
              can.
            </p>
            <a
              href="https://wa.me/14039230323"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex btn-pill btn-charcoal hover:opacity-85 hover:-translate-y-0.5"
            >
              Check My Address
            </a>
          </div>

          {/* Glass area card */}
          <div className="glass-card rounded-3xl p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-sage-foreground font-semibold mb-5">
              Calgary
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {calgary.map((c) => (
                <li key={c} className="flex items-center gap-2.5 text-sm text-foreground/85">
                  <MapPin className="h-3.5 w-3.5 text-sage shrink-0" />
                  {c}
                </li>
              ))}
            </ul>

            <div className="my-7 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <p className="text-xs uppercase tracking-[0.2em] text-sage-foreground font-semibold mb-5">
              Also Serving
            </p>
            <div className="flex flex-wrap gap-2">
              {nearby.map((n) => (
                <span
                  key={n}
                  className="rounded-full px-4 py-1.5 text-sm font-medium"
                  style={{
                    background: "rgba(168,181,162,0.15)",
                    border: "1px solid rgba(168,181,162,0.3)",
                    color: "var(--color-sage-foreground)",
                  }}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
