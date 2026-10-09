import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Instagram, Maximize2 } from 'lucide-react';
import { useScrollReveal, initGalleryReveal, executeGalleryFlip } from '../animations';
import { buttonClasses } from '../utils/button';
import { Logo } from './Logo';
import { SectionLabel } from './SectionLabel';
import { ImageLightbox } from './ImageLightbox';
import { Media } from './Media';
import { BUSINESS_DATA } from '../data/business';

export const CATEGORY_LABELS = { corte: 'Corte', barba: 'Barba', ambiente: 'Ambiente' };

/** Bento layout: first card is the 2×2 hero; the sixth goes large when there are enough photos. */
export function galleryCardClasses(index: number, total: number) {
  const last = total - 1;
  const base =
    index === 0
      ? 'col-span-2 aspect-square'
      : last % 2 == 1 && index === total - 1
        ? 'col-span-2 aspect-[2/1]'
        : 'aspect-square';
  let desktop = 'lg:col-span-1 lg:row-span-1 lg:aspect-square';
  if (index === 0) {
    desktop = 'lg:col-span-2 lg:row-span-2 lg:aspect-square';
  } else {
    if (index === 5 && total > 6) {
      desktop = 'lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:aspect-square';
    } else {
      if (total === 2) {
        desktop = 'lg:col-span-1 lg:row-span-2 lg:aspect-auto';
      }
    }
  }
  return `${base} ${desktop}`;
}

/** Sizes the Instagram card so it closes the last row of the grid. */
export function instagramCardClasses(total: number) {
  return total === 2
    ? 'col-span-2 lg:col-span-1 lg:row-span-2'
    : total === 3
      ? 'col-span-2 lg:col-span-2 lg:row-span-1'
      : 'col-span-2 lg:col-span-1 lg:row-span-1 lg:aspect-square';
}
interface GalleryProps {
  onOpenBooking: () => void;
}

