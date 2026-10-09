import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap, EASE, prefersReducedMotion, useMagnetic } from '../animations';
import { navigateTo, useRoute } from '../utils/navigation';
import { buttonClasses } from '../utils/button';
import { Logo } from './Logo';
import { BUSINESS_DATA } from '../data/business';

interface NavLink {
  label: string;
  href: string;
  isRoute?: boolean;
  isExternal?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Planos', href: '/planos', isRoute: true },
  { label: 'App', href: '#app' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Localização', href: '#localizacao' },
];
interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar = ({ onOpenBooking }: NavbarProps) => {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentPath } = useRoute();
  const bookButtonRef = useMagnetic({ strength: 0.15, maxDistance: 5 });
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (headerRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: EASE.smooth, delay: 0.2 },
      );
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const handleLinkClick = (event: MouseEvent, href: string, isExternal?: boolean, isRoute?: boolean) => {
    if (isExternal) {
      setIsMenuOpen(false);
      return;
    }
    event.preventDefault();
    setIsMenuOpen(false);
    if (isRoute) {
      navigateTo(href);
      return;
    }
    if (currentPath !== '/') {
      navigateTo('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <header ref={headerRef} className="fixed left-0 right-0 top-0 z-40 pt-3">
        <div className="shell">
          <div
            className={`flex items-center justify-between rounded-lg py-2 pl-3 pr-2 transition-colors duration-200 sm:pl-4 ${isScrolled || isMenuOpen ? 'bg-surface shadow-lift ring-1 ring-line' : 'bg-transparent'}`}
          >
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault();
                setIsMenuOpen(false);
                if (currentPath === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigateTo('/');
                }
              }}
              className="flex items-center rounded-sm text-2xl"
            >
              <Logo eager className="h-12 w-12 sm:h-14 sm:w-14" />
            </a>
            <nav className="hidden items-center gap-1 font-ui text-[15px] font-semibold uppercase tracking-[0.1em] lg:flex">
              {NAV_LINKS.map((link) => {
                const isActive = link.isRoute && currentPath === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(event) => handleLinkClick(event, link.href, link.isExternal, link.isRoute)}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className={`cursor-pointer rounded-sm px-3.5 py-2.5 transition-colors ${isActive ? 'bg-strong text-ink' : 'text-body hover:bg-raised hover:text-ink'}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="flex items-center gap-2">
              <button
                ref={bookButtonRef}
                onClick={onOpenBooking}
                type="button"
                className={buttonClasses('primary', 'md', 'hidden sm:inline-flex')}
              >
                Agendar
              </button>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-md bg-strong text-ink lg:hidden"
                aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 flex flex-col justify-between bg-bg px-4 pb-8 pt-28 sm:px-6 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="space-y-6">
            <span className="eyebrow block px-2 text-brass">Navegação</span>
            <nav className="grid gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = link.isRoute && currentPath === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(event) => handleLinkClick(event, link.href, link.isExternal, link.isRoute)}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className={`cursor-pointer rounded-md px-4 py-3 font-display text-4xl uppercase leading-none transition-colors ${isActive ? 'bg-surface text-brass' : 'text-ink hover:bg-surface'}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
          <div className="space-y-2 rounded-xl bg-surface p-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenBooking();
              }}
              type="button"
              className={buttonClasses('primary', 'lg', 'w-full')}
            >
              Agendar horário
            </button>
            <a
              href={BUSINESS_DATA.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('secondary', 'lg', 'w-full')}
            >
              Falar no WhatsApp
            </a>
            <div className="eyebrow py-2 text-center text-dim">
              {BUSINESS_DATA.neighborhood}
              {' • '}
              {BUSINESS_DATA.city}/{BUSINESS_DATA.state}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
