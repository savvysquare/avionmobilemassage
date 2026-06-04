import React from "react";
import { MapPin } from "lucide-react";

const calgary = [
  "North Calgary",
  "Northwest Calgary",
  "Northeast Calgary",
  "South Calgary",
  "Southwest Calgary",
  "Southeast Calgary",
];
const nearby = ["Airdrie", "Cochrane", "Chestermere"];

export function Areas() {
  return (
    <div id="areas" className="w-full text-left">
      <p className="text-sage tracking-[0.32em] uppercase text-[11px] font-semibold mb-4">
        Coverage
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] text-charcoal mb-6">
        Areas We <span className="text-sage italic font-serif font-medium">Serve</span>
      </h2>
      <p className="text-charcoal-muted text-[15px] leading-relaxed mb-8 max-w-md">
        Proudly bringing expert mobile massage therapy throughout Calgary and nearby communities.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {calgary.map((c) => (
          <li key={c} className="flex items-center gap-3 text-[15px] text-charcoal">
            <span className="w-8 h-8 rounded-full bg-soft-blue-light flex items-center justify-center text-sage">
              <MapPin className="h-3.5 w-3.5" />
            </span>
            <span>{c}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2.5">
        {nearby.map((n) => (
          <span
            key={n}
            className="px-4 py-1.5 bg-white border border-sage/30 text-sage font-display font-semibold text-[11px] uppercase tracking-[0.22em] rounded-full"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
