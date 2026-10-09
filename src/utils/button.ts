export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export const BASE =
  'inline-flex items-center justify-center gap-2.5 rounded-md font-ui uppercase tracking-[0.08em] font-bold whitespace-nowrap cursor-pointer select-none transition-colors duration-200 active:scale-[0.98]';

export const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-brass text-bg hover:bg-brass-hover',
  secondary: 'bg-strong text-ink border border-line-strong hover:bg-[#1b1b1b]',
  ghost: 'text-mute hover:text-ink',
};

export const SIZES: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-[13px]',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`.trim();
}
