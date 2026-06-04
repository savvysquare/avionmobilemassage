import React, { useState } from "react";
import { CheckCircle, Phone, Mail, MessageCircle } from "lucide-react";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book" className="w-full py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background blob */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-50 pointer-events-none"
        style={{ background: "radial-gradient(circle, #fde8d4 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-5xl relative">
        <div className="text-center mb-14">
          <h2 className="font-display text-[44px] md:text-[56px] leading-[1.05] font-extrabold text-charcoal">
            Contact <span className="text-sage">Avion</span>
          </h2>
          <p className="mt-4 text-charcoal-muted text-[15px] leading-relaxed max-w-2xl mx-auto">
            Ready to feel better? Send us a message and we'll confirm your appointment shortly.
          </p>
        </div>

        {submitted ? (
          <div className="py-16 text-center flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-soft-blue-light flex items-center justify-center mb-6 text-sage">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="font-display text-3xl font-extrabold text-charcoal">
              Request <span className="text-sage">Received</span>
            </h3>
            <p className="mt-4 text-[15px] text-charcoal-muted max-w-sm">
              Thank you! We'll confirm your appointment shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone No" name="phone" type="tel" required />
            <Field label="Service Address" name="address" required />
            <div className="md:col-span-2">
              <Field label="Comments" name="comments" placeholder="" multiline />
            </div>
            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-10 py-4 bg-sage hover:bg-sage-hover text-white font-display font-semibold text-sm uppercase tracking-wider transition-all duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        )}

        {/* Contact info row */}
        <div className="mt-20 pt-12 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <a href="tel:+14039230323" className="flex flex-col items-center gap-2 group">
            <Phone className="h-6 w-6 text-sage" />
            <span className="font-display font-semibold text-charcoal group-hover:text-sage transition-colors">
              +1 (403) 923-0323
            </span>
            <span className="text-xs text-charcoal-muted">Call us</span>
          </a>
          <a
            href="https://wa.me/14039230323"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <MessageCircle className="h-6 w-6 text-sage" />
            <span className="font-display font-semibold text-charcoal group-hover:text-sage transition-colors">
              WhatsApp
            </span>
            <span className="text-xs text-charcoal-muted">+1 (403) 923-0323</span>
          </a>
          <a
            href="mailto:avionmobilemassage@outlook.com"
            className="flex flex-col items-center gap-2 group"
          >
            <Mail className="h-6 w-6 text-sage" />
            <span className="font-display font-semibold text-charcoal group-hover:text-sage transition-colors break-all">
              avionmobilemassage@outlook.com
            </span>
            <span className="text-xs text-charcoal-muted">Email us</span>
          </a>
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
  multiline,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-display text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
        {label}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          className="w-full bg-transparent border-0 border-b border-border focus:border-sage focus:ring-0 px-0 py-2 text-[15px] text-charcoal placeholder-charcoal-muted/40 outline-none transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className="w-full bg-transparent border-0 border-b border-border focus:border-sage focus:ring-0 px-0 py-2 text-[15px] text-charcoal placeholder-charcoal-muted/40 outline-none transition-colors"
        />
      )}
    </label>
  );
}
