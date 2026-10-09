import { Calendar, MessageCircle } from 'lucide-react';
import { useScrollReveal, useTextReveal, useMagnetic } from '../animations';
import { buttonClasses } from '../utils/button';
import { Media } from './Media';
import { BUSINESS_DATA } from '../data/business';

interface CTAProps {
  onOpenBooking: () => void;
}

export const CTA = ({ onOpenBooking }: CTAProps) => {
  const cardRef = useScrollReveal();
  const headlineRef = useTextReveal();
  const primaryCtaRef = useMagnetic({ strength: 0.18, maxDistance: 7 });
  const secondaryCtaRef = useMagnetic({ strength: 0.18, maxDistance: 7 });
  return (
    <section className="relative bg-bg py-10 sm:py-16">
      <div className="shell">
        <div
          ref={cardRef}
          className="grid grid-cols-1 gap-2 rounded-xl bg-raised p-2 shadow-card sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:grid-cols-12"
        >
          <Media
            src="/images/cortes/degrade-navalhado.webp"
            alt="Cliente com degradê recém-finalizado na Soul Blues"
            overscan={false}
            className="aspect-[16/10] rounded-lg sm:aspect-auto sm:min-h-[320px] lg:col-span-4"
            imgClassName="object-[50%_12%]"
          />
          <div className="flex flex-col justify-center p-5 sm:p-10 lg:col-span-8 lg:px-14">
            <span className="eyebrow text-brass">Renove seu visual</span>
            <h2
              ref={headlineRef}
              className="mt-4 font-display text-[clamp(3rem,6vw,6rem)] uppercase leading-[0.9] text-ink text-balance"
            >
              Pronto para o próximo corte?
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                ref={primaryCtaRef}
                type="button"
                onClick={onOpenBooking}
                className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Agendar agora
              </button>
              <a
                ref={secondaryCtaRef}
                href={BUSINESS_DATA.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses('secondary', 'lg', 'w-full sm:w-auto')}
              >
                <MessageCircle className="h-4 w-4 text-brass" aria-hidden="true" />
                Falar no WhatsApp
              </a>
              <p className="text-sm text-mute sm:ml-2">Seu próximo horário está a poucos cliques.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
