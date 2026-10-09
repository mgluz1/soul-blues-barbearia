import { Calendar, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useScrollReveal, useTextReveal, useMagnetic } from '../animations';
import { buttonClasses } from '../utils/button';
import { Logo } from './Logo';
import { Media } from './Media';
import { BUSINESS_DATA } from '../data/business';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA = ({ onOpenBooking }: FinalCTAProps) => {
  const cardRef = useScrollReveal();
  const headlineRef = useTextReveal();
  const primaryCtaRef = useMagnetic({ strength: 0.18, maxDistance: 7 });
  const secondaryCtaRef = useMagnetic({ strength: 0.18, maxDistance: 7 });
  return (
    <section className="relative bg-bg pb-10 pt-20 sm:pb-16 sm:pt-28">
      <div className="shell">
        <div ref={cardRef} className="grid grid-cols-1 gap-2 rounded-xl bg-surface p-2 lg:grid-cols-12">
          <div className="order-2 flex flex-col justify-between gap-12 p-6 sm:p-12 lg:order-1 lg:col-span-7 lg:p-16">
            <div className="flex items-center gap-4">
              <Logo className="h-20 w-20 sm:h-24 sm:w-24" />
              <div>
                <span className="eyebrow block text-brass">Soul Blues Barbearia</span>
                <span className="mt-1 block text-sm text-mute">
                  {BUSINESS_DATA.neighborhood}
                  {' · '}
                  {BUSINESS_DATA.city}/{BUSINESS_DATA.state}
                </span>
              </div>
            </div>
            <div>
              <h2
                ref={headlineRef}
                className="font-display text-[clamp(3.5rem,8vw,8rem)] uppercase leading-[0.86] text-ink"
              >
                Seu estilo
                <br />
                <span className="text-brass">começa aqui.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-body sm:text-lg">
                Agende seu próximo horário na Soul Blues.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  ref={primaryCtaRef}
                  type="button"
                  onClick={onOpenBooking}
                  className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Agendar horário
                </button>
                <a
                  ref={secondaryCtaRef}
                  href={BUSINESS_DATA.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses('secondary', 'lg', 'w-full sm:w-auto')}
                >
                  <MessageCircle className="h-4 w-4 text-brass" aria-hidden="true" />
                  Chamar no WhatsApp
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href={`tel:+${BUSINESS_DATA.contact.phoneClean}`}
                className="flex items-center gap-3 rounded-md bg-raised px-5 py-4 transition-colors hover:bg-strong"
              >
                <Phone className="h-4 w-4 text-brass" aria-hidden="true" />
                <span className="font-mono text-sm text-ink">{BUSINESS_DATA.contact.phone}</span>
              </a>
              <a
                href={BUSINESS_DATA.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md bg-raised px-5 py-4 transition-colors hover:bg-strong"
              >
                <MapPin className="h-4 w-4 text-brass" aria-hidden="true" />
                <span className="text-sm text-ink">{BUSINESS_DATA.address.street}</span>
              </a>
            </div>
          </div>
          <Media
            src="/images/marca/exemplo.png"
            alt="Soul Blues Barbearia - Mais que um corte, é sobre atitude"
            overscan={false}
            className="order-1 aspect-[4/5] rounded-lg sm:aspect-[16/10] lg:order-2 lg:col-span-5 lg:aspect-auto lg:min-h-[640px]"
            imgClassName="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};
