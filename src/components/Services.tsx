import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { gsap, EASE, prefersReducedMotion, useScrollReveal } from '../animations';
import { buttonClasses } from '../utils/button';
import { SectionLabel } from './SectionLabel';
import { Media } from './Media';
import { BUSINESS_DATA } from '../data/business';

export const CATEGORY_PHOTOS = {
  cabelo: { src: '/images/cortes/social-infantil.webp', alt: 'Corte masculino finalizado na Soul Blues' },
  barba: { src: '/images/barba/barba-cheia.webp', alt: 'Barba modelada na Soul Blues' },
  cuidados: { src: '/images/ambiente/salao-cadeiras.webp', alt: 'Cadeiras do salão da Soul Blues' },
};
interface ServicesProps {
  onOpenBooking: () => void;
}

export const Services = ({ onOpenBooking }: ServicesProps) => {
  const headerRef = useScrollReveal();
  const listRef = useRef(null);
  const categories = BUSINESS_DATA.servicesCategories;
  const [activeId, setActiveId] = useState(categories[0]?.id ?? 'cabelo');
  const active = categories.find((category) => category.id === activeId) ?? categories[0];
  const activeIndex = categories.indexOf(active);
  const photo = CATEGORY_PHOTOS[active.id];
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof window === 'undefined' || prefersReducedMotion()) return;
    const items = list.querySelectorAll('.service-item');
    if (items.length) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: EASE.smooth, overwrite: 'auto' },
      );
    }
  }, [activeId]);
  return (
    <section id="servicos" className="relative bg-bg py-20 sm:py-28">
      <div className="shell">
        <div ref={headerRef} className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel label="Menu de serviços" number="02" className="mb-5" />
            <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl lg:text-7xl">
              Seu estilo,
              <br />
              <span className="text-brass">seu momento.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-body lg:col-span-4 lg:col-start-9">
            Consulte e agende os procedimentos disponíveis na Soul Blues através do aplicativo oficial ou fale com a
            nossa equipe.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 rounded-xl bg-surface p-2 lg:grid-cols-12">
          <div className="p-4 sm:p-8 lg:col-span-7 lg:p-10 xl:col-span-8">
            <div
              role="tablist"
              aria-label="Categorias de serviços"
              className="flex gap-1.5 overflow-x-auto rounded-md bg-bg p-1.5 scrollbar-none sm:inline-flex"
            >
              {categories.map((category, idx) => {
                const isActive = activeId === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    id={`tab-${category.id}`}
                    aria-selected={isActive}
                    aria-controls="services-panel"
                    onClick={() => setActiveId(category.id)}
                    className={`flex flex-1 shrink-0 items-center justify-center gap-2 rounded-sm px-5 py-3 font-ui text-sm uppercase tracking-[0.1em] transition-colors sm:flex-none ${isActive ? 'bg-strong text-ink shadow-card' : 'text-mute hover:text-ink'}`}
                  >
                    <span className={`font-mono text-xs tracking-normal ${isActive ? 'text-brass' : 'text-dim'}`}>
                      0{idx + 1}
                    </span>
                    {category.title}
                  </button>
                );
              })}
            </div>
            <div id="services-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} className="mt-8 sm:mt-10">
              <p className="max-w-lg text-base text-body">{active.shortDesc}</p>
              <ul ref={listRef} className="mt-6 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
                {active.services.map((service, idx) => (
                  <li key={service.name} className="service-item">
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="group flex w-full items-center justify-between gap-4 rounded-md px-4 py-4 text-left transition-colors hover:bg-raised"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-dim tabular-nums transition-colors group-hover:text-brass">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-lg font-medium text-ink sm:text-xl">{service.name}</span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Media
            src={photo?.src}
            alt={photo?.alt ?? active.title}
            shade="bottom"
            className="aspect-[4/3] rounded-lg sm:aspect-[16/9] lg:col-span-5 lg:aspect-auto lg:min-h-[520px] xl:col-span-4"
            imgClassName="object-[50%_30%]"
          >
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:p-7">
              <div>
                <span className="font-mono text-sm text-brass">0{activeIndex + 1}</span>
                <p className="font-display text-5xl uppercase leading-none text-ink sm:text-6xl">{active.title}</p>
              </div>
              <button type="button" onClick={onOpenBooking} className={buttonClasses('primary', 'md', 'w-full')}>
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Agendar serviço
              </button>
            </div>
          </Media>
        </div>
      </div>
    </section>
  );
};
