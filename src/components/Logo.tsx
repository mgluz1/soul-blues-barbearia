import { useState } from 'react';
import { BUSINESS_DATA } from '../data/business';

export const LOGO_SOURCES = ['/images/marca/logo-soul-blues.webp', BUSINESS_DATA.branding.logoUrl];
interface LogoProps {
  className?: string;
  eager?: boolean;
}

export const Logo = ({ className = '', eager = false }: LogoProps) => {
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = LOGO_SOURCES[sourceIndex];
  return src ? (
    <img
      src={src}
      alt={BUSINESS_DATA.branding.logoAlt}
      onError={() => setSourceIndex((i) => i + 1)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      width={640}
      height={640}
      className={`object-contain ${className}`}
    />
  ) : (
    <span className={`font-display uppercase tracking-widest text-ink ${className}`}>Soul Blues</span>
  );
};
