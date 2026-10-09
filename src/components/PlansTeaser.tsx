import { useState } from 'react';
import { ArrowRight, Check, Crown } from 'lucide-react';
import { useScrollReveal, useTextReveal, useCardStaggerReveal, useMagnetic } from '../animations';
import { navigateTo } from '../utils/navigation';
import { buttonClasses } from '../utils/button';
import { SectionLabel } from './SectionLabel';
import { BUSINESS_DATA } from '../data/business';

export const PlanCard = ({ plan }) => {
  const isPremium = plan.isPremium;
  return (
    <article
      className={`plan-teaser-card relative flex flex-col overflow-hidden rounded-lg p-6 sm:p-8 ${isPremium ? 'bg-strong shadow-lift ring-1 ring-line-gold' : 'bg-raised ring-1 ring-line'}`}
    >
      {isPremium && <span className="absolute inset-x-8 top-0 h-px bg-brass" aria-hidden="true" />}
      <div className="flex min-h-7 items-center justify-between gap-3">
        <span className="eyebrow text-dim">Assinatura mensal</span>
        {isPremium && (
          <span className="eyebrow inline-flex items-center gap-1.5 rounded-sm bg-gold/15 px-2.5 py-1.5 text-brass">
            <Crown className="h-3.5 w-3.5" aria-hidden="true" />
            Premium
          </span>
        )}
      </div>
      <h4 className="mt-4 font-display text-3xl uppercase leading-none text-ink">{plan.name}</h4>
      <p className="mt-6 flex items-baseline gap-2">
        <span className={`font-display text-6xl leading-none ${isPremium ? 'text-brass' : 'text-ink'}`}>
          {plan.price}
        </span>
        <span className="text-sm text-mute">{plan.period}</span>
      </p>
      <ul className="mt-6 space-y-3">
        {plan.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-sm leading-snug text-body">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-2 pt-8 sm:flex-row">
        <a
          href={BUSINESS_DATA.apps.appBarber}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses(isPremium ? 'primary' : 'secondary', 'md', 'flex-1')}
        >
          Assinar
        </a>
        <button type="button" onClick={() => navigateTo('/planos')} className={buttonClasses('ghost', 'md')}>
          Detalhes
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export const PlansTeaser = () => {
  const containerRef = useScrollReveal();
  const headlineRef = useTextReveal();
  const cardsRef = useCardStaggerReveal('.plan-teaser-card', undefined, 0.12);
  const allPlansRef = useMagnetic({ strength: 0.18, maxDistance: 7 });
  const { items, groups } = BUSINESS_DATA.plans;
  const [activeGroupId, setActiveGroupId] = useState(groups[0].id);
  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];
  const groupPlans = items.filter((plan) => plan.group === activeGroup.title);
  return (
    <section id="planos" className="relative bg-bg py-20 sm:py-28">
      <div className="shell" ref={containerRef}>
        <div className="mb-10 flex flex-col justify-between gap-8 sm:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <SectionLabel label="Clube de assinatura" number="03" className="mb-5" />
            <h2
              ref={headlineRef}
              className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl lg:text-7xl text-balance"
            >
              Seu estilo.
              <br />
              <span className="text-brass">Sempre em dia.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-body">
              Conheça os planos da Soul Blues e escolha a opção que combina com sua rotina. Planos para corte, barba ou
              combo completo.
            </p>
          </div>
          <button
            ref={allPlansRef}
            type="button"
            onClick={() => navigateTo('/planos')}
            className={buttonClasses('secondary', 'lg', 'self-start lg:self-auto')}
          >
            Ver todos os planos
            <ArrowRight className="h-4 w-4 text-brass" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2 rounded-xl bg-surface p-2 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-8 p-4 sm:p-8 lg:col-span-4">
            <div role="tablist" aria-label="Categorias de planos" className="flex flex-col gap-1">
              {groups.map((group, idx) => {
                const isActive = group.id === activeGroup.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="plans-panel"
                    onClick={() => setActiveGroupId(group.id)}
                    className={`group flex items-baseline gap-4 rounded-md px-4 py-3 text-left transition-colors ${isActive ? 'bg-strong' : 'hover:bg-raised'}`}
                  >
                    <span className={`font-mono text-sm ${isActive ? 'text-brass' : 'text-dim'}`}>0{idx + 1}</span>
                    <span
                      className={`font-display text-4xl uppercase leading-none transition-colors sm:text-5xl lg:text-4xl xl:text-5xl ${isActive ? 'text-ink' : 'text-dim group-hover:text-body'}`}
                    >
                      {group.title}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="px-4">
              <p className="text-base leading-relaxed text-body">{activeGroup.desc}</p>
              <button
                type="button"
                onClick={() => navigateTo('/planos')}
                className="mt-5 inline-flex items-center gap-2 text-sm text-brass transition-colors hover:text-ink"
              >
                Conheça os 6 planos completos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            id="plans-panel"
            role="tabpanel"
            ref={cardsRef}
            className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:col-span-8"
          >
            {groupPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
