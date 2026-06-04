import React, { useState, useEffect } from "react";
import logo from "@/assets/avion-logo.png";
import { Menu, X, Phone, Instagram, Facebook } from "lucide-react";

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#book", label: "Contact" },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-blur-glass shadow-soft py-3" : "bg-white py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center shrink-0">
          <img src={logo} alt="Avion Mobile Massage" className="h-10 md:h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="font-display text-[15px] font-medium text-charcoal hover:text-sage transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Phone + Socials */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+14039230323"
            className="flex items-center gap-3 text-charcoal hover:text-sage transition-colors"
          >
            <span className="w-10 h-10 rounded-full border border-sage/40 flex items-center justify-center text-sage">
              <Phone className="h-4 w-4" />
            </span>
            <span className="w-6 h-px bg-sage" />
            <span className="font-display text-[15px] font-medium">+1 (403) 923-0323</span>
          </a>
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-charcoal-muted hover:text-sage transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/avionmobilemassage"
              target="_blank"
              rel="noreferrer"
              className="text-charcoal-muted hover:text-sage transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center h-10 w-10 text-charcoal"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-6 py-6 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="font-display py-2 text-lg font-medium text-charcoal border-b border-border/50"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+14039230323"
            className="mt-2 flex items-center gap-3 text-sage font-display font-semibold"
          >
            <Phone className="h-4 w-4" /> +1 (403) 923-0323
          </a>
        </div>
      )}
    </header>
  );
}
