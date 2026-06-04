import React, { useState } from "react";
import { CheckCircle, Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book" className="w-full py-28 md:py-36 px-6 bg-charcoal text-white relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-[480px] h-[480px] bg-sage rounded-full blur-[120px] opacity-20" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] bg-soft-blue rounded-full blur-[120px] opacity-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-soft-blue tracking-[0.32em] uppercase text-[11px] font-semibold mb-4">
            Get in touch
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-soft-blue">
            Contact <span className="italic font-serif font-medium text-white">Avion</span>
          </h2>
          <p className="mt-5 text-white/50 max-w-xl mx-auto text-[15px]">
            Ready to feel better? Send us a message and we'll confirm your appointment shortly.
          </p>
        </div>

        {submitted ? (
          <div className="py-16 text-center flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-sage/20 flex items-center justify-center mb-6 text-sage">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="font-display text-3xl font-bold text-soft-blue">
              Request <span className="italic font-serif font-medium text-white">Received</span>
            </h3>
            <p className="mt-4 text-[15px] text-white/60 max-w-sm">
              Thank you! We'll confirm your appointment shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Full Name" name="name" placeholder="Jane Doe" required />
            <Field label="Email Address" name="email" type="email" placeholder="jane@example.com" required />
            <Field label="Phone No" name="phone" type="tel" placeholder="(403) 000-0000" required />
            <Field label="Service Address" name="address" placeholder="Street, Calgary" required />
            <div className="md:col-span-2">
              <Field label="How can we help?" name="comments" placeholder="Tell us about your needs…" multiline />
            </div>
            <div className="md:col-span-2 flex justify-center pt-6">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-sage hover:bg-sage-hover text-white pl-10 pr-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.25em] transition-all duration-500 hover:pr-16 hover:shadow-premium active:scale-95 relative overflow-hidden"
              >
                <span>Send Inquiry</span>
                <ArrowRight className="w-4 h-4 absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" />
              </button>
            </div>
          </form>
        )}

        <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <ContactPill icon={Phone} label="Call us" value="+1 (403) 923-0323" href="tel:+14039230323" />
          <ContactPill icon={MessageCircle} label="WhatsApp" value="+1 (403) 923-0323" href="https://wa.me/14039230323" external />
          <ContactPill icon={Mail} label="Email us" value="avionmobilemassage@outlook.com" href="mailto:avionmobilemassage@outlook.com" />
        </div>
      </div>
    </section>
  );
}

function ContactPill({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-soft-blue group-hover:bg-sage group-hover:text-white group-hover:border-sage transition-all">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold">{label}</span>
      <span className="font-display font-medium text-white group-hover:text-soft-blue transition-colors break-all text-[14px]">
        {value}
      </span>
    </a>
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
      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/40 px-4">
        {label}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[15px] text-white placeholder-white/30 outline-none focus:border-sage transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[15px] text-white placeholder-white/30 outline-none focus:border-sage transition-colors"
        />
      )}
    </label>
  );
}
