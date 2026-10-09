import { Clock, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import { useScrollReveal } from '../animations';
import { buttonClasses } from '../utils/button';
import { SectionLabel } from './SectionLabel';
import { BUSINESS_DATA } from '../data/business';

export const Location = () => {
  const containerRef = useScrollReveal();
  const { address, contact, hours } = BUSINESS_DATA;
  return (
    <section id="localizacao" className="relative bg-bg py-20 sm:py-28">
      <div className="shell">
        <div ref={containerRef} className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="flex flex-col gap-8 rounded-xl bg-surface p-6 sm:p-10 lg:col-span-5">
            <div>
              <SectionLabel label="Onde estamos" number="06" className="mb-5" />
              <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl">
                Encontre a
                <br />
                <span className="text-brass">Soul Blues</span>
              </h2>
            </div>
            <div className="grid gap-2">
              <div className="flex items-start gap-4 rounded-lg bg-raised p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-strong text-brass">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="eyebrow text-dim">Endereço</span>
                  <p className="mt-1.5 text-lg font-medium text-ink">{address.street}</p>
                  <p className="text-sm text-body">
                    {address.district}
                    {' — '}
                    {address.city}/{address.state}
                  </p>
                  <p className="mt-1 font-mono text-xs text-dim">
                    {'CEP '}
                    {address.cep}
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-raised p-5">
                <span className="eyebrow flex items-center gap-2 text-dim">
                  <Clock className="h-4 w-4 text-brass" aria-hidden="true" />
                  Horários de atendimento
                </span>
                <dl className="mt-4 grid gap-1">
                  {hours.map((slot) => (
                    <div
                      key={slot.day}
                      className="flex items-center justify-between rounded-sm px-3 py-2.5 odd:bg-strong"
                    >
                      <dt className="text-sm text-body">{slot.day}</dt>
                      <dd className={`font-mono text-sm tabular-nums ${slot.isOpen ? 'text-ink' : 'text-dim'}`}>
                        {slot.hours}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <a
                href={`tel:+${contact.phoneClean}`}
                className="flex items-center gap-4 rounded-lg bg-raised p-5 transition-colors hover:bg-strong"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-strong text-brass">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="eyebrow block text-dim">Telefone / WhatsApp</span>
                  <span className="mt-1 block font-mono text-base text-ink">{contact.phone}</span>
                </span>
              </a>
            </div>
            <a
              href={contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('primary', 'lg', 'mt-auto w-full')}
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Como chegar
              <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
            </a>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-xl bg-raised sm:min-h-[520px] lg:col-span-7 lg:min-h-0">
            <iframe
              title="Mapa de localização da Soul Blues Barbearia no Setor Campinas"
              src={contact.googleMapsEmbedUrl}
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.9)_contrast(0.9)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-surface p-5 shadow-lift sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-xs">
              <span className="eyebrow text-brass">Ponto de referência</span>
              <p className="mt-2 text-base font-medium text-ink">Soul Blues Barbearia</p>
              <p className="text-sm text-mute">
                {address.district}
                {', '}
                {address.city}
                {' - '}
                {address.state}
              </p>
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-brass hover:text-ink"
              >
                Abrir no aplicativo de rotas
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
