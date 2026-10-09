import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, MapPin, Star } from 'lucide-react';
import { gsap, prefersReducedMotion, useScrollReveal } from '../animations';
import { SectionLabel } from './SectionLabel';
import { Media } from './Media';
import { BUSINESS_DATA } from '../data/business';

export const SocialProof = () => {
  const headerRef = useScrollReveal();
  const target = BUSINESS_DATA.reviews.countNumber;
  const [count, setCount] = useState(target);
  const gridRef = useRef(null);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof window === 'undefined' || prefersReducedMotion()) return;
    setCount(0);
    const counter = { val: 0 };
    const cards = grid.querySelectorAll('.proof-card');
    const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: 'top 85%', once: true } });
    tl.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }).to(
      counter,
      { val: target, duration: 1.8, ease: 'expo.out', onUpdate: () => setCount(Math.round(counter.val)) },
      '-=0.8',
    );
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [target]);
  return (
    <section className="relative bg-bg py-20 sm:py-28">
      <div className="shell">
        <div ref={headerRef} className="mb-10 sm:mb-14">
          <SectionLabel label="Prova social & confiança" className="mb-5" />
          <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl lg:text-7xl text-balance">
            Quem frequenta,
            <br />
            <span className="text-brass">reconhece o nível.</span>
          </h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          <div className="proof-card flex flex-col justify-between gap-10 rounded-xl bg-raised p-7 sm:col-span-2 sm:p-10 lg:col-span-5 lg:min-h-[420px]">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-mute">Nota máxima Google</span>
              <span className="flex gap-1 text-brass" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </span>
            </div>
            <div className="font-display text-[clamp(7rem,16vw,12rem)] leading-[0.8] text-ink tabular-nums">
              {BUSINESS_DATA.reviews.rating}
            </div>
          </div>
          <div className="proof-card flex flex-col justify-between gap-10 rounded-xl bg-surface p-7 sm:p-10 lg:col-span-4">
            <span className="eyebrow text-mute">Clientes avaliaram</span>
            <div>
              <div className="font-display text-[clamp(4.5rem,9vw,7.5rem)] leading-[0.85] text-brass tabular-nums">
                +{count.toLocaleString('pt-BR')}
              </div>
              <a
                href={BUSINESS_DATA.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-ink"
              >
                Ver avaliações no Google Maps
                <ArrowUpRight className="h-4 w-4 text-brass" aria-hidden="true" />
              </a>
            </div>
          </div>
          <Media
            src="/images/ambiente/fachada.webp"
            alt="Fachada da Soul Blues Barbearia na Rua José Hermano"
            shade="bottom"
            className="proof-card aspect-square rounded-xl lg:col-span-3 lg:aspect-auto"
          >
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="eyebrow flex items-center gap-2 text-brass">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {BUSINESS_DATA.neighborhood}
              </span>
              <p className="mt-2 text-sm text-ink">{BUSINESS_DATA.address.street}</p>
            </div>
          </Media>
        </div>
      </div>
    </section>
  );
};
