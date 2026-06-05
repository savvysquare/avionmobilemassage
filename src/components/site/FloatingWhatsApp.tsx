import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/14039230323"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-5 lg:bottom-8 lg:right-8 z-40 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sage hover:bg-sage-hover text-white shadow-[0_8px_32px_rgba(184,148,90,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 group"
    >
      {/* Conspicuous pulsing ring glow */}
      <span className="absolute inset-0 rounded-full bg-sage/35 animate-ping opacity-75 pointer-events-none" />

      {/* Admin text tooltip */}
      <span className="absolute right-20 bg-charcoal/95 text-white text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-2 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-soft hidden md:inline-block">
        💬 RMT On Call — Chat Now
      </span>

      <MessageCircle className="h-7 w-7 relative z-10" />
    </a>
  );
}
