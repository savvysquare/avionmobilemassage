import React, { useState, useEffect } from "react";
import logo from "@/assets/avion-logo.png";
import { Menu, X } from "lucide-react";

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
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-sage text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] py-2.5 px-4 text-center flex items-center justify-center gap-2 select-none shadow-sm h-10">
        <span>✨ Direct Insurance Billing Available — We File Claims For You ✨</span>
      </div>

      <header className={`fixed inset-x-0 z-50 flex justify-center pointer-events-none select-none transition-all duration-300 ${
        scrolled ? "top-2 md:top-3" : "top-12 md:top-14"
      }`}>
        <div className="w-full max-w-7xl px-6">
          <div
            className={`relative w-full flex items-center justify-between gap-4 rounded-full px-5 md:px-8 py-2.5 md:py-3.5 border transition-all duration-300 pointer-events-auto ${
              scrolled
                ? "bg-white/85 border-soft-blue/30 shadow-soft"
                : "bg-white/70 border-white/40 shadow-sm"
            } backdrop-blur-md`}
          >
            {/* Logo + brand */}
            <a href="#hero" onClick={(e) => scrollTo(e, "#hero")} className="flex items-center shrink-0">
              <img src={logo} alt="Avion Mobile Massage" className="h-16 md:h-20 w-auto" />
            </a>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-bold uppercase tracking-[0.18em] text-charcoal">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="hover:text-sage transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#book"
            onClick={(e) => scrollTo(e, "#book")}
            className="hidden md:inline-flex items-center bg-sage text-white px-7 py-3 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-sage-hover transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Book Now
          </a>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden h-10 w-10 flex items-center justify-center text-charcoal"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Mobile Drawer Overlay */}
          {open && (
            <div className="absolute top-full mt-3 left-0 right-0 md:hidden bg-white/95 backdrop-blur-md border border-soft-blue/30 rounded-3xl shadow-soft p-6 flex flex-col gap-3 pointer-events-auto">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  className="font-display py-2 text-base font-medium text-charcoal border-b border-border/40"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={(e) => scrollTo(e, "#book")}
                className="mt-3 inline-flex items-center justify-center bg-sage text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em]"
              >
                Book Now
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
    </>
  );
}
