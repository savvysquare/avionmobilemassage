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
    <section id="faq" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-surface-muted/70 via-background to-surface-muted/40" />
      <div className="absolute top-1/4 left-0 h-[400px] w-[400px] rounded-full bg-sage/5 blur-[120px] -z-10" />

      <div className="container-page grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
        {/* Left column */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-sage-foreground font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl leading-tight">
            Good to
            <br />
            <span className="italic font-light text-foreground/55">know.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-sm">
            Quick answers about how it works, billing, and what to expect.
          </p>
          <a
            href="#book"
            className="mt-8 inline-flex btn-pill btn-charcoal hover:opacity-85 hover:-translate-y-0.5"
          >
            Book a Session
          </a>
        </div>

        {/* Accordion */}
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b border-border/60 last:border-0"
              >
                <AccordionTrigger className="text-left text-base font-medium py-5 hover:no-underline hover:text-sage-foreground transition-colors">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
