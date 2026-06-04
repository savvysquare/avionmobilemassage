import React, { useState } from "react";
import { ArrowRight, Activity, Zap, Compass, CheckCircle } from "lucide-react";

interface ServiceModule {
  name: string;
  code: string;
  pressure: number; // 1-10
  recovery: string;
  nodes: string[];
  description: string;
  durations: string[];
}

const services: ServiceModule[] = [
  {
    name: "Therapeutic Massage",
    code: "AMM-THER-01",
    pressure: 6,
    recovery: "88.7%",
    nodes: ["Myofascial Trigger Points", "Lumbar Region", "Shoulder Girdle"],
    description:
      "Highly customized therapy targeted to restore musculoskeletal alignment, alleviate chronic tension patterns, and enhance physiological joint mobility.",
    durations: ["60 MIN", "90 MIN", "120 MIN"],
  },
  {
    name: "Deep Tissue Massage",
    code: "AMM-DEEP-02",
    pressure: 9,
    recovery: "94.2%",
    nodes: ["Subscapularis Knots", "Gluteal Myofascial Nodes", "Cervical Tension"],
    description:
      "Intense, deep muscular penetration focusing on releasing stubborn connective tissue adhesion points, chronic stress holds, and posture-induced restriction nodes.",
    durations: ["60 MIN", "90 MIN", "120 MIN"],
  },
  {
    name: "Relaxation Massage",
    code: "AMM-RELAX-03",
    pressure: 4,
    recovery: "81.5%",
    nodes: ["Parasympathetic Nervous System", "Vagus Stimulation", "Dermal Soothing"],
    description:
      "Gentle flowing technique focusing on soothing the central nervous system, reducing adrenaline levels, and encouraging systemic lymph circulation.",
    durations: ["60 MIN", "90 MIN", "120 MIN"],
  },
  {
    name: "Prenatal Massage",
    code: "AMM-PREN-04",
    pressure: 5,
    recovery: "85.0%",
    nodes: ["Pelvic Pressure Offload", "Sciatic Decompression", "Lower Back Alignment"],
    description:
      "Safe, highly specialized therapy tailored for expectant mothers. Focuses on comforting local pressure symptoms and leg swelling, ensuring absolute safety.",
    durations: ["60 MIN", "90 MIN"],
  },
  {
    name: "Corporate Wellness",
    code: "AMM-CORP-05",
    pressure: 6,
    recovery: "90.1%",
    nodes: ["Cervicothoracic Release", "Scapular Mobilization", "Mental Reset Nodes"],
    description:
      "Focused office/workplace setup targeting typical seated desk-fatigue areas. Minimizes stress, improves focus, and drives overall employee mental recovery.",
    durations: ["15 MIN", "20 MIN", "30 MIN"],
  },
];

export function Services() {
  const [selectedService, setSelectedService] = useState<number>(0);
  const current = services[selectedService];

  return (
    <div className="w-full h-full min-h-screen relative flex items-center justify-center bg-black px-6 md:px-12 py-24 select-none font-mono">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Module Selector List */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-3">
          <div className="flex items-center gap-2 text-amber-500 glow-text-gold text-[10px] tracking-widest font-bold mb-4">
            <Activity className="h-3.5 w-3.5" />
            <span>DIAGNOSTIC MODULES // SECT_02</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans uppercase mb-6">
            THERAPY UNITS
          </h2>

          <div className="flex flex-col gap-2">
            {services.map((s, idx) => {
              const isSelected = selectedService === idx;
              return (
                <button
                  key={s.name}
                  onClick={() => setSelectedService(idx)}
                  className={`w-full text-left p-4 border transition-all duration-300 relative ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/10 text-white"
                      : "border-white/5 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white"
                  } hud-corners ${isSelected ? "hud-corners-active" : ""}`}
                >
                  <div className="flex justify-between items-center text-[9px] mb-1 font-bold">
                    <span>{s.code}</span>
                    {isSelected && <span className="text-amber-500 glow-text-gold">SELECTED</span>}
                  </div>
                  <div className="font-sans font-bold text-sm tracking-wide">{s.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed HUD Technical Spec Sheet */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="hud-panel p-6 md:p-10 border border-white/10 hud-corners hud-corners-active">
            {/* Header Specs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-6 mb-6 gap-4">
              <div>
                <span className="text-[9px] text-amber-500 tracking-widest font-bold block mb-1">
                  MODULE DETAIL SPECIFICATIONS
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-sans text-white tracking-wide">
                  {current.name}
                </h3>
              </div>
              <div className="text-right flex flex-col items-start sm:items-end">
                <span className="text-[8px] text-white/30">SYSTEM RECOVERY METRIC</span>
                <span className="text-lg md:text-2xl text-emerald-500 glow-text-green font-extrabold">
                  {current.recovery}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-white/70 leading-relaxed font-sans mb-8">
              {current.description}
            </p>

            {/* Visual Gauges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Pressure Level Gauge */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[9px] text-white/40">
                  <span>PRESSURE COEFFICIENT</span>
                  <span className="text-amber-500 glow-text-gold">{current.pressure * 10}%</span>
                </div>

                {/* Visual Bar Graph */}
                <div className="h-6 w-full border border-white/10 bg-white/5 p-1 flex gap-0.5 rounded-sm">
                  {[...Array(10)].map((_, i) => {
                    const active = i < current.pressure;
                    return (
                      <div
                        key={i}
                        className={`h-full flex-1 transition-all duration-500 ${
                          active
                            ? "bg-gradient-to-t from-amber-600 to-amber-400 shadow-[0_0_4px_#f59e0b]"
                            : "bg-white/5"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Target Relief Nodes */}
              <div className="flex flex-col gap-2 font-sans">
                <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">
                  TARGET NODES
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {current.nodes.map((node) => (
                    <span
                      key={node}
                      className="px-2.5 py-1 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] rounded-sm flex items-center gap-1.5 font-mono"
                    >
                      <Zap className="h-3 w-3 shrink-0" />
                      {node}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Duration Matrix selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/5 pt-6 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-white/30">DURATION CONFIGURATIONS</span>
                <div className="flex gap-2 mt-1">
                  {current.durations.map((duration) => (
                    <span
                      key={duration}
                      className="px-3 py-1.5 border border-white/10 bg-white/5 text-white/70 text-[9px] font-bold rounded-sm"
                    >
                      {duration}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action booking portal trigger */}
              <a
                href="#book"
                className="px-6 py-3 border border-amber-500 bg-amber-500 hover:bg-transparent text-black hover:text-amber-500 text-[9px] tracking-widest font-bold uppercase transition-all duration-300 hud-corners flex items-center gap-2 self-start sm:self-auto"
              >
                PROCEED WITH MODULE
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
