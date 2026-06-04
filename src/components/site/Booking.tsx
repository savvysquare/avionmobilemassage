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
    <section id="book" className="relative py-28 md:py-36 overflow-hidden">
      {/* Deep background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-foreground/5 via-background to-sage/5" />
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-sage/8 blur-[130px] -z-10" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-foreground/5 blur-[100px] -z-10" />

      <div className="container-page">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          {/* Left: info */}
          <div className="lg:sticky lg:top-32">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium mb-6"
              style={{
                background: "rgba(168,181,162,0.15)",
                border: "1px solid rgba(168,181,162,0.3)",
                color: "var(--color-sage-foreground)",
              }}
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Direct Billing Available
            </span>

            <h2 className="text-4xl md:text-5xl leading-tight">
              Ready to feel
              <br />
              <span className="italic font-light text-foreground/55">better?</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Professional care from Registered Massage Therapists, delivered to your door. Choose
              your time — we'll handle the rest.
            </p>

            {/* Contact card */}
            <div className="mt-10 glass-card rounded-3xl p-6">
              <p className="text-sm text-muted-foreground mb-3">Prefer to talk?</p>
              <a
                href="tel:+14039230323"
                className="flex items-center gap-3 text-xl font-semibold text-foreground hover:text-sage-foreground transition-colors"
              >
                <Phone className="h-5 w-5" /> +1 (403) 923-0323
              </a>
              <a
                href="https://wa.me/14039230323"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex btn-pill btn-charcoal hover:opacity-85 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              Limited evening slots this week — book soon.
            </p>
          </div>

          {/* Right: form */}
          <div className="glass-card rounded-3xl p-6 md:p-10">
            {submitted ? (
              <div className="py-16 text-center">
                <div
                  className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full mb-6"
                  style={{
                    background: "rgba(168,181,162,0.2)",
                    border: "1px solid rgba(168,181,162,0.35)",
                  }}
                >
                  <ShieldCheck className="h-7 w-7 text-sage-foreground" />
                </div>
                <h3 className="text-2xl font-semibold">Thank you!</h3>
                <p className="mt-3 text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  We'll confirm your appointment shortly. In the meantime, feel free to message us
                  on WhatsApp.
                </p>
                <a
                  href="https://wa.me/14039230323"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex btn-pill btn-charcoal hover:opacity-85"
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

                {/* Treatment type */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-3">Treatment Type</label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setService(s)}
                        className={`btn-pill text-xs px-4 py-2 ring-1 transition-all ${
                          service === s
                            ? "bg-primary text-primary-foreground ring-primary"
                            : "bg-background/70 text-foreground ring-border hover:ring-sage/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Session length */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-3">Session Length</label>
                  <div className="flex gap-2">
                    {["60", "90"].map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLength(l)}
                        className={`btn-pill px-6 py-2.5 ring-1 transition-all ${
                          length === l
                            ? "bg-sage text-white ring-sage"
                            : "bg-background/70 ring-border hover:ring-sage/50"
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
                    className="btn-pill btn-charcoal w-full py-4 text-base hover:opacity-85 hover:-translate-y-0.5 shadow-[0_6px_24px_rgba(0,0,0,0.18)]"
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
        className="w-full rounded-full bg-background/60 px-5 py-3 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-sage/60 transition-all placeholder:text-muted-foreground/50"
        style={{ backdropFilter: "blur(8px)" }}
      />
    </label>
  );
}
