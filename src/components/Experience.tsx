import { useState, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion, useScrollReveal, useCardStaggerReveal } from '../animations';
import { SectionLabel } from './SectionLabel';
import { ImageLightbox } from './ImageLightbox';
import { Media } from './Media';
import { BUSINESS_DATA } from '../data/business';

interface ExperienceProps {
  onOpenBooking: () => void;
}

export const Experience = ({ onOpenBooking }: ExperienceProps) => {
  const headerRef = useScrollReveal();
  const cardsRef = useCardStaggerReveal('.experience-card', '.experience-card img', 0.14);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  useEffect(() => {
    const grid = cardsRef.current;
    if (!grid || typeof window === 'undefined' || prefersReducedMotion()) return;
    const triggers = [];
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      grid.querySelectorAll('.experience-card').forEach((card, idx) => {
        const img = card.querySelector('img');
        if (!img) return;
        const offset = idx === 0 ? -3 : idx === 1 ? 5 : -4;
        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
            onUpdate: (self) => {
              gsap.set(img, { yPercent: (self.progress - 0.5) * offset });
            },
          }),
        );
      });
    });
    return () => {
      triggers.forEach((trigger) => trigger.kill());
      mm.revert();
    };
  }, []);
  const experiences = BUSINESS_DATA.experiences;
  const lightboxItems = experiences.map((item) => ({
    id: `exp-${item.index}`,
    title: item.title,
    category: item.tag,
    desc: `${item.headline} - ${item.description}`,
    src: Array.isArray(item.image) ? item.image[0] : item.image || '',
    alt: item.placeholderAlt,
  }));
  const openPhoto = (index) => {
    setActivePhotoIndex(index);
    setIsLightboxOpen(true);
  };
  const [hair, beard, space] = experiences;
  const renderMeta = (index, tag) => (
    <div className="flex items-center gap-3">
      <span className="font-mono text-sm text-brass tabular-nums">{String(index + 1).padStart(2, '0')}</span>
      <span className="eyebrow text-mute">{tag}</span>
    </div>
  );
  const zoomBadge = (
    <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-sm bg-bg/80 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
      <Maximize2 className="h-4 w-4" aria-hidden="true" />
    </span>
  );
  return (
    <section id="experiencia" className="relative bg-bg py-20 sm:py-28">
      <div className="shell">
        <div ref={headerRef} className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel label="Experiência Soul Blues" number="01" className="mb-5" />
            <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl lg:text-7xl text-balance">
              Cada detalhe
              <br />
              <span className="text-brass">tem seu tempo.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-body lg:col-span-4 lg:col-start-9">
            Sem pressa e sem linha de produção. Uma bancada dedicada ao seu visual, navalha afiada e respeito absoluto
            ao seu tempo.
          </p>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {hair && (
            <button
              type="button"
              onClick={() => openPhoto(0)}
              aria-label={`Ampliar foto: ${hair.title}`}
              className="experience-card group relative text-left sm:col-span-2 lg:col-span-7 lg:row-span-2"
            >
              <Media
                src={hair.image}
                alt={hair.placeholderAlt}
                shade="bottom"
                className="aspect-[4/5] h-full w-full rounded-xl sm:aspect-[16/10] lg:aspect-auto lg:min-h-[640px]"
                imgClassName="group-hover:scale-[1.12]"
              >
                {zoomBadge}
                <div className="absolute inset-x-3 bottom-3 rounded-lg bg-bg/90 p-6 sm:inset-x-4 sm:bottom-4 sm:max-w-md sm:p-7">
                  {renderMeta(0, hair.tag)}
                  <h3 className="mt-3 font-display text-4xl uppercase leading-none text-ink sm:text-5xl">
                    {hair.title}
                  </h3>
                  <p className="mt-3 text-base font-medium text-ink">{hair.headline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{hair.description}</p>
                </div>
              </Media>
            </button>
          )}
          {beard && (
            <button
              type="button"
              onClick={() => openPhoto(1)}
              aria-label={`Ampliar foto: ${beard.title}`}
              className="experience-card group flex flex-col overflow-hidden rounded-xl bg-surface text-left lg:col-span-5"
            >
              <Media
                src={beard.image}
                alt={beard.placeholderAlt}
                className="aspect-[16/10] w-full rounded-lg lg:aspect-auto lg:h-[280px]"
                imgClassName="object-[50%_30%] group-hover:scale-[1.12]"
              >
                {zoomBadge}
              </Media>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                {renderMeta(1, beard.tag)}
                <h3 className="mt-3 font-display text-4xl uppercase leading-none text-ink">{beard.title}</h3>
                <p className="mt-3 text-base font-medium text-ink">{beard.headline}</p>
                <p className="mt-2 text-sm leading-relaxed text-mute">{beard.description}</p>
              </div>
            </button>
          )}
          {space && (
            <button
              type="button"
              onClick={() => openPhoto(2)}
              aria-label={`Ampliar foto: ${space.title}`}
              className="experience-card group grid grid-cols-1 content-start gap-2 overflow-hidden rounded-xl bg-raised p-2 text-left lg:col-span-5 xl:grid-cols-[1fr_minmax(0,0.9fr)] xl:content-stretch"
            >
              <div className="order-2 flex flex-col justify-end p-5 xl:order-1">
                {renderMeta(2, space.tag)}
                <h3 className="mt-3 font-display text-4xl uppercase leading-none text-ink">{space.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{space.headline}</p>
              </div>
              <Media
                src={space.image}
                alt={space.placeholderAlt}
                className="order-1 aspect-[16/10] w-full rounded-lg xl:order-2 xl:aspect-square"
                imgClassName="group-hover:scale-[1.12]"
              >
                {zoomBadge}
              </Media>
            </button>
          )}
        </div>
      </div>
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={activePhotoIndex}
        onNavigate={(index) => setActivePhotoIndex(index)}
        onOpenBooking={onOpenBooking}
      />
    </section>
  );
};
