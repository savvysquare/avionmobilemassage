import React, { useState } from "react";
import { Phone, ShieldCheck, MessageCircle, Send, CheckCircle, Activity } from "lucide-react";

const services = [
  "Therapeutic Massage",
  "Deep Tissue Massage",
  "Relaxation Massage",
  "Prenatal Massage",
  "Corporate Wellness",
];

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedLength, setSelectedLength] = useState("60");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full h-full min-h-screen relative flex items-center justify-center bg-black px-6 md:px-12 py-24 select-none font-mono">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="flex items-center gap-2 text-amber-500 glow-text-gold text-[10px] tracking-widest font-bold mb-2">
            <Activity className="h-3.5 w-3.5" />
            <span>SESSION INITIATION // SECT_05</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans uppercase">
            RESERVE MODULE
          </h2>

          <p className="text-xs text-white/50 leading-relaxed font-sans max-w-sm">
            Transmit your biomechanical parameters to prepare therapist dispatch. We direct bill
            standard insurance policies across major providers.
          </p>

          {/* Contact coordinates */}
          <div className="hud-panel p-5 border border-white/10 hud-corners rounded-sm max-w-sm">
            <span className="text-[8px] text-white/30 block mb-3">
              [MANUAL COMMUNICATIONS STREAM]
            </span>

            <div className="flex flex-col gap-3">
              <a
                href="tel:+14039230323"
                className="flex items-center gap-3 text-sm font-sans font-bold text-white hover:text-amber-500 transition-colors"
              >
                <Phone className="h-4 w-4 text-amber-500" />
                <span>+1 (403) 923-0323</span>
              </a>

              <a
                href="https://wa.me/14039230323"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm font-sans font-bold text-white hover:text-emerald-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                <span>WHATSAPP SUPPORT</span>
              </a>
            </div>
          </div>

          <span className="text-[8px] text-white/20 uppercase tracking-widest">
            * SCHEDULING VERIFICATIONS TRANSMITTED WITHIN 120 MINUTES.
          </span>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 w-full">
          <div className="hud-panel p-6 md:p-8 border border-white/10 hud-corners hud-corners-active">
            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <CheckCircle className="h-8 w-8 text-emerald-500 glow-text-green" />
                </div>

                <h3 className="text-xl font-bold font-sans text-white tracking-wide uppercase">
                  TRANSMISSION SUCCESSFUL
                </h3>

                <p className="mt-4 text-xs text-white/50 max-w-sm mx-auto leading-relaxed font-sans">
                  Session data parsed. Standby for dispatch validation coordinates via email or
                  mobile text.
                </p>

                <a
                  href="https://wa.me/14039230323"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 px-6 py-3 border border-amber-500 bg-amber-500 hover:bg-transparent text-black hover:text-amber-500 text-[9px] tracking-widest font-bold uppercase transition-all duration-300 hud-corners"
                >
                  OPEN DIRECT CHANNEL
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex justify-between items-center sm:col-span-2 text-[8px] text-white/30 border-b border-white/5 pb-3 mb-2">
                  <span>[AMM CONVERSION APPLICATION]</span>
                  <span className="text-amber-500 glow-text-gold">READY FOR DATA</span>
                </div>

                <Field label="FIRST NAME" name="first" required />
                <Field label="LAST NAME" name="last" required />
                <Field label="EMAIL COORDINATE" name="email" type="email" required />
                <Field label="MOBILE PHONE" name="phone" type="tel" required />

                <div className="sm:col-span-2">
                  <Field label="PHYSICAL DELIVERY ADDRESS" name="address" required />
                </div>

                {/* Service Selector HUD Badges */}
                <div className="sm:col-span-2 flex flex-col gap-2 mt-2">
                  <label className="text-[9px] text-white/40 tracking-wider font-bold">
                    SELECT MODULE
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => {
                      const active = selectedService === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedService(s)}
                          className={`px-3 py-1.5 border text-[9px] font-bold rounded-sm uppercase transition-all duration-300 ${
                            active
                              ? "border-amber-500 bg-amber-500/10 text-white shadow-[0_0_8px_rgba(245,158,11,0.2)]"
                              : "border-white/10 bg-white/5 text-white/50 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Duration select */}
                <div className="sm:col-span-2 flex flex-col gap-2 mt-2">
                  <label className="text-[9px] text-white/40 tracking-wider font-bold">
                    DURATION SELECT
                  </label>
                  <div className="flex gap-2">
                    {["60", "90"].map((l) => {
                      const active = selectedLength === l;
                      return (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setSelectedLength(l)}
                          className={`px-4 py-2 border text-[9px] font-bold rounded-sm uppercase transition-all duration-300 ${
                            active
                              ? "border-emerald-500 bg-emerald-500/10 text-white shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                              : "border-white/10 bg-white/5 text-white/50 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {l} MINUTES
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field label="INSURANCE PROVIDER (OPTIONAL)" name="insurance" />
                <Field
                  label="SYMPTOM NOTES (OPTIONAL)"
                  name="notes"
                  placeholder="e.g. chronic lumber tightness"
                />

                <div className="sm:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="w-full py-4 border border-amber-500 bg-amber-500 hover:bg-transparent text-black hover:text-amber-500 text-[10px] tracking-widest font-bold uppercase transition-all duration-300 hud-corners flex items-center justify-center gap-2"
                  >
                    SUBMIT CONVERSION CONFIGURATION
                    <Send className="h-3.5 w-3.5" />
                  </button>
                  <p className="mt-3 text-[8px] text-white/30 text-center uppercase tracking-widest">
                    SYSTEM SECURED BY DIRECT INSURANCE RESOLUTION STREAM.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
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
    <label className="flex flex-col gap-1.5 text-left font-mono">
      <span className="text-[9px] text-white/40 tracking-wider font-bold">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 focus:border-amber-500/60 rounded-sm px-4 py-2.5 text-xs text-white placeholder-white/25 focus:outline-none transition-all"
        style={{ backdropFilter: "blur(8px)" }}
      />
    </label>
  );
}