export const Gallery = ({ onOpenBooking }: GalleryProps) => {
  const headerRef = useScrollReveal();
  const gridRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { instagramUrl, instagramHandle } = BUSINESS_DATA.contact;
  useEffect(() => {
    if (gridRef.current) return initGalleryReveal(gridRef.current, '.gallery-card');
  }, []);
  const changeFilter = (nextFilter) => {
    if (nextFilter !== filter) {
      if (gridRef.current) {
        executeGalleryFlip(gridRef.current, '.gallery-card', () => setFilter(nextFilter));
      } else {
        setFilter(nextFilter);
      }
    }
  };
  const visibleItems =
    filter === 'all'
      ? BUSINESS_DATA.galleryItems
      : BUSINESS_DATA.galleryItems.filter((item) => item.category === filter);
  const total = visibleItems.length;
  const lightboxItems = visibleItems.map((item) => ({
    id: item.id,
    title: item.title,
    category: CATEGORY_LABELS[item.category] ?? item.category,
    desc: item.desc,
    src: item.image || '',
    alt: `Soul Blues Barbearia - ${item.title}`,
  }));
  const openPhoto = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };
  return (
    <section id="galeria" className="relative bg-bg py-20 sm:py-28">
      <div className="shell">
        <div ref={headerRef} className="mb-10 grid gap-8 sm:mb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel label="Portfólio" number="05" className="mb-5" />
            <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl lg:text-7xl">
              O resultado
              <br />
              <span className="text-brass">fala por si.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-body">
              Fotografias reais dos cortes, barbas e do ambiente no Setor Campinas.
            </p>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-lg bg-surface p-3 pr-5 ring-1 ring-line transition-colors hover:bg-raised lg:col-span-4 lg:col-start-9 lg:justify-self-end"
            aria-label={`Abrir o Instagram da Soul Blues (${instagramHandle})`}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brass text-bg">
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="eyebrow block text-dim">Siga no Instagram</span>
              <span className="mt-1 block truncate text-base font-medium text-ink">{instagramHandle}</span>
            </span>
            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-brass transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
        <div
          className="mb-4 grid grid-cols-4 gap-1 rounded-md bg-surface p-1.5 sm:inline-flex"
          role="group"
          aria-label="Filtrar por categoria"
        >
          {BUSINESS_DATA.galleryCategories.map((category) => {
            const isActive = filter === category.id;
            const count =
              category.id === 'all'
                ? BUSINESS_DATA.galleryItems.length
                : BUSINESS_DATA.galleryItems.filter((other) => other.category === category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => changeFilter(category.id)}
                className={`flex items-center justify-center gap-2 rounded-sm px-1 py-2.5 font-ui text-xs uppercase tracking-[0.1em] transition-colors sm:px-4 sm:tracking-[0.1em] ${isActive ? 'bg-strong text-ink shadow-card' : 'text-mute hover:text-ink'}`}
              >
                {category.label}
                <span
                  className={`hidden font-mono text-[11px] tracking-normal sm:inline ${isActive ? 'text-brass' : 'text-dim'}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <div ref={gridRef} className="grid grid-flow-dense grid-cols-2 gap-3 lg:grid-cols-4">
          {visibleItems.map((item, idx) => {
            const isFeatured = idx === 0;
            const isWide = galleryCardClasses(idx, total).includes('lg:col-span-2');
            return (
              <button
                key={item.id}
                type="button"
                data-flip-id={item.id}
                onClick={() => openPhoto(idx)}
                aria-label={`Ampliar foto: ${item.title}`}
                className={`gallery-card group relative overflow-hidden rounded-lg text-left ${galleryCardClasses(idx, total)}`}
              >
                <Media
                  src={item.image}
                  alt={`Soul Blues Barbearia - ${item.title}`}
                  shade="bottom"
                  overscan={false}
                  className="h-full w-full"
                  imgClassName="group-hover:scale-[1.04]"
                >
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-sm bg-bg/80 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div
                    className={`absolute inset-x-0 bottom-0 ${isFeatured ? 'p-5 sm:p-7' : isWide ? 'p-3.5 sm:p-5 lg:p-7' : 'p-3.5 sm:p-5'}`}
                  >
                    <span className="eyebrow text-brass max-sm:text-[11px] max-sm:tracking-[0.16em]">
                      {CATEGORY_LABELS[item.category] ?? item.category}
                    </span>
                    <p
                      className={`mt-1 font-display uppercase leading-[0.95] text-ink ${isFeatured ? 'text-3xl sm:text-5xl' : isWide ? 'text-lg sm:text-2xl lg:text-5xl' : 'text-lg sm:text-2xl'}`}
                    >
                      {item.title}
                    </p>
                    {isWide && (
                      <p className={`mt-2 hidden max-w-sm text-sm text-body ${isFeatured ? 'sm:block' : 'lg:block'}`}>
                        {item.desc}
                      </p>
                    )}
                  </div>
                </Media>
              </button>
            );
          })}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-flip-id="instagram"
            className={`gallery-card group flex flex-col justify-between gap-6 overflow-hidden rounded-lg bg-raised p-5 ring-1 ring-line-gold transition-colors hover:bg-strong sm:p-6 ${instagramCardClasses(total)}`}
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full p-[2px] ring-2 ring-brass">
                <Logo className="h-11 w-11 rounded-full bg-bg" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-ink">{instagramHandle}</span>
                <span className="flex items-center gap-1.5 text-xs text-dim">
                  <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                  Instagram
                </span>
              </span>
            </div>
            <p className="font-display text-3xl uppercase leading-[0.95] text-ink lg:max-xl:text-2xl">
              Mais cortes
              <br />
              <span className="text-brass">no nosso perfil.</span>
            </p>
            <span className={buttonClasses('primary', 'md', 'w-full')}>
              <span>
                Seguir
                <span className="lg:max-xl:hidden">{' no Instagram'}</span>
              </span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onNavigate={(index) => setLightboxIndex(index)}
        onOpenBooking={onOpenBooking}
      />
    </section>
  );
};
