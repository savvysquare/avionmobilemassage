import { Instagram, Mail, Phone } from "lucide-react";
import logo from "@/assets/avion-logo.png";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      {/* Subtle glow accents */}
      <div className="absolute top-0 left-1/4 h-[300px] w-[400px] rounded-full bg-sage/8 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-[200px] w-[300px] rounded-full bg-sage/5 blur-[80px]" />

      <div className="relative container-page py-16">
        {/* CTA Banner */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p className="text-xl md:text-2xl max-w-xl">
            Join busy Calgarians making self-care simple.
            <br />
            <span className="italic font-light opacity-75">
              Professional. Convenient. Delivered to you.
            </span>
          </p>
          <a
            href="#book"
            className="btn-pill bg-background text-foreground hover:opacity-90 hover:-translate-y-0.5 self-start md:self-auto shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
          >
            Book Now
          </a>
        </div>

        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={logo} alt="Avion" className="h-10 w-auto brightness-0 invert" />
            <p className="mt-4 text-sm opacity-65 max-w-xs leading-relaxed">
              Mobile Massage Therapy · Registered Therapists serving Calgary & surrounding areas.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-4">Explore</p>
            <ul className="space-y-2 text-sm">
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Services", "#services"],
                ["Areas", "#areas"],
                ["FAQ", "#faq"],
                ["Book Now", "#book"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="opacity-75 hover:opacity-100 transition-opacity">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+14039230323"
                  className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Phone className="h-4 w-4" /> +1 (403) 923-0323
                </a>
              </li>
              <li>
                <a
                  href="mailto:avionmobilemassage@outlook.com"
                  className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity break-all"
                >
                  <Mail className="h-4 w-4" /> avionmobilemassage@outlook.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/avionmobilemassage"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Instagram className="h-4 w-4" /> @avionmobilemassage
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs opacity-50">
          <p>
            © 2026 Avion Mobile Massage. All therapists are Registered Massage Therapists serving
            Calgary and surrounding areas.
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:opacity-100 transition-opacity">
              Privacy
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Cancellation Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
