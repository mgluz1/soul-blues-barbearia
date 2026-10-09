import { useState, useEffect, useMemo, type ReactNode } from 'react';

interface MediaProps {
  src?: string | string[];
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Gradient overlay for legible captions. */
  shade?: 'none' | 'bottom' | 'full';
  eager?: boolean;
  /** Start slightly zoomed so reveal/parallax never shows edges. */
  overscan?: boolean;
  children?: ReactNode;
}

export const Media = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  shade = 'none',
  eager = false,
  overscan = true,
  children,
}: MediaProps) => {
  const sources = useMemo(() => (src ? (Array.isArray(src) ? src : [src]) : []), [src]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const currentSrc = sources[sourceIndex];
  useEffect(() => setSourceIndex(0), [sources]);
  return (
    <div className={`photo-card relative isolate overflow-hidden bg-raised ${className}`}>
      {currentSrc ? (
        <img
          src={currentSrc}
          alt={alt}
          onError={() => setSourceIndex((i) => i + 1)}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`photo-card__img absolute inset-0 h-full w-full object-cover ${overscan ? 'scale-[1.08]' : ''} transition-transform duration-700 ease-out ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-strong">
          <span className="eyebrow text-dim">Soul Blues</span>
        </div>
      )}
      {shade === 'bottom' && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      )}
      {shade === 'full' && <div className="pointer-events-none absolute inset-0 bg-black/45" />}
      {children}
    </div>
  );
};
