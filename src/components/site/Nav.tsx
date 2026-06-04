import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/avion-logo.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#areas", label: "Areas We Serve" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
      {/* Floating pill navbar — variant3d.io inspired */}
      <div
        className={`w-full max-w-5xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass-panel shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
            : "bg-transparent border border-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 shrink-0"
            aria-label="Avion Mobile Massage"
          >
            <img
              src={logo}
              alt="Avion"
              className={`h-8 w-auto transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`}
            />
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/15 ${
                  scrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#book"
              className={`btn-pill text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                scrolled ? "btn-charcoal hover:opacity-90" : "btn-glass hover:bg-white/25"
              }`}
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
              scrolled
                ? "border-border bg-surface text-foreground"
                : "border-white/30 bg-white/10 text-white backdrop-blur-sm"
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t border-white/15 px-5 pb-5 pt-3 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-foreground/80 hover:bg-surface"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="btn-pill btn-charcoal mt-3 w-full text-center"
            >
              Book Now
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
