import React, { useState, useEffect } from "react";
import logo from "@/assets/avion-logo.png";
import { Menu, X, Sparkles } from "lucide-react";
import { scrollToSection } from "@/lib/scrollTo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
    { href: "#book", label: "Contact" },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="fixed top-0 inset-x-0 z-50 h-10 flex items-center justify-center overflow-hidden select-none"
        style={{
          background: "linear-gradient(90deg, #a6844e 0%, #b8945a 40%, #d4a96a 60%, #b8945a 80%, #a6844e 100%)",
        }}
      >
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        />
        <div className="relative flex items-center justify-center gap-2 text-white w-full px-4">
          <Sparkles className="h-3 w-3 opacity-80 shrink-0 hidden sm:block" />
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.28em] text-center leading-tight">
            Direct Insurance Billing Available — We File Claims For You
          </span>
          <Sparkles className="h-3 w-3 opacity-80 shrink-0 hidden sm:block" />
        </div>
      </div>

      <header
        className={`fixed inset-x-0 z-50 flex justify-center pointer-events-none select-none transition-all duration-500 ${
          scrolled ? "top-2 md:top-3" : "top-12 md:top-14"
        }`}
      >
        <div className="w-full max-w-7xl px-4 md:px-6">
          <div
            className={`relative w-full flex items-center justify-between gap-4 rounded-full px-4 md:px-8 py-1.5 md:py-2 border transition-all duration-500 pointer-events-auto ${
              scrolled
                ? "bg-white/90 border-sage/20 shadow-[0_8px_32px_-8px_rgba(184,148,90,0.22)]"
                : "bg-white/75 border-white/50 shadow-[0_4px_20px_-4px_rgba(58,58,58,0.1)]"
            } backdrop-blur-xl`}
          >
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => scrollTo(e, "#hero")}
              className="flex items-center shrink-0"
            >
              <img
                src={logo}
                alt="Avion Mobile Massage"
                className="h-14 md:h-[72px] w-auto"
              />
            </a>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  className="relative px-4 py-2 text-[12.5px] font-bold uppercase tracking-[0.16em] text-charcoal/70 hover:text-sage transition-colors duration-200 group"
                >
                  {l.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-sage scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </a>
              ))}
            </nav>

            {/* CTA */}
            <a
              href="#book"
              onClick={(e) => scrollTo(e, "#book")}
              className="hidden md:inline-flex items-center gap-2 bg-sage text-white px-6 py-2.5 rounded-full text-[11.5px] font-bold uppercase tracking-[0.2em] hover:bg-sage-hover transition-all duration-200 shadow-[0_4px_16px_-4px_rgba(184,148,90,0.5)] hover:shadow-[0_6px_20px_-4px_rgba(184,148,90,0.65)] active:scale-95"
            >
              Book Now
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-full bg-sage/10 hover:bg-sage/20 text-charcoal transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>

            {/* Mobile Drawer */}
            {open && (
              <div className="absolute top-full mt-3 left-0 right-0 md:hidden bg-white/96 backdrop-blur-xl border border-sage/15 rounded-3xl shadow-[0_16px_48px_-12px_rgba(184,148,90,0.2)] p-6 flex flex-col gap-1 pointer-events-auto animate-fade-in">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => scrollTo(e, l.href)}
                    className="flex items-center justify-between py-3 px-2 text-[13px] font-bold uppercase tracking-[0.15em] text-charcoal/70 hover:text-sage border-b border-border/30 last:border-0 transition-colors"
                  >
                    {l.label}
                    <span className="text-sage/40 text-lg leading-none">›</span>
                  </a>
                ))}
                <a
                  href="#book"
                  onClick={(e) => scrollTo(e, "#book")}
                  className="mt-4 flex items-center justify-center bg-sage text-white px-5 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-[0_4px_16px_-4px_rgba(184,148,90,0.5)]"
                >
                  Book Now
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </>
  );
}
