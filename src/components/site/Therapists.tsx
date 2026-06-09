import React, { useEffect, useState } from "react";
import { db, Therapist } from "@/lib/db";
import { Check, Heart, Shield } from "lucide-react";

export function Therapists() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  useEffect(() => {
    setTherapists(db.getTherapists());
  }, []);

  if (therapists.length === 0) return null;

  return (
    <section id="therapists" className="w-full py-24 md:py-32 px-6 bg-white/40 border-t border-b border-border/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sage tracking-[0.32em] uppercase text-[11px] font-semibold mb-4">
            Expert RMT Care
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal">
            Meet Our <span className="text-sage italic font-serif font-medium">Therapists</span>
          </h2>
          <p className="mt-5 text-charcoal-muted text-[15px] max-w-xl mx-auto">
            Certified, Registered Massage Therapists committed to your comfort, recovery, and long-term wellbeing in Calgary.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-stretch">
          {therapists.map((t) => (
            <div
              key={t.id}
              className="flex flex-col md:flex-row gap-8 md:gap-10 bg-white border border-border rounded-3xl p-6 md:p-8 shadow-soft hover:shadow-premium transition-all duration-500 relative overflow-hidden group"
            >
              {/* Photo */}
              <div className="w-full md:w-2/5 shrink-0">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-soft border border-border bg-soft-blue-light/20">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    onError={(e) => {
                      // fallback to standard user avatar icon/placeholder if photo fails to load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-60 mix-blend-multiply" />
                </div>
              </div>

              {/* Text info */}
              <div className="flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h3 className="font-display text-2xl font-bold text-charcoal leading-tight">
                      {t.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 bg-sage/10 text-sage border border-sage/15 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                      <Shield className="h-2.5 w-2.5" /> Registered RMT
                    </span>
                  </div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-charcoal-muted mb-4">
                    {t.title}
                  </p>
                  <p className="text-[14.5px] leading-[1.8] text-charcoal-muted/90 font-light mb-6">
                    {t.bio}
                  </p>

                  {/* Focus areas */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal-muted">
                      Areas of Focus:
                    </p>
                    <ul className="grid grid-cols-1 gap-2">
                      {t.focus.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs text-charcoal/80 font-medium">
                          <Check className="h-3.5 w-3.5 text-sage shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Treatment style */}
                <div className="pt-4 border-t border-border/60">
                  <div className="flex items-start gap-3 bg-sage-light/60 border border-sage/10 p-3.5 rounded-xl">
                    <Heart className="h-4 w-4 text-sage shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-sage font-extrabold mb-0.5">Treatment Style:</span>
                      <p className="text-xs text-charcoal/70 font-medium italic leading-relaxed">
                        {t.style}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
