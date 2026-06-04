import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/14039230323"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 lg:bottom-6 lg:right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage hover:bg-sage-hover text-white shadow-premium transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
