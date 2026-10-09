import { useEffect, useRef } from 'react';
import { gsap, EASE, prefersReducedMotion } from '../animations';

interface SectionLabelProps {
  label: string;
  number?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionLabel = ({ label, number, className = '', align = 'left' }: SectionLabelProps) => {
  const rootRef = useRef(null);
  const numberRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;
    if (prefersReducedMotion()) {
      if (lineRef.current) {
        lineRef.current.style.transform = 'scaleX(1)';
      }
      if (textRef.current) {
        textRef.current.style.opacity = '1';
      }
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 90%', toggleActions: 'play none none none', once: true },
      });
      if (numberRef.current) {
        tl.fromTo(
          numberRef.current,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.45, ease: EASE.editorial },
          0,
        );
      }
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: align === 'center' ? 'center' : 'left' },
          { scaleX: 1, duration: 0.6, ease: EASE.smooth },
          0.1,
        );
      }
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, x: align === 'center' ? 0 : 8 },
          { opacity: 1, x: 0, duration: 0.5, ease: EASE.editorial },
          0.25,
        );
      }
    }, root);
    return () => ctx.revert();
  }, [align]);
  return (
    <div
      ref={rootRef}
      className={`eyebrow flex items-center gap-3 text-brass ${align === 'center' ? 'justify-center' : 'justify-start'} ${className}`}
    >
      {number && (
        <span ref={numberRef} className="font-mono tracking-normal text-gold tabular-nums">
          {number}
        </span>
      )}
      <span ref={lineRef} className="w-6 h-px bg-gold" aria-hidden="true" />
      <span ref={textRef}>{label}</span>
    </div>
  );
};
