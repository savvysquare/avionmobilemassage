import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, Send, CheckCircle, AlertCircle } from "lucide-react";

const services = [
  "Therapeutic Massage",
  "Deep Tissue Massage",
  "Relaxation Massage",
  "Prenatal Massage",
  "Corporate Wellness Massage",
];

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedLength, setSelectedLength] = useState("60 Minutes");
  const [hasWhatsApp, setHasWhatsApp] = useState(true);

  // Listen to select-service custom event from Services list
  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && services.includes(customEvent.detail)) {
        setSelectedService(customEvent.detail);
      } else if (customEvent.detail && customEvent.detail === "Corporate Wellness") {
        setSelectedService("Corporate Wellness Massage");
      }
      const target = document.querySelector("#book");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("select-service", handleSelectService);
    return () => window.removeEventListener("select-service", handleSelectService);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book" className="w-full py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Booking Info & Urgency */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-24 text-left">
            <div>
              <span className="text-xs font-semibold text-sage uppercase tracking-wider block mb-3">
                Book An Appointment
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal tracking-tight leading-tight">
                Ready to Feel Better? <br className="hidden md:inline" />
                Book Your Mobile Massage Today.
              </h2>
              <p className="mt-6 text-charcoal-muted text-sm sm:text-md leading-relaxed font-light">
                Professional care from Registered Massage Therapists, delivered to your door in
                minutes. Choose your time — we’ll handle the rest.
              </p>
            </div>

            {/* Urgency Callout */}
            <div className="flex items-center gap-3 px-5 py-4 bg-sage-light border border-sage/20 rounded-lg text-charcoal">
              <AlertCircle className="h-5 w-5 text-sage shrink-0" />
              <span className="text-xs font-medium">
                Limited evening slots this week — book soon.
              </span>
            </div>

            {/* Direct Billing Badge */}
            <div className="p-6 bg-background rounded-lg border border-border/80 flex flex-col gap-4">
              <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                Direct Billing Available
              </span>
              <p className="text-xs text-charcoal-muted font-light leading-relaxed">
                We direct bill many extended health insurance providers. Coverage varies by plan, so
                we recommend checking with your insurer.
              </p>
            </div>

            {/* Alternative booking coordinates */}
            <div>
              <span className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-4">
                Prefer to talk?
              </span>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+14039230323"
                  className="flex items-center gap-3 px-5 py-3 border border-border hover:bg-sage-light hover:border-sage/30 rounded-lg text-xs font-semibold text-charcoal transition-all duration-200"
                >
                  <Phone className="h-4 w-4 text-sage" />
                  <span>Call +1 (403) 923-0323</span>
                </a>

                <a
                  href="https://wa.me/14039230323"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-5 py-3 border border-border hover:bg-sage-light hover:border-sage/30 rounded-lg text-xs font-semibold text-charcoal transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>WhatsApp +1 (403) 923-0323</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form Panel */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-card p-6 md:p-10 rounded-lg border border-border shadow-premium">
              {submitted ? (
                <div className="py-16 text-center flex flex-col items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-sage-light flex items-center justify-center mb-6 text-sage">
                    <CheckCircle className="h-8 w-8" />
                  </div>

                  <h3 className="text-2xl font-semibold text-charcoal tracking-tight">
                    Request Received
                  </h3>

                  <p className="mt-4 text-sm text-charcoal-muted max-w-sm mx-auto leading-relaxed font-light">
                    Thank you! We’ll confirm your appointment shortly. In the meantime, feel free to
                    message us on WhatsApp.
                  </p>

                  <a
                    href="https://wa.me/14039230323"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-sage hover:bg-sage-hover text-white text-xs font-semibold rounded-lg shadow-soft transition-colors tracking-wider uppercase"
                  >
                    Message on WhatsApp
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
                >
                  <Field label="First Name" name="first" required />
                  <Field label="Last Name" name="last" required />
                  <Field label="Email Address" name="email" type="email" required />

                  <div className="flex flex-col gap-2">
                    <Field label="Phone Number" name="phone" type="tel" required />
                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                      <input
                        type="checkbox"
                        checked={hasWhatsApp}
                        onChange={(e) => setHasWhatsApp(e.target.checked)}
                        className="rounded border-border text-sage focus:ring-sage"
                      />
                      <span className="text-[11px] text-charcoal-muted">
                        My phone has WhatsApp option
                      </span>
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <Field label="Service Address (we come to you)" name="address" required />
                  </div>

                  {/* Service Selector Grid */}
                  <div className="sm:col-span-2 flex flex-col gap-3">
                    <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                      Treatment Type
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => {
                        const active = selectedService === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedService(s)}
                            className={`px-4 py-2 border text-xs font-medium rounded-lg transition-all duration-200 ${
                              active
                                ? "border-sage bg-sage text-white shadow-soft"
                                : "border-border bg-background text-charcoal-muted hover:border-sage/50 hover:text-charcoal"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Duration selector */}
                  <div className="sm:col-span-2 flex flex-col gap-3">
                    <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                      Session Length
                    </span>
                    <div className="flex gap-2">
                      {["60 Minutes", "90 Minutes"].map((l) => {
                        const active = selectedLength === l;
                        return (
                          <button
                            key={l}
                            type="button"
                            onClick={() => setSelectedLength(l)}
                            className={`px-5 py-2.5 border text-xs font-medium rounded-lg transition-all duration-200 ${
                              active
                                ? "border-sage bg-sage text-white shadow-soft"
                                : "border-border bg-background text-charcoal-muted hover:border-sage/50 hover:text-charcoal"
                            }`}
                          >
                            {l}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Field label="Insurance Provider (Optional)" name="insurance" />
                  <Field
                    label="Additional Notes (Optional)"
                    name="notes"
                    placeholder="e.g. Focus on lower back and shoulders"
                  />

                  <div className="sm:col-span-2 mt-6">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-4 bg-sage hover:bg-sage-hover text-white text-xs font-semibold rounded-lg shadow-soft hover:shadow-premium transition-all duration-200 uppercase tracking-wider"
                    >
                      Request My Appointment
                      <Send className="h-4 w-4" />
                    </button>
                    <p className="mt-4 text-[11px] text-charcoal-muted text-center font-light leading-relaxed">
                      We’ll confirm availability within a few hours via email or text. Direct
                      billing available for most plans.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 w-full">
      <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-background border border-border focus:border-sage focus:ring-1 focus:ring-sage rounded-lg px-4 py-3 text-sm text-charcoal placeholder-charcoal-muted/30 focus:outline-none transition-all"
      />
    </label>
  );
}
