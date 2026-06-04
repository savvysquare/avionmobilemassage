import React from "react";
import { MapPin, HelpCircle, Activity } from "lucide-react";

const calgary = [
  "North Calgary",
  "Northwest Calgary",
  "Northeast Calgary",
  "South Calgary",
  "Southwest Calgary",
  "Southeast Calgary",
];
const nearby = ["Airdrie", "Cochrane", "Chestermere"];

export function Areas() {
  return (
    <div className="w-full font-mono text-left select-none">
      <div className="flex items-center gap-2 text-amber-500 glow-text-gold text-[10px] tracking-widest font-bold mb-2">
        <Activity className="h-3.5 w-3.5 animate-pulse" />
        <span>DEPLOYMENT COORDS // CH_04A</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans uppercase mb-6">
        COVERAGE REGION
      </h2>

      <div className="hud-panel p-6 border border-white/10 hud-corners hud-corners-active w-full">
        <div className="flex justify-between items-center text-[8px] text-white/30 border-b border-white/5 pb-3 mb-4">
          <span>[CALGARY METROPOLITAN MATRIX]</span>
          <span className="text-emerald-500">ACCESSIBILITY: ACTIVE</span>
        </div>

        {/* Calgary Regions list */}
        <p className="text-[10px] text-white/50 tracking-wider mb-3">CALGARY QUADRANTS:</p>
        <ul className="grid grid-cols-2 gap-2 mb-6">
          {calgary.map((c) => (
            <li key={c} className="flex items-center gap-2 text-[10px] text-white/80">
              <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
              <span>{c.toUpperCase()}</span>
            </li>
          ))}
        </ul>

        <div className="h-px bg-white/5 my-4" />

        {/* Surrounding Areas */}
        <p className="text-[10px] text-white/50 tracking-wider mb-3">SATELLITE SECTORS:</p>
        <div className="flex flex-wrap gap-2">
          {nearby.map((n) => (
            <span
              key={n}
              className="px-2.5 py-1 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[9px] rounded-sm uppercase"
            >
              {n}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-[8px] text-white/30 bg-white/[0.02] p-2.5 border border-white/5 rounded-sm">
          <HelpCircle className="h-3 w-3 text-amber-500 shrink-0" />
          <span>OUTSIDE RANGE? SUBMIT COORDS VIA WHATSAPP STREAM.</span>
        </div>
      </div>
    </div>
  );
}
