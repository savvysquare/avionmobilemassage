import React from "react";
import logo from "@/assets/avion-logo.png";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#fafafa] border-t border-border py-12">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logo} alt="Avion Mobile Massage" className="h-10 w-auto" />
          <p className="text-xs text-charcoal-muted text-center">
            © 2026 Avion Mobile Massage. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-charcoal-muted hover:text-sage transition-colors">
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
            <a href="#" className="text-charcoal-muted hover:text-sage transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
