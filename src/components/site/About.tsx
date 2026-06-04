import React, { useState } from "react";
import aboutImg from "@/assets/about-client.jpg";
import { Activity, ShieldCheck, Heart, UserCheck, Flame } from "lucide-react";

interface Hotspot {
  id: string;
  name: string;
  top: string;
  left: string;
  relief: string;
  description: string;
}

const hotspots: Hotspot[] = [
  {
    id: "cervical",
    name: "CERVICAL REGION [TENSION_HIGH]",
    top: "30%",
    left: "50%",
    relief: "Suboccipital Release",
    description: "Soothes chronic desk posture strains and recurring tension headaches.",
  },
  {
    id: "thoracic",
    name: "THORACIC COMPRESSION [PRESSURE_MED]",
    top: "45%",
    left: "48%",
    relief: "Scapular Mobilization",
    description: "Improves shoulder rotation and opens restricted chest mechanics.",
  },
  {
    id: "lumbar",
    name: "LUMBAR INFLAMMATION [STRESS_CRITICAL]",
    top: "62%",
    left: "52%",
    relief: "Myofascial Decompression",
    description: "Alleviates lower back strains and enhances core spinal elasticity.",
  },
];

const pillars = [
  {
    title: "PARASYMPATHETIC SETUP",
    desc: "Mobile therapy removes transport friction, keeping heart rate and cortisol levels optimized post-treatment.",
    icon: Heart,
  },
  {
    title: "CLINICAL LICENSURE",
    desc: "100% RMT certified therapists adhering to strict clinical guidelines and insurance billing protocols.",
    icon: UserCheck,
  },
  {
    title: "BIOME INTEGRATION",
    desc: "Therapy occurs directly within your default sensory environment, facilitating deeper neural recovery.",
    icon: ShieldCheck,
  },
];

export function About() {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const currentHotspot = hotspots[activeHotspot];

  return (
    <div className="w-full h-full min-h-screen relative flex items-center justify-center bg-black px-6 md:px-12 py-24 select-none font-mono">
      <div className="w-full max-w-6xl">
        {/* Title Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-amber-500 glow-text-gold text-[10px] tracking-widest font-bold mb-2">
              <Activity className="h-3.5 w-3.5" />
              <span>THE WELLNESS SCIENCE // SECT_03</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              SOMATIC ENGINEERING
            </h2>
          </div>
          <div className="text-right text-white/40 text-[9px] tracking-widest mt-4 md:mt-0">
            <span>[ANATOMICAL PERFORMANCE CALIBRATION]</span>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Scientific Logs & Pillars */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3 font-sans text-white/70 text-xs leading-relaxed max-w-xl">
              <p>
                Avion approaches wellness through a somatic lens: removing stress obstacles to
                unlock optimal recovery. Standard appointments require coordinate shifts, parking
                stress, and waiting room delays that re-trigger sympathetic nervous responses.
              </p>
              <p>
                By delivering certified Registered Massage Therapists directly to your domain, Avion
                integrates healing into your neural ecosystem. We stabilize your biomechanics where
                you already relax best.
              </p>
            </div>

            {/* Scientific Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="p-4 border border-white/5 bg-white/[0.01] rounded-sm flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-amber-500 font-bold tracking-wider">
                      {p.title}
                    </span>
                    <p.icon className="h-3.5 w-3.5 text-white/40" />
                  </div>
                  <span className="font-sans text-[10px] text-white/50 leading-relaxed">
                    {p.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Anatomical Hotspot Grid */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md hud-panel p-4 border border-white/10 hud-corners hud-corners-active">
              <div className="flex justify-between items-center text-[9px] text-white/30 border-b border-white/5 pb-3 mb-4">
                <span>[BIOMECHANICAL ANALYZER v1.0]</span>
                <span className="text-emerald-500">SYSTEM STABLE</span>
              </div>

              {/* Anatomy Diagram Overlay Wrapper */}
              <div className="relative aspect-[4/5] w-full border border-white/5 bg-black/60 rounded-sm overflow-hidden flex items-center justify-center">
                {/* Background Image styled as holographic mesh */}
                <img
                  src={aboutImg}
                  alt="Anatomy analysis backdrop"
                  className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity filter brightness-75 contrast-125"
                />

                {/* Simulated Radar Sweep */}
                <div className="absolute inset-x-0 h-[2px] bg-amber-500/20 top-0 shadow-[0_0_10px_#f59e0b] animate-[bounce_6s_infinite_linear]" />

                {/* Hotspot buttons */}
                {hotspots.map((h, index) => {
                  const isActive = activeHotspot === index;
                  return (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspot(index)}
                      className="absolute p-2 -translate-x-1/2 -translate-y-1/2 focus:outline-none z-20 group"
                      style={{ top: h.top, left: h.left }}
                    >
                      {/* Pulse Ring */}
                      <span
                        className={`absolute inset-0 rounded-full border transition-all duration-500 ${
                          isActive
                            ? "border-amber-500 bg-amber-500/10 scale-150 animate-ping"
                            : "border-white/20 group-hover:border-white/50 scale-100"
                        }`}
                      />

                      {/* Inner Dot */}
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          isActive
                            ? "bg-amber-500 border-amber-400 shadow-[0_0_8px_#f59e0b]"
                            : "bg-black border-white/30 group-hover:border-white/80"
                        }`}
                      >
                        <div
                          className={`w-1 h-1 rounded-full ${isActive ? "bg-black" : "bg-white/40"}`}
                        />
                      </div>
                    </button>
                  );
                })}

                {/* Side technical overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 border border-white/10 bg-black/80 backdrop-blur-md rounded-sm">
                  <div className="flex items-center gap-1.5 text-[8px] text-amber-500 font-bold mb-1">
                    <Flame className="h-3 w-3 animate-pulse" />
                    <span>{currentHotspot.name}</span>
                  </div>
                  <div className="text-[10px] text-white/90 font-bold font-sans mb-1">
                    RELIEF: {currentHotspot.relief}
                  </div>
                  <p className="text-[9px] text-white/50 font-sans leading-normal">
                    {currentHotspot.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
