import { useState } from "react";
import { Phone, ShieldCheck, MessageCircle } from "lucide-react";

const services = [
  "Therapeutic Massage",
  "Deep Tissue Massage",
  "Relaxation Massage",
  "Prenatal Massage",
  "Corporate Wellness Massage",
];

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState(services[0]);
  const [length, setLength] = useState("60");

  return (
    <section id="book" className="py-24 md:py-32">
      <div className="container-page">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1 text-xs text-sage-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> Direct Billing Available
            </span>
            <h2 className="mt-5 text-3xl md:text-5xl">
              Ready to feel
              <br />
              <span className="italic font-light text-foreground/70">better?</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Professional care from Registered Massage Therapists, delivered to your door. Choose
              your time — we'll handle the rest.
            </p>

            <div className="mt-10 rounded-3xl bg-sage-soft p-6">
              <p className="text-sm text-sage-foreground/80">Prefer to talk?</p>
              <a
                href="tel:+14039230323"
                className="mt-2 flex items-center gap-3 text-2xl font-medium text-foreground"
              >
                <Phone className="h-5 w-5" /> +1 (403) 923-0323
              </a>
              <a
                href="https://wa.me/14039230323"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex btn-pill btn-charcoal hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Limited evening slots this week — book soon.
            </p>
          </div>

          <div className="rounded-3xl bg-card p-6 md:p-10 ring-1 ring-border shadow-card">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage-soft">
                  <ShieldCheck className="h-6 w-6 text-sage-foreground" />
                </div>
                <h3 className="mt-6 text-2xl">Thank you!</h3>
                <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
                  We'll confirm your appointment shortly. In the meantime, feel free to message us
                  on WhatsApp.
                </p>
                <a
                  href="https://wa.me/14039230323"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex btn-pill btn-charcoal hover:opacity-90"
                >
                  Open WhatsApp
                </a>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Field label="First Name" name="first" required />
                <Field label="Last Name" name="last" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone (WhatsApp ok)" name="phone" type="tel" required />
                <div className="md:col-span-2">
                  <Field label="Service Address" name="address" required />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-2">Treatment Type</label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setService(s)}
                        className={`btn-pill text-sm px-4 py-2 ring-1 ring-border ${
                          service === s
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-2">Session Length</label>
                  <div className="flex gap-2">
                    {["60", "90"].map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLength(l)}
                        className={`btn-pill px-5 py-2 ring-1 ring-border ${
                          length === l ? "bg-sage text-foreground" : "bg-background"
                        }`}
                      >
                        {l} Minutes
                      </button>
                    ))}
                  </div>
                </div>

                <Field label="Insurance Provider (Optional)" name="insurance" />
                <Field
                  label="Additional Notes (Optional)"
                  name="notes"
                  placeholder="e.g. focus on lower back"
                />

                <div className="md:col-span-2 mt-2">
                  <button
                    type="submit"
                    className="btn-pill btn-charcoal w-full py-4 text-base hover:opacity-90"
                  >
                    Request My Appointment
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground text-center">
                    We'll confirm availability within a few hours via email or text. Direct billing
                    available for most plans.
                  </p>
                </div>
              </form>
            )}
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
    <label className="block">
      <span className="block text-sm text-muted-foreground mb-2">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-full bg-background px-5 py-3 ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-sage"
      />
    </label>
  );
}
