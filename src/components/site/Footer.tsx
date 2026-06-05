import React from "react";
import logo from "@/assets/avion-logo.png";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-background py-20 px-6 border-t border-soft-blue/30">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        <img src={logo} alt="Avion Mobile Massage — Registered Massage Therapists" className="h-28 md:h-32 w-auto" />

        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.28em] text-charcoal/40">
          <a href="https://www.instagram.com/avionmobilemassage" target="_blank" rel="noreferrer" className="hover:text-sage transition-colors inline-flex items-center gap-2">
            <Instagram className="h-3.5 w-3.5" /> Instagram
          </a>
        </div>

        <p className="text-[10px] text-charcoal/30 uppercase tracking-[0.25em] text-center">
          © 2026 Avion Mobile Massage.{" "}
          <br className="sm:hidden" />
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
