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
    <section id="areas" className="py-24 md:py-32">
      <div className="container-page">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-sage-foreground/80">
              Areas We Serve
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl">
              We come
              <br />
              <span className="italic font-light text-foreground/70">to you.</span>
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
              className="mt-8 inline-flex btn-pill btn-charcoal hover:btn-charcoal-hover"
            >
              Check My Address
            </a>
          </div>

          <div className="rounded-3xl bg-sage-soft p-8 md:p-10">
            <p className="text-sm uppercase tracking-widest text-sage-foreground/80">Calgary</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {calgary.map((c) => (
                <li key={c} className="flex items-center gap-2 text-foreground/90">
                  <MapPin className="h-4 w-4 text-sage-foreground" /> {c}
                </li>
              ))}
            </ul>
            <div className="my-8 h-px bg-foreground/10" />
            <p className="text-sm uppercase tracking-widest text-sage-foreground/80">
              Also Serving
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {nearby.map((n) => (
                <li
                  key={n}
                  className="rounded-full bg-background px-4 py-1.5 text-sm ring-1 ring-border"
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
