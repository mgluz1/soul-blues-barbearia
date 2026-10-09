import { ExternalLink } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_DATA } from '../data/business';

export const FOOTER_LINK = 'inline-flex items-center gap-1.5 text-sm text-body transition-colors hover:text-ink';
interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer = ({ onOpenBooking }: FooterProps) => (
  <footer className="relative bg-bg pb-28 pt-6 sm:pb-12">
    <div className="shell">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="flex gap-5 rounded-lg bg-surface p-6 sm:p-8 md:col-span-12 lg:col-span-5">
          <Logo className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />
          <div>
            <p className="eyebrow text-brass">Barbearia · Goiânia / GO</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">
              Cortes, barba e cuidados masculinos no coração do Setor Campinas. Tradição, estética contemporânea e
              facilidade de agendamento.
            </p>
            <a
              href={`tel:+${BUSINESS_DATA.contact.phoneClean}`}
              className="mt-4 block font-mono text-sm text-ink hover:text-brass"
            >
              {BUSINESS_DATA.contact.phone}
            </a>
          </div>
        </div>
        <div className="rounded-lg bg-surface p-6 sm:p-8 md:col-span-5 lg:col-span-3">
          <h4 className="eyebrow text-ink">Atendimento</h4>
          <ul className="mt-5 space-y-3">
            <li>
              <button type="button" onClick={onOpenBooking} className={FOOTER_LINK}>
                Agendar horário
              </button>
            </li>
            <li>
              <a
                href={BUSINESS_DATA.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK}
              >
                Falar no WhatsApp
                <ExternalLink className="h-3 w-3 text-dim" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={BUSINESS_DATA.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK}
              >
                Google Maps
                <ExternalLink className="h-3 w-3 text-dim" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-lg bg-surface p-6 sm:p-8 md:col-span-7 lg:col-span-4">
          <h4 className="eyebrow text-ink">Aplicativo Soul Blues</h4>
          <p className="mt-4 text-sm leading-relaxed text-mute">
            Baixe o aplicativo para Android ou iOS e tenha histórico de atendimentos, agendamentos 24h e pontos de
            fidelidade.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <a
              href={BUSINESS_DATA.apps.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-md bg-raised px-4 py-3 transition-colors hover:bg-strong"
            >
              <span className="text-xs text-dim">iPhone</span>
              <span className="text-sm text-ink">App Store</span>
            </a>
            <a
              href={BUSINESS_DATA.apps.android}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-md bg-raised px-4 py-3 transition-colors hover:bg-strong"
            >
              <span className="text-xs text-dim">Android</span>
              <span className="text-sm text-ink">Play Store</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center justify-between gap-2 px-2 text-center text-xs text-dim sm:flex-row sm:text-left">
        <span>{BUSINESS_DATA.fullAddress}</span>
        <span>
          {'© '}
          {/* @__PURE__ */ new Date().getFullYear()}
          {' Soul Blues Barbearia. Todos os direitos reservados.'}
        </span>
      </div>
    </div>
  </footer>
);
