import { useEffect, useCallback } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface LightboxImageItem {
  id: string;
  title: string;
  category?: string;
  desc?: string;
  src: string | string[];
  alt: string;
}
interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxImageItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onOpenBooking?: () => void;
}

export const ImageLightbox = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
  onOpenBooking,
}: ImageLightboxProps) => {
  const item = items[currentIndex];
  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);
  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, goPrev, goNext]);
  if (!isOpen || !item) return null;
  const imageSrc = Array.isArray(item.src) ? item.src[0] : item.src;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 select-none transition-all duration-300 p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização em alta definição: ${item.title}`}
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-3">
          {item.category && (
            <span className="eyebrow rounded-sm bg-strong px-3 py-1.5 text-brass">{item.category}</span>
          )}
          <span className="rounded-sm bg-strong px-2.5 py-1 font-mono text-xs uppercase text-mute">FORMATO 1:1</span>
          <span className="text-xs sm:text-sm font-mono text-mute">
            {String(currentIndex + 1).padStart(2, '0')}
            {' / '}
            {String(items.length).padStart(2, '0')}
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-md bg-strong text-body transition-colors hover:bg-[#1b1b1b] hover:text-ink cursor-pointer"
          aria-label="Fechar visualizador"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {items.length > 1 && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 sm:left-6 z-20 rounded-md bg-strong p-3 text-ink/70 transition-colors hover:bg-[#1b1b1b] hover:text-ink active:scale-95 cursor-pointer sm:p-4"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}
      {items.length > 1 && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          className="absolute right-2 sm:right-6 z-20 rounded-md bg-strong p-3 text-ink/70 transition-colors hover:bg-[#1b1b1b] hover:text-ink active:scale-95 cursor-pointer sm:p-4"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}
      <div
        className="relative z-10 flex flex-col items-center justify-center max-w-5xl max-h-[85vh] w-full"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-lg bg-surface shadow-lift max-h-[72vh] flex items-center justify-center">
          <img
            src={imageSrc}
            alt={item.alt}
            className="w-auto h-auto max-h-[70vh] max-w-[90vw] object-contain transition-all duration-300"
          />
        </div>
        <div className="w-full max-w-2xl mt-3 rounded-lg bg-surface px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <h3 className="font-display text-2xl uppercase leading-none text-ink">{item.title}</h3>
            {item.desc && <p className="mt-1 text-sm text-mute">{item.desc}</p>}
          </div>
          {onOpenBooking && (
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-brass px-5 font-ui text-xs uppercase tracking-[0.1em] text-bg transition-colors hover:bg-brass-hover"
            >
              <Calendar className="w-3.5 h-3.5 " />
              <span>AGENDAR ESTE SERVIÇO</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
