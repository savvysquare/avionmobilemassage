import React from "react";
import logo from "@/assets/avion-logo.png";
import { Instagram, Mail, Phone, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="w-full bg-background py-20 px-6 border-t border-soft-blue/30">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <img src={logo} alt="Avion Mobile Massage — Registered Massage Therapists" className="h-28 md:h-32 w-auto" />

        {/* Contact info display */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center text-xs font-semibold text-charcoal/60">
          <a href="tel:+14039230323" className="hover:text-sage transition-colors inline-flex items-center gap-2">
            <Phone className="h-4 w-4 text-sage" /> +1 (403) 923-0323
          </a>
          <a href="mailto:avionmobilemassage@outlook.com" className="hover:text-sage transition-colors inline-flex items-center gap-2">
            <Mail className="h-4 w-4 text-sage" /> avionmobilemassage@outlook.com
          </a>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] font-bold uppercase tracking-[0.22em] text-charcoal/40">
          <a href="https://www.instagram.com/avionmobilemassage" target="_blank" rel="noreferrer" className="hover:text-sage transition-colors inline-flex items-center gap-1.5">
            <Instagram className="h-3.5 w-3.5" /> Instagram
          </a>
          <span className="opacity-30">|</span>
          <Link to="/blog" className="hover:text-sage transition-colors">
            Blog
          </Link>
          <span className="opacity-30">|</span>
          <Link to="/admin" className="hover:text-sage transition-colors inline-flex items-center gap-1.5">
            <Lock className="h-3 w-3" /> Admin Area
          </Link>
        </div>

        <p className="text-[10px] text-charcoal/30 uppercase tracking-[0.25em] text-center mt-4">
          © 2026 Avion Mobile Massage. All Rights Reserved. Registered Massage Therapists.
        </p>
      </div>
    </footer>
  );
}
