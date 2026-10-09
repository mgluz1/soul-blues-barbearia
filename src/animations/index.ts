import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, Observer, useGSAP);
}

export const prefersReducedMotion = (): boolean =>
  typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const EASE = {
  cinematic: 'power4.out',
  smooth: 'power3.out',
  editorial: 'power2.out',
  expo: 'expo.out',
  snappy: 'power3.inOut',
};

/** Headline reveal: lines slide up from behind an overflow mask. */
export function useTextReveal<T extends HTMLElement = any>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    if (prefersReducedMotion()) {
      el.style.opacity = '1';
      return;
    }

    const ctx = gsap.context(() => {
      let split: SplitText | undefined;
      try {
        split = new SplitText(el, { type: 'lines', linesClass: 'reveal-line' });
        split.lines.forEach((line) => {
          const mask = document.createElement('div');
          mask.style.overflow = 'hidden';
          if (line.parentNode) {
            line.parentNode.insertBefore(mask, line);
            mask.appendChild(line);
          }
        });
        gsap.fromTo(
          split.lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.08,
            ease: EASE.cinematic,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        );
      } catch {
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: EASE.cinematic, scrollTrigger: { trigger: el, start: 'top 85%', once: true } },
        );
      }
      return () => {
        split?.revert();
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/** Simple fade-up when the element enters the viewport. */
export function useScrollReveal<T extends HTMLElement = any>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    if (prefersReducedMotion()) {
      el.style.opacity = '1';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.1,
          ease: EASE.smooth,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/** Staggered card entrance; inner images unmask (inset 10% → 0) and settle from 1.05 scale. */
export function useCardStaggerReveal<T extends HTMLElement = any>(
  cardSelector: string,
  imageSelector?: string,
  stagger = 0.12,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || typeof window === 'undefined') return;
    if (prefersReducedMotion()) {
      container.querySelectorAll<HTMLElement>(cardSelector).forEach((card) => {
        card.style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const cards = container.querySelectorAll(cardSelector);
      if (!cards.length) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: container, start: 'top 84%', toggleActions: 'play none none none', once: true },
      });
      tl.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: EASE.editorial });

      if (imageSelector) {
        const images = container.querySelectorAll(imageSelector);
        if (images.length) {
          tl.fromTo(
            images,
            { scale: 1.05, clipPath: 'inset(10% 0% 10% 0%)' },
            { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, stagger: 0.1, ease: EASE.cinematic },
            0.1,
          );
        }
      }
    }, container);

    return () => ctx.revert();
  }, [cardSelector, imageSelector, stagger]);

  return ref;
}

/** Subtle magnetic pull toward the cursor (desktop pointers only). */
export function useMagnetic<T extends HTMLElement = any>(options: { strength?: number; maxDistance?: number } = {}) {
  const ref = useRef<T>(null);
  const strength = options.strength === undefined ? 0.2 : options.strength;
  const maxDistance = options.maxDistance === undefined ? 8 : options.maxDistance;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined' || 'ontouchstart' in window || navigator.maxTouchPoints > 0 || prefersReducedMotion())
      return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      xTo(Math.max(-maxDistance, Math.min(maxDistance, dx)));
      yTo(Math.max(-maxDistance, Math.min(maxDistance, dy)));
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, maxDistance]);

  return ref;
}

interface HeroRefs {
  containerRef: RefObject<HTMLElement | null>;
  bgRef: RefObject<HTMLElement | null>;
  logoRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLElement | null>;
  eyebrowLineLeftRef?: RefObject<HTMLElement | null>;
  eyebrowLineRightRef?: RefObject<HTMLElement | null>;
  headlineRef: RefObject<HTMLElement | null>;
  subtitleRef: RefObject<HTMLElement | null>;
  ctaGroupRef: RefObject<HTMLElement | null>;
  trustRef: RefObject<HTMLElement | null>;
  bottomBarRef: RefObject<HTMLElement | null>;
}

