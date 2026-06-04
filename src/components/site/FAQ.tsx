import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "Do I need a massage table?",
    a: "No. We bring a professional table, linens, and everything else required.",
  },
  {
    q: "Do you offer direct billing?",
    a: "Yes — we direct bill many extended health insurance providers. Coverage varies by plan, so we recommend checking with your insurer. If direct billing isn’t available, we provide an official receipt for reimbursement.",
  },
  {
    q: "How long are appointments?",
    a: "We offer 60-minute and 90-minute sessions.",
  },
  {
    q: "What areas do you serve?",
    a: "All of Calgary plus Airdrie, Cochrane, and Chestermere.",
  },
  {
    q: "What should I wear?",
    a: "Whatever feels comfortable. Your therapist will discuss preferences and ensure you’re always properly draped and at ease.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We kindly ask for at least 48 hours’ notice for cancellations. Appointments cancelled with less notice may be subject to a fee. This helps us keep time available for other clients.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="w-full text-left select-none">
      <span className="text-xs font-semibold text-sage uppercase tracking-wider block mb-3">
        Common Questions
      </span>
      <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight mb-8">
        Frequently Asked Questions
      </h2>

      <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-soft w-full">
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={f.q}
                className={`border rounded-xl transition-all duration-300 ${
                  isOpen
                    ? "border-sage bg-sage-light/20"
                    : "border-border bg-background hover:border-sage/40"
                }`}
              >
                {/* Trigger Question bar */}
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between p-5 text-left font-sans font-medium text-sm sm:text-md text-charcoal focus:outline-none"
                >
                  <span className={isOpen ? "text-sage font-semibold" : "text-charcoal"}>
                    {f.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-sage flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-charcoal-muted flex-shrink-0" />
                  )}
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-border/50" : "max-h-0"
                  }`}
                >
                  <div className="p-5 text-sm text-charcoal-muted leading-relaxed font-light">
                    {f.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
