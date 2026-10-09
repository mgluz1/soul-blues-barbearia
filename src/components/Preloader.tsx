import { useEffect, useRef } from 'react';
import { gsap, EASE, prefersReducedMotion } from '../animations';
import { Logo } from './Logo';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const labelRef = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined') {
      onComplete();
      return;
    }
    if (prefersReducedMotion()) {
      onComplete();
      return;
    }
    const container = containerRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    const label = labelRef.current;
    if (!container || !logo || !line || !label) {
      onComplete();
      return;
    }
    const intro = gsap.timeline({
      defaults: { ease: EASE.cinematic },
      onComplete: () => {
        onComplete();
      },
    });
    intro
      .fromTo(
        logo,
        { opacity: 0, scale: 0.94, clipPath: 'inset(0% 100% 0% 0%)' },
        { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.65, ease: EASE.cinematic },
        0.1,
      )
      .fromTo(
        line,
        { scaleX: 0, transformOrigin: 'center', opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: EASE.smooth },
        0.4,
      )
      .fromTo(label, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.45, ease: EASE.editorial }, 0.65)
      .to([logo, line, label], { opacity: 0, y: -10, duration: 0.35, ease: EASE.editorial }, 1.15)
      .to(
        container,
        { clipPath: 'inset(0% 0% 100% 0%)', pointerEvents: 'none', duration: 0.6, ease: 'expo.inOut' },
        1.25,
      );
    return () => {
      intro.kill();
    };
  }, [onComplete]);
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg select-none"
      role="status"
      aria-label="Carregando Soul Blues Barbearia"
    >
      <div className="flex flex-col items-center max-w-xs text-center px-4">
        <div ref={logoRef}>
          <Logo eager className="mb-5 h-20 w-20 sm:h-24 sm:w-24" />
        </div>
        <div ref={lineRef} className="h-px w-32 bg-gold sm:w-36" />
        <span ref={labelRef} className="mt-3 text-xs font-mono tracking-widest text-dim uppercase">
          SETOR CAMPINAS
        </span>
      </div>
    </div>
  );
};