/** Orchestrated hero entrance + desktop background parallax. */
export function initHeroAnimation(refs: HeroRefs) {
  if (typeof window === 'undefined') return () => {};
  const {
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
  } = refs;
  const container = containerRef.current;
  if (!container) return () => {};

  if (prefersReducedMotion()) {
    gsap.set(
      [bgRef.current, logoRef.current, eyebrowRef.current, headlineRef.current, subtitleRef.current, ctaGroupRef.current, trustRef.current, bottomBarRef.current].filter(Boolean),
      { opacity: 1, y: 0, scale: 1, clearProps: 'all' },
    );
    return () => {};
  }

  const mm = gsap.matchMedia();
  let split: SplitText | null = null;
  let parallax: ScrollTrigger | null = null;

  mm.add({ isDesktop: '(min-width: 1024px)', isMobile: '(max-width: 1023px)' }, (context) => {
    const { isDesktop } = context.conditions as { isDesktop: boolean };
    const tl = gsap.timeline({ defaults: { ease: EASE.cinematic } });

    if (bgRef.current) {
      tl.fromTo(bgRef.current, { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: EASE.smooth }, 0);
    }
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.94, clipPath: 'inset(0% 100% 0% 0%)' },
        { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: EASE.cinematic },
        0.2,
      );
    }
    if (eyebrowRef.current) {
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.7, ease: EASE.editorial }, 0.4);
    }
    if (eyebrowLineLeftRef?.current && eyebrowLineRightRef?.current) {
      tl.fromTo(
        [eyebrowLineLeftRef.current, eyebrowLineRightRef.current],
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 0.8, ease: EASE.smooth },
        0.35,
      );
    }
    if (headlineRef.current) {
      try {
        split = new SplitText(headlineRef.current, { type: 'lines', linesClass: 'hero-split-line' });
        split.lines.forEach((line) => {
          const mask = document.createElement('div');
          mask.style.overflow = 'hidden';
          mask.style.display = 'block';
          if (line.parentNode) {
            line.parentNode.insertBefore(mask, line);
            mask.appendChild(line);
          }
        });
        tl.fromTo(
          split.lines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: EASE.cinematic },
          0.5,
        );
      } catch {
        tl.fromTo(headlineRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: EASE.cinematic }, 0.5);
      }
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: EASE.editorial }, 0.8);
    }
    if (ctaGroupRef.current) {
      tl.fromTo(
        ctaGroupRef.current.children,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: EASE.smooth },
        0.95,
      );
    }
    if (trustRef.current) {
      tl.fromTo(trustRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, ease: EASE.editorial }, 1.1);
    }
    if (bottomBarRef.current) {
      tl.fromTo(bottomBarRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: EASE.smooth }, 1.2);
    }

    if (isDesktop && bgRef.current) {
      parallax = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          if (bgRef.current) gsap.set(bgRef.current, { yPercent: self.progress * 15 });
        },
      });
    }
  });

  return () => {
    parallax?.kill();
    if (split) {
      try {
        split.revert();
      } catch {
        /* already reverted */
      }
    }
    mm.revert();
  };
}

/** Gallery cards: fade/translate with clip mask, inner image settles from 1.08 (desktop only). */
export function initGalleryReveal(container: HTMLElement | null, cardSelector = '.gallery-card') {
  if (typeof window === 'undefined' || !container) return () => {};
  if (prefersReducedMotion()) {
    container.querySelectorAll<HTMLElement>(cardSelector).forEach((card) => {
      card.style.opacity = '1';
    });
    return () => {};
  }

  const mm = gsap.matchMedia();
  let triggers: ScrollTrigger[] = [];

  mm.add('(min-width: 768px)', () => {
    const cards = container.querySelectorAll(cardSelector);
    if (!cards.length) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none none', once: true },
    });
    cards.forEach((card, idx) => {
      const img = card.querySelector('img');
      tl.fromTo(
        card,
        { opacity: 0, y: 35, clipPath: 'inset(10% 0% 10% 0%)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: EASE.cinematic },
        idx * 0.08,
      );
      if (img) tl.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.1, ease: EASE.smooth }, idx * 0.08);
    });

    return () => {
      tl.kill();
      triggers.forEach((st) => st.kill());
      triggers = [];
    };
  });

  return () => {
    triggers.forEach((st) => st.kill());
    mm.revert();
  };
}

/** Flip-animate gallery items when the filter changes. */
export function executeGalleryFlip(
  container: HTMLElement | null,
  itemSelector: string,
  stateUpdate: () => void,
  onComplete?: () => void,
) {
  if (typeof window === 'undefined' || !container || prefersReducedMotion()) {
    stateUpdate();
    onComplete?.();
    return;
  }

  const state = Flip.getState(container.querySelectorAll(itemSelector));
  stateUpdate();
  requestAnimationFrame(() => {
    Flip.from(state, { duration: 0.65, ease: EASE.cinematic, scale: true, stagger: 0.04, onComplete });
  });
}

export { gsap, ScrollTrigger, SplitText, Flip, Observer, useGSAP };
