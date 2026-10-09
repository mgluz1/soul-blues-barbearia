import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, Crown, ExternalLink } from 'lucide-react';
import { useScrollReveal, useCardStaggerReveal } from '../animations';
import { navigateTo } from '../utils/navigation';
import { buttonClasses } from '../utils/button';
import { Logo } from '../components/Logo';
import { SectionLabel } from '../components/SectionLabel';
import { Media } from '../components/Media';
import { BUSINESS_DATA } from '../data/business';

export const PlansPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Planos Soul Blues | Clube de Assinatura';
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription ? metaDescription.getAttribute('content') : '';
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Conheça os planos da Soul Blues Barbearia e encontre a opção ideal para sua rotina.',
      );
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.title = previousTitle;
      if (metaDescription && previousDescription) {
        metaDescription.setAttribute('content', previousDescription);
      }
    };
  }, []);
  const [openFaq, setOpenFaq] = useState(0);
  const heroRef = useScrollReveal();
  const cardsRef = useCardStaggerReveal('.plan-real-card', undefined, 0.08);
  const {
    pageHero,
    howItWorks,
    groups,
    items,
    comparisonMatrix: comparison,
    termsExplanation: terms,
    faq,
    cta,
  } = BUSINESS_DATA.plans;
  return (
    <div className="relative min-h-screen bg-bg pb-20 pt-24 font-sans text-body sm:pt-28">
      <div className="shell mb-3">
        <button
          type="button"
          onClick={() => navigateTo('/')}
          className="group inline-flex items-center gap-2 rounded-sm px-2 py-2 font-ui text-sm uppercase tracking-[0.1em] text-mute transition-colors hover:text-brass"
        >
          <ArrowLeft
            className="h-4 w-4 text-brass transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          <span>Voltar à página principal</span>
        </button>
      </div>
      <section className="shell mb-20 sm:mb-28">
        <div className="grid grid-cols-1 gap-2 rounded-xl bg-surface p-2 lg:grid-cols-12">
          <div
            ref={heroRef}
            className="order-2 flex flex-col justify-between gap-10 p-6 sm:p-12 lg:order-1 lg:col-span-7 lg:p-16"
          >
            <div className="flex items-center gap-4">
              <Logo eager className="h-16 w-16 sm:h-20 sm:w-20" />
              <span className="eyebrow text-brass">{pageHero.label}</span>
            </div>
            <div>
              <h1 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] uppercase leading-[0.88] text-ink text-balance">
                Seu estilo.
                <br />
                <span className="text-brass">Sempre em dia.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-body sm:text-lg">{pageHero.subtitle}</p>
              <a
                href="#planos-cards"
                onClick={(event) => {
                  event.preventDefault();
                  const target = document.getElementById('planos-cards');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`${buttonClasses('primary', 'lg')} mt-8`}
              >
                {pageHero.ctaText}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <Media
            src={pageHero.bgImage}
            alt="Salão da Soul Blues Barbearia"
            eager
            className="order-1 aspect-[16/10] rounded-lg lg:order-2 lg:col-span-5 lg:aspect-auto lg:min-h-[560px]"
          />
        </div>
      </section>
      <section className="shell mb-20 sm:mb-28">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="flex flex-col justify-center p-2 sm:p-4 lg:col-span-4">
            <SectionLabel label="Processo" number="01" className="mb-5" />
            <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl">{howItWorks.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-body">{howItWorks.text}</p>
          </div>
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-8">
            {howItWorks.steps.map((step, idx) => (
              <li
                key={step.number}
                className={`flex flex-col justify-between gap-12 rounded-lg p-6 sm:p-7 ${idx === 2 ? 'bg-strong' : idx === 1 ? 'bg-raised' : 'bg-surface'}`}
              >
                <span className="font-display text-7xl leading-none text-brass">{step.number}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-none text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section id="planos-cards" className="shell mb-20 scroll-mt-28 sm:mb-28">
        <div className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel label="Clube de assinatura" number="02" className="mb-5" />
            <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl lg:text-7xl">
              Escolha seu plano
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-body lg:col-span-4 lg:col-start-9">
            Planos mensais organizados por categoria de atendimento na Soul Blues Barbearia.
          </p>
        </div>
        <div ref={cardsRef} className="space-y-3">
          {groups.map((group, groupIdx) => {
            const groupPlans = items.filter((plan) => plan.group === group.title);
            return (
              <div key={group.id} className="grid grid-cols-1 gap-2 rounded-xl bg-surface p-2 lg:grid-cols-12">
                <div className="flex flex-col justify-between gap-8 p-5 sm:p-8 lg:col-span-4">
                  <span className="font-mono text-sm text-brass">0{groupIdx + 1}</span>
                  <div>
                    <h3 className="font-display text-5xl uppercase leading-none text-ink sm:text-6xl">{group.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-mute">{group.desc}</p>
                  </div>
                </div>
                {groupPlans.map((plan) => {
                  const isPremium = plan.isPremium;
                  return (
                    <article
                      key={plan.id}
                      className={`plan-real-card relative flex flex-col overflow-hidden rounded-lg p-6 sm:p-8 lg:col-span-4 ${isPremium ? 'bg-strong shadow-lift ring-1 ring-line-gold' : 'bg-raised ring-1 ring-line'}`}
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
                      <span className="eyebrow mt-8 block text-dim">Benefícios inclusos</span>
                      <ul className="mb-8 mt-4 space-y-3">
                        {plan.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm leading-snug text-body">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={BUSINESS_DATA.apps.appBarber}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonClasses(isPremium ? 'primary' : 'secondary', 'lg', 'mt-auto w-full')}
                      >
                        Assinar
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </article>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
      <section className="shell mb-20 sm:mb-28">
        <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel label="Visão geral" number="03" className="mb-5" />
            <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl">
              Compare os benefícios
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-body lg:col-span-4 lg:col-start-9">
            Tabela comparativa direta baseada nas regras oficiais de cada plano.
          </p>
        </div>
        <div className="hidden rounded-xl bg-surface p-2 lg:block">
          <table className="w-full border-separate border-spacing-y-1 text-left">
            <thead>
              <tr>
                {['Plano', 'Preço', 'Corte', 'Barba', 'Premium', 'Horário fixo', 'Descontos', 'Agendamento'].map(
                  (heading, idx) => (
                    <th
                      key={heading}
                      className={`eyebrow px-4 py-4 font-normal text-dim ${idx === 0 ? 'pl-5' : 'text-center'}`}
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="text-sm">
              {comparison.map((row, idx) => (
                <tr key={idx} className={row.premium ? 'bg-strong' : 'bg-raised'}>
                  <td className="rounded-l-md py-4 pl-5 pr-4 font-display text-lg uppercase leading-tight text-ink">
                    {row.planName}
                  </td>
                  <td className="px-4 py-4 text-center font-mono text-brass">{row.price}</td>
                  <td className="px-4 py-4 text-center text-body">{row.corte}</td>
                  <td className="px-4 py-4 text-center text-body">{row.barba}</td>
                  <td className="px-4 py-4 text-center">
                    {row.premium ? (
                      <span className="font-mono text-brass">SIM</span>
                    ) : (
                      <span className="text-dim">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {row.horarioFixo ? (
                      <span className="font-mono text-brass">SIM</span>
                    ) : (
                      <span className="text-dim">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center text-body">10% em prod. e serv.</td>
                  <td className="rounded-r-md px-4 py-4 text-center text-body">Antecipado</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:hidden">
          {comparison.map((row, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-5 ${row.premium ? 'bg-strong ring-1 ring-line-gold' : 'bg-surface'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-display text-2xl uppercase leading-none text-ink">{row.planName}</h4>
                <span className="shrink-0 font-mono text-sm text-brass">{row.price}</span>
              </div>
              <dl className="mt-4 grid gap-1 text-sm">
                {[
                  ['Corte', row.corte],
                  ['Barba', row.barba],
                  ['Categoria premium', row.premium ? 'Sim' : '—'],
                  ['Horário fixo', row.horarioFixo ? 'Sim' : '—'],
                  ['Descontos', '10% em produtos e serviços adicionais'],
                  ['Agendamento', 'Necessário antecipado'],
                ].map(([term, value]) => (
                  <div key={term} className="flex justify-between gap-4 rounded-sm px-3 py-2 odd:bg-raised">
                    <dt className="text-mute">{term}</dt>
                    <dd className="text-right text-body">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>
      <section className="shell mb-20 sm:mb-28">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="p-2 sm:p-4 lg:col-span-4">
            <SectionLabel label="Glossário" number="04" className="mb-5" />
            <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl">Entenda seu plano</h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              Esclarecimentos sobre os termos e condições dos planos da Soul Blues.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
            {terms.map((term, idx) => (
              <div key={idx} className={`rounded-lg p-6 sm:p-7 ${idx % 3 == 0 ? 'bg-raised' : 'bg-surface'}`}>
                <h3 className="font-display text-3xl uppercase leading-none text-brass">{term.term}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{term.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="shell mb-20 sm:mb-28">
        <div className="flex flex-col justify-between gap-8 rounded-xl bg-raised p-7 shadow-card sm:p-12 lg:flex-row lg:items-end lg:p-16">
          <div>
            <span className="eyebrow block text-brass">Adesão online</span>
            <h2 className="mt-4 font-display text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.9] text-ink">
              {cta.title}
            </h2>
            <p className="mt-4 text-base text-body">{cta.subtitle}</p>
          </div>
          <a
            href={cta.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('primary', 'lg', 'w-full lg:w-auto')}
          >
            {cta.buttonText}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="shell">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="p-2 sm:p-4 lg:col-span-4">
            <SectionLabel label="Dúvidas" number="05" className="mb-5" />
            <h2 className="font-display text-5xl uppercase leading-[0.92] text-ink sm:text-6xl">
              Perguntas frequentes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              Respostas diretas baseadas nas condições oficiais dos planos da Soul Blues.
            </p>
          </div>
          <div className="space-y-2 lg:col-span-8">
            {faq.map((entry, faqIdx) => {
              const isOpen = openFaq === faqIdx;
              return (
                <div key={faqIdx} className={`rounded-lg transition-colors ${isOpen ? 'bg-raised' : 'bg-surface'}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faqIdx)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-6 py-5 text-left text-ink transition-colors hover:text-brass"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-xl uppercase leading-tight sm:text-2xl">{entry.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-5 w-5 shrink-0 text-dim" aria-hidden="true" />
                    )}
                  </button>
                  {isOpen && <div className="px-6 pb-6 text-base leading-relaxed text-body">{entry.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="fixed bottom-3 left-3 right-3 z-40 rounded-lg bg-surface p-2 shadow-lift ring-1 ring-line md:hidden">
        <a
          href={cta.url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses('primary', 'md', 'w-full')}
        >
          Assinar
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
