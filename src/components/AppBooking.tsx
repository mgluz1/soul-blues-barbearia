import { useEffect, useRef } from 'react';
import { ArrowRight, Award, Bell, Calendar, Check, History, PackageCheck } from 'lucide-react';
import { gsap, ScrollTrigger, EASE, prefersReducedMotion, useMagnetic } from '../animations';
import { buttonClasses } from '../utils/button';
import { SectionLabel } from './SectionLabel';
import { BUSINESS_DATA } from '../data/business';

export const FLOATING_FEATURES = [
  {
    icon: Calendar,
    title: 'Agendamento online',
    desc: 'Escolha horário e barbeiro com confirmação 24h por dia.',
    pos: 'lg:left-0 lg:top-[6%]',
  },
  {
    icon: Bell,
    title: 'Lembretes',
    desc: 'Notificações inteligentes para nunca perder o horário marcado.',
    pos: 'lg:right-0 lg:top-[16%]',
  },
  {
    icon: History,
    title: 'Histórico',
    desc: 'Registro de seus atendimentos e frequência para manter o padrão.',
    pos: 'lg:left-0 lg:top-[42%]',
  },
  {
    icon: Award,
    title: 'Fidelidade & pontos',
    desc: 'Pontue a cada atendimento e resgate benefícios exclusivos.',
    pos: 'lg:right-0 lg:top-[52%]',
  },
  {
    icon: PackageCheck,
    title: 'Pacotes e assinaturas',
    desc: 'Condições especiais para quem valoriza manter o visual impecável o mês inteiro.',
    pos: 'lg:left-[4%] lg:bottom-[6%]',
  },
];
interface AppBookingProps {
  onOpenBooking: () => void;
}

export const AppBooking = ({ onOpenBooking }: AppBookingProps) => {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useMagnetic({ strength: 0.18, maxDistance: 7 });
  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    const features = featuresRef.current;
    if (!section || typeof window === 'undefined' || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    let parallax: ScrollTrigger | null = null;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none', once: true },
      });
      if (phone) {
        tl.fromTo(
          phone,
          { y: 80, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: EASE.cinematic },
          0,
        );
      }
      if (features) {
        const cards = features.querySelectorAll('.feature-card');
        tl.fromTo(
          cards,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: EASE.smooth },
          0.25,
        );
      }
      mm.add('(min-width: 1024px)', () => {
        if (phone) {
          parallax = ScrollTrigger.create({
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            onUpdate: (self) => {
              gsap.set(phone, { yPercent: (self.progress - 0.5) * 8 });
            },
          });
        }
      });
    }, section);
    return () => {
      if (parallax) {
        parallax.kill();
      }
      mm.revert();
      ctx.revert();
    };
  }, []);
  return (
    <section ref={sectionRef} id="app" className="relative bg-bg py-20 sm:py-28">
      <div className="shell">
        <div className="grid grid-cols-1 gap-2 rounded-xl bg-surface p-2 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-10 p-5 sm:p-10 lg:col-span-5 lg:p-12">
            <div>
              <SectionLabel label="Tecnologia & praticidade" number="04" className="mb-5" />
              <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl lg:text-7xl text-balance">
                Seu horário.
                <br />
                <span className="text-brass">Do seu jeito.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-body sm:text-lg">
                Agende seu horário pelo aplicativo Soul Blues e tenha seus atendimentos na palma da mão.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                ref={ctaRef}
                type="button"
                onClick={onOpenBooking}
                className={buttonClasses('primary', 'lg', 'w-full sm:w-auto sm:self-start')}
              >
                Agendar pelo app
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="grid grid-cols-2 gap-2 sm:max-w-sm">
                <a
                  href={BUSINESS_DATA.apps.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-md bg-raised px-4 py-3 transition-colors hover:bg-strong"
                >
                  <span className="text-xs text-dim">Baixar na</span>
                  <span className="text-sm font-medium text-ink">App Store</span>
                </a>
                <a
                  href={BUSINESS_DATA.apps.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-md bg-raised px-4 py-3 transition-colors hover:bg-strong"
                >
                  <span className="text-xs text-dim">Disponível no</span>
                  <span className="text-sm font-medium text-ink">Google Play</span>
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-lg bg-strong px-4 py-10 sm:px-8 lg:col-span-7 lg:block lg:min-h-[680px] lg:py-0">
            <div className="lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
              <div
                ref={phoneRef}
                className="relative w-[272px] rounded-[44px] bg-[#1a1a1a] p-2.5 shadow-lift ring-1 ring-line-strong sm:w-[288px]"
              >
                <div className="absolute left-1/2 top-5 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-bg" />
                <div className="relative flex min-h-[540px] flex-col justify-between overflow-hidden rounded-[36px] bg-bg px-5 pb-6 pt-12">
                  <div className="mb-4 flex items-center justify-between px-1 font-mono text-[11px] text-dim">
                    <span>09:41</span>
                    <span className="inline-block h-2 w-4 rounded-[3px] bg-brass" />
                  </div>
                  <div className="mb-5 text-center">
                    <span className="eyebrow block text-[10px] text-gold">Barbearia oficial</span>
                    <div className="font-display text-2xl uppercase tracking-widest text-ink">Soul Blues</div>
                  </div>
                  <div className="my-auto space-y-2.5">
                    <div className="rounded-md bg-strong p-3.5">
                      <span className="block text-[11px] text-dim">Seu próximo atendimento</span>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm font-medium text-ink">Corte & Barba</span>
                        <span className="font-mono text-xs text-brass">Hoje, 16:30</span>
                      </div>
                    </div>
                    <div className="rounded-md bg-strong p-3.5">
                      <span className="block text-[11px] text-dim">Profissional</span>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm font-medium text-ink">Barbeiro Soul Blues</span>
                        <span className="flex items-center gap-1 text-[11px] text-brass">
                          <Check className="h-3 w-3" aria-hidden="true" />
                          {' Confirmado'}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-md bg-strong p-3.5">
                      <span className="block text-[11px] text-dim">Local</span>
                      <span className="mt-1 block text-sm font-medium text-ink">Rua José Hermano, 1191</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="mt-5 w-full rounded-sm bg-brass py-3 font-ui text-xs uppercase tracking-[0.1em] text-bg transition-colors hover:bg-brass-hover"
                  >
                    Novo agendamento
                  </button>
                </div>
              </div>
            </div>
            <div
              ref={featuresRef}
              className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:pointer-events-none lg:absolute lg:inset-6 lg:block lg:w-auto"
            >
              {FLOATING_FEATURES.map(({ icon: Icon, title, desc, pos }) => (
                <div
                  key={title}
                  className={`feature-card rounded-md bg-raised p-4 shadow-card ring-1 ring-line lg:pointer-events-auto lg:absolute lg:w-[232px] ${pos}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-strong text-brass">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-ui text-sm uppercase tracking-[0.12em] text-ink">{title}</h3>
                  </div>
                  <p className="mt-2.5 text-[13px] leading-snug text-mute">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
