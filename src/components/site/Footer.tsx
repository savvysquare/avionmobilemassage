import { Instagram, Mail, Phone } from "lucide-react";
import logo from "@/assets/avion-logo.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-page py-16">
        <div className="rounded-3xl bg-background/5 border border-background/10 p-8 md:p-12 mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-xl md:text-2xl max-w-xl">
            Join busy Calgarians making self-care simple.
            <br />
            <span className="italic font-light opacity-80">Professional. Convenient. Delivered to you.</span>
          </p>
          <a href="#book" className="btn-pill bg-background text-foreground hover:opacity-90 self-start md:self-auto">
            Book Now
          </a>
        </div>

        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={logo} alt="Avion" className="h-10 w-auto invert brightness-0" />
            <p className="mt-4 text-sm opacity-70 max-w-xs">
              Mobile Massage Therapy · Registered Therapists serving Calgary &amp; surrounding areas.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest opacity-60">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Services", "#services"],
                ["Areas", "#areas"],
                ["FAQ", "#faq"],
                ["Book Now", "#book"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="opacity-80 hover:opacity-100">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest opacity-60">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="tel:+14039230323" className="flex items-center gap-2 opacity-90 hover:opacity-100">
                  <Phone className="h-4 w-4" /> +1 (403) 923-0323
                </a>
              </li>
              <li>
                <a href="mailto:avionmobilemassage@outlook.com" className="flex items-center gap-2 opacity-90 hover:opacity-100 break-all">
                  <Mail className="h-4 w-4" /> avionmobilemassage@outlook.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/avionmobilemassage"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100"
                >
                  <Instagram className="h-4 w-4" /> @avionmobilemassage
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row justify-between gap-4 text-xs opacity-60">
          <p>© 2026 Avion Mobile Massage. All therapists are Registered Massage Therapists serving Calgary and surrounding areas.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:opacity-100">Privacy</a>
            <a href="#" className="hover:opacity-100">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
