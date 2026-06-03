import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/14039230323"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage text-foreground shadow-soft ring-1 ring-black/5 hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
