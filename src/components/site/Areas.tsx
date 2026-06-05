import React from "react";
import { MapPin, Navigation } from "lucide-react";

const calgary = [
  "North Calgary",
  "Northwest Calgary",
  "Northeast Calgary",
  "South Calgary",
  "Southwest Calgary",
  "Southeast Calgary",
];

const nearby = [
  { name: "Airdrie", note: "~30 min north" },
  { name: "Cochrane", note: "~30 min west" },
  { name: "Chestermere", note: "~20 min east" },
];

export function Areas() {
  return (
    <div id="areas" className="w-full text-left">
      <p className="text-sage tracking-[0.32em] uppercase text-[11px] font-semibold mb-4">
        Coverage
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] text-charcoal mb-6">
        Areas We <span className="text-sage italic font-serif font-medium">Serve</span>
      </h2>
      <p className="text-charcoal-muted text-[15px] leading-relaxed mb-10 max-w-md">
        Proudly bringing expert mobile massage therapy throughout Calgary and nearby communities.
      </p>

      {/* Calgary zones */}
      <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-charcoal/40 mb-4">
        Calgary — All Quadrants
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {calgary.map((c) => (
          <li key={c} className="flex items-center gap-3 text-[15px] text-charcoal font-medium">
            <span className="w-9 h-9 rounded-full bg-soft-blue-light flex items-center justify-center text-sage shrink-0 shadow-sm">
              <MapPin className="h-4 w-4" />
            </span>
            <span>{c}</span>
          </li>
        ))}
      </ul>

      {/* Nearby communities */}
      <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-charcoal/40 mb-4">
        Nearby Communities
      </p>
      <ul className="flex flex-col gap-3">
        {nearby.map((n) => (
          <li key={n.name} className="flex items-center gap-3 text-[15px] text-charcoal font-medium">
            <span className="w-9 h-9 rounded-full bg-sage-light/70 flex items-center justify-center text-sage shrink-0 shadow-sm">
              <Navigation className="h-4 w-4" />
            </span>
            <span>
              {n.name}
              <span className="ml-2 text-[11px] text-charcoal/45 font-normal">{n.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
