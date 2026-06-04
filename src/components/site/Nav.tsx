import React, { useState } from "react";
import logo from "@/assets/avion-logo.png";
import { Volume2, VolumeX, Menu, X } from "lucide-react";

interface NavProps {
  activeChapter: number;
  setActiveChapter?: (index: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const navLinks = [
  { id: 0, label: "WELCOME" },
  { id: 1, label: "SEQUENCE" },
  { id: 2, label: "THERAPIES" },
  { id: 3, label: "SCIENCE" },
  { id: 4, label: "DETAILS" },
  { id: 5, label: "INITIATE" },
];

export function Nav({ activeChapter, setActiveChapter, isMuted, setIsMuted }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-20 border-b border-white/5 bg-black/60 backdrop-blur-md select-none font-mono">
      {/* Top Left: Logo & Status */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => setActiveChapter?.(0)}
          className="flex items-center gap-2 focus:outline-none shrink-0"
        >
          <img src={logo} alt="Avion" className="h-7 w-auto brightness-0 invert" />
        </button>

        {/* Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 border border-emerald-500/20 bg-emerald-500/5 rounded-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] text-emerald-500 tracking-widest font-bold">
            SYSTEM ACTIVE // CH_0{activeChapter}
          </span>
        </div>
      </div>

      {/* Center: Desktop Nav Links */}
      <nav className="hidden lg:flex items-center gap-2">
        {navLinks.map((link) => {
          const isActive = activeChapter === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActiveChapter?.(link.id)}
              className={`px-4 py-2 text-[10px] tracking-widest font-bold transition-all relative ${
                isActive ? "text-amber-500 glow-text-gold" : "text-white/40 hover:text-white/80"
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Sound Control & Mobile Menu */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Audio Toggle Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex items-center gap-3 px-3 py-1.5 border border-white/10 hover:border-amber-500/40 rounded-sm bg-white/5 transition-all text-white/60 hover:text-white"
          title={isMuted ? "Unmute Ambient Sound" : "Mute Ambient Sound"}
        >
          <span className="text-[9px] tracking-widest font-bold hidden sm:inline">
            AMBIENT AUDIO
          </span>

          <div className="flex items-center gap-0.5 h-3 w-5 justify-center">
            {isMuted ? (
              <VolumeX className="h-3 w-3 text-white/40" />
            ) : (
              <>
                <Volume2 className="h-3 w-3 text-amber-500 mr-1" />
                {/* Audio Waves Visualizer (Animated CSS Bars) */}
                <span className="w-[1.5px] h-3 bg-amber-500 animate-[bounce_0.8s_infinite_0.1s]" />
                <span className="w-[1.5px] h-2 bg-amber-500 animate-[bounce_0.8s_infinite_0.3s]" />
                <span className="w-[1.5px] h-3.5 bg-amber-500 animate-[bounce_0.8s_infinite_0.5s]" />
                <span className="w-[1.5px] h-1.5 bg-amber-500 animate-[bounce_0.8s_infinite_0.2s]" />
              </>
            )}
          </div>
        </button>

        {/* Action Button */}
        <button
          onClick={() => setActiveChapter?.(5)}
          className="hidden md:inline-flex items-center justify-center px-5 py-2 border border-amber-500 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black text-[9px] tracking-widest font-bold transition-all hud-corners"
        >
          INITIATE SESSION
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center h-8 w-8 border border-white/10 bg-white/5 text-white/80 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 bg-black/95 border-b border-white/10 z-40 lg:hidden flex flex-col p-6 gap-2">
          {navLinks.map((link) => {
            const isActive = activeChapter === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveChapter?.(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-3 text-left text-xs tracking-widest font-bold border-b border-white/5 ${
                  isActive ? "text-amber-500" : "text-white/50"
                }`}
              >
                CH_0{link.id} // {link.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              setActiveChapter?.(5);
              setMobileMenuOpen(false);
            }}
            className="mt-4 w-full py-3 bg-amber-500 text-black text-center text-xs tracking-widest font-bold uppercase rounded-sm"
          >
            INITIATE SESSION
          </button>
        </div>
      )}
    </header>
  );
}
