import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "Do I need a massage table?",
    a: "No. We bring a professional massage table, fresh linens, organic massage oils, and all required therapy supplies. You just need to open the door and provide a clear workspace (approx. 10x10 ft).",
  },
  {
    q: "Do you offer direct billing?",
    a: "Yes. We direct bill most extended health insurance providers in Canada. Coverage limits depend on your specific policy. If direct billing fails, we issue an official RMT receipt for manual reimbursement.",
  },
  {
    q: "How long are appointments?",
    a: "Standard treatment configurations are 60-minute and 90-minute modules. For corporate events, sessions can be customized from 15 to 30 minutes per workstation.",
  },
  {
    q: "What areas do you serve?",
    a: "All quadrants within Calgary city limits, plus surrounding municipalities: Airdrie, Cochrane, and Chestermere.",
  },
  {
    q: "What should I wear?",
    a: "Whatever feels comfortable. Your therapist will discuss treatment preferences and verify your comfort parameters. You will be professionally draped under a sheet at all times.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We require at least 48 hours' notice for cancellations. Late cancellations are subject to fee parameters to support scheduling availability.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full font-mono text-left select-none">
      <div className="flex items-center gap-2 text-amber-500 glow-text-gold text-[10px] tracking-widest font-bold mb-2">
        <HelpCircle className="h-3.5 w-3.5" />
        <span>OPERATIONAL PROTOCOLS // CH_04B</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans uppercase mb-6">
        DIAGNOSTIC FAQ
      </h2>

      <div className="hud-panel p-6 border border-white/10 hud-corners w-full">
        <div className="flex justify-between items-center text-[8px] text-white/30 border-b border-white/5 pb-3 mb-4">
          <span>[SYSTEM DIRECTORY & Q&A QUERY]</span>
          <span>TOTAL SECTORS: 06</span>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={f.q}
                className={`border transition-all duration-300 ${
                  isOpen
                    ? "border-amber-500/30 bg-amber-500/[0.01]"
                    : "border-white/5 hover:border-white/20"
                }`}
              >
                {/* Trigger Question bar */}
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between p-4 text-left font-sans font-bold text-xs sm:text-sm text-white focus:outline-none"
                >
                  <span className={isOpen ? "text-amber-500 glow-text-gold" : "text-white/80"}>
                    {f.q.toUpperCase()}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-amber-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/30" />
                  )}
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[200px] border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <div className="p-4 font-sans text-xs text-white/50 leading-relaxed">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
