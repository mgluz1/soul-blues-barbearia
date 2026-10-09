import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, SplitText, EASE, prefersReducedMotion } from '../animations';
import { SectionLabel } from './SectionLabel';
import { Media } from './Media';

export const Manifesto = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const taglineRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === 'undefined' || prefersReducedMotion()) return;
    let split = null;
    let trigger = null;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: EASE.editorial },
          0,
        );
      }
      if (headlineRef.current)
        try {
          split = new SplitText(headlineRef.current, { type: 'lines', linesClass: 'manifesto-line' });
          split.lines.forEach((line) => {
            const mask = document.createElement('div');
            mask.style.overflow = 'hidden';
            mask.style.display = 'block';
            if (line.parentNode) {
              {
                line.parentNode.insertBefore(mask, line);
                mask.appendChild(line);
              }
            }
          });
          tl.fromTo(
            split.lines,
            { yPercent: 115, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.1, ease: EASE.cinematic },
            0.15,
          );
        } catch {
          tl.fromTo(
            headlineRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: EASE.cinematic },
            0.15,
          );
        }
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, ease: EASE.editorial },
          0.35,
        );
      }
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: EASE.editorial },
          0.5,
        );
      }
      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 78%',
        animation: tl,
        toggleActions: 'play none none none',
        once: true,
      });
    }, section);
    return () => {
      if (trigger) {
        trigger.kill();
      }
      if (split)
        try {
          split.revert();
        } catch {}
      ctx.revert();
    };
  }, []);
  return (
    <section ref={sectionRef} className="relative bg-bg py-10 sm:py-16">
      <div className="shell">
        <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-xl bg-strong p-2 lg:grid-cols-12">
          <div className="relative flex flex-col justify-between gap-12 p-6 sm:p-12 lg:col-span-8 lg:p-16 xl:p-20">
            <div ref={labelRef}>
              <SectionLabel label="Manifesto Soul Blues" />
            </div>
            <div>
              <h2
                ref={headlineRef}
                className="font-display text-[clamp(3.25rem,7.5vw,7.5rem)] uppercase leading-[0.88] text-ink text-balance"
              >
                Mais que um corte.
                <br />
                <span className="text-brass">Um momento seu.</span>
              </h2>
              <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] sm:items-end">
                <p ref={descRef} className="text-base leading-relaxed text-body sm:text-lg">
                  Cuidar da própria imagem não é vaidade superficial; é clareza de presença e confiança. Cada linha bem
                  traçada, cada detalhe alinhado na navalha e o respeito à individualidade de cada homem.
                </p>
                <p ref={taglineRef} className="eyebrow flex flex-col gap-2 text-mute sm:items-end sm:text-right">
                  <span>Estilo</span>
                  <span>Identidade</span>
                  <span className="text-brass">Renovação</span>
                </p>
              </div>
            </div>
          </div>
          <Media
            src="/images/barba/barbeiro-em-atendimento.webp"
            alt="Barbeiro da Soul Blues fazendo o acabamento com máquina"
            className="aspect-[4/3] rounded-lg sm:aspect-[16/9] lg:col-span-4 lg:aspect-auto lg:min-h-[560px]"
            imgClassName="object-[50%_25%]"
          />
        </div>
      </div>
    </section>
  );
};
