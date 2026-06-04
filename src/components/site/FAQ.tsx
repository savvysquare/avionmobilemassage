import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  { q: "What areas do you serve?", a: "All of Calgary plus Airdrie, Cochrane, and Chestermere." },
  {
    q: "What should I wear?",
    a: "Whatever feels comfortable. Your therapist will discuss preferences and ensure you're always properly draped and at ease.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We kindly ask for at least 48 hours' notice for cancellations. Appointments cancelled with less notice may be subject to a fee. This helps us keep time available for other clients.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-surface-muted/60">
      <div className="container-page grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-sage-foreground/80">FAQ</span>
          <h2 className="mt-4 text-3xl md:text-5xl">
            Good to
            <br />
            <span className="italic font-light text-foreground/70">know.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-sm">
            Quick answers about how it works, billing, and what to expect.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left text-lg py-6 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
