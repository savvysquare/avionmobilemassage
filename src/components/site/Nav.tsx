import React, { useState, useEffect } from "react";
import logo from "@/assets/avion-logo.png";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll shadow/opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#areas-faq", label: "Areas We Serve" },
    { href: "#faq", label: "FAQ" },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-blur-glass border-b border-border shadow-soft h-16 md:h-20"
            : "bg-transparent h-20 md:h-24"
        } flex items-center justify-between px-6 md:px-12 lg:px-20 select-none`}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center focus:outline-none shrink-0">
          <img src={logo} alt="Avion Mobile Massage" className="h-8 md:h-10 w-auto" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="text-sm font-medium text-charcoal-muted hover:text-charcoal transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Call to Action */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#book"
            onClick={(e) => handleScrollToSection(e, "#book")}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-sage hover:bg-sage-hover text-white text-sm font-semibold rounded-full transition-all shadow-soft hover:shadow-premium duration-200"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center h-10 w-10 text-charcoal hover:bg-sage-light rounded-full transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 md:top-20 bg-background/98 z-40 lg:hidden flex flex-col p-6 gap-6 animate-fade-in border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollToSection(e, link.href)}
                  className="py-3 text-lg font-medium text-charcoal-muted hover:text-charcoal border-b border-border/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="#book"
              onClick={(e) => handleScrollToSection(e, "#book")}
              className="mt-4 w-full py-3.5 bg-sage hover:bg-sage-hover text-white text-center text-md font-semibold rounded-full shadow-soft transition-colors"
            >
              Book Now
            </a>
          </div>
        )}
      </header>

      {/* Mobile Sticky / Floating Book Now Button at screen bottom */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm pointer-events-auto">
        <a
          href="#book"
          onClick={(e) => handleScrollToSection(e, "#book")}
          className="flex items-center justify-center w-full py-4 bg-charcoal hover:bg-charcoal/90 text-white text-sm font-semibold rounded-full shadow-premium tracking-wide uppercase transition-transform hover:scale-102"
        >
          Book Now
        </a>
      </div>
    </>
  );
}
