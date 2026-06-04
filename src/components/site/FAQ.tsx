import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Do I need a massage table?", a: "No. We bring a professional table, linens, and everything else required." },
  { q: "Do you offer direct billing?", a: "Yes — we direct bill many extended health insurance providers. Coverage varies by plan, so we recommend checking with your insurer. If direct billing isn't available, we provide an official receipt for reimbursement." },
  { q: "How long are appointments?", a: "We offer 60-minute and 90-minute sessions." },
  { q: "What areas do you serve?", a: "All of Calgary plus Airdrie, Cochrane, and Chestermere." },
  { q: "What should I wear?", a: "Whatever feels comfortable. Your therapist will discuss preferences and ensure you're always properly draped and at ease." },
  { q: "What is your cancellation policy?", a: "We kindly ask for at least 48 hours' notice for cancellations. Appointments cancelled with less notice may be subject to a fee." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div id="faq" className="w-full text-left">
      <p className="text-sage tracking-[0.32em] uppercase text-[11px] font-semibold mb-4">
        Questions
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] text-charcoal mb-8">
        Frequently <span className="text-sage italic font-serif font-medium">Asked</span>
      </h2>
      <div className="flex flex-col gap-3">
        {faqs.map((f, i) => {
          const open = openIndex === i;
          return (
            <div
              key={f.q}
              className={`rounded-2xl border transition-all duration-300 ${
                open ? "border-sage/40 bg-white shadow-soft" : "border-border bg-white/40 hover:border-sage/20"
              }`}
            >
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className={`font-display text-[15.5px] font-semibold ${open ? "text-sage" : "text-charcoal"}`}>
                  {f.q}
                </span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${open ? "bg-sage text-white" : "bg-soft-blue-light text-sage"}`}>
                  {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
              {open && (
                <p className="px-5 pb-5 text-[14.5px] text-charcoal-muted leading-[1.75]">{f.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
