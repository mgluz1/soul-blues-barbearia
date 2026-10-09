import { useEffect } from 'react';
import { CircleCheck, ExternalLink, MessageCircle, Smartphone, Sparkles, X } from 'lucide-react';
import { BUSINESS_DATA } from '../data/business';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-booking-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl bg-surface p-6 text-body shadow-lift ring-1 ring-line sm:p-8">
        <div className="absolute inset-x-10 top-0 h-px bg-brass" />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-md bg-strong text-mute transition-colors duration-200 hover:text-ink"
          aria-label="Fechar janela de agendamento"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="mb-6">
          <span className="eyebrow mb-2 block text-brass">AGENDAMENTO OFICIAL</span>
          <h3 id="modal-booking-title" className="pr-12 font-display text-4xl uppercase leading-none text-ink">
            SEU HORÁRIO NA SOUL BLUES
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            Escolha seu canal de preferência. O aplicativo oficial oferece a melhor experiência com confirmação
            imediata.
          </p>
        </div>
        <div className="mb-6 space-y-2">
          <a
            href={BUSINESS_DATA.apps.ios}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-lg bg-raised p-4 transition-colors duration-300 hover:bg-strong"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-strong text-brass">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink group-hover:text-brass transition-colors">
                  Baixar para iPhone (iOS)
                </p>
                <p className="text-xs text-dim">Disponível na Apple App Store</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-dim group-hover:text-ink transition-colors" />
          </a>
          <a
            href={BUSINESS_DATA.apps.android}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-lg bg-raised p-4 transition-colors duration-300 hover:bg-strong"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-strong text-brass">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink group-hover:text-brass transition-colors">
                  Baixar para Android
                </p>
                <p className="text-xs text-dim">Disponível no Google Play</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-dim group-hover:text-ink transition-colors" />
          </a>
          <a
            href={BUSINESS_DATA.contact.whatsappBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-lg bg-raised p-4 transition-colors duration-300 hover:bg-strong"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-strong text-brass">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink group-hover:text-brass transition-colors">
                  Agendar pelo WhatsApp
                </p>
                <p className="text-xs text-dim">
                  {'Atendimento direto: '}
                  {BUSINESS_DATA.contact.phone}
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-dim group-hover:text-ink transition-colors" />
          </a>
        </div>
        <div className="rounded-lg bg-raised p-4">
          <div className="flex items-center gap-2 mb-2 eyebrow text-brass">
            <Sparkles className="w-3.5 h-3.5 text-brass" />
            <span>Vantagens do App Soul Blues</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-body">
            <div className="flex items-center gap-1.5">
              <CircleCheck className="w-3 h-3 text-brass" />
              <span>Lembretes no celular</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CircleCheck className="w-3 h-3 text-brass" />
              <span>Pontos de fidelidade</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CircleCheck className="w-3 h-3 text-brass" />
              <span>Histórico de cortes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CircleCheck className="w-3 h-3 text-brass" />
              <span>Múltiplos serviços</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
