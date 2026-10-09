import { useEffect, useRef } from 'react';
import { ArrowDown, Calendar, MessageCircle } from 'lucide-react';
import { useMagnetic, initHeroAnimation } from '../animations';
import { buttonClasses } from '../utils/button';
import { BUSINESS_DATA } from '../data/business';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero = ({ onOpenBooking }: HeroProps) => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const logoRef = useRef(null);
  const eyebrowRef = useRef(null);
  const eyebrowLineLeftRef = useRef(null);
  const eyebrowLineRightRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const trustRef = useRef(null);
  const bottomBarRef = useRef(null);
  const primaryCtaRef = useMagnetic({ strength: 0.18, maxDistance: 7 });
  const secondaryCtaRef = useMagnetic({ strength: 0.18, maxDistance: 7 });
  useEffect(
    () =>
      initHeroAnimation({
        containerRef,
        bgRef,
        logoRef,
        eyebrowRef,
        eyebrowLineLeftRef,
        eyebrowLineRightRef,
        headlineRef,
        subtitleRef,
        ctaGroupRef,
        trustRef,
        bottomBarRef,
      }),
    [],
  );
  return (
    <section ref={containerRef} className="relative bg-bg pb-10 pt-24 sm:pb-14 sm:pt-28">
      <div className="shell">
        <div className="relative isolate flex min-h-[calc(100svh-11rem)] items-center overflow-hidden rounded-xl bg-surface ring-1 ring-line">
          <div ref={bgRef} className="pointer-events-none absolute inset-0 -z-10">
            <img
              src="/images/ambiente/salao-cadeiras.webp"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-[0.14] grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/70" />
          </div>
          <div className="grid w-full grid-cols-1 items-center gap-10 px-5 py-12 sm:px-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-16 xl:px-20">
            <div className="flex justify-center lg:col-span-5 lg:justify-start">
              <div ref={logoRef}>
                <img
                  src="/images/marca/logo-soul-blues.png"
                  alt={BUSINESS_DATA.branding.logoAlt}
                  width={1254}
                  height={1254}
                  fetchPriority="high"
                  decoding="async"
                  className="h-auto w-56 object-contain sm:w-72 lg:w-full lg:max-w-[460px]"
                />
              </div>
            </div>
            <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
              <div
                ref={eyebrowRef}
                className="eyebrow flex items-center gap-3 whitespace-nowrap text-brass max-sm:tracking-[0.14em]"
              >
                <span ref={eyebrowLineLeftRef} className="hidden h-px w-6 bg-gold sm:block" aria-hidden="true" />
                <span>Barbearia no Setor Campinas</span>
                <span ref={eyebrowLineRightRef} className="hidden h-px w-6 bg-gold sm:block" aria-hidden="true" />
              </div>
              <h1
                ref={headlineRef}
                className="mt-5 font-display text-[clamp(2.25rem,10.5vw,2.75rem)] sm:text-[clamp(2.75rem,5.5vw,6rem)] uppercase leading-[0.9] text-ink text-balance"
              >
                Seu estilo.
                <br />
                <span className="bg-gradient-to-b from-white via-[#eaeaea] to-[#8a8a8a] bg-clip-text text-transparent">
                  Nossa assinatura.
                </span>
              </h1>
              <p ref={subtitleRef} className="mt-6 max-w-md text-base leading-relaxed text-body sm:text-lg">
                Atendimento com hora marcada, técnica apurada e produtos selecionados na Rua José Hermano, Campinas.
              </p>
              <div ref={ctaGroupRef} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
                  Falar no WhatsApp
                </a>
              </div>
              <div ref={trustRef} className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-raised px-3 py-2 text-sm">
                  <span className="font-medium text-brass">5,0 ★</span>
                  <span className="text-mute">no Google</span>
                </span>
                <span className="rounded-sm bg-raised px-3 py-2 font-mono text-sm text-body">
                  +1.400 avaliações reais
                </span>
                <span className="rounded-sm bg-raised px-3 py-2 text-sm text-body">Goiânia/GO</span>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={bottomBarRef}
          className="mt-3 flex items-center justify-between gap-4 rounded-lg bg-surface px-6 py-4 ring-1 ring-line"
        >
          <span className="eyebrow truncate text-dim max-sm:tracking-[0.08em]">Setor Campinas • Goiânia/GO</span>
          <button
            type="button"
            onClick={() => {
              document.querySelector('#experiencia')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="eyebrow group flex items-center gap-2 rounded-sm px-2 py-1 text-mute transition-colors hover:text-brass"
            aria-label="Rolar para a próxima seção"
          >
            Explorar
            <ArrowDown
              className="h-4 w-4 text-brass transition-transform group-hover:translate-y-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
