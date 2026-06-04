import React, { useState } from "react";
import { CalendarCheck, Truck, Sparkles, Crosshair, HelpCircle, Activity } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    phase: "PHASE_01",
    subId: "SYS_REQ_LOC",
    title: "GEO-LOCATION",
    description:
      "Initialize target session details. Select duration, RMT specialization, and precise deployment coordinates.",
    metric: "LATENCY: < 1.2s",
  },
  {
    icon: Truck,
    phase: "PHASE_02",
    subId: "DISPATCH_SYS",
    title: "DISPATCH & SETUP",
    description:
      "Therapist deploys with technical array: premium ergonomic massage table, custom linens, organic oils, and soothing audio atmosphere.",
    metric: "DEP_RANGE: CALGARY + AREA",
  },
  {
    icon: Sparkles,
    phase: "PHASE_03",
    subId: "INTEG_RECOV",
    title: "RECOVERY INTEGRATION",
    description:
      "Therapeutic massage session execution in your private biome. Deep tension mitigation, myofascial release, and absolute recovery.",
    metric: "EFFICIENCY: 100%",
  },
];

export function HowItWorks() {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  return (
    <div className="w-full h-full min-h-screen relative flex items-center justify-center bg-black px-6 md:px-12 py-24 select-none font-mono">
      <div className="w-full max-w-6xl">
        {/* Diagnostic Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-amber-500 glow-text-gold text-[10px] tracking-widest font-bold mb-2">
              <Activity className="h-3.5 w-3.5" />
              <span>OPERATION PROTOCOL // SECT_01</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              THE WELLNESS SEQUENCE
            </h2>
          </div>

          <div className="text-right text-white/40 text-[9px] tracking-widest mt-4 md:mt-0 max-w-xs">
            <span>
              [AUTOMATED CONVERSION SYSTEMS] // EXPERT THERAPEUTIC FLUIDITY APPLIED TO YOUR PRIVATE
              BIOME.
            </span>
          </div>
        </div>

        {/* Phase Panel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => {
            const isHovered = hoveredPhase === idx;
            return (
              <div
                key={s.title}
                onMouseEnter={() => setHoveredPhase(idx)}
                onMouseLeave={() => setHoveredPhase(null)}
                className={`hud-panel p-6 md:p-8 flex flex-col justify-between transition-all duration-500 border ${
                  isHovered
                    ? "border-amber-500/40 bg-amber-500/[0.03] translate-y-[-4px] shadow-[0_0_20px_rgba(245,158,11,0.08)]"
                    : "border-white/10"
                } hud-corners ${isHovered ? "hud-corners-active" : ""}`}
              >
                <div>
                  {/* Top Phase Indicators */}
                  <div className="flex justify-between items-center mb-6">
                    <span
                      className={`text-[9px] tracking-widest font-bold transition-colors ${isHovered ? "text-amber-500" : "text-white/30"}`}
                    >
                      {s.phase} // {s.subId}
                    </span>
                    <div
                      className={`p-2 rounded-sm transition-colors ${isHovered ? "bg-amber-500/20 text-amber-500" : "bg-white/5 text-white/40"}`}
                    >
                      <s.icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-md sm:text-lg font-bold text-white font-sans tracking-wide mb-4">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-white/50 tracking-wider leading-relaxed mb-6 font-sans">
                    {s.description}
                  </p>
                </div>

                {/* Technical Diagnostic Stats inside Card */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[9px] text-white/30">
                  <div className="flex items-center gap-1.5">
                    <Crosshair
                      className={`h-3 w-3 ${isHovered ? "text-emerald-500" : "text-white/30"}`}
                    />
                    <span>STATUS: READY</span>
                  </div>
                  <span>{s.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Phase Indicator Footer Link */}
        <div className="mt-12 flex justify-between items-center border-t border-white/5 pt-6 text-[9px] text-white/30">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-3 w-3 text-amber-500" />
            <span>NEED SCHEDULING CLARIFICATIONS? JUMP CH_05</span>
          </div>
          <span>[SYSTEMS VERIFIED READY]</span>
        </div>
      </div>
    </div>
  );
}
