import React from "react";
import { ShieldCheck, MessageCircle, ArrowRight, ShieldAlert, Cpu } from "lucide-react";

interface HeroProps {
  setActiveChapter: (index: number) => void;
}

export function Hero({ setActiveChapter }: HeroProps) {
  return (
    <div className="w-full h-full min-h-screen relative flex items-center justify-center bg-black overflow-hidden select-none hud-grid pt-20">
      {/* Cinematic grid border lines */}
      <div className="absolute inset-x-0 top-1/4 h-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-1/4 h-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-white/5 pointer-events-none" />

      {/* Left Sidebar Overlay Specs */}
      <div className="absolute left-6 lg:left-12 bottom-24 hidden lg:flex flex-col gap-6 font-mono text-[9px] text-white/30 tracking-widest text-left z-20">
        <div className="flex flex-col gap-1 border-l border-amber-500/30 pl-3 py-1">
          <span className="text-white/50 text-[10px] font-bold">PROJECT CODE: AMM-994</span>
          <span>CALGARY REGION CODES [403]</span>
          <span>TERRAIN: URBAN OUTREACH</span>
        </div>
        <div className="flex flex-col gap-1 border-l border-emerald-500/30 pl-3 py-1">
          <span className="text-white/50 text-[10px] font-bold">BIO-METRICS ACTIVE</span>
          <span>MUSCLE ELASTIC CONVERSIONS</span>
          <span>STRESS DEFLECTION RATE: 94.6%</span>
        </div>
      </div>

      {/* Right Sidebar Overlay Specs */}
      <div className="absolute right-6 lg:right-12 bottom-24 hidden lg:flex flex-col gap-6 font-mono text-[9px] text-white/30 tracking-widest text-right z-20">
        <div className="flex flex-col gap-1 border-r border-amber-500/30 pr-3 py-1 items-end">
          <span className="text-white/50 text-[10px] font-bold">THERAPIST CONTEXT</span>
          <span>LICENSED REGISTERED (RMT)</span>
          <span>DIRECT BILLING: COMPATIBLE</span>
        </div>
        <div className="flex flex-col gap-1 border-r border-emerald-500/30 pr-3 py-1 items-end">
          <span className="text-white/50 text-[10px] font-bold">MASSAGE YIELD PRESETS</span>
          <span>SWEDISH // DEEP TISSUE</span>
          <span>PRENATAL // THERAPEUTIC</span>
        </div>
      </div>

      {/* Central Concentric Pulse / Massage target scanner visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full border border-white/5 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-[85%] h-[85%] rounded-full border border-dashed border-white/5 flex items-center justify-center animate-[spin_120s_linear_infinite]" />
        <div className="absolute w-[60%] h-[60%] rounded-full border border-amber-500/5 flex items-center justify-center animate-[spin_60s_linear_infinite_reverse]">
          <div className="w-[10px] h-[10px] bg-amber-500/25 rounded-full absolute -top-1.5 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
        </div>
        <div className="absolute w-[40%] h-[40%] rounded-full border border-white/5 flex items-center justify-center" />

        {/* Dynamic scanning indicator radar line */}
        <div className="absolute w-[70%] h-[70%] rounded-full border-t border-emerald-500/10 animate-[spin_12s_linear_infinite]" />
      </div>

      {/* Main HUD Center Content Container */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl flex flex-col items-center">
        {/* Top Tech Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/5 font-mono text-[9px] tracking-widest text-white/70 uppercase mb-8 shadow-inner animate-[pulse_3s_infinite] hud-corners">
          <Cpu className="h-3 w-3 text-amber-500" />
          <span>REJUVENATION SYSTEM ONLINE</span>
        </div>

        {/* Headline */}
        <h1 className="text-[2.2rem] sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
          MASSAGE THERAPY,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 glow-text-gold">
            ENGINEERED FOR YOU.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-xl font-mono text-[11px] sm:text-xs text-white/50 tracking-wider leading-relaxed">
          [DIRECT BILLING ACTIVE] // REGISTRATION STATUS: CERTIFIED.
          <br />
          PROFESSIONAL REGISTERED MASSAGE THERAPISTS DELIVERED TO YOUR HOME, OFFICE, OR WORKPLACE.
        </p>

        {/* Interactive Action HUD Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 z-20">
          <button
            onClick={() => setActiveChapter(5)}
            className="group px-8 py-3.5 border border-amber-500 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black font-mono text-[10px] tracking-widest font-bold uppercase transition-all duration-300 hud-corners flex items-center gap-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          >
            INITIATE CONVERSION
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="https://wa.me/14039230323"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 border border-white/10 hover:border-emerald-500/30 bg-white/5 hover:bg-emerald-500/5 text-white/80 hover:text-emerald-500 font-mono text-[10px] tracking-widest font-bold uppercase transition-all duration-300 flex items-center gap-3"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            SECURE WHATSAPP STREAM
          </a>
        </div>

        {/* Diagnostic rating details */}
        <div className="mt-12 flex items-center gap-4 px-5 py-2.5 border border-white/5 bg-black/60 backdrop-blur-md rounded-sm font-mono text-[9px] tracking-widest text-white/50 z-20">
          <span className="text-amber-500 glow-text-gold font-bold">5.0 / 5.0 RATING</span>
          <span className="text-white/20">•</span>
          <span>CALGARY PRESETS LOADED</span>
          <span className="text-white/20">•</span>
          <span className="text-emerald-500 font-bold">100% SATISFACTION VERIFIED</span>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-40">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/50 animate-pulse">
          SCROLL TO ANALYZE
        </span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-white/50 to-transparent animate-[pulse_2s_infinite]" />
      </div>
    </div>
  );
}
