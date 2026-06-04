import React from "react";
import { MapPin, HelpCircle } from "lucide-react";

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
    <div id="areas" className="w-full text-left select-none">
      <span className="text-xs font-semibold text-sage uppercase tracking-wider block mb-3">
        Where We Go
      </span>
      <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight mb-8">
        We Come To You.
      </h2>

      <div className="bg-card p-8 rounded-2xl border border-border shadow-soft w-full">
        {/* Intro */}
        <p className="text-sm text-charcoal-muted mb-6 leading-relaxed font-light">
          Proudly bringing expert mobile massage therapy throughout Calgary and nearby communities:
        </p>

        {/* Calgary Quadrants list */}
        <span className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-4">
          Calgary Quadrants
        </span>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {calgary.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2.5 text-sm text-charcoal-muted font-light"
            >
              <MapPin className="h-4 w-4 text-sage flex-shrink-0" />
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <div className="h-px bg-border my-6" />

        {/* Surrounding Areas */}
        <span className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-4">
          Surrounding Communities
        </span>
        <div className="flex flex-wrap gap-2.5">
          {nearby.map((n) => (
            <span
              key={n}
              className="px-4 py-1.5 bg-soft-blue-light border border-soft-blue/30 text-charcoal text-xs font-semibold rounded-full"
            >
              {n}
            </span>
          ))}
        </div>

        {/* Outside Range Note */}
        <div className="mt-8 flex items-start gap-3 text-xs text-charcoal-muted bg-background p-4 rounded-xl border border-border/50">
          <HelpCircle className="h-4 w-4 text-sage flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed font-light">
            Not sure if we cover your exact neighbourhood?{" "}
            <a
              href="https://wa.me/14039230323"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sage underline hover:text-sage-hover"
            >
              Message us
            </a>{" "}
            — we’re happy to confirm and usually can accommodate.
          </p>
        </div>
      </div>
    </div>
  );
}
