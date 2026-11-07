import { contact } from "@/lib/content";
import { WhatsAppIcon } from "./Icons";

/** Floating WhatsApp button, bottom corner opposite the sound button. */
export default function WhatsAppButton({ label, text }: { label: string; text: string }) {
  const href = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="group fixed bottom-5 end-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.65)] transition-transform hover:-translate-y-0.5"
    >
      <span className="wa-ping absolute inset-0 rounded-full bg-[#25D366]" aria-hidden />
      <WhatsAppIcon className="relative h-7 w-7" />
      <span className="relative hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-52 sm:inline">
        {label}
      </span>
    </a>
  );
}
