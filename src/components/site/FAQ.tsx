import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Do I need a massage table?",
    a: "No. We bring a professional table, linens, and everything else required.",
  },
  {
    q: "Do you offer direct billing?",
    a: "Yes — we direct bill many extended health insurance providers. Coverage varies by plan, so we recommend checking with your insurer. If direct billing isn't available, we provide an official receipt for reimbursement.",
  },
  { q: "How long are appointments?", a: "We offer 60-minute and 90-minute sessions." },
  {
    q: "What areas do you serve?",
    a: "All of Calgary plus Airdrie, Cochrane, and Chestermere.",
  },
  {
    q: "What should I wear?",
    a: "Whatever feels comfortable. Your therapist will discuss preferences and ensure you're always properly draped and at ease.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We kindly ask for at least 48 hours' notice for cancellations. Appointments cancelled with less notice may be subject to a fee.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div id="faq" className="w-full text-left">
      <h2 className="font-display text-[36px] md:text-[44px] leading-[1.05] font-extrabold text-charcoal mb-8">
        Frequently <span className="text-sage">Asked</span>
      </h2>
      <div className="flex flex-col">
        {faqs.map((f, i) => {
          const open = openIndex === i;
          return (
            <div key={f.q} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span
                  className={`font-display text-[17px] font-semibold ${
                    open ? "text-sage" : "text-charcoal"
                  }`}
                >
                  {f.q}
                </span>
                {open ? (
                  <Minus className="h-5 w-5 text-sage flex-shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 text-charcoal-muted flex-shrink-0" />
                )}
              </button>
              {open && (
                <p className="pb-5 text-[15px] text-charcoal-muted leading-relaxed">{f.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
