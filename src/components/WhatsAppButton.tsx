import { site } from "@/lib/content";
import { WhatsAppIcon } from "./ui/icons";

export function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 z-[120] inline-flex items-center gap-2.5 rounded-full bg-whatsapp py-[14px] pl-[18px] pr-[22px] text-[13px] font-bold uppercase tracking-[0.6px] text-whatsapp-ink shadow-[0_14px_34px_rgba(12,40,22,0.32)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_20px_40px_rgba(12,40,22,0.4)]"
    >
      <WhatsAppIcon size={18} />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
