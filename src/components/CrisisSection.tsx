import {AlertTriangle, BookOpen, CheckCircle2, ExternalLink, Satellite} from 'lucide-react';
import {UI_TEXT} from '../data/i18n';
import {MEDIA_ASSETS} from '../data/mediaAssets';
import {CRISIS_BY_PROVINCE, MOQUEGUA_PROVINCES} from '../data/moqueguaData';
import type {Lang, ProvinceKey} from '../types/agro';
import {SectionComments} from './SectionComments';

interface CrisisSectionProps {
  lang: Lang;
  provinceKey: ProvinceKey;
  onSelectProvince: (key: ProvinceKey) => void;
}

export function CrisisSection({lang, provinceKey, onSelectProvince}: CrisisSectionProps) {
  const t = UI_TEXT[lang];
  const province = MOQUEGUA_PROVINCES[provinceKey];
  const crisis = CRISIS_BY_PROVINCE[provinceKey];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      {/* Cabecera e imagen ilustrativa */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 sm:p-6 items-center">
        <div className="lg:col-span-7 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">
            05 · {t.crisisEyebrow}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--fs-ink)] text-balance">
            {t.crisisHeading}
          </h1>
          <p className="text-sm font-semibold text-[#991B1B]">{crisis.headline[lang]}</p>
          <p className="text-sm text-[var(--fs-ink)] leading-relaxed">{crisis.plainSummary[lang]}</p>

          {/* Selector rápido de provincia dentro de Crisis */}
          <div className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fs-ink-muted)] mb-2">
              {t.selectProvinceLabel}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(Object.keys(MOQUEGUA_PROVINCES) as ProvinceKey[]).map((key) => {
                const p = MOQUEGUA_PROVINCE_LABEL(key);
                const active = key === provinceKey;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onSelectProvince(key)}
                    className={`rounded-lg border px-3 py-2 text-left text-xs font-bold transition-colors cursor-pointer ${
                      active
                        ? 'border-[#991B1B] bg-[#991B1B] text-white'
                        : 'border-[var(--fs-border-strong)] bg-[var(--fs-canvas)] text-[var(--fs-ink)] hover:bg-[var(--fs-surface-muted)]'
                    }`}
                  >
                    {p.shortName}
                    <span className={`block text-[11px] font-normal ${active ? 'text-white/85' : 'text-[var(--fs-ink-muted)]'}`}>
                      {p.altitude}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <img
            src={MEDIA_ASSETS.crisis.src}
            alt={lang === 'es' ? MEDIA_ASSETS.crisis.altEs : MEDIA_ASSETS.crisis.altEn}
            referrerPolicy="no-referrer"
            className="aspect-[4/3] w-full rounded-lg border border-[var(--fs-border)] object-cover"
          />
        </div>
      </div>

      {/* Actualización oficial NASA GPM Sep 2026 */}
      <div className="rounded-xl border border-[#B45309] bg-[#FEF3C7] p-5 space-y-2 text-[#78350F]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="inline-flex items-center gap-2 font-display text-lg font-bold">
            <Satellite className="h-5 w-5 shrink-0" aria-hidden="true" />
            {t.crisisGpmTitle}
          </h2>
          <a
            href="https://gpm.nasa.gov/data/articles/El-Nino-Sep-2026-update"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold underline hover:text-[#451A03]"
          >
            NASA GPM · Sep 2026
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed">{t.crisisGpmBody}</p>
      </div>

      {/* Síntomas en la provincia + Glosario sencillo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 space-y-3">
          <h2 className="inline-flex items-center gap-2 font-display text-lg font-bold text-[var(--fs-ink)]">
            <AlertTriangle className="h-5 w-5 text-[#DC2626] shrink-0" aria-hidden="true" />
            {t.crisisSymptomsTitle} ({province.shortName})
          </h2>
          <ul className="space-y-2.5 text-sm text-[var(--fs-ink)] leading-relaxed">
            {crisis.symptoms.map((sym, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="font-mono-tabular text-xs font-bold text-[#B91C1C] mt-0.5">0{idx + 1}.</span>
                <span>{sym[lang]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 space-y-3">
          <h2 className="inline-flex items-center gap-2 font-display text-lg font-bold text-[var(--fs-ink)]">
            <BookOpen className="h-5 w-5 text-[var(--fs-accent)] shrink-0" aria-hidden="true" />
            {t.crisisGlossaryTitle}
          </h2>
          <div className="space-y-3">
            {crisis.glossary.map((g, idx) => (
              <div key={idx} className="rounded-lg border border-[var(--fs-border)] bg-[var(--fs-canvas)] p-3.5">
                <strong className="block text-sm font-bold text-[var(--fs-accent)]">{g.term[lang]}</strong>
                <p className="mt-1 text-xs sm:text-sm text-[var(--fs-ink-muted)] leading-relaxed">
                  {g.meaning[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan de acción Antes / Durante / Después */}
      <section className="space-y-4">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--fs-ink)]">{t.crisisPlanTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {crisis.phases.map((phase, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5 space-y-3"
            >
              <div className="border-b border-[var(--fs-border)] pb-2">
                <span className="font-mono-tabular text-xs font-semibold text-[#B45309]">0{idx + 1}</span>
                <h3 className="font-display text-lg font-bold text-[var(--fs-ink)]">{phase.phase[lang]}</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--fs-ink)] leading-relaxed">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <SectionComments lang={lang} sectionId="crisis" />
    </div>
  );
}

function MOQUEGUA_PROVINCE_LABEL(key: ProvinceKey) {
  const p = MOQUEGUA_PROVINCES[key];
  return {
    shortName: p.shortName,
    altitude: p.altitude.es,
  };
}
