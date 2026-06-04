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
      <h2 className="font-display text-[36px] md:text-[44px] leading-[1.05] font-extrabold text-charcoal mb-6">
        Areas We <span className="text-sage">Serve</span>
      </h2>
      <p className="text-charcoal-muted text-[15px] leading-relaxed mb-8">
        Proudly bringing expert mobile massage therapy throughout Calgary and nearby communities.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {calgary.map((c) => (
          <li key={c} className="flex items-center gap-3 text-[15px] text-charcoal">
            <MapPin className="h-4 w-4 text-sage flex-shrink-0" />
            <span>{c}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2.5">
        {nearby.map((n) => (
          <span
            key={n}
            className="px-4 py-1.5 bg-soft-blue-light text-sage font-display font-semibold text-xs uppercase tracking-wider"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
