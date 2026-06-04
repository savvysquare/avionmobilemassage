import React from "react";
import logo from "@/assets/avion-logo.png";
import { Instagram, Mail, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-charcoal text-background pt-16 pb-24 md:pb-16 select-none">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-background/10 pb-12">
          {/* Column 1: Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col gap-4 text-left">
            <img src={logo} alt="Avion" className="h-8 w-auto brightness-0 invert self-start" />
            <p className="text-xs font-semibold uppercase tracking-wider text-sage">
              Mobile Massage Therapy | Registered Therapists
            </p>
            <p className="text-xs text-background/60 leading-relaxed max-w-xs font-light">
              Join busy Calgarians who are making self-care simple. Professional. Convenient.
              Delivered directly to your door.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-4 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-background/80">
              Quick Links
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-background/60">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => handleScrollToSection(e, "#hero")}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScrollToSection(e, "#about")}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScrollToSection(e, "#services")}
                  className="hover:text-white transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="#areas"
                  onClick={(e) => handleScrollToSection(e, "#areas")}
                  className="hover:text-white transition-colors"
                >
                  Areas We Serve
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleScrollToSection(e, "#faq")}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#book"
                  onClick={(e) => handleScrollToSection(e, "#book")}
                  className="hover:text-white transition-colors text-sage font-medium"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-4 flex flex-col gap-4 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-background/80">
              Contact
            </span>
            <ul className="flex flex-col gap-3 text-xs text-background/60">
              <li>
                <a
                  href="tel:+14039230323"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-sage" />
                  <span>Call: +1 (403) 923-0323</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/14039230323"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>WhatsApp: +1 (403) 923-0323</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:avionmobilemassage@outlook.com"
                  className="flex items-center gap-2.5 hover:text-white transition-colors animate-pulse-slow"
                >
                  <Mail className="h-4 w-4 text-sage" />
                  <span>avionmobilemassage@outlook.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/avionmobilemassage"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4 text-sage" />
                  <span>Instagram: @avionmobilemassage</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left text-xs text-background/40 font-light">
          <p className="max-w-md">
            © 2026 Avion Mobile Massage. All therapists are Registered Massage Therapists serving
            Calgary and surrounding areas.
          </p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <span>•</span>
            <a href="#cancellation" className="hover:text-white transition-colors">
              Cancellation Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
