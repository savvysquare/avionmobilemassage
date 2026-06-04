import React, { useEffect, useState } from "react";
import { Instagram, Mail, ShieldAlert } from "lucide-react";

interface FooterProps {
  activeChapter: number;
}

export function Footer({ activeChapter }: FooterProps) {
  const [pingTime, setPingTime] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setPingTime(Math.floor(Math.random() * 8) + 8);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-t border-white/5 bg-black/70 backdrop-blur-md select-none font-mono text-[9px] tracking-widest text-white/40">
      {/* Left side: Location coordinates & Copyright */}
      <div className="flex items-center gap-6">
        <span className="hidden sm:inline">LOC // Calgary, AB [51.0447° N, 114.0719° W]</span>
        <span className="text-white/20">|</span>
        <span>© 2026 AVION</span>
      </div>

      {/* Center: System log metric simulation */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-amber-500 animate-ping" />
          <span>PING: {pingTime}ms</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-3 w-3 text-emerald-500" />
          <span>SECURE SEC: CH_0{activeChapter}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>STATUS: ONLINE</span>
        </div>
      </div>

      {/* Right side: Contact / Social connections */}
      <div className="flex items-center gap-6">
        <a
          href="https://www.instagram.com/avionmobilemassage"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-amber-500 transition-colors"
        >
          <Instagram className="h-3 w-3" />
          <span className="hidden md:inline">@AVIONMOBILEMASSAGE</span>
        </a>
        <span className="text-white/20">|</span>
        <a
          href="mailto:avionmobilemassage@outlook.com"
          className="flex items-center gap-2 hover:text-amber-500 transition-colors"
        >
          <Mail className="h-3 w-3" />
          <span className="hidden md:inline">AVIONMOBILEMASSAGE@OUTLOOK.COM</span>
        </a>
      </div>
    </footer>
  );
}
