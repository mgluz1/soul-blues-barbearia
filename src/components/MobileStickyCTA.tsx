import { useState, useEffect } from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { BUSINESS_DATA } from '../data/business';

interface MobileStickyCTAProps {
  onOpenBooking: () => void;
}

export const MobileStickyCTA = ({ onOpenBooking }: MobileStickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return isVisible ? (
    <div className="fixed bottom-3 left-3 right-3 z-30 flex items-center gap-2 rounded-lg bg-surface p-2 shadow-lift ring-1 ring-line sm:hidden">
      <button
        onClick={onOpenBooking}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-brass px-4 font-ui text-sm uppercase tracking-[0.1em] text-bg hover:bg-brass-hover active:scale-[0.98]"
        aria-label="Agendar horário na Soul Blues"
      >
        <Calendar className="w-4 h-4 " />
        <span>AGENDAR</span>
      </button>
      <a
        href={BUSINESS_DATA.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-md bg-strong text-body hover:text-ink"
        aria-label="Falar no WhatsApp da Soul Blues"
      >
        <MessageCircle className="w-4 h-4 text-brass" />
      </a>
    </div>
  ) : null;
};
